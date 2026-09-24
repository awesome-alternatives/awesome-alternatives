use std::collections::BTreeMap;
use std::path::Path;

use serde::{Deserialize, Serialize};

use crate::body;

pub const CATALOG_BYTES: usize = 16 * 1024 * 1024;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Deserialize, Serialize)]
#[serde(rename_all = "kebab-case")]
pub enum Fit {
    DropIn,
    Full,
    Partial,
}

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq, Deserialize, Serialize)]
#[serde(rename_all = "kebab-case")]
pub enum Terms {
    Open,
    SourceAvailable,
    OpenCore,
    #[default]
    Unknown,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Deserialize, Serialize)]
#[serde(rename_all = "lowercase")]
pub enum DeployMethod {
    Container,
    Compose,
    Helm,
    Binary,
    Package,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Replacement {
    pub tool: String,
    pub fit: Fit,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub note: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub migration: Option<String>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct RepoFacts {
    pub full_name: String,
    pub description: Option<String>,
    pub homepage: Option<String>,
    pub language: Option<String>,
    pub license: Option<String>,
    pub stars: u64,
    pub forks: u64,
    #[serde(default)]
    pub topics: Vec<String>,
    pub archived: bool,
    pub pushed_at: String,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Deserialize, Serialize)]
#[serde(rename_all = "lowercase")]
pub enum ReleaseSource {
    Release,
    Tag,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ReleaseFacts {
    pub tag: String,
    pub published_at: Option<String>,
    pub url: String,
    pub source: ReleaseSource,
    pub signed: bool,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Tool {
    pub slug: String,
    pub name: String,
    pub repository: String,
    pub category: String,
    pub replaces: Vec<Replacement>,
    pub affiliation: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub path: Option<String>,
    pub repo: RepoFacts,
    pub release: Option<ReleaseFacts>,
    pub maintainer_verified: bool,
    pub flags: Vec<String>,
    #[serde(default)]
    pub terms: Terms,
    #[serde(default)]
    pub self_host: bool,
    #[serde(default)]
    pub capabilities: BTreeMap<String, Capability>,
    #[serde(default)]
    pub deploy: Vec<DeployMethod>,
}

#[derive(Debug, Clone, PartialEq, Eq, Deserialize, Serialize)]
pub struct Capability {
    pub docs: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub note: Option<String>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct CapabilityTerm {
    pub label: String,
    #[serde(default, rename = "match")]
    pub phrases: Vec<String>,
}

impl Tool {
    pub fn is_maintained(&self) -> bool {
        !self.repo.archived && !self.flags.iter().any(|f| f == "inactive")
    }
}

#[derive(Debug, Clone, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Category {
    pub name: String,
    #[serde(default)]
    pub self_host: bool,
    #[serde(default)]
    pub capabilities: BTreeMap<String, CapabilityTerm>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Product {
    pub slug: String,
    pub name: String,
    pub homepage: String,
    pub vendor: String,
    pub category: String,
    pub description: String,
}

#[derive(Debug, Deserialize)]
pub struct Catalog {
    pub tools: Vec<Tool>,
    #[serde(default)]
    pub products: Vec<Product>,
    #[serde(default)]
    pub categories: BTreeMap<String, Category>,
    #[serde(skip)]
    pub revision: String,
}

impl Catalog {
    pub fn parse(body: &str) -> Result<Self, serde_json::Error> {
        let mut catalog: Self = serde_json::from_str(body)?;
        for tool in &mut catalog.tools {
            tool.self_host = catalog
                .categories
                .get(&tool.category)
                .is_some_and(|c| c.self_host);
        }
        catalog.revision = revision(body);
        Ok(catalog)
    }
}

#[derive(Debug, thiserror::Error)]
pub enum CatalogError {
    #[error("reading {0}: {1}")]
    Read(String, std::io::Error),
    #[error("fetching {0}: {1}")]
    Fetch(String, body::Error),
    #[error("parsing the catalog: {0}")]
    Parse(#[from] serde_json::Error),
}

pub async fn load(source: &str, http: &reqwest::Client) -> Result<Catalog, CatalogError> {
    let body = if source.starts_with("https://") || source.starts_with("http://") {
        fetch(source, http)
            .await
            .map_err(|e| CatalogError::Fetch(source.to_owned(), e))?
    } else {
        tokio::fs::read_to_string(Path::new(source))
            .await
            .map_err(|e| CatalogError::Read(source.to_owned(), e))?
    };
    Ok(Catalog::parse(&body)?)
}

async fn fetch(url: &str, http: &reqwest::Client) -> Result<String, body::Error> {
    let response = http.get(url).send().await?.error_for_status()?;
    body::text(response, CATALOG_BYTES).await
}

fn revision(body: &str) -> String {
    const OFFSET: u64 = 0xcbf2_9ce4_8422_2325;
    const PRIME: u64 = 0x0000_0100_0000_01b3;
    let digest = body.as_bytes().iter().fold(OFFSET, |hash, byte| {
        (hash ^ u64::from(*byte)).wrapping_mul(PRIME)
    });
    format!("{digest:016x}")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn a_revision_follows_the_document_it_was_loaded_from() {
        let http = reqwest::Client::new();
        let path = concat!(env!("CARGO_MANIFEST_DIR"), "/../generated/catalog.json");
        let first = load(path, &http).await.unwrap();
        let again = load(path, &http).await.unwrap();
        assert_eq!(first.revision, again.revision);
        assert_eq!(first.revision.len(), 16);
        assert_ne!(revision("{\"tools\":[]}"), first.revision);
    }

    #[tokio::test]
    async fn a_remote_catalog_over_the_size_cap_is_refused() {
        let app = axum::Router::new().route(
            "/catalog.json",
            axum::routing::get(|| async { " ".repeat(CATALOG_BYTES + 1) }),
        );
        let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
        let url = format!("http://{}/catalog.json", listener.local_addr().unwrap());
        tokio::spawn(async move { axum::serve(listener, app).await.unwrap() });
        let error = load(&url, &reqwest::Client::new()).await.unwrap_err();
        assert!(matches!(
            error,
            CatalogError::Fetch(_, body::Error::TooLarge(CATALOG_BYTES))
        ));
    }

    #[test]
    fn parses_the_generated_catalog() {
        let raw = include_str!("../../generated/catalog.json");
        let catalog = Catalog::parse(raw).unwrap();
        let semantic_release = catalog
            .tools
            .iter()
            .find(|t| t.slug == "semantic-release")
            .unwrap();
        assert!(semantic_release.replaces.is_empty());
        assert!(
            catalog
                .tools
                .iter()
                .any(|t| t.replaces.iter().any(|r| r.tool == "semantic-release"))
        );
        assert!(catalog.products.iter().any(|p| p.slug == "claude-code"));
        let hosted = |slug: &str| {
            catalog
                .tools
                .iter()
                .find(|t| t.slug == slug)
                .unwrap()
                .self_host
        };
        assert!(hosted("gitea"));
        assert!(!hosted("ruff"));
    }

    #[test]
    fn a_tool_is_self_hosted_when_its_category_says_so() {
        let raw = r#"{
            "categories": {
                "git-forge": { "name": "Git forges", "description": "d", "selfHost": true },
                "json-processor": { "name": "JSON", "description": "d" }
            },
            "tools": []
        }"#;
        let mut catalog = Catalog::parse(raw).unwrap();
        let mut forge = crate::fixtures::tool("gitea", "Go", "MIT", &[], 1);
        forge.category = "git-forge".into();
        let mut jq = crate::fixtures::tool("jaq", "Rust", "MIT", &[], 1);
        jq.category = "json-processor".into();
        let body = serde_json::json!({
            "categories": catalog.categories,
            "tools": [forge, jq],
        })
        .to_string();
        catalog = Catalog::parse(&body).unwrap();
        let hosted: Vec<_> = catalog
            .tools
            .iter()
            .map(|t| (t.slug.as_str(), t.self_host))
            .collect();
        assert_eq!(hosted, [("gitea", true), ("jaq", false)]);
    }

    #[test]
    fn a_tool_flagged_inactive_or_archived_is_not_maintained() {
        let live = crate::fixtures::tool("live", "Go", "MIT", &[], 1);
        let mut idle = live.clone();
        idle.flags = vec!["inactive".into()];
        let mut archived = live.clone();
        archived.repo.archived = true;
        assert!(live.is_maintained());
        assert!(!idle.is_maintained());
        assert!(!archived.is_maintained());
    }

    #[test]
    fn deploy_methods_come_through_and_default_to_none() {
        let gitea = crate::fixtures::tool("gitea", "Go", "MIT", &[], 1);
        let mut entry = serde_json::to_value(&gitea).unwrap();
        entry["deploy"] = serde_json::json!(["container", "helm"]);
        let read: Tool = serde_json::from_value(entry.clone()).unwrap();
        assert_eq!(read.deploy, [DeployMethod::Container, DeployMethod::Helm]);
        assert_eq!(
            serde_json::to_value(&read).unwrap()["deploy"],
            serde_json::json!(["container", "helm"])
        );

        entry.as_object_mut().unwrap().remove("deploy");
        assert!(
            serde_json::from_value::<Tool>(entry.clone())
                .unwrap()
                .deploy
                .is_empty()
        );

        entry["deploy"] = serde_json::json!(["snap"]);
        assert!(serde_json::from_value::<Tool>(entry).is_err());
    }
}
