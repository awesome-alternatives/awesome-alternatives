use std::sync::Arc;
use std::time::Duration;

use moka::future::Cache;
use serde::Serialize;

use crate::readme;
use crate::upstream::{Advisory, Scorecard, Upstream};

const TTL: Duration = Duration::from_secs(12 * 3600);

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
    pub fn new(upstream: Upstream) -> Self {
        Self {
            upstream,
            readmes: cache(),
            security: cache(),
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

fn cache<V: Clone + Send + Sync + 'static>() -> Cache<String, V> {
    Cache::builder()
        .max_capacity(2_000)
        .time_to_live(TTL)
        .build()
}
