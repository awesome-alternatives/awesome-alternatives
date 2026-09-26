use std::collections::HashSet;
use std::num::NonZeroU32;
use std::sync::{Arc, Condvar, Mutex};
use std::time::Duration;

use governor::{Quota, RateLimiter};

use super::*;
use crate::cache::Shared;
use crate::catalog::{Catalog, Fit, Tool};
use crate::details::{self, Details};
use crate::embedding::fake::Words;
use crate::embedding::{BATCH, EmbedError, Embedder, Thresholds, Vector};
use crate::fixtures::{refresh_off, tool};
use crate::search::{self, Search};
use crate::upstream::Upstream;

const RELEASES: &str = "Fully automated version management and package publishing";

fn described(slug: &str, replaces: &[(&str, Fit)], description: &str) -> Tool {
    let mut tool = tool(slug, "Rust", "MIT", replaces, 1);
    tool.repo.description = Some(description.into());
    tool
}

fn catalog(revision: &str, tools: Vec<Tool>) -> Catalog {
    Catalog {
        revision: revision.into(),
        products: vec![],
        categories: Default::default(),
        tools,
    }
}

fn releases(revision: &str, semantic_release: &str) -> Catalog {
    catalog(
        revision,
        vec![
            described("semantic-release", &[], semantic_release),
            described(
                "knope",
                &[("semantic-release", Fit::Full)],
                "Automated version management for any project",
            ),
            described("git-cliff", &[], "Highly customizable changelog generator"),
        ],
    )
}

fn state(loaded: Loaded, model: Arc<dyn Embedder>) -> AppState {
    let per_minute = || RateLimiter::keyed(Quota::per_minute(NonZeroU32::new(100).unwrap()));
    AppState::new(
        loaded,
        Search::new(
            None,
            Some(model),
            search::CACHE_BYTES,
            Arc::new(Shared::disabled()),
        ),
        Details::new(
            Upstream::new(
                reqwest::Client::new(),
                "http://127.0.0.1:9",
                "http://127.0.0.1:9",
                None,
            ),
            details::CACHE_BYTES,
            Arc::new(Shared::disabled()),
        ),
        per_minute(),
        per_minute(),
        false,
        refresh_off(),
    )
}

#[derive(Default)]
struct Counting(Mutex<Vec<String>>);

impl Counting {
    fn take(&self) -> Vec<String> {
        std::mem::take(&mut self.0.lock().unwrap())
    }
}

impl Embedder for Counting {
    fn embed(&self, texts: &[String]) -> Result<Vec<Vector>, EmbedError> {
        self.0.lock().unwrap().extend_from_slice(texts);
        Words.embed(texts)
    }

    fn thresholds(&self) -> Thresholds {
        Words.thresholds()
    }
}

#[tokio::test]
async fn a_reload_of_the_same_revision_neither_embeds_nor_forgets_a_search() {
    let model = Arc::new(Counting::default());
    let state = state(
        Loaded::new(releases("one", RELEASES), Some(&Words)),
        model.clone(),
    );
    let loaded = state.loaded();
    state.search.interpret("changelog generator", &loaded).await;
    assert_eq!(model.take().len(), 1);

    assert_eq!(
        state.replace(releases("one", RELEASES)).await,
        Reload::Unchanged
    );
    assert!(Arc::ptr_eq(&loaded, &state.loaded()));
    state
        .search
        .interpret("changelog generator", &state.loaded())
        .await;
    assert_eq!(model.take(), Vec::<String>::new());
}

