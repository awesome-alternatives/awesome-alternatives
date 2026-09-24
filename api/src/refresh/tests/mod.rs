mod dispatcher;
mod oidc;
mod routes;
mod trigger;

use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::{Arc, LazyLock, Mutex};
use std::time::Duration;

use axum::extract::{Path, State};
use axum::http::{HeaderMap, StatusCode, header};
use axum::response::{IntoResponse, Response};
use axum::routing::{get, post};
use axum::{Json, Router};
use jsonwebtoken::jwk::{Jwk, JwkSet};
use jsonwebtoken::{Algorithm, DecodingKey, EncodingKey, Header, Validation, decode, encode};
use rsa::RsaPrivateKey;
use rsa::pkcs1::{EncodeRsaPrivateKey, LineEnding};
use serde::{Deserialize, Serialize};
use serde_json::json;

use super::dispatch::Settings;
use super::dispatch::{DEFAULT_REF, DEFAULT_REPOSITORY, DEFAULT_WORKFLOW};
use super::oidc::{DEFAULT_AUDIENCE, GITHUB_ISSUER};
use super::{Refresh, Settings as RefreshSettings};

pub const KID: &str = "test-key";
pub const APP_ID: &str = "12345";
pub const INSTALLATION: u64 = 42;
pub const FAR_FUTURE: &str = "2099-01-01T00:00:00Z";
pub const SECRET: &str = "webhook-secret";

pub struct Key {
    pem: String,
    encoding: EncodingKey,
    jwk: Jwk,
}

static KEY: LazyLock<Key> = LazyLock::new(|| {
    let private = RsaPrivateKey::new(&mut rand::thread_rng(), 2048).unwrap();
    let pem = private.to_pkcs1_pem(LineEnding::LF).unwrap().to_string();
    let encoding = EncodingKey::from_rsa_pem(pem.as_bytes()).unwrap();
    let mut jwk = Jwk::from_encoding_key(&encoding, Algorithm::RS256).unwrap();
    jwk.common.key_id = Some(KID.into());
    Key { pem, encoding, jwk }
});

pub async fn serve(router: Router) -> String {
    let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
    let base = format!("http://{}", listener.local_addr().unwrap());
    tokio::spawn(async move { axum::serve(listener, router).await.unwrap() });
    base
}

#[derive(Serialize)]
pub struct OidcClaims {
    pub iss: String,
    pub aud: String,
    pub iat: u64,
    pub nbf: u64,
    pub exp: u64,
    pub repository: String,
}

impl OidcClaims {
    pub fn valid(repository: &str) -> Self {
        let now = jsonwebtoken::get_current_timestamp();
        Self {
            iss: GITHUB_ISSUER.into(),
            aud: DEFAULT_AUDIENCE.into(),
            iat: now,
            nbf: now,
            exp: now + 300,
            repository: repository.into(),
        }
    }
}

pub fn oidc_token(kid: &str, claims: &OidcClaims) -> String {
    let header = Header {
        kid: Some(kid.into()),
        ..Header::new(Algorithm::RS256)
    };
    encode(&header, claims, &KEY.encoding).unwrap()
}

#[derive(Clone, Default)]
pub struct Jwks {
    pub fetches: Arc<AtomicUsize>,
}

