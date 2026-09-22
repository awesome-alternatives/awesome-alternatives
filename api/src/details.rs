use std::sync::Arc;
use std::time::Duration;

use moka::future::Cache;
use serde::Serialize;

use crate::readme;
use crate::upstream::{Advisory, Check, Scorecard, Upstream};

const TTL: Duration = Duration::from_secs(12 * 3600);
pub const CACHE_BYTES: u64 = 64 * 1024 * 1024;

#[derive(Debug, Clone, Serialize)]
pub struct Readme {
    pub html: Option<String>,
}

#[derive(Debug, Clone, Serialize)]
pub struct Security {
    pub scorecard: Option<Scorecard>,
    pub advisories: Vec<Advisory>,
}

pub type UpstreamError = Arc<reqwest::Error>;

pub struct Details {
    upstream: Upstream,
    readmes: Cache<String, Readme>,
    security: Cache<String, Security>,
}

impl Details {
    pub fn new(upstream: Upstream, cache_bytes: u64) -> Self {
        let half = cache_bytes / 2;
        Self {
            upstream,
            readmes: cache(half),
            security: cache(half),
        }
    }

    pub async fn readme(&self, full_name: &str) -> Result<Readme, UpstreamError> {
        self.readmes
            .try_get_with(full_name.to_owned(), async {
                let html = self.upstream.readme_html(full_name).await?;
                Ok::<_, reqwest::Error>(Readme {
                    html: html.map(|h| readme::sanitize(&h, full_name)),
                })
            })
            .await
    }

    pub async fn security(&self, full_name: &str) -> Result<Security, UpstreamError> {
        self.security
            .try_get_with(full_name.to_owned(), async {
                let (scorecard, advisories) = tokio::try_join!(
                    self.upstream.scorecard(full_name),
                    self.upstream.advisories(full_name)
                )?;
                Ok::<_, reqwest::Error>(Security {
                    scorecard,
                    advisories,
                })
            })
            .await
    }
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
        .time_to_live(TTL)
        .build()
}

#[cfg(test)]
mod tests {
    use super::*;

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
