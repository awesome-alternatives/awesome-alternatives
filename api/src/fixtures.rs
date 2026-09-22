use crate::catalog::{Fit, Replacement, RepoFacts, Tool};

pub fn tool(
    slug: &str,
    language: &str,
    license: &str,
    replaces: &[(&str, Fit)],
    stars: u64,
) -> Tool {
    Tool {
        slug: slug.into(),
        name: slug.into(),
        repository: format!("https://github.com/example/{slug}"),
        category: "release-automation".into(),
        replaces: replaces
            .iter()
            .map(|(tool, fit)| Replacement {
                tool: (*tool).into(),
                fit: *fit,
                note: None,
            })
            .collect(),
        affiliation: None,
        path: None,
        repo: RepoFacts {
            full_name: format!("example/{slug}"),
            description: None,
            homepage: None,
            language: Some(language.into()),
            license: Some(license.into()),
            stars,
            forks: 0,
            topics: Vec::new(),
            archived: false,
            pushed_at: "2026-09-01T00:00:00Z".into(),
        },
        release: None,
        maintainer_verified: false,
        flags: Vec::new(),
    }
}
