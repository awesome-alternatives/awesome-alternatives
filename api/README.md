# API

Serves the catalog in `generated/catalog.json` over HTTP, with a natural-language search that runs
on a local embedding model and falls back to [Jev](https://typesafe.ai) for what it cannot read.
Rust and axum.

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

A query goes through three steps, and stops as soon as it knows which tool the person wants to
replace:

1. **Keywords.** Tool names, languages and licences that appear in the query as words.
2. **Local model.** When no tool is named, the query is embedded with
   [BGE small](https://huggingface.co/BAAI/bge-small-en-v1.5) (quantised, about 35 MB, baked into
   the image) and compared with the description of every tool other entries replace. "automate my
   releases from commit messages" finds semantic-release this way. Without a target, results are
   ranked by how close each tool's description is to the query, so "generate a changelog from git
   history" returns git-cliff.
3. **Jev.** Only when the first two found no target, and only with `TYPESAFE_API_KEY` set. Jev is
   asked to pick the target tool, language and licence among values actually in the catalog, plus
   `none`, and whether a drop-in is needed. Answers below 0.6 confidence and labels outside the
   catalog are dropped, so the model can narrow a search but never invent a filter. Choices are
   capped at 255 options by the API; past that, the options sharing the most words with the query
   are kept. Answers are cached for a day per normalised query.

`interpretedBy` says `local` or `jev`. Without a Jev key the API logs a warning at startup and
runs on the first two steps. If the model cannot be loaded, it logs a warning and runs on keywords
alone. Neither stops it from serving.

The model thresholds (0.75 to pick a target, 0.73 to keep a result) were set against the catalog:
unrelated queries such as "a kubernetes dashboard" score below 0.70 against every tool.

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
| `FASTEMBED_CACHE_DIR` | `.fastembed_cache` | Where the model is read from, `/models` in the image. `cargo run` downloads it there on first start. |
| `RUST_LOG` | `info` | |

## Running

```bash
cargo run
```

```bash
docker build -t awesome-alternatives-api api
docker run -p 3000:3000 -e TYPESAFE_API_KEY -e TRUST_PROXY=true awesome-alternatives-api
```
