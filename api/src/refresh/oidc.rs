use std::collections::HashMap;
use std::time::{Duration, Instant};

use jsonwebtoken::jwk::JwkSet;
use jsonwebtoken::{Algorithm, DecodingKey, Validation, decode, decode_header};
use serde::Deserialize;
use tokio::sync::RwLock;

pub const GITHUB_ISSUER: &str = "https://token.actions.githubusercontent.com";
pub const GITHUB_JWKS: &str = "https://token.actions.githubusercontent.com/.well-known/jwks";
pub const DEFAULT_AUDIENCE: &str = "awesome-alternatives";
const LEEWAY_SECS: u64 = 30;
const REFETCH_AFTER: Duration = Duration::from_secs(60);
const TIMEOUT: Duration = Duration::from_secs(10);

#[derive(Debug, thiserror::Error)]
pub enum OidcError {
    #[error("the token does not verify: {0}")]
    Token(#[from] jsonwebtoken::errors::Error),
    #[error("the token names no key id")]
    NoKeyId,
    #[error("no key {0} in the JWKS")]
    UnknownKey(String),
    #[error("fetching the JWKS failed: {0}")]
    Jwks(#[from] reqwest::Error),
}

#[derive(Deserialize)]
struct Claims {
    repository: String,
}

#[derive(Default)]
struct Keys {
    by_id: HashMap<String, DecodingKey>,
    fetched_at: Option<Instant>,
}

impl Keys {
    fn may_refetch(&self) -> bool {
        self.fetched_at
            .is_none_or(|fetched_at| fetched_at.elapsed() >= REFETCH_AFTER)
    }
}

pub struct Oidc {
    http: reqwest::Client,
    jwks_url: String,
    validation: Validation,
    keys: RwLock<Keys>,
}

impl Oidc {
    pub fn new(http: reqwest::Client, jwks_url: &str, audience: &str) -> Self {
        let mut validation = Validation::new(Algorithm::RS256);
        validation.set_audience(&[audience]);
        validation.set_issuer(&[GITHUB_ISSUER]);
        validation.set_required_spec_claims(&["exp", "iss", "aud"]);
        validation.validate_nbf = true;
        validation.leeway = LEEWAY_SECS;
        Self {
            http,
            jwks_url: jwks_url.to_owned(),
            validation,
            keys: RwLock::new(Keys::default()),
        }
    }

    pub async fn repository(&self, token: &str) -> Result<String, OidcError> {
        let kid = decode_header(token)?.kid.ok_or(OidcError::NoKeyId)?;
        let key = self.key(&kid).await?;
        Ok(decode::<Claims>(token, &key, &self.validation)?
            .claims
            .repository)
    }

    async fn key(&self, kid: &str) -> Result<DecodingKey, OidcError> {
        if let Some(key) = self.keys.read().await.by_id.get(kid) {
            return Ok(key.clone());
        }
        let mut keys = self.keys.write().await;
        if !keys.by_id.contains_key(kid) && keys.may_refetch() {
            keys.fetched_at = Some(Instant::now());
            keys.by_id = self.fetch().await?;
        }
        keys.by_id
            .get(kid)
            .cloned()
            .ok_or_else(|| OidcError::UnknownKey(kid.to_owned()))
    }

    async fn fetch(&self) -> Result<HashMap<String, DecodingKey>, OidcError> {
        let set: JwkSet = self
            .http
            .get(&self.jwks_url)
            .timeout(TIMEOUT)
            .send()
            .await?
            .error_for_status()?
            .json()
            .await?;
        Ok(set
            .keys
            .iter()
            .filter_map(|jwk| {
                let kid = jwk.common.key_id.clone()?;
                DecodingKey::from_jwk(jwk).ok().map(|key| (kid, key))
            })
            .collect())
    }
}
