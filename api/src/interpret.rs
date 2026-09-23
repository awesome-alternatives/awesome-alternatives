use std::collections::{BTreeMap, HashMap};

use crate::filters::Filters;
use crate::jev::{Answer, Question};
use crate::lexical;
use crate::vocabulary::Vocabulary;

pub const NONE: &str = "none";
const MAX_OPTIONS: usize = 255;
const MIN_CONFIDENCE: f64 = 0.6;
const MIN_DROP_IN: f64 = 0.7;

pub fn questions(query: &str, vocabulary: &Vocabulary) -> BTreeMap<&'static str, Question> {
    let normalized = lexical::normalize(query);
    let targets = shortlist(
        &normalized,
        vocabulary
            .targets
            .iter()
            .map(|(slug, name)| (slug.clone(), Some(name.clone()))),
        "No specific tool is named or implied.",
    );
    let languages = shortlist(
        &normalized,
        vocabulary.languages.iter().map(|l| (l.clone(), None)),
        "No language requirement.",
    );
    let licenses = shortlist(
        &normalized,
        vocabulary.licenses.iter().map(|l| (l.clone(), None)),
        "No licence requirement.",
    );
    BTreeMap::from([
        (
            "target",
            Question::Choice {
                instructions: "The person is looking for an alternative to an existing tool. Which tool do they want to replace?".into(),
                criteria: targets,
            },
        ),
        (
            "language",
            Question::Choice {
                instructions: "Which programming language must the alternative be written in?".into(),
                criteria: languages,
            },
        ),
        (
            "license",
            Question::Choice {
                instructions: "Which SPDX licence must the alternative use?".into(),
                criteria: licenses,
            },
        ),
        (
            "drop_in",
            Question::Noul {
                instructions: "Does the person need a drop-in replacement that accepts the original tool's configuration unchanged?".into(),
            },
        ),
    ])
}

fn shortlist(
    query: &str,
    options: impl Iterator<Item = (String, Option<String>)>,
    none: &str,
) -> BTreeMap<String, Option<String>> {
    let mut ranked: Vec<_> = options.collect();
    ranked.sort_by_key(|(label, description)| {
        let description = description.as_deref().unwrap_or_default();
        std::cmp::Reverse(lexical::relevance(query, label) + lexical::relevance(query, description))
    });
    ranked.truncate(MAX_OPTIONS - 1);
    ranked.push((NONE.into(), Some(none.into())));
    ranked.into_iter().collect()
}

pub fn filters(answers: &HashMap<String, Answer>, vocabulary: &Vocabulary) -> Filters {
    let replaces = pick(answers, "target", vocabulary.targets.keys());
    let drop_in = replaces.is_some()
        && matches!(answers.get("drop_in"), Some(Answer::Noul { noul }) if *noul >= MIN_DROP_IN);
    Filters {
        replaces,
        language: pick(answers, "language", &vocabulary.languages),
        license: pick(answers, "license", &vocabulary.licenses),
        category: None,
        drop_in,
        ..Filters::default()
    }
}

fn pick<'a>(
    answers: &HashMap<String, Answer>,
    name: &str,
    allowed: impl IntoIterator<Item = &'a String>,
) -> Option<String> {
    match answers.get(name)? {
        Answer::Choice { choice, confidence }
            if *confidence >= MIN_CONFIDENCE && choice != NONE =>
        {
            allowed.into_iter().find(|a| *a == choice).cloned()
        }
        _ => None,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn vocabulary() -> Vocabulary {
        Vocabulary {
            targets: BTreeMap::from([("semantic-release".into(), "semantic-release".into())]),
            languages: vec!["Go".into(), "Rust".into()],
            licenses: vec!["MIT".into()],
            categories: vec![],
        }
    }

    fn choice(choice: &str, confidence: f64) -> Answer {
        Answer::Choice {
            choice: choice.into(),
            confidence,
        }
    }

    fn criteria(question: &Question) -> &BTreeMap<String, Option<String>> {
        match question {
            Question::Choice { criteria, .. } => criteria,
            Question::Noul { .. } => panic!("expected a choice"),
        }
    }

    #[test]
    fn every_choice_offers_only_catalog_values_and_none() {
        let asked = questions("anything", &vocabulary());
        assert_eq!(
            criteria(&asked["target"]).keys().collect::<Vec<_>>(),
            ["none", "semantic-release"]
        );
        assert_eq!(
            criteria(&asked["language"]).keys().collect::<Vec<_>>(),
            ["Go", "Rust", "none"]
        );
    }

    #[test]
    fn large_vocabularies_keep_the_most_relevant_options_within_the_cap() {
        let mut big = vocabulary();
        big.languages = (0..400).map(|i| format!("Lang{i}")).collect();
        big.languages.push("Zig".into());
        let asked = questions("something in zig", &big);
        let languages = criteria(&asked["language"]);
        assert_eq!(languages.len(), MAX_OPTIONS);
        assert!(languages.contains_key("Zig"));
        assert!(languages.contains_key(NONE));
    }

    #[test]
    fn confident_answers_become_filters() {
        let answers = HashMap::from([
            ("target".into(), choice("semantic-release", 0.9)),
            ("language".into(), choice("Rust", 0.8)),
            ("license".into(), choice("MIT", 0.4)),
            ("drop_in".into(), Answer::Noul { noul: 0.95 }),
        ]);
        let filters = filters(&answers, &vocabulary());
        assert_eq!(filters.replaces.as_deref(), Some("semantic-release"));
        assert_eq!(filters.language.as_deref(), Some("Rust"));
        assert_eq!(filters.license, None);
        assert!(filters.drop_in);
    }

    #[test]
    fn labels_outside_the_catalog_and_none_are_ignored() {
        let answers = HashMap::from([
            ("target".into(), choice(NONE, 0.99)),
            ("language".into(), choice("Cobol", 0.99)),
            ("drop_in".into(), Answer::Noul { noul: 0.99 }),
        ]);
        assert_eq!(filters(&answers, &vocabulary()), Filters::default());
    }
}
