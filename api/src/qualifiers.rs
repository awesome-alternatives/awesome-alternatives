use serde::{Deserialize, Serialize};

use crate::catalog::{DeployMethod, Terms};
use crate::filters::Filters;
use crate::lexical::{mentions, normalize};
use crate::vocabulary::Vocabulary;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Deserialize, Serialize)]
#[serde(rename_all = "lowercase")]
pub enum Pending {
    Platform,
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
    "código aberto",
    "codigo aberto",
    "software livre",
    "オープンソース",
    "フリーソフトウェア",
    "sumber terbuka",
    "kode terbuka",
    "perangkat lunak bebas",
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
    "mantido",
    "mantida",
    "mantidos",
    "mantidas",
    "ativamente desenvolvido",
    "メンテナンスされている",
    "保守されている",
    "terawat",
    "dipelihara",
    "aktif dikembangkan",
    "masih dikembangkan",
    "dikelola",
    "aktif dikelola",
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
    "auto hospedado",
    "auto hospedada",
    "autohospedada",
    "hospedagem própria",
    "meu servidor",
    "minha vps",
    "meu vps",
    "セルフホスト",
    "オンプレミス",
    "自前のサーバー",
    "自分のサーバー",
    "server sendiri",
    "vps sendiri",
    "hosting sendiri",
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

const DEPLOYMENTS: &[(&str, DeployMethod, &str)] = &[
    ("docker compose", DeployMethod::Compose, "docker compose"),
    ("compose", DeployMethod::Compose, "docker compose"),
    ("docker", DeployMethod::Container, "docker"),
    ("kubernetes", DeployMethod::Helm, "kubernetes"),
    ("k8s", DeployMethod::Helm, "kubernetes"),
    ("helm", DeployMethod::Helm, "helm"),
    ("single binary", DeployMethod::Binary, "single binary"),
    ("binaire", DeployMethod::Binary, "single binary"),
    ("binario", DeployMethod::Binary, "single binary"),
    ("binärdatei", DeployMethod::Binary, "single binary"),
    ("binário", DeployMethod::Binary, "single binary"),
    ("単一バイナリ", DeployMethod::Binary, "single binary"),
    ("シングルバイナリ", DeployMethod::Binary, "single binary"),
    ("biner", DeployMethod::Binary, "single binary"),
    ("deb package", DeployMethod::Package, "deb package"),
    ("rpm package", DeployMethod::Package, "rpm package"),
    ("os package", DeployMethod::Package, "os package"),
    ("os packages", DeployMethod::Package, "os package"),
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
    filters.deploy = deployments(&query, target.as_deref());
    let mut unchecked = pending(&query, PLATFORMS);
    unchecked.retain(|u| target.as_deref() != Some(normalize(&u.value).as_str()));
    unchecked
}

pub fn capabilities(query: &str, vocabulary: &Vocabulary) -> Vec<String> {
    let query = normalize(query);
    vocabulary
        .capabilities
        .iter()
        .filter(|(_, words)| {
            mentions(&query, &words.label) || words.phrases.iter().any(|p| mentions(&query, p))
        })
        .map(|(key, _)| key.clone())
        .collect()
}

pub fn is_requirement(slug: &str) -> bool {
    let label = normalize(slug);
    requirement_words().any(|word| normalize(word) == label)
}

fn requirement_words() -> impl Iterator<Item = &'static str> {
    PLATFORMS
        .iter()
        .map(|(word, _)| *word)
        .chain(DEPLOYMENTS.iter().map(|(word, _, _)| *word))
}

fn said_outside_longer(query: &str, word: &str, said: &[&str]) -> bool {
    let rest = said
        .iter()
        .filter(|other| **other != word && mentions(&normalize(other), word))
        .fold(query.to_owned(), |rest, other| {
            rest.replace(&normalize(other), " ")
        });
    mentions(&rest, word)
}

