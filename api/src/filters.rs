use serde::{Deserialize, Serialize};

use crate::catalog::{Fit, Tool};

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
}

impl Filters {
    pub fn apply<'a>(&self, tools: &'a [Tool]) -> Vec<&'a Tool> {
        let mut matched: Vec<&Tool> = tools
            .iter()
            .filter(|t| !t.repo.archived)
            .filter(|t| same(t.repo.language.as_deref(), self.language.as_deref()))
            .filter(|t| same(t.repo.license.as_deref(), self.license.as_deref()))
            .filter(|t| self.category.as_ref().is_none_or(|c| &t.category == c))
            .filter(|t| self.replaces.is_none() || self.fit(t).is_some())
            .collect();
        matched.sort_by_key(|t| (self.fit(t).map(fit_rank), std::cmp::Reverse(t.repo.stars)));
        matched
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
    fn archived_tools_are_never_returned() {
        let mut archived = tool("old", "Rust", "MIT", &[], 1);
        archived.repo.archived = true;
        assert!(Filters::default().apply(&[archived]).is_empty());
    }
}
