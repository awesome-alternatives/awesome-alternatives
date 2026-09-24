use std::net::SocketAddr;

use axum::extract::{ConnectInfo, Path, Request, State};
use axum::middleware::{self, Next};
use axum::response::Response;
use axum::routing::get;
use axum::{Json, Router};
use governor::clock::Clock;

use crate::details::{Readme, Security};
use crate::peer::client_ip;
use crate::routes::ApiError;
use crate::state::AppState;

pub fn routes(state: AppState) -> Router<AppState> {
    Router::new()
        .route("/v1/tools/{slug}/readme", get(readme))
        .route("/v1/tools/{slug}/security", get(security))
        .route_layer(middleware::from_fn_with_state(state, throttle))
}

async fn throttle(
    State(state): State<AppState>,
    ConnectInfo(peer): ConnectInfo<SocketAddr>,
    request: Request,
    next: Next,
) -> Result<Response, ApiError> {
    let ip = client_ip(request.headers(), peer, state.trust_proxy);
    state.details_limiter.check_key(&ip).map_err(|limited| {
        ApiError::RateLimited(limited.wait_time_from(state.details_limiter.clock().now()))
    })?;
    Ok(next.run(request).await)
}

fn full_name(state: &AppState, slug: &str) -> Result<String, ApiError> {
    state
        .loaded()
        .catalog
        .tools
        .iter()
        .find(|t| t.slug == slug)
        .map(|t| t.repo.full_name.clone())
        .ok_or(ApiError::UnknownTool)
}

async fn readme(
    State(state): State<AppState>,
    Path(slug): Path<String>,
) -> Result<Json<Readme>, ApiError> {
    let name = full_name(&state, &slug)?;
    state
        .details
        .readme(&name)
        .await
        .map(Json)
        .map_err(|error| {
            tracing::warn!(%error, slug, "README unavailable");
            ApiError::Upstream
        })
}

async fn security(
    State(state): State<AppState>,
    Path(slug): Path<String>,
) -> Result<Json<Security>, ApiError> {
    let name = full_name(&state, &slug)?;
    state
        .details
        .security(&name)
        .await
        .map(Json)
        .map_err(|error| {
            tracing::warn!(%error, slug, "security report unavailable");
            ApiError::Upstream
        })
}

#[cfg(test)]
mod tests {
    use std::net::SocketAddr;
    use std::num::NonZeroU32;
    use std::sync::Arc;
    use std::sync::atomic::{AtomicUsize, Ordering};

    use axum::Router;
    use axum::body::Body;
    use axum::extract::Path;
    use axum::extract::connect_info::MockConnectInfo;
    use axum::http::{Request, StatusCode, header};
    use axum::response::IntoResponse;
    use axum::routing::get;
    use governor::{Quota, RateLimiter};
    use http_body_util::BodyExt;
    use serde_json::{Value, json};
    use tower::ServiceExt;

    use crate::cache::Shared;
    use crate::catalog::Catalog;
    use crate::details::{CACHE_BYTES, Details};
    use crate::fixtures::tool;
    use crate::routes::router;
    use crate::search::Search;
    use crate::state::{AppState, Loaded};
    use crate::upstream::Upstream;

    struct Fake {
        base: String,
        readme_hits: Arc<AtomicUsize>,
    }

