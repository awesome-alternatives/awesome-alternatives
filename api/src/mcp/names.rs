use std::collections::HashSet;

use serde::Serialize;

use crate::lexical::{normalize, relevance};
use crate::state::Loaded;

const CLOSE_MATCHES: usize = 5;
const SHORTEST_FRAGMENT: usize = 3;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize)]
pub struct Named<'a> {
    pub slug: &'a str,
    pub name: &'a str,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize)]
pub struct Suggestion {
    pub slug: String,
    pub name: String,
}

impl From<Named<'_>> for Suggestion {
    fn from(named: Named<'_>) -> Self {
        Self {
            slug: named.slug.to_owned(),
            name: named.name.to_owned(),
        }
    }
}

pub fn replaceable(loaded: &Loaded) -> impl Iterator<Item = Named<'_>> {
    let targets = loaded
        .vocabulary
        .targets
        .iter()
        .map(|(slug, name)| Named { slug, name });
    targets
        .chain(listed(loaded))
        .chain(loaded.catalog.products.iter().map(|p| Named {
            slug: &p.slug,
            name: &p.name,
        }))
}

pub fn listed(loaded: &Loaded) -> impl Iterator<Item = Named<'_>> {
    loaded.catalog.tools.iter().map(|t| Named {
        slug: &t.slug,
        name: &t.name,
    })
}

pub fn resolve<'a>(
    mut candidates: impl Iterator<Item = Named<'a>>,
    given: &str,
) -> Option<Named<'a>> {
    let given = given.trim();
    let wanted = normalize(given);
    if wanted.is_empty() {
        return None;
    }
    candidates
        .find(|n| n.slug == given || normalize(n.slug) == wanted || normalize(n.name) == wanted)
}

pub fn close_to<'a>(candidates: impl Iterator<Item = Named<'a>>, given: &str) -> Vec<Suggestion> {
    let wanted = normalize(given);
    let contains =
        |label: &str| wanted.len() >= SHORTEST_FRAGMENT && normalize(label).contains(&wanted);
    let mut scored: Vec<(usize, Named<'a>)> = candidates
        .filter_map(|n| {
            let shared = relevance(&wanted, n.name).max(relevance(&wanted, n.slug));
            let score = shared + usize::from(contains(n.name) || contains(n.slug));
            (score > 0).then_some((score, n))
        })
        .collect();
    scored.sort_by(|(a, x), (b, y)| b.cmp(a).then_with(|| x.name.len().cmp(&y.name.len())));
    let mut seen = HashSet::new();
    scored
        .into_iter()
        .map(|(_, n)| n)
        .filter(|n| seen.insert(n.slug))
        .take(CLOSE_MATCHES)
        .map(Suggestion::from)
        .collect()
}
