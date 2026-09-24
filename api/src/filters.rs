use serde::{Deserialize, Deserializer, Serialize};

use crate::catalog::{Fit, Terms, Tool};

#[derive(Debug, Default, Clone, PartialEq, Eq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Filters {
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub replaces: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub language: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub license: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub category: Option<String>,
    #[serde(default)]
    pub drop_in: bool,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub terms: Option<Terms>,
    #[serde(default, skip_serializing_if = "std::ops::Not::not")]
    pub self_host: bool,
    #[serde(default, skip_serializing_if = "std::ops::Not::not")]
    pub maintained: bool,
    #[serde(
        default,
        skip_serializing_if = "Vec::is_empty",
        deserialize_with = "list"
    )]
    pub capabilities: Vec<String>,
}

#[derive(Debug, Clone, Serialize)]
pub struct NearMiss {
    pub tool: Tool,
    pub missing: Vec<String>,
}

pub const NEAR_LIMIT: usize = 10;

fn list<'de, D: Deserializer<'de>>(deserializer: D) -> Result<Vec<String>, D::Error> {
    #[derive(Deserialize)]
    #[serde(untagged)]
    enum Given {
        Joined(String),
        Listed(Vec<String>),
    }
    Ok(match Given::deserialize(deserializer)? {
        Given::Joined(text) => text
            .split(',')
            .map(str::trim)
            .filter(|s| !s.is_empty())
            .map(str::to_owned)
            .collect(),
        Given::Listed(items) => items,
    })
}

impl Filters {
    pub fn apply<'a>(&self, tools: &'a [Tool]) -> Vec<&'a Tool> {
        let mut matched: Vec<&Tool> = tools
            .iter()
            .filter(|t| !t.repo.archived)
            .filter(|t| same(t.repo.language.as_deref(), self.language.as_deref()))
            .filter(|t| same(t.repo.license.as_deref(), self.license.as_deref()))
            .filter(|t| self.category.as_ref().is_none_or(|c| &t.category == c))
            .filter(|t| self.terms.is_none_or(|terms| t.terms == terms))
            .filter(|t| !self.self_host || t.self_host)
            .filter(|t| !self.maintained || t.is_maintained())
            .filter(|t| {
                self.capabilities
                    .iter()
                    .all(|c| t.capabilities.contains_key(c))
            })
            .filter(|t| self.replaces.is_none() || self.fit(t).is_some())
            .collect();
        matched.sort_by_key(|t| (self.fit(t).map(fit_rank), std::cmp::Reverse(t.repo.stars)));
        matched
    }

    pub fn names_a_scope(&self) -> bool {
        self.replaces.is_some()
            || self.language.is_some()
            || self.license.is_some()
            || self.category.is_some()
            || !self.capabilities.is_empty()
    }

    pub fn near_misses(&self, tools: &[Tool]) -> Vec<NearMiss> {
        if self.capabilities.is_empty() {
            return Vec::new();
        }
        let relaxed = Filters {
            capabilities: Vec::new(),
            ..self.clone()
        };
        let mut near: Vec<NearMiss> = relaxed
            .apply(tools)
            .into_iter()
            .filter_map(|tool| {
                let missing: Vec<String> = self
                    .capabilities
                    .iter()
                    .filter(|c| !tool.capabilities.contains_key(*c))
                    .cloned()
                    .collect();
                (!missing.is_empty() && missing.len() < self.capabilities.len()).then(|| NearMiss {
                    tool: tool.clone(),
                    missing,
                })
            })
            .collect();
        near.sort_by_key(|n| n.missing.len());
        near.truncate(NEAR_LIMIT);
        near
    }

    fn fit(&self, tool: &Tool) -> Option<Fit> {
        let target = self.replaces.as_deref()?;
        tool.replaces
            .iter()
            .find(|r| r.tool == target)
            .map(|r| r.fit)
            .filter(|fit| !self.drop_in || *fit == Fit::DropIn)
    }
}

fn same(value: Option<&str>, wanted: Option<&str>) -> bool {
    match wanted {
        None => true,
        Some(wanted) => value.is_some_and(|v| v.eq_ignore_ascii_case(wanted)),
    }
}

