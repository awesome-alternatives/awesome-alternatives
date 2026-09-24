use hmac::{Hmac, KeyInit, Mac};
use sha2::Sha256;

pub fn is_signed(secret: &str, signature: Option<&str>, body: &[u8]) -> bool {
    let Some(expected) = signature
        .and_then(|value| value.strip_prefix("sha256="))
        .and_then(|digest| hex::decode(digest).ok())
    else {
        return false;
    };
    let Ok(mut mac) = Hmac::<Sha256>::new_from_slice(secret.as_bytes()) else {
        return false;
    };
    mac.update(body);
    mac.verify_slice(&expected).is_ok()
}

#[cfg(test)]
pub fn sign(secret: &str, body: &[u8]) -> String {
    let mut mac = Hmac::<Sha256>::new_from_slice(secret.as_bytes()).unwrap();
    mac.update(body);
    format!("sha256={}", hex::encode(mac.finalize().into_bytes()))
}

#[cfg(test)]
mod tests {
    use super::*;

    const BODY: &[u8] = br#"{"action":"published"}"#;

    #[test]
    fn a_body_signed_with_the_secret_is_accepted() {
        let signature = sign("secret", BODY);
        assert!(is_signed("secret", Some(&signature), BODY));
    }

    #[test]
    fn a_body_signed_with_another_secret_is_rejected() {
        let signature = sign("other", BODY);
        assert!(!is_signed("secret", Some(&signature), BODY));
    }

    #[test]
    fn a_body_changed_after_signing_is_rejected() {
        let signature = sign("secret", BODY);
        assert!(!is_signed("secret", Some(&signature), b"{}"));
    }

    #[test]
    fn a_missing_signature_is_rejected() {
        assert!(!is_signed("secret", None, BODY));
    }

    #[test]
    fn a_signature_without_its_prefix_or_with_bad_hex_is_rejected() {
        let signature = sign("secret", BODY);
        let digest = signature.trim_start_matches("sha256=");
        assert!(!is_signed("secret", Some(digest), BODY));
        assert!(!is_signed("secret", Some(&format!("sha1={digest}")), BODY));
        assert!(!is_signed("secret", Some("sha256=not-hex"), BODY));
        assert!(!is_signed("secret", Some("sha256="), BODY));
    }
}
