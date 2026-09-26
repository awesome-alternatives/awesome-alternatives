# API

Serves the catalog in `generated/catalog.json` over HTTP, with a natural-language search that runs
on a local embedding model and falls back to [Jev](https://typesafe.ai) for what it cannot read.
Rust and axum.

## Endpoints

| Method | Path | |
|---|---|---|
| `GET` | `/v1/tools` | Filter with `replaces`, `language`, `license`, `category`, `dropIn=true`, `terms`, `selfHost=true`, `maintained=true` and `capabilities`. Case-insensitive on language and licence. `terms` is one of `open`, `open-core`, `source-available` or `unknown` (not checked), and any other value answers `400`. `maintained` leaves out archived repositories and those with no push in a year. `capabilities` is a comma list, every one required, and when it is given `near` lists the tools that have some of them, each with what it is `missing`. `category` is one a caller passes for itself: no interpreter reads one out of a query, so `POST /v1/search` never answers with it. Paged with `limit` (50 by default, 200 at most, anything larger is clamped rather than refused) and `offset`. The answer repeats the `limit` and `offset` it used, and `count` is how many matched the filters, not how many came back. |
| `POST` | `/v1/search` | Body `{ "q": "semantic-release but in Rust" }`. Returns the filters it read, which interpreter read them, and the matching tools. Takes `limit` and `offset` in the body, with the same default and maximum as `/v1/tools`, and repeats them in the answer. Paging re-reads the query, which is cached, so a later page costs no embedding and no Jev call, but it does spend a rate-limit token. |
| `GET` | `/v1/vocabulary` | Every tool something replaces, and every language, licence and category present. Nothing in this repository calls it: it is here for anyone building against the catalog, which is CC0, and it is part of the published surface rather than an internal helper. |
| `GET` | `/v1/tools/{slug}/readme` | The repository README as HTML, sanitised, with relative links and images pointed at GitHub. `html` is `null` when there is none. |
| `GET` | `/v1/tools/{slug}/security` | The OpenSSF Scorecard (score, date, checks worst first, `null` when the project was never scored) and the repository's published GitHub security advisories. |
| `GET` | `/v1/tools/{slug}/history` | The tool's daily facts for charts, oldest day first. `days` sets the window, 365 by default, 1 to 730, anything else answers `400`. See [Tool history](#tool-history). |
| `POST` | `/mcp` | The catalog as a Model Context Protocol server, public at `https://awesome-alternatives.com/api/mcp`. See [MCP](#mcp). |
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
   are kept.

   Jev is the only step that costs money, so it has a budget of its own, shared by every client of
   the process: at most `JEV_CALLS_PER_MINUTE` calls a minute and `JEV_CALLS_PER_DAY` calls per UTC
   day. A query that would go to Jev past either limit is answered by the first two steps instead,
   with `interpretedBy: "local"`, and no request reaches Jev. That answer is cached like any other,
   so the same query stays local until its entry expires. The daily counter starts again at
   midnight UTC, and the API logs a warning when it runs out. Only real calls count: a cached
   interpretation and a query the first two steps already placed spend nothing.

`interpretedBy` says `local` or `jev`. Without a Jev key the API logs a warning at startup and
runs on the first two steps. If the model cannot be loaded, it logs a warning and runs on keywords
alone. Neither stops it from serving.

Every interpretation is cached in the process under its normalised query, for
`VALKEY_SEARCH_TTL_SECS` when Valkey is configured and 15 minutes otherwise. The cache is bounded by
bytes, `SEARCH_CACHE_BYTES`, 32 MiB by default, because queries are free text and entries vary a
lot in size: a reading without a target keeps a relevance score for every tool close enough to the
query, tens of kilobytes when that is most of the catalog, while one that names a target weighs a
few hundred bytes. An entry weighs its key, its filters and the slugs it scores. Which
interpretations are also shared between replicas is under [Shared cache](#shared-cache).

The model thresholds (0.45 to pick a target, 0.05 of lead over the runner-up, 0.40 to keep a
result) were measured against the catalog on queries that name no tool, in the four languages the
site speaks. A query the catalog can answer scores at least 0.45 on the tool it means; one it
cannot, such as "what is the weather today" or "comment faire une tarte aux pommes", peaks at 0.33
and keeps no result at all. The lead is what separates a real answer from a near-tie between two
unrelated tools, which is the shape a wrong target takes here.

At startup the whole catalog is embedded, in batches of 16 texts. The ONNX session pads each batch
to its longest text and holds the raw output of every batch until the call returns, so one call
over the whole catalog made the startup peak grow steeply with the number of tools. Batching
flattens most of that slope, though not all of it: ONNX Runtime's arena does not shrink between
runs. The stored vectors are 384 floats, about 1.5 KB per tool, and are not affected.

The catalog is fetched again every `CATALOG_REFRESH_SECS`. When its revision, the digest of the
document, is the one already loaded, nothing is rebuilt and the search cache is kept. When it
changed, the index is rebuilt from the previous one: a vector is keyed by the exact text it was
embedded from, so only the texts that are new or changed go through the model, and a text that
appears twice (a tool other entries replace is both a target and a tool) is embedded once. A
nightly refresh that only moves star counts and push dates embeds nothing. The new index is
swapped in whole, and the search cache is emptied then, since readings from the old catalog no
longer apply.

`POST /v1/search` is limited per client IP. Behind a reverse proxy, set `TRUST_PROXY=true` so the
limit applies to the address in the last `X-Forwarded-For` entry rather than to the proxy. An IPv6
client is keyed by its /64, since any host can rotate through the addresses of the prefix it is
given; an IPv4-mapped IPv6 address counts as the IPv4 address it carries. Idle keys are forgotten
every minute, so the limiter's memory follows the clients seen recently.

The process as a whole takes at most `SEARCH_CONCURRENCY` searches at once, 32 by default,
counting those made through the MCP `search` tool. One
more is not queued: it answers `503` with `Retry-After: 1` straight away. The limit is on search
only, so browsing the catalog, the README and security tabs and both refresh endpoints keep
answering while searches are turned away. Queries are embedded one at a time, and a search waits
for its turn on the model without holding a blocking thread, so a search that gives up while
waiting never runs. A rebuild takes its turn once per batch of 16 texts rather than once for the
whole pass, and turns are handed out in order, so a search that arrives mid-rebuild waits for the
batch in progress and then goes ahead of the next one.

Every route under `/v1`, `POST /mcp` and `POST /webhooks/github` answers `504` once it has run for
`REQUEST_TIMEOUT_SECS`, 15 by default. The work behind it is dropped with it, apart from an
embedding already running, which cannot be interrupted and finishes on its own, and a refresh
dispatch (see [Release-triggered refresh](#release-triggered-refresh)). Outbound calls give up
before that: 5 seconds to connect and 10 seconds in all, except the catalog download, which runs
outside any request and gets 60 seconds.

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

## MCP

`POST /mcp` serves the catalog to AI agents over the Model Context Protocol, with the
[Streamable HTTP](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports#streamable-http)
transport, through the official Rust SDK, [rmcp](https://crates.io/crates/rmcp). The site's proxy
strips `/api`, so the public URL is `https://awesome-alternatives.com/api/mcp`:

```bash
claude mcp add --transport http awesome-alternatives https://awesome-alternatives.com/api/mcp
```

It is stateless: no session ID, no server-side state, every request answered on its own with a JSON
body, so any replica answers any request and a rollout drops nothing. `initialize` still answers
for clients that start with it, a notification answers `202`, and `GET` answers `405` since there is
no stream to open. The server calls itself `awesome-alternatives`, versioned with the API.

| Tool | Arguments | |
|---|---|---|
| `find_alternatives` | `tool`, plus `language`, `license`, `terms`, `selfHost`, `maintained`, `dropIn`, `capabilities`, `limit`, `offset` | Alternatives to a tool or closed product, each with its `fit`, `note` and `migration`, ranked like `/v1/tools?replaces=`. `tool` is a slug or a name in any case. An unknown one is a tool error listing up to five `closeMatches`. |
| `get_tool` | `slug` | One tool as `/v1/tools` returns it. |
| `list_tools` | the `/v1/tools` filters, `limit`, `offset` | Read with the same `Filters` type, so the same values are refused. |
| `list_categories` | none | Every category with its description, tool count, `selfHost` and capability keys. |
| `search` | `query`, `limit`, `offset` | `POST /v1/search` without the Jev step (see below). |

Lists answer the same `count`, `limit` and `offset` as `/v1/tools`, with a summary per tool (slug,
name, category, repository, description, language, licence, terms, stars, self-hosting,
maintenance, last push, latest release tag and what it replaces) rather than the whole entry, which
`get_tool` gives. Every answer is JSON, as `structuredContent` and as text. A tool that could not
answer (an argument that does not parse, an unknown name, a spent quota) returns a result with
`isError: true` and `{ "error": "..." }`, so the agent reads why, as the protocol asks for errors a
caller can act on. Only an unknown tool name or a malformed request is a JSON-RPC error.

The filter tools have no limit of their own, like `GET /v1/tools`. `search` runs keywords and the
local model only and never asks Jev, so an agent calling it in a loop costs nothing outside the
process. A query it reads without a target is not kept in the in-process cache, so the same query
typed on the site still gets its turn at Jev; a reading already paid for is reused. It has its own
limit per client, `MCP_SEARCHES_PER_MINUTE`, keyed like `/v1/search` (IPv6 by /64, `TRUST_PROXY`
honoured the same way) and counted apart from it. Past it, the call is a tool error with
`retryAfterSeconds`, not a `429`, which an MCP client may not show to the model. It shares
`SEARCH_CONCURRENCY` with `/v1/search` (past it, a tool error with `retryAfterSeconds: 1`), and the
whole route is under `REQUEST_TIMEOUT_SECS` and counted as in flight by `/quiesce`.

A request carrying an `Origin` header is refused with `403` unless `ALLOWED_ORIGINS` lists that
origin, which is what the protocol asks of a server to keep web pages from driving it. Agents are
not browsers and send no `Origin`, so they are served. The `Host` header is not checked: that guard
is against DNS rebinding of a server listening on a developer's machine, and this one is public.
Bodies are capped at 64 KiB, `413` past it. There is no authentication: the data is public and the
tools only read it.

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

The README, security and history routes share a per-client limit of `DETAILS_PER_MINUTE`, keyed the
same way as search, and answer `429` with `Retry-After` past it. A tool page costs at most three requests, so the default
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
Tool history is cached in Valkey only, with no in-process tier: without Valkey every request reads
the database.

Not every interpretation is shared. One is written to Valkey when it names a target, or when Jev
read it. The first kind carries no relevance scores, so it stays a few hundred bytes whatever was
typed. The second can score most of the catalog, but Jev's per-minute budget caps how many are
written. What is left, a reading with no target that the keywords and the local model made on
their own, is both the heaviest entry and the cheapest to redo, one embedding, so it stays in the
process that made it and another replica embeds the query again.

Keys are `aa:<version>:<kind>:<id>`. The version segment is the shape of what is stored, so a
release that changes it reads none of the old entries rather than misreading them. Search keys carry
the catalog revision as well, a digest of the document the catalog was loaded from, so the nightly
refresh retires every search entry it invalidates without touching a key.

| Key | TTL | |
|---|---|---|
| `aa:v1:readme:<owner>/<repo>` | `VALKEY_DETAILS_TTL_SECS`, 12 hours | The in-process cache expires on its own 12-hour constant, so raising this one keeps entries in Valkey longer than in memory, and lowering it means memory answers after Valkey has forgotten. |
| `aa:v1:security:<owner>/<repo>` | `VALKEY_DETAILS_TTL_SECS`, 12 hours | |
| `aa:v1:search:<revision>:<digest>` | `VALKEY_SEARCH_TTL_SECS`, 15 minutes | The digest is the SHA-256 of the normalised query in hex, so a key is the same length whatever was typed and never holds the query itself. The key space is still open: one key per distinct query. |
| `aa:v1:history:<slug>:<days>` | `VALKEY_HISTORY_TTL_SECS`, 1 hour | Only slugs in the catalog and `days` from 1 to 730 reach it. |

**Every key is written with an expiry, and that is not optional.** The server runs with no
`maxmemory` and `noeviction`, which the operator does not let us change: a key written without a TTL
is a key held forever, and the pod is OOMKilled rather than evicting anything. That is why search
entries, one per distinct query, are kept to the small ones and the ones Jev's budget caps, and
expire after `VALKEY_SEARCH_TTL_SECS`, 15 minutes by default, in Valkey and in memory alike.

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

## Tool history

`GET /v1/tools/{slug}/history` reads the continuous aggregate `tool_facts_daily` in TimescaleDB,
which the in-cluster refresh fills every night (#176):

```json
{
  "slug": "knope",
  "points": [
    {
      "day": "2026-09-24",
      "stars": 600,
      "forks": 30,
      "openIssues": 12,
      "pushedAt": "2026-09-23T18:04:05Z",
      "release": { "tag": "v0.21.0", "publishedAt": "2026-09-20T09:00:00Z", "signed": true }
    }
  ]
}
```

`day` is the UTC day of the bucket. `openIssues` and `pushedAt` are `null` when the refresh did not
record them, and `release` is `null` until the tool has a release; inside it, `publishedAt` and
`signed` can each be `null` on their own. Days the refresh missed are absent rather than filled in.

The site calls it for charts only and builds without it, so the API never waits on the database to
start or stay healthy. The pool connects on the first request, at most 4 connections, and a request
that cannot get one within 3 seconds, or whose query fails, answers `502` and is not cached. Without
`DATABASE_URL` the route answers `503` and startup logs a warning. An unknown slug answers `404`
and a bad `days` answers `400` before the database is touched.

`DATABASE_URL` is a `postgres://` URL for a role with `SELECT` on `tool_facts_daily` and nothing
else. TLS follows its `sslmode`: `sslmode=verify-full&sslrootcert=/path/ca.crt` for the cluster's
internal CA; plain TCP inside the cluster works without it.

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

The dispatch runs in a task of its own that the request only waits on, so a request dropped on the
way (a client that hangs up, GitHub giving up on a webhook after 10 seconds, the `504` at
`REQUEST_TIMEOUT_SECS`) does not cancel it. The task finishes either way: the cooldown stays when
the dispatch went out, and is cleared when it failed, so a lost answer never holds a repository back
with nothing sent.

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
| `indexing` | A refreshed catalog changed and the index is being rebuilt. An unchanged one never gets here. |
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

A request counts as in flight until it answers, and `REQUEST_TIMEOUT_SECS` bounds that, so after a
burst `requests` goes back to `idle` within the timeout at most. Searches past `SEARCH_CONCURRENCY`
are turned away at once and barely count, and a search waiting for the model is dropped with its
request instead of running later. The one embedding already running when its request times out
still finishes, but nothing counts it, so it never holds a rollout back.

The startup embedding pass runs before the listener is bound, so nothing answers on the port until
the process is ready. That is what a `startupProbe` on `/quiesce` is for; a `readinessProbe` can
use it too, as long as it reads `ready` rather than the status code, which also goes to `409` while
requests are in flight.

## Configuration

| Variable | Default | |
|---|---|---|
| `BIND` | `0.0.0.0:3000` | |
| `CATALOG_SOURCE` | the catalog on `main`, from raw.githubusercontent.com | An `https://` URL or a file path. |
| `CATALOG_REFRESH_SECS` | `3600` | A failed refresh keeps the previous catalog, and an unchanged one keeps the index and the search cache. |
| `SEARCHES_PER_MINUTE` | `20` | Per client IP, per /64 for IPv6. |
| `MCP_SEARCHES_PER_MINUTE` | `20` | The MCP `search` tool's own limit, per client IP and per /64 for IPv6, counted apart from `SEARCHES_PER_MINUTE`. The other MCP tools have none. |
| `DETAILS_PER_MINUTE` | `30` | Per client IP (per /64 for IPv6), shared by `/v1/tools/{slug}/readme`, `/security` and `/history`. |
| `SEARCH_CONCURRENCY` | `32` | Searches served at once by the whole process, over HTTP and MCP together. Past it a search answers `503` with `Retry-After: 1` instead of waiting, or a tool error over MCP. |
| `REQUEST_TIMEOUT_SECS` | `15` | Every route under `/v1`, `/mcp` and the webhook answer `504` past it. |
| `TRUST_PROXY` | `false` | Honoured only for peers on a loopback, private or link-local address. |
| `ALLOWED_ORIGINS` | unset | Comma-separated origins a browser may read a response from. Unset means same-origin only. `/mcp` refuses any other `Origin` with `403`, the site's own included. |
| `TYPESAFE_API_KEY` | unset | Enables Jev. |
| `TYPESAFE_MODEL` | `jev-latest` | Pin a version such as `jev-1.13.0` for stable answers. |
| `TYPESAFE_BASE_URL` | `https://api.typesafe.ai` | |
| `JEV_CALLS_PER_MINUTE` | `30` | For the whole process. Past it, search answers without Jev. |
| `JEV_CALLS_PER_DAY` | `2000` | For the whole process, reset at midnight UTC. `0` turns the Jev step off. |
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
| `SEARCH_CACHE_BYTES` | `33554432` | 32 MiB, for the in-process cache of interpreted searches. |
| `VALKEY_URL` | unset | A `rediss://` URL, password included. Unset means in-process caches only. |
| `VALKEY_CA_CERT` | unset | Path to the PEM bundle of the CA that signs the server certificate. |
| `VALKEY_TIMEOUT_MS` | `200` | Per operation. Past it the request carries on without the cache. |
| `VALKEY_DETAILS_TTL_SECS` | `43200` | 12 hours, for READMEs and security reports. |
| `VALKEY_SEARCH_TTL_SECS` | `900` | 15 minutes, for interpreted searches, in Valkey and in the process. Without `VALKEY_URL` it is not read and the process keeps 15 minutes. |
| `VALKEY_HISTORY_TTL_SECS` | `3600` | 1 hour, for tool history. The data changes nightly. |
| `DATABASE_URL` | unset | The TimescaleDB holding `tool_facts_daily`. Unset means `/v1/tools/{slug}/history` answers `503`. |
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