fn fit_rank(fit: Fit) -> u8 {
    match fit {
        Fit::DropIn => 0,
        Fit::Full => 1,
        Fit::Partial => 2,
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::fixtures::tool;

    fn slugs(tools: Vec<&Tool>) -> Vec<&str> {
        tools.into_iter().map(|t| t.slug.as_str()).collect()
    }

    #[test]
    fn ranks_by_fit_before_stars() {
        let tools = [
            tool(
                "partial-big",
                "Rust",
                "MIT",
                &[("semantic-release", Fit::Partial)],
                900,
            ),
            tool(
                "full-small",
                "Go",
                "MIT",
                &[("semantic-release", Fit::Full)],
                10,
            ),
            tool(
                "drop-in",
                "Rust",
                "MIT",
                &[("semantic-release", Fit::DropIn)],
                1,
            ),
            tool("unrelated", "Rust", "MIT", &[], 5000),
        ];
        let filters = Filters {
            replaces: Some("semantic-release".into()),
            ..Filters::default()
        };
        assert_eq!(
            slugs(filters.apply(&tools)),
            ["drop-in", "full-small", "partial-big"]
        );
    }

    #[test]
    fn language_and_license_ignore_case_and_skip_unknown() {
        let mut unknown = tool("unknown", "Rust", "MIT", &[], 1);
        unknown.repo.language = None;
        let tools = [
            tool("rust-mit", "Rust", "MIT", &[], 1),
            tool("rust-apache", "Rust", "Apache-2.0", &[], 1),
            unknown,
        ];
        let filters = Filters {
            language: Some("rust".into()),
            license: Some("mit".into()),
            ..Filters::default()
        };
        assert_eq!(slugs(filters.apply(&tools)), ["rust-mit"]);
    }

    #[test]
    fn drop_in_excludes_other_fits_and_needs_a_target() {
        let tools = [
            tool("a", "Rust", "MIT", &[("x", Fit::Full)], 1),
            tool("b", "Rust", "MIT", &[("x", Fit::DropIn)], 1),
        ];
        let filters = Filters {
            replaces: Some("x".into()),
            drop_in: true,
            ..Filters::default()
        };
        assert_eq!(slugs(filters.apply(&tools)), ["b"]);
        let without_target = Filters {
            drop_in: true,
            ..Filters::default()
        };
        assert_eq!(without_target.apply(&tools).len(), 2);
    }

    #[test]
    fn category_narrows_to_an_exact_key() {
        let mut linting = tool("oxlint", "Rust", "MIT", &[], 1);
        linting.category = "javascript-lint-format".into();
        let tools = [tool("knope", "Rust", "MIT", &[], 1), linting];
        let filters = Filters {
            category: Some("javascript-lint-format".into()),
            ..Filters::default()
        };
        assert_eq!(slugs(filters.apply(&tools)), ["oxlint"]);
        assert_eq!(Filters::default().apply(&tools).len(), 2);
    }

    #[test]
    fn terms_self_hosting_and_maintenance_each_narrow_the_list() {
        let open = tool("open", "Go", "MIT", &[], 1);
        let mut closed = tool("closed", "Go", "Other", &[], 1);
        closed.terms = Terms::SourceAvailable;
        let mut hosted = tool("hosted", "Go", "MIT", &[], 1);
        hosted.self_host = true;
        let mut idle = tool("idle", "Go", "MIT", &[], 1);
        idle.flags = vec!["inactive".into()];
        let tools = [open, closed, hosted, idle];
        let only = |filters: Filters| slugs(filters.apply(&tools));
        assert_eq!(
            only(Filters {
                terms: Some(Terms::Open),
                ..Filters::default()
            }),
            ["open", "hosted", "idle"]
        );
        assert_eq!(
            only(Filters {
                self_host: true,
                ..Filters::default()
            }),
            ["hosted"]
        );
        assert_eq!(
            only(Filters {
                maintained: true,
                ..Filters::default()
            }),
            ["open", "closed", "hosted"]
        );
    }

    #[test]
    fn qualifiers_alone_do_not_name_a_scope() {
        let qualified = Filters {
            terms: Some(Terms::Open),
            self_host: true,
            maintained: true,
            ..Filters::default()
        };
        assert!(!qualified.names_a_scope());
        let scoped = Filters {
            language: Some("Rust".into()),
            ..Filters::default()
        };
        assert!(scoped.names_a_scope());
    }

    #[test]
    fn archived_tools_are_never_returned() {
        let mut archived = tool("old", "Rust", "MIT", &[], 1);
        archived.repo.archived = true;
        assert!(Filters::default().apply(&[archived]).is_empty());
    }

    fn with_capabilities(slug: &str, keys: &[&str]) -> Tool {
        let mut forge = tool(slug, "Go", "MIT", &[("gitlab", Fit::Full)], 1);
        forge.capabilities = keys
            .iter()
            .map(|k| {
                (
                    (*k).to_owned(),
                    crate::catalog::Capability {
                        docs: format!("https://example.com/{k}"),
                        note: None,
                    },
                )
            })
            .collect();
        forge
    }

    #[test]
    fn every_requested_capability_must_be_declared() {
        let tools = [
            with_capabilities("both", &["ci", "container-registry"]),
            with_capabilities("ci-only", &["ci"]),
            with_capabilities("none", &[]),
        ];
        let filters = Filters {
            capabilities: vec!["ci".into(), "container-registry".into()],
            ..Filters::default()
        };
        assert_eq!(slugs(filters.apply(&tools)), ["both"]);
    }

    #[test]
    fn a_near_miss_names_what_it_lacks_and_one_that_matches_nothing_is_left_out() {
        let tools = [
            with_capabilities("both", &["ci", "container-registry"]),
            with_capabilities("ci-only", &["ci"]),
            with_capabilities("none", &[]),
        ];
        let filters = Filters {
            capabilities: vec!["ci".into(), "container-registry".into()],
            ..Filters::default()
        };
        let near = filters.near_misses(&tools);
        assert_eq!(near.len(), 1);
        assert_eq!(near[0].tool.slug, "ci-only");
        assert_eq!(near[0].missing, ["container-registry"]);
        assert!(Filters::default().near_misses(&tools).is_empty());
    }

    #[test]
    fn capabilities_read_from_a_comma_list_or_an_array() {
        let joined: Filters = serde_json::from_str(r#"{"capabilities":"ci, wiki"}"#).unwrap();
        let listed: Filters = serde_json::from_str(r#"{"capabilities":["ci","wiki"]}"#).unwrap();
        assert_eq!(joined.capabilities, ["ci", "wiki"]);
        assert_eq!(listed.capabilities, ["ci", "wiki"]);
        assert_eq!(
            serde_json::to_string(&listed).unwrap(),
            r#"{"dropIn":false,"capabilities":["ci","wiki"]}"#
        );
    }
}
