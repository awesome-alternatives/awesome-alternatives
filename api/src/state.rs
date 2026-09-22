use std::net::IpAddr;
use std::sync::{Arc, RwLock};

use governor::DefaultKeyedRateLimiter;

use crate::catalog::Catalog;
use crate::search::Search;
use crate::vocabulary::Vocabulary;

pub struct Loaded {
    pub catalog: Catalog,
    pub vocabulary: Vocabulary,
}

impl From<Catalog> for Loaded {
    fn from(catalog: Catalog) -> Self {
        let vocabulary = Vocabulary::of(&catalog.tools);
        Self {
            catalog,
            vocabulary,
        }
    }
}

#[derive(Clone)]
pub struct AppState {
    loaded: Arc<RwLock<Arc<Loaded>>>,
    pub search: Arc<Search>,
    pub limiter: Arc<DefaultKeyedRateLimiter<IpAddr>>,
    pub trust_proxy: bool,
}

impl AppState {
    pub fn new(
        catalog: Catalog,
        search: Search,
        limiter: DefaultKeyedRateLimiter<IpAddr>,
        trust_proxy: bool,
    ) -> Self {
        Self {
            loaded: Arc::new(RwLock::new(Arc::new(catalog.into()))),
            search: Arc::new(search),
            limiter: Arc::new(limiter),
            trust_proxy,
        }
    }

    pub fn loaded(&self) -> Arc<Loaded> {
        Arc::clone(&self.loaded.read().unwrap_or_else(|p| p.into_inner()))
    }

    pub fn replace(&self, catalog: Catalog) {
        *self.loaded.write().unwrap_or_else(|p| p.into_inner()) = Arc::new(catalog.into());
        self.search.forget();
    }
}
