use std::net::IpAddr;
use std::sync::{Arc, RwLock};

use governor::DefaultKeyedRateLimiter;

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

#[derive(Clone)]
pub struct AppState {
    loaded: Arc<RwLock<Arc<Loaded>>>,
    pub search: Arc<Search>,
    pub details: Arc<Details>,
    pub limiter: Arc<DefaultKeyedRateLimiter<IpAddr>>,
    pub trust_proxy: bool,
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
        }
    }

    pub fn loaded(&self) -> Arc<Loaded> {
        Arc::clone(&self.loaded.read().unwrap_or_else(|p| p.into_inner()))
    }

    pub async fn replace(&self, catalog: Catalog) {
        let loaded = Loaded::build(catalog, self.search.embedder()).await;
        *self.loaded.write().unwrap_or_else(|p| p.into_inner()) = Arc::new(loaded);
        self.search.forget();
    }
}
