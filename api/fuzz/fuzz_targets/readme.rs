#![no_main]

#[path = "../../src/readme.rs"]
#[allow(dead_code)]
mod readme;

use arbitrary::Arbitrary;
use libfuzzer_sys::fuzz_target;

#[derive(Debug, Arbitrary)]
struct Input<'a> {
    html: &'a str,
    full_name: &'a str,
}

const EXECUTABLE_URLS: [&str; 3] = [
    "href=\"javascript:",
    "src=\"javascript:",
    "srcset=\"javascript:",
];

fuzz_target!(|input: Input| {
    let output = readme::sanitize(input.html, input.full_name).to_ascii_lowercase();
    assert!(!output.contains("<script"));
    assert!(!output.contains("<iframe"));
    assert!(!output.contains("<style"));
    for tag in output
        .split('<')
        .skip(1)
        .filter_map(|rest| rest.split('>').next())
    {
        for needle in EXECUTABLE_URLS {
            assert!(!tag.contains(needle), "{needle} survived in {output}");
        }
    }
});
