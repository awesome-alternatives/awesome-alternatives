use std::net::SocketAddr;
use std::num::NonZeroU32;
use std::sync::{Arc, Mutex};

use axum::Router;
use axum::body::Body;
use axum::extract::connect_info::MockConnectInfo;
use axum::http::{Request, StatusCode};
use governor::{Quota, RateLimiter};
use http_body_util::BodyExt;
use serde_json::{Value, json};
use time::macros::{date, datetime};
use tower::ServiceExt;

use super::{Days, Facts, History, MAX_DAYS, Row};
use crate::cache::fake::{Write, recording};
use crate::cache::{Answer, HISTORY_TTL, Shared};
use crate::catalog::Catalog;
use crate::details::{CACHE_BYTES, Details};
use crate::fixtures::{refresh_off, tool};
use crate::limits::Limits;
use crate::routes::router;
use crate::search::Search;
use crate::state::{AppState, Loaded};
use crate::upstream::Upstream;

#[derive(Default)]
struct Fake {
    rows: Vec<Row>,
    down: bool,
    asked: Mutex<Vec<(String, Days)>>,
}

impl Fake {
    fn serving(rows: Vec<Row>) -> Arc<Self> {
        Arc::new(Self {
            rows,
            ..Self::default()
        })
    }

    fn down() -> Arc<Self> {
        Arc::new(Self {
            down: true,
            ..Self::default()
        })
    }

    fn asked(&self) -> Vec<(String, Days)> {
        self.asked.lock().unwrap_or_else(|p| p.into_inner()).clone()
    }
}

impl Facts for Arc<Fake> {
    fn daily<'a>(&'a self, slug: &'a str, days: Days) -> Answer<'a, Vec<Row>, sqlx::Error> {
        Box::pin(async move {
            self.asked
                .lock()
                .unwrap_or_else(|p| p.into_inner())
                .push((slug.to_owned(), days));
            if self.down {
                Err(sqlx::Error::PoolTimedOut)
            } else {
                Ok(self.rows.clone())
            }
        })
    }
}

fn app(history: History) -> Router {
    let catalog = Catalog {
        revision: "test".into(),
        products: vec![],
        categories: Default::default(),
        tools: vec![tool("good", "Rust", "MIT", &[], 1)],
    };
    let state = AppState::new(
        Loaded::new(catalog, None),
        Search::new(None, None, Arc::new(Shared::disabled())),
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
    )
    .with_history(history);
    router(state, Limits::default())
        .layer(MockConnectInfo(SocketAddr::from(([127, 0, 0, 1], 4000))))
}

