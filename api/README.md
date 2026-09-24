# API

Serves the catalog in `generated/catalog.json` over HTTP, with a natural-language search that runs
on a local embedding model and falls back to [Jev](https://typesafe.ai) for what it cannot read.
Rust and axum.

## Endpoints

| Method | Path | |
|---|---|---|
| `GET` | `/v1/tools` | Filter with `replaces`, `language`, `license`, `category`, `dropIn=true`. Case-insensitive on language and licence. `category` is one a caller passes for itself: no interpreter reads one out of a query, so `POST /v1/search` never answers with it. Paged with `limit` (50 by default, 200 at most, anything larger is clamped rather than refused) and `offset`. The answer repeats the `limit` and `offset` it used, and `count` is how many matched the filters, not how many came back. |
| `POST` | `/v1/search` | Body `{ "q": "semantic-release but in Rust" }`. Returns the filters it read, which interpreter read them, and the matching tools. Takes `limit` and `offset` in the body, with the same default and maximum as `/v1/tools`, and repeats them in the answer. Paging re-reads the query, which is cached, so a later page costs no embedding and no Jev call, but it does spend a rate-limit token. |
| `GET` | `/v1/vocabulary` | Every tool something replaces, and every language, licence and category present. Nothing in this repository calls it: it is here for anyone building against the catalog, which is CC0, and it is part of the published surface rather than an internal helper. |
| `GET` | `/v1/tools/{slug}/readme` | The repository README as HTML, sanitised, with relative links and images pointed at GitHub. `html` is `null` when there is none. |
| `GET` | `/v1/tools/{slug}/security` | The OpenSSF Scorecard (score, date, checks worst first, `null` when the project was never scored) and the repository's published GitHub security advisories. |
| `POST` | `/webhooks/github` | GitHub App webhook. Signed with `X-Hub-Signature-256`, `401` when the signature does not match. A published release of a repository in the catalog answers `202` and triggers a refresh of its tools (see [Release-triggered refresh](#release-triggered-refresh)); every other event, action or repository answers `204`. |
| `POST` | `/v1/refresh` | Called from a maintainer's own workflow with `Authorization: Bearer <GitHub Actions OIDC token>`. Refreshes the tools backed by the repository the token was issued to. `202` with `{ "slugs": [...], "dispatched": true }`, `dispatched` being `false` when a refresh for that repository already went out within the cooldown. `401` when the token does not verify, `404` when the repository is not in the catalog. |
| `GET` | `/healthz` | `ok` |
| `GET` | `/quiesce` | Whether the process is safe to stop. `200` when it is, `409` when it is not. |

Results are ranked by fit (`drop-in`, then `full`, then `partial`) when `replaces` is set, then by
stars. Archived repositories are never returned.

Filters are applied before the window, so `count` answers "how many match" whatever the page size.
`limit=0` answers that count and sends no tools, which is the cheapest way to ask. An `offset` past
the end is an empty page, not an error.

## How search works

A query goes through three steps, and stops as soon as it knows which tool the person wants to
replace:

1. **Keywords.** Tool names, languages and licences that appear in the query as words.
2. **Local model.** When no tool is named, the query is embedded with
   [paraphrase-multilingual-MiniLM-L12-v2](https://huggingface.co/sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2)
   (quantised, about 135 MB, baked into the image) and compared with the description of every tool
   other entries replace. "automate my releases from commit messages" finds semantic-release this
   way, and so does "automatiser mes releases depuis les messages de commit": the model is
   multilingual, while the descriptions it reads stay in English, the way GitHub returns them.
   Without a target, results are ranked by how close each tool's description is to the query, so
   "generate a changelog from git history" returns git-cliff.
3. **Jev.** Only when the first two found no target, and only with `TYPESAFE_API_KEY` set. Jev is
   asked to pick the target tool, language and licence among values actually in the catalog, plus
   `none`, and whether a drop-in is needed. Answers below 0.6 confidence and labels outside the
   catalog are dropped, so the model can narrow a search but never invent a filter. Choices are
   capped at 255 options by the API; past that, the options sharing the most words with the query
   are kept. Answers are cached for a day per normalised query.

`interpretedBy` says `local` or `jev`. Without a Jev key the API logs a warning at startup and
runs on the first two steps. If the model cannot be loaded, it logs a warning and runs on keywords
alone. Neither stops it from serving.

The model thresholds (0.45 to pick a target, 0.05 of lead over the runner-up, 0.40 to keep a
result) were measured against the catalog on queries that name no tool, in the four languages the
site speaks. A query the catalog can answer scores at least 0.45 on the tool it means; one it
cannot, such as "what is the weather today" or "comment faire une tarte aux pommes", peaks at 0.33
and keeps no result at all. The lead is what separates a real answer from a near-tie between two
unrelated tools, which is the shape a wrong target takes here.

At startup and on every refresh the whole catalog is embedded, in batches of 16 texts. The ONNX
session pads each batch to its longest text and holds the raw output of every batch until the call
returns, so one call over the whole catalog made the startup peak grow steeply with the number of
tools. Batching flattens most of that slope, though not all of it: ONNX Runtime's arena does not
shrink between runs. The stored vectors are 384 floats, about 1.5 KB per tool, and are not
affected.

`POST /v1/search` is limited per client IP. Behind a reverse proxy, set `TRUST_PROXY=true` so the
limit applies to the address in the last `X-Forwarded-For` entry rather than to the proxy.

No browser on another origin can read a response unless `ALLOWED_ORIGINS` names its origin. The
site is served from the same origin as the API, at `/api`, so it needs no entry and the default is
to name none. Set it only when the site and the API are on different hostnames, and give it the
site's origin, not the API's. A preflight from an origin that is not listed still answers `200`,
because the answer is "here is what I would allow" with no `Access-Control-Allow-Origin` in it, and
that absence is what makes the browser throw the response away.

`TRUST_PROXY=true` alone is not enough to be believed. The header is read only when the connection
itself comes from a loopback, private or link-local address, which is where a reverse proxy sits.
A request that reaches the container from a public address keeps its own peer address as the rate
limit key, whatever it claims in `X-Forwarded-For`, so a direct caller cannot hand itself a fresh
bucket per request. If the proxy ever fronts the API from a public address, every client collapses
into one bucket and the limit will look far too strict: that is the symptom to look for.

## README and security

Both are fetched on first request and cached for 12 hours per repository; a failed fetch answers
502 and is not cached. READMEs come from GitHub's rendered HTML and go through
[ammonia](https://github.com/rust-ammonia/ammonia) before they leave the API: scripts, event
handlers and `javascript:` links are removed, relative images point at `raw.githubusercontent.com`
and relative links at the file on GitHub. Keeping READMEs out of the catalog keeps the nightly
commit and the API's hourly reload small.

A `403` or `429` from GitHub is a refusal, usually its rate limit, not an answer: it logs a warning
with the status and fails the whole fetch, so the security report answers 502 rather than "no
known advisories", and neither cache tier keeps it. Only a `404` means there is nothing to show.

The two routes share a per-client limit of `DETAILS_PER_MINUTE`, keyed the same way as search, and
answer `429` with `Retry-After` past it. A tool page costs at most two requests, so the default
leaves a person browsing plenty of room, while one client can no longer spend the GitHub token as
fast as it can send requests.

Both in-process caches are bounded by bytes rather than by entry count: a rendered README runs to hundreds of
kilobytes, so counting entries said nothing about how much memory they held. `DETAILS_CACHE_BYTES`
is the total budget, 64 MiB by default, split evenly between the two. The weight of an entry is the
key plus the strings it holds, and an entry heavier than its cache's share is served once and never
kept.

## Shared cache

With `VALKEY_URL` set, the in-process caches become the first tier and Valkey the second, shared by
every replica. A request reads memory, then Valkey, then the upstream it came from, and a value
fetched upstream is written back to both. Three things are shared: rendered READMEs, the security
report next to them, and the interpretation of a search, which is the filters, the interpreter that
read them and the relevance scores behind the ranking. The tools themselves are not: every replica
holds the catalog already, and the interpretation is what the embedding pass and Jev are spent on.

Keys are `aa:<version>:<kind>:<id>`. The version segment is the shape of what is stored, so a
release that changes it reads none of the old entries rather than misreading them. Search keys carry
the catalog revision as well, a digest of the document the catalog was loaded from, so the nightly
refresh retires every search entry it invalidates without touching a key.

| Key | TTL | |
|---|---|---|
| `aa:v1:readme:<owner>/<repo>` | `VALKEY_DETAILS_TTL_SECS`, 12 hours | The in-process cache expires on its own 12-hour constant, so raising this one keeps entries in Valkey longer than in memory, and lowering it means memory answers after Valkey has forgotten. |
| `aa:v1:security:<owner>/<repo>` | `VALKEY_DETAILS_TTL_SECS`, 12 hours | |
| `aa:v1:search:<revision>:<query>` | `VALKEY_SEARCH_TTL_SECS`, 15 minutes | Free text, so the key space is open. |

**Every key is written with an expiry, and that is not optional.** The server runs with no
`maxmemory` and `noeviction`, which the operator does not let us change: a key written without a TTL
is a key held forever, and the pod is OOMKilled rather than evicting anything. That is why search
entries, whose keys are whatever people type, expire in minutes rather than hours.

The cache fails open. Every operation is bound by `VALKEY_TIMEOUT_MS`, and an unreachable server, a
timeout, a rejected password, a certificate that does not verify or an entry that cannot be parsed
all degrade to the behaviour without it: memory, then upstream. None of it reaches the caller, and
the warning is logged at most once every five minutes so a cache that is down does not write a line
per request. A server that is unreachable at startup is one warning and the process serves without
it; it is not retried until the next restart.

`VALKEY_URL` is a `rediss://` URL carrying the password. `VALKEY_CA_CERT` points at the PEM bundle
for the CA that signs the server certificate: it is an internal CA, so the system trust store does
not have it. The chain and the hostname are both verified, and there is no option to skip either.
Without `VALKEY_URL` nothing is connected and nothing is attempted, the caches stay in-process, and
startup says so once.

## Release-triggered refresh

A tool's entry normally catches up with a new release at the nightly refresh. These two endpoints
let a maintainer have it refreshed within minutes instead, by dispatching `refresh-tools.yml` on
`awesome-alternatives/awesome-alternatives` with the slugs the repository backs, space-separated in
its `slugs` input. A monorepo can back several tools, and they all go in the same dispatch.

There are two ways in, and both end up in the same place:

- **The GitHub App.** Installed on the tool's repository, it sends a `release` webhook to
  `POST /webhooks/github` (`https://awesome-alternatives.com/api/webhooks/github`). The body is
  checked against `GITHUB_WEBHOOK_SECRET` with HMAC-SHA256, in constant time. Only `published`
  releases count.
- **A step in the maintainer's release workflow**, for those who would rather not install an app.
  The job requests an OIDC token with the audience `awesome-alternatives` and posts it to
  `POST /v1/refresh`. The token is verified against GitHub's JWKS (RS256, issuer
  `https://token.actions.githubusercontent.com`, audience `OIDC_AUDIENCE`, expiry with 30 seconds
  of leeway), and the repository comes from its `repository` claim, which GitHub signs: a workflow
  can only ask for its own repository. The keys are cached, and a token naming a key the cache does
  not have refetches them at most once a minute.

Each repository gets at most one dispatch per `REFRESH_COOLDOWN_SECS`, 10 minutes by default,
whichever path it comes through, so a batch of releases in a monorepo or both paths firing on the
same release cost one run. A dispatch that fails answers `502`, is logged, and does not start the
cooldown, so the next event tries again.

The dispatch is made by a second GitHub App, private and installed only on this repository with
`Actions: write`, so the public app never holds more than read access to anyone's repository. The
API signs an app JWT with `DISPATCH_PRIVATE_KEY`, looks up the installation on
`DISPATCH_REPOSITORY` once, and asks for an installation token scoped to that one repository and
`actions: write`, which it reuses until 5 minutes before it expires. Without `DISPATCH_APP_ID` and
`DISPATCH_PRIVATE_KEY` both endpoints answer `503`, and without `GITHUB_WEBHOOK_SECRET` the webhook
does; startup logs a warning for each.

## Rollouts

`GET /quiesce` answers `200` when the process is safe to stop and `409` when it is not, with the
same JSON body either way:

```json
{ "alive": true, "ready": true, "safe": true, "reason": "idle" }
```

`reason` is one of:

| `reason` | |
|---|---|
| `idle` | Ready, nothing in flight. The only case that answers `200`. |
| `starting` | The catalog or the semantic index is not in place yet. |
| `indexing` | A catalog refresh is rebuilding the index. |
| `requests` | Requests are still being served. |

`ready` is its own field so a readiness probe can use it without caring about in-flight work.
Running without an embedding model is a supported mode, so `ready` does not wait for an index that
will never be built.

A `preStop` hook polls it so a rollout does not cut a refresh or an in-flight search in half. The
image is distroless, so it has no shell and no `wget`; the binary polls itself instead:

```yaml
lifecycle:
  preStop:
    exec:
      command: ["/usr/local/bin/awesome-alternatives-api", "wait-quiescent"]
```

`wait-quiescent` polls `/quiesce` on loopback, at the port from `BIND`, once a second. It exits 0
as soon as the answer is `200`, or straight away if the API no longer answers at all, since there
is then nothing left to drain.

The endpoint never blocks: it reads counters and answers immediately. Kubernetes still enforces
`terminationGracePeriodSeconds` as the hard ceiling; the hook only spends what is left of it, and
the pod is killed when it runs out.

The startup embedding pass runs before the listener is bound, so nothing answers on the port until
the process is ready. That is what a `startupProbe` on `/quiesce` is for; a `readinessProbe` can
use it too, as long as it reads `ready` rather than the status code, which also goes to `409` while
requests are in flight.

## Configuration

| Variable | Default | |
|---|---|---|
| `BIND` | `0.0.0.0:3000` | |
| `CATALOG_SOURCE` | the catalog on `main`, from raw.githubusercontent.com | An `https://` URL or a file path. |
| `CATALOG_REFRESH_SECS` | `3600` | A failed refresh keeps the previous catalog. |
| `SEARCHES_PER_MINUTE` | `20` | Per client IP. |
| `DETAILS_PER_MINUTE` | `30` | Per client IP, shared by `/v1/tools/{slug}/readme` and `/v1/tools/{slug}/security`. |
| `TRUST_PROXY` | `false` | Honoured only for peers on a loopback, private or link-local address. |
| `ALLOWED_ORIGINS` | unset | Comma-separated origins a browser may read a response from. Unset means same-origin only. |
| `TYPESAFE_API_KEY` | unset | Enables Jev. |
| `TYPESAFE_MODEL` | `jev-latest` | Pin a version such as `jev-1.13.0` for stable answers. |
| `TYPESAFE_BASE_URL` | `https://api.typesafe.ai` | |
| `GITHUB_TOKEN` | unset | Raises GitHub's limit from 60 to 5,000 requests an hour for READMEs and advisories. A read-only token with no scopes is enough. |
| `GITHUB_API_URL` | `https://api.github.com` | |
| `GITHUB_WEBHOOK_SECRET` | unset | The GitHub App's webhook secret. Unset means `POST /webhooks/github` answers `503`. |
| `OIDC_AUDIENCE` | `awesome-alternatives` | The audience a `POST /v1/refresh` token must carry. |
| `OIDC_JWKS_URL` | GitHub's, `https://token.actions.githubusercontent.com/.well-known/jwks` | |
| `REFRESH_COOLDOWN_SECS` | `600` | At most one dispatch per repository in this window. |
| `DISPATCH_APP_ID` | unset | The dispatch app. Unset, or without `DISPATCH_PRIVATE_KEY`, means both refresh endpoints answer `503`. |
| `DISPATCH_PRIVATE_KEY` | unset | The dispatch app's private key, PEM. |
| `DISPATCH_REPOSITORY` | `awesome-alternatives/awesome-alternatives` | Where the refresh workflow lives. |
| `DISPATCH_WORKFLOW` | `refresh-tools.yml` | |
| `DISPATCH_REF` | `main` | |
| `SCORECARD_API_URL` | `https://api.securityscorecards.dev` | |
| `DETAILS_CACHE_BYTES` | `67108864` | 64 MiB, the total for the in-process README and security caches together. |
| `VALKEY_URL` | unset | A `rediss://` URL, password included. Unset means in-process caches only. |
| `VALKEY_CA_CERT` | unset | Path to the PEM bundle of the CA that signs the server certificate. |
| `VALKEY_TIMEOUT_MS` | `200` | Per operation. Past it the request carries on without the cache. |
| `VALKEY_DETAILS_TTL_SECS` | `43200` | 12 hours, for READMEs and security reports. |
| `VALKEY_SEARCH_TTL_SECS` | `900` | 15 minutes, for interpreted searches. |
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
