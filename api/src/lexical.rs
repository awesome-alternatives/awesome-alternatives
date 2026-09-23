use crate::filters::Filters;
use crate::vocabulary::Vocabulary;

pub fn normalize(text: &str) -> String {
    let spaced: String = text
        .chars()
        .map(|c| {
            if c.is_alphanumeric() || matches!(c, '+' | '#' | '.') {
                c.to_ascii_lowercase()
            } else {
                ' '
            }
        })
        .collect();
    spaced
        .split_whitespace()
        .map(|w| w.trim_matches('.'))
        .filter(|w| !w.is_empty())
        .collect::<Vec<_>>()
        .join(" ")
}

pub fn mentions(query: &str, label: &str) -> bool {
    let label = normalize(label);
    !label.is_empty() && format!(" {query} ").contains(&format!(" {label} "))
}

pub fn relevance(query: &str, label: &str) -> usize {
    let words: Vec<&str> = query.split(' ').collect();
    normalize(label)
        .split(' ')
        .filter(|w| words.contains(w))
        .count()
}

pub fn interpret(query: &str, vocabulary: &Vocabulary) -> Filters {
    let query = normalize(query);
    let longest = |labels: &mut dyn Iterator<Item = &String>| {
        labels
            .filter(|l| mentions(&query, l))
            .max_by_key(|l| l.len())
            .cloned()
    };
    let replaces = vocabulary
        .targets
        .iter()
        .filter(|(slug, name)| mentions(&query, slug) || mentions(&query, name))
        .max_by_key(|(slug, _)| slug.len())
        .map(|(slug, _)| slug.clone());
    Filters {
        drop_in: replaces.is_some() && mentions(&query, "drop in"),
        replaces,
        language: longest(&mut vocabulary.languages.iter()),
        license: longest(&mut vocabulary.licenses.iter()),
        category: None,
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::BTreeMap;

    fn vocabulary() -> Vocabulary {
        Vocabulary {
            targets: BTreeMap::from([
                ("semantic-release".into(), "semantic-release".into()),
                ("release-please".into(), "release-please".into()),
            ]),
            languages: vec![
                "Go".into(),
                "JavaScript".into(),
                "Rust".into(),
                "C++".into(),
            ],
            licenses: vec!["Apache-2.0".into(), "MIT".into()],
            categories: vec![],
        }
    }

    #[test]
    fn reads_target_language_and_license_from_a_phrase() {
        let filters = interpret(
            "A Rust alternative to Semantic Release. MIT please.",
            &vocabulary(),
        );
        assert_eq!(filters.replaces.as_deref(), Some("semantic-release"));
        assert_eq!(filters.language.as_deref(), Some("Rust"));
        assert_eq!(filters.license.as_deref(), Some("MIT"));
        assert!(!filters.drop_in);
    }

    #[test]
    fn matches_whole_words_only() {
        let filters = interpret("something like gorilla, with rusty tooling", &vocabulary());
        assert_eq!(filters, Filters::default());
    }

    #[test]
    fn keeps_symbols_that_name_languages_and_licences() {
        let filters = interpret("c++ tool under apache 2.0", &vocabulary());
        assert_eq!(filters.language.as_deref(), Some("C++"));
        assert_eq!(filters.license.as_deref(), Some("Apache-2.0"));
    }

    #[test]
    fn the_longer_of_two_overlapping_product_names_wins() {
        let vocabulary = Vocabulary {
            targets: BTreeMap::from([
                ("claude".into(), "Claude".into()),
                ("claude-code".into(), "Claude Code".into()),
            ]),
            ..Vocabulary::default()
        };
        let pick = |q: &str| interpret(q, &vocabulary).replaces;
        assert_eq!(
            pick("open source alternative to Claude Code").as_deref(),
            Some("claude-code")
        );
        assert_eq!(
            pick("something like claude but self-hosted").as_deref(),
            Some("claude")
        );
    }

    #[test]
    fn drop_in_only_counts_with_a_target() {
        assert!(interpret("drop-in replacement for release-please", &vocabulary()).drop_in);
        assert!(!interpret("a drop-in tool", &vocabulary()).drop_in);
    }

    #[test]
    fn relevance_counts_shared_words() {
        let query = normalize("semantic versioning in go");
        assert_eq!(relevance(&query, "semantic-release"), 1);
        assert_eq!(relevance(&query, "release-please"), 0);
    }
}
