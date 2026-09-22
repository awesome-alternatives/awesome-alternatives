# API

Serves the catalog in `generated/catalog.json` over HTTP, with a natural-language search backed by
[Jev](https://typesafe.ai). Rust and axum.

## Endpoints

| Method | Path | |
|---|---|---|
| `GET` | `/v1/tools` | Filter with `replaces`, `language`, `license`, `category`, `dropIn=true`. Case-insensitive on language and licence. |
| `POST` | `/v1/search` | Body `{ "q": "semantic-release but in Rust" }`. Returns the filters it read, which interpreter read them, and the matching tools. |
| `GET` | `/v1/vocabulary` | Every tool something replaces, and every language, licence and category present. The site builds its filters from it. |
| `GET` | `/healthz` | `ok` |

Results are ranked by fit (`drop-in`, then `full`, then `partial`) when `replaces` is set, then by
stars. Archived repositories are never returned.

## How search works

Jev is asked four questions about the query: which listed tool it wants to replace, which language,
which licence (each a choice among values actually in the catalog, plus `none`), and whether it
needs a drop-in replacement. Answers below 0.6 confidence are dropped, and a label outside the
catalog is ignored, so the model can narrow a search but never invent a filter. Choices are capped
at 255 options by the API; past that, the options sharing the most words with the query are kept.

Without `TYPESAFE_API_KEY`, or when TypeSafe fails, the query is matched word by word against the
same vocabulary instead, and `interpretedBy` says `lexical`. Jev answers are cached for a day per
normalised query and dropped when the catalog changes.

`POST /v1/search` is limited per client IP. Behind a reverse proxy, set `TRUST_PROXY=true` so the
limit applies to the address in the last `X-Forwarded-For` entry rather than to the proxy.

## Configuration

| Variable | Default | |
|---|---|---|
| `BIND` | `0.0.0.0:3000` | |
| `CATALOG_SOURCE` | the catalog on `main`, from raw.githubusercontent.com | An `https://` URL or a file path. |
| `CATALOG_REFRESH_SECS` | `3600` | A failed refresh keeps the previous catalog. |
| `SEARCHES_PER_MINUTE` | `20` | Per client IP. |
| `TRUST_PROXY` | `false` | |
| `TYPESAFE_API_KEY` | unset | Enables Jev. |
| `TYPESAFE_MODEL` | `jev-latest` | Pin a version such as `jev-1.13.0` for stable answers. |
| `TYPESAFE_BASE_URL` | `https://api.typesafe.ai` | |
| `RUST_LOG` | `info` | |

## Running

```bash
cargo run
```

```bash
docker build -t awesome-alternatives-api api
docker run -p 3000:3000 -e TYPESAFE_API_KEY -e TRUST_PROXY=true awesome-alternatives-api
```