fn alone<'a>(query: &str, words: impl Iterator<Item = &'a str>) -> Vec<&'a str> {
    let said: Vec<&str> = words.filter(|word| mentions(query, word)).collect();
    said.iter()
        .filter(|word| said_outside_longer(query, word, &said))
        .copied()
        .collect()
}

pub fn is_swallowed(query: &str, name: &str) -> bool {
    let query = normalize(query);
    let said: Vec<&str> = requirement_words()
        .filter(|word| mentions(&query, word))
        .collect();
    let name = normalize(name);
    mentions(&query, &name) && !said_outside_longer(&query, &name, &said)
}

fn pending(query: &str, table: &[(&str, &str)]) -> Vec<Unchecked> {
    let mut out: Vec<Unchecked> = Vec::new();
    for word in alone(query, table.iter().map(|(word, _)| *word)) {
        let label = table
            .iter()
            .find_map(|(w, label)| (*w == word).then_some(*label));
        if let Some(label) = label
            && !out.iter().any(|u| u.value == label)
        {
            out.push(Unchecked {
                kind: Pending::Platform,
                value: label.to_owned(),
            });
        }
    }
    out
}

fn deployments(query: &str, target: Option<&str>) -> Vec<DeployMethod> {
    let mut out: Vec<DeployMethod> = Vec::new();
    for word in alone(query, DEPLOYMENTS.iter().map(|(word, _, _)| *word)) {
        let found = DEPLOYMENTS.iter().find(|(w, _, _)| *w == word);
        if let Some((_, method, subject)) = found
            && target != Some(normalize(subject).as_str())
            && !out.contains(method)
        {
            out.push(*method);
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
    fn reads_them_in_portuguese_japanese_and_indonesian() {
        for query in [
            "alternativa de código aberto ao redis, mantida e auto-hospedada",
            "オープンソースで保守されているセルフホスト型のRedis代替",
            "alternatif sumber terbuka untuk redis, terawat, di server sendiri",
        ] {
            let (filters, _) = read(query);
            assert_eq!(filters.terms, Some(Terms::Open), "{query}");
            assert!(filters.maintained, "{query}");
            assert!(filters.self_host, "{query}");
        }
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
    fn platforms_are_reported_as_unchecked_and_deployments_are_not() {
        let (filters, unchecked) = read("runs on linux and arm, deployed with docker compose");
        assert_eq!(values(&unchecked), ["Linux", "ARM"]);
        assert!(unchecked.iter().all(|u| u.kind == Pending::Platform));
        assert_eq!(filters.deploy, [DeployMethod::Compose]);
    }

    #[test]
    fn two_words_for_one_platform_report_it_once() {
        let (_, unchecked) = read("mac or macos on raspberry pi");
        assert_eq!(values(&unchecked), ["macOS", "Raspberry Pi"]);
    }

    fn deploy_of(query: &str) -> Vec<DeployMethod> {
        read(query).0.deploy
    }

    #[test]
    fn each_deployment_word_names_the_method_it_proves() {
        assert_eq!(
            deploy_of("a url shortener in docker"),
            [DeployMethod::Container]
        );
        assert_eq!(
            deploy_of("docker compose url shortener"),
            [DeployMethod::Compose]
        );
        assert_eq!(deploy_of("compose file wiki"), [DeployMethod::Compose]);
        for query in ["runs on kubernetes", "k8s ready", "with a helm chart"] {
            assert_eq!(deploy_of(query), [DeployMethod::Helm], "{query}");
        }
        assert_eq!(deploy_of("a single binary wiki"), [DeployMethod::Binary]);
        assert_eq!(deploy_of("an rpm package"), [DeployMethod::Package]);
    }

    #[test]
    fn deployment_words_are_read_in_every_language_the_site_speaks() {
        for query in [
            "un wiki en binaire unique",
            "un wiki como binario",
            "ein wiki als binärdatei",
            "um wiki em binário",
            "単一バイナリのwiki",
            "シングルバイナリのwiki",
            "wiki dalam biner tunggal",
        ] {
            assert_eq!(deploy_of(query), [DeployMethod::Binary], "{query}");
        }
    }

    #[test]
    fn docker_compose_is_one_requirement_not_two() {
        assert_eq!(deploy_of("docker compose"), [DeployMethod::Compose]);
        assert_eq!(
            deploy_of("docker, docker compose and kubernetes or k8s"),
            [
                DeployMethod::Compose,
                DeployMethod::Container,
                DeployMethod::Helm
            ]
        );
    }

    #[test]
    fn a_deployment_word_inside_a_name_is_not_a_requirement() {
        assert!(deploy_of("dockerfile linter and helmfile and composer").is_empty());
    }

    #[test]
    fn the_tool_being_replaced_is_not_also_a_requirement() {
        for (target, query) in [
            ("docker", "self-hosted alternative to docker on linux"),
            ("kubernetes", "alternatives to k8s"),
            ("kubernetes", "alternatives to kubernetes"),
            ("docker-compose", "an alternative to docker compose"),
            ("helm", "an alternative to helm"),
        ] {
            let mut filters = Filters {
                replaces: Some(target.into()),
                ..Filters::default()
            };
            apply(query, &mut filters);
            assert!(filters.deploy.is_empty(), "{query}");
        }
    }

    #[test]
    fn a_requirement_next_to_a_different_target_still_filters() {
        let mut filters = Filters {
            replaces: Some("redis".into()),
            ..Filters::default()
        };
        let unchecked = apply("alternative to redis for kubernetes on linux", &mut filters);
        assert_eq!(filters.deploy, [DeployMethod::Helm]);
        assert_eq!(values(&unchecked), ["Linux"]);
    }

    #[test]
    fn a_platform_target_is_not_reported_as_unchecked() {
        let mut filters = Filters {
            replaces: Some("linux".into()),
            ..Filters::default()
        };
        let unchecked = apply("alternative to linux", &mut filters);
        assert!(unchecked.is_empty());
    }

    #[test]
    fn a_name_only_found_inside_a_longer_requirement_is_swallowed() {
        assert!(is_swallowed("docker compose url shortener", "docker"));
        assert!(!is_swallowed(
            "docker compose url shortener",
            "docker compose"
        ));
        assert!(!is_swallowed("docker or docker compose", "docker"));
        assert!(!is_swallowed("an alternative to docker", "docker"));
        assert!(!is_swallowed("an alternative to redis", "docker"));
    }

    fn forge_words() -> Vocabulary {
        let word =
            |label: &str, category: &str, phrases: &[&str]| crate::vocabulary::CapabilityWords {
                label: label.into(),
                category: category.into(),
                phrases: phrases.iter().map(|p| (*p).to_owned()).collect(),
            };
        Vocabulary {
            capabilities: std::collections::BTreeMap::from([
                (
                    "ci".into(),
                    word(
                        "CI/CD",
                        "git-forge",
                        &["ci", "continuous integration", "intégration continue"],
                    ),
                ),
                (
                    "container-registry".into(),
                    word(
                        "Container registry",
                        "git-forge",
                        &["docker registry", "registre docker"],
                    ),
                ),
                (
                    "pki".into(),
                    word(
                        "PKI and certificates",
                        "secrets-manager",
                        &["pki", "certificate authority"],
                    ),
                ),
            ]),
            ..Vocabulary::default()
        }
    }

    #[test]
    fn capabilities_are_read_from_their_label_or_any_listed_phrase() {
        let words = forge_words();
        assert_eq!(
            capabilities(
                "leave GitLab but I need CI/CD and a Docker registry",
                &words
            ),
            ["ci", "container-registry"]
        );
        assert_eq!(
            capabilities(
                "quitter GitLab, avec intégration continue et registre Docker",
                &words
            ),
            ["ci", "container-registry"]
        );
    }

    #[test]
    fn a_capability_needs_a_whole_phrase_not_a_fragment() {
        assert!(capabilities("a circle of certificates", &forge_words()).is_empty());
    }
}
