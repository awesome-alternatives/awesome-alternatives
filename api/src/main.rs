mod catalog;
mod config;
mod embedding;
mod filters;
#[cfg(test)]
mod fixtures;
mod interpret;
mod jev;
mod lexical;
mod routes;
mod search;
mod semantic;
mod state;
mod vocabulary;

use std::net::SocketAddr;
use std::sync::Arc;

use governor::{Quota, RateLimiter};
use tower_http::cors::CorsLayer;
use tower_http::trace::TraceLayer;
use tracing_subscriber::EnvFilter;

use crate::config::Config;
use crate::embedding::{Embedder, LocalModel};
use crate::jev::JevClient;
use crate::search::Search;
use crate::state::{AppState, Loaded};

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
    let embedder = load_embedder().await;
    let loaded = Loaded::build(catalog, embedder.clone()).await;
    let state = AppState::new(
        loaded,
        Search::new(jev, embedder),
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
