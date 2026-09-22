use std::net::{IpAddr, SocketAddr};
use std::time::Duration;

use axum::extract::{ConnectInfo, Query, Request, State};
use axum::http::{HeaderMap, HeaderValue, StatusCode, header};
use axum::middleware::{self, Next};
use axum::response::{IntoResponse, Response};
use axum::routing::{get, post};
use axum::{Json, Router};
use governor::clock::Clock;
use serde::{Deserialize, Serialize};

use crate::catalog::Tool;
use crate::filters::Filters;
use crate::search::Interpreter;
use crate::state::{AppState, Quiescence};
use crate::tool_details;
use crate::vocabulary::Vocabulary;

pub const MAX_QUERY_CHARS: usize = 300;

pub fn router(state: AppState) -> Router {
    let v1 = Router::new()
        .route("/v1/tools", get(tools))
        .route("/v1/vocabulary", get(vocabulary))
        .route("/v1/search", post(search))
        .route("/v1/tools/{slug}/readme", get(tool_details::readme))
        .route("/v1/tools/{slug}/security", get(tool_details::security))
        .route_layer(middleware::from_fn_with_state(state.clone(), in_flight));
    Router::new()
        .route("/healthz", get(|| async { "ok" }))
        .route("/quiesce", get(quiesce))
        .merge(v1)
        .with_state(state)
}

async fn in_flight(State(state): State<AppState>, request: Request, next: Next) -> Response {
    let _busy = state.activity.request();
    next.run(request).await
}

async fn quiesce(State(state): State<AppState>) -> (StatusCode, Json<Quiescence>) {
    let quiescence = state.quiescence();
    let status = if quiescence.safe {
        StatusCode::OK
    } else {
        StatusCode::CONFLICT
    };
    (status, Json(quiescence))
}

#[derive(Debug, thiserror::Error)]
pub enum ApiError {
    #[error("the query is empty")]
    EmptyQuery,
    #[error("the query is longer than {MAX_QUERY_CHARS} characters")]
    QueryTooLong,
    #[error("too many searches, try again in {} seconds", retry_after_secs(*.0))]
    RateLimited(Duration),
    #[error("no tool with this slug")]
    UnknownTool,
    #[error("GitHub or OpenSSF did not answer, try again later")]
    Upstream,
}

fn retry_after_secs(wait: Duration) -> u64 {
    (wait.as_secs() + u64::from(wait.subsec_nanos() > 0)).max(1)
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        let (status, retry_after) = match self {
            Self::EmptyQuery | Self::QueryTooLong => (StatusCode::BAD_REQUEST, None),
            Self::RateLimited(wait) => {
                (StatusCode::TOO_MANY_REQUESTS, Some(retry_after_secs(wait)))
            }
            Self::UnknownTool => (StatusCode::NOT_FOUND, None),
            Self::Upstream => (StatusCode::BAD_GATEWAY, None),
        };
        let mut response = (
            status,
            Json(serde_json::json!({ "error": self.to_string() })),
        )
            .into_response();
        if let Some(secs) = retry_after {
            response
                .headers_mut()
                .insert(header::RETRY_AFTER, HeaderValue::from(secs));
        }
        response
    }
}

#[derive(Serialize)]
struct ToolList {
    count: usize,
    tools: Vec<Tool>,
}

impl ToolList {
    fn of(tools: Vec<&Tool>) -> Self {
        Self {
            count: tools.len(),
            tools: tools.into_iter().cloned().collect(),
        }
    }
}

async fn tools(State(state): State<AppState>, Query(filters): Query<Filters>) -> Json<ToolList> {
    Json(ToolList::of(filters.apply(&state.loaded().catalog.tools)))
}

async fn vocabulary(State(state): State<AppState>) -> Json<Vocabulary> {
    Json(state.loaded().vocabulary.clone())
}

