use std::collections::BTreeMap;

use schemars::JsonSchema;
use serde::de::value::StrDeserializer;
use serde::{Deserialize, Deserializer, Serialize};

use crate::catalog::{DeployMethod, Fit, Terms, Tool};

#[derive(Debug, Default, Clone, PartialEq, Eq, Deserialize, Serialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct Filters {
    #[serde(default, skip_serializing_if = "Option::is_none")]
    #[schemars(
        description = "Slug of the tool or closed product the results replace, such as semantic-release or gitlab. Results are then ranked by fit (drop-in, full, partial) before stars."
    )]
    pub replaces: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    #[schemars(description = "Main language of the repository, any case, such as Rust or Go.")]
    pub language: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    #[schemars(
        description = "SPDX licence of the repository, any case, such as MIT or Apache-2.0."
    )]
    pub license: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    #[schemars(
        description = "Category key, as list_categories names it. The key of a category merged into another still works."
    )]
    pub category: Option<String>,
    #[serde(default)]
    #[schemars(description = "Only drop-in replacements for the tool in replaces.")]
    pub drop_in: bool,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    #[schemars(
        description = "Licence terms: open (OSI licence), open-core, source-available, or unknown (not checked yet)."
    )]
    pub terms: Option<Terms>,
    #[serde(default, skip_serializing_if = "std::ops::Not::not")]
    #[schemars(description = "Only tools you can host yourself.")]
    pub self_host: bool,
    #[serde(default, skip_serializing_if = "std::ops::Not::not")]
    #[schemars(description = "Leave out archived repositories and those with no push in a year.")]
    pub maintained: bool,
    #[serde(
        default,
        skip_serializing_if = "Vec::is_empty",
        deserialize_with = "list"
    )]
    #[schemars(
        with = "Vec<String>",
        description = "Capability keys every result must declare, as list_categories lists them, such as ci or container-registry. Tools that have only some of them come back in near, with what they miss."
    )]
    pub capabilities: Vec<String>,
    #[serde(
        default,
        skip_serializing_if = "Vec::is_empty",
        deserialize_with = "list"
    )]
    #[schemars(
        with = "Vec<DeployMethod>",
        description = "Ways to deploy every result must offer: container, compose, helm, binary or package. A comma list or an array. Tools that offer only some of them come back in near, with what they miss."
    )]
    pub deploy: Vec<DeployMethod>,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct NearMiss {
    pub tool: Tool,
    pub missing: Vec<String>,
    #[serde(skip_serializing_if = "Vec::is_empty")]
    pub missing_deploy: Vec<DeployMethod>,
}

pub const NEAR_LIMIT: usize = 10;

fn list<'de, D, T>(deserializer: D) -> Result<Vec<T>, D::Error>
where
    D: Deserializer<'de>,
    T: Deserialize<'de>,
{
    #[derive(Deserialize)]
    #[serde(untagged)]
    enum Given<T> {
        Joined(String),
        Listed(Vec<T>),
    }
    match Given::<T>::deserialize(deserializer)? {
        Given::Joined(text) => text
            .split(',')
            .map(str::trim)
            .filter(|s| !s.is_empty())
            .map(|s| T::deserialize(StrDeserializer::<D::Error>::new(s)))
            .collect(),
        Given::Listed(items) => Ok(items),
    }
}

