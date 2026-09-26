use rmcp::model::{Tool, ToolAnnotations};
use schemars::JsonSchema;
use serde::Deserialize;

use crate::catalog::Terms;
use crate::filters::Filters;
use crate::window::Window;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Name {
    FindAlternatives,
    GetTool,
    ListTools,
    ListCategories,
    Search,
}

impl Name {
    pub const ALL: [Self; 5] = [
        Self::FindAlternatives,
        Self::GetTool,
        Self::ListTools,
        Self::ListCategories,
        Self::Search,
    ];

    pub fn as_str(self) -> &'static str {
        match self {
            Self::FindAlternatives => "find_alternatives",
            Self::GetTool => "get_tool",
            Self::ListTools => "list_tools",
            Self::ListCategories => "list_categories",
            Self::Search => "search",
        }
    }

    pub fn parse(name: &str) -> Option<Self> {
        Self::ALL.into_iter().find(|n| n.as_str() == name)
    }

    pub fn definition(self) -> Tool {
        let (title, description) = self.text();
        let tool = Tool::new(self.as_str(), description, rmcp::model::JsonObject::new())
            .with_title(title)
            .with_annotations(
                ToolAnnotations::with_title(title)
                    .read_only(true)
                    .destructive(false)
                    .idempotent(true)
                    .open_world(false),
            );
        match self {
            Self::FindAlternatives => tool.with_input_schema::<AlternativesTo>(),
            Self::GetTool => tool.with_input_schema::<GetTool>(),
            Self::ListTools => tool.with_input_schema::<ListTools>(),
            Self::ListCategories => tool.with_input_schema::<NoArguments>(),
            Self::Search => tool.with_input_schema::<SearchFor>(),
        }
    }

    fn text(self) -> (&'static str, &'static str) {
        match self {
            Self::FindAlternatives => (
                "Find open-source alternatives",
                "Open-source alternatives to a tool or a closed product, such as GitHub Copilot, Jira, Vercel or semantic-release. Give its slug or its name in any case. Each alternative says how well it replaces it (fit: drop-in, full or partial) and what differs, ranked by fit then stars. Narrow with language, license, terms, selfHost, maintained, dropIn and capabilities. An unknown name is an error that lists close matches. Start here when someone wants to replace something.",
            ),
            Self::GetTool => (
                "Get one tool",
                "Everything the catalog holds on one open-source tool, by slug (a name also works): repository, description, stars, forks, licence and terms, latest release, what it replaces and how well, category, capabilities with their docs, deploy methods, flags such as inactive, and recent star history.",
            ),
            Self::ListTools => (
                "List tools by filter",
                "Catalog tools matching exact filters, the same as GET /v1/tools: replaces, category, language, license, terms, selfHost, maintained, dropIn and capabilities, all optional and combined. Paged with limit and offset; count is how many match in all. Use it to browse a category or a language, or to combine filters precisely. Archived repositories are never listed.",
            ),
            Self::ListCategories => (
                "List categories",
                "Every category in the catalog: its key, name and description, how many tools it holds, whether its tools are self-hosted, and the capability keys it defines. Use the keys as category and capabilities in list_tools and find_alternatives.",
            ),
            Self::Search => (
                "Search in plain words",
                "Reads a free-text request, such as \"a Rust alternative to semantic-release\" or \"self-hosted wiki with SSO\", and returns the matching tools with the filters it read from it. Runs on keywords and a local embedding model. Limited per client: once the quota is spent it answers an error saying how many seconds to wait. Prefer find_alternatives or list_tools when you already know the target or the filters; they have no quota.",
            ),
        }
    }
}

pub fn definitions() -> Vec<Tool> {
    Name::ALL.into_iter().map(Name::definition).collect()
}

#[derive(Debug, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct AlternativesTo {
    #[schemars(
        description = "The tool or closed product to replace: a slug such as github-copilot, or a name such as GitHub Copilot, in any case."
    )]
    pub tool: String,
    #[serde(default)]
    #[schemars(description = "Main language of the repository, any case, such as Rust or Go.")]
    pub language: Option<String>,
    #[serde(default)]
    #[schemars(
        description = "SPDX licence of the repository, any case, such as MIT or Apache-2.0."
    )]
    pub license: Option<String>,
    #[serde(default)]
    #[schemars(
        description = "Licence terms: open (OSI licence), open-core, source-available, or unknown (not checked yet)."
    )]
    pub terms: Option<Terms>,
    #[serde(default)]
    #[schemars(description = "Only tools you can host yourself.")]
    pub self_host: bool,
    #[serde(default)]
    #[schemars(description = "Leave out archived repositories and those with no push in a year.")]
    pub maintained: bool,
    #[serde(default)]
    #[schemars(description = "Only drop-in replacements.")]
    pub drop_in: bool,
    #[serde(default)]
    #[schemars(
        description = "Capability keys every alternative must declare, as list_categories lists them, such as ci or container-registry. Alternatives that have only some of them come back in near, with what they miss."
    )]
    pub capabilities: Vec<String>,
    #[serde(flatten)]
    pub window: Window,
}

impl AlternativesTo {
    pub fn filters(&self, target: &str) -> Filters {
        Filters {
            replaces: Some(target.to_owned()),
            language: self.language.clone(),
            license: self.license.clone(),
            category: None,
            drop_in: self.drop_in,
            terms: self.terms,
            self_host: self.self_host,
            maintained: self.maintained,
            capabilities: self.capabilities.clone(),
        }
    }
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct GetTool {
    #[schemars(description = "The tool's slug, such as knope, as other answers give it.")]
    pub slug: String,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct ListTools {
    #[serde(flatten)]
    pub filters: Filters,
    #[serde(flatten)]
    pub window: Window,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct NoArguments {}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SearchFor {
    #[schemars(
        description = "What the person is looking for, in their own words and any language, up to 300 characters."
    )]
    pub query: String,
    #[serde(flatten)]
    pub window: Window,
}
