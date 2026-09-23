<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset=".github/assets/wordmark-dark.png">
    <img src=".github/assets/wordmark-light.png" alt="awesome-alternatives" width="560">
  </picture>
</p>

<p align="center">
  Find what replaces the tool you already use, in the language you want,<br>
  and see at a glance whether it is still alive.
</p>

<p align="center">
  <a href="#catalog"><img alt="Tools in the catalog" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fawesome-alternatives%2Fawesome-alternatives%2Fmain%2Fgenerated%2Fcatalog.json&query=%24.stats.tools&label=tools&color=b8ff3c&labelColor=0b0b0b&style=flat-square"></a>
  <a href="#catalog"><img alt="Categories" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fawesome-alternatives%2Fawesome-alternatives%2Fmain%2Fgenerated%2Fcatalog.json&query=%24.stats.categories&label=categories&color=b8ff3c&labelColor=0b0b0b&style=flat-square"></a>
  <a href="https://awesome-alternatives.com/alternatives/"><img alt="Tools with alternatives listed" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fawesome-alternatives%2Fawesome-alternatives%2Fmain%2Fgenerated%2Fcatalog.json&query=%24.stats.targets&label=tools%20with%20alternatives&color=b8ff3c&labelColor=0b0b0b&style=flat-square"></a>
  <a href="https://github.com/awesome-alternatives/awesome-alternatives/actions/workflows/refresh.yml"><img alt="Nightly refresh" src="https://github.com/awesome-alternatives/awesome-alternatives/actions/workflows/refresh.yml/badge.svg"></a>
  <a href="LICENSE-DATA"><img alt="Data: CC0 1.0" src="https://img.shields.io/badge/data-CC0%201.0-b8ff3c?labelColor=0b0b0b&style=flat-square"></a>
  <a href="LICENSE"><img alt="Code: MIT" src="https://img.shields.io/badge/code-MIT-b8ff3c?labelColor=0b0b0b&style=flat-square"></a>
</p>

<p align="center">
  <a href="https://awesome-alternatives.com">awesome-alternatives.com</a> |
  <a href="https://awesome-alternatives.com/contribute/">Add a tool</a> |
  <a href="https://awesome-alternatives.com/about/">How it works</a> |
  <a href="https://opencollective.com/ferrlabs">Sponsor</a>
</p>

The numbers above are read from [`generated/catalog.json`](generated/catalog.json) each time the
page loads, so they follow the catalog without anyone editing this file.

## Why another list

Most awesome lists are typed by hand and drift: stars from two years ago, a licence that changed, a
project archived last spring. Here an entry states only what a contributor knows better than GitHub,
which repository the tool lives in and what it replaces:

```yaml
name: Valkey
repository: https://github.com/valkey-io/valkey
category: key-value-store
replaces:
  - tool: redis
    fit: drop-in
    note: Fork of Redis 7.2.4, same protocol and commands.
```

Everything else is read from GitHub by CI every night: language, licence, stars, topics, the latest
releases and whether the newest one is signed. The schema rejects a pull request that tries to state
any of those, so a number in this list cannot be inflated or left to go stale.

## What the marks mean

- **drop-in**, **full**, **partial**: how much of the original the tool covers. `drop-in` means you
  can swap it in without changing your setup, `full` covers the same job differently, `partial`
  covers part of it.
- **signed** next to a version: the release tag, or the commit it points at, carries a signature
  GitHub verified.
- **verified** next to a name: the tool's own repository contains an `.awesome-alternatives` file
  naming this entry, so whoever controls the repository vouches for it.
- **archived** next to a name: the repository gets no more changes. It is listed only because other
  entries replace it, never as an alternative.

