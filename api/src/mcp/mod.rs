mod answers;
mod names;
mod server;
mod tools;

#[cfg(test)]
mod tests;

use std::net::{IpAddr, SocketAddr};
use std::sync::Arc;

use axum::Router;
use axum::extract::{ConnectInfo, Request, State};
use axum::middleware::{self, Next};
use axum::response::Response;
use rmcp::transport::streamable_http_server::session::never::NeverSessionManager;
use rmcp::transport::{StreamableHttpServerConfig, StreamableHttpService};

use crate::limits::SearchSlots;
use crate::peer::client_ip;
use crate::state::AppState;
use server::CatalogServer;

pub const PATH: &str = "/mcp";
const MAX_BODY_BYTES: usize = 64 * 1024;

#[derive(Debug, Clone, Copy)]
struct Client(IpAddr);

pub fn routes(state: AppState, searches: SearchSlots) -> Router<AppState> {
    let config = StreamableHttpServerConfig::default()
        .with_legacy_session_mode(false)
        .with_json_response(true)
        .disable_allowed_hosts()
        .with_allowed_origins(state.allowed_origins.iter().cloned())
        .enforce_origin_validation()
        .with_max_request_body_bytes(MAX_BODY_BYTES);
    let server = CatalogServer::new(state.clone(), searches);
    let service = StreamableHttpService::new(
        move || Ok(server.clone()),
        Arc::new(NeverSessionManager::default()),
        config,
    );
    Router::new()
        .route_service(PATH, service)
        .route_layer(middleware::from_fn_with_state(state, identify))
}

async fn identify(
    State(state): State<AppState>,
    ConnectInfo(peer): ConnectInfo<SocketAddr>,
    mut request: Request,
    next: Next,
) -> Response {
    let ip = client_ip(request.headers(), peer, state.trust_proxy);
    request.extensions_mut().insert(Client(ip));
    next.run(request).await
}
