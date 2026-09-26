use std::net::SocketAddr;
use std::num::NonZeroU32;
use std::sync::Arc;

use axum::Router;
use axum::body::Body;
use axum::extract::connect_info::MockConnectInfo;
use axum::http::{Request, StatusCode};
use governor::{Quota, RateLimiter};
use http_body_util::BodyExt;
use serde_json::{Value, json};
use tower::ServiceExt;

use crate::cache::Shared;
use crate::catalog::{Capability, CapabilityTerm, Catalog, Category, Fit, Tool};
use crate::details::{CACHE_BYTES, Details};
use crate::embedding::Embedder;
use crate::embedding::fake::Words;
use crate::fixtures::{MockJev, mock_jev, refresh_off, tool};
use crate::limits::Limits;
use crate::routes::router;
use crate::search::Search;
use crate::state::{AppState, Loaded};
use crate::upstream::Upstream;

const SITE: &str = "https://awesome-alternatives.com";

fn catalog() -> Catalog {
    let described = |mut tool: Tool, description: &str| {
        tool.repo.description = Some(description.into());
        tool
    };
    let knope = Tool {
        capabilities: [(
            "ci".to_owned(),
            Capability {
                docs: "https://example.com/ci".into(),
                note: None,
            },
        )]
        .into(),
        ..tool(
            "knope",
            "Rust",
            "MIT",
            &[("semantic-release", Fit::Full)],
            600,
        )
    };
    let goreleaser = Tool {
        self_host: true,
        ..tool(
            "goreleaser",
            "Go",
            "MIT",
            &[("semantic-release", Fit::Partial)],
            14000,
        )
    };
    let mut semantic_release = tool("semantic-release", "JavaScript", "MIT", &[], 20000);
    semantic_release.name = "Semantic Release".into();
    Catalog {
        revision: "test".into(),
        products: vec![],
        categories: [(
            "release-automation".to_owned(),
            Category {
                name: "Release automation".into(),
                description: "Version bumps, changelogs and releases.".into(),
                self_host: false,
                capabilities: [(
                    "ci".to_owned(),
                    CapabilityTerm {
                        label: "CI".into(),
                        phrases: vec![],
                    },
                )]
                .into(),
            },
        )]
        .into(),
        tools: vec![
            described(
                semantic_release,
                "Fully automated version management and package publishing",
            ),
            described(knope, "Automated version management for any project"),
            goreleaser,
            described(
                tool("git-cliff", "Rust", "Apache-2.0", &[], 9000),
                "Highly customizable changelog generator",
            ),
        ],
    }
}

struct Setup {
    jev: Option<MockJev>,
    mcp_per_minute: u32,
    origins: Vec<String>,
}

impl Default for Setup {
    fn default() -> Self {
        Self {
            jev: None,
            mcp_per_minute: 10,
            origins: vec![],
        }
    }
}

impl Setup {
    fn app(&self) -> Router {
        let embedder: Arc<dyn Embedder> = Arc::new(Words);
        let loaded = Loaded::new(catalog(), Some(embedder.as_ref()));
        let per_minute = |n: u32| Quota::per_minute(NonZeroU32::new(n).unwrap());
        let state = AppState::new(
            loaded,
            Search::new(
                self.jev.as_ref().map(|jev| jev.metered(100, 100)),
                Some(embedder),
                crate::search::CACHE_BYTES,
                Arc::new(Shared::disabled()),
            ),
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
            RateLimiter::keyed(per_minute(10)),
            RateLimiter::keyed(per_minute(10)),
            false,
            refresh_off(),
        )
        .with_mcp_limiter(RateLimiter::keyed(per_minute(self.mcp_per_minute)))
        .with_allowed_origins(&self.origins);
        router(state, Limits::default())
            .layer(MockConnectInfo(SocketAddr::from(([127, 0, 0, 1], 4000))))
    }
}

fn app() -> Router {
    Setup::default().app()
}

fn mcp_request() -> axum::http::request::Builder {
    Request::post("/mcp")
        .header("host", "awesome-alternatives.com")
        .header("content-type", "application/json")
        .header("accept", "application/json, text/event-stream")
}

fn rpc(method: &str, params: Value) -> Value {
    json!({ "jsonrpc": "2.0", "id": 1, "method": method, "params": params })
}

async fn send(app: &Router, request: Request<Body>) -> (StatusCode, Vec<u8>) {
    let response = app.clone().oneshot(request).await.unwrap();
    let status = response.status();
    let bytes = response.into_body().collect().await.unwrap().to_bytes();
    (status, bytes.to_vec())
}

