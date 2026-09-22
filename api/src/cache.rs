use std::future::Future;
use std::pin::Pin;
use std::sync::Mutex;
use std::time::{Duration, Instant};

use serde::Serialize;
use serde::de::DeserializeOwned;

pub const NAMESPACE: &str = "aa";
pub const VERSION: &str = "v1";
pub const DETAILS_TTL: Duration = Duration::from_secs(12 * 3600);
pub const SEARCH_TTL: Duration = Duration::from_secs(15 * 60);
pub const TIMEOUT: Duration = Duration::from_millis(200);
const CONNECT_TIMEOUT: Duration = Duration::from_secs(5);
const QUIET_FOR: Duration = Duration::from_secs(300);

pub fn key(parts: &[&str]) -> String {
    let mut key = format!("{NAMESPACE}:{VERSION}");
    for part in parts {
        key.push(':');
        key.push_str(part);
    }
    key
}

#[derive(Debug, thiserror::Error)]
#[error("{0}")]
pub struct Error(String);

impl From<String> for Error {
    fn from(message: String) -> Self {
        Self(message)
    }
}

impl From<redis::RedisError> for Error {
    fn from(error: redis::RedisError) -> Self {
        Self(error.to_string())
    }
}

pub type Answer<'a, T> = Pin<Box<dyn Future<Output = Result<T, Error>> + Send + 'a>>;

pub trait Store: Send + Sync {
    fn get<'a>(&'a self, key: &'a str) -> Answer<'a, Option<Vec<u8>>>;
    fn set<'a>(&'a self, key: &'a str, value: Vec<u8>, ttl: Duration) -> Answer<'a, ()>;
}

#[derive(Debug, Clone, Copy)]
pub struct Ttl {
    pub details: Duration,
    pub search: Duration,
}

impl Default for Ttl {
    fn default() -> Self {
        Self {
            details: DETAILS_TTL,
            search: SEARCH_TTL,
        }
    }
}

pub struct Settings {
    pub url: String,
    pub ca_cert: Option<String>,
    pub timeout: Duration,
    pub ttl: Ttl,
}

pub struct Shared {
    store: Option<Box<dyn Store>>,
    timeout: Duration,
    pub ttl: Ttl,
    complaints: Complaints,
}

impl Shared {
    pub fn new(store: Box<dyn Store>, timeout: Duration, ttl: Ttl) -> Self {
        Self {
            store: Some(store),
            timeout,
            ttl,
            complaints: Complaints::default(),
        }
    }

    pub fn disabled() -> Self {
        Self {
            store: None,
            timeout: TIMEOUT,
            ttl: Ttl::default(),
            complaints: Complaints::default(),
        }
    }

    pub async fn get<T: DeserializeOwned>(&self, key: &str) -> Option<T> {
        let store = self.store.as_ref()?;
        match self.bounded(store.get(key)).await {
            Ok(Some(bytes)) => match serde_json::from_slice(&bytes) {
                Ok(value) => Some(value),
                Err(error) => {
                    self.complain(error, "a shared cache entry could not be read");
                    None
                }
            },
            Ok(None) => None,
            Err(error) => {
                self.complain(error, "reading the shared cache failed");
                None
            }
        }
    }

    pub async fn set<T: Serialize>(&self, key: &str, value: &T, ttl: Duration) {
        let Some(store) = self.store.as_ref() else {
            return;
        };
        let bytes = match serde_json::to_vec(value) {
            Ok(bytes) => bytes,
            Err(error) => {
                self.complain(error, "a value could not be written to the shared cache");
                return;
            }
        };
        if let Err(error) = self.bounded(store.set(key, bytes, ttl)).await {
            self.complain(error, "writing to the shared cache failed");
        }
    }

    pub async fn through<T, E, F>(&self, key: &str, ttl: Duration, load: F) -> Result<T, E>
    where
        T: Serialize + DeserializeOwned,
        F: Future<Output = Result<T, E>>,
    {
        if let Some(hit) = self.get(key).await {
            return Ok(hit);
        }
        let value = load.await?;
        self.set(key, &value, ttl).await;
        Ok(value)
    }

