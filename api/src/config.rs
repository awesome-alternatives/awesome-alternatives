use std::env;
use std::net::SocketAddr;
use std::num::{NonZeroU32, NonZeroU64};
use std::str::FromStr;
use std::time::Duration;

use crate::cache;
use crate::details;
use crate::jev;
use crate::jev_budget;
use crate::limits::{self, Limits};
use crate::refresh::{self, dispatch, oidc};
use crate::upstream;

const DEFAULT_CATALOG: &str = "https://raw.githubusercontent.com/awesome-alternatives/awesome-alternatives/main/generated/catalog.json";

pub struct Jev {
    pub api_key: String,
    pub base_url: String,
    pub model: String,
    pub limits: jev_budget::Limits,
}

pub struct Config {
    pub bind: SocketAddr,
    pub catalog_source: String,
    pub catalog_refresh: Duration,
    pub searches_per_minute: NonZeroU32,
    pub details_per_minute: NonZeroU32,
    pub trust_proxy: bool,
    pub allowed_origins: Vec<String>,
    pub jev: Option<Jev>,
    pub github_api: String,
    pub github_token: Option<String>,
    pub scorecard_api: String,
    pub details_cache_bytes: u64,
    pub valkey: Option<cache::Settings>,
    pub refresh: refresh::Settings,
    pub limits: Limits,
}

#[derive(Debug, thiserror::Error)]
#[error("{name} is invalid: {value:?}")]
pub struct ConfigError {
    name: &'static str,
    value: String,
}

impl Config {
    pub fn from_env() -> Result<Self, ConfigError> {
        Ok(Self {
            bind: parsed("BIND", "0.0.0.0:3000")?,
            catalog_source: text("CATALOG_SOURCE").unwrap_or_else(|| DEFAULT_CATALOG.into()),
            catalog_refresh: Duration::from_secs(parsed("CATALOG_REFRESH_SECS", "3600")?),
            searches_per_minute: parsed("SEARCHES_PER_MINUTE", "20")?,
            details_per_minute: parsed("DETAILS_PER_MINUTE", "30")?,
            trust_proxy: parsed("TRUST_PROXY", "false")?,
            allowed_origins: list("ALLOWED_ORIGINS"),
            jev: jev()?,
            github_api: text("GITHUB_API_URL").unwrap_or_else(|| upstream::GITHUB_API.into()),
            github_token: text("GITHUB_TOKEN"),
            scorecard_api: text("SCORECARD_API_URL")
                .unwrap_or_else(|| upstream::SCORECARD_API.into()),
            details_cache_bytes: parsed("DETAILS_CACHE_BYTES", &details::CACHE_BYTES.to_string())?,
            valkey: valkey()?,
            refresh: refresh_settings()?,
            limits: limits()?,
        })
    }
}

fn jev() -> Result<Option<Jev>, ConfigError> {
    let Some(api_key) = text("TYPESAFE_API_KEY") else {
        return Ok(None);
    };
    Ok(Some(Jev {
        api_key,
        base_url: text("TYPESAFE_BASE_URL").unwrap_or_else(|| jev::DEFAULT_BASE_URL.into()),
        model: text("TYPESAFE_MODEL").unwrap_or_else(|| "jev-latest".into()),
        limits: jev_budget::Limits {
            per_minute: parsed("JEV_CALLS_PER_MINUTE", "30")?,
            per_day: parsed("JEV_CALLS_PER_DAY", "2000")?,
        },
    }))
}

fn valkey() -> Result<Option<cache::Settings>, ConfigError> {
    let Some(url) = text("VALKEY_URL") else {
        return Ok(None);
    };
    Ok(Some(cache::Settings {
        url,
        ca_cert: text("VALKEY_CA_CERT"),
        timeout: Duration::from_millis(parsed(
            "VALKEY_TIMEOUT_MS",
            &cache::TIMEOUT.as_millis().to_string(),
        )?),
        ttl: cache::Ttl {
            details: Duration::from_secs(parsed(
                "VALKEY_DETAILS_TTL_SECS",
                &cache::DETAILS_TTL.as_secs().to_string(),
            )?),
            search: Duration::from_secs(parsed(
                "VALKEY_SEARCH_TTL_SECS",
                &cache::SEARCH_TTL.as_secs().to_string(),
            )?),
        },
    }))
}

fn limits() -> Result<Limits, ConfigError> {
    let timeout: NonZeroU64 = parsed(
        "REQUEST_TIMEOUT_SECS",
        &limits::TIMEOUT.as_secs().to_string(),
    )?;
    Ok(Limits {
        search_concurrency: parsed(
            "SEARCH_CONCURRENCY",
            &limits::SEARCH_CONCURRENCY.to_string(),
        )?,
        timeout: Duration::from_secs(timeout.get()),
    })
}

fn refresh_settings() -> Result<refresh::Settings, ConfigError> {
    Ok(refresh::Settings {
        webhook_secret: text("GITHUB_WEBHOOK_SECRET"),
        oidc_audience: text("OIDC_AUDIENCE").unwrap_or_else(|| oidc::DEFAULT_AUDIENCE.into()),
        oidc_jwks_url: text("OIDC_JWKS_URL").unwrap_or_else(|| oidc::GITHUB_JWKS.into()),
        cooldown: Duration::from_secs(parsed(
            "REFRESH_COOLDOWN_SECS",
            &refresh::COOLDOWN.as_secs().to_string(),
        )?),
        dispatch: dispatch_app(),
    })
}

fn dispatch_app() -> Option<dispatch::Settings> {
    let (app_id, private_key) = text("DISPATCH_APP_ID").zip(text("DISPATCH_PRIVATE_KEY"))?;
    Some(dispatch::Settings {
        app_id,
        private_key,
        repository: text("DISPATCH_REPOSITORY")
            .unwrap_or_else(|| dispatch::DEFAULT_REPOSITORY.into()),
        workflow: text("DISPATCH_WORKFLOW").unwrap_or_else(|| dispatch::DEFAULT_WORKFLOW.into()),
        reference: text("DISPATCH_REF").unwrap_or_else(|| dispatch::DEFAULT_REF.into()),
    })
}

fn text(name: &str) -> Option<String> {
    env::var(name)
        .ok()
        .map(|v| v.trim().to_owned())
        .filter(|v| !v.is_empty())
}

fn list(name: &str) -> Vec<String> {
    text(name)
        .map(|value| {
            value
                .split(',')
                .map(str::trim)
                .filter(|entry| !entry.is_empty())
                .map(str::to_owned)
                .collect()
        })
        .unwrap_or_default()
}

fn parsed<T: FromStr>(name: &'static str, default: &str) -> Result<T, ConfigError> {
    let value = text(name).unwrap_or_else(|| default.into());
    value.parse().map_err(|_| ConfigError { name, value })
}
