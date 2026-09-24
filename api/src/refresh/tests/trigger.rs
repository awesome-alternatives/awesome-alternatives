use std::sync::atomic::Ordering;

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