    async fn bounded<T>(&self, work: Answer<'_, T>) -> Result<T, Error> {
        match tokio::time::timeout(self.timeout, work).await {
            Ok(answer) => answer,
            Err(_) => Err(Error(format!("timed out after {:?}", self.timeout))),
        }
    }

    fn complain(&self, error: impl std::fmt::Display, message: &'static str) {
        if self.complaints.due() {
            tracing::warn!(%error, "{message}");
        }
    }
}

#[derive(Default)]
struct Complaints(Mutex<Option<Instant>>);

impl Complaints {
    fn due(&self) -> bool {
        let mut last = self.0.lock().unwrap_or_else(|p| p.into_inner());
        if last.is_some_and(|at| at.elapsed() < QUIET_FOR) {
            return false;
        }
        *last = Some(Instant::now());
        true
    }
}

pub async fn open(settings: Option<Settings>) -> Shared {
    let Some(settings) = settings else {
        tracing::info!(
            "VALKEY_URL is not set: READMEs, security reports and searches are cached in this process only"
        );
        return Shared::disabled();
    };
    match connect(&settings).await {
        Ok(store) => {
            tracing::info!(
                details_ttl = settings.ttl.details.as_secs(),
                search_ttl = settings.ttl.search.as_secs(),
                "shared cache connected"
            );
            Shared::new(Box::new(store), settings.timeout, settings.ttl)
        }
        Err(error) => {
            tracing::warn!(%error, "the shared cache is unreachable, serving from memory and upstream");
            Shared::disabled()
        }
    }
}

async fn client(settings: &Settings) -> Result<redis::Client, Error> {
    let url = settings.url.as_str();
    match &settings.ca_cert {
        Some(path) => {
            let root_cert = tokio::fs::read(path)
                .await
                .map_err(|error| Error(format!("reading {path}: {error}")))?;
            Ok(redis::Client::build_with_tls(
                url,
                redis::TlsCertificates {
                    client_tls: None,
                    root_cert: Some(root_cert),
                },
            )?)
        }
        None => Ok(redis::Client::open(url)?),
    }
}

async fn connect(settings: &Settings) -> Result<Valkey, Error> {
    let client = client(settings).await?;
    let config = redis::aio::ConnectionManagerConfig::new()
        .set_connection_timeout(Some(CONNECT_TIMEOUT))
        .set_response_timeout(Some(settings.timeout));
    let connection = tokio::time::timeout(
        CONNECT_TIMEOUT,
        client.get_connection_manager_with_config(config),
    )
    .await
    .map_err(|_| Error(format!("connecting timed out after {CONNECT_TIMEOUT:?}")))??;
    Ok(Valkey(connection))
}

struct Valkey(redis::aio::ConnectionManager);

impl Store for Valkey {
    fn get<'a>(&'a self, key: &'a str) -> Answer<'a, Option<Vec<u8>>> {
        Box::pin(async move {
            let mut connection = self.0.clone();
            Ok(redis::cmd("GET")
                .arg(key)
                .query_async::<Option<Vec<u8>>>(&mut connection)
                .await?)
        })
    }

    fn set<'a>(&'a self, key: &'a str, value: Vec<u8>, ttl: Duration) -> Answer<'a, ()> {
        Box::pin(async move {
            let mut connection = self.0.clone();
            redis::cmd("SET")
                .arg(key)
                .arg(value)
                .arg("EX")
                .arg(ttl.as_secs().max(1))
                .query_async::<()>(&mut connection)
                .await?;
            Ok(())
        })
    }
}

#[cfg(test)]
pub mod fake {
    use std::collections::HashMap;
    use std::sync::{Arc, Mutex};
    use std::time::Duration;

    use super::{Answer, Error, Shared, Store, Ttl};

    pub fn recording() -> (Arc<Shared>, Arc<Recorder>) {
        let store = Arc::new(Recorder::default());
        let shared = Shared::new(
            Box::new(Arc::clone(&store)),
            Duration::from_secs(1),
            Ttl::default(),
        );
        (Arc::new(shared), store)
    }

    #[derive(Debug, Clone, PartialEq, Eq)]
    pub struct Write {
        pub key: String,
        pub ttl: Duration,
    }

