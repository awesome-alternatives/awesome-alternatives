use std::collections::HashMap;
use std::sync::Arc;

use moka::future::Cache;
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use tokio::sync::Mutex;

use crate::cache::Shared;
use crate::catalog::Tool;
use crate::embedding::{Embedder, Vector};
use crate::filters::Filters;
use crate::interpret;
use crate::jev_budget::MeteredJev;
use crate::lexical;
use crate::memory::{self, Weight};
use crate::qualifiers::{self, Unchecked};
use crate::state::Loaded;
use crate::vocabulary::Vocabulary;

pub const CACHE_BYTES: u64 = 32 * 1024 * 1024;

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

    fn worth_sharing(&self) -> bool {
        self.filters.replaces.is_some() || self.interpreted_by == Interpreter::Jev
    }
}

impl Weight for Interpretation {
    fn bytes(&self) -> usize {
        size_of::<Self>()
            + self.filters.bytes()
            + self.relevance.as_ref().map_or(0, |relevance| {
                relevance
                    .keys()
                    .map(|slug| size_of::<(String, f32)>() + slug.len())
                    .sum()
            })
            + self
                .unchecked
                .iter()
                .map(|u| size_of::<Unchecked>() + u.value.len())
                .sum::<usize>()
    }
}

impl Weight for Filters {
    fn bytes(&self) -> usize {
        let text = |value: &Option<String>| value.as_ref().map_or(0, String::len);
        text(&self.replaces)
            + text(&self.language)
            + text(&self.license)
            + text(&self.category)
            + self
                .capabilities
                .iter()
                .map(|c| size_of::<String>() + c.len())
                .sum::<usize>()
    }
}

pub struct Search {
    jev: Option<MeteredJev>,
    embedder: Option<Arc<dyn Embedder>>,
    shared: Arc<Shared>,
    cache: Cache<String, Interpretation>,
    model_turn: Arc<Mutex<()>>,
}

