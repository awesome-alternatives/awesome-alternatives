#![no_main]

#[path = "../../src/refresh/signature.rs"]
#[allow(dead_code)]
mod signature;

use arbitrary::Arbitrary;
use hmac::{Hmac, KeyInit, Mac};
use libfuzzer_sys::fuzz_target;
use sha2::Sha256;

#[derive(Debug, Arbitrary)]
struct Input<'a> {
    secret: &'a str,
    body: &'a [u8],
    header: Option<&'a str>,
    flip: usize,
}

fn sign(secret: &str, body: &[u8]) -> String {
    let mut mac = Hmac::<Sha256>::new_from_slice(secret.as_bytes()).unwrap();
    mac.update(body);
    format!("sha256={}", hex::encode(mac.finalize().into_bytes()))
}

fuzz_target!(|input: Input| {
    let _ = signature::is_signed(input.secret, input.header, input.body);

    let valid = sign(input.secret, input.body);
    assert!(signature::is_signed(input.secret, Some(&valid), input.body));

    if !input.body.is_empty() {
        let mut tampered = input.body.to_vec();
        let at = input.flip % tampered.len();
        tampered[at] ^= 1;
        assert!(!signature::is_signed(input.secret, Some(&valid), &tampered));
    }
});
