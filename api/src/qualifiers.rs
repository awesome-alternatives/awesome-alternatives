use serde::{Deserialize, Serialize};

use crate::catalog::Terms;
use crate::filters::Filters;
use crate::lexical::{mentions, normalize};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Deserialize, Serialize)]
#[serde(rename_all = "lowercase")]
pub enum Pending {
    Platform,
    Deploy,
}

#[derive(Debug, Clone, PartialEq, Eq, Deserialize, Serialize)]
pub struct Unchecked {
    pub kind: Pending,
    pub value: String,
}

const OPEN: &[&str] = &[
    "open source",
    "opensource",
    "foss",
    "floss",
    "free software",
    "libre",
    "logiciel libre",
    "logiciels libres",
    "código abierto",
    "codigo abierto",
    "software libre",
    "quelloffen",
    "quelloffene",
    "quelloffenes",
    "quelloffener",
    "quelloffenen",
    "freie software",
];

const MAINTAINED: &[&str] = &[
    "maintained",
    "actively developed",
    "still developed",
    "maintenu",
    "maintenue",
    "maintenus",
    "maintenues",
    "activement développé",
    "mantenido",
    "mantenida",
    "mantenidos",
    "mantenidas",
    "gepflegt",
    "gepflegte",
    "gepflegtes",
    "gepflegter",
    "gepflegten",
    "gewartet",
    "gewartete",
    "aktiv entwickelt",
];

const SELF_HOSTED: &[&str] = &[
    "self hosted",
    "self hostable",
    "self host",
    "self hosting",
    "selfhosted",
    "on premise",
    "on premises",
    "on prem",
    "my server",
    "my own server",
    "my vps",
    "auto hébergé",
    "auto hébergée",
    "auto hébergeable",
    "autohébergé",
    "auto heberge",
    "auto hebergeable",
    "mon serveur",
    "mon vps",
    "autoalojado",
    "autoalojada",
    "auto alojado",
    "autohospedado",
    "mi servidor",
    "mi vps",
    "selbst gehostet",
    "selbstgehostet",
    "selbst hosten",
    "meinem server",
    "eigenen server",
    "meinem vps",
];

const PLATFORMS: &[(&str, &str)] = &[
    ("linux", "Linux"),
    ("macos", "macOS"),
    ("mac", "macOS"),
    ("windows", "Windows"),
    ("arm64", "ARM"),
    ("arm", "ARM"),
    ("raspberry pi", "Raspberry Pi"),
];

const DEPLOYMENTS: &[(&str, &str)] = &[
    ("docker compose", "Docker Compose"),
    ("docker", "Docker"),
    ("kubernetes", "Kubernetes"),
    ("k8s", "Kubernetes"),
    ("helm", "Helm"),
    ("single binary", "Single binary"),
    ("binaire", "Single binary"),
    ("binario", "Single binary"),
    ("binärdatei", "Single binary"),
];

pub fn apply(query: &str, filters: &mut Filters) -> Vec<Unchecked> {
    let query = normalize(query);
    let said = |words: &[&str]| words.iter().any(|w| mentions(&query, w));
    if said(OPEN) {
        filters.terms = Some(Terms::Open);
    }
    filters.self_host |= said(SELF_HOSTED);
    filters.maintained |= said(MAINTAINED);
    let target = filters.replaces.as_deref().map(normalize);
    let mut unchecked = pending(&query, Pending::Platform, PLATFORMS);
    unchecked.extend(pending(&query, Pending::Deploy, DEPLOYMENTS));
    unchecked.retain(|u| target.as_deref() != Some(normalize(&u.value).as_str()));
    unchecked
}

pub fn is_requirement(slug: &str) -> bool {
    let label = normalize(slug);
    PLATFORMS
        .iter()
        .chain(DEPLOYMENTS)
        .any(|(word, _)| normalize(word) == label)
}

fn pending(query: &str, kind: Pending, table: &[(&str, &str)]) -> Vec<Unchecked> {
    let said: Vec<&(&str, &str)> = table
        .iter()
        .filter(|(word, _)| mentions(query, word))
        .collect();
    let mut out: Vec<Unchecked> = Vec::new();
    for (word, label) in &said {
        let inside_longer = said
            .iter()
            .any(|(other, _)| other != word && mentions(&normalize(other), word));
        if !inside_longer && !out.iter().any(|u| u.value == *label) {
            out.push(Unchecked {
                kind,
                value: (*label).to_owned(),
            });
        }
    }
    out
}

#[cfg(test)]
mod tests {
    use super::*;

    fn read(query: &str) -> (Filters, Vec<Unchecked>) {
        let mut filters = Filters::default();
        let unchecked = apply(query, &mut filters);
        (filters, unchecked)
    }

    fn values(unchecked: &[Unchecked]) -> Vec<&str> {
        unchecked.iter().map(|u| u.value.as_str()).collect()
    }

    #[test]
    fn reads_the_three_qualifiers_in_english() {
        let (filters, _) = read("open-source alternative to redis, maintained and self-hosted");
        assert_eq!(filters.terms, Some(Terms::Open));
        assert!(filters.maintained);
        assert!(filters.self_host);
    }

    #[test]
    fn reads_them_in_french_spanish_and_german() {
        for query in [
            "une alternative libre à redis, maintenue et auto-hébergée",
            "alternativa de código abierto a redis, mantenida y autoalojada",
            "quelloffene Alternative zu Redis, gepflegt und selbst gehostet",
            "gepflegte Alternative zu GitHub, selbst gehostet",
        ] {
            let (filters, _) = read(query);
            assert!(filters.maintained, "{query}");
            assert!(filters.self_host, "{query}");
        }
        assert_eq!(
            read("alternativa de código abierto").0.terms,
            Some(Terms::Open)
        );
        assert_eq!(read("une alternative libre").0.terms, Some(Terms::Open));
        assert_eq!(
            read("eine quelloffene Alternative").0.terms,
            Some(Terms::Open)
        );
    }

    #[test]
    fn a_word_inside_a_name_is_not_a_qualifier() {
        let (filters, unchecked) = read("librechat or libreoffice on a macbook");
        assert_eq!(filters, Filters::default());
        assert!(unchecked.is_empty());
    }

    #[test]
    fn free_alone_says_nothing_about_the_licence() {
        assert_eq!(read("a free alternative to slack").0.terms, None);
    }

    #[test]
    fn platforms_and_deployments_are_reported_as_unchecked() {
        let (_, unchecked) = read("runs on linux and arm, deployed with docker compose");
        assert_eq!(values(&unchecked), ["Linux", "ARM", "Docker Compose"]);
        assert_eq!(unchecked[0].kind, Pending::Platform);
        assert_eq!(unchecked[2].kind, Pending::Deploy);
    }

    #[test]
    fn two_words_for_one_platform_report_it_once() {
        let (_, unchecked) = read("mac or macos, kubernetes or k8s");
        assert_eq!(values(&unchecked), ["macOS", "Kubernetes"]);
    }

    #[test]
    fn the_tool_being_replaced_is_not_also_a_requirement() {
        let mut filters = Filters {
            replaces: Some("docker".into()),
            ..Filters::default()
        };
        let unchecked = apply("self-hosted alternative to docker on linux", &mut filters);
        assert_eq!(values(&unchecked), ["Linux"]);
        assert!(filters.self_host);
    }
}
