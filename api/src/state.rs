use std::net::IpAddr;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::{Arc, RwLock};

use governor::{DefaultKeyedRateLimiter, Quota, RateLimiter};
use serde::Serialize;

use crate::catalog::Catalog;
use crate::details::Details;
use crate::embedding::Model;
use crate::history::History;
use crate::limits;
use crate::refresh::Refresh;
use crate::search::Search;
use crate::semantic::Index;
use crate::vocabulary::Vocabulary;

pub struct Loaded {
    pub catalog: Catalog,
    pub vocabulary: Vocabulary,
    pub index: Option<Index>,
}

impl Loaded {
    pub async fn build(catalog: Catalog, model: Option<&Model>, previous: Option<&Index>) -> Self {
        let vocabulary = Vocabulary::of(&catalog.tools, &catalog.products, &catalog.categories);
        let index = match model {
            Some(model) => Index::build(
                model,
                &catalog.tools,
                &catalog.products,
                &vocabulary,
                previous,
            )
            .await
            .inspect_err(|error| {
                tracing::warn!(%error, "semantic index unavailable, search uses keywords only");
            })
            .ok(),
            None => None,
        };
        Self {
            catalog,
            vocabulary,
            index,
        }
    }

    #[cfg(test)]
    pub fn new(catalog: Catalog, embedder: Option<&dyn crate::embedding::Embedder>) -> Self {
        let vocabulary = Vocabulary::of(&catalog.tools, &catalog.products, &catalog.categories);
        let index = embedder.and_then(|embedder| {
            Index::build_blocking(embedder, &catalog.tools, &catalog.products, &vocabulary).ok()
        });
        Self {
            catalog,
            vocabulary,
            index,
        }
    }

    fn serves(&self, revision: &str, model: Option<&Model>) -> bool {
        self.catalog.revision == revision && (self.index.is_some() || model.is_none())
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Reload {
    Unchanged,
    Rebuilt,
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
    pub history: Arc<History>,
    pub limiter: Arc<DefaultKeyedRateLimiter<IpAddr>>,
    pub details_limiter: Arc<DefaultKeyedRateLimiter<IpAddr>>,
    pub mcp_limiter: Arc<DefaultKeyedRateLimiter<IpAddr>>,
    pub allowed_origins: Arc<[String]>,
    pub trust_proxy: bool,
    pub activity: Activity,
    pub refresh: Arc<Refresh>,
}

impl AppState {
    pub fn new(
        loaded: Loaded,
        search: Search,
        details: Details,
        limiter: DefaultKeyedRateLimiter<IpAddr>,
        details_limiter: DefaultKeyedRateLimiter<IpAddr>,
        trust_proxy: bool,
        refresh: Refresh,
    ) -> Self {
        Self {
            loaded: Arc::new(RwLock::new(Arc::new(loaded))),
            search: Arc::new(search),
            details: Arc::new(details),
            history: Arc::new(History::disabled()),
            limiter: Arc::new(limiter),
            details_limiter: Arc::new(details_limiter),
            mcp_limiter: Arc::new(RateLimiter::keyed(Quota::per_minute(
                limits::SEARCHES_PER_MINUTE,
            ))),
            allowed_origins: Arc::from([]),
            trust_proxy,
            activity: Activity::default(),
            refresh: Arc::new(refresh),
        }
    }

    pub fn with_history(self, history: History) -> Self {
        Self {
            history: Arc::new(history),
            ..self
        }
    }

    pub fn with_mcp_limiter(self, limiter: DefaultKeyedRateLimiter<IpAddr>) -> Self {
        Self {
            mcp_limiter: Arc::new(limiter),
            ..self
        }
    }

    pub fn with_allowed_origins(self, origins: &[String]) -> Self {
        Self {
            allowed_origins: Arc::from(origins),
            ..self
        }
    }

    pub fn loaded(&self) -> Arc<Loaded> {
        Arc::clone(&self.loaded.read().unwrap_or_else(|p| p.into_inner()))
    }

    pub async fn replace(&self, catalog: Catalog) -> Reload {
        let current = self.loaded();
        let model = self.search.model();
        if current.serves(&catalog.revision, model) {
            return Reload::Unchanged;
        }
        let _busy = self.activity.indexing();
        let loaded = Loaded::build(catalog, model, current.index.as_ref()).await;
        *self.loaded.write().unwrap_or_else(|p| p.into_inner()) = Arc::new(loaded);
        self.search.forget();
        Reload::Rebuilt
    }

    pub fn quiescence(&self) -> Quiescence {
        let loaded = self.loaded();
        let ready = !loaded.catalog.tools.is_empty()
            && (loaded.index.is_some() || self.search.model().is_none());
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

#[cfg(test)]
mod tests;
