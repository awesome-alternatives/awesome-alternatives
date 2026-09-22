use std::net::{IpAddr, SocketAddr};

use axum::extract::{ConnectInfo, Query, State};
use axum::http::{HeaderMap, StatusCode};
use axum::response::{IntoResponse, Response};
use axum::routing::{get, post};
use axum::{Json, Router};
use serde::{Deserialize, Serialize};

use crate::catalog::Tool;
use crate::filters::Filters;
use crate::search::Interpreter;
use crate::state::AppState;
use crate::vocabulary::Vocabulary;

pub const MAX_QUERY_CHARS: usize = 300;

pub fn router(state: AppState) -> Router {
    Router::new()
        .route("/healthz", get(|| async { "ok" }))
        .route("/v1/tools", get(tools))
        .route("/v1/vocabulary", get(vocabulary))
        .route("/v1/search", post(search))
        .with_state(state)
}

#[derive(Debug, thiserror::Error)]
pub enum ApiError {
    #[error("the query is empty")]
    EmptyQuery,
    #[error("the query is longer than {MAX_QUERY_CHARS} characters")]
    QueryTooLong,
    #[error("too many searches, try again in a minute")]
    RateLimited,
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        let status = match self {
            Self::EmptyQuery | Self::QueryTooLong => StatusCode::BAD_REQUEST,
            Self::RateLimited => StatusCode::TOO_MANY_REQUESTS,
        };
        (
            status,
            Json(serde_json::json!({ "error": self.to_string() })),
        )
            .into_response()
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
    state
        .limiter
        .check_key(&ip)
        .map_err(|_| ApiError::RateLimited)?;

    let loaded = state.loaded();
    let (filters, interpreted_by) = state.search.interpret(query, &loaded.vocabulary).await;
    Ok(Json(SearchResponse {
        query: query.to_owned(),
        results: ToolList::of(filters.apply(&loaded.catalog.tools)),
        filters,
        interpreted_by,
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

    use axum::body::Body;
    use axum::extract::connect_info::MockConnectInfo;
    use axum::http::Request;
    use governor::{Quota, RateLimiter};
    use http_body_util::BodyExt;
    use serde_json::{Value, json};
    use tower::ServiceExt;

    use super::*;
    use crate::catalog::{Catalog, Fit};
    use crate::fixtures::tool;
    use crate::search::Search;

    fn app(per_minute: u32) -> Router {
        let catalog = Catalog {
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
        let state = AppState::new(catalog, Search::new(None), limiter, false);
        router(state).layer(MockConnectInfo(SocketAddr::from(([127, 0, 0, 1], 4000))))
    }

    async fn call(app: &Router, request: Request<Body>) -> (StatusCode, Value) {
        let response = app.clone().oneshot(request).await.unwrap();
        let status = response.status();
        let bytes = response.into_body().collect().await.unwrap().to_bytes();
        (status, serde_json::from_slice(&bytes).unwrap())
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
        assert_eq!(body["interpretedBy"], "lexical");
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
        let (status, body) = call(&app, search_request("knope")).await;
        assert_eq!(status, StatusCode::TOO_MANY_REQUESTS);
        assert!(body["error"].is_string());
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
