use std::num::NonZeroU32;
use std::sync::Arc;

use axum::Router;
use axum::body::Body;
use axum::http::{Request, StatusCode};
use governor::{Quota, RateLimiter};
use http_body_util::BodyExt;
use serde_json::{Value, json};
use tower::ServiceExt;

use super::{GitHub, Jwks, KID, OidcClaims, SECRET, oidc_token, refresh};
use crate::cache::Shared;
use crate::catalog::Catalog;
use crate::details::{CACHE_BYTES, Details};
use crate::fixtures::tool;
use crate::refresh::Refresh;
use crate::refresh::signature::sign;
use crate::routes::router;
use crate::search::Search;
use crate::state::{AppState, Loaded};
use crate::upstream::Upstream;

fn app(refresh: Refresh) -> Router {
    let mut cli = tool("mono-cli", "Rust", "MIT", &[], 1);
    cli.repo.full_name = "acme/mono".into();
    let mut lib = tool("mono-lib", "Rust", "MIT", &[], 1);
    lib.repo.full_name = "acme/mono".into();
    let catalog = Catalog {
        revision: "test".into(),
        products: vec![],
        categories: Default::default(),
        tools: vec![lib, cli, tool("knope", "Rust", "MIT", &[], 1)],
    };
    router(AppState::new(
        Loaded::new(catalog, None),
        Search::new(None, None, Arc::new(Shared::disabled())),
        Details::new(
            Upstream::new(
                reqwest::Client::new(),
                "http://127.0.0.1:9",
                "http://127.0.0.1:9",
                None,
            ),
            CACHE_BYTES,
            Arc::new(Shared::disabled()),
        ),
        RateLimiter::keyed(Quota::per_minute(NonZeroU32::new(10).unwrap())),
        false,
        refresh,
    ))
}

async fn wired() -> (Router, GitHub) {
    let github = GitHub::new();
    let jwks = Jwks::default().serve().await;
    let app = app(refresh(&github.serve().await, &jwks, true));
    (app, github)
}

fn release(action: &str, full_name: &str) -> Vec<u8> {
    json!({
        "action": action,
        "release": { "tag_name": "v1.2.3" },
        "repository": { "full_name": full_name },
    })
    .to_string()
    .into_bytes()
}

fn webhook(event: &str, body: Vec<u8>, signature: Option<String>) -> Request<Body> {
    let request = Request::post("/webhooks/github").header("x-github-event", event);
    match signature {
        Some(signature) => request.header("x-hub-signature-256", signature),
        None => request,
    }
    .body(Body::from(body))
    .unwrap()
}

fn signed(event: &str, body: Vec<u8>) -> Request<Body> {
    let signature = sign(SECRET, &body);
    webhook(event, body, Some(signature))
}

fn refresh_call(token: Option<&str>) -> Request<Body> {
    let request = Request::post("/v1/refresh");
    match token {
        Some(token) => request.header("authorization", format!("Bearer {token}")),
        None => request,
    }
    .body(Body::empty())
    .unwrap()
}

async fn call(app: &Router, request: Request<Body>) -> (StatusCode, Value) {
    let response = app.clone().oneshot(request).await.unwrap();
    let status = response.status();
    let bytes = response.into_body().collect().await.unwrap().to_bytes();
    let body = serde_json::from_slice(&bytes).unwrap_or(Value::Null);
    (status, body)
}