    #[derive(Default)]
    pub struct Recorder {
        entries: Mutex<HashMap<String, Vec<u8>>>,
        writes: Mutex<Vec<Write>>,
    }

    impl Recorder {
        pub fn written(&self) -> Vec<Write> {
            self.writes
                .lock()
                .unwrap_or_else(|p| p.into_inner())
                .clone()
        }
    }

    impl Store for Arc<Recorder> {
        fn get<'a>(&'a self, key: &'a str) -> Answer<'a, Option<Vec<u8>>> {
            Box::pin(async move {
                Ok(self
                    .entries
                    .lock()
                    .unwrap_or_else(|p| p.into_inner())
                    .get(key)
                    .cloned())
            })
        }

        fn set<'a>(&'a self, key: &'a str, value: Vec<u8>, ttl: Duration) -> Answer<'a, ()> {
            Box::pin(async move {
                self.entries
                    .lock()
                    .unwrap_or_else(|p| p.into_inner())
                    .insert(key.to_owned(), value);
                self.writes
                    .lock()
                    .unwrap_or_else(|p| p.into_inner())
                    .push(Write {
                        key: key.to_owned(),
                        ttl,
                    });
                Ok(())
            })
        }
    }

    pub struct Broken;

    impl Store for Broken {
        fn get<'a>(&'a self, _key: &'a str) -> Answer<'a, Option<Vec<u8>>> {
            Box::pin(async { Err(Error::from("the cache is down".to_owned())) })
        }

        fn set<'a>(&'a self, _key: &'a str, _value: Vec<u8>, _ttl: Duration) -> Answer<'a, ()> {
            Box::pin(async { Err(Error::from("the cache is down".to_owned())) })
        }
    }

    pub struct Hung;

    impl Store for Hung {
        fn get<'a>(&'a self, _key: &'a str) -> Answer<'a, Option<Vec<u8>>> {
            Box::pin(std::future::pending())
        }

        fn set<'a>(&'a self, _key: &'a str, _value: Vec<u8>, _ttl: Duration) -> Answer<'a, ()> {
            Box::pin(std::future::pending())
        }
    }

    pub struct Corrupt;

    impl Store for Corrupt {
        fn get<'a>(&'a self, _key: &'a str) -> Answer<'a, Option<Vec<u8>>> {
            Box::pin(async { Ok(Some(b"not json".to_vec())) })
        }

        fn set<'a>(&'a self, _key: &'a str, _value: Vec<u8>, _ttl: Duration) -> Answer<'a, ()> {
            Box::pin(async { Ok(()) })
        }
    }
}

#[cfg(test)]
mod tests {
    use std::sync::atomic::{AtomicUsize, Ordering};

    use super::fake::{Broken, Corrupt, Hung, Write, recording};
    use super::*;

    fn shared(store: impl Store + 'static) -> Shared {
        Shared::new(Box::new(store), Duration::from_millis(50), Ttl::default())
    }

