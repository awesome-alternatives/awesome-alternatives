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
<summary><b>Release automation</b>, 8 tools</summary>

Version bumps, changelogs, tags and published releases from commit history.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [semantic-release](https://github.com/semantic-release/semantic-release) | JavaScript | MIT | [v25.0.9](https://github.com/semantic-release/semantic-release/releases/tag/v25.0.9) signed | 24069 | none |
| [Changesets](https://github.com/changesets/changesets) | TypeScript | MIT | [@changesets/cli@3.0.3](https://github.com/changesets/changesets/releases/tag/%40changesets/cli%403.0.3) signed | 12433 | semantic-release (full), Lerna (partial) |
| [release-please](https://github.com/googleapis/release-please) | TypeScript | Apache-2.0 | [v17.11.2](https://github.com/googleapis/release-please/releases/tag/v17.11.2) signed | 7547 | semantic-release (full) |
| [cargo-release](https://github.com/crate-ci/cargo-release) | Rust | Apache-2.0 | [v1.1.6](https://github.com/crate-ci/cargo-release/releases/tag/v1.1.6) | 1589 | none |
| [release-plz](https://github.com/release-plz/release-plz) | Rust | Apache-2.0 | [release-plz-v0.3.169](https://github.com/release-plz/release-plz/releases/tag/release-plz-v0.3.169) | 1483 | semantic-release (partial), cargo-release (full) |
| [cocogitto](https://github.com/cocogitto/cocogitto) | Rust | MIT | [7.0.0](https://github.com/cocogitto/cocogitto/releases/tag/7.0.0) | 1194 | semantic-release (full), conventional-changelog (partial) |
| [knope](https://github.com/knope-dev/knope) | Rust | MIT | [knope/v0.23.0](https://github.com/knope-dev/knope/releases/tag/knope/v0.23.0) signed | 191 | semantic-release (full), Changesets (full) |
| [FerrFlow](https://github.com/FerrLabs/FerrFlow) verified | Rust | MIT | [v7.26.3](https://github.com/FerrLabs/FerrFlow/releases/tag/v7.26.3) signed | 4 | semantic-release (full), release-please (full), Changesets (full), release-plz (full), knope (full), cocogitto (full), git-cliff (partial), Lerna (partial), conventional-changelog (partial), cargo-release (full) |

</details>

<details>
<summary><b>Changelog generation</b>, 2 tools</summary>

Changelogs built from commits or pull requests, without driving the release itself.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [git-cliff](https://github.com/orhun/git-cliff) | Rust | Apache-2.0 | [v2.14.2](https://github.com/orhun/git-cliff/releases/tag/v2.14.2) signed | 12266 | semantic-release (partial), conventional-changelog (full) |
| [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) | TypeScript | ISC | [template-v1.4.0](https://github.com/conventional-changelog/conventional-changelog/releases/tag/template-v1.4.0) signed | 8511 | none |

</details>

<details>
<summary><b>JavaScript runtimes</b>, 4 tools</summary>

Engines that run JavaScript and TypeScript outside the browser.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Node.js](https://github.com/nodejs/node) | JavaScript | Other | [v26.10.0](https://github.com/nodejs/node/releases/tag/v26.10.0) signed | 122058 | none |
| [Deno](https://github.com/denoland/deno) | Rust | MIT | [v2.9.7](https://github.com/denoland/deno/releases/tag/v2.9.7) signed | 108495 | Node.js (full), ts-node (full) |
| [Bun](https://github.com/oven-sh/bun) | Rust | Other | [bun-v1.4.2](https://github.com/oven-sh/bun/releases/tag/bun-v1.4.2) | 96027 | Node.js (full), npm (full), ts-node (full), Jest (partial) |
| [ts-node](https://github.com/TypeStrong/ts-node) | TypeScript | MIT | [v10.9.2](https://github.com/TypeStrong/ts-node/releases/tag/v10.9.2) | 13120 | none |

</details>

<details>
<summary><b>JavaScript package managers</b>, 3 tools</summary>

Install and lock npm dependencies.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [pnpm](https://github.com/pnpm/pnpm) | Rust | MIT | [v12.6.0](https://github.com/pnpm/pnpm/releases/tag/v12.6.0) signed | 36628 | npm (full) |
| [npm](https://github.com/npm/cli) | JavaScript | Other | [libnpmpublish-v11.2.1](https://github.com/npm/cli/releases/tag/libnpmpublish-v11.2.1) | 10143 | none |
| [Yarn](https://github.com/yarnpkg/berry) | TypeScript | BSD-2-Clause | [@yarnpkg/cli/4.18.0](https://github.com/yarnpkg/berry/releases/tag/%40yarnpkg/cli/4.18.0) | 8106 | npm (full) |

</details>

<details>
<summary><b>JavaScript bundlers</b>, 8 tools</summary>

Bundle, transform and serve front-end code.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Create React App](https://github.com/react/create-react-app) | JavaScript | MIT | [v5.0.1](https://github.com/react/create-react-app/releases/tag/v5.0.1) signed | 103253 | none |
| [Vite](https://github.com/vitejs/vite) | TypeScript | MIT | [v8.3.1](https://github.com/vitejs/vite/releases/tag/v8.3.1) signed | 82973 | webpack (full), Create React App (full) |
| [webpack](https://github.com/webpack/webpack) | JavaScript | MIT | [v5.111.1](https://github.com/webpack/webpack/releases/tag/v5.111.1) signed | 65946 | none |
| [Parcel](https://github.com/parcel-bundler/parcel) | JavaScript | MIT | [v2.16.4](https://github.com/parcel-bundler/parcel/releases/tag/v2.16.4) | 44024 | webpack (full), Create React App (partial) |
| [esbuild](https://github.com/evanw/esbuild) | Go | MIT | [v0.28.2](https://github.com/evanw/esbuild/releases/tag/v0.28.2) | 40069 | webpack (partial) |
| [Rollup](https://github.com/rollup/rollup) | JavaScript | Other | [v4.63.5](https://github.com/rollup/rollup/releases/tag/v4.63.5) | 26310 | none |
| [Rolldown](https://github.com/rolldown/rolldown) | Rust | MIT | [v1.2.10](https://github.com/rolldown/rolldown/releases/tag/v1.2.10) signed | 13958 | Rollup (full) |
| [Rspack](https://github.com/web-infra-dev/rspack) | Rust | MIT | [v2.2.7](https://github.com/web-infra-dev/rspack/releases/tag/v2.2.7) | 12916 | webpack (drop-in) |

</details>

<details>
<summary><b>JavaScript linting and formatting</b>, 5 tools</summary>

Linters and formatters for JavaScript and TypeScript.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Prettier](https://github.com/prettier/prettier) | JavaScript | MIT | [3.9.9](https://github.com/prettier/prettier/releases/tag/3.9.9) | 52300 | none |
| [ESLint](https://github.com/eslint/eslint) | JavaScript | MIT | [v10.11.0](https://github.com/eslint/eslint/releases/tag/v10.11.0) | 27515 | none |
| [Biome](https://github.com/biomejs/biome) | Rust | Apache-2.0 | [@biomejs/biome@2.5.14](https://github.com/biomejs/biome/releases/tag/%40biomejs/biome%402.5.14) signed | 25852 | ESLint (partial), Prettier (full) |
| [Oxc](https://github.com/oxc-project/oxc) | Rust | MIT | [oxlint_v1.85.0](https://github.com/oxc-project/oxc/releases/tag/oxlint_v1.85.0) | 22872 | ESLint (partial) |
| [dprint](https://github.com/dprint/dprint) | Rust | MIT | [0.57.4](https://github.com/dprint/dprint/releases/tag/0.57.4) | 4079 | Prettier (full) |

</details>

<details>
<summary><b>JavaScript test runners</b>, 3 tools</summary>

Run unit and integration tests for JavaScript and TypeScript.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Jest](https://github.com/jestjs/jest) | TypeScript | MIT | [v30.5.2](https://github.com/jestjs/jest/releases/tag/v30.5.2) | 45468 | none |
| [Mocha](https://github.com/mochajs/mocha) | JavaScript | MIT | [v12.0.2](https://github.com/mochajs/mocha/releases/tag/v12.0.2) signed | 22898 | none |
| [Vitest](https://github.com/vitest-dev/vitest) | TypeScript | MIT | [v5.0.1](https://github.com/vitest-dev/vitest/releases/tag/v5.0.1) signed | 17153 | Jest (full), Mocha (full) |

</details>

<details>
<summary><b>Python packaging</b>, 7 tools</summary>

Install dependencies, manage environments and lock Python projects.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [uv](https://github.com/astral-sh/uv) | Rust | Apache-2.0 | [0.12.18](https://github.com/astral-sh/uv/releases/tag/0.12.18) signed | 90131 | pip (full), Poetry (full), Pipenv (full), pyenv (full), pip-tools (full) |
| [pyenv](https://github.com/pyenv/pyenv) | Shell | MIT | [v2.8.6](https://github.com/pyenv/pyenv/releases/tag/v2.8.6) | 45110 | none |
| [Poetry](https://github.com/python-poetry/poetry) | Python | MIT | [2.5.1](https://github.com/python-poetry/poetry/releases/tag/2.5.1) | 34303 | Pipenv (full) |
| [Pipenv](https://github.com/pypa/pipenv) | Python | MIT | [v2026.8.0](https://github.com/pypa/pipenv/releases/tag/v2026.8.0) | 25028 | none |
| [pip](https://github.com/pypa/pip) | Python | MIT | [26.2.1](https://github.com/pypa/pip/releases/tag/26.2.1) signed | 10288 | none |
| [PDM](https://github.com/pdm-project/pdm) | Python | MIT | [2.29.2](https://github.com/pdm-project/pdm/releases/tag/2.29.2) | 8670 | Poetry (full), Pipenv (full) |
| [pip-tools](https://github.com/jazzband/pip-tools) | Python | BSD-3-Clause | [v7.6.1](https://github.com/jazzband/pip-tools/releases/tag/v7.6.1) | 8004 | none |

</details>

<details>
<summary><b>Python linting and formatting</b>, 4 tools</summary>

Linters and formatters for Python.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Ruff](https://github.com/astral-sh/ruff) | Rust | MIT | [0.16.8](https://github.com/astral-sh/ruff/releases/tag/0.16.8) signed | 49765 | Flake8 (full), Black (drop-in), Pylint (partial) |
| [Black](https://github.com/psf/black) | Python | MIT | [26.5.1](https://github.com/psf/black/releases/tag/26.5.1) signed | 41850 | none |
| [Pylint](https://github.com/pylint-dev/pylint) | Python | GPL-2.0 | [v4.0.9](https://github.com/pylint-dev/pylint/releases/tag/v4.0.9) | 5726 | none |
| [Flake8](https://github.com/PyCQA/flake8) | Python | Other | [7.4.1](https://github.com/PyCQA/flake8/releases/tag/7.4.1) signed | 3824 | none |

</details>

<details>
<summary><b>Infrastructure as code</b>, 3 tools</summary>

Declare cloud infrastructure in files and apply the difference.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Terraform](https://github.com/hashicorp/terraform) | Go | Other | [v1.16.4](https://github.com/hashicorp/terraform/releases/tag/v1.16.4) signed | 49718 | none |
| [OpenTofu](https://github.com/opentofu/opentofu) | Go | MPL-2.0 | [v1.12.6](https://github.com/opentofu/opentofu/releases/tag/v1.12.6) signed | 30276 | Terraform (drop-in), AWS CloudFormation (full) |
| [Pulumi](https://github.com/pulumi/pulumi) | Go | Apache-2.0 | [v3.264.0](https://github.com/pulumi/pulumi/releases/tag/v3.264.0) signed | 25727 | Terraform (full), AWS CloudFormation (full) |

</details>

<details>
<summary><b>Container engines</b>, 3 tools</summary>

Build and run OCI containers.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Docker Engine (Moby)](https://github.com/moby/moby) | Go | Apache-2.0 | [docker-v29.8.1](https://github.com/moby/moby/releases/tag/docker-v29.8.1) signed | 72134 | none |
| [Podman](https://github.com/podman-container-tools/podman) | Go | Apache-2.0 | [v6.1.2](https://github.com/podman-container-tools/podman/releases/tag/v6.1.2) signed | 32921 | Docker Engine (Moby) (drop-in) |
| [nerdctl](https://github.com/containerd/nerdctl) | Go | Apache-2.0 | [v2.4.0](https://github.com/containerd/nerdctl/releases/tag/v2.4.0) signed | 10389 | Docker Engine (Moby) (full) |

</details>

<details>
<summary><b>In-memory key-value stores</b>, 5 tools</summary>

Caches and data structure servers speaking the Redis protocol or close to it.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Redis](https://github.com/redis/redis) | C | Other | [8.10.2](https://github.com/redis/redis/releases/tag/8.10.2) | 76462 | none |
| [Dragonfly](https://github.com/dragonflydb/dragonfly) | C++ | Other | [v2.0.0](https://github.com/dragonflydb/dragonfly/releases/tag/v2.0.0) signed | 31673 | Redis (drop-in), Memcached (full) |
| [Valkey](https://github.com/valkey-io/valkey) | C | BSD-3-Clause | [9.1.2](https://github.com/valkey-io/valkey/releases/tag/9.1.2) signed | 27282 | Redis (drop-in), Memcached (partial) |
| [Memcached](https://github.com/memcached/memcached) | C | BSD-3-Clause | [flash-with-wbuf-stack](https://github.com/memcached/memcached/releases/tag/flash-with-wbuf-stack) | 14288 | none |
| [KeyDB](https://github.com/Snapchat/KeyDB) | C++ | BSD-3-Clause | [v6.3.4](https://github.com/Snapchat/KeyDB/releases/tag/v6.3.4) | 12506 | Redis (drop-in) |

</details>

<details>
<summary><b>Search engines</b>, 4 tools</summary>

Full-text search servers.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Elasticsearch](https://github.com/elastic/elasticsearch) | Java | Other | [v9.5.4](https://github.com/elastic/elasticsearch/releases/tag/v9.5.4) signed | 77977 | none |
| [Meilisearch](https://github.com/meilisearch/meilisearch) | Rust | Other | [v1.54.0](https://github.com/meilisearch/meilisearch/releases/tag/v1.54.0) signed | 59398 | Elasticsearch (partial), Algolia (full) |
| [Typesense](https://github.com/typesense/typesense) | C++ | GPL-3.0 | [v30.2](https://github.com/typesense/typesense/releases/tag/v30.2) | 26589 | Elasticsearch (partial), Algolia (full) |
| [OpenSearch](https://github.com/opensearch-project/OpenSearch) | Java | Apache-2.0 | [3.8.0](https://github.com/opensearch-project/OpenSearch/releases/tag/3.8.0) signed | 13770 | Elasticsearch (full) |

</details>

<details>
<summary><b>Metrics and monitoring</b>, 2 tools</summary>

Collect, store and query time series.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Prometheus](https://github.com/prometheus/prometheus) | Go | Apache-2.0 | [v3.14.0](https://github.com/prometheus/prometheus/releases/tag/v3.14.0) signed | 66206 | Datadog (partial) |
| [VictoriaMetrics](https://github.com/VictoriaMetrics/VictoriaMetrics) | Go | Apache-2.0 | [v1.152.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.152.0) | 17765 | Prometheus (full), InfluxDB (partial), Datadog (partial) |

</details>

<details>
<summary><b>Command-line HTTP clients</b>, 3 tools</summary>

Send HTTP requests from a terminal.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [curl](https://github.com/curl/curl) | C | Other | [curl-8_22_0](https://github.com/curl/curl/releases/tag/curl-8_22_0) signed | 42913 | none |
| [HTTPie](https://github.com/httpie/cli) | Python | BSD-3-Clause | [3.2.4](https://github.com/httpie/cli/releases/tag/3.2.4) | 38576 | none |
| [xh](https://github.com/ducaale/xh) | Rust | MIT | [v0.26.2](https://github.com/ducaale/xh/releases/tag/v0.26.2) | 8093 | HTTPie (full), curl (partial) |

</details>

<details>
<summary><b>Code search</b>, 4 tools</summary>

Search file contents recursively from a terminal.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [ripgrep](https://github.com/BurntSushi/ripgrep) | Rust | Unlicense | [15.2.0](https://github.com/BurntSushi/ripgrep/releases/tag/15.2.0) signed | 68568 | The Silver Searcher (full), ack (full) |
| [The Silver Searcher](https://github.com/ggreer/the_silver_searcher) | C | Apache-2.0 | [2.2.0](https://github.com/ggreer/the_silver_searcher/releases/tag/2.2.0) | 27125 | none |
| [ugrep](https://github.com/Genivia/ugrep) | C++ | BSD-3-Clause | [v7.8.5](https://github.com/Genivia/ugrep/releases/tag/v7.8.5) | 3302 | The Silver Searcher (full), ack (full) |
| [ack](https://github.com/beyondgrep/ack3) | Perl | Other | [v3.10.0](https://github.com/beyondgrep/ack3/releases/tag/v3.10.0) | 828 | none |

</details>

<details>
<summary><b>API clients</b>, 3 tools</summary>

Build, send and share HTTP and GraphQL requests from a desktop or browser app.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Hoppscotch](https://github.com/hoppscotch/hoppscotch) | TypeScript | MIT | [2026.8.2](https://github.com/hoppscotch/hoppscotch/releases/tag/2026.8.2) signed | 80497 | Insomnia (full), Postman (full) |
| [Bruno](https://github.com/usebruno/bruno) | JavaScript | MIT | [v4.2.0](https://github.com/usebruno/bruno/releases/tag/v4.2.0) signed | 47164 | Insomnia (full), Postman (full) |
| [Insomnia](https://github.com/Kong/insomnia) | TypeScript | Apache-2.0 | [core@13.3.0](https://github.com/Kong/insomnia/releases/tag/core%4013.3.0) | 40031 | none |

</details>

<details>
<summary><b>Monorepo tools</b>, 4 tools</summary>

Run, cache and orchestrate tasks across the packages of one repository.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Lerna](https://github.com/lerna/lerna) | TypeScript | MIT | [v10.0.1](https://github.com/lerna/lerna/releases/tag/v10.0.1) | 36055 | none |
| [Turborepo](https://github.com/vercel/turborepo) | Rust | MIT | [v2.11.3](https://github.com/vercel/turborepo/releases/tag/v2.11.3) signed | 31132 | Lerna (partial) |
| [Nx](https://github.com/nrwl/nx) | TypeScript | MIT | [22.7.12](https://github.com/nrwl/nx/releases/tag/22.7.12) | 29370 | Lerna (full) |
| [moon](https://github.com/moonrepo/moon) | Rust | MIT | [v2.5.5](https://github.com/moonrepo/moon/releases/tag/v2.5.5) | 4114 | Lerna (partial) |

</details>

<details>
<summary><b>Shell prompts</b>, 4 tools</summary>

Customisable prompts showing git state, runtimes and context.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh) | Shell | MIT | none | 189899 | none |
| [Starship](https://github.com/starship/starship) | Rust | ISC | [v1.26.0](https://github.com/starship/starship/releases/tag/v1.26.0) signed | 60033 | Powerlevel10k (full), Oh My Zsh (partial) |
| [Powerlevel10k](https://github.com/romkatv/powerlevel10k) | Shell | MIT | [v1.20.0](https://github.com/romkatv/powerlevel10k/releases/tag/v1.20.0) signed | 55146 | none |
| [Oh My Posh](https://github.com/JanDeDobbeleer/oh-my-posh) | Go | MIT | [v31.3.0](https://github.com/JanDeDobbeleer/oh-my-posh/releases/tag/v31.3.0) | 23505 | Powerlevel10k (full), Oh My Zsh (partial) |

</details>

<details>
<summary><b>Terminal multiplexers</b>, 2 tools</summary>

Split, detach and reattach terminal sessions.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [tmux](https://github.com/tmux/tmux) | C | ISC | [3.7c](https://github.com/tmux/tmux/releases/tag/3.7c) | 49467 | none |
| [Zellij](https://github.com/zellij-org/zellij) | Rust | MIT | [v0.45.1](https://github.com/zellij-org/zellij/releases/tag/v0.45.1) | 35522 | tmux (full) |

</details>

<details>
<summary><b>Document databases</b>, 2 tools</summary>

Databases storing JSON-like documents.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [MongoDB](https://github.com/mongodb/mongo) | C++ | Other | [show](https://github.com/mongodb/mongo/releases/tag/show) | 28576 | none |
| [FerretDB](https://github.com/FerretDB/FerretDB) | Go | Apache-2.0 | [v2.7.0](https://github.com/FerretDB/FerretDB/releases/tag/v2.7.0) signed | 11079 | MongoDB (drop-in) |

</details>

<details>
<summary><b>Event streaming</b>, 3 tools</summary>

Durable, partitioned logs for events and messages.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Apache Kafka](https://github.com/apache/kafka) | Java | Apache-2.0 | [show](https://github.com/apache/kafka/releases/tag/show) | 33816 | none |
| [Apache Pulsar](https://github.com/apache/pulsar) | Java | Apache-2.0 | [v4.2.4](https://github.com/apache/pulsar/releases/tag/v4.2.4) signed | 15338 | Apache Kafka (full) |
| [Redpanda](https://github.com/redpanda-data/redpanda) | C++ | none | [v26.2.2](https://github.com/redpanda-data/redpanda/releases/tag/v26.2.2) signed | 12571 | Apache Kafka (drop-in) |

</details>

<details>
<summary><b>Web servers and reverse proxies</b>, 4 tools</summary>

Serve sites, terminate TLS and route traffic to services.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Caddy](https://github.com/caddyserver/caddy) | Go | Apache-2.0 | [v2.11.4](https://github.com/caddyserver/caddy/releases/tag/v2.11.4) signed | 76050 | nginx (full) |
| [Traefik](https://github.com/traefik/traefik) | Go | MIT | [v3.7.13](https://github.com/traefik/traefik/releases/tag/v3.7.13) signed | 64949 | nginx (partial), ingress-nginx (full) |
| [nginx](https://github.com/nginx/nginx) | C | BSD-2-Clause | [release-1.31.6](https://github.com/nginx/nginx/releases/tag/release-1.31.6) | 31721 | none |
| [ingress-nginx](https://github.com/kubernetes/ingress-nginx) archived | Go | Apache-2.0 | [controller-v1.15.1](https://github.com/kubernetes/ingress-nginx/releases/tag/controller-v1.15.1) signed | 19468 | none |

</details>

<details>
<summary><b>Documentation site generators</b>, 4 tools</summary>

Turn Markdown into a searchable documentation site.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Docusaurus](https://github.com/facebook/docusaurus) | TypeScript | MIT | [v3.10.2](https://github.com/facebook/docusaurus/releases/tag/v3.10.2) | 66332 | GitBook (full) |
| [Material for MkDocs](https://github.com/squidfunk/mkdocs-material) | Python | MIT | [9.7.7](https://github.com/squidfunk/mkdocs-material/releases/tag/9.7.7) signed | 27500 | GitBook (full), Docusaurus (full) |
| [VitePress](https://github.com/vuejs/vitepress) | TypeScript | MIT | [v2.0.0-alpha.20](https://github.com/vuejs/vitepress/releases/tag/v2.0.0-alpha.20) | 18346 | Docusaurus (full), GitBook (full) |
| [Starlight](https://github.com/withastro/starlight) | TypeScript | MIT | [@astrojs/starlight@0.42.3](https://github.com/withastro/starlight/releases/tag/%40astrojs/starlight%400.42.3) signed | 9293 | Docusaurus (full), GitBook (full) |

</details>

<details>
<summary><b>Static site generators</b>, 7 tools</summary>

Build websites from templates and content files.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Hugo](https://github.com/gohugoio/hugo) | Go | Apache-2.0 | [v0.166.0](https://github.com/gohugoio/hugo/releases/tag/v0.166.0) | 89926 | Jekyll (full), Hexo (full) |
| [Astro](https://github.com/withastro/astro) | TypeScript | Other | [astro@7.3.5](https://github.com/withastro/astro/releases/tag/astro%407.3.5) signed | 62785 | Gatsby (full), Jekyll (full), Hexo (full) |
| [Gatsby](https://github.com/gatsbyjs/gatsby) | JavaScript | MIT | [gatsby@5.16.1](https://github.com/gatsbyjs/gatsby/releases/tag/gatsby%405.16.1) | 55943 | none |
| [Jekyll](https://github.com/jekyll/jekyll) | Ruby | MIT | [v4.4.1](https://github.com/jekyll/jekyll/releases/tag/v4.4.1) | 51686 | none |
| [Hexo](https://github.com/hexojs/hexo) | TypeScript | MIT | [v8.1.2](https://github.com/hexojs/hexo/releases/tag/v8.1.2) | 41778 | none |
| [Eleventy](https://github.com/11ty/buildawesome) | JavaScript | MIT | [v3.1.6](https://github.com/11ty/buildawesome/releases/tag/v3.1.6) | 19931 | Jekyll (full), Hexo (full) |
| [Zola](https://github.com/getzola/zola) | Rust | EUPL-1.2 | [v0.23.6](https://github.com/getzola/zola/releases/tag/v0.23.6) | 17465 | Jekyll (full), Hexo (full) |

</details>

<details>
<summary><b>Python type checkers</b>, 3 tools</summary>

Check Python type annotations before the code runs.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [mypy](https://github.com/python/mypy) | Python | Other | [v2.3.1](https://github.com/python/mypy/releases/tag/v2.3.1) | 20648 | none |
| [ty](https://github.com/astral-sh/ty) | Python | MIT | [0.0.84](https://github.com/astral-sh/ty/releases/tag/0.0.84) signed | 19740 | mypy (full) |
| [Pyright](https://github.com/microsoft/pyright) | Python | Other | [1.1.414](https://github.com/microsoft/pyright/releases/tag/1.1.414) | 15656 | mypy (full) |

</details>

<details>
<summary><b>Node.js web frameworks</b>, 5 tools</summary>

Routing and middleware for HTTP servers in JavaScript and TypeScript.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Express](https://github.com/expressjs/express) | JavaScript | MIT | [v5.2.1](https://github.com/expressjs/express/releases/tag/v5.2.1) | 69467 | none |
| [Fastify](https://github.com/fastify/fastify) | JavaScript | MIT | [v5.12.5](https://github.com/fastify/fastify/releases/tag/v5.12.5) signed | 37189 | Express (full), Koa (full) |
| [Koa](https://github.com/koajs/koa) | JavaScript | MIT | [v3.2.1](https://github.com/koajs/koa/releases/tag/v3.2.1) signed | 35683 | none |
| [Hono](https://github.com/honojs/hono) | TypeScript | MIT | [v4.13.9](https://github.com/honojs/hono/releases/tag/v4.13.9) | 32323 | Express (full), Koa (full) |
| [Elysia](https://github.com/elysiajs/elysia) | TypeScript | MIT | [1.4.30](https://github.com/elysiajs/elysia/releases/tag/1.4.30) signed | 19177 | Express (full) |

</details>

<details>
<summary><b>TypeScript ORMs</b>, 6 tools</summary>

Typed database access and migrations for TypeScript.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Prisma ORM](https://github.com/prisma/orm) | TypeScript | Apache-2.0 | [v0.17.0](https://github.com/prisma/orm/releases/tag/v0.17.0) signed | 47667 | TypeORM (full), Sequelize (full) |
| [TypeORM](https://github.com/typeorm/typeorm) | TypeScript | MIT | [1.1.1](https://github.com/typeorm/typeorm/releases/tag/1.1.1) signed | 36658 | none |
| [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm) | TypeScript | Apache-2.0 | [drizzle-kit@0.31.11](https://github.com/drizzle-team/drizzle-orm/releases/tag/drizzle-kit%400.31.11) signed | 35886 | Prisma ORM (full), TypeORM (full), Sequelize (full) |
| [Sequelize](https://github.com/sequelize/sequelize) | TypeScript | MIT | [v6.37.8](https://github.com/sequelize/sequelize/releases/tag/v6.37.8) | 30362 | none |
| [Kysely](https://github.com/kysely-org/kysely) | TypeScript | MIT | [v0.29.6](https://github.com/kysely-org/kysely/releases/tag/v0.29.6) | 14242 | TypeORM (partial), Sequelize (partial), Prisma ORM (partial) |
| [MikroORM](https://github.com/mikro-orm/mikro-orm) | TypeScript | MIT | [v7.2.1](https://github.com/mikro-orm/mikro-orm/releases/tag/v7.2.1) | 9236 | TypeORM (full), Sequelize (full) |

</details>

<details>
<summary><b>Object storage</b>, 3 tools</summary>

Self-hosted servers speaking the S3 API.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [MinIO](https://github.com/minio/minio) archived | Go | AGPL-3.0 | [RELEASE.2025-10-15T17-29-55Z](https://github.com/minio/minio/releases/tag/RELEASE.2025-10-15T17-29-55Z) | 61354 | none |
| [SeaweedFS](https://github.com/seaweedfs/seaweedfs) | Go | Apache-2.0 | [4.47](https://github.com/seaweedfs/seaweedfs/releases/tag/4.47) | 34943 | MinIO (full), Amazon S3 (full) |
| [RustFS](https://github.com/rustfs/rustfs) | Rust | Apache-2.0 | [1.0.0](https://github.com/rustfs/rustfs/releases/tag/1.0.0) | 33772 | MinIO (full), Amazon S3 (full) |

</details>

<details>
<summary><b>CI servers</b>, 4 tools</summary>

Self-hosted servers that run build and deployment pipelines.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Jenkins](https://github.com/jenkinsci/jenkins) | Java | MIT | [jenkins-2.583](https://github.com/jenkinsci/jenkins/releases/tag/jenkins-2.583) | 26582 | none |
| [Tekton](https://github.com/tektoncd/pipeline) | Go | Apache-2.0 | [v1.16.0](https://github.com/tektoncd/pipeline/releases/tag/v1.16.0) | 9068 | Jenkins (partial) |
| [Concourse](https://github.com/concourse/concourse) | Go | Apache-2.0 | [v8.3.0](https://github.com/concourse/concourse/releases/tag/v8.3.0) signed | 7907 | Jenkins (full), CircleCI (full) |
| [Woodpecker CI](https://github.com/woodpecker-ci/woodpecker) | Go | Apache-2.0 | [v3.18.1](https://github.com/woodpecker-ci/woodpecker/releases/tag/v3.18.1) signed | 7907 | Jenkins (full), CircleCI (full) |

</details>

<details>
<summary><b>Git forges</b>, 3 tools</summary>

Self-hosted repositories, code review and issues.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Gitea](https://github.com/go-gitea/gitea) | Go | MIT | [v1.27.3](https://github.com/go-gitea/gitea/releases/tag/v1.27.3) signed | 58149 | GitLab (full), GitHub (full), Jenkins (partial), Bitbucket (full) |
| [GitLab](https://github.com/gitlabhq/gitlabhq) | Ruby | Other | [v42.2.0-rc42](https://github.com/gitlabhq/gitlabhq/releases/tag/v42.2.0-rc42) | 24547 | GitHub (full), Jenkins (partial), Bitbucket (full) |
| [OneDev](https://github.com/theonedev/onedev) | Java | MIT | [v16.7.3](https://github.com/theonedev/onedev/releases/tag/v16.7.3) | 15260 | GitLab (full), GitHub (full), Jenkins (partial), Bitbucket (full) |

</details>

<details>
<summary><b>Password manager servers</b>, 3 tools</summary>

Self-hosted back ends for password vaults.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Vaultwarden](https://github.com/dani-garcia/vaultwarden) | Rust | AGPL-3.0 | [1.37.3](https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.3) signed | 68100 | Bitwarden server (drop-in), 1Password (full), LastPass (full) |
| [Bitwarden server](https://github.com/bitwarden/server) | C# | Other | [v2026.9.1](https://github.com/bitwarden/server/releases/tag/v2026.9.1) signed | 20195 | 1Password (full), LastPass (full) |
| [Passbolt](https://github.com/passbolt/passbolt_api) | PHP | AGPL-3.0 | [v5.16.0](https://github.com/passbolt/passbolt_api/releases/tag/v5.16.0) signed | 6137 | 1Password (full), LastPass (full) |

</details>

<details>
<summary><b>Web analytics</b>, 3 tools</summary>

Self-hostable, privacy-friendly site analytics.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Umami](https://github.com/umami-software/umami) | TypeScript | MIT | [v3.4.0](https://github.com/umami-software/umami/releases/tag/v3.4.0) signed | 38985 | Matomo (full), Google Analytics (partial) |
| [Plausible Analytics](https://github.com/plausible/analytics) | Elixir | AGPL-3.0 | [v3.2.1](https://github.com/plausible/analytics/releases/tag/v3.2.1) | 29203 | Matomo (full), Google Analytics (partial) |
| [Matomo](https://github.com/matomo-org/matomo) | PHP | GPL-3.0 | [5.14.0](https://github.com/matomo-org/matomo/releases/tag/5.14.0) | 21895 | Google Analytics (full) |

</details>

<details>
<summary><b>Uptime monitoring</b>, 2 tools</summary>

Check that services answer, alert when they do not, and publish a status page.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Uptime Kuma](https://github.com/louislam/uptime-kuma) | JavaScript | MIT | [2.5.5](https://github.com/louislam/uptime-kuma/releases/tag/2.5.5) signed | 91775 | Pingdom (full), Statuspage (full) |
| [Gatus](https://github.com/TwiN/gatus) | Go | Apache-2.0 | [v5.37.0](https://github.com/TwiN/gatus/releases/tag/v5.37.0) signed | 12151 | Uptime Kuma (full), Pingdom (full), Statuspage (full) |

</details>

<details>
<summary><b>Log pipelines</b>, 5 tools</summary>

Collect, transform and ship logs and events.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Vector](https://github.com/vectordotdev/vector) | Rust | MPL-2.0 | [vdev-v0.3.22](https://github.com/vectordotdev/vector/releases/tag/vdev-v0.3.22) signed | 22607 | Logstash (full), Fluentd (full) |
| [Logstash](https://github.com/elastic/logstash) | Java | Other | [v9.5.4](https://github.com/elastic/logstash/releases/tag/v9.5.4) signed | 14951 | none |
| [Fluentd](https://github.com/fluent/fluentd) | Ruby | Apache-2.0 | [v1.19.3](https://github.com/fluent/fluentd/releases/tag/v1.19.3) | 13591 | none |
| [Fluent Bit](https://github.com/fluent/fluent-bit) | C | Apache-2.0 | [v5.1.2](https://github.com/fluent/fluent-bit/releases/tag/v5.1.2) | 8122 | Logstash (full), Fluentd (full) |
| [OpenTelemetry Collector](https://github.com/open-telemetry/opentelemetry-collector) | Go | Apache-2.0 | [v0.161.0](https://github.com/open-telemetry/opentelemetry-collector/releases/tag/v0.161.0) signed | 7594 | Logstash (partial), Fluentd (partial) |

</details>

<details>
<summary><b>Team chat</b>, 3 tools</summary>

Self-hosted messaging for teams.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Rocket.Chat](https://github.com/RocketChat/Rocket.Chat) | TypeScript | Other | [8.8.1](https://github.com/RocketChat/Rocket.Chat/releases/tag/8.8.1) | 46165 | Mattermost (full), Slack (full), Microsoft Teams (partial) |
| [Mattermost](https://github.com/mattermost/mattermost) | TypeScript | Other | [v11.11.1](https://github.com/mattermost/mattermost/releases/tag/v11.11.1) signed | 39166 | Slack (full), Microsoft Teams (partial) |
| [Zulip](https://github.com/zulip/zulip) | Python | Apache-2.0 | [12.3](https://github.com/zulip/zulip/releases/tag/12.3) | 25945 | Mattermost (full), Slack (full) |

</details>

<details>
<summary><b>Terminal emulators</b>, 5 tools</summary>

Desktop terminal applications.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Alacritty](https://github.com/alacritty/alacritty) | Rust | Apache-2.0 | [v0.17.0](https://github.com/alacritty/alacritty/releases/tag/v0.17.0) signed | 65807 | iTerm2 (partial), Warp (partial) |
| [Ghostty](https://github.com/ghostty-org/ghostty) | Zig | MIT | [v1.3.1](https://github.com/ghostty-org/ghostty/releases/tag/v1.3.1) signed | 61501 | iTerm2 (full), Warp (partial) |
| [kitty](https://github.com/kovidgoyal/kitty) | Python | GPL-3.0 | [v0.49.1](https://github.com/kovidgoyal/kitty/releases/tag/v0.49.1) signed | 35053 | iTerm2 (full), Warp (partial) |
| [WezTerm](https://github.com/wezterm/wezterm) | Rust | Other | [20240203-110809-5046fc22](https://github.com/wezterm/wezterm/releases/tag/20240203-110809-5046fc22) signed | 29012 | iTerm2 (full), Warp (partial), tmux (partial) |
| [iTerm2](https://github.com/gnachman/iTerm2) | Objective-C | GPL-2.0 | [vv3.4.0beta13](https://github.com/gnachman/iTerm2/releases/tag/vv3.4.0beta13) | 18094 | none |

</details>

<details>
<summary><b>Code editors</b>, 6 tools</summary>

Editors for writing code.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Visual Studio Code](https://github.com/microsoft/vscode) | TypeScript | MIT | [1.139.0](https://github.com/microsoft/vscode/releases/tag/1.139.0) signed | 192852 | none |
| [Neovim](https://github.com/neovim/neovim) | Vim Script | Other | [v0.12.5](https://github.com/neovim/neovim/releases/tag/v0.12.5) signed | 102552 | Vim (drop-in) |
| [Zed](https://github.com/zed-industries/zed) | Rust | Other | [v1.21.0](https://github.com/zed-industries/zed/releases/tag/v1.21.0) signed | 90817 | Visual Studio Code (full), Cursor (partial), Sublime Text (full) |
| [Helix](https://github.com/helix-editor/helix) | Rust | MPL-2.0 | [25.07.1](https://github.com/helix-editor/helix/releases/tag/25.07.1) signed | 46318 | Vim (partial), Neovim (partial) |
| [Vim](https://github.com/vim/vim) | Vim Script | Vim | [v9.2.1125](https://github.com/vim/vim/releases/tag/v9.2.1125) signed | 40929 | none |
| [VSCodium](https://github.com/VSCodium/vscodium) | Shell | MIT | [1.135.06055](https://github.com/VSCodium/vscodium/releases/tag/1.135.06055) signed | 33360 | Visual Studio Code (drop-in) |

</details>

<details>
<summary><b>File listing</b>, 3 tools</summary>

Replacements for ls with colours, icons and git status.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [exa](https://github.com/ogham/exa) | Rust | MIT | [v0.10.1](https://github.com/ogham/exa/releases/tag/v0.10.1) | 24443 | none |
| [eza](https://github.com/eza-community/eza) | Rust | EUPL-1.2 | [v0.23.5](https://github.com/eza-community/eza/releases/tag/v0.23.5) signed | 23360 | exa (drop-in) |
| [lsd](https://github.com/lsd-rs/lsd) | Rust | Apache-2.0 | [v1.2.0](https://github.com/lsd-rs/lsd/releases/tag/v1.2.0) signed | 16238 | exa (full) |

</details>

<details>
<summary><b>Git diff pagers</b>, 3 tools</summary>

Make git diff output readable in a terminal.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [delta](https://github.com/dandavison/delta) | Rust | MIT | [0.19.2](https://github.com/dandavison/delta/releases/tag/0.19.2) | 32322 | diff-so-fancy (full) |
| [Difftastic](https://github.com/Wilfred/difftastic) | Rust | MIT | [0.71.0](https://github.com/Wilfred/difftastic/releases/tag/0.71.0) | 25927 | diff-so-fancy (partial) |
| [diff-so-fancy](https://github.com/so-fancy/diff-so-fancy) | Perl | MIT | [v1.4.12](https://github.com/so-fancy/diff-so-fancy/releases/tag/v1.4.12) | 18094 | none |

</details>

<details>
<summary><b>JSON processors</b>, 3 tools</summary>

Query and transform JSON from the command line.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [jq](https://github.com/jqlang/jq) | C | Other | [jq-1.8.2](https://github.com/jqlang/jq/releases/tag/jq-1.8.2) signed | 35679 | none |
| [gojq](https://github.com/itchyny/gojq) | Go | MIT | [v0.12.19](https://github.com/itchyny/gojq/releases/tag/v0.12.19) | 3807 | jq (drop-in) |
| [jaq](https://github.com/01mf02/jaq) | Rust | MIT | [v3.1.1](https://github.com/01mf02/jaq/releases/tag/v3.1.1) | 3774 | jq (full) |

</details>

<details>
<summary><b>Load testing</b>, 4 tools</summary>

Generate traffic to measure how a service holds up.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [k6](https://github.com/grafana/k6) | Go | AGPL-3.0 | [v2.3.0](https://github.com/grafana/k6/releases/tag/v2.3.0) | 31563 | Apache JMeter (full), Gatling (full) |
| [Locust](https://github.com/locustio/locust) | Python | MIT | [2.46.6](https://github.com/locustio/locust/releases/tag/2.46.6) signed | 28180 | Apache JMeter (full), Gatling (full) |
| [Apache JMeter](https://github.com/apache/jmeter) | Java | Apache-2.0 | [rel/v5.6.3](https://github.com/apache/jmeter/releases/tag/rel/v5.6.3) | 9542 | none |
| [Gatling](https://github.com/gatling/gatling) | Scala | Apache-2.0 | [v3.15.1](https://github.com/gatling/gatling/releases/tag/v3.15.1) | 6958 | none |

</details>

<details>
<summary><b>Browser automation and testing</b>, 4 tools</summary>

Drive real browsers for end-to-end tests.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Playwright](https://github.com/microsoft/playwright) | TypeScript | Apache-2.0 | [v1.63.0](https://github.com/microsoft/playwright/releases/tag/v1.63.0) signed | 96623 | Selenium (full), Puppeteer (full), Cypress (full) |
| [Puppeteer](https://github.com/puppeteer/puppeteer) | TypeScript | Apache-2.0 | [browsers-v3.2.3](https://github.com/puppeteer/puppeteer/releases/tag/browsers-v3.2.3) signed | 95620 | none |
| [Cypress](https://github.com/cypress-io/cypress) | TypeScript | MIT | [v16.1.0](https://github.com/cypress-io/cypress/releases/tag/v16.1.0) | 51027 | Selenium (partial) |
| [Selenium](https://github.com/SeleniumHQ/selenium) | Java | Apache-2.0 | [selenium-4.49.0](https://github.com/SeleniumHQ/selenium/releases/tag/selenium-4.49.0) signed | 34515 | none |

</details>

<details>
<summary><b>Python web frameworks</b>, 4 tools</summary>

Build HTTP APIs and sites in Python.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [FastAPI](https://github.com/fastapi/fastapi) | Python | MIT | [0.141.1](https://github.com/fastapi/fastapi/releases/tag/0.141.1) signed | 102575 | Flask (full), Django REST framework (partial) |
| [Flask](https://github.com/pallets/flask) | Python | BSD-3-Clause | [3.1.3](https://github.com/pallets/flask/releases/tag/3.1.3) signed | 74769 | none |
| [Django REST framework](https://github.com/encode/django-rest-framework) | Python | Other | [3.18.1](https://github.com/encode/django-rest-framework/releases/tag/3.18.1) signed | 30191 | none |
| [Litestar](https://github.com/litestar-org/litestar) | Python | MIT | [v2.24.0](https://github.com/litestar-org/litestar/releases/tag/v2.24.0) | 8477 | Flask (full), Django REST framework (partial) |

</details>

<details>
<summary><b>Python HTTP clients</b>, 3 tools</summary>

Send HTTP requests from Python.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Requests](https://github.com/psf/requests) | Python | Apache-2.0 | [v2.34.2](https://github.com/psf/requests/releases/tag/v2.34.2) signed | 54341 | none |
| [aiohttp](https://github.com/aio-libs/aiohttp) | Python | Apache-2.0 | [v3.14.3](https://github.com/aio-libs/aiohttp/releases/tag/v3.14.3) | 16560 | none |
| [HTTPX](https://github.com/encode/httpx) | Python | BSD-3-Clause | [0.28.1](https://github.com/encode/httpx/releases/tag/0.28.1) signed | 15506 | Requests (full), aiohttp (partial) |

</details>

<details>
<summary><b>JavaScript date libraries</b>, 4 tools</summary>

Parse, format and compute dates in JavaScript.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Day.js](https://github.com/iamkun/dayjs) | JavaScript | MIT | [v1.11.23](https://github.com/iamkun/dayjs/releases/tag/v1.11.23) | 48666 | Moment.js (drop-in) |
| [Moment.js](https://github.com/moment/moment) | JavaScript | MIT | [2.31.0](https://github.com/moment/moment/releases/tag/2.31.0) signed | 47909 | none |
| [date-fns](https://github.com/date-fns/date-fns) | TypeScript | none | [v4.4.0](https://github.com/date-fns/date-fns/releases/tag/v4.4.0) signed | 36646 | Moment.js (full) |
| [Luxon](https://github.com/moment/luxon) | JavaScript | MIT | [3.7.2](https://github.com/moment/luxon/releases/tag/3.7.2) | 16461 | Moment.js (full) |

</details>

<details>
<summary><b>Local Kubernetes</b>, 3 tools</summary>

Run a Kubernetes cluster on a laptop or in CI.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [minikube](https://github.com/kubernetes/minikube) | Go | Apache-2.0 | [v1.39.0](https://github.com/kubernetes/minikube/releases/tag/v1.39.0) | 32152 | none |
| [kind](https://github.com/kubernetes-sigs/kind) | Go | Apache-2.0 | [v0.33.0](https://github.com/kubernetes-sigs/kind/releases/tag/v0.33.0) signed | 15505 | minikube (full) |
| [k3d](https://github.com/k3d-io/k3d) | Go | MIT | [v5.9.0](https://github.com/k3d-io/k3d/releases/tag/v5.9.0) | 6565 | minikube (full) |

</details>

<details>
<summary><b>Secrets managers</b>, 3 tools</summary>

Store, rotate and hand out secrets to applications.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [HashiCorp Vault](https://github.com/hashicorp/vault) | Go | Other | [v2.1.1](https://github.com/hashicorp/vault/releases/tag/v2.1.1) signed | 36287 | none |
| [Infisical](https://github.com/Infisical/infisical) | TypeScript | Other | [v0.165.16](https://github.com/Infisical/infisical/releases/tag/v0.165.16) signed | 29408 | HashiCorp Vault (partial), Doppler (full) |
| [OpenBao](https://github.com/openbao/openbao) | Go | MPL-2.0 | [v2.7.0](https://github.com/openbao/openbao/releases/tag/v2.7.0) signed | 7479 | HashiCorp Vault (drop-in) |

</details>

<details>
<summary><b>Git LFS servers</b>, 4 tools</summary>

Serve Git LFS objects for repositories hosted anywhere.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [lfs-test-server](https://github.com/git-lfs/lfs-test-server) | Go | MIT | [v0.4.0](https://github.com/git-lfs/lfs-test-server/releases/tag/v0.4.0) | 792 | none |
| [Rudolfs](https://github.com/jasonwhite/rudolfs) | Rust | MIT | [0.3.8](https://github.com/jasonwhite/rudolfs/releases/tag/0.3.8) | 522 | lfs-test-server (full) |
| [Giftless](https://github.com/datopian/giftless) | Python | MIT | [v0.6.2](https://github.com/datopian/giftless/releases/tag/v0.6.2) signed | 181 | lfs-test-server (full) |
| [LFSX](https://github.com/FerrLabs/LFSX) verified | Rust | MPL-2.0 | [site@2026.9.18](https://github.com/FerrLabs/LFSX/releases/tag/site%402026.9.18) signed | 1 | lfs-test-server (full) |

</details>

<details>
<summary><b>Minecraft servers</b>, 8 tools</summary>

Server software for Minecraft: Java Edition, from forks of the Bukkit line to implementations written from scratch.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Paper](https://github.com/PaperMC/Paper) | Java | Other | [26.2](https://github.com/PaperMC/Paper/releases/tag/26.2) | 12678 | none |
| [Pumpkin](https://github.com/Pumpkin-MC/Pumpkin) | Rust | GPL-3.0 | [0.2.0+26.3-26.51](https://github.com/Pumpkin-MC/Pumpkin/releases/tag/0.2.0%2B26.3-26.51) | 11333 | Paper (partial) |
| [Cuberite](https://github.com/cuberite/cuberite) | C++ | Other | [1.7EOL](https://github.com/cuberite/cuberite/releases/tag/1.7EOL) | 5447 | Paper (partial) |
| [Folia](https://github.com/PaperMC/Folia) | Shell | GPL-3.0 | none | 4372 | Paper (partial) |
| [Minestom](https://github.com/Minestom/Minestom) | Java | Apache-2.0 | [2026.09.12-26.2](https://github.com/Minestom/Minestom/releases/tag/2026.09.12-26.2) signed | 3283 | Paper (partial) |
| [Purpur](https://github.com/PurpurMC/Purpur) | Java | MIT | [1.20.6](https://github.com/PurpurMC/Purpur/releases/tag/1.20.6) signed | 2414 | Paper (drop-in) |
| [Glowstone](https://github.com/GlowstoneMC/Glowstone) | Java | Other | [2021.8.0](https://github.com/GlowstoneMC/Glowstone/releases/tag/2021.8.0) signed | 2007 | Paper (partial) |
| [SteelMC](https://github.com/Steel-Foundation/SteelMC) | Rust | AGPL-3.0 | [v0.15.3+mc26.2](https://github.com/Steel-Foundation/SteelMC/releases/tag/v0.15.3%2Bmc26.2) signed | 697 | Paper (partial) |

</details>

<details>
<summary><b>File sync and share</b>, 4 tools</summary>

Self-hosted storage for files you reach from more than one machine, over WebDAV or a sync client.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Syncthing](https://github.com/syncthing/syncthing) | Go | MPL-2.0 | [v2.1.5](https://github.com/syncthing/syncthing/releases/tag/v2.1.5) | 88897 | Dropbox (partial), Google Drive (partial) |
| [Nextcloud](https://github.com/nextcloud/server) | PHP | AGPL-3.0 | [v35.0.1](https://github.com/nextcloud/server/releases/tag/v35.0.1) | 36901 | Dropbox (full), Google Drive (full) |
| [Seafile](https://github.com/haiwen/seafile) | C | Other | [v9.0.5](https://github.com/haiwen/seafile/releases/tag/v9.0.5) | 15274 | Dropbox (full), Nextcloud (partial) |
| [RoxyCloud](https://github.com/FerrLabs/RoxyCloud) verified | Rust | AGPL-3.0 | [v0.29.0](https://github.com/FerrLabs/RoxyCloud/releases/tag/v0.29.0) | 0 | Nextcloud (partial) |

</details>

<details>
<summary><b>AI coding agents</b>, 8 tools</summary>

Agents that read a codebase, edit files and run commands from a prompt, in the terminal or the editor.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [OpenCode](https://github.com/anomalyco/opencode) | TypeScript | MIT | [v1.18.32](https://github.com/anomalyco/opencode/releases/tag/v1.18.32) | 209808 | Claude Code (full), GitHub Copilot (partial), Cursor (partial) |
| [Codex CLI](https://github.com/openai/codex) | Rust | Apache-2.0 | [rust-v0.156.1](https://github.com/openai/codex/releases/tag/rust-v0.156.1) | 126305 | Claude Code (full), GitHub Copilot (partial) |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) | TypeScript | Apache-2.0 | [v0.61.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.61.0) | 107146 | Claude Code (full), GitHub Copilot (partial) |
| [OpenHands](https://github.com/OpenHands/OpenHands) | TypeScript | MIT | [v1.23.0](https://github.com/OpenHands/OpenHands/releases/tag/v1.23.0) signed | 89061 | Claude Code (full), GitHub Copilot (partial) |
| [Cline](https://github.com/cline/cline) | TypeScript | Apache-2.0 | [desktop-v0.0.35](https://github.com/cline/cline/releases/tag/desktop-v0.0.35) | 69215 | Claude Code (partial), GitHub Copilot (partial), Cursor (partial) |
| [goose](https://github.com/aaif-goose/goose) | Rust | Apache-2.0 | [v1.52.0](https://github.com/aaif-goose/goose/releases/tag/v1.52.0) | 54613 | Claude Code (full), GitHub Copilot (partial) |
| [Aider](https://github.com/Aider-AI/aider) | Python | Apache-2.0 | [v0.86.0](https://github.com/Aider-AI/aider/releases/tag/v0.86.0) | 49150 | Claude Code (partial), GitHub Copilot (partial) |
| [Crush](https://github.com/charmbracelet/crush) | Go | Other | [v0.96.1](https://github.com/charmbracelet/crush/releases/tag/v0.96.1) signed | 28282 | Claude Code (full), GitHub Copilot (partial) |

</details>

<details>
<summary><b>AI code assistants</b>, 2 tools</summary>

Completions and chat inside the editor, backed by a hosted or a local model.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Continue](https://github.com/continuedev/continue) | TypeScript | Apache-2.0 | [v2.0.0-vscode](https://github.com/continuedev/continue/releases/tag/v2.0.0-vscode) | 36013 | GitHub Copilot (full), Cursor (partial) |
| [Tabby](https://github.com/TabbyML/tabby) | Rust | Other | [v0.32.0](https://github.com/TabbyML/tabby/releases/tag/v0.32.0) | 33893 | GitHub Copilot (full) |

</details>

<details>
<summary><b>AI chat interfaces</b>, 5 tools</summary>

Apps to chat with language models, whether the model runs locally or behind an API.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Open WebUI](https://github.com/open-webui/open-webui) | Python | Other | [v0.11.4](https://github.com/open-webui/open-webui/releases/tag/v0.11.4) signed | 153008 | ChatGPT (partial), Claude (partial) |
| [LobeHub](https://github.com/lobehub/lobehub) | TypeScript | Other | [v2.2.18](https://github.com/lobehub/lobehub/releases/tag/v2.2.18) signed | 82800 | ChatGPT (partial), Claude (partial) |
| [AnythingLLM](https://github.com/Mintplex-Labs/anything-llm) | JavaScript | MIT | [v1.16.2](https://github.com/Mintplex-Labs/anything-llm/releases/tag/v1.16.2) | 66404 | ChatGPT (partial), Claude (partial) |
| [LibreChat](https://github.com/danny-avila/LibreChat) | TypeScript | MIT | [v0.8.8-rc4](https://github.com/LibreChat-AI/LibreChat/releases/tag/v0.8.8-rc4) signed | 44852 | ChatGPT (partial), Claude (partial) |
| [Jan](https://github.com/janhq/jan) | Rust | Other | [v0.8.4](https://github.com/janhq/jan/releases/tag/v0.8.4) signed | 44635 | ChatGPT (partial), Claude (partial) |

</details>

<details>
<summary><b>Local model runtimes</b>, 2 tools</summary>

Run open-weight language models on your own hardware, behind a local API.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Ollama](https://github.com/ollama/ollama) | Go | MIT | [v0.34.4](https://github.com/ollama/ollama/releases/tag/v0.34.4) | 181594 | ChatGPT (partial), Claude (partial) |
| [llama.cpp](https://github.com/ggml-org/llama.cpp) | C++ | MIT | [v0.5.0](https://github.com/ggml-org/llama.cpp/releases/tag/v0.5.0) | 129411 | ChatGPT (partial), Claude (partial) |

</details>

<details>
<summary><b>Container desktops</b>, 3 tools</summary>

Run containers and a local Kubernetes on a laptop, with the engine managed for you.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Colima](https://github.com/abiosoft/colima) | Go | MIT | [v0.10.3](https://github.com/abiosoft/colima/releases/tag/v0.10.3) signed | 30971 | Docker Desktop (partial) |
| [Podman Desktop](https://github.com/podman-desktop/podman-desktop) | TypeScript | Apache-2.0 | [v1.29.3](https://github.com/podman-desktop/podman-desktop/releases/tag/v1.29.3) | 8026 | Docker Desktop (full) |
| [Rancher Desktop](https://github.com/rancher-sandbox/rancher-desktop) | TypeScript | Apache-2.0 | [v1.24.0](https://github.com/rancher-sandbox/rancher-desktop/releases/tag/v1.24.0) signed | 7357 | Docker Desktop (full) |

</details>

<details>
<summary><b>Dashboards</b>, 4 tools</summary>

Build dashboards and explore metrics, logs and traces from a web UI.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Grafana](https://github.com/grafana/grafana) | TypeScript | AGPL-3.0 | [v13.2.2](https://github.com/grafana/grafana/releases/tag/v13.2.2) | 76887 | Kibana (partial), Datadog (partial) |
| [Kibana](https://github.com/elastic/kibana) | TypeScript | Other | [v9.5.4](https://github.com/elastic/kibana/releases/tag/v9.5.4) signed | 21301 | none |
| [Perses](https://github.com/perses/perses) | Go | Apache-2.0 | [v0.54.0](https://github.com/perses/perses/releases/tag/v0.54.0) signed | 2449 | Grafana (partial) |
| [OpenSearch Dashboards](https://github.com/opensearch-project/OpenSearch-Dashboards) | TypeScript | Apache-2.0 | [3.8.0](https://github.com/opensearch-project/OpenSearch-Dashboards/releases/tag/3.8.0) signed | 2130 | Kibana (full) |

</details>

<details>
<summary><b>Actor toolkits</b>, 2 tools</summary>

Actor-model runtimes for building concurrent and distributed JVM applications.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Akka](https://github.com/akka/akka-core) | Scala | Other | [v2.10.22](https://github.com/akka/akka-core/releases/tag/v2.10.22) signed | 13279 | none |
| [Apache Pekko](https://github.com/apache/pekko) | Scala | Apache-2.0 | [v2.0.0-M4](https://github.com/apache/pekko/releases/tag/v2.0.0-M4) signed | 1641 | Akka (full) |

</details>

<details>
<summary><b>Distributed SQL databases</b>, 2 tools</summary>

SQL databases that spread data across nodes and speak the PostgreSQL wire protocol.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [CockroachDB](https://github.com/cockroachdb/cockroach) | Go | Other | [v26.2.6](https://github.com/cockroachdb/cockroach/releases/tag/v26.2.6) signed | 32493 | none |
| [YugabyteDB](https://github.com/yugabyte/yugabyte-db) | C | Other | [v2026.1.2.0](https://github.com/yugabyte/yugabyte-db/releases/tag/v2026.1.2.0) | 10554 | CockroachDB (full) |

</details>

<details>
<summary><b>Error tracking</b>, 2 tools</summary>

Collect exceptions from applications through an SDK and group them into issues.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Sentry](https://github.com/getsentry/sentry) | Python | Other | [26.9.0](https://github.com/getsentry/sentry/releases/tag/26.9.0) | 44835 | none |
| [Bugsink](https://github.com/bugsink/bugsink) | Python | Other | [2.6.0](https://github.com/bugsink/bugsink/releases/tag/2.6.0) | 2090 | Sentry (partial) |

</details>

<details>
<summary><b>Distributed tracing</b>, 3 tools</summary>

Collect and search traces of requests as they cross services.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Jaeger](https://github.com/jaegertracing/jaeger) | Go | Apache-2.0 | [v2.21.0](https://github.com/jaegertracing/jaeger/releases/tag/v2.21.0) signed | 23237 | Zipkin (full) |
| [Zipkin](https://github.com/openzipkin/zipkin) | Java | Apache-2.0 | [3.6.1](https://github.com/openzipkin/zipkin/releases/tag/3.6.1) | 17465 | none |
| [Grafana Tempo](https://github.com/grafana/tempo) | Go | AGPL-3.0 | [v3.0.3](https://github.com/grafana/tempo/releases/tag/v3.0.3) signed | 5487 | Zipkin (full) |

</details>

<details>
<summary><b>Time-series databases</b>, 3 tools</summary>

Store and query timestamped measurements at high write rates.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [InfluxDB](https://github.com/influxdata/influxdb) | Rust | Apache-2.0 | [v3.11.4](https://github.com/influxdata/influxdb/releases/tag/v3.11.4) | 31757 | none |
| [TimescaleDB](https://github.com/timescale/timescaledb) | C | Other | [2.30.1](https://github.com/timescale/timescaledb/releases/tag/2.30.1) signed | 23583 | InfluxDB (full) |
| [QuestDB](https://github.com/questdb/questdb) | Java | Apache-2.0 | [10.0.1](https://github.com/questdb/questdb/releases/tag/10.0.1) | 17347 | InfluxDB (full) |

</details>

<details>
<summary><b>Encrypted files in git</b>, 2 tools</summary>

Keep secrets in a repository, encrypted, and decrypted only by the people and machines allowed to.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [SOPS](https://github.com/getsops/sops) | Go | MPL-2.0 | [v3.13.3](https://github.com/getsops/sops/releases/tag/v3.13.3) signed | 23202 | git-crypt (full) |
| [git-crypt](https://github.com/AGWA/git-crypt) | C++ | GPL-3.0 | [0.8.0](https://github.com/AGWA/git-crypt/releases/tag/0.8.0) | 9932 | none |

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
