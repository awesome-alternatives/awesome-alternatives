use std::collections::{HashMap, HashSet};

use crate::catalog::{Product, Tool};
#[cfg(test)]
use crate::embedding::Embedder;
use crate::embedding::{EmbedError, Model, Thresholds, Vector, similarity};
use crate::vocabulary::Vocabulary;

pub struct Index {
    thresholds: Thresholds,
    targets: Vec<Entry>,
    tools: Vec<Entry>,
}

struct Entry {
    slug: String,
    text: String,
    vector: Vector,
}

type Vectors<'a> = HashMap<&'a str, &'a [f32]>;

struct Texts {
    targets: Vec<(String, String)>,
    tools: Vec<(String, String)>,
}

impl Texts {
    fn of(tools: &[Tool], products: &[Product], vocabulary: &Vocabulary) -> Self {
        let targets = vocabulary
            .targets
            .iter()
            .map(|(slug, name)| {
                let tool = tools.iter().find(|t| &t.slug == slug).map(describe);
                let product = || {
                    products
                        .iter()
                        .find(|p| &p.slug == slug)
                        .map(describe_product)
                };
                let text = tool.or_else(product).unwrap_or_else(|| name.clone());
                (slug.clone(), text)
            })
            .collect();
        let tools = tools
            .iter()
            .map(|t| (t.slug.clone(), describe(t)))
            .collect();
        Self { targets, tools }
    }

    fn missing(&self, known: &Vectors) -> Vec<String> {
        let mut seen = HashSet::new();
        self.targets
            .iter()
            .chain(&self.tools)
            .map(|(_, text)| text.as_str())
            .filter(|text| !known.contains_key(text) && seen.insert(*text))
            .map(str::to_owned)
            .collect()
    }

    fn index<'a>(
        self,
        thresholds: Thresholds,
        mut vectors: Vectors<'a>,
        missing: &'a [String],
        embedded: &'a [Vector],
    ) -> Result<Index, EmbedError> {
        vectors.extend(
            missing
                .iter()
                .map(String::as_str)
                .zip(embedded.iter().map(Vec::as_slice)),
        );
        Ok(Index {
            thresholds,
            targets: entries(self.targets, &vectors)?,
            tools: entries(self.tools, &vectors)?,
        })
    }
}

fn entries(described: Vec<(String, String)>, vectors: &Vectors) -> Result<Vec<Entry>, EmbedError> {
    described
        .into_iter()
        .map(|(slug, text)| {
            let vector = vectors
                .get(text.as_str())
                .ok_or(EmbedError::Incomplete)?
                .to_vec();
            Ok(Entry { slug, text, vector })
        })
        .collect()
}

impl Index {
    pub async fn build(
        model: &Model,
        tools: &[Tool],
        products: &[Product],
        vocabulary: &Vocabulary,
        previous: Option<&Index>,
    ) -> Result<Self, EmbedError> {
        let texts = Texts::of(tools, products, vocabulary);
        let known = previous.map(Index::vectors).unwrap_or_default();
        let missing = texts.missing(&known);
        let embedded = model.embed(&missing).await?;
        let index = texts.index(model.thresholds(), known, &missing, &embedded)?;
        tracing::info!(
            embedded = missing.len(),
            entries = index.targets.len() + index.tools.len(),
            "semantic index built"
        );
        Ok(index)
    }

    #[cfg(test)]
    pub fn build_blocking(
        embedder: &dyn Embedder,
        tools: &[Tool],
        products: &[Product],
        vocabulary: &Vocabulary,
    ) -> Result<Self, EmbedError> {
        let texts = Texts::of(tools, products, vocabulary);
        let missing = texts.missing(&Vectors::new());
        let embedded = embedder.embed(&missing)?;
        texts.index(embedder.thresholds(), Vectors::new(), &missing, &embedded)
    }

    fn vectors(&self) -> Vectors<'_> {
        self.targets
            .iter()
            .chain(&self.tools)
            .map(|e| (e.text.as_str(), e.vector.as_slice()))
            .collect()
    }

    pub fn target(&self, query: &[f32]) -> Option<String> {
        let mut scored: Vec<(&String, f32)> = self
            .targets
            .iter()
            .map(|e| (&e.slug, similarity(query, &e.vector)))
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
            .map(|e| (e.slug.clone(), similarity(query, &e.vector)))
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

fn describe_product(product: &Product) -> String {
    let category = product.category.replace('-', " ");
    format!("{}: {} ({category})", product.name, product.description)
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
        Index::build_blocking(
            &Words,
            &tools,
            &[],
            &Vocabulary::of(&tools, &[], &Default::default()),
        )
        .unwrap()
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
        assert!(
            Index::build_blocking(
                &Broken,
                &tools,
                &[],
                &Vocabulary::of(&tools, &[], &Default::default())
            )
            .is_err()
        );
    }

    struct Mute;

    impl Embedder for Mute {
        fn embed(&self, _: &[String]) -> Result<Vec<Vector>, EmbedError> {
            Ok(Vec::new())
        }

        fn thresholds(&self) -> Thresholds {
            Words.thresholds()
        }
    }

    #[test]
    fn a_model_that_leaves_texts_without_a_vector_fails_the_build() {
        let tools = catalog();
        assert!(matches!(
            Index::build_blocking(
                &Mute,
                &tools,
                &[],
                &Vocabulary::of(&tools, &[], &Default::default())
            ),
            Err(EmbedError::Incomplete)
        ));
    }
}