#[tokio::test]
async fn a_changed_catalog_embeds_each_new_text_once_and_reuses_the_rest() {
    let model = Arc::new(Counting::default());
    let state = state(Loaded::new(catalog("empty", vec![]), None), model.clone());

    assert_eq!(
        state.replace(releases("one", RELEASES)).await,
        Reload::Rebuilt
    );
    let first = model.take();
    assert_eq!(
        first.len(),
        3,
        "semantic-release is a target and a tool: {first:?}"
    );
    assert_eq!(first.iter().collect::<HashSet<_>>().len(), 3);

    let rewritten = "Release automation driven by commit messages";
    assert_eq!(
        state.replace(releases("two", rewritten)).await,
        Reload::Rebuilt
    );
    let second = model.take();
    assert_eq!(second.len(), 1, "{second:?}");
    assert!(second[0].contains(rewritten));

    let loaded = state.loaded();
    let read = state
        .search
        .interpret("release automation driven by commit messages", &loaded)
        .await;
    assert_eq!(read.filters.replaces.as_deref(), Some("semantic-release"));
    let read = state
        .search
        .interpret("customizable changelog generator", &loaded)
        .await;
    let relevance = read
        .relevance
        .expect("a reading without a target keeps its scores");
    assert!(relevance.contains_key("git-cliff"), "{relevance:?}");
    assert!(!relevance.contains_key("semantic-release"), "{relevance:?}");
}

#[derive(Default)]
struct Passage {
    tickets: usize,
    calls: Vec<Vec<String>>,
    inside: usize,
    overlapped: bool,
}

#[derive(Default)]
struct Gate {
    passage: Mutex<Passage>,
    changed: Condvar,
}

impl Gate {
    fn admit(&self, count: usize) {
        self.passage.lock().unwrap().tickets += count;
        self.changed.notify_all();
    }

    fn calls(&self) -> Vec<Vec<String>> {
        self.passage.lock().unwrap().calls.clone()
    }

    async fn reached(&self, count: usize) {
        tokio::time::timeout(Duration::from_secs(5), async {
            while self.calls().len() < count {
                tokio::time::sleep(Duration::from_millis(1)).await;
            }
        })
        .await
        .expect("the model was never reached");
    }
}

impl Embedder for Gate {
    fn embed(&self, texts: &[String]) -> Result<Vec<Vector>, EmbedError> {
        let mut passage = self.passage.lock().unwrap();
        passage.calls.push(texts.to_vec());
        passage.inside += 1;
        passage.overlapped |= passage.inside > 1;
        let (mut passage, _) = self
            .changed
            .wait_timeout_while(passage, Duration::from_secs(5), |p| p.tickets == 0)
            .unwrap();
        passage.tickets = passage.tickets.saturating_sub(1);
        passage.inside -= 1;
        drop(passage);
        Words.embed(texts)
    }

    fn thresholds(&self) -> Thresholds {
        Words.thresholds()
    }
}

fn numbered(revision: &str, wording: &str) -> Catalog {
    let tools = (0..2 * BATCH.get() + 8)
        .map(|i| described(&format!("tool-{i}"), &[], &format!("{wording} tool {i}")))
        .collect();
    catalog(revision, tools)
}

#[tokio::test]
async fn a_search_during_a_rebuild_gets_the_model_between_two_batches() {
    let gate = Arc::new(Gate::default());
    let state = state(
        Loaded::new(numbered("one", "first"), Some(&Words)),
        gate.clone(),
    );
    let rebuild = tokio::spawn({
        let state = state.clone();
        async move { state.replace(numbered("two", "second")).await }
    });
    gate.reached(1).await;
    assert_eq!(state.quiescence().reason, Reason::Indexing);

    let query = "a query nobody asked before";
    let search = tokio::spawn({
        let state = state.clone();
        async move {
            let loaded = state.loaded();
            state.search.interpret(query, &loaded).await
        }
    });
    for _ in 0..16 {
        tokio::task::yield_now().await;
    }
    gate.admit(1);
    gate.reached(2).await;
    assert_eq!(gate.calls()[1], vec![query.to_owned()]);
    gate.admit(1);
    search.await.unwrap();
    assert!(
        !rebuild.is_finished(),
        "the search waited for the whole pass"
    );
    assert_eq!(state.quiescence().reason, Reason::Indexing);

    gate.admit(usize::MAX / 2);
    assert_eq!(rebuild.await.unwrap(), Reload::Rebuilt);
    let calls = gate.calls();
    assert!(calls.iter().all(|call| call.len() <= BATCH.get()));
    assert_eq!(calls.len(), 4);
    assert!(!gate.passage.lock().unwrap().overlapped);
    assert_eq!(state.quiescence().reason, Reason::Idle);
}
