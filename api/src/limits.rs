use std::num::NonZeroUsize;
use std::time::Duration;

use axum::error_handling::HandleErrorLayer;
use axum::http::{HeaderValue, StatusCode, header};
use axum::response::{IntoResponse, Response};
use axum::routing::MethodRouter;
use axum::{BoxError, Json, Router};
use tower::ServiceBuilder;
use tower::load_shed::error::Overloaded;
use tower::timeout::error::Elapsed;

pub const SEARCH_CONCURRENCY: NonZeroUsize = NonZeroUsize::new(32).expect("32 is not zero");
pub const TIMEOUT: Duration = Duration::from_secs(15);

#[derive(Debug, Clone, Copy)]
pub struct Limits {
    pub search_concurrency: NonZeroUsize,
    pub timeout: Duration,
}

impl Default for Limits {
    fn default() -> Self {
        Self {
            search_concurrency: SEARCH_CONCURRENCY,
            timeout: TIMEOUT,
        }
    }
}

impl Limits {
    pub fn shed<S>(&self, route: MethodRouter<S>) -> MethodRouter<S>
    where
        S: Clone + Send + Sync + 'static,
    {
        route.route_layer(
            ServiceBuilder::new()
                .layer(HandleErrorLayer::new(overload))
                .load_shed()
                .concurrency_limit(self.search_concurrency.get()),
        )
    }

    pub fn time_out<S>(&self, router: Router<S>) -> Router<S>
    where
        S: Clone + Send + Sync + 'static,
    {
        router.route_layer(
            ServiceBuilder::new()
                .layer(HandleErrorLayer::new(overload))
                .timeout(self.timeout),
        )
    }
}

#[derive(Debug, thiserror::Error)]
pub enum Overload {
    #[error("the server is busy, try again in a second")]
    Busy,
    #[error("the request took too long, try again later")]
    TimedOut,
    #[error("the request could not be served")]
    Failed,
}

impl From<BoxError> for Overload {
    fn from(error: BoxError) -> Self {
        if error.is::<Overloaded>() {
            Self::Busy
        } else if error.is::<Elapsed>() {
            Self::TimedOut
        } else {
            tracing::error!(%error, "a request failed in the middleware");
            Self::Failed
        }
    }
}

async fn overload(error: BoxError) -> Overload {
    error.into()
}

impl IntoResponse for Overload {
    fn into_response(self) -> Response {
        let status = match self {
            Self::Busy => StatusCode::SERVICE_UNAVAILABLE,
            Self::TimedOut => StatusCode::GATEWAY_TIMEOUT,
            Self::Failed => StatusCode::INTERNAL_SERVER_ERROR,
        };
        let mut response = (
            status,
            Json(serde_json::json!({ "error": self.to_string() })),
        )
            .into_response();
        if matches!(self, Self::Busy) {
            response
                .headers_mut()
                .insert(header::RETRY_AFTER, HeaderValue::from_static("1"));
        }
        response
    }
}

#[cfg(test)]
mod tests {
    use std::net::SocketAddr;
    use std::num::NonZeroU32;
    use std::sync::atomic::{AtomicUsize, Ordering};
    use std::sync::{Arc, Condvar, Mutex};

    use axum::body::Body;
    use axum::extract::connect_info::MockConnectInfo;
    use axum::http::{HeaderMap, Request};
    use governor::{Quota, RateLimiter};
    use http_body_util::BodyExt;
    use serde_json::{Value, json};
    use tower::ServiceExt;

    use super::*;
    use crate::cache::Shared;
    use crate::catalog::Catalog;
    use crate::details::{CACHE_BYTES, Details};
    use crate::embedding::fake::Words;
    use crate::embedding::{EmbedError, Embedder, Thresholds, Vector};
    use crate::fixtures::{refresh_off, tool};
    use crate::routes::router;
    use crate::search::Search;
    use crate::state::{AppState, Loaded};
    use crate::upstream::Upstream;

    #[derive(Default)]
    struct Held {
        open: Mutex<bool>,
        opened: Condvar,
        entered: AtomicUsize,
    }

    impl Held {
        fn entered(&self) -> usize {
            self.entered.load(Ordering::SeqCst)
        }

        fn release(&self) {
            *self.open.lock().unwrap() = true;
            self.opened.notify_all();
        }

        async fn reached(&self, count: usize) {
            tokio::time::timeout(Duration::from_secs(5), async {
                while self.entered() < count {
                    tokio::time::sleep(Duration::from_millis(1)).await;
                }
            })
            .await
            .expect("no search reached the model");
        }
    }

