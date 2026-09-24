use std::collections::{BTreeMap, BTreeSet};

use serde::Serialize;

use crate::catalog::{Category, Product, Tool};

#[derive(Debug, Default, Clone, Serialize)]
pub struct Vocabulary {
    pub targets: BTreeMap<String, String>,
    pub languages: Vec<String>,
    pub licenses: Vec<String>,
    pub categories: Vec<String>,
    pub capabilities: BTreeMap<String, CapabilityWords>,
}

#[derive(Debug, Clone, Serialize)]
pub struct CapabilityWords {
    pub label: String,
    pub category: String,
    #[serde(skip)]
    pub phrases: Vec<String>,
}

impl Vocabulary {
    pub fn of(
        tools: &[Tool],
        products: &[Product],
        categories: &BTreeMap<String, Category>,
    ) -> Self {
        let name_of = |slug: &str| {
            let tool = tools.iter().find(|t| t.slug == slug).map(|t| &t.name);
            let product = || products.iter().find(|p| p.slug == slug).map(|p| &p.name);
            tool.or_else(product)
                .map_or_else(|| slug.to_owned(), Clone::clone)
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
            capabilities: categories
                .iter()
                .flat_map(|(key, category)| {
                    category.capabilities.iter().map(move |(capability, term)| {
                        (
                            capability.clone(),
                            CapabilityWords {
                                label: term.label.clone(),
                                category: key.clone(),
                                phrases: term.phrases.clone(),
                            },
                        )
                    })
                })
                .collect(),
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
        let vocabulary = Vocabulary::of(&tools, &[], &BTreeMap::new());
        assert_eq!(
            vocabulary.targets.keys().collect::<Vec<_>>(),
            ["semantic-release", "unlisted"]
        );
        assert_eq!(vocabulary.targets["unlisted"], "unlisted");
        assert_eq!(vocabulary.languages, ["Go", "JavaScript", "Rust"]);
        assert_eq!(vocabulary.licenses, ["Apache-2.0", "MIT"]);
    }

    #[test]
    fn a_closed_product_is_named_rather_than_left_as_its_slug() {
        let tools = [tool(
            "opencode",
            "TypeScript",
            "MIT",
            &[("claude-code", Fit::Full)],
            1,
        )];
        let products = [Product {
            slug: "claude-code".into(),
            name: "Claude Code".into(),
            homepage: "https://example.com".into(),
            vendor: "Anthropic".into(),
            category: "coding-agent".into(),
            description: "A coding agent.".into(),
        }];
        let vocabulary = Vocabulary::of(&tools, &products, &BTreeMap::new());
        assert_eq!(vocabulary.targets["claude-code"], "Claude Code");
    }
}
