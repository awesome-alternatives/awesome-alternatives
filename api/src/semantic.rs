use std::collections::HashMap;

use crate::catalog::Tool;
use crate::embedding::{EmbedError, Embedder, Thresholds, Vector, similarity};
use crate::vocabulary::Vocabulary;

pub struct Index {
    thresholds: Thresholds,
    targets: Vec<(String, Vector)>,
    tools: Vec<(String, Vector)>,
}

impl Index {
    pub fn build(
        embedder: &dyn Embedder,
        tools: &[Tool],
        vocabulary: &Vocabulary,
    ) -> Result<Self, EmbedError> {
        let target_slugs: Vec<&String> = vocabulary.targets.keys().collect();
        let mut texts: Vec<String> = vocabulary
            .targets
            .iter()
            .map(|(slug, name)| {
                tools
                    .iter()
                    .find(|t| &t.slug == slug)
                    .map_or_else(|| name.clone(), describe)
            })
            .collect();
        texts.extend(tools.iter().map(describe));
        let mut vectors = embedder.embed(&texts)?.into_iter();
        let targets = target_slugs
            .into_iter()
            .map(|slug| (slug.clone(), vectors.next().unwrap_or_default()))
            .collect();
        let tools = tools
            .iter()
            .map(|t| (t.slug.clone(), vectors.next().unwrap_or_default()))
            .collect();
        Ok(Self {
            thresholds: embedder.thresholds(),
            targets,
            tools,
        })
    }

    pub fn target(&self, query: &[f32]) -> Option<String> {
        let mut scored: Vec<(&String, f32)> = self
            .targets
            .iter()
            .map(|(slug, v)| (slug, similarity(query, v)))
            .collect();
        scored.sort_by(|a, b| b.1.total_cmp(&a.1));
        let (best, score) = *scored.first()?;
        let runner_up = scored.get(1).map_or(f32::MIN, |s| s.1);
        (score >= self.thresholds.target && score - runner_up >= self.thresholds.margin)
            .then(|| best.clone())
    }

    pub fn relevance(&self, query: &[f32]) -> HashMap<String, f32> {
        self.tools
            .iter()
            .map(|(slug, v)| (slug.clone(), similarity(query, v)))
            .filter(|(_, score)| *score >= self.thresholds.relevance)
            .collect()
    }
}

fn describe(tool: &Tool) -> String {
    let category = tool.category.replace('-', " ");
    match &tool.repo.description {
        Some(description) => format!("{}: {description} ({category})", tool.name),
        None => format!("{} ({category})", tool.name),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::catalog::Fit;
    use crate::embedding::fake::{Broken, Words};
    use crate::fixtures::tool;

    fn catalog() -> Vec<Tool> {
        let mut semantic_release = tool("semantic-release", "JavaScript", "MIT", &[], 1);
        semantic_release.repo.description =
            Some("Fully automated version management and package publishing".into());
        let mut changelog = tool("changelog-tool", "Rust", "MIT", &[], 1);
        changelog.repo.description = Some("Generate a changelog file from commit history".into());
        changelog.category = "changelog".into();
        let mut git_cliff = tool(
            "git-cliff",
            "Rust",
            "MIT",
            &[("changelog-tool", Fit::Full)],
            1,
        );
        git_cliff.repo.description = Some("Highly customizable changelog generator".into());
        git_cliff.category = "changelog".into();
        let mut knope = tool(
            "knope",
            "Rust",
            "MIT",
            &[("semantic-release", Fit::Full)],
            1,
        );
        knope.repo.description = Some("Automated version management for any project".into());
        vec![semantic_release, changelog, git_cliff, knope]
    }

    fn index() -> Index {
        let tools = catalog();
        Index::build(&Words, &tools, &Vocabulary::of(&tools)).unwrap()
    }

    fn query(text: &str) -> Vector {
        Words.embed(&[text.to_owned()]).unwrap().remove(0)
    }

    #[test]
    fn a_description_of_the_job_finds_the_tool_it_describes() {
        assert_eq!(
            index()
                .target(&query("automated version management"))
                .as_deref(),
            Some("semantic-release")
        );
        assert_eq!(
            index()
                .target(&query("changelog file from commit history"))
                .as_deref(),
            Some("changelog-tool")
        );
    }

    #[test]
    fn an_unrelated_query_names_no_target() {
        assert_eq!(index().target(&query("kubernetes dashboard")), None);
    }

    #[test]
    fn relevance_keeps_only_tools_close_enough_to_the_query() {
        let relevance = index().relevance(&query("changelog generator"));
        assert!(relevance.contains_key("git-cliff"));
        assert!(!relevance.contains_key("knope"));
    }

    #[test]
    fn a_failing_model_fails_the_build_instead_of_indexing_zeros() {
        let tools = catalog();
        assert!(Index::build(&Broken, &tools, &Vocabulary::of(&tools)).is_err());
    }
}
