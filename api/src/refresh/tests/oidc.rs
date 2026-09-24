use std::sync::atomic::Ordering;

use jsonwebtoken::{Algorithm, EncodingKey, Header, encode};

use super::{Jwks, KID, OidcClaims, oidc_token};
use crate::refresh::oidc::{DEFAULT_AUDIENCE, Oidc, OidcError};

async fn verifier() -> (Oidc, Jwks) {
    let jwks = Jwks::default();
    let url = jwks.serve().await;
    (
        Oidc::new(reqwest::Client::new(), &url, DEFAULT_AUDIENCE),
        jwks,
    )
}

#[tokio::test]
async fn a_valid_token_names_its_repository() {
    let (oidc, _) = verifier().await;
    let token = oidc_token(KID, &OidcClaims::valid("Owner/Tool"));
    assert_eq!(oidc.repository(&token).await.unwrap(), "Owner/Tool");
}

#[tokio::test]
async fn a_token_for_another_audience_is_rejected() {
    let (oidc, _) = verifier().await;
    let claims = OidcClaims {
        aud: "sigstore".into(),
        ..OidcClaims::valid("owner/tool")
    };
    assert!(matches!(
        oidc.repository(&oidc_token(KID, &claims)).await,
        Err(OidcError::Token(_))
    ));
}

#[tokio::test]
async fn a_token_from_another_issuer_is_rejected() {
    let (oidc, _) = verifier().await;
    let claims = OidcClaims {
        iss: "https://attacker.example".into(),
        ..OidcClaims::valid("owner/tool")
    };
    assert!(matches!(
        oidc.repository(&oidc_token(KID, &claims)).await,
        Err(OidcError::Token(_))
    ));
}

#[tokio::test]
async fn an_expired_token_is_rejected() {
    let (oidc, _) = verifier().await;
    let now = jsonwebtoken::get_current_timestamp();
    let claims = OidcClaims {
        iat: now - 3600,
        nbf: now - 3600,
        exp: now - 600,
        ..OidcClaims::valid("owner/tool")
    };
    assert!(matches!(
        oidc.repository(&oidc_token(KID, &claims)).await,
        Err(OidcError::Token(_))
    ));
}

#[tokio::test]
async fn a_token_signed_with_a_shared_secret_is_rejected() {
    let (oidc, _) = verifier().await;
    let header = Header {
        kid: Some(KID.into()),
        ..Header::new(Algorithm::HS256)
    };
    let token = encode(
        &header,
        &OidcClaims::valid("owner/tool"),
        &EncodingKey::from_secret(b"guess"),
    )
    .unwrap();
    assert!(oidc.repository(&token).await.is_err());
}

#[tokio::test]
async fn an_unknown_key_refetches_the_jwks_at_most_once_a_minute() {
    let (oidc, jwks) = verifier().await;
    let claims = OidcClaims::valid("owner/tool");
    for kid in ["rotated-1", "rotated-2"] {
        assert!(matches!(
            oidc.repository(&oidc_token(kid, &claims)).await,
            Err(OidcError::UnknownKey(_))
        ));
    }
    assert_eq!(jwks.fetches.load(Ordering::SeqCst), 1);
    oidc.repository(&oidc_token(KID, &claims)).await.unwrap();
    assert_eq!(jwks.fetches.load(Ordering::SeqCst), 1);
}
