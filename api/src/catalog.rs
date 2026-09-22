use std::path::Path;

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Deserialize, Serialize)]
#[serde(rename_all = "kebab-case")]
pub enum Fit {
    DropIn,
    Full,
    Partial,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Replacement {
    pub tool: String,
    pub fit: Fit,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub note: Option<String>,
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
}

#[derive(Debug, Default, Deserialize)]
pub struct Catalog {
    pub tools: Vec<Tool>,
}

#[derive(Debug, thiserror::Error)]
pub enum CatalogError {
    #[error("reading {0}: {1}")]
    Read(String, std::io::Error),
    #[error("fetching {0}: {1}")]
    Fetch(String, reqwest::Error),
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
    Ok(serde_json::from_str(&body)?)
}

async fn fetch(url: &str, http: &reqwest::Client) -> Result<String, reqwest::Error> {
    http.get(url).send().await?.error_for_status()?.text().await
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_the_generated_catalog() {
        let raw = include_str!("../../generated/catalog.json");
        let catalog: Catalog = serde_json::from_str(raw).unwrap();
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
    }
}
