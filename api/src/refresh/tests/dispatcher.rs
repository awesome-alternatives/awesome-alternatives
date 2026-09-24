use std::sync::atomic::Ordering;

use super::{Dispatched, GitHub, dispatch_settings};
use crate::refresh::dispatch::Dispatcher;

async fn dispatcher(github: &GitHub) -> Dispatcher {
    Dispatcher::new(
        reqwest::Client::new(),
        &github.serve().await,
        dispatch_settings(),
    )
    .unwrap()
}

fn slugs(names: &[&str]) -> Vec<String> {
    names.iter().map(|&name| name.to_owned()).collect()
}

#[tokio::test]
async fn a_dispatch_carries_the_slugs_on_main_and_reuses_its_installation_token() {
    let github = GitHub::new();
    let dispatcher = dispatcher(&github).await;
    dispatcher
        .dispatch(&slugs(&["tool-a", "tool-b"]))
        .await
        .unwrap();
    dispatcher.dispatch(&slugs(&["tool-c"])).await.unwrap();
    assert_eq!(
        github.dispatched(),
        vec![
            Dispatched {
                token: "ghs_1".into(),
                reference: "main".into(),
                slugs: "tool-a tool-b".into(),
            },
            Dispatched {
                token: "ghs_1".into(),
                reference: "main".into(),
                slugs: "tool-c".into(),
            },
        ]
    );
    assert_eq!(github.tokens_issued.load(Ordering::SeqCst), 1);
    assert_eq!(github.installation_lookups.load(Ordering::SeqCst), 1);
}

#[tokio::test]
async fn a_token_about_to_expire_is_replaced_but_the_installation_is_not_looked_up_again() {
    let github = GitHub::expiring_at("2000-01-01T00:00:00Z");
    let dispatcher = dispatcher(&github).await;
    dispatcher.dispatch(&slugs(&["tool-a"])).await.unwrap();
    dispatcher.dispatch(&slugs(&["tool-a"])).await.unwrap();
    let tokens: Vec<String> = github.dispatched().into_iter().map(|d| d.token).collect();
    assert_eq!(tokens, ["ghs_1", "ghs_2"]);
    assert_eq!(github.installation_lookups.load(Ordering::SeqCst), 1);
}

#[tokio::test]
async fn a_dispatch_github_refuses_is_an_error() {
    let github = GitHub::new();
    github.failing_dispatches.store(1, Ordering::SeqCst);
    let dispatcher = dispatcher(&github).await;
    assert!(dispatcher.dispatch(&slugs(&["tool-a"])).await.is_err());
    assert!(github.dispatched().is_empty());
}
