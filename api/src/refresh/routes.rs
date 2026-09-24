use axum::body::Bytes;
use axum::extract::State;
use axum::http::{HeaderMap, StatusCode, header};
use axum::response::{IntoResponse, Response};
use axum::routing::post;
use axum::{Json, Router};
use serde::Deserialize;

use super::{RefreshError, Triggered, signature, slugs_for};
use crate::state::AppState;

pub fn routes() -> Router<AppState> {
    Router::new()
        .route("/webhooks/github", post(webhook))
        .route("/v1/refresh", post(refresh))
}

#[derive(Deserialize)]
#[serde(rename_all = "snake_case")]
enum ReleaseAction {
    Published,
    #[serde(other)]
    Other,
}

#[derive(Deserialize)]
struct Repository {
    full_name: String,
}

#[derive(Deserialize)]
struct ReleaseEvent {
    action: ReleaseAction,
    repository: Repository,
}

fn header<'a>(headers: &'a HeaderMap, name: &str) -> Option<&'a str> {
    headers.get(name).and_then(|value| value.to_str().ok())
}

fn accepted(triggered: Triggered) -> Response {
    (StatusCode::ACCEPTED, Json(triggered)).into_response()
}

async fn webhook(
    State(state): State<AppState>,
    headers: HeaderMap,
    body: Bytes,
) -> Result<Response, RefreshError> {
    let refresh = &state.refresh;
    let secret = refresh.webhook_secret()?;
    if !signature::is_signed(secret, header(&headers, "x-hub-signature-256"), &body) {
        return Err(RefreshError::Unauthorized);
    }
    if header(&headers, "x-github-event") != Some("release") {
        return Ok(StatusCode::NO_CONTENT.into_response());
    }
    let event: ReleaseEvent =
        serde_json::from_slice(&body).map_err(|_| RefreshError::MalformedEvent)?;
    if !matches!(event.action, ReleaseAction::Published) {
        return Ok(StatusCode::NO_CONTENT.into_response());
    }
    let dispatcher = refresh.dispatcher()?;
    let full_name = event.repository.full_name;
    let slugs = slugs_for(&state.loaded().catalog.tools, &full_name);
    if slugs.is_empty() {
        return Ok(StatusCode::NO_CONTENT.into_response());
    }
    Ok(accepted(
        refresh.trigger(dispatcher, &full_name, slugs).await?,
    ))
}

async fn refresh(
    State(state): State<AppState>,
    headers: HeaderMap,
) -> Result<Response, RefreshError> {
    let refresh = &state.refresh;
    let dispatcher = refresh.dispatcher()?;
    let token = header(&headers, header::AUTHORIZATION.as_str())
        .and_then(|value| value.strip_prefix("Bearer "))
        .ok_or(RefreshError::Unauthorized)?;
    let full_name = refresh.oidc.repository(token).await.map_err(|error| {
        tracing::info!(%error, "refresh token rejected");
        RefreshError::Unauthorized
    })?;
    let slugs = slugs_for(&state.loaded().catalog.tools, &full_name);
    if slugs.is_empty() {
        return Err(RefreshError::UnknownRepository);
    }
    Ok(accepted(
        refresh.trigger(dispatcher, &full_name, slugs).await?,
    ))
}
