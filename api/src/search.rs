use std::collections::HashMap;
use std::sync::Arc;
use std::time::Duration;

use moka::future::Cache;
use serde::{Deserialize, Serialize};

use crate::cache::Shared;
use crate::catalog::Tool;
use crate::embedding::{Embedder, Vector};
use crate::filters::Filters;
use crate::interpret;
use crate::jev::JevClient;
use crate::lexical;
use crate::qualifiers::{self, Unchecked};
use crate::state::Loaded;
use crate::vocabulary::Vocabulary;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Deserialize, Serialize)]
#[serde(rename_all = "lowercase")]
pub enum Interpreter {
    Local,
    Jev,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Interpretation {
    pub filters: Filters,
    pub interpreted_by: Interpreter,
    pub relevance: Option<HashMap<String, f32>>,
    #[serde(default)]
    pub unchecked: Vec<Unchecked>,
}

impl Interpretation {
    pub fn select<'a>(&self, tools: &'a [Tool]) -> Vec<&'a Tool> {
        let mut selected = self.filters.apply(tools);
        if let Some(relevance) = &self.relevance {
            if !self.filters.names_a_scope() {
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
    shared: Arc<Shared>,
    cache: Cache<String, Interpretation>,
}

impl Search {
    pub fn new(
        jev: Option<JevClient>,
        embedder: Option<Arc<dyn Embedder>>,
        shared: Arc<Shared>,
    ) -> Self {
        Self {
            jev,
            embedder,
            shared,
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
        let normalized = lexical::normalize(query);
        if let Some(remembered) = self.cache.get(&normalized).await {
            return remembered;
        }
        let key = key(&loaded.catalog.revision, &normalized);
        let read = self
            .shared
            .remembered(&key, self.shared.ttl.search, self.read(query, loaded))
            .await;
        self.cache.insert(normalized, read.clone()).await;
        read
    }

    async fn read(&self, query: &str, loaded: &Loaded) -> Interpretation {
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

        let unchecked = qualifiers::apply(query, &mut filters);
        filters.capabilities = qualifiers::capabilities(query, &loaded.vocabulary);
        if let Some(category) = filters
            .replaces
            .as_deref()
            .and_then(|slug| category_of(slug, loaded))
        {
            filters.capabilities.retain(|c| {
                loaded
                    .vocabulary
                    .capabilities
                    .get(c)
                    .is_some_and(|w| w.category == category)
            });
        }
        let relevance = match (&filters.replaces, &loaded.index, &vector) {
            (None, Some(index), Some(v)) => Some(index.relevance(v)),
            _ => None,
        };
        Interpretation {
            filters,
            interpreted_by,
            relevance,
            unchecked,
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
        match jev
            .system_one(query, &interpret::questions(query, vocabulary))
            .await
        {
            Ok(answers) => Some(interpret::filters(&answers, vocabulary)),
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

fn category_of<'a>(slug: &str, loaded: &'a Loaded) -> Option<&'a str> {
    let catalog = &loaded.catalog;
    let tool = catalog
        .tools
        .iter()
        .find(|t| t.slug == slug)
        .map(|t| t.category.as_str());
    tool.or_else(|| {
        catalog
            .products
            .iter()
            .find(|p| p.slug == slug)
            .map(|p| p.category.as_str())
    })
}

fn key(revision: &str, normalized: &str) -> String {
    crate::cache::key(&["search", revision, normalized])
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::cache::fake::recording;
    use crate::cache::{SEARCH_TTL, Ttl, fake};
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
            revision: "rev-one".into(),
            products: vec![],
            categories: Default::default(),
            tools: vec![semantic_release, knope, cliff],
        }
    }

    fn with(embedder: Option<Arc<dyn Embedder>>) -> (Search, Loaded) {
        shared_with(embedder, Arc::new(Shared::disabled()))
    }

    fn shared_with(embedder: Option<Arc<dyn Embedder>>, shared: Arc<Shared>) -> (Search, Loaded) {
        let loaded = Loaded::new(catalog(), embedder.as_deref());
        (Search::new(None, embedder, shared), loaded)
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
    async fn qualifiers_survive_whichever_reader_found_the_target() {
        let (search, loaded) = with(Some(Arc::new(Words)));
        let read = search
            .interpret("self-hosted semantic-release that runs on linux", &loaded)
            .await;
        assert_eq!(read.filters.replaces.as_deref(), Some("semantic-release"));
        assert!(read.filters.self_host);
        assert_eq!(read.unchecked.len(), 1);
    }

    #[tokio::test]
    async fn a_qualifier_alone_still_lets_relevance_narrow_an_open_query() {
        let (search, loaded) = with(Some(Arc::new(Words)));
        let tools = &loaded.catalog.tools;
        let read = search
            .interpret("maintained changelog generator", &loaded)
            .await;
        assert!(read.filters.maintained);
        let slugs: Vec<_> = read
            .select(tools)
            .into_iter()
            .map(|t| t.slug.as_str())
            .collect();
        assert_eq!(slugs, ["git-cliff"]);
    }

    #[tokio::test]
    async fn an_interpretation_is_shared_under_a_key_carrying_the_version_and_the_revision() {
        let (shared, store) = recording();
        let (search, loaded) = shared_with(Some(Arc::new(Words)), shared);
        search.interpret("changelog generator", &loaded).await;
        let written = store.written();
        assert_eq!(written.len(), 1);
        assert_eq!(written[0].key, "aa:v1:search:rev-one:changelog generator");
        assert_eq!(written[0].ttl, SEARCH_TTL);
    }

    #[tokio::test]
    async fn a_process_without_a_model_reuses_the_shared_interpretation() {
        let (shared, _store) = recording();
        let query = "fully automated version management";
        let (warm, loaded) = shared_with(Some(Arc::new(Words)), Arc::clone(&shared));
        assert_eq!(
            warm.interpret(query, &loaded)
                .await
                .filters
                .replaces
                .as_deref(),
            Some("semantic-release")
        );

        let (cold, mut without_model) = shared_with(None, shared);
        assert!(without_model.index.is_none());
        assert_eq!(
            cold.interpret(query, &without_model)
                .await
                .filters
                .replaces
                .as_deref(),
            Some("semantic-release")
        );

        without_model.catalog.revision = "rev-two".into();
        cold.forget();
        assert_eq!(
            cold.interpret(query, &without_model).await.filters.replaces,
            None
        );
    }

    #[tokio::test]
    async fn a_broken_shared_cache_still_answers_from_the_model() {
        let shared = Arc::new(Shared::new(
            Box::new(fake::Broken),
            Duration::from_millis(50),
            Ttl::default(),
        ));
        let (search, loaded) = shared_with(Some(Arc::new(Words)), shared);
        let read = search
            .interpret("fully automated version management", &loaded)
            .await;
        assert_eq!(read.filters.replaces.as_deref(), Some("semantic-release"));
    }

    #[tokio::test]
    async fn a_broken_model_degrades_to_keywords() {
        let (search, loaded) = with(Some(Arc::new(Broken)));
        assert!(loaded.index.is_none());
        let read = search.interpret("semantic-release in rust", &loaded).await;
        assert_eq!(read.filters.replaces.as_deref(), Some("semantic-release"));
        assert!(read.relevance.is_none());
    }

    fn real() -> Loaded {
        let catalog = Catalog::parse(include_str!("../../generated/catalog.json")).unwrap();
        Loaded::new(catalog, None)
    }

    #[tokio::test]
    async fn leaving_gitlab_for_ci_and_a_registry_keeps_only_forges_that_declare_both() {
        let loaded = real();
        let search = Search::new(None, None, Arc::new(Shared::disabled()));
        let read = search
            .interpret(
                "I want to leave GitLab but I need CI/CD and a container registry",
                &loaded,
            )
            .await;
        assert_eq!(read.filters.replaces.as_deref(), Some("gitlab"));
        assert_eq!(read.filters.capabilities, ["ci", "container-registry"]);
        let slugs: Vec<_> = read
            .select(&loaded.catalog.tools)
            .into_iter()
            .map(|t| t.slug.as_str())
            .collect();
        assert!(!slugs.is_empty());
        for slug in &slugs {
            let tool = loaded
                .catalog
                .tools
                .iter()
                .find(|t| t.slug == *slug)
                .unwrap();
            assert!(
                tool.capabilities.contains_key("ci")
                    && tool.capabilities.contains_key("container-registry"),
                "{slug}"
            );
        }
    }

    #[tokio::test]
    async fn a_capability_from_another_category_than_the_target_is_dropped() {
        let loaded = real();
        let search = Search::new(None, None, Arc::new(Shared::disabled()));
        let read = search
            .interpret("jenkins alternative with a container registry", &loaded)
            .await;
        assert_eq!(read.filters.replaces.as_deref(), Some("jenkins"));
        assert!(read.filters.capabilities.is_empty());
    }
}
