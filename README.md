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
  <a href="https://github.com/awesome-alternatives/awesome-alternatives/actions/workflows/freshness.yml"><img alt="Catalog freshness" src="https://github.com/awesome-alternatives/awesome-alternatives/actions/workflows/freshness.yml/badge.svg"></a>
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

Each tool page also shows how alive a project is, as counts and dates rather than a score: when the
repository was created, the median gap between its latest stable releases (once there are three),
how many distinct people committed to the default branch in the last 90 days (bots left out, and
shown as a lower bound such as `40+` past the 500 most recent commits), and the operating systems and
architectures named by the files of the latest release, when they name any.

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
<summary><b>Release automation</b>, 11 tools</summary>

Version bumps, changelogs, tags and published releases from commit history.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [semantic-release](https://github.com/semantic-release/semantic-release) | JavaScript | MIT | [v25.0.9](https://github.com/semantic-release/semantic-release/releases/tag/v25.0.9) signed | 24090 | none |
| [GoReleaser](https://github.com/goreleaser/goreleaser) | Go | MIT | [v2.18.2](https://github.com/goreleaser/goreleaser/releases/tag/v2.18.2) signed | 16088 | none |
| [Changesets](https://github.com/changesets/changesets) | TypeScript | MIT | [@changesets/cli@3.0.3](https://github.com/changesets/changesets/releases/tag/%40changesets/cli%403.0.3) signed | 12467 | semantic-release (full), Lerna (partial) |
| [release-it](https://github.com/release-it/release-it) | JavaScript | MIT | [21.1.0](https://github.com/release-it/release-it/releases/tag/21.1.0) | 9065 | semantic-release (partial) |
| [release-please](https://github.com/googleapis/release-please) | TypeScript | Apache-2.0 | [v17.11.2](https://github.com/googleapis/release-please/releases/tag/v17.11.2) signed | 7594 | semantic-release (full) |
| [Commitizen](https://github.com/commitizen-tools/commitizen) | Python | MIT | [v4.19.1](https://github.com/commitizen-tools/commitizen/releases/tag/v4.19.1) | 3524 | semantic-release (partial) |
| [cargo-release](https://github.com/crate-ci/cargo-release) | Rust | Apache-2.0 | [v1.1.6](https://github.com/crate-ci/cargo-release/releases/tag/v1.1.6) | 1591 | none |
| [release-plz](https://github.com/release-plz/release-plz) | Rust | Apache-2.0 | [release-plz-v0.3.169](https://github.com/release-plz/release-plz/releases/tag/release-plz-v0.3.169) | 1496 | semantic-release (partial), cargo-release (full) |
| [cocogitto](https://github.com/cocogitto/cocogitto) | Rust | MIT | [7.0.0](https://github.com/cocogitto/cocogitto/releases/tag/7.0.0) | 1209 | semantic-release (full), conventional-changelog (partial) |
| [knope](https://github.com/knope-dev/knope) | Rust | MIT | [knope/v0.23.0](https://github.com/knope-dev/knope/releases/tag/knope/v0.23.0) signed | 197 | semantic-release (full), Changesets (full) |
| [FerrFlow](https://github.com/FerrLabs/FerrFlow) verified | Rust | MIT | [v7.28.2](https://github.com/FerrLabs/FerrFlow/releases/tag/v7.28.2) signed | 6 | semantic-release (full), release-please (full), Changesets (full), release-plz (full), knope (full), cocogitto (full), git-cliff (partial), Lerna (partial), conventional-changelog (partial), cargo-release (full) |

</details>

<details>
<summary><b>Changelog generation</b>, 5 tools</summary>

Changelogs built from commits or pull requests, without driving the release itself.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [git-cliff](https://github.com/orhun/git-cliff) | Rust | Apache-2.0 | [v2.14.2](https://github.com/orhun/git-cliff/releases/tag/v2.14.2) signed | 12284 | semantic-release (partial), conventional-changelog (full) |
| [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) | TypeScript | ISC | [git-client-v3.2.0](https://github.com/conventional-changelog/conventional-changelog/releases/tag/git-client-v3.2.0) signed | 8516 | none |
| [GitHub Changelog Generator](https://github.com/github-changelog-generator/github-changelog-generator) | Ruby | MIT | [v1.18.0](https://github.com/github-changelog-generator/github-changelog-generator/releases/tag/v1.18.0) | 7537 | conventional-changelog (full) |
| [Release Drafter](https://github.com/release-drafter/release-drafter) | TypeScript | ISC | [v7.9.0](https://github.com/release-drafter/release-drafter/releases/tag/v7.9.0) signed | 3945 | conventional-changelog (partial) |
| [towncrier](https://github.com/twisted/towncrier) | Python | MIT | [26.9.0](https://github.com/twisted/towncrier/releases/tag/26.9.0) | 923 | none |

</details>

<details>
<summary><b>JavaScript runtimes</b>, 5 tools</summary>

Engines that run JavaScript and TypeScript outside the browser.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Node.js](https://github.com/nodejs/node) | JavaScript | Other | [v26.10.0](https://github.com/nodejs/node/releases/tag/v26.10.0) signed | 122374 | none |
| [Deno](https://github.com/denoland/deno) | Rust | MIT | [v2.9.7](https://github.com/denoland/deno/releases/tag/v2.9.7) signed | 108660 | Node.js (full), ts-node (full) |
| [Bun](https://github.com/oven-sh/bun) | Rust | Other | [bun-v1.4.2](https://github.com/oven-sh/bun/releases/tag/bun-v1.4.2) | 96132 | Node.js (full), npm (full), ts-node (full), Jest (partial) |
| [ts-node](https://github.com/TypeStrong/ts-node) | TypeScript | MIT | [v10.9.2](https://github.com/TypeStrong/ts-node/releases/tag/v10.9.2) | 13119 | none |
| [tsx](https://github.com/privatenumber/tsx) | TypeScript | MIT | [v4.23.15](https://github.com/privatenumber/tsx/releases/tag/v4.23.15) signed | 12163 | ts-node (full) |

</details>

<details>
<summary><b>JavaScript package managers</b>, 3 tools</summary>

Install and lock npm dependencies.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [pnpm](https://github.com/pnpm/pnpm) | Rust | MIT | [v12.9.1](https://github.com/pnpm/pnpm/releases/tag/v12.9.1) signed | 36741 | npm (full) |
| [npm](https://github.com/npm/cli) | JavaScript | Other | [v12.2.0](https://github.com/npm/cli/releases/tag/v12.2.0) | 10172 | none |
| [Yarn](https://github.com/yarnpkg/berry) | TypeScript | BSD-2-Clause | [@yarnpkg/cli/4.18.1](https://github.com/yarnpkg/berry/releases/tag/%40yarnpkg/cli/4.18.1) | 8103 | npm (full) |

</details>

<details>
<summary><b>JavaScript bundlers</b>, 10 tools</summary>

Bundle, transform and serve front-end code.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Create React App](https://github.com/react/create-react-app) | JavaScript | MIT | [v5.0.1](https://github.com/react/create-react-app/releases/tag/v5.0.1) signed | 103230 | none |
| [Vite](https://github.com/vitejs/vite) | TypeScript | MIT | [v7.3.7](https://github.com/vitejs/vite/releases/tag/v7.3.7) signed | 83187 | webpack (full), Create React App (full) |
| [webpack](https://github.com/webpack/webpack) | JavaScript | MIT | [v5.111.1](https://github.com/webpack/webpack/releases/tag/v5.111.1) signed | 66028 | none |
| [Babel](https://github.com/babel/babel) | TypeScript | MIT | [v8.0.6](https://github.com/babel/babel/releases/tag/v8.0.6) | 44102 | none |
| [Parcel](https://github.com/parcel-bundler/parcel) | JavaScript | MIT | [v2.16.4](https://github.com/parcel-bundler/parcel/releases/tag/v2.16.4) | 44017 | webpack (full), Create React App (partial) |
| [esbuild](https://github.com/evanw/esbuild) | Go | MIT | [v0.28.2](https://github.com/evanw/esbuild/releases/tag/v0.28.2) | 40074 | webpack (partial) |
| [SWC](https://github.com/swc-project/swc) | Rust | Apache-2.0 | [v1.16.13](https://github.com/swc-project/swc/releases/tag/v1.16.13) | 34210 | Babel (full) |
| [Rollup](https://github.com/rollup/rollup) | JavaScript | Other | [v4.64.0](https://github.com/rollup/rollup/releases/tag/v4.64.0) | 26305 | none |
| [Rolldown](https://github.com/rolldown/rolldown) | Rust | MIT | [v1.2.12](https://github.com/rolldown/rolldown/releases/tag/v1.2.12) signed | 13962 | Rollup (full) |
| [Rspack](https://github.com/web-infra-dev/rspack) | Rust | MIT | [v2.2.8](https://github.com/web-infra-dev/rspack/releases/tag/v2.2.8) | 12932 | webpack (drop-in) |

</details>

<details>
<summary><b>JavaScript linting and formatting</b>, 6 tools</summary>

Linters and formatters for JavaScript and TypeScript.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Prettier](https://github.com/prettier/prettier) | JavaScript | MIT | [3.9.9](https://github.com/prettier/prettier/releases/tag/3.9.9) | 52376 | none |
| [ESLint](https://github.com/eslint/eslint) | JavaScript | MIT | [v10.12.0](https://github.com/eslint/eslint/releases/tag/v10.12.0) | 27593 | TSLint (full) |
| [Biome](https://github.com/biomejs/biome) | Rust | Apache-2.0 | [@biomejs/biome@2.5.15](https://github.com/biomejs/biome/releases/tag/%40biomejs/biome%402.5.15) signed | 25903 | ESLint (partial), Prettier (full) |
| [Oxc](https://github.com/oxc-project/oxc) | Rust | MIT | [oxlint_v1.87.0](https://github.com/oxc-project/oxc/releases/tag/oxlint_v1.87.0) | 22946 | ESLint (partial) |
| [TSLint](https://github.com/palantir/tslint) archived | TypeScript | Apache-2.0 | [6.1.3](https://github.com/palantir/tslint/releases/tag/6.1.3) signed | 5899 | none |
| [dprint](https://github.com/dprint/dprint) | Rust | MIT | [0.60.1](https://github.com/dprint/dprint/releases/tag/0.60.1) | 4088 | Prettier (full) |

</details>

<details>
<summary><b>JavaScript test runners</b>, 5 tools</summary>

Run unit and integration tests for JavaScript and TypeScript.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Jest](https://github.com/jestjs/jest) | TypeScript | MIT | [v30.5.2](https://github.com/jestjs/jest/releases/tag/v30.5.2) | 45517 | none |
| [Mocha](https://github.com/mochajs/mocha) | JavaScript | MIT | [v12.0.3](https://github.com/mochajs/mocha/releases/tag/v12.0.3) signed | 22892 | none |
| [AVA](https://github.com/avajs/ava) | JavaScript | MIT | [v8.0.1](https://github.com/avajs/ava/releases/tag/v8.0.1) signed | 20824 | Mocha (full) |
| [Vitest](https://github.com/vitest-dev/vitest) | TypeScript | MIT | [v5.0.3](https://github.com/vitest-dev/vitest/releases/tag/v5.0.3) signed | 17185 | Jest (full), Mocha (full) |
| [Jasmine](https://github.com/jasmine/jasmine) | JavaScript | MIT | [v7.0.1](https://github.com/jasmine/jasmine/releases/tag/v7.0.1) | 15813 | Mocha (full) |

</details>

<details>
<summary><b>Python packaging</b>, 12 tools</summary>

Install dependencies, manage environments and lock Python projects.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [uv](https://github.com/astral-sh/uv) | Rust | Apache-2.0 | [0.12.23](https://github.com/astral-sh/uv/releases/tag/0.12.23) signed | 90421 | pip (full), Poetry (full), Pipenv (full), pyenv (full), pip-tools (full) |
| [pyenv](https://github.com/pyenv/pyenv) | Shell | MIT | [v2.8.8](https://github.com/pyenv/pyenv/releases/tag/v2.8.8) | 45125 | none |
| [Poetry](https://github.com/python-poetry/poetry) | Python | MIT | [2.5.1](https://github.com/python-poetry/poetry/releases/tag/2.5.1) | 34304 | Pipenv (full) |
| [Pipenv](https://github.com/pypa/pipenv) | Python | MIT | [v2026.8.0](https://github.com/pypa/pipenv/releases/tag/v2026.8.0) | 25024 | none |
| [pipx](https://github.com/pypa/pipx) | Python | MIT | [1.17.11](https://github.com/pypa/pipx/releases/tag/1.17.11) | 12977 | none |
| [pip](https://github.com/pypa/pip) | Python | MIT | [26.2.1](https://github.com/pypa/pip/releases/tag/26.2.1) signed | 10291 | none |
| [PDM](https://github.com/pdm-project/pdm) | Python | MIT | [2.29.2](https://github.com/pdm-project/pdm/releases/tag/2.29.2) | 8665 | Poetry (full), Pipenv (full) |
| [mamba](https://github.com/mamba-org/mamba) | C++ | BSD-3-Clause | [2.9.0](https://github.com/mamba-org/mamba/releases/tag/2.9.0) signed | 8100 | conda (drop-in) |
| [pip-tools](https://github.com/jazzband/pip-tools) | Python | BSD-3-Clause | [v7.6.1](https://github.com/jazzband/pip-tools/releases/tag/v7.6.1) | 8007 | none |
| [pixi](https://github.com/prefix-dev/pixi) | Rust | BSD-3-Clause | [v0.81.0](https://github.com/prefix-dev/pixi/releases/tag/v0.81.0) | 7828 | conda (full), Poetry (partial) |
| [conda](https://github.com/conda/conda) | Python | Other | [26.9.1](https://github.com/conda/conda/releases/tag/26.9.1) signed | 7524 | none |
| [Hatch](https://github.com/pypa/hatch) | Python | MIT | [hatch-v1.18.1](https://github.com/pypa/hatch/releases/tag/hatch-v1.18.1) signed | 7241 | Poetry (partial), Pipenv (partial) |

</details>

<details>
<summary><b>Python linting and formatting</b>, 6 tools</summary>

Linters and formatters for Python.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Ruff](https://github.com/astral-sh/ruff) | Rust | MIT | [0.16.10](https://github.com/astral-sh/ruff/releases/tag/0.16.10) signed | 49923 | Flake8 (full), Black (drop-in), Pylint (partial), isort (full) |
| [Black](https://github.com/psf/black) | Python | MIT | [26.10.0](https://github.com/psf/black/releases/tag/26.10.0) signed | 41869 | none |
| [YAPF](https://github.com/google/yapf) | Python | Apache-2.0 | [v0.43.0](https://github.com/google/yapf/releases/tag/v0.43.0) | 13991 | Black (full) |
| [isort](https://github.com/PyCQA/isort) | Python | MIT | [9.0.2](https://github.com/PyCQA/isort/releases/tag/9.0.2) | 6962 | none |
| [Pylint](https://github.com/pylint-dev/pylint) | Python | GPL-2.0 | [v4.1.2](https://github.com/pylint-dev/pylint/releases/tag/v4.1.2) signed | 5730 | none |
| [Flake8](https://github.com/PyCQA/flake8) | Python | Other | [7.4.1](https://github.com/PyCQA/flake8/releases/tag/7.4.1) signed | 3825 | none |

</details>

<details>
<summary><b>Infrastructure as code</b>, 7 tools</summary>

Declare cloud infrastructure in files and apply the difference.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Terraform](https://github.com/hashicorp/terraform) | Go | Other | [v1.16.5](https://github.com/hashicorp/terraform/releases/tag/v1.16.5) signed | 49830 | none |
| [OpenTofu](https://github.com/opentofu/opentofu) | Go | MPL-2.0 | [v1.13.1](https://github.com/opentofu/opentofu/releases/tag/v1.13.1) | 30393 | Terraform (drop-in), AWS CloudFormation (full) |
| [SST](https://github.com/anomalyco/sst) | TypeScript | MIT | [v4.17.1](https://github.com/anomalyco/sst/releases/tag/v4.17.1) signed | 26335 | none |
| [Pulumi](https://github.com/pulumi/pulumi) | Go | Apache-2.0 | [v3.267.0](https://github.com/pulumi/pulumi/releases/tag/v3.267.0) signed | 25761 | Terraform (full), AWS CloudFormation (full) |
| [AWS CDK](https://github.com/aws/aws-cdk) | TypeScript | Apache-2.0 | [v2.272.0](https://github.com/aws/aws-cdk/releases/tag/v2.272.0) signed | 12919 | none |
| [Crossplane](https://github.com/crossplane/crossplane) | Go | Apache-2.0 | [v2.4.2](https://github.com/crossplane/crossplane/releases/tag/v2.4.2) | 12133 | Terraform (partial), AWS CloudFormation (partial) |
| [Terragrunt](https://github.com/gruntwork-io/terragrunt) | Go | MIT | [v1.1.6](https://github.com/gruntwork-io/terragrunt/releases/tag/v1.1.6) signed | 9870 | none |

</details>

<details>
<summary><b>Container engines</b>, 7 tools</summary>

Build and run OCI containers.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Docker Engine (Moby)](https://github.com/moby/moby) | Go | Apache-2.0 | [docker-v29.8.2](https://github.com/moby/moby/releases/tag/docker-v29.8.2) signed | 72153 | none |
| [Podman](https://github.com/podman-container-tools/podman) | Go | Apache-2.0 | [v6.1.3](https://github.com/podman-container-tools/podman/releases/tag/v6.1.3) signed | 33003 | Docker Engine (Moby) (drop-in) |
| [containerd](https://github.com/containerd/containerd) | Go | Apache-2.0 | [v2.4.1](https://github.com/containerd/containerd/releases/tag/v2.4.1) signed | 21380 | Docker Engine (Moby) (partial) |
| [runc](https://github.com/opencontainers/runc) | Go | Apache-2.0 | [v1.5.2](https://github.com/opencontainers/runc/releases/tag/v1.5.2) signed | 13474 | none |
| [nerdctl](https://github.com/containerd/nerdctl) | Go | Apache-2.0 | [v2.4.1](https://github.com/containerd/nerdctl/releases/tag/v2.4.1) signed | 10419 | Docker Engine (Moby) (full) |
| [BuildKit](https://github.com/moby/buildkit) | Go | Apache-2.0 | [v0.33.1](https://github.com/moby/buildkit/releases/tag/v0.33.1) signed | 10304 | none |
| [Buildah](https://github.com/podman-container-tools/buildah) | Go | Apache-2.0 | [v1.45.1](https://github.com/podman-container-tools/buildah/releases/tag/v1.45.1) signed | 9053 | Docker Engine (Moby) (partial) |

</details>

<details>
<summary><b>In-memory key-value stores</b>, 7 tools</summary>

Caches and data structure servers speaking the Redis protocol or close to it.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Redis](https://github.com/redis/redis) | C | Other | [8.10.2](https://github.com/redis/redis/releases/tag/8.10.2) | 76609 | none |
| [Dragonfly](https://github.com/dragonflydb/dragonfly) | C++ | Other | [v2.0.0](https://github.com/dragonflydb/dragonfly/releases/tag/v2.0.0) signed | 31747 | Redis (drop-in), Memcached (full) |
| [Valkey](https://github.com/valkey-io/valkey) | C | BSD-3-Clause | [9.1.2](https://github.com/valkey-io/valkey/releases/tag/9.1.2) signed | 27377 | Redis (drop-in), Memcached (partial) |
| [Memcached](https://github.com/memcached/memcached) | C | BSD-3-Clause | [1.6.45](https://github.com/memcached/memcached/releases/tag/1.6.45) | 14290 | none |
| [KeyDB](https://github.com/Snapchat/KeyDB) | C++ | BSD-3-Clause | [v6.3.4](https://github.com/Snapchat/KeyDB/releases/tag/v6.3.4) | 12504 | Redis (drop-in) |
| [Garnet](https://github.com/microsoft/garnet) | C# | MIT | [v2.2.0](https://github.com/microsoft/garnet/releases/tag/v2.2.0) signed | 12040 | Redis (partial) |
| [Apache Kvrocks](https://github.com/apache/kvrocks) | C++ | Apache-2.0 | [v2.17.0](https://github.com/apache/kvrocks/releases/tag/v2.17.0) | 4452 | Redis (partial) |

</details>

<details>
<summary><b>Search engines</b>, 9 tools</summary>

Full-text search servers.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Elasticsearch](https://github.com/elastic/elasticsearch) | Java | Other | [v9.5.4](https://github.com/elastic/elasticsearch/releases/tag/v9.5.4) signed | 78194 | none |
| [Meilisearch](https://github.com/meilisearch/meilisearch) | Rust | Other | [v1.54.3](https://github.com/meilisearch/meilisearch/releases/tag/v1.54.3) | 59496 | Elasticsearch (partial), Algolia (full) |
| [Typesense](https://github.com/typesense/typesense) | C++ | GPL-3.0 | [v30.2](https://github.com/typesense/typesense/releases/tag/v30.2) | 26631 | Elasticsearch (partial), Algolia (full) |
| [Sonic](https://github.com/valeriansaliou/sonic) | Rust | MPL-2.0 | [v1.10.2](https://github.com/valeriansaliou/sonic/releases/tag/v1.10.2) signed | 21357 | Elasticsearch (partial) |
| [ZincSearch](https://github.com/zincsearch/zincsearch) | Go | Other | [v1.0.0-beta3](https://github.com/zincsearch/zincsearch/releases/tag/v1.0.0-beta3) signed | 17918 | Elasticsearch (partial) |
| [OpenSearch](https://github.com/opensearch-project/OpenSearch) | Java | Apache-2.0 | [3.9.0](https://github.com/opensearch-project/OpenSearch/releases/tag/3.9.0) signed | 13814 | Elasticsearch (full), Splunk (partial) |
| [Manticore Search](https://github.com/manticoresoftware/manticoresearch) | C++ | GPL-3.0 | [release-29.9.0](https://github.com/manticoresoftware/manticoresearch/releases/tag/release-29.9.0) | 12043 | Elasticsearch (partial), Algolia (partial) |
| [ParadeDB](https://github.com/paradedb/paradedb) | Rust | AGPL-3.0 | [v0.26.0](https://github.com/paradedb/paradedb/releases/tag/v0.26.0) signed | 9356 | Elasticsearch (partial) |
| [Apache Solr](https://github.com/apache/solr) | Java | Apache-2.0 | [releases/solr/10.0.0](https://github.com/apache/solr/releases/tag/releases/solr/10.0.0) | 1681 | Elasticsearch (full) |

</details>

<details>
<summary><b>Metrics and monitoring</b>, 8 tools</summary>

Collect, store and query time series.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Netdata](https://github.com/netdata/netdata) | Go | GPL-3.0 | [v2.12.0](https://github.com/netdata/netdata/releases/tag/v2.12.0) | 80802 | Datadog (partial) |
| [Prometheus](https://github.com/prometheus/prometheus) | Go | Apache-2.0 | [v3.15.0](https://github.com/prometheus/prometheus/releases/tag/v3.15.0) | 66380 | Datadog (partial) |
| [Beszel](https://github.com/henrygd/beszel) | Go | MIT | [v0.21.0](https://github.com/henrygd/beszel/releases/tag/v0.21.0) signed | 25991 | none |
| [Telegraf](https://github.com/influxdata/telegraf) | Go | MIT | [v1.40.1](https://github.com/influxdata/telegraf/releases/tag/v1.40.1) | 17850 | none |
| [VictoriaMetrics](https://github.com/VictoriaMetrics/VictoriaMetrics) | Go | Apache-2.0 | [v1.153.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.153.0) | 17828 | Prometheus (full), InfluxDB (partial), Datadog (partial) |
| [Thanos](https://github.com/thanos-io/thanos) | Go | Apache-2.0 | [v0.42.4](https://github.com/thanos-io/thanos/releases/tag/v0.42.4) signed | 14230 | Prometheus (partial), Datadog (partial) |
| [Zabbix](https://github.com/zabbix/zabbix) | Go Template | AGPL-3.0 | [7.4.15](https://github.com/zabbix/zabbix/releases/tag/7.4.15) | 6440 | Datadog (partial) |
| [Grafana Mimir](https://github.com/grafana/mimir) | Go | AGPL-3.0 | [mimir-3.2.1](https://github.com/grafana/mimir/releases/tag/mimir-3.2.1) signed | 5249 | Prometheus (partial), Datadog (partial) |

</details>

<details>
<summary><b>Command-line HTTP clients</b>, 5 tools</summary>

Send HTTP requests from a terminal.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [curl](https://github.com/curl/curl) | C | Other | [curl-8_22_0](https://github.com/curl/curl/releases/tag/curl-8_22_0) signed | 43095 | none |
| [HTTPie](https://github.com/httpie/cli) | Python | BSD-3-Clause | [3.2.4](https://github.com/httpie/cli/releases/tag/3.2.4) | 38712 | none |
| [Hurl](https://github.com/Orange-OpenSource/hurl) | Rust | Apache-2.0 | [8.0.1](https://github.com/Orange-OpenSource/hurl/releases/tag/8.0.1) | 19237 | curl (partial) |
| [xh](https://github.com/ducaale/xh) | Rust | MIT | [v0.26.2](https://github.com/ducaale/xh/releases/tag/v0.26.2) | 8116 | HTTPie (full), curl (partial) |
| [curlie](https://github.com/rs/curlie) | Go | MIT | [v1.8.2](https://github.com/rs/curlie/releases/tag/v1.8.2) | 3730 | HTTPie (full) |

</details>

<details>
<summary><b>Code search</b>, 5 tools</summary>

Search file contents recursively from a terminal.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [ripgrep](https://github.com/BurntSushi/ripgrep) | Rust | Unlicense | [15.2.0](https://github.com/BurntSushi/ripgrep/releases/tag/15.2.0) signed | 68867 | The Silver Searcher (full), ack (full) |
| [The Silver Searcher](https://github.com/ggreer/the_silver_searcher) | C | Apache-2.0 | [2.2.0](https://github.com/ggreer/the_silver_searcher/releases/tag/2.2.0) | 27125 | none |
| [ast-grep](https://github.com/ast-grep/ast-grep) | Rust | MIT | [0.45.3](https://github.com/ast-grep/ast-grep/releases/tag/0.45.3) signed | 16124 | ripgrep (partial) |
| [ugrep](https://github.com/Genivia/ugrep) | C++ | BSD-3-Clause | [v7.8.5](https://github.com/Genivia/ugrep/releases/tag/v7.8.5) | 3305 | The Silver Searcher (full), ack (full) |
| [ack](https://github.com/beyondgrep/ack3) | Perl | Other | [v3.10.0](https://github.com/beyondgrep/ack3/releases/tag/v3.10.0) | 830 | none |

</details>

<details>
<summary><b>API clients</b>, 6 tools</summary>

Build, send and share HTTP and GraphQL requests from a desktop or browser app.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Hoppscotch](https://github.com/hoppscotch/hoppscotch) | TypeScript | MIT | [2026.9.0](https://github.com/hoppscotch/hoppscotch/releases/tag/2026.9.0) signed | 80571 | Insomnia (full), Postman (full) |
| [Bruno](https://github.com/usebruno/bruno) | JavaScript | MIT | [v4.2.1](https://github.com/usebruno/bruno/releases/tag/v4.2.1) | 47361 | Insomnia (full), Postman (full) |
| [Insomnia](https://github.com/Kong/insomnia) | TypeScript | Apache-2.0 | [core@13.3.0](https://github.com/Kong/insomnia/releases/tag/core%4013.3.0) | 40034 | none |
| [Yaak](https://github.com/mountain-loop/yaak) | TypeScript | MIT | [v2026.8.1](https://github.com/mountain-loop/yaak/releases/tag/v2026.8.1) signed | 19289 | Postman (full), Insomnia (full) |
| [Posting](https://github.com/darrenburns/posting) | Python | Apache-2.0 | [2.11.2](https://github.com/darrenburns/posting/releases/tag/2.11.2) signed | 12483 | Postman (partial) |
| [Requestly](https://github.com/requestly/requestly) | unknown | Other | [changelog-2026.03.23](https://github.com/requestly/requestly/releases/tag/changelog-2026.03.23) | 6757 | Postman (full) |

</details>

<details>
<summary><b>Monorepo tools</b>, 6 tools</summary>

Run, cache and orchestrate tasks across the packages of one repository.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Lerna](https://github.com/lerna/lerna) | TypeScript | MIT | [v10.0.1](https://github.com/lerna/lerna/releases/tag/v10.0.1) | 36044 | none |
| [Turborepo](https://github.com/vercel/turborepo) | Rust | MIT | [v2.11.7](https://github.com/vercel/turborepo/releases/tag/v2.11.7) signed | 31176 | Lerna (partial) |
| [Nx](https://github.com/nrwl/nx) | TypeScript | MIT | [22.7.12](https://github.com/nrwl/nx/releases/tag/22.7.12) | 29393 | Lerna (full) |
| [Bazel](https://github.com/bazelbuild/bazel) | Java | Apache-2.0 | [9.2.0](https://github.com/bazelbuild/bazel/releases/tag/9.2.0) | 25919 | none |
| [Rush](https://github.com/microsoft/rushstack) | TypeScript | Other | [5.181.0](https://www.npmjs.com/package/@microsoft/rush/v/5.181.0) | 6498 | Lerna (full) |
| [moon](https://github.com/moonrepo/moon) | Rust | MIT | [v2.6.0](https://github.com/moonrepo/moon/releases/tag/v2.6.0) | 4134 | Lerna (partial) |

</details>

<details>
<summary><b>Shell prompts</b>, 6 tools</summary>

Customisable prompts showing git state, runtimes and context.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh) | Shell | MIT | none | 190175 | none |
| [Starship](https://github.com/starship/starship) | Rust | ISC | [v1.26.0](https://github.com/starship/starship/releases/tag/v1.26.0) signed | 60161 | Powerlevel10k (full), Oh My Zsh (partial) |
| [Powerlevel10k](https://github.com/romkatv/powerlevel10k) | Shell | MIT | [v1.20.0](https://github.com/romkatv/powerlevel10k/releases/tag/v1.20.0) signed | 55203 | none |
| [Oh My Posh](https://github.com/JanDeDobbeleer/oh-my-posh) | Go | MIT | [v31.4.1](https://github.com/JanDeDobbeleer/oh-my-posh/releases/tag/v31.4.1) | 23549 | Powerlevel10k (full), Oh My Zsh (partial) |
| [Spaceship](https://github.com/spaceship-prompt/spaceship-prompt) | Shell | MIT | [v4.22.5](https://github.com/spaceship-prompt/spaceship-prompt/releases/tag/v4.22.5) | 20582 | Powerlevel10k (full), Oh My Zsh (partial) |
| [Pure](https://github.com/sindresorhus/pure) | Shell | MIT | [v1.28.3](https://github.com/sindresorhus/pure/releases/tag/v1.28.3) | 14437 | Powerlevel10k (full), Oh My Zsh (partial) |

</details>

<details>
<summary><b>Terminal multiplexers</b>, 3 tools</summary>

Split, detach and reattach terminal sessions.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [tmux](https://github.com/tmux/tmux) | C | ISC | [3.7c](https://github.com/tmux/tmux/releases/tag/3.7c) | 49773 | none |
| [Zellij](https://github.com/zellij-org/zellij) | Rust | MIT | [v0.45.1](https://github.com/zellij-org/zellij/releases/tag/v0.45.1) | 35659 | tmux (full) |
| [tmate](https://github.com/tmate-io/tmate) | C | Other | [2.4.0](https://github.com/tmate-io/tmate/releases/tag/2.4.0) | 6132 | tmux (partial) |

</details>

<details>
<summary><b>Document databases</b>, 6 tools</summary>

Databases storing JSON-like documents.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [SurrealDB](https://github.com/surrealdb/surrealdb) | Rust | Other | [v3.3.0](https://github.com/surrealdb/surrealdb/releases/tag/v3.3.0) signed | 33104 | MongoDB (partial) |
| [MongoDB](https://github.com/mongodb/mongo) | C++ | Other | [r8.3.11](https://github.com/mongodb/mongo/releases/tag/r8.3.11) | 28614 | none |
| [RethinkDB](https://github.com/rethinkdb/rethinkdb) | C++ | Other | [v2.4.4](https://github.com/rethinkdb/rethinkdb/releases/tag/v2.4.4) | 27007 | MongoDB (partial) |
| [ArangoDB](https://github.com/arangodb/arangodb) | C++ | Other | [v3.12.12.1](https://github.com/arangodb/arangodb/releases/tag/v3.12.12.1) | 14278 | MongoDB (partial) |
| [FerretDB](https://github.com/FerretDB/FerretDB) | Go | Apache-2.0 | [v2.7.0](https://github.com/FerretDB/FerretDB/releases/tag/v2.7.0) signed | 11090 | MongoDB (drop-in) |
| [Apache CouchDB](https://github.com/apache/couchdb) | Erlang | Apache-2.0 | [3.5.2](https://github.com/apache/couchdb/releases/tag/3.5.2) signed | 6969 | MongoDB (full) |

</details>

<details>
<summary><b>Wide-column databases</b>, 4 tools</summary>

Distributed databases storing wide, sparse rows partitioned across nodes.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [ScyllaDB](https://github.com/scylladb/scylladb) | C++ | Other | [scylla-2026.3.2](https://github.com/scylladb/scylladb/releases/tag/scylla-2026.3.2) | 15781 | Apache Cassandra (drop-in), Amazon Keyspaces (drop-in), Amazon DynamoDB (partial) |
| [Apache Cassandra](https://github.com/apache/cassandra) | Java | Apache-2.0 | [cassandra-5.0.9](https://github.com/apache/cassandra/releases/tag/cassandra-5.0.9) | 10114 | Amazon Keyspaces (drop-in), Astra DB (full) |
| [Apache HBase](https://github.com/apache/hbase) | Java | Apache-2.0 | [rel/3.0.0](https://github.com/apache/hbase/releases/tag/rel/3.0.0) signed | 5560 | Bigtable (full) |
| [Apache Accumulo](https://github.com/apache/accumulo) | Java | Apache-2.0 | [rel/3.0.0](https://github.com/apache/accumulo/releases/tag/rel/3.0.0) signed | 1173 | Bigtable (full) |

</details>

<details>
<summary><b>Graph databases</b>, 8 tools</summary>

Databases storing nodes and the relationships between them, queried by traversing the graph.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Dgraph](https://github.com/dgraph-io/dgraph) | Go | Apache-2.0 | [v25.4.1](https://github.com/dgraph-io/dgraph/releases/tag/v25.4.1) signed | 21804 | Amazon Neptune (partial) |
| [Neo4j](https://github.com/neo4j/neo4j) | Java | GPL-3.0 | [3.2.0-alpha08](https://github.com/neo4j/neo4j/releases/tag/3.2.0-alpha08) | 17275 | Amazon Neptune (partial), TigerGraph (partial) |
| [NebulaGraph](https://github.com/vesoft-inc/nebula) | C++ | Apache-2.0 | [v3.8.0](https://github.com/vesoft-inc/nebula/releases/tag/v3.8.0) signed | 12406 | TigerGraph (partial), Neo4j (partial) |
| [FalkorDB](https://github.com/FalkorDB/FalkorDB) | Rust | Other | [v6.0.1](https://github.com/FalkorDB/FalkorDB/releases/tag/v6.0.1) signed | 7497 | Neo4j (partial) |
| [JanusGraph](https://github.com/JanusGraph/janusgraph) | Java | Other | [v1.1.0](https://github.com/JanusGraph/janusgraph/releases/tag/v1.1.0) | 5842 | Azure Cosmos DB for Apache Gremlin (full), Amazon Neptune (partial) |
| [Apache AGE](https://github.com/apache/age) | C | Apache-2.0 | [PG18/v1.8.0-rc0](https://github.com/apache/age/releases/tag/PG18/v1.8.0-rc0) signed | 4874 | Neo4j (partial) |
| [Memgraph](https://github.com/memgraph/memgraph) | C++ | Other | [v3.13.1](https://github.com/memgraph/memgraph/releases/tag/v3.13.1) | 4595 | Neo4j (partial) |
| [Apache HugeGraph](https://github.com/apache/hugegraph) | Java | Apache-2.0 | [1.7.0](https://github.com/apache/hugegraph/releases/tag/1.7.0) signed | 3192 | Amazon Neptune (partial) |

</details>

<details>
<summary><b>Event streaming</b>, 8 tools</summary>

Durable, partitioned logs for events and messages.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Apache Kafka](https://github.com/apache/kafka) | Java | Apache-2.0 | [4.3.1](https://github.com/apache/kafka/releases/tag/4.3.1) | 33916 | none |
| [NSQ](https://github.com/nsqio/nsq) | Go | MIT | [v1.3.0](https://github.com/nsqio/nsq/releases/tag/v1.3.0) | 25769 | none |
| [Apache RocketMQ](https://github.com/apache/rocketmq) | Java | Apache-2.0 | [rocketmq-all-5.5.1](https://github.com/apache/rocketmq/releases/tag/rocketmq-all-5.5.1) signed | 22627 | Apache Kafka (full) |
| [NATS](https://github.com/nats-io/nats-server) | Go | Apache-2.0 | [v2.15.0](https://github.com/nats-io/nats-server/releases/tag/v2.15.0) signed | 20842 | Apache Kafka (partial) |
| [Apache Pulsar](https://github.com/apache/pulsar) | Java | Apache-2.0 | [v5.0.0](https://github.com/apache/pulsar/releases/tag/v5.0.0) signed | 15342 | Apache Kafka (full) |
| [RabbitMQ](https://github.com/rabbitmq/rabbitmq-server) | JavaScript | Other | [v4.3.6](https://github.com/rabbitmq/rabbitmq-server/releases/tag/v4.3.6) signed | 13904 | Amazon SQS (full), Apache Kafka (partial) |
| [Redpanda](https://github.com/redpanda-data/redpanda) | C++ | none | [v26.2.2](https://github.com/redpanda-data/redpanda/releases/tag/v26.2.2) signed | 12598 | Apache Kafka (drop-in) |
| [AutoMQ](https://github.com/AutoMQ/automq) | Java | Apache-2.0 | [1.7.5-rc1](https://github.com/AutoMQ/automq/releases/tag/1.7.5-rc1) | 10902 | Apache Kafka (drop-in) |

</details>

<details>
<summary><b>Web servers and reverse proxies</b>, 12 tools</summary>

Serve sites, terminate TLS and route traffic to services.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [frp](https://github.com/fatedier/frp) | Go | Apache-2.0 | [v0.71.0](https://github.com/fatedier/frp/releases/tag/v0.71.0) | 109755 | ngrok (partial) |
| [Caddy](https://github.com/caddyserver/caddy) | Go | Apache-2.0 | [v2.11.7](https://github.com/caddyserver/caddy/releases/tag/v2.11.7) signed | 77228 | nginx (full) |
| [Traefik](https://github.com/traefik/traefik) | Go | MIT | [v3.7.13](https://github.com/traefik/traefik/releases/tag/v3.7.13) signed | 65081 | nginx (partial), ingress-nginx (full) |
| [Nginx Proxy Manager](https://github.com/NginxProxyManager/nginx-proxy-manager) | TypeScript | MIT | [v2.16.0](https://github.com/NginxProxyManager/nginx-proxy-manager/releases/tag/v2.16.0) signed | 34324 | none |
| [nginx](https://github.com/nginx/nginx) | C | BSD-2-Clause | [release-1.31.6](https://github.com/nginx/nginx/releases/tag/release-1.31.6) | 31800 | none |
| [Envoy](https://github.com/envoyproxy/envoy) | C++ | Apache-2.0 | [v1.39.1](https://github.com/envoyproxy/envoy/releases/tag/v1.39.1) | 29042 | nginx (partial) |
| [Pangolin](https://github.com/fosrl/pangolin) | TypeScript | Other | [1.24.0](https://github.com/fosrl/pangolin/releases/tag/1.24.0) signed | 23014 | Cloudflare Tunnel (full), ngrok (partial) |
| [ingress-nginx](https://github.com/kubernetes/ingress-nginx) archived | Go | Apache-2.0 | [controller-v1.15.1](https://github.com/kubernetes/ingress-nginx/releases/tag/controller-v1.15.1) signed | 19457 | none |
| [OpenResty](https://github.com/openresty/openresty) | C | Other | [v1.27.1.2](https://github.com/openresty/openresty/releases/tag/v1.27.1.2) | 14063 | nginx (drop-in) |
| [Tengine](https://github.com/alibaba/tengine) | C | BSD-2-Clause | [3.1.0](https://github.com/alibaba/tengine/releases/tag/3.1.0) signed | 13384 | nginx (drop-in) |
| [BunkerWeb](https://github.com/bunkerity/bunkerweb) | Python | AGPL-3.0 | [v1.6.15](https://github.com/bunkerity/bunkerweb/releases/tag/v1.6.15) signed | 11042 | none |
| [HAProxy](https://github.com/haproxy/haproxy) | C | Other | [v3.4.0](https://github.com/haproxy/haproxy/releases/tag/v3.4.0) | 6907 | nginx (partial) |

</details>

<details>
<summary><b>Documentation site generators</b>, 10 tools</summary>

Turn Markdown into a searchable documentation site.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Docusaurus](https://github.com/facebook/docusaurus) | TypeScript | MIT | [v3.10.2](https://github.com/facebook/docusaurus/releases/tag/v3.10.2) | 66421 | GitBook (full) |
| [docsify](https://github.com/docsifyjs/docsify) | JavaScript | MIT | [v5.0.0](https://github.com/docsifyjs/docsify/releases/tag/v5.0.0) signed | 31542 | GitBook (partial) |
| [Material for MkDocs](https://github.com/squidfunk/mkdocs-material) | Python | MIT | [9.7.7](https://github.com/squidfunk/mkdocs-material/releases/tag/9.7.7) signed | 27546 | GitBook (full), Docusaurus (full) |
| [MkDocs](https://github.com/mkdocs/mkdocs) | Python | BSD-2-Clause | [1.6.1](https://github.com/mkdocs/mkdocs/releases/tag/1.6.1) signed | 22495 | GitBook (full) |
| [mdBook](https://github.com/rust-lang/mdBook) | Rust | MPL-2.0 | [v0.5.4](https://github.com/rust-lang/mdBook/releases/tag/v0.5.4) signed | 22193 | GitBook (full) |
| [VitePress](https://github.com/vuejs/vitepress) | TypeScript | MIT | [v2.0.0-alpha.20](https://github.com/vuejs/vitepress/releases/tag/v2.0.0-alpha.20) | 18380 | Docusaurus (full), GitBook (full) |
| [Nextra](https://github.com/shuding/nextra) | TypeScript | MIT | [nextra-theme-docs@4.6.1](https://github.com/shuding/nextra/releases/tag/nextra-theme-docs%404.6.1) | 13934 | GitBook (full), Docusaurus (full) |
| [Fumadocs](https://github.com/fuma-nama/fumadocs) | TypeScript | MIT | [fumadocs@16.16.2](https://github.com/fuma-nama/fumadocs/releases/tag/fumadocs%4016.16.2) signed | 13299 | GitBook (full), Nextra (full) |
| [Starlight](https://github.com/withastro/starlight) | TypeScript | MIT | [@astrojs/starlight@0.42.5](https://github.com/withastro/starlight/releases/tag/%40astrojs/starlight%400.42.5) signed | 9365 | Docusaurus (full), GitBook (full) |
| [Sphinx](https://github.com/sphinx-doc/sphinx) | Python | Other | [v9.1.0](https://github.com/sphinx-doc/sphinx/releases/tag/v9.1.0) | 8057 | GitBook (full) |

</details>

<details>
<summary><b>Static site generators</b>, 8 tools</summary>

Build websites from templates and content files.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Hugo](https://github.com/gohugoio/hugo) | Go | Apache-2.0 | [v0.167.0](https://github.com/gohugoio/hugo/releases/tag/v0.167.0) | 90046 | Jekyll (full), Hexo (full) |
| [Astro](https://github.com/withastro/astro) | TypeScript | Other | [astro@7.3.5](https://github.com/withastro/astro/releases/tag/astro%407.3.5) signed | 63069 | Gatsby (full), Jekyll (full), Hexo (full) |
| [Gatsby](https://github.com/gatsbyjs/gatsby) | JavaScript | MIT | [gatsby@5.16.1](https://github.com/gatsbyjs/gatsby/releases/tag/gatsby%405.16.1) | 55942 | none |
| [Jekyll](https://github.com/jekyll/jekyll) | Ruby | MIT | [v4.4.1](https://github.com/jekyll/jekyll/releases/tag/v4.4.1) | 51710 | none |
| [Hexo](https://github.com/hexojs/hexo) | TypeScript | MIT | [v8.1.2](https://github.com/hexojs/hexo/releases/tag/v8.1.2) | 41772 | none |
| [Eleventy](https://github.com/11ty/buildawesome) | JavaScript | MIT | [v3.1.6](https://github.com/11ty/buildawesome/releases/tag/v3.1.6) | 19949 | Jekyll (full), Hexo (full) |
| [Zola](https://github.com/getzola/zola) | Rust | EUPL-1.2 | [v0.23.6](https://github.com/getzola/zola/releases/tag/v0.23.6) | 17493 | Jekyll (full), Hexo (full) |
| [Pelican](https://github.com/getpelican/pelican) | Python | AGPL-3.0 | [4.12.0](https://github.com/getpelican/pelican/releases/tag/4.12.0) | 13351 | Jekyll (full), Hexo (full) |

</details>

<details>
<summary><b>Python type checkers</b>, 5 tools</summary>

Check Python type annotations before the code runs.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [mypy](https://github.com/python/mypy) | Python | Other | [v2.4.0](https://github.com/python/mypy/releases/tag/v2.4.0) | 20669 | none |
| [ty](https://github.com/astral-sh/ty) | Python | MIT | [0.0.84](https://github.com/astral-sh/ty/releases/tag/0.0.84) signed | 19805 | mypy (full) |
| [Pyright](https://github.com/microsoft/pyright) | Python | Other | [1.1.414](https://github.com/microsoft/pyright/releases/tag/1.1.414) | 15680 | mypy (full) |
| [Pyrefly](https://github.com/facebook/pyrefly) | Rust | MIT | [1.3.2](https://github.com/facebook/pyrefly/releases/tag/1.3.2) | 7047 | mypy (full), Pyright (full) |
| [basedpyright](https://github.com/DetachHead/basedpyright) | TypeScript | Other | [v1.40.2](https://github.com/DetachHead/basedpyright/releases/tag/v1.40.2) | 3621 | Pyright (full) |

</details>

<details>
<summary><b>Node.js web frameworks</b>, 8 tools</summary>

Routing and middleware for HTTP servers in JavaScript and TypeScript.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [NestJS](https://github.com/nestjs/nest) | TypeScript | MIT | [v12.1.1](https://github.com/nestjs/nest/releases/tag/v12.1.1) | 76794 | none |
| [Express](https://github.com/expressjs/express) | JavaScript | MIT | [v5.2.1](https://github.com/expressjs/express/releases/tag/v5.2.1) | 69549 | none |
| [Fastify](https://github.com/fastify/fastify) | JavaScript | MIT | [v5.12.5](https://github.com/fastify/fastify/releases/tag/v5.12.5) signed | 37231 | Express (full), Koa (full) |
| [Koa](https://github.com/koajs/koa) | JavaScript | MIT | [v3.2.1](https://github.com/koajs/koa/releases/tag/v3.2.1) signed | 35681 | none |
| [Hono](https://github.com/honojs/hono) | TypeScript | MIT | [v4.13.13](https://github.com/honojs/hono/releases/tag/v4.13.13) | 32417 | Express (full), Koa (full) |
| [Elysia](https://github.com/elysiajs/elysia) | TypeScript | MIT | [1.4.30](https://github.com/elysiajs/elysia/releases/tag/1.4.30) signed | 19217 | Express (full) |
| [AdonisJS](https://github.com/adonisjs/core) | TypeScript | MIT | [v7.6.0](https://github.com/adonisjs/core/releases/tag/v7.6.0) | 19142 | NestJS (full) |
| [hapi](https://github.com/hapijs/hapi) | JavaScript | Other | [v21.3.0](https://github.com/hapijs/hapi/releases/tag/v21.3.0) | 14788 | Express (full) |

</details>

<details>
<summary><b>TypeScript ORMs</b>, 7 tools</summary>

Typed database access and migrations for TypeScript.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Prisma ORM](https://github.com/prisma/orm) | TypeScript | Apache-2.0 | [v0.17.0](https://github.com/prisma/orm/releases/tag/v0.17.0) signed | 47697 | TypeORM (full), Sequelize (full) |
| [TypeORM](https://github.com/typeorm/typeorm) | TypeScript | MIT | [1.1.1](https://github.com/typeorm/typeorm/releases/tag/1.1.1) signed | 36661 | none |
| [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm) | TypeScript | Apache-2.0 | [drizzle-kit@0.31.11](https://github.com/drizzle-team/drizzle-orm/releases/tag/drizzle-kit%400.31.11) signed | 35961 | Prisma ORM (full), TypeORM (full), Sequelize (full) |
| [Sequelize](https://github.com/sequelize/sequelize) | TypeScript | MIT | [v6.37.8](https://github.com/sequelize/sequelize/releases/tag/v6.37.8) | 30355 | none |
| [Knex](https://github.com/knex/knex) | JavaScript | MIT | [3.3.0](https://github.com/knex/knex/releases/tag/3.3.0) | 20339 | Sequelize (partial), TypeORM (partial) |
| [Kysely](https://github.com/kysely-org/kysely) | TypeScript | MIT | [v0.29.6](https://github.com/kysely-org/kysely/releases/tag/v0.29.6) | 14262 | TypeORM (partial), Sequelize (partial), Prisma ORM (partial) |
| [MikroORM](https://github.com/mikro-orm/mikro-orm) | TypeScript | MIT | [v7.2.3](https://github.com/mikro-orm/mikro-orm/releases/tag/v7.2.3) | 9244 | TypeORM (full), Sequelize (full) |

</details>

<details>
<summary><b>Object storage</b>, 5 tools</summary>

Self-hosted servers speaking the S3 API.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [MinIO](https://github.com/minio/minio) archived | Go | AGPL-3.0 | [RELEASE.2025-10-15T17-29-55Z](https://github.com/minio/minio/releases/tag/RELEASE.2025-10-15T17-29-55Z) | 61341 | none |
| [SeaweedFS](https://github.com/seaweedfs/seaweedfs) | Go | Apache-2.0 | [4.48](https://github.com/seaweedfs/seaweedfs/releases/tag/4.48) | 35261 | MinIO (full), Amazon S3 (full) |
| [RustFS](https://github.com/rustfs/rustfs) | Rust | Apache-2.0 | [1.0.1](https://github.com/rustfs/rustfs/releases/tag/1.0.1) | 34424 | MinIO (full), Amazon S3 (full) |
| [Ceph](https://github.com/ceph/ceph) | C++ | Other | [v21.3.0](https://github.com/ceph/ceph/releases/tag/v21.3.0) | 17095 | MinIO (full), Amazon S3 (full) |
| [Garage](https://github.com/deuxfleurs-org/garage) | Rust | AGPL-3.0 | [v2.4.1](https://github.com/deuxfleurs-org/garage/releases/tag/v2.4.1) | 4647 | Amazon S3 (partial), MinIO (partial) |

</details>

<details>
<summary><b>CI servers</b>, 5 tools</summary>

Self-hosted servers that run build and deployment pipelines.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Jenkins](https://github.com/jenkinsci/jenkins) | Java | MIT | [jenkins-2.584](https://github.com/jenkinsci/jenkins/releases/tag/jenkins-2.584) | 26618 | none |
| [Tekton](https://github.com/tektoncd/pipeline) | Go | Apache-2.0 | [v1.17.0](https://github.com/tektoncd/pipeline/releases/tag/v1.17.0) | 9075 | Jenkins (partial) |
| [Woodpecker CI](https://github.com/woodpecker-ci/woodpecker) | Go | Apache-2.0 | [v3.18.1](https://github.com/woodpecker-ci/woodpecker/releases/tag/v3.18.1) signed | 7956 | Jenkins (full), CircleCI (full) |
| [Concourse](https://github.com/concourse/concourse) | Go | Apache-2.0 | [v8.3.1](https://github.com/concourse/concourse/releases/tag/v8.3.1) signed | 7912 | Jenkins (full), CircleCI (full) |
| [GoCD](https://github.com/gocd/gocd) | Java | Apache-2.0 | [26.1.0](https://github.com/gocd/gocd/releases/tag/26.1.0) signed | 7432 | Jenkins (full) |

</details>

<details>
<summary><b>Git forges</b>, 7 tools</summary>

Self-hosted repositories, code review and issues.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Gitea](https://github.com/go-gitea/gitea) | Go | MIT | [v28.0.0](https://github.com/go-gitea/gitea/releases/tag/v28.0.0) signed | 58315 | GitLab (full), GitHub (full), Jenkins (partial), Bitbucket (full), Gogs (full) |
| [Gogs](https://github.com/gogs/gogs) | Go | MIT | [v0.14.3](https://github.com/gogs/gogs/releases/tag/v0.14.3) signed | 47858 | GitHub (partial), Bitbucket (partial) |
| [Harness Open Source](https://github.com/harness/harness) | Go | Apache-2.0 | [v2.28.2](https://github.com/harness/harness/releases/tag/v2.28.2) | 38487 | GitHub (full), GitLab (full) |
| [GitLab](https://github.com/gitlabhq/gitlabhq) | Ruby | Other | [v19.4.1](https://github.com/gitlabhq/gitlabhq/releases/tag/v19.4.1) | 24555 | GitHub (full), Jenkins (partial), Bitbucket (full) |
| [OneDev](https://github.com/theonedev/onedev) | Java | MIT | [v16.8.4](https://github.com/theonedev/onedev/releases/tag/v16.8.4) | 15280 | GitLab (full), GitHub (full), Jenkins (partial), Bitbucket (full) |
| [GitBucket](https://github.com/gitbucket/gitbucket) | Scala | Apache-2.0 | [4.48.0](https://github.com/gitbucket/gitbucket/releases/tag/4.48.0) | 9402 | GitHub (partial) |
| [Soft Serve](https://github.com/charmbracelet/soft-serve) | Go | MIT | [v0.12.3](https://github.com/charmbracelet/soft-serve/releases/tag/v0.12.3) signed | 7250 | GitHub (partial) |

</details>

<details>
<summary><b>Password manager servers</b>, 3 tools</summary>

Self-hosted back ends for password vaults.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Vaultwarden](https://github.com/dani-garcia/vaultwarden) | Rust | AGPL-3.0 | [1.37.4](https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.4) signed | 68570 | Bitwarden server (drop-in), 1Password (full), LastPass (full), Dashlane (full) |
| [Bitwarden server](https://github.com/bitwarden/server) | C# | Other | [v2026.9.2](https://github.com/bitwarden/server/releases/tag/v2026.9.2) signed | 20242 | 1Password (full), LastPass (full), Dashlane (full) |
| [Passbolt](https://github.com/passbolt/passbolt_api) | PHP | AGPL-3.0 | [v5.16.0](https://github.com/passbolt/passbolt_api/releases/tag/v5.16.0) signed | 6149 | 1Password (full), LastPass (full) |

</details>

<details>
<summary><b>Web analytics</b>, 6 tools</summary>

Self-hostable, privacy-friendly site analytics.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [PostHog](https://github.com/PostHog/posthog) | Python | Other | [desktop-v0.61.621](https://github.com/PostHog/posthog/releases/tag/desktop-v0.61.621) | 40156 | Google Analytics (full), Mixpanel (full), Hotjar (full), Amplitude (full) |
| [Umami](https://github.com/umami-software/umami) | TypeScript | MIT | [v3.4.0](https://github.com/umami-software/umami/releases/tag/v3.4.0) signed | 39186 | Matomo (full), Google Analytics (partial) |
| [Plausible Analytics](https://github.com/plausible/analytics) | Elixir | AGPL-3.0 | [v3.2.1](https://github.com/plausible/analytics/releases/tag/v3.2.1) | 29321 | Matomo (full), Google Analytics (partial) |
| [Matomo](https://github.com/matomo-org/matomo) | PHP | GPL-3.0 | [5.14.1](https://github.com/matomo-org/matomo/releases/tag/5.14.1) | 21925 | Google Analytics (full) |
| [Rybbit](https://github.com/rybbit-io/rybbit) | TypeScript | AGPL-3.0 | [v2.9.0](https://github.com/rybbit-io/rybbit/releases/tag/v2.9.0) | 13096 | Google Analytics (full) |
| [GoatCounter](https://github.com/arp242/goatcounter) | Go | Other | [v2.7.0](https://github.com/arp242/goatcounter/releases/tag/v2.7.0) signed | 6041 | Google Analytics (partial) |

</details>

<details>
<summary><b>Uptime monitoring</b>, 7 tools</summary>

Check that services answer, alert when they do not, and publish a status page.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Uptime Kuma](https://github.com/louislam/uptime-kuma) | JavaScript | MIT | [2.5.5](https://github.com/louislam/uptime-kuma/releases/tag/2.5.5) signed | 92148 | Pingdom (full), Statuspage (full) |
| [Upptime](https://github.com/upptime/upptime) | Markdown | MIT | [v2.0.0](https://github.com/upptime/upptime/releases/tag/v2.0.0) signed | 17178 | Pingdom (partial), Statuspage (full) |
| [Gatus](https://github.com/TwiN/gatus) | Go | Apache-2.0 | [v5.37.0](https://github.com/TwiN/gatus/releases/tag/v5.37.0) signed | 12246 | Uptime Kuma (full), Pingdom (full), Statuspage (full) |
| [Checkmate](https://github.com/bluewave-labs/Checkmate) | TypeScript | AGPL-3.0 | [v3.12.0](https://github.com/bluewave-labs/Checkmate/releases/tag/v3.12.0) signed | 10911 | Pingdom (full), Statuspage (full) |
| [Healthchecks](https://github.com/healthchecks/healthchecks) | Python | BSD-3-Clause | [v4.4](https://github.com/healthchecks/healthchecks/releases/tag/v4.4) signed | 10385 | Cronitor (partial) |
| [OneUptime](https://github.com/OneUptime/oneuptime) | TypeScript | Other | [14.0.14](https://github.com/OneUptime/oneuptime/releases/tag/14.0.14) | 7704 | Pingdom (full), Statuspage (full) |
| [Kener](https://github.com/rajnandan1/kener) | TypeScript | MIT | [v4.1.6](https://github.com/rajnandan1/kener/releases/tag/v4.1.6) | 5190 | Statuspage (full) |

</details>

<details>
<summary><b>Log pipelines</b>, 6 tools</summary>

Collect, transform and ship logs and events.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Vector](https://github.com/vectordotdev/vector) | Rust | MPL-2.0 | [vdev-v0.3.26](https://github.com/vectordotdev/vector/releases/tag/vdev-v0.3.26) signed | 22669 | Logstash (full), Fluentd (full) |
| [Logstash](https://github.com/elastic/logstash) | Java | Other | [v9.5.4](https://github.com/elastic/logstash/releases/tag/v9.5.4) signed | 14960 | none |
| [Fluentd](https://github.com/fluent/fluentd) | Ruby | Apache-2.0 | [v1.19.4](https://github.com/fluent/fluentd/releases/tag/v1.19.4) | 13598 | none |
| [Beats](https://github.com/elastic/beats) | Go | Other | [v9.5.4](https://github.com/elastic/beats/releases/tag/v9.5.4) signed | 12659 | none |
| [Fluent Bit](https://github.com/fluent/fluent-bit) | C | Apache-2.0 | [v5.1.3](https://github.com/fluent/fluent-bit/releases/tag/v5.1.3) | 8132 | Logstash (full), Fluentd (full) |
| [OpenTelemetry Collector](https://github.com/open-telemetry/opentelemetry-collector) | Go | Apache-2.0 | [v0.162.0](https://github.com/open-telemetry/opentelemetry-collector/releases/tag/v0.162.0) signed | 7636 | Logstash (partial), Fluentd (partial) |

</details>

<details>
<summary><b>Team chat</b>, 6 tools</summary>

Self-hosted messaging for teams.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Rocket.Chat](https://github.com/RocketChat/Rocket.Chat) | TypeScript | Other | [8.9.0](https://github.com/RocketChat/Rocket.Chat/releases/tag/8.9.0) | 46213 | Mattermost (full), Slack (full), Microsoft Teams (partial) |
| [Mattermost](https://github.com/mattermost/mattermost) | TypeScript | Other | [v11.11.1](https://github.com/mattermost/mattermost/releases/tag/v11.11.1) signed | 39270 | Slack (full), Microsoft Teams (partial) |
| [Zulip](https://github.com/zulip/zulip) | Python | Apache-2.0 | [12.3](https://github.com/zulip/zulip/releases/tag/12.3) | 25998 | Mattermost (full), Slack (full) |
| [Campfire](https://github.com/basecamp/once-campfire) | Ruby | MIT | [v1.5.1](https://github.com/basecamp/once-campfire/releases/tag/v1.5.1) signed | 4732 | Slack (partial) |
| [Synapse](https://github.com/element-hq/synapse) | Python | AGPL-3.0 | [v1.162.0](https://github.com/element-hq/synapse/releases/tag/v1.162.0) signed | 4681 | Slack (partial), Microsoft Teams (partial) |
| [Stoat](https://github.com/stoatchat/stoatchat) | Rust | Other | [v0.15.7](https://github.com/stoatchat/stoatchat/releases/tag/v0.15.7) | 3380 | Discord (full) |

</details>

<details>
<summary><b>Terminal emulators</b>, 9 tools</summary>

Desktop terminal applications.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Windows Terminal](https://github.com/microsoft/terminal) | C++ | MIT | [v1.25.2733.0](https://github.com/microsoft/terminal/releases/tag/v1.25.2733.0) | 105085 | Warp (partial) |
| [Tabby](https://github.com/Eugeny/tabby) | TypeScript | MIT | [v1.0.237](https://github.com/Eugeny/tabby/releases/tag/v1.0.237) | 74835 | iTerm2 (full), Warp (partial) |
| [Alacritty](https://github.com/alacritty/alacritty) | Rust | Apache-2.0 | [v0.17.0](https://github.com/alacritty/alacritty/releases/tag/v0.17.0) signed | 65892 | iTerm2 (partial), Warp (partial) |
| [Ghostty](https://github.com/ghostty-org/ghostty) | Zig | MIT | [v1.3.1](https://github.com/ghostty-org/ghostty/releases/tag/v1.3.1) signed | 61871 | iTerm2 (full), Warp (partial) |
| [Hyper](https://github.com/vercel/hyper) | TypeScript | MIT | [v3.4.1](https://github.com/vercel/hyper/releases/tag/v3.4.1) | 44739 | iTerm2 (full), Warp (partial) |
| [kitty](https://github.com/kovidgoyal/kitty) | Python | GPL-3.0 | [v0.49.2](https://github.com/kovidgoyal/kitty/releases/tag/v0.49.2) signed | 35176 | iTerm2 (full), Warp (partial) |
| [WezTerm](https://github.com/wezterm/wezterm) | Rust | Other | [20240203-110809-5046fc22](https://github.com/wezterm/wezterm/releases/tag/20240203-110809-5046fc22) signed | 29133 | iTerm2 (full), Warp (partial), tmux (partial) |
| [Wave Terminal](https://github.com/wavetermdev/waveterm) | Go | Apache-2.0 | [v0.14.5](https://github.com/wavetermdev/waveterm/releases/tag/v0.14.5) signed | 22425 | Warp (full), iTerm2 (full) |
| [iTerm2](https://github.com/gnachman/iTerm2) | Swift | GPL-2.0 | [v3.7.4](https://github.com/gnachman/iTerm2/releases/tag/v3.7.4) | 18125 | none |

</details>

<details>
<summary><b>Code editors</b>, 12 tools</summary>

Editors for writing code.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Visual Studio Code](https://github.com/microsoft/vscode) | TypeScript | MIT | [1.140.0](https://github.com/microsoft/vscode/releases/tag/1.140.0) signed | 193560 | Atom (full) |
| [Neovim](https://github.com/neovim/neovim) | Vim Script | Other | [v0.12.5](https://github.com/neovim/neovim/releases/tag/v0.12.5) signed | 102849 | Vim (drop-in) |
| [Zed](https://github.com/zed-industries/zed) | Rust | Other | [v1.22.0](https://github.com/zed-industries/zed/releases/tag/v1.22.0) signed | 91333 | Visual Studio Code (full), Cursor (partial), Sublime Text (full), Atom (full) |
| [Atom](https://github.com/atom/atom) archived | JavaScript | MIT | [v1.60.0](https://github.com/atom/atom/releases/tag/v1.60.0) | 60719 | none |
| [Helix](https://github.com/helix-editor/helix) | Rust | MPL-2.0 | [25.07.1](https://github.com/helix-editor/helix/releases/tag/25.07.1) signed | 46480 | Vim (partial), Neovim (partial) |
| [Vim](https://github.com/vim/vim) | Vim Script | Vim | [v9.2.1167](https://github.com/vim/vim/releases/tag/v9.2.1167) signed | 41126 | none |
| [Lapce](https://github.com/lapce/lapce) | Rust | Apache-2.0 | [v0.4.6](https://github.com/lapce/lapce/releases/tag/v0.4.6) signed | 38899 | Visual Studio Code (partial) |
| [VSCodium](https://github.com/VSCodium/vscodium) | Shell | MIT | [1.135.06055](https://github.com/VSCodium/vscodium/releases/tag/1.135.06055) signed | 33518 | Visual Studio Code (drop-in) |
| [micro](https://github.com/micro-editor/micro) | Go | MIT | [v2.0.15](https://github.com/micro-editor/micro/releases/tag/v2.0.15) | 29669 | none |
| [Notepad++](https://github.com/notepad-plus-plus/notepad-plus-plus) | C++ | Other | [v8.9.8.1](https://github.com/notepad-plus-plus/notepad-plus-plus/releases/tag/v8.9.8.1) | 29465 | Sublime Text (partial) |
| [Kakoune](https://github.com/mawww/kakoune) | C++ | Unlicense | [v2026.05.21](https://github.com/mawww/kakoune/releases/tag/v2026.05.21) | 11087 | Vim (partial) |
| [Pulsar](https://github.com/pulsar-edit/pulsar) | JavaScript | Other | [v1.132.1](https://github.com/pulsar-edit/pulsar/releases/tag/v1.132.1) | 4163 | Atom (drop-in) |

</details>

<details>
<summary><b>File listing</b>, 5 tools</summary>

Replacements for ls with colours, icons and git status.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [exa](https://github.com/ogham/exa) | Rust | MIT | [v0.10.1](https://github.com/ogham/exa/releases/tag/v0.10.1) | 24448 | none |
| [eza](https://github.com/eza-community/eza) | Rust | EUPL-1.2 | [v0.23.5](https://github.com/eza-community/eza/releases/tag/v0.23.5) signed | 23478 | exa (drop-in) |
| [lsd](https://github.com/lsd-rs/lsd) | Rust | Apache-2.0 | [v1.2.0](https://github.com/lsd-rs/lsd/releases/tag/v1.2.0) signed | 16252 | exa (full) |
| [broot](https://github.com/Canop/broot) | Rust | MIT | [v1.61.0](https://github.com/Canop/broot/releases/tag/v1.61.0) | 13043 | exa (partial) |
| [colorls](https://github.com/athityakumar/colorls) | Ruby | MIT | [v1.5.0](https://github.com/athityakumar/colorls/releases/tag/v1.5.0) | 5140 | exa (full) |

</details>

<details>
<summary><b>Git diff pagers</b>, 4 tools</summary>

Make git diff output readable in a terminal.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [delta](https://github.com/dandavison/delta) | Rust | MIT | [0.20.1](https://github.com/dandavison/delta/releases/tag/0.20.1) | 32421 | diff-so-fancy (full) |
| [Difftastic](https://github.com/Wilfred/difftastic) | Rust | MIT | [0.71.0](https://github.com/Wilfred/difftastic/releases/tag/0.71.0) | 25981 | diff-so-fancy (partial) |
| [diff-so-fancy](https://github.com/so-fancy/diff-so-fancy) | Perl | MIT | [v1.4.14](https://github.com/so-fancy/diff-so-fancy/releases/tag/v1.4.14) | 18100 | none |
| [icdiff](https://github.com/jeffkaufman/icdiff) | Python | Other | [release-2.0.10](https://github.com/jeffkaufman/icdiff/releases/tag/release-2.0.10) | 4389 | diff-so-fancy (partial) |

</details>

<details>
<summary><b>JSON processors</b>, 5 tools</summary>

Query and transform JSON from the command line.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [jq](https://github.com/jqlang/jq) | C | Other | [jq-1.8.2](https://github.com/jqlang/jq/releases/tag/jq-1.8.2) signed | 35749 | none |
| [fx](https://github.com/antonmedv/fx) | Go | MIT | [40.0.0](https://github.com/antonmedv/fx/releases/tag/40.0.0) signed | 20642 | jq (partial) |
| [yq](https://github.com/mikefarah/yq) | Go | MIT | [v4.54.1](https://github.com/mikefarah/yq/releases/tag/v4.54.1) | 16061 | jq (partial) |
| [gojq](https://github.com/itchyny/gojq) | Go | MIT | [v0.12.19](https://github.com/itchyny/gojq/releases/tag/v0.12.19) | 3807 | jq (drop-in) |
| [jaq](https://github.com/01mf02/jaq) | Rust | MIT | [v3.1.1](https://github.com/01mf02/jaq/releases/tag/v3.1.1) | 3786 | jq (full) |

</details>

<details>
<summary><b>Load testing</b>, 7 tools</summary>

Generate traffic to measure how a service holds up.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [k6](https://github.com/grafana/k6) | Go | AGPL-3.0 | [v2.3.0](https://github.com/grafana/k6/releases/tag/v2.3.0) | 31797 | Apache JMeter (full), Gatling (full) |
| [Locust](https://github.com/locustio/locust) | Python | MIT | [2.46.7](https://github.com/locustio/locust/releases/tag/2.46.7) signed | 28198 | Apache JMeter (full), Gatling (full) |
| [Vegeta](https://github.com/tsenart/vegeta) | Go | MIT | [v12.13.0](https://github.com/tsenart/vegeta/releases/tag/v12.13.0) | 25217 | Apache JMeter (partial) |
| [oha](https://github.com/hatoo/oha) | Rust | MIT | [v1.16.0](https://github.com/hatoo/oha/releases/tag/v1.16.0) signed | 10575 | none |
| [Apache JMeter](https://github.com/apache/jmeter) | Java | Apache-2.0 | [rel/v5.6.3](https://github.com/apache/jmeter/releases/tag/rel/v5.6.3) | 9552 | none |
| [Artillery](https://github.com/artilleryio/artillery) | TypeScript | MPL-2.0 | [artillery-2.0.34](https://github.com/artilleryio/artillery/releases/tag/artillery-2.0.34) signed | 9090 | Apache JMeter (full), Gatling (full) |
| [Gatling](https://github.com/gatling/gatling) | Scala | Apache-2.0 | [v3.16.0](https://github.com/gatling/gatling/releases/tag/v3.16.0) | 6958 | none |

</details>

<details>
<summary><b>Browser automation and testing</b>, 8 tools</summary>

Drive real browsers for end-to-end tests.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Playwright](https://github.com/microsoft/playwright) | TypeScript | Apache-2.0 | [v1.63.0](https://github.com/microsoft/playwright/releases/tag/v1.63.0) signed | 97150 | Selenium (full), Puppeteer (full), Cypress (full) |
| [Puppeteer](https://github.com/puppeteer/puppeteer) | TypeScript | Apache-2.0 | [browsers-v3.2.3](https://github.com/puppeteer/puppeteer/releases/tag/browsers-v3.2.3) signed | 95659 | none |
| [Cypress](https://github.com/cypress-io/cypress) | TypeScript | MIT | [v16.1.1](https://github.com/cypress-io/cypress/releases/tag/v16.1.1) | 51038 | Selenium (partial) |
| [Selenium](https://github.com/SeleniumHQ/selenium) | Java | Apache-2.0 | [selenium-4.50.0](https://github.com/SeleniumHQ/selenium/releases/tag/selenium-4.50.0) signed | 34522 | none |
| [chromedp](https://github.com/chromedp/chromedp) | Go | MIT | [v0.20.1](https://github.com/chromedp/chromedp/releases/tag/v0.20.1) | 13300 | Puppeteer (partial) |
| [Nightwatch](https://github.com/nightwatchjs/nightwatch) | JavaScript | MIT | [v3.16.0](https://github.com/nightwatchjs/nightwatch/releases/tag/v3.16.0) | 11952 | Cypress (full) |
| [TestCafe](https://github.com/DevExpress/testcafe) | JavaScript | MIT | [v3.7.6](https://github.com/DevExpress/testcafe/releases/tag/v3.7.6) signed | 9897 | Selenium (partial) |
| [WebdriverIO](https://github.com/webdriverio/webdriverio) | TypeScript | MIT | [v10.0.0](https://github.com/webdriverio/webdriverio/releases/tag/v10.0.0) | 9843 | Selenium (full) |

</details>

<details>
<summary><b>Python web frameworks</b>, 11 tools</summary>

Build HTTP APIs and sites in Python.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [FastAPI](https://github.com/fastapi/fastapi) | Python | MIT | [0.142.2](https://github.com/fastapi/fastapi/releases/tag/0.142.2) signed | 102831 | Flask (full), Django REST framework (partial) |
| [Django](https://github.com/django/django) | Python | BSD-3-Clause | [6.1.1](https://github.com/django/django/releases/tag/6.1.1) signed | 91329 | none |
| [Flask](https://github.com/pallets/flask) | Python | BSD-3-Clause | [3.1.3](https://github.com/pallets/flask/releases/tag/3.1.3) signed | 74905 | none |
| [Django REST framework](https://github.com/encode/django-rest-framework) | Python | Other | [3.18.1](https://github.com/encode/django-rest-framework/releases/tag/3.18.1) signed | 30201 | none |
| [Reflex](https://github.com/reflex-dev/reflex) | Python | Apache-2.0 | [v0.9.12](https://github.com/reflex-dev/reflex/releases/tag/v0.9.12) signed | 28940 | none |
| [Tornado](https://github.com/tornadoweb/tornado) | Python | Apache-2.0 | [v6.5.10](https://github.com/tornadoweb/tornado/releases/tag/v6.5.10) | 22168 | none |
| [Sanic](https://github.com/sanic-org/sanic) | Python | MIT | [v25.12.1](https://github.com/sanic-org/sanic/releases/tag/v25.12.1) signed | 18636 | Flask (full) |
| [Starlette](https://github.com/Kludex/starlette) | Python | BSD-3-Clause | [1.7.0](https://github.com/Kludex/starlette/releases/tag/1.7.0) signed | 12655 | Flask (partial) |
| [Falcon](https://github.com/falconry/falcon) | Python | Apache-2.0 | [4.4.0](https://github.com/falconry/falcon/releases/tag/4.4.0) | 9806 | Flask (partial) |
| [Bottle](https://github.com/bottlepy/bottle) | Python | MIT | [0.13.4](https://github.com/bottlepy/bottle/releases/tag/0.13.4) | 8793 | Flask (full) |
| [Litestar](https://github.com/litestar-org/litestar) | Python | MIT | [v2.24.0](https://github.com/litestar-org/litestar/releases/tag/v2.24.0) | 8495 | Flask (full), Django REST framework (partial) |

</details>

<details>
<summary><b>Python HTTP clients</b>, 5 tools</summary>

Send HTTP requests from Python.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Requests](https://github.com/psf/requests) | Python | Apache-2.0 | [v2.34.2](https://github.com/psf/requests/releases/tag/v2.34.2) signed | 54469 | none |
| [aiohttp](https://github.com/aio-libs/aiohttp) | Python | Apache-2.0 | [v3.14.4](https://github.com/aio-libs/aiohttp/releases/tag/v3.14.4) | 16569 | none |
| [HTTPX](https://github.com/encode/httpx) | Python | BSD-3-Clause | [0.28.1](https://github.com/encode/httpx/releases/tag/0.28.1) signed | 15526 | Requests (full), aiohttp (partial) |
| [curl_cffi](https://github.com/lexiforest/curl_cffi) | Python | MIT | [v0.16.4b1](https://github.com/lexiforest/curl_cffi/releases/tag/v0.16.4b1) signed | 6658 | Requests (full) |
| [urllib3](https://github.com/urllib3/urllib3) | Python | MIT | [2.8.0](https://github.com/urllib3/urllib3/releases/tag/2.8.0) signed | 4068 | none |

</details>

<details>
<summary><b>JavaScript date libraries</b>, 5 tools</summary>

Parse, format and compute dates in JavaScript.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Day.js](https://github.com/iamkun/dayjs) | JavaScript | MIT | [v1.11.23](https://github.com/iamkun/dayjs/releases/tag/v1.11.23) | 48664 | Moment.js (drop-in) |
| [Moment.js](https://github.com/moment/moment) | JavaScript | MIT | [2.31.0](https://github.com/moment/moment/releases/tag/2.31.0) signed | 47902 | none |
| [date-fns](https://github.com/date-fns/date-fns) | TypeScript | none | [v4.4.0](https://github.com/date-fns/date-fns/releases/tag/v4.4.0) signed | 36649 | Moment.js (full) |
| [Luxon](https://github.com/moment/luxon) | JavaScript | MIT | [3.7.2](https://github.com/moment/luxon/releases/tag/3.7.2) | 16459 | Moment.js (full) |
| [spacetime](https://github.com/spencermountain/spacetime) | JavaScript | Other | [7.16.0](https://github.com/spencermountain/spacetime/releases/tag/7.16.0) signed | 4106 | Moment.js (full) |

</details>

<details>
<summary><b>Local Kubernetes</b>, 5 tools</summary>

Run a Kubernetes cluster on a laptop or in CI.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [K3s](https://github.com/k3s-io/k3s) | Go | Apache-2.0 | [v1.37.1+k3s1](https://github.com/k3s-io/k3s/releases/tag/v1.37.1%2Bk3s1) | 34137 | minikube (full) |
| [minikube](https://github.com/kubernetes/minikube) | Go | Apache-2.0 | [v1.39.0](https://github.com/kubernetes/minikube/releases/tag/v1.39.0) | 32180 | none |
| [kind](https://github.com/kubernetes-sigs/kind) | Go | Apache-2.0 | [v0.33.0](https://github.com/kubernetes-sigs/kind/releases/tag/v0.33.0) signed | 15528 | minikube (full) |
| [MicroK8s](https://github.com/canonical/microk8s) | Python | Apache-2.0 | [v1.36](https://github.com/canonical/microk8s/releases/tag/v1.36) signed | 9379 | minikube (full) |
| [k3d](https://github.com/k3d-io/k3d) | Go | MIT | [v5.9.0](https://github.com/k3d-io/k3d/releases/tag/v5.9.0) | 6582 | minikube (full) |

</details>

<details>
<summary><b>Secrets managers</b>, 3 tools</summary>

Store, rotate and hand out secrets to applications.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [HashiCorp Vault](https://github.com/hashicorp/vault) | Go | Other | [v2.1.1](https://github.com/hashicorp/vault/releases/tag/v2.1.1) signed | 36343 | none |
| [Infisical](https://github.com/Infisical/infisical) | TypeScript | Other | [v0.165.17](https://github.com/Infisical/infisical/releases/tag/v0.165.17) signed | 29624 | HashiCorp Vault (partial), Doppler (full) |
| [OpenBao](https://github.com/openbao/openbao) | Go | MPL-2.0 | [v2.7.1](https://github.com/openbao/openbao/releases/tag/v2.7.1) signed | 8320 | HashiCorp Vault (drop-in) |

</details>

<details>
<summary><b>Git LFS servers</b>, 4 tools</summary>

Serve Git LFS objects for repositories hosted anywhere.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [lfs-test-server](https://github.com/git-lfs/lfs-test-server) | Go | MIT | [v0.4.0](https://github.com/git-lfs/lfs-test-server/releases/tag/v0.4.0) | 792 | none |
| [Rudolfs](https://github.com/jasonwhite/rudolfs) | Rust | MIT | [0.3.8](https://github.com/jasonwhite/rudolfs/releases/tag/0.3.8) | 525 | lfs-test-server (full) |
| [Giftless](https://github.com/datopian/giftless) | Python | MIT | [v0.6.2](https://github.com/datopian/giftless/releases/tag/v0.6.2) signed | 183 | lfs-test-server (full) |
| [LFSX](https://github.com/FerrLabs/LFSX) verified | Rust | MPL-2.0 | [v1.23.3](https://github.com/FerrLabs/LFSX/releases/tag/v1.23.3) signed | 2 | lfs-test-server (full), Rudolfs (full), Giftless (partial), GitHub LFS storage (full) |

</details>

<details>
<summary><b>Minecraft servers</b>, 8 tools</summary>

Server software for Minecraft: Java Edition, from forks of the Bukkit line to implementations written from scratch.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Paper](https://github.com/PaperMC/Paper) | Java | Other | [26.2](https://github.com/PaperMC/Paper/releases/tag/26.2) | 12700 | none |
| [Pumpkin](https://github.com/Pumpkin-MC/Pumpkin) | Rust | GPL-3.0 | [0.2.0+26.3-26.51](https://github.com/Pumpkin-MC/Pumpkin/releases/tag/0.2.0%2B26.3-26.51) | 11996 | Paper (partial) |
| [Cuberite](https://github.com/cuberite/cuberite) | C++ | Other | [1.7EOL](https://github.com/cuberite/cuberite/releases/tag/1.7EOL) | 5450 | Paper (partial) |
| [Folia](https://github.com/PaperMC/Folia) | Shell | GPL-3.0 | none | 4386 | Paper (partial) |
| [Minestom](https://github.com/Minestom/Minestom) | Java | Apache-2.0 | [2026.10.05-26.2](https://github.com/Minestom/Minestom/releases/tag/2026.10.05-26.2) signed | 3297 | Paper (partial) |
| [Purpur](https://github.com/PurpurMC/Purpur) | Java | MIT | [1.20.6](https://github.com/PurpurMC/Purpur/releases/tag/1.20.6) signed | 2422 | Paper (drop-in) |
| [Glowstone](https://github.com/GlowstoneMC/Glowstone) | Java | Other | [2021.8.0](https://github.com/GlowstoneMC/Glowstone/releases/tag/2021.8.0) signed | 2010 | Paper (partial) |
| [SteelMC](https://github.com/Steel-Foundation/SteelMC) | Rust | AGPL-3.0 | [v0.15.4+mc26.2](https://github.com/Steel-Foundation/SteelMC/releases/tag/v0.15.4%2Bmc26.2) signed | 734 | Paper (partial) |

</details>

<details>
<summary><b>File sync and share</b>, 6 tools</summary>

Self-hosted storage for files you reach from more than one machine, over WebDAV or a sync client.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Syncthing](https://github.com/syncthing/syncthing) | Go | MPL-2.0 | [v2.1.5](https://github.com/syncthing/syncthing/releases/tag/v2.1.5) | 89173 | Dropbox (partial), Google Drive (partial) |
| [Nextcloud](https://github.com/nextcloud/server) | PHP | AGPL-3.0 | [v35.0.1](https://github.com/nextcloud/server/releases/tag/v35.0.1) | 37002 | Dropbox (full), Google Drive (full), iCloud Drive (full), OneDrive (full), Box (full) |
| [Cloudreve](https://github.com/cloudreve/cloudreve) | Go | GPL-3.0 | [4.19.1](https://github.com/cloudreve/cloudreve/releases/tag/4.19.1) | 28798 | Dropbox (partial), Google Drive (partial) |
| [Seafile](https://github.com/haiwen/seafile) | C | Other | [v9.0.5](https://github.com/haiwen/seafile/releases/tag/v9.0.5) | 15307 | Dropbox (full), Nextcloud (partial), iCloud Drive (full), OneDrive (full), Box (full) |
| [ownCloud Infinite Scale](https://github.com/owncloud/ocis) | Go | Apache-2.0 | [v8.2.1](https://github.com/owncloud/ocis/releases/tag/v8.2.1) signed | 2143 | Nextcloud (partial), Dropbox (full), Google Drive (partial) |
| [RoxyCloud](https://github.com/FerrLabs/RoxyCloud) verified | Rust | AGPL-3.0 | [v0.33.0](https://github.com/FerrLabs/Stashden/releases/tag/v0.33.0) | 1 | Nextcloud (partial) |

</details>

<details>
<summary><b>AI coding agents</b>, 12 tools</summary>

Agents that read a codebase, edit files and run commands from a prompt, in the terminal or the editor.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [OpenCode](https://github.com/anomalyco/opencode) | TypeScript | MIT | [v1.18.34](https://github.com/anomalyco/opencode/releases/tag/v1.18.34) | 211913 | Claude Code (full), GitHub Copilot (partial), Cursor (partial) |
| [Codex CLI](https://github.com/openai/codex) | Rust | Apache-2.0 | [rust-v0.160.1](https://github.com/openai/codex/releases/tag/rust-v0.160.1) | 127981 | Claude Code (full), GitHub Copilot (partial) |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) | TypeScript | Apache-2.0 | [v0.62.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.62.0) | 107245 | Claude Code (full), GitHub Copilot (partial) |
| [OpenHands](https://github.com/OpenHands/OpenHands) | TypeScript | MIT | [v1.25.0](https://github.com/OpenHands/OpenHands/releases/tag/v1.25.0) signed | 90070 | Claude Code (full), GitHub Copilot (partial) |
| [Cline](https://github.com/cline/cline) | TypeScript | Apache-2.0 | [desktop-v0.0.43](https://github.com/cline/cline/releases/tag/desktop-v0.0.43) | 69909 | Claude Code (partial), GitHub Copilot (partial), Cursor (partial) |
| [Open Interpreter](https://github.com/openinterpreter/openinterpreter) | Rust | Apache-2.0 | [rust-v0.0.55](https://github.com/openinterpreter/openinterpreter/releases/tag/rust-v0.0.55) signed | 68515 | Claude Code (partial) |
| [goose](https://github.com/aaif-goose/goose) | Rust | Apache-2.0 | [v1.53.0](https://github.com/aaif-goose/goose/releases/tag/v1.53.0) | 54977 | Claude Code (full), GitHub Copilot (partial) |
| [Aider](https://github.com/Aider-AI/aider) | Python | Apache-2.0 | [v0.86.0](https://github.com/Aider-AI/aider/releases/tag/v0.86.0) | 49387 | Claude Code (partial), GitHub Copilot (partial) |
| [Crush](https://github.com/charmbracelet/crush) | Go | Other | [v0.97.1](https://github.com/charmbracelet/crush/releases/tag/v0.97.1) signed | 28497 | Claude Code (full), GitHub Copilot (partial) |
| [Qwen Code](https://github.com/QwenLM/qwen-code) | TypeScript | Apache-2.0 | [sdk-typescript-v0.1.18](https://github.com/QwenLM/qwen-code/releases/tag/sdk-typescript-v0.1.18) | 28325 | Claude Code (full), GitHub Copilot (partial) |
| [Kilo Code](https://github.com/Kilo-Org/kilocode) | TypeScript | MIT | [v7.8.3](https://github.com/Kilo-Org/kilocode/releases/tag/v7.8.3) | 27505 | Claude Code (partial), Cursor (partial) |
| [SWE-agent](https://github.com/SWE-agent/SWE-agent) | Python | MIT | [v1.1.0](https://github.com/SWE-agent/SWE-agent/releases/tag/v1.1.0) signed | 20492 | Claude Code (partial) |

</details>

<details>
<summary><b>AI code assistants</b>, 5 tools</summary>

Completions and chat inside the editor, backed by a hosted or a local model.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Continue](https://github.com/continuedev/continue) | TypeScript | Apache-2.0 | [v2.0.0-vscode](https://github.com/continuedev/continue/releases/tag/v2.0.0-vscode) | 36125 | GitHub Copilot (full), Cursor (partial) |
| [Tabby](https://github.com/TabbyML/tabby) | Rust | Other | [v0.32.0](https://github.com/TabbyML/tabby/releases/tag/v0.32.0) | 33898 | GitHub Copilot (full) |
| [avante.nvim](https://github.com/avante-corp/avante.nvim) | Lua | Apache-2.0 | [v0.4.0](https://github.com/avante-corp/avante.nvim/releases/tag/v0.4.0) | 18176 | Cursor (partial), GitHub Copilot (partial) |
| [CodeCompanion.nvim](https://github.com/olimorris/codecompanion.nvim) | Lua | Apache-2.0 | [v19.27.0](https://github.com/olimorris/codecompanion.nvim/releases/tag/v19.27.0) signed | 6886 | GitHub Copilot (partial) |
| [twinny](https://github.com/twinnydotdev/twinny) | TypeScript | MIT | [v4.0.20](https://github.com/twinnydotdev/twinny/releases/tag/v4.0.20) | 3661 | GitHub Copilot (full) |

</details>

<details>
<summary><b>AI chat interfaces</b>, 11 tools</summary>

Apps to chat with language models, whether the model runs locally or behind an API.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Open WebUI](https://github.com/open-webui/open-webui) | Python | Other | [v0.11.4](https://github.com/open-webui/open-webui/releases/tag/v0.11.4) signed | 154031 | ChatGPT (partial), Claude (partial) |
| [NextChat](https://github.com/ChatGPTNextWeb/NextChat) | TypeScript | MIT | [v2.16.1](https://github.com/ChatGPTNextWeb/NextChat/releases/tag/v2.16.1) | 88830 | ChatGPT (partial), Claude (partial) |
| [LobeHub](https://github.com/lobehub/lobehub) | TypeScript | Other | [v2.2.18](https://github.com/lobehub/lobehub/releases/tag/v2.2.18) signed | 83005 | ChatGPT (partial), Claude (partial) |
| [AnythingLLM](https://github.com/Mintplex-Labs/anything-llm) | JavaScript | MIT | [v1.17.0](https://github.com/Mintplex-Labs/anything-llm/releases/tag/v1.17.0) signed | 66736 | ChatGPT (partial), Claude (partial) |
| [Cherry Studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | AGPL-3.0 | [v2.1.4](https://github.com/CherryHQ/cherry-studio/releases/tag/v2.1.4) signed | 52390 | ChatGPT (partial), Claude (partial) |
| [TextGen](https://github.com/oobabooga/textgen) | Python | AGPL-3.0 | [v4.9](https://github.com/oobabooga/textgen/releases/tag/v4.9) | 47726 | ChatGPT (partial), Claude (partial) |
| [LibreChat](https://github.com/danny-avila/LibreChat) | TypeScript | MIT | [v0.8.8](https://github.com/LibreChat-AI/LibreChat/releases/tag/v0.8.8) signed | 45316 | ChatGPT (partial), Claude (partial) |
| [Jan](https://github.com/janhq/jan) | Rust | Other | [v0.8.4](https://github.com/janhq/jan/releases/tag/v0.8.4) signed | 44808 | ChatGPT (partial), Claude (partial) |
| [Chatbox](https://github.com/chatboxai/chatbox) | TypeScript | GPL-3.0 | [v1.23.5](https://github.com/chatboxai/chatbox/releases/tag/v1.23.5) signed | 41949 | ChatGPT (partial), Claude (partial) |
| [Khoj](https://github.com/khoj-ai/khoj) | Python | AGPL-3.0 | [2.0.0-beta.28](https://github.com/khoj-ai/khoj/releases/tag/2.0.0-beta.28) | 37564 | ChatGPT (partial) |
| [SillyTavern](https://github.com/SillyTavern/SillyTavern) | JavaScript | AGPL-3.0 | [1.19.0](https://github.com/SillyTavern/SillyTavern/releases/tag/1.19.0) signed | 34120 | ChatGPT (partial) |

</details>

<details>
<summary><b>Local model runtimes</b>, 8 tools</summary>

Run open-weight language models on your own hardware, behind a local API.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Ollama](https://github.com/ollama/ollama) | Go | MIT | [v0.35.1](https://github.com/ollama/ollama/releases/tag/v0.35.1) signed | 182280 | ChatGPT (partial), Claude (partial) |
| [llama.cpp](https://github.com/ggml-org/llama.cpp) | C++ | MIT | [v0.6.0](https://github.com/ggml-org/llama.cpp/releases/tag/v0.6.0) | 130422 | ChatGPT (partial), Claude (partial) |
| [vLLM](https://github.com/vllm-project/vllm) | Python | Apache-2.0 | [v0.31.0](https://github.com/vllm-project/vllm/releases/tag/v0.31.0) | 93239 | ChatGPT (partial), Claude (partial) |
| [LocalAI](https://github.com/mudler/LocalAI) | Go | MIT | [v4.11.0](https://github.com/mudler/LocalAI/releases/tag/v4.11.0) signed | 49404 | ChatGPT (partial), Claude (partial) |
| [exo](https://github.com/exo-explore/exo) | Python | Apache-2.0 | [v1.0.71](https://github.com/exo-explore/exo/releases/tag/v1.0.71) signed | 47754 | Ollama (partial) |
| [SGLang](https://github.com/sgl-project/sglang) | Python | Apache-2.0 | [v0.5.21](https://github.com/sgl-project/sglang/releases/tag/v0.5.21) | 36807 | vLLM (full), ChatGPT (partial), Claude (partial) |
| [llamafile](https://github.com/mozilla-ai/llamafile) | C++ | Other | [0.10.6](https://github.com/mozilla-ai/llamafile/releases/tag/0.10.6) signed | 26177 | Ollama (partial) |
| [MLC LLM](https://github.com/mlc-ai/mlc-llm) | Python | Apache-2.0 | [v0.20.0](https://github.com/mlc-ai/mlc-llm/releases/tag/v0.20.0) | 23209 | Ollama (partial) |

</details>

<details>
<summary><b>Container desktops</b>, 7 tools</summary>

Run containers and a local Kubernetes on a laptop, with the engine managed for you.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [lazydocker](https://github.com/jesseduffield/lazydocker) | Go | MIT | [v0.25.2](https://github.com/jesseduffield/lazydocker/releases/tag/v0.25.2) signed | 53046 | Docker Desktop (partial), Portainer (partial) |
| [container](https://github.com/apple/container) | Swift | Apache-2.0 | [1.5.0](https://github.com/apple/container/releases/tag/1.5.0) signed | 50516 | Docker Desktop (partial), OrbStack (partial) |
| [Colima](https://github.com/abiosoft/colima) | Go | MIT | [v0.10.3](https://github.com/abiosoft/colima/releases/tag/v0.10.3) signed | 31105 | Docker Desktop (partial), OrbStack (partial) |
| [Lima](https://github.com/lima-vm/lima) | Go | Apache-2.0 | [v2.2.1](https://github.com/lima-vm/lima/releases/tag/v2.2.1) signed | 22034 | Docker Desktop (partial), OrbStack (partial) |
| [Podman Desktop](https://github.com/podman-desktop/podman-desktop) | TypeScript | Apache-2.0 | [v1.29.3](https://github.com/podman-desktop/podman-desktop/releases/tag/v1.29.3) | 8059 | Docker Desktop (full), OrbStack (partial) |
| [Rancher Desktop](https://github.com/rancher-sandbox/rancher-desktop) | TypeScript | Apache-2.0 | [v1.24.0](https://github.com/rancher-sandbox/rancher-desktop/releases/tag/v1.24.0) signed | 7376 | Docker Desktop (full), OrbStack (partial) |
| [Finch](https://github.com/runfinch/finch) | Go | Apache-2.0 | [v1.19.0](https://github.com/runfinch/finch/releases/tag/v1.19.0) signed | 4070 | Docker Desktop (partial) |

</details>

<details>
<summary><b>Dashboards</b>, 5 tools</summary>

Build dashboards and explore metrics, logs and traces from a web UI.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Grafana](https://github.com/grafana/grafana) | TypeScript | AGPL-3.0 | [v13.2.3](https://github.com/grafana/grafana/releases/tag/v13.2.3) | 77095 | Kibana (partial), Datadog (partial), Splunk (partial) |
| [Kibana](https://github.com/elastic/kibana) | TypeScript | Other | [v9.5.4](https://github.com/elastic/kibana/releases/tag/v9.5.4) signed | 21309 | none |
| [HyperDX](https://github.com/hyperdxio/hyperdx) | TypeScript | MIT | [cli-v0.6.4](https://github.com/hyperdxio/hyperdx/releases/tag/cli-v0.6.4) signed | 9927 | Datadog (partial) |
| [Perses](https://github.com/perses/perses) | Go | Apache-2.0 | [v0.54.0](https://github.com/perses/perses/releases/tag/v0.54.0) signed | 2470 | Grafana (partial) |
| [OpenSearch Dashboards](https://github.com/opensearch-project/OpenSearch-Dashboards) | TypeScript | Apache-2.0 | [3.8.0](https://github.com/opensearch-project/OpenSearch-Dashboards/releases/tag/3.8.0) signed | 2130 | Kibana (full) |

</details>

<details>
<summary><b>Actor toolkits</b>, 3 tools</summary>

Actor-model runtimes for building concurrent and distributed JVM applications.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Vert.x](https://github.com/eclipse-vertx/vert.x) | Java | Other | [5.2.0](https://github.com/eclipse-vertx/vert.x/releases/tag/5.2.0) | 14689 | Akka (partial) |
| [Akka](https://github.com/akka/akka-core) | Scala | Other | [v2.10.23](https://github.com/akka/akka-core/releases/tag/v2.10.23) signed | 13281 | none |
| [Apache Pekko](https://github.com/apache/pekko) | Scala | Apache-2.0 | [v1.7.1](https://github.com/apache/pekko/releases/tag/v1.7.1) signed | 1642 | Akka (full) |

</details>

<details>
<summary><b>Distributed SQL databases</b>, 5 tools</summary>

SQL databases that spread data across nodes and speak the PostgreSQL wire protocol.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [CockroachDB](https://github.com/cockroachdb/cockroach) | Go | Other | [v26.2.7](https://github.com/cockroachdb/cockroach/releases/tag/v26.2.7) signed | 32552 | none |
| [Apache ShardingSphere](https://github.com/apache/shardingsphere) | Java | Apache-2.0 | [5.5.3](https://github.com/apache/shardingsphere/releases/tag/5.5.3) | 20805 | Citus (partial) |
| [Citus](https://github.com/citusdata/citus) | C | AGPL-3.0 | [v14.2.0](https://github.com/citusdata/citus/releases/tag/v14.2.0) signed | 12798 | none |
| [YugabyteDB](https://github.com/yugabyte/yugabyte-db) | C | Other | [v2026.1.2.0](https://github.com/yugabyte/yugabyte-db/releases/tag/v2026.1.2.0) | 10580 | CockroachDB (full) |
| [PgDog](https://github.com/pgdogdev/pgdog) | Rust | AGPL-3.0 | [v0.1.60](https://github.com/pgdogdev/pgdog/releases/tag/v0.1.60) signed | 5552 | Citus (partial) |

</details>

<details>
<summary><b>Error tracking</b>, 5 tools</summary>

Collect exceptions from applications through an SDK and group them into issues.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Sentry](https://github.com/getsentry/sentry) | Python | Other | [26.9.0](https://github.com/getsentry/sentry/releases/tag/26.9.0) | 45479 | none |
| [Highlight](https://github.com/highlight/highlight) | TypeScript | Other | [docker-v0.5.6](https://github.com/highlight/highlight/releases/tag/docker-v0.5.6) signed | 9382 | Sentry (full) |
| [Errbit](https://github.com/errbit/errbit) | Ruby | MIT | [v0.11.5](https://github.com/errbit/errbit/releases/tag/v0.11.5) signed | 4268 | Airbrake (drop-in) |
| [Exceptionless](https://github.com/exceptionless/Exceptionless) | C# | Apache-2.0 | [v8.10.0](https://github.com/exceptionless/Exceptionless/releases/tag/v8.10.0) signed | 2456 | Sentry (partial) |
| [Bugsink](https://github.com/bugsink/bugsink) | Python | Other | [2.6.1](https://github.com/bugsink/bugsink/releases/tag/2.6.1) | 2114 | Sentry (partial) |

</details>

<details>
<summary><b>Distributed tracing</b>, 6 tools</summary>

Collect and search traces of requests as they cross services.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [SigNoz](https://github.com/SigNoz/signoz) | TypeScript | Other | [v0.145.0](https://github.com/SigNoz/signoz/releases/tag/v0.145.0) signed | 32286 | Datadog (full), New Relic (full) |
| [Apache SkyWalking](https://github.com/apache/skywalking) | Java | Apache-2.0 | [v11.0.0](https://github.com/apache/skywalking/releases/tag/v11.0.0) | 24967 | New Relic (partial) |
| [Jaeger](https://github.com/jaegertracing/jaeger) | Go | Apache-2.0 | [v2.21.0](https://github.com/jaegertracing/jaeger/releases/tag/v2.21.0) signed | 23268 | Zipkin (full) |
| [Zipkin](https://github.com/openzipkin/zipkin) | Java | Apache-2.0 | [3.6.1](https://github.com/openzipkin/zipkin/releases/tag/3.6.1) | 17469 | none |
| [Pinpoint](https://github.com/pinpoint-apm/pinpoint) | Java | Apache-2.0 | [v3.1.1](https://github.com/pinpoint-apm/pinpoint/releases/tag/v3.1.1) | 13868 | New Relic (partial) |
| [Grafana Tempo](https://github.com/grafana/tempo) | Go | AGPL-3.0 | [v3.1.0](https://github.com/grafana/tempo/releases/tag/v3.1.0) signed | 5510 | Zipkin (full) |

</details>

<details>
<summary><b>Time-series databases</b>, 5 tools</summary>

Store and query timestamped measurements at high write rates.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [InfluxDB](https://github.com/influxdata/influxdb) | Rust | Apache-2.0 | [v3.11.4](https://github.com/influxdata/influxdb/releases/tag/v3.11.4) | 31759 | none |
| [TDengine](https://github.com/taosdata/TDengine) | C | AGPL-3.0 | [ver-3.4.1.6](https://github.com/taosdata/TDengine/releases/tag/ver-3.4.1.6) | 25151 | InfluxDB (full) |
| [TimescaleDB](https://github.com/timescale/timescaledb) | C | Other | [2.30.2](https://github.com/timescale/timescaledb/releases/tag/2.30.2) signed | 23644 | InfluxDB (full) |
| [QuestDB](https://github.com/questdb/questdb) | Java | Apache-2.0 | [10.0.1](https://github.com/questdb/questdb/releases/tag/10.0.1) | 17424 | InfluxDB (full) |
| [GreptimeDB](https://github.com/GreptimeTeam/greptimedb) | Rust | Apache-2.0 | [v1.2.1](https://github.com/GreptimeTeam/greptimedb/releases/tag/v1.2.1) | 6724 | InfluxDB (full) |

</details>

<details>
<summary><b>Encrypted files in git</b>, 6 tools</summary>

Keep secrets in a repository, encrypted, and decrypted only by the people and machines allowed to.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [SOPS](https://github.com/getsops/sops) | Go | MPL-2.0 | [v3.13.3](https://github.com/getsops/sops/releases/tag/v3.13.3) signed | 23304 | git-crypt (full) |
| [git-crypt](https://github.com/AGWA/git-crypt) | C++ | GPL-3.0 | [0.8.0](https://github.com/AGWA/git-crypt/releases/tag/0.8.0) | 9943 | none |
| [Sealed Secrets](https://github.com/bitnami/sealed-secrets) | Go | Apache-2.0 | [v0.40.0](https://github.com/bitnami/sealed-secrets/releases/tag/v0.40.0) signed | 9298 | SOPS (partial) |
| [dotenvx](https://github.com/dotenvx/dotenvx) | JavaScript | BSD-3-Clause | [v2.33.0](https://github.com/dotenvx/dotenvx/releases/tag/v2.33.0) | 5828 | SOPS (partial) |
| [git-secret](https://github.com/sobolevn/git-secret) | Shell | MIT | [v0.5.0](https://github.com/sobolevn/git-secret/releases/tag/v0.5.0) | 4047 | git-crypt (partial) |
| [transcrypt](https://github.com/elasticdog/transcrypt) | Shell | MIT | [v2.3.2](https://github.com/elasticdog/transcrypt/releases/tag/v2.3.2) signed | 1710 | git-crypt (full) |

</details>

<details>
<summary><b>Log storage</b>, 5 tools</summary>

Store logs at volume and search them, the back end behind log dashboards.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Loki](https://github.com/grafana/loki) | Go | AGPL-3.0 | [v3.7.8](https://github.com/grafana/loki/releases/tag/v3.7.8) signed | 28990 | Elasticsearch (partial), Splunk (partial), Datadog (partial) |
| [OpenObserve](https://github.com/openobserve/openobserve) | TypeScript | AGPL-3.0 | [v1.1.0-rc1](https://github.com/openobserve/openobserve/releases/tag/v1.1.0-rc1) | 22265 | Elasticsearch (partial), Splunk (partial), Datadog (partial) |
| [Quickwit](https://github.com/quickwit-oss/quickwit) | Rust | Apache-2.0 | [v0.9.1](https://github.com/quickwit-oss/quickwit/releases/tag/v0.9.1) signed | 11699 | Elasticsearch (partial), Splunk (partial) |
| [Graylog](https://github.com/Graylog2/graylog2-server) | Java | Other | [7.1.9](https://github.com/Graylog2/graylog2-server/releases/tag/7.1.9) | 8150 | Splunk (full) |
| [VictoriaLogs](https://github.com/VictoriaMetrics/VictoriaLogs) | Go | Apache-2.0 | [v1.53.0](https://github.com/VictoriaMetrics/VictoriaLogs/releases/tag/v1.53.0) signed | 2347 | Elasticsearch (partial), Loki (full), Splunk (partial) |

</details>

<details>
<summary><b>Relational databases</b>, 11 tools</summary>

General-purpose SQL databases.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [TiDB](https://github.com/pingcap/tidb) | Go | Apache-2.0 | [v7.5.8](https://github.com/pingcap/tidb/releases/tag/v7.5.8) signed | 40630 | MySQL (full) |
| [Dolt](https://github.com/dolthub/dolt) | Go | Apache-2.0 | [v2.4.1](https://github.com/dolthub/dolt/releases/tag/v2.4.1) | 24574 | MySQL (full) |
| [Neon](https://github.com/neondatabase/neon) | Rust | Apache-2.0 | [release-proxy-8853](https://github.com/neondatabase/neon/releases/tag/release-proxy-8853) | 23173 | none |
| [PostgreSQL](https://github.com/postgres/postgres) | C | Other | [REL_18_6](https://github.com/postgres/postgres/releases/tag/REL_18_6) | 22294 | MySQL (full), Oracle Database (full) |
| [Vitess](https://github.com/vitessio/vitess) | Go | Apache-2.0 | [v24.0.4](https://github.com/vitessio/vitess/releases/tag/v24.0.4) signed | 21367 | none |
| [rqlite](https://github.com/rqlite/rqlite) | Go | MIT | [v10.5.2](https://github.com/rqlite/rqlite/releases/tag/v10.5.2) signed | 17783 | SQLite (partial) |
| [libSQL](https://github.com/tursodatabase/libsql) | C | MIT | [libsql-server-v0.24.32](https://github.com/tursodatabase/libsql/releases/tag/libsql-server-v0.24.32) signed | 17257 | SQLite (drop-in) |
| [MySQL](https://github.com/mysql/mysql-server) | C++ | Other | [mysql-26.7.0](https://github.com/mysql/mysql-server/releases/tag/mysql-26.7.0) | 12440 | none |
| [SQLite](https://github.com/sqlite/sqlite) | C | Other | [version-3.53.4](https://github.com/sqlite/sqlite/releases/tag/version-3.53.4) | 10604 | none |
| [OceanBase](https://github.com/oceanbase/oceanbase) | C++ | Apache-2.0 | [v4.4.2_CE_BP3](https://github.com/oceanbase/oceanbase/releases/tag/v4.4.2_CE_BP3) | 10296 | MySQL (full) |
| [MariaDB](https://github.com/MariaDB/server) | C++ | GPL-2.0 | [mariadb-13.0.2](https://github.com/MariaDB/server/releases/tag/mariadb-13.0.2) | 8320 | MySQL (full), Oracle Database (partial) |

</details>

<details>
<summary><b>Configuration management</b>, 6 tools</summary>

Describe the state of servers in code and converge them to it.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Ansible](https://github.com/ansible/ansible) | Python | GPL-3.0 | [v2.21.5](https://github.com/ansible/ansible/releases/tag/v2.21.5) signed | 70864 | none |
| [Salt](https://github.com/saltstack/salt) | Python | Apache-2.0 | [v3008.3](https://github.com/saltstack/salt/releases/tag/v3008.3) signed | 15692 | Puppet (full), Chef (full), Ansible (full) |
| [Chef](https://github.com/chef/chef) | Ruby | Apache-2.0 | [v15.8.23](https://github.com/chef/chef/releases/tag/v15.8.23) | 8246 | none |
| [Puppet](https://github.com/puppetlabs/puppet) | Ruby | Apache-2.0 | [7.34.0](https://github.com/puppetlabs/puppet/releases/tag/7.34.0) | 7949 | none |
| [pyinfra](https://github.com/pyinfra-dev/pyinfra) | Python | MIT | [v3.10.0](https://github.com/pyinfra-dev/pyinfra/releases/tag/v3.10.0) | 6025 | Ansible (full) |
| [OpenVox](https://github.com/OpenVoxProject/openvox) | Ruby | Apache-2.0 | [9.0.0](https://github.com/OpenVoxProject/openvox/releases/tag/9.0.0) signed | 191 | Puppet (drop-in) |

</details>

<details>
<summary><b>Workflow automation</b>, 6 tools</summary>

Connect apps and APIs with trigger-and-action workflows.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [n8n](https://github.com/n8n-io/n8n) | TypeScript | Other | [n8n@2.41.7](https://github.com/n8n-io/n8n/releases/tag/n8n%402.41.7) signed | 206738 | Zapier (full), IFTTT (full) |
| [Huginn](https://github.com/huginn/huginn) | Ruby | MIT | [v2026.10.04](https://github.com/huginn/huginn/releases/tag/v2026.10.04) | 50022 | Zapier (partial), IFTTT (partial) |
| [Activepieces](https://github.com/activepieces/activepieces) | TypeScript | Other | [0.92.1](https://github.com/activepieces/activepieces/releases/tag/0.92.1) | 24913 | Zapier (full), n8n (full), IFTTT (full) |
| [Node-RED](https://github.com/node-red/node-red) | JavaScript | Apache-2.0 | [5.0.7](https://github.com/node-red/node-red/releases/tag/5.0.7) signed | 23716 | Zapier (partial) |
| [Windmill](https://github.com/windmill-labs/windmill) | Rust | Other | [v1.824.1](https://github.com/windmill-labs/windmill/releases/tag/v1.824.1) signed | 18107 | Zapier (partial), Apache Airflow (partial) |
| [Automatisch](https://github.com/automatisch/automatisch) | JavaScript | Other | [v0.15.0](https://github.com/automatisch/automatisch/releases/tag/v0.15.0) | 13987 | Zapier (full) |

</details>

<details>
<summary><b>GitOps</b>, 4 tools</summary>

Keep Kubernetes clusters in sync with manifests stored in git.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Argo CD](https://github.com/argoproj/argo-cd) | Go | Apache-2.0 | [v3.5.3](https://github.com/argoproj/argo-cd/releases/tag/v3.5.3) signed | 24333 | none |
| [Flux](https://github.com/fluxcd/flux2) | Go | Apache-2.0 | [v2.9.6](https://github.com/fluxcd/flux2/releases/tag/v2.9.6) signed | 8438 | Argo CD (full) |
| [Kargo](https://github.com/akuity/kargo) | Go | Apache-2.0 | [v1.12.1](https://github.com/akuity/kargo/releases/tag/v1.12.1) signed | 3697 | none |
| [Fleet](https://github.com/rancher/fleet) | Go | Apache-2.0 | [v0.16.2](https://github.com/rancher/fleet/releases/tag/v0.16.2) signed | 1730 | Argo CD (full) |

</details>

<details>
<summary><b>Container registries</b>, 5 tools</summary>

Store and serve OCI images and artefacts.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Harbor](https://github.com/goharbor/harbor) | Go | Apache-2.0 | [v2.15.2](https://github.com/goharbor/harbor/releases/tag/v2.15.2) signed | 29494 | Docker Hub (full), Distribution (full) |
| [Distribution](https://github.com/distribution/distribution) | Go | Apache-2.0 | [v3.1.2](https://github.com/distribution/distribution/releases/tag/v3.1.2) signed | 10643 | Docker Hub (partial) |
| [Kraken](https://github.com/uber/kraken) | Go | Apache-2.0 | [v0.1.31](https://github.com/uber/kraken/releases/tag/v0.1.31) signed | 6754 | Distribution (partial) |
| [zot](https://github.com/project-zot/zot) | Go | Apache-2.0 | [v2.1.21](https://github.com/project-zot/zot/releases/tag/v2.1.21) signed | 2839 | Docker Hub (partial), Distribution (full) |
| [Quay](https://github.com/quay/quay) | Python | Apache-2.0 | [v3.17.5](https://github.com/quay/quay/releases/tag/v3.17.5) signed | 2827 | Docker Hub (full) |

</details>

<details>
<summary><b>Identity providers</b>, 12 tools</summary>

Single sign-on, user directories and MFA over OpenID Connect, SAML or LDAP.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Keycloak](https://github.com/keycloak/keycloak) | Java | Apache-2.0 | [26.8.0](https://github.com/keycloak/keycloak/releases/tag/26.8.0) | 37155 | Okta (full), Auth0 (full) |
| [Authelia](https://github.com/authelia/authelia) | Go | Apache-2.0 | [v4.39.28](https://github.com/authelia/authelia/releases/tag/v4.39.28) signed | 29181 | Okta (partial) |
| [authentik](https://github.com/goauthentik/authentik) | Python | Other | [version/2026.8.3](https://github.com/goauthentik/authentik/releases/tag/version/2026.8.3) | 25858 | Okta (full), Auth0 (full), Keycloak (full) |
| [Ory Hydra](https://github.com/ory/hydra) | Go | Apache-2.0 | [v26.2.0](https://github.com/ory/hydra/releases/tag/v26.2.0) | 17590 | Auth0 (partial) |
| [SuperTokens](https://github.com/supertokens/supertokens-core) | Java | Other | [v12.2.0](https://github.com/supertokens/supertokens-core/releases/tag/v12.2.0) | 15335 | Auth0 (full) |
| [ZITADEL](https://github.com/zitadel/zitadel) | Go | AGPL-3.0 | [v4.19.4](https://github.com/zitadel/zitadel/releases/tag/v4.19.4) signed | 15211 | Auth0 (full), Okta (partial) |
| [Logto](https://github.com/logto-io/logto) | TypeScript | MPL-2.0 | [v1.44.0](https://github.com/logto-io/logto/releases/tag/v1.44.0) signed | 14652 | Auth0 (full) |
| [Casdoor](https://github.com/casdoor/casdoor) | Go | Apache-2.0 | [v4.15.0](https://github.com/casdoor/casdoor/releases/tag/v4.15.0) | 14515 | Auth0 (full), Okta (partial) |
| [Ory Kratos](https://github.com/ory/kratos) | Go | Apache-2.0 | [v26.2.0](https://github.com/ory/kratos/releases/tag/v26.2.0) | 13909 | Auth0 (partial) |
| [Dex](https://github.com/dexidp/dex) | Go | Apache-2.0 | [v2.45.1](https://github.com/dexidp/dex/releases/tag/v2.45.1) signed | 11157 | Okta (partial) |
| [Pocket ID](https://github.com/pocket-id/pocket-id) | Go | BSD-2-Clause | [v2.18.0](https://github.com/pocket-id/pocket-id/releases/tag/v2.18.0) | 9402 | none |
| [Kanidm](https://github.com/kanidm/kanidm) | Rust | MPL-2.0 | [v1.11.2](https://github.com/kanidm/kanidm/releases/tag/v1.11.2) | 5442 | Okta (partial), Keycloak (partial) |

</details>

<details>
<summary><b>Mesh VPNs</b>, 6 tools</summary>

Connect devices and servers in a private WireGuard network, wherever they are.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Headscale](https://github.com/juanfont/headscale) | Go | BSD-3-Clause | [v0.29.4](https://github.com/juanfont/headscale/releases/tag/v0.29.4) | 44377 | Tailscale (partial) |
| [NetBird](https://github.com/netbirdio/netbird) | Go | Other | [v0.80.0](https://github.com/netbirdio/netbird/releases/tag/v0.80.0) signed | 29766 | Tailscale (full) |
| [Netmaker](https://github.com/gravitl/netmaker) | Go | Other | [v1.7.0](https://github.com/gravitl/netmaker/releases/tag/v1.7.0) signed | 11819 | Tailscale (full) |
| [Firezone](https://github.com/firezone/firezone) | Elixir | Apache-2.0 | [android-client-1.5.15](https://github.com/firezone/firezone/releases/tag/android-client-1.5.15) signed | 9108 | Tailscale (partial) |
| [innernet](https://github.com/tonarino/innernet) | Rust | MIT | [v2.0.0](https://github.com/tonarino/innernet/releases/tag/v2.0.0) | 5558 | Tailscale (partial) |
| [Defguard](https://github.com/DefGuard/defguard) | Rust | Other | [v2.1.1](https://github.com/DefGuard/defguard/releases/tag/v2.1.1) signed | 2857 | Tailscale (partial) |

</details>

<details>
<summary><b>Remote desktop</b>, 7 tools</summary>

Control another computer over the network, for support or remote work.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [RustDesk](https://github.com/rustdesk/rustdesk) | Rust | AGPL-3.0 | [1.5.0](https://github.com/rustdesk/rustdesk/releases/tag/1.5.0) signed | 125214 | TeamViewer (full), AnyDesk (full) |
| [Sunshine](https://github.com/LizardByte/Sunshine) | C++ | GPL-3.0 | [v2026.914.233613](https://github.com/LizardByte/Sunshine/releases/tag/v2026.914.233613) signed | 41901 | Parsec (partial) |
| [Moonlight](https://github.com/moonlight-stream/moonlight-qt) | C++ | GPL-3.0 | [v6.2.0](https://github.com/moonlight-stream/moonlight-qt/releases/tag/v6.2.0) | 18939 | Parsec (partial) |
| [noVNC](https://github.com/novnc/noVNC) | JavaScript | Other | [v1.7.0](https://github.com/novnc/noVNC/releases/tag/v1.7.0) | 14069 | none |
| [TigerVNC](https://github.com/TigerVNC/tigervnc) | C++ | GPL-2.0 | [v1.16.2](https://github.com/TigerVNC/tigervnc/releases/tag/v1.16.2) | 7532 | TeamViewer (partial) |
| [MeshCentral](https://github.com/Ylianst/MeshCentral) | HTML | Apache-2.0 | [1.2.6](https://github.com/Ylianst/MeshCentral/releases/tag/1.2.6) | 7343 | TeamViewer (partial) |
| [Apache Guacamole](https://github.com/apache/guacamole-server) | C | Apache-2.0 | [1.6.0](https://github.com/apache/guacamole-server/releases/tag/1.6.0) signed | 3998 | TeamViewer (partial) |

</details>

<details>
<summary><b>Wikis and knowledge bases</b>, 11 tools</summary>

Shared pages and documentation for teams, edited in the browser.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [AppFlowy](https://github.com/AppFlowy-IO/AppFlowy) | Dart | AGPL-3.0 | [0.14.6](https://github.com/AppFlowy-IO/AppFlowy/releases/tag/0.14.6) signed | 77150 | Notion (full) |
| [AFFiNE](https://github.com/toeverything/AFFiNE) | TypeScript | Other | [v0.27.4](https://github.com/toeverything/AFFiNE/releases/tag/v0.27.4) | 73242 | Notion (full), Miro (partial) |
| [Outline](https://github.com/outline/outline) | TypeScript | Other | [v1.10.1](https://github.com/outline/outline/releases/tag/v1.10.1) signed | 40817 | Notion (partial), Confluence (full) |
| [Wiki.js](https://github.com/requarks/wiki) | Vue | AGPL-3.0 | [3.0.0-beta.628](https://github.com/requarks/wiki/releases/tag/3.0.0-beta.628) signed | 29010 | Confluence (full) |
| [Docmost](https://github.com/docmost/docmost) | TypeScript | AGPL-3.0 | [v0.96.0](https://github.com/docmost/docmost/releases/tag/v0.96.0) | 21876 | Confluence (full), Notion (partial) |
| [BookStack](https://github.com/BookStackApp/BookStack) | PHP | MIT | [v26.09.1](https://github.com/BookStackApp/BookStack/releases/tag/v26.09.1) signed | 19075 | Confluence (full), Notion (partial) |
| [La Suite Docs](https://github.com/suitenumerique/docs) | Python | MIT | [v5.7.0](https://github.com/suitenumerique/docs/releases/tag/v5.7.0) signed | 16894 | Notion (partial), Confluence (partial) |
| [TiddlyWiki](https://github.com/TiddlyWiki/TiddlyWiki5) | JavaScript | Other | [v5.4.1](https://github.com/TiddlyWiki/TiddlyWiki5/releases/tag/v5.4.1) | 8672 | Notion (partial) |
| [HedgeDoc](https://github.com/hedgedoc/hedgedoc) | TypeScript | AGPL-3.0 | [1.12.0](https://github.com/hedgedoc/hedgedoc/releases/tag/1.12.0) | 7461 | HackMD (full) |
| [DokuWiki](https://github.com/dokuwiki/dokuwiki) | PHP | GPL-2.0 | [release-2026-07-14c](https://github.com/dokuwiki/dokuwiki/releases/tag/release-2026-07-14c) | 4727 | Confluence (partial) |
| [An Otter Wiki](https://github.com/redimp/otterwiki) | Python | MIT | [v2.25.0](https://github.com/redimp/otterwiki/releases/tag/v2.25.0) | 1551 | Confluence (partial) |

</details>

<details>
<summary><b>Note-taking apps</b>, 9 tools</summary>

Personal notes on desktop and mobile, with sync.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Memos](https://github.com/usememos/memos) | Go | MIT | [v0.31.0](https://github.com/usememos/memos/releases/tag/v0.31.0) signed | 63545 | Google Keep (full) |
| [Joplin](https://github.com/laurent22/joplin) | TypeScript | Other | [v3.7.21](https://github.com/laurent22/joplin/releases/tag/v3.7.21) | 56610 | Evernote (full), Obsidian (partial), OneNote (full) |
| [SiYuan](https://github.com/siyuan-note/siyuan) | TypeScript | AGPL-3.0 | [v3.8.6](https://github.com/siyuan-note/siyuan/releases/tag/v3.8.6) signed | 46635 | Obsidian (full), Notion (partial) |
| [Logseq](https://github.com/logseq/logseq) | Clojure | AGPL-3.0 | [2.0.1](https://github.com/logseq/logseq/releases/tag/2.0.1) | 45146 | Obsidian (full) |
| [Trilium Notes](https://github.com/TriliumNext/Trilium) | TypeScript | AGPL-3.0 | [v0.106.0](https://github.com/TriliumNext/Trilium/releases/tag/v0.106.0) signed | 38218 | Evernote (full) |
| [Notesnook](https://github.com/streetwriters/notesnook) | TypeScript | GPL-3.0 | [v3.4.9](https://github.com/streetwriters/notesnook/releases/tag/v3.4.9) signed | 14718 | Evernote (full) |
| [Zettlr](https://github.com/Zettlr/Zettlr) | TypeScript | GPL-3.0 | [v4.8.0](https://github.com/Zettlr/Zettlr/releases/tag/v4.8.0) signed | 13719 | Obsidian (partial) |
| [Blinko](https://github.com/blinkospace/blinko) | TypeScript | GPL-3.0 | [1.8.8](https://github.com/blinkospace/blinko/releases/tag/1.8.8) | 11058 | Google Keep (full) |
| [Anytype](https://github.com/anyproto/anytype-ts) | TypeScript | Other | [v0.57.4](https://github.com/anyproto/anytype-ts/releases/tag/v0.57.4) signed | 8883 | Notion (full) |

</details>

<details>
<summary><b>Recipe managers</b>, 5 tools</summary>

Keep recipes, plan meals and build shopping lists from them.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Mealie](https://github.com/mealie-recipes/mealie) | Python | AGPL-3.0 | [v3.28.0](https://github.com/mealie-recipes/mealie/releases/tag/v3.28.0) | 13451 | Paprika Recipe Manager (full), Plan to Eat (full) |
| [Grocy](https://github.com/grocy/grocy) | Blade | MIT | [v4.7.1](https://github.com/grocy/grocy/releases/tag/v4.7.1) signed | 9552 | AnyList (partial) |
| [Tandoor Recipes](https://github.com/TandoorRecipes/recipes) | HTML | Other | [2.6.15](https://github.com/TandoorRecipes/recipes/releases/tag/2.6.15) signed | 8655 | Paprika Recipe Manager (full), Plan to Eat (full) |
| [KitchenOwl](https://github.com/TomBursch/kitchenowl) | Dart | AGPL-3.0 | [v0.7.10](https://github.com/TomBursch/kitchenowl/releases/tag/v0.7.10) signed | 3724 | AnyList (full) |
| [Norish](https://github.com/norish-recipes/norish) | TypeScript | AGPL-3.0 | [v0.24.0-beta](https://github.com/norish-recipes/norish/releases/tag/v0.24.0-beta) signed | 1256 | Paprika Recipe Manager (full) |

</details>

<details>
<summary><b>Project management</b>, 11 tools</summary>

Issues, tasks and boards for planning team work.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Plane](https://github.com/makeplane/plane) | TypeScript | AGPL-3.0 | [v1.4.2](https://github.com/makeplane/plane/releases/tag/v1.4.2) signed | 60412 | Jira (full), Linear (full), ClickUp (partial), monday.com (partial) |
| [Huly](https://github.com/hcengineering/platform) | TypeScript | EPL-2.0 | [v0.7.426](https://github.com/hcengineering/platform/releases/tag/v0.7.426) | 27835 | Jira (partial), Linear (full) |
| [Super Productivity](https://github.com/super-productivity/super-productivity) | TypeScript | MIT | [v19.1.0](https://github.com/super-productivity/super-productivity/releases/tag/v19.1.0) | 22568 | Todoist (partial) |
| [WeKan](https://github.com/wekan/wekan) | JavaScript | MIT | [v12.19](https://github.com/wekan/wekan/releases/tag/v12.19) | 21108 | Trello (full) |
| [OpenProject](https://github.com/opf/openproject) | Ruby | GPL-3.0 | [v17.9.1](https://github.com/opf/openproject/releases/tag/v17.9.1) signed | 16321 | Jira (full), Asana (partial), ClickUp (partial), monday.com (partial) |
| [PLANKA](https://github.com/plankanban/planka) | JavaScript | Other | [v2.2.1](https://github.com/plankanban/planka/releases/tag/v2.2.1) | 12602 | Trello (full) |
| [Leantime](https://github.com/Leantime/leantime) | PHP | AGPL-3.0 | [v3.10.4](https://github.com/Leantime/leantime/releases/tag/v3.10.4) signed | 11729 | Asana (full) |
| [Kanboard](https://github.com/kanboard/kanboard) | PHP | MIT | [v1.2.54](https://github.com/kanboard/kanboard/releases/tag/v1.2.54) | 9894 | Trello (full) |
| [Kaneo](https://github.com/usekaneo/kaneo) | TypeScript | MIT | [v2.33.0](https://github.com/usekaneo/kaneo/releases/tag/v2.33.0) | 9347 | Trello (full), Asana (partial) |
| [Kan](https://github.com/kanbn/kan) | TypeScript | AGPL-3.0 | [v0.6.0](https://github.com/kanbn/kan/releases/tag/v0.6.0) | 5731 | Trello (full) |
| [Vikunja](https://github.com/go-vikunja/vikunja) | Go | AGPL-3.0 | [v2.7.0](https://github.com/go-vikunja/vikunja/releases/tag/v2.7.0) signed | 5614 | Trello (full), Asana (partial), Todoist (full) |

</details>

<details>
<summary><b>Video conferencing</b>, 5 tools</summary>

Video meetings in the browser or an app.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Jitsi Meet](https://github.com/jitsi/jitsi-meet) | TypeScript | Apache-2.0 | [stable/jitsi-meet_11248](https://github.com/jitsi/jitsi-meet/releases/tag/stable/jitsi-meet_11248) | 30044 | Zoom (full), Microsoft Teams (partial) |
| [BigBlueButton](https://github.com/bigbluebutton/bigbluebutton) | JavaScript | LGPL-3.0 | [v3.0.39](https://github.com/bigbluebutton/bigbluebutton/releases/tag/v3.0.39) signed | 9236 | Zoom (partial) |
| [MiroTalk P2P](https://github.com/miroslavpejic85/mirotalk) | JavaScript | AGPL-3.0 | none | 4766 | Zoom (partial) |
| [La Suite Meet](https://github.com/suitenumerique/meet) | Python | MIT | [v1.32.1](https://github.com/suitenumerique/meet/releases/tag/v1.32.1) | 2414 | Zoom (full) |
| [Nextcloud Talk](https://github.com/nextcloud/spreed) | JavaScript | AGPL-3.0 | [v25.0.5](https://github.com/nextcloud/spreed/releases/tag/v25.0.5) signed | 2204 | Zoom (partial), Microsoft Teams (partial) |

</details>

<details>
<summary><b>Newsletters and email marketing</b>, 4 tools</summary>

Mailing lists, campaigns and subscriber management.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Ghost](https://github.com/TryGhost/Ghost) | TypeScript | MIT | [v6.67.0](https://github.com/TryGhost/Ghost/releases/tag/v6.67.0) | 55488 | Substack (full), Mailchimp (partial), Squarespace (partial), Wix (partial) |
| [listmonk](https://github.com/knadh/listmonk) | Go | AGPL-3.0 | [v6.2.0](https://github.com/knadh/listmonk/releases/tag/v6.2.0) | 23701 | Mailchimp (partial) |
| [Mautic](https://github.com/mautic/mautic) | PHP | Other | [7.2.1](https://github.com/mautic/mautic/releases/tag/7.2.1) signed | 10710 | Mailchimp (full) |
| [Plunk](https://github.com/useplunk/plunk) | TypeScript | AGPL-3.0 | [v0.15.0](https://github.com/useplunk/plunk/releases/tag/v0.15.0) signed | 5504 | Mailchimp (partial) |

</details>

<details>
<summary><b>Forms and surveys</b>, 5 tools</summary>

Build forms and surveys and collect the answers.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Formbricks](https://github.com/formbricks/formbricks) | TypeScript | Other | [6.0.2](https://github.com/formbricks/formbricks/releases/tag/6.0.2) signed | 13065 | Typeform (full), Google Forms (full), SurveyMonkey (full), Jotform (partial) |
| [Typebot](https://github.com/baptisteArno/typebot.io) | TypeScript | Other | [v3.19.0](https://github.com/baptisteArno/typebot.io/releases/tag/v3.19.0) signed | 10496 | Typeform (partial) |
| [HeyForm](https://github.com/heyform/heyform) | TypeScript | AGPL-3.0 | [v3.0.3](https://github.com/heyform/heyform/releases/tag/v3.0.3) | 8997 | Typeform (full), SurveyMonkey (partial), Jotform (partial) |
| [OpnForm](https://github.com/OpnForm/OpnForm) | PHP | Other | [v2.5.0](https://github.com/OpnForm/OpnForm/releases/tag/v2.5.0) signed | 3783 | Typeform (full), Google Forms (full) |
| [LimeSurvey](https://github.com/LimeSurvey/LimeSurvey) | JavaScript | Other | [7.4.0+260928](https://github.com/LimeSurvey/LimeSurvey/releases/tag/7.4.0%2B260928) | 3744 | Typeform (partial), Google Forms (full), SurveyMonkey (full), Jotform (partial) |

</details>

<details>
<summary><b>Photo libraries</b>, 5 tools</summary>

Back up, browse and share photos and videos from your phones.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Immich](https://github.com/immich-app/immich) | TypeScript | AGPL-3.0 | [v3.2.4](https://github.com/immich-app/immich/releases/tag/v3.2.4) | 115644 | Google Photos (full) |
| [PhotoPrism](https://github.com/photoprism/photoprism) | Go | Other | [260919-28c46a116](https://github.com/photoprism/photoprism/releases/tag/260919-28c46a116) | 40271 | Google Photos (partial) |
| [Ente Photos](https://github.com/ente/ente) | Dart | AGPL-3.0 | [photos-v1.3.64](https://github.com/ente/ente/releases/tag/photos-v1.3.64) | 29251 | Google Photos (full) |
| [LibrePhotos](https://github.com/LibrePhotos/librephotos) | Python | MIT | [1.2.1](https://github.com/LibrePhotos/librephotos/releases/tag/1.2.1) signed | 8089 | Google Photos (partial) |
| [Photoview](https://github.com/photoview/photoview) | Go | AGPL-3.0 | [v2.4.0](https://github.com/photoview/photoview/releases/tag/v2.4.0) signed | 6542 | Google Photos (partial) |

</details>

<details>
<summary><b>Media servers</b>, 5 tools</summary>

Stream a personal library of films, series and music to your devices.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Jellyfin](https://github.com/jellyfin/jellyfin) | C# | GPL-2.0 | [v12.2](https://github.com/jellyfin/jellyfin/releases/tag/v12.2) | 57815 | Plex (full), Emby (full), Netflix (partial) |
| [Navidrome](https://github.com/navidrome/navidrome) | Go | GPL-3.0 | [v0.64.2](https://github.com/navidrome/navidrome/releases/tag/v0.64.2) signed | 23985 | Plex (partial), Spotify (partial) |
| [Koel](https://github.com/koel/koel) | PHP | MIT | [v9.15.0](https://github.com/koel/koel/releases/tag/v9.15.0) | 17272 | Plex (partial) |
| [Audiobookshelf](https://github.com/advplyr/audiobookshelf) | JavaScript | GPL-3.0 | [v2.37.1](https://github.com/advplyr/audiobookshelf/releases/tag/v2.37.1) | 14555 | none |
| [Ampache](https://github.com/ampache/ampache) | PHP | AGPL-3.0 | [8.2.2](https://github.com/ampache/ampache/releases/tag/8.2.2) signed | 3834 | Plex (partial) |

</details>

<details>
<summary><b>Video hosting and streaming</b>, 6 tools</summary>

Publish videos and live streams on your own site for an audience to watch.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [SRS](https://github.com/ossrs/srs) | C++ | MIT | [v6.0-r2](https://github.com/ossrs/srs/releases/tag/v6.0-r2) | 29319 | none |
| [MediaMTX](https://github.com/bluenviron/mediamtx) | Go | MIT | [v1.21.1](https://github.com/bluenviron/mediamtx/releases/tag/v1.21.1) signed | 20345 | none |
| [PeerTube](https://github.com/Chocobozzz/PeerTube) | TypeScript | AGPL-3.0 | [v8.3.1](https://github.com/Chocobozzz/PeerTube/releases/tag/v8.3.1) signed | 15345 | YouTube (full), Vimeo (full), Twitch (partial) |
| [Owncast](https://github.com/owncast/owncast) | Go | MIT | [v0.3.0](https://github.com/owncast/owncast/releases/tag/v0.3.0) | 11575 | Twitch (partial) |
| [Restreamer](https://github.com/datarhei/restreamer) | HTML | Apache-2.0 | [v2.12.0](https://github.com/datarhei/restreamer/releases/tag/v2.12.0) | 5207 | none |
| [MediaCMS](https://github.com/mediacms-io/mediacms) | Python | AGPL-3.0 | [v9.1.2](https://github.com/mediacms-io/mediacms/releases/tag/v9.1.2) | 5135 | YouTube (partial), Vimeo (partial) |

</details>

<details>
<summary><b>Book and comic servers</b>, 7 tools</summary>

Serve a personal library of ebooks, comics and manga to readers and reading apps.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [calibre](https://github.com/kovidgoyal/calibre) | Python | GPL-3.0 | [v9.15.0](https://github.com/kovidgoyal/calibre/releases/tag/v9.15.0) signed | 26071 | Google Play Books (partial), Amazon Kindle (partial) |
| [Calibre-Web](https://github.com/janeczku/calibre-web) | Fluent | GPL-3.0 | [0.6.27](https://github.com/janeczku/calibre-web/releases/tag/0.6.27) | 18330 | Google Play Books (partial), Amazon Kindle (partial) |
| [Kavita](https://github.com/Kareadita/Kavita) | C# | GPL-3.0 | [v0.9.1.4](https://github.com/Kareadita/Kavita/releases/tag/v0.9.1.4) signed | 11806 | Google Play Books (partial), Amazon Kindle (partial) |
| [Komga](https://github.com/gotson/komga) | Kotlin | MIT | [1.28.1](https://github.com/gotson/komga/releases/tag/1.28.1) | 6713 | Google Play Books (partial), Amazon Kindle (partial) |
| [Calibre-Web Automated](https://github.com/crocodilestick/Calibre-Web-Automated) | JavaScript | GPL-3.0 | [v4.0.8](https://github.com/crocodilestick/Calibre-Web-Automated/releases/tag/v4.0.8) | 6373 | Calibre-Web (drop-in), Google Play Books (partial), Amazon Kindle (partial) |
| [Stump](https://github.com/stumpapp/stump) | TypeScript | MIT | [v0.1.10](https://github.com/stumpapp/stump/releases/tag/v0.1.10) signed | 2731 | Google Play Books (partial), Amazon Kindle (partial) |
| [BookLore](https://github.com/booklore-app/booklore) | Java | AGPL-3.0 | [v2.4.0](https://github.com/booklore-app/booklore/releases/tag/v2.4.0) signed | 1268 | Google Play Books (partial), Amazon Kindle (partial) |

</details>

<details>
<summary><b>Business intelligence</b>, 5 tools</summary>

Query databases and build charts and dashboards for the rest of the company.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Apache Superset](https://github.com/apache/superset) | Python | Apache-2.0 | [6.1.0](https://github.com/apache/superset/releases/tag/6.1.0) | 75048 | Tableau (full), Power BI (partial), Looker (partial) |
| [Metabase](https://github.com/metabase/metabase) | Clojure | Other | [v0.63.19](https://github.com/metabase/metabase/releases/tag/v0.63.19) signed | 49546 | Tableau (partial), Looker (partial) |
| [Redash](https://github.com/getredash/redash) | Python | BSD-2-Clause | [v26.9.0](https://github.com/getredash/redash/releases/tag/v26.9.0) | 28831 | Tableau (partial) |
| [DataEase](https://github.com/dataease/dataease) | Java | Other | [v3.1.0](https://github.com/dataease/dataease/releases/tag/v3.1.0) | 24587 | Tableau (partial) |
| [Lightdash](https://github.com/lightdash/lightdash) | TypeScript | Other | [2.436.0](https://github.com/lightdash/lightdash/releases/tag/2.436.0) | 6173 | Looker (full) |

</details>

<details>
<summary><b>Backend as a service</b>, 7 tools</summary>

Auth, database, storage and APIs for an app, without writing the backend.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Supabase](https://github.com/supabase/supabase) | TypeScript | Apache-2.0 | [v1.26.08](https://github.com/supabase/supabase/releases/tag/v1.26.08) signed | 111143 | Firebase (full) |
| [PocketBase](https://github.com/pocketbase/pocketbase) | Go | MIT | [v0.40.4](https://github.com/pocketbase/pocketbase/releases/tag/v0.40.4) | 61293 | Firebase (partial) |
| [Appwrite](https://github.com/appwrite/appwrite) | PHP | BSD-3-Clause | [2.3.0](https://github.com/appwrite/appwrite/releases/tag/2.3.0) signed | 57576 | Firebase (full) |
| [Hasura GraphQL Engine](https://github.com/hasura/graphql-engine) | TypeScript | Apache-2.0 | [v2.50.3](https://github.com/hasura/graphql-engine/releases/tag/v2.50.3) | 32131 | Firebase (partial) |
| [Parse Server](https://github.com/parse-community/parse-server) | JavaScript | Apache-2.0 | [9.10.3](https://github.com/parse-community/parse-server/releases/tag/9.10.3) | 21404 | Firebase (full) |
| [Convex](https://github.com/get-convex/convex-backend) | TypeScript | Other | [precompiled-2026-09-28-5c7cb5b](https://github.com/get-convex/convex-backend/releases/tag/precompiled-2026-09-28-5c7cb5b) | 12654 | Firebase (full) |
| [Nhost](https://github.com/nhost/nhost) | TypeScript | MIT | [cli@1.51.2](https://github.com/nhost/nhost/releases/tag/cli%401.51.2) signed | 9347 | Firebase (full) |

</details>

<details>
<summary><b>Self-hosted PaaS</b>, 6 tools</summary>

Deploy apps and databases to your own servers from a git push or a dashboard.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Coolify](https://github.com/coollabsio/coolify) | PHP | Apache-2.0 | [v4.3.23](https://github.com/coollabsio/coolify/releases/tag/v4.3.23) | 62626 | Heroku (full), Render (full), Railway (full), Vercel (partial), Netlify (partial) |
| [Dokploy](https://github.com/Dokploy/dokploy) | TypeScript | Other | [v0.30.8](https://github.com/Dokploy/dokploy/releases/tag/v0.30.8) | 37670 | Heroku (full), Render (full), Railway (full), Vercel (partial), Netlify (partial) |
| [Dokku](https://github.com/dokku/dokku) | Go | MIT | [v0.38.31](https://github.com/dokku/dokku/releases/tag/v0.38.31) | 32169 | Heroku (full) |
| [CapRover](https://github.com/caprover/caprover) | TypeScript | Other | [v1.15.4](https://github.com/caprover/caprover/releases/tag/v1.15.4) signed | 15179 | Heroku (full) |
| [Piku](https://github.com/piku/piku) | Python | MIT | [v1.0.0](https://github.com/piku/piku/releases/tag/v1.0.0) signed | 6604 | Heroku (partial) |
| [Kubero](https://github.com/kubero-dev/kubero) | TypeScript | GPL-3.0 | [v3.1.1](https://github.com/kubero-dev/kubero/releases/tag/v3.1.1) signed | 4430 | Heroku (full) |

</details>

<details>
<summary><b>Headless CMS</b>, 7 tools</summary>

Manage content in an admin UI and deliver it to any front end through an API.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Strapi](https://github.com/strapi/strapi) | TypeScript | Other | [v5.56.0](https://github.com/strapi/strapi/releases/tag/v5.56.0) | 73281 | Contentful (full) |
| [Payload](https://github.com/payloadcms/payload) | TypeScript | MIT | [v3.90.2](https://github.com/payloadcms/payload/releases/tag/v3.90.2) | 45099 | Contentful (full), Strapi (full) |
| [Directus](https://github.com/directus/directus) | TypeScript | Other | [v12.4.1](https://github.com/directus/directus/releases/tag/v12.4.1) signed | 38026 | Contentful (full) |
| [Wagtail](https://github.com/wagtail/wagtail) | Python | BSD-3-Clause | [v8.0](https://github.com/wagtail/wagtail/releases/tag/v8.0) | 20530 | Contentful (partial) |
| [Decap CMS](https://github.com/decaporg/decap-cms) | JavaScript | MIT | [decap-cms@3.16.3](https://github.com/decaporg/decap-cms/releases/tag/decap-cms%403.16.3) | 19415 | Contentful (partial) |
| [TinaCMS](https://github.com/tinacms/tinacms) | TypeScript | Apache-2.0 | [tinacms@3.14.2](https://github.com/tinacms/tinacms/releases/tag/tinacms%403.14.2) signed | 13823 | Contentful (partial) |
| [Keystone](https://github.com/keystonejs/keystone) | TypeScript | MIT | [2026-08-31](https://github.com/keystonejs/keystone/releases/tag/2026-08-31) signed | 9979 | Contentful (full) |

</details>

<details>
<summary><b>Feature flags</b>, 5 tools</summary>

Turn features on for some users without a deploy, and run experiments.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Unleash](https://github.com/Unleash/unleash) | TypeScript | AGPL-3.0 | [v8.2.0](https://github.com/Unleash/unleash/releases/tag/v8.2.0) | 13855 | LaunchDarkly (full) |
| [GrowthBook](https://github.com/growthbook/growthbook) | TypeScript | Other | [v5.1.0](https://github.com/growthbook/growthbook/releases/tag/v5.1.0) signed | 8478 | LaunchDarkly (full) |
| [Flagsmith](https://github.com/Flagsmith/flagsmith) | Python | BSD-3-Clause | [v2.280.0](https://github.com/Flagsmith/flagsmith/releases/tag/v2.280.0) signed | 6587 | LaunchDarkly (full) |
| [Flipt](https://github.com/flipt-io/flipt) | Go | Other | [v2.13.1](https://github.com/flipt-io/flipt/releases/tag/v2.13.1) | 4914 | LaunchDarkly (partial) |
| [FeatBit](https://github.com/featbit/featbit) | C# | MIT | [6.0.0](https://github.com/featbit/featbit/releases/tag/6.0.0) | 1925 | LaunchDarkly (full) |

</details>

<details>
<summary><b>Database migrations</b>, 8 tools</summary>

Version and apply database schema changes.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [migrate](https://github.com/golang-migrate/migrate) | Go | Other | [v4.20.1](https://github.com/golang-migrate/migrate/releases/tag/v4.20.1) signed | 18954 | Flyway (partial) |
| [goose](https://github.com/pressly/goose) | Go | Other | [v3.28.0](https://github.com/pressly/goose/releases/tag/v3.28.0) | 11541 | migrate (full) |
| [Flyway](https://github.com/flyway/flyway) | Java | Apache-2.0 | [flyway-13.9.0](https://github.com/flyway/flyway/releases/tag/flyway-13.9.0) | 10122 | Liquibase (full) |
| [Atlas](https://github.com/ariga/atlas) | Go | Apache-2.0 | [v1.3.0](https://github.com/ariga/atlas/releases/tag/v1.3.0) signed | 8760 | Liquibase (full), Flyway (full) |
| [dbmate](https://github.com/amacneil/dbmate) | Go | MIT | [v2.36.0](https://github.com/amacneil/dbmate/releases/tag/v2.36.0) signed | 7436 | Flyway (full), Liquibase (partial) |
| [Liquibase](https://github.com/liquibase/liquibase) | Java | Other | [v5.0.4](https://github.com/liquibase/liquibase/releases/tag/v5.0.4) signed | 5621 | none |
| [Alembic](https://github.com/sqlalchemy/alembic) | Python | MIT | [rel_1_20_0](https://github.com/sqlalchemy/alembic/releases/tag/rel_1_20_0) | 4431 | Flyway (partial) |
| [Sqitch](https://github.com/sqitchers/sqitch) | Perl | MIT | [v1.6.1](https://github.com/sqitchers/sqitch/releases/tag/v1.6.1) signed | 3169 | Liquibase (full) |

</details>

<details>
<summary><b>Kubernetes UIs</b>, 5 tools</summary>

Browse and operate Kubernetes clusters from a desktop, web or terminal UI.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Portainer](https://github.com/portainer/portainer) | TypeScript | Zlib | [2.45.1](https://github.com/portainer/portainer/releases/tag/2.45.1) signed | 38621 | Lens (partial) |
| [k9s](https://github.com/derailed/k9s) | Go | Apache-2.0 | [v0.51.0](https://github.com/derailed/k9s/releases/tag/v0.51.0) | 34744 | Lens (partial) |
| [Rancher](https://github.com/rancher/rancher) | Go | Apache-2.0 | [v2.15.2](https://github.com/rancher/rancher/releases/tag/v2.15.2) signed | 25957 | Lens (full) |
| [Headlamp](https://github.com/kubernetes-sigs/headlamp) | TypeScript | Apache-2.0 | [v0.45.0](https://github.com/kubernetes-sigs/headlamp/releases/tag/v0.45.0) | 7386 | Lens (full) |
| [Freelens](https://github.com/freelensapp/freelens) | TypeScript | MIT | [v1.10.3](https://github.com/freelensapp/freelens/releases/tag/v1.10.3) signed | 5651 | Lens (full) |

</details>

<details>
<summary><b>Virtualization</b>, 5 tools</summary>

Run virtual machines and system containers across a cluster of hosts.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [KubeVirt](https://github.com/kubevirt/kubevirt) | Go | Apache-2.0 | [v1.9.0](https://github.com/kubevirt/kubevirt/releases/tag/v1.9.0) signed | 7100 | VMware vSphere (partial) |
| [Incus](https://github.com/lxc/incus) | Go | Apache-2.0 | [v7.5.1](https://github.com/lxc/incus/releases/tag/v7.5.1) signed | 6337 | LXD (full), VMware vSphere (partial) |
| [Harvester](https://github.com/harvester/harvester) | Go | Apache-2.0 | [v1.9.0](https://github.com/harvester/harvester/releases/tag/v1.9.0) | 5195 | VMware vSphere (full) |
| [LXD](https://github.com/canonical/lxd) | Go | AGPL-3.0 | [lxd-6.9](https://github.com/canonical/lxd/releases/tag/lxd-6.9) signed | 4832 | none |
| [Apache CloudStack](https://github.com/apache/cloudstack) | Java | Apache-2.0 | [4.23.0.0](https://github.com/apache/cloudstack/releases/tag/4.23.0.0) signed | 3090 | VMware vSphere (partial) |

</details>

<details>
<summary><b>Code search servers</b>, 4 tools</summary>

Index many repositories and search them from a web UI.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Hound](https://github.com/hound-search/hound) | JavaScript | MIT | [v0.7.1](https://github.com/hound-search/hound/releases/tag/v0.7.1) signed | 5882 | Sourcegraph (partial) |
| [OpenGrok](https://github.com/oracle/opengrok) | Java | Other | [1.14.19](https://github.com/oracle/opengrok/releases/tag/1.14.19) | 4968 | Sourcegraph (partial) |
| [Sourcebot](https://github.com/sourcebot-dev/sourcebot) | TypeScript | Other | [v5.1.15](https://github.com/sourcebot-dev/sourcebot/releases/tag/v5.1.15) | 3979 | Sourcegraph (partial) |
| [Zoekt](https://github.com/sourcegraph/zoekt) | Go | Apache-2.0 | none | 1948 | Sourcegraph (partial) |

</details>

<details>
<summary><b>Data integration</b>, 7 tools</summary>

Extract data from applications and databases and load it into a warehouse.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Canal](https://github.com/alibaba/canal) | Java | Apache-2.0 | [canal-1.1.8](https://github.com/alibaba/canal/releases/tag/canal-1.1.8) | 29737 | Debezium (partial) |
| [Airbyte](https://github.com/airbytehq/airbyte) | Python | Other | [v2.0.0](https://github.com/airbytehq/airbyte/releases/tag/v2.0.0) signed | 22175 | Fivetran (full) |
| [DataX](https://github.com/alibaba/DataX) | Java | Other | [datax_v202309](https://github.com/alibaba/DataX/releases/tag/datax_v202309) signed | 17364 | Fivetran (partial) |
| [Debezium](https://github.com/debezium/debezium) | Java | Apache-2.0 | [v3.7.0.Final](https://github.com/debezium/debezium/releases/tag/v3.7.0.Final) | 13179 | Fivetran (partial) |
| [Apache SeaTunnel](https://github.com/apache/seatunnel) | Java | Apache-2.0 | [v3.0.0](https://github.com/apache/seatunnel/releases/tag/v3.0.0) | 9698 | Fivetran (partial) |
| [dlt](https://github.com/dlt-hub/dlt) | Python | Apache-2.0 | [1.30.0](https://github.com/dlt-hub/dlt/releases/tag/1.30.0) signed | 5932 | Fivetran (partial) |
| [Meltano](https://github.com/meltano/meltano) | Python | MIT | [v4.4.0](https://github.com/meltano/meltano/releases/tag/v4.4.0) signed | 2645 | Fivetran (partial), Airbyte (partial) |

</details>

<details>
<summary><b>JavaScript HTTP clients</b>, 6 tools</summary>

Send HTTP requests from Node.js and browsers.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [axios](https://github.com/axios/axios) | JavaScript | MIT | [v1.20.0](https://github.com/axios/axios/releases/tag/v1.20.0) signed | 109310 | request (full) |
| [request](https://github.com/request/request) | JavaScript | Apache-2.0 | [v2.88.1](https://github.com/request/request/releases/tag/v2.88.1) | 25496 | none |
| [Ky](https://github.com/sindresorhus/ky) | TypeScript | MIT | [v2.1.0](https://github.com/sindresorhus/ky/releases/tag/v2.1.0) | 17104 | request (partial), axios (full) |
| [SuperAgent](https://github.com/forwardemail/superagent) | JavaScript | MIT | [v10.4.1](https://github.com/forwardemail/superagent/releases/tag/v10.4.1) | 16634 | request (full) |
| [Got](https://github.com/sindresorhus/got) | TypeScript | MIT | [v16.0.0](https://github.com/sindresorhus/got/releases/tag/v16.0.0) | 14948 | request (full) |
| [undici](https://github.com/nodejs/undici) | JavaScript | MIT | [v8.11.2](https://github.com/nodejs/undici/releases/tag/v8.11.2) signed | 7708 | request (full) |

</details>

<details>
<summary><b>JavaScript utility libraries</b>, 5 tools</summary>

Helpers for arrays, objects, strings and functions.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Lodash](https://github.com/lodash/lodash) | JavaScript | Other | [4.18.1](https://github.com/lodash/lodash/releases/tag/4.18.1) signed | 61318 | none |
| [Underscore.js](https://github.com/jashkenas/underscore) | JavaScript | MIT | [1.13.8](https://github.com/jashkenas/underscore/releases/tag/1.13.8) | 27320 | none |
| [Ramda](https://github.com/ramda/ramda) | JavaScript | MIT | [v0.32.0](https://github.com/ramda/ramda/releases/tag/v0.32.0) | 24047 | Lodash (partial) |
| [es-toolkit](https://github.com/toss/es-toolkit) | TypeScript | MIT | [v1.52.0](https://github.com/toss/es-toolkit/releases/tag/v1.52.0) signed | 11356 | Lodash (drop-in) |
| [Remeda](https://github.com/remeda/remeda) | TypeScript | MIT | [v2.51.0](https://github.com/remeda/remeda/releases/tag/v2.51.0) signed | 5438 | Lodash (partial) |

</details>

<details>
<summary><b>CSS processing</b>, 7 tools</summary>

Compile, transform, prefix and minify stylesheets.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) | TypeScript | MIT | [v4.3.3](https://github.com/tailwindlabs/tailwindcss/releases/tag/v4.3.3) signed | 97773 | none |
| [PostCSS](https://github.com/postcss/postcss) | TypeScript | MIT | [8.5.29](https://github.com/postcss/postcss/releases/tag/8.5.29) signed | 28975 | none |
| [UnoCSS](https://github.com/unocss/unocss) | TypeScript | Other | [v66.10.5](https://github.com/unocss/unocss/releases/tag/v66.10.5) signed | 18973 | Tailwind CSS (partial) |
| [Less](https://github.com/less/less.js) | JavaScript | Apache-2.0 | [v4.9.1](https://github.com/less/less.js/releases/tag/v4.9.1) | 17025 | none |
| [node-sass](https://github.com/sass/node-sass) archived | C++ | MIT | [v9.0.0](https://github.com/sass/node-sass/releases/tag/v9.0.0) signed | 8447 | none |
| [Lightning CSS](https://github.com/parcel-bundler/lightningcss) | Rust | MPL-2.0 | [v1.33.0](https://github.com/parcel-bundler/lightningcss/releases/tag/v1.33.0) | 7695 | PostCSS (partial) |
| [Dart Sass](https://github.com/sass/dart-sass) | Dart | MIT | [1.105.1](https://github.com/sass/dart-sass/releases/tag/1.105.1) signed | 4227 | node-sass (drop-in) |

</details>

<details>
<summary><b>JavaScript schema validation</b>, 7 tools</summary>

Declare schemas and validate data against them at runtime.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Zod](https://github.com/colinhacks/zod) | TypeScript | MIT | [v4.6.5](https://github.com/colinhacks/zod/releases/tag/v4.6.5) | 44064 | Yup (full), Joi (full) |
| [Yup](https://github.com/jquense/yup) | TypeScript | MIT | [v1.0.0](https://github.com/jquense/yup/releases/tag/v1.0.0) | 23659 | none |
| [Joi](https://github.com/hapijs/joi) | JavaScript | Other | [v18.2.9](https://github.com/hapijs/joi/releases/tag/v18.2.9) | 21163 | none |
| [Ajv](https://github.com/ajv-validator/ajv) | TypeScript | MIT | [v8.20.0](https://github.com/ajv-validator/ajv/releases/tag/v8.20.0) signed | 14852 | none |
| [class-validator](https://github.com/typestack/class-validator) | TypeScript | MIT | [v0.15.1](https://github.com/typestack/class-validator/releases/tag/v0.15.1) signed | 11835 | Joi (partial) |
| [Valibot](https://github.com/open-circle/valibot) | TypeScript | MIT | [v1.5.0](https://github.com/open-circle/valibot/releases/tag/v1.5.0) signed | 9030 | Zod (full), Yup (full) |
| [ArkType](https://github.com/arktypeio/arktype) | TypeScript | MIT | [@arktype/util@0.56.6](https://github.com/arktypeio/arktype/releases/tag/%40arktype/util%400.56.6) signed | 7870 | Zod (full) |

</details>

<details>
<summary><b>React state management</b>, 6 tools</summary>

Share and update application state across React components.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Redux](https://github.com/reduxjs/redux) | TypeScript | MIT | [v5.0.1](https://github.com/reduxjs/redux/releases/tag/v5.0.1) | 61482 | none |
| [Zustand](https://github.com/pmndrs/zustand) | TypeScript | MIT | [v5.0.15](https://github.com/pmndrs/zustand/releases/tag/v5.0.15) | 58790 | Redux (full) |
| [XState](https://github.com/statelyai/xstate) | TypeScript | MIT | [xstate@5.33.2](https://github.com/statelyai/xstate/releases/tag/xstate%405.33.2) signed | 30241 | none |
| [MobX](https://github.com/mobxjs/mobx) | TypeScript | MIT | [mobx@7.0.6](https://github.com/mobxjs/mobx/releases/tag/mobx%407.0.6) | 28211 | Redux (full) |
| [Jotai](https://github.com/pmndrs/jotai) | TypeScript | MIT | [v3.0.1](https://github.com/pmndrs/jotai/releases/tag/v3.0.1) | 21290 | Redux (partial) |
| [Valtio](https://github.com/pmndrs/valtio) | TypeScript | MIT | [v2.3.2](https://github.com/pmndrs/valtio/releases/tag/v2.3.2) | 10240 | Redux (partial) |

</details>

<details>
<summary><b>Python task queues</b>, 6 tools</summary>

Run background jobs from Python through a broker.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Celery](https://github.com/celery/celery) | Python | Other | [v5.6.3](https://github.com/celery/celery/releases/tag/v5.6.3) signed | 28936 | none |
| [RQ](https://github.com/rq/rq) | Python | Other | [v2.12](https://github.com/rq/rq/releases/tag/v2.12) | 10693 | Celery (partial) |
| [Hatchet](https://github.com/hatchet-dev/hatchet) | Go | MIT | [v0.107.0](https://github.com/hatchet-dev/hatchet/releases/tag/v0.107.0) | 8067 | Celery (partial) |
| [huey](https://github.com/coleifer/huey) | Python | MIT | [3.4.0](https://github.com/coleifer/huey/releases/tag/3.4.0) | 6041 | Celery (partial) |
| [Dramatiq](https://github.com/Bogdanp/dramatiq) | Python | LGPL-3.0 | [v2.2.1](https://github.com/Bogdanp/dramatiq/releases/tag/v2.2.1) signed | 5326 | Celery (full) |
| [arq](https://github.com/python-arq/arq) | Python | MIT | [v0.28.0](https://github.com/python-arq/arq/releases/tag/v0.28.0) | 3015 | Celery (partial) |

</details>

<details>
<summary><b>DataFrame libraries</b>, 6 tools</summary>

Load, transform and analyse tabular data in memory.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [pandas](https://github.com/pandas-dev/pandas) | Python | BSD-3-Clause | [v3.0.6](https://github.com/pandas-dev/pandas/releases/tag/v3.0.6) | 49919 | none |
| [Polars](https://github.com/pola-rs/polars) | Rust | MIT | [py-1.44.2](https://github.com/pola-rs/polars/releases/tag/py-1.44.2) | 39917 | pandas (full) |
| [Dask](https://github.com/dask/dask) | Python | BSD-3-Clause | [2026.8.0](https://github.com/dask/dask/releases/tag/2026.8.0) | 13934 | pandas (partial) |
| [Modin](https://github.com/modin-project/modin) | Python | Apache-2.0 | [0.37.1](https://github.com/modin-project/modin/releases/tag/0.37.1) signed | 10394 | pandas (drop-in) |
| [cuDF](https://github.com/NVIDIA/cudf) | C++ | Apache-2.0 | [v26.08.01](https://github.com/NVIDIA/cudf/releases/tag/v26.08.01) | 9771 | pandas (drop-in) |
| [Ibis](https://github.com/ibis-project/ibis) | Python | Apache-2.0 | [12.0.0](https://github.com/ibis-project/ibis/releases/tag/12.0.0) | 6673 | pandas (partial) |

</details>

<details>
<summary><b>System monitors</b>, 7 tools</summary>

Watch processes and resource use from a terminal.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [btop](https://github.com/aristocratos/btop) | C++ | Apache-2.0 | [v1.4.7](https://github.com/aristocratos/btop/releases/tag/v1.4.7) | 34882 | htop (full) |
| [Glances](https://github.com/nicolargo/glances) | Python | Other | [v4.5.7](https://github.com/nicolargo/glances/releases/tag/v4.5.7) | 33740 | htop (full) |
| [bottom](https://github.com/ClementTsang/bottom) | Rust | MIT | [0.14.9](https://github.com/ClementTsang/bottom/releases/tag/0.14.9) signed | 14086 | htop (full) |
| [bandwhich](https://github.com/imsnif/bandwhich) | Rust | MIT | [v0.23.1](https://github.com/imsnif/bandwhich/releases/tag/v0.23.1) signed | 11994 | none |
| [nvtop](https://github.com/Syllo/nvtop) | C | Other | [3.3.2](https://github.com/Syllo/nvtop/releases/tag/3.3.2) | 11045 | none |
| [htop](https://github.com/htop-dev/htop) | C | GPL-2.0 | [3.5.3](https://github.com/htop-dev/htop/releases/tag/3.5.3) | 8367 | none |
| [zenith](https://github.com/bvaisvil/zenith) | Rust | MIT | [0.15.1](https://github.com/bvaisvil/zenith/releases/tag/0.15.1) signed | 3059 | htop (full) |

</details>

<details>
<summary><b>Directory jumpers</b>, 4 tools</summary>

Jump to frequently used directories with a few keystrokes.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [zoxide](https://github.com/ajeetdsouza/zoxide) | Rust | MIT | [v0.10.0](https://github.com/ajeetdsouza/zoxide/releases/tag/v0.10.0) | 39894 | autojump (full), z (full) |
| [z](https://github.com/rupa/z) | Shell | WTFPL | [v1.12](https://github.com/rupa/z/releases/tag/v1.12) signed | 17060 | none |
| [autojump](https://github.com/wting/autojump) | Python | Other | [release-v22.5.3](https://github.com/wting/autojump/releases/tag/release-v22.5.3) | 16962 | none |
| [z.lua](https://github.com/skywind3000/z.lua) | Lua | MIT | [1.8.26](https://github.com/skywind3000/z.lua/releases/tag/1.8.26) signed | 3149 | z (full) |

</details>

<details>
<summary><b>Fuzzy finders</b>, 5 tools</summary>

Filter lists interactively in a terminal, for files, history and anything piped in.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [fzf](https://github.com/junegunn/fzf) | Go | MIT | [v0.74.4](https://github.com/junegunn/fzf/releases/tag/v0.74.4) signed | 83396 | none |
| [telescope.nvim](https://github.com/nvim-telescope/telescope.nvim) | Lua | MIT | [v0.2.1](https://github.com/nvim-telescope/telescope.nvim/releases/tag/v0.2.1) | 19815 | fzf (partial) |
| [peco](https://github.com/peco/peco) | Go | MIT | [v0.6.0](https://github.com/peco/peco/releases/tag/v0.6.0) | 7913 | fzf (partial) |
| [skim](https://github.com/skim-rs/skim) | Rust | MIT | [v5.7.4](https://github.com/skim-rs/skim/releases/tag/v5.7.4) signed | 6981 | fzf (full) |
| [Television](https://github.com/alexpasmantier/television) | Rust | MIT | [0.15.9](https://github.com/alexpasmantier/television/releases/tag/0.15.9) | 6328 | fzf (full) |

</details>

<details>
<summary><b>Shells</b>, 7 tools</summary>

Interactive command-line shells.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [PowerShell](https://github.com/PowerShell/PowerShell) | C# | MIT | [v7.6.6](https://github.com/PowerShell/PowerShell/releases/tag/v7.6.6) | 55607 | none |
| [Nushell](https://github.com/nushell/nushell) | Rust | MIT | [0.116.1](https://github.com/nushell/nushell/releases/tag/0.116.1) signed | 40626 | Zsh (partial) |
| [fish](https://github.com/fish-shell/fish-shell) | Rust | Other | [4.9.3](https://github.com/fish-shell/fish-shell/releases/tag/4.9.3) signed | 34261 | Zsh (full) |
| [xonsh](https://github.com/xonsh/xonsh) | Python | Other | [0.24.2](https://github.com/xonsh/xonsh/releases/tag/0.24.2) signed | 9659 | Zsh (partial) |
| [Elvish](https://github.com/elves/elvish) | Go | BSD-2-Clause | [v0.21.0](https://github.com/elves/elvish/releases/tag/v0.21.0) | 6383 | Zsh (partial) |
| [Zsh](https://github.com/zsh-users/zsh) | C | Other | [zsh-5.9.2](https://github.com/zsh-users/zsh/releases/tag/zsh-5.9.2) | 4305 | none |
| [Oils](https://github.com/oils-for-unix/oils) | Python | Other | none | 3397 | none |

</details>

<details>
<summary><b>Git clients</b>, 6 tools</summary>

Stage, commit, branch and browse history outside the bare git command.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [lazygit](https://github.com/jesseduffield/lazygit) | Go | MIT | [v0.66.0](https://github.com/jesseduffield/lazygit/releases/tag/v0.66.0) | 82912 | GitKraken (partial), Sourcetree (partial), tig (full) |
| [Jujutsu](https://github.com/jj-vcs/jj) | Rust | Apache-2.0 | [v0.45.1](https://github.com/jj-vcs/jj/releases/tag/v0.45.1) | 31895 | none |
| [GitUI](https://github.com/gitui-org/gitui) | Rust | MIT | [v0.28.1](https://github.com/gitui-org/gitui/releases/tag/v0.28.1) | 22548 | GitKraken (partial), tig (full) |
| [GitHub Desktop](https://github.com/desktop/desktop) | TypeScript | MIT | [release-3.6.6](https://github.com/desktop/desktop/releases/tag/release-3.6.6) | 21916 | GitKraken (partial), Sourcetree (partial) |
| [GitButler](https://github.com/gitbutlerapp/gitbutler) | Rust | Other | [release/0.22.3](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.22.3) signed | 21779 | GitKraken (partial) |
| [tig](https://github.com/jonas/tig) | C | GPL-2.0 | [tig-2.6.1](https://github.com/jonas/tig/releases/tag/tig-2.6.1) signed | 13357 | none |

</details>

<details>
<summary><b>Office suites</b>, 5 tools</summary>

Documents, spreadsheets and presentations.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Etherpad](https://github.com/ether/etherpad) | TypeScript | Apache-2.0 | [v3.3.7](https://github.com/ether/etherpad/releases/tag/v3.3.7) | 18562 | Google Docs (partial) |
| [CryptPad](https://github.com/cryptpad/cryptpad) | JavaScript | AGPL-3.0 | [2026.5.1](https://github.com/cryptpad/cryptpad/releases/tag/2026.5.1) signed | 7989 | Google Docs (full) |
| [ONLYOFFICE Docs](https://github.com/ONLYOFFICE/DocumentServer) | Shell | AGPL-3.0 | [v9.4.0](https://github.com/ONLYOFFICE/DocumentServer/releases/tag/v9.4.0) | 6970 | Microsoft 365 (partial), Google Docs (full) |
| [LibreOffice](https://github.com/LibreOffice/core) | C++ | GPL-3.0 | [libreoffice-26.8.1.1](https://github.com/LibreOffice/core/releases/tag/libreoffice-26.8.1.1) | 4456 | Microsoft 365 (partial), Google Docs (partial) |
| [Collabora Online](https://github.com/CollaboraOnline/online) | Shell | Other | [25.04.7-mobile](https://github.com/CollaboraOnline/online/releases/tag/25.04.7-mobile) signed | 3366 | Google Docs (full), Microsoft 365 (partial) |

</details>

<details>
<summary><b>Document management</b>, 6 tools</summary>

Scan, OCR, tag and search paper and PDF documents.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Paperless-ngx](https://github.com/paperless-ngx/paperless-ngx) | Python | GPL-3.0 | [v3.3.0](https://github.com/paperless-ngx/paperless-ngx/releases/tag/v3.3.0) | 46306 | Paperless-ng (drop-in), Paperless (full), DocuWare (partial) |
| [Paperless](https://github.com/the-paperless-project/paperless) archived | Python | GPL-3.0 | [2.7.0](https://github.com/the-paperless-project/paperless/releases/tag/2.7.0) | 7914 | none |
| [Papra](https://github.com/papra-hq/papra) | TypeScript | AGPL-3.0 | [@papra/lecture@0.5.2](https://github.com/papra-hq/papra/releases/tag/%40papra/lecture%400.5.2) signed | 5539 | Paperless-ngx (full) |
| [Paperless-ng](https://github.com/jonaswinkler/paperless-ng) archived | Python | GPL-3.0 | [ng-1.5.0](https://github.com/jonaswinkler/paperless-ng/releases/tag/ng-1.5.0) | 5407 | none |
| [Teedy](https://github.com/sismics/docs) | JavaScript | GPL-2.0 | [v1.11](https://github.com/sismics/docs/releases/tag/v1.11) | 2565 | Paperless-ngx (full), DocuWare (partial) |
| [Docspell](https://github.com/eikek/docspell) | Elm | AGPL-3.0 | [v0.43.0](https://github.com/eikek/docspell/releases/tag/v0.43.0) | 2333 | Paperless-ngx (full) |

</details>

<details>
<summary><b>Interface design tools</b>, 5 tools</summary>

Design and prototype user interfaces on a shared canvas.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Penpot](https://github.com/penpot/penpot) | Clojure | MPL-2.0 | [2.18.2](https://github.com/penpot/penpot/releases/tag/2.18.2) | 60728 | Figma (full), Canva (partial) |
| [Onlook](https://github.com/onlook-dev/onlook) | TypeScript | Apache-2.0 | [v0.2.32](https://github.com/onlook-dev/onlook/releases/tag/v0.2.32) signed | 26859 | Figma (partial) |
| [OpenPencil](https://github.com/open-pencil/open-pencil) | TypeScript | MIT | [v0.15.1](https://github.com/open-pencil/open-pencil/releases/tag/v0.15.1) | 8759 | Figma (partial) |
| [Plasmic](https://github.com/plasmicapp/plasmic) | TypeScript | MIT | [2.0.23](https://www.npmjs.com/package/@plasmicapp/loader-react/v/2.0.23) | 7069 | Webflow (partial) |
| [Grida](https://github.com/gridaco/grida) | TypeScript | Apache-2.0 | [v0.0.24](https://github.com/gridaco/grida/releases/tag/v0.0.24) signed | 2654 | Figma (partial) |

</details>

<details>
<summary><b>Diagrams and whiteboards</b>, 8 tools</summary>

Draw diagrams and sketch on a shared canvas.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Excalidraw](https://github.com/excalidraw/excalidraw) | TypeScript | MIT | [v0.18.1](https://github.com/excalidraw/excalidraw/releases/tag/v0.18.1) | 133573 | Miro (partial), Lucidchart (partial) |
| [Mermaid](https://github.com/mermaid-js/mermaid) | TypeScript | MIT | [@mermaid-js/tiny@12.1.0](https://github.com/mermaid-js/mermaid/releases/tag/%40mermaid-js/tiny%4012.1.0) | 90557 | Lucidchart (partial) |
| [tldraw](https://github.com/tldraw/tldraw) | TypeScript | Other | [v5.5.2](https://github.com/tldraw/tldraw/releases/tag/v5.5.2) | 50773 | Miro (partial) |
| [Diagrams](https://github.com/mingrammer/diagrams) | Python | MIT | [v0.25.1](https://github.com/mingrammer/diagrams/releases/tag/v0.25.1) signed | 42674 | Lucidchart (partial) |
| [D2](https://github.com/d2lang/d2) | Go | MPL-2.0 | [v0.9.0](https://github.com/d2lang/d2/releases/tag/v0.9.0) signed | 25567 | Lucidchart (partial) |
| [PlantUML](https://github.com/plantuml/plantuml) | Java | LGPL-3.0 | [v1.2026.8](https://github.com/plantuml/plantuml/releases/tag/v1.2026.8) | 13355 | Lucidchart (partial) |
| [markmap](https://github.com/markmap/markmap) | TypeScript | MIT | [v0.18.0](https://github.com/markmap/markmap/releases/tag/v0.18.0) | 13146 | none |
| [draw.io](https://github.com/jgraph/drawio) | JavaScript | Apache-2.0 | [v32.0.2](https://github.com/jgraph/drawio/releases/tag/v32.0.2) | 8583 | Lucidchart (full), Miro (partial) |

</details>

<details>
<summary><b>Screen recording</b>, 6 tools</summary>

Record the screen and camera and share the video.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [OBS Studio](https://github.com/obsproject/obs-studio) | C | GPL-2.0 | [32.2.2](https://github.com/obsproject/obs-studio/releases/tag/32.2.2) | 77023 | Loom (partial) |
| [ShareX](https://github.com/ShareX/ShareX) | C# | GPL-3.0 | [v21.0.0](https://github.com/ShareX/ShareX/releases/tag/v21.0.0) | 39901 | Snagit (full), Loom (partial) |
| [ScreenToGif](https://github.com/NickeManarin/ScreenToGif) | C# | MS-PL | [2.43.2](https://github.com/NickeManarin/ScreenToGif/releases/tag/2.43.2) | 27747 | Snagit (partial) |
| [Cap](https://github.com/CapSoftware/Cap) | Rust | Other | [cap-v0.6.0](https://github.com/CapSoftware/Cap/releases/tag/cap-v0.6.0) | 23071 | Loom (full) |
| [Screenity](https://github.com/alyssaxuu/screenity) | JavaScript | GPL-3.0 | [v4.6.12](https://github.com/alyssaxuu/screenity/releases/tag/v4.6.12) | 18751 | Loom (partial) |
| [Kooha](https://github.com/SeaDve/Kooha) | Rust | GPL-3.0 | [v2.3.2](https://github.com/SeaDve/Kooha/releases/tag/v2.3.2) signed | 3526 | Loom (partial) |

</details>

<details>
<summary><b>Authenticator apps</b>, 5 tools</summary>

Generate one-time codes for two-factor authentication.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Ente Auth](https://github.com/ente/ente) | Dart | AGPL-3.0 | [photos-v1.3.64](https://github.com/ente/ente/releases/tag/photos-v1.3.64) | 29251 | Twilio Authy (full), Google Authenticator (full) |
| [Aegis](https://github.com/beemdevelopment/Aegis) | Java | GPL-3.0 | [v3.4.3](https://github.com/beemdevelopment/Aegis/releases/tag/v3.4.3) | 13213 | Twilio Authy (full), Google Authenticator (full) |
| [Stratum](https://github.com/stratumauth/app) | C# | GPL-3.0 | [v1.6.2](https://github.com/stratumauth/app/releases/tag/v1.6.2) signed | 4605 | Twilio Authy (full), Google Authenticator (full) |
| [FreeOTP](https://github.com/freeotp/freeotp-android) | Java | Apache-2.0 | [v2.0.6](https://github.com/freeotp/freeotp-android/releases/tag/v2.0.6) | 1676 | Google Authenticator (full) |
| [2FAS Auth](https://github.com/twofas/2fas-android) | Kotlin | GPL-3.0 | [6.0.3](https://github.com/twofas/2fas-android/releases/tag/6.0.3) | 1525 | Twilio Authy (full), Google Authenticator (full) |

</details>

<details>
<summary><b>Writing assistants</b>, 5 tools</summary>

Check grammar, spelling and style as you type.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Harper](https://github.com/Automattic/harper) | Rust | Apache-2.0 | [v2.12.0](https://github.com/Automattic/harper/releases/tag/v2.12.0) | 16176 | Grammarly (partial) |
| [LanguageTool](https://github.com/languagetool-org/languagetool) | Java | LGPL-2.1 | [v6.8](https://github.com/languagetool-org/languagetool/releases/tag/v6.8) | 15107 | Grammarly (full) |
| [Vale](https://github.com/vale-cli/vale) | Go | MIT | [v3.24.0](https://github.com/vale-cli/vale/releases/tag/v3.24.0) signed | 6205 | Grammarly (partial) |
| [proselint](https://github.com/amperser/proselint) | JavaScript | BSD-3-Clause | [v0.16.0](https://github.com/amperser/proselint/releases/tag/v0.16.0) | 4581 | Grammarly (partial) |
| [textlint](https://github.com/textlint/textlint) | TypeScript | MIT | [v15.8.0](https://github.com/textlint/textlint/releases/tag/v15.8.0) signed | 3199 | Grammarly (partial) |

</details>

<details>
<summary><b>Machine translation</b>, 3 tools</summary>

Translate text between languages, through an API or a web UI.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [LibreTranslate](https://github.com/LibreTranslate/LibreTranslate) | Python | AGPL-3.0 | [v1.9.6](https://github.com/LibreTranslate/LibreTranslate/releases/tag/v1.9.6) | 16991 | DeepL (partial), Google Translate (partial) |
| [Argos Translate](https://github.com/argosopentech/argos-translate) | Python | MIT | [v1.4.0](https://github.com/argosopentech/argos-translate/releases/tag/v1.4.0) | 6531 | Google Translate (partial) |
| [MTranServer](https://github.com/xxnuo/MTranServer) | C++ | Apache-2.0 | [v4.0.33](https://github.com/xxnuo/MTranServer/releases/tag/v4.0.33) | 4714 | DeepL (partial), Google Translate (partial) |

</details>

<details>
<summary><b>Read-later and bookmarks</b>, 7 tools</summary>

Save links and articles to read or find again later.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Karakeep](https://github.com/karakeep-app/karakeep) | TypeScript | AGPL-3.0 | [v0.33.2](https://github.com/karakeep-app/karakeep/releases/tag/v0.33.2) signed | 29463 | Pocket (full), Raindrop.io (full) |
| [Linkwarden](https://github.com/linkwarden/linkwarden) | TypeScript | AGPL-3.0 | [v2.16.3](https://github.com/linkwarden/linkwarden/releases/tag/v2.16.3) signed | 19935 | Raindrop.io (full), Pocket (full) |
| [wallabag](https://github.com/wallabag/wallabag) | PHP | MIT | [2.6.14](https://github.com/wallabag/wallabag/releases/tag/2.6.14) signed | 12997 | Pocket (full), Raindrop.io (partial) |
| [Shiori](https://github.com/go-shiori/shiori) | Go | MIT | [v1.8.0](https://github.com/go-shiori/shiori/releases/tag/v1.8.0) signed | 11663 | Pocket (full), Raindrop.io (partial) |
| [linkding](https://github.com/sissbruecker/linkding) | Python | MIT | [v1.47.0](https://github.com/sissbruecker/linkding/releases/tag/v1.47.0) | 11274 | Raindrop.io (full), Pocket (partial) |
| [Shaarli](https://github.com/shaarli/Shaarli) | PHP | Other | [v0.16.9](https://github.com/shaarli/Shaarli/releases/tag/v0.16.9) signed | 3906 | Raindrop.io (partial) |
| [LinkAce](https://github.com/Kovah/LinkAce) | PHP | GPL-3.0 | [v2.6.1](https://github.com/Kovah/LinkAce/releases/tag/v2.6.1) signed | 3341 | Raindrop.io (full), Pocket (partial) |

</details>

<details>
<summary><b>Feed readers</b>, 7 tools</summary>

Follow sites through RSS and Atom feeds.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [FreshRSS](https://github.com/FreshRSS/FreshRSS) | PHP | AGPL-3.0 | [1.30.1](https://github.com/FreshRSS/FreshRSS/releases/tag/1.30.1) signed | 16236 | Feedly (full) |
| [NetNewsWire](https://github.com/Ranchero-Software/NetNewsWire) | Swift | MIT | [mac-7.1.5](https://github.com/Ranchero-Software/NetNewsWire/releases/tag/mac-7.1.5) | 10450 | Feedly (partial) |
| [Miniflux](https://github.com/miniflux/v2) | Go | Apache-2.0 | [2.3.3](https://github.com/miniflux/v2/releases/tag/2.3.3) | 9768 | Feedly (full) |
| [NewsBlur](https://github.com/samuelclay/NewsBlur) | Python | MIT | [v0.2.2](https://github.com/samuelclay/NewsBlur/releases/tag/v0.2.2) | 7640 | Feedly (full) |
| [Stringer](https://github.com/stringer-rss/stringer) | Ruby | MIT | none | 4131 | Feedly (partial) |
| [yarr](https://github.com/nkanaev/yarr) | Go | MIT | [v2.9](https://github.com/nkanaev/yarr/releases/tag/v2.9) | 4063 | Feedly (partial) |
| [CommaFeed](https://github.com/Athou/commafeed) | Java | Apache-2.0 | [7.3.2](https://github.com/Athou/commafeed/releases/tag/7.3.2) | 3628 | Feedly (full) |

</details>

<details>
<summary><b>DNS ad blockers</b>, 5 tools</summary>

Block ads and trackers for a whole network at the DNS level.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Pi-hole](https://github.com/pi-hole/pi-hole) | Shell | Other | [v6.4.3](https://github.com/pi-hole/pi-hole/releases/tag/v6.4.3) signed | 61167 | NextDNS (partial) |
| [AdGuard Home](https://github.com/AdguardTeam/AdGuardHome) | TypeScript | GPL-3.0 | [v0.107.79](https://github.com/AdguardTeam/AdGuardHome/releases/tag/v0.107.79) | 37245 | Pi-hole (full), NextDNS (full) |
| [dnscrypt-proxy](https://github.com/DNSCrypt/dnscrypt-proxy) | Go | ISC | [2.1.18](https://github.com/DNSCrypt/dnscrypt-proxy/releases/tag/2.1.18) signed | 13722 | NextDNS (partial) |
| [Technitium DNS Server](https://github.com/TechnitiumSoftware/DnsServer) | C# | GPL-3.0 | [v15.6.0](https://github.com/TechnitiumSoftware/DnsServer/releases/tag/v15.6.0) | 10065 | Pi-hole (full), NextDNS (full) |
| [Blocky](https://github.com/0xERR0R/blocky) | Go | Apache-2.0 | [v0.35.0](https://github.com/0xERR0R/blocky/releases/tag/v0.35.0) signed | 7012 | Pi-hole (full) |

</details>

<details>
<summary><b>ERP</b>, 5 tools</summary>

Accounting, inventory, sales and operations in one system.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Odoo](https://github.com/odoo/odoo) | Python | Other | [5.0.0-2-addons](https://github.com/odoo/odoo/releases/tag/5.0.0-2-addons) | 54846 | NetSuite (full) |
| [ERPNext](https://github.com/frappe/erpnext) | Python | GPL-3.0 | [v15.121.6](https://github.com/frappe/erpnext/releases/tag/v15.121.6) | 39818 | NetSuite (full), Odoo (full) |
| [Invoice Ninja](https://github.com/invoiceninja/invoiceninja) | PHP | Other | [v5.13.43](https://github.com/invoiceninja/invoiceninja/releases/tag/v5.13.43) signed | 10223 | QuickBooks (partial) |
| [Akaunting](https://github.com/akaunting/akaunting) | PHP | Other | [3.2.4](https://github.com/akaunting/akaunting/releases/tag/3.2.4) | 10159 | QuickBooks (full), Xero (full) |
| [Dolibarr](https://github.com/Dolibarr/dolibarr) | PHP | GPL-3.0 | [24.0.1](https://github.com/Dolibarr/dolibarr/releases/tag/24.0.1) | 7686 | NetSuite (partial) |

</details>

<details>
<summary><b>Budgeting and personal finance</b>, 7 tools</summary>

Track accounts, spending and budgets for a person or a household.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Maybe](https://github.com/maybe-finance/maybe) archived | Ruby | AGPL-3.0 | [v0.6.0](https://github.com/maybe-finance/maybe/releases/tag/v0.6.0) | 54243 | none |
| [Actual Budget](https://github.com/actualbudget/actual) | TypeScript | MIT | [v26.10.0](https://github.com/actualbudget/actual/releases/tag/v26.10.0) signed | 29329 | YNAB (full) |
| [Firefly III](https://github.com/firefly-iii/firefly-iii) | PHP | AGPL-3.0 | [v6.7.7](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.7) | 24832 | YNAB (partial), Mint (full) |
| [Sure](https://github.com/we-promise/sure) | Ruby | AGPL-3.0 | [v0.7.5-hotfix.2](https://github.com/we-promise/sure/releases/tag/v0.7.5-hotfix.2) | 10401 | Maybe (full), Monarch Money (full) |
| [Ghostfolio](https://github.com/ghostfolio/ghostfolio) | TypeScript | AGPL-3.0 | [3.80.1](https://github.com/ghostfolio/ghostfolio/releases/tag/3.80.1) signed | 9402 | Monarch Money (partial) |
| [ezBookkeeping](https://github.com/mayswind/ezbookkeeping) | Go | MIT | [v2.0.1](https://github.com/mayswind/ezbookkeeping/releases/tag/v2.0.1) | 5717 | none |
| [GnuCash](https://github.com/Gnucash/gnucash) | C | Other | [5.17](https://github.com/Gnucash/gnucash/releases/tag/5.17) | 4367 | Quicken (partial) |

</details>

<details>
<summary><b>CRM</b>, 5 tools</summary>

Track contacts, companies and deals.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Twenty](https://github.com/twentyhq/twenty) | TypeScript | Other | [twenty/v2.45.0](https://github.com/twentyhq/twenty/releases/tag/twenty/v2.45.0) signed | 57948 | Salesforce (partial), HubSpot (partial), Pipedrive (full) |
| [Monica](https://github.com/monicahq/monica) | PHP | AGPL-3.0 | [v4.1.2](https://github.com/monicahq/monica/releases/tag/v4.1.2) signed | 25435 | none |
| [Krayin CRM](https://github.com/krayin/laravel-crm) | PHP | MIT | [v2.2.6](https://github.com/krayin/laravel-crm/releases/tag/v2.2.6) signed | 23971 | Salesforce (partial), HubSpot (partial) |
| [SuiteCRM](https://github.com/SuiteCRM/SuiteCRM) | PHP | AGPL-3.0 | [v7.15.2](https://github.com/SuiteCRM/SuiteCRM/releases/tag/v7.15.2) | 5779 | Salesforce (full) |
| [EspoCRM](https://github.com/espocrm/espocrm) | PHP | AGPL-3.0 | [10.0.9](https://github.com/espocrm/espocrm/releases/tag/10.0.9) | 3440 | Salesforce (partial), HubSpot (partial), Pipedrive (full) |

</details>

<details>
<summary><b>Help desks</b>, 7 tools</summary>

Handle customer requests from email, chat and other channels as tickets.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Chatwoot](https://github.com/chatwoot/chatwoot) | Ruby | Other | [v4.18.0](https://github.com/chatwoot/chatwoot/releases/tag/v4.18.0) | 37569 | Intercom (full), Zendesk (partial) |
| [UVdesk](https://github.com/uvdesk/community-skeleton) | CSS | OSL-3.0 | [v1.1.8](https://github.com/uvdesk/community-skeleton/releases/tag/v1.1.8) signed | 19625 | Zendesk (partial), Freshdesk (partial) |
| [Zammad](https://github.com/zammad/zammad) | Ruby | AGPL-3.0 | [7.2.0](https://github.com/zammad/zammad/releases/tag/7.2.0) signed | 5981 | Zendesk (full), Freshdesk (full) |
| [FreeScout](https://github.com/freescout-help-desk/freescout) | PHP | AGPL-3.0 | [1.8.245](https://github.com/freescout-help-desk/freescout/releases/tag/1.8.245) | 4585 | Zendesk (partial) |
| [osTicket](https://github.com/osTicket/osTicket) | PHP | GPL-2.0 | [v1.18.4](https://github.com/osTicket/osTicket/releases/tag/v1.18.4) | 3968 | Zendesk (partial), Freshdesk (partial) |
| [Helpdesk](https://github.com/frappe/helpdesk) | Vue | AGPL-3.0 | [v1.30.1](https://github.com/frappe/helpdesk/releases/tag/v1.30.1) | 3418 | Zendesk (partial), Freshdesk (partial) |
| [Libredesk](https://github.com/abhinavxd/libredesk) | Go | AGPL-3.0 | [v2.8.0](https://github.com/abhinavxd/libredesk/releases/tag/v2.8.0) signed | 2995 | Zendesk (partial), Freshdesk (partial) |

</details>

<details>
<summary><b>E-commerce</b>, 13 tools</summary>

Run an online store, from catalogue to checkout.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Medusa](https://github.com/medusajs/medusa) | TypeScript | Other | [v2.21.2](https://github.com/medusajs/medusa/releases/tag/v2.21.2) signed | 36612 | Shopify (partial) |
| [Bagisto](https://github.com/bagisto/bagisto) | PHP | MIT | [v2.5.0-beta6](https://github.com/bagisto/bagisto/releases/tag/v2.5.0-beta6) | 28213 | Shopify (full) |
| [Saleor](https://github.com/saleor/saleor) | Python | BSD-3-Clause | [3.23.38](https://github.com/saleor/saleor/releases/tag/3.23.38) signed | 23409 | Shopify (partial) |
| [Spree Commerce](https://github.com/spree/spree) | Ruby | BSD-3-Clause | [v5.6.1](https://github.com/spree/spree/releases/tag/v5.6.1) | 15740 | Shopify (full) |
| [Magento Open Source](https://github.com/magento/magento2) | PHP | OSL-3.0 | [2.4.9](https://github.com/magento/magento2/releases/tag/2.4.9) | 12195 | Shopify (full) |
| [WooCommerce](https://github.com/woocommerce/woocommerce) | PHP | Other | [11.1.2](https://github.com/woocommerce/woocommerce/releases/tag/11.1.2) signed | 10538 | Shopify (full) |
| [EverShop](https://github.com/evershopcommerce/evershop) | TypeScript | GPL-3.0 | [v2.2.1](https://github.com/evershopcommerce/evershop/releases/tag/v2.2.1) | 10499 | Shopify (full) |
| [nopCommerce](https://github.com/nopSolutions/nopCommerce) | C# | Other | [release-4.90.8](https://github.com/nopSolutions/nopCommerce/releases/tag/release-4.90.8) | 10160 | Shopify (full) |
| [PrestaShop](https://github.com/PrestaShop/PrestaShop) | PHP | Other | [9.2.0](https://github.com/PrestaShop/PrestaShop/releases/tag/9.2.0) signed | 9226 | Shopify (full) |
| [Sylius](https://github.com/Sylius/Sylius) | PHP | MIT | [v2.3.0](https://github.com/Sylius/Sylius/releases/tag/v2.3.0) signed | 8551 | Shopify (partial) |
| [Vendure](https://github.com/vendurehq/vendure) | TypeScript | Other | [v3.7.4](https://github.com/vendurehq/vendure/releases/tag/v3.7.4) | 8502 | Shopify (partial) |
| [OpenCart](https://github.com/opencart/opencart) | PHP | Other | [4.1.0.4](https://github.com/opencart/opencart/releases/tag/4.1.0.4) signed | 8212 | Shopify (partial) |
| [Solidus](https://github.com/solidusio/solidus) | Ruby | BSD-3-Clause | [v4.7.1](https://github.com/solidusio/solidus/releases/tag/v4.7.1) signed | 5336 | Shopify (partial) |

</details>

<details>
<summary><b>URL shorteners</b>, 6 tools</summary>

Short links on your own domain, with click statistics.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Dub](https://github.com/dubinc/dub) | TypeScript | Other | none | 24864 | Bitly (full) |
| [YOURLS](https://github.com/YOURLS/YOURLS) | PHP | MIT | [1.10.6](https://github.com/YOURLS/YOURLS/releases/tag/1.10.6) signed | 12253 | Bitly (full) |
| [Kutt](https://github.com/thedevs-network/kutt) | JavaScript | MIT | [v3.2.6](https://github.com/thedevs-network/kutt/releases/tag/v3.2.6) | 11138 | Bitly (full) |
| [Sink](https://github.com/miantiao-me/Sink) | TypeScript | AGPL-3.0 | [v0.3.1](https://github.com/miantiao-me/Sink/releases/tag/v0.3.1) | 7194 | Bitly (full) |
| [Shlink](https://github.com/shlinkio/shlink) | PHP | MIT | [v5.1.7](https://github.com/shlinkio/shlink/releases/tag/v5.1.7) | 5316 | Bitly (full) |
| [Slash](https://github.com/yourselfhosted/slash) | TypeScript | AGPL-3.0 | [v0.5.3](https://github.com/yourselfhosted/slash/releases/tag/v0.5.3) | 3185 | Bitly (partial) |

</details>

<details>
<summary><b>Mail servers</b>, 6 tools</summary>

Host email for your own domains.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [docker-mailserver](https://github.com/docker-mailserver/docker-mailserver) | Shell | MIT | [v16.0.1](https://github.com/docker-mailserver/docker-mailserver/releases/tag/v16.0.1) signed | 18903 | Google Workspace (partial) |
| [Postal](https://github.com/postalserver/postal) | Ruby | MIT | [3.3.7](https://github.com/postalserver/postal/releases/tag/3.3.7) signed | 16854 | SendGrid (full) |
| [Mail-in-a-Box](https://github.com/mail-in-a-box/mailinabox) | Python | CC0-1.0 | [v77](https://github.com/mail-in-a-box/mailinabox/releases/tag/v77) | 15434 | Google Workspace (partial) |
| [Stalwart](https://github.com/stalwartlabs/stalwart) | Rust | none | [v0.16.25](https://github.com/stalwartlabs/stalwart/releases/tag/v0.16.25) | 14970 | Google Workspace (partial), Microsoft 365 (partial) |
| [mailcow](https://github.com/mailcow/mailcow-dockerized) | JavaScript | GPL-3.0 | [2026-09](https://github.com/mailcow/mailcow-dockerized/releases/tag/2026-09) signed | 13563 | Google Workspace (partial), Microsoft 365 (partial) |
| [Mailu](https://github.com/Mailu/Mailu) | Python | Other | [2024.06.61](https://github.com/Mailu/Mailu/releases/tag/2024.06.61) signed | 7537 | Google Workspace (partial) |

</details>

<details>
<summary><b>Cloud development environments</b>, 4 tools</summary>

Development environments on a remote machine, reached from a browser or a local editor.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [code-server](https://github.com/coder/code-server) | TypeScript | MIT | [v4.140.0](https://github.com/coder/code-server/releases/tag/v4.140.0) signed | 79548 | GitHub Codespaces (partial) |
| [Coder](https://github.com/coder/coder) | Go | AGPL-3.0 | [v2.36.7](https://github.com/coder/coder/releases/tag/v2.36.7) | 16856 | GitHub Codespaces (full) |
| [DevPod](https://github.com/loft-sh/devpod) | Go | MPL-2.0 | [v0.6.15](https://github.com/loft-sh/devpod/releases/tag/v0.6.15) | 15250 | GitHub Codespaces (full) |
| [Eclipse Che](https://github.com/eclipse-che/che) | TypeScript | EPL-2.0 | [7.122.0](https://github.com/eclipse-che/che/releases/tag/7.122.0) | 7168 | GitHub Codespaces (full) |

</details>

<details>
<summary><b>Service meshes</b>, 5 tools</summary>

Encrypt, route and observe traffic between services in a cluster.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Istio](https://github.com/istio/istio) | Go | Apache-2.0 | [1.31.1](https://github.com/istio/istio/releases/tag/1.31.1) | 38429 | Linkerd (full) |
| [Consul](https://github.com/hashicorp/consul) | Go | Other | [v2.0.4](https://github.com/hashicorp/consul/releases/tag/v2.0.4) signed | 30094 | Istio (full) |
| [Cilium](https://github.com/cilium/cilium) | Go | Apache-2.0 | [v1.20.2](https://github.com/cilium/cilium/releases/tag/v1.20.2) signed | 25610 | Istio (partial) |
| [Linkerd](https://github.com/linkerd/linkerd2) | Go | Apache-2.0 | [edge-26.10.1](https://github.com/linkerd/linkerd2/releases/tag/edge-26.10.1) signed | 11508 | none |
| [Kuma](https://github.com/kumahq/kuma) | Go | Apache-2.0 | [v2.14.5](https://github.com/kumahq/kuma/releases/tag/v2.14.5) | 4011 | Linkerd (full) |

</details>

<details>
<summary><b>API gateways</b>, 6 tools</summary>

Route, authenticate and rate-limit API traffic in front of services.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Kong Gateway](https://github.com/Kong/kong) | Lua | Apache-2.0 | [3.9.3](https://github.com/Kong/kong/releases/tag/3.9.3) signed | 44242 | none |
| [Apache APISIX](https://github.com/apache/apisix) | Lua | Apache-2.0 | [3.19.0](https://github.com/apache/apisix/releases/tag/3.19.0) | 17197 | Kong Gateway (full) |
| [Tyk](https://github.com/TykTechnologies/tyk) | Go | Other | [v5.15.1](https://github.com/TykTechnologies/tyk/releases/tag/v5.15.1) signed | 10850 | Kong Gateway (full) |
| [Higress](https://github.com/higress-group/higress) | Go | Apache-2.0 | [v2.2.5](https://github.com/higress-group/higress/releases/tag/v2.2.5) | 9492 | Kong Gateway (partial) |
| [Apache ShenYu](https://github.com/apache/shenyu) | Java | Apache-2.0 | [v2.7.1](https://github.com/apache/shenyu/releases/tag/v2.7.1) | 8844 | Kong Gateway (partial) |
| [KrakenD](https://github.com/krakend/krakend-ce) | Go | Apache-2.0 | [v3.0.0](https://github.com/krakend/krakend-ce/releases/tag/v3.0.0) signed | 2690 | Kong Gateway (partial) |

</details>

<details>
<summary><b>Workflow orchestration</b>, 9 tools</summary>

Schedule and run data pipelines and jobs as dependency graphs.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Apache Airflow](https://github.com/apache/airflow) | Python | Apache-2.0 | [3.3.2](https://github.com/apache/airflow/releases/tag/3.3.2) | 47060 | none |
| [Conductor](https://github.com/conductor-oss/conductor) | Java | Apache-2.0 | [v3.32.5](https://github.com/conductor-oss/conductor/releases/tag/v3.32.5) | 32269 | none |
| [Kestra](https://github.com/kestra-io/kestra) | Java | Apache-2.0 | [v2.0.5](https://github.com/kestra-io/kestra/releases/tag/v2.0.5) | 29273 | Apache Airflow (full) |
| [Prefect](https://github.com/PrefectHQ/prefect) | Python | Apache-2.0 | [3.8.7](https://github.com/PrefectHQ/prefect/releases/tag/3.8.7) signed | 23973 | Apache Airflow (full) |
| [Temporal](https://github.com/temporalio/temporal) | Go | MIT | [v1.32.0](https://github.com/temporalio/temporal/releases/tag/v1.32.0) signed | 23486 | none |
| [Luigi](https://github.com/spotify/luigi) | Python | Apache-2.0 | [v3.8.1](https://github.com/spotify/luigi/releases/tag/v3.8.1) | 18781 | Apache Airflow (partial) |
| [Argo Workflows](https://github.com/argoproj/argo-workflows) | Go | Apache-2.0 | [v4.1.4](https://github.com/argoproj/argo-workflows/releases/tag/v4.1.4) signed | 17023 | Apache Airflow (full) |
| [Dagster](https://github.com/dagster-io/dagster) | Python | Apache-2.0 | [1.13.25](https://github.com/dagster-io/dagster/releases/tag/1.13.25) | 16238 | Apache Airflow (full) |
| [Apache DolphinScheduler](https://github.com/apache/dolphinscheduler) | Java | Apache-2.0 | [3.4.3](https://github.com/apache/dolphinscheduler/releases/tag/3.4.3) | 14507 | Apache Airflow (full) |

</details>

<details>
<summary><b>Vector databases</b>, 5 tools</summary>

Store embeddings and search them by similarity.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Milvus](https://github.com/milvus-io/milvus) | Go | Apache-2.0 | [v3.0.2](https://github.com/milvus-io/milvus/releases/tag/v3.0.2) signed | 46320 | Pinecone (full) |
| [Qdrant](https://github.com/qdrant/qdrant) | Rust | Apache-2.0 | [v1.19.2](https://github.com/qdrant/qdrant/releases/tag/v1.19.2) signed | 34941 | Pinecone (full) |
| [Chroma](https://github.com/chroma-core/chroma) | Rust | Apache-2.0 | [1.5.9](https://github.com/chroma-core/chroma/releases/tag/1.5.9) signed | 29450 | Pinecone (partial) |
| [pgvector](https://github.com/pgvector/pgvector) | C | Other | [v0.8.7](https://github.com/pgvector/pgvector/releases/tag/v0.8.7) | 23250 | Pinecone (partial) |
| [Weaviate](https://github.com/weaviate/weaviate) | Go | Other | [v1.39.9](https://github.com/weaviate/weaviate/releases/tag/v1.39.9) | 16864 | Pinecone (full) |

</details>

<details>
<summary><b>Analytical databases</b>, 8 tools</summary>

Columnar SQL engines for analytics over large datasets.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [ClickHouse](https://github.com/ClickHouse/ClickHouse) | C++ | Apache-2.0 | [v26.9.11.2-stable](https://github.com/ClickHouse/ClickHouse/releases/tag/v26.9.11.2-stable) | 50267 | Snowflake (full), BigQuery (full) |
| [DuckDB](https://github.com/duckdb/duckdb) | C++ | MIT | [v1.5.6](https://github.com/duckdb/duckdb/releases/tag/v1.5.6) signed | 41931 | Snowflake (partial), BigQuery (partial) |
| [Presto](https://github.com/prestodb/presto) | Java | Apache-2.0 | [0.299](https://github.com/prestodb/presto/releases/tag/0.299) | 16753 | Amazon Athena (full) |
| [Apache Doris](https://github.com/apache/doris) | Java | Apache-2.0 | [4.1.4.1](https://github.com/apache/doris/releases/tag/4.1.4.1) | 16023 | Snowflake (full) |
| [Apache Druid](https://github.com/apache/druid) | Java | Apache-2.0 | [druid-38.0.0](https://github.com/apache/druid/releases/tag/druid-38.0.0) | 14059 | none |
| [Trino](https://github.com/trinodb/trino) | Java | Apache-2.0 | [483](https://github.com/trinodb/trino/releases/tag/483) | 13304 | Amazon Athena (full), BigQuery (partial) |
| [StarRocks](https://github.com/StarRocks/starrocks) | Java | Apache-2.0 | [4.1.3](https://github.com/StarRocks/starrocks/releases/tag/4.1.3) | 12156 | Snowflake (full) |
| [Databend](https://github.com/databendlabs/databend) | Rust | Other | [v1.2.881](https://github.com/databendlabs/databend/releases/tag/v1.2.881) signed | 9453 | Snowflake (full) |

</details>

<details>
<summary><b>Home automation</b>, 6 tools</summary>

Control and automate smart home devices locally.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Home Assistant](https://github.com/home-assistant/core) | Python | Apache-2.0 | [2026.9.4](https://github.com/home-assistant/core/releases/tag/2026.9.4) signed | 91265 | SmartThings (full) |
| [Homebridge](https://github.com/homebridge/homebridge) | TypeScript | Apache-2.0 | [v2.4.0](https://github.com/homebridge/homebridge/releases/tag/v2.4.0) | 25501 | none |
| [Tasmota](https://github.com/arendst/Tasmota) | C | GPL-3.0 | [v15.6.0](https://github.com/arendst/Tasmota/releases/tag/v15.6.0) | 24800 | none |
| [Zigbee2MQTT](https://github.com/Koenkk/zigbee2mqtt) | TypeScript | GPL-3.0 | [2.14.2](https://github.com/Koenkk/zigbee2mqtt/releases/tag/2.14.2) signed | 15691 | SmartThings (partial) |
| [ESPHome](https://github.com/esphome/esphome) | C++ | Other | [2026.9.1](https://github.com/esphome/esphome/releases/tag/2026.9.1) signed | 11784 | none |
| [openHAB](https://github.com/openhab/openhab-core) | Java | EPL-2.0 | [5.2.1](https://github.com/openhab/openhab-core/releases/tag/5.2.1) | 1144 | SmartThings (full), Home Assistant (full) |

</details>

<details>
<summary><b>Terminal file managers</b>, 4 tools</summary>

Browse, preview and move files from a keyboard-driven interface in the terminal.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [yazi](https://github.com/sxyazi/yazi) | Rust | MIT | [v26.9.1](https://github.com/sxyazi/yazi/releases/tag/v26.9.1) signed | 42636 | ranger (full) |
| [nnn](https://github.com/jarun/nnn) | C | BSD-2-Clause | [v5.3](https://github.com/jarun/nnn/releases/tag/v5.3) signed | 22046 | ranger (full) |
| [ranger](https://github.com/ranger/ranger) | Python | GPL-3.0 | [v1.9.4](https://github.com/ranger/ranger/releases/tag/v1.9.4) signed | 17417 | none |
| [lf](https://github.com/gokcehan/lf) | Go | MIT | [r42](https://github.com/gokcehan/lf/releases/tag/r42) signed | 9532 | ranger (full) |

</details>

<details>
<summary><b>Disk usage analyzers</b>, 2 tools</summary>

Show which directories and files take up the space on a disk.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [dust](https://github.com/bootandy/dust) | Rust | Apache-2.0 | [v1.2.6](https://github.com/bootandy/dust/releases/tag/v1.2.6) | 12471 | none |
| [gdu](https://github.com/dundee/gdu) | Go | MIT | [v5.38.0](https://github.com/dundee/gdu/releases/tag/v5.38.0) signed | 6068 | none |

</details>

<details>
<summary><b>Shell history</b>, 2 tools</summary>

Search, sync and recall the commands typed in a shell.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [atuin](https://github.com/atuinsh/atuin) | Rust | MIT | [v18.23.0](https://github.com/atuinsh/atuin/releases/tag/v18.23.0) signed | 31906 | mcfly (full) |
| [mcfly](https://github.com/cantino/mcfly) | Rust | MIT | [v0.9.4](https://github.com/cantino/mcfly/releases/tag/v0.9.4) | 7806 | none |

</details>

<details>
<summary><b>Task runners</b>, 2 tools</summary>

Name a project's commands in one file and run them, as a lighter make.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [just](https://github.com/casey/just) | Rust | CC0-1.0 | [1.58.0](https://github.com/casey/just/releases/tag/1.58.0) | 36143 | none |
| [Task](https://github.com/go-task/task) | Go | MIT | [v3.54.0](https://github.com/go-task/task/releases/tag/v3.54.0) | 16219 | none |

</details>

<details>
<summary><b>Git hook managers</b>, 3 tools</summary>

Install and run the checks a repository wants before a commit or a push.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [husky](https://github.com/typicode/husky) | JavaScript | MIT | [v9.1.7](https://github.com/typicode/husky/releases/tag/v9.1.7) | 35338 | none |
| [pre-commit](https://github.com/pre-commit/pre-commit) | Python | MIT | [v4.6.2](https://github.com/pre-commit/pre-commit/releases/tag/v4.6.2) | 15609 | none |
| [lefthook](https://github.com/evilmartians/lefthook) | Go | MIT | [v2.1.17](https://github.com/evilmartians/lefthook/releases/tag/v2.1.17) signed | 8882 | husky (full), pre-commit (full) |

</details>

<details>
<summary><b>Runtime version managers</b>, 5 tools</summary>

Install several versions of a language runtime and switch between them per project.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [nvm](https://github.com/nvm-sh/nvm) | Shell | MIT | [v0.40.8](https://github.com/nvm-sh/nvm/releases/tag/v0.40.8) signed | 95271 | none |
| [mise](https://github.com/jdx/mise) | Rust | MIT | [v2026.10.3](https://github.com/jdx/mise/releases/tag/v2026.10.3) signed | 34635 | asdf (full), nvm (full), Volta (full), pyenv (full) |
| [fnm](https://github.com/Schniz/fnm) | Rust | GPL-3.0 | [v1.39.0](https://github.com/Schniz/fnm/releases/tag/v1.39.0) signed | 27037 | nvm (full) |
| [asdf](https://github.com/asdf-vm/asdf) | Go | MIT | [v0.20.2](https://github.com/asdf-vm/asdf/releases/tag/v0.20.2) signed | 25594 | none |
| [Volta](https://github.com/volta-cli/volta) | Rust | Other | [v2.0.2](https://github.com/volta-cli/volta/releases/tag/v2.0.2) signed | 13066 | nvm (full) |

</details>

<details>
<summary><b>Backup tools</b>, 4 tools</summary>

Take deduplicated, encrypted snapshots of files and restore them from local or cloud storage.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [restic](https://github.com/restic/restic) | Go | BSD-2-Clause | [v0.19.1](https://github.com/restic/restic/releases/tag/v0.19.1) signed | 36436 | none |
| [Duplicati](https://github.com/duplicati/duplicati) | C# | Other | [v2.4.0.0_stable_2026-09-03](https://github.com/duplicati/duplicati/releases/tag/v2.4.0.0_stable_2026-09-03) | 15062 | none |
| [Kopia](https://github.com/kopia/kopia) | Go | Apache-2.0 | [v0.23.1](https://github.com/kopia/kopia/releases/tag/v0.23.1) | 14265 | none |
| [BorgBackup](https://github.com/borgbackup/borg) | Python | Other | [1.4.5](https://github.com/borgbackup/borg/releases/tag/1.4.5) signed | 13811 | none |

</details>

<details>
<summary><b>Code statistics</b>, 3 tools</summary>

Count the lines of code, comments and blanks in a codebase, by language.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [cloc](https://github.com/AlDanial/cloc) | Perl | GPL-2.0 | [v2.10](https://github.com/AlDanial/cloc/releases/tag/v2.10) | 23575 | none |
| [tokei](https://github.com/XAMPPRocky/tokei) | Rust | Other | [v15.0.0](https://github.com/XAMPPRocky/tokei/releases/tag/v15.0.0) | 14979 | cloc (full) |
| [scc](https://github.com/boyter/scc) | Go | MIT | [v4.1.0](https://github.com/boyter/scc/releases/tag/v4.1.0) | 8796 | cloc (full) |

</details>

<details>
<summary><b>File watchers</b>, 2 tools</summary>

Run a command again whenever the files it depends on change.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [watchexec](https://github.com/watchexec/watchexec) | Rust | Apache-2.0 | [v2.7.4](https://github.com/watchexec/watchexec/releases/tag/v2.7.4) | 7214 | entr (full) |
| [entr](https://github.com/eradman/entr) | C | Other | [5.9](https://github.com/eradman/entr/releases/tag/5.9) | 5696 | none |

</details>

<details>
<summary><b>Scheduling</b>, 2 tools</summary>

Share availability and let people book a meeting or vote on a date.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Cal.diy](https://github.com/calcom/cal.diy) | TypeScript | MIT | [v6.2.0](https://github.com/calcom/cal.diy/releases/tag/v6.2.0) signed | 48880 | Calendly (partial) |
| [Rallly](https://github.com/lukevella/rallly) | TypeScript | AGPL-3.0 | [v4.15.3](https://github.com/lukevella/rallly/releases/tag/v4.15.3) | 5285 | Doodle (partial) |

</details>

<details>
<summary><b>Image editors</b>, 2 tools</summary>

Edit raster and vector images, from retouching photos to drawing graphics.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Graphite](https://github.com/GraphiteEditor/Graphite) | Rust | Apache-2.0 | [pre-4435](https://github.com/GraphiteEditor/Graphite/releases/tag/pre-4435) signed | 27441 | Photoshop (partial) |
| [Pinta](https://github.com/PintaProject/Pinta) | C# | MIT | [3.1.2](https://github.com/PintaProject/Pinta/releases/tag/3.1.2) signed | 4072 | Photoshop (partial) |

</details>

<details>
<summary><b>Raw photo editors</b>, 2 tools</summary>

Develop camera raw files and manage a photo catalog non-destructively.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [darktable](https://github.com/darktable-org/darktable) | C | GPL-3.0 | [release-5.6.2](https://github.com/darktable-org/darktable/releases/tag/release-5.6.2) | 13199 | Lightroom (partial) |
| [RawTherapee](https://github.com/RawTherapee/RawTherapee) | C++ | GPL-3.0 | [5.13](https://github.com/RawTherapee/RawTherapee/releases/tag/5.13) | 4201 | Lightroom (partial) |

</details>

<details>
<summary><b>Video editors</b>, 2 tools</summary>

Cut, compose and render video on a timeline or a node graph.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Shotcut](https://github.com/mltframework/shotcut) | C++ | GPL-3.0 | [v26.9.27](https://github.com/mltframework/shotcut/releases/tag/v26.9.27) | 15360 | Premiere Pro (full) |
| [Natron](https://github.com/NatronGitHub/Natron) | C++ | GPL-2.0 | [v2.5.0](https://github.com/NatronGitHub/Natron/releases/tag/v2.5.0) signed | 5567 | After Effects (partial) |

</details>

<details>
<summary><b>No-code databases</b>, 3 tools</summary>

Spreadsheet-like databases with views, forms and an API, built without code.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [NocoDB](https://github.com/nocodb/nocodb) | TypeScript | Other | [2026.09.1](https://github.com/nocodb/nocodb/releases/tag/2026.09.1) signed | 65196 | Airtable (full) |
| [Teable](https://github.com/teableio/teable) | TypeScript | Other | [release.2026-10-02T04-02-20Z.3278](https://github.com/teableio/teable/releases/tag/release.2026-10-02T04-02-20Z.3278) signed | 21858 | Airtable (full) |
| [Grist](https://github.com/gristlabs/grist-core) | TypeScript | Apache-2.0 | [v1.7.20](https://github.com/gristlabs/grist-core/releases/tag/v1.7.20) signed | 11901 | Airtable (full) |

</details>

<details>
<summary><b>E-signature</b>, 3 tools</summary>

Send documents for signature and collect legally binding signatures online.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [DocuSeal](https://github.com/docusealco/docuseal) | Ruby | AGPL-3.0 | [3.3.1](https://github.com/docusealco/docuseal/releases/tag/3.3.1) signed | 18658 | DocuSign (partial) |
| [Documenso](https://github.com/documenso/documenso) | TypeScript | AGPL-3.0 | [v2.19.0](https://github.com/documenso/documenso/releases/tag/v2.19.0) | 15336 | DocuSign (full) |
| [OpenSign](https://github.com/OpenSignLabs/OpenSign) | JavaScript | Other | [v2.41.3](https://github.com/OpenSignLabs/OpenSign/releases/tag/v2.41.3) signed | 7058 | DocuSign (full) |

</details>

<details>
<summary><b>Incident management</b>, 1 tool</summary>

Route alerts, page whoever is on call and track incidents to resolution.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Keep](https://github.com/keephq/keep) | Python | Other | [v0.54.3](https://github.com/keephq/keep/releases/tag/v0.54.3) signed | 12376 | PagerDuty (partial) |

</details>

<details>
<summary><b>Time tracking</b>, 4 tools</summary>

Log time against projects and clients, and turn it into reports or invoices.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [solidtime](https://github.com/solidtime-io/solidtime) | PHP | AGPL-3.0 | [v0.21.0](https://github.com/solidtime-io/solidtime/releases/tag/v0.21.0) | 8965 | Toggl Track (full), Harvest (partial) |
| [Kimai](https://github.com/kimai/kimai) | PHP | AGPL-3.0 | [2.68.0](https://github.com/kimai/kimai/releases/tag/2.68.0) signed | 5057 | Toggl Track (full), Harvest (partial) |
| [Wakapi](https://github.com/muety/wakapi) | Go | MIT | [2.18.1](https://github.com/muety/wakapi/releases/tag/2.18.1) | 4440 | WakaTime (full) |
| [TimeTagger](https://github.com/almarklein/timetagger) | Python | GPL-3.0 | [v26.1.3](https://github.com/almarklein/timetagger/releases/tag/v26.1.3) | 1795 | Toggl Track (partial) |

</details>

<details>
<summary><b>Image generation</b>, 2 tools</summary>

Generate images from text prompts with diffusion models running on your own hardware.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [ComfyUI](https://github.com/Comfy-Org/ComfyUI) | Python | GPL-3.0 | [v0.39.0](https://github.com/Comfy-Org/ComfyUI/releases/tag/v0.39.0) | 136238 | Midjourney (partial) |
| [InvokeAI](https://github.com/invoke-ai/InvokeAI) | TypeScript | Apache-2.0 | [v6.14.2](https://github.com/invoke-ai/InvokeAI/releases/tag/v6.14.2) | 28345 | Midjourney (partial) |

</details>

<details>
<summary><b>Mail testing</b>, 5 tools</summary>

Fake SMTP servers with a web inbox that catch the mail an application sends during development.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [MailHog](https://github.com/mailhog/MailHog) | Go | MIT | [v1.0.1](https://github.com/mailhog/MailHog/releases/tag/v1.0.1) | 16173 | none |
| [Mailpit](https://github.com/axllent/mailpit) | Go | MIT | [v1.31.4](https://github.com/axllent/mailpit/releases/tag/v1.31.4) | 10542 | Mailtrap (partial), MailHog (full) |
| [MailCatcher](https://github.com/sj26/mailcatcher) | Ruby | MIT | [v0.10.0](https://github.com/sj26/mailcatcher/releases/tag/v0.10.0) | 6780 | Mailtrap (partial) |
| [smtp4dev](https://github.com/rnwood/smtp4dev) | C# | BSD-3-Clause | [3.15.0](https://github.com/rnwood/smtp4dev/releases/tag/3.15.0) signed | 3990 | Mailtrap (partial) |
| [Inbucket](https://github.com/inbucket/inbucket) | Go | MIT | [v3.1.1](https://github.com/inbucket/inbucket/releases/tag/v3.1.1) signed | 2307 | Mailtrap (partial) |

</details>

<details>
<summary><b>Translation management</b>, 4 tools</summary>

Localisation platforms where teams translate and review an application's strings.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Weblate](https://github.com/WeblateOrg/weblate) | Python | GPL-3.0 | [weblate-2026.10](https://github.com/WeblateOrg/weblate/releases/tag/weblate-2026.10) signed | 6106 | Crowdin (full), Lokalise (full), Phrase (full), Transifex (full) |
| [Tolgee](https://github.com/tolgee/tolgee-platform) | TypeScript | Other | [v3.226.0](https://github.com/tolgee/tolgee-platform/releases/tag/v3.226.0) | 4119 | Crowdin (full), Lokalise (full), Phrase (partial) |
| [Traduora](https://github.com/ever-co/ever-traduora) | JavaScript | AGPL-3.0 | [v0.21.0](https://github.com/ever-co/ever-traduora/releases/tag/v0.21.0) signed | 2133 | Lokalise (partial), Crowdin (partial) |
| [Pontoon](https://github.com/mozilla/pontoon) | Python | BSD-3-Clause | [v2026.09.23](https://github.com/mozilla/pontoon/releases/tag/v2026.09.23) signed | 1671 | Transifex (partial), Crowdin (partial) |

</details>

<details>
<summary><b>Push notifications</b>, 3 tools</summary>

Send push notifications to phones and desktops from a plain HTTP request.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [ntfy](https://github.com/binwiederhier/ntfy) | Go | Apache-2.0 | [v2.28.0](https://github.com/binwiederhier/ntfy/releases/tag/v2.28.0) | 34642 | Pushover (full) |
| [Gotify](https://github.com/gotify/server) | Go | Other | [v3.1.1](https://github.com/gotify/server/releases/tag/v3.1.1) signed | 16036 | Pushover (partial) |
| [Bark](https://github.com/Finb/bark-server) | Go | MIT | [v2.3.7](https://github.com/Finb/bark-server/releases/tag/v2.3.7) | 3648 | Pushover (partial) |

</details>

<details>
<summary><b>Vulnerability scanners</b>, 4 tools</summary>

Check dependencies and container images against databases of known vulnerabilities.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Trivy](https://github.com/aquasecurity/trivy) | Go | Apache-2.0 | [v0.75.0](https://github.com/aquasecurity/trivy/releases/tag/v0.75.0) signed | 38249 | Snyk (partial) |
| [Grype](https://github.com/anchore/grype) | Go | Apache-2.0 | [v0.120.0](https://github.com/anchore/grype/releases/tag/v0.120.0) | 12979 | Snyk (partial) |
| [OSV-Scanner](https://github.com/google/osv-scanner) | Go | Apache-2.0 | [v2.6.0](https://github.com/google/osv-scanner/releases/tag/v2.6.0) signed | 11143 | Snyk (partial) |
| [Dependency-Check](https://github.com/dependency-check/DependencyCheck) | Java | Apache-2.0 | [v13.0.0](https://github.com/dependency-check/DependencyCheck/releases/tag/v13.0.0) | 7718 | Snyk (partial) |

</details>

<details>
<summary><b>Pastebins</b>, 4 tools</summary>

Share code snippets and text through a link.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [PrivateBin](https://github.com/PrivateBin/PrivateBin) | PHP | Other | [2.0.6](https://github.com/PrivateBin/PrivateBin/releases/tag/2.0.6) signed | 8651 | Pastebin (full), GitHub Gist (partial) |
| [MicroBin](https://github.com/szabodanika/microbin) | Rust | BSD-3-Clause | [v2.1.0](https://github.com/szabodanika/microbin/releases/tag/v2.1.0) | 4580 | Pastebin (full), GitHub Gist (partial) |
| [Opengist](https://github.com/thomiceli/opengist) | Go | AGPL-3.0 | [v1.15.2](https://github.com/thomiceli/opengist/releases/tag/v1.15.2) | 3370 | GitHub Gist (full), Pastebin (full) |
| [Hasty Paste](https://github.com/enchant97/hasty-paste) | Go | AGPL-3.0 | [v2.4.1](https://github.com/enchant97/hasty-paste/releases/tag/v2.4.1) signed | 256 | Pastebin (full), GitHub Gist (partial) |

</details>

<details>
<summary><b>File sharing</b>, 4 tools</summary>

Send large files to someone through a link that expires.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [PicoShare](https://github.com/mtlynch/picoshare) | Go | Other | [v1.5.4](https://github.com/mtlynch/picoshare/releases/tag/v1.5.4) signed | 3045 | WeTransfer (full) |
| [Gokapi](https://github.com/Forceu/Gokapi) | Go | AGPL-3.0 | [v2.2.4](https://github.com/Forceu/Gokapi/releases/tag/v2.2.4) signed | 2895 | WeTransfer (full) |
| [PsiTransfer](https://github.com/psi-4ward/psitransfer) | JavaScript | BSD-2-Clause | [v2.4.4](https://github.com/psi-4ward/psitransfer/releases/tag/v2.4.4) | 1957 | WeTransfer (full) |
| [Erugo](https://github.com/ErugoOSS/Erugo) | PHP | MIT | [v0.2.15](https://github.com/ErugoOSS/Erugo/releases/tag/v0.2.15) | 1156 | WeTransfer (full) |

</details>

<details>
<summary><b>App launchers</b>, 5 tools</summary>

Open apps and files and run commands from the keyboard.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [PowerToys](https://github.com/microsoft/PowerToys) | C | MIT | [v0.101.2362.0](https://github.com/microsoft/PowerToys/releases/tag/v0.101.2362.0) | 139247 | Raycast (partial), Alfred (partial) |
| [Wox](https://github.com/Wox-launcher/Wox) | Go | GPL-3.0 | [v2.4.5](https://github.com/Wox-launcher/Wox/releases/tag/v2.4.5) | 27490 | Raycast (full), Alfred (full) |
| [Flow Launcher](https://github.com/Flow-Launcher/Flow.Launcher) | C# | MIT | [v2.1.4](https://github.com/Flow-Launcher/Flow.Launcher/releases/tag/v2.1.4) signed | 15719 | Raycast (full), Alfred (full) |
| [Albert](https://github.com/albertlauncher/albert) | C++ | Other | [v35.1.0](https://github.com/albertlauncher/albert/releases/tag/v35.1.0) | 8005 | Raycast (full), Alfred (full) |
| [Ulauncher](https://github.com/Ulauncher/Ulauncher) | Python | Other | [5.16.2](https://github.com/Ulauncher/Ulauncher/releases/tag/5.16.2) | 4521 | Raycast (full), Alfred (full) |

</details>

<details>
<summary><b>Slides</b>, 4 tools</summary>

Write presentations, often from Markdown or code instead of a visual editor.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [reveal.js](https://github.com/hakimel/reveal.js) | JavaScript | MIT | [6.0.2](https://github.com/hakimel/reveal.js/releases/tag/6.0.2) | 72381 | Microsoft PowerPoint (partial), Google Slides (partial), Keynote (partial) |
| [Slidev](https://github.com/slidevjs/slidev) | TypeScript | MIT | [v53.0.0](https://github.com/slidevjs/slidev/releases/tag/v53.0.0) signed | 48928 | Microsoft PowerPoint (partial), Google Slides (partial), Keynote (partial) |
| [presenterm](https://github.com/mfontanini/presenterm) | Rust | BSD-2-Clause | [v0.16.1](https://github.com/mfontanini/presenterm/releases/tag/v0.16.1) signed | 8899 | Microsoft PowerPoint (partial), Keynote (partial) |
| [Marp CLI](https://github.com/marp-team/marp-cli) | TypeScript | MIT | [v4.5.1](https://github.com/marp-team/marp-cli/releases/tag/v4.5.1) | 3852 | Microsoft PowerPoint (partial), Google Slides (partial), Keynote (partial) |

</details>

<details>
<summary><b>Internal tool builders</b>, 3 tools</summary>

Build internal apps and admin panels on top of databases and APIs.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [ToolJet](https://github.com/ToolJet/ToolJet) | JavaScript | AGPL-3.0 | [v3.20.239-lts](https://github.com/ToolJet/ToolJet/releases/tag/v3.20.239-lts) signed | 41037 | Retool (full) |
| [Appsmith](https://github.com/appsmithorg/appsmith) | TypeScript | Apache-2.0 | [v2.4.3](https://github.com/appsmithorg/appsmith/releases/tag/v2.4.3) signed | 41018 | Retool (full) |
| [Budibase](https://github.com/Budibase/budibase) | TypeScript | Other | [v3.48.0](https://github.com/Budibase/budibase/releases/tag/v3.48.0) | 28328 | Retool (full) |

</details>

<details>
<summary><b>Database clients</b>, 5 tools</summary>

Desktop and web clients to browse, edit and query databases.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [DBeaver](https://github.com/dbeaver/dbeaver) | Java | Apache-2.0 | [26.2.2](https://github.com/dbeaver/dbeaver/releases/tag/26.2.2) | 51963 | TablePlus (full), DataGrip (full) |
| [Beekeeper Studio](https://github.com/beekeeper-studio/beekeeper-studio) | TypeScript | Other | [v6.1.5](https://github.com/beekeeper-studio/beekeeper-studio/releases/tag/v6.1.5) | 23706 | TablePlus (full), DataGrip (partial) |
| [Adminer](https://github.com/vrana/adminer) | PHP | Other | [v6.1.1](https://github.com/vrana/adminer/releases/tag/v6.1.1) | 7917 | TablePlus (partial) |
| [DbGate](https://github.com/dbgate/dbgate) | JavaScript | GPL-3.0 | [v7.3.1](https://github.com/dbgate/dbgate/releases/tag/v7.3.1) | 7332 | TablePlus (full), DataGrip (partial) |
| [CloudBeaver](https://github.com/dbeaver/cloudbeaver) | TypeScript | Apache-2.0 | [25.3.5](https://github.com/dbeaver/cloudbeaver/releases/tag/25.3.5) | 5181 | TablePlus (partial), DataGrip (partial) |

</details>

<details>
<summary><b>LLM observability</b>, 4 tools</summary>

Trace, evaluate and monitor LLM applications.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Langfuse](https://github.com/langfuse/langfuse) | TypeScript | Other | [v4.51.0](https://github.com/langfuse/langfuse/releases/tag/v4.51.0) | 35413 | LangSmith (full), W&B Weave (full) |
| [Opik](https://github.com/comet-ml/opik) | Python | Apache-2.0 | [2.2.90](https://github.com/comet-ml/opik/releases/tag/2.2.90) signed | 22397 | LangSmith (full), W&B Weave (full) |
| [Arize Phoenix](https://github.com/Arize-ai/phoenix) | Python | Other | [arize-phoenix-v20.19.0](https://github.com/Arize-ai/phoenix/releases/tag/arize-phoenix-v20.19.0) signed | 11719 | LangSmith (full), W&B Weave (full) |
| [Helicone](https://github.com/Helicone/helicone) | TypeScript | Apache-2.0 | [v2025.08.21-1](https://github.com/Helicone/helicone/releases/tag/v2025.08.21-1) | 6199 | LangSmith (partial) |

</details>

<details>
<summary><b>PDF tools</b>, 3 tools</summary>

Edit, merge, split, convert and sign PDF files.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Stirling PDF](https://github.com/Stirling-Tools/Stirling-PDF) | TypeScript | Other | [v3.1.0](https://github.com/Stirling-Tools/Stirling-PDF/releases/tag/v3.1.0) signed | 93631 | Adobe Acrobat (partial), Smallpdf (full), iLovePDF (full) |
| [BentoPDF](https://github.com/alam00000/bentopdf) | JavaScript | AGPL-3.0 | [v2.8.8](https://github.com/alam00000/bentopdf/releases/tag/v2.8.8) | 15844 | Smallpdf (full), iLovePDF (full), Adobe Acrobat (partial) |
| [PDF Arranger](https://github.com/pdfarranger/pdfarranger) | Python | GPL-3.0 | [1.14.0](https://github.com/pdfarranger/pdfarranger/releases/tag/1.14.0) | 5951 | Smallpdf (partial), iLovePDF (partial), Adobe Acrobat (partial) |

</details>

<details>
<summary><b>Microblogging</b>, 3 tools</summary>

Federated or self-hosted social networks for short public posts.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Mastodon](https://github.com/mastodon/mastodon) | Ruby | AGPL-3.0 | [v4.7.3](https://github.com/mastodon/mastodon/releases/tag/v4.7.3) | 50352 | X (Twitter) (full), Threads (full) |
| [Misskey](https://github.com/misskey-dev/misskey) | TypeScript | AGPL-3.0 | [2026.10.0](https://github.com/misskey-dev/misskey/releases/tag/2026.10.0) | 11336 | X (Twitter) (full), Threads (full) |
| [Hollo](https://github.com/fedify-dev/hollo) | TypeScript | AGPL-3.0 | [0.9.22](https://github.com/fedify-dev/hollo/releases/tag/0.9.22) signed | 492 | X (Twitter) (partial) |

</details>

<details>
<summary><b>Forums and Q&A</b>, 5 tools</summary>

Community forums, link aggregators and question and answer sites.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Discourse](https://github.com/discourse/discourse) | Ruby | GPL-2.0 | [v2026.9.0](https://github.com/discourse/discourse/releases/tag/v2026.9.0) | 47933 | Circle (full), Reddit (partial), Stack Internal (partial) |
| [Apache Answer](https://github.com/apache/answer) | Go | Apache-2.0 | [v2.0.2](https://github.com/apache/answer/releases/tag/v2.0.2) | 15691 | Stack Internal (full) |
| [NodeBB](https://github.com/NodeBB/NodeBB) | JavaScript | GPL-3.0 | [v4.16.2](https://github.com/NodeBB/NodeBB/releases/tag/v4.16.2) | 15231 | Circle (partial), Reddit (partial) |
| [Lemmy](https://github.com/LemmyNet/lemmy) | Rust | AGPL-3.0 | [0.19.20](https://github.com/LemmyNet/lemmy/releases/tag/0.19.20) | 14615 | Reddit (full) |
| [Flarum](https://github.com/flarum/framework) | PHP | MIT | [v1.8.20](https://github.com/flarum/framework/releases/tag/v1.8.20) signed | 6757 | Circle (partial), Reddit (partial) |

</details>

<details>
<summary><b>Billing</b>, 3 tools</summary>

Usage-based billing, subscription management and invoicing.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Lago](https://github.com/getlago/lago) | Go | AGPL-3.0 | [v1.53.0](https://github.com/getlago/lago/releases/tag/v1.53.0) signed | 10657 | Stripe Billing (full), Chargebee (full) |
| [Flexprice](https://github.com/flexprice/flexprice) | Go | AGPL-3.0 | [v2.1.33](https://github.com/flexprice/flexprice/releases/tag/v2.1.33) signed | 6882 | Stripe Billing (full), Chargebee (partial) |
| [Kill Bill](https://github.com/killbill/killbill) | Java | Apache-2.0 | [killbill-0.24.22](https://github.com/killbill/killbill/releases/tag/killbill-0.24.22) | 5783 | Stripe Billing (full), Chargebee (full) |

</details>

<details>
<summary><b>Page change monitoring</b>, 3 tools</summary>

Watch web pages and get alerts when they change.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [changedetection.io](https://github.com/dgtlmoon/changedetection.io) | Python | Apache-2.0 | [0.60.8](https://github.com/dgtlmoon/changedetection.io/releases/tag/0.60.8) | 34796 | Visualping (full), Distill.io (full) |
| [urlwatch](https://github.com/thp/urlwatch) | Python | Other | [2.29](https://github.com/thp/urlwatch/releases/tag/2.29) | 3143 | Visualping (partial), Distill.io (partial) |
| [webchanges](https://github.com/mborsetti/webchanges) | Python | Other | [v3.37.0](https://github.com/mborsetti/webchanges/releases/tag/v3.37.0) | 48 | Visualping (partial), Distill.io (partial) |

</details>

<details>
<summary><b>Notification infrastructure</b>, 2 tools</summary>

Send product notifications across email, SMS, push, chat and in-app feeds from one API, with templates and user preferences.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Novu](https://github.com/novuhq/novu) | TypeScript | Other | [@novu/framework@v2.14.0](https://github.com/novuhq/novu/releases/tag/%40novu/framework%40v2.14.0) signed | 40117 | Courier (full), Knock (full) |
| [Dittofeed](https://github.com/dittofeed/dittofeed) | TypeScript | MIT | [v0.23.0](https://github.com/dittofeed/dittofeed/releases/tag/v0.23.0) signed | 2979 | Courier (partial), Knock (partial) |

</details>

<details>
<summary><b>Privileged access</b>, 3 tools</summary>

Give engineers audited access to servers, databases and Kubernetes through one gateway, with short-lived credentials and session recording.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [JumpServer](https://github.com/jumpserver/jumpserver) | Python | GPL-3.0 | [v5.0.0](https://github.com/jumpserver/jumpserver/releases/tag/v5.0.0) signed | 31714 | StrongDM (full) |
| [Teleport](https://github.com/gravitational/teleport) | Go | AGPL-3.0 | [v18.10.0](https://github.com/gravitational/teleport/releases/tag/v18.10.0) signed | 20965 | StrongDM (full) |
| [Warpgate](https://github.com/warp-tech/warpgate) | Rust | Apache-2.0 | [v0.29.1](https://github.com/warp-tech/warpgate/releases/tag/v0.29.1) | 8013 | StrongDM (partial) |

</details>

<details>
<summary><b>Resume builders</b>, 3 tools</summary>

Write resumes from templates and export them to PDF.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Reactive Resume](https://github.com/reactive-resume/reactive-resume) | TypeScript | MIT | [v6.0.0](https://github.com/reactive-resume/reactive-resume/releases/tag/v6.0.0) signed | 43855 | Resume.io (full), Kickresume (full) |
| [RenderCV](https://github.com/rendercv/rendercv) | Python | MIT | [v2.8](https://github.com/rendercv/rendercv/releases/tag/v2.8) | 17707 | Resume.io (partial), Kickresume (partial) |
| [JadeAI](https://github.com/LingyiChen-AI/JadeAI) | TypeScript | Apache-2.0 | [v0.7.0](https://github.com/LingyiChen-AI/JadeAI/releases/tag/v0.7.0) | 1981 | Kickresume (full), Resume.io (full) |

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
| [`api/`](api) | The Rust API behind search and the [MCP server](api/README.md#mcp), with a local embedding model and Jev as a fallback. |

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
