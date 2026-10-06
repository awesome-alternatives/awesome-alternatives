use std::sync::Arc;
use std::time::Duration;

use reqwest::{RequestBuilder, Response, StatusCode};
use serde::{Deserialize, Serialize};

use crate::body;
use crate::github_app::{self, App, InstallationToken, Scope};

pub const GITHUB_API: &str = "https://api.github.com";
pub const SCORECARD_API: &str = "https://api.securityscorecards.dev";
const TIMEOUT: Duration = Duration::from_secs(10);
pub const README_BYTES: usize = 2 * 1024 * 1024;

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
pub enum Auth {
    App(Arc<InstallationToken>),
    Token(String),
    Anonymous,
}

impl Auth {
    pub fn select(app: Option<Arc<App>>, token: Option<String>) -> Self {
        match (app, token) {
            (Some(app), _) => Self::App(Arc::new(InstallationToken::new(app, Scope::ReadPublic))),
            (None, Some(token)) => Self::Token(token),
            (None, None) => Self::Anonymous,
        }
    }
}

#[derive(Clone)]
pub struct Upstream {
    http: reqwest::Client,
    github: String,
    scorecard: String,
    auth: Auth,
}

impl Upstream {
    pub fn new(http: reqwest::Client, github: &str, scorecard: &str, auth: Auth) -> Self {
        Self {
            http,
            github: github.trim_end_matches('/').to_owned(),
            scorecard: scorecard.trim_end_matches('/').to_owned(),
            auth,
        }
    }

    fn github(&self, path: &str, accept: &str) -> RequestBuilder {
        self.http
            .get(format!("{}{path}", self.github))
            .header("accept", accept)
            .header("x-github-api-version", "2022-11-28")
            .timeout(TIMEOUT)
    }

    async fn send_github(&self, path: &str, accept: &str) -> Result<Response, reqwest::Error> {
        let request = || self.github(path, accept);
        match &self.auth {
            Auth::Anonymous => request().send().await,
            Auth::Token(token) => request().bearer_auth(token).send().await,
            Auth::App(token) => match token.send(request).await {
                Ok(response) => Ok(response),
                Err(github_app::Error::Request(error)) => Err(error),
                Err(error) => {
                    tracing::warn!(%error, "no installation token, reading GitHub anonymously");
                    request().send().await
                }
            },
        }
    }

    pub async fn readme_html(&self, full_name: &str) -> Result<Option<String>, body::Error> {
        let response = self
            .send_github(
                &format!("/repos/{full_name}/readme"),
                "application/vnd.github.html",
            )
            .await?;
        warn_on_refusal(&response);
        if response.status() == StatusCode::NOT_FOUND {
            return Ok(None);
        }
        Ok(Some(
            body::text(response.error_for_status()?, README_BYTES).await?,
        ))
    }

    pub async fn advisories(&self, full_name: &str) -> Result<Vec<Advisory>, reqwest::Error> {
        let response = self
            .send_github(
                &format!("/repos/{full_name}/security-advisories?state=published&per_page=20"),
                "application/vnd.github+json",
            )
            .await?;
        warn_on_refusal(&response);
        if response.status() == StatusCode::NOT_FOUND {
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

fn warn_on_refusal(response: &reqwest::Response) {
    let status = response.status();
    if matches!(
        status,
        StatusCode::FORBIDDEN | StatusCode::TOO_MANY_REQUESTS
    ) {
        tracing::warn!(
            status = status.as_u16(),
            url = %response.url(),
            "GitHub refused the request, likely its rate limit"
        );
    }
}

#[cfg(test)]
mod tests {
    use std::sync::atomic::Ordering;

    use super::*;
    use crate::github_app::tests::FakeGitHub;

    async fn readers_after_one_readme(
        github: &FakeGitHub,
        auth: Auth,
        base: &str,
    ) -> Vec<Option<String>> {
        let upstream = Upstream::new(reqwest::Client::new(), base, base, auth);
        assert_eq!(
            upstream.readme_html("owner/tool").await.unwrap().as_deref(),
            Some("<p>hello</p>")
        );
        github.readers()
    }

    #[tokio::test]
    async fn the_app_token_wins_over_a_personal_token() {
        let github = FakeGitHub::new();
        let (base, app) = github.serve().await;
        let auth = Auth::select(Some(app), Some("ghp_personal".into()));
        assert_eq!(
            readers_after_one_readme(&github, auth, &base).await,
            [Some("Bearer ghs_1".to_owned())]
        );
    }

    #[tokio::test]
    async fn without_the_app_a_personal_token_is_used() {
        let github = FakeGitHub::new();
        let (base, _) = github.serve().await;
        let auth = Auth::select(None, Some("ghp_personal".into()));
        assert_eq!(
            readers_after_one_readme(&github, auth, &base).await,
            [Some("Bearer ghp_personal".to_owned())]
        );
        assert_eq!(github.issued.load(Ordering::SeqCst), 0);
    }

    #[tokio::test]
    async fn without_the_app_or_a_token_reads_are_anonymous() {
        let github = FakeGitHub::new();
        let (base, _) = github.serve().await;
        let auth = Auth::select(None, None);
        assert_eq!(readers_after_one_readme(&github, auth, &base).await, [None]);
    }

    #[tokio::test]
    async fn a_token_github_refuses_to_mint_falls_back_to_an_anonymous_read() {
        let github = FakeGitHub::new();
        github.refusals.store(1, Ordering::SeqCst);
        let (base, app) = github.serve().await;
        let auth = Auth::select(Some(app), None);
        assert_eq!(readers_after_one_readme(&github, auth, &base).await, [None]);
    }

    #[tokio::test]
    async fn a_revoked_app_token_is_replaced_and_the_readme_still_loads() {
        let github = FakeGitHub::new();
        github.revoke("ghs_1");
        let (base, app) = github.serve().await;
        let upstream = Upstream::new(
            reqwest::Client::new(),
            &base,
            &base,
            Auth::select(Some(app), None),
        );
        assert!(upstream.readme_html("owner/tool").await.unwrap().is_some());
        assert_eq!(
            github.readers(),
            [
                Some("Bearer ghs_1".to_owned()),
                Some("Bearer ghs_2".to_owned())
            ]
        );
    }
}