impl Filters {
    pub fn following(self, category_redirects: &BTreeMap<String, String>) -> Self {
        let category = self
            .category
            .map(|key| category_redirects.get(&key).cloned().unwrap_or(key));
        Self { category, ..self }
    }

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
            .filter(|t| self.deploy.iter().all(|m| t.deploy.contains(m)))
            .filter(|t| self.replaces.is_none() || self.fit(t).is_some())
            .collect();
        matched.sort_by_key(|t| {
            (
                self.fit(t).map(fit_rank),
                !t.maintainer_verified,
                std::cmp::Reverse(t.repo.stars),
            )
        });
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
        let required = self.capabilities.len() + self.deploy.len();
        if required == 0 {
            return Vec::new();
        }
        let relaxed = Filters {
            capabilities: Vec::new(),
            deploy: Vec::new(),
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
                let missing_deploy: Vec<DeployMethod> = self
                    .deploy
                    .iter()
                    .filter(|m| !tool.deploy.contains(m))
                    .copied()
                    .collect();
                let lacking = missing.len() + missing_deploy.len();
                (lacking > 0 && lacking < required).then(|| NearMiss {
                    tool: tool.clone(),
                    missing,
                    missing_deploy,
                })
            })
            .collect();
        near.sort_by_key(|n| n.missing.len() + n.missing_deploy.len());
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

    fn deployed(slug: &str, methods: &[DeployMethod]) -> Tool {
        Tool {
            deploy: methods.to_vec(),
            ..tool(slug, "Go", "MIT", &[], 1)
        }
    }

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
    fn ranks_a_verified_tool_first_within_its_fit_only() {
        let mut verified_full = tool(
            "verified-full",
            "Rust",
            "MIT",
            &[("semantic-release", Fit::Full)],
            3,
        );
        verified_full.maintainer_verified = true;
        let mut verified_partial = tool(
            "verified-partial",
            "Rust",
            "MIT",
            &[("semantic-release", Fit::Partial)],
            9000,
        );
        verified_partial.maintainer_verified = true;
        let tools = [
            tool(
                "full-big",
                "Go",
                "MIT",
                &[("semantic-release", Fit::Full)],
                900,
            ),
            verified_partial,
            verified_full,
            tool(
                "drop-in",
                "Rust",
                "MIT",
                &[("semantic-release", Fit::DropIn)],
                1,
            ),
        ];
        let filters = Filters {
            replaces: Some("semantic-release".into()),
            ..Filters::default()
        };
        assert_eq!(
            slugs(filters.apply(&tools)),
            ["drop-in", "verified-full", "full-big", "verified-partial"]
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
    fn every_requested_deploy_method_must_be_offered() {
        use DeployMethod::{Binary, Compose, Container, Helm};
        let tools = [
            deployed("both", &[Container, Compose, Helm]),
            deployed("container-only", &[Container]),
            deployed("undeclared", &[]),
            deployed("binary", &[Binary]),
        ];
        let only = |methods: &[DeployMethod]| {
            slugs(
                Filters {
                    deploy: methods.to_vec(),
                    ..Filters::default()
                }
                .apply(&tools),
            )
        };
        assert_eq!(only(&[Container]), ["both", "container-only"]);
        assert_eq!(only(&[Container, Helm]), ["both"]);
        assert!(only(&[Binary, Helm]).is_empty());
        assert_eq!(only(&[]).len(), 4);
    }

    #[test]
    fn a_near_miss_counts_deploy_methods_next_to_capabilities() {
        use DeployMethod::{Container, Helm};
        let with_ci = |slug: &str, methods: &[DeployMethod]| Tool {
            deploy: methods.to_vec(),
            ..with_capabilities(slug, &["ci"])
        };
        let tools = [
            with_ci("full", &[Container, Helm]),
            with_ci("no-helm", &[Container]),
            with_capabilities("no-ci-no-helm", &[]),
            Tool {
                deploy: vec![Container, Helm],
                ..with_capabilities("no-ci", &[])
            },
        ];
        let filters = Filters {
            capabilities: vec!["ci".into()],
            deploy: vec![Container, Helm],
            ..Filters::default()
        };
        assert_eq!(slugs(filters.apply(&tools)), ["full"]);
        let near = filters.near_misses(&tools);
        let gaps: Vec<_> = near
            .iter()
            .map(|n| {
                (
                    n.tool.slug.as_str(),
                    n.missing.clone(),
                    n.missing_deploy.clone(),
                )
            })
            .collect();
        assert_eq!(
            gaps,
            [
                ("no-helm", vec![], vec![Helm]),
                ("no-ci", vec!["ci".to_owned()], vec![]),
            ]
        );
    }

    #[test]
    fn deploy_reads_from_a_comma_list_or_an_array_and_refuses_an_unknown_method() {
        let joined: Filters = serde_json::from_str(r#"{"deploy":"container, helm"}"#).unwrap();
        let listed: Filters = serde_json::from_str(r#"{"deploy":["container","helm"]}"#).unwrap();
        let expected = [DeployMethod::Container, DeployMethod::Helm];
        assert_eq!(joined.deploy, expected);
        assert_eq!(listed.deploy, expected);
        assert!(serde_json::from_str::<Filters>(r#"{"deploy":"container,snap"}"#).is_err());
        assert_eq!(
            serde_json::to_string(&listed).unwrap(),
            r#"{"dropIn":false,"deploy":["container","helm"]}"#
        );
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
