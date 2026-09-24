use std::sync::Arc;

use moka::future::Cache;
use serde::de::DeserializeOwned;
use serde::{Deserialize, Serialize};

use crate::cache::{DETAILS_TTL, Shared};
use crate::readme;
use crate::upstream::{Advisory, Check, Scorecard, Upstream};

pub const CACHE_BYTES: u64 = 64 * 1024 * 1024;

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Readme {
    pub html: Option<String>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Security {
    pub scorecard: Option<Scorecard>,
    pub advisories: Vec<Advisory>,
}

pub type UpstreamError = Arc<reqwest::Error>;

pub struct Details {
    upstream: Upstream,
    shared: Arc<Shared>,
    readmes: Cache<String, Readme>,
    security: Cache<String, Security>,
}

impl Details {
    pub fn new(upstream: Upstream, cache_bytes: u64, shared: Arc<Shared>) -> Self {
        let half = cache_bytes / 2;
        Self {
            upstream,
            shared,
            readmes: cache(half),
            security: cache(half),
        }
    }

    pub async fn readme(&self, full_name: &str) -> Result<Readme, UpstreamError> {
        self.layered(&self.readmes, "readme", full_name, async {
            let html = self.upstream.readme_html(full_name).await?;
            Ok(Readme {
                html: html.map(|h| readme::sanitize(&h, full_name)),
            })
        })
        .await
    }

    pub async fn security(&self, full_name: &str) -> Result<Security, UpstreamError> {
        self.layered(&self.security, "security", full_name, async {
            let (scorecard, advisories) = tokio::try_join!(
                self.upstream.scorecard(full_name),
                self.upstream.advisories(full_name)
            )?;
            Ok(Security {
                scorecard,
                advisories,
            })
        })
        .await
    }

    async fn layered<V>(
        &self,
        memory: &Cache<String, V>,
        kind: &str,
        full_name: &str,
        fetch: impl Future<Output = Result<V, reqwest::Error>>,
    ) -> Result<V, UpstreamError>
    where
        V: Clone + DeserializeOwned + Send + Serialize + Sync + 'static,
    {
        memory
            .try_get_with(full_name.to_owned(), async {
                self.shared
                    .through(&key(kind, full_name), self.shared.ttl.details, fetch)
                    .await
            })
            .await
    }
}

fn key(kind: &str, full_name: &str) -> String {
    crate::cache::key(&[kind, full_name])
}

trait Weight {
    fn bytes(&self) -> usize;
}

impl Weight for Readme {
    fn bytes(&self) -> usize {
        size_of::<Self>() + self.html.as_ref().map_or(0, String::len)
    }
}

impl Weight for Security {
    fn bytes(&self) -> usize {
        size_of::<Self>()
            + self.scorecard.as_ref().map_or(0, Weight::bytes)
            + self.advisories.iter().map(Weight::bytes).sum::<usize>()
    }
}

impl Weight for Scorecard {
    fn bytes(&self) -> usize {
        size_of::<Self>() + self.date.len() + self.checks.iter().map(Weight::bytes).sum::<usize>()
    }
}

impl Weight for Check {
    fn bytes(&self) -> usize {
        size_of::<Self>()
            + self.name.len()
            + self.reason.len()
            + self.url.as_ref().map_or(0, String::len)
    }
}

impl Weight for Advisory {
    fn bytes(&self) -> usize {
        size_of::<Self>()
            + self.ghsa_id.len()
            + self.cve_id.as_ref().map_or(0, String::len)
            + self.summary.len()
            + self.severity.as_ref().map_or(0, String::len)
            + self.published_at.as_ref().map_or(0, String::len)
            + self.url.len()
    }
}

fn cache<V: Weight + Clone + Send + Sync + 'static>(max_bytes: u64) -> Cache<String, V> {
    Cache::builder()
        .max_capacity(max_bytes)
        .weigher(|key: &String, value: &V| {
            u32::try_from(size_of::<String>() + key.len() + value.bytes()).unwrap_or(u32::MAX)
        })
        .time_to_live(DETAILS_TTL)
        .build()
}

#[cfg(test)]
mod tests {
    use std::sync::atomic::{AtomicUsize, Ordering};

    use axum::http::StatusCode;
    use axum::routing::get;
    use axum::{Json, Router};
    use serde_json::json;

    use super::*;
    use crate::cache::fake::{Write, recording};

    fn readme(bytes: usize) -> Readme {
        Readme {
            html: Some("x".repeat(bytes)),
        }
    }

    #[test]
    fn a_readme_weighs_at_least_the_html_it_holds() {
        assert!(readme(100_000).bytes() >= 100_000);
        assert!(Readme { html: None }.bytes() < 100);
    }

