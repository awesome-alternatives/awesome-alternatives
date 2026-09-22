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
| `GET` | `/v1/tools/{slug}/readme` | The repository README as HTML, sanitised, with relative links and images pointed at GitHub. `html` is `null` when there is none. |
| `GET` | `/v1/tools/{slug}/security` | The OpenSSF Scorecard (score, date, checks worst first, `null` when the project was never scored) and the repository's published GitHub security advisories. |
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

At startup and on every refresh the whole catalog is embedded, in batches of 16 texts. The ONNX
session pads each batch to its longest text and holds the raw output of every batch until the call
returns, so one call over the whole catalog made the startup peak grow with the number of tools.
Batching keeps that peak flat; the stored vectors are 384 floats, about 1.5 KB per tool, and are
not affected.

`POST /v1/search` is limited per client IP. Behind a reverse proxy, set `TRUST_PROXY=true` so the
limit applies to the address in the last `X-Forwarded-For` entry rather than to the proxy.

## README and security

Both are fetched on first request and cached for 12 hours per repository; a failed fetch answers
502 and is not cached. READMEs come from GitHub's rendered HTML and go through
[ammonia](https://github.com/rust-ammonia/ammonia) before they leave the API: scripts, event
handlers and `javascript:` links are removed, relative images point at `raw.githubusercontent.com`
and relative links at the file on GitHub. Keeping READMEs out of the catalog keeps the nightly
commit and the API's hourly reload small.

Both caches are bounded by bytes rather than by entry count: a rendered README runs to hundreds of
kilobytes, so counting entries said nothing about how much memory they held. `DETAILS_CACHE_BYTES`
is the total budget, 64 MiB by default, split evenly between the two. The weight of an entry is the
key plus the strings it holds, and an entry heavier than its cache's share is served once and never
kept.

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
| `GITHUB_TOKEN` | unset | Raises GitHub's limit from 60 to 5,000 requests an hour for READMEs and advisories. A read-only token with no scopes is enough. |
| `GITHUB_API_URL` | `https://api.github.com` | |
| `SCORECARD_API_URL` | `https://api.securityscorecards.dev` | |
| `DETAILS_CACHE_BYTES` | `67108864` | 64 MiB, the total for the README and security caches together. |
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
