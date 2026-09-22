use std::env;
use std::net::SocketAddr;
use std::num::NonZeroU32;
use std::str::FromStr;
use std::time::Duration;

use crate::details;
use crate::jev;
use crate::upstream;

const DEFAULT_CATALOG: &str = "https://raw.githubusercontent.com/awesome-alternatives/awesome-alternatives/main/generated/catalog.json";

pub struct Jev {
    pub api_key: String,
    pub base_url: String,
    pub model: String,
}

pub struct Config {
    pub bind: SocketAddr,
    pub catalog_source: String,
    pub catalog_refresh: Duration,
    pub searches_per_minute: NonZeroU32,
    pub trust_proxy: bool,
    pub jev: Option<Jev>,
    pub github_api: String,
    pub github_token: Option<String>,
    pub scorecard_api: String,
    pub details_cache_bytes: u64,
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
            trust_proxy: parsed("TRUST_PROXY", "false")?,
            jev: text("TYPESAFE_API_KEY").map(|api_key| Jev {
                api_key,
                base_url: text("TYPESAFE_BASE_URL").unwrap_or_else(|| jev::DEFAULT_BASE_URL.into()),
                model: text("TYPESAFE_MODEL").unwrap_or_else(|| "jev-latest".into()),
            }),
            github_api: text("GITHUB_API_URL").unwrap_or_else(|| upstream::GITHUB_API.into()),
            github_token: text("GITHUB_TOKEN"),
            scorecard_api: text("SCORECARD_API_URL")
                .unwrap_or_else(|| upstream::SCORECARD_API.into()),
            details_cache_bytes: parsed("DETAILS_CACHE_BYTES", &details::CACHE_BYTES.to_string())?,
        })
    }
}

fn text(name: &str) -> Option<String> {
    env::var(name)
        .ok()
        .map(|v| v.trim().to_owned())
        .filter(|v| !v.is_empty())
}

fn parsed<T: FromStr>(name: &'static str, default: &str) -> Result<T, ConfigError> {
    let value = text(name).unwrap_or_else(|| default.into());
    value.parse().map_err(|_| ConfigError { name, value })
}
