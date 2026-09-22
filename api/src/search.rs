use std::collections::HashMap;
use std::sync::Arc;
use std::time::Duration;

use moka::future::Cache;
use serde::Serialize;

use crate::catalog::Tool;
use crate::embedding::{Embedder, Vector};
use crate::filters::Filters;
use crate::interpret;
use crate::jev::JevClient;
use crate::lexical;
use crate::state::Loaded;
use crate::vocabulary::Vocabulary;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize)]
#[serde(rename_all = "lowercase")]
pub enum Interpreter {
    Local,
    Jev,
}

pub struct Interpretation {
    pub filters: Filters,
    pub interpreted_by: Interpreter,
    pub relevance: Option<HashMap<String, f32>>,
}

impl Interpretation {
    pub fn select<'a>(&self, tools: &'a [Tool]) -> Vec<&'a Tool> {
        let mut selected = self.filters.apply(tools);
        if let Some(relevance) = &self.relevance {
            if self.filters == Filters::default() {
                selected.retain(|t| relevance.contains_key(&t.slug));
            }
            let score = |t: &Tool| relevance.get(&t.slug).copied().unwrap_or(f32::MIN);
            selected.sort_by(|a, b| score(b).total_cmp(&score(a)));
        }
        selected
    }
}

pub struct Search {
    jev: Option<JevClient>,
    embedder: Option<Arc<dyn Embedder>>,
    cache: Cache<String, Filters>,
}

impl Search {
    pub fn new(jev: Option<JevClient>, embedder: Option<Arc<dyn Embedder>>) -> Self {
        Self {
            jev,
            embedder,
            cache: Cache::builder()
                .max_capacity(10_000)
                .time_to_live(Duration::from_secs(24 * 3600))
                .build(),
        }
    }

    pub fn embedder(&self) -> Option<Arc<dyn Embedder>> {
        self.embedder.clone()
    }

    pub async fn interpret(&self, query: &str, loaded: &Loaded) -> Interpretation {
        let mut filters = lexical::interpret(query, &loaded.vocabulary);
        let vector = self.embed_query(query, loaded).await;
        if filters.replaces.is_none() {
            filters.replaces = loaded
                .index
                .as_ref()
                .zip(vector.as_ref())
                .and_then(|(index, v)| index.target(v));
        }

        let mut interpreted_by = Interpreter::Local;
        if filters.replaces.is_none()
            && let Some(jev) = self.ask_jev(query, &loaded.vocabulary).await
        {
            filters = Filters {
                language: filters.language.or(jev.language),
                license: filters.license.or(jev.license),
                ..jev
            };
            interpreted_by = Interpreter::Jev;
        }

        let relevance = match (&filters.replaces, &loaded.index, &vector) {
            (None, Some(index), Some(v)) => Some(index.relevance(v)),
            _ => None,
        };
        Interpretation {
            filters,
            interpreted_by,
            relevance,
        }
    }

    async fn embed_query(&self, query: &str, loaded: &Loaded) -> Option<Vector> {
        loaded.index.as_ref()?;
        let embedder = self.embedder()?;
        let text = query.to_owned();
        match tokio::task::spawn_blocking(move || embedder.embed(&[text])).await {
            Ok(Ok(mut vectors)) => vectors.pop(),
            Ok(Err(error)) => {
                tracing::warn!(%error, "could not embed the query, using keywords only");
                None
            }
            Err(error) => {
                tracing::warn!(%error, "the embedding task failed, using keywords only");
                None
            }
        }
    }

    async fn ask_jev(&self, query: &str, vocabulary: &Vocabulary) -> Option<Filters> {
        let jev = self.jev.as_ref()?;
        let key = lexical::normalize(query);
        if let Some(filters) = self.cache.get(&key).await {
            return Some(filters);
        }
        match jev
            .system_one(query, &interpret::questions(query, vocabulary))
            .await
        {
            Ok(answers) => {
                let filters = interpret::filters(&answers, vocabulary);
                self.cache.insert(key, filters.clone()).await;
                Some(filters)
            }
            Err(error) => {
                tracing::warn!(%error, "Jev is unavailable, keeping the local interpretation");
                None
            }
        }
    }

    pub fn forget(&self) {
        self.cache.invalidate_all();
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::catalog::{Catalog, Fit};
    use crate::embedding::fake::{Broken, Words};
    use crate::fixtures::tool;

    fn catalog() -> Catalog {
        let mut semantic_release = tool("semantic-release", "JavaScript", "MIT", &[], 1);
        semantic_release.repo.description =
            Some("Fully automated version management and package publishing".into());
        let mut knope = tool(
            "knope",
            "Rust",
            "MIT",
            &[("semantic-release", Fit::Full)],
            1,
        );
        knope.repo.description = Some("Automated version management for any project".into());
        let mut cliff = tool("git-cliff", "Rust", "Apache-2.0", &[], 1);
        cliff.repo.description = Some("Highly customizable changelog generator".into());
        Catalog {
            tools: vec![semantic_release, knope, cliff],
        }
    }

    fn with(embedder: Option<Arc<dyn Embedder>>) -> (Search, Loaded) {
        let loaded = Loaded::new(catalog(), embedder.as_deref());
        (Search::new(None, embedder), loaded)
    }

    #[tokio::test]
    async fn an_explicit_name_is_read_without_the_model() {
        let (search, loaded) = with(None);
        let read = search.interpret("semantic-release in rust", &loaded).await;
        assert_eq!(read.filters.replaces.as_deref(), Some("semantic-release"));
        assert_eq!(read.filters.language.as_deref(), Some("Rust"));
        assert_eq!(read.interpreted_by, Interpreter::Local);
        assert!(read.relevance.is_none());
    }

    #[tokio::test]
    async fn a_description_of_the_job_is_matched_by_the_model() {
        let (search, loaded) = with(Some(Arc::new(Words)));
        let read = search
            .interpret("fully automated version management", &loaded)
            .await;
        assert_eq!(read.filters.replaces.as_deref(), Some("semantic-release"));
        assert!(read.relevance.is_none());
    }

    #[tokio::test]
    async fn without_a_target_results_are_ranked_by_relevance() {
        let (search, loaded) = with(Some(Arc::new(Words)));
        let read = search.interpret("changelog generator", &loaded).await;
        assert_eq!(read.filters.replaces, None);
        let relevance = read.relevance.unwrap();
        assert!(relevance.contains_key("git-cliff"));
        assert!(!relevance.contains_key("knope"));
    }

    #[tokio::test]
    async fn relevance_narrows_an_open_query_but_only_reorders_a_filtered_one() {
        let (search, loaded) = with(Some(Arc::new(Words)));
        let tools = &loaded.catalog.tools;
        let slugs = |read: &Interpretation| {
            read.select(tools)
                .into_iter()
                .map(|t| t.slug.as_str())
                .collect::<Vec<_>>()
        };
        let open = search.interpret("changelog generator", &loaded).await;
        assert_eq!(slugs(&open), ["git-cliff"]);
        let in_rust = search.interpret("rust changelog generator", &loaded).await;
        assert_eq!(slugs(&in_rust), ["git-cliff", "knope"]);
    }

    #[tokio::test]
    async fn a_broken_model_degrades_to_keywords() {
        let (search, loaded) = with(Some(Arc::new(Broken)));
        assert!(loaded.index.is_none());
        let read = search.interpret("semantic-release in rust", &loaded).await;
        assert_eq!(read.filters.replaces.as_deref(), Some("semantic-release"));
        assert!(read.relevance.is_none());
    }
}