    #[test]
    fn security_weighs_every_string_it_holds() {
        let security = Security {
            scorecard: Some(Scorecard {
                score: 7.5,
                date: "2026-09-22".into(),
                checks: vec![Check {
                    name: "Binary-Artifacts".into(),
                    score: Some(10),
                    reason: "x".repeat(5_000),
                    url: None,
                }],
            }),
            advisories: vec![Advisory {
                ghsa_id: "GHSA-0000".into(),
                cve_id: None,
                summary: "y".repeat(3_000),
                severity: Some("high".into()),
                published_at: None,
                url: "https://example.invalid".into(),
            }],
        };
        assert!(security.bytes() >= 8_000);
    }

    #[derive(Default)]
    struct Hits {
        readme: AtomicUsize,
        security: AtomicUsize,
    }

    impl Hits {
        fn readme(&self) -> usize {
            self.readme.load(Ordering::SeqCst)
        }

        fn security(&self) -> usize {
            self.security.load(Ordering::SeqCst)
        }
    }

    async fn github(hits: Arc<Hits>) -> Upstream {
        let readme = Arc::clone(&hits);
        let scorecard = Arc::clone(&hits);
        let app = Router::new()
            .route(
                "/repos/{owner}/{repo}/readme",
                get(move || {
                    let hits = Arc::clone(&readme);
                    async move {
                        hits.readme.fetch_add(1, Ordering::SeqCst);
                        "<p>hello</p>"
                    }
                }),
            )
            .route(
                "/repos/{owner}/{repo}/security-advisories",
                get(move || {
                    let hits = Arc::clone(&hits);
                    async move {
                        hits.security.fetch_add(1, Ordering::SeqCst);
                        Json(json!([{
                            "ghsa_id": "GHSA-0000",
                            "cve_id": null,
                            "summary": "a hole",
                            "severity": "high",
                            "published_at": null,
                            "html_url": "https://example.invalid/advisory"
                        }]))
                    }
                }),
            )
            .route(
                "/projects/github.com/{owner}/{repo}",
                get(move || {
                    let hits = Arc::clone(&scorecard);
                    async move {
                        hits.security.fetch_add(1, Ordering::SeqCst);
                        Json(json!({
                            "score": 7.5,
                            "date": "2026-09-22",
                            "checks": [{ "name": "Binary-Artifacts", "score": 10, "reason": "none found" }]
                        }))
                    }
                }),
            );
        let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
        let base = format!("http://{}", listener.local_addr().unwrap());
        tokio::spawn(async move { axum::serve(listener, app).await.unwrap() });
        Upstream::new(reqwest::Client::new(), &base, &base, None)
    }

    async fn advisories_answering(status: StatusCode, hits: Arc<Hits>) -> Upstream {
        let app = Router::new()
            .route(
                "/repos/{owner}/{repo}/security-advisories",
                get(move || {
                    let hits = Arc::clone(&hits);
                    async move {
                        hits.security.fetch_add(1, Ordering::SeqCst);
                        status
                    }
                }),
            )
            .route(
                "/projects/github.com/{owner}/{repo}",
                get(|| async { Json(json!({ "score": 7.5, "date": "2026-09-22", "checks": [] })) }),
            );
        let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
        let base = format!("http://{}", listener.local_addr().unwrap());
        tokio::spawn(async move { axum::serve(listener, app).await.unwrap() });
        Upstream::new(reqwest::Client::new(), &base, &base, None)
    }

    fn unreachable() -> Upstream {
        Upstream::new(
            reqwest::Client::new(),
            "http://127.0.0.1:9",
            "http://127.0.0.1:9",
            None,
        )
    }

    #[tokio::test]
    async fn a_readme_fetched_upstream_is_shared_under_a_versioned_key_with_the_details_ttl() {
        let (shared, store) = recording();
        let hits = Arc::new(Hits::default());
        let details = Details::new(github(Arc::clone(&hits)).await, CACHE_BYTES, shared);
        let readme = details.readme("example/good").await.unwrap();
        assert_eq!(readme.html.as_deref(), Some("<p>hello</p>"));
        assert_eq!(hits.readme(), 1);
        assert_eq!(
            store.written(),
            [Write {
                key: "aa:v1:readme:example/good".into(),
                ttl: DETAILS_TTL
            }]
        );
    }

