use std::time::Duration;

use moka::future::Cache;
use serde::Serialize;

use crate::filters::Filters;
use crate::interpret;
use crate::jev::JevClient;
use crate::lexical;
use crate::vocabulary::Vocabulary;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize)]
#[serde(rename_all = "lowercase")]
pub enum Interpreter {
    Jev,
    Lexical,
}

pub struct Search {
    jev: Option<JevClient>,
    cache: Cache<String, Filters>,
}

impl Search {
    pub fn new(jev: Option<JevClient>) -> Self {
        Self {
            jev,
            cache: Cache::builder()
                .max_capacity(10_000)
                .time_to_live(Duration::from_secs(24 * 3600))
                .build(),
        }
    }

    pub async fn interpret(&self, query: &str, vocabulary: &Vocabulary) -> (Filters, Interpreter) {
        let Some(jev) = &self.jev else {
            return (lexical::interpret(query, vocabulary), Interpreter::Lexical);
        };
        let key = lexical::normalize(query);
        if let Some(filters) = self.cache.get(&key).await {
            return (filters, Interpreter::Jev);
        }
        match jev
            .system_one(query, &interpret::questions(query, vocabulary))
            .await
        {
            Ok(answers) => {
                let filters = interpret::filters(&answers, vocabulary);
                self.cache.insert(key, filters.clone()).await;
                (filters, Interpreter::Jev)
            }
            Err(error) => {
                tracing::warn!(%error, "Jev is unavailable, falling back to keyword search");
                (lexical::interpret(query, vocabulary), Interpreter::Lexical)
            }
        }
    }

    pub fn forget(&self) {
        self.cache.invalidate_all();
    }
}
