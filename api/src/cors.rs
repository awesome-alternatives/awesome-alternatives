use axum::http::{HeaderValue, Method, header};
use tower_http::cors::CorsLayer;

#[derive(Debug, thiserror::Error)]
#[error("ALLOWED_ORIGINS holds {0}, which is not a usable origin")]
pub struct OriginError(String);

pub fn layer(origins: &[String]) -> Result<CorsLayer, OriginError> {
    let allowed = origins
        .iter()
        .map(|origin| HeaderValue::from_str(origin).map_err(|_| OriginError(origin.clone())))
        .collect::<Result<Vec<_>, _>>()?;
    Ok(CorsLayer::new()
        .allow_origin(allowed)
        .allow_methods([Method::GET, Method::POST])
        .allow_headers([header::CONTENT_TYPE]))
}

#[cfg(test)]
mod tests {
    use axum::Router;
    use axum::body::Body;
    use axum::http::{Request, StatusCode};
    use axum::routing::post;
    use tower::ServiceExt;

    use super::*;

    const SITE: &str = "https://awesome-alternatives.com";
    const OTHER: &str = "https://evil.example";

    fn app(origins: &[String]) -> Router {
        Router::new()
            .route("/v1/search", post(|| async { "ok" }))
            .layer(layer(origins).expect("origins parse"))
    }

    fn site() -> Vec<String> {
        vec![SITE.to_owned()]
    }

    async fn preflight(origins: &[String], origin: &str) -> (StatusCode, Option<String>) {
        let response = app(origins)
            .oneshot(
                Request::builder()
                    .method("OPTIONS")
                    .uri("/v1/search")
                    .header("origin", origin)
                    .header("access-control-request-method", "POST")
                    .header("access-control-request-headers", "content-type")
                    .body(Body::empty())
                    .unwrap(),
            )
            .await
            .unwrap();
        let allowed = response
            .headers()
            .get("access-control-allow-origin")
            .map(|value| value.to_str().unwrap().to_owned());
        (response.status(), allowed)
    }

    #[tokio::test]
    async fn a_preflight_from_another_site_is_not_granted_an_origin() {
        assert_eq!(preflight(&site(), OTHER).await.1, None);
    }

    #[tokio::test]
    async fn a_preflight_from_the_site_is_granted_its_own_origin() {
        let (status, allowed) = preflight(&site(), SITE).await;
        assert_eq!(status, StatusCode::OK);
        assert_eq!(allowed.as_deref(), Some(SITE));
    }

    #[tokio::test]
    async fn no_configured_origin_means_no_browser_may_read_a_response() {
        assert_eq!(preflight(&[], SITE).await.1, None);
        assert_eq!(preflight(&[], OTHER).await.1, None);
    }

    #[tokio::test]
    async fn a_post_from_another_site_is_answered_without_an_origin_the_browser_accepts() {
        let response = app(&site())
            .oneshot(
                Request::builder()
                    .method("POST")
                    .uri("/v1/search")
                    .header("origin", OTHER)
                    .body(Body::empty())
                    .unwrap(),
            )
            .await
            .unwrap();
        assert_eq!(response.headers().get("access-control-allow-origin"), None);
    }

    #[test]
    fn an_origin_that_cannot_be_a_header_stops_the_process_at_startup() {
        assert!(layer(&["hello world\n".to_owned()]).is_err());
    }
}
