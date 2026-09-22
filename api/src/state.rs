use std::net::IpAddr;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::{Arc, RwLock};

use governor::DefaultKeyedRateLimiter;
use serde::Serialize;

use crate::catalog::Catalog;
use crate::details::Details;
use crate::embedding::Embedder;
use crate::search::Search;
use crate::semantic::Index;
use crate::vocabulary::Vocabulary;

pub struct Loaded {
    pub catalog: Catalog,
    pub vocabulary: Vocabulary,
    pub index: Option<Index>,
}

impl Loaded {
    pub fn new(catalog: Catalog, embedder: Option<&dyn Embedder>) -> Self {
        let vocabulary = Vocabulary::of(&catalog.tools);
        let index = embedder.and_then(|embedder| {
            Index::build(embedder, &catalog.tools, &vocabulary)
                .inspect_err(|error| {
                    tracing::warn!(%error, "semantic index unavailable, search uses keywords only");
                })
                .ok()
        });
        Self {
            catalog,
            vocabulary,
            index,
        }
    }

    pub async fn build(catalog: Catalog, embedder: Option<Arc<dyn Embedder>>) -> Self {
        tokio::task::spawn_blocking(move || Self::new(catalog, embedder.as_deref()))
            .await
            .expect("building the catalog index panicked")
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize)]
#[serde(rename_all = "lowercase")]
pub enum Reason {
    Idle,
    Starting,
    Indexing,
    Requests,
}

#[derive(Debug, Clone, Copy, Serialize)]
pub struct Quiescence {
    pub alive: bool,
    pub ready: bool,
    pub safe: bool,
    pub reason: Reason,
}

#[derive(Default, Clone)]
pub struct Activity {
    indexing: Arc<AtomicUsize>,
    requests: Arc<AtomicUsize>,
}

pub struct Busy(Arc<AtomicUsize>);

impl Busy {
    fn on(counter: &Arc<AtomicUsize>) -> Self {
        counter.fetch_add(1, Ordering::AcqRel);
        Self(Arc::clone(counter))
    }
}

impl Drop for Busy {
    fn drop(&mut self) {
        self.0.fetch_sub(1, Ordering::AcqRel);
    }
}

impl Activity {
    pub fn indexing(&self) -> Busy {
        Busy::on(&self.indexing)
    }

    pub fn request(&self) -> Busy {
        Busy::on(&self.requests)
    }

    fn current(&self) -> Option<Reason> {
        if self.indexing.load(Ordering::Acquire) > 0 {
            Some(Reason::Indexing)
        } else if self.requests.load(Ordering::Acquire) > 0 {
            Some(Reason::Requests)
        } else {
            None
        }
    }
}

#[derive(Clone)]
pub struct AppState {
    loaded: Arc<RwLock<Arc<Loaded>>>,
    pub search: Arc<Search>,
    pub details: Arc<Details>,
    pub limiter: Arc<DefaultKeyedRateLimiter<IpAddr>>,
    pub trust_proxy: bool,
    pub activity: Activity,
}

impl AppState {
    pub fn new(
        loaded: Loaded,
        search: Search,
        details: Details,
        limiter: DefaultKeyedRateLimiter<IpAddr>,
        trust_proxy: bool,
    ) -> Self {
        Self {
            loaded: Arc::new(RwLock::new(Arc::new(loaded))),
            search: Arc::new(search),
            details: Arc::new(details),
            limiter: Arc::new(limiter),
            trust_proxy,
            activity: Activity::default(),
        }
    }

    pub fn loaded(&self) -> Arc<Loaded> {
        Arc::clone(&self.loaded.read().unwrap_or_else(|p| p.into_inner()))
    }

    pub async fn replace(&self, catalog: Catalog) {
        let _busy = self.activity.indexing();
        let loaded = Loaded::build(catalog, self.search.embedder()).await;
        *self.loaded.write().unwrap_or_else(|p| p.into_inner()) = Arc::new(loaded);
        self.search.forget();
    }

    pub fn quiescence(&self) -> Quiescence {
        let loaded = self.loaded();
        let ready = !loaded.catalog.tools.is_empty()
            && (loaded.index.is_some() || self.search.embedder().is_none());
        let reason = match self.activity.current() {
            Some(reason) => reason,
            None if ready => Reason::Idle,
            None => Reason::Starting,
        };
        Quiescence {
            alive: true,
            ready,
            safe: reason == Reason::Idle,
            reason,
        }
    }
}