#[derive(Deserialize)]
struct SearchRequest {
    q: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct SearchResponse {
    query: String,
    filters: Filters,
    interpreted_by: Interpreter,
    #[serde(flatten)]
    results: ToolList,
}

async fn search(
    State(state): State<AppState>,
    ConnectInfo(peer): ConnectInfo<SocketAddr>,
    headers: HeaderMap,
    Json(request): Json<SearchRequest>,
) -> Result<Json<SearchResponse>, ApiError> {
    let query = request.q.trim();
    if query.is_empty() {
        return Err(ApiError::EmptyQuery);
    }
    if query.chars().count() > MAX_QUERY_CHARS {
        return Err(ApiError::QueryTooLong);
    }
    let ip = client_ip(&headers, peer, state.trust_proxy);
    state.limiter.check_key(&ip).map_err(|limited| {
        ApiError::RateLimited(limited.wait_time_from(state.limiter.clock().now()))
    })?;

    let loaded = state.loaded();
    let read = state.search.interpret(query, &loaded).await;
    Ok(Json(SearchResponse {
        query: query.to_owned(),
        results: ToolList::of(read.select(&loaded.catalog.tools)),
        filters: read.filters,
        interpreted_by: read.interpreted_by,
    }))
}

fn client_ip(headers: &HeaderMap, peer: SocketAddr, trust_proxy: bool) -> IpAddr {
    let forwarded = || {
        headers
            .get("x-forwarded-for")?
            .to_str()
            .ok()?
            .rsplit(',')
            .next()?
            .trim()
            .parse()
            .ok()
    };
    trust_proxy.then(forwarded).flatten().unwrap_or(peer.ip())
}

#[cfg(test)]
mod tests {
    use std::num::NonZeroU32;
    use std::sync::Arc;

    use axum::body::Body;
    use axum::extract::connect_info::MockConnectInfo;
    use axum::http::Request;
    use governor::{Quota, RateLimiter};
    use http_body_util::BodyExt;
    use serde_json::{Value, json};
    use tower::ServiceExt;

    use super::*;
    use crate::cache::Shared;
    use crate::catalog::{Catalog, Fit};
    use crate::details::{CACHE_BYTES, Details};
    use crate::embedding::Embedder;
    use crate::embedding::fake::Broken;
    use crate::fixtures::tool;
    use crate::search::Search;
    use crate::state::Loaded;
    use crate::upstream::Upstream;

    fn state(per_minute: u32, embedder: Option<Arc<dyn Embedder>>) -> AppState {
        let catalog = Catalog {
            revision: "test".into(),
            tools: vec![
                tool("semantic-release", "JavaScript", "MIT", &[], 20000),
                tool(
                    "knope",
                    "Rust",
                    "MIT",
                    &[("semantic-release", Fit::Full)],
                    600,
                ),
                tool(
                    "goreleaser",
                    "Go",
                    "MIT",
                    &[("semantic-release", Fit::Partial)],
                    14000,
                ),
            ],
        };
        let limiter = RateLimiter::keyed(Quota::per_minute(NonZeroU32::new(per_minute).unwrap()));
        AppState::new(
            Loaded::new(catalog, embedder.as_deref()),
            Search::new(None, embedder, Arc::new(Shared::disabled())),
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
            limiter,
            false,
        )
    }

    fn serve(state: AppState) -> Router {
        router(state).layer(MockConnectInfo(SocketAddr::from(([127, 0, 0, 1], 4000))))
    }

    fn app(per_minute: u32) -> Router {
        serve(state(per_minute, None))
    }

    async fn call(app: &Router, request: Request<Body>) -> (StatusCode, Value) {
        let (status, _, body) = call_with_headers(app, request).await;
        (status, body)
    }

    async fn call_with_headers(
        app: &Router,
        request: Request<Body>,
    ) -> (StatusCode, HeaderMap, Value) {
        let response = app.clone().oneshot(request).await.unwrap();
        let status = response.status();
        let headers = response.headers().clone();
        let bytes = response.into_body().collect().await.unwrap().to_bytes();
        (status, headers, serde_json::from_slice(&bytes).unwrap())
    }

    fn search_request(q: &str) -> Request<Body> {
        Request::post("/v1/search")
            .header("content-type", "application/json")
            .body(Body::from(json!({ "q": q }).to_string()))
            .unwrap()
    }

    #[tokio::test]
    async fn tools_are_filtered_from_the_query_string() {
        let (status, body) = call(
            &app(10),
            Request::get("/v1/tools?replaces=semantic-release&language=rust")
                .body(Body::empty())
                .unwrap(),
        )
        .await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(body["count"], 1);
        assert_eq!(body["tools"][0]["slug"], "knope");
    }

