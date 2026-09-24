use std::time::Duration;

use jsonwebtoken::{Algorithm, EncodingKey, Header, encode, get_current_timestamp};
use reqwest::{Method, RequestBuilder};
use serde::{Deserialize, Serialize};
use time::OffsetDateTime;
use tokio::sync::Mutex;

pub const DEFAULT_REPOSITORY: &str = "awesome-alternatives/awesome-alternatives";
pub const DEFAULT_WORKFLOW: &str = "refresh-tools.yml";
pub const DEFAULT_REF: &str = "main";
const TIMEOUT: Duration = Duration::from_secs(10);
const TOKEN_MARGIN: time::Duration = time::Duration::minutes(5);

pub struct Settings {
    pub app_id: String,
    pub private_key: String,
    pub repository: String,
    pub workflow: String,
    pub reference: String,
}

#[derive(Debug, thiserror::Error)]
pub enum DispatchError {
    #[error("signing the app JWT failed: {0}")]
    Jwt(#[from] jsonwebtoken::errors::Error),
    #[error("GitHub answered with an error: {0}")]
    GitHub(#[from] reqwest::Error),
}

#[derive(Serialize)]
struct AppClaims<'a> {
    iat: u64,
    exp: u64,
    iss: &'a str,
}

#[derive(Deserialize)]
struct Installation {
    id: u64,
}

#[derive(Serialize)]
struct TokenRequest<'a> {
    repositories: [&'a str; 1],
    permissions: Permissions,
}

#[derive(Serialize)]
struct Permissions {
    actions: &'static str,
}

#[derive(Deserialize)]
struct AccessToken {
    token: String,
    #[serde(with = "time::serde::rfc3339")]
    expires_at: OffsetDateTime,
}

impl AccessToken {
    fn is_usable(&self) -> bool {
        OffsetDateTime::now_utc() < self.expires_at - TOKEN_MARGIN
    }
}

#[derive(Serialize)]
struct WorkflowDispatch<'a> {
    #[serde(rename = "ref")]
    reference: &'a str,
    inputs: Inputs,
}

#[derive(Serialize)]
struct Inputs {
    slugs: String,
}

#[derive(Default)]
struct Session {
    installation: Option<u64>,
    token: Option<AccessToken>,
}

pub struct Dispatcher {
    http: reqwest::Client,
    api: String,
    app_id: String,
    key: EncodingKey,
    repository: String,
    workflow: String,
    reference: String,
    session: Mutex<Session>,
}

impl Dispatcher {
    pub fn new(
        http: reqwest::Client,
        api: &str,
        settings: Settings,
    ) -> Result<Self, jsonwebtoken::errors::Error> {
        Ok(Self {
            http,
            api: api.trim_end_matches('/').to_owned(),
            app_id: settings.app_id,
            key: EncodingKey::from_rsa_pem(settings.private_key.as_bytes())?,
            repository: settings.repository,
            workflow: settings.workflow,
            reference: settings.reference,
            session: Mutex::new(Session::default()),
        })
    }

    pub async fn dispatch(&self, slugs: &[String]) -> Result<(), DispatchError> {
        let token = self.token().await?;
        self.request(
            Method::POST,
            &format!(
                "/repos/{}/actions/workflows/{}/dispatches",
                self.repository, self.workflow
            ),
        )
        .bearer_auth(token)
        .json(&WorkflowDispatch {
            reference: &self.reference,
            inputs: Inputs {
                slugs: slugs.join(" "),
            },
        })
        .send()
        .await?
        .error_for_status()?;
        Ok(())
    }

    async fn token(&self) -> Result<String, DispatchError> {
        let mut session = self.session.lock().await;
        if let Some(token) = session.token.as_ref().filter(|token| token.is_usable()) {
            return Ok(token.token.clone());
        }
        match self.access_token(&mut session).await {
            Ok(token) => Ok(session.token.insert(token).token.clone()),
            Err(error) => {
                session.installation = None;
                Err(error)
            }
        }
    }

    async fn access_token(&self, session: &mut Session) -> Result<AccessToken, DispatchError> {
        let app_jwt = self.app_jwt()?;
        let installation = match session.installation {
            Some(id) => id,
            None => *session
                .installation
                .insert(self.installation(&app_jwt).await?),
        };
        let name = self
            .repository
            .split_once('/')
            .map_or(self.repository.as_str(), |(_, name)| name);
        Ok(self
            .request(
                Method::POST,
                &format!("/app/installations/{installation}/access_tokens"),
            )
            .bearer_auth(&app_jwt)
            .json(&TokenRequest {
                repositories: [name],
                permissions: Permissions { actions: "write" },
            })
            .send()
            .await?
            .error_for_status()?
            .json()
            .await?)
    }

    async fn installation(&self, app_jwt: &str) -> Result<u64, DispatchError> {
        let installation: Installation = self
            .request(
                Method::GET,
                &format!("/repos/{}/installation", self.repository),
            )
            .bearer_auth(app_jwt)
            .send()
            .await?
            .error_for_status()?
            .json()
            .await?;
        Ok(installation.id)
    }

    fn app_jwt(&self) -> Result<String, jsonwebtoken::errors::Error> {
        let now = get_current_timestamp();
        encode(
            &Header::new(Algorithm::RS256),
            &AppClaims {
                iat: now - 60,
                exp: now + 540,
                iss: &self.app_id,
            },
            &self.key,
        )
    }

    fn request(&self, method: Method, path: &str) -> RequestBuilder {
        self.http
            .request(method, format!("{}{path}", self.api))
            .header("accept", "application/vnd.github+json")
            .header("x-github-api-version", "2022-11-28")
            .timeout(TIMEOUT)
    }
}
