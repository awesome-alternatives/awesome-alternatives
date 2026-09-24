#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error(transparent)]
    Http(#[from] reqwest::Error),
    #[error("the response body is larger than {0} bytes")]
    TooLarge(usize),
}

pub async fn text(mut response: reqwest::Response, limit: usize) -> Result<String, Error> {
    if response
        .content_length()
        .is_some_and(|length| usize::try_from(length).unwrap_or(usize::MAX) > limit)
    {
        return Err(Error::TooLarge(limit));
    }
    let mut body = Vec::new();
    while let Some(chunk) = response.chunk().await? {
        if body.len() + chunk.len() > limit {
            return Err(Error::TooLarge(limit));
        }
        body.extend_from_slice(&chunk);
    }
    Ok(String::from_utf8(body)
        .unwrap_or_else(|invalid| String::from_utf8_lossy(invalid.as_bytes()).into_owned()))
}

#[cfg(test)]
mod tests {
    use tokio::io::{AsyncReadExt, AsyncWriteExt};
    use tokio::net::TcpListener;

    use super::*;

    async fn answer(raw: &'static str) -> reqwest::Response {
        let listener = TcpListener::bind("127.0.0.1:0").await.unwrap();
        let url = format!("http://{}/", listener.local_addr().unwrap());
        tokio::spawn(async move {
            let (mut socket, _) = listener.accept().await.unwrap();
            let mut request = [0; 4096];
            let read = socket.read(&mut request).await.unwrap();
            assert!(read > 0);
            socket.write_all(raw.as_bytes()).await.unwrap();
            socket.shutdown().await.unwrap();
        });
        reqwest::get(url).await.unwrap()
    }

    const CHUNKED: &str = "HTTP/1.1 200 OK\r\nTransfer-Encoding: chunked\r\n\r\n6\r\nhello \r\n6\r\nworld!\r\n0\r\n\r\n";

    #[tokio::test]
    async fn a_body_within_the_limit_is_read_whole() {
        let response = answer("HTTP/1.1 200 OK\r\nContent-Length: 5\r\n\r\nhello").await;
        assert_eq!(text(response, 5).await.unwrap(), "hello");
        assert_eq!(
            text(answer(CHUNKED).await, 12).await.unwrap(),
            "hello world!"
        );
    }

    #[tokio::test]
    async fn a_declared_length_over_the_limit_is_refused_before_reading() {
        let response =
            answer("HTTP/1.1 200 OK\r\nContent-Length: 1000000000\r\n\r\nnever sent in full").await;
        assert!(matches!(
            text(response, 1024).await,
            Err(Error::TooLarge(1024))
        ));
    }

    #[tokio::test]
    async fn an_undeclared_body_stops_as_soon_as_it_passes_the_limit() {
        assert!(matches!(
            text(answer(CHUNKED).await, 11).await,
            Err(Error::TooLarge(11))
        ));
    }
}