The site explains every warning a maintainer reviews on the [about page](https://awesome-alternatives.com/about/).

## Catalog

Each category folds open. The same data, searchable in plain words ("semantic-release, but written
in Rust"), is on [awesome-alternatives.com](https://awesome-alternatives.com).

<!-- catalog:start -->

<details>
<summary><b>Release automation</b>, 7 tools</summary>

Version bumps, changelogs, tags and published releases from commit history.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [semantic-release](https://github.com/semantic-release/semantic-release) | JavaScript | MIT | [v25.0.9](https://github.com/semantic-release/semantic-release/releases/tag/v25.0.9) signed | 24059 | none |
| [Changesets](https://github.com/changesets/changesets) | TypeScript | MIT | [@changesets/cli@3.0.3](https://github.com/changesets/changesets/releases/tag/%40changesets/cli%403.0.3) signed | 12428 | semantic-release (full) |
| [release-please](https://github.com/googleapis/release-please) | TypeScript | Apache-2.0 | [v17.11.2](https://github.com/googleapis/release-please/releases/tag/v17.11.2) signed | 7536 | semantic-release (full) |
| [release-plz](https://github.com/release-plz/release-plz) | Rust | Apache-2.0 | [release-plz-v0.3.169](https://github.com/release-plz/release-plz/releases/tag/release-plz-v0.3.169) | 1482 | semantic-release (partial) |
| [cocogitto](https://github.com/cocogitto/cocogitto) | Rust | MIT | [7.0.0](https://github.com/cocogitto/cocogitto/releases/tag/7.0.0) | 1193 | semantic-release (full) |
| [knope](https://github.com/knope-dev/knope) | Rust | MIT | [knope/v0.23.0](https://github.com/knope-dev/knope/releases/tag/knope/v0.23.0) signed | 189 | semantic-release (full) |
| [FerrFlow](https://github.com/FerrLabs/FerrFlow) verified | Rust | MIT | [v7.25.1](https://github.com/FerrLabs/FerrFlow/releases/tag/v7.25.1) signed | 3 | semantic-release (full) |

</details>

<details>
<summary><b>Changelog generation</b>, 1 tool</summary>

Changelogs built from commits or pull requests, without driving the release itself.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [git-cliff](https://github.com/orhun/git-cliff) | Rust | Apache-2.0 | [v2.14.2](https://github.com/orhun/git-cliff/releases/tag/v2.14.2) signed | 12259 | semantic-release (partial) |

</details>

<details>
<summary><b>JavaScript runtimes</b>, 3 tools</summary>

Engines that run JavaScript and TypeScript outside the browser.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Node.js](https://github.com/nodejs/node) | JavaScript | Other | [v26.10.0](https://github.com/nodejs/node/releases/tag/v26.10.0) signed | 122045 | none |
| [Deno](https://github.com/denoland/deno) | Rust | MIT | [v2.9.7](https://github.com/denoland/deno/releases/tag/v2.9.7) signed | 108479 | Node.js (full) |
| [Bun](https://github.com/oven-sh/bun) | Rust | Other | [bun-v1.4.2](https://github.com/oven-sh/bun/releases/tag/bun-v1.4.2) | 96016 | Node.js (full), npm (full) |

</details>

<details>
<summary><b>JavaScript package managers</b>, 3 tools</summary>

Install and lock npm dependencies.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [pnpm](https://github.com/pnpm/pnpm) | Rust | MIT | [v12.5.1](https://github.com/pnpm/pnpm/releases/tag/v12.5.1) signed | 36614 | npm (full) |
| [npm](https://github.com/npm/cli) | JavaScript | Other | [libnpmpublish-v11.2.1](https://github.com/npm/cli/releases/tag/libnpmpublish-v11.2.1) | 10132 | none |
| [Yarn](https://github.com/yarnpkg/berry) | TypeScript | BSD-2-Clause | [@yarnpkg/cli/4.18.0](https://github.com/yarnpkg/berry/releases/tag/%40yarnpkg/cli/4.18.0) | 8104 | npm (full) |

</details>

<details>
<summary><b>JavaScript bundlers</b>, 5 tools</summary>

Bundle, transform and serve front-end code.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Vite](https://github.com/vitejs/vite) | TypeScript | MIT | [create-vite@9.2.1](https://github.com/vitejs/vite/releases/tag/create-vite%409.2.1) signed | 82960 | webpack (full) |
| [webpack](https://github.com/webpack/webpack) | JavaScript | MIT | [v5.111.1](https://github.com/webpack/webpack/releases/tag/v5.111.1) signed | 65949 | none |
| [Parcel](https://github.com/parcel-bundler/parcel) | JavaScript | MIT | [v2.16.4](https://github.com/parcel-bundler/parcel/releases/tag/v2.16.4) | 44022 | webpack (full) |
| [esbuild](https://github.com/evanw/esbuild) | Go | MIT | [v0.28.2](https://github.com/evanw/esbuild/releases/tag/v0.28.2) | 40067 | webpack (partial) |
| [Rspack](https://github.com/web-infra-dev/rspack) | Rust | MIT | [v2.2.7](https://github.com/web-infra-dev/rspack/releases/tag/v2.2.7) | 12915 | webpack (drop-in) |

</details>

<details>
<summary><b>JavaScript linting and formatting</b>, 5 tools</summary>

Linters and formatters for JavaScript and TypeScript.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Prettier](https://github.com/prettier/prettier) | JavaScript | MIT | [3.9.9](https://github.com/prettier/prettier/releases/tag/3.9.9) | 52302 | none |
| [ESLint](https://github.com/eslint/eslint) | JavaScript | MIT | [v10.11.0](https://github.com/eslint/eslint/releases/tag/v10.11.0) | 27522 | none |
| [Biome](https://github.com/biomejs/biome) | Rust | Apache-2.0 | [@biomejs/biome@2.5.14](https://github.com/biomejs/biome/releases/tag/%40biomejs/biome%402.5.14) signed | 25844 | ESLint (partial), Prettier (full) |
| [Oxc](https://github.com/oxc-project/oxc) | Rust | MIT | [oxlint_v1.85.0](https://github.com/oxc-project/oxc/releases/tag/oxlint_v1.85.0) | 22855 | ESLint (partial) |
| [dprint](https://github.com/dprint/dprint) | Rust | MIT | [0.57.4](https://github.com/dprint/dprint/releases/tag/0.57.4) | 4079 | Prettier (full) |

</details>

<details>
<summary><b>JavaScript test runners</b>, 2 tools</summary>

Run unit and integration tests for JavaScript and TypeScript.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Jest](https://github.com/jestjs/jest) | TypeScript | MIT | [v30.5.2](https://github.com/jestjs/jest/releases/tag/v30.5.2) | 45465 | none |
| [Vitest](https://github.com/vitest-dev/vitest) | TypeScript | MIT | [v5.0.1](https://github.com/vitest-dev/vitest/releases/tag/v5.0.1) signed | 17148 | Jest (full) |

</details>

<details>
<summary><b>Python packaging</b>, 4 tools</summary>

Install dependencies, manage environments and lock Python projects.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [uv](https://github.com/astral-sh/uv) | Rust | Apache-2.0 | [0.12.18](https://github.com/astral-sh/uv/releases/tag/0.12.18) signed | 90079 | pip (full), Poetry (full) |
| [Poetry](https://github.com/python-poetry/poetry) | Python | MIT | [2.5.1](https://github.com/python-poetry/poetry/releases/tag/2.5.1) | 34306 | none |
| [pip](https://github.com/pypa/pip) | Python | MIT | [26.2.1](https://github.com/pypa/pip/releases/tag/26.2.1) signed | 10287 | none |
| [PDM](https://github.com/pdm-project/pdm) | Python | MIT | [2.29.2](https://github.com/pdm-project/pdm/releases/tag/2.29.2) | 8669 | Poetry (full) |

</details>

<details>
<summary><b>Python linting and formatting</b>, 4 tools</summary>

Linters and formatters for Python.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Ruff](https://github.com/astral-sh/ruff) | Rust | MIT | [0.16.8](https://github.com/astral-sh/ruff/releases/tag/0.16.8) signed | 49733 | Flake8 (full), Black (drop-in), Pylint (partial) |
| [Black](https://github.com/psf/black) | Python | MIT | [26.5.1](https://github.com/psf/black/releases/tag/26.5.1) signed | 41850 | none |
| [Pylint](https://github.com/pylint-dev/pylint) | Python | GPL-2.0 | [v4.0.8](https://github.com/pylint-dev/pylint/releases/tag/v4.0.8) | 5726 | none |
| [Flake8](https://github.com/PyCQA/flake8) | Python | Other | [7.4.0](https://github.com/PyCQA/flake8/releases/tag/7.4.0) signed | 3824 | none |

</details>

<details>
<summary><b>Infrastructure as code</b>, 3 tools</summary>

Declare cloud infrastructure in files and apply the difference.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Terraform](https://github.com/hashicorp/terraform) | Go | Other | [v1.16.3](https://github.com/hashicorp/terraform/releases/tag/v1.16.3) signed | 49717 | none |
| [OpenTofu](https://github.com/opentofu/opentofu) | Go | MPL-2.0 | [v1.12.6](https://github.com/opentofu/opentofu/releases/tag/v1.12.6) signed | 30265 | Terraform (drop-in) |
| [Pulumi](https://github.com/pulumi/pulumi) | Go | Apache-2.0 | [v3.263.0](https://github.com/pulumi/pulumi/releases/tag/v3.263.0) signed | 25723 | Terraform (full) |

</details>

<details>
<summary><b>Container engines</b>, 2 tools</summary>

Build and run OCI containers.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Docker Engine (Moby)](https://github.com/moby/moby) | Go | Apache-2.0 | [docker-v29.8.1](https://github.com/moby/moby/releases/tag/docker-v29.8.1) signed | 72129 | none |
| [Podman](https://github.com/podman-container-tools/podman) | Go | Apache-2.0 | [v6.1.2](https://github.com/podman-container-tools/podman/releases/tag/v6.1.2) signed | 32919 | Docker Engine (Moby) (drop-in) |

</details>

<details>
<summary><b>In-memory key-value stores</b>, 4 tools</summary>

Caches and data structure servers speaking the Redis protocol or close to it.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Redis](https://github.com/redis/redis) | C | Other | [8.10.2](https://github.com/redis/redis/releases/tag/8.10.2) | 76448 | none |
| [Dragonfly](https://github.com/dragonflydb/dragonfly) | C++ | Other | [v2.0.0](https://github.com/dragonflydb/dragonfly/releases/tag/v2.0.0) signed | 31666 | Redis (drop-in) |
| [Valkey](https://github.com/valkey-io/valkey) | C | BSD-3-Clause | [9.1.2](https://github.com/valkey-io/valkey/releases/tag/9.1.2) signed | 27279 | Redis (drop-in) |
| [KeyDB](https://github.com/Snapchat/KeyDB) | C++ | BSD-3-Clause | [v6.3.4](https://github.com/Snapchat/KeyDB/releases/tag/v6.3.4) | 12507 | Redis (drop-in) |

</details>

<details>
<summary><b>Search engines</b>, 4 tools</summary>

Full-text search servers.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Elasticsearch](https://github.com/elastic/elasticsearch) | Java | Other | [v9.5.4](https://github.com/elastic/elasticsearch/releases/tag/v9.5.4) signed | 77971 | none |
| [Meilisearch](https://github.com/meilisearch/meilisearch) | Rust | Other | [v1.54.0](https://github.com/meilisearch/meilisearch/releases/tag/v1.54.0) signed | 59377 | Elasticsearch (partial) |
| [Typesense](https://github.com/typesense/typesense) | C++ | GPL-3.0 | [v30.2](https://github.com/typesense/typesense/releases/tag/v30.2) | 26581 | Elasticsearch (partial) |
| [OpenSearch](https://github.com/opensearch-project/OpenSearch) | Java | Apache-2.0 | [3.8.0](https://github.com/opensearch-project/OpenSearch/releases/tag/3.8.0) signed | 13760 | Elasticsearch (full) |

</details>

<details>
<summary><b>Metrics and monitoring</b>, 2 tools</summary>

Collect, store and query time series.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Prometheus](https://github.com/prometheus/prometheus) | Go | Apache-2.0 | [v3.14.0](https://github.com/prometheus/prometheus/releases/tag/v3.14.0) signed | 66188 | none |
| [VictoriaMetrics](https://github.com/VictoriaMetrics/VictoriaMetrics) | Go | Apache-2.0 | [v1.152.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.152.0) | 17755 | Prometheus (full) |

</details>

<details>
<summary><b>Command-line HTTP clients</b>, 2 tools</summary>

Send HTTP requests from a terminal.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [HTTPie](https://github.com/httpie/cli) | Python | BSD-3-Clause | [3.2.4](https://github.com/httpie/cli/releases/tag/3.2.4) | 38569 | none |
| [xh](https://github.com/ducaale/xh) | Rust | MIT | [v0.26.2](https://github.com/ducaale/xh/releases/tag/v0.26.2) | 8088 | HTTPie (full) |

</details>

<details>
<summary><b>Code search</b>, 2 tools</summary>

Search file contents recursively from a terminal.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [ripgrep](https://github.com/BurntSushi/ripgrep) | Rust | Unlicense | [15.2.0](https://github.com/BurntSushi/ripgrep/releases/tag/15.2.0) signed | 68521 | The Silver Searcher (full) |
| [The Silver Searcher](https://github.com/ggreer/the_silver_searcher) | C | Apache-2.0 | [2.2.0](https://github.com/ggreer/the_silver_searcher/releases/tag/2.2.0) | 27123 | none |

</details>

<details>
<summary><b>API clients</b>, 3 tools</summary>

Build, send and share HTTP and GraphQL requests from a desktop or browser app.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Hoppscotch](https://github.com/hoppscotch/hoppscotch) | TypeScript | MIT | [2026.8.2](https://github.com/hoppscotch/hoppscotch/releases/tag/2026.8.2) signed | 80468 | Insomnia (full) |
| [Bruno](https://github.com/usebruno/bruno) | JavaScript | MIT | [v4.1.0](https://github.com/usebruno/bruno/releases/tag/v4.1.0) | 47123 | Insomnia (full) |
| [Insomnia](https://github.com/Kong/insomnia) | TypeScript | Apache-2.0 | [core@13.2.0](https://github.com/Kong/insomnia/releases/tag/core%4013.2.0) | 40030 | none |

</details>

<details>
<summary><b>Monorepo tools</b>, 4 tools</summary>

Run, cache and orchestrate tasks across the packages of one repository.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Lerna](https://github.com/lerna/lerna) | TypeScript | MIT | [v10.0.1](https://github.com/lerna/lerna/releases/tag/v10.0.1) | 36055 | none |
| [Turborepo](https://github.com/vercel/turborepo) | Rust | MIT | [v2.11.3](https://github.com/vercel/turborepo/releases/tag/v2.11.3) signed | 31129 | Lerna (partial) |
| [Nx](https://github.com/nrwl/nx) | TypeScript | MIT | [22.7.12](https://github.com/nrwl/nx/releases/tag/22.7.12) | 29366 | Lerna (full) |
| [moon](https://github.com/moonrepo/moon) | Rust | MIT | [v2.5.5](https://github.com/moonrepo/moon/releases/tag/v2.5.5) | 4112 | Lerna (partial) |

</details>

<details>
<summary><b>Shell prompts</b>, 3 tools</summary>

Customisable prompts showing git state, runtimes and context.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Starship](https://github.com/starship/starship) | Rust | ISC | [v1.26.0](https://github.com/starship/starship/releases/tag/v1.26.0) signed | 60008 | Powerlevel10k (full) |
| [Powerlevel10k](https://github.com/romkatv/powerlevel10k) | Shell | MIT | [v1.20.0](https://github.com/romkatv/powerlevel10k/releases/tag/v1.20.0) signed | 55141 | none |
| [Oh My Posh](https://github.com/JanDeDobbeleer/oh-my-posh) | Go | MIT | [v31.3.0](https://github.com/JanDeDobbeleer/oh-my-posh/releases/tag/v31.3.0) | 23491 | Powerlevel10k (full) |

</details>

<details>
<summary><b>Terminal multiplexers</b>, 2 tools</summary>

Split, detach and reattach terminal sessions.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [tmux](https://github.com/tmux/tmux) | C | ISC | [3.7c](https://github.com/tmux/tmux/releases/tag/3.7c) | 49437 | none |
| [Zellij](https://github.com/zellij-org/zellij) | Rust | MIT | [v0.45.1](https://github.com/zellij-org/zellij/releases/tag/v0.45.1) | 35513 | tmux (full) |

</details>

<details>
<summary><b>Document databases</b>, 2 tools</summary>

Databases storing JSON-like documents.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [MongoDB](https://github.com/mongodb/mongo) | C++ | Other | [show](https://github.com/mongodb/mongo/releases/tag/show) | 28580 | none |
| [FerretDB](https://github.com/FerretDB/FerretDB) | Go | Apache-2.0 | [v2.7.0](https://github.com/FerretDB/FerretDB/releases/tag/v2.7.0) signed | 11076 | MongoDB (drop-in) |

</details>

<details>
<summary><b>Event streaming</b>, 2 tools</summary>

Durable, partitioned logs for events and messages.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Apache Kafka](https://github.com/apache/kafka) | Java | Apache-2.0 | [show](https://github.com/apache/kafka/releases/tag/show) | 33790 | none |
| [Redpanda](https://github.com/redpanda-data/redpanda) | C++ | none | [v26.2.2](https://github.com/redpanda-data/redpanda/releases/tag/v26.2.2) signed | 12563 | Apache Kafka (drop-in) |

</details>

<details>
<summary><b>Web servers and reverse proxies</b>, 3 tools</summary>

Serve sites, terminate TLS and route traffic to services.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Caddy](https://github.com/caddyserver/caddy) | Go | Apache-2.0 | [v2.11.4](https://github.com/caddyserver/caddy/releases/tag/v2.11.4) signed | 76009 | nginx (full) |
| [Traefik](https://github.com/traefik/traefik) | Go | MIT | [v3.7.13](https://github.com/traefik/traefik/releases/tag/v3.7.13) signed | 64930 | nginx (partial) |
| [nginx](https://github.com/nginx/nginx) | C | BSD-2-Clause | [release-1.31.6](https://github.com/nginx/nginx/releases/tag/release-1.31.6) | 31713 | none |

</details>

<details>
<summary><b>Documentation site generators</b>, 3 tools</summary>

Turn Markdown into a searchable documentation site.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Docusaurus](https://github.com/facebook/docusaurus) | TypeScript | MIT | [v3.10.2](https://github.com/facebook/docusaurus/releases/tag/v3.10.2) | 66321 | none |
| [VitePress](https://github.com/vuejs/vitepress) | TypeScript | MIT | [v2.0.0-alpha.20](https://github.com/vuejs/vitepress/releases/tag/v2.0.0-alpha.20) | 18348 | Docusaurus (full) |
| [Starlight](https://github.com/withastro/starlight) | TypeScript | MIT | [@astrojs/starlight@0.42.3](https://github.com/withastro/starlight/releases/tag/%40astrojs/starlight%400.42.3) signed | 9286 | Docusaurus (full) |

</details>

<details>
<summary><b>Static site generators</b>, 4 tools</summary>

Build websites from templates and content files.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Hugo](https://github.com/gohugoio/hugo) | Go | Apache-2.0 | [v0.166.0](https://github.com/gohugoio/hugo/releases/tag/v0.166.0) | 89908 | Jekyll (full) |
| [Jekyll](https://github.com/jekyll/jekyll) | Ruby | MIT | [v4.4.1](https://github.com/jekyll/jekyll/releases/tag/v4.4.1) | 51680 | none |
| [Eleventy](https://github.com/11ty/buildawesome) | JavaScript | MIT | [v3.1.6](https://github.com/11ty/buildawesome/releases/tag/v3.1.6) | 19929 | Jekyll (full) |
| [Zola](https://github.com/getzola/zola) | Rust | EUPL-1.2 | [v0.23.6](https://github.com/getzola/zola/releases/tag/v0.23.6) | 17464 | Jekyll (full) |

</details>

<details>
<summary><b>Python type checkers</b>, 3 tools</summary>

Check Python type annotations before the code runs.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [mypy](https://github.com/python/mypy) | Python | Other | [v2.3.1](https://github.com/python/mypy/releases/tag/v2.3.1) | 20648 | none |
| [ty](https://github.com/astral-sh/ty) | Python | MIT | [0.0.83](https://github.com/astral-sh/ty/releases/tag/0.0.83) signed | 19733 | mypy (full) |
| [Pyright](https://github.com/microsoft/pyright) | Python | Other | [1.1.414](https://github.com/microsoft/pyright/releases/tag/1.1.414) | 15653 | mypy (full) |

</details>

<details>
<summary><b>Node.js web frameworks</b>, 3 tools</summary>

Routing and middleware for HTTP servers in JavaScript and TypeScript.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Express](https://github.com/expressjs/express) | JavaScript | MIT | [v5.2.1](https://github.com/expressjs/express/releases/tag/v5.2.1) | 69466 | none |
| [Fastify](https://github.com/fastify/fastify) | JavaScript | MIT | [v5.12.5](https://github.com/fastify/fastify/releases/tag/v5.12.5) signed | 37192 | Express (full) |
| [Hono](https://github.com/honojs/hono) | TypeScript | MIT | [v4.13.8](https://github.com/honojs/hono/releases/tag/v4.13.8) | 32304 | Express (full) |

</details>

<details>
<summary><b>TypeScript ORMs</b>, 2 tools</summary>

Typed database access and migrations for TypeScript.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Prisma ORM](https://github.com/prisma/orm) | TypeScript | Apache-2.0 | [v0.17.0](https://github.com/prisma/orm/releases/tag/v0.17.0) signed | 47662 | none |
| [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm) | TypeScript | Apache-2.0 | [drizzle-kit@0.31.11](https://github.com/drizzle-team/drizzle-orm/releases/tag/drizzle-kit%400.31.11) signed | 35864 | Prisma ORM (full) |

</details>

<details>
<summary><b>Object storage</b>, 3 tools</summary>

Self-hosted servers speaking the S3 API.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [MinIO](https://github.com/minio/minio) archived | Go | AGPL-3.0 | [RELEASE.2025-10-15T17-29-55Z](https://github.com/minio/minio/releases/tag/RELEASE.2025-10-15T17-29-55Z) | 61356 | none |
| [SeaweedFS](https://github.com/seaweedfs/seaweedfs) | Go | Apache-2.0 | [4.47](https://github.com/seaweedfs/seaweedfs/releases/tag/4.47) | 34909 | MinIO (full) |
| [RustFS](https://github.com/rustfs/rustfs) | Rust | Apache-2.0 | [1.0.0](https://github.com/rustfs/rustfs/releases/tag/1.0.0) | 33684 | MinIO (full) |

</details>

<details>
<summary><b>CI servers</b>, 3 tools</summary>

Self-hosted servers that run build and deployment pipelines.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Jenkins](https://github.com/jenkinsci/jenkins) | Java | MIT | [jenkins-2.583](https://github.com/jenkinsci/jenkins/releases/tag/jenkins-2.583) | 26579 | none |
| [Woodpecker CI](https://github.com/woodpecker-ci/woodpecker) | Go | Apache-2.0 | [v3.18.1](https://github.com/woodpecker-ci/woodpecker/releases/tag/v3.18.1) signed | 7907 | Jenkins (full) |
| [Concourse](https://github.com/concourse/concourse) | Go | Apache-2.0 | [v8.3.0](https://github.com/concourse/concourse/releases/tag/v8.3.0) signed | 7905 | Jenkins (full) |

</details>

<details>
<summary><b>Git forges</b>, 3 tools</summary>

Self-hosted repositories, code review and issues.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Gitea](https://github.com/go-gitea/gitea) | Go | MIT | [v1.27.3](https://github.com/go-gitea/gitea/releases/tag/v1.27.3) signed | 58124 | GitLab (full) |
| [GitLab](https://github.com/gitlabhq/gitlabhq) | Ruby | Other | [v42.2.0-rc42](https://github.com/gitlabhq/gitlabhq/releases/tag/v42.2.0-rc42) | 24544 | none |
| [OneDev](https://github.com/theonedev/onedev) | Java | MIT | [v16.7.3](https://github.com/theonedev/onedev/releases/tag/v16.7.3) | 15258 | GitLab (full) |

</details>

<details>
<summary><b>Password manager servers</b>, 2 tools</summary>

Self-hosted back ends for password vaults.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Vaultwarden](https://github.com/dani-garcia/vaultwarden) | Rust | AGPL-3.0 | [1.37.3](https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.3) signed | 68034 | Bitwarden server (drop-in) |
| [Bitwarden server](https://github.com/bitwarden/server) | C# | Other | [v2026.9.1](https://github.com/bitwarden/server/releases/tag/v2026.9.1) signed | 20184 | none |

</details>

<details>
<summary><b>Web analytics</b>, 3 tools</summary>

Self-hostable, privacy-friendly site analytics.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Umami](https://github.com/umami-software/umami) | TypeScript | MIT | [v3.4.0](https://github.com/umami-software/umami/releases/tag/v3.4.0) signed | 38960 | Matomo (full) |
| [Plausible Analytics](https://github.com/plausible/analytics) | Elixir | AGPL-3.0 | [v3.2.1](https://github.com/plausible/analytics/releases/tag/v3.2.1) | 29191 | Matomo (full) |
| [Matomo](https://github.com/matomo-org/matomo) | PHP | GPL-3.0 | [5.14.0](https://github.com/matomo-org/matomo/releases/tag/5.14.0) | 21893 | none |

</details>

<details>
<summary><b>Uptime monitoring</b>, 2 tools</summary>

Check that services answer, alert when they do not, and publish a status page.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Uptime Kuma](https://github.com/louislam/uptime-kuma) | JavaScript | MIT | [2.5.5](https://github.com/louislam/uptime-kuma/releases/tag/2.5.5) signed | 91706 | none |
| [Gatus](https://github.com/TwiN/gatus) | Go | Apache-2.0 | [v5.36.0](https://github.com/TwiN/gatus/releases/tag/v5.36.0) signed | 12135 | Uptime Kuma (full) |

</details>

<details>
<summary><b>Log pipelines</b>, 3 tools</summary>

Collect, transform and ship logs and events.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Vector](https://github.com/vectordotdev/vector) | Rust | MPL-2.0 | [vdev-v0.3.21](https://github.com/vectordotdev/vector/releases/tag/vdev-v0.3.21) signed | 22603 | Logstash (full) |
| [Logstash](https://github.com/elastic/logstash) | Java | Other | [v9.5.4](https://github.com/elastic/logstash/releases/tag/v9.5.4) signed | 14947 | none |
| [Fluent Bit](https://github.com/fluent/fluent-bit) | C | Apache-2.0 | [v5.1.2](https://github.com/fluent/fluent-bit/releases/tag/v5.1.2) | 8118 | Logstash (full) |

</details>

<details>
<summary><b>Team chat</b>, 3 tools</summary>

Self-hosted messaging for teams.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Rocket.Chat](https://github.com/RocketChat/Rocket.Chat) | TypeScript | Other | [8.8.1](https://github.com/RocketChat/Rocket.Chat/releases/tag/8.8.1) | 46154 | Mattermost (full) |
| [Mattermost](https://github.com/mattermost/mattermost) | TypeScript | Other | [v11.11.0](https://github.com/mattermost/mattermost/releases/tag/v11.11.0) signed | 39154 | none |
| [Zulip](https://github.com/zulip/zulip) | Python | Apache-2.0 | [12.3](https://github.com/zulip/zulip/releases/tag/12.3) | 25940 | Mattermost (full) |

</details>

<details>
<summary><b>Terminal emulators</b>, 5 tools</summary>

Desktop terminal applications.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Alacritty](https://github.com/alacritty/alacritty) | Rust | Apache-2.0 | [v0.17.0](https://github.com/alacritty/alacritty/releases/tag/v0.17.0) signed | 65791 | iTerm2 (partial) |
| [Ghostty](https://github.com/ghostty-org/ghostty) | Zig | MIT | [v1.3.1](https://github.com/ghostty-org/ghostty/releases/tag/v1.3.1) signed | 61445 | iTerm2 (full) |
| [kitty](https://github.com/kovidgoyal/kitty) | Python | GPL-3.0 | [v0.49.0](https://github.com/kovidgoyal/kitty/releases/tag/v0.49.0) signed | 35036 | iTerm2 (full) |
| [WezTerm](https://github.com/wezterm/wezterm) | Rust | Other | [20240203-110809-5046fc22](https://github.com/wezterm/wezterm/releases/tag/20240203-110809-5046fc22) signed | 28992 | iTerm2 (full) |
| [iTerm2](https://github.com/gnachman/iTerm2) | Objective-C | GPL-2.0 | [vv3.4.0beta13](https://github.com/gnachman/iTerm2/releases/tag/vv3.4.0beta13) | 18086 | none |

</details>

<details>
<summary><b>Code editors</b>, 6 tools</summary>

Editors for writing code.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Visual Studio Code](https://github.com/microsoft/vscode) | TypeScript | MIT | [1.138.0](https://github.com/microsoft/vscode/releases/tag/1.138.0) signed | 192813 | none |
| [Neovim](https://github.com/neovim/neovim) | Vim Script | Other | [v0.12.5](https://github.com/neovim/neovim/releases/tag/v0.12.5) signed | 102524 | Vim (drop-in) |
| [Zed](https://github.com/zed-industries/zed) | Rust | Other | [v1.20.2](https://github.com/zed-industries/zed/releases/tag/v1.20.2) signed | 90740 | Visual Studio Code (full) |
| [Helix](https://github.com/helix-editor/helix) | Rust | MPL-2.0 | [25.07.1](https://github.com/helix-editor/helix/releases/tag/25.07.1) signed | 46306 | Vim (partial) |
| [Vim](https://github.com/vim/vim) | Vim Script | Vim | [v9.2.1125](https://github.com/vim/vim/releases/tag/v9.2.1125) signed | 40919 | none |
| [VSCodium](https://github.com/VSCodium/vscodium) | Shell | MIT | [1.135.06055](https://github.com/VSCodium/vscodium/releases/tag/1.135.06055) signed | 33346 | Visual Studio Code (drop-in) |

</details>

<details>
<summary><b>File listing</b>, 3 tools</summary>

Replacements for ls with colours, icons and git status.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [exa](https://github.com/ogham/exa) | Rust | MIT | [v0.10.1](https://github.com/ogham/exa/releases/tag/v0.10.1) | 24442 | none |
| [eza](https://github.com/eza-community/eza) | Rust | EUPL-1.2 | [v0.23.5](https://github.com/eza-community/eza/releases/tag/v0.23.5) signed | 23346 | exa (drop-in) |
| [lsd](https://github.com/lsd-rs/lsd) | Rust | Apache-2.0 | [v1.2.0](https://github.com/lsd-rs/lsd/releases/tag/v1.2.0) signed | 16238 | exa (full) |

</details>

<details>
<summary><b>Git diff pagers</b>, 2 tools</summary>

Make git diff output readable in a terminal.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [delta](https://github.com/dandavison/delta) | Rust | MIT | [0.19.2](https://github.com/dandavison/delta/releases/tag/0.19.2) | 32306 | diff-so-fancy (full) |
| [diff-so-fancy](https://github.com/so-fancy/diff-so-fancy) | Perl | MIT | [v1.4.12](https://github.com/so-fancy/diff-so-fancy/releases/tag/v1.4.12) | 18092 | none |

</details>

<details>
<summary><b>JSON processors</b>, 3 tools</summary>

Query and transform JSON from the command line.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [jq](https://github.com/jqlang/jq) | C | Other | [jq-1.8.2](https://github.com/jqlang/jq/releases/tag/jq-1.8.2) signed | 35669 | none |
| [gojq](https://github.com/itchyny/gojq) | Go | MIT | [v0.12.19](https://github.com/itchyny/gojq/releases/tag/v0.12.19) | 3807 | jq (drop-in) |
| [jaq](https://github.com/01mf02/jaq) | Rust | MIT | [v3.1.1](https://github.com/01mf02/jaq/releases/tag/v3.1.1) | 3773 | jq (full) |

</details>

<details>
<summary><b>Load testing</b>, 3 tools</summary>

Generate traffic to measure how a service holds up.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [k6](https://github.com/grafana/k6) | Go | AGPL-3.0 | [v2.3.0](https://github.com/grafana/k6/releases/tag/v2.3.0) | 31552 | Apache JMeter (full) |
| [Locust](https://github.com/locustio/locust) | Python | MIT | [2.46.6](https://github.com/locustio/locust/releases/tag/2.46.6) signed | 28178 | Apache JMeter (full) |
| [Apache JMeter](https://github.com/apache/jmeter) | Java | Apache-2.0 | [rel/v5.6.3](https://github.com/apache/jmeter/releases/tag/rel/v5.6.3) | 9543 | none |

</details>

<details>
<summary><b>Browser automation and testing</b>, 3 tools</summary>

Drive real browsers for end-to-end tests.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Playwright](https://github.com/microsoft/playwright) | TypeScript | Apache-2.0 | [v1.63.0](https://github.com/microsoft/playwright/releases/tag/v1.63.0) signed | 96545 | Selenium (full) |
| [Cypress](https://github.com/cypress-io/cypress) | TypeScript | MIT | [v16.1.0](https://github.com/cypress-io/cypress/releases/tag/v16.1.0) | 51023 | Selenium (partial) |
| [Selenium](https://github.com/SeleniumHQ/selenium) | Java | Apache-2.0 | [selenium-4.49.0](https://github.com/SeleniumHQ/selenium/releases/tag/selenium-4.49.0) signed | 34513 | none |

</details>

<details>
<summary><b>Python web frameworks</b>, 3 tools</summary>

Build HTTP APIs and sites in Python.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [FastAPI](https://github.com/fastapi/fastapi) | Python | MIT | [0.141.1](https://github.com/fastapi/fastapi/releases/tag/0.141.1) signed | 102547 | Flask (full) |
| [Flask](https://github.com/pallets/flask) | Python | BSD-3-Clause | [3.1.3](https://github.com/pallets/flask/releases/tag/3.1.3) signed | 74767 | none |
| [Litestar](https://github.com/litestar-org/litestar) | Python | MIT | [v2.24.0](https://github.com/litestar-org/litestar/releases/tag/v2.24.0) | 8477 | Flask (full) |

</details>

<details>
<summary><b>Python HTTP clients</b>, 2 tools</summary>

Send HTTP requests from Python.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Requests](https://github.com/psf/requests) | Python | Apache-2.0 | [v2.34.2](https://github.com/psf/requests/releases/tag/v2.34.2) signed | 54333 | none |
| [HTTPX](https://github.com/encode/httpx) | Python | BSD-3-Clause | [0.28.1](https://github.com/encode/httpx/releases/tag/0.28.1) signed | 15503 | Requests (full) |

</details>

<details>
<summary><b>JavaScript date libraries</b>, 4 tools</summary>

Parse, format and compute dates in JavaScript.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Day.js](https://github.com/iamkun/dayjs) | JavaScript | MIT | [v1.11.23](https://github.com/iamkun/dayjs/releases/tag/v1.11.23) | 48666 | Moment.js (drop-in) |
| [Moment.js](https://github.com/moment/moment) | JavaScript | MIT | [2.31.0](https://github.com/moment/moment/releases/tag/2.31.0) signed | 47907 | none |
| [date-fns](https://github.com/date-fns/date-fns) | TypeScript | none | [v4.4.0](https://github.com/date-fns/date-fns/releases/tag/v4.4.0) signed | 36645 | Moment.js (full) |
| [Luxon](https://github.com/moment/luxon) | JavaScript | MIT | [3.7.2](https://github.com/moment/luxon/releases/tag/3.7.2) | 16462 | Moment.js (full) |

</details>

<details>
<summary><b>Local Kubernetes</b>, 3 tools</summary>

Run a Kubernetes cluster on a laptop or in CI.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [minikube](https://github.com/kubernetes/minikube) | Go | Apache-2.0 | [v1.39.0](https://github.com/kubernetes/minikube/releases/tag/v1.39.0) | 32150 | none |
| [kind](https://github.com/kubernetes-sigs/kind) | Go | Apache-2.0 | [v0.33.0](https://github.com/kubernetes-sigs/kind/releases/tag/v0.33.0) signed | 15502 | minikube (full) |
| [k3d](https://github.com/k3d-io/k3d) | Go | MIT | [v5.9.0](https://github.com/k3d-io/k3d/releases/tag/v5.9.0) | 6563 | minikube (full) |

</details>

<details>
<summary><b>Secrets managers</b>, 3 tools</summary>

Store, rotate and hand out secrets to applications.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [HashiCorp Vault](https://github.com/hashicorp/vault) | Go | Other | [v2.1.1](https://github.com/hashicorp/vault/releases/tag/v2.1.1) signed | 36293 | none |
| [Infisical](https://github.com/Infisical/infisical) | TypeScript | Other | [v0.165.15](https://github.com/Infisical/infisical/releases/tag/v0.165.15) signed | 29383 | HashiCorp Vault (partial) |
| [OpenBao](https://github.com/openbao/openbao) | Go | MPL-2.0 | [v2.6.2](https://github.com/openbao/openbao/releases/tag/v2.6.2) signed | 7461 | HashiCorp Vault (drop-in) |

</details>

<details>
<summary><b>Git LFS servers</b>, 4 tools</summary>

Serve Git LFS objects for repositories hosted anywhere.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [lfs-test-server](https://github.com/git-lfs/lfs-test-server) | Go | MIT | [v0.4.0](https://github.com/git-lfs/lfs-test-server/releases/tag/v0.4.0) | 792 | none |
| [Rudolfs](https://github.com/jasonwhite/rudolfs) | Rust | MIT | [0.3.8](https://github.com/jasonwhite/rudolfs/releases/tag/0.3.8) | 522 | lfs-test-server (full) |
| [Giftless](https://github.com/datopian/giftless) | Python | MIT | [v0.6.2](https://github.com/datopian/giftless/releases/tag/v0.6.2) signed | 181 | lfs-test-server (full) |
| [LFSX](https://github.com/FerrLabs/LFSX) verified | Rust | MPL-2.0 | [v1.17.1](https://github.com/FerrLabs/LFSX/releases/tag/v1.17.1) | 1 | lfs-test-server (full) |

</details>

<details>
<summary><b>Minecraft servers</b>, 8 tools</summary>

Server software for Minecraft: Java Edition, from forks of the Bukkit line to implementations written from scratch.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Paper](https://github.com/PaperMC/Paper) | Java | Other | [26.2](https://github.com/PaperMC/Paper/releases/tag/26.2) | 12676 | none |
| [Pumpkin](https://github.com/Pumpkin-MC/Pumpkin) | Rust | GPL-3.0 | [0.2.0+26.3-26.51](https://github.com/Pumpkin-MC/Pumpkin/releases/tag/0.2.0%2B26.3-26.51) | 11328 | Paper (partial) |
| [Cuberite](https://github.com/cuberite/cuberite) | C++ | Other | [1.7EOL](https://github.com/cuberite/cuberite/releases/tag/1.7EOL) | 5447 | Paper (partial) |
| [Folia](https://github.com/PaperMC/Folia) | Shell | GPL-3.0 | none | 4371 | Paper (partial) |
| [Minestom](https://github.com/Minestom/Minestom) | Java | Apache-2.0 | [2026.09.12-26.2](https://github.com/Minestom/Minestom/releases/tag/2026.09.12-26.2) signed | 3283 | Paper (partial) |
| [Purpur](https://github.com/PurpurMC/Purpur) | Java | MIT | [1.20.6](https://github.com/PurpurMC/Purpur/releases/tag/1.20.6) signed | 2415 | Paper (drop-in) |
| [Glowstone](https://github.com/GlowstoneMC/Glowstone) | Java | Other | [2021.8.0](https://github.com/GlowstoneMC/Glowstone/releases/tag/2021.8.0) signed | 2007 | Paper (partial) |
| [SteelMC](https://github.com/Steel-Foundation/SteelMC) | Rust | AGPL-3.0 | [v0.15.3+mc26.2](https://github.com/Steel-Foundation/SteelMC/releases/tag/v0.15.3%2Bmc26.2) signed | 696 | Paper (partial) |

</details>

<details>
<summary><b>File sync and share</b>, 2 tools</summary>

Self-hosted storage for files you reach from more than one machine, over WebDAV or a sync client.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Nextcloud](https://github.com/nextcloud/server) | PHP | AGPL-3.0 | [v35.0.0](https://github.com/nextcloud/server/releases/tag/v35.0.0) | 36892 | none |
| [RoxyCloud](https://github.com/FerrLabs/RoxyCloud) verified | Rust | AGPL-3.0 | [v0.28.0](https://github.com/FerrLabs/RoxyCloud/releases/tag/v0.28.0) | 0 | Nextcloud (partial) |

</details>

<!-- catalog:end -->

## Add a tool

1. Create `data/tools/<slug>.yaml` with a name, the repository, a category and what it replaces.
2. Open a pull request. CI checks the entry against GitHub and writes what it found to the run
   summary.
3. A maintainer reads the warnings, if any, and merges. The next nightly refresh fills in the facts.

The rules, the fit levels and how to verify a tool you maintain are in
[CONTRIBUTING.md](CONTRIBUTING.md). Prefer not to write YAML? Open a
[suggestion](https://github.com/awesome-alternatives/awesome-alternatives/issues/new/choose) instead.

## What is in this repository

| Path | What it holds |
|---|---|
| [`data/`](data) | The entries, one YAML file per tool, and the categories. The only files written by hand. |
| [`schema/`](schema) | The JSON Schema every entry is validated against, and the one the generated catalog is checked against. |
| [`scripts/`](scripts) | The verifier run on pull requests and the nightly refresh that writes the catalog and this README. |
| [`generated/`](generated) | `catalog.json`, the enriched catalog the site and the API read. |
| [`site/`](site) | The website, Astro with Preact islands, prerendered from the catalog. |
| [`api/`](api) | The Rust API behind search, with a local embedding model and Jev as a fallback. |

The site and the API are versioned by [FerrFlow](https://ferrflow.com) and released as container
images on GHCR. The nightly refresh counts as a patch release of the site, so new facts ship the same
night.

## Sponsor

The catalog is free and carries no ads. The nightly refresh, the search API and the site run on a
server someone pays for, so if this saved you an afternoon of comparing tools there are two ways to
help: [Open Collective](https://opencollective.com/ferrlabs), where the money lands on the FerrLabs
collective and the books are public, or [GitHub Sponsors](https://github.com/sponsors/BryanFRD) to
sponsor the maintainer directly.

## Licence

The catalog data is dedicated to the public domain under [CC0 1.0](LICENSE-DATA): copy it, mirror it,
build on it, no attribution needed. The scripts, the site and the API are [MIT](LICENSE).
Security issues: see [SECURITY.md](SECURITY.md).