    async fn fake(readme_status: StatusCode) -> Fake {
        let hits = Arc::new(AtomicUsize::new(0));
        let counter = Arc::clone(&hits);
        let upstream = Router::new()
            .route(
                "/repos/example/{repo}/readme",
                get(move || {
                    let counter = Arc::clone(&counter);
                    async move {
                        counter.fetch_add(1, Ordering::SeqCst);
                        (readme_status, r#"<img src="./logo.png"><script>x()</script>"#).into_response()
                    }
                }),
            )
            .route(
                "/repos/example/{repo}/security-advisories",
                get(|Path(repo): Path<String>| async move {
                    match repo.as_str() {
                        "forbidden" => StatusCode::FORBIDDEN.into_response(),
                        "throttled" => StatusCode::TOO_MANY_REQUESTS.into_response(),
                        "silent" => StatusCode::NOT_FOUND.into_response(),
                        _ => axum::Json(json!([{
                            "ghsa_id": "GHSA-aaaa-bbbb-cccc",
                            "cve_id": null,
                            "summary": "Path traversal",
                            "severity": "high",
                            "published_at": "2026-09-01T00:00:00Z",
                            "html_url": "https://github.com/example/good/security/advisories/GHSA-aaaa-bbbb-cccc"
                        }]))
                        .into_response(),
                    }
                }),
            )
            .route(
                "/projects/github.com/example/good",
                get(|| async {
                    axum::Json(json!({
                        "date": "2026-09-21",
                        "score": 7.3,
                        "checks": [
                            { "name": "Signed-Releases", "score": -1, "reason": "no releases found", "documentation": { "url": "https://d/signed" } },
                            { "name": "Code-Review", "score": 10, "reason": "all changesets reviewed", "documentation": { "url": "https://d/review" } },
                            { "name": "Pinned-Dependencies", "score": 3, "reason": "some unpinned", "documentation": null }
                        ]
                    }))
                }),
            );
        let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
        let addr = listener.local_addr().unwrap();
        tokio::spawn(async move { axum::serve(listener, upstream).await.unwrap() });
        Fake {
            base: format!("http://{addr}"),
            readme_hits: hits,
        }
    }

    fn app(fake: &Fake) -> Router {
        limited(fake, 10)
    }

    fn limited(fake: &Fake, per_minute: u32) -> Router {
        let catalog = Catalog {
            revision: "test".into(),
            products: vec![],
            categories: Default::default(),
            tools: vec![
                tool("good", "Rust", "MIT", &[], 1),
                tool("unscored", "Rust", "MIT", &[], 1),
                tool("forbidden", "Rust", "MIT", &[], 1),
                tool("throttled", "Rust", "MIT", &[], 1),
                tool("silent", "Rust", "MIT", &[], 1),
            ],
        };
        let upstream = Upstream::new(reqwest::Client::new(), &fake.base, &fake.base, None);
        let state = AppState::new(
            Loaded::new(catalog, None),
            Search::new(None, None, Arc::new(Shared::disabled())),
            Details::new(upstream, CACHE_BYTES, Arc::new(Shared::disabled())),
            RateLimiter::keyed(Quota::per_minute(NonZeroU32::new(10).unwrap())),
            RateLimiter::keyed(Quota::per_minute(NonZeroU32::new(per_minute).unwrap())),
            false,
            crate::fixtures::refresh_off(),
        );
        router(state, crate::limits::Limits::default())
            .layer(MockConnectInfo(SocketAddr::from(([127, 0, 0, 1], 4000))))
    }

    async fn get_json(app: &Router, path: &str) -> (StatusCode, Value) {
        let response = app
            .clone()
            .oneshot(Request::get(path).body(Body::empty()).unwrap())
            .await
            .unwrap();
        let status = response.status();
        let bytes = response.into_body().collect().await.unwrap().to_bytes();
        (status, serde_json::from_slice(&bytes).unwrap())
    }

    #[tokio::test]
    async fn readme_is_sanitised_and_served_from_cache() {
        let fake = fake(StatusCode::OK).await;
        let app = app(&fake);
        let (status, body) = get_json(&app, "/v1/tools/good/readme").await;
        assert_eq!(status, StatusCode::OK);
        let html = body["html"].as_str().unwrap();
        assert!(html.contains("https://raw.githubusercontent.com/example/good/HEAD/logo.png"));
        assert!(!html.contains("script"));
        get_json(&app, "/v1/tools/good/readme").await;
        assert_eq!(fake.readme_hits.load(Ordering::SeqCst), 1);
    }

    #[tokio::test]
    async fn a_repository_without_readme_answers_null() {
        let fake = fake(StatusCode::NOT_FOUND).await;
        let (status, body) = get_json(&app(&fake), "/v1/tools/good/readme").await;
        assert_eq!(status, StatusCode::OK);
        assert!(body["html"].is_null());
    }

    #[tokio::test]
    async fn an_upstream_failure_is_a_502_and_is_not_cached() {
        let fake = fake(StatusCode::INTERNAL_SERVER_ERROR).await;
        let app = app(&fake);
        assert_eq!(
            get_json(&app, "/v1/tools/good/readme").await.0,
            StatusCode::BAD_GATEWAY
        );
        get_json(&app, "/v1/tools/good/readme").await;
        assert_eq!(fake.readme_hits.load(Ordering::SeqCst), 2);
    }

    #[tokio::test]
    async fn an_unknown_slug_is_a_404_without_calling_github() {
        let fake = fake(StatusCode::OK).await;
        assert_eq!(
            get_json(&app(&fake), "/v1/tools/nope/readme").await.0,
            StatusCode::NOT_FOUND
        );
        assert_eq!(fake.readme_hits.load(Ordering::SeqCst), 0);
    }

    #[tokio::test]
    async fn security_combines_scorecard_and_advisories_worst_checks_first() {
        let fake = fake(StatusCode::OK).await;
        let (status, body) = get_json(&app(&fake), "/v1/tools/good/security").await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(body["scorecard"]["score"], 7.3);
        let checks: Vec<&str> = body["scorecard"]["checks"]
            .as_array()
            .unwrap()
            .iter()
            .map(|c| c["name"].as_str().unwrap())
            .collect();
        assert_eq!(
            checks,
            ["Signed-Releases", "Pinned-Dependencies", "Code-Review"]
        );
        assert!(body["scorecard"]["checks"][0]["score"].is_null());
        assert_eq!(body["advisories"][0]["ghsaId"], "GHSA-aaaa-bbbb-cccc");
        assert_eq!(body["advisories"][0]["severity"], "high");
    }

    #[tokio::test]
    async fn a_project_scorecard_never_scored_is_null() {
        let fake = fake(StatusCode::OK).await;
        let (status, body) = get_json(&app(&fake), "/v1/tools/unscored/security").await;
        assert_eq!(status, StatusCode::OK);
        assert!(body["scorecard"].is_null());
    }
    #[tokio::test]
    async fn a_github_refusal_on_advisories_is_a_502_rather_than_no_advisories_and_is_not_cached() {
        let fake = fake(StatusCode::OK).await;
        let app = app(&fake);
        for slug in ["forbidden", "throttled"] {
            for _ in 0..2 {
                let (status, body) = get_json(&app, &format!("/v1/tools/{slug}/security")).await;
                assert_eq!(status, StatusCode::BAD_GATEWAY, "{slug}");
                assert!(body["error"].is_string(), "{slug}");
                assert!(body.get("advisories").is_none(), "{slug}");
            }
        }
    }

    #[tokio::test]
    async fn a_repository_github_has_no_advisories_for_still_answers_an_empty_list() {
        let fake = fake(StatusCode::OK).await;
        let (status, body) = get_json(&app(&fake), "/v1/tools/silent/security").await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(body["advisories"], json!([]));
    }

    #[tokio::test]
    async fn a_github_refusal_on_the_readme_is_a_502_and_is_not_cached() {
        for refusal in [StatusCode::FORBIDDEN, StatusCode::TOO_MANY_REQUESTS] {
            let fake = fake(refusal).await;
            let app = app(&fake);
            for _ in 0..2 {
                assert_eq!(
                    get_json(&app, "/v1/tools/good/readme").await.0,
                    StatusCode::BAD_GATEWAY,
                    "{refusal}"
                );
            }
            assert_eq!(fake.readme_hits.load(Ordering::SeqCst), 2, "{refusal}");
        }
    }

    #[tokio::test]
    async fn the_detail_routes_share_one_quota_per_client_and_answer_429_with_retry_after() {
        let fake = fake(StatusCode::OK).await;
        for (first, second) in [
            ("/v1/tools/good/readme", "/v1/tools/good/security"),
            ("/v1/tools/good/security", "/v1/tools/good/readme"),
        ] {
            let app = limited(&fake, 1);
            assert_eq!(get_json(&app, first).await.0, StatusCode::OK, "{first}");
            let response = app
                .clone()
                .oneshot(Request::get(second).body(Body::empty()).unwrap())
                .await
                .unwrap();
            assert_eq!(response.status(), StatusCode::TOO_MANY_REQUESTS, "{second}");
            let retry_after: u64 = response.headers()[header::RETRY_AFTER]
                .to_str()
                .unwrap()
                .parse()
                .unwrap();
            assert!((1..=60).contains(&retry_after), "{retry_after}");
        }
    }

    #[tokio::test]
    async fn the_detail_quota_is_spent_before_an_unknown_slug_is_looked_up() {
        let fake = fake(StatusCode::OK).await;
        let app = limited(&fake, 1);
        assert_eq!(
            get_json(&app, "/v1/tools/nope/readme").await.0,
            StatusCode::NOT_FOUND
        );
        assert_eq!(
            get_json(&app, "/v1/tools/good/readme").await.0,
            StatusCode::TOO_MANY_REQUESTS
        );
        assert_eq!(fake.readme_hits.load(Ordering::SeqCst), 0);
    }
}
