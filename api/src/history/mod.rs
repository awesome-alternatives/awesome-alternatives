mod postgres;
#[cfg(test)]
mod tests;

use std::fmt;
use std::sync::Arc;

use serde::{Deserialize, Serialize};
use time::{Date, OffsetDateTime};

use crate::cache::{self, Answer, Shared};
pub use postgres::Postgres;

pub const DEFAULT_DAYS: u16 = 365;
pub const MAX_DAYS: u16 = 730;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Days(u16);

impl Days {
    pub fn new(days: u32) -> Option<Self> {
        u16::try_from(days)
            .ok()
            .filter(|days| (1..=MAX_DAYS).contains(days))
            .map(Self)
    }

    pub fn get(self) -> u16 {
        self.0
    }
}

impl Default for Days {
    fn default() -> Self {
        Self(DEFAULT_DAYS)
    }
}

impl fmt::Display for Days {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        self.0.fmt(f)
    }
}

#[derive(Debug, Clone, PartialEq, sqlx::FromRow)]
pub struct Row {
    pub day: Date,
    pub stars: i32,
    pub forks: i32,
    pub open_issues: Option<i32>,
    pub pushed_at: Option<OffsetDateTime>,
    pub release_tag: Option<String>,
    pub release_published_at: Option<OffsetDateTime>,
    pub signed: Option<bool>,
}

pub trait Facts: Send + Sync {
    fn daily<'a>(&'a self, slug: &'a str, days: Days) -> Answer<'a, Vec<Row>, sqlx::Error>;
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Series {
    pub slug: String,
    pub points: Vec<Point>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Point {
    pub day: Date,
    pub stars: i32,
    pub forks: i32,
    pub open_issues: Option<i32>,
    #[serde(with = "time::serde::rfc3339::option")]
    pub pushed_at: Option<OffsetDateTime>,
    pub release: Option<Release>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Release {
    pub tag: String,
    #[serde(with = "time::serde::rfc3339::option")]
    pub published_at: Option<OffsetDateTime>,
    pub signed: Option<bool>,
}

impl From<Row> for Point {
    fn from(row: Row) -> Self {
        Self {
            day: row.day,
            stars: row.stars,
            forks: row.forks,
            open_issues: row.open_issues,
            pushed_at: row.pushed_at,
            release: row.release_tag.map(|tag| Release {
                tag,
                published_at: row.release_published_at,
                signed: row.signed,
            }),
        }
    }
}

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("DATABASE_URL is not set")]
    Unconfigured,
    #[error("{0}")]
    Database(#[from] sqlx::Error),
}

pub struct History {
    facts: Option<Box<dyn Facts>>,
    shared: Arc<Shared>,
}

impl History {
    pub fn new(facts: Box<dyn Facts>, shared: Arc<Shared>) -> Self {
        Self {
            facts: Some(facts),
            shared,
        }
    }

    pub fn disabled() -> Self {
        Self {
            facts: None,
            shared: Arc::new(Shared::disabled()),
        }
    }

    pub async fn series(&self, slug: &str, days: Days) -> Result<Series, Error> {
        let facts = self.facts.as_deref().ok_or(Error::Unconfigured)?;
        let key = cache::key(&["history", slug, &days.to_string()]);
        self.shared
            .through(&key, self.shared.ttl.history, async {
                let rows = facts.daily(slug, days).await?;
                Ok(Series {
                    slug: slug.to_owned(),
                    points: rows.into_iter().map(Point::from).collect(),
                })
            })
            .await
    }
}