#[tokio::test]
async fn a_signed_ping_is_acknowledged() {
    let (app, github) = wired().await;
    let (status, _) = call(&app, signed("ping", br#"{"zen":"hi"}"#.to_vec())).await;
    assert_eq!(status, StatusCode::NO_CONTENT);
    assert!(github.dispatched().is_empty());
}

#[tokio::test]
async fn a_webhook_with_a_bad_or_missing_signature_is_refused() {
    let (app, github) = wired().await;
    let body = release("published", "acme/mono");
    let forged = sign("not-the-secret", &body);
    let (status, _) = call(&app, webhook("release", body.clone(), Some(forged))).await;
    assert_eq!(status, StatusCode::UNAUTHORIZED);
    let (status, _) = call(&app, webhook("release", body, None)).await;
    assert_eq!(status, StatusCode::UNAUTHORIZED);
    assert!(github.dispatched().is_empty());
}

#[tokio::test]
async fn a_published_release_dispatches_every_tool_its_repository_backs() {
    let (app, github) = wired().await;
    let (status, body) = call(&app, signed("release", release("published", "Acme/Mono"))).await;
    assert_eq!(status, StatusCode::ACCEPTED);
    assert_eq!(
        body,
        json!({ "slugs": ["mono-cli", "mono-lib"], "dispatched": true })
    );
    let dispatched = github.dispatched();
    assert_eq!(dispatched.len(), 1);
    assert_eq!(dispatched[0].slugs, "mono-cli mono-lib");
}

#[tokio::test]
async fn other_release_actions_and_unknown_repositories_are_ignored() {
    let (app, github) = wired().await;
    let (status, _) = call(&app, signed("release", release("created", "acme/mono"))).await;
    assert_eq!(status, StatusCode::NO_CONTENT);
    let (status, _) = call(&app, signed("release", release("published", "acme/gone"))).await;
    assert_eq!(status, StatusCode::NO_CONTENT);
    assert!(github.dispatched().is_empty());
}

#[tokio::test]
async fn a_webhook_without_a_secret_configured_is_unavailable() {
    let github = GitHub::new();
    let mut refresh = refresh(&github.serve().await, "http://127.0.0.1:9", true);
    refresh.webhook_secret = None;
    let (status, _) = call(
        &app(refresh),
        signed("release", release("published", "acme/mono")),
    )
    .await;
    assert_eq!(status, StatusCode::SERVICE_UNAVAILABLE);
}

#[tokio::test]
async fn a_refresh_without_a_token_is_refused() {
    let (app, _) = wired().await;
    let (status, _) = call(&app, refresh_call(None)).await;
    assert_eq!(status, StatusCode::UNAUTHORIZED);
    let (status, _) = call(&app, refresh_call(Some("not-a-jwt"))).await;
    assert_eq!(status, StatusCode::UNAUTHORIZED);
}

#[tokio::test]
async fn a_refresh_from_a_listed_repository_dispatches_then_coalesces() {
    let (app, github) = wired().await;
    let token = oidc_token(KID, &OidcClaims::valid("acme/mono"));
    let (status, body) = call(&app, refresh_call(Some(&token))).await;
    assert_eq!(status, StatusCode::ACCEPTED);
    assert_eq!(body["dispatched"], true);
    let (status, body) = call(&app, refresh_call(Some(&token))).await;
    assert_eq!(status, StatusCode::ACCEPTED);
    assert_eq!(
        body,
        json!({ "slugs": ["mono-cli", "mono-lib"], "dispatched": false })
    );
    assert_eq!(github.dispatched().len(), 1);
}

#[tokio::test]
async fn a_refresh_from_a_repository_outside_the_catalog_is_not_found() {
    let (app, _) = wired().await;
    let token = oidc_token(KID, &OidcClaims::valid("acme/gone"));
    let (status, body) = call(&app, refresh_call(Some(&token))).await;
    assert_eq!(status, StatusCode::NOT_FOUND);
    assert!(body["error"].is_string());
}

#[tokio::test]
async fn both_endpoints_are_unavailable_without_a_dispatch_app() {
    let jwks = Jwks::default().serve().await;
    let app = app(refresh("http://127.0.0.1:9", &jwks, false));
    let token = oidc_token(KID, &OidcClaims::valid("acme/mono"));
    let (status, _) = call(&app, refresh_call(Some(&token))).await;
    assert_eq!(status, StatusCode::SERVICE_UNAVAILABLE);
    let (status, _) = call(&app, signed("release", release("published", "acme/mono"))).await;
    assert_eq!(status, StatusCode::SERVICE_UNAVAILABLE);
}

#[tokio::test]
async fn a_dispatch_github_refuses_is_a_bad_gateway() {
    let (app, github) = wired().await;
    github
        .failing_dispatches
        .store(1, std::sync::atomic::Ordering::SeqCst);
    let (status, _) = call(&app, signed("release", release("published", "acme/mono"))).await;
    assert_eq!(status, StatusCode::BAD_GATEWAY);
}
