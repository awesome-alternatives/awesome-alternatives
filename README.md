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

## What changed

Each refresh compares the catalog with the previous one and keeps a dated list of what changed:
a licence, a renamed or archived repository, a new release, a tool joining or leaving. Star counts
never count. The list is on [awesome-alternatives.com/changes/](https://awesome-alternatives.com/changes/),
with an RSS feed for the whole catalog, one per tool (`/tools/<slug>/feed.xml`) and one per
category (`/categories/<key>/feed.xml`). Following the feed of the tool you use tells you when it
gets archived or relicensed, without an account. The raw stream is
[`generated/events.json`](generated/events.json).

## Catalog

Each category folds open. The same data, searchable in plain words ("semantic-release, but written
in Rust"), is on [awesome-alternatives.com](https://awesome-alternatives.com).

<!-- catalog:start -->

<details>
<summary><b>Release automation</b>, 9 tools</summary>

Version bumps, changelogs, tags and published releases from commit history.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [semantic-release](https://github.com/semantic-release/semantic-release) | JavaScript | MIT | [v25.0.9](https://github.com/semantic-release/semantic-release/releases/tag/v25.0.9) signed | 24069 | none |
| [GoReleaser](https://github.com/goreleaser/goreleaser) | Go | MIT | [v2.18.2](https://github.com/goreleaser/goreleaser/releases/tag/v2.18.2) signed | 16067 | none |
| [Changesets](https://github.com/changesets/changesets) | TypeScript | MIT | [@changesets/cli@3.0.3](https://github.com/changesets/changesets/releases/tag/%40changesets/cli%403.0.3) signed | 12441 | semantic-release (full), Lerna (partial) |
| [release-please](https://github.com/googleapis/release-please) | TypeScript | Apache-2.0 | [v17.11.2](https://github.com/googleapis/release-please/releases/tag/v17.11.2) signed | 7552 | semantic-release (full) |
| [cargo-release](https://github.com/crate-ci/cargo-release) | Rust | Apache-2.0 | [v1.1.6](https://github.com/crate-ci/cargo-release/releases/tag/v1.1.6) | 1589 | none |
| [release-plz](https://github.com/release-plz/release-plz) | Rust | Apache-2.0 | [release-plz-v0.3.169](https://github.com/release-plz/release-plz/releases/tag/release-plz-v0.3.169) | 1483 | semantic-release (partial), cargo-release (full) |
| [cocogitto](https://github.com/cocogitto/cocogitto) | Rust | MIT | [7.0.0](https://github.com/cocogitto/cocogitto/releases/tag/7.0.0) | 1197 | semantic-release (full), conventional-changelog (partial) |
| [knope](https://github.com/knope-dev/knope) | Rust | MIT | [knope/v0.23.0](https://github.com/knope-dev/knope/releases/tag/knope/v0.23.0) signed | 191 | semantic-release (full), Changesets (full) |
| [FerrFlow](https://github.com/FerrLabs/FerrFlow) verified | Rust | MIT | [v7.26.7](https://github.com/FerrLabs/FerrFlow/releases/tag/v7.26.7) signed | 4 | semantic-release (full), release-please (full), Changesets (full), release-plz (full), knope (full), cocogitto (full), git-cliff (partial), Lerna (partial), conventional-changelog (partial), cargo-release (full) |

</details>

<details>
<summary><b>Changelog generation</b>, 4 tools</summary>

Changelogs built from commits or pull requests, without driving the release itself.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [git-cliff](https://github.com/orhun/git-cliff) | Rust | Apache-2.0 | [v2.14.2](https://github.com/orhun/git-cliff/releases/tag/v2.14.2) signed | 12267 | semantic-release (partial), conventional-changelog (full) |
| [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) | TypeScript | ISC | [template-v1.4.0](https://github.com/conventional-changelog/conventional-changelog/releases/tag/template-v1.4.0) signed | 8511 | none |
| [GitHub Changelog Generator](https://github.com/github-changelog-generator/github-changelog-generator) | Ruby | MIT | [v1.18.0](https://github.com/github-changelog-generator/github-changelog-generator/releases/tag/v1.18.0) | 7537 | conventional-changelog (full) |
| [Release Drafter](https://github.com/release-drafter/release-drafter) | TypeScript | ISC | [v7.7.0](https://github.com/release-drafter/release-drafter/releases/tag/v7.7.0) signed | 3944 | conventional-changelog (partial) |

</details>

<details>
<summary><b>JavaScript runtimes</b>, 5 tools</summary>

Engines that run JavaScript and TypeScript outside the browser.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Node.js](https://github.com/nodejs/node) | JavaScript | Other | [v26.10.0](https://github.com/nodejs/node/releases/tag/v26.10.0) signed | 122079 | none |
| [Deno](https://github.com/denoland/deno) | Rust | MIT | [v2.9.7](https://github.com/denoland/deno/releases/tag/v2.9.7) signed | 108503 | Node.js (full), ts-node (full) |
| [Bun](https://github.com/oven-sh/bun) | Rust | Other | [bun-v1.4.2](https://github.com/oven-sh/bun/releases/tag/bun-v1.4.2) | 96039 | Node.js (full), npm (full), ts-node (full), Jest (partial) |
| [ts-node](https://github.com/TypeStrong/ts-node) | TypeScript | MIT | [v10.9.2](https://github.com/TypeStrong/ts-node/releases/tag/v10.9.2) | 13120 | none |
| [tsx](https://github.com/privatenumber/tsx) | TypeScript | MIT | [v4.23.15](https://github.com/privatenumber/tsx/releases/tag/v4.23.15) signed | 12159 | ts-node (full) |

</details>

<details>
<summary><b>JavaScript package managers</b>, 3 tools</summary>

Install and lock npm dependencies.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [pnpm](https://github.com/pnpm/pnpm) | Rust | MIT | [v12.6.0](https://github.com/pnpm/pnpm/releases/tag/v12.6.0) signed | 36638 | npm (full) |
| [npm](https://github.com/npm/cli) | JavaScript | Other | [libnpmpublish-v11.2.1](https://github.com/npm/cli/releases/tag/libnpmpublish-v11.2.1) | 10148 | none |
| [Yarn](https://github.com/yarnpkg/berry) | TypeScript | BSD-2-Clause | [@yarnpkg/cli/4.18.1](https://github.com/yarnpkg/berry/releases/tag/%40yarnpkg/cli/4.18.1) | 8107 | npm (full) |

</details>

<details>
<summary><b>JavaScript bundlers</b>, 10 tools</summary>

Bundle, transform and serve front-end code.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Create React App](https://github.com/react/create-react-app) | JavaScript | MIT | [v5.0.1](https://github.com/react/create-react-app/releases/tag/v5.0.1) signed | 103250 | none |
| [Vite](https://github.com/vitejs/vite) | TypeScript | MIT | [v8.3.1](https://github.com/vitejs/vite/releases/tag/v8.3.1) signed | 82992 | webpack (full), Create React App (full) |
| [webpack](https://github.com/webpack/webpack) | JavaScript | MIT | [v5.111.1](https://github.com/webpack/webpack/releases/tag/v5.111.1) signed | 65947 | none |
| [Parcel](https://github.com/parcel-bundler/parcel) | JavaScript | MIT | [v2.16.4](https://github.com/parcel-bundler/parcel/releases/tag/v2.16.4) | 44027 | webpack (full), Create React App (partial) |
| [Babel](https://github.com/babel/babel) | TypeScript | MIT | [v8.0.6](https://github.com/babel/babel/releases/tag/v8.0.6) | 44020 | none |
| [esbuild](https://github.com/evanw/esbuild) | Go | MIT | [v0.28.2](https://github.com/evanw/esbuild/releases/tag/v0.28.2) | 40070 | webpack (partial) |
| [SWC](https://github.com/swc-project/swc) | Rust | Apache-2.0 | [v1.16.4-nightly-20260913.1](https://github.com/swc-project/swc/releases/tag/v1.16.4-nightly-20260913.1) | 34203 | Babel (full) |
| [Rollup](https://github.com/rollup/rollup) | JavaScript | Other | [v4.63.5](https://github.com/rollup/rollup/releases/tag/v4.63.5) | 26308 | none |
| [Rolldown](https://github.com/rolldown/rolldown) | Rust | MIT | [v1.2.11](https://github.com/rolldown/rolldown/releases/tag/v1.2.11) signed | 13958 | Rollup (full) |
| [Rspack](https://github.com/web-infra-dev/rspack) | Rust | MIT | [v2.2.7](https://github.com/web-infra-dev/rspack/releases/tag/v2.2.7) | 12919 | webpack (drop-in) |

</details>

<details>
<summary><b>JavaScript linting and formatting</b>, 6 tools</summary>

Linters and formatters for JavaScript and TypeScript.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Prettier](https://github.com/prettier/prettier) | JavaScript | MIT | [3.9.9](https://github.com/prettier/prettier/releases/tag/3.9.9) | 52309 | none |
| [ESLint](https://github.com/eslint/eslint) | JavaScript | MIT | [v10.11.0](https://github.com/eslint/eslint/releases/tag/v10.11.0) | 27519 | TSLint (full) |
| [Biome](https://github.com/biomejs/biome) | Rust | Apache-2.0 | [@biomejs/biome@2.5.14](https://github.com/biomejs/biome/releases/tag/%40biomejs/biome%402.5.14) signed | 25858 | ESLint (partial), Prettier (full) |
| [Oxc](https://github.com/oxc-project/oxc) | Rust | MIT | [oxlint_v1.85.0](https://github.com/oxc-project/oxc/releases/tag/oxlint_v1.85.0) | 22887 | ESLint (partial) |
| [TSLint](https://github.com/palantir/tslint) archived | TypeScript | Apache-2.0 | [6.1.3](https://github.com/palantir/tslint/releases/tag/6.1.3) signed | 5901 | none |
| [dprint](https://github.com/dprint/dprint) | Rust | MIT | [0.57.4](https://github.com/dprint/dprint/releases/tag/0.57.4) | 4080 | Prettier (full) |

</details>

<details>
<summary><b>JavaScript test runners</b>, 5 tools</summary>

Run unit and integration tests for JavaScript and TypeScript.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Jest](https://github.com/jestjs/jest) | TypeScript | MIT | [v30.5.2](https://github.com/jestjs/jest/releases/tag/v30.5.2) | 45465 | none |
| [Mocha](https://github.com/mochajs/mocha) | JavaScript | MIT | [v12.0.2](https://github.com/mochajs/mocha/releases/tag/v12.0.2) signed | 22897 | none |
| [AVA](https://github.com/avajs/ava) | JavaScript | MIT | [v8.0.1](https://github.com/avajs/ava/releases/tag/v8.0.1) signed | 20826 | Mocha (full) |
| [Vitest](https://github.com/vitest-dev/vitest) | TypeScript | MIT | [v5.0.2](https://github.com/vitest-dev/vitest/releases/tag/v5.0.2) signed | 17156 | Jest (full), Mocha (full) |
| [Jasmine](https://github.com/jasmine/jasmine) | JavaScript | MIT | [v7.0.1](https://github.com/jasmine/jasmine/releases/tag/v7.0.1) | 15814 | Mocha (full) |

</details>

<details>
<summary><b>Python packaging</b>, 12 tools</summary>

Install dependencies, manage environments and lock Python projects.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [uv](https://github.com/astral-sh/uv) | Rust | Apache-2.0 | [0.12.19](https://github.com/astral-sh/uv/releases/tag/0.12.19) signed | 90169 | pip (full), Poetry (full), Pipenv (full), pyenv (full), pip-tools (full) |
| [pyenv](https://github.com/pyenv/pyenv) | Shell | MIT | [v2.8.6](https://github.com/pyenv/pyenv/releases/tag/v2.8.6) | 45111 | none |
| [Poetry](https://github.com/python-poetry/poetry) | Python | MIT | [2.5.1](https://github.com/python-poetry/poetry/releases/tag/2.5.1) | 34304 | Pipenv (full) |
| [Pipenv](https://github.com/pypa/pipenv) | Python | MIT | [v2026.8.0](https://github.com/pypa/pipenv/releases/tag/v2026.8.0) | 25029 | none |
| [pipx](https://github.com/pypa/pipx) | Python | MIT | [1.17.6](https://github.com/pypa/pipx/releases/tag/1.17.6) | 12975 | none |
| [pip](https://github.com/pypa/pip) | Python | MIT | [26.2.1](https://github.com/pypa/pip/releases/tag/26.2.1) signed | 10288 | none |
| [PDM](https://github.com/pdm-project/pdm) | Python | MIT | [2.29.2](https://github.com/pdm-project/pdm/releases/tag/2.29.2) | 8669 | Poetry (full), Pipenv (full) |
| [mamba](https://github.com/mamba-org/mamba) | C++ | BSD-3-Clause | [2.9.0](https://github.com/mamba-org/mamba/releases/tag/2.9.0) signed | 8099 | conda (drop-in) |
| [pip-tools](https://github.com/jazzband/pip-tools) | Python | BSD-3-Clause | [v7.6.1](https://github.com/jazzband/pip-tools/releases/tag/v7.6.1) | 8004 | none |
| [pixi](https://github.com/prefix-dev/pixi) | Rust | BSD-3-Clause | [v0.81.0](https://github.com/prefix-dev/pixi/releases/tag/v0.81.0) | 7775 | conda (full), Poetry (partial) |
| [conda](https://github.com/conda/conda) | Python | Other | [26.7.2](https://github.com/conda/conda/releases/tag/26.7.2) signed | 7515 | none |
| [Hatch](https://github.com/pypa/hatch) | Python | MIT | [hatch-v1.18.1](https://github.com/pypa/hatch/releases/tag/hatch-v1.18.1) signed | 7236 | Poetry (partial), Pipenv (partial) |

</details>

<details>
<summary><b>Python linting and formatting</b>, 6 tools</summary>

Linters and formatters for Python.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Ruff](https://github.com/astral-sh/ruff) | Rust | MIT | [0.16.9](https://github.com/astral-sh/ruff/releases/tag/0.16.9) signed | 49785 | Flake8 (full), Black (drop-in), Pylint (partial), isort (full) |
| [Black](https://github.com/psf/black) | Python | MIT | [26.5.1](https://github.com/psf/black/releases/tag/26.5.1) signed | 41852 | none |
| [YAPF](https://github.com/google/yapf) | Python | Apache-2.0 | [yapf-v0.16.3](https://github.com/google/yapf/releases/tag/yapf-v0.16.3) | 13986 | Black (full) |
| [isort](https://github.com/PyCQA/isort) | Python | MIT | [9.0.1](https://github.com/PyCQA/isort/releases/tag/9.0.1) | 6954 | none |
| [Pylint](https://github.com/pylint-dev/pylint) | Python | GPL-2.0 | [v4.0.9](https://github.com/pylint-dev/pylint/releases/tag/v4.0.9) | 5726 | none |
| [Flake8](https://github.com/PyCQA/flake8) | Python | Other | [7.4.1](https://github.com/PyCQA/flake8/releases/tag/7.4.1) signed | 3824 | none |

</details>

<details>
<summary><b>Infrastructure as code</b>, 6 tools</summary>

Declare cloud infrastructure in files and apply the difference.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Terraform](https://github.com/hashicorp/terraform) | Go | Other | [v1.16.4](https://github.com/hashicorp/terraform/releases/tag/v1.16.4) signed | 49735 | none |
| [OpenTofu](https://github.com/opentofu/opentofu) | Go | MPL-2.0 | [v1.12.6](https://github.com/opentofu/opentofu/releases/tag/v1.12.6) signed | 30279 | Terraform (drop-in), AWS CloudFormation (full) |
| [SST](https://github.com/anomalyco/sst) | TypeScript | MIT | [v4.17.1](https://github.com/anomalyco/sst/releases/tag/v4.17.1) signed | 26321 | none |
| [Pulumi](https://github.com/pulumi/pulumi) | Go | Apache-2.0 | [v3.264.0](https://github.com/pulumi/pulumi/releases/tag/v3.264.0) signed | 25729 | Terraform (full), AWS CloudFormation (full) |
| [AWS CDK](https://github.com/aws/aws-cdk) | TypeScript | Apache-2.0 | [v2.270.0](https://github.com/aws/aws-cdk/releases/tag/v2.270.0) signed | 12912 | none |
| [Crossplane](https://github.com/crossplane/crossplane) | Go | Apache-2.0 | [v2.4.2](https://github.com/crossplane/crossplane/releases/tag/v2.4.2) | 12108 | Terraform (partial), AWS CloudFormation (partial) |

</details>

<details>
<summary><b>Container engines</b>, 5 tools</summary>

Build and run OCI containers.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Docker Engine (Moby)](https://github.com/moby/moby) | Go | Apache-2.0 | [docker-v29.8.1](https://github.com/moby/moby/releases/tag/docker-v29.8.1) signed | 72132 | none |
| [Podman](https://github.com/podman-container-tools/podman) | Go | Apache-2.0 | [v6.1.2](https://github.com/podman-container-tools/podman/releases/tag/v6.1.2) signed | 32932 | Docker Engine (Moby) (drop-in) |
| [containerd](https://github.com/containerd/containerd) | Go | Apache-2.0 | [v2.4.1](https://github.com/containerd/containerd/releases/tag/v2.4.1) signed | 21335 | Docker Engine (Moby) (partial) |
| [nerdctl](https://github.com/containerd/nerdctl) | Go | Apache-2.0 | [v2.4.0](https://github.com/containerd/nerdctl/releases/tag/v2.4.0) signed | 10392 | Docker Engine (Moby) (full) |
| [Buildah](https://github.com/podman-container-tools/buildah) | Go | Apache-2.0 | [v1.45.1](https://github.com/podman-container-tools/buildah/releases/tag/v1.45.1) signed | 9035 | Docker Engine (Moby) (partial) |

</details>

<details>
<summary><b>In-memory key-value stores</b>, 7 tools</summary>

Caches and data structure servers speaking the Redis protocol or close to it.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Redis](https://github.com/redis/redis) | C | Other | [8.10.2](https://github.com/redis/redis/releases/tag/8.10.2) | 76477 | none |
| [Dragonfly](https://github.com/dragonflydb/dragonfly) | C++ | Other | [v2.0.0](https://github.com/dragonflydb/dragonfly/releases/tag/v2.0.0) signed | 31679 | Redis (drop-in), Memcached (full) |
| [Valkey](https://github.com/valkey-io/valkey) | C | BSD-3-Clause | [9.1.2](https://github.com/valkey-io/valkey/releases/tag/9.1.2) signed | 27290 | Redis (drop-in), Memcached (partial) |
| [Memcached](https://github.com/memcached/memcached) | C | BSD-3-Clause | [flash-with-wbuf-stack](https://github.com/memcached/memcached/releases/tag/flash-with-wbuf-stack) | 14285 | none |
| [KeyDB](https://github.com/Snapchat/KeyDB) | C++ | BSD-3-Clause | [v6.3.4](https://github.com/Snapchat/KeyDB/releases/tag/v6.3.4) | 12506 | Redis (drop-in) |
| [Garnet](https://github.com/microsoft/garnet) | C# | MIT | [v2.1.8](https://github.com/microsoft/garnet/releases/tag/v2.1.8) signed | 12027 | Redis (partial) |
| [Apache Kvrocks](https://github.com/apache/kvrocks) | C++ | Apache-2.0 | [v2.17.0](https://github.com/apache/kvrocks/releases/tag/v2.17.0) | 4442 | Redis (partial) |

</details>

<details>
<summary><b>Search engines</b>, 8 tools</summary>

Full-text search servers.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Elasticsearch](https://github.com/elastic/elasticsearch) | Java | Other | [v9.5.4](https://github.com/elastic/elasticsearch/releases/tag/v9.5.4) signed | 77987 | none |
| [Meilisearch](https://github.com/meilisearch/meilisearch) | Rust | Other | [v1.54.0](https://github.com/meilisearch/meilisearch/releases/tag/v1.54.0) signed | 59407 | Elasticsearch (partial), Algolia (full) |
| [Typesense](https://github.com/typesense/typesense) | C++ | GPL-3.0 | [v30.2](https://github.com/typesense/typesense/releases/tag/v30.2) | 26594 | Elasticsearch (partial), Algolia (full) |
| [Sonic](https://github.com/valeriansaliou/sonic) | Rust | MPL-2.0 | [v1.10.0](https://github.com/valeriansaliou/sonic/releases/tag/v1.10.0) signed | 21350 | Elasticsearch (partial) |
| [ZincSearch](https://github.com/zincsearch/zincsearch) | Go | Other | [v1.0.0-beta3](https://github.com/zincsearch/zincsearch/releases/tag/v1.0.0-beta3) signed | 17882 | Elasticsearch (partial) |
| [OpenSearch](https://github.com/opensearch-project/OpenSearch) | Java | Apache-2.0 | [3.8.0](https://github.com/opensearch-project/OpenSearch/releases/tag/3.8.0) signed | 13775 | Elasticsearch (full), Splunk (partial) |
| [Manticore Search](https://github.com/manticoresoftware/manticoresearch) | C++ | GPL-3.0 | [release-29.9.0](https://github.com/manticoresoftware/manticoresearch/releases/tag/release-29.9.0) | 12037 | Elasticsearch (partial), Algolia (partial) |
| [Apache Solr](https://github.com/apache/solr) | Java | Apache-2.0 | [releases/solr/10.0.0](https://github.com/apache/solr/releases/tag/releases/solr/10.0.0) | 1677 | Elasticsearch (full) |

</details>

<details>
<summary><b>Metrics and monitoring</b>, 6 tools</summary>

Collect, store and query time series.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Netdata](https://github.com/netdata/netdata) | Go | GPL-3.0 | [v2.11.1](https://github.com/netdata/netdata/releases/tag/v2.11.1) | 80647 | Datadog (partial) |
| [Prometheus](https://github.com/prometheus/prometheus) | Go | Apache-2.0 | [v3.15.0](https://github.com/prometheus/prometheus/releases/tag/v3.15.0) | 66222 | Datadog (partial) |
| [VictoriaMetrics](https://github.com/VictoriaMetrics/VictoriaMetrics) | Go | Apache-2.0 | [v1.152.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.152.0) | 17767 | Prometheus (full), InfluxDB (partial), Datadog (partial) |
| [Thanos](https://github.com/thanos-io/thanos) | Go | Apache-2.0 | [v0.42.4](https://github.com/thanos-io/thanos/releases/tag/v0.42.4) signed | 14219 | Prometheus (partial), Datadog (partial) |
| [Zabbix](https://github.com/zabbix/zabbix) | Go Template | AGPL-3.0 | [8.0.0beta2](https://github.com/zabbix/zabbix/releases/tag/8.0.0beta2) | 6412 | Datadog (partial) |
| [Grafana Mimir](https://github.com/grafana/mimir) | Go | AGPL-3.0 | [mimir-3.2.1](https://github.com/grafana/mimir/releases/tag/mimir-3.2.1) signed | 5238 | Prometheus (partial), Datadog (partial) |

</details>

<details>
<summary><b>Command-line HTTP clients</b>, 4 tools</summary>

Send HTTP requests from a terminal.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [curl](https://github.com/curl/curl) | C | Other | [curl-8_22_0](https://github.com/curl/curl/releases/tag/curl-8_22_0) signed | 42929 | none |
| [HTTPie](https://github.com/httpie/cli) | Python | BSD-3-Clause | [3.2.4](https://github.com/httpie/cli/releases/tag/3.2.4) | 38584 | none |
| [xh](https://github.com/ducaale/xh) | Rust | MIT | [v0.26.2](https://github.com/ducaale/xh/releases/tag/v0.26.2) | 8101 | HTTPie (full), curl (partial) |
| [curlie](https://github.com/rs/curlie) | Go | MIT | [v1.8.2](https://github.com/rs/curlie/releases/tag/v1.8.2) | 3729 | HTTPie (full) |

</details>

<details>
<summary><b>Code search</b>, 5 tools</summary>

Search file contents recursively from a terminal.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [ripgrep](https://github.com/BurntSushi/ripgrep) | Rust | Unlicense | [15.2.0](https://github.com/BurntSushi/ripgrep/releases/tag/15.2.0) signed | 68598 | The Silver Searcher (full), ack (full) |
| [The Silver Searcher](https://github.com/ggreer/the_silver_searcher) | C | Apache-2.0 | [2.2.0](https://github.com/ggreer/the_silver_searcher/releases/tag/2.2.0) | 27125 | none |
| [ast-grep](https://github.com/ast-grep/ast-grep) | Rust | MIT | [0.45.3](https://github.com/ast-grep/ast-grep/releases/tag/0.45.3) signed | 16032 | ripgrep (partial) |
| [ugrep](https://github.com/Genivia/ugrep) | C++ | BSD-3-Clause | [v7.8.5](https://github.com/Genivia/ugrep/releases/tag/v7.8.5) | 3302 | The Silver Searcher (full), ack (full) |
| [ack](https://github.com/beyondgrep/ack3) | Perl | Other | [v3.10.0](https://github.com/beyondgrep/ack3/releases/tag/v3.10.0) | 828 | none |

</details>

<details>
<summary><b>API clients</b>, 4 tools</summary>

Build, send and share HTTP and GraphQL requests from a desktop or browser app.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Hoppscotch](https://github.com/hoppscotch/hoppscotch) | TypeScript | MIT | [2026.8.2](https://github.com/hoppscotch/hoppscotch/releases/tag/2026.8.2) signed | 80510 | Insomnia (full), Postman (full) |
| [Bruno](https://github.com/usebruno/bruno) | JavaScript | MIT | [v4.2.0](https://github.com/usebruno/bruno/releases/tag/v4.2.0) signed | 47192 | Insomnia (full), Postman (full) |
| [Insomnia](https://github.com/Kong/insomnia) | TypeScript | Apache-2.0 | [core@13.3.0](https://github.com/Kong/insomnia/releases/tag/core%4013.3.0) | 40028 | none |
| [Yaak](https://github.com/mountain-loop/yaak) | TypeScript | MIT | [v2026.8.1](https://github.com/mountain-loop/yaak/releases/tag/v2026.8.1) signed | 19257 | Postman (full), Insomnia (full) |

</details>

<details>
<summary><b>Monorepo tools</b>, 5 tools</summary>

Run, cache and orchestrate tasks across the packages of one repository.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Lerna](https://github.com/lerna/lerna) | TypeScript | MIT | [v10.0.1](https://github.com/lerna/lerna/releases/tag/v10.0.1) | 36055 | none |
| [Turborepo](https://github.com/vercel/turborepo) | Rust | MIT | [v2.11.4](https://github.com/vercel/turborepo/releases/tag/v2.11.4) signed | 31136 | Lerna (partial) |
| [Nx](https://github.com/nrwl/nx) | TypeScript | MIT | [22.7.12](https://github.com/nrwl/nx/releases/tag/22.7.12) | 29376 | Lerna (full) |
| [Rush](https://github.com/microsoft/rushstack) | TypeScript | Other | [v1.2.2](https://github.com/microsoft/rushstack/releases/tag/v1.2.2) | 6497 | Lerna (full) |
| [moon](https://github.com/moonrepo/moon) | Rust | MIT | [v2.5.5](https://github.com/moonrepo/moon/releases/tag/v2.5.5) | 4115 | Lerna (partial) |

</details>

<details>
<summary><b>Shell prompts</b>, 6 tools</summary>

Customisable prompts showing git state, runtimes and context.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh) | Shell | MIT | none | 189922 | none |
| [Starship](https://github.com/starship/starship) | Rust | ISC | [v1.26.0](https://github.com/starship/starship/releases/tag/v1.26.0) signed | 60045 | Powerlevel10k (full), Oh My Zsh (partial) |
| [Powerlevel10k](https://github.com/romkatv/powerlevel10k) | Shell | MIT | [v1.20.0](https://github.com/romkatv/powerlevel10k/releases/tag/v1.20.0) signed | 55147 | none |
| [Oh My Posh](https://github.com/JanDeDobbeleer/oh-my-posh) | Go | MIT | [v31.3.0](https://github.com/JanDeDobbeleer/oh-my-posh/releases/tag/v31.3.0) | 23511 | Powerlevel10k (full), Oh My Zsh (partial) |
| [Spaceship](https://github.com/spaceship-prompt/spaceship-prompt) | Shell | MIT | [v4.22.5](https://github.com/spaceship-prompt/spaceship-prompt/releases/tag/v4.22.5) | 20575 | Powerlevel10k (full), Oh My Zsh (partial) |
| [Pure](https://github.com/sindresorhus/pure) | Shell | MIT | [v1.28.3](https://github.com/sindresorhus/pure/releases/tag/v1.28.3) | 14425 | Powerlevel10k (full), Oh My Zsh (partial) |

</details>

<details>
<summary><b>Terminal multiplexers</b>, 3 tools</summary>

Split, detach and reattach terminal sessions.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [tmux](https://github.com/tmux/tmux) | C | ISC | [3.7c](https://github.com/tmux/tmux/releases/tag/3.7c) | 49495 | none |
| [Zellij](https://github.com/zellij-org/zellij) | Rust | MIT | [v0.45.1](https://github.com/zellij-org/zellij/releases/tag/v0.45.1) | 35539 | tmux (full) |
| [tmate](https://github.com/tmate-io/tmate) | C | Other | [2.4.0](https://github.com/tmate-io/tmate/releases/tag/2.4.0) | 6130 | tmux (partial) |

</details>

<details>
<summary><b>Document databases</b>, 6 tools</summary>

Databases storing JSON-like documents.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [SurrealDB](https://github.com/surrealdb/surrealdb) | Rust | Other | [v3.2.4](https://github.com/surrealdb/surrealdb/releases/tag/v3.2.4) signed | 33070 | MongoDB (partial) |
| [MongoDB](https://github.com/mongodb/mongo) | C++ | Other | [show](https://github.com/mongodb/mongo/releases/tag/show) | 28583 | none |
| [RethinkDB](https://github.com/rethinkdb/rethinkdb) | C++ | Other | [v2.4.4](https://github.com/rethinkdb/rethinkdb/releases/tag/v2.4.4) | 27002 | MongoDB (partial) |
| [ArangoDB](https://github.com/arangodb/arangodb) | C++ | Other | [vdevel](https://github.com/arangodb/arangodb/releases/tag/vdevel) | 14278 | MongoDB (partial) |
| [FerretDB](https://github.com/FerretDB/FerretDB) | Go | Apache-2.0 | [v2.7.0](https://github.com/FerretDB/FerretDB/releases/tag/v2.7.0) signed | 11079 | MongoDB (drop-in) |
| [Apache CouchDB](https://github.com/apache/couchdb) | Erlang | Apache-2.0 | [nouveau-0.1](https://github.com/apache/couchdb/releases/tag/nouveau-0.1) | 6963 | MongoDB (full) |

</details>

<details>
<summary><b>Wide-column databases</b>, 4 tools</summary>

Distributed databases storing wide, sparse rows partitioned across nodes.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [ScyllaDB](https://github.com/scylladb/scylladb) | C++ | Other | [scylla-2026.3.2-candidate-20260923012801](https://github.com/scylladb/scylladb/releases/tag/scylla-2026.3.2-candidate-20260923012801) | 15773 | Apache Cassandra (drop-in), Amazon Keyspaces (drop-in), Amazon DynamoDB (partial) |
| [Apache Cassandra](https://github.com/apache/cassandra) | Java | Apache-2.0 | [cassandra-6.0-alpha2](https://github.com/apache/cassandra/releases/tag/cassandra-6.0-alpha2) | 10103 | Amazon Keyspaces (drop-in), Astra DB (full) |
| [Apache HBase](https://github.com/apache/hbase) | Java | Apache-2.0 | [rel/3.0.0](https://github.com/apache/hbase/releases/tag/rel/3.0.0) signed | 5560 | Bigtable (full) |
| [Apache Accumulo](https://github.com/apache/accumulo) | Java | Apache-2.0 | [rel/4.0.0-alpha-1](https://github.com/apache/accumulo/releases/tag/rel/4.0.0-alpha-1) signed | 1172 | Bigtable (full) |

</details>

<details>
<summary><b>Graph databases</b>, 8 tools</summary>

Databases storing nodes and the relationships between them, queried by traversing the graph.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Dgraph](https://github.com/dgraph-io/dgraph) | Go | Apache-2.0 | [v25.4.1](https://github.com/dgraph-io/dgraph/releases/tag/v25.4.1) signed | 21808 | Amazon Neptune (partial) |
| [Neo4j](https://github.com/neo4j/neo4j) | Java | GPL-3.0 | [3.2.0-alpha08](https://github.com/neo4j/neo4j/releases/tag/3.2.0-alpha08) | 17259 | Amazon Neptune (partial), TigerGraph (partial) |
| [NebulaGraph](https://github.com/vesoft-inc/nebula) | C++ | Apache-2.0 | [v3.8.0](https://github.com/vesoft-inc/nebula/releases/tag/v3.8.0) signed | 12405 | TigerGraph (partial), Neo4j (partial) |
| [FalkorDB](https://github.com/FalkorDB/FalkorDB) | Rust | Other | [v4.20.7](https://github.com/FalkorDB/FalkorDB/releases/tag/v4.20.7) signed | 6304 | Neo4j (partial) |
| [JanusGraph](https://github.com/JanusGraph/janusgraph) | Java | Other | [v1.1.0](https://github.com/JanusGraph/janusgraph/releases/tag/v1.1.0) | 5841 | Azure Cosmos DB for Apache Gremlin (full), Amazon Neptune (partial) |
| [Apache AGE](https://github.com/apache/age) | C | Apache-2.0 | [PG18/v1.8.0-rc0](https://github.com/apache/age/releases/tag/PG18/v1.8.0-rc0) signed | 4851 | Neo4j (partial) |
| [Memgraph](https://github.com/memgraph/memgraph) | C++ | Other | [v3.13.1](https://github.com/memgraph/memgraph/releases/tag/v3.13.1) | 4581 | Neo4j (partial) |
| [Apache HugeGraph](https://github.com/apache/hugegraph) | Java | Apache-2.0 | [1.7.0](https://github.com/apache/hugegraph/releases/tag/1.7.0) signed | 3189 | Amazon Neptune (partial) |

</details>

<details>
<summary><b>Event streaming</b>, 8 tools</summary>

Durable, partitioned logs for events and messages.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Apache Kafka](https://github.com/apache/kafka) | Java | Apache-2.0 | [show](https://github.com/apache/kafka/releases/tag/show) | 33835 | none |
| [NSQ](https://github.com/nsqio/nsq) | Go | MIT | [v1.3.0](https://github.com/nsqio/nsq/releases/tag/v1.3.0) | 25779 | none |
| [Apache RocketMQ](https://github.com/apache/rocketmq) | Java | Apache-2.0 | [rocketmq-all-5.5.1](https://github.com/apache/rocketmq/releases/tag/rocketmq-all-5.5.1) signed | 22620 | Apache Kafka (full) |
| [NATS](https://github.com/nats-io/nats-server) | Go | Apache-2.0 | [v2.15.0](https://github.com/nats-io/nats-server/releases/tag/v2.15.0) signed | 20770 | Apache Kafka (partial) |
| [Apache Pulsar](https://github.com/apache/pulsar) | Java | Apache-2.0 | [v4.2.4](https://github.com/apache/pulsar/releases/tag/v4.2.4) signed | 15338 | Apache Kafka (full) |
| [RabbitMQ](https://github.com/rabbitmq/rabbitmq-server) | JavaScript | Other | [v4.3.6](https://github.com/rabbitmq/rabbitmq-server/releases/tag/v4.3.6) signed | 13877 | Amazon SQS (full), Apache Kafka (partial) |
| [Redpanda](https://github.com/redpanda-data/redpanda) | C++ | none | [v26.2.2](https://github.com/redpanda-data/redpanda/releases/tag/v26.2.2) signed | 12571 | Apache Kafka (drop-in) |
| [AutoMQ](https://github.com/AutoMQ/automq) | Java | Apache-2.0 | [1.7.5-rc1](https://github.com/AutoMQ/automq/releases/tag/1.7.5-rc1) | 10862 | Apache Kafka (drop-in) |

</details>

<details>
<summary><b>Web servers and reverse proxies</b>, 8 tools</summary>

Serve sites, terminate TLS and route traffic to services.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Caddy](https://github.com/caddyserver/caddy) | Go | Apache-2.0 | [v2.11.4](https://github.com/caddyserver/caddy/releases/tag/v2.11.4) signed | 76074 | nginx (full) |
| [Traefik](https://github.com/traefik/traefik) | Go | MIT | [v3.7.13](https://github.com/traefik/traefik/releases/tag/v3.7.13) signed | 64964 | nginx (partial), ingress-nginx (full) |
| [Nginx Proxy Manager](https://github.com/NginxProxyManager/nginx-proxy-manager) | TypeScript | MIT | [v2.16.0](https://github.com/NginxProxyManager/nginx-proxy-manager/releases/tag/v2.16.0) signed | 34231 | none |
| [nginx](https://github.com/nginx/nginx) | C | BSD-2-Clause | [release-1.31.6](https://github.com/nginx/nginx/releases/tag/release-1.31.6) | 31730 | none |
| [Envoy](https://github.com/envoyproxy/envoy) | C++ | Apache-2.0 | [v1.39.1](https://github.com/envoyproxy/envoy/releases/tag/v1.39.1) | 28993 | nginx (partial) |
| [ingress-nginx](https://github.com/kubernetes/ingress-nginx) archived | Go | Apache-2.0 | [controller-v1.15.1](https://github.com/kubernetes/ingress-nginx/releases/tag/controller-v1.15.1) signed | 19466 | none |
| [OpenResty](https://github.com/openresty/openresty) | C | Other | [v1.27.1.2](https://github.com/openresty/openresty/releases/tag/v1.27.1.2) | 14044 | nginx (drop-in) |
| [HAProxy](https://github.com/haproxy/haproxy) | C | Other | [v3.5-dev7](https://github.com/haproxy/haproxy/releases/tag/v3.5-dev7) | 6876 | nginx (partial) |

</details>

<details>
<summary><b>Documentation site generators</b>, 9 tools</summary>

Turn Markdown into a searchable documentation site.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Docusaurus](https://github.com/facebook/docusaurus) | TypeScript | MIT | [v3.10.2](https://github.com/facebook/docusaurus/releases/tag/v3.10.2) | 66335 | GitBook (full) |
| [docsify](https://github.com/docsifyjs/docsify) | JavaScript | MIT | [v5.0.0](https://github.com/docsifyjs/docsify/releases/tag/v5.0.0) signed | 31529 | GitBook (partial) |
| [Material for MkDocs](https://github.com/squidfunk/mkdocs-material) | Python | MIT | [9.7.7](https://github.com/squidfunk/mkdocs-material/releases/tag/9.7.7) signed | 27502 | GitBook (full), Docusaurus (full) |
| [MkDocs](https://github.com/mkdocs/mkdocs) | Python | BSD-2-Clause | [1.6.1](https://github.com/mkdocs/mkdocs/releases/tag/1.6.1) signed | 22467 | GitBook (full) |
| [mdBook](https://github.com/rust-lang/mdBook) | Rust | MPL-2.0 | [v0.5.4](https://github.com/rust-lang/mdBook/releases/tag/v0.5.4) signed | 22174 | GitBook (full) |
| [VitePress](https://github.com/vuejs/vitepress) | TypeScript | MIT | [v2.0.0-alpha.20](https://github.com/vuejs/vitepress/releases/tag/v2.0.0-alpha.20) | 18345 | Docusaurus (full), GitBook (full) |
| [Nextra](https://github.com/shuding/nextra) | TypeScript | MIT | [nextra-theme-docs@4.6.1](https://github.com/shuding/nextra/releases/tag/nextra-theme-docs%404.6.1) | 13926 | GitBook (full), Docusaurus (full) |
| [Starlight](https://github.com/withastro/starlight) | TypeScript | MIT | [@astrojs/starlight@0.42.4](https://github.com/withastro/starlight/releases/tag/%40astrojs/starlight%400.42.4) signed | 9299 | Docusaurus (full), GitBook (full) |
| [Sphinx](https://github.com/sphinx-doc/sphinx) | Python | Other | [v9.1.0](https://github.com/sphinx-doc/sphinx/releases/tag/v9.1.0) | 8030 | GitBook (full) |

</details>

<details>
<summary><b>Static site generators</b>, 8 tools</summary>

Build websites from templates and content files.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Hugo](https://github.com/gohugoio/hugo) | Go | Apache-2.0 | [v0.166.0](https://github.com/gohugoio/hugo/releases/tag/v0.166.0) | 89945 | Jekyll (full), Hexo (full) |
| [Astro](https://github.com/withastro/astro) | TypeScript | Other | [astro@7.3.5](https://github.com/withastro/astro/releases/tag/astro%407.3.5) signed | 62812 | Gatsby (full), Jekyll (full), Hexo (full) |
| [Gatsby](https://github.com/gatsbyjs/gatsby) | JavaScript | MIT | [gatsby@5.16.1](https://github.com/gatsbyjs/gatsby/releases/tag/gatsby%405.16.1) | 55944 | none |
| [Jekyll](https://github.com/jekyll/jekyll) | Ruby | MIT | [v4.4.1](https://github.com/jekyll/jekyll/releases/tag/v4.4.1) | 51690 | none |
| [Hexo](https://github.com/hexojs/hexo) | TypeScript | MIT | [v8.1.2](https://github.com/hexojs/hexo/releases/tag/v8.1.2) | 41781 | none |
| [Eleventy](https://github.com/11ty/buildawesome) | JavaScript | MIT | [v3.1.6](https://github.com/11ty/buildawesome/releases/tag/v3.1.6) | 19936 | Jekyll (full), Hexo (full) |
| [Zola](https://github.com/getzola/zola) | Rust | EUPL-1.2 | [v0.23.6](https://github.com/getzola/zola/releases/tag/v0.23.6) | 17466 | Jekyll (full), Hexo (full) |
| [Pelican](https://github.com/getpelican/pelican) | Python | AGPL-3.0 | [4.12.0](https://github.com/getpelican/pelican/releases/tag/4.12.0) | 13339 | Jekyll (full), Hexo (full) |

</details>

<details>
<summary><b>Python type checkers</b>, 5 tools</summary>

Check Python type annotations before the code runs.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [mypy](https://github.com/python/mypy) | Python | Other | [v2.3.1](https://github.com/python/mypy/releases/tag/v2.3.1) | 20649 | none |
| [ty](https://github.com/astral-sh/ty) | Python | MIT | [0.0.84](https://github.com/astral-sh/ty/releases/tag/0.0.84) signed | 19749 | mypy (full) |
| [Pyright](https://github.com/microsoft/pyright) | Python | Other | [1.1.414](https://github.com/microsoft/pyright/releases/tag/1.1.414) | 15658 | mypy (full) |
| [Pyrefly](https://github.com/facebook/pyrefly) | Rust | MIT | [1.3.1](https://github.com/facebook/pyrefly/releases/tag/1.3.1) | 7014 | mypy (full), Pyright (full) |
| [basedpyright](https://github.com/DetachHead/basedpyright) | TypeScript | Other | [v1.40.1](https://github.com/DetachHead/basedpyright/releases/tag/v1.40.1) signed | 3609 | Pyright (full) |

</details>

<details>
<summary><b>Node.js web frameworks</b>, 8 tools</summary>

Routing and middleware for HTTP servers in JavaScript and TypeScript.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [NestJS](https://github.com/nestjs/nest) | TypeScript | MIT | [v12.1.0](https://github.com/nestjs/nest/releases/tag/v12.1.0) | 76732 | none |
| [Express](https://github.com/expressjs/express) | JavaScript | MIT | [v5.2.1](https://github.com/expressjs/express/releases/tag/v5.2.1) | 69477 | none |
| [Fastify](https://github.com/fastify/fastify) | JavaScript | MIT | [v5.12.5](https://github.com/fastify/fastify/releases/tag/v5.12.5) signed | 37195 | Express (full), Koa (full) |
| [Koa](https://github.com/koajs/koa) | JavaScript | MIT | [v3.2.1](https://github.com/koajs/koa/releases/tag/v3.2.1) signed | 35683 | none |
| [Hono](https://github.com/honojs/hono) | TypeScript | MIT | [v4.13.9](https://github.com/honojs/hono/releases/tag/v4.13.9) | 32345 | Express (full), Koa (full) |
| [Elysia](https://github.com/elysiajs/elysia) | TypeScript | MIT | [1.4.30](https://github.com/elysiajs/elysia/releases/tag/1.4.30) signed | 19183 | Express (full) |
| [AdonisJS](https://github.com/adonisjs/core) | TypeScript | MIT | [v7.5.2](https://github.com/adonisjs/core/releases/tag/v7.5.2) | 19139 | NestJS (full) |
| [hapi](https://github.com/hapijs/hapi) | JavaScript | Other | [v21.3.0](https://github.com/hapijs/hapi/releases/tag/v21.3.0) | 14791 | Express (full) |

</details>

<details>
<summary><b>TypeScript ORMs</b>, 7 tools</summary>

Typed database access and migrations for TypeScript.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Prisma ORM](https://github.com/prisma/orm) | TypeScript | Apache-2.0 | [v0.17.0](https://github.com/prisma/orm/releases/tag/v0.17.0) signed | 47674 | TypeORM (full), Sequelize (full) |
| [TypeORM](https://github.com/typeorm/typeorm) | TypeScript | MIT | [1.1.1](https://github.com/typeorm/typeorm/releases/tag/1.1.1) signed | 36658 | none |
| [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm) | TypeScript | Apache-2.0 | [drizzle-kit@0.31.11](https://github.com/drizzle-team/drizzle-orm/releases/tag/drizzle-kit%400.31.11) signed | 35894 | Prisma ORM (full), TypeORM (full), Sequelize (full) |
| [Sequelize](https://github.com/sequelize/sequelize) | TypeScript | MIT | [v6.37.8](https://github.com/sequelize/sequelize/releases/tag/v6.37.8) | 30363 | none |
| [Knex](https://github.com/knex/knex) | JavaScript | MIT | [3.3.0](https://github.com/knex/knex/releases/tag/3.3.0) | 20346 | Sequelize (partial), TypeORM (partial) |
| [Kysely](https://github.com/kysely-org/kysely) | TypeScript | MIT | [v0.29.6](https://github.com/kysely-org/kysely/releases/tag/v0.29.6) | 14242 | TypeORM (partial), Sequelize (partial), Prisma ORM (partial) |
| [MikroORM](https://github.com/mikro-orm/mikro-orm) | TypeScript | MIT | [v7.2.1](https://github.com/mikro-orm/mikro-orm/releases/tag/v7.2.1) | 9237 | TypeORM (full), Sequelize (full) |

</details>

<details>
<summary><b>Object storage</b>, 5 tools</summary>

Self-hosted servers speaking the S3 API.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [MinIO](https://github.com/minio/minio) archived | Go | AGPL-3.0 | [RELEASE.2025-10-15T17-29-55Z](https://github.com/minio/minio/releases/tag/RELEASE.2025-10-15T17-29-55Z) | 61351 | none |
| [SeaweedFS](https://github.com/seaweedfs/seaweedfs) | Go | Apache-2.0 | [4.47](https://github.com/seaweedfs/seaweedfs/releases/tag/4.47) | 34974 | MinIO (full), Amazon S3 (full) |
| [RustFS](https://github.com/rustfs/rustfs) | Rust | Apache-2.0 | [1.0.0](https://github.com/rustfs/rustfs/releases/tag/1.0.0) | 33886 | MinIO (full), Amazon S3 (full) |
| [Ceph](https://github.com/ceph/ceph) | C++ | Other | [v21.3.0](https://github.com/ceph/ceph/releases/tag/v21.3.0) | 17073 | MinIO (full), Amazon S3 (full) |
| [Garage](https://github.com/deuxfleurs-org/garage) | Rust | AGPL-3.0 | [v2.4.1](https://github.com/deuxfleurs-org/garage/releases/tag/v2.4.1) | 4585 | Amazon S3 (partial), MinIO (partial) |

</details>

<details>
<summary><b>CI servers</b>, 5 tools</summary>

Self-hosted servers that run build and deployment pipelines.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Jenkins](https://github.com/jenkinsci/jenkins) | Java | MIT | [jenkins-2.583](https://github.com/jenkinsci/jenkins/releases/tag/jenkins-2.583) | 26589 | none |
| [Tekton](https://github.com/tektoncd/pipeline) | Go | Apache-2.0 | [v1.16.0](https://github.com/tektoncd/pipeline/releases/tag/v1.16.0) | 9070 | Jenkins (partial) |
| [Woodpecker CI](https://github.com/woodpecker-ci/woodpecker) | Go | Apache-2.0 | [v3.18.1](https://github.com/woodpecker-ci/woodpecker/releases/tag/v3.18.1) signed | 7909 | Jenkins (full), CircleCI (full) |
| [Concourse](https://github.com/concourse/concourse) | Go | Apache-2.0 | [v8.3.0](https://github.com/concourse/concourse/releases/tag/v8.3.0) signed | 7908 | Jenkins (full), CircleCI (full) |
| [GoCD](https://github.com/gocd/gocd) | Java | Apache-2.0 | [26.1.0](https://github.com/gocd/gocd/releases/tag/26.1.0) signed | 7433 | Jenkins (full) |

</details>

<details>
<summary><b>Git forges</b>, 4 tools</summary>

Self-hosted repositories, code review and issues.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Gitea](https://github.com/go-gitea/gitea) | Go | MIT | [v1.27.3](https://github.com/go-gitea/gitea/releases/tag/v1.27.3) signed | 58159 | GitLab (full), GitHub (full), Jenkins (partial), Bitbucket (full), Gogs (full) |
| [Gogs](https://github.com/gogs/gogs) | Go | MIT | [v0.14.3](https://github.com/gogs/gogs/releases/tag/v0.14.3) signed | 47834 | GitHub (partial), Bitbucket (partial) |
| [GitLab](https://github.com/gitlabhq/gitlabhq) | Ruby | Other | [v42.2.0-rc42](https://github.com/gitlabhq/gitlabhq/releases/tag/v42.2.0-rc42) | 24546 | GitHub (full), Jenkins (partial), Bitbucket (full) |
| [OneDev](https://github.com/theonedev/onedev) | Java | MIT | [v16.7.3](https://github.com/theonedev/onedev/releases/tag/v16.7.3) | 15259 | GitLab (full), GitHub (full), Jenkins (partial), Bitbucket (full) |

</details>

<details>
<summary><b>Password manager servers</b>, 3 tools</summary>

Self-hosted back ends for password vaults.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Vaultwarden](https://github.com/dani-garcia/vaultwarden) | Rust | AGPL-3.0 | [1.37.3](https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.3) signed | 68146 | Bitwarden server (drop-in), 1Password (full), LastPass (full) |
| [Bitwarden server](https://github.com/bitwarden/server) | C# | Other | [v2026.9.1](https://github.com/bitwarden/server/releases/tag/v2026.9.1) signed | 20198 | 1Password (full), LastPass (full) |
| [Passbolt](https://github.com/passbolt/passbolt_api) | PHP | AGPL-3.0 | [v5.16.0](https://github.com/passbolt/passbolt_api/releases/tag/v5.16.0) signed | 6138 | 1Password (full), LastPass (full) |

</details>

<details>
<summary><b>Web analytics</b>, 6 tools</summary>

Self-hostable, privacy-friendly site analytics.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [PostHog](https://github.com/PostHog/posthog) | Python | Other | [desktop-v0.61.566](https://github.com/PostHog/posthog/releases/tag/desktop-v0.61.566) | 39929 | Google Analytics (full), Mixpanel (full) |
| [Umami](https://github.com/umami-software/umami) | TypeScript | MIT | [v3.4.0](https://github.com/umami-software/umami/releases/tag/v3.4.0) signed | 39006 | Matomo (full), Google Analytics (partial) |
| [Plausible Analytics](https://github.com/plausible/analytics) | Elixir | AGPL-3.0 | [v3.2.1](https://github.com/plausible/analytics/releases/tag/v3.2.1) | 29214 | Matomo (full), Google Analytics (partial) |
| [Matomo](https://github.com/matomo-org/matomo) | PHP | GPL-3.0 | [5.14.0](https://github.com/matomo-org/matomo/releases/tag/5.14.0) | 21898 | Google Analytics (full) |
| [Rybbit](https://github.com/rybbit-io/rybbit) | TypeScript | AGPL-3.0 | [v2.9.0](https://github.com/rybbit-io/rybbit/releases/tag/v2.9.0) | 13064 | Google Analytics (full) |
| [GoatCounter](https://github.com/arp242/goatcounter) | Go | Other | [v2.7.0](https://github.com/arp242/goatcounter/releases/tag/v2.7.0) signed | 6003 | Google Analytics (partial) |

</details>

<details>
<summary><b>Uptime monitoring</b>, 7 tools</summary>

Check that services answer, alert when they do not, and publish a status page.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Uptime Kuma](https://github.com/louislam/uptime-kuma) | JavaScript | MIT | [2.5.5](https://github.com/louislam/uptime-kuma/releases/tag/2.5.5) signed | 91814 | Pingdom (full), Statuspage (full) |
| [Upptime](https://github.com/upptime/upptime) | Markdown | MIT | [v2.0.0](https://github.com/upptime/upptime/releases/tag/v2.0.0) signed | 17167 | Pingdom (partial), Statuspage (full) |
| [Gatus](https://github.com/TwiN/gatus) | Go | Apache-2.0 | [v5.37.0](https://github.com/TwiN/gatus/releases/tag/v5.37.0) signed | 12156 | Uptime Kuma (full), Pingdom (full), Statuspage (full) |
| [Checkmate](https://github.com/bluewave-labs/Checkmate) | TypeScript | AGPL-3.0 | [v3.12.0](https://github.com/bluewave-labs/Checkmate/releases/tag/v3.12.0) signed | 10889 | Pingdom (full), Statuspage (full) |
| [Healthchecks](https://github.com/healthchecks/healthchecks) | Python | BSD-3-Clause | [v4.4](https://github.com/healthchecks/healthchecks/releases/tag/v4.4) signed | 10365 | Cronitor (partial) |
| [OneUptime](https://github.com/OneUptime/oneuptime) | TypeScript | Other | [14.0.3](https://github.com/OneUptime/oneuptime/releases/tag/14.0.3) signed | 7655 | Pingdom (full), Statuspage (full) |
| [Kener](https://github.com/rajnandan1/kener) | TypeScript | MIT | [v4.1.5](https://github.com/rajnandan1/kener/releases/tag/v4.1.5) | 5178 | Statuspage (full) |

</details>

<details>
<summary><b>Log pipelines</b>, 5 tools</summary>

Collect, transform and ship logs and events.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Vector](https://github.com/vectordotdev/vector) | Rust | MPL-2.0 | [vdev-v0.3.24](https://github.com/vectordotdev/vector/releases/tag/vdev-v0.3.24) signed | 22613 | Logstash (full), Fluentd (full) |
| [Logstash](https://github.com/elastic/logstash) | Java | Other | [v9.5.4](https://github.com/elastic/logstash/releases/tag/v9.5.4) signed | 14951 | none |
| [Fluentd](https://github.com/fluent/fluentd) | Ruby | Apache-2.0 | [v1.19.3](https://github.com/fluent/fluentd/releases/tag/v1.19.3) | 13591 | none |
| [Fluent Bit](https://github.com/fluent/fluent-bit) | C | Apache-2.0 | [v5.1.2](https://github.com/fluent/fluent-bit/releases/tag/v5.1.2) | 8122 | Logstash (full), Fluentd (full) |
| [OpenTelemetry Collector](https://github.com/open-telemetry/opentelemetry-collector) | Go | Apache-2.0 | [v0.161.0](https://github.com/open-telemetry/opentelemetry-collector/releases/tag/v0.161.0) signed | 7596 | Logstash (partial), Fluentd (partial) |

</details>

<details>
<summary><b>Team chat</b>, 4 tools</summary>

Self-hosted messaging for teams.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Rocket.Chat](https://github.com/RocketChat/Rocket.Chat) | TypeScript | Other | [8.8.1](https://github.com/RocketChat/Rocket.Chat/releases/tag/8.8.1) | 46173 | Mattermost (full), Slack (full), Microsoft Teams (partial) |
| [Mattermost](https://github.com/mattermost/mattermost) | TypeScript | Other | [v11.11.1](https://github.com/mattermost/mattermost/releases/tag/v11.11.1) signed | 39184 | Slack (full), Microsoft Teams (partial) |
| [Zulip](https://github.com/zulip/zulip) | Python | Apache-2.0 | [12.3](https://github.com/zulip/zulip/releases/tag/12.3) | 25950 | Mattermost (full), Slack (full) |
| [Synapse](https://github.com/element-hq/synapse) | Python | AGPL-3.0 | [v1.161.0](https://github.com/element-hq/synapse/releases/tag/v1.161.0) signed | 4648 | Slack (partial), Microsoft Teams (partial) |

</details>

<details>
<summary><b>Terminal emulators</b>, 9 tools</summary>

Desktop terminal applications.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Windows Terminal](https://github.com/microsoft/terminal) | C++ | MIT | [v1.24.11911.0](https://github.com/microsoft/terminal/releases/tag/v1.24.11911.0) | 104994 | Warp (partial) |
| [Tabby](https://github.com/Eugeny/tabby) | TypeScript | MIT | [v1.0.237](https://github.com/Eugeny/tabby/releases/tag/v1.0.237) | 74676 | iTerm2 (full), Warp (partial) |
| [Alacritty](https://github.com/alacritty/alacritty) | Rust | Apache-2.0 | [v0.17.0](https://github.com/alacritty/alacritty/releases/tag/v0.17.0) signed | 65816 | iTerm2 (partial), Warp (partial) |
| [Ghostty](https://github.com/ghostty-org/ghostty) | Zig | MIT | [v1.3.1](https://github.com/ghostty-org/ghostty/releases/tag/v1.3.1) signed | 61537 | iTerm2 (full), Warp (partial) |
| [Hyper](https://github.com/vercel/hyper) | TypeScript | MIT | [v3.4.1](https://github.com/vercel/hyper/releases/tag/v3.4.1) | 44745 | iTerm2 (full), Warp (partial) |
| [kitty](https://github.com/kovidgoyal/kitty) | Python | GPL-3.0 | [v0.49.1](https://github.com/kovidgoyal/kitty/releases/tag/v0.49.1) signed | 35077 | iTerm2 (full), Warp (partial) |
| [WezTerm](https://github.com/wezterm/wezterm) | Rust | Other | [20240203-110809-5046fc22](https://github.com/wezterm/wezterm/releases/tag/20240203-110809-5046fc22) signed | 29027 | iTerm2 (full), Warp (partial), tmux (partial) |
| [Wave Terminal](https://github.com/wavetermdev/waveterm) | Go | Apache-2.0 | [v0.14.5](https://github.com/wavetermdev/waveterm/releases/tag/v0.14.5) signed | 22361 | Warp (full), iTerm2 (full) |
| [iTerm2](https://github.com/gnachman/iTerm2) | Objective-C | GPL-2.0 | [vv3.4.0beta13](https://github.com/gnachman/iTerm2/releases/tag/vv3.4.0beta13) | 18094 | none |

</details>

<details>
<summary><b>Code editors</b>, 12 tools</summary>

Editors for writing code.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Visual Studio Code](https://github.com/microsoft/vscode) | TypeScript | MIT | [1.139.1](https://github.com/microsoft/vscode/releases/tag/1.139.1) signed | 192889 | Atom (full) |
| [Neovim](https://github.com/neovim/neovim) | Vim Script | Other | [v0.12.5](https://github.com/neovim/neovim/releases/tag/v0.12.5) signed | 102572 | Vim (drop-in) |
| [Zed](https://github.com/zed-industries/zed) | Rust | Other | [v1.21.0](https://github.com/zed-industries/zed/releases/tag/v1.21.0) signed | 90875 | Visual Studio Code (full), Cursor (partial), Sublime Text (full), Atom (full) |
| [Atom](https://github.com/atom/atom) archived | JavaScript | MIT | [v1.60.0](https://github.com/atom/atom/releases/tag/v1.60.0) | 60728 | none |
| [Helix](https://github.com/helix-editor/helix) | Rust | MPL-2.0 | [25.07.1](https://github.com/helix-editor/helix/releases/tag/25.07.1) signed | 46328 | Vim (partial), Neovim (partial) |
| [Vim](https://github.com/vim/vim) | Vim Script | Vim | [v9.2.1129](https://github.com/vim/vim/releases/tag/v9.2.1129) signed | 40945 | none |
| [Lapce](https://github.com/lapce/lapce) | Rust | Apache-2.0 | [v0.4.6](https://github.com/lapce/lapce/releases/tag/v0.4.6) signed | 38871 | Visual Studio Code (partial) |
| [VSCodium](https://github.com/VSCodium/vscodium) | Shell | MIT | [1.135.06055](https://github.com/VSCodium/vscodium/releases/tag/1.135.06055) signed | 33393 | Visual Studio Code (drop-in) |
| [micro](https://github.com/micro-editor/micro) | Go | MIT | [v2.0.15](https://github.com/micro-editor/micro/releases/tag/v2.0.15) | 29639 | none |
| [Notepad++](https://github.com/notepad-plus-plus/notepad-plus-plus) | C++ | Other | [v8.9.8.1](https://github.com/notepad-plus-plus/notepad-plus-plus/releases/tag/v8.9.8.1) | 29411 | Sublime Text (partial) |
| [Kakoune](https://github.com/mawww/kakoune) | C++ | Unlicense | [v2026.05.21](https://github.com/mawww/kakoune/releases/tag/v2026.05.21) | 11071 | Vim (partial) |
| [Pulsar](https://github.com/pulsar-edit/pulsar) | JavaScript | Other | [v1.132.1](https://github.com/pulsar-edit/pulsar/releases/tag/v1.132.1) | 4160 | Atom (drop-in) |

</details>

<details>
<summary><b>File listing</b>, 5 tools</summary>

Replacements for ls with colours, icons and git status.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [exa](https://github.com/ogham/exa) | Rust | MIT | [v0.10.1](https://github.com/ogham/exa/releases/tag/v0.10.1) | 24443 | none |
| [eza](https://github.com/eza-community/eza) | Rust | EUPL-1.2 | [v0.23.5](https://github.com/eza-community/eza/releases/tag/v0.23.5) signed | 23369 | exa (drop-in) |
| [lsd](https://github.com/lsd-rs/lsd) | Rust | Apache-2.0 | [v1.2.0](https://github.com/lsd-rs/lsd/releases/tag/v1.2.0) signed | 16240 | exa (full) |
| [broot](https://github.com/Canop/broot) | Rust | MIT | [v1.60.1](https://github.com/Canop/broot/releases/tag/v1.60.1) | 12963 | exa (partial) |
| [colorls](https://github.com/athityakumar/colorls) | Ruby | MIT | [v1.5.0](https://github.com/athityakumar/colorls/releases/tag/v1.5.0) | 5140 | exa (full) |

</details>

<details>
<summary><b>Git diff pagers</b>, 4 tools</summary>

Make git diff output readable in a terminal.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [delta](https://github.com/dandavison/delta) | Rust | MIT | [0.19.2](https://github.com/dandavison/delta/releases/tag/0.19.2) | 32339 | diff-so-fancy (full) |
| [Difftastic](https://github.com/Wilfred/difftastic) | Rust | MIT | [0.71.0](https://github.com/Wilfred/difftastic/releases/tag/0.71.0) | 25933 | diff-so-fancy (partial) |
| [diff-so-fancy](https://github.com/so-fancy/diff-so-fancy) | Perl | MIT | [v1.4.12](https://github.com/so-fancy/diff-so-fancy/releases/tag/v1.4.12) | 18094 | none |
| [icdiff](https://github.com/jeffkaufman/icdiff) | Python | Other | [release-2.0.10](https://github.com/jeffkaufman/icdiff/releases/tag/release-2.0.10) | 4389 | diff-so-fancy (partial) |

</details>

<details>
<summary><b>JSON processors</b>, 5 tools</summary>

Query and transform JSON from the command line.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [jq](https://github.com/jqlang/jq) | C | Other | [jq-1.8.2](https://github.com/jqlang/jq/releases/tag/jq-1.8.2) signed | 35689 | none |
| [fx](https://github.com/antonmedv/fx) | Go | MIT | [39.2.0](https://github.com/antonmedv/fx/releases/tag/39.2.0) signed | 20641 | jq (partial) |
| [yq](https://github.com/mikefarah/yq) | Go | MIT | [v4.53.6](https://github.com/mikefarah/yq/releases/tag/v4.53.6) signed | 16010 | jq (partial) |
| [gojq](https://github.com/itchyny/gojq) | Go | MIT | [v0.12.19](https://github.com/itchyny/gojq/releases/tag/v0.12.19) | 3807 | jq (drop-in) |
| [jaq](https://github.com/01mf02/jaq) | Rust | MIT | [v3.1.1](https://github.com/01mf02/jaq/releases/tag/v3.1.1) | 3775 | jq (full) |

</details>

<details>
<summary><b>Load testing</b>, 6 tools</summary>

Generate traffic to measure how a service holds up.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [k6](https://github.com/grafana/k6) | Go | AGPL-3.0 | [v2.3.0](https://github.com/grafana/k6/releases/tag/v2.3.0) | 31578 | Apache JMeter (full), Gatling (full) |
| [Locust](https://github.com/locustio/locust) | Python | MIT | [2.46.6](https://github.com/locustio/locust/releases/tag/2.46.6) signed | 28183 | Apache JMeter (full), Gatling (full) |
| [Vegeta](https://github.com/tsenart/vegeta) | Go | MIT | [v12.13.0](https://github.com/tsenart/vegeta/releases/tag/v12.13.0) | 25202 | Apache JMeter (partial) |
| [Apache JMeter](https://github.com/apache/jmeter) | Java | Apache-2.0 | [rel/v5.6.3](https://github.com/apache/jmeter/releases/tag/rel/v5.6.3) | 9544 | none |
| [Artillery](https://github.com/artilleryio/artillery) | TypeScript | MPL-2.0 | [artillery-2.0.34](https://github.com/artilleryio/artillery/releases/tag/artillery-2.0.34) signed | 9083 | Apache JMeter (full), Gatling (full) |
| [Gatling](https://github.com/gatling/gatling) | Scala | Apache-2.0 | [v3.15.1](https://github.com/gatling/gatling/releases/tag/v3.15.1) | 6958 | none |

</details>

<details>
<summary><b>Browser automation and testing</b>, 7 tools</summary>

Drive real browsers for end-to-end tests.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Playwright](https://github.com/microsoft/playwright) | TypeScript | Apache-2.0 | [v1.63.0](https://github.com/microsoft/playwright/releases/tag/v1.63.0) signed | 96665 | Selenium (full), Puppeteer (full), Cypress (full) |
| [Puppeteer](https://github.com/puppeteer/puppeteer) | TypeScript | Apache-2.0 | [browsers-v3.2.3](https://github.com/puppeteer/puppeteer/releases/tag/browsers-v3.2.3) signed | 95622 | none |
| [Cypress](https://github.com/cypress-io/cypress) | TypeScript | MIT | [v16.1.0](https://github.com/cypress-io/cypress/releases/tag/v16.1.0) | 51025 | Selenium (partial) |
| [Selenium](https://github.com/SeleniumHQ/selenium) | Java | Apache-2.0 | [selenium-4.49.0](https://github.com/SeleniumHQ/selenium/releases/tag/selenium-4.49.0) signed | 34513 | none |
| [Nightwatch](https://github.com/nightwatchjs/nightwatch) | JavaScript | MIT | [v3.16.0](https://github.com/nightwatchjs/nightwatch/releases/tag/v3.16.0) | 11953 | Cypress (full) |
| [TestCafe](https://github.com/DevExpress/testcafe) | JavaScript | MIT | [v3.7.6](https://github.com/DevExpress/testcafe/releases/tag/v3.7.6) signed | 9906 | Selenium (partial) |
| [WebdriverIO](https://github.com/webdriverio/webdriverio) | TypeScript | MIT | [v9.32.0](https://github.com/webdriverio/webdriverio/releases/tag/v9.32.0) | 9841 | Selenium (full) |

</details>

<details>
<summary><b>Python web frameworks</b>, 8 tools</summary>

Build HTTP APIs and sites in Python.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [FastAPI](https://github.com/fastapi/fastapi) | Python | MIT | [0.141.1](https://github.com/fastapi/fastapi/releases/tag/0.141.1) signed | 102608 | Flask (full), Django REST framework (partial) |
| [Django](https://github.com/django/django) | Python | BSD-3-Clause | [stable/5.1.x](https://github.com/django/django/releases/tag/stable/5.1.x) signed | 91180 | none |
| [Flask](https://github.com/pallets/flask) | Python | BSD-3-Clause | [3.1.3](https://github.com/pallets/flask/releases/tag/3.1.3) signed | 74777 | none |
| [Django REST framework](https://github.com/encode/django-rest-framework) | Python | Other | [3.18.1](https://github.com/encode/django-rest-framework/releases/tag/3.18.1) signed | 30191 | none |
| [Tornado](https://github.com/tornadoweb/tornado) | Python | Apache-2.0 | [v6.6.0a1](https://github.com/tornadoweb/tornado/releases/tag/v6.6.0a1) | 22178 | none |
| [Sanic](https://github.com/sanic-org/sanic) | Python | MIT | [v25.12.1](https://github.com/sanic-org/sanic/releases/tag/v25.12.1) signed | 18636 | Flask (full) |
| [Starlette](https://github.com/Kludex/starlette) | Python | BSD-3-Clause | [1.7.0](https://github.com/Kludex/starlette/releases/tag/1.7.0) signed | 12633 | Flask (partial) |
| [Litestar](https://github.com/litestar-org/litestar) | Python | MIT | [v2.24.0](https://github.com/litestar-org/litestar/releases/tag/v2.24.0) | 8481 | Flask (full), Django REST framework (partial) |

</details>

<details>
<summary><b>Python HTTP clients</b>, 5 tools</summary>

Send HTTP requests from Python.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Requests](https://github.com/psf/requests) | Python | Apache-2.0 | [v2.34.2](https://github.com/psf/requests/releases/tag/v2.34.2) signed | 54343 | none |
| [aiohttp](https://github.com/aio-libs/aiohttp) | Python | Apache-2.0 | [v3.14.3](https://github.com/aio-libs/aiohttp/releases/tag/v3.14.3) | 16561 | none |
| [HTTPX](https://github.com/encode/httpx) | Python | BSD-3-Clause | [0.28.1](https://github.com/encode/httpx/releases/tag/0.28.1) signed | 15509 | Requests (full), aiohttp (partial) |
| [curl_cffi](https://github.com/lexiforest/curl_cffi) | Python | MIT | [v0.16.4b1](https://github.com/lexiforest/curl_cffi/releases/tag/v0.16.4b1) signed | 6561 | Requests (full) |
| [urllib3](https://github.com/urllib3/urllib3) | Python | MIT | [2.8.0](https://github.com/urllib3/urllib3/releases/tag/2.8.0) signed | 4062 | none |

</details>

<details>
<summary><b>JavaScript date libraries</b>, 4 tools</summary>

Parse, format and compute dates in JavaScript.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Day.js](https://github.com/iamkun/dayjs) | JavaScript | MIT | [v1.11.23](https://github.com/iamkun/dayjs/releases/tag/v1.11.23) | 48667 | Moment.js (drop-in) |
| [Moment.js](https://github.com/moment/moment) | JavaScript | MIT | [2.31.0](https://github.com/moment/moment/releases/tag/2.31.0) signed | 47908 | none |
| [date-fns](https://github.com/date-fns/date-fns) | TypeScript | none | [v4.4.0](https://github.com/date-fns/date-fns/releases/tag/v4.4.0) signed | 36646 | Moment.js (full) |
| [Luxon](https://github.com/moment/luxon) | JavaScript | MIT | [3.7.2](https://github.com/moment/luxon/releases/tag/3.7.2) | 16461 | Moment.js (full) |

</details>

<details>
<summary><b>Local Kubernetes</b>, 5 tools</summary>

Run a Kubernetes cluster on a laptop or in CI.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [K3s](https://github.com/k3s-io/k3s) | Go | Apache-2.0 | [v1.37.0+k3s1](https://github.com/k3s-io/k3s/releases/tag/v1.37.0%2Bk3s1) | 34035 | minikube (full) |
| [minikube](https://github.com/kubernetes/minikube) | Go | Apache-2.0 | [v1.39.0](https://github.com/kubernetes/minikube/releases/tag/v1.39.0) | 32155 | none |
| [kind](https://github.com/kubernetes-sigs/kind) | Go | Apache-2.0 | [v0.33.0](https://github.com/kubernetes-sigs/kind/releases/tag/v0.33.0) signed | 15508 | minikube (full) |
| [MicroK8s](https://github.com/canonical/microk8s) | Python | Apache-2.0 | [v1.36](https://github.com/canonical/microk8s/releases/tag/v1.36) signed | 9374 | minikube (full) |
| [k3d](https://github.com/k3d-io/k3d) | Go | MIT | [v5.9.0](https://github.com/k3d-io/k3d/releases/tag/v5.9.0) | 6568 | minikube (full) |

</details>

<details>
<summary><b>Secrets managers</b>, 3 tools</summary>

Store, rotate and hand out secrets to applications.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [HashiCorp Vault](https://github.com/hashicorp/vault) | Go | Other | [v2.1.1](https://github.com/hashicorp/vault/releases/tag/v2.1.1) signed | 36294 | none |
| [Infisical](https://github.com/Infisical/infisical) | TypeScript | Other | [v0.165.16](https://github.com/Infisical/infisical/releases/tag/v0.165.16) signed | 29427 | HashiCorp Vault (partial), Doppler (full) |
| [OpenBao](https://github.com/openbao/openbao) | Go | MPL-2.0 | [v2.7.0](https://github.com/openbao/openbao/releases/tag/v2.7.0) signed | 7566 | HashiCorp Vault (drop-in) |

</details>

<details>
<summary><b>Git LFS servers</b>, 4 tools</summary>

Serve Git LFS objects for repositories hosted anywhere.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [lfs-test-server](https://github.com/git-lfs/lfs-test-server) | Go | MIT | [v0.4.0](https://github.com/git-lfs/lfs-test-server/releases/tag/v0.4.0) | 792 | none |
| [Rudolfs](https://github.com/jasonwhite/rudolfs) | Rust | MIT | [0.3.8](https://github.com/jasonwhite/rudolfs/releases/tag/0.3.8) | 523 | lfs-test-server (full) |
| [Giftless](https://github.com/datopian/giftless) | Python | MIT | [v0.6.2](https://github.com/datopian/giftless/releases/tag/v0.6.2) signed | 182 | lfs-test-server (full) |
| [LFSX](https://github.com/FerrLabs/LFSX) verified | Rust | MPL-2.0 | [site@2026.9.18](https://github.com/FerrLabs/LFSX/releases/tag/site%402026.9.18) signed | 1 | lfs-test-server (full) |

</details>

<details>
<summary><b>Minecraft servers</b>, 8 tools</summary>

Server software for Minecraft: Java Edition, from forks of the Bukkit line to implementations written from scratch.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Paper](https://github.com/PaperMC/Paper) | Java | Other | [26.2](https://github.com/PaperMC/Paper/releases/tag/26.2) | 12683 | none |
| [Pumpkin](https://github.com/Pumpkin-MC/Pumpkin) | Rust | GPL-3.0 | [0.2.0+26.3-26.51](https://github.com/Pumpkin-MC/Pumpkin/releases/tag/0.2.0%2B26.3-26.51) | 11344 | Paper (partial) |
| [Cuberite](https://github.com/cuberite/cuberite) | C++ | Other | [1.7EOL](https://github.com/cuberite/cuberite/releases/tag/1.7EOL) | 5448 | Paper (partial) |
| [Folia](https://github.com/PaperMC/Folia) | Shell | GPL-3.0 | none | 4373 | Paper (partial) |
| [Minestom](https://github.com/Minestom/Minestom) | Java | Apache-2.0 | [2026.09.12-26.2](https://github.com/Minestom/Minestom/releases/tag/2026.09.12-26.2) signed | 3284 | Paper (partial) |
| [Purpur](https://github.com/PurpurMC/Purpur) | Java | MIT | [1.20.6](https://github.com/PurpurMC/Purpur/releases/tag/1.20.6) signed | 2414 | Paper (drop-in) |
| [Glowstone](https://github.com/GlowstoneMC/Glowstone) | Java | Other | [2021.8.0](https://github.com/GlowstoneMC/Glowstone/releases/tag/2021.8.0) signed | 2008 | Paper (partial) |
| [SteelMC](https://github.com/Steel-Foundation/SteelMC) | Rust | AGPL-3.0 | [v0.15.3+mc26.2](https://github.com/Steel-Foundation/SteelMC/releases/tag/v0.15.3%2Bmc26.2) signed | 699 | Paper (partial) |

</details>

<details>
<summary><b>File sync and share</b>, 6 tools</summary>

Self-hosted storage for files you reach from more than one machine, over WebDAV or a sync client.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Syncthing](https://github.com/syncthing/syncthing) | Go | MPL-2.0 | [v2.1.5](https://github.com/syncthing/syncthing/releases/tag/v2.1.5) | 88917 | Dropbox (partial), Google Drive (partial) |
| [Nextcloud](https://github.com/nextcloud/server) | PHP | AGPL-3.0 | [v35.0.1](https://github.com/nextcloud/server/releases/tag/v35.0.1) | 36918 | Dropbox (full), Google Drive (full) |
| [Cloudreve](https://github.com/cloudreve/cloudreve) | Go | GPL-3.0 | [4.19.1](https://github.com/cloudreve/cloudreve/releases/tag/4.19.1) | 28760 | Dropbox (partial), Google Drive (partial) |
| [Seafile](https://github.com/haiwen/seafile) | C | Other | [v9.0.5](https://github.com/haiwen/seafile/releases/tag/v9.0.5) | 15277 | Dropbox (full), Nextcloud (partial) |
| [ownCloud Infinite Scale](https://github.com/owncloud/ocis) | Go | Apache-2.0 | [v8.2.0](https://github.com/owncloud/ocis/releases/tag/v8.2.0) signed | 2128 | Nextcloud (partial), Dropbox (full), Google Drive (partial) |
| [RoxyCloud](https://github.com/FerrLabs/RoxyCloud) verified | Rust | AGPL-3.0 | [v0.32.0](https://github.com/FerrLabs/RoxyCloud/releases/tag/v0.32.0) | 0 | Nextcloud (partial) |

</details>

<details>
<summary><b>AI coding agents</b>, 10 tools</summary>

Agents that read a codebase, edit files and run commands from a prompt, in the terminal or the editor.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [OpenCode](https://github.com/anomalyco/opencode) | TypeScript | MIT | [v1.18.32](https://github.com/anomalyco/opencode/releases/tag/v1.18.32) | 209988 | Claude Code (full), GitHub Copilot (partial), Cursor (partial) |
| [Codex CLI](https://github.com/openai/codex) | Rust | Apache-2.0 | [rust-v0.157.0](https://github.com/openai/codex/releases/tag/rust-v0.157.0) | 126425 | Claude Code (full), GitHub Copilot (partial) |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) | TypeScript | Apache-2.0 | [v0.61.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.61.0) | 107162 | Claude Code (full), GitHub Copilot (partial) |
| [OpenHands](https://github.com/OpenHands/OpenHands) | TypeScript | MIT | [v1.23.0](https://github.com/OpenHands/OpenHands/releases/tag/v1.23.0) signed | 89144 | Claude Code (full), GitHub Copilot (partial) |
| [Cline](https://github.com/cline/cline) | TypeScript | Apache-2.0 | [desktop-v0.0.36](https://github.com/cline/cline/releases/tag/desktop-v0.0.36) | 69288 | Claude Code (partial), GitHub Copilot (partial), Cursor (partial) |
| [goose](https://github.com/aaif-goose/goose) | Rust | Apache-2.0 | [v1.52.0](https://github.com/aaif-goose/goose/releases/tag/v1.52.0) | 54641 | Claude Code (full), GitHub Copilot (partial) |
| [Aider](https://github.com/Aider-AI/aider) | Python | Apache-2.0 | [v0.86.0](https://github.com/Aider-AI/aider/releases/tag/v0.86.0) | 49180 | Claude Code (partial), GitHub Copilot (partial) |
| [Crush](https://github.com/charmbracelet/crush) | Go | Other | [v0.96.1](https://github.com/charmbracelet/crush/releases/tag/v0.96.1) signed | 28297 | Claude Code (full), GitHub Copilot (partial) |
| [Qwen Code](https://github.com/QwenLM/qwen-code) | TypeScript | Apache-2.0 | [sdk-typescript-v0.1.15](https://github.com/QwenLM/qwen-code/releases/tag/sdk-typescript-v0.1.15) | 28130 | Claude Code (full), GitHub Copilot (partial) |
| [SWE-agent](https://github.com/SWE-agent/SWE-agent) | Python | MIT | [v1.1.0](https://github.com/SWE-agent/SWE-agent/releases/tag/v1.1.0) signed | 20405 | Claude Code (partial) |

</details>

<details>
<summary><b>AI code assistants</b>, 5 tools</summary>

Completions and chat inside the editor, backed by a hosted or a local model.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Continue](https://github.com/continuedev/continue) | TypeScript | Apache-2.0 | [v2.0.0-vscode](https://github.com/continuedev/continue/releases/tag/v2.0.0-vscode) | 36022 | GitHub Copilot (full), Cursor (partial) |
| [Tabby](https://github.com/TabbyML/tabby) | Rust | Other | [v0.32.0](https://github.com/TabbyML/tabby/releases/tag/v0.32.0) | 33893 | GitHub Copilot (full) |
| [avante.nvim](https://github.com/avante-corp/avante.nvim) | Lua | Apache-2.0 | [v0.3.1](https://github.com/avante-corp/avante.nvim/releases/tag/v0.3.1) | 18173 | Cursor (partial), GitHub Copilot (partial) |
| [CodeCompanion.nvim](https://github.com/olimorris/codecompanion.nvim) | Lua | Apache-2.0 | [v19.25.0](https://github.com/olimorris/codecompanion.nvim/releases/tag/v19.25.0) signed | 6874 | GitHub Copilot (partial) |
| [twinny](https://github.com/twinnydotdev/twinny) | TypeScript | MIT | [v4.0.20](https://github.com/twinnydotdev/twinny/releases/tag/v4.0.20) | 3651 | GitHub Copilot (full) |

</details>

<details>
<summary><b>AI chat interfaces</b>, 10 tools</summary>

Apps to chat with language models, whether the model runs locally or behind an API.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Open WebUI](https://github.com/open-webui/open-webui) | Python | Other | [v0.11.4](https://github.com/open-webui/open-webui/releases/tag/v0.11.4) signed | 153144 | ChatGPT (partial), Claude (partial) |
| [NextChat](https://github.com/ChatGPTNextWeb/NextChat) | TypeScript | MIT | [v2.16.1](https://github.com/ChatGPTNextWeb/NextChat/releases/tag/v2.16.1) | 88811 | ChatGPT (partial), Claude (partial) |
| [LobeHub](https://github.com/lobehub/lobehub) | TypeScript | Other | [v2.2.18](https://github.com/lobehub/lobehub/releases/tag/v2.2.18) signed | 82819 | ChatGPT (partial), Claude (partial) |
| [AnythingLLM](https://github.com/Mintplex-Labs/anything-llm) | JavaScript | MIT | [v1.16.2](https://github.com/Mintplex-Labs/anything-llm/releases/tag/v1.16.2) | 66460 | ChatGPT (partial), Claude (partial) |
| [Cherry Studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | AGPL-3.0 | [v2.1.3](https://github.com/CherryHQ/cherry-studio/releases/tag/v2.1.3) signed | 52145 | ChatGPT (partial), Claude (partial) |
| [TextGen](https://github.com/oobabooga/textgen) | Python | AGPL-3.0 | [v4.9](https://github.com/oobabooga/textgen/releases/tag/v4.9) | 47711 | ChatGPT (partial), Claude (partial) |
| [LibreChat](https://github.com/danny-avila/LibreChat) | TypeScript | MIT | [v0.8.8-rc4](https://github.com/LibreChat-AI/LibreChat/releases/tag/v0.8.8-rc4) signed | 44937 | ChatGPT (partial), Claude (partial) |
| [Jan](https://github.com/janhq/jan) | Rust | Other | [v0.8.4](https://github.com/janhq/jan/releases/tag/v0.8.4) signed | 44647 | ChatGPT (partial), Claude (partial) |
| [Chatbox](https://github.com/chatboxai/chatbox) | TypeScript | GPL-3.0 | [v1.23.5](https://github.com/chatboxai/chatbox/releases/tag/v1.23.5) signed | 41859 | ChatGPT (partial), Claude (partial) |
| [SillyTavern](https://github.com/SillyTavern/SillyTavern) | JavaScript | AGPL-3.0 | [1.19.0](https://github.com/SillyTavern/SillyTavern/releases/tag/1.19.0) signed | 33762 | ChatGPT (partial) |

</details>

<details>
<summary><b>Local model runtimes</b>, 8 tools</summary>

Run open-weight language models on your own hardware, behind a local API.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Ollama](https://github.com/ollama/ollama) | Go | MIT | [v0.34.4](https://github.com/ollama/ollama/releases/tag/v0.34.4) | 181689 | ChatGPT (partial), Claude (partial) |
| [llama.cpp](https://github.com/ggml-org/llama.cpp) | C++ | MIT | [v0.5.0](https://github.com/ggml-org/llama.cpp/releases/tag/v0.5.0) | 129490 | ChatGPT (partial), Claude (partial) |
| [vLLM](https://github.com/vllm-project/vllm) | Python | Apache-2.0 | [v0.30.0](https://github.com/vllm-project/vllm/releases/tag/v0.30.0) | 92668 | ChatGPT (partial), Claude (partial) |
| [LocalAI](https://github.com/mudler/LocalAI) | Go | MIT | [v4.10.0](https://github.com/mudler/LocalAI/releases/tag/v4.10.0) signed | 49268 | ChatGPT (partial), Claude (partial) |
| [exo](https://github.com/exo-explore/exo) | Python | Apache-2.0 | [v1.0.71](https://github.com/exo-explore/exo/releases/tag/v1.0.71) signed | 47639 | Ollama (partial) |
| [SGLang](https://github.com/sgl-project/sglang) | Python | Apache-2.0 | [v0.5.20](https://github.com/sgl-project/sglang/releases/tag/v0.5.20) | 36426 | vLLM (full), ChatGPT (partial), Claude (partial) |
| [llamafile](https://github.com/mozilla-ai/llamafile) | C++ | Other | [0.10.6](https://github.com/mozilla-ai/llamafile/releases/tag/0.10.6) signed | 26060 | Ollama (partial) |
| [MLC LLM](https://github.com/mlc-ai/mlc-llm) | Python | Apache-2.0 | [v0.26.dev0](https://github.com/mlc-ai/mlc-llm/releases/tag/v0.26.dev0) signed | 23192 | Ollama (partial) |

</details>

<details>
<summary><b>Container desktops</b>, 4 tools</summary>

Run containers and a local Kubernetes on a laptop, with the engine managed for you.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Colima](https://github.com/abiosoft/colima) | Go | MIT | [v0.10.3](https://github.com/abiosoft/colima/releases/tag/v0.10.3) signed | 30990 | Docker Desktop (partial), OrbStack (partial) |
| [Lima](https://github.com/lima-vm/lima) | Go | Apache-2.0 | [v2.2.0](https://github.com/lima-vm/lima/releases/tag/v2.2.0) signed | 21969 | Docker Desktop (partial), OrbStack (partial) |
| [Podman Desktop](https://github.com/podman-desktop/podman-desktop) | TypeScript | Apache-2.0 | [v1.29.3](https://github.com/podman-desktop/podman-desktop/releases/tag/v1.29.3) | 8027 | Docker Desktop (full), OrbStack (partial) |
| [Rancher Desktop](https://github.com/rancher-sandbox/rancher-desktop) | TypeScript | Apache-2.0 | [v1.24.0](https://github.com/rancher-sandbox/rancher-desktop/releases/tag/v1.24.0) signed | 7359 | Docker Desktop (full), OrbStack (partial) |

</details>

<details>
<summary><b>Dashboards</b>, 4 tools</summary>

Build dashboards and explore metrics, logs and traces from a web UI.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Grafana](https://github.com/grafana/grafana) | TypeScript | AGPL-3.0 | [v13.2.2](https://github.com/grafana/grafana/releases/tag/v13.2.2) | 76905 | Kibana (partial), Datadog (partial), Splunk (partial) |
| [Kibana](https://github.com/elastic/kibana) | TypeScript | Other | [v9.5.4](https://github.com/elastic/kibana/releases/tag/v9.5.4) signed | 21301 | none |
| [Perses](https://github.com/perses/perses) | Go | Apache-2.0 | [v0.54.0](https://github.com/perses/perses/releases/tag/v0.54.0) signed | 2453 | Grafana (partial) |
| [OpenSearch Dashboards](https://github.com/opensearch-project/OpenSearch-Dashboards) | TypeScript | Apache-2.0 | [3.8.0](https://github.com/opensearch-project/OpenSearch-Dashboards/releases/tag/3.8.0) signed | 2132 | Kibana (full) |

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
<summary><b>Distributed SQL databases</b>, 4 tools</summary>

SQL databases that spread data across nodes and speak the PostgreSQL wire protocol.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [CockroachDB](https://github.com/cockroachdb/cockroach) | Go | Other | [v26.2.7](https://github.com/cockroachdb/cockroach/releases/tag/v26.2.7) signed | 32499 | none |
| [Citus](https://github.com/citusdata/citus) | C | AGPL-3.0 | [v14.2.0](https://github.com/citusdata/citus/releases/tag/v14.2.0) signed | 12786 | none |
| [YugabyteDB](https://github.com/yugabyte/yugabyte-db) | C | Other | [v2026.1.2.0](https://github.com/yugabyte/yugabyte-db/releases/tag/v2026.1.2.0) | 10558 | CockroachDB (full) |
| [PgDog](https://github.com/pgdogdev/pgdog) | Rust | AGPL-3.0 | [v0.1.60](https://github.com/pgdogdev/pgdog/releases/tag/v0.1.60) signed | 5523 | Citus (partial) |

</details>

<details>
<summary><b>Error tracking</b>, 5 tools</summary>

Collect exceptions from applications through an SDK and group them into issues.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Sentry](https://github.com/getsentry/sentry) | Python | Other | [26.9.0](https://github.com/getsentry/sentry/releases/tag/26.9.0) | 44839 | none |
| [Highlight](https://github.com/highlight/highlight) | TypeScript | Other | [docker-v0.5.6](https://github.com/highlight/highlight/releases/tag/docker-v0.5.6) signed | 9377 | Sentry (full) |
| [Errbit](https://github.com/errbit/errbit) | Ruby | MIT | [v0.11.5](https://github.com/errbit/errbit/releases/tag/v0.11.5) signed | 4268 | Airbrake (drop-in) |
| [Exceptionless](https://github.com/exceptionless/Exceptionless) | C# | Apache-2.0 | [v8.9.0](https://github.com/exceptionless/Exceptionless/releases/tag/v8.9.0) signed | 2456 | Sentry (partial) |
| [Bugsink](https://github.com/bugsink/bugsink) | Python | Other | [2.6.1](https://github.com/bugsink/bugsink/releases/tag/2.6.1) | 2092 | Sentry (partial) |

</details>

<details>
<summary><b>Distributed tracing</b>, 6 tools</summary>

Collect and search traces of requests as they cross services.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [SigNoz](https://github.com/SigNoz/signoz) | TypeScript | Other | [v0.143.0](https://github.com/SigNoz/signoz/releases/tag/v0.143.0) signed | 32192 | Datadog (full), New Relic (full) |
| [Apache SkyWalking](https://github.com/apache/skywalking) | Java | Apache-2.0 | [v11.0.0](https://github.com/apache/skywalking/releases/tag/v11.0.0) | 24961 | New Relic (partial) |
| [Jaeger](https://github.com/jaegertracing/jaeger) | Go | Apache-2.0 | [v2.21.0](https://github.com/jaegertracing/jaeger/releases/tag/v2.21.0) signed | 23238 | Zipkin (full) |
| [Zipkin](https://github.com/openzipkin/zipkin) | Java | Apache-2.0 | [3.6.1](https://github.com/openzipkin/zipkin/releases/tag/3.6.1) | 17465 | none |
| [Pinpoint](https://github.com/pinpoint-apm/pinpoint) | Java | Apache-2.0 | [v3.1.0](https://github.com/pinpoint-apm/pinpoint/releases/tag/v3.1.0) | 13872 | New Relic (partial) |
| [Grafana Tempo](https://github.com/grafana/tempo) | Go | AGPL-3.0 | [v3.0.3](https://github.com/grafana/tempo/releases/tag/v3.0.3) signed | 5488 | Zipkin (full) |

</details>

<details>
<summary><b>Time-series databases</b>, 5 tools</summary>

Store and query timestamped measurements at high write rates.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [InfluxDB](https://github.com/influxdata/influxdb) | Rust | Apache-2.0 | [v3.11.4](https://github.com/influxdata/influxdb/releases/tag/v3.11.4) | 31759 | none |
| [TDengine](https://github.com/taosdata/TDengine) | C | AGPL-3.0 | [ver-3.4.1.6](https://github.com/taosdata/TDengine/releases/tag/ver-3.4.1.6) | 25146 | InfluxDB (full) |
| [TimescaleDB](https://github.com/timescale/timescaledb) | C | Other | [2.30.1](https://github.com/timescale/timescaledb/releases/tag/2.30.1) signed | 23589 | InfluxDB (full) |
| [QuestDB](https://github.com/questdb/questdb) | Java | Apache-2.0 | [10.0.1](https://github.com/questdb/questdb/releases/tag/10.0.1) | 17351 | InfluxDB (full) |
| [GreptimeDB](https://github.com/GreptimeTeam/greptimedb) | Rust | Apache-2.0 | [v1.2.1](https://github.com/GreptimeTeam/greptimedb/releases/tag/v1.2.1) | 6711 | InfluxDB (full) |

</details>

<details>
<summary><b>Encrypted files in git</b>, 4 tools</summary>

Keep secrets in a repository, encrypted, and decrypted only by the people and machines allowed to.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [SOPS](https://github.com/getsops/sops) | Go | MPL-2.0 | [v3.13.3](https://github.com/getsops/sops/releases/tag/v3.13.3) signed | 23215 | git-crypt (full) |
| [git-crypt](https://github.com/AGWA/git-crypt) | C++ | GPL-3.0 | [0.8.0](https://github.com/AGWA/git-crypt/releases/tag/0.8.0) | 9934 | none |
| [git-secret](https://github.com/sobolevn/git-secret) | Shell | MIT | [v0.5.0](https://github.com/sobolevn/git-secret/releases/tag/v0.5.0) | 4047 | git-crypt (partial) |
| [transcrypt](https://github.com/elasticdog/transcrypt) | Shell | MIT | [v2.3.2](https://github.com/elasticdog/transcrypt/releases/tag/v2.3.2) signed | 1710 | git-crypt (full) |

</details>

<details>
<summary><b>Log storage</b>, 5 tools</summary>

Store logs at volume and search them, the back end behind log dashboards.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Loki](https://github.com/grafana/loki) | Go | AGPL-3.0 | [v3.7.8](https://github.com/grafana/loki/releases/tag/v3.7.8) signed | 28944 | Elasticsearch (partial), Splunk (partial), Datadog (partial) |
| [OpenObserve](https://github.com/openobserve/openobserve) | TypeScript | AGPL-3.0 | [v1.0.4](https://github.com/openobserve/openobserve/releases/tag/v1.0.4) | 22126 | Elasticsearch (partial), Splunk (partial), Datadog (partial) |
| [Quickwit](https://github.com/quickwit-oss/quickwit) | Rust | Apache-2.0 | [v0.9.1](https://github.com/quickwit-oss/quickwit/releases/tag/v0.9.1) signed | 11675 | Elasticsearch (partial), Splunk (partial) |
| [Graylog](https://github.com/Graylog2/graylog2-server) | Java | Other | [v0.20.0-rc.1-1](https://github.com/Graylog2/graylog2-server/releases/tag/v0.20.0-rc.1-1) | 8146 | Splunk (full) |
| [VictoriaLogs](https://github.com/VictoriaMetrics/VictoriaLogs) | Go | Apache-2.0 | [v1.52.0](https://github.com/VictoriaMetrics/VictoriaLogs/releases/tag/v1.52.0) signed | 2316 | Elasticsearch (partial), Loki (full), Splunk (partial) |

</details>

<details>
<summary><b>Relational databases</b>, 7 tools</summary>

General-purpose SQL databases.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [TiDB](https://github.com/pingcap/tidb) | Go | Apache-2.0 | [v7.5.8](https://github.com/pingcap/tidb/releases/tag/v7.5.8) signed | 40587 | MySQL (full) |
| [Dolt](https://github.com/dolthub/dolt) | Go | Apache-2.0 | [v2.3.5](https://github.com/dolthub/dolt/releases/tag/v2.3.5) | 24512 | MySQL (full) |
| [PostgreSQL](https://github.com/postgres/postgres) | C | Other | [release-6-3](https://github.com/postgres/postgres/releases/tag/release-6-3) | 22192 | MySQL (full), Oracle Database (full) |
| [rqlite](https://github.com/rqlite/rqlite) | Go | MIT | [v10.3.6](https://github.com/rqlite/rqlite/releases/tag/v10.3.6) signed | 17766 | SQLite (partial) |
| [MySQL](https://github.com/mysql/mysql-server) | C++ | Other | [mysql-cluster-26.7.0](https://github.com/mysql/mysql-server/releases/tag/mysql-cluster-26.7.0) | 12438 | none |
| [SQLite](https://github.com/sqlite/sqlite) | C | Other | [vesion-3.45.1](https://github.com/sqlite/sqlite/releases/tag/vesion-3.45.1) | 10541 | none |
| [MariaDB](https://github.com/MariaDB/server) | C++ | GPL-2.0 | [mariadb-13.0.2](https://github.com/MariaDB/server/releases/tag/mariadb-13.0.2) | 8278 | MySQL (full), Oracle Database (partial) |

</details>

<details>
<summary><b>Configuration management</b>, 6 tools</summary>

Describe the state of servers in code and converge them to it.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Ansible](https://github.com/ansible/ansible) | Python | GPL-3.0 | [v2.21.4](https://github.com/ansible/ansible/releases/tag/v2.21.4) signed | 70787 | none |
| [Salt](https://github.com/saltstack/salt) | Python | Apache-2.0 | [v3008.1-2](https://github.com/saltstack/salt/releases/tag/v3008.1-2) signed | 15675 | Puppet (full), Chef (full), Ansible (full) |
| [Chef](https://github.com/chef/chef) | Ruby | Apache-2.0 | [v15.8.23](https://github.com/chef/chef/releases/tag/v15.8.23) | 8243 | none |
| [Puppet](https://github.com/puppetlabs/puppet) | Ruby | Apache-2.0 | [7.34.0](https://github.com/puppetlabs/puppet/releases/tag/7.34.0) | 7935 | none |
| [pyinfra](https://github.com/pyinfra-dev/pyinfra) | Python | MIT | [v3.10.0](https://github.com/pyinfra-dev/pyinfra/releases/tag/v3.10.0) | 6013 | Ansible (full) |
| [OpenVox](https://github.com/OpenVoxProject/openvox) | Ruby | Apache-2.0 | [8.29.0](https://github.com/OpenVoxProject/openvox/releases/tag/8.29.0) signed | 190 | Puppet (drop-in) |

</details>

<details>
<summary><b>Workflow automation</b>, 6 tools</summary>

Connect apps and APIs with trigger-and-action workflows.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [n8n](https://github.com/n8n-io/n8n) | TypeScript | Other | [n8n@2.40.7](https://github.com/n8n-io/n8n/releases/tag/n8n%402.40.7) signed | 205928 | Zapier (full) |
| [Huginn](https://github.com/huginn/huginn) | Ruby | MIT | [v2026.09.22](https://github.com/huginn/huginn/releases/tag/v2026.09.22) | 49990 | Zapier (partial) |
| [Activepieces](https://github.com/activepieces/activepieces) | TypeScript | Other | [0.91.3](https://github.com/activepieces/activepieces/releases/tag/0.91.3) | 24728 | Zapier (full), n8n (full) |
| [Node-RED](https://github.com/node-red/node-red) | JavaScript | Apache-2.0 | [5.0.7](https://github.com/node-red/node-red/releases/tag/5.0.7) signed | 23687 | Zapier (partial) |
| [Windmill](https://github.com/windmill-labs/windmill) | Rust | Other | [v1.817.0](https://github.com/windmill-labs/windmill/releases/tag/v1.817.0) signed | 18031 | Zapier (partial), Apache Airflow (partial) |
| [Automatisch](https://github.com/automatisch/automatisch) | JavaScript | Other | [v0.15.0](https://github.com/automatisch/automatisch/releases/tag/v0.15.0) | 13983 | Zapier (full) |

</details>

<details>
<summary><b>GitOps</b>, 3 tools</summary>

Keep Kubernetes clusters in sync with manifests stored in git.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Argo CD](https://github.com/argoproj/argo-cd) | Go | Apache-2.0 | [v3.5.3](https://github.com/argoproj/argo-cd/releases/tag/v3.5.3) signed | 24241 | none |
| [Flux](https://github.com/fluxcd/flux2) | Go | Apache-2.0 | [v2.9.5](https://github.com/fluxcd/flux2/releases/tag/v2.9.5) signed | 8423 | Argo CD (full) |
| [Fleet](https://github.com/rancher/fleet) | Go | Apache-2.0 | [v0.16.2](https://github.com/rancher/fleet/releases/tag/v0.16.2) signed | 1730 | Argo CD (full) |

</details>

<details>
<summary><b>Container registries</b>, 4 tools</summary>

Store and serve OCI images and artefacts.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Harbor](https://github.com/goharbor/harbor) | Go | Apache-2.0 | [v2.15.2](https://github.com/goharbor/harbor/releases/tag/v2.15.2) signed | 29455 | Docker Hub (full), Distribution (full) |
| [Distribution](https://github.com/distribution/distribution) | Go | Apache-2.0 | [v3.1.2](https://github.com/distribution/distribution/releases/tag/v3.1.2) signed | 10622 | Docker Hub (partial) |
| [Quay](https://github.com/quay/quay) | Python | Apache-2.0 | [v3.12.22](https://github.com/quay/quay/releases/tag/v3.12.22) signed | 2824 | Docker Hub (full) |
| [zot](https://github.com/project-zot/zot) | Go | Apache-2.0 | [v2.1.21](https://github.com/project-zot/zot/releases/tag/v2.1.21) signed | 2804 | Docker Hub (partial), Distribution (full) |

</details>

<details>
<summary><b>Identity providers</b>, 11 tools</summary>

Single sign-on, user directories and MFA over OpenID Connect, SAML or LDAP.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Keycloak](https://github.com/keycloak/keycloak) | Java | Apache-2.0 | [26.7.4](https://github.com/keycloak/keycloak/releases/tag/26.7.4) | 36987 | Okta (full), Auth0 (full) |
| [Authelia](https://github.com/authelia/authelia) | Go | Apache-2.0 | [v4.39.28](https://github.com/authelia/authelia/releases/tag/v4.39.28) signed | 29085 | Okta (partial) |
| [authentik](https://github.com/goauthentik/authentik) | Python | Other | [version/2026.8.3](https://github.com/goauthentik/authentik/releases/tag/version/2026.8.3) | 25717 | Okta (full), Auth0 (full), Keycloak (full) |
| [Ory Hydra](https://github.com/ory/hydra) | Go | Apache-2.0 | [v26.2.0](https://github.com/ory/hydra/releases/tag/v26.2.0) | 17567 | Auth0 (partial) |
| [SuperTokens](https://github.com/supertokens/supertokens-core) | Java | Other | [v12.2.0](https://github.com/supertokens/supertokens-core/releases/tag/v12.2.0) | 15321 | Auth0 (full) |
| [ZITADEL](https://github.com/zitadel/zitadel) | Go | AGPL-3.0 | [v4.19.1](https://github.com/zitadel/zitadel/releases/tag/v4.19.1) signed | 15104 | Auth0 (full), Okta (partial) |
| [Logto](https://github.com/logto-io/logto) | TypeScript | MPL-2.0 | [v1.43.0](https://github.com/logto-io/logto/releases/tag/v1.43.0) signed | 14631 | Auth0 (full) |
| [Casdoor](https://github.com/casdoor/casdoor) | Go | Apache-2.0 | [v4.9.0](https://github.com/casdoor/casdoor/releases/tag/v4.9.0) | 14471 | Auth0 (full), Okta (partial) |
| [Ory Kratos](https://github.com/ory/kratos) | Go | Apache-2.0 | [v26.2.0](https://github.com/ory/kratos/releases/tag/v26.2.0) | 13894 | Auth0 (partial) |
| [Dex](https://github.com/dexidp/dex) | Go | Apache-2.0 | [v2.45.1](https://github.com/dexidp/dex/releases/tag/v2.45.1) signed | 11126 | Okta (partial) |
| [Kanidm](https://github.com/kanidm/kanidm) | Rust | MPL-2.0 | [v1.11.2](https://github.com/kanidm/kanidm/releases/tag/v1.11.2) | 5407 | Okta (partial), Keycloak (partial) |

</details>

<details>
<summary><b>Mesh VPNs</b>, 6 tools</summary>

Connect devices and servers in a private WireGuard network, wherever they are.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Headscale](https://github.com/juanfont/headscale) | Go | BSD-3-Clause | [v0.29.4](https://github.com/juanfont/headscale/releases/tag/v0.29.4) | 44118 | Tailscale (partial) |
| [NetBird](https://github.com/netbirdio/netbird) | Go | Other | [v0.79.0](https://github.com/netbirdio/netbird/releases/tag/v0.79.0) signed | 29516 | Tailscale (full) |
| [Netmaker](https://github.com/gravitl/netmaker) | Go | Other | [v1.7.0](https://github.com/gravitl/netmaker/releases/tag/v1.7.0) signed | 11803 | Tailscale (full) |
| [Firezone](https://github.com/firezone/firezone) | Elixir | Apache-2.0 | [android-client-1.5.15](https://github.com/firezone/firezone/releases/tag/android-client-1.5.15) signed | 9106 | Tailscale (partial) |
| [innernet](https://github.com/tonarino/innernet) | Rust | MIT | [v2.0.0](https://github.com/tonarino/innernet/releases/tag/v2.0.0) | 5554 | Tailscale (partial) |
| [Defguard](https://github.com/DefGuard/defguard) | Rust | Other | [v2.1.0](https://github.com/DefGuard/defguard/releases/tag/v2.1.0) signed | 2851 | Tailscale (partial) |

</details>

<details>
<summary><b>Remote desktop</b>, 5 tools</summary>

Control another computer over the network, for support or remote work.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [RustDesk](https://github.com/rustdesk/rustdesk) | Rust | AGPL-3.0 | [1.4.9](https://github.com/rustdesk/rustdesk/releases/tag/1.4.9) | 124507 | TeamViewer (full), AnyDesk (full) |
| [Sunshine](https://github.com/LizardByte/Sunshine) | C++ | GPL-3.0 | [v2026.914.233613](https://github.com/LizardByte/Sunshine/releases/tag/v2026.914.233613) signed | 41533 | Parsec (partial) |
| [TigerVNC](https://github.com/TigerVNC/tigervnc) | C++ | GPL-2.0 | [v1.16.2](https://github.com/TigerVNC/tigervnc/releases/tag/v1.16.2) | 7507 | TeamViewer (partial) |
| [MeshCentral](https://github.com/Ylianst/MeshCentral) | HTML | Apache-2.0 | [1.2.6](https://github.com/Ylianst/MeshCentral/releases/tag/1.2.6) | 7282 | TeamViewer (partial) |
| [Apache Guacamole](https://github.com/apache/guacamole-server) | C | Apache-2.0 | [1.6.0](https://github.com/apache/guacamole-server/releases/tag/1.6.0) signed | 3991 | TeamViewer (partial) |

</details>

<details>
<summary><b>Wikis and knowledge bases</b>, 7 tools</summary>

Shared pages and documentation for teams, edited in the browser.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [AppFlowy](https://github.com/AppFlowy-IO/AppFlowy) | Dart | AGPL-3.0 | [0.14.5](https://github.com/AppFlowy-IO/AppFlowy/releases/tag/0.14.5) signed | 76929 | Notion (full) |
| [AFFiNE](https://github.com/toeverything/AFFiNE) | TypeScript | Other | [v0.27.4](https://github.com/toeverything/AFFiNE/releases/tag/v0.27.4) | 72965 | Notion (full), Miro (partial) |
| [Outline](https://github.com/outline/outline) | TypeScript | Other | [v1.10.1](https://github.com/outline/outline/releases/tag/v1.10.1) signed | 40702 | Notion (partial), Confluence (full) |
| [Wiki.js](https://github.com/requarks/wiki) | Vue | AGPL-3.0 | [v2.5.315](https://github.com/requarks/wiki/releases/tag/v2.5.315) signed | 28961 | Confluence (full) |
| [Docmost](https://github.com/docmost/docmost) | TypeScript | AGPL-3.0 | [v0.96.0](https://github.com/docmost/docmost/releases/tag/v0.96.0) | 21789 | Confluence (full), Notion (partial) |
| [BookStack](https://github.com/BookStackApp/BookStack) | PHP | MIT | [v26.09](https://github.com/BookStackApp/BookStack/releases/tag/v26.09) signed | 19054 | Confluence (full), Notion (partial) |
| [HedgeDoc](https://github.com/hedgedoc/hedgedoc) | TypeScript | AGPL-3.0 | [1.12.0](https://github.com/hedgedoc/hedgedoc/releases/tag/1.12.0) | 7444 | HackMD (full) |

</details>

<details>
<summary><b>Note-taking apps</b>, 8 tools</summary>

Personal notes on desktop and mobile, with sync.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Memos](https://github.com/usememos/memos) | Go | MIT | [v0.31.0](https://github.com/usememos/memos/releases/tag/v0.31.0) signed | 63332 | Google Keep (full) |
| [Joplin](https://github.com/laurent22/joplin) | TypeScript | Other | [v3.7.18](https://github.com/laurent22/joplin/releases/tag/v3.7.18) | 56478 | Evernote (full), Obsidian (partial) |
| [SiYuan](https://github.com/siyuan-note/siyuan) | TypeScript | AGPL-3.0 | [v3.8.5](https://github.com/siyuan-note/siyuan/releases/tag/v3.8.5) signed | 46500 | Obsidian (full), Notion (partial) |
| [Logseq](https://github.com/logseq/logseq) | Clojure | AGPL-3.0 | [2.0.1](https://github.com/logseq/logseq/releases/tag/2.0.1) | 45057 | Obsidian (full) |
| [Trilium Notes](https://github.com/TriliumNext/Trilium) | TypeScript | AGPL-3.0 | [v0.105.0](https://github.com/TriliumNext/Trilium/releases/tag/v0.105.0) signed | 37982 | Evernote (full) |
| [Notesnook](https://github.com/streetwriters/notesnook) | TypeScript | GPL-3.0 | [v3.4.8](https://github.com/streetwriters/notesnook/releases/tag/v3.4.8) signed | 14638 | Evernote (full) |
| [Zettlr](https://github.com/Zettlr/Zettlr) | TypeScript | GPL-3.0 | [v4.8.0](https://github.com/Zettlr/Zettlr/releases/tag/v4.8.0) signed | 13579 | Obsidian (partial) |
| [Anytype](https://github.com/anyproto/anytype-ts) | TypeScript | Other | [v0.57.1-beta](https://github.com/anyproto/anytype-ts/releases/tag/v0.57.1-beta) signed | 8849 | Notion (full) |

</details>

<details>
<summary><b>Recipe managers</b>, 4 tools</summary>

Keep recipes, plan meals and build shopping lists from them.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Mealie](https://github.com/mealie-recipes/mealie) | Python | AGPL-3.0 | [v3.28.0](https://github.com/mealie-recipes/mealie/releases/tag/v3.28.0) | 13311 | Paprika Recipe Manager (full), Plan to Eat (full) |
| [Tandoor Recipes](https://github.com/TandoorRecipes/recipes) | HTML | Other | [2.6.15](https://github.com/TandoorRecipes/recipes/releases/tag/2.6.15) signed | 8627 | Paprika Recipe Manager (full), Plan to Eat (full) |
| [KitchenOwl](https://github.com/TomBursch/kitchenowl) | Dart | AGPL-3.0 | [v0.7.10](https://github.com/TomBursch/kitchenowl/releases/tag/v0.7.10) signed | 3696 | AnyList (full) |
| [Norish](https://github.com/norish-recipes/norish) | TypeScript | AGPL-3.0 | [v0.24.0-beta](https://github.com/norish-recipes/norish/releases/tag/v0.24.0-beta) signed | 1229 | Paprika Recipe Manager (full) |

</details>

<details>
<summary><b>Project management</b>, 8 tools</summary>

Issues, tasks and boards for planning team work.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Plane](https://github.com/makeplane/plane) | TypeScript | AGPL-3.0 | [v1.4.2](https://github.com/makeplane/plane/releases/tag/v1.4.2) signed | 59874 | Jira (full), Linear (full) |
| [Huly](https://github.com/hcengineering/platform) archived | TypeScript | EPL-2.0 | [v0.7.426](https://github.com/hcengineering/platform/releases/tag/v0.7.426) | 27774 | Jira (partial), Linear (full) |
| [WeKan](https://github.com/wekan/wekan) | JavaScript | MIT | [v12.02](https://github.com/wekan/wekan/releases/tag/v12.02) | 21094 | Trello (full) |
| [OpenProject](https://github.com/opf/openproject) | Ruby | GPL-3.0 | [v17.8.0](https://github.com/opf/openproject/releases/tag/v17.8.0) signed | 16203 | Jira (full), Asana (partial) |
| [PLANKA](https://github.com/plankanban/planka) | JavaScript | Other | [v2.2.1](https://github.com/plankanban/planka/releases/tag/v2.2.1) | 12583 | Trello (full) |
| [Leantime](https://github.com/Leantime/leantime) | PHP | AGPL-3.0 | [v3.10.0](https://github.com/Leantime/leantime/releases/tag/v3.10.0) signed | 11659 | Asana (full) |
| [Kanboard](https://github.com/kanboard/kanboard) | PHP | MIT | [v1.2.54](https://github.com/kanboard/kanboard/releases/tag/v1.2.54) | 9883 | Trello (full) |
| [Vikunja](https://github.com/go-vikunja/vikunja) | Go | AGPL-3.0 | [v2.6.0](https://github.com/go-vikunja/vikunja/releases/tag/v2.6.0) signed | 5509 | Trello (full), Asana (partial) |

</details>

<details>
<summary><b>Video conferencing</b>, 3 tools</summary>

Video meetings in the browser or an app.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Jitsi Meet](https://github.com/jitsi/jitsi-meet) | TypeScript | Apache-2.0 | [stable/jitsi-meet_11248](https://github.com/jitsi/jitsi-meet/releases/tag/stable/jitsi-meet_11248) | 29990 | Zoom (full), Microsoft Teams (partial) |
| [BigBlueButton](https://github.com/bigbluebutton/bigbluebutton) | JavaScript | LGPL-3.0 | [v3.0.37](https://github.com/bigbluebutton/bigbluebutton/releases/tag/v3.0.37) signed | 9228 | Zoom (partial) |
| [Nextcloud Talk](https://github.com/nextcloud/spreed) | JavaScript | AGPL-3.0 | [v25.0.2](https://github.com/nextcloud/spreed/releases/tag/v25.0.2) signed | 2202 | Zoom (partial), Microsoft Teams (partial) |

</details>

<details>
<summary><b>Newsletters and email marketing</b>, 4 tools</summary>

Mailing lists, campaigns and subscriber management.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Ghost](https://github.com/TryGhost/Ghost) | TypeScript | MIT | [v6.65.0](https://github.com/TryGhost/Ghost/releases/tag/v6.65.0) | 55428 | Substack (full), Mailchimp (partial) |
| [listmonk](https://github.com/knadh/listmonk) | Go | AGPL-3.0 | [v6.2.0](https://github.com/knadh/listmonk/releases/tag/v6.2.0) | 23570 | Mailchimp (partial) |
| [Mautic](https://github.com/mautic/mautic) | PHP | Other | [7.2.1](https://github.com/mautic/mautic/releases/tag/7.2.1) signed | 10556 | Mailchimp (full) |
| [Plunk](https://github.com/useplunk/plunk) | TypeScript | AGPL-3.0 | [v0.15.0](https://github.com/useplunk/plunk/releases/tag/v0.15.0) signed | 5485 | Mailchimp (partial) |

</details>

<details>
<summary><b>Forms and surveys</b>, 4 tools</summary>

Build forms and surveys and collect the answers.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Formbricks](https://github.com/formbricks/formbricks) | TypeScript | Other | [6.0.0](https://github.com/formbricks/formbricks/releases/tag/6.0.0) signed | 13020 | Typeform (full), Google Forms (full) |
| [Typebot](https://github.com/baptisteArno/typebot.io) | TypeScript | Other | [v3.19.0](https://github.com/baptisteArno/typebot.io/releases/tag/v3.19.0) signed | 10367 | Typeform (partial) |
| [HeyForm](https://github.com/heyform/heyform) | TypeScript | AGPL-3.0 | [v3.0.3](https://github.com/heyform/heyform/releases/tag/v3.0.3) | 8986 | Typeform (full) |
| [LimeSurvey](https://github.com/LimeSurvey/LimeSurvey) | JavaScript | Other | [remove](https://github.com/LimeSurvey/LimeSurvey/releases/tag/remove) | 3734 | Typeform (partial), Google Forms (full) |

</details>

<details>
<summary><b>Photo libraries</b>, 5 tools</summary>

Back up, browse and share photos and videos from your phones.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Immich](https://github.com/immich-app/immich) | TypeScript | AGPL-3.0 | [v3.2.2](https://github.com/immich-app/immich/releases/tag/v3.2.2) | 115022 | Google Photos (full) |
| [PhotoPrism](https://github.com/photoprism/photoprism) | Go | Other | [260919-28c46a116](https://github.com/photoprism/photoprism/releases/tag/260919-28c46a116) | 40237 | Google Photos (partial) |
| [Ente Photos](https://github.com/ente/ente) | Dart | AGPL-3.0 | [photos-v1.3.64](https://github.com/ente/ente/releases/tag/photos-v1.3.64) | 29075 | Google Photos (full) |
| [LibrePhotos](https://github.com/LibrePhotos/librephotos) | Python | MIT | [1.1.0](https://github.com/LibrePhotos/librephotos/releases/tag/1.1.0) signed | 8083 | Google Photos (partial) |
| [Photoview](https://github.com/photoview/photoview) | Go | AGPL-3.0 | [v2.4.0](https://github.com/photoview/photoview/releases/tag/v2.4.0) signed | 6536 | Google Photos (partial) |

</details>

<details>
<summary><b>Media servers</b>, 5 tools</summary>

Stream a personal library of films, series and music to your devices.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Jellyfin](https://github.com/jellyfin/jellyfin) | C# | GPL-2.0 | [v12.1](https://github.com/jellyfin/jellyfin/releases/tag/v12.1) | 57491 | Plex (full), Emby (full) |
| [Navidrome](https://github.com/navidrome/navidrome) | Go | GPL-3.0 | [v0.64.2](https://github.com/navidrome/navidrome/releases/tag/v0.64.2) signed | 23789 | Plex (partial) |
| [Koel](https://github.com/koel/koel) | PHP | MIT | [v9.14.0](https://github.com/koel/koel/releases/tag/v9.14.0) | 17263 | Plex (partial) |
| [Audiobookshelf](https://github.com/advplyr/audiobookshelf) | JavaScript | GPL-3.0 | [v2.36.1](https://github.com/advplyr/audiobookshelf/releases/tag/v2.36.1) | 14443 | none |
| [Ampache](https://github.com/ampache/ampache) | PHP | AGPL-3.0 | [8.1.0](https://github.com/ampache/ampache/releases/tag/8.1.0) signed | 3831 | Plex (partial) |

</details>

<details>
<summary><b>Video hosting and streaming</b>, 4 tools</summary>

Publish videos and live streams on your own site for an audience to watch.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [PeerTube](https://github.com/Chocobozzz/PeerTube) | TypeScript | AGPL-3.0 | [v8.3.0](https://github.com/Chocobozzz/PeerTube/releases/tag/v8.3.0) signed | 15333 | YouTube (full), Vimeo (full), Twitch (partial) |
| [Owncast](https://github.com/owncast/owncast) | Go | MIT | [v0.3.0](https://github.com/owncast/owncast/releases/tag/v0.3.0) | 11557 | Twitch (partial) |
| [Restreamer](https://github.com/datarhei/restreamer) | HTML | Apache-2.0 | [v2.12.0](https://github.com/datarhei/restreamer/releases/tag/v2.12.0) | 5202 | none |
| [MediaCMS](https://github.com/mediacms-io/mediacms) | JavaScript | AGPL-3.0 | [v8.4.0](https://github.com/mediacms-io/mediacms/releases/tag/v8.4.0) | 5125 | YouTube (partial), Vimeo (partial) |

</details>

<details>
<summary><b>Book and comic servers</b>, 6 tools</summary>

Serve a personal library of ebooks, comics and manga to readers and reading apps.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Calibre-Web](https://github.com/janeczku/calibre-web) | Fluent | GPL-3.0 | [0.6.27](https://github.com/janeczku/calibre-web/releases/tag/0.6.27) | 18244 | Google Play Books (partial), Amazon Kindle (partial) |
| [Kavita](https://github.com/Kareadita/Kavita) | C# | GPL-3.0 | [v0.9.1.4](https://github.com/Kareadita/Kavita/releases/tag/v0.9.1.4) signed | 11741 | Google Play Books (partial), Amazon Kindle (partial) |
| [Komga](https://github.com/gotson/komga) | Kotlin | MIT | [1.27.1](https://github.com/gotson/komga/releases/tag/1.27.1) | 6690 | Google Play Books (partial), Amazon Kindle (partial) |
| [Calibre-Web Automated](https://github.com/crocodilestick/Calibre-Web-Automated) | JavaScript | GPL-3.0 | [v4.0.6](https://github.com/crocodilestick/Calibre-Web-Automated/releases/tag/v4.0.6) | 6336 | Calibre-Web (drop-in), Google Play Books (partial), Amazon Kindle (partial) |
| [Stump](https://github.com/stumpapp/stump) | TypeScript | MIT | [v0.1.10](https://github.com/stumpapp/stump/releases/tag/v0.1.10) signed | 2716 | Google Play Books (partial), Amazon Kindle (partial) |
| [BookLore](https://github.com/booklore-app/booklore) | Java | AGPL-3.0 | [v2.4.0](https://github.com/booklore-app/booklore/releases/tag/v2.4.0) signed | 1245 | Google Play Books (partial), Amazon Kindle (partial) |

</details>

<details>
<summary><b>Business intelligence</b>, 5 tools</summary>

Query databases and build charts and dashboards for the rest of the company.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Apache Superset](https://github.com/apache/superset) | Python | Apache-2.0 | [6.1.0](https://github.com/apache/superset/releases/tag/6.1.0) | 74917 | Tableau (full), Power BI (partial), Looker (partial) |
| [Metabase](https://github.com/metabase/metabase) | Clojure | Other | [v0.63.18](https://github.com/metabase/metabase/releases/tag/v0.63.18) signed | 49418 | Tableau (partial), Looker (partial) |
| [Redash](https://github.com/getredash/redash) | Python | BSD-2-Clause | [v26.9.0](https://github.com/getredash/redash/releases/tag/v26.9.0) | 28809 | Tableau (partial) |
| [DataEase](https://github.com/dataease/dataease) | Java | Other | [v3.1.0](https://github.com/dataease/dataease/releases/tag/v3.1.0) | 24552 | Tableau (partial) |
| [Lightdash](https://github.com/lightdash/lightdash) | TypeScript | Other | [2.344.1](https://github.com/lightdash/lightdash/releases/tag/2.344.1) | 6160 | Looker (full) |

</details>

<details>
<summary><b>Backend as a service</b>, 6 tools</summary>

Auth, database, storage and APIs for an app, without writing the backend.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Supabase](https://github.com/supabase/supabase) | TypeScript | Apache-2.0 | [v1.26.08](https://github.com/supabase/supabase/releases/tag/v1.26.08) signed | 110758 | Firebase (full) |
| [PocketBase](https://github.com/pocketbase/pocketbase) | Go | MIT | [v0.40.4](https://github.com/pocketbase/pocketbase/releases/tag/v0.40.4) | 61151 | Firebase (partial) |
| [Appwrite](https://github.com/appwrite/appwrite) | PHP | BSD-3-Clause | [2.3.0](https://github.com/appwrite/appwrite/releases/tag/2.3.0) signed | 57471 | Firebase (full) |
| [Parse Server](https://github.com/parse-community/parse-server) | JavaScript | Apache-2.0 | [9.10.1](https://github.com/parse-community/parse-server/releases/tag/9.10.1) | 21407 | Firebase (full) |
| [Convex](https://github.com/get-convex/convex-backend) | TypeScript | Other | [precompiled-2026-09-21-0cf49cb](https://github.com/get-convex/convex-backend/releases/tag/precompiled-2026-09-21-0cf49cb) | 12608 | Firebase (full) |
| [Nhost](https://github.com/nhost/nhost) | Go | MIT | [mcp@0.3.0](https://github.com/nhost/nhost/releases/tag/mcp%400.3.0) signed | 9308 | Firebase (full) |

</details>

<details>
<summary><b>Self-hosted PaaS</b>, 6 tools</summary>

Deploy apps and databases to your own servers from a git push or a dashboard.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Coolify](https://github.com/coollabsio/coolify) | PHP | Apache-2.0 | [v4.3.23](https://github.com/coollabsio/coolify/releases/tag/v4.3.23) | 62257 | Heroku (full), Render (full), Railway (full), Vercel (partial), Netlify (partial) |
| [Dokploy](https://github.com/Dokploy/dokploy) | TypeScript | Other | [v0.30.7](https://github.com/Dokploy/dokploy/releases/tag/v0.30.7) | 37505 | Heroku (full), Render (full), Railway (full), Vercel (partial), Netlify (partial) |
| [Dokku](https://github.com/dokku/dokku) | Go | MIT | [v0.38.30](https://github.com/dokku/dokku/releases/tag/v0.38.30) | 32157 | Heroku (full) |
| [CapRover](https://github.com/caprover/caprover) | TypeScript | Other | [v1.15.4](https://github.com/caprover/caprover/releases/tag/v1.15.4) signed | 15171 | Heroku (full) |
| [Piku](https://github.com/piku/piku) | Python | MIT | [v1.0.0](https://github.com/piku/piku/releases/tag/v1.0.0) signed | 6604 | Heroku (partial) |
| [Kubero](https://github.com/kubero-dev/kubero) | TypeScript | GPL-3.0 | [v3.1.1](https://github.com/kubero-dev/kubero/releases/tag/v3.1.1) signed | 4427 | Heroku (full) |

</details>

<details>
<summary><b>Headless CMS</b>, 5 tools</summary>

Manage content in an admin UI and deliver it to any front end through an API.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Strapi](https://github.com/strapi/strapi) | TypeScript | Other | [v5.55.1](https://github.com/strapi/strapi/releases/tag/v5.55.1) | 73234 | Contentful (full) |
| [Payload](https://github.com/payloadcms/payload) | TypeScript | MIT | [v3.90.2](https://github.com/payloadcms/payload/releases/tag/v3.90.2) | 44946 | Contentful (full), Strapi (full) |
| [Directus](https://github.com/directus/directus) | TypeScript | Other | [v12.4.1](https://github.com/directus/directus/releases/tag/v12.4.1) signed | 37967 | Contentful (full) |
| [Decap CMS](https://github.com/decaporg/decap-cms) | JavaScript | MIT | [decap-cms@3.16.3](https://github.com/decaporg/decap-cms/releases/tag/decap-cms%403.16.3) | 19405 | Contentful (partial) |
| [TinaCMS](https://github.com/tinacms/tinacms) | TypeScript | Apache-2.0 | [tinacms@3.14.1](https://github.com/tinacms/tinacms/releases/tag/tinacms%403.14.1) signed | 13805 | Contentful (partial) |

</details>

<details>
<summary><b>Feature flags</b>, 4 tools</summary>

Turn features on for some users without a deploy, and run experiments.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Unleash](https://github.com/Unleash/unleash) | TypeScript | AGPL-3.0 | [v8.2.0](https://github.com/Unleash/unleash/releases/tag/v8.2.0) | 13830 | LaunchDarkly (full) |
| [GrowthBook](https://github.com/growthbook/growthbook) | TypeScript | Other | [v5.1.0](https://github.com/growthbook/growthbook/releases/tag/v5.1.0) signed | 8430 | LaunchDarkly (full) |
| [Flagsmith](https://github.com/Flagsmith/flagsmith) | Python | BSD-3-Clause | [v2.276.0](https://github.com/Flagsmith/flagsmith/releases/tag/v2.276.0) signed | 6570 | LaunchDarkly (full) |
| [Flipt](https://github.com/flipt-io/flipt) | Go | Other | [v2.13.0](https://github.com/flipt-io/flipt/releases/tag/v2.13.0) | 4911 | LaunchDarkly (partial) |

</details>

<details>
<summary><b>Database migrations</b>, 6 tools</summary>

Version and apply database schema changes.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [migrate](https://github.com/golang-migrate/migrate) | Go | Other | [v4.20.1](https://github.com/golang-migrate/migrate/releases/tag/v4.20.1) signed | 18941 | Flyway (partial) |
| [Flyway](https://github.com/flyway/flyway) | Java | Apache-2.0 | [flyway-13.8.0](https://github.com/flyway/flyway/releases/tag/flyway-13.8.0) | 10109 | Liquibase (full) |
| [Atlas](https://github.com/ariga/atlas) | Go | Apache-2.0 | [v1.3.0](https://github.com/ariga/atlas/releases/tag/v1.3.0) signed | 8748 | Liquibase (full), Flyway (full) |
| [dbmate](https://github.com/amacneil/dbmate) | Go | MIT | [v2.36.0](https://github.com/amacneil/dbmate/releases/tag/v2.36.0) signed | 7415 | Flyway (full), Liquibase (partial) |
| [Liquibase](https://github.com/liquibase/liquibase) | Java | Other | [v5.0.4](https://github.com/liquibase/liquibase/releases/tag/v5.0.4) signed | 5614 | none |
| [Sqitch](https://github.com/sqitchers/sqitch) | Perl | MIT | [v1.6.1](https://github.com/sqitchers/sqitch/releases/tag/v1.6.1) signed | 3167 | Liquibase (full) |

</details>

<details>
<summary><b>Kubernetes UIs</b>, 5 tools</summary>

Browse and operate Kubernetes clusters from a desktop, web or terminal UI.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Portainer](https://github.com/portainer/portainer) | TypeScript | Zlib | [2.45.1](https://github.com/portainer/portainer/releases/tag/2.45.1) signed | 38565 | Lens (partial) |
| [k9s](https://github.com/derailed/k9s) | Go | Apache-2.0 | [v0.51.0](https://github.com/derailed/k9s/releases/tag/v0.51.0) | 34674 | Lens (partial) |
| [Rancher](https://github.com/rancher/rancher) | Go | Apache-2.0 | [v2.15.2](https://github.com/rancher/rancher/releases/tag/v2.15.2) signed | 25935 | Lens (full) |
| [Headlamp](https://github.com/kubernetes-sigs/headlamp) | TypeScript | Apache-2.0 | [v0.45.0](https://github.com/kubernetes-sigs/headlamp/releases/tag/v0.45.0) | 7336 | Lens (full) |
| [Freelens](https://github.com/freelensapp/freelens) | TypeScript | MIT | [v1.10.3](https://github.com/freelensapp/freelens/releases/tag/v1.10.3) signed | 5619 | Lens (full) |

</details>

<details>
<summary><b>Virtualization</b>, 4 tools</summary>

Run virtual machines and system containers across a cluster of hosts.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [KubeVirt](https://github.com/kubevirt/kubevirt) | Go | Apache-2.0 | [v1.9.0](https://github.com/kubevirt/kubevirt/releases/tag/v1.9.0) signed | 7088 | VMware vSphere (partial) |
| [Incus](https://github.com/lxc/incus) | Go | Apache-2.0 | [v7.5.1](https://github.com/lxc/incus/releases/tag/v7.5.1) signed | 6257 | LXD (full), VMware vSphere (partial) |
| [Harvester](https://github.com/harvester/harvester) | Go | Apache-2.0 | [v1.9.0](https://github.com/harvester/harvester/releases/tag/v1.9.0) | 5186 | VMware vSphere (full) |
| [LXD](https://github.com/canonical/lxd) | Go | AGPL-3.0 | [lxd-5.21.8](https://github.com/canonical/lxd/releases/tag/lxd-5.21.8) signed | 4831 | none |

</details>

<details>
<summary><b>Code search servers</b>, 4 tools</summary>

Index many repositories and search them from a web UI.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Hound](https://github.com/hound-search/hound) | JavaScript | MIT | [v0.7.1](https://github.com/hound-search/hound/releases/tag/v0.7.1) signed | 5882 | Sourcegraph (partial) |
| [OpenGrok](https://github.com/oracle/opengrok) | Java | Other | [1.14.19](https://github.com/oracle/opengrok/releases/tag/1.14.19) | 4960 | Sourcegraph (partial) |
| [Sourcebot](https://github.com/sourcebot-dev/sourcebot) | TypeScript | Other | [v5.1.14](https://github.com/sourcebot-dev/sourcebot/releases/tag/v5.1.14) | 3950 | Sourcegraph (partial) |
| [Zoekt](https://github.com/sourcegraph/zoekt) | Go | Apache-2.0 | none | 1929 | Sourcegraph (partial) |

</details>

<details>
<summary><b>Data integration</b>, 4 tools</summary>

Extract data from applications and databases and load it into a warehouse.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Airbyte](https://github.com/airbytehq/airbyte) | Python | Other | [v2.0.0](https://github.com/airbytehq/airbyte/releases/tag/v2.0.0) signed | 22137 | Fivetran (full) |
| [Debezium](https://github.com/debezium/debezium) | Java | Apache-2.0 | [v3.7.0.CR1](https://github.com/debezium/debezium/releases/tag/v3.7.0.CR1) | 13152 | Fivetran (partial) |
| [dlt](https://github.com/dlt-hub/dlt) | Python | Apache-2.0 | [1.30.0](https://github.com/dlt-hub/dlt/releases/tag/1.30.0) signed | 5891 | Fivetran (partial) |
| [Meltano](https://github.com/meltano/meltano) | Python | MIT | [v4.3.0](https://github.com/meltano/meltano/releases/tag/v4.3.0) signed | 2637 | Fivetran (partial), Airbyte (partial) |

</details>

<details>
<summary><b>JavaScript HTTP clients</b>, 6 tools</summary>

Send HTTP requests from Node.js and browsers.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [axios](https://github.com/axios/axios) | JavaScript | MIT | [v1.20.0](https://github.com/axios/axios/releases/tag/v1.20.0) signed | 109215 | request (full) |
| [request](https://github.com/request/request) | JavaScript | Apache-2.0 | [v2.88.1](https://github.com/request/request/releases/tag/v2.88.1) | 25498 | none |
| [Ky](https://github.com/sindresorhus/ky) | TypeScript | MIT | [v2.1.0](https://github.com/sindresorhus/ky/releases/tag/v2.1.0) | 17091 | request (partial), axios (full) |
| [SuperAgent](https://github.com/forwardemail/superagent) | JavaScript | MIT | [v10.4.1](https://github.com/forwardemail/superagent/releases/tag/v10.4.1) | 16636 | request (full) |
| [Got](https://github.com/sindresorhus/got) | TypeScript | MIT | [v16.0.0](https://github.com/sindresorhus/got/releases/tag/v16.0.0) | 14946 | request (full) |
| [undici](https://github.com/nodejs/undici) | JavaScript | MIT | [v8.11.2](https://github.com/nodejs/undici/releases/tag/v8.11.2) signed | 7705 | request (full) |

</details>

<details>
<summary><b>JavaScript utility libraries</b>, 5 tools</summary>

Helpers for arrays, objects, strings and functions.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Lodash](https://github.com/lodash/lodash) | JavaScript | Other | [4.18.1](https://github.com/lodash/lodash/releases/tag/4.18.1) signed | 61276 | none |
| [Underscore.js](https://github.com/jashkenas/underscore) | JavaScript | MIT | [1.13.8](https://github.com/jashkenas/underscore/releases/tag/1.13.8) | 27321 | none |
| [Ramda](https://github.com/ramda/ramda) | JavaScript | MIT | [v0.32.0](https://github.com/ramda/ramda/releases/tag/v0.32.0) | 24048 | Lodash (partial) |
| [es-toolkit](https://github.com/toss/es-toolkit) | TypeScript | MIT | [v1.52.0](https://github.com/toss/es-toolkit/releases/tag/v1.52.0) signed | 11348 | Lodash (drop-in) |
| [Remeda](https://github.com/remeda/remeda) | TypeScript | MIT | [v2.50.0](https://github.com/remeda/remeda/releases/tag/v2.50.0) signed | 5432 | Lodash (partial) |

</details>

<details>
<summary><b>CSS processing</b>, 5 tools</summary>

Compile, transform, prefix and minify stylesheets.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) | TypeScript | MIT | [v4.3.3](https://github.com/tailwindlabs/tailwindcss/releases/tag/v4.3.3) signed | 97673 | none |
| [PostCSS](https://github.com/postcss/postcss) | TypeScript | MIT | [8.5.28](https://github.com/postcss/postcss/releases/tag/8.5.28) signed | 28976 | none |
| [node-sass](https://github.com/sass/node-sass) archived | C++ | MIT | [v9.0.0](https://github.com/sass/node-sass/releases/tag/v9.0.0) signed | 8449 | none |
| [Lightning CSS](https://github.com/parcel-bundler/lightningcss) | Rust | MPL-2.0 | [v1.33.0](https://github.com/parcel-bundler/lightningcss/releases/tag/v1.33.0) | 7688 | PostCSS (partial) |
| [Dart Sass](https://github.com/sass/dart-sass) | Dart | MIT | [1.105.0](https://github.com/sass/dart-sass/releases/tag/1.105.0) signed | 4224 | node-sass (drop-in) |

</details>

<details>
<summary><b>JavaScript schema validation</b>, 6 tools</summary>

Declare schemas and validate data against them at runtime.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Zod](https://github.com/colinhacks/zod) | TypeScript | MIT | [v4.6.5](https://github.com/colinhacks/zod/releases/tag/v4.6.5) | 44015 | Yup (full), Joi (full) |
| [Yup](https://github.com/jquense/yup) | TypeScript | MIT | [v1.0.0](https://github.com/jquense/yup/releases/tag/v1.0.0) | 23664 | none |
| [Joi](https://github.com/hapijs/joi) | JavaScript | Other | [v18.2.9](https://github.com/hapijs/joi/releases/tag/v18.2.9) | 21172 | none |
| [Ajv](https://github.com/ajv-validator/ajv) | TypeScript | MIT | [v8.20.0](https://github.com/ajv-validator/ajv/releases/tag/v8.20.0) signed | 14840 | none |
| [Valibot](https://github.com/open-circle/valibot) | TypeScript | MIT | [v1.5.0](https://github.com/open-circle/valibot/releases/tag/v1.5.0) signed | 9021 | Zod (full), Yup (full) |
| [ArkType](https://github.com/arktypeio/arktype) | TypeScript | MIT | [@arktype/util@0.56.4](https://github.com/arktypeio/arktype/releases/tag/%40arktype/util%400.56.4) | 7866 | Zod (full) |

</details>

<details>
<summary><b>React state management</b>, 5 tools</summary>

Share and update application state across React components.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Redux](https://github.com/reduxjs/redux) | TypeScript | MIT | [v5.0.1](https://github.com/reduxjs/redux/releases/tag/v5.0.1) | 61488 | none |
| [Zustand](https://github.com/pmndrs/zustand) | TypeScript | MIT | [v5.0.15](https://github.com/pmndrs/zustand/releases/tag/v5.0.15) | 58745 | Redux (full) |
| [XState](https://github.com/statelyai/xstate) | TypeScript | MIT | [xstate@5.33.2](https://github.com/statelyai/xstate/releases/tag/xstate%405.33.2) signed | 30165 | none |
| [MobX](https://github.com/mobxjs/mobx) | TypeScript | MIT | [mobx-react-lite@5.1.0](https://github.com/mobxjs/mobx/releases/tag/mobx-react-lite%405.1.0) | 28213 | Redux (full) |
| [Jotai](https://github.com/pmndrs/jotai) | TypeScript | MIT | [v3.0.0](https://github.com/pmndrs/jotai/releases/tag/v3.0.0) | 21281 | Redux (partial) |

</details>

<details>
<summary><b>Python task queues</b>, 4 tools</summary>

Run background jobs from Python through a broker.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Celery](https://github.com/celery/celery) | Python | Other | [v5.6.3](https://github.com/celery/celery/releases/tag/v5.6.3) signed | 28915 | none |
| [RQ](https://github.com/rq/rq) | Python | Other | [v2.12](https://github.com/rq/rq/releases/tag/v2.12) | 10694 | Celery (partial) |
| [huey](https://github.com/coleifer/huey) | Python | MIT | [3.4.0](https://github.com/coleifer/huey/releases/tag/3.4.0) | 6038 | Celery (partial) |
| [Dramatiq](https://github.com/Bogdanp/dramatiq) | Python | LGPL-3.0 | [v2.2.1](https://github.com/Bogdanp/dramatiq/releases/tag/v2.2.1) signed | 5312 | Celery (full) |

</details>

<details>
<summary><b>DataFrame libraries</b>, 6 tools</summary>

Load, transform and analyse tabular data in memory.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [pandas](https://github.com/pandas-dev/pandas) | Python | BSD-3-Clause | [v3.0.6](https://github.com/pandas-dev/pandas/releases/tag/v3.0.6) | 49807 | none |
| [Polars](https://github.com/pola-rs/polars) | Rust | MIT | [py-1.44.2](https://github.com/pola-rs/polars/releases/tag/py-1.44.2) | 39858 | pandas (full) |
| [Dask](https://github.com/dask/dask) | Python | BSD-3-Clause | [2026.8.0](https://github.com/dask/dask/releases/tag/2026.8.0) | 13926 | pandas (partial) |
| [Modin](https://github.com/modin-project/modin) | Python | Apache-2.0 | [0.37.1](https://github.com/modin-project/modin/releases/tag/0.37.1) signed | 10389 | pandas (drop-in) |
| [cuDF](https://github.com/NVIDIA/cudf) | C++ | Apache-2.0 | [v26.08.01](https://github.com/NVIDIA/cudf/releases/tag/v26.08.01) | 9763 | pandas (drop-in) |
| [Ibis](https://github.com/ibis-project/ibis) | Python | Apache-2.0 | [12.0.0](https://github.com/ibis-project/ibis/releases/tag/12.0.0) | 6666 | pandas (partial) |

</details>

<details>
<summary><b>System monitors</b>, 4 tools</summary>

Watch processes and resource use from a terminal.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [btop](https://github.com/aristocratos/btop) | C++ | Apache-2.0 | [v1.4.7](https://github.com/aristocratos/btop/releases/tag/v1.4.7) | 34749 | htop (full) |
| [Glances](https://github.com/nicolargo/glances) | Python | Other | [v4.5.6](https://github.com/nicolargo/glances/releases/tag/v4.5.6) | 33672 | htop (full) |
| [bottom](https://github.com/ClementTsang/bottom) | Rust | MIT | [0.14.9](https://github.com/ClementTsang/bottom/releases/tag/0.14.9) signed | 14058 | htop (full) |
| [htop](https://github.com/htop-dev/htop) | C | GPL-2.0 | [3.5.3](https://github.com/htop-dev/htop/releases/tag/3.5.3) | 8347 | none |

</details>

<details>
<summary><b>Directory jumpers</b>, 4 tools</summary>

Jump to frequently used directories with a few keystrokes.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [zoxide](https://github.com/ajeetdsouza/zoxide) | Rust | MIT | [v0.10.0](https://github.com/ajeetdsouza/zoxide/releases/tag/v0.10.0) | 39689 | autojump (full), z (full) |
| [z](https://github.com/rupa/z) | Shell | WTFPL | [v1.12](https://github.com/rupa/z/releases/tag/v1.12) signed | 17054 | none |
| [autojump](https://github.com/wting/autojump) | Python | Other | [release-v22.5.3](https://github.com/wting/autojump/releases/tag/release-v22.5.3) | 16961 | none |
| [z.lua](https://github.com/skywind3000/z.lua) | Lua | MIT | [1.8.26](https://github.com/skywind3000/z.lua/releases/tag/1.8.26) signed | 3147 | z (full) |

</details>

<details>
<summary><b>Fuzzy finders</b>, 4 tools</summary>

Filter lists interactively in a terminal, for files, history and anything piped in.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [fzf](https://github.com/junegunn/fzf) | Go | MIT | [v0.74.4](https://github.com/junegunn/fzf/releases/tag/v0.74.4) signed | 83242 | none |
| [peco](https://github.com/peco/peco) | Go | MIT | [v0.6.0](https://github.com/peco/peco/releases/tag/v0.6.0) | 7909 | fzf (partial) |
| [skim](https://github.com/skim-rs/skim) | Rust | MIT | [v5.7.1](https://github.com/skim-rs/skim/releases/tag/v5.7.1) signed | 6970 | fzf (full) |
| [Television](https://github.com/alexpasmantier/television) | Rust | MIT | [0.15.9](https://github.com/alexpasmantier/television/releases/tag/0.15.9) | 6289 | fzf (full) |

</details>

<details>
<summary><b>Shells</b>, 4 tools</summary>

Interactive command-line shells.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [PowerShell](https://github.com/PowerShell/PowerShell) | C# | MIT | [v7.6.6](https://github.com/PowerShell/PowerShell/releases/tag/v7.6.6) | 55515 | none |
| [Nushell](https://github.com/nushell/nushell) | Rust | MIT | [0.115.1](https://github.com/nushell/nushell/releases/tag/0.115.1) signed | 40576 | Zsh (partial) |
| [fish](https://github.com/fish-shell/fish-shell) | Rust | Other | [4.9.3](https://github.com/fish-shell/fish-shell/releases/tag/4.9.3) signed | 34239 | Zsh (full) |
| [Zsh](https://github.com/zsh-users/zsh) | C | Other | [zsh-5.9.2](https://github.com/zsh-users/zsh/releases/tag/zsh-5.9.2) | 4299 | none |

</details>

<details>
<summary><b>Git clients</b>, 5 tools</summary>

Stage, commit, branch and browse history outside the bare git command.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [lazygit](https://github.com/jesseduffield/lazygit) | Go | MIT | [v0.65.1](https://github.com/jesseduffield/lazygit/releases/tag/v0.65.1) | 82671 | GitKraken (partial), Sourcetree (partial), tig (full) |
| [GitUI](https://github.com/gitui-org/gitui) | Rust | MIT | [v0.28.1](https://github.com/gitui-org/gitui/releases/tag/v0.28.1) | 22522 | GitKraken (partial), tig (full) |
| [GitHub Desktop](https://github.com/desktop/desktop) | TypeScript | MIT | [release-3.6.6](https://github.com/desktop/desktop/releases/tag/release-3.6.6) | 21902 | GitKraken (partial), Sourcetree (partial) |
| [GitButler](https://github.com/gitbutlerapp/gitbutler) | Rust | Other | [release/0.22.3](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.22.3) signed | 21711 | GitKraken (partial) |
| [tig](https://github.com/jonas/tig) | C | GPL-2.0 | [tig-2.6.1](https://github.com/jonas/tig/releases/tag/tig-2.6.1) signed | 13349 | none |

</details>

<details>
<summary><b>Office suites</b>, 5 tools</summary>

Documents, spreadsheets and presentations.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Etherpad](https://github.com/ether/etherpad) | TypeScript | Apache-2.0 | [v3.3.6](https://github.com/ether/etherpad/releases/tag/v3.3.6) | 18556 | Google Docs (partial) |
| [CryptPad](https://github.com/cryptpad/cryptpad) | JavaScript | AGPL-3.0 | [2026.5.1](https://github.com/cryptpad/cryptpad/releases/tag/2026.5.1) signed | 7958 | Google Docs (full) |
| [ONLYOFFICE Docs](https://github.com/ONLYOFFICE/DocumentServer) | Shell | AGPL-3.0 | [v9.4.0](https://github.com/ONLYOFFICE/DocumentServer/releases/tag/v9.4.0) | 6940 | Microsoft 365 (partial), Google Docs (full) |
| [LibreOffice](https://github.com/LibreOffice/core) | C++ | GPL-3.0 | [windows_build_successful_2011_11_08](https://github.com/LibreOffice/core/releases/tag/windows_build_successful_2011_11_08) | 4400 | Microsoft 365 (partial), Google Docs (partial) |
| [Collabora Online](https://github.com/CollaboraOnline/online) | Shell | Other | [25.04.7-mobile](https://github.com/CollaboraOnline/online/releases/tag/25.04.7-mobile) signed | 3351 | Google Docs (full), Microsoft 365 (partial) |

</details>

<details>
<summary><b>Document management</b>, 6 tools</summary>

Scan, OCR, tag and search paper and PDF documents.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Paperless-ngx](https://github.com/paperless-ngx/paperless-ngx) | Python | GPL-3.0 | [v3.2.1](https://github.com/paperless-ngx/paperless-ngx/releases/tag/v3.2.1) signed | 46009 | Paperless-ng (drop-in), Paperless (full), DocuWare (partial) |
| [Paperless](https://github.com/the-paperless-project/paperless) archived | Python | GPL-3.0 | [2.7.0](https://github.com/the-paperless-project/paperless/releases/tag/2.7.0) | 7915 | none |
| [Papra](https://github.com/papra-hq/papra) | TypeScript | AGPL-3.0 | [@papra/app@26.6.2](https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.6.2) signed | 5517 | Paperless-ngx (full) |
| [Paperless-ng](https://github.com/jonaswinkler/paperless-ng) archived | Python | GPL-3.0 | [ng-1.5.0](https://github.com/jonaswinkler/paperless-ng/releases/tag/ng-1.5.0) | 5410 | none |
| [Teedy](https://github.com/sismics/docs) | JavaScript | GPL-2.0 | [v1.11](https://github.com/sismics/docs/releases/tag/v1.11) | 2566 | Paperless-ngx (full), DocuWare (partial) |
| [Docspell](https://github.com/eikek/docspell) | Elm | AGPL-3.0 | [v0.43.0](https://github.com/eikek/docspell/releases/tag/v0.43.0) | 2334 | Paperless-ngx (full) |

</details>

<details>
<summary><b>Interface design tools</b>, 4 tools</summary>

Design and prototype user interfaces on a shared canvas.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Penpot](https://github.com/penpot/penpot) | Clojure | MPL-2.0 | [2.18.0](https://github.com/penpot/penpot/releases/tag/2.18.0) | 60371 | Figma (full) |
| [Onlook](https://github.com/onlook-dev/onlook) | TypeScript | Apache-2.0 | [v0.2.32](https://github.com/onlook-dev/onlook/releases/tag/v0.2.32) signed | 26810 | Figma (partial) |
| [OpenPencil](https://github.com/open-pencil/open-pencil) | TypeScript | MIT | [v0.15.1](https://github.com/open-pencil/open-pencil/releases/tag/v0.15.1) | 8610 | Figma (partial) |
| [Grida](https://github.com/gridaco/grida) | TypeScript | Apache-2.0 | [v0.0.24](https://github.com/gridaco/grida/releases/tag/v0.0.24) signed | 2651 | Figma (partial) |

</details>

<details>
<summary><b>Diagrams and whiteboards</b>, 6 tools</summary>

Draw diagrams and sketch on a shared canvas.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Excalidraw](https://github.com/excalidraw/excalidraw) | TypeScript | MIT | [v0.18.1](https://github.com/excalidraw/excalidraw/releases/tag/v0.18.1) | 132883 | Miro (partial), Lucidchart (partial) |
| [Mermaid](https://github.com/mermaid-js/mermaid) | TypeScript | MIT | [@mermaid-js/layout-tidy-tree@1.0.1](https://github.com/mermaid-js/mermaid/releases/tag/%40mermaid-js/layout-tidy-tree%401.0.1) | 90418 | Lucidchart (partial) |
| [tldraw](https://github.com/tldraw/tldraw) | TypeScript | Other | [v5.4.2](https://github.com/tldraw/tldraw/releases/tag/v5.4.2) | 50563 | Miro (partial) |
| [D2](https://github.com/d2lang/d2) | Go | MPL-2.0 | [v0.9.0](https://github.com/d2lang/d2/releases/tag/v0.9.0) signed | 25509 | Lucidchart (partial) |
| [PlantUML](https://github.com/plantuml/plantuml) | Java | LGPL-3.0 | [v1.2026.8](https://github.com/plantuml/plantuml/releases/tag/v1.2026.8) | 13339 | Lucidchart (partial) |
| [draw.io](https://github.com/jgraph/drawio) | JavaScript | Apache-2.0 | [v31.5.2](https://github.com/jgraph/drawio/releases/tag/v31.5.2) | 8344 | Lucidchart (full), Miro (partial) |

</details>

<details>
<summary><b>Screen recording</b>, 4 tools</summary>

Record the screen and camera and share the video.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [OBS Studio](https://github.com/obsproject/obs-studio) | C | GPL-2.0 | [32.2.2](https://github.com/obsproject/obs-studio/releases/tag/32.2.2) | 76623 | Loom (partial) |
| [ShareX](https://github.com/ShareX/ShareX) | C# | GPL-3.0 | [v21.0.0](https://github.com/ShareX/ShareX/releases/tag/v21.0.0) | 39743 | Snagit (full), Loom (partial) |
| [Cap](https://github.com/CapSoftware/Cap) | Rust | Other | [cap-v0.6.0](https://github.com/CapSoftware/Cap/releases/tag/cap-v0.6.0) | 22796 | Loom (full) |
| [Screenity](https://github.com/alyssaxuu/screenity) | JavaScript | GPL-3.0 | [v4.6.11](https://github.com/alyssaxuu/screenity/releases/tag/v4.6.11) | 18727 | Loom (partial) |

</details>

<details>
<summary><b>Authenticator apps</b>, 3 tools</summary>

Generate one-time codes for two-factor authentication.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Ente Auth](https://github.com/ente/ente) | Dart | AGPL-3.0 | [photos-v1.3.64](https://github.com/ente/ente/releases/tag/photos-v1.3.64) | 29075 | Twilio Authy (full), Google Authenticator (full) |
| [Aegis](https://github.com/beemdevelopment/Aegis) | Java | GPL-3.0 | [v3.4.3](https://github.com/beemdevelopment/Aegis/releases/tag/v3.4.3) | 13159 | Twilio Authy (full), Google Authenticator (full) |
| [Stratum](https://github.com/stratumauth/app) | C# | GPL-3.0 | [v1.6.2](https://github.com/stratumauth/app/releases/tag/v1.6.2) signed | 4593 | Twilio Authy (full), Google Authenticator (full) |

</details>

<details>
<summary><b>Writing assistants</b>, 4 tools</summary>

Check grammar, spelling and style as you type.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Harper](https://github.com/Automattic/harper) | Rust | Apache-2.0 | [v2.11.0](https://github.com/Automattic/harper/releases/tag/v2.11.0) | 15918 | Grammarly (partial) |
| [LanguageTool](https://github.com/languagetool-org/languagetool) | Java | LGPL-2.1 | [v6.8](https://github.com/languagetool-org/languagetool/releases/tag/v6.8) | 15087 | Grammarly (full) |
| [Vale](https://github.com/vale-cli/vale) | Go | MIT | [v3.22.0](https://github.com/vale-cli/vale/releases/tag/v3.22.0) signed | 6163 | Grammarly (partial) |
| [proselint](https://github.com/amperser/proselint) | JavaScript | BSD-3-Clause | [v0.16.0](https://github.com/amperser/proselint/releases/tag/v0.16.0) | 4577 | Grammarly (partial) |

</details>

<details>
<summary><b>Machine translation</b>, 3 tools</summary>

Translate text between languages, through an API or a web UI.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [LibreTranslate](https://github.com/LibreTranslate/LibreTranslate) | Python | AGPL-3.0 | [v1.9.6](https://github.com/LibreTranslate/LibreTranslate/releases/tag/v1.9.6) | 16829 | DeepL (partial), Google Translate (partial) |
| [Argos Translate](https://github.com/argosopentech/argos-translate) | Python | MIT | [v1.4.0](https://github.com/argosopentech/argos-translate/releases/tag/v1.4.0) | 6507 | Google Translate (partial) |
| [MTranServer](https://github.com/xxnuo/MTranServer) | C++ | Apache-2.0 | [v4.0.33](https://github.com/xxnuo/MTranServer/releases/tag/v4.0.33) | 4708 | DeepL (partial), Google Translate (partial) |

</details>

<details>
<summary><b>Read-later and bookmarks</b>, 5 tools</summary>

Save links and articles to read or find again later.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Karakeep](https://github.com/karakeep-app/karakeep) | TypeScript | AGPL-3.0 | [v0.33.2](https://github.com/karakeep-app/karakeep/releases/tag/v0.33.2) signed | 29271 | Pocket (full), Raindrop.io (full) |
| [Linkwarden](https://github.com/linkwarden/linkwarden) | TypeScript | AGPL-3.0 | [v2.16.3](https://github.com/linkwarden/linkwarden/releases/tag/v2.16.3) signed | 19840 | Raindrop.io (full), Pocket (full) |
| [wallabag](https://github.com/wallabag/wallabag) | PHP | MIT | [2.6.14](https://github.com/wallabag/wallabag/releases/tag/2.6.14) signed | 12984 | Pocket (full), Raindrop.io (partial) |
| [Shiori](https://github.com/go-shiori/shiori) | Go | MIT | [v1.8.0](https://github.com/go-shiori/shiori/releases/tag/v1.8.0) signed | 11651 | Pocket (full), Raindrop.io (partial) |
| [linkding](https://github.com/sissbruecker/linkding) | Python | MIT | [v1.47.0](https://github.com/sissbruecker/linkding/releases/tag/v1.47.0) | 11230 | Raindrop.io (full), Pocket (partial) |

</details>

<details>
<summary><b>Feed readers</b>, 5 tools</summary>

Follow sites through RSS and Atom feeds.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [FreshRSS](https://github.com/FreshRSS/FreshRSS) | PHP | AGPL-3.0 | [1.30.0](https://github.com/FreshRSS/FreshRSS/releases/tag/1.30.0) signed | 16142 | Feedly (full) |
| [Miniflux](https://github.com/miniflux/v2) | Go | Apache-2.0 | [2.3.3](https://github.com/miniflux/v2/releases/tag/2.3.3) | 9734 | Feedly (full) |
| [NewsBlur](https://github.com/samuelclay/NewsBlur) | Python | MIT | [v0.2.2](https://github.com/samuelclay/NewsBlur/releases/tag/v0.2.2) | 7627 | Feedly (full) |
| [yarr](https://github.com/nkanaev/yarr) | Go | MIT | [v2.9](https://github.com/nkanaev/yarr/releases/tag/v2.9) | 4054 | Feedly (partial) |
| [CommaFeed](https://github.com/Athou/commafeed) | Java | Apache-2.0 | [7.3.2](https://github.com/Athou/commafeed/releases/tag/7.3.2) | 3626 | Feedly (full) |

</details>

<details>
<summary><b>DNS ad blockers</b>, 4 tools</summary>

Block ads and trackers for a whole network at the DNS level.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Pi-hole](https://github.com/pi-hole/pi-hole) | Shell | Other | [v6.4.3](https://github.com/pi-hole/pi-hole/releases/tag/v6.4.3) signed | 61073 | NextDNS (partial) |
| [AdGuard Home](https://github.com/AdguardTeam/AdGuardHome) | TypeScript | GPL-3.0 | [v0.107.79](https://github.com/AdguardTeam/AdGuardHome/releases/tag/v0.107.79) | 37060 | Pi-hole (full), NextDNS (full) |
| [Technitium DNS Server](https://github.com/TechnitiumSoftware/DnsServer) | C# | GPL-3.0 | [v15.5.0](https://github.com/TechnitiumSoftware/DnsServer/releases/tag/v15.5.0) | 9992 | Pi-hole (full), NextDNS (full) |
| [Blocky](https://github.com/0xERR0R/blocky) | Go | Apache-2.0 | [v0.35.0](https://github.com/0xERR0R/blocky/releases/tag/v0.35.0) signed | 6975 | Pi-hole (full) |

</details>

<details>
<summary><b>ERP</b>, 5 tools</summary>

Accounting, inventory, sales and operations in one system.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Odoo](https://github.com/odoo/odoo) | Python | Other | [5.0.0-2-addons](https://github.com/odoo/odoo/releases/tag/5.0.0-2-addons) | 54599 | NetSuite (full) |
| [ERPNext](https://github.com/frappe/erpnext) | Python | GPL-3.0 | [v16.36.0](https://github.com/frappe/erpnext/releases/tag/v16.36.0) | 39545 | NetSuite (full), Odoo (full) |
| [Akaunting](https://github.com/akaunting/akaunting) | PHP | Other | [3.2.4](https://github.com/akaunting/akaunting/releases/tag/3.2.4) | 10138 | QuickBooks (full) |
| [Invoice Ninja](https://github.com/invoiceninja/invoiceninja) | PHP | Other | [v5.13.43](https://github.com/invoiceninja/invoiceninja/releases/tag/v5.13.43) signed | 10111 | QuickBooks (partial) |
| [Dolibarr](https://github.com/Dolibarr/dolibarr) | PHP | GPL-3.0 | [24.0.1](https://github.com/Dolibarr/dolibarr/releases/tag/24.0.1) | 7658 | NetSuite (partial) |

</details>

<details>
<summary><b>Budgeting and personal finance</b>, 6 tools</summary>

Track accounts, spending and budgets for a person or a household.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Maybe](https://github.com/maybe-finance/maybe) archived | Ruby | AGPL-3.0 | [v0.6.0](https://github.com/maybe-finance/maybe/releases/tag/v0.6.0) | 54263 | none |
| [Actual Budget](https://github.com/actualbudget/actual) | TypeScript | MIT | [v26.9.0](https://github.com/actualbudget/actual/releases/tag/v26.9.0) signed | 29142 | YNAB (full) |
| [Firefly III](https://github.com/firefly-iii/firefly-iii) | PHP | AGPL-3.0 | [v6.7.3](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.3) | 24725 | YNAB (partial) |
| [Sure](https://github.com/we-promise/sure) | Ruby | AGPL-3.0 | [v0.7.4](https://github.com/we-promise/sure/releases/tag/v0.7.4) signed | 10037 | Maybe (full), Monarch Money (full) |
| [ezBookkeeping](https://github.com/mayswind/ezbookkeeping) | Go | MIT | [v2.0.0](https://github.com/mayswind/ezbookkeeping/releases/tag/v2.0.0) | 5653 | none |
| [GnuCash](https://github.com/Gnucash/gnucash) | C | Other | [5.16](https://github.com/Gnucash/gnucash/releases/tag/5.16) | 4356 | Quicken (partial) |

</details>

<details>
<summary><b>CRM</b>, 5 tools</summary>

Track contacts, companies and deals.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Twenty](https://github.com/twentyhq/twenty) | TypeScript | Other | [sdk/v2.41.0](https://github.com/twentyhq/twenty/releases/tag/sdk/v2.41.0) signed | 57478 | Salesforce (partial), HubSpot (partial) |
| [Monica](https://github.com/monicahq/monica) | PHP | AGPL-3.0 | [v4.1.2](https://github.com/monicahq/monica/releases/tag/v4.1.2) signed | 25362 | none |
| [Krayin CRM](https://github.com/krayin/laravel-crm) | PHP | MIT | [v2.2.6](https://github.com/krayin/laravel-crm/releases/tag/v2.2.6) signed | 23939 | Salesforce (partial), HubSpot (partial) |
| [SuiteCRM](https://github.com/SuiteCRM/SuiteCRM) | PHP | AGPL-3.0 | [v7.15.2](https://github.com/SuiteCRM/SuiteCRM/releases/tag/v7.15.2) | 5770 | Salesforce (full) |
| [EspoCRM](https://github.com/espocrm/espocrm) | PHP | AGPL-3.0 | [10.0.8](https://github.com/espocrm/espocrm/releases/tag/10.0.8) | 3394 | Salesforce (partial), HubSpot (partial) |

</details>

<details>
<summary><b>Help desks</b>, 5 tools</summary>

Handle customer requests from email, chat and other channels as tickets.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Chatwoot](https://github.com/chatwoot/chatwoot) | Ruby | Other | [v4.18.0](https://github.com/chatwoot/chatwoot/releases/tag/v4.18.0) | 37184 | Intercom (full), Zendesk (partial) |
| [UVdesk](https://github.com/uvdesk/community-skeleton) | CSS | OSL-3.0 | [v1.1.8](https://github.com/uvdesk/community-skeleton/releases/tag/v1.1.8) signed | 19611 | Zendesk (partial), Freshdesk (partial) |
| [Zammad](https://github.com/zammad/zammad) | Ruby | AGPL-3.0 | [7.3.0-alpha](https://github.com/zammad/zammad/releases/tag/7.3.0-alpha) | 5953 | Zendesk (full), Freshdesk (full) |
| [FreeScout](https://github.com/freescout-help-desk/freescout) | PHP | AGPL-3.0 | [1.8.241](https://github.com/freescout-help-desk/freescout/releases/tag/1.8.241) | 4559 | Zendesk (partial) |
| [osTicket](https://github.com/osTicket/osTicket) | PHP | GPL-2.0 | [v1.18.4](https://github.com/osTicket/osTicket/releases/tag/v1.18.4) | 3923 | Zendesk (partial), Freshdesk (partial) |

</details>

<details>
<summary><b>E-commerce</b>, 9 tools</summary>

Run an online store, from catalogue to checkout.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Medusa](https://github.com/medusajs/medusa) | TypeScript | Other | [v2.21.1](https://github.com/medusajs/medusa/releases/tag/v2.21.1) signed | 36461 | Shopify (partial) |
| [Bagisto](https://github.com/bagisto/bagisto) | PHP | MIT | [v2.5.0-beta4](https://github.com/bagisto/bagisto/releases/tag/v2.5.0-beta4) | 28169 | Shopify (full) |
| [Saleor](https://github.com/saleor/saleor) | Python | BSD-3-Clause | [3.23.36](https://github.com/saleor/saleor/releases/tag/3.23.36) signed | 23375 | Shopify (partial) |
| [Spree Commerce](https://github.com/spree/spree) | Ruby | BSD-3-Clause | [v5.6.1](https://github.com/spree/spree/releases/tag/v5.6.1) | 15722 | Shopify (full) |
| [Magento Open Source](https://github.com/magento/magento2) | PHP | OSL-3.0 | [2.4.9](https://github.com/magento/magento2/releases/tag/2.4.9) | 12198 | Shopify (full) |
| [WooCommerce](https://github.com/woocommerce/woocommerce) | PHP | Other | [11.1.2](https://github.com/woocommerce/woocommerce/releases/tag/11.1.2) signed | 10535 | Shopify (full) |
| [EverShop](https://github.com/evershopcommerce/evershop) | TypeScript | GPL-3.0 | [v2.2.1](https://github.com/evershopcommerce/evershop/releases/tag/v2.2.1) | 10492 | Shopify (full) |
| [PrestaShop](https://github.com/PrestaShop/PrestaShop) | PHP | Other | [9.1.5](https://github.com/PrestaShop/PrestaShop/releases/tag/9.1.5) signed | 9219 | Shopify (full) |
| [Sylius](https://github.com/Sylius/Sylius) | PHP | MIT | [v2.2.9](https://github.com/Sylius/Sylius/releases/tag/v2.2.9) signed | 8542 | Shopify (partial) |

</details>

<details>
<summary><b>URL shorteners</b>, 4 tools</summary>

Short links on your own domain, with click statistics.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Dub](https://github.com/dubinc/dub) | TypeScript | Other | none | 24820 | Bitly (full) |
| [YOURLS](https://github.com/YOURLS/YOURLS) | PHP | MIT | [1.10.6](https://github.com/YOURLS/YOURLS/releases/tag/1.10.6) signed | 12243 | Bitly (full) |
| [Kutt](https://github.com/thedevs-network/kutt) | JavaScript | MIT | [v3.2.6](https://github.com/thedevs-network/kutt/releases/tag/v3.2.6) | 11123 | Bitly (full) |
| [Shlink](https://github.com/shlinkio/shlink) | PHP | MIT | [v5.1.7](https://github.com/shlinkio/shlink/releases/tag/v5.1.7) | 5303 | Bitly (full) |

</details>

<details>
<summary><b>Mail servers</b>, 6 tools</summary>

Host email for your own domains.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [docker-mailserver](https://github.com/docker-mailserver/docker-mailserver) | Shell | MIT | [v16.0.1](https://github.com/docker-mailserver/docker-mailserver/releases/tag/v16.0.1) signed | 18874 | Google Workspace (partial) |
| [Postal](https://github.com/postalserver/postal) | Ruby | MIT | [3.3.7](https://github.com/postalserver/postal/releases/tag/3.3.7) signed | 16828 | SendGrid (full) |
| [Mail-in-a-Box](https://github.com/mail-in-a-box/mailinabox) | Python | CC0-1.0 | [v76](https://github.com/mail-in-a-box/mailinabox/releases/tag/v76) | 15419 | Google Workspace (partial) |
| [Stalwart](https://github.com/stalwartlabs/stalwart) | Rust | none | [v0.16.23](https://github.com/stalwartlabs/stalwart/releases/tag/v0.16.23) | 14813 | Google Workspace (partial), Microsoft 365 (partial) |
| [mailcow](https://github.com/mailcow/mailcow-dockerized) | JavaScript | GPL-3.0 | [2026-09](https://github.com/mailcow/mailcow-dockerized/releases/tag/2026-09) signed | 13509 | Google Workspace (partial), Microsoft 365 (partial) |
| [Mailu](https://github.com/Mailu/Mailu) | Python | Other | [2024.06.59](https://github.com/Mailu/Mailu/releases/tag/2024.06.59) signed | 7522 | Google Workspace (partial) |

</details>

<details>
<summary><b>Cloud development environments</b>, 4 tools</summary>

Development environments on a remote machine, reached from a browser or a local editor.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [code-server](https://github.com/coder/code-server) | TypeScript | MIT | [v4.138.0](https://github.com/coder/code-server/releases/tag/v4.138.0) signed | 79416 | GitHub Codespaces (partial) |
| [Coder](https://github.com/coder/coder) | Go | AGPL-3.0 | [v2.36.6](https://github.com/coder/coder/releases/tag/v2.36.6) | 16688 | GitHub Codespaces (full) |
| [DevPod](https://github.com/loft-sh/devpod) | Go | MPL-2.0 | [v0.6.15](https://github.com/loft-sh/devpod/releases/tag/v0.6.15) | 15235 | GitHub Codespaces (full) |
| [Eclipse Che](https://github.com/eclipse-che/che) | TypeScript | EPL-2.0 | [7.122.0](https://github.com/eclipse-che/che/releases/tag/7.122.0) | 7169 | GitHub Codespaces (full) |

</details>

<details>
<summary><b>Service meshes</b>, 5 tools</summary>

Encrypt, route and observe traffic between services in a cluster.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Istio](https://github.com/istio/istio) | Go | Apache-2.0 | [1.31.1](https://github.com/istio/istio/releases/tag/1.31.1) | 38408 | Linkerd (full) |
| [Consul](https://github.com/hashicorp/consul) | Go | Other | [v2.0.4](https://github.com/hashicorp/consul/releases/tag/v2.0.4) signed | 30081 | Istio (full) |
| [Cilium](https://github.com/cilium/cilium) | Go | Apache-2.0 | [v1.20.2](https://github.com/cilium/cilium/releases/tag/v1.20.2) signed | 25550 | Istio (partial) |
| [Linkerd](https://github.com/linkerd/linkerd2) | Go | Apache-2.0 | [edge-26.9.3](https://github.com/linkerd/linkerd2/releases/tag/edge-26.9.3) signed | 11499 | none |
| [Kuma](https://github.com/kumahq/kuma) | Go | Apache-2.0 | [v2.14.5](https://github.com/kumahq/kuma/releases/tag/v2.14.5) | 4009 | Linkerd (full) |

</details>

<details>
<summary><b>API gateways</b>, 4 tools</summary>

Route, authenticate and rate-limit API traffic in front of services.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Kong Gateway](https://github.com/Kong/kong) | Lua | Apache-2.0 | [3.9.3](https://github.com/Kong/kong/releases/tag/3.9.3) signed | 44195 | none |
| [Apache APISIX](https://github.com/apache/apisix) | Lua | Apache-2.0 | [3.18.0](https://github.com/apache/apisix/releases/tag/3.18.0) | 17166 | Kong Gateway (full) |
| [Tyk](https://github.com/TykTechnologies/tyk) | Go | Other | [v5.14.0](https://github.com/TykTechnologies/tyk/releases/tag/v5.14.0) signed | 10833 | Kong Gateway (full) |
| [KrakenD](https://github.com/krakend/krakend-ce) | Go | Apache-2.0 | [v2.13.11](https://github.com/krakend/krakend-ce/releases/tag/v2.13.11) signed | 2688 | Kong Gateway (partial) |

</details>

<details>
<summary><b>Workflow orchestration</b>, 7 tools</summary>

Schedule and run data pipelines and jobs as dependency graphs.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Apache Airflow](https://github.com/apache/airflow) | Python | Apache-2.0 | [3.3.2](https://github.com/apache/airflow/releases/tag/3.3.2) | 46970 | none |
| [Kestra](https://github.com/kestra-io/kestra) | Java | Apache-2.0 | [v2.0.3](https://github.com/kestra-io/kestra/releases/tag/v2.0.3) | 28348 | Apache Airflow (full) |
| [Prefect](https://github.com/PrefectHQ/prefect) | Python | Apache-2.0 | [3.8.6](https://github.com/PrefectHQ/prefect/releases/tag/3.8.6) signed | 23922 | Apache Airflow (full) |
| [Luigi](https://github.com/spotify/luigi) | Python | Apache-2.0 | [v3.8.1](https://github.com/spotify/luigi/releases/tag/v3.8.1) | 18778 | Apache Airflow (partial) |
| [Argo Workflows](https://github.com/argoproj/argo-workflows) | Go | Apache-2.0 | [v4.1.4](https://github.com/argoproj/argo-workflows/releases/tag/v4.1.4) signed | 17004 | Apache Airflow (full) |
| [Dagster](https://github.com/dagster-io/dagster) | Python | Apache-2.0 | [1.13.24](https://github.com/dagster-io/dagster/releases/tag/1.13.24) | 16198 | Apache Airflow (full) |
| [Apache DolphinScheduler](https://github.com/apache/dolphinscheduler) | Java | Apache-2.0 | [3.4.3](https://github.com/apache/dolphinscheduler/releases/tag/3.4.3) | 14501 | Apache Airflow (full) |

</details>

<details>
<summary><b>Vector databases</b>, 5 tools</summary>

Store embeddings and search them by similarity.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Milvus](https://github.com/milvus-io/milvus) | Go | Apache-2.0 | [v3.0.2](https://github.com/milvus-io/milvus/releases/tag/v3.0.2) signed | 46255 | Pinecone (full) |
| [Qdrant](https://github.com/qdrant/qdrant) | Rust | Apache-2.0 | [v1.19.1](https://github.com/qdrant/qdrant/releases/tag/v1.19.1) signed | 34816 | Pinecone (full) |
| [Chroma](https://github.com/chroma-core/chroma) | Rust | Apache-2.0 | [1.5.9](https://github.com/chroma-core/chroma/releases/tag/1.5.9) signed | 29375 | Pinecone (partial) |
| [pgvector](https://github.com/pgvector/pgvector) | C | Other | [v0.8.6](https://github.com/pgvector/pgvector/releases/tag/v0.8.6) | 23157 | Pinecone (partial) |
| [Weaviate](https://github.com/weaviate/weaviate) | Go | Other | [v1.39.7](https://github.com/weaviate/weaviate/releases/tag/v1.39.7) | 16846 | Pinecone (full) |

</details>

<details>
<summary><b>Analytical databases</b>, 8 tools</summary>

Columnar SQL engines for analytics over large datasets.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [ClickHouse](https://github.com/ClickHouse/ClickHouse) | C++ | Apache-2.0 | [v26.9.2.8-stable](https://github.com/ClickHouse/ClickHouse/releases/tag/v26.9.2.8-stable) | 50070 | Snowflake (full), BigQuery (full) |
| [DuckDB](https://github.com/duckdb/duckdb) | C++ | MIT | [v1.5.5](https://github.com/duckdb/duckdb/releases/tag/v1.5.5) signed | 41705 | Snowflake (partial), BigQuery (partial) |
| [Presto](https://github.com/prestodb/presto) | Java | Apache-2.0 | [0.299](https://github.com/prestodb/presto/releases/tag/0.299) | 16745 | Amazon Athena (full) |
| [Apache Doris](https://github.com/apache/doris) | Java | Apache-2.0 | [4.1.4](https://github.com/apache/doris/releases/tag/4.1.4) | 15998 | Snowflake (full) |
| [Apache Druid](https://github.com/apache/druid) | Java | Apache-2.0 | [druid-37.0.0](https://github.com/apache/druid/releases/tag/druid-37.0.0) | 14059 | none |
| [Trino](https://github.com/trinodb/trino) | Java | Apache-2.0 | [483](https://github.com/trinodb/trino/releases/tag/483) | 13280 | Amazon Athena (full), BigQuery (partial) |
| [StarRocks](https://github.com/StarRocks/starrocks) | Java | Apache-2.0 | [4.1.3](https://github.com/StarRocks/starrocks/releases/tag/4.1.3) | 12141 | Snowflake (full) |
| [Databend](https://github.com/databendlabs/databend) | Rust | Other | [v1.2.881](https://github.com/databendlabs/databend/releases/tag/v1.2.881) signed | 9451 | Snowflake (full) |

</details>

<details>
<summary><b>Home automation</b>, 5 tools</summary>

Control and automate smart home devices locally.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Home Assistant](https://github.com/home-assistant/core) | Python | Apache-2.0 | [2026.9.3](https://github.com/home-assistant/core/releases/tag/2026.9.3) signed | 91144 | SmartThings (full) |
| [Homebridge](https://github.com/homebridge/homebridge) | TypeScript | Apache-2.0 | [v2.4.0](https://github.com/homebridge/homebridge/releases/tag/v2.4.0) | 25501 | none |
| [Zigbee2MQTT](https://github.com/Koenkk/zigbee2mqtt) | TypeScript | GPL-3.0 | [2.14.1](https://github.com/Koenkk/zigbee2mqtt/releases/tag/2.14.1) signed | 15666 | SmartThings (partial) |
| [ESPHome](https://github.com/esphome/esphome) | C++ | Other | [2026.9.0](https://github.com/esphome/esphome/releases/tag/2026.9.0) signed | 11722 | none |
| [openHAB](https://github.com/openhab/openhab-core) | Java | EPL-2.0 | [ref-2.0.0.b1](https://github.com/openhab/openhab-core/releases/tag/ref-2.0.0.b1) | 1142 | SmartThings (full), Home Assistant (full) |

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
