use std::num::NonZeroU32;
use std::sync::Arc;
use std::sync::atomic::{AtomicUsize, Ordering};

use axum::routing::post;
use axum::{Json, Router};
use serde_json::{Value, json};

use crate::catalog::{Fit, Replacement, RepoFacts, Terms, Tool};
use crate::jev::JevClient;
use crate::jev_budget::{Limits, MeteredJev};
use crate::refresh::{self, Refresh};

pub fn refresh_off() -> Refresh {
    Refresh::new(
        refresh::Settings {
            webhook_secret: None,
            oidc_audience: refresh::oidc::DEFAULT_AUDIENCE.into(),
            oidc_jwks_url: "http://127.0.0.1:9".into(),
            cooldown: refresh::COOLDOWN,
            dispatch: None,
        },
        reqwest::Client::new(),
        "http://127.0.0.1:9",
    )
    .unwrap()
}

pub fn tool(
    slug: &str,
    language: &str,
    license: &str,
    replaces: &[(&str, Fit)],
    stars: u64,
) -> Tool {
    Tool {
        slug: slug.into(),
        name: slug.into(),
        repository: format!("https://github.com/example/{slug}"),
        category: "release-automation".into(),
        replaces: replaces
            .iter()
            .map(|(tool, fit)| Replacement {
                tool: (*tool).into(),
                fit: *fit,
                note: None,
                migration: None,
            })
            .collect(),
        affiliation: None,
        path: None,
        repo: RepoFacts {
            full_name: format!("example/{slug}"),
            description: None,
            homepage: None,
            language: Some(language.into()),
            license: Some(license.into()),
            stars,
            forks: 0,
            topics: Vec::new(),
            archived: false,
            pushed_at: "2026-09-01T00:00:00Z".into(),
        },
        release: None,
        maintainer_verified: false,
        flags: Vec::new(),
        terms: Terms::Open,
        self_host: false,
        capabilities: Default::default(),
        deploy: Vec::new(),
        star_history: None,
    }
}

pub struct MockJev {
    base: String,
    calls: Arc<AtomicUsize>,
}

impl MockJev {
    pub fn calls(&self) -> usize {
        self.calls.load(Ordering::SeqCst)
    }

    pub fn metered(&self, per_minute: u32, per_day: u32) -> MeteredJev {
        let client = JevClient::new(
            reqwest::Client::new(),
            &self.base,
            "k".into(),
            "jev-latest".into(),
        );
        MeteredJev::new(
            client,
            Limits {
                per_minute: NonZeroU32::new(per_minute).unwrap(),
                per_day,
            },
        )
    }
}

pub async fn mock_jev() -> MockJev {
    mock_jev_answering(json!({
        "target": { "type": "choice", "choice": "semantic-release", "confidence": 0.9 }
    }))
    .await
}

pub async fn mock_jev_answering(answers: Value) -> MockJev {
    let calls = Arc::new(AtomicUsize::new(0));
    let counted = Arc::clone(&calls);
    let router = Router::new().route(
        "/v1/systemone",
        post(move || {
            let answers = answers.clone();
            async move {
                counted.fetch_add(1, Ordering::SeqCst);
                Json(json!({ "answers": answers }))
            }
        }),
    );
    let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
    let addr = listener.local_addr().unwrap();
    tokio::spawn(async move { axum::serve(listener, router).await.unwrap() });
    MockJev {
        base: format!("http://{addr}"),
        calls,
    }
}
