pub mod dispatch;
pub mod oidc;
mod routes;
mod signature;
#[cfg(test)]
mod tests;

use std::time::Duration;

use axum::Json;
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use moka::future::Cache;
use serde::Serialize;

use crate::catalog::Tool;
use dispatch::Dispatcher;
use oidc::Oidc;
pub use routes::routes;

pub const COOLDOWN: Duration = Duration::from_secs(600);

pub struct Settings {
    pub webhook_secret: Option<String>,
    pub oidc_audience: String,
    pub oidc_jwks_url: String,
    pub cooldown: Duration,
    pub dispatch: Option<dispatch::Settings>,
}

#[derive(Debug, thiserror::Error)]
pub enum RefreshError {
    #[error("release-triggered refreshes are not configured on this server")]
    Unconfigured,
    #[error("the request is not authenticated")]
    Unauthorized,
    #[error("the event payload cannot be read")]
    MalformedEvent,
    #[error("no tool in the catalog is backed by this repository")]
    UnknownRepository,
    #[error("GitHub did not accept the refresh, try again later")]
    Dispatch,
}

impl IntoResponse for RefreshError {
    fn into_response(self) -> Response {
        let status = match self {
            Self::Unconfigured => StatusCode::SERVICE_UNAVAILABLE,
            Self::Unauthorized => StatusCode::UNAUTHORIZED,
            Self::MalformedEvent => StatusCode::BAD_REQUEST,
            Self::UnknownRepository => StatusCode::NOT_FOUND,
            Self::Dispatch => StatusCode::BAD_GATEWAY,
        };
        (
            status,
            Json(serde_json::json!({ "error": self.to_string() })),
        )
            .into_response()
    }
}

#[derive(Debug, Serialize)]
pub struct Triggered {
    pub slugs: Vec<String>,
    pub dispatched: bool,
}

pub struct Refresh {
    webhook_secret: Option<String>,
    oidc: Oidc,
    dispatcher: Option<Dispatcher>,
    recent: Cache<String, ()>,
}

impl Refresh {
    pub fn new(
        settings: Settings,
        http: reqwest::Client,
        github_api: &str,
    ) -> Result<Self, jsonwebtoken::errors::Error> {
        Ok(Self {
            webhook_secret: settings.webhook_secret,
            oidc: Oidc::new(
                http.clone(),
                &settings.oidc_jwks_url,
                &settings.oidc_audience,
            ),
            dispatcher: settings
                .dispatch
                .map(|app| Dispatcher::new(http, github_api, app))
                .transpose()?,
            recent: Cache::builder().time_to_live(settings.cooldown).build(),
        })
    }

    fn dispatcher(&self) -> Result<&Dispatcher, RefreshError> {
        self.dispatcher.as_ref().ok_or(RefreshError::Unconfigured)
    }

    fn webhook_secret(&self) -> Result<&str, RefreshError> {
        self.webhook_secret
            .as_deref()
            .ok_or(RefreshError::Unconfigured)
    }

    async fn trigger(
        &self,
        dispatcher: &Dispatcher,
        full_name: &str,
        slugs: Vec<String>,
    ) -> Result<Triggered, RefreshError> {
        let key = full_name.to_ascii_lowercase();
        if !self
            .recent
            .entry(key.clone())
            .or_insert(())
            .await
            .is_fresh()
        {
            tracing::info!(repository = full_name, ?slugs, "refresh coalesced");
            return Ok(Triggered {
                slugs,
                dispatched: false,
            });
        }
        if let Err(error) = dispatcher.dispatch(&slugs).await {
            self.recent.invalidate(&key).await;
            tracing::error!(%error, repository = full_name, ?slugs, "refresh dispatch failed");
            return Err(RefreshError::Dispatch);
        }
        tracing::info!(repository = full_name, ?slugs, "refresh dispatched");
        Ok(Triggered {
            slugs,
            dispatched: true,
        })
    }
}

pub fn slugs_for(tools: &[Tool], full_name: &str) -> Vec<String> {
    let mut slugs: Vec<String> = tools
        .iter()
        .filter(|tool| tool.repo.full_name.eq_ignore_ascii_case(full_name))
        .map(|tool| tool.slug.clone())
        .collect();
    slugs.sort_unstable();
    slugs
}
