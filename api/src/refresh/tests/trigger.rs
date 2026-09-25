use std::sync::atomic::Ordering;
use std::time::Duration;

use super::{GitHub, refresh};
use crate::catalog::Tool;
use crate::fixtures::tool;
use crate::refresh::{RefreshError, slugs_for};

fn hosted(slug: &str, full_name: &str) -> Tool {
    let mut tool = tool(slug, "Rust", "MIT", &[], 1);
    tool.repo.full_name = full_name.into();
    tool
}

#[test]
fn a_repository_maps_to_its_tools_ignoring_case() {
    let tools = [hosted("knope", "knope-dev/knope"), hosted("other", "x/y")];
    assert_eq!(slugs_for(&tools, "Knope-Dev/KNOPE"), ["knope"]);
}

#[test]
fn a_monorepo_maps_to_every_tool_it_backs_in_slug_order() {
    let tools = [
        hosted("zeta-cli", "acme/mono"),
        hosted("elsewhere", "acme/other"),
        hosted("alpha-lib", "acme/mono"),
    ];
    assert_eq!(slugs_for(&tools, "acme/mono"), ["alpha-lib", "zeta-cli"]);
}

#[test]
fn a_repository_outside_the_catalog_maps_to_nothing() {
    let tools = [hosted("knope", "knope-dev/knope")];
    assert!(slugs_for(&tools, "knope-dev/knope-fork").is_empty());
}

#[tokio::test]
async fn a_second_release_within_the_cooldown_is_coalesced_whatever_the_case() {
    let github = GitHub::new();
    let refresh = refresh(&github.serve().await, "http://127.0.0.1:9", true);
    let dispatcher = refresh.dispatcher().unwrap();
    let first = refresh
        .trigger(dispatcher, "acme/mono", vec!["a".into()])
        .await
        .unwrap();
    let second = refresh
        .trigger(dispatcher, "ACME/Mono", vec!["a".into()])
        .await
        .unwrap();
    let other = refresh
        .trigger(dispatcher, "acme/other", vec!["b".into()])
        .await
        .unwrap();
    assert!(first.dispatched);
    assert!(!second.dispatched);
    assert!(other.dispatched);
    assert_eq!(github.dispatched().len(), 2);
}

#[tokio::test]
async fn a_failed_dispatch_does_not_hold_back_the_next_release() {
    let github = GitHub::new();
    github.failing_dispatches.store(1, Ordering::SeqCst);
    let refresh = refresh(&github.serve().await, "http://127.0.0.1:9", true);
    let dispatcher = refresh.dispatcher().unwrap();
    assert!(matches!(
        refresh
            .trigger(dispatcher, "acme/mono", vec!["a".into()])
            .await,
        Err(RefreshError::Dispatch)
    ));
    let retried = refresh
        .trigger(dispatcher, "acme/mono", vec!["a".into()])
        .await
        .unwrap();
    assert!(retried.dispatched);
    assert_eq!(github.dispatched().len(), 1);
}

const GITHUB_DELAY: Duration = Duration::from_millis(300);
const CLIENT_PATIENCE: Duration = Duration::from_millis(50);

async fn eventually(what: &str, check: impl Fn() -> bool) {
    tokio::time::timeout(Duration::from_secs(5), async {
        while !check() {
            tokio::time::sleep(Duration::from_millis(10)).await;
        }
    })
    .await
    .unwrap_or_else(|_| panic!("{what} never happened"));
}

#[tokio::test]
async fn a_dispatch_outlives_the_request_that_started_it_and_holds_the_cooldown() {
    let mut github = GitHub::new();
    github.token_delay = GITHUB_DELAY;
    let refresh = refresh(&github.serve().await, "http://127.0.0.1:9", true);
    let dispatcher = refresh.dispatcher().unwrap();
    let dropped = tokio::time::timeout(
        CLIENT_PATIENCE,
        refresh.trigger(dispatcher, "acme/mono", vec!["a".into()]),
    )
    .await;
    assert!(
        dropped.is_err(),
        "the request finished before GitHub answered"
    );

    eventually("the dispatch", || github.dispatched().len() == 1).await;
    assert_eq!(github.dispatched()[0].slugs, "a");
    let again = refresh
        .trigger(dispatcher, "acme/mono", vec!["a".into()])
        .await
        .unwrap();
    assert!(!again.dispatched);
    assert_eq!(github.dispatched().len(), 1);
}

#[tokio::test]
async fn a_dispatch_that_fails_after_its_request_was_dropped_clears_the_cooldown() {
    let mut github = GitHub::new();
    github.token_delay = GITHUB_DELAY;
    github.failing_dispatches.store(1, Ordering::SeqCst);
    let refresh = refresh(&github.serve().await, "http://127.0.0.1:9", true);
    let dispatcher = refresh.dispatcher().unwrap();
    let dropped = tokio::time::timeout(
        CLIENT_PATIENCE,
        refresh.trigger(dispatcher, "acme/mono", vec!["a".into()]),
    )
    .await;
    assert!(
        dropped.is_err(),
        "the request finished before GitHub answered"
    );
    assert!(refresh.recent.contains_key("acme/mono"));

    eventually("clearing the cooldown", || {
        !refresh.recent.contains_key("acme/mono")
    })
    .await;
    assert_eq!(github.failing_dispatches.load(Ordering::SeqCst), 0);
    let retried = refresh
        .trigger(dispatcher, "acme/mono", vec!["a".into()])
        .await
        .unwrap();
    assert!(retried.dispatched);
    assert_eq!(github.dispatched().len(), 1);
}
