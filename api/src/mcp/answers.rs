use std::collections::BTreeMap;

use serde::Serialize;

use crate::catalog::{Fit, Replacement, Terms, Tool};
use crate::filters::{Filters, NearMiss};
use crate::qualifiers::Unchecked;
use crate::search::{Interpretation, Interpreter};
use crate::state::Loaded;
use crate::window::Window;

use super::names::Named;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Summary<'a> {
    slug: &'a str,
    name: &'a str,
    category: &'a str,
    repository: &'a str,
    #[serde(skip_serializing_if = "Option::is_none")]
    description: Option<&'a str>,
    #[serde(skip_serializing_if = "Option::is_none")]
    language: Option<&'a str>,
    #[serde(skip_serializing_if = "Option::is_none")]
    license: Option<&'a str>,
    terms: Terms,
    stars: u64,
    self_host: bool,
    maintained: bool,
    pushed_at: &'a str,
    #[serde(skip_serializing_if = "Option::is_none")]
    release: Option<&'a str>,
    #[serde(skip_serializing_if = "Vec::is_empty")]
    replaces: Vec<Target<'a>>,
}

#[derive(Debug, Serialize)]
struct Target<'a> {
    tool: &'a str,
    fit: Fit,
}

impl<'a> From<&'a Tool> for Summary<'a> {
    fn from(tool: &'a Tool) -> Self {
        Self {
            slug: &tool.slug,
            name: &tool.name,
            category: &tool.category,
            repository: &tool.repository,
            description: tool.repo.description.as_deref(),
            language: tool.repo.language.as_deref(),
            license: tool.repo.license.as_deref(),
            terms: tool.terms,
            stars: tool.repo.stars,
            self_host: tool.self_host,
            maintained: tool.is_maintained(),
            pushed_at: &tool.repo.pushed_at,
            release: tool.release.as_ref().map(|r| r.tag.as_str()),
            replaces: tool
                .replaces
                .iter()
                .map(|r| Target {
                    tool: &r.tool,
                    fit: r.fit,
                })
                .collect(),
        }
    }
}

#[derive(Debug, Serialize)]
pub struct Near<'a> {
    tool: Summary<'a>,
    missing: &'a [String],
}

fn near(misses: &[NearMiss]) -> Vec<Near<'_>> {
    misses
        .iter()
        .map(|miss| Near {
            tool: Summary::from(&miss.tool),
            missing: &miss.missing,
        })
        .collect()
}

#[derive(Debug, Serialize)]
pub struct Page<'a> {
    count: usize,
    limit: usize,
    offset: usize,
    tools: Vec<Summary<'a>>,
    #[serde(skip_serializing_if = "Vec::is_empty")]
    near: Vec<Near<'a>>,
}

impl<'a> Page<'a> {
    fn of(matched: Vec<&'a Tool>, window: &Window, misses: &'a [NearMiss]) -> Self {
        let (limit, offset) = window.bounds();
        Self {
            count: matched.len(),
            limit,
            offset,
            tools: window.cut(matched).into_iter().map(Summary::from).collect(),
            near: near(misses),
        }
    }
}

pub fn listing<'a>(
    loaded: &'a Loaded,
    filters: &Filters,
    window: &Window,
    misses: &'a [NearMiss],
) -> Page<'a> {
    Page::of(filters.apply(&loaded.catalog.tools), window, misses)
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Alternative<'a> {
    fit: Fit,
    #[serde(skip_serializing_if = "Option::is_none")]
    note: Option<&'a str>,
    #[serde(skip_serializing_if = "Option::is_none")]
    migration: Option<&'a str>,
    #[serde(flatten)]
    tool: Summary<'a>,
}

#[derive(Debug, Serialize)]
pub struct Alternatives<'a> {
    replaces: Named<'a>,
    count: usize,
    limit: usize,
    offset: usize,
    alternatives: Vec<Alternative<'a>>,
    #[serde(skip_serializing_if = "Vec::is_empty")]
    near: Vec<Near<'a>>,
}

pub fn alternatives<'a>(
    loaded: &'a Loaded,
    target: Named<'a>,
    filters: &Filters,
    window: &Window,
    misses: &'a [NearMiss],
) -> Alternatives<'a> {
    let matched = filters.apply(&loaded.catalog.tools);
    let (limit, offset) = window.bounds();
    let replacement = |tool: &'a Tool| tool.replaces.iter().find(|r| r.tool == target.slug);
    Alternatives {
        replaces: target,
        count: matched.len(),
        limit,
        offset,
        alternatives: window
            .cut(matched)
            .into_iter()
            .filter_map(|tool| {
                replacement(tool).map(|r: &Replacement| Alternative {
                    fit: r.fit,
                    note: r.note.as_deref(),
                    migration: r.migration.as_deref(),
                    tool: Summary::from(tool),
                })
            })
            .collect(),
        near: near(misses),
    }
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CategoryEntry<'a> {
    key: &'a str,
    name: &'a str,
    description: &'a str,
    tools: usize,
    self_host: bool,
    #[serde(skip_serializing_if = "BTreeMap::is_empty")]
    capabilities: BTreeMap<&'a str, &'a str>,
}

#[derive(Debug, Serialize)]
pub struct Categories<'a> {
    categories: Vec<CategoryEntry<'a>>,
}

pub fn categories(loaded: &Loaded) -> Categories<'_> {
    let mut counts: BTreeMap<&str, usize> = BTreeMap::new();
    for tool in Filters::default().apply(&loaded.catalog.tools) {
        *counts.entry(tool.category.as_str()).or_default() += 1;
    }
    Categories {
        categories: loaded
            .catalog
            .categories
            .iter()
            .map(|(key, category)| CategoryEntry {
                key,
                name: &category.name,
                description: &category.description,
                tools: counts.get(key.as_str()).copied().unwrap_or(0),
                self_host: category.self_host,
                capabilities: category
                    .capabilities
                    .iter()
                    .map(|(key, term)| (key.as_str(), term.label.as_str()))
                    .collect(),
            })
            .collect(),
    }
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Searched<'a> {
    query: &'a str,
    filters: &'a Filters,
    interpreted_by: Interpreter,
    #[serde(skip_serializing_if = "<[_]>::is_empty")]
    unchecked: &'a [Unchecked],
    #[serde(flatten)]
    results: Page<'a>,
}

pub fn searched<'a>(
    loaded: &'a Loaded,
    query: &'a str,
    read: &'a Interpretation,
    window: &Window,
    misses: &'a [NearMiss],
) -> Searched<'a> {
    Searched {
        query,
        filters: &read.filters,
        interpreted_by: read.interpreted_by,
        unchecked: &read.unchecked,
        results: Page::of(read.select(&loaded.catalog.tools), window, misses),
    }
}
