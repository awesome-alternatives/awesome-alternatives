use std::collections::{BTreeMap, HashMap};
use std::time::Duration;

use serde::{Deserialize, Serialize};

pub const DEFAULT_BASE_URL: &str = "https://api.typesafe.ai";

#[derive(Debug, Clone, PartialEq, Serialize)]
#[serde(tag = "type", rename_all = "lowercase")]
pub enum Question {
    Choice {
        instructions: String,
        criteria: BTreeMap<String, Option<String>>,
    },
    Noul {
        instructions: String,
    },
}

#[derive(Debug, Clone, PartialEq, Deserialize)]
#[serde(tag = "type", rename_all = "lowercase")]
pub enum Answer {
    Choice { choice: String, confidence: f64 },
    Noul { noul: f64 },
}

#[derive(Serialize)]
struct Request<'a> {
    state: &'a str,
    questions: &'a BTreeMap<&'static str, Question>,
    model: &'a str,
}

#[derive(Deserialize)]
struct Response {
    answers: HashMap<String, Answer>,
}

#[derive(Debug, Clone)]
pub struct JevClient {
    http: reqwest::Client,
    base_url: String,
    api_key: String,
    model: String,
}

impl JevClient {
    pub fn new(http: reqwest::Client, base_url: &str, api_key: String, model: String) -> Self {
        Self {
            http,
            base_url: base_url.trim_end_matches('/').to_owned(),
            api_key,
            model,
        }
    }

    pub async fn system_one(
        &self,
        state: &str,
        questions: &BTreeMap<&'static str, Question>,
    ) -> Result<HashMap<String, Answer>, reqwest::Error> {
        let response: Response = self
            .http
            .post(format!("{}/v1/systemone", self.base_url))
            .bearer_auth(&self.api_key)
            .timeout(Duration::from_secs(10))
            .json(&Request {
                state,
                questions,
                model: &self.model,
            })
            .send()
            .await?
            .error_for_status()?
            .json()
            .await?;
        Ok(response.answers)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use axum::http::HeaderMap;
    use axum::{Json, Router, routing::post};
    use serde_json::{Value, json};
    use tokio::sync::oneshot;

    async fn serve(router: Router) -> String {
        let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
        let addr = listener.local_addr().unwrap();
        tokio::spawn(async move { axum::serve(listener, router).await.unwrap() });
        format!("http://{addr}")
    }

    #[tokio::test]
    async fn sends_the_wire_format_the_sdk_sends() {
        let (tx, rx) = oneshot::channel::<(Option<String>, Value)>();
        let tx = std::sync::Arc::new(std::sync::Mutex::new(Some(tx)));
        let router = Router::new().route(
            "/v1/systemone",
            post(move |headers: HeaderMap, Json(body): Json<Value>| async move {
                let tx = std::sync::Arc::clone(&tx);
                let auth = headers
                    .get("authorization")
                    .map(|v| v.to_str().unwrap().to_owned());
                tx.lock().unwrap().take().unwrap().send((auth, body)).unwrap();
                Json(json!({
                    "answers": {
                        "target": { "type": "choice", "choice": "semantic-release", "confidence": 0.9, "probabilities": {} },
                        "drop_in": { "type": "noul", "noul": 0.2 }
                    },
                    "model": "jev-1.13.0",
                    "usage": { "input_tokens": 10, "output_tokens": 1 }
                }))
            }),
        );
        let base = serve(router).await;
        let client = JevClient::new(
            reqwest::Client::new(),
            &format!("{base}/"),
            "k".into(),
            "jev-1.13.0".into(),
        );
        let questions = BTreeMap::from([
            (
                "target",
                Question::Choice {
                    instructions: "Which tool?".into(),
                    criteria: BTreeMap::from([("semantic-release".into(), None)]),
                },
            ),
            (
                "drop_in",
                Question::Noul {
                    instructions: "Drop-in?".into(),
                },
            ),
        ]);

        let answers = client
            .system_one("rust semantic-release", &questions)
            .await
            .unwrap();

        let (auth, body) = rx.await.unwrap();
        assert_eq!(auth.as_deref(), Some("Bearer k"));
        assert_eq!(
            body,
            json!({
                "state": "rust semantic-release",
                "model": "jev-1.13.0",
                "questions": {
                    "target": { "type": "choice", "instructions": "Which tool?", "criteria": { "semantic-release": null } },
                    "drop_in": { "type": "noul", "instructions": "Drop-in?" }
                }
            })
        );
        assert_eq!(
            answers["target"],
            Answer::Choice {
                choice: "semantic-release".into(),
                confidence: 0.9
            }
        );
        assert_eq!(answers["drop_in"], Answer::Noul { noul: 0.2 });
    }

    #[tokio::test]
    async fn surfaces_http_errors() {
        let router = Router::new().route(
            "/v1/systemone",
            post(|| async { (axum::http::StatusCode::TOO_MANY_REQUESTS, "slow down") }),
        );
        let base = serve(router).await;
        let client = JevClient::new(
            reqwest::Client::new(),
            &base,
            "k".into(),
            "jev-latest".into(),
        );
        assert!(client.system_one("x", &BTreeMap::new()).await.is_err());
    }
}
