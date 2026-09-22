use std::collections::{BTreeMap, BTreeSet};

use serde::Serialize;

use crate::catalog::Tool;

#[derive(Debug, Default, Clone, Serialize)]
pub struct Vocabulary {
    pub targets: BTreeMap<String, String>,
    pub languages: Vec<String>,
    pub licenses: Vec<String>,
    pub categories: Vec<String>,
}

impl Vocabulary {
    pub fn of(tools: &[Tool]) -> Self {
        let name_of = |slug: &str| {
            tools
                .iter()
                .find(|t| t.slug == slug)
                .map_or_else(|| slug.to_owned(), |t| t.name.clone())
        };
        let targets = tools
            .iter()
            .flat_map(|t| &t.replaces)
            .map(|r| (r.tool.clone(), name_of(&r.tool)))
            .collect();
        let distinct = |values: Vec<Option<&String>>| {
            values
                .into_iter()
                .flatten()
                .cloned()
                .collect::<BTreeSet<_>>()
                .into_iter()
                .collect()
        };
        Self {
            targets,
            languages: distinct(tools.iter().map(|t| t.repo.language.as_ref()).collect()),
            licenses: distinct(tools.iter().map(|t| t.repo.license.as_ref()).collect()),
            categories: distinct(tools.iter().map(|t| Some(&t.category)).collect()),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::catalog::Fit;
    use crate::fixtures::tool;

    #[test]
    fn targets_are_only_tools_something_replaces() {
        let mut original = tool("semantic-release", "JavaScript", "MIT", &[], 1);
        original.name = "semantic-release".into();
        let tools = [
            original,
            tool(
                "knope",
                "Rust",
                "MIT",
                &[("semantic-release", Fit::Full)],
                1,
            ),
            tool(
                "orphan-target-user",
                "Go",
                "Apache-2.0",
                &[("unlisted", Fit::Partial)],
                1,
            ),
        ];
        let vocabulary = Vocabulary::of(&tools);
        assert_eq!(
            vocabulary.targets.keys().collect::<Vec<_>>(),
            ["semantic-release", "unlisted"]
        );
        assert_eq!(vocabulary.targets["unlisted"], "unlisted");
        assert_eq!(vocabulary.languages, ["Go", "JavaScript", "Rust"]);
        assert_eq!(vocabulary.licenses, ["Apache-2.0", "MIT"]);
    }
}