fn served_by(fake: &Arc<Fake>) -> Router {
    app(History::new(
        Box::new(Arc::clone(fake)),
        Arc::new(Shared::disabled()),
    ))
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

fn released() -> Row {
    Row {
        day: date!(2026 - 09 - 23),
        stars: 1200,
        forks: 40,
        open_issues: Some(7),
        pushed_at: Some(datetime!(2026-09-22 18:04:05 UTC)),
        release_tag: Some("v1.2.0".into()),
        release_published_at: Some(datetime!(2026-09-20 09:00:00 UTC)),
        signed: Some(true),
    }
}

fn bare() -> Row {
    Row {
        day: date!(2026 - 09 - 24),
        stars: 1210,
        forks: 41,
        open_issues: None,
        pushed_at: None,
        release_tag: None,
        release_published_at: None,
        signed: None,
    }
}

#[tokio::test]
async fn rows_come_back_as_camel_case_points_in_the_order_the_store_gave_them() {
    let fake = Fake::serving(vec![released(), bare()]);
    let (status, body) = get_json(&served_by(&fake), "/v1/tools/good/history").await;
    assert_eq!(status, StatusCode::OK);
    assert_eq!(
        body,
        json!({
            "slug": "good",
            "points": [
                {
                    "day": "2026-09-23",
                    "stars": 1200,
                    "forks": 40,
                    "openIssues": 7,
                    "pushedAt": "2026-09-22T18:04:05Z",
                    "release": {
                        "tag": "v1.2.0",
                        "publishedAt": "2026-09-20T09:00:00Z",
                        "signed": true
                    }
                },
                {
                    "day": "2026-09-24",
                    "stars": 1210,
                    "forks": 41,
                    "openIssues": null,
                    "pushedAt": null,
                    "release": null
                }
            ]
        })
    );
}

#[tokio::test]
async fn a_release_whose_date_and_signature_are_unknown_still_carries_its_tag() {
    let fake = Fake::serving(vec![Row {
        release_tag: Some("v0.1.0".into()),
        ..bare()
    }]);
    let (_, body) = get_json(&served_by(&fake), "/v1/tools/good/history").await;
    assert_eq!(
        body["points"][0]["release"],
        json!({ "tag": "v0.1.0", "publishedAt": null, "signed": null })
    );
}

#[tokio::test]
async fn days_defaults_to_a_year_and_is_passed_to_the_store() {
    let fake = Fake::serving(vec![]);
    let app = served_by(&fake);
    let (status, body) = get_json(&app, "/v1/tools/good/history").await;
    assert_eq!(status, StatusCode::OK);
    assert_eq!(body["points"], json!([]));
    get_json(&app, "/v1/tools/good/history?days=30").await;
    let asked: Vec<u16> = fake.asked().iter().map(|(_, days)| days.get()).collect();
    assert_eq!(asked, [365, 30]);
}

#[tokio::test]
async fn an_unknown_slug_is_a_404_without_querying_the_store() {
    let fake = Fake::serving(vec![released()]);
    let (status, body) = get_json(&served_by(&fake), "/v1/tools/nope/history").await;
    assert_eq!(status, StatusCode::NOT_FOUND);
    assert!(body["error"].is_string());
    assert!(fake.asked().is_empty());
}

#[tokio::test]
async fn days_out_of_range_or_not_a_number_is_a_400_without_querying_the_store() {
    let fake = Fake::serving(vec![released()]);
    let app = served_by(&fake);
    for days in ["0", "731", "-1", "abc", "", "1.5", "99999999999"] {
        let (status, body) = get_json(&app, &format!("/v1/tools/good/history?days={days}")).await;
        assert_eq!(status, StatusCode::BAD_REQUEST, "{days:?}");
        assert!(body["error"].is_string(), "{days:?}");
    }
    assert!(fake.asked().is_empty());
}

#[tokio::test]
async fn the_bounds_themselves_are_accepted() {
    let fake = Fake::serving(vec![]);
    let app = served_by(&fake);
    for days in [1, MAX_DAYS] {
        let (status, _) = get_json(&app, &format!("/v1/tools/good/history?days={days}")).await;
        assert_eq!(status, StatusCode::OK, "{days}");
    }
}

#[tokio::test]
async fn without_a_database_the_route_answers_503_with_the_error_shape() {
    let (status, body) = get_json(&app(History::disabled()), "/v1/tools/good/history").await;
    assert_eq!(status, StatusCode::SERVICE_UNAVAILABLE);
    assert!(body["error"].is_string());
}

#[tokio::test]
async fn a_database_that_does_not_answer_is_a_502_and_is_not_cached() {
    let fake = Fake::down();
    let (shared, store) = recording();
    let app = app(History::new(Box::new(Arc::clone(&fake)), shared));
    for _ in 0..2 {
        let (status, body) = get_json(&app, "/v1/tools/good/history").await;
        assert_eq!(status, StatusCode::BAD_GATEWAY);
        assert!(body["error"].is_string());
    }
    assert_eq!(fake.asked().len(), 2);
    assert!(store.written().is_empty());
}

#[tokio::test]
async fn a_series_is_shared_through_valkey_per_slug_and_window() {
    let fake = Fake::serving(vec![released()]);
    let (shared, store) = recording();
    let app = app(History::new(Box::new(Arc::clone(&fake)), shared));
    let (_, first) = get_json(&app, "/v1/tools/good/history?days=90").await;
    let (_, second) = get_json(&app, "/v1/tools/good/history?days=90").await;
    assert_eq!(first, second);
    assert_eq!(fake.asked().len(), 1);
    get_json(&app, "/v1/tools/good/history").await;
    assert_eq!(fake.asked().len(), 2);
    assert_eq!(
        store.written(),
        [
            Write {
                key: "aa:v1:history:good:90".into(),
                ttl: HISTORY_TTL,
            },
            Write {
                key: "aa:v1:history:good:365".into(),
                ttl: HISTORY_TTL,
            },
        ]
    );
}

#[test]
fn days_are_bounded_from_one_to_the_maximum() {
    assert_eq!(Days::new(0), None);
    assert_eq!(Days::new(1).map(Days::get), Some(1));
    assert_eq!(
        Days::new(u32::from(MAX_DAYS)).map(Days::get),
        Some(MAX_DAYS)
    );
    assert_eq!(Days::new(u32::from(MAX_DAYS) + 1), None);
    assert_eq!(Days::new(u32::MAX), None);
    assert_eq!(Days::default().get(), 365);
}
