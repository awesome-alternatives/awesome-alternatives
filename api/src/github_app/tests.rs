use std::collections::HashSet;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::{Arc, LazyLock, Mutex};

use axum::extract::{Path, State};
use axum::http::{HeaderMap, StatusCode, header};
use axum::response::{IntoResponse, Response};
use axum::routing::{get, post};
use axum::{Json, Router};
use jsonwebtoken::jwk::Jwk;
use jsonwebtoken::{Algorithm, DecodingKey, EncodingKey, Validation, decode};
use reqwest::Method;
use rsa::RsaPrivateKey;
use rsa::pkcs1::{EncodeRsaPrivateKey, LineEnding};
use serde::Deserialize;
use serde_json::{Value, json};
use time::OffsetDateTime;
use time::format_description::well_known::Rfc3339;

use super::{App, DEFAULT_REPOSITORY, Error, InstallationToken, Scope, Settings};

pub const KID: &str = "test-key";
pub const APP_ID: &str = "12345";
const INSTALLATION: u64 = 7;

pub struct Key {
    pub pem: String,
    pub encoding: EncodingKey,
    pub jwk: Jwk,
}

pub static KEY: LazyLock<Key> = LazyLock::new(|| {
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

#[derive(Deserialize)]
struct SignedClaims {
    iat: u64,
    exp: u64,
}

#[derive(Deserialize)]
struct TokenRequest {
    repositories: Vec<String>,
    permissions: Value,
}

#[derive(Clone)]
pub struct FakeGitHub {
    pub lookups: Arc<AtomicUsize>,
    pub issued: Arc<AtomicUsize>,
    pub refusals: Arc<AtomicUsize>,
    pub revoked: Arc<Mutex<HashSet<String>>>,
    pub permissions: Arc<Mutex<Vec<Value>>>,
    pub readers: Arc<Mutex<Vec<Option<String>>>>,
    expires_in: time::Duration,
}

impl FakeGitHub {
    pub fn new() -> Self {
        Self::expiring_in(time::Duration::hours(1))
    }

    pub fn expiring_in(expires_in: time::Duration) -> Self {
        Self {
            lookups: Arc::default(),
            issued: Arc::default(),
            refusals: Arc::default(),
            revoked: Arc::default(),
            permissions: Arc::default(),
            readers: Arc::default(),
            expires_in,
        }
    }

    pub fn revoke(&self, token: &str) {
        self.revoked.lock().unwrap().insert(token.into());
    }

    pub fn readers(&self) -> Vec<Option<String>> {
        self.readers.lock().unwrap().clone()
    }

    pub async fn serve(&self) -> (String, Arc<App>) {
        let router = Router::new()
            .route("/repos/{owner}/{repo}/installation", get(installation))
            .route("/app/installations/{id}/access_tokens", post(access_token))
            .route("/repos/{owner}/{repo}/readme", get(readme))
            .with_state(self.clone());
        let base = serve(router).await;
        let app = App::new(
            reqwest::Client::new(),
            &base,
            Settings {
                app_id: APP_ID.into(),
                private_key: KEY.pem.clone(),
                repository: DEFAULT_REPOSITORY.into(),
            },
        )
        .unwrap();
        (base, Arc::new(app))
    }
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
    decode::<SignedClaims>(token, &key, &validation)
        .is_ok_and(|data| data.claims.exp - data.claims.iat <= 660)
}

async fn installation(
    State(github): State<FakeGitHub>,
    Path((owner, repo)): Path<(String, String)>,
    headers: HeaderMap,
) -> Response {
    if format!("{owner}/{repo}") != DEFAULT_REPOSITORY {
        return StatusCode::NOT_FOUND.into_response();
    }
    if !is_app_jwt(&headers) {
        return StatusCode::UNAUTHORIZED.into_response();
    }
    github.lookups.fetch_add(1, Ordering::SeqCst);
    Json(json!({ "id": INSTALLATION })).into_response()
}

async fn access_token(
    State(github): State<FakeGitHub>,
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
    if request.repositories != ["awesome-alternatives"] {
        return StatusCode::UNPROCESSABLE_ENTITY.into_response();
    }
    github.permissions.lock().unwrap().push(request.permissions);
    if github
        .refusals
        .fetch_update(Ordering::SeqCst, Ordering::SeqCst, |left| {
            left.checked_sub(1)
        })
        .is_ok()
    {
        return StatusCode::INTERNAL_SERVER_ERROR.into_response();
    }
    let issued = github.issued.fetch_add(1, Ordering::SeqCst) + 1;
    let expires_at = (OffsetDateTime::now_utc() + github.expires_in)
        .format(&Rfc3339)
        .unwrap();
    (
        StatusCode::CREATED,
        Json(json!({ "token": format!("ghs_{issued}"), "expires_at": expires_at })),
    )
        .into_response()
}

async fn readme(State(github): State<FakeGitHub>, headers: HeaderMap) -> Response {
    let token = bearer(&headers).map(str::to_owned);
    github.readers.lock().unwrap().push(
        headers
            .get(header::AUTHORIZATION)
            .and_then(|value| value.to_str().ok())
            .map(str::to_owned),
    );
    if token.is_some_and(|token| github.revoked.lock().unwrap().contains(&token)) {
        return StatusCode::UNAUTHORIZED.into_response();
    }
    "<p>hello</p>".into_response()
}

fn readme_request(app: &App) -> reqwest::RequestBuilder {
    app.request(Method::GET, "/repos/owner/tool/readme")
}

fn bearers(names: &[&str]) -> Vec<Option<String>> {
    names
        .iter()
        .map(|name| Some(format!("Bearer {name}")))
        .collect()
}

#[tokio::test]
async fn the_app_jwt_is_backdated_a_minute_and_expires_within_ten() {
    let (_, app) = FakeGitHub::new().serve().await;
    let claims = app.claims(1_000_000);
    assert_eq!(claims.iat, 1_000_000 - 60);
    assert!(claims.exp > 1_000_000);
    assert!(claims.exp - 1_000_000 <= 600);
    assert_eq!(claims.iss, APP_ID);
}

#[tokio::test]
async fn each_scope_asks_for_its_own_least_permission() {
    let github = FakeGitHub::new();
    let (_, app) = github.serve().await;
    InstallationToken::new(Arc::clone(&app), Scope::ReadPublic)
        .token()
        .await
        .unwrap();
    InstallationToken::new(app, Scope::DispatchWorkflows)
        .token()
        .await
        .unwrap();
    assert_eq!(
        *github.permissions.lock().unwrap(),
        [json!({ "metadata": "read" }), json!({ "actions": "write" })]
    );
    assert_eq!(github.lookups.load(Ordering::SeqCst), 1);
}

#[tokio::test]
async fn a_token_is_reused_until_five_minutes_before_it_expires() {
    let github = FakeGitHub::expiring_in(time::Duration::minutes(6));
    let (_, app) = github.serve().await;
    let token = InstallationToken::new(app, Scope::ReadPublic);
    assert_eq!(token.token().await.unwrap(), "ghs_1");
    assert_eq!(token.token().await.unwrap(), "ghs_1");
    assert_eq!(github.issued.load(Ordering::SeqCst), 1);
}

#[tokio::test]
async fn a_token_within_five_minutes_of_expiry_is_replaced_without_a_new_lookup() {
    let github = FakeGitHub::expiring_in(time::Duration::minutes(4));
    let (_, app) = github.serve().await;
    let token = InstallationToken::new(app, Scope::ReadPublic);
    assert_eq!(token.token().await.unwrap(), "ghs_1");
    assert_eq!(token.token().await.unwrap(), "ghs_2");
    assert_eq!(github.lookups.load(Ordering::SeqCst), 1);
}

#[tokio::test]
async fn a_401_discards_the_token_and_retries_once_with_a_fresh_one() {
    let github = FakeGitHub::new();
    github.revoke("ghs_1");
    let (_, app) = github.serve().await;
    let token = InstallationToken::new(Arc::clone(&app), Scope::ReadPublic);
    let response = token.send(|| readme_request(&app)).await.unwrap();
    assert_eq!(response.status(), StatusCode::OK);
    token.send(|| readme_request(&app)).await.unwrap();
    assert_eq!(github.readers(), bearers(&["ghs_1", "ghs_2", "ghs_2"]));
    assert_eq!(github.issued.load(Ordering::SeqCst), 2);
}

#[tokio::test]
async fn a_second_401_is_answered_as_is_instead_of_retrying_again() {
    let github = FakeGitHub::new();
    github.revoke("ghs_1");
    github.revoke("ghs_2");
    let (_, app) = github.serve().await;
    let token = InstallationToken::new(Arc::clone(&app), Scope::ReadPublic);
    let response = token.send(|| readme_request(&app)).await.unwrap();
    assert_eq!(response.status(), StatusCode::UNAUTHORIZED);
    assert_eq!(github.readers(), bearers(&["ghs_1", "ghs_2"]));
}

#[tokio::test]
async fn a_refused_token_is_an_error_and_the_installation_is_looked_up_again() {
    let github = FakeGitHub::new();
    github.refusals.store(1, Ordering::SeqCst);
    let (_, app) = github.serve().await;
    let token = InstallationToken::new(app, Scope::ReadPublic);
    assert!(matches!(token.token().await, Err(Error::Token(_))));
    assert_eq!(token.token().await.unwrap(), "ghs_1");
    assert_eq!(github.lookups.load(Ordering::SeqCst), 2);
}