    #[tokio::test]
    async fn search_without_jev_falls_back_to_keywords() {
        let (status, body) = call(&app(10), search_request("semantic-release but in Go")).await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(body["interpretedBy"], "local");
        assert_eq!(
            body["filters"],
            json!({ "replaces": "semantic-release", "language": "Go", "dropIn": false })
        );
        assert_eq!(body["tools"][0]["slug"], "goreleaser");
    }

    #[tokio::test]
    async fn search_rejects_empty_and_oversized_queries() {
        let app = app(10);
        assert_eq!(
            call(&app, search_request("   ")).await.0,
            StatusCode::BAD_REQUEST
        );
        let long = "a".repeat(MAX_QUERY_CHARS + 1);
        assert_eq!(
            call(&app, search_request(&long)).await.0,
            StatusCode::BAD_REQUEST
        );
    }

    #[tokio::test]
    async fn search_is_rate_limited_per_client() {
        let app = app(1);
        assert_eq!(call(&app, search_request("knope")).await.0, StatusCode::OK);
        let (status, headers, body) = call_with_headers(&app, search_request("knope")).await;
        assert_eq!(status, StatusCode::TOO_MANY_REQUESTS);
        assert!(body["error"].is_string());
        let retry_after: u64 = headers[header::RETRY_AFTER]
            .to_str()
            .unwrap()
            .parse()
            .unwrap();
        assert!((1..=60).contains(&retry_after), "{retry_after}");
    }

    fn quiesce_request() -> Request<Body> {
        Request::get("/quiesce").body(Body::empty()).unwrap()
    }

    #[tokio::test]
    async fn a_ready_and_idle_process_is_safe_to_stop() {
        let (status, body) = call(&app(10), quiesce_request()).await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(
            body,
            json!({ "alive": true, "ready": true, "safe": true, "reason": "idle" })
        );
    }

    #[tokio::test]
    async fn a_catalog_refresh_holds_the_process_back() {
        let state = state(10, None);
        let _busy = state.activity.indexing();
        let (status, body) = call(&serve(state), quiesce_request()).await;
        assert_eq!(status, StatusCode::CONFLICT);
        assert_eq!(body["safe"], false);
        assert_eq!(body["reason"], "indexing");
    }

    #[tokio::test]
    async fn an_in_flight_request_holds_the_process_back() {
        let state = state(10, None);
        let busy = state.activity.request();
        let app = serve(state);
        let (status, body) = call(&app, quiesce_request()).await;
        assert_eq!(status, StatusCode::CONFLICT);
        assert_eq!(body["reason"], "requests");
        drop(busy);
        assert_eq!(call(&app, quiesce_request()).await.0, StatusCode::OK);
    }

    #[tokio::test]
    async fn a_finished_request_no_longer_counts_as_in_flight() {
        let app = app(10);
        assert_eq!(
            call(&app, Request::get("/v1/tools").body(Body::empty()).unwrap())
                .await
                .0,
            StatusCode::OK
        );
        assert_eq!(call(&app, quiesce_request()).await.0, StatusCode::OK);
    }

    #[tokio::test]
    async fn a_process_whose_index_failed_to_build_is_not_ready() {
        let state = state(10, Some(Arc::new(Broken)));
        let (status, body) = call(&serve(state), quiesce_request()).await;
        assert_eq!(status, StatusCode::CONFLICT);
        assert_eq!(body["ready"], false);
        assert_eq!(body["reason"], "starting");
    }

    #[test]
    fn retry_after_rounds_up_to_a_whole_second() {
        assert_eq!(retry_after_secs(Duration::ZERO), 1);
        assert_eq!(retry_after_secs(Duration::from_millis(1)), 1);
        assert_eq!(retry_after_secs(Duration::from_millis(59_001)), 60);
        assert_eq!(retry_after_secs(Duration::from_secs(12)), 12);
    }

    #[test]
    fn forwarded_address_is_used_only_behind_a_trusted_proxy() {
        let peer = SocketAddr::from(([10, 0, 0, 2], 1));
        let mut headers = HeaderMap::new();
        headers.insert("x-forwarded-for", "6.6.6.6, 203.0.113.7".parse().unwrap());
        assert_eq!(
            client_ip(&headers, peer, true),
            IpAddr::from([203, 0, 113, 7])
        );
        assert_eq!(client_ip(&headers, peer, false), peer.ip());
        headers.insert("x-forwarded-for", "garbage".parse().unwrap());
        assert_eq!(client_ip(&headers, peer, true), peer.ip());
    }
}