async fn call_rpc(app: &Router, message: Value) -> Value {
    let request = mcp_request().body(Body::from(message.to_string())).unwrap();
    let (status, bytes) = send(app, request).await;
    assert_eq!(
        status,
        StatusCode::OK,
        "{}",
        String::from_utf8_lossy(&bytes)
    );
    serde_json::from_slice(&bytes).unwrap()
}

async fn call_tool(app: &Router, name: &str, arguments: Value) -> (bool, Value) {
    let answer = call_rpc(
        app,
        rpc(
            "tools/call",
            json!({ "name": name, "arguments": arguments }),
        ),
    )
    .await;
    let result = &answer["result"];
    assert!(result.is_object(), "{answer}");
    (
        result["isError"].as_bool().unwrap_or(false),
        result["structuredContent"].clone(),
    )
}

async fn answer(app: &Router, name: &str, arguments: Value) -> Value {
    let (failed, content) = call_tool(app, name, arguments).await;
    assert!(!failed, "{content}");
    content
}

async fn refusal(app: &Router, name: &str, arguments: Value) -> Value {
    let (failed, content) = call_tool(app, name, arguments).await;
    assert!(failed, "{content}");
    content
}

fn slugs(list: &Value) -> Vec<&str> {
    list.as_array()
        .unwrap()
        .iter()
        .map(|t| t["slug"].as_str().unwrap())
        .collect()
}

#[tokio::test]
async fn the_handshake_names_the_server_and_offers_tools() {
    let answer = call_rpc(
        &app(),
        rpc(
            "initialize",
            json!({
                "protocolVersion": "2025-06-18",
                "capabilities": {},
                "clientInfo": { "name": "test", "version": "1" }
            }),
        ),
    )
    .await;
    let result = &answer["result"];
    assert_eq!(result["serverInfo"]["name"], "awesome-alternatives");
    assert_eq!(result["serverInfo"]["version"], env!("CARGO_PKG_VERSION"));
    assert_eq!(result["protocolVersion"], "2025-06-18");
    assert!(result["capabilities"]["tools"].is_object(), "{result}");
    assert!(
        result["instructions"]
            .as_str()
            .unwrap()
            .contains("find_alternatives")
    );
}

#[tokio::test]
async fn the_five_tools_are_listed_with_object_schemas() {
    let answer = call_rpc(&app(), rpc("tools/list", json!({}))).await;
    let tools = answer["result"]["tools"].as_array().unwrap();
    let names: Vec<&str> = tools.iter().map(|t| t["name"].as_str().unwrap()).collect();
    assert_eq!(
        names,
        [
            "find_alternatives",
            "get_tool",
            "list_tools",
            "list_categories",
            "search"
        ]
    );
    for tool in tools {
        let schema = &tool["inputSchema"];
        assert_eq!(schema["type"], "object", "{tool}");
        assert!(tool["description"].as_str().unwrap().len() > 40, "{tool}");
        assert_eq!(tool["annotations"]["readOnlyHint"], true, "{tool}");
    }
    let by_name = |name: &str| &tools.iter().find(|t| t["name"] == name).unwrap()["inputSchema"];
    assert_eq!(by_name("find_alternatives")["required"], json!(["tool"]));
    assert_eq!(by_name("get_tool")["required"], json!(["slug"]));
    assert_eq!(by_name("search")["required"], json!(["query"]));
    let listing = by_name("list_tools")["properties"].as_object().unwrap();
    for filter in [
        "replaces",
        "category",
        "language",
        "license",
        "terms",
        "selfHost",
        "maintained",
        "dropIn",
        "capabilities",
        "limit",
        "offset",
    ] {
        assert!(listing.contains_key(filter), "{filter}");
    }
}

#[tokio::test]
async fn alternatives_come_back_with_their_fit_ranked_best_first() {
    let app = app();
    let found = answer(
        &app,
        "find_alternatives",
        json!({ "tool": "semantic-release" }),
    )
    .await;
    assert_eq!(
        found["replaces"],
        json!({ "slug": "semantic-release", "name": "Semantic Release" })
    );
    assert_eq!(found["count"], 2);
    let alternatives = &found["alternatives"];
    assert_eq!(slugs(alternatives), ["knope", "goreleaser"]);
    assert_eq!(alternatives[0]["fit"], "full");
    assert_eq!(alternatives[1]["fit"], "partial");
    assert_eq!(alternatives[1]["selfHost"], true);

    let by_name = answer(
        &app,
        "find_alternatives",
        json!({ "tool": "  semantic RELEASE " }),
    )
    .await;
    assert_eq!(by_name["replaces"]["slug"], "semantic-release");

    let in_go = answer(
        &app,
        "find_alternatives",
        json!({ "tool": "semantic-release", "language": "go" }),
    )
    .await;
    assert_eq!(slugs(&in_go["alternatives"]), ["goreleaser"]);
}