impl Search {
    pub fn new(
        jev: Option<MeteredJev>,
        embedder: Option<Arc<dyn Embedder>>,
        cache_bytes: u64,
        shared: Arc<Shared>,
    ) -> Self {
        Self {
            jev,
            embedder,
            cache: memory::cache(cache_bytes, shared.ttl.search),
            shared,
            model_turn: Arc::default(),
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
        let read = match self.shared.get(&key).await {
            Some(shared) => shared,
            None => {
                let fresh = self.read(query, loaded).await;
                if fresh.worth_sharing() {
                    self.shared.set(&key, &fresh, self.shared.ttl.search).await;
                }
                fresh
            }
        };
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
        let turn = Arc::clone(&self.model_turn).lock_owned().await;
        let text = query.to_owned();
        match tokio::task::spawn_blocking(move || {
            let _turn = turn;
            embedder.embed(&[text])
        })
        .await
        {
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
        let jev = self.jev.as_ref()?.admitted()?;
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
    let digest = hex::encode(Sha256::digest(normalized.as_bytes()));
    crate::cache::key(&["search", revision, &digest])
}

#[cfg(test)]
mod tests {
    use std::num::NonZeroU32;
    use std::sync::atomic::{AtomicUsize, Ordering};
    use std::time::Duration;

    use axum::routing::post;
    use axum::{Json, Router};
    use serde_json::json;

    use super::*;
    use crate::cache::fake::recording;
    use crate::cache::{SEARCH_TTL, Ttl, fake};
    use crate::catalog::{Catalog, Fit};
    use crate::embedding::fake::{Broken, Words};
    use crate::fixtures::tool;
    use crate::jev::JevClient;
    use crate::jev_budget::Limits;

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
        (Search::new(None, embedder, CACHE_BYTES, shared), loaded)
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
    async fn an_interpretation_is_shared_under_a_key_carrying_the_version_the_revision_and_a_digest()
     {
        let (shared, store) = recording();
        let (search, loaded) = shared_with(Some(Arc::new(Words)), shared);
        search
            .interpret("Fully automated, version management!", &loaded)
            .await;
        let written = store.written();
        assert_eq!(written.len(), 1);
        assert_eq!(
            written[0].key,
            "aa:v1:search:rev-one:654da1616560c0166059248d38206515edb1f7fff9e2147d7c19fa30d865d0e3"
        );
        assert_eq!(written[0].ttl, SEARCH_TTL);
    }

    #[test]
    fn a_search_key_has_a_fixed_length_and_never_carries_the_query() {
        let short = key("rev-one", "rust");
        let long = key("rev-one", &"semantic release written in rust ".repeat(9));
        assert_eq!(short.len(), long.len());
        for written in [&short, &long] {
            let digest = written
                .strip_prefix("aa:v1:search:rev-one:")
                .unwrap_or_else(|| panic!("{written}"));
            assert_eq!(digest.len(), 64, "{written}");
            assert!(digest.chars().all(|c| c.is_ascii_hexdigit()), "{written}");
        }
        assert!(
            !long.contains("semantic") && !long.contains("rust"),
            "{long}"
        );
    }

    async fn shared_key(query: &str) -> String {
        let (shared, store) = recording();
        let (search, loaded) = shared_with(None, shared);
        let read = search.interpret(query, &loaded).await;
        assert_eq!(read.filters.replaces.as_deref(), Some("semantic-release"));
        let written = store.written();
        assert_eq!(written.len(), 1, "{query}");
        written[0].key.clone()
    }

    #[tokio::test]
    async fn queries_that_normalise_the_same_share_a_key_and_different_ones_do_not() {
        let plain = shared_key("semantic-release in rust").await;
        assert_eq!(shared_key("  Semantic-Release, in RUST!  ").await, plain);
        assert_ne!(shared_key("semantic-release in go").await, plain);
    }

    #[tokio::test]
    async fn a_local_reading_without_a_target_stays_in_this_process() {
        let (shared, store) = recording();
        let (search, loaded) = shared_with(Some(Arc::new(Words)), shared);
        let read = search.interpret("changelog generator", &loaded).await;
        assert_eq!(read.filters.replaces, None);
        assert_eq!(read.interpreted_by, Interpreter::Local);
        assert!(store.written().is_empty());
        assert!(search.cache.get("changelog generator").await.is_some());
    }

    #[tokio::test]
    async fn the_in_process_cache_expires_on_the_configured_search_ttl() {
        let ttl = Ttl {
            search: Duration::from_millis(100),
            ..Ttl::default()
        };
        let shared = Arc::new(Shared::new(
            Box::new(fake::Broken),
            Duration::from_millis(50),
            ttl,
        ));
        let (search, loaded) = shared_with(None, shared);
        search.interpret("semantic-release in rust", &loaded).await;
        assert!(search.cache.get("semantic release in rust").await.is_some());
        tokio::time::sleep(Duration::from_millis(300)).await;
        assert!(search.cache.get("semantic release in rust").await.is_none());
    }

    fn ranked(tools: usize) -> Interpretation {
        Interpretation {
            filters: Filters::default(),
            interpreted_by: Interpreter::Local,
            relevance: Some(
                (0..tools)
                    .map(|i| (format!("a-tool-with-a-long-slug-{i}"), 0.5))
                    .collect(),
            ),
            unchecked: vec![],
        }
    }

    #[tokio::test]
    async fn the_in_process_cache_evicts_on_bytes_rather_than_on_entry_count() {
        let budget = 256 * 1024;
        let search = Search::new(None, None, budget, Arc::new(Shared::disabled()));
        for i in 0..64 {
            search.cache.insert(format!("query {i}"), ranked(500)).await;
        }
        search.cache.run_pending_tasks().await;
        assert!(
            search.cache.weighted_size() <= budget,
            "{}",
            search.cache.weighted_size()
        );
        assert!(
            search.cache.entry_count() < 64,
            "{}",
            search.cache.entry_count()
        );
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

    struct MockJev {
        base: String,
        calls: Arc<AtomicUsize>,
    }

    async fn mock_jev() -> MockJev {
        mock_jev_answering(json!({
            "target": { "type": "choice", "choice": "semantic-release", "confidence": 0.9 }
        }))
        .await
    }

    async fn mock_jev_answering(answers: serde_json::Value) -> MockJev {
        let calls = Arc::new(AtomicUsize::new(0));
        let counted = Arc::clone(&calls);
        let router = Router::new().route(
            "/v1/systemone",
            post(move || {
                let answers = answers.clone();
                async move {
                    counted.fetch_add(1, Ordering::SeqCst);
                    Json(json!({ "answers": answers }))
                }
            }),
        );
        let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
        let addr = listener.local_addr().unwrap();
        tokio::spawn(async move { axum::serve(listener, router).await.unwrap() });
        MockJev {
            base: format!("http://{addr}"),
            calls,
        }
    }

    fn metered(jev: &MockJev, per_minute: u32, per_day: u32) -> (Search, Loaded) {
        metered_sharing(jev, per_minute, per_day, Arc::new(Shared::disabled()))
    }

    fn metered_sharing(
        jev: &MockJev,
        per_minute: u32,
        per_day: u32,
        shared: Arc<Shared>,
    ) -> (Search, Loaded) {
        let embedder: Arc<dyn Embedder> = Arc::new(Words);
        let loaded = Loaded::new(catalog(), Some(embedder.as_ref()));
        let client = JevClient::new(
            reqwest::Client::new(),
            &jev.base,
            "k".into(),
            "jev-latest".into(),
        );
        let limits = Limits {
            per_minute: NonZeroU32::new(per_minute).unwrap(),
            per_day,
        };
        let search = Search::new(
            Some(MeteredJev::new(client, limits)),
            Some(embedder),
            CACHE_BYTES,
            shared,
        );
        (search, loaded)
    }

    fn slugs<'a>(read: &Interpretation, loaded: &'a Loaded) -> Vec<&'a str> {
        read.select(&loaded.catalog.tools)
            .into_iter()
            .map(|t| t.slug.as_str())
            .collect()
    }

    #[tokio::test]
    async fn a_query_the_local_steps_cannot_place_goes_to_jev_within_budget() {
        let jev = mock_jev().await;
        let (search, loaded) = metered(&jev, 10, 10);
        let read = search.interpret("changelog generator", &loaded).await;
        assert_eq!(read.interpreted_by, Interpreter::Jev);
        assert_eq!(read.filters.replaces.as_deref(), Some("semantic-release"));
        assert_eq!(jev.calls.load(Ordering::SeqCst), 1);
    }

    #[tokio::test]
    async fn a_reading_jev_paid_for_is_shared_even_without_a_target() {
        let jev = mock_jev_answering(json!({
            "language": { "type": "choice", "choice": "Rust", "confidence": 0.9 }
        }))
        .await;
        let (shared, store) = recording();
        let (search, loaded) = metered_sharing(&jev, 10, 10, shared);
        let read = search.interpret("changelog generator", &loaded).await;
        assert_eq!(read.interpreted_by, Interpreter::Jev);
        assert_eq!(read.filters.replaces, None);
        assert_eq!(read.filters.language.as_deref(), Some("Rust"));
        assert_eq!(store.written().len(), 1);
    }

    async fn assert_second_query_stays_local(per_minute: u32, per_day: u32) {
        let jev = mock_jev().await;
        let (search, loaded) = metered(&jev, per_minute, per_day);
        let first = search.interpret("changelog generator", &loaded).await;
        assert_eq!(first.interpreted_by, Interpreter::Jev);

        let second = search
            .interpret("customizable changelog generator", &loaded)
            .await;
        assert_eq!(second.interpreted_by, Interpreter::Local);
        assert_eq!(second.filters.replaces, None);
        assert_eq!(slugs(&second, &loaded), ["git-cliff"]);
        assert_eq!(jev.calls.load(Ordering::SeqCst), 1);
    }

    #[tokio::test]
    async fn past_the_process_wide_quota_search_answers_locally_without_calling_jev() {
        assert_second_query_stays_local(1, 100).await;
    }

    #[tokio::test]
    async fn past_the_daily_jev_budget_search_answers_locally_without_calling_jev() {
        assert_second_query_stays_local(100, 1).await;
    }

    #[tokio::test]
    async fn a_zero_daily_budget_keeps_keywords_and_the_local_model_but_never_calls_jev() {
        let jev = mock_jev().await;
        let (search, loaded) = metered(&jev, 100, 0);
        let named = search.interpret("semantic-release in rust", &loaded).await;
        assert_eq!(named.filters.replaces.as_deref(), Some("semantic-release"));
        let described = search.interpret("changelog generator", &loaded).await;
        assert_eq!(described.interpreted_by, Interpreter::Local);
        assert_eq!(slugs(&described, &loaded), ["git-cliff"]);
        assert_eq!(jev.calls.load(Ordering::SeqCst), 0);
    }

    fn real() -> Loaded {
        let catalog = Catalog::parse(include_str!("../../generated/catalog.json")).unwrap();
        Loaded::new(catalog, None)
    }

    #[tokio::test]
    async fn leaving_gitlab_for_ci_and_a_registry_keeps_only_forges_that_declare_both() {
        let loaded = real();
        let search = Search::new(None, None, CACHE_BYTES, Arc::new(Shared::disabled()));
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
        let search = Search::new(None, None, CACHE_BYTES, Arc::new(Shared::disabled()));
        let read = search
            .interpret("jenkins alternative with a container registry", &loaded)
            .await;
        assert_eq!(read.filters.replaces.as_deref(), Some("jenkins"));
        assert!(read.filters.capabilities.is_empty());
    }
}
