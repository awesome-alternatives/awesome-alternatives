use std::time::Duration;

use reqwest::StatusCode;
use serde::{Deserialize, Serialize};

pub const GITHUB_API: &str = "https://api.github.com";
pub const SCORECARD_API: &str = "https://api.securityscorecards.dev";
const TIMEOUT: Duration = Duration::from_secs(10);

#[derive(Debug, Clone, PartialEq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Advisory {
    #[serde(alias = "ghsa_id")]
    pub ghsa_id: String,
    #[serde(alias = "cve_id")]
    pub cve_id: Option<String>,
    pub summary: String,
    pub severity: Option<String>,
    #[serde(alias = "published_at")]
    pub published_at: Option<String>,
    #[serde(alias = "html_url")]
    pub url: String,
}

#[derive(Debug, Clone, PartialEq, Deserialize, Serialize)]
pub struct Scorecard {
    pub score: f64,
    pub date: String,
    pub checks: Vec<Check>,
}

#[derive(Debug, Clone, PartialEq, Deserialize, Serialize)]
pub struct Check {
    pub name: String,
    pub score: Option<u8>,
    pub reason: String,
    pub url: Option<String>,
}

#[derive(Deserialize)]
struct ApiScorecard {
    score: f64,
    date: String,
    checks: Vec<ApiCheck>,
}

#[derive(Deserialize)]
struct ApiCheck {
    name: String,
    score: i32,
    reason: String,
    documentation: Option<ApiDocumentation>,
}

#[derive(Deserialize)]
struct ApiDocumentation {
    url: Option<String>,
}

impl From<ApiScorecard> for Scorecard {
    fn from(api: ApiScorecard) -> Self {
        let mut checks: Vec<Check> = api
            .checks
            .into_iter()
            .map(|c| Check {
                name: c.name,
                score: u8::try_from(c.score).ok(),
                reason: c.reason,
                url: c.documentation.and_then(|d| d.url),
            })
            .collect();
        checks.sort_by(|a, b| a.score.cmp(&b.score).then_with(|| a.name.cmp(&b.name)));
        Self {
            score: api.score,
            date: api.date,
            checks,
        }
    }
}

#[derive(Clone)]
pub struct Upstream {
    http: reqwest::Client,
    github: String,
    scorecard: String,
    token: Option<String>,
}

impl Upstream {
    pub fn new(
        http: reqwest::Client,
        github: &str,
        scorecard: &str,
        token: Option<String>,
    ) -> Self {
        Self {
            http,
            github: github.trim_end_matches('/').to_owned(),
            scorecard: scorecard.trim_end_matches('/').to_owned(),
            token,
        }
    }

    fn github(&self, path: &str, accept: &str) -> reqwest::RequestBuilder {
        let request = self
            .http
            .get(format!("{}{path}", self.github))
            .header("accept", accept)
            .header("x-github-api-version", "2022-11-28")
            .timeout(TIMEOUT);
        match &self.token {
            Some(token) => request.bearer_auth(token),
            None => request,
        }
    }

    pub async fn readme_html(&self, full_name: &str) -> Result<Option<String>, reqwest::Error> {
        let response = self
            .github(
                &format!("/repos/{full_name}/readme"),
                "application/vnd.github.html",
            )
            .send()
            .await?;
        if response.status() == StatusCode::NOT_FOUND {
            return Ok(None);
        }
        Ok(Some(response.error_for_status()?.text().await?))
    }

    pub async fn advisories(&self, full_name: &str) -> Result<Vec<Advisory>, reqwest::Error> {
        let response = self
            .github(
                &format!("/repos/{full_name}/security-advisories?state=published&per_page=20"),
                "application/vnd.github+json",
            )
            .send()
            .await?;
        if matches!(
            response.status(),
            StatusCode::NOT_FOUND | StatusCode::FORBIDDEN
        ) {
            return Ok(Vec::new());
        }
        response.error_for_status()?.json().await
    }

    pub async fn scorecard(&self, full_name: &str) -> Result<Option<Scorecard>, reqwest::Error> {
        let response = self
            .http
            .get(format!(
                "{}/projects/github.com/{full_name}",
                self.scorecard
            ))
            .timeout(TIMEOUT)
            .send()
            .await?;
        if response.status() == StatusCode::NOT_FOUND {
            return Ok(None);
        }
        let api: ApiScorecard = response.error_for_status()?.json().await?;
        Ok(Some(api.into()))
    }
}
