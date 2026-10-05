use crate::filters::Filters;
use crate::qualifiers;
use crate::vocabulary::Vocabulary;

fn is_cjk(c: char) -> bool {
    matches!(
        c,
        '\u{3040}'..='\u{30ff}' | '\u{3400}'..='\u{4dbf}' | '\u{4e00}'..='\u{9fff}' | '\u{ff66}'..='\u{ff9f}'
    )
}

pub fn normalize(text: &str) -> String {
    let mut spaced = String::with_capacity(text.len());
    let mut previous_cjk: Option<bool> = None;
    for c in text.chars() {
        if c.is_alphanumeric() || matches!(c, '+' | '#' | '.') {
            let cjk = is_cjk(c);
            if previous_cjk.is_some_and(|was| was != cjk) {
                spaced.push(' ');
            }
            spaced.push(c.to_ascii_lowercase());
            previous_cjk = Some(cjk);
        } else {
            spaced.push(' ');
            previous_cjk = None;
        }
    }
    spaced
        .split_whitespace()
        .map(|w| w.trim_matches('.'))
        .filter(|w| !w.is_empty())
        .collect::<Vec<_>>()
        .join(" ")
}

pub fn mentions(query: &str, label: &str) -> bool {
    let label = normalize(label);
    if label.is_empty() {
        return false;
    }
    if label.chars().any(is_cjk) {
        return query.contains(&label);
    }
    format!(" {query} ").contains(&format!(" {label} "))
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
    let named: Vec<&String> = vocabulary
        .targets
        .iter()
        .filter(|(slug, name)| mentions(&query, slug) || mentions(&query, name))
        .map(|(slug, _)| slug)
        .collect();
    let replaced = named
        .iter()
        .filter(|slug| !qualifiers::is_requirement(slug))
        .max_by_key(|slug| slug.len())
        .or_else(|| named.iter().max_by_key(|slug| slug.len()));
    let replaces = replaced.map(|slug| (*slug).clone());
    Filters {
        drop_in: replaces.is_some() && mentions(&query, "drop in"),
        replaces,
        language: longest(&mut vocabulary.languages.iter()),
        license: longest(&mut vocabulary.licenses.iter()),
        category: None,
        ..Filters::default()
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
            capabilities: BTreeMap::new(),
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
    fn splits_latin_words_out_of_japanese_written_without_spaces() {
        assert_eq!(
            normalize("Rustで書かれたsemantic-releaseの代替"),
            "rust で書かれた semantic release の代替"
        );
        let filters = interpret("Rustで書かれたsemantic-releaseの代替、MIT", &vocabulary());
        assert_eq!(filters.replaces.as_deref(), Some("semantic-release"));
        assert_eq!(filters.language.as_deref(), Some("Rust"));
        assert_eq!(filters.license.as_deref(), Some("MIT"));
    }

    #[test]
    fn finds_a_japanese_phrase_inside_a_run_but_a_latin_word_only_whole() {
        let query = normalize("オープンソースのgo製ツール");
        assert!(mentions(&query, "オープンソース"));
        assert!(mentions(&query, "go"));
        assert!(!mentions(&normalize("gorillaツール"), "go"));
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
    fn a_tool_named_as_a_way_to_deploy_is_not_taken_for_the_one_to_replace() {
        let vocabulary = Vocabulary {
            targets: BTreeMap::from([
                ("docker".into(), "Docker".into()),
                ("redis".into(), "Redis".into()),
            ]),
            ..Vocabulary::default()
        };
        let pick = |q: &str| interpret(q, &vocabulary).replaces;
        assert_eq!(
            pick("alternative to redis that runs in docker").as_deref(),
            Some("redis")
        );
        assert_eq!(pick("an alternative to docker").as_deref(), Some("docker"));
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
