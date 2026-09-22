mod catalog;
mod config;
mod details;
mod embedding;
mod filters;
#[cfg(test)]
mod fixtures;
mod interpret;
mod jev;
mod lexical;
mod readme;
mod routes;
mod search;
mod semantic;
mod state;
mod tool_details;
mod upstream;
mod vocabulary;

use std::net::SocketAddr;
use std::sync::Arc;

use governor::{Quota, RateLimiter};
use tower_http::cors::CorsLayer;
use tower_http::trace::TraceLayer;
use tracing_subscriber::EnvFilter;

use crate::config::Config;
use crate::details::Details;
use crate::embedding::{Embedder, LocalModel};
use crate::jev::JevClient;
use crate::search::Search;
use crate::state::{AppState, Loaded};
use crate::upstream::Upstream;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    tracing_subscriber::fmt()
        .with_env_filter(EnvFilter::try_from_default_env().unwrap_or_else(|_| "info".into()))
        .init();

    if std::env::args().nth(1).as_deref() == Some("fetch-model") {
        LocalModel::load()?;
        tracing::info!("embedding model downloaded");
        return Ok(());
    }

    let config = Config::from_env()?;
    if std::env::args().nth(1).as_deref() == Some("wait-quiescent") {
        return wait_quiescent(config.bind.port()).await;
    }
    let http = reqwest::Client::builder()
        .user_agent(concat!(
            "awesome-alternatives-api/",
            env!("CARGO_PKG_VERSION")
        ))
        .build()?;
    let catalog = catalog::load(&config.catalog_source, &http).await?;
    tracing::info!(tools = catalog.tools.len(), source = %config.catalog_source, "catalog loaded");

    let jev = config
        .jev
        .map(|j| JevClient::new(http.clone(), &j.base_url, j.api_key, j.model));
    if jev.is_none() {
        tracing::warn!(
            "TYPESAFE_API_KEY is not set: Jev is disabled, search runs on the local model and keywords only"
        );
    }
    if config.github_token.is_none() {
        tracing::warn!(
            "GITHUB_TOKEN is not set: README and security tabs share GitHub's 60 requests an hour, cached for 12 hours per tool"
        );
    }
    let upstream = Upstream::new(
        http.clone(),
        &config.github_api,
        &config.scorecard_api,
        config.github_token.clone(),
    );
    let embedder = load_embedder().await;
    let loaded = Loaded::build(catalog, embedder.clone()).await;
    let state = AppState::new(
        loaded,
        Search::new(jev, embedder),
        Details::new(upstream, config.details_cache_bytes),
        RateLimiter::keyed(Quota::per_minute(config.searches_per_minute)),
        config.trust_proxy,
    );
    tokio::spawn(refresh(
        state.clone(),
        config.catalog_source,
        config.catalog_refresh,
        http,
    ));

    let app = routes::router(state)
        .layer(CorsLayer::permissive())
        .layer(TraceLayer::new_for_http());
    let listener = tokio::net::TcpListener::bind(config.bind).await?;
    tracing::info!(bind = %config.bind, "listening");
    axum::serve(
        listener,
        app.into_make_service_with_connect_info::<SocketAddr>(),
    )
    .with_graceful_shutdown(shutdown())
    .await?;
    Ok(())
}

async fn wait_quiescent(port: u16) -> Result<(), Box<dyn std::error::Error>> {
    let http = reqwest::Client::builder()
        .timeout(std::time::Duration::from_secs(2))
        .build()?;
    let url = format!("http://127.0.0.1:{port}/quiesce");
    let mut ticker = tokio::time::interval(std::time::Duration::from_secs(1));
    loop {
        ticker.tick().await;
        match http.get(&url).send().await {
            Ok(response) if response.status().is_success() => {
                tracing::info!("safe to stop");
                return Ok(());
            }
            Ok(_) => {}
            Err(error) => {
                tracing::info!(%error, "the API no longer answers, nothing left to drain");
                return Ok(());
            }
        }
    }
}

async fn load_embedder() -> Option<Arc<dyn Embedder>> {
    match tokio::task::spawn_blocking(LocalModel::load).await {
        Ok(Ok(model)) => {
            tracing::info!("local embedding model loaded");
            Some(Arc::new(model))
        }
        Ok(Err(error)) => {
            tracing::warn!(%error, "local embedding model unavailable, search uses keywords only");
            None
        }
        Err(error) => {
            tracing::warn!(%error, "loading the embedding model failed, search uses keywords only");
            None
        }
    }
}

async fn refresh(
    state: AppState,
    source: String,
    every: std::time::Duration,
    http: reqwest::Client,
) {
    let mut ticker = tokio::time::interval(every);
    ticker.tick().await;
    loop {
        ticker.tick().await;
        state.limiter.retain_recent();
        match catalog::load(&source, &http).await {
            Ok(catalog) => {
                tracing::info!(tools = catalog.tools.len(), "catalog refreshed");
                state.replace(catalog).await;
            }
            Err(error) => {
                tracing::warn!(%error, "catalog refresh failed, keeping the previous one")
            }
        }
    }
}

async fn shutdown() {
    let ctrl_c = async {
        tokio::signal::ctrl_c().await.ok();
    };
    #[cfg(unix)]
    let terminate = async {
        if let Ok(mut signal) =
            tokio::signal::unix::signal(tokio::signal::unix::SignalKind::terminate())
        {
            signal.recv().await;
        }
    };
    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();
    tokio::select! {
        () = ctrl_c => {}
        () = terminate => {}
    }
}
