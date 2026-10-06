#[cfg(test)]
pub(crate) mod tests;

use std::sync::Arc;
use std::time::Duration;

use jsonwebtoken::{Algorithm, EncodingKey, Header, encode, get_current_timestamp};
use reqwest::{Method, RequestBuilder, Response, StatusCode};
use serde::ser::SerializeMap;
use serde::{Deserialize, Serialize, Serializer};
use time::OffsetDateTime;
use tokio::sync::Mutex;

pub const DEFAULT_REPOSITORY: &str = "awesome-alternatives/awesome-alternatives";
const TIMEOUT: Duration = Duration::from_secs(10);
const TOKEN_MARGIN: time::Duration = time::Duration::minutes(5);
const JWT_BACKDATE: u64 = 60;
const JWT_LIFETIME: u64 = 540;

pub struct Settings {
    pub app_id: String,
    pub private_key: String,
    pub repository: String,
}

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("signing the app JWT failed: {0}")]
    Jwt(#[from] jsonwebtoken::errors::Error),
    #[error("minting an installation token failed: {0}")]
    Token(reqwest::Error),
    #[error("GitHub answered with an error: {0}")]
    Request(reqwest::Error),
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Scope {
    DispatchWorkflows,
    ReadPublic,
}

impl Serialize for Scope {
    fn serialize<S: Serializer>(&self, serializer: S) -> Result<S::Ok, S::Error> {
        let (permission, access) = match self {
            Self::DispatchWorkflows => ("actions", "write"),
            Self::ReadPublic => ("metadata", "read"),
        };
        let mut map = serializer.serialize_map(Some(1))?;
        map.serialize_entry(permission, access)?;
        map.end()
    }
}

#[derive(Serialize)]
pub(crate) struct Claims<'a> {
    pub iat: u64,
    pub exp: u64,
    pub iss: &'a str,
}

#[derive(Deserialize)]
struct Installation {
    id: u64,
}

#[derive(Serialize)]
struct TokenRequest<'a> {
    repositories: [&'a str; 1],
    permissions: Scope,
}

#[derive(Deserialize)]
struct AccessToken {
    token: String,
    #[serde(with = "time::serde::rfc3339")]
    expires_at: OffsetDateTime,
}

impl AccessToken {
    fn is_usable(&self) -> bool {
        OffsetDateTime::now_utc() < self.expires_at - TOKEN_MARGIN
    }
}

pub struct App {
    http: reqwest::Client,
    api: String,
    app_id: String,
    key: EncodingKey,
    repository: String,
    installation: Mutex<Option<u64>>,
}

impl App {
    pub fn new(
        http: reqwest::Client,
        api: &str,
        settings: Settings,
    ) -> Result<Self, jsonwebtoken::errors::Error> {
        Ok(Self {
            http,
            api: api.trim_end_matches('/').to_owned(),
            app_id: settings.app_id,
            key: EncodingKey::from_rsa_pem(settings.private_key.as_bytes())?,
            repository: settings.repository,
            installation: Mutex::new(None),
        })
    }

    pub fn repository(&self) -> &str {
        &self.repository
    }

    pub fn request(&self, method: Method, path: &str) -> RequestBuilder {
        self.http
            .request(method, format!("{}{path}", self.api))
            .header("accept", "application/vnd.github+json")
            .header("x-github-api-version", "2022-11-28")
            .timeout(TIMEOUT)
    }

    pub(crate) fn claims(&self, now: u64) -> Claims<'_> {
        Claims {
            iat: now - JWT_BACKDATE,
            exp: now + JWT_LIFETIME,
            iss: &self.app_id,
        }
    }

    fn jwt(&self) -> Result<String, jsonwebtoken::errors::Error> {
        encode(
            &Header::new(Algorithm::RS256),
            &self.claims(get_current_timestamp()),
            &self.key,
        )
    }

    async fn mint(&self, scope: Scope) -> Result<AccessToken, Error> {
        let jwt = self.jwt()?;
        let mut installation = self.installation.lock().await;
        let id = match *installation {
            Some(id) => id,
            None => *installation.insert(self.installation(&jwt).await?),
        };
        let minted = self.access_token(&jwt, id, scope).await;
        if minted.is_err() {
            *installation = None;
        }
        minted
    }

    async fn installation(&self, jwt: &str) -> Result<u64, Error> {
        let installation: Installation = self
            .request(
                Method::GET,
                &format!("/repos/{}/installation", self.repository),
            )
            .bearer_auth(jwt)
            .send()
            .await
            .and_then(Response::error_for_status)
            .map_err(Error::Token)?
            .json()
            .await
            .map_err(Error::Token)?;
        Ok(installation.id)
    }

    async fn access_token(&self, jwt: &str, id: u64, scope: Scope) -> Result<AccessToken, Error> {
        let name = self
            .repository
            .split_once('/')
            .map_or(self.repository.as_str(), |(_, name)| name);
        self.request(
            Method::POST,
            &format!("/app/installations/{id}/access_tokens"),
        )
        .bearer_auth(jwt)
        .json(&TokenRequest {
            repositories: [name],
            permissions: scope,
        })
        .send()
        .await
        .and_then(Response::error_for_status)
        .map_err(Error::Token)?
        .json()
        .await
        .map_err(Error::Token)
    }
}

pub struct InstallationToken {
    app: Arc<App>,
    scope: Scope,
    cached: Mutex<Option<AccessToken>>,
}

impl InstallationToken {
    pub fn new(app: Arc<App>, scope: Scope) -> Self {
        Self {
            app,
            scope,
            cached: Mutex::new(None),
        }
    }

    pub fn app(&self) -> &App {
        &self.app
    }

    pub async fn token(&self) -> Result<String, Error> {
        let mut cached = self.cached.lock().await;
        if let Some(token) = cached.as_ref().filter(|token| token.is_usable()) {
            return Ok(token.token.clone());
        }
        let minted = self.app.mint(self.scope).await?;
        Ok(cached.insert(minted).token.clone())
    }

    async fn discard(&self, rejected: &str) {
        let mut cached = self.cached.lock().await;
        if cached.as_ref().is_some_and(|token| token.token == rejected) {
            *cached = None;
        }
    }

    pub async fn send(&self, request: impl Fn() -> RequestBuilder) -> Result<Response, Error> {
        let token = self.token().await?;
        let response = request()
            .bearer_auth(&token)
            .send()
            .await
            .map_err(Error::Request)?;
        if response.status() != StatusCode::UNAUTHORIZED {
            return Ok(response);
        }
        self.discard(&token).await;
        let token = self.token().await?;
        request()
            .bearer_auth(token)
            .send()
            .await
            .map_err(Error::Request)
    }
}