    impl Embedder for Held {
        fn embed(&self, texts: &[String]) -> Result<Vec<Vector>, EmbedError> {
            self.entered.fetch_add(1, Ordering::SeqCst);
            let open = self.open.lock().unwrap();
            drop(
                self.opened
                    .wait_timeout_while(open, Duration::from_secs(5), |open| !*open)
                    .unwrap(),
            );
            Words.embed(texts)
        }

        fn thresholds(&self) -> Thresholds {
            Words.thresholds()
        }
    }

    fn app(search_concurrency: usize, timeout: Duration, model: Arc<Held>) -> Router {
        let catalog = Catalog {
            revision: "test".into(),
            products: vec![],
            categories: Default::default(),
            tools: vec![
                tool("semantic-release", "JavaScript", "MIT", &[], 1),
                tool("git-cliff", "Rust", "MIT", &[], 1),
            ],
        };
        let state = AppState::new(
            Loaded::new(catalog, Some(&Words)),
            Search::new(
                None,
                Some(model),
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
            RateLimiter::keyed(Quota::per_minute(NonZeroU32::new(100).unwrap())),
            RateLimiter::keyed(Quota::per_minute(NonZeroU32::new(100).unwrap())),
            false,
            refresh_off(),
        );
        let limits = Limits {
            search_concurrency: NonZeroUsize::new(search_concurrency).unwrap(),
            timeout,
        };
        router(state, limits).layer(MockConnectInfo(SocketAddr::from(([127, 0, 0, 1], 4000))))
    }

    fn search(q: &str) -> Request<Body> {
        Request::post("/v1/search")
            .header("content-type", "application/json")
            .body(Body::from(json!({ "q": q }).to_string()))
            .unwrap()
    }

    fn get(path: &str) -> Request<Body> {
        Request::get(path).body(Body::empty()).unwrap()
    }

    async fn call(app: Router, request: Request<Body>) -> (StatusCode, HeaderMap, Value) {
        let response = app.oneshot(request).await.unwrap();
        let status = response.status();
        let headers = response.headers().clone();
        let bytes = response.into_body().collect().await.unwrap().to_bytes();
        (status, headers, serde_json::from_slice(&bytes).unwrap())
    }

    #[tokio::test]
    async fn a_burst_past_the_limit_is_turned_away_at_once_and_the_slots_come_back() {
        let model = Arc::new(Held::default());
        let app = app(2, Duration::from_secs(10), Arc::clone(&model));
        let first = tokio::spawn(call(app.clone(), search("changelog generator")));
        let second = tokio::spawn(call(app.clone(), search("release automation")));
        model.reached(1).await;

        let (status, headers, body) = tokio::time::timeout(
            Duration::from_secs(1),
            call(app.clone(), search("version bumps")),
        )
        .await
        .expect("a search past the limit was queued instead of shed");
        assert_eq!(status, StatusCode::SERVICE_UNAVAILABLE);
        assert_eq!(headers[header::RETRY_AFTER], "1");
        assert_eq!(body["error"], Overload::Busy.to_string());

        let (status, ..) = call(app.clone(), get("/v1/tools")).await;
        assert_eq!(status, StatusCode::OK, "the limit is for searches only");

        model.release();
        assert_eq!(first.await.unwrap().0, StatusCode::OK);
        assert_eq!(second.await.unwrap().0, StatusCode::OK);
        let (status, ..) = call(app, search("commit messages")).await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(model.entered(), 3);
    }

    #[tokio::test]
    async fn a_search_stuck_past_the_timeout_answers_504_and_leaves_nothing_queued() {
        let model = Arc::new(Held::default());
        let app = app(4, Duration::from_millis(200), Arc::clone(&model));
        let stuck = tokio::spawn(call(app.clone(), search("changelog generator")));
        model.reached(1).await;

        let (status, _, body) = call(app.clone(), search("release automation")).await;
        assert_eq!(status, StatusCode::GATEWAY_TIMEOUT);
        assert_eq!(body["error"], Overload::TimedOut.to_string());
        assert_eq!(stuck.await.unwrap().0, StatusCode::GATEWAY_TIMEOUT);
        assert_eq!(
            model.entered(),
            1,
            "a search that gave up waiting for the model must not reach it later"
        );

        let (status, _, body) = call(app.clone(), get("/quiesce")).await;
        assert_eq!(status, StatusCode::OK, "{body}");
        assert_eq!(body["reason"], "idle");

        model.release();
        let (status, ..) = call(app, search("version bumps")).await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(model.entered(), 2);
    }
}
