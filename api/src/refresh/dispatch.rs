use std::sync::Arc;

use reqwest::Method;
use serde::Serialize;

use crate::github_app::{App, Error, InstallationToken, Scope};

pub const DEFAULT_WORKFLOW: &str = "refresh-tools.yml";
pub const DEFAULT_REF: &str = "main";

pub struct Settings {
    pub workflow: String,
    pub reference: String,
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

pub struct Dispatcher {
    token: InstallationToken,
    workflow: String,
    reference: String,
}

impl Dispatcher {
    pub fn new(app: Arc<App>, settings: Settings) -> Self {
        Self {
            token: InstallationToken::new(app, Scope::DispatchWorkflows),
            workflow: settings.workflow,
            reference: settings.reference,
        }
    }

    pub async fn dispatch(&self, slugs: &[String]) -> Result<(), Error> {
        let app = self.token.app();
        let path = format!(
            "/repos/{}/actions/workflows/{}/dispatches",
            app.repository(),
            self.workflow
        );
        let body = WorkflowDispatch {
            reference: &self.reference,
            inputs: Inputs {
                slugs: slugs.join(" "),
            },
        };
        self.token
            .send(|| app.request(Method::POST, &path).json(&body))
            .await?
            .error_for_status()
            .map(drop)
            .map_err(Error::Request)
    }
}