    async fn upstream(calls: &AtomicUsize) -> Result<String, &'static str> {
        calls.fetch_add(1, Ordering::AcqRel);
        Ok("fresh".to_owned())
    }

    #[test]
    fn keys_carry_the_namespace_and_the_shape_version() {
        assert_eq!(key(&["readme", "acme/tool"]), "aa:v1:readme:acme/tool");
        assert_eq!(
            key(&["search", "abc123", "in rust"]),
            "aa:v1:search:abc123:in rust"
        );
    }

    #[tokio::test]
    async fn a_miss_falls_through_to_the_loader_and_is_stored_with_a_ttl() {
        let (cache, store) = recording();
        let calls = AtomicUsize::new(0);
        let value: Result<String, &str> =
            cache.through("aa:v1:x", SEARCH_TTL, upstream(&calls)).await;
        assert_eq!(value.unwrap(), "fresh");
        assert_eq!(calls.load(Ordering::Acquire), 1);
        assert_eq!(
            store.written(),
            [Write {
                key: "aa:v1:x".into(),
                ttl: SEARCH_TTL
            }]
        );
    }

    #[tokio::test]
    async fn a_hit_never_calls_the_loader() {
        let (cache, _store) = recording();
        cache.set("aa:v1:x", &"kept".to_owned(), SEARCH_TTL).await;
        let calls = AtomicUsize::new(0);
        let value: Result<String, &str> =
            cache.through("aa:v1:x", SEARCH_TTL, upstream(&calls)).await;
        assert_eq!(value.unwrap(), "kept");
        assert_eq!(calls.load(Ordering::Acquire), 0);
    }

    #[tokio::test]
    async fn every_write_carries_a_ttl() {
        let (cache, store) = recording();
        cache.set("aa:v1:a", &1, DETAILS_TTL).await;
        cache.set("aa:v1:b", &2, SEARCH_TTL).await;
        let written = store.written();
        assert!(written.iter().all(|w| w.ttl > Duration::ZERO));
        assert_eq!(
            written.iter().map(|w| w.ttl).collect::<Vec<_>>(),
            [DETAILS_TTL, SEARCH_TTL]
        );
    }

    #[tokio::test]
    async fn a_broken_cache_still_returns_the_upstream_value() {
        let cache = shared(Broken);
        let calls = AtomicUsize::new(0);
        let value: Result<String, &str> =
            cache.through("aa:v1:x", SEARCH_TTL, upstream(&calls)).await;
        assert_eq!(value.unwrap(), "fresh");
        assert_eq!(calls.load(Ordering::Acquire), 1);
    }

    #[tokio::test]
    async fn an_entry_that_cannot_be_read_is_a_miss() {
        let cache = shared(Corrupt);
        let calls = AtomicUsize::new(0);
        let value: Result<String, &str> =
            cache.through("aa:v1:x", SEARCH_TTL, upstream(&calls)).await;
        assert_eq!(value.unwrap(), "fresh");
        assert_eq!(calls.load(Ordering::Acquire), 1);
    }

    #[tokio::test]
    async fn a_hung_cache_does_not_outlast_the_timeout() {
        let cache = shared(Hung);
        let started = Instant::now();
        assert!(cache.get::<String>("aa:v1:x").await.is_none());
        cache.set("aa:v1:x", &"v", SEARCH_TTL).await;
        assert!(started.elapsed() < Duration::from_secs(1), "{started:?}");
    }

    #[tokio::test]
    async fn a_disabled_cache_reads_nothing_and_writes_nothing() {
        let cache = Shared::disabled();
        let calls = AtomicUsize::new(0);
        cache.set("aa:v1:x", &"v", SEARCH_TTL).await;
        let value: Result<String, &str> =
            cache.through("aa:v1:x", SEARCH_TTL, upstream(&calls)).await;
        assert_eq!(value.unwrap(), "fresh");
        assert_eq!(calls.load(Ordering::Acquire), 1);
    }

    fn test_settings() -> Settings {
        Settings {
            url: std::env::var("VALKEY_TEST_URL").expect("VALKEY_TEST_URL"),
            ca_cert: std::env::var("VALKEY_TEST_CA_CERT").ok(),
            timeout: Duration::from_secs(2),
            ttl: Ttl::default(),
        }
    }

    #[tokio::test]
    #[ignore = "needs a server at VALKEY_TEST_URL"]
    async fn a_real_server_answers_a_roundtrip_and_expires_the_key() {
        let store = connect(&test_settings()).await.expect("a connection");
        let cache = Shared::new(Box::new(store), Duration::from_secs(2), Ttl::default());
        let key = key(&["test", &std::process::id().to_string()]);
        cache.set(&key, &"stored".to_owned(), SEARCH_TTL).await;
        assert_eq!(cache.get::<String>(&key).await.as_deref(), Some("stored"));

        let mut connection = client(&test_settings())
            .await
            .expect("a client")
            .get_multiplexed_async_connection()
            .await
            .expect("a connection");
        let ttl = redis::cmd("TTL")
            .arg(&key)
            .query_async::<i64>(&mut connection)
            .await
            .expect("a TTL");
        assert!(ttl > 0, "the key has no expiry: TTL returned {ttl}");
        assert!(ttl <= i64::try_from(SEARCH_TTL.as_secs()).unwrap(), "{ttl}");
    }
}
