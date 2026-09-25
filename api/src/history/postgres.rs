use std::time::Duration;

use sqlx::postgres::{PgPool, PgPoolOptions};

use super::{Days, Facts, Row};
use crate::cache::Answer;

const MAX_CONNECTIONS: u32 = 4;
const ACQUIRE_TIMEOUT: Duration = Duration::from_secs(3);

const DAILY: &str = "\
SELECT (day AT TIME ZONE 'UTC')::date AS day, stars, forks, open_issues, pushed_at, \
release_tag, release_published_at, signed \
FROM tool_facts_daily \
WHERE slug = $1 AND day > now() - make_interval(days => $2) \
ORDER BY day";

pub struct Postgres(PgPool);

impl Postgres {
    pub fn lazy(url: &str) -> Result<Self, sqlx::Error> {
        PgPoolOptions::new()
            .max_connections(MAX_CONNECTIONS)
            .acquire_timeout(ACQUIRE_TIMEOUT)
            .connect_lazy(url)
            .map(Self)
    }
}

impl Facts for Postgres {
    fn daily<'a>(&'a self, slug: &'a str, days: Days) -> Answer<'a, Vec<Row>, sqlx::Error> {
        Box::pin(
            sqlx::query_as(DAILY)
                .bind(slug)
                .bind(i32::from(days.get()))
                .fetch_all(&self.0),
        )
    }
}