#[tokio::test]
async fn an_unknown_name_is_a_tool_error_that_suggests_close_matches() {
    let refused = refusal(&app(), "find_alternatives", json!({ "tool": "semantic" })).await;
    assert!(refused["error"].as_str().unwrap().contains("semantic"));
    assert_eq!(refused["closeMatches"][0]["slug"], "semantic-release");

    let nothing_close = refusal(&app(), "find_alternatives", json!({ "tool": "zzzz" })).await;
    assert!(nothing_close.get("closeMatches").is_none());
}

#[tokio::test]
async fn one_tool_carries_its_facts_and_an_unknown_slug_is_refused() {
    let app = app();
    let knope = answer(&app, "get_tool", json!({ "slug": "knope" })).await;
    assert_eq!(knope["slug"], "knope");
    assert_eq!(knope["repo"]["language"], "Rust");
    assert_eq!(
        knope["replaces"][0],
        json!({ "tool": "semantic-release", "fit": "full" })
    );
    assert_eq!(
        knope["capabilities"]["ci"]["docs"],
        "https://example.com/ci"
    );

    let refused = refusal(&app, "get_tool", json!({ "slug": "knop" })).await;
    assert_eq!(refused["closeMatches"][0]["slug"], "knope");
}

#[tokio::test]
async fn the_tool_list_reads_the_same_filters_as_the_http_api() {
    let app = app();
    let rust = answer(&app, "list_tools", json!({ "language": "rust" })).await;
    assert_eq!(rust["count"], 2);
    assert_eq!(slugs(&rust["tools"]), ["git-cliff", "knope"]);

    let hosted = answer(&app, "list_tools", json!({ "selfHost": true, "limit": 1 })).await;
    assert_eq!(slugs(&hosted["tools"]), ["goreleaser"]);
    assert_eq!(hosted["limit"], 1);

    let near = answer(
        &app,
        "list_tools",
        json!({ "capabilities": ["ci", "wiki"] }),
    )
    .await;
    assert_eq!(near["count"], 0);
    assert_eq!(near["near"][0]["tool"]["slug"], "knope");
    assert_eq!(near["near"][0]["missing"], json!(["wiki"]));
}

#[tokio::test]
async fn a_filter_value_outside_the_vocabulary_is_a_tool_error_not_a_silent_miss() {
    let app = app();
    for arguments in [
        json!({ "terms": "libre" }),
        json!({ "terms": "Open" }),
        json!({ "limit": -1 }),
        json!({ "selfHost": "yes" }),
    ] {
        let refused = refusal(&app, "list_tools", arguments.clone()).await;
        assert!(
            refused["error"]
                .as_str()
                .unwrap()
                .starts_with("the arguments do not fit"),
            "{arguments}: {refused}"
        );
    }
    let missing = refusal(&app, "find_alternatives", json!({})).await;
    assert!(missing["error"].as_str().unwrap().contains("tool"));
}

#[tokio::test]
async fn categories_come_with_their_counts_and_capabilities() {
    let listed = answer(&app(), "list_categories", json!({})).await;
    assert_eq!(
        listed["categories"],
        json!([{
            "key": "release-automation",
            "name": "Release automation",
            "description": "Version bumps, changelogs and releases.",
            "tools": 4,
            "selfHost": false,
            "capabilities": { "ci": "CI" }
        }])
    );
}

async fn http_search(app: &Router, q: &str) -> Value {
    let request = Request::post("/v1/search")
        .header("content-type", "application/json")
        .body(Body::from(json!({ "q": q }).to_string()))
        .unwrap();
    let (status, bytes) = send(app, request).await;
    assert_eq!(status, StatusCode::OK);
    serde_json::from_slice(&bytes).unwrap()
}