impl Jwks {
    pub async fn serve(&self) -> String {
        let fetches = Arc::clone(&self.fetches);
        let router = Router::new().route(
            "/jwks",
            get(move || async move {
                fetches.fetch_add(1, Ordering::SeqCst);
                Json(JwkSet {
                    keys: vec![KEY.jwk.clone()],
                })
            }),
        );
        format!("{}/jwks", serve(router).await)
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Dispatched {
    pub token: String,
    pub reference: String,
    pub slugs: String,
}

#[derive(Clone)]
pub struct GitHub {
    pub dispatches: Arc<Mutex<Vec<Dispatched>>>,
    pub installation_lookups: Arc<AtomicUsize>,
    pub tokens_issued: Arc<AtomicUsize>,
    pub failing_dispatches: Arc<AtomicUsize>,
    pub expires_at: &'static str,
}

#[derive(Deserialize)]
struct AppClaims {
    iat: u64,
    exp: u64,
}

#[derive(Deserialize)]
struct TokenRequest {
    repositories: Vec<String>,
    permissions: Permissions,
}

#[derive(Deserialize)]
struct Permissions {
    actions: String,
}

#[derive(Deserialize)]
struct DispatchBody {
    #[serde(rename = "ref")]
    reference: String,
    inputs: Inputs,
}

#[derive(Deserialize)]
struct Inputs {
    slugs: String,
}

fn bearer(headers: &HeaderMap) -> Option<&str> {
    headers
        .get(header::AUTHORIZATION)?
        .to_str()
        .ok()?
        .strip_prefix("Bearer ")
}

fn is_app_jwt(headers: &HeaderMap) -> bool {
    let Some(token) = bearer(headers) else {
        return false;
    };
    let mut validation = Validation::new(Algorithm::RS256);
    validation.set_issuer(&[APP_ID]);
    validation.set_required_spec_claims(&["exp", "iat", "iss"]);
    let key = DecodingKey::from_jwk(&KEY.jwk).unwrap();
    decode::<AppClaims>(token, &key, &validation)
        .is_ok_and(|data| data.claims.exp - data.claims.iat == 600)
}

impl GitHub {
    pub fn new() -> Self {
        Self::expiring_at(FAR_FUTURE)
    }

    pub fn expiring_at(expires_at: &'static str) -> Self {
        Self {
            dispatches: Arc::default(),
            installation_lookups: Arc::default(),
            tokens_issued: Arc::default(),
            failing_dispatches: Arc::default(),
            expires_at,
        }
    }

    pub fn dispatched(&self) -> Vec<Dispatched> {
        self.dispatches.lock().unwrap().clone()
    }

    pub async fn serve(&self) -> String {
        let router = Router::new()
            .route("/repos/{owner}/{repo}/installation", get(installation))
            .route("/app/installations/{id}/access_tokens", post(access_token))
            .route(
                "/repos/{owner}/{repo}/actions/workflows/{workflow}/dispatches",
                post(workflow_dispatch),
            )
            .with_state(self.clone());
        serve(router).await
    }
}

async fn installation(
    State(github): State<GitHub>,
    Path((owner, repo)): Path<(String, String)>,
    headers: HeaderMap,
) -> Response {
    if format!("{owner}/{repo}") != DEFAULT_REPOSITORY {
        return StatusCode::NOT_FOUND.into_response();
    }
    if !is_app_jwt(&headers) {
        return StatusCode::UNAUTHORIZED.into_response();
    }
    github.installation_lookups.fetch_add(1, Ordering::SeqCst);
    Json(json!({ "id": INSTALLATION })).into_response()
}

async fn access_token(
    State(github): State<GitHub>,
    Path(id): Path<u64>,
    headers: HeaderMap,
    Json(request): Json<TokenRequest>,
) -> Response {
    if id != INSTALLATION {
        return StatusCode::NOT_FOUND.into_response();
    }
    if !is_app_jwt(&headers) {
        return StatusCode::UNAUTHORIZED.into_response();
    }
    if request.repositories != ["awesome-alternatives"] || request.permissions.actions != "write" {
        return StatusCode::UNPROCESSABLE_ENTITY.into_response();
    }
    let issued = github.tokens_issued.fetch_add(1, Ordering::SeqCst) + 1;
    (
        StatusCode::CREATED,
        Json(json!({ "token": format!("ghs_{issued}"), "expires_at": github.expires_at })),
    )
        .into_response()
}

async fn workflow_dispatch(
    State(github): State<GitHub>,
    Path((owner, repo, workflow)): Path<(String, String, String)>,
    headers: HeaderMap,
    Json(body): Json<DispatchBody>,
) -> StatusCode {
    if format!("{owner}/{repo}") != DEFAULT_REPOSITORY || workflow != DEFAULT_WORKFLOW {
        return StatusCode::NOT_FOUND;
    }
    let Some(token) = bearer(&headers).filter(|token| token.starts_with("ghs_")) else {
        return StatusCode::UNAUTHORIZED;
    };
    if github
        .failing_dispatches
        .fetch_update(Ordering::SeqCst, Ordering::SeqCst, |left| {
            left.checked_sub(1)
        })
        .is_ok()
    {
        return StatusCode::INTERNAL_SERVER_ERROR;
    }
    github.dispatches.lock().unwrap().push(Dispatched {
        token: token.to_owned(),
        reference: body.reference,
        slugs: body.inputs.slugs,
    });
    StatusCode::NO_CONTENT
}

pub fn dispatch_settings() -> Settings {
    Settings {
        app_id: APP_ID.into(),
        private_key: KEY.pem.clone(),
        repository: DEFAULT_REPOSITORY.into(),
        workflow: DEFAULT_WORKFLOW.into(),
        reference: DEFAULT_REF.into(),
    }
}

pub fn refresh(github: &str, jwks: &str, dispatching: bool) -> Refresh {
    Refresh::new(
        RefreshSettings {
            webhook_secret: Some(SECRET.into()),
            oidc_audience: DEFAULT_AUDIENCE.into(),
            oidc_jwks_url: jwks.into(),
            cooldown: Duration::from_secs(600),
            dispatch: dispatching.then(dispatch_settings),
        },
        reqwest::Client::new(),
        github,
    )
    .unwrap()
}