    #[tokio::test]
    async fn a_security_report_is_shared_under_its_own_key_with_the_same_details_ttl() {
        let (shared, store) = recording();
        let hits = Arc::new(Hits::default());
        let details = Details::new(github(Arc::clone(&hits)).await, CACHE_BYTES, shared);
        let security = details.security("example/good").await.unwrap();
        assert_eq!(security.scorecard.map(|s| s.score), Some(7.5));
        assert_eq!(security.advisories.len(), 1);
        assert_eq!(hits.security(), 2);
        assert_eq!(
            store.written(),
            [Write {
                key: "aa:v1:security:example/good".into(),
                ttl: DETAILS_TTL
            }]
        );
    }

    #[tokio::test]
    async fn a_cold_process_reads_the_readme_from_the_shared_cache_instead_of_github() {
        let (shared, _store) = recording();
        let hits = Arc::new(Hits::default());
        let warm = Details::new(
            github(Arc::clone(&hits)).await,
            CACHE_BYTES,
            Arc::clone(&shared),
        );
        warm.readme("example/good").await.unwrap();

        let cold = Details::new(unreachable(), CACHE_BYTES, shared);
        let readme = cold.readme("example/good").await.unwrap();
        assert_eq!(readme.html.as_deref(), Some("<p>hello</p>"));
        assert_eq!(hits.readme(), 1);
    }

    #[tokio::test]
    async fn a_cold_process_reads_the_security_report_from_the_shared_cache_too() {
        let (shared, _store) = recording();
        let hits = Arc::new(Hits::default());
        let warm = Details::new(
            github(Arc::clone(&hits)).await,
            CACHE_BYTES,
            Arc::clone(&shared),
        );
        warm.security("example/good").await.unwrap();

        let cold = Details::new(unreachable(), CACHE_BYTES, shared);
        let security = cold.security("example/good").await.unwrap();
        assert_eq!(security.advisories.len(), 1);
        assert_eq!(hits.security(), 2);
    }

    #[tokio::test]
    async fn an_upstream_security_failure_is_never_written_to_the_shared_cache() {
        let (shared, store) = recording();
        let details = Details::new(unreachable(), CACHE_BYTES, shared);
        assert!(details.security("example/good").await.is_err());
        assert!(store.written().is_empty());
    }

    #[tokio::test]
    async fn an_upstream_failure_is_never_written_to_the_shared_cache() {
        let (shared, store) = recording();
        let details = Details::new(unreachable(), CACHE_BYTES, shared);
        assert!(details.readme("example/good").await.is_err());
        assert!(store.written().is_empty());
    }

    #[tokio::test]
    async fn a_github_refusal_on_advisories_is_an_error_kept_out_of_both_cache_tiers() {
        for refusal in [StatusCode::FORBIDDEN, StatusCode::TOO_MANY_REQUESTS] {
            let (shared, store) = recording();
            let hits = Arc::new(Hits::default());
            let details = Details::new(
                advisories_answering(refusal, Arc::clone(&hits)).await,
                CACHE_BYTES,
                shared,
            );
            assert!(details.security("example/good").await.is_err(), "{refusal}");
            assert!(details.security("example/good").await.is_err(), "{refusal}");
            assert_eq!(hits.security(), 2, "{refusal}");
            assert!(store.written().is_empty(), "{refusal}");
        }
    }

    #[tokio::test]
    async fn advisories_github_does_not_find_are_an_empty_list_worth_caching() {
        let (shared, store) = recording();
        let hits = Arc::new(Hits::default());
        let details = Details::new(
            advisories_answering(StatusCode::NOT_FOUND, Arc::clone(&hits)).await,
            CACHE_BYTES,
            shared,
        );
        let security = details.security("example/good").await.unwrap();
        assert!(security.advisories.is_empty());
        details.security("example/good").await.unwrap();
        assert_eq!(hits.security(), 1);
        assert_eq!(store.written().len(), 1);
    }

    #[tokio::test]
    async fn the_cache_evicts_on_bytes_rather_than_on_entry_count() {
        let cache = cache::<Readme>(64 * 1024);
        for i in 0..64 {
            cache
                .insert(format!("owner/repo-{i}"), readme(4 * 1024))
                .await;
        }
        cache.run_pending_tasks().await;
        assert!(
            cache.weighted_size() <= 64 * 1024,
            "{}",
            cache.weighted_size()
        );
        assert!(cache.entry_count() < 64, "{}", cache.entry_count());
    }

    #[tokio::test]
    async fn an_entry_larger_than_the_limit_never_blows_the_limit() {
        let cache = cache::<Readme>(64 * 1024);
        cache.insert("owner/repo".into(), readme(1024 * 1024)).await;
        cache.run_pending_tasks().await;
        assert!(
            cache.weighted_size() <= 64 * 1024,
            "{}",
            cache.weighted_size()
        );
        assert!(cache.get("owner/repo").await.is_none());
    }
}