#[tokio::test]
async fn an_mcp_search_never_reaches_jev_while_the_same_query_over_http_does() {
    let setup = Setup {
        jev: Some(mock_jev().await),
        ..Setup::default()
    };
    let app = setup.app();
    let jev = setup.jev.as_ref().unwrap();

    let found = answer(&app, "search", json!({ "query": "changelog generator" })).await;
    assert_eq!(found["interpretedBy"], "local");
    assert_eq!(slugs(&found["tools"]), ["git-cliff"]);
    let again = answer(&app, "search", json!({ "query": "changelog generator" })).await;
    assert_eq!(again["interpretedBy"], "local");
    assert_eq!(jev.calls(), 0);

    let over_http = http_search(&app, "changelog generator").await;
    assert_eq!(over_http["interpretedBy"], "jev");
    assert_eq!(jev.calls(), 1);
}

#[tokio::test]
async fn past_its_own_quota_search_answers_a_tool_error_with_the_wait_and_filters_keep_working() {
    let app = Setup {
        mcp_per_minute: 1,
        ..Setup::default()
    }
    .app();
    answer(
        &app,
        "search",
        json!({ "query": "semantic-release in rust" }),
    )
    .await;
    let refused = refusal(
        &app,
        "search",
        json!({ "query": "semantic-release in rust" }),
    )
    .await;
    let wait = refused["retryAfterSeconds"].as_u64().unwrap();
    assert!((1..=60).contains(&wait), "{refused}");
    assert!(refused["error"].as_str().unwrap().contains("try again"));

    answer(&app, "list_tools", json!({})).await;
    answer(
        &app,
        "find_alternatives",
        json!({ "tool": "semantic-release" }),
    )
    .await;
    assert_eq!(
        http_search(&app, "knope").await["tools"][0]["slug"],
        "knope"
    );
}

#[tokio::test]
async fn an_empty_or_oversized_query_is_refused_without_spending_the_quota() {
    let app = Setup {
        mcp_per_minute: 1,
        ..Setup::default()
    }
    .app();
    refusal(&app, "search", json!({ "query": "   " })).await;
    let long = "a".repeat(crate::routes::MAX_QUERY_CHARS + 1);
    refusal(&app, "search", json!({ "query": long })).await;
    answer(&app, "search", json!({ "query": "knope" })).await;
}

#[tokio::test]
async fn an_unknown_tool_name_is_a_protocol_error() {
    let answer = call_rpc(
        &app(),
        rpc(
            "tools/call",
            json!({ "name": "drop_tables", "arguments": {} }),
        ),
    )
    .await;
    assert!(answer["error"]["code"].is_i64(), "{answer}");
    assert!(answer.get("result").is_none());
}

async fn status_with_origin(app: &Router, origin: Option<&str>) -> StatusCode {
    let message = rpc("tools/list", json!({}));
    let mut request = mcp_request();
    if let Some(origin) = origin {
        request = request.header("origin", origin);
    }
    send(app, request.body(Body::from(message.to_string())).unwrap())
        .await
        .0
}

#[tokio::test]
async fn a_browser_origin_is_refused_unless_it_is_allowed_and_agents_without_one_are_served() {
    let closed = app();
    assert_eq!(
        status_with_origin(&closed, Some("https://evil.example")).await,
        StatusCode::FORBIDDEN
    );
    assert_eq!(
        status_with_origin(&closed, Some(SITE)).await,
        StatusCode::FORBIDDEN
    );
    assert_eq!(status_with_origin(&closed, None).await, StatusCode::OK);

    let open_to_site = Setup {
        origins: vec![SITE.to_owned()],
        ..Setup::default()
    }
    .app();
    assert_eq!(
        status_with_origin(&open_to_site, Some(SITE)).await,
        StatusCode::OK
    );
    assert_eq!(
        status_with_origin(&open_to_site, Some("https://evil.example")).await,
        StatusCode::FORBIDDEN
    );
}

#[tokio::test]
async fn an_oversized_body_is_refused_before_it_is_parsed() {
    let message = rpc(
        "tools/call",
        json!({ "name": "search", "arguments": { "query": "x".repeat(super::MAX_BODY_BYTES) } }),
    );
    let (status, _) = send(
        &app(),
        mcp_request().body(Body::from(message.to_string())).unwrap(),
    )
    .await;
    assert_eq!(status, StatusCode::PAYLOAD_TOO_LARGE);
}

#[tokio::test]
async fn there_is_no_session_stream_to_open() {
    let (status, _) = send(
        &app(),
        Request::get("/mcp")
            .header("host", "awesome-alternatives.com")
            .header("accept", "text/event-stream")
            .body(Body::empty())
            .unwrap(),
    )
    .await;
    assert_eq!(status, StatusCode::METHOD_NOT_ALLOWED);
}
