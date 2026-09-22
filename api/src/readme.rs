use std::borrow::Cow;

use ammonia::{Builder, UrlRelative, UrlRelativeEvaluate};
use url::Url;

const IMAGE_EXTENSIONS: [&str; 8] = [
    ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".avif", ".ico",
];

pub fn sanitize(html: &str, full_name: &str) -> String {
    let (Ok(raw), Ok(blob)) = (
        Url::parse(&format!(
            "https://raw.githubusercontent.com/{full_name}/HEAD/"
        )),
        Url::parse(&format!("https://github.com/{full_name}/blob/HEAD/")),
    ) else {
        tracing::warn!(
            full_name,
            "the repository name does not form a URL, serving an empty README"
        );
        return String::new();
    };
    let srcset_base = raw.clone();
    Builder::default()
        .add_tags(["picture", "source"])
        .add_tag_attributes("source", ["srcset", "media"])
        .attribute_filter(
            move |element, attribute, value| match (element, attribute) {
                ("source", "srcset") => Some(Cow::Owned(
                    value
                        .split(',')
                        .map(|candidate| {
                            let candidate = candidate.trim();
                            let (url, descriptor) =
                                candidate.split_once(' ').unwrap_or((candidate, ""));
                            format!("{} {descriptor}", absolute(url, &srcset_base))
                                .trim_end()
                                .to_owned()
                        })
                        .collect::<Vec<_>>()
                        .join(", "),
                )),
                _ => Some(Cow::Borrowed(value)),
            },
        )
        .url_relative(UrlRelative::Custom(Box::new(Repository { raw, blob })))
        .clean(html)
        .to_string()
}

struct Repository {
    raw: Url,
    blob: Url,
}

impl<'a> UrlRelativeEvaluate<'a> for Repository {
    fn evaluate<'url>(&self, url: &'url str) -> Option<Cow<'url, str>> {
        if url.starts_with('#') {
            return None;
        }
        let path = url
            .split(['?', '#'])
            .next()
            .unwrap_or(url)
            .to_ascii_lowercase();
        let base = if IMAGE_EXTENSIONS.iter().any(|ext| path.ends_with(ext)) {
            &self.raw
        } else {
            &self.blob
        };
        Some(absolute(url, base))
    }
}

fn absolute<'u>(value: &'u str, base: &Url) -> Cow<'u, str> {
    let lower = value.to_ascii_lowercase();
    if value.starts_with('#')
        || ["http://", "https://", "mailto:", "//"]
            .iter()
            .any(|p| lower.starts_with(p))
    {
        return Cow::Borrowed(value);
    }
    base.join(value.trim_start_matches('/'))
        .map_or(Cow::Borrowed(value), |url| Cow::Owned(url.to_string()))
}

#[cfg(test)]
mod tests {
    use super::*;

    fn clean(html: &str) -> String {
        sanitize(html, "acme/tool")
    }

    #[test]
    fn relative_images_point_at_raw_files() {
        assert_eq!(
            clean(r#"<img src="./assets/logo.png" alt="logo">"#),
            r#"<img src="https://raw.githubusercontent.com/acme/tool/HEAD/assets/logo.png" alt="logo">"#
        );
        assert!(
            clean(r#"<img src="/docs/a.svg">"#)
                .contains("raw.githubusercontent.com/acme/tool/HEAD/docs/a.svg")
        );
    }

    #[test]
    fn relative_links_point_at_the_repository() {
        let html = clean(r#"<a href="CONTRIBUTING.md">guide</a>"#);
        assert!(html.contains(r#"href="https://github.com/acme/tool/blob/HEAD/CONTRIBUTING.md""#));
        assert!(html.contains(r#"rel="noopener noreferrer""#));
    }

    #[test]
    fn absolute_urls_are_left_alone() {
        let html = clean(
            r#"<img src="https://camo.githubusercontent.com/x"><a href="https://example.com">x</a>"#,
        );
        assert!(html.contains(r#"src="https://camo.githubusercontent.com/x""#));
        assert!(html.contains(r#"href="https://example.com""#));
    }

    #[test]
    fn dark_mode_sources_keep_their_descriptors() {
        let html = clean(
            r#"<picture><source media="(prefers-color-scheme: dark)" srcset="./dark.png 2x"><img src="light.png"></picture>"#,
        );
        assert!(
            html.contains(
                r#"srcset="https://raw.githubusercontent.com/acme/tool/HEAD/dark.png 2x""#
            )
        );
        assert!(html.contains(r#"media="(prefers-color-scheme: dark)""#));
    }

    #[test]
    fn an_awkward_repository_name_still_builds_a_base_rather_than_falling_back() {
        for full_name in [
            "acme/tool",
            "",
            "a b/c",
            "../..",
            "%zz/x",
            "acme/tool\u{7f}",
            "ǆ/x",
        ] {
            assert_eq!(
                sanitize("<p>hi</p>", full_name),
                "<p>hi</p>",
                "{full_name:?} fell back to an empty README"
            );
        }
    }

    #[test]
    fn scripts_handlers_and_javascript_links_are_removed() {
        let html = clean(
            r#"<p onclick="steal()">hi</p><script>alert(1)</script><a href="javascript:alert(1)">x</a><img src="x" onerror="alert(1)">"#,
        );
        assert!(!html.contains("script"));
        assert!(!html.contains("onclick"));
        assert!(!html.contains("onerror"));
        assert!(!html.contains("javascript:"));
    }
}
