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
  <a href="CONTRIBUTING.md#verifying-a-tool-you-maintain"><img alt="Tools verified by their maintainers" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fawesome-alternatives%2Fawesome-alternatives%2Fmain%2Fgenerated%2Fcatalog.json&query=%24.stats.verified&label=verified%20by%20maintainers&color=b8ff3c&labelColor=0b0b0b&style=flat-square"></a>
  <a href="https://github.com/awesome-alternatives/awesome-alternatives/actions/workflows/freshness.yml"><img alt="Catalog freshness" src="https://github.com/awesome-alternatives/awesome-alternatives/actions/workflows/freshness.yml/badge.svg"></a>
  <a href="LICENSE-DATA"><img alt="Data: CC BY-SA 4.0" src="https://img.shields.io/badge/data-CC%20BY--SA%204.0-b8ff3c?labelColor=0b0b0b&style=flat-square"></a>
  <a href="LICENSE"><img alt="Code: AGPL-3.0" src="https://img.shields.io/badge/code-AGPL--3.0-b8ff3c?labelColor=0b0b0b&style=flat-square"></a>
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
| [semantic-release](https://github.com/semantic-release/semantic-release) | JavaScript | MIT | [v25.0.9](https://github.com/semantic-release/semantic-release/releases/tag/v25.0.9) signed | 24092 | none |
| [GoReleaser](https://github.com/goreleaser/goreleaser) | Go | MIT | [v2.18.2](https://github.com/goreleaser/goreleaser/releases/tag/v2.18.2) signed | 16090 | none |
| [Changesets](https://github.com/changesets/changesets) | TypeScript | MIT | [@changesets/cli@3.0.3](https://github.com/changesets/changesets/releases/tag/%40changesets/cli%403.0.3) signed | 12468 | semantic-release (full), Lerna (partial) |
| [release-it](https://github.com/release-it/release-it) | JavaScript | MIT | [21.1.0](https://github.com/release-it/release-it/releases/tag/21.1.0) | 9066 | semantic-release (partial) |
| [release-please](https://github.com/googleapis/release-please) | TypeScript | Apache-2.0 | [v17.11.2](https://github.com/googleapis/release-please/releases/tag/v17.11.2) signed | 7598 | semantic-release (full) |
| [Commitizen](https://github.com/commitizen-tools/commitizen) | Python | MIT | [v4.19.1](https://github.com/commitizen-tools/commitizen/releases/tag/v4.19.1) | 3526 | semantic-release (partial) |
| [cargo-release](https://github.com/crate-ci/cargo-release) | Rust | Apache-2.0 | [v1.1.6](https://github.com/crate-ci/cargo-release/releases/tag/v1.1.6) | 1591 | none |
| [release-plz](https://github.com/release-plz/release-plz) | Rust | Apache-2.0 | [release-plz-v0.3.169](https://github.com/release-plz/release-plz/releases/tag/release-plz-v0.3.169) | 1496 | semantic-release (partial), cargo-release (full) |
| [cocogitto](https://github.com/cocogitto/cocogitto) | Rust | MIT | [7.0.0](https://github.com/cocogitto/cocogitto/releases/tag/7.0.0) | 1209 | semantic-release (full), conventional-changelog (partial) |
| [knope](https://github.com/knope-dev/knope) | Rust | MIT | [knope/v0.23.0](https://github.com/knope-dev/knope/releases/tag/knope/v0.23.0) signed | 197 | semantic-release (full), Changesets (full) |
| [FerrFlow](https://github.com/FerrLabs/FerrFlow) verified | Rust | MIT | [v7.28.4](https://github.com/FerrLabs/FerrFlow/releases/tag/v7.28.4) signed | 6 | semantic-release (full), release-please (full), Changesets (full), release-plz (full), knope (full), cocogitto (full), git-cliff (partial), Lerna (partial), conventional-changelog (partial), cargo-release (full) |

</details>

<details>
<summary><b>Changelog generation</b>, 5 tools</summary>

Changelogs built from commits or pull requests, without driving the release itself.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [git-cliff](https://github.com/orhun/git-cliff) | Rust | Apache-2.0 | [v2.14.2](https://github.com/orhun/git-cliff/releases/tag/v2.14.2) signed | 12285 | semantic-release (partial), conventional-changelog (full) |
| [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) | TypeScript | ISC | [git-client-v3.2.0](https://github.com/conventional-changelog/conventional-changelog/releases/tag/git-client-v3.2.0) signed | 8517 | none |
| [GitHub Changelog Generator](https://github.com/github-changelog-generator/github-changelog-generator) | Ruby | MIT | [v1.18.0](https://github.com/github-changelog-generator/github-changelog-generator/releases/tag/v1.18.0) | 7537 | conventional-changelog (full) |
| [Release Drafter](https://github.com/release-drafter/release-drafter) | TypeScript | ISC | [v7.9.0](https://github.com/release-drafter/release-drafter/releases/tag/v7.9.0) signed | 3947 | conventional-changelog (partial) |
| [towncrier](https://github.com/twisted/towncrier) | Python | MIT | [26.9.0](https://github.com/twisted/towncrier/releases/tag/26.9.0) | 923 | none |

</details>

<details>
<summary><b>JavaScript runtimes</b>, 5 tools</summary>

Engines that run JavaScript and TypeScript outside the browser.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Node.js](https://github.com/nodejs/node) | JavaScript | Other | [v26.10.0](https://github.com/nodejs/node/releases/tag/v26.10.0) signed | 122406 | none |
| [Deno](https://github.com/denoland/deno) | Rust | MIT | [v2.9.7](https://github.com/denoland/deno/releases/tag/v2.9.7) signed | 108686 | Node.js (full), ts-node (full) |
| [Bun](https://github.com/oven-sh/bun) | Rust | Other | [bun-v1.4.2](https://github.com/oven-sh/bun/releases/tag/bun-v1.4.2) | 96142 | Node.js (full), npm (full), ts-node (full), Jest (partial) |
| [ts-node](https://github.com/TypeStrong/ts-node) | TypeScript | MIT | [v10.9.2](https://github.com/TypeStrong/ts-node/releases/tag/v10.9.2) | 13119 | none |
| [tsx](https://github.com/privatenumber/tsx) | TypeScript | MIT | [v4.23.15](https://github.com/privatenumber/tsx/releases/tag/v4.23.15) signed | 12164 | ts-node (full) |

</details>

<details>
<summary><b>JavaScript package managers</b>, 3 tools</summary>

Install and lock npm dependencies.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [pnpm](https://github.com/pnpm/pnpm) | Rust | MIT | [v12.9.1](https://github.com/pnpm/pnpm/releases/tag/v12.9.1) signed | 36750 | npm (full) |
| [npm](https://github.com/npm/cli) | JavaScript | Other | [v12.2.0](https://github.com/npm/cli/releases/tag/v12.2.0) | 10175 | none |
| [Yarn](https://github.com/yarnpkg/berry) | TypeScript | BSD-2-Clause | [@yarnpkg/cli/4.18.1](https://github.com/yarnpkg/berry/releases/tag/%40yarnpkg/cli/4.18.1) | 8103 | npm (full) |

</details>

<details>
<summary><b>JavaScript bundlers</b>, 10 tools</summary>

Bundle, transform and serve front-end code.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Create React App](https://github.com/react/create-react-app) | JavaScript | MIT | [v5.0.1](https://github.com/react/create-react-app/releases/tag/v5.0.1) signed | 103225 | none |
| [Vite](https://github.com/vitejs/vite) | TypeScript | MIT | [v8.3.3](https://github.com/vitejs/vite/releases/tag/v8.3.3) signed | 83232 | webpack (full), Create React App (full) |
| [webpack](https://github.com/webpack/webpack) | JavaScript | MIT | [v5.111.1](https://github.com/webpack/webpack/releases/tag/v5.111.1) signed | 66064 | none |
| [Babel](https://github.com/babel/babel) | TypeScript | MIT | [v8.0.6](https://github.com/babel/babel/releases/tag/v8.0.6) | 44138 | none |
| [Parcel](https://github.com/parcel-bundler/parcel) | JavaScript | MIT | [v2.16.4](https://github.com/parcel-bundler/parcel/releases/tag/v2.16.4) | 44016 | webpack (full), Create React App (partial) |
| [esbuild](https://github.com/evanw/esbuild) | Go | MIT | [v0.28.2](https://github.com/evanw/esbuild/releases/tag/v0.28.2) | 40074 | webpack (partial) |
| [SWC](https://github.com/swc-project/swc) | Rust | Apache-2.0 | [v1.16.13](https://github.com/swc-project/swc/releases/tag/v1.16.13) | 34212 | Babel (full) |
| [Rollup](https://github.com/rollup/rollup) | JavaScript | Other | [v4.64.0](https://github.com/rollup/rollup/releases/tag/v4.64.0) | 26304 | none |
| [Rolldown](https://github.com/rolldown/rolldown) | Rust | MIT | [v1.2.12](https://github.com/rolldown/rolldown/releases/tag/v1.2.12) signed | 13964 | Rollup (full) |
| [Rspack](https://github.com/web-infra-dev/rspack) | Rust | MIT | [v2.2.8](https://github.com/web-infra-dev/rspack/releases/tag/v2.2.8) | 12934 | webpack (drop-in) |

</details>

<details>
<summary><b>JavaScript linting and formatting</b>, 6 tools</summary>

Linters and formatters for JavaScript and TypeScript.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Prettier](https://github.com/prettier/prettier) | JavaScript | MIT | [3.9.9](https://github.com/prettier/prettier/releases/tag/3.9.9) | 52415 | none |
| [ESLint](https://github.com/eslint/eslint) | JavaScript | MIT | [v10.12.0](https://github.com/eslint/eslint/releases/tag/v10.12.0) | 27629 | TSLint (full) |
| [Biome](https://github.com/biomejs/biome) | Rust | Apache-2.0 | [@biomejs/biome@2.5.15](https://github.com/biomejs/biome/releases/tag/%40biomejs/biome%402.5.15) signed | 25907 | ESLint (partial), Prettier (full) |
| [Oxc](https://github.com/oxc-project/oxc) | Rust | MIT | [oxlint_v1.87.0](https://github.com/oxc-project/oxc/releases/tag/oxlint_v1.87.0) | 22953 | ESLint (partial) |
| [TSLint](https://github.com/palantir/tslint) archived | TypeScript | Apache-2.0 | [6.1.3](https://github.com/palantir/tslint/releases/tag/6.1.3) signed | 5899 | none |
| [dprint](https://github.com/dprint/dprint) | Rust | MIT | [0.60.1](https://github.com/dprint/dprint/releases/tag/0.60.1) | 4089 | Prettier (full) |

</details>

<details>
<summary><b>JavaScript test runners</b>, 5 tools</summary>

Run unit and integration tests for JavaScript and TypeScript.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Jest](https://github.com/jestjs/jest) | TypeScript | MIT | [v30.5.2](https://github.com/jestjs/jest/releases/tag/v30.5.2) | 45546 | none |
| [Mocha](https://github.com/mochajs/mocha) | JavaScript | MIT | [v12.0.3](https://github.com/mochajs/mocha/releases/tag/v12.0.3) signed | 22895 | none |
| [AVA](https://github.com/avajs/ava) | JavaScript | MIT | [v8.0.1](https://github.com/avajs/ava/releases/tag/v8.0.1) signed | 20825 | Mocha (full) |
| [Vitest](https://github.com/vitest-dev/vitest) | TypeScript | MIT | [v5.0.3](https://github.com/vitest-dev/vitest/releases/tag/v5.0.3) signed | 17189 | Jest (full), Mocha (full) |
| [Jasmine](https://github.com/jasmine/jasmine) | JavaScript | MIT | [v7.0.1](https://github.com/jasmine/jasmine/releases/tag/v7.0.1) | 15813 | Mocha (full) |

</details>

<details>
<summary><b>Python packaging</b>, 12 tools</summary>

Install dependencies, manage environments and lock Python projects.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [uv](https://github.com/astral-sh/uv) | Rust | Apache-2.0 | [0.12.23](https://github.com/astral-sh/uv/releases/tag/0.12.23) signed | 90445 | pip (full), Poetry (full), Pipenv (full), pyenv (full), pip-tools (full) |
| [pyenv](https://github.com/pyenv/pyenv) | Shell | MIT | [v2.8.8](https://github.com/pyenv/pyenv/releases/tag/v2.8.8) | 45125 | none |
| [Poetry](https://github.com/python-poetry/poetry) | Python | MIT | [2.5.1](https://github.com/python-poetry/poetry/releases/tag/2.5.1) | 34306 | Pipenv (full) |
| [Pipenv](https://github.com/pypa/pipenv) | Python | MIT | [v2026.8.0](https://github.com/pypa/pipenv/releases/tag/v2026.8.0) | 25026 | none |
| [pipx](https://github.com/pypa/pipx) | Python | MIT | [1.17.11](https://github.com/pypa/pipx/releases/tag/1.17.11) | 12977 | none |
| [pip](https://github.com/pypa/pip) | Python | MIT | [26.2.1](https://github.com/pypa/pip/releases/tag/26.2.1) signed | 10291 | none |
| [PDM](https://github.com/pdm-project/pdm) | Python | MIT | [2.29.2](https://github.com/pdm-project/pdm/releases/tag/2.29.2) | 8665 | Poetry (full), Pipenv (full) |
| [mamba](https://github.com/mamba-org/mamba) | C++ | BSD-3-Clause | [2.9.0](https://github.com/mamba-org/mamba/releases/tag/2.9.0) signed | 8102 | conda (drop-in) |
| [pip-tools](https://github.com/jazzband/pip-tools) | Python | BSD-3-Clause | [v7.6.1](https://github.com/jazzband/pip-tools/releases/tag/v7.6.1) | 8007 | none |
| [pixi](https://github.com/prefix-dev/pixi) | Rust | BSD-3-Clause | [v0.81.0](https://github.com/prefix-dev/pixi/releases/tag/v0.81.0) | 7831 | conda (full), Poetry (partial) |
| [conda](https://github.com/conda/conda) | Python | Other | [26.9.1](https://github.com/conda/conda/releases/tag/26.9.1) signed | 7524 | none |
| [Hatch](https://github.com/pypa/hatch) | Python | MIT | [hatch-v1.18.1](https://github.com/pypa/hatch/releases/tag/hatch-v1.18.1) signed | 7241 | Poetry (partial), Pipenv (partial) |

</details>

<details>
<summary><b>Python linting and formatting</b>, 6 tools</summary>

Linters and formatters for Python.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Ruff](https://github.com/astral-sh/ruff) | Rust | MIT | [0.16.10](https://github.com/astral-sh/ruff/releases/tag/0.16.10) signed | 49928 | Flake8 (full), Black (drop-in), Pylint (partial), isort (full) |
| [Black](https://github.com/psf/black) | Python | MIT | [26.10.0](https://github.com/psf/black/releases/tag/26.10.0) signed | 41872 | none |
| [YAPF](https://github.com/google/yapf) | Python | Apache-2.0 | [v0.43.0](https://github.com/google/yapf/releases/tag/v0.43.0) | 13991 | Black (full) |
| [isort](https://github.com/PyCQA/isort) | Python | MIT | [9.0.2](https://github.com/PyCQA/isort/releases/tag/9.0.2) | 6964 | none |
| [Pylint](https://github.com/pylint-dev/pylint) | Python | GPL-2.0 | [v4.1.2](https://github.com/pylint-dev/pylint/releases/tag/v4.1.2) signed | 5730 | none |
| [Flake8](https://github.com/PyCQA/flake8) | Python | Other | [7.4.1](https://github.com/PyCQA/flake8/releases/tag/7.4.1) signed | 3826 | none |

</details>

<details>
<summary><b>Infrastructure as code</b>, 18 tools</summary>

Declare cloud infrastructure in files and apply the difference.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Terraform](https://github.com/hashicorp/terraform) | Go | Other | [v1.16.5](https://github.com/hashicorp/terraform/releases/tag/v1.16.5) signed | 49833 | none |
| [OpenTofu](https://github.com/opentofu/opentofu) | Go | MPL-2.0 | [v1.13.1](https://github.com/opentofu/opentofu/releases/tag/v1.13.1) | 30401 | Terraform (drop-in), AWS CloudFormation (full) |
| [SST](https://github.com/anomalyco/sst) | TypeScript | MIT | [v4.17.1](https://github.com/anomalyco/sst/releases/tag/v4.17.1) signed | 26341 | none |
| [Pulumi](https://github.com/pulumi/pulumi) | Go | Apache-2.0 | [v3.267.0](https://github.com/pulumi/pulumi/releases/tag/v3.267.0) signed | 25766 | Terraform (full), AWS CloudFormation (full) |
| [Packer](https://github.com/hashicorp/packer) | Go | Other | [v1.16.1](https://github.com/hashicorp/packer/releases/tag/v1.16.1) signed | 15808 | none |
| [AWS CDK](https://github.com/aws/aws-cdk) | TypeScript | Apache-2.0 | [v2.272.0](https://github.com/aws/aws-cdk/releases/tag/v2.272.0) signed | 12921 | none |
| [Crossplane](https://github.com/crossplane/crossplane) | Go | Apache-2.0 | [v2.4.2](https://github.com/crossplane/crossplane/releases/tag/v2.4.2) | 12134 | Terraform (partial), AWS CloudFormation (partial) |
| [Terragrunt](https://github.com/gruntwork-io/terragrunt) | Go | MIT | [v1.1.6](https://github.com/gruntwork-io/terragrunt/releases/tag/v1.1.6) signed | 9872 | none |
| [Atlantis](https://github.com/runatlantis/atlantis) | Go | Apache-2.0 | [v0.48.0](https://github.com/runatlantis/atlantis/releases/tag/v0.48.0) signed | 9310 | HCP Terraform (partial) |
| [Digger](https://github.com/diggerhq/digger) | Go | MIT | [v0.6.152](https://github.com/diggerhq/digger/releases/tag/v0.6.152) signed | 5046 | HCP Terraform (partial) |
| [DNSControl](https://github.com/DNSControl/dnscontrol) | Go | MIT | [v5.3.0](https://github.com/DNSControl/dnscontrol/releases/tag/v5.3.0) | 3961 | none |
| [octoDNS](https://github.com/octodns/octodns) | Python | MIT | [v1.22.0](https://github.com/octodns/octodns/releases/tag/v1.22.0) signed | 3772 | DNSControl (full) |
| [Bicep](https://github.com/Azure/bicep) | Bicep | MIT | [v0.48.1](https://github.com/Azure/bicep/releases/tag/v0.48.1) signed | 3650 | none |
| [Terramate](https://github.com/terramate-io/terramate) | Go | MPL-2.0 | [v0.17.3](https://github.com/terramate-io/terramate/releases/tag/v0.17.3) signed | 3637 | none |
| [Tofu Controller](https://github.com/flux-iac/tofu-controller) | Go | Apache-2.0 | [v0.16.5](https://github.com/flux-iac/tofu-controller/releases/tag/v0.16.5) | 1708 | HCP Terraform (partial) |
| [Terrakube](https://github.com/terrakube-io/terrakube) | Java | Apache-2.0 | [2.33.2](https://github.com/terrakube-io/terrakube/releases/tag/2.33.2) signed | 965 | HCP Terraform (full) |
| [Burrito](https://github.com/padok-team/burrito) | Go | Apache-2.0 | [v0.14.1](https://github.com/padok-team/burrito/releases/tag/v0.14.1) signed | 757 | HCP Terraform (partial) |
| [OTF](https://github.com/leg100/otf) | Go | MPL-2.0 | [v0.6.3](https://github.com/leg100/otf/releases/tag/v0.6.3) signed | 704 | HCP Terraform (full) |

</details>

<details>
<summary><b>Container engines</b>, 18 tools</summary>

Build and run OCI containers.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Docker Engine (Moby)](https://github.com/moby/moby) | Go | Apache-2.0 | [docker-v29.8.2](https://github.com/moby/moby/releases/tag/docker-v29.8.2) signed | 72157 | none |
| [Podman](https://github.com/podman-container-tools/podman) | Go | Apache-2.0 | [v6.1.3](https://github.com/podman-container-tools/podman/releases/tag/v6.1.3) signed | 33006 | Docker Engine (Moby) (drop-in) |
| [containerd](https://github.com/containerd/containerd) | Go | Apache-2.0 | [v2.4.1](https://github.com/containerd/containerd/releases/tag/v2.4.1) signed | 21385 | Docker Engine (Moby) (partial) |
| [gVisor](https://github.com/google/gvisor) | Go | Apache-2.0 | [release-20260928.0](https://github.com/google/gvisor/releases/tag/release-20260928.0) | 19565 | runc (drop-in) |
| [Jib](https://github.com/GoogleContainerTools/jib) | Java | Apache-2.0 | [v3.5.4-gradle](https://github.com/GoogleContainerTools/jib/releases/tag/v3.5.4-gradle) | 14446 | none |
| [runc](https://github.com/opencontainers/runc) | Go | Apache-2.0 | [v1.5.2](https://github.com/opencontainers/runc/releases/tag/v1.5.2) signed | 13473 | none |
| [nerdctl](https://github.com/containerd/nerdctl) | Go | Apache-2.0 | [v2.4.1](https://github.com/containerd/nerdctl/releases/tag/v2.4.1) signed | 10419 | Docker Engine (Moby) (full) |
| [BuildKit](https://github.com/moby/buildkit) | Go | Apache-2.0 | [v0.33.1](https://github.com/moby/buildkit/releases/tag/v0.33.1) signed | 10309 | none |
| [Buildah](https://github.com/podman-container-tools/buildah) | Go | Apache-2.0 | [v1.45.1](https://github.com/podman-container-tools/buildah/releases/tag/v1.45.1) signed | 9053 | Docker Engine (Moby) (partial) |
| [Kata Containers](https://github.com/kata-containers/kata-containers) | Rust | Apache-2.0 | [4.2.0](https://github.com/kata-containers/kata-containers/releases/tag/4.2.0) signed | 8893 | runc (drop-in) |
| [ko](https://github.com/ko-build/ko) | Go | Apache-2.0 | [v0.19.1](https://github.com/ko-build/ko/releases/tag/v0.19.1) | 8563 | none |
| [youki](https://github.com/youki-dev/youki) | Rust | Apache-2.0 | [v0.7.0](https://github.com/youki-dev/youki/releases/tag/v0.7.0) signed | 7624 | runc (drop-in) |
| [CRI-O](https://github.com/cri-o/cri-o) | Go | Apache-2.0 | [v1.37.2](https://github.com/cri-o/cri-o/releases/tag/v1.37.2) | 5669 | containerd (full) |
| [LXC](https://github.com/lxc/lxc) | C | Other | [v7.0.0](https://github.com/lxc/lxc/releases/tag/v7.0.0) signed | 5266 | none |
| [crun](https://github.com/containers/crun) | C | GPL-2.0 | [1.30.1](https://github.com/containers/crun/releases/tag/1.30.1) signed | 4147 | runc (drop-in) |
| [Sysbox](https://github.com/nestybox/sysbox) | Shell | Apache-2.0 | [v0.7.1](https://github.com/nestybox/sysbox/releases/tag/v0.7.1) signed | 3893 | none |
| [pack](https://github.com/buildpacks/pack) | Go | Apache-2.0 | [v0.40.9](https://github.com/buildpacks/pack/releases/tag/v0.40.9) signed | 3013 | none |
| [Apptainer](https://github.com/apptainer/apptainer) | Go | Other | [v1.5.4](https://github.com/apptainer/apptainer/releases/tag/v1.5.4) | 1982 | none |

</details>

<details>
<summary><b>In-memory key-value stores</b>, 9 tools</summary>

Caches and data structure servers speaking the Redis protocol or close to it.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Redis](https://github.com/redis/redis) | C | Other | [8.10.2](https://github.com/redis/redis/releases/tag/8.10.2) | 76619 | Redis Cloud (full) |
| [Dragonfly](https://github.com/dragonflydb/dragonfly) | C++ | Other | [v2.0.0](https://github.com/dragonflydb/dragonfly/releases/tag/v2.0.0) signed | 31749 | Redis (drop-in), Memcached (full), Redis Cloud (full) |
| [Valkey](https://github.com/valkey-io/valkey) | C | BSD-3-Clause | [9.1.2](https://github.com/valkey-io/valkey/releases/tag/9.1.2) signed | 27383 | Redis (drop-in), Memcached (partial), Redis Cloud (full) |
| [Memcached](https://github.com/memcached/memcached) | C | BSD-3-Clause | [1.6.45](https://github.com/memcached/memcached/releases/tag/1.6.45) | 14291 | none |
| [KeyDB](https://github.com/Snapchat/KeyDB) | C++ | BSD-3-Clause | [v6.3.4](https://github.com/Snapchat/KeyDB/releases/tag/v6.3.4) | 12504 | Redis (drop-in) |
| [Garnet](https://github.com/microsoft/garnet) | C# | MIT | [v2.2.0](https://github.com/microsoft/garnet/releases/tag/v2.2.0) signed | 12041 | Redis (partial) |
| [PikiwiDB](https://github.com/OpenAtomFoundation/pikiwidb) | C++ | BSD-3-Clause | [v4.0.4-alpha](https://github.com/OpenAtomFoundation/pikiwidb/releases/tag/v4.0.4-alpha) | 6132 | Redis (partial) |
| [Apache Kvrocks](https://github.com/apache/kvrocks) | C++ | Apache-2.0 | [v2.17.0](https://github.com/apache/kvrocks/releases/tag/v2.17.0) | 4452 | Redis (partial), Redis Cloud (partial) |
| [Aerospike](https://github.com/aerospike/aerospike-server) | C | Other | [8.1.2.5](https://github.com/aerospike/aerospike-server/releases/tag/8.1.2.5) signed | 1381 | Amazon DynamoDB (partial) |

</details>

<details>
<summary><b>Search engines</b>, 14 tools</summary>

Full-text search servers.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Elasticsearch](https://github.com/elastic/elasticsearch) | Java | Other | [v9.5.5](https://github.com/elastic/elasticsearch/releases/tag/v9.5.5) signed | 78199 | Elastic Cloud (full) |
| [Meilisearch](https://github.com/meilisearch/meilisearch) | Rust | Other | [v1.54.3](https://github.com/meilisearch/meilisearch/releases/tag/v1.54.3) | 59504 | Elasticsearch (partial), Algolia (full) |
| [Typesense](https://github.com/typesense/typesense) | C++ | GPL-3.0 | [v30.2](https://github.com/typesense/typesense/releases/tag/v30.2) | 26634 | Elasticsearch (partial), Algolia (full) |
| [Sonic](https://github.com/valeriansaliou/sonic) | Rust | MPL-2.0 | [v1.10.2](https://github.com/valeriansaliou/sonic/releases/tag/v1.10.2) signed | 21358 | Elasticsearch (partial) |
| [ZincSearch](https://github.com/zincsearch/zincsearch) | Go | Other | [v1.0.0-beta3](https://github.com/zincsearch/zincsearch/releases/tag/v1.0.0-beta3) signed | 17919 | Elasticsearch (partial) |
| [OpenSearch](https://github.com/opensearch-project/OpenSearch) | Java | Apache-2.0 | [3.9.0](https://github.com/opensearch-project/OpenSearch/releases/tag/3.9.0) signed | 13817 | Elasticsearch (full), Splunk (partial), Elastic Cloud (full) |
| [Manticore Search](https://github.com/manticoresoftware/manticoresearch) | C++ | GPL-3.0 | [release-29.9.0](https://github.com/manticoresoftware/manticoresearch/releases/tag/release-29.9.0) | 12043 | Elasticsearch (partial), Algolia (partial) |
| [Orama](https://github.com/oramasearch/orama) | TypeScript | Other | [v3.1.18](https://github.com/oramasearch/orama/releases/tag/v3.1.18) | 10571 | Algolia (partial) |
| [ParadeDB](https://github.com/paradedb/paradedb) | Rust | AGPL-3.0 | [v0.26.0](https://github.com/paradedb/paradedb/releases/tag/v0.26.0) signed | 9361 | Elasticsearch (partial) |
| [Vespa](https://github.com/vespa-engine/vespa) | Java | Apache-2.0 | [v8.763.13](https://github.com/vespa-engine/vespa/releases/tag/v8.763.13) | 7119 | Algolia (partial) |
| [Elastic Cloud on Kubernetes](https://github.com/elastic/cloud-on-k8s) | Go | Other | [v3.5.0](https://github.com/elastic/cloud-on-k8s/releases/tag/v3.5.0) signed | 2851 | Elastic Cloud (full) |
| [SeekStorm](https://github.com/SeekStorm/SeekStorm) | Rust | Apache-2.0 | [v3.3.13](https://github.com/SeekStorm/SeekStorm/releases/tag/v3.3.13) | 1917 | Algolia (partial) |
| [Apache Solr](https://github.com/apache/solr) | Java | Apache-2.0 | [releases/solr/10.0.0](https://github.com/apache/solr/releases/tag/releases/solr/10.0.0) | 1683 | Elasticsearch (full) |
| [OpenSearch Kubernetes Operator](https://github.com/opensearch-project/opensearch-k8s-operator) | Go | Apache-2.0 | [v3.0.0](https://github.com/opensearch-project/opensearch-k8s-operator/releases/tag/v3.0.0) signed | 584 | Elastic Cloud (partial) |

</details>

<details>
<summary><b>Metrics and monitoring</b>, 19 tools</summary>

Collect, store and query time series.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Netdata](https://github.com/netdata/netdata) | Go | GPL-3.0 | [v2.12.0](https://github.com/netdata/netdata/releases/tag/v2.12.0) | 80812 | Datadog (partial) |
| [Prometheus](https://github.com/prometheus/prometheus) | Go | Apache-2.0 | [v3.15.0](https://github.com/prometheus/prometheus/releases/tag/v3.15.0) | 66393 | Datadog (partial) |
| [Beszel](https://github.com/henrygd/beszel) | Go | MIT | [v0.21.0](https://github.com/henrygd/beszel/releases/tag/v0.21.0) signed | 26001 | none |
| [Telegraf](https://github.com/influxdata/telegraf) | Go | MIT | [v1.40.1](https://github.com/influxdata/telegraf/releases/tag/v1.40.1) | 17848 | none |
| [VictoriaMetrics](https://github.com/VictoriaMetrics/VictoriaMetrics) | Go | Apache-2.0 | [v1.153.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.153.0) | 17830 | Prometheus (full), InfluxDB (partial), Datadog (partial) |
| [Thanos](https://github.com/thanos-io/thanos) | Go | Apache-2.0 | [v0.42.4](https://github.com/thanos-io/thanos/releases/tag/v0.42.4) signed | 14230 | Prometheus (partial), Datadog (partial) |
| [Apache HertzBeat](https://github.com/apache/hertzbeat) | Java | Apache-2.0 | [v1.9.0](https://github.com/apache/hertzbeat/releases/tag/v1.9.0) signed | 7415 | none |
| [Zabbix](https://github.com/zabbix/zabbix) | Go Template | AGPL-3.0 | [7.4.15](https://github.com/zabbix/zabbix/releases/tag/7.4.15) | 6444 | Datadog (partial) |
| [Cortex](https://github.com/cortexproject/cortex) | Go | Apache-2.0 | [v1.21.1](https://github.com/cortexproject/cortex/releases/tag/v1.21.1) signed | 5871 | Prometheus (partial) |
| [Grafana Mimir](https://github.com/grafana/mimir) | Go | AGPL-3.0 | [mimir-3.2.1](https://github.com/grafana/mimir/releases/tag/mimir-3.2.1) signed | 5249 | Prometheus (partial), Datadog (partial) |
| [LibreNMS](https://github.com/librenms/librenms) | PHP | Other | [26.9.1.1](https://github.com/librenms/librenms/releases/tag/26.9.1.1) signed | 4940 | SolarWinds Network Performance Monitor (full), PRTG Network Monitor (partial) |
| [M3](https://github.com/m3db/m3) | Go | Apache-2.0 | [v1.6.0](https://github.com/m3db/m3/releases/tag/v1.6.0) | 4904 | none |
| [collectd](https://github.com/collectd/collectd) | C | Other | [collectd-5.12.0](https://github.com/collectd/collectd/releases/tag/collectd-5.12.0) | 3369 | none |
| [Checkmk](https://github.com/Checkmk/checkmk) | Python | GPL-2.0 | [v2.5.0p15](https://github.com/Checkmk/checkmk/releases/tag/v2.5.0p15) | 2386 | PRTG Network Monitor (full) |
| [Icinga](https://github.com/Icinga/icinga2) | C++ | GPL-3.0 | [v2.16.5](https://github.com/Icinga/icinga2/releases/tag/v2.16.5) signed | 2237 | PRTG Network Monitor (full) |
| [Nagios Core](https://github.com/NagiosEnterprises/nagioscore) | C | GPL-2.0 | [nagios-4.5.14](https://github.com/NagiosEnterprises/nagioscore/releases/tag/nagios-4.5.14) | 2047 | PRTG Network Monitor (partial) |
| [Cacti](https://github.com/Cacti/cacti) | PHP | GPL-2.0 | [release/1.2.31](https://github.com/Cacti/cacti/releases/tag/release/1.2.31) | 1874 | SolarWinds Network Performance Monitor (partial) |
| [OpenNMS](https://github.com/OpenNMS/opennms) | Java | Other | [opennms-36.0.4-1](https://github.com/OpenNMS/opennms/releases/tag/opennms-36.0.4-1) | 1174 | SolarWinds Network Performance Monitor (full) |
| [Sensu Go](https://github.com/sensu/sensu-go) | Go | MIT | [v6.14.2](https://github.com/sensu/sensu-go/releases/tag/v6.14.2) signed | 1113 | none |

</details>

<details>
<summary><b>Command-line HTTP clients</b>, 5 tools</summary>

Send HTTP requests from a terminal.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [curl](https://github.com/curl/curl) | C | Other | [curl-8_22_0](https://github.com/curl/curl/releases/tag/curl-8_22_0) signed | 43120 | none |
| [HTTPie](https://github.com/httpie/cli) | Python | BSD-3-Clause | [3.2.4](https://github.com/httpie/cli/releases/tag/3.2.4) | 38733 | none |
| [Hurl](https://github.com/Orange-OpenSource/hurl) | Rust | Apache-2.0 | [8.0.1](https://github.com/Orange-OpenSource/hurl/releases/tag/8.0.1) | 19237 | curl (partial) |
| [xh](https://github.com/ducaale/xh) | Rust | MIT | [v0.26.2](https://github.com/ducaale/xh/releases/tag/v0.26.2) | 8119 | HTTPie (full), curl (partial) |
| [curlie](https://github.com/rs/curlie) | Go | MIT | [v1.8.2](https://github.com/rs/curlie/releases/tag/v1.8.2) | 3730 | HTTPie (full) |

</details>

<details>
<summary><b>Code search</b>, 6 tools</summary>

Search file contents recursively from a terminal.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [ripgrep](https://github.com/BurntSushi/ripgrep) | Rust | Unlicense | [15.2.0](https://github.com/BurntSushi/ripgrep/releases/tag/15.2.0) signed | 68887 | The Silver Searcher (full), ack (full) |
| [The Silver Searcher](https://github.com/ggreer/the_silver_searcher) | C | Apache-2.0 | [2.2.0](https://github.com/ggreer/the_silver_searcher/releases/tag/2.2.0) | 27125 | none |
| [ast-grep](https://github.com/ast-grep/ast-grep) | Rust | MIT | [0.45.3](https://github.com/ast-grep/ast-grep/releases/tag/0.45.3) signed | 16128 | ripgrep (partial) |
| [ripgrep-all](https://github.com/phiresky/ripgrep-all) | Rust | Other | [v0.10.10](https://github.com/phiresky/ripgrep-all/releases/tag/v0.10.10) | 9870 | none |
| [ugrep](https://github.com/Genivia/ugrep) | C++ | BSD-3-Clause | [v7.8.5](https://github.com/Genivia/ugrep/releases/tag/v7.8.5) | 3306 | The Silver Searcher (full), ack (full) |
| [ack](https://github.com/beyondgrep/ack3) | Perl | Other | [v3.10.0](https://github.com/beyondgrep/ack3/releases/tag/v3.10.0) | 830 | none |

</details>

<details>
<summary><b>API clients</b>, 10 tools</summary>

Build, send and share HTTP and GraphQL requests from a desktop or browser app.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Hoppscotch](https://github.com/hoppscotch/hoppscotch) | TypeScript | MIT | [2026.9.0](https://github.com/hoppscotch/hoppscotch/releases/tag/2026.9.0) signed | 80580 | Insomnia (full), Postman (full) |
| [Bruno](https://github.com/usebruno/bruno) | JavaScript | MIT | [v4.2.1](https://github.com/usebruno/bruno/releases/tag/v4.2.1) | 47369 | Insomnia (full), Postman (full) |
| [Insomnia](https://github.com/Kong/insomnia) | TypeScript | Apache-2.0 | [core@13.3.0](https://github.com/Kong/insomnia/releases/tag/core%4013.3.0) | 40034 | none |
| [Yaak](https://github.com/mountain-loop/yaak) | TypeScript | MIT | [v2026.8.1](https://github.com/mountain-loop/yaak/releases/tag/v2026.8.1) signed | 19292 | Postman (full), Insomnia (full) |
| [Posting](https://github.com/darrenburns/posting) | Python | Apache-2.0 | [2.11.2](https://github.com/darrenburns/posting/releases/tag/2.11.2) signed | 12488 | Postman (partial) |
| [Requestly](https://github.com/requestly/requestly) | unknown | Other | [changelog-2026.03.23](https://github.com/requestly/requestly/releases/tag/changelog-2026.03.23) | 6758 | Postman (full) |
| [REST Client](https://github.com/Huachao/vscode-restclient) | TypeScript | MIT | [v0.25.0](https://github.com/Huachao/vscode-restclient/releases/tag/v0.25.0) | 6055 | Postman (partial) |
| [ATAC](https://github.com/Julien-cpsn/ATAC) | Rust | MIT | [v0.23.1](https://github.com/Julien-cpsn/ATAC/releases/tag/v0.23.1) | 3738 | Postman (partial) |
| [Restfox](https://github.com/flawiddsouza/Restfox) | Vue | MIT | [v0.40.0](https://github.com/flawiddsouza/Restfox/releases/tag/v0.40.0) | 2768 | Postman (partial), Insomnia (partial) |
| [Slumber](https://github.com/LucasPickering/slumber) | Rust | MIT | [v5.3.0](https://github.com/LucasPickering/slumber/releases/tag/v5.3.0) | 1230 | Postman (partial) |

</details>

<details>
<summary><b>Monorepo tools</b>, 9 tools</summary>

Run, cache and orchestrate tasks across the packages of one repository.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Lerna](https://github.com/lerna/lerna) | TypeScript | MIT | [v10.0.1](https://github.com/lerna/lerna/releases/tag/v10.0.1) | 36046 | none |
| [Turborepo](https://github.com/vercel/turborepo) | Rust | MIT | [v2.11.7](https://github.com/vercel/turborepo/releases/tag/v2.11.7) signed | 31180 | Lerna (partial) |
| [Nx](https://github.com/nrwl/nx) | TypeScript | MIT | [22.7.12](https://github.com/nrwl/nx/releases/tag/22.7.12) | 29394 | Lerna (full) |
| [Bazel](https://github.com/bazelbuild/bazel) | Java | Apache-2.0 | [9.2.0](https://github.com/bazelbuild/bazel/releases/tag/9.2.0) | 25922 | none |
| [Rush](https://github.com/microsoft/rushstack) | TypeScript | Other | [5.181.0](https://www.npmjs.com/package/@microsoft/rush/v/5.181.0) | 6499 | Lerna (full) |
| [Buck2](https://github.com/facebook/buck2) | Rust | Apache-2.0 | [latest](https://github.com/facebook/buck2/releases/tag/latest) | 4455 | Bazel (full) |
| [moon](https://github.com/moonrepo/moon) | Rust | MIT | [v2.6.0](https://github.com/moonrepo/moon/releases/tag/v2.6.0) | 4136 | Lerna (partial) |
| [Pants](https://github.com/pantsbuild/pants) | Python | Apache-2.0 | [release_2.33.1](https://github.com/pantsbuild/pants/releases/tag/release_2.33.1) signed | 3838 | Bazel (partial) |
| [Please](https://github.com/thought-machine/please) | Go | Apache-2.0 | [v17.33.0](https://github.com/thought-machine/please/releases/tag/v17.33.0) signed | 2616 | Bazel (full) |

</details>

<details>
<summary><b>Shell prompts</b>, 10 tools</summary>

Customisable prompts showing git state, runtimes and context.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh) | Shell | MIT | none | 190198 | none |
| [Starship](https://github.com/starship/starship) | Rust | ISC | [v1.26.0](https://github.com/starship/starship/releases/tag/v1.26.0) signed | 60174 | Powerlevel10k (full), Oh My Zsh (partial) |
| [Powerlevel10k](https://github.com/romkatv/powerlevel10k) | Shell | MIT | [v1.20.0](https://github.com/romkatv/powerlevel10k/releases/tag/v1.20.0) signed | 55206 | none |
| [Oh My Posh](https://github.com/JanDeDobbeleer/oh-my-posh) | Go | MIT | [v31.5.0](https://github.com/JanDeDobbeleer/oh-my-posh/releases/tag/v31.5.0) | 23553 | Powerlevel10k (full), Oh My Zsh (partial) |
| [Spaceship](https://github.com/spaceship-prompt/spaceship-prompt) | Shell | MIT | [v4.22.5](https://github.com/spaceship-prompt/spaceship-prompt/releases/tag/v4.22.5) | 20584 | Powerlevel10k (full), Oh My Zsh (partial) |
| [Bash-it](https://github.com/Bash-it/bash-it) | Shell | MIT | [v3.2.0](https://github.com/Bash-it/bash-it/releases/tag/v3.2.0) signed | 15275 | none |
| [Prezto](https://github.com/sorin-ionescu/prezto) | Shell | MIT | none | 14571 | Oh My Zsh (full) |
| [Pure](https://github.com/sindresorhus/pure) | Shell | MIT | [v1.28.3](https://github.com/sindresorhus/pure/releases/tag/v1.28.3) | 14438 | Powerlevel10k (full), Oh My Zsh (partial) |
| [Oh My Bash](https://github.com/ohmybash/oh-my-bash) | Shell | MIT | none | 7731 | none |
| [Zim](https://github.com/zimfw/zimfw) | Shell | MIT | [v1.20.1](https://github.com/zimfw/zimfw/releases/tag/v1.20.1) signed | 4703 | Oh My Zsh (full) |

</details>

<details>
<summary><b>Terminal multiplexers</b>, 3 tools</summary>

Split, detach and reattach terminal sessions.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [tmux](https://github.com/tmux/tmux) | C | ISC | [3.7c](https://github.com/tmux/tmux/releases/tag/3.7c) | 49800 | none |
| [Zellij](https://github.com/zellij-org/zellij) | Rust | MIT | [v0.45.1](https://github.com/zellij-org/zellij/releases/tag/v0.45.1) | 35659 | tmux (full) |
| [tmate](https://github.com/tmate-io/tmate) | C | Other | [2.4.0](https://github.com/tmate-io/tmate/releases/tag/2.4.0) | 6132 | tmux (partial) |

</details>

<details>
<summary><b>Document databases</b>, 10 tools</summary>

Databases storing JSON-like documents.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [SurrealDB](https://github.com/surrealdb/surrealdb) | Rust | Other | [v3.3.0](https://github.com/surrealdb/surrealdb/releases/tag/v3.3.0) signed | 33109 | MongoDB (partial) |
| [MongoDB](https://github.com/mongodb/mongo) | C++ | Other | [r8.3.11](https://github.com/mongodb/mongo/releases/tag/r8.3.11) | 28618 | MongoDB Atlas (full) |
| [RethinkDB](https://github.com/rethinkdb/rethinkdb) | C++ | Other | [v2.4.4](https://github.com/rethinkdb/rethinkdb/releases/tag/v2.4.4) | 27007 | MongoDB (partial) |
| [RxDB](https://github.com/pubkey/rxdb) | TypeScript | Apache-2.0 | [17.6.0](https://github.com/pubkey/rxdb/releases/tag/17.6.0) | 23403 | Firebase (partial) |
| [PouchDB](https://github.com/apache/pouchdb) | JavaScript | Apache-2.0 | [9.0.0](https://github.com/apache/pouchdb/releases/tag/9.0.0) | 17620 | none |
| [ArangoDB](https://github.com/arangodb/arangodb) | C++ | Other | [v3.12.12.1](https://github.com/arangodb/arangodb/releases/tag/v3.12.12.1) | 14278 | MongoDB (partial) |
| [FerretDB](https://github.com/FerretDB/FerretDB) | Go | Apache-2.0 | [v2.7.0](https://github.com/FerretDB/FerretDB/releases/tag/v2.7.0) signed | 11091 | MongoDB (drop-in), MongoDB Atlas (partial) |
| [Apache CouchDB](https://github.com/apache/couchdb) | Erlang | Apache-2.0 | [3.5.2](https://github.com/apache/couchdb/releases/tag/3.5.2) signed | 6971 | MongoDB (full) |
| [RavenDB](https://github.com/ravendb/ravendb) | C# | Other | [7.2.6](https://github.com/ravendb/ravendb/releases/tag/7.2.6) | 4002 | none |
| [Percona Operator for MongoDB](https://github.com/percona/percona-server-mongodb-operator) | Go | Other | [v1.23.1](https://github.com/percona/percona-server-mongodb-operator/releases/tag/v1.23.1) | 457 | MongoDB Atlas (full) |

</details>

<details>
<summary><b>Wide-column databases</b>, 4 tools</summary>

Distributed databases storing wide, sparse rows partitioned across nodes.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [ScyllaDB](https://github.com/scylladb/scylladb) | C++ | Other | [scylla-2026.3.2](https://github.com/scylladb/scylladb/releases/tag/scylla-2026.3.2) | 15783 | Apache Cassandra (drop-in), Amazon Keyspaces (drop-in), Amazon DynamoDB (partial) |
| [Apache Cassandra](https://github.com/apache/cassandra) | Java | Apache-2.0 | [cassandra-5.0.9](https://github.com/apache/cassandra/releases/tag/cassandra-5.0.9) | 10114 | Amazon Keyspaces (drop-in), Astra DB (full), Amazon DynamoDB (partial) |
| [Apache HBase](https://github.com/apache/hbase) | Java | Apache-2.0 | [rel/3.0.0](https://github.com/apache/hbase/releases/tag/rel/3.0.0) signed | 5560 | Bigtable (full) |
| [Apache Accumulo](https://github.com/apache/accumulo) | Java | Apache-2.0 | [rel/3.0.0](https://github.com/apache/accumulo/releases/tag/rel/3.0.0) signed | 1173 | Bigtable (full) |

</details>

<details>
<summary><b>Graph databases</b>, 13 tools</summary>

Databases storing nodes and the relationships between them, queried by traversing the graph.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Dgraph](https://github.com/dgraph-io/dgraph) | Go | Apache-2.0 | [v25.4.1](https://github.com/dgraph-io/dgraph/releases/tag/v25.4.1) signed | 21805 | Amazon Neptune (partial) |
| [Neo4j](https://github.com/neo4j/neo4j) | Java | GPL-3.0 | [3.2.0-alpha08](https://github.com/neo4j/neo4j/releases/tag/3.2.0-alpha08) | 17278 | Amazon Neptune (partial), TigerGraph (partial) |
| [NebulaGraph](https://github.com/vesoft-inc/nebula) | C++ | Apache-2.0 | [v3.8.0](https://github.com/vesoft-inc/nebula/releases/tag/v3.8.0) signed | 12407 | TigerGraph (partial), Neo4j (partial) |
| [FalkorDB](https://github.com/FalkorDB/FalkorDB) | Rust | Other | [v6.0.1](https://github.com/FalkorDB/FalkorDB/releases/tag/v6.0.1) signed | 7663 | Neo4j (partial) |
| [JanusGraph](https://github.com/JanusGraph/janusgraph) | Java | Other | [v1.1.0](https://github.com/JanusGraph/janusgraph/releases/tag/v1.1.0) | 5843 | Azure Cosmos DB for Apache Gremlin (full), Amazon Neptune (partial) |
| [OrientDB](https://github.com/orientechnologies/orientdb) | Java | Apache-2.0 | [3.2.57](https://github.com/orientechnologies/orientdb/releases/tag/3.2.57) | 4991 | Neo4j (partial) |
| [Apache AGE](https://github.com/apache/age) | C | Apache-2.0 | [PG18/v1.8.0-rc0](https://github.com/apache/age/releases/tag/PG18/v1.8.0-rc0) signed | 4873 | Neo4j (partial) |
| [Memgraph](https://github.com/memgraph/memgraph) | C++ | Other | [v3.13.1](https://github.com/memgraph/memgraph/releases/tag/v3.13.1) | 4598 | Neo4j (partial) |
| [TypeDB](https://github.com/typedb/typedb) | Rust | MPL-2.0 | [3.13.6](https://github.com/typedb/typedb/releases/tag/3.13.6) signed | 4477 | none |
| [TerminusDB](https://github.com/terminusdb/terminusdb) | Prolog | Apache-2.0 | [v12.0.7](https://github.com/terminusdb/terminusdb/releases/tag/v12.0.7) signed | 3432 | none |
| [Apache HugeGraph](https://github.com/apache/hugegraph) | Java | Apache-2.0 | [1.7.0](https://github.com/apache/hugegraph/releases/tag/1.7.0) signed | 3193 | Amazon Neptune (partial) |
| [TuGraph](https://github.com/TuGraph-family/tugraph-db) | C++ | Apache-2.0 | [v4.5.2](https://github.com/TuGraph-family/tugraph-db/releases/tag/v4.5.2) signed | 1763 | Neo4j (partial) |
| [ArcadeDB](https://github.com/ArcadeData/arcadedb) | Java | Apache-2.0 | [26.10.1](https://github.com/ArcadeData/arcadedb/releases/tag/26.10.1) | 1182 | Neo4j (partial) |

</details>

<details>
<summary><b>Event streaming</b>, 15 tools</summary>

Durable, partitioned logs for events and messages.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Apache Kafka](https://github.com/apache/kafka) | Java | Apache-2.0 | [4.3.1](https://github.com/apache/kafka/releases/tag/4.3.1) | 33916 | none |
| [NSQ](https://github.com/nsqio/nsq) | Go | MIT | [v1.3.0](https://github.com/nsqio/nsq/releases/tag/v1.3.0) | 25770 | Amazon SQS (partial) |
| [Apache RocketMQ](https://github.com/apache/rocketmq) | Java | Apache-2.0 | [rocketmq-all-5.5.1](https://github.com/apache/rocketmq/releases/tag/rocketmq-all-5.5.1) signed | 22629 | Apache Kafka (full) |
| [NATS](https://github.com/nats-io/nats-server) | Go | Apache-2.0 | [v2.15.0](https://github.com/nats-io/nats-server/releases/tag/v2.15.0) signed | 20846 | Apache Kafka (partial), Amazon SQS (partial) |
| [Apache Pulsar](https://github.com/apache/pulsar) | Java | Apache-2.0 | [v5.0.0](https://github.com/apache/pulsar/releases/tag/v5.0.0) signed | 15343 | Apache Kafka (full) |
| [RabbitMQ](https://github.com/rabbitmq/rabbitmq-server) | JavaScript | Other | [v4.3.6](https://github.com/rabbitmq/rabbitmq-server/releases/tag/v4.3.6) signed | 13906 | Amazon SQS (full), Apache Kafka (partial) |
| [Redpanda](https://github.com/redpanda-data/redpanda) | C++ | none | [v26.2.2](https://github.com/redpanda-data/redpanda/releases/tag/v26.2.2) signed | 12599 | Apache Kafka (drop-in) |
| [AutoMQ](https://github.com/AutoMQ/automq) | Java | Apache-2.0 | [1.7.5-rc1](https://github.com/AutoMQ/automq/releases/tag/1.7.5-rc1) | 10907 | Apache Kafka (drop-in) |
| [Strimzi](https://github.com/strimzi/strimzi-kafka-operator) | Java | Apache-2.0 | [1.2.0](https://github.com/strimzi/strimzi-kafka-operator/releases/tag/1.2.0) | 5947 | Confluent Cloud (partial) |
| [Fluvio](https://github.com/fluvio-community/fluvio) | Rust | Apache-2.0 | [v0.18.1](https://github.com/fluvio-community/fluvio/releases/tag/v0.18.1) signed | 5260 | Apache Kafka (partial) |
| [Apache Iggy](https://github.com/apache/iggy) | Rust | Apache-2.0 | [server-0.9.0](https://github.com/apache/iggy/releases/tag/server-0.9.0) | 5035 | Apache Kafka (partial) |
| [ElasticMQ](https://github.com/softwaremill/elasticmq) | Scala | Apache-2.0 | [v1.7.1](https://github.com/softwaremill/elasticmq/releases/tag/v1.7.1) signed | 2942 | Amazon SQS (drop-in) |
| [Apache ActiveMQ](https://github.com/apache/activemq) | Java | Apache-2.0 | [activemq-6.3.2](https://github.com/apache/activemq/releases/tag/activemq-6.3.2) signed | 2464 | Amazon MQ (full) |
| [Apache ActiveMQ Artemis](https://github.com/apache/artemis) | Java | Apache-2.0 | [2.57.0](https://github.com/apache/artemis/releases/tag/2.57.0) | 1063 | Amazon MQ (partial) |
| [LavinMQ](https://github.com/cloudamqp/lavinmq) | Crystal | Apache-2.0 | [v2.10.1](https://github.com/cloudamqp/lavinmq/releases/tag/v2.10.1) | 1028 | RabbitMQ (partial) |

</details>

<details>
<summary><b>Web servers and reverse proxies</b>, 30 tools</summary>

Serve sites, terminate TLS and route traffic to services.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [frp](https://github.com/fatedier/frp) | Go | Apache-2.0 | [v0.71.0](https://github.com/fatedier/frp/releases/tag/v0.71.0) | 109760 | ngrok (partial), Cloudflare Tunnel (partial) |
| [Caddy](https://github.com/caddyserver/caddy) | Go | Apache-2.0 | [v2.11.7](https://github.com/caddyserver/caddy/releases/tag/v2.11.7) signed | 77391 | nginx (full) |
| [Traefik](https://github.com/traefik/traefik) | Go | MIT | [v3.7.14](https://github.com/traefik/traefik/releases/tag/v3.7.14) signed | 65090 | nginx (partial), ingress-nginx (full) |
| [Nginx Proxy Manager](https://github.com/NginxProxyManager/nginx-proxy-manager) | TypeScript | MIT | [v2.16.0](https://github.com/NginxProxyManager/nginx-proxy-manager/releases/tag/v2.16.0) signed | 34328 | none |
| [nginx](https://github.com/nginx/nginx) | C | BSD-2-Clause | [release-1.31.6](https://github.com/nginx/nginx/releases/tag/release-1.31.6) | 31804 | none |
| [Envoy](https://github.com/envoyproxy/envoy) | C++ | Apache-2.0 | [v1.39.2](https://github.com/envoyproxy/envoy/releases/tag/v1.39.2) | 29043 | nginx (partial) |
| [Pangolin](https://github.com/fosrl/pangolin) | TypeScript | Other | [1.24.0](https://github.com/fosrl/pangolin/releases/tag/1.24.0) signed | 23019 | Cloudflare Tunnel (full), ngrok (partial) |
| [ingress-nginx](https://github.com/kubernetes/ingress-nginx) archived | Go | Apache-2.0 | [controller-v1.15.1](https://github.com/kubernetes/ingress-nginx/releases/tag/controller-v1.15.1) signed | 19456 | none |
| [rathole](https://github.com/rathole-org/rathole) | Rust | Apache-2.0 | [v0.5.0](https://github.com/rathole-org/rathole/releases/tag/v0.5.0) signed | 14302 | ngrok (partial), frp (full) |
| [OpenResty](https://github.com/openresty/openresty) | C | Other | [v1.27.1.2](https://github.com/openresty/openresty/releases/tag/v1.27.1.2) | 14062 | nginx (drop-in) |
| [Tengine](https://github.com/alibaba/tengine) | C | BSD-2-Clause | [3.1.0](https://github.com/alibaba/tengine/releases/tag/3.1.0) signed | 13385 | nginx (drop-in) |
| [Nginx UI](https://github.com/0xJacky/nginx-ui) | Go | AGPL-3.0 | [v2.8.3](https://github.com/0xJacky/nginx-ui/releases/tag/v2.8.3) | 11568 | none |
| [H2O](https://github.com/h2o/h2o) | C | MIT | [tag-no-more-releases](https://github.com/h2o/h2o/releases/tag/tag-no-more-releases) | 11551 | nginx (partial) |
| [FrankenPHP](https://github.com/php/frankenphp) | Go | MIT | [v1.13.0](https://github.com/php/frankenphp/releases/tag/v1.13.0) | 11391 | nginx (partial) |
| [BunkerWeb](https://github.com/bunkerity/bunkerweb) | Python | AGPL-3.0 | [v1.6.15](https://github.com/bunkerity/bunkerweb/releases/tag/v1.6.15) signed | 11047 | none |
| [HAProxy](https://github.com/haproxy/haproxy) | C | Other | [v3.4.0](https://github.com/haproxy/haproxy/releases/tag/v3.4.0) | 6909 | nginx (partial) |
| [Zoraxy](https://github.com/tobychui/zoraxy) | HTML | AGPL-3.0 | [v3.3.5-rc2](https://github.com/tobychui/zoraxy/releases/tag/v3.3.5-rc2) signed | 5511 | Nginx Proxy Manager (full) |
| [sish](https://github.com/antoniomika/sish) | Go | MIT | [v2.24.0](https://github.com/antoniomika/sish/releases/tag/v2.24.0) signed | 4789 | ngrok (full) |
| [zrok](https://github.com/openziti/zrok) | Go | Apache-2.0 | [v2.0.7](https://github.com/openziti/zrok/releases/tag/v2.0.7) signed | 4762 | ngrok (full), Cloudflare Tunnel (partial) |
| [Keepalived](https://github.com/acassen/keepalived) | C | GPL-2.0 | [v2.4.3](https://github.com/acassen/keepalived/releases/tag/v2.4.3) | 4717 | none |
| [Emissary-ingress](https://github.com/emissary-ingress/emissary) | Python | Apache-2.0 | [v4.1.0](https://github.com/emissary-ingress/emissary/releases/tag/v4.1.0) signed | 4524 | none |
| [Octelium](https://github.com/octelium/octelium) | Go | AGPL-3.0 | [v0.44.0](https://github.com/octelium/octelium/releases/tag/v0.44.0) | 4091 | Cloudflare Tunnel (partial) |
| [Contour](https://github.com/projectcontour/contour) | HTML | Apache-2.0 | [v1.33.7](https://github.com/projectcontour/contour/releases/tag/v1.33.7) | 3956 | none |
| [Sōzu](https://github.com/sozu-proxy/sozu) | Rust | AGPL-3.0 | [2.2.1](https://github.com/sozu-proxy/sozu/releases/tag/2.2.1) | 3743 | none |
| [Squid](https://github.com/squid-cache/squid) | C++ | GPL-2.0 | [SQUID_7_7](https://github.com/squid-cache/squid/releases/tag/SQUID_7_7) signed | 3118 | none |
| [Envoy Gateway](https://github.com/envoyproxy/gateway) | Go | Apache-2.0 | [v1.9.2](https://github.com/envoyproxy/gateway/releases/tag/v1.9.2) | 3069 | none |
| [Angie](https://github.com/webserver-llc/angie) | C | BSD-2-Clause | [Angie-1.12.2](https://github.com/webserver-llc/angie/releases/tag/Angie-1.12.2) | 2581 | nginx (drop-in) |
| [Static Web Server](https://github.com/static-web-server/static-web-server) | Rust | Apache-2.0 | [v2.44.0](https://github.com/static-web-server/static-web-server/releases/tag/v2.44.0) signed | 2374 | nginx (partial) |
| [Apache Traffic Server](https://github.com/apache/trafficserver) | C++ | Apache-2.0 | [10.2.0](https://github.com/apache/trafficserver/releases/tag/10.2.0) | 1992 | nginx (partial) |
| [OpenLiteSpeed](https://github.com/litespeedtech/openlitespeed) | C++ | GPL-3.0 | [v1.9.3](https://github.com/litespeedtech/openlitespeed/releases/tag/v1.9.3) | 1476 | nginx (partial) |

</details>

<details>
<summary><b>Documentation site generators</b>, 16 tools</summary>

Turn Markdown into a searchable documentation site.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Docusaurus](https://github.com/facebook/docusaurus) | TypeScript | MIT | [v3.10.2](https://github.com/facebook/docusaurus/releases/tag/v3.10.2) | 66429 | GitBook (full) |
| [docsify](https://github.com/docsifyjs/docsify) | JavaScript | MIT | [v5.0.0](https://github.com/docsifyjs/docsify/releases/tag/v5.0.0) signed | 31542 | GitBook (partial) |
| [Material for MkDocs](https://github.com/squidfunk/mkdocs-material) | Python | MIT | [9.7.7](https://github.com/squidfunk/mkdocs-material/releases/tag/9.7.7) signed | 27544 | GitBook (full), Docusaurus (full) |
| [MkDocs](https://github.com/mkdocs/mkdocs) | Python | BSD-2-Clause | [1.6.1](https://github.com/mkdocs/mkdocs/releases/tag/1.6.1) signed | 22496 | GitBook (full) |
| [mdBook](https://github.com/rust-lang/mdBook) | Rust | MPL-2.0 | [v0.5.4](https://github.com/rust-lang/mdBook/releases/tag/v0.5.4) signed | 22197 | GitBook (full) |
| [VitePress](https://github.com/vuejs/vitepress) | TypeScript | MIT | [v2.0.0-alpha.20](https://github.com/vuejs/vitepress/releases/tag/v2.0.0-alpha.20) | 18383 | Docusaurus (full), GitBook (full) |
| [Nextra](https://github.com/shuding/nextra) | TypeScript | MIT | [nextra-theme-docs@4.6.1](https://github.com/shuding/nextra/releases/tag/nextra-theme-docs%404.6.1) | 13936 | GitBook (full), Docusaurus (full) |
| [Fumadocs](https://github.com/fuma-nama/fumadocs) | TypeScript | MIT | [fumadocs@16.16.2](https://github.com/fuma-nama/fumadocs/releases/tag/fumadocs%4016.16.2) signed | 13304 | GitBook (full), Nextra (full) |
| [Starlight](https://github.com/withastro/starlight) | TypeScript | MIT | [@astrojs/starlight@0.42.5](https://github.com/withastro/starlight/releases/tag/%40astrojs/starlight%400.42.5) signed | 9365 | Docusaurus (full), GitBook (full) |
| [Sphinx](https://github.com/sphinx-doc/sphinx) | Python | Other | [v9.1.0](https://github.com/sphinx-doc/sphinx/releases/tag/v9.1.0) | 8058 | GitBook (full) |
| [Zensical](https://github.com/zensical/zensical) | Rust | MIT | [v0.0.68](https://github.com/zensical/zensical/releases/tag/v0.0.68) | 5845 | Material for MkDocs (full) |
| [DocFX](https://github.com/dotnet/docfx) | C# | MIT | [v2.81.0](https://github.com/dotnet/docfx/releases/tag/v2.81.0) signed | 4448 | none |
| [Jupyter Book](https://github.com/jupyter-book/jupyter-book) | TypeScript | BSD-3-Clause | [v2.1.7](https://github.com/jupyter-book/jupyter-book/releases/tag/v2.1.7) | 4281 | GitBook (partial) |
| [dumi](https://github.com/umijs/dumi) | JavaScript | MIT | [v2.4.46](https://github.com/umijs/dumi/releases/tag/v2.4.46) | 3801 | none |
| [VuePress](https://github.com/vuepress/core) | TypeScript | MIT | [v2.0.0-rc.31](https://github.com/vuepress/core/releases/tag/v2.0.0-rc.31) | 2836 | none |
| [Rspress](https://github.com/web-infra-dev/rspress) | TypeScript | MIT | [v2.0.23](https://github.com/web-infra-dev/rspress/releases/tag/v2.0.23) signed | 2340 | Docusaurus (full) |

</details>

<details>
<summary><b>Static site generators</b>, 14 tools</summary>

Build websites from templates and content files.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Hugo](https://github.com/gohugoio/hugo) | Go | Apache-2.0 | [v0.167.0](https://github.com/gohugoio/hugo/releases/tag/v0.167.0) | 90050 | Jekyll (full), Hexo (full) |
| [Astro](https://github.com/withastro/astro) | TypeScript | Other | [@astrojs/vercel@11.0.12](https://github.com/withastro/astro/releases/tag/%40astrojs/vercel%4011.0.12) signed | 63080 | Gatsby (full), Jekyll (full), Hexo (full) |
| [Gatsby](https://github.com/gatsbyjs/gatsby) | JavaScript | MIT | [gatsby@5.16.1](https://github.com/gatsbyjs/gatsby/releases/tag/gatsby%405.16.1) | 55945 | none |
| [Jekyll](https://github.com/jekyll/jekyll) | Ruby | MIT | [v4.4.1](https://github.com/jekyll/jekyll/releases/tag/v4.4.1) | 51710 | none |
| [Hexo](https://github.com/hexojs/hexo) | TypeScript | MIT | [v8.1.2](https://github.com/hexojs/hexo/releases/tag/v8.1.2) | 41777 | none |
| [Eleventy](https://github.com/11ty/buildawesome) | JavaScript | MIT | [v3.1.6](https://github.com/11ty/buildawesome/releases/tag/v3.1.6) | 19950 | Jekyll (full), Hexo (full) |
| [Zola](https://github.com/getzola/zola) | Rust | EUPL-1.2 | [v0.23.6](https://github.com/getzola/zola/releases/tag/v0.23.6) | 17494 | Jekyll (full), Hexo (full) |
| [Pelican](https://github.com/getpelican/pelican) | Python | AGPL-3.0 | [4.12.0](https://github.com/getpelican/pelican/releases/tag/4.12.0) | 13351 | Jekyll (full), Hexo (full) |
| [Quartz](https://github.com/jackyzha0/quartz) | TypeScript | MIT | [v4.0.8](https://github.com/jackyzha0/quartz/releases/tag/v4.0.8) | 13334 | Obsidian Publish (full) |
| [Publii](https://github.com/GetPublii/Publii) | HTML | GPL-3.0 | [v.0.47.9-build-17481](https://github.com/GetPublii/Publii/releases/tag/v.0.47.9-build-17481) | 7326 | Wix (partial), Squarespace (partial) |
| [Hakyll](https://github.com/jaspervdj/hakyll) | Haskell | Other | [v4.17.0.0](https://github.com/jaspervdj/hakyll/releases/tag/v4.17.0.0) signed | 2871 | none |
| [Nikola](https://github.com/getnikola/nikola) | Python | MIT | [v8.3.3](https://github.com/getnikola/nikola/releases/tag/v8.3.3) signed | 2745 | Pelican (full) |
| [Lume](https://github.com/lumeland/lume) | TypeScript | MIT | [v3.3.2](https://github.com/lumeland/lume/releases/tag/v3.3.2) | 2284 | Eleventy (full) |
| [Bridgetown](https://github.com/bridgetownrb/bridgetown) | Ruby | MIT | [v2.2.2](https://github.com/bridgetownrb/bridgetown/releases/tag/v2.2.2) | 1366 | Jekyll (full) |

</details>

<details>
<summary><b>Python type checkers</b>, 5 tools</summary>

Check Python type annotations before the code runs.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [mypy](https://github.com/python/mypy) | Python | Other | [v2.4.0](https://github.com/python/mypy/releases/tag/v2.4.0) | 20672 | none |
| [ty](https://github.com/astral-sh/ty) | Python | MIT | [0.0.84](https://github.com/astral-sh/ty/releases/tag/0.0.84) signed | 19811 | mypy (full) |
| [Pyright](https://github.com/microsoft/pyright) | Python | Other | [1.1.414](https://github.com/microsoft/pyright/releases/tag/1.1.414) | 15679 | mypy (full) |
| [Pyrefly](https://github.com/facebook/pyrefly) | Rust | MIT | [1.3.2](https://github.com/facebook/pyrefly/releases/tag/1.3.2) | 7049 | mypy (full), Pyright (full) |
| [basedpyright](https://github.com/DetachHead/basedpyright) | TypeScript | Other | [v1.40.2](https://github.com/DetachHead/basedpyright/releases/tag/v1.40.2) | 3621 | Pyright (full) |

</details>

<details>
<summary><b>Node.js web frameworks</b>, 8 tools</summary>

Routing and middleware for HTTP servers in JavaScript and TypeScript.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [NestJS](https://github.com/nestjs/nest) | TypeScript | MIT | [v12.1.1](https://github.com/nestjs/nest/releases/tag/v12.1.1) | 76795 | none |
| [Express](https://github.com/expressjs/express) | JavaScript | MIT | [v5.2.1](https://github.com/expressjs/express/releases/tag/v5.2.1) | 69588 | none |
| [Fastify](https://github.com/fastify/fastify) | JavaScript | MIT | [v5.12.5](https://github.com/fastify/fastify/releases/tag/v5.12.5) signed | 37233 | Express (full), Koa (full) |
| [Koa](https://github.com/koajs/koa) | JavaScript | MIT | [v3.2.1](https://github.com/koajs/koa/releases/tag/v3.2.1) signed | 35681 | none |
| [Hono](https://github.com/honojs/hono) | TypeScript | MIT | [v4.13.13](https://github.com/honojs/hono/releases/tag/v4.13.13) | 32428 | Express (full), Koa (full) |
| [Elysia](https://github.com/elysiajs/elysia) | TypeScript | MIT | [1.4.30](https://github.com/elysiajs/elysia/releases/tag/1.4.30) signed | 19219 | Express (full) |
| [AdonisJS](https://github.com/adonisjs/core) | TypeScript | MIT | [v7.6.0](https://github.com/adonisjs/core/releases/tag/v7.6.0) | 19142 | NestJS (full) |
| [hapi](https://github.com/hapijs/hapi) | JavaScript | Other | [v21.3.0](https://github.com/hapijs/hapi/releases/tag/v21.3.0) | 14788 | Express (full) |

</details>

<details>
<summary><b>TypeScript ORMs</b>, 7 tools</summary>

Typed database access and migrations for TypeScript.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Prisma ORM](https://github.com/prisma/orm) | TypeScript | Apache-2.0 | [v0.17.0](https://github.com/prisma/orm/releases/tag/v0.17.0) signed | 47702 | TypeORM (full), Sequelize (full) |
| [TypeORM](https://github.com/typeorm/typeorm) | TypeScript | MIT | [1.1.1](https://github.com/typeorm/typeorm/releases/tag/1.1.1) signed | 36663 | none |
| [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm) | TypeScript | Apache-2.0 | [drizzle-kit@0.31.11](https://github.com/drizzle-team/drizzle-orm/releases/tag/drizzle-kit%400.31.11) signed | 35965 | Prisma ORM (full), TypeORM (full), Sequelize (full) |
| [Sequelize](https://github.com/sequelize/sequelize) | TypeScript | MIT | [v6.37.8](https://github.com/sequelize/sequelize/releases/tag/v6.37.8) | 30358 | none |
| [Knex](https://github.com/knex/knex) | JavaScript | MIT | [3.3.0](https://github.com/knex/knex/releases/tag/3.3.0) | 20340 | Sequelize (partial), TypeORM (partial) |
| [Kysely](https://github.com/kysely-org/kysely) | TypeScript | MIT | [v0.29.6](https://github.com/kysely-org/kysely/releases/tag/v0.29.6) | 14263 | TypeORM (partial), Sequelize (partial), Prisma ORM (partial) |
| [MikroORM](https://github.com/mikro-orm/mikro-orm) | TypeScript | MIT | [v7.2.4](https://github.com/mikro-orm/mikro-orm/releases/tag/v7.2.4) | 9246 | TypeORM (full), Sequelize (full) |

</details>

<details>
<summary><b>Object storage</b>, 5 tools</summary>

Self-hosted servers speaking the S3 API.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [MinIO](https://github.com/minio/minio) archived | Go | AGPL-3.0 | [RELEASE.2025-10-15T17-29-55Z](https://github.com/minio/minio/releases/tag/RELEASE.2025-10-15T17-29-55Z) | 61337 | none |
| [SeaweedFS](https://github.com/seaweedfs/seaweedfs) | Go | Apache-2.0 | [4.48](https://github.com/seaweedfs/seaweedfs/releases/tag/4.48) | 35271 | MinIO (full), Amazon S3 (full) |
| [RustFS](https://github.com/rustfs/rustfs) | Rust | Apache-2.0 | [1.0.1](https://github.com/rustfs/rustfs/releases/tag/1.0.1) | 34460 | MinIO (full), Amazon S3 (full) |
| [Ceph](https://github.com/ceph/ceph) | C++ | Other | [v21.3.0](https://github.com/ceph/ceph/releases/tag/v21.3.0) | 17096 | MinIO (full), Amazon S3 (full) |
| [Garage](https://github.com/deuxfleurs-org/garage) | Rust | AGPL-3.0 | [v2.4.1](https://github.com/deuxfleurs-org/garage/releases/tag/v2.4.1) | 4650 | Amazon S3 (partial), MinIO (partial) |

</details>

<details>
<summary><b>CI servers</b>, 10 tools</summary>

Self-hosted servers that run build and deployment pipelines.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [act](https://github.com/nektos/act) | Go | MIT | [v0.2.89](https://github.com/nektos/act/releases/tag/v0.2.89) | 72227 | none |
| [Jenkins](https://github.com/jenkinsci/jenkins) | Java | MIT | [jenkins-2.585](https://github.com/jenkinsci/jenkins/releases/tag/jenkins-2.585) | 26621 | CircleCI (full) |
| [Dagger](https://github.com/dagger/dagger) | Go | Apache-2.0 | [v0.21.10](https://github.com/dagger/dagger/releases/tag/v0.21.10) signed | 16320 | none |
| [Tekton](https://github.com/tektoncd/pipeline) | Go | Apache-2.0 | [v1.17.0](https://github.com/tektoncd/pipeline/releases/tag/v1.17.0) | 9076 | Jenkins (partial) |
| [Woodpecker CI](https://github.com/woodpecker-ci/woodpecker) | Go | Apache-2.0 | [v3.18.1](https://github.com/woodpecker-ci/woodpecker/releases/tag/v3.18.1) signed | 7960 | Jenkins (full), CircleCI (full) |
| [Concourse](https://github.com/concourse/concourse) | Go | Apache-2.0 | [v8.3.1](https://github.com/concourse/concourse/releases/tag/v8.3.1) signed | 7912 | Jenkins (full), CircleCI (full) |
| [GoCD](https://github.com/gocd/gocd) | Java | Apache-2.0 | [26.1.0](https://github.com/gocd/gocd/releases/tag/26.1.0) signed | 7432 | Jenkins (full), CircleCI (full) |
| [Actions Runner Controller](https://github.com/actions/actions-runner-controller) | Go | Apache-2.0 | [gha-runner-scale-set-0.15.0](https://github.com/actions/actions-runner-controller/releases/tag/gha-runner-scale-set-0.15.0) signed | 6545 | none |
| [Buildbot](https://github.com/buildbot/buildbot) | Python | GPL-2.0 | [v4.3.0](https://github.com/buildbot/buildbot/releases/tag/v4.3.0) signed | 5478 | Jenkins (full) |
| [Jenkins X](https://github.com/jenkins-x/jx) | Go | Apache-2.0 | [v3.17.111](https://github.com/jenkins-x/jx/releases/tag/v3.17.111) | 4690 | CircleCI (partial) |

</details>

<details>
<summary><b>Git forges</b>, 7 tools</summary>

Self-hosted repositories, code review and issues.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Gitea](https://github.com/go-gitea/gitea) | Go | MIT | [v28.0.0](https://github.com/go-gitea/gitea/releases/tag/v28.0.0) signed | 58332 | GitLab (full), GitHub (full), Jenkins (partial), Bitbucket (full), Gogs (full) |
| [Gogs](https://github.com/gogs/gogs) | Go | MIT | [v0.14.3](https://github.com/gogs/gogs/releases/tag/v0.14.3) signed | 47860 | GitHub (partial), Bitbucket (partial) |
| [Harness Open Source](https://github.com/harness/harness) | Go | Apache-2.0 | [v2.28.2](https://github.com/harness/harness/releases/tag/v2.28.2) | 38494 | GitHub (full), GitLab (full) |
| [GitLab](https://github.com/gitlabhq/gitlabhq) | Ruby | Other | [v19.4.1](https://github.com/gitlabhq/gitlabhq/releases/tag/v19.4.1) | 24555 | GitHub (full), Jenkins (partial), Bitbucket (full) |
| [OneDev](https://github.com/theonedev/onedev) | Java | MIT | [v16.8.4](https://github.com/theonedev/onedev/releases/tag/v16.8.4) | 15282 | GitLab (full), GitHub (full), Jenkins (partial), Bitbucket (full) |
| [GitBucket](https://github.com/gitbucket/gitbucket) | Scala | Apache-2.0 | [4.48.0](https://github.com/gitbucket/gitbucket/releases/tag/4.48.0) | 9403 | GitHub (partial) |
| [Soft Serve](https://github.com/charmbracelet/soft-serve) | Go | MIT | [v0.12.3](https://github.com/charmbracelet/soft-serve/releases/tag/v0.12.3) signed | 7248 | GitHub (partial) |

</details>

<details>
<summary><b>Password manager servers</b>, 5 tools</summary>

Self-hosted back ends for password vaults.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Vaultwarden](https://github.com/dani-garcia/vaultwarden) | Rust | AGPL-3.0 | [1.37.4](https://github.com/dani-garcia/vaultwarden/releases/tag/1.37.4) signed | 68612 | Bitwarden server (drop-in), 1Password (full), LastPass (full), Dashlane (full) |
| [Bitwarden server](https://github.com/bitwarden/server) | C# | Other | [v2026.9.2](https://github.com/bitwarden/server/releases/tag/v2026.9.2) signed | 20245 | 1Password (full), LastPass (full), Dashlane (full) |
| [Passbolt](https://github.com/passbolt/passbolt_api) | PHP | AGPL-3.0 | [v5.16.0](https://github.com/passbolt/passbolt_api/releases/tag/v5.16.0) signed | 6149 | 1Password (full), LastPass (full), Dashlane (full) |
| [AliasVault](https://github.com/aliasvault/aliasvault) | TypeScript | AGPL-3.0 | [0.30.7](https://github.com/aliasvault/aliasvault/releases/tag/0.30.7) signed | 3160 | 1Password (partial) |
| [TeamPass](https://github.com/nilsteampassnet/TeamPass) | PHP | GPL-3.0 | [3.2.2.7](https://github.com/nilsteampassnet/TeamPass/releases/tag/3.2.2.7) | 1831 | none |

</details>

<details>
<summary><b>Web analytics</b>, 14 tools</summary>

Self-hostable, privacy-friendly site analytics.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [PostHog](https://github.com/PostHog/posthog) | Python | Other | [desktop-v0.61.653](https://github.com/PostHog/posthog/releases/tag/desktop-v0.61.653) | 40166 | Google Analytics (full), Mixpanel (full), Hotjar (full), Amplitude (full) |
| [Umami](https://github.com/umami-software/umami) | TypeScript | MIT | [v3.4.0](https://github.com/umami-software/umami/releases/tag/v3.4.0) signed | 39201 | Matomo (full), Google Analytics (partial) |
| [Plausible Analytics](https://github.com/plausible/analytics) | Elixir | AGPL-3.0 | [v3.2.1](https://github.com/plausible/analytics/releases/tag/v3.2.1) | 29328 | Matomo (full), Google Analytics (partial) |
| [Matomo](https://github.com/matomo-org/matomo) | PHP | GPL-3.0 | [5.14.1](https://github.com/matomo-org/matomo/releases/tag/5.14.1) | 21927 | Google Analytics (full) |
| [GoAccess](https://github.com/allinurl/goaccess) | C | MIT | [v1.12](https://github.com/allinurl/goaccess/releases/tag/v1.12) | 21002 | Google Analytics (partial) |
| [Rybbit](https://github.com/rybbit-io/rybbit) | TypeScript | AGPL-3.0 | [v2.9.0](https://github.com/rybbit-io/rybbit/releases/tag/v2.9.0) | 13099 | Google Analytics (full) |
| [OpenReplay](https://github.com/openreplay/openreplay) | TypeScript | Other | [v1.28.0](https://github.com/openreplay/openreplay/releases/tag/v1.28.0) signed | 12948 | Hotjar (partial), Mixpanel (partial), Amplitude (partial) |
| [OpenPanel](https://github.com/Openpanel-dev/openpanel) | TypeScript | AGPL-3.0 | [v2.3.0](https://github.com/Openpanel-dev/openpanel/releases/tag/v2.3.0) | 7095 | Mixpanel (full), Amplitude (full) |
| [GoatCounter](https://github.com/arp242/goatcounter) | Go | Other | [v2.7.0](https://github.com/arp242/goatcounter/releases/tag/v2.7.0) signed | 6040 | Google Analytics (partial) |
| [Countly](https://github.com/Countly/countly-server) | JavaScript | Other | [25.03.53-LTS](https://github.com/Countly/countly-server/releases/tag/25.03.53-LTS) signed | 5911 | Mixpanel (partial), Amplitude (partial) |
| [Ackee](https://github.com/electerious/Ackee) | JavaScript | MIT | [v3.6.1](https://github.com/electerious/Ackee/releases/tag/v3.6.1) | 4713 | Google Analytics (partial) |
| [Swetrix](https://github.com/Swetrix/swetrix) | TypeScript | AGPL-3.0 | [tracker-node@3.5.0](https://github.com/Swetrix/swetrix/releases/tag/tracker-node%403.5.0) | 1204 | Google Analytics (partial) |
| [counter.dev](https://github.com/ihucos/counter.dev) | JavaScript | AGPL-3.0 | none | 1010 | Google Analytics (partial) |
| [Medama](https://github.com/medama-io/medama) | Go | none | [v0.6.2](https://github.com/medama-io/medama/releases/tag/v0.6.2) signed | 643 | Google Analytics (partial) |

</details>

<details>
<summary><b>Uptime monitoring</b>, 13 tools</summary>

Check that services answer, alert when they do not, and publish a status page.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Uptime Kuma](https://github.com/louislam/uptime-kuma) | JavaScript | MIT | [2.5.5](https://github.com/louislam/uptime-kuma/releases/tag/2.5.5) signed | 92164 | Pingdom (full), Statuspage (full), Cronitor (partial) |
| [Upptime](https://github.com/upptime/upptime) | Markdown | MIT | [v2.0.0](https://github.com/upptime/upptime/releases/tag/v2.0.0) signed | 17180 | Pingdom (partial), Statuspage (full) |
| [Cachet](https://github.com/cachethq/cachet) | PHP | Other | [v2.4.1](https://github.com/cachethq/cachet/releases/tag/v2.4.1) | 15259 | Statuspage (full) |
| [Gatus](https://github.com/TwiN/gatus) | Go | Apache-2.0 | [v5.37.0](https://github.com/TwiN/gatus/releases/tag/v5.37.0) signed | 12250 | Uptime Kuma (full), Pingdom (full), Statuspage (full), Cronitor (partial) |
| [Checkmate](https://github.com/bluewave-labs/Checkmate) | TypeScript | AGPL-3.0 | [v3.12.0](https://github.com/bluewave-labs/Checkmate/releases/tag/v3.12.0) signed | 10913 | Pingdom (full), Statuspage (full) |
| [Healthchecks](https://github.com/healthchecks/healthchecks) | Python | BSD-3-Clause | [v4.4](https://github.com/healthchecks/healthchecks/releases/tag/v4.4) signed | 10387 | Cronitor (partial) |
| [OpenStatus](https://github.com/openstatusHQ/openstatus) | TypeScript | AGPL-3.0 | none | 9171 | Statuspage (full), UptimeRobot (full) |
| [OneUptime](https://github.com/OneUptime/oneuptime) | TypeScript | Other | [14.0.14](https://github.com/OneUptime/oneuptime/releases/tag/14.0.14) | 7706 | Pingdom (full), Statuspage (full), PagerDuty (full), Cronitor (full) |
| [Kener](https://github.com/rajnandan1/kener) | TypeScript | MIT | [v4.1.6](https://github.com/rajnandan1/kener/releases/tag/v4.1.6) | 5192 | Statuspage (full) |
| [cState](https://github.com/cstate/cstate) | HTML | MIT | [6.0.1](https://github.com/cstate/cstate/releases/tag/6.0.1) signed | 2898 | Statuspage (partial) |
| [Vigil](https://github.com/valeriansaliou/vigil) | Rust | MPL-2.0 | [v1.29.0](https://github.com/valeriansaliou/vigil/releases/tag/v1.29.0) signed | 1951 | Statuspage (partial) |
| [Peekaping](https://github.com/0xfurai/peekaping) | Go | MIT | [0.0.46](https://github.com/0xfurai/peekaping/releases/tag/0.0.46) | 1202 | UptimeRobot (full), Uptime Kuma (full) |
| [Kuvasz](https://github.com/kuvasz-uptime/kuvasz) | Kotlin | AGPL-3.0 | [4.4.0](https://github.com/kuvasz-uptime/kuvasz/releases/tag/4.4.0) signed | 637 | UptimeRobot (partial) |

</details>

<details>
<summary><b>Log pipelines</b>, 9 tools</summary>

Collect, transform and ship logs and events.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Vector](https://github.com/vectordotdev/vector) | Rust | MPL-2.0 | [vdev-v0.3.27](https://github.com/vectordotdev/vector/releases/tag/vdev-v0.3.27) signed | 22673 | Logstash (full), Fluentd (full) |
| [Logstash](https://github.com/elastic/logstash) | Java | Other | [v9.5.5](https://github.com/elastic/logstash/releases/tag/v9.5.5) signed | 14960 | none |
| [Fluentd](https://github.com/fluent/fluentd) | Ruby | Apache-2.0 | [v1.19.4](https://github.com/fluent/fluentd/releases/tag/v1.19.4) | 13598 | none |
| [Beats](https://github.com/elastic/beats) | Go | Other | [v9.5.5](https://github.com/elastic/beats/releases/tag/v9.5.5) signed | 12659 | none |
| [Fluent Bit](https://github.com/fluent/fluent-bit) | C | Apache-2.0 | [v5.1.3](https://github.com/fluent/fluent-bit/releases/tag/v5.1.3) | 8134 | Logstash (full), Fluentd (full) |
| [OpenTelemetry Collector](https://github.com/open-telemetry/opentelemetry-collector) | Go | Apache-2.0 | [v0.162.0](https://github.com/open-telemetry/opentelemetry-collector/releases/tag/v0.162.0) signed | 7636 | Logstash (partial), Fluentd (partial) |
| [Grafana Alloy](https://github.com/grafana/alloy) | Go | Apache-2.0 | [v1.20.1](https://github.com/grafana/alloy/releases/tag/v1.20.1) signed | 3580 | OpenTelemetry Collector (full) |
| [syslog-ng](https://github.com/syslog-ng/syslog-ng) | C | Other | [syslog-ng-4.12.0](https://github.com/syslog-ng/syslog-ng/releases/tag/syslog-ng-4.12.0) signed | 2378 | rsyslog (full) |
| [rsyslog](https://github.com/rsyslog/rsyslog) | C | LGPL-3.0 | [v8.2608.0](https://github.com/rsyslog/rsyslog/releases/tag/v8.2608.0) signed | 2336 | none |

</details>

<details>
<summary><b>Team chat</b>, 18 tools</summary>

Self-hosted messaging for teams.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Rocket.Chat](https://github.com/RocketChat/Rocket.Chat) | TypeScript | Other | [8.9.0](https://github.com/RocketChat/Rocket.Chat/releases/tag/8.9.0) | 46217 | Mattermost (full), Slack (full), Microsoft Teams (partial) |
| [Mattermost](https://github.com/mattermost/mattermost) | TypeScript | Other | [v11.11.1](https://github.com/mattermost/mattermost/releases/tag/v11.11.1) signed | 39281 | Slack (full), Microsoft Teams (partial) |
| [Zulip](https://github.com/zulip/zulip) | Python | Apache-2.0 | [12.3](https://github.com/zulip/zulip/releases/tag/12.3) | 25999 | Mattermost (full), Slack (full) |
| [Tinode](https://github.com/tinode/chat) | Go | GPL-3.0 | [v0.25.3](https://github.com/tinode/chat/releases/tag/v0.25.3) | 13529 | WhatsApp (partial) |
| [Fluxer](https://github.com/fluxerapp/fluxer) | TypeScript | AGPL-3.0 | [fluxer-app-proxy@2026.1006.1600](https://github.com/fluxerapp/fluxer/releases/tag/fluxer-app-proxy%402026.1006.1600) signed | 10492 | Discord (full) |
| [Mumble](https://github.com/mumble-voip/mumble) | C++ | Other | [v1.5.915](https://github.com/mumble-voip/mumble/releases/tag/v1.5.915) | 8323 | Discord (partial) |
| [ejabberd](https://github.com/processone/ejabberd) | Erlang | Other | [26.09](https://github.com/processone/ejabberd/releases/tag/26.09) | 6736 | Slack (partial) |
| [Campfire](https://github.com/basecamp/once-campfire) | Ruby | MIT | [v1.5.1](https://github.com/basecamp/once-campfire/releases/tag/v1.5.1) signed | 4741 | Slack (partial) |
| [Synapse](https://github.com/element-hq/synapse) | Python | AGPL-3.0 | [v1.162.0](https://github.com/element-hq/synapse/releases/tag/v1.162.0) signed | 4681 | Slack (partial), Microsoft Teams (partial), Discord (partial) |
| [Stoat](https://github.com/stoatchat/stoatchat) | Rust | Other | [v0.15.7](https://github.com/stoatchat/stoatchat/releases/tag/v0.15.7) | 3379 | Discord (full) |
| [Openfire](https://github.com/igniterealtime/Openfire) | Java | Apache-2.0 | [v5.1.2](https://github.com/igniterealtime/Openfire/releases/tag/v5.1.2) signed | 3068 | Slack (partial) |
| [Wire Server](https://github.com/wireapp/wire-server) | Haskell | AGPL-3.0 | [v2026-10-05](https://github.com/wireapp/wire-server/releases/tag/v2026-10-05) signed | 2781 | Slack (partial), Microsoft Teams (partial) |
| [Tuwunel](https://github.com/matrix-construct/tuwunel) | Rust | Apache-2.0 | [v1.9.3](https://github.com/matrix-construct/tuwunel/releases/tag/v1.9.3) signed | 2594 | Synapse (full) |
| [Spacebar](https://github.com/spacebarchat/server) | TypeScript | AGPL-3.0 | none | 2202 | Discord (partial) |
| [MongooseIM](https://github.com/esl/MongooseIM) | Erlang | Other | [6.9.0](https://github.com/esl/MongooseIM/releases/tag/6.9.0) | 1757 | Slack (partial) |
| [Dendrite](https://github.com/element-hq/dendrite) | Go | AGPL-3.0 | [v0.15.2](https://github.com/element-hq/dendrite/releases/tag/v0.15.2) | 976 | Synapse (partial) |
| [Raven](https://github.com/frappe/raven) | TypeScript | AGPL-3.0 | [v3.0.0](https://github.com/frappe/raven/releases/tag/v3.0.0) signed | 810 | Slack (partial) |
| [Snikket](https://github.com/snikket-im/snikket-server) | Lua | Apache-2.0 | [stable.20260611](https://github.com/snikket-im/snikket-server/releases/tag/stable.20260611) | 464 | WhatsApp (partial) |

</details>

<details>
<summary><b>Terminal emulators</b>, 14 tools</summary>

Desktop terminal applications.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Windows Terminal](https://github.com/microsoft/terminal) | C++ | MIT | [v1.25.2733.0](https://github.com/microsoft/terminal/releases/tag/v1.25.2733.0) | 105092 | Warp (partial) |
| [Tabby](https://github.com/Eugeny/tabby) | TypeScript | MIT | [v1.0.237](https://github.com/Eugeny/tabby/releases/tag/v1.0.237) | 74840 | iTerm2 (full), Warp (partial) |
| [Alacritty](https://github.com/alacritty/alacritty) | Rust | Apache-2.0 | [v0.17.0](https://github.com/alacritty/alacritty/releases/tag/v0.17.0) signed | 65892 | iTerm2 (partial), Warp (partial) |
| [Termux](https://github.com/termux/termux-app) | Java | Other | [v0.118.3](https://github.com/termux/termux-app/releases/tag/v0.118.3) signed | 62095 | none |
| [Ghostty](https://github.com/ghostty-org/ghostty) | Zig | MIT | [v1.3.1](https://github.com/ghostty-org/ghostty/releases/tag/v1.3.1) signed | 61903 | iTerm2 (full), Warp (partial) |
| [Hyper](https://github.com/vercel/hyper) | TypeScript | MIT | [v3.4.1](https://github.com/vercel/hyper/releases/tag/v3.4.1) | 44741 | iTerm2 (full), Warp (partial) |
| [kitty](https://github.com/kovidgoyal/kitty) | Python | GPL-3.0 | [v0.49.2](https://github.com/kovidgoyal/kitty/releases/tag/v0.49.2) signed | 35180 | iTerm2 (full), Warp (partial) |
| [WezTerm](https://github.com/wezterm/wezterm) | Rust | Other | [20240203-110809-5046fc22](https://github.com/wezterm/wezterm/releases/tag/20240203-110809-5046fc22) signed | 29138 | iTerm2 (full), Warp (partial), tmux (partial) |
| [Wave Terminal](https://github.com/wavetermdev/waveterm) | Go | Apache-2.0 | [v0.14.5](https://github.com/wavetermdev/waveterm/releases/tag/v0.14.5) signed | 22431 | Warp (full), iTerm2 (full) |
| [iTerm2](https://github.com/gnachman/iTerm2) | Swift | GPL-2.0 | [v3.7.4](https://github.com/gnachman/iTerm2/releases/tag/v3.7.4) | 18126 | none |
| [electerm](https://github.com/electerm/electerm) | JavaScript | MIT | [v5.5.66](https://github.com/electerm/electerm/releases/tag/v5.5.66) | 15278 | Termius (partial) |
| [Rio](https://github.com/raphamorim/rio) | Rust | MIT | [v0.5.28](https://github.com/raphamorim/rio/releases/tag/v0.5.28) | 7581 | none |
| [Contour](https://github.com/contour-terminal/contour) | C++ | Apache-2.0 | [v0.7.0.8982](https://github.com/contour-terminal/contour/releases/tag/v0.7.0.8982) signed | 3038 | none |
| [Terminator](https://github.com/gnome-terminator/terminator) | Python | GPL-2.0 | [v2.1.6](https://github.com/gnome-terminator/terminator/releases/tag/v2.1.6) signed | 2680 | none |

</details>

<details>
<summary><b>Code editors</b>, 27 tools</summary>

Editors for writing code.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Visual Studio Code](https://github.com/microsoft/vscode) | TypeScript | MIT | [1.140.0](https://github.com/microsoft/vscode/releases/tag/1.140.0) signed | 193603 | Atom (full) |
| [Neovim](https://github.com/neovim/neovim) | Vim Script | Other | [v0.12.5](https://github.com/neovim/neovim/releases/tag/v0.12.5) signed | 102886 | Vim (drop-in) |
| [Zed](https://github.com/zed-industries/zed) | Rust | Other | [v1.22.0](https://github.com/zed-industries/zed/releases/tag/v1.22.0) signed | 91358 | Visual Studio Code (full), Cursor (partial), Sublime Text (full), Atom (full) |
| [Atom](https://github.com/atom/atom) archived | JavaScript | MIT | [v1.60.0](https://github.com/atom/atom/releases/tag/v1.60.0) | 60719 | none |
| [Helix](https://github.com/helix-editor/helix) | Rust | MPL-2.0 | [25.07.1](https://github.com/helix-editor/helix/releases/tag/25.07.1) signed | 46486 | Vim (partial), Neovim (partial) |
| [Vim](https://github.com/vim/vim) | Vim Script | Vim | [v9.2.1167](https://github.com/vim/vim/releases/tag/v9.2.1167) signed | 41152 | none |
| [Lapce](https://github.com/lapce/lapce) | Rust | Apache-2.0 | [v0.4.6](https://github.com/lapce/lapce/releases/tag/v0.4.6) signed | 38901 | Visual Studio Code (partial), Sublime Text (full) |
| [VSCodium](https://github.com/VSCodium/vscodium) | Shell | MIT | [1.135.06055](https://github.com/VSCodium/vscodium/releases/tag/1.135.06055) signed | 33524 | Visual Studio Code (drop-in) |
| [micro](https://github.com/micro-editor/micro) | Go | MIT | [v2.0.15](https://github.com/micro-editor/micro/releases/tag/v2.0.15) | 29672 | none |
| [Notepad++](https://github.com/notepad-plus-plus/notepad-plus-plus) | C++ | Other | [v8.9.8.1](https://github.com/notepad-plus-plus/notepad-plus-plus/releases/tag/v8.9.8.1) | 29472 | Sublime Text (partial) |
| [NvChad](https://github.com/NvChad/NvChad) | Lua | GPL-3.0 | [v2.5](https://github.com/NvChad/NvChad/releases/tag/v2.5) | 28509 | none |
| [LazyVim](https://github.com/LazyVim/LazyVim) | Lua | Apache-2.0 | [v16.0.1](https://github.com/LazyVim/LazyVim/releases/tag/v16.0.1) signed | 27612 | none |
| [Spacemacs](https://github.com/syl20bnr/spacemacs) | Emacs Lisp | GPL-3.0 | [v0.200.13](https://github.com/syl20bnr/spacemacs/releases/tag/v0.200.13) | 24541 | none |
| [Doom Emacs](https://github.com/doomemacs/core) | Emacs Lisp | MIT | [v2.2.4](https://github.com/doomemacs/core/releases/tag/v2.2.4) signed | 22728 | none |
| [Eclipse Theia](https://github.com/eclipse-theia/theia) | TypeScript | EPL-2.0 | [v1.76.0](https://github.com/eclipse-theia/theia/releases/tag/v1.76.0) signed | 21707 | Visual Studio Code (partial) |
| [IntelliJ IDEA open-source build](https://github.com/JetBrains/intellij-community) | Java | Other | [pycharm/2026.2.3](https://github.com/JetBrains/intellij-community/releases/tag/pycharm/2026.2.3) | 20611 | IntelliJ IDEA (partial) |
| [NotepadNext](https://github.com/dail8859/NotepadNext) | C++ | GPL-3.0 | [v0.15](https://github.com/dail8859/NotepadNext/releases/tag/v0.15) | 14659 | Notepad++ (full) |
| [AstroNvim](https://github.com/AstroNvim/AstroNvim) | Lua | GPL-3.0 | [v6.1.0](https://github.com/AstroNvim/AstroNvim/releases/tag/v6.1.0) | 14455 | none |
| [Kakoune](https://github.com/mawww/kakoune) | C++ | Unlicense | [v2026.05.21](https://github.com/mawww/kakoune/releases/tag/v2026.05.21) | 11089 | Vim (partial) |
| [Spyder](https://github.com/spyder-ide/spyder) | Python | MIT | [v6.1.7](https://github.com/spyder-ide/spyder/releases/tag/v6.1.7) | 9350 | none |
| [CotEditor](https://github.com/coteditor/CotEditor) | Swift | Other | [7.1.1](https://github.com/coteditor/CotEditor/releases/tag/7.1.1) | 8544 | none |
| [RStudio](https://github.com/rstudio/rstudio) | Java | Other | [v2026.09.0+174](https://github.com/rstudio/rstudio/releases/tag/v2026.09.0%2B174) signed | 5081 | none |
| [Pulsar](https://github.com/pulsar-edit/pulsar) | JavaScript | Other | [v1.132.1](https://github.com/pulsar-edit/pulsar/releases/tag/v1.132.1) | 4163 | Atom (drop-in), Sublime Text (full) |
| [Geany](https://github.com/geany/geany) | C | GPL-2.0 | [2.1.0](https://github.com/geany/geany/releases/tag/2.1.0) signed | 3725 | Sublime Text (partial) |
| [Arduino IDE](https://github.com/arduino/arduino-ide) | TypeScript | AGPL-3.0 | [2.3.10](https://github.com/arduino/arduino-ide/releases/tag/2.3.10) | 3284 | none |
| [CudaText](https://github.com/Alexey-T/CudaText) | Python | MPL-2.0 | [1.237.1.1](https://github.com/Alexey-T/CudaText/releases/tag/1.237.1.1) | 3219 | Sublime Text (full) |
| [Apache NetBeans](https://github.com/apache/netbeans) | Java | Apache-2.0 | [31](https://github.com/apache/netbeans/releases/tag/31) | 3140 | IntelliJ IDEA (partial) |

</details>

<details>
<summary><b>File listing</b>, 5 tools</summary>

Replacements for ls with colours, icons and git status.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [exa](https://github.com/ogham/exa) | Rust | MIT | [v0.10.1](https://github.com/ogham/exa/releases/tag/v0.10.1) | 24448 | none |
| [eza](https://github.com/eza-community/eza) | Rust | EUPL-1.2 | [v0.23.5](https://github.com/eza-community/eza/releases/tag/v0.23.5) signed | 23484 | exa (drop-in) |
| [lsd](https://github.com/lsd-rs/lsd) | Rust | Apache-2.0 | [v1.2.0](https://github.com/lsd-rs/lsd/releases/tag/v1.2.0) signed | 16253 | exa (full) |
| [broot](https://github.com/Canop/broot) | Rust | MIT | [v1.61.0](https://github.com/Canop/broot/releases/tag/v1.61.0) | 13044 | exa (partial) |
| [colorls](https://github.com/athityakumar/colorls) | Ruby | MIT | [v1.5.0](https://github.com/athityakumar/colorls/releases/tag/v1.5.0) | 5140 | exa (full) |

</details>

<details>
<summary><b>Git diff pagers</b>, 6 tools</summary>

Make git diff output readable in a terminal.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [delta](https://github.com/dandavison/delta) | Rust | MIT | [0.20.1](https://github.com/dandavison/delta/releases/tag/0.20.1) | 32428 | diff-so-fancy (full) |
| [Difftastic](https://github.com/Wilfred/difftastic) | Rust | MIT | [0.71.0](https://github.com/Wilfred/difftastic/releases/tag/0.71.0) | 25984 | diff-so-fancy (partial) |
| [diff-so-fancy](https://github.com/so-fancy/diff-so-fancy) | Perl | MIT | [v1.4.14](https://github.com/so-fancy/diff-so-fancy/releases/tag/v1.4.14) | 18101 | none |
| [icdiff](https://github.com/jeffkaufman/icdiff) | Python | Other | [release-2.0.10](https://github.com/jeffkaufman/icdiff/releases/tag/release-2.0.10) | 4389 | diff-so-fancy (partial) |
| [git-split-diffs](https://github.com/banga/git-split-diffs) | TypeScript | MIT | [v2.3.0](https://github.com/banga/git-split-diffs/releases/tag/v2.3.0) | 2744 | diff-so-fancy (partial) |
| [riff](https://github.com/walles/riff) | Rust | MIT | [3.6.2](https://github.com/walles/riff/releases/tag/3.6.2) | 530 | diff-so-fancy (partial) |

</details>

<details>
<summary><b>JSON processors</b>, 9 tools</summary>

Query and transform JSON from the command line.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [jq](https://github.com/jqlang/jq) | C | Other | [jq-1.8.2](https://github.com/jqlang/jq/releases/tag/jq-1.8.2) signed | 35750 | none |
| [fx](https://github.com/antonmedv/fx) | Go | MIT | [40.0.0](https://github.com/antonmedv/fx/releases/tag/40.0.0) signed | 20646 | jq (partial) |
| [yq](https://github.com/mikefarah/yq) | Go | MIT | [v4.54.1](https://github.com/mikefarah/yq/releases/tag/v4.54.1) | 16061 | jq (partial) |
| [jc](https://github.com/kellyjonbrazil/jc) | Python | MIT | [v1.26.0](https://github.com/kellyjonbrazil/jc/releases/tag/v1.26.0) signed | 8691 | none |
| [dasel](https://github.com/TomWright/dasel) | Go | MIT | [v3.11.2](https://github.com/TomWright/dasel/releases/tag/v3.11.2) | 8045 | jq (partial), yq (partial) |
| [jnv](https://github.com/ynqa/jnv) | Rust | MIT | [v0.7.1](https://github.com/ynqa/jnv/releases/tag/v0.7.1) signed | 6125 | jq (partial) |
| [jless](https://github.com/PaulJuliusMartinez/jless) | Rust | MIT | [v0.9.0](https://github.com/PaulJuliusMartinez/jless/releases/tag/v0.9.0) | 5505 | none |
| [gojq](https://github.com/itchyny/gojq) | Go | MIT | [v0.12.19](https://github.com/itchyny/gojq/releases/tag/v0.12.19) | 3808 | jq (drop-in) |
| [jaq](https://github.com/01mf02/jaq) | Rust | MIT | [v3.1.1](https://github.com/01mf02/jaq/releases/tag/v3.1.1) | 3787 | jq (full) |

</details>

<details>
<summary><b>Load testing</b>, 14 tools</summary>

Generate traffic to measure how a service holds up.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [k6](https://github.com/grafana/k6) | Go | AGPL-3.0 | [v2.3.0](https://github.com/grafana/k6/releases/tag/v2.3.0) | 31811 | Apache JMeter (full), Gatling (full) |
| [Locust](https://github.com/locustio/locust) | Python | MIT | [2.46.7](https://github.com/locustio/locust/releases/tag/2.46.7) signed | 28199 | Apache JMeter (full), Gatling (full) |
| [Vegeta](https://github.com/tsenart/vegeta) | Go | MIT | [v12.13.0](https://github.com/tsenart/vegeta/releases/tag/v12.13.0) | 25217 | Apache JMeter (partial) |
| [oha](https://github.com/hatoo/oha) | Rust | MIT | [v1.16.0](https://github.com/hatoo/oha/releases/tag/v1.16.0) signed | 10578 | none |
| [Apache JMeter](https://github.com/apache/jmeter) | Java | Apache-2.0 | [rel/v5.6.3](https://github.com/apache/jmeter/releases/tag/rel/v5.6.3) | 9552 | none |
| [Artillery](https://github.com/artilleryio/artillery) | TypeScript | MPL-2.0 | [artillery-2.0.34](https://github.com/artilleryio/artillery/releases/tag/artillery-2.0.34) signed | 9091 | Apache JMeter (full), Gatling (full) |
| [autocannon](https://github.com/mcollina/autocannon) | JavaScript | MIT | [v8.0.0](https://github.com/mcollina/autocannon/releases/tag/v8.0.0) | 8527 | none |
| [Gatling](https://github.com/gatling/gatling) | Scala | Apache-2.0 | [v3.16.0](https://github.com/gatling/gatling/releases/tag/v3.16.0) | 6958 | none |
| [bombardier](https://github.com/codesenberg/bombardier) | Go | MIT | [v2.0.2](https://github.com/codesenberg/bombardier/releases/tag/v2.0.2) | 6839 | none |
| [Siege](https://github.com/JoeDog/siege) | C | GPL-3.0 | [v.2.4.0](https://github.com/JoeDog/siege/releases/tag/v.2.4.0) | 6214 | none |
| [Fortio](https://github.com/fortio/fortio) | Go | Apache-2.0 | [v1.75.3](https://github.com/fortio/fortio/releases/tag/v1.75.3) signed | 3731 | none |
| [ghz](https://github.com/bojand/ghz) | Go | Apache-2.0 | [v0.121.0](https://github.com/bojand/ghz/releases/tag/v0.121.0) | 3358 | none |
| [Yandex Tank](https://github.com/yandex/yandex-tank) | Python | Other | [Python2](https://github.com/yandex/yandex-tank/releases/tag/Python2) signed | 2599 | none |
| [Taurus](https://github.com/Blazemeter/taurus) | Python | Apache-2.0 | [1.16.51](https://github.com/Blazemeter/taurus/releases/tag/1.16.51) | 2117 | none |

</details>

<details>
<summary><b>Browser automation and testing</b>, 8 tools</summary>

Drive real browsers for end-to-end tests.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Playwright](https://github.com/microsoft/playwright) | TypeScript | Apache-2.0 | [v1.63.0](https://github.com/microsoft/playwright/releases/tag/v1.63.0) signed | 97178 | Selenium (full), Puppeteer (full), Cypress (full) |
| [Puppeteer](https://github.com/puppeteer/puppeteer) | TypeScript | Apache-2.0 | [browsers-v3.2.3](https://github.com/puppeteer/puppeteer/releases/tag/browsers-v3.2.3) signed | 95665 | none |
| [Cypress](https://github.com/cypress-io/cypress) | TypeScript | MIT | [v16.1.1](https://github.com/cypress-io/cypress/releases/tag/v16.1.1) | 51042 | Selenium (partial) |
| [Selenium](https://github.com/SeleniumHQ/selenium) | Java | Apache-2.0 | [selenium-4.50.0](https://github.com/SeleniumHQ/selenium/releases/tag/selenium-4.50.0) signed | 34522 | none |
| [chromedp](https://github.com/chromedp/chromedp) | Go | MIT | [v0.20.1](https://github.com/chromedp/chromedp/releases/tag/v0.20.1) | 13300 | Puppeteer (partial) |
| [Nightwatch](https://github.com/nightwatchjs/nightwatch) | JavaScript | MIT | [v3.16.0](https://github.com/nightwatchjs/nightwatch/releases/tag/v3.16.0) | 11952 | Cypress (full) |
| [TestCafe](https://github.com/DevExpress/testcafe) | JavaScript | MIT | [v3.7.6](https://github.com/DevExpress/testcafe/releases/tag/v3.7.6) signed | 9897 | Selenium (partial) |
| [WebdriverIO](https://github.com/webdriverio/webdriverio) | TypeScript | MIT | [v10.0.0](https://github.com/webdriverio/webdriverio/releases/tag/v10.0.0) | 9844 | Selenium (full) |

</details>

<details>
<summary><b>Python web frameworks</b>, 11 tools</summary>

Build HTTP APIs and sites in Python.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [FastAPI](https://github.com/fastapi/fastapi) | Python | MIT | [0.142.2](https://github.com/fastapi/fastapi/releases/tag/0.142.2) signed | 102844 | Flask (full), Django REST framework (partial) |
| [Django](https://github.com/django/django) | Python | BSD-3-Clause | [6.1.2](https://github.com/django/django/releases/tag/6.1.2) signed | 91364 | none |
| [Flask](https://github.com/pallets/flask) | Python | BSD-3-Clause | [3.1.3](https://github.com/pallets/flask/releases/tag/3.1.3) signed | 74922 | none |
| [Django REST framework](https://github.com/encode/django-rest-framework) | Python | Other | [3.18.1](https://github.com/encode/django-rest-framework/releases/tag/3.18.1) signed | 30204 | none |
| [Reflex](https://github.com/reflex-dev/reflex) | Python | Apache-2.0 | [v0.9.12](https://github.com/reflex-dev/reflex/releases/tag/v0.9.12) signed | 28939 | none |
| [Tornado](https://github.com/tornadoweb/tornado) | Python | Apache-2.0 | [v6.5.10](https://github.com/tornadoweb/tornado/releases/tag/v6.5.10) | 22168 | none |
| [Sanic](https://github.com/sanic-org/sanic) | Python | MIT | [v25.12.1](https://github.com/sanic-org/sanic/releases/tag/v25.12.1) signed | 18638 | Flask (full) |
| [Starlette](https://github.com/Kludex/starlette) | Python | BSD-3-Clause | [1.7.0](https://github.com/Kludex/starlette/releases/tag/1.7.0) signed | 12655 | Flask (partial) |
| [Falcon](https://github.com/falconry/falcon) | Python | Apache-2.0 | [4.4.0](https://github.com/falconry/falcon/releases/tag/4.4.0) | 9806 | Flask (partial) |
| [Bottle](https://github.com/bottlepy/bottle) | Python | MIT | [0.13.4](https://github.com/bottlepy/bottle/releases/tag/0.13.4) | 8793 | Flask (full) |
| [Litestar](https://github.com/litestar-org/litestar) | Python | MIT | [v2.24.0](https://github.com/litestar-org/litestar/releases/tag/v2.24.0) | 8496 | Flask (full), Django REST framework (partial) |

</details>

<details>
<summary><b>Python HTTP clients</b>, 5 tools</summary>

Send HTTP requests from Python.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Requests](https://github.com/psf/requests) | Python | Apache-2.0 | [v2.34.2](https://github.com/psf/requests/releases/tag/v2.34.2) signed | 54494 | none |
| [aiohttp](https://github.com/aio-libs/aiohttp) | Python | Apache-2.0 | [v3.14.4](https://github.com/aio-libs/aiohttp/releases/tag/v3.14.4) | 16569 | none |
| [HTTPX](https://github.com/encode/httpx) | Python | BSD-3-Clause | [0.28.1](https://github.com/encode/httpx/releases/tag/0.28.1) signed | 15529 | Requests (full), aiohttp (partial) |
| [curl_cffi](https://github.com/lexiforest/curl_cffi) | Python | MIT | [v0.16.4b1](https://github.com/lexiforest/curl_cffi/releases/tag/v0.16.4b1) signed | 6666 | Requests (full) |
| [urllib3](https://github.com/urllib3/urllib3) | Python | MIT | [2.8.0](https://github.com/urllib3/urllib3/releases/tag/2.8.0) signed | 4069 | none |

</details>

<details>
<summary><b>JavaScript date libraries</b>, 5 tools</summary>

Parse, format and compute dates in JavaScript.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Day.js](https://github.com/iamkun/dayjs) | JavaScript | MIT | [v1.11.23](https://github.com/iamkun/dayjs/releases/tag/v1.11.23) | 48665 | Moment.js (drop-in) |
| [Moment.js](https://github.com/moment/moment) | JavaScript | MIT | [2.31.0](https://github.com/moment/moment/releases/tag/2.31.0) signed | 47902 | none |
| [date-fns](https://github.com/date-fns/date-fns) | TypeScript | none | [v4.4.0](https://github.com/date-fns/date-fns/releases/tag/v4.4.0) signed | 36650 | Moment.js (full) |
| [Luxon](https://github.com/moment/luxon) | JavaScript | MIT | [3.7.2](https://github.com/moment/luxon/releases/tag/3.7.2) | 16459 | Moment.js (full) |
| [spacetime](https://github.com/spencermountain/spacetime) | JavaScript | Other | [7.16.0](https://github.com/spencermountain/spacetime/releases/tag/7.16.0) signed | 4107 | Moment.js (full) |

</details>

<details>
<summary><b>Local Kubernetes</b>, 5 tools</summary>

Run a Kubernetes cluster on a laptop or in CI.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [K3s](https://github.com/k3s-io/k3s) | Go | Apache-2.0 | [v1.37.1+k3s1](https://github.com/k3s-io/k3s/releases/tag/v1.37.1%2Bk3s1) | 34143 | minikube (full) |
| [minikube](https://github.com/kubernetes/minikube) | Go | Apache-2.0 | [v1.39.0](https://github.com/kubernetes/minikube/releases/tag/v1.39.0) | 32181 | none |
| [kind](https://github.com/kubernetes-sigs/kind) | Go | Apache-2.0 | [v0.33.0](https://github.com/kubernetes-sigs/kind/releases/tag/v0.33.0) signed | 15530 | minikube (full) |
| [MicroK8s](https://github.com/canonical/microk8s) | Python | Apache-2.0 | [v1.36](https://github.com/canonical/microk8s/releases/tag/v1.36) signed | 9379 | minikube (full) |
| [k3d](https://github.com/k3d-io/k3d) | Go | MIT | [v5.9.0](https://github.com/k3d-io/k3d/releases/tag/v5.9.0) | 6582 | minikube (full) |

</details>

<details>
<summary><b>Secrets managers</b>, 6 tools</summary>

Store, rotate and hand out secrets to applications.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [HashiCorp Vault](https://github.com/hashicorp/vault) | Go | Other | [v2.1.1](https://github.com/hashicorp/vault/releases/tag/v2.1.1) signed | 36343 | none |
| [Infisical](https://github.com/Infisical/infisical) | TypeScript | Other | [v0.165.17](https://github.com/Infisical/infisical/releases/tag/v0.165.17) signed | 29633 | HashiCorp Vault (partial), Doppler (full) |
| [OpenBao](https://github.com/openbao/openbao) | Go | MPL-2.0 | [v2.7.1](https://github.com/openbao/openbao/releases/tag/v2.7.1) signed | 8327 | HashiCorp Vault (drop-in), Doppler (partial) |
| [External Secrets Operator](https://github.com/external-secrets/external-secrets) | Go | Apache-2.0 | [helm-chart-2.12.0](https://github.com/external-secrets/external-secrets/releases/tag/helm-chart-2.12.0) signed | 6892 | none |
| [Conjur](https://github.com/cyberark/conjur) | Ruby | Other | [v1.27.0](https://github.com/cyberark/conjur/releases/tag/v1.27.0) | 952 | HashiCorp Vault (partial) |
| [Phase](https://github.com/phasehq/console) | TypeScript | Other | [v2.77.2](https://github.com/phasehq/console/releases/tag/v2.77.2) signed | 927 | Doppler (full) |

</details>

<details>
<summary><b>Git LFS servers</b>, 4 tools</summary>

Serve Git LFS objects for repositories hosted anywhere.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [lfs-test-server](https://github.com/git-lfs/lfs-test-server) | Go | MIT | [v0.4.0](https://github.com/git-lfs/lfs-test-server/releases/tag/v0.4.0) | 792 | none |
| [Rudolfs](https://github.com/jasonwhite/rudolfs) | Rust | MIT | [0.3.8](https://github.com/jasonwhite/rudolfs/releases/tag/0.3.8) | 525 | lfs-test-server (full), GitHub LFS storage (partial) |
| [Giftless](https://github.com/datopian/giftless) | Python | MIT | [v0.6.2](https://github.com/datopian/giftless/releases/tag/v0.6.2) signed | 183 | lfs-test-server (full), GitHub LFS storage (partial) |
| [LFSX](https://github.com/FerrLabs/LFSX) verified | Rust | MPL-2.0 | [v1.23.3](https://github.com/FerrLabs/LFSX/releases/tag/v1.23.3) signed | 2 | lfs-test-server (full), Rudolfs (full), Giftless (partial), GitHub LFS storage (full) |

</details>

<details>
<summary><b>Minecraft servers</b>, 8 tools</summary>

Server software for Minecraft: Java Edition, from forks of the Bukkit line to implementations written from scratch.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Paper](https://github.com/PaperMC/Paper) | Java | Other | [26.2](https://github.com/PaperMC/Paper/releases/tag/26.2) | 12703 | none |
| [Pumpkin](https://github.com/Pumpkin-MC/Pumpkin) | Rust | GPL-3.0 | [0.2.0+26.3-26.51](https://github.com/Pumpkin-MC/Pumpkin/releases/tag/0.2.0%2B26.3-26.51) | 12022 | Paper (partial) |
| [Cuberite](https://github.com/cuberite/cuberite) | C++ | Other | [1.7EOL](https://github.com/cuberite/cuberite/releases/tag/1.7EOL) | 5450 | Paper (partial) |
| [Folia](https://github.com/PaperMC/Folia) | Shell | GPL-3.0 | none | 4387 | Paper (partial) |
| [Minestom](https://github.com/Minestom/Minestom) | Java | Apache-2.0 | [2026.10.05-26.2](https://github.com/Minestom/Minestom/releases/tag/2026.10.05-26.2) signed | 3298 | Paper (partial) |
| [Purpur](https://github.com/PurpurMC/Purpur) | Java | MIT | [1.20.6](https://github.com/PurpurMC/Purpur/releases/tag/1.20.6) signed | 2424 | Paper (drop-in) |
| [Glowstone](https://github.com/GlowstoneMC/Glowstone) | Java | Other | [2021.8.0](https://github.com/GlowstoneMC/Glowstone/releases/tag/2021.8.0) signed | 2010 | Paper (partial) |
| [SteelMC](https://github.com/Steel-Foundation/SteelMC) | Rust | AGPL-3.0 | [v0.15.4+mc26.2](https://github.com/Steel-Foundation/SteelMC/releases/tag/v0.15.4%2Bmc26.2) signed | 738 | Paper (partial) |

</details>

<details>
<summary><b>File sync and share</b>, 9 tools</summary>

Self-hosted storage for files you reach from more than one machine, over WebDAV or a sync client.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Syncthing](https://github.com/syncthing/syncthing) | Go | MPL-2.0 | [v2.1.6](https://github.com/syncthing/syncthing/releases/tag/v2.1.6) | 89184 | Dropbox (partial), Google Drive (partial), iCloud Drive (partial) |
| [Nextcloud](https://github.com/nextcloud/server) | PHP | AGPL-3.0 | [v35.0.1](https://github.com/nextcloud/server/releases/tag/v35.0.1) | 37012 | Dropbox (full), Google Drive (full), iCloud Drive (full), OneDrive (full), Box (full) |
| [Cloudreve](https://github.com/cloudreve/cloudreve) | Go | GPL-3.0 | [4.19.1](https://github.com/cloudreve/cloudreve/releases/tag/4.19.1) | 28798 | Dropbox (partial), Google Drive (partial), Box (partial), OneDrive (partial) |
| [Seafile](https://github.com/haiwen/seafile) | C | Other | [v9.0.5](https://github.com/haiwen/seafile/releases/tag/v9.0.5) | 15310 | Dropbox (full), Nextcloud (partial), iCloud Drive (full), OneDrive (full), Box (full) |
| [ownCloud Server](https://github.com/owncloud/core) | PHP | AGPL-3.0 | [v10.16.6](https://github.com/owncloud/core/releases/tag/v10.16.6) signed | 8834 | Dropbox (full), Google Drive (partial) |
| [Unison](https://github.com/bcpierce00/unison) | OCaml | GPL-3.0 | [v2.54.0](https://github.com/bcpierce00/unison/releases/tag/v2.54.0) | 5515 | Dropbox (partial) |
| [Pydio Cells](https://github.com/pydio/cells) | Go | AGPL-3.0 | [v5.1.0](https://github.com/pydio/cells/releases/tag/v5.1.0) | 2252 | Box (partial), Dropbox (partial) |
| [ownCloud Infinite Scale](https://github.com/owncloud/ocis) | Go | Apache-2.0 | [v8.2.1](https://github.com/owncloud/ocis/releases/tag/v8.2.1) signed | 2144 | Nextcloud (partial), Dropbox (full), Google Drive (partial), Box (full), OneDrive (partial), iCloud Drive (full) |
| [Stashden](https://github.com/FerrLabs/Stashden) verified | Rust | AGPL-3.0 | [v0.35.0](https://github.com/FerrLabs/Stashden/releases/tag/v0.35.0) | 1 | Nextcloud (partial) |

</details>

<details>
<summary><b>AI coding agents</b>, 14 tools</summary>

Agents that read a codebase, edit files and run commands from a prompt, in the terminal or the editor.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [OpenCode](https://github.com/anomalyco/opencode) | TypeScript | MIT | [v1.18.34](https://github.com/anomalyco/opencode/releases/tag/v1.18.34) | 212001 | Claude Code (full), GitHub Copilot (partial), Cursor (partial) |
| [Codex CLI](https://github.com/openai/codex) | Rust | Apache-2.0 | [rust-v0.160.1](https://github.com/openai/codex/releases/tag/rust-v0.160.1) | 128037 | Claude Code (full), GitHub Copilot (partial) |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) | TypeScript | Apache-2.0 | [v0.62.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.62.0) | 107251 | Claude Code (full), GitHub Copilot (partial) |
| [OpenHands](https://github.com/OpenHands/OpenHands) | TypeScript | MIT | [v1.25.0](https://github.com/OpenHands/OpenHands/releases/tag/v1.25.0) signed | 90104 | Claude Code (full), GitHub Copilot (partial) |
| [Cline](https://github.com/cline/cline) | TypeScript | Apache-2.0 | [desktop-v0.0.43](https://github.com/cline/cline/releases/tag/desktop-v0.0.43) | 69937 | Claude Code (partial), GitHub Copilot (partial), Cursor (partial) |
| [Open Interpreter](https://github.com/openinterpreter/openinterpreter) | Rust | Apache-2.0 | [rust-v0.0.55](https://github.com/openinterpreter/openinterpreter/releases/tag/rust-v0.0.55) signed | 68518 | Claude Code (partial) |
| [goose](https://github.com/aaif-goose/goose) | Rust | Apache-2.0 | [v1.53.0](https://github.com/aaif-goose/goose/releases/tag/v1.53.0) | 55004 | Claude Code (full), GitHub Copilot (partial) |
| [Aider](https://github.com/Aider-AI/aider) | Python | Apache-2.0 | [v0.86.0](https://github.com/Aider-AI/aider/releases/tag/v0.86.0) | 49397 | Claude Code (partial), GitHub Copilot (partial) |
| [Crush](https://github.com/charmbracelet/crush) | Go | Other | [v0.97.1](https://github.com/charmbracelet/crush/releases/tag/v0.97.1) signed | 28505 | Claude Code (full), GitHub Copilot (partial) |
| [Qwen Code](https://github.com/QwenLM/qwen-code) | TypeScript | Apache-2.0 | [sdk-typescript-v0.1.18](https://github.com/QwenLM/qwen-code/releases/tag/sdk-typescript-v0.1.18) | 28333 | Claude Code (full), GitHub Copilot (partial) |
| [Kilo Code](https://github.com/Kilo-Org/kilocode) | TypeScript | MIT | [v7.8.3](https://github.com/Kilo-Org/kilocode/releases/tag/v7.8.3) | 27509 | Claude Code (partial), Cursor (partial) |
| [SWE-agent](https://github.com/SWE-agent/SWE-agent) | Python | MIT | [v1.1.0](https://github.com/SWE-agent/SWE-agent/releases/tag/v1.1.0) signed | 20495 | Claude Code (partial) |
| [mini-SWE-agent](https://github.com/SWE-agent/mini-swe-agent) | Python | MIT | [v2.4.6](https://github.com/SWE-agent/mini-swe-agent/releases/tag/v2.4.6) signed | 8240 | Claude Code (partial) |
| [gptme](https://github.com/gptme/gptme) | Python | MIT | [v0.34.0](https://github.com/gptme/gptme/releases/tag/v0.34.0) | 4445 | Claude Code (partial) |

</details>

<details>
<summary><b>AI code assistants</b>, 8 tools</summary>

Completions and chat inside the editor, backed by a hosted or a local model.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Continue](https://github.com/continuedev/continue) | TypeScript | Apache-2.0 | [v2.0.0-vscode](https://github.com/continuedev/continue/releases/tag/v2.0.0-vscode) | 36131 | GitHub Copilot (full), Cursor (partial) |
| [Tabby](https://github.com/TabbyML/tabby) | Rust | Other | [v0.32.0](https://github.com/TabbyML/tabby/releases/tag/v0.32.0) | 33900 | GitHub Copilot (full) |
| [avante.nvim](https://github.com/avante-corp/avante.nvim) | Lua | Apache-2.0 | [v0.4.0](https://github.com/avante-corp/avante.nvim/releases/tag/v0.4.0) | 18177 | Cursor (partial), GitHub Copilot (partial) |
| [CodeCompanion.nvim](https://github.com/olimorris/codecompanion.nvim) | Lua | Apache-2.0 | [v19.27.0](https://github.com/olimorris/codecompanion.nvim/releases/tag/v19.27.0) signed | 6885 | GitHub Copilot (partial) |
| [twinny](https://github.com/twinnydotdev/twinny) | TypeScript | MIT | [v4.0.20](https://github.com/twinnydotdev/twinny/releases/tag/v4.0.20) | 3662 | GitHub Copilot (full) |
| [ProxyAI](https://github.com/carlrobertoh/ProxyAI) | Kotlin | Apache-2.0 | [3.8.1](https://github.com/carlrobertoh/ProxyAI/releases/tag/3.8.1) | 1935 | GitHub Copilot (partial) |
| [llama.vscode](https://github.com/ggml-org/llama.vscode) | TypeScript | MIT | [v0.0.68](https://github.com/ggml-org/llama.vscode/releases/tag/v0.0.68) signed | 1530 | GitHub Copilot (partial) |
| [minuet-ai.nvim](https://github.com/milanglacier/minuet-ai.nvim) | Lua | GPL-3.0 | [v0.10.0](https://github.com/milanglacier/minuet-ai.nvim/releases/tag/v0.10.0) signed | 1417 | GitHub Copilot (partial) |

</details>

<details>
<summary><b>AI chat interfaces</b>, 18 tools</summary>

Apps to chat with language models, whether the model runs locally or behind an API.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Open WebUI](https://github.com/open-webui/open-webui) | Python | Other | [v0.11.4](https://github.com/open-webui/open-webui/releases/tag/v0.11.4) signed | 154087 | ChatGPT (partial), Claude (partial) |
| [NextChat](https://github.com/ChatGPTNextWeb/NextChat) | TypeScript | MIT | [v2.16.1](https://github.com/ChatGPTNextWeb/NextChat/releases/tag/v2.16.1) | 88835 | ChatGPT (partial), Claude (partial) |
| [LobeHub](https://github.com/lobehub/lobehub) | TypeScript | Other | [v2.2.18](https://github.com/lobehub/lobehub/releases/tag/v2.2.18) signed | 83015 | ChatGPT (partial), Claude (partial) |
| [AnythingLLM](https://github.com/Mintplex-Labs/anything-llm) | JavaScript | MIT | [v1.17.0](https://github.com/Mintplex-Labs/anything-llm/releases/tag/v1.17.0) signed | 66755 | ChatGPT (partial), Claude (partial) |
| [Cherry Studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | AGPL-3.0 | [v2.1.4](https://github.com/CherryHQ/cherry-studio/releases/tag/v2.1.4) signed | 52401 | ChatGPT (partial), Claude (partial) |
| [TextGen](https://github.com/oobabooga/textgen) | Python | AGPL-3.0 | [v4.9](https://github.com/oobabooga/textgen/releases/tag/v4.9) | 47727 | ChatGPT (partial), Claude (partial) |
| [LibreChat](https://github.com/danny-avila/LibreChat) | TypeScript | MIT | [v0.8.8](https://github.com/LibreChat-AI/LibreChat/releases/tag/v0.8.8) signed | 45335 | ChatGPT (partial), Claude (partial) |
| [Jan](https://github.com/janhq/jan) | Rust | Other | [v0.8.4](https://github.com/janhq/jan/releases/tag/v0.8.4) signed | 44824 | ChatGPT (partial), Claude (partial) |
| [Chatbox](https://github.com/chatboxai/chatbox) | TypeScript | GPL-3.0 | [v1.23.5](https://github.com/chatboxai/chatbox/releases/tag/v1.23.5) signed | 41956 | ChatGPT (partial), Claude (partial) |
| [Khoj](https://github.com/khoj-ai/khoj) | Python | AGPL-3.0 | [2.0.0-beta.28](https://github.com/khoj-ai/khoj/releases/tag/2.0.0-beta.28) | 37572 | ChatGPT (partial) |
| [SillyTavern](https://github.com/SillyTavern/SillyTavern) | JavaScript | AGPL-3.0 | [1.19.0](https://github.com/SillyTavern/SillyTavern/releases/tag/1.19.0) signed | 34136 | ChatGPT (partial) |
| [Chat UI](https://github.com/huggingface/chat-ui) | TypeScript | Apache-2.0 | [v0.10.0](https://github.com/huggingface/chat-ui/releases/tag/v0.10.0) | 10975 | ChatGPT (partial) |
| [Page Assist](https://github.com/n4ze3m/page-assist) | TypeScript | MIT | [v1.5.86](https://github.com/n4ze3m/page-assist/releases/tag/v1.5.86) signed | 8247 | ChatGPT (partial) |
| [big-AGI](https://github.com/enricoros/big-AGI) | TypeScript | MIT | [v2.1.0](https://github.com/enricoros/big-AGI/releases/tag/v2.1.0) | 7137 | ChatGPT (partial) |
| [DeepChat](https://github.com/ThinkInAIXYZ/deepchat) | TypeScript | Apache-2.0 | [v1.1.2](https://github.com/ThinkInAIXYZ/deepchat/releases/tag/v1.1.2) | 6354 | ChatGPT (partial), Claude (partial) |
| [5ire](https://github.com/nanbingxyz/5ire) | TypeScript | Other | [v0.15.4](https://github.com/nanbingxyz/5ire/releases/tag/v0.15.4) | 5369 | ChatGPT (partial) |
| [Alpaca](https://github.com/Jeffser/Alpaca) | Python | GPL-3.0 | [9.2.5](https://github.com/Jeffser/Alpaca/releases/tag/9.2.5) | 1646 | ChatGPT (partial) |
| [Hollama](https://github.com/fmaclen/hollama) | TypeScript | MIT | [0.36.0](https://github.com/fmaclen/hollama/releases/tag/0.36.0) | 1189 | ChatGPT (partial) |

</details>

<details>
<summary><b>Local model runtimes</b>, 18 tools</summary>

Run open-weight language models on your own hardware, behind a local API.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Ollama](https://github.com/ollama/ollama) | Go | MIT | [v0.35.1](https://github.com/ollama/ollama/releases/tag/v0.35.1) signed | 182357 | ChatGPT (partial), Claude (partial) |
| [llama.cpp](https://github.com/ggml-org/llama.cpp) | C++ | MIT | [v0.6.0](https://github.com/ggml-org/llama.cpp/releases/tag/v0.6.0) | 130476 | ChatGPT (partial), Claude (partial) |
| [vLLM](https://github.com/vllm-project/vllm) | Python | Apache-2.0 | [v0.31.0](https://github.com/vllm-project/vllm/releases/tag/v0.31.0) | 93276 | ChatGPT (partial), Claude (partial) |
| [LocalAI](https://github.com/mudler/LocalAI) | Go | MIT | [v4.11.0](https://github.com/mudler/LocalAI/releases/tag/v4.11.0) signed | 49411 | ChatGPT (partial), Claude (partial) |
| [exo](https://github.com/exo-explore/exo) | Python | Apache-2.0 | [v1.0.71](https://github.com/exo-explore/exo/releases/tag/v1.0.71) signed | 47762 | Ollama (partial) |
| [SGLang](https://github.com/sgl-project/sglang) | Python | Apache-2.0 | [v0.5.21](https://github.com/sgl-project/sglang/releases/tag/v0.5.21) | 36818 | vLLM (full), ChatGPT (partial), Claude (partial) |
| [llamafile](https://github.com/mozilla-ai/llamafile) | C++ | Other | [0.10.6](https://github.com/mozilla-ai/llamafile/releases/tag/0.10.6) signed | 26182 | Ollama (partial) |
| [MLC LLM](https://github.com/mlc-ai/mlc-llm) | Python | Apache-2.0 | [v0.20.0](https://github.com/mlc-ai/mlc-llm/releases/tag/v0.20.0) | 23212 | Ollama (partial) |
| [KTransformers](https://github.com/kvcache-ai/ktransformers) | Python | Apache-2.0 | [v0.7.1](https://github.com/kvcache-ai/ktransformers/releases/tag/v0.7.1) signed | 19569 | none |
| [TensorRT-LLM](https://github.com/NVIDIA/TensorRT-LLM) | Python | Other | [v1.2.1](https://github.com/NVIDIA/TensorRT-LLM/releases/tag/v1.2.1) signed | 14768 | ChatGPT (partial) |
| [Xinference](https://github.com/xorbitsai/inference) | Python | Apache-2.0 | [v3.5.0](https://github.com/xorbitsai/inference/releases/tag/v3.5.0) signed | 9600 | ChatGPT (partial) |
| [LMDeploy](https://github.com/InternLM/lmdeploy) | Python | Apache-2.0 | [v0.18.0](https://github.com/InternLM/lmdeploy/releases/tag/v0.18.0) signed | 8104 | ChatGPT (partial) |
| [mistral.rs](https://github.com/EricLBuehler/mistral.rs) | Rust | MIT | [v0.9.4](https://github.com/EricLBuehler/mistral.rs/releases/tag/v0.9.4) signed | 7733 | LM Studio (partial) |
| [llama-swap](https://github.com/mostlygeek/llama-swap) | Go | MIT | [v262](https://github.com/mostlygeek/llama-swap/releases/tag/v262) signed | 5871 | none |
| [Lemonade](https://github.com/lemonade-sdk/lemonade) | C++ | Apache-2.0 | [v2026.40.0](https://github.com/lemonade-sdk/lemonade/releases/tag/v2026.40.0) | 5833 | LM Studio (partial) |
| [GPUStack](https://github.com/gpustack/gpustack) | Python | Apache-2.0 | [v2.2.3](https://github.com/gpustack/gpustack/releases/tag/v2.2.3) | 5783 | ChatGPT (partial) |
| [RamaLama](https://github.com/containers/ramalama) | Python | MIT | [v0.25.0](https://github.com/containers/ramalama/releases/tag/v0.25.0) signed | 3073 | LM Studio (partial) |
| [TabbyAPI](https://github.com/theroyallab/tabbyAPI) | Python | AGPL-3.0 | none | 1457 | none |

</details>

<details>
<summary><b>Container desktops</b>, 7 tools</summary>

Run containers and a local Kubernetes on a laptop, with the engine managed for you.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [lazydocker](https://github.com/jesseduffield/lazydocker) | Go | MIT | [v0.25.2](https://github.com/jesseduffield/lazydocker/releases/tag/v0.25.2) signed | 53055 | Docker Desktop (partial), Portainer (partial) |
| [container](https://github.com/apple/container) | Swift | Apache-2.0 | [1.5.0](https://github.com/apple/container/releases/tag/1.5.0) signed | 50530 | Docker Desktop (partial), OrbStack (partial) |
| [Colima](https://github.com/abiosoft/colima) | Go | MIT | [v0.10.3](https://github.com/abiosoft/colima/releases/tag/v0.10.3) signed | 31113 | Docker Desktop (partial), OrbStack (partial) |
| [Lima](https://github.com/lima-vm/lima) | Go | Apache-2.0 | [v2.2.1](https://github.com/lima-vm/lima/releases/tag/v2.2.1) signed | 22039 | Docker Desktop (partial), OrbStack (partial) |
| [Podman Desktop](https://github.com/podman-desktop/podman-desktop) | TypeScript | Apache-2.0 | [v1.29.3](https://github.com/podman-desktop/podman-desktop/releases/tag/v1.29.3) | 8063 | Docker Desktop (full), OrbStack (partial) |
| [Rancher Desktop](https://github.com/rancher-sandbox/rancher-desktop) | TypeScript | Apache-2.0 | [v1.24.0](https://github.com/rancher-sandbox/rancher-desktop/releases/tag/v1.24.0) signed | 7378 | Docker Desktop (full), OrbStack (partial) |
| [Finch](https://github.com/runfinch/finch) | Go | Apache-2.0 | [v1.19.0](https://github.com/runfinch/finch/releases/tag/v1.19.0) signed | 4071 | Docker Desktop (partial) |

</details>

<details>
<summary><b>Dashboards</b>, 5 tools</summary>

Build dashboards and explore metrics, logs and traces from a web UI.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Grafana](https://github.com/grafana/grafana) | TypeScript | AGPL-3.0 | [v13.2.3](https://github.com/grafana/grafana/releases/tag/v13.2.3) | 77113 | Kibana (partial), Datadog (partial), Splunk (partial) |
| [Kibana](https://github.com/elastic/kibana) | TypeScript | Other | [v9.5.5](https://github.com/elastic/kibana/releases/tag/v9.5.5) signed | 21309 | none |
| [HyperDX](https://github.com/hyperdxio/hyperdx) | TypeScript | MIT | [cli-v0.6.4](https://github.com/hyperdxio/hyperdx/releases/tag/cli-v0.6.4) signed | 9928 | Datadog (partial) |
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
<summary><b>Distributed SQL databases</b>, 7 tools</summary>

SQL databases that spread data across nodes and speak the PostgreSQL wire protocol.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [CockroachDB](https://github.com/cockroachdb/cockroach) | Go | Other | [v26.2.7](https://github.com/cockroachdb/cockroach/releases/tag/v26.2.7) signed | 32551 | none |
| [Apache ShardingSphere](https://github.com/apache/shardingsphere) | Java | Apache-2.0 | [5.5.3](https://github.com/apache/shardingsphere/releases/tag/5.5.3) | 20804 | Citus (partial) |
| [Citus](https://github.com/citusdata/citus) | C | AGPL-3.0 | [v14.2.0](https://github.com/citusdata/citus/releases/tag/v14.2.0) signed | 12799 | none |
| [YugabyteDB](https://github.com/yugabyte/yugabyte-db) | C | Other | [v2026.1.2.0](https://github.com/yugabyte/yugabyte-db/releases/tag/v2026.1.2.0) | 10579 | CockroachDB (full) |
| [PgDog](https://github.com/pgdogdev/pgdog) | Rust | AGPL-3.0 | [v0.1.60](https://github.com/pgdogdev/pgdog/releases/tag/v0.1.60) signed | 5552 | Citus (partial) |
| [YDB](https://github.com/ydb-platform/ydb) | C++ | Apache-2.0 | [26.2.1.14](https://github.com/ydb-platform/ydb/releases/tag/26.2.1.14) | 4775 | Google Cloud Spanner (partial) |
| [MatrixOne](https://github.com/matrixorigin/matrixone) | Go | Apache-2.0 | [v4.2.5](https://github.com/matrixorigin/matrixone/releases/tag/v4.2.5) | 2038 | MySQL (partial) |

</details>

<details>
<summary><b>Error tracking</b>, 5 tools</summary>

Collect exceptions from applications through an SDK and group them into issues.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Sentry](https://github.com/getsentry/sentry) | Python | Other | [26.9.0](https://github.com/getsentry/sentry/releases/tag/26.9.0) | 45483 | Airbrake (full) |
| [Highlight](https://github.com/highlight/highlight) | TypeScript | Other | [docker-v0.5.6](https://github.com/highlight/highlight/releases/tag/docker-v0.5.6) signed | 9383 | Sentry (full) |
| [Errbit](https://github.com/errbit/errbit) | Ruby | MIT | [v0.11.5](https://github.com/errbit/errbit/releases/tag/v0.11.5) signed | 4269 | Airbrake (drop-in) |
| [Exceptionless](https://github.com/exceptionless/Exceptionless) | C# | Apache-2.0 | [v8.10.0](https://github.com/exceptionless/Exceptionless/releases/tag/v8.10.0) signed | 2456 | Sentry (partial), Airbrake (partial) |
| [Bugsink](https://github.com/bugsink/bugsink) | Python | Other | [2.6.1](https://github.com/bugsink/bugsink/releases/tag/2.6.1) | 2117 | Sentry (partial), Airbrake (partial) |

</details>

<details>
<summary><b>Distributed tracing</b>, 12 tools</summary>

Collect and search traces of requests as they cross services.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [SigNoz](https://github.com/SigNoz/signoz) | TypeScript | Other | [v0.145.0](https://github.com/SigNoz/signoz/releases/tag/v0.145.0) signed | 32295 | Datadog (full), New Relic (full) |
| [Apache SkyWalking](https://github.com/apache/skywalking) | Java | Apache-2.0 | [v11.0.0](https://github.com/apache/skywalking/releases/tag/v11.0.0) | 24967 | New Relic (partial) |
| [Jaeger](https://github.com/jaegertracing/jaeger) | Go | Apache-2.0 | [v2.22.0](https://github.com/jaegertracing/jaeger/releases/tag/v2.22.0) signed | 23269 | Zipkin (full) |
| [Zipkin](https://github.com/openzipkin/zipkin) | Java | Apache-2.0 | [3.6.1](https://github.com/openzipkin/zipkin/releases/tag/3.6.1) | 17470 | none |
| [Pinpoint](https://github.com/pinpoint-apm/pinpoint) | Java | Apache-2.0 | [v3.1.1](https://github.com/pinpoint-apm/pinpoint/releases/tag/v3.1.1) | 13868 | New Relic (partial) |
| [Coroot](https://github.com/coroot/coroot) | Go | Apache-2.0 | [v1.27.1](https://github.com/coroot/coroot/releases/tag/v1.27.1) signed | 7958 | Datadog (partial) |
| [Pixie](https://github.com/pixie-io/pixie) | C++ | Apache-2.0 | [release/cloud/v0.1.9](https://github.com/pixie-io/pixie/releases/tag/release/cloud/v0.1.9) | 6546 | none |
| [Grafana Tempo](https://github.com/grafana/tempo) | Go | AGPL-3.0 | [v3.1.0](https://github.com/grafana/tempo/releases/tag/v3.1.0) signed | 5510 | Zipkin (full) |
| [Uptrace](https://github.com/uptrace/uptrace) | Go | AGPL-3.0 | [v2.1.0-beta.8](https://github.com/uptrace/uptrace/releases/tag/v2.1.0-beta.8) signed | 4297 | Honeycomb (partial), Datadog (partial) |
| [DeepFlow](https://github.com/deepflowio/deepflow) | Go | Apache-2.0 | [v7.2.2](https://github.com/deepflowio/deepflow/releases/tag/v7.2.2) | 4289 | none |
| [Odigos](https://github.com/odigos-io/odigos) | Go | Apache-2.0 | [v1.38.0](https://github.com/odigos-io/odigos/releases/tag/v1.38.0) signed | 3677 | none |
| [Grafana Beyla](https://github.com/grafana/beyla) | Go | Apache-2.0 | [v3.36.0](https://github.com/grafana/beyla/releases/tag/v3.36.0) signed | 2142 | none |

</details>

<details>
<summary><b>Time-series databases</b>, 7 tools</summary>

Store and query timestamped measurements at high write rates.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [InfluxDB](https://github.com/influxdata/influxdb) | Rust | Apache-2.0 | [v3.11.4](https://github.com/influxdata/influxdb/releases/tag/v3.11.4) | 31760 | none |
| [TDengine](https://github.com/taosdata/TDengine) | C | AGPL-3.0 | [ver-3.4.1.6](https://github.com/taosdata/TDengine/releases/tag/ver-3.4.1.6) | 25151 | InfluxDB (full) |
| [TimescaleDB](https://github.com/timescale/timescaledb) | C | Other | [2.30.2](https://github.com/timescale/timescaledb/releases/tag/2.30.2) signed | 23651 | InfluxDB (full) |
| [QuestDB](https://github.com/questdb/questdb) | Java | Apache-2.0 | [10.0.1](https://github.com/questdb/questdb/releases/tag/10.0.1) | 17425 | InfluxDB (full) |
| [GreptimeDB](https://github.com/GreptimeTeam/greptimedb) | Rust | Apache-2.0 | [v1.2.1](https://github.com/GreptimeTeam/greptimedb/releases/tag/v1.2.1) | 6725 | InfluxDB (full) |
| [Apache IoTDB](https://github.com/apache/iotdb) | Java | Apache-2.0 | [v2.0.11](https://github.com/apache/iotdb/releases/tag/v2.0.11) | 6405 | Amazon Timestream (partial) |
| [openGemini](https://github.com/openGemini/openGemini) | Go | Apache-2.0 | [v1.5.2](https://github.com/openGemini/openGemini/releases/tag/v1.5.2) | 1174 | InfluxDB (partial) |

</details>

<details>
<summary><b>Encrypted files in git</b>, 6 tools</summary>

Keep secrets in a repository, encrypted, and decrypted only by the people and machines allowed to.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [SOPS](https://github.com/getsops/sops) | Go | MPL-2.0 | [v3.13.3](https://github.com/getsops/sops/releases/tag/v3.13.3) signed | 23311 | git-crypt (full) |
| [git-crypt](https://github.com/AGWA/git-crypt) | C++ | GPL-3.0 | [0.8.0](https://github.com/AGWA/git-crypt/releases/tag/0.8.0) | 9943 | none |
| [Sealed Secrets](https://github.com/bitnami/sealed-secrets) | Go | Apache-2.0 | [v0.40.0](https://github.com/bitnami/sealed-secrets/releases/tag/v0.40.0) signed | 9298 | SOPS (partial) |
| [dotenvx](https://github.com/dotenvx/dotenvx) | JavaScript | BSD-3-Clause | [v2.33.0](https://github.com/dotenvx/dotenvx/releases/tag/v2.33.0) | 5828 | SOPS (partial), Doppler (partial) |
| [git-secret](https://github.com/sobolevn/git-secret) | Shell | MIT | [v0.5.0](https://github.com/sobolevn/git-secret/releases/tag/v0.5.0) | 4048 | git-crypt (partial) |
| [transcrypt](https://github.com/elasticdog/transcrypt) | Shell | MIT | [v2.3.2](https://github.com/elasticdog/transcrypt/releases/tag/v2.3.2) signed | 1711 | git-crypt (full) |

</details>

<details>
<summary><b>Log storage</b>, 6 tools</summary>

Store logs at volume and search them, the back end behind log dashboards.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Loki](https://github.com/grafana/loki) | Go | AGPL-3.0 | [v3.7.8](https://github.com/grafana/loki/releases/tag/v3.7.8) signed | 28991 | Elasticsearch (partial), Splunk (partial), Datadog (partial) |
| [OpenObserve](https://github.com/openobserve/openobserve) | TypeScript | AGPL-3.0 | [v1.1.0-rc1](https://github.com/openobserve/openobserve/releases/tag/v1.1.0-rc1) | 22279 | Elasticsearch (partial), Splunk (partial), Datadog (partial) |
| [Quickwit](https://github.com/quickwit-oss/quickwit) | Rust | Apache-2.0 | [v0.9.1](https://github.com/quickwit-oss/quickwit/releases/tag/v0.9.1) signed | 11699 | Elasticsearch (partial), Splunk (partial) |
| [Graylog](https://github.com/Graylog2/graylog2-server) | Java | Other | [7.1.9](https://github.com/Graylog2/graylog2-server/releases/tag/7.1.9) | 8150 | Splunk (full) |
| [Parseable](https://github.com/parseablehq/parseable) | Rust | AGPL-3.0 | [v3.2.4](https://github.com/parseablehq/parseable/releases/tag/v3.2.4) signed | 2487 | Splunk (partial) |
| [VictoriaLogs](https://github.com/VictoriaMetrics/VictoriaLogs) | Go | Apache-2.0 | [v1.53.0](https://github.com/VictoriaMetrics/VictoriaLogs/releases/tag/v1.53.0) signed | 2348 | Elasticsearch (partial), Loki (full), Splunk (partial) |

</details>

<details>
<summary><b>Relational databases</b>, 23 tools</summary>

General-purpose SQL databases.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [TiDB](https://github.com/pingcap/tidb) | Go | Apache-2.0 | [v7.5.8](https://github.com/pingcap/tidb/releases/tag/v7.5.8) signed | 40632 | MySQL (full) |
| [Turso Database](https://github.com/tursodatabase/turso) | Rust | MIT | [v0.8.2](https://github.com/tursodatabase/turso/releases/tag/v0.8.2) | 24653 | SQLite (partial) |
| [Dolt](https://github.com/dolthub/dolt) | Go | Apache-2.0 | [v2.4.1](https://github.com/dolthub/dolt/releases/tag/v2.4.1) | 24582 | MySQL (full) |
| [Neon](https://github.com/neondatabase/neon) | Rust | Apache-2.0 | [release-proxy-8853](https://github.com/neondatabase/neon/releases/tag/release-proxy-8853) | 23175 | none |
| [PostgreSQL](https://github.com/postgres/postgres) | C | Other | [REL_18_6](https://github.com/postgres/postgres/releases/tag/REL_18_6) | 22297 | MySQL (full), Oracle Database (full) |
| [Vitess](https://github.com/vitessio/vitess) | Go | Apache-2.0 | [v24.0.4](https://github.com/vitessio/vitess/releases/tag/v24.0.4) signed | 21370 | none |
| [rqlite](https://github.com/rqlite/rqlite) | Go | MIT | [v10.5.2](https://github.com/rqlite/rqlite/releases/tag/v10.5.2) signed | 17784 | SQLite (partial) |
| [libSQL](https://github.com/tursodatabase/libsql) | C | MIT | [libsql-server-v0.24.32](https://github.com/tursodatabase/libsql/releases/tag/libsql-server-v0.24.32) signed | 17260 | SQLite (drop-in) |
| [PGlite](https://github.com/electric-sql/pglite) | TypeScript | Apache-2.0 | [@electric-sql/pglite@0.5.8](https://github.com/electric-sql/pglite/releases/tag/%40electric-sql/pglite%400.5.8) | 16130 | SQLite (partial) |
| [MySQL](https://github.com/mysql/mysql-server) | C++ | Other | [mysql-26.7.0](https://github.com/mysql/mysql-server/releases/tag/mysql-26.7.0) | 12441 | none |
| [SQLite](https://github.com/sqlite/sqlite) | C | Other | [version-3.53.4](https://github.com/sqlite/sqlite/releases/tag/version-3.53.4) | 10607 | none |
| [OceanBase](https://github.com/oceanbase/oceanbase) | C++ | Apache-2.0 | [v4.4.2_CE_BP3](https://github.com/oceanbase/oceanbase/releases/tag/v4.4.2_CE_BP3) | 10298 | MySQL (full) |
| [CloudNativePG](https://github.com/cloudnative-pg/cloudnative-pg) | Go | Apache-2.0 | [v1.30.1](https://github.com/cloudnative-pg/cloudnative-pg/releases/tag/v1.30.1) signed | 9407 | Amazon RDS (partial) |
| [MariaDB](https://github.com/MariaDB/server) | C++ | GPL-2.0 | [mariadb-13.0.2](https://github.com/MariaDB/server/releases/tag/mariadb-13.0.2) | 8324 | MySQL (full), Oracle Database (partial) |
| [Postgres Operator](https://github.com/zalando/postgres-operator) | Go | MIT | [v2.0.3](https://github.com/zalando/postgres-operator/releases/tag/v2.0.3) signed | 5255 | Amazon RDS (partial) |
| [H2 Database Engine](https://github.com/h2database/h2database) | Java | Other | [version-2.5.252](https://github.com/h2database/h2database/releases/tag/version-2.5.252) signed | 4632 | none |
| [Crunchy Postgres for Kubernetes](https://github.com/CrunchyData/postgres-operator) | Go | Apache-2.0 | [v6.0.2](https://github.com/CrunchyData/postgres-operator/releases/tag/v6.0.2) | 4451 | Amazon RDS (partial) |
| [OrioleDB](https://github.com/orioledb/orioledb) | C | Apache-2.0 | [beta19](https://github.com/orioledb/orioledb/releases/tag/beta19) | 4243 | none |
| [KubeBlocks](https://github.com/apecloud/kubeblocks) | Go | AGPL-3.0 | [v1.0.2](https://github.com/apecloud/kubeblocks/releases/tag/v1.0.2) signed | 3145 | Amazon RDS (partial) |
| [Firebird](https://github.com/FirebirdSQL/firebird) | C++ | none | [v5.0.4](https://github.com/FirebirdSQL/firebird/releases/tag/v5.0.4) | 1470 | none |
| [mariadb-operator](https://github.com/mariadb-operator/mariadb-operator) | Go | MIT | [mariadb-operator-crds-26.10.1](https://github.com/mariadb-operator/mariadb-operator/releases/tag/mariadb-operator-crds-26.10.1) | 1023 | Amazon RDS (partial) |
| [Percona Operator for MySQL based on Percona XtraDB Cluster](https://github.com/percona/percona-xtradb-cluster-operator) | Go | Other | [v1.20.0](https://github.com/percona/percona-xtradb-cluster-operator/releases/tag/v1.20.0) | 624 | Amazon RDS (partial) |
| [Babelfish for PostgreSQL](https://github.com/babelfish-for-postgresql/babelfish_extensions) | TSQL | Apache-2.0 | [BABEL_5_4_0](https://github.com/babelfish-for-postgresql/babelfish_extensions/releases/tag/BABEL_5_4_0) | 338 | Microsoft SQL Server (partial) |

</details>

<details>
<summary><b>Configuration management</b>, 15 tools</summary>

Describe the state of servers in code and converge them to it.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Ansible](https://github.com/ansible/ansible) | Python | GPL-3.0 | [v2.21.5](https://github.com/ansible/ansible/releases/tag/v2.21.5) signed | 70869 | none |
| [Salt](https://github.com/saltstack/salt) | Python | Apache-2.0 | [v3008.3](https://github.com/saltstack/salt/releases/tag/v3008.3) signed | 15694 | Puppet (full), Chef (full), Ansible (full) |
| [AWX](https://github.com/ansible/awx) | Python | Other | [24.6.1](https://github.com/ansible/awx/releases/tag/24.6.1) signed | 15581 | Red Hat Ansible Automation Platform (full) |
| [Semaphore UI](https://github.com/semaphoreui/semaphore) | Go | MIT | [v2.19.12](https://github.com/semaphoreui/semaphore/releases/tag/v2.19.12) | 14235 | Red Hat Ansible Automation Platform (partial) |
| [Capistrano](https://github.com/capistrano/capistrano) | Ruby | MIT | [v3.20.1](https://github.com/capistrano/capistrano/releases/tag/v3.20.1) | 13008 | none |
| [Deployer](https://github.com/deployphp/deployer) | PHP | MIT | [v8.0.5](https://github.com/deployphp/deployer/releases/tag/v8.0.5) signed | 11113 | none |
| [Chef](https://github.com/chef/chef) | Ruby | Apache-2.0 | [v15.8.23](https://github.com/chef/chef/releases/tag/v15.8.23) | 8247 | none |
| [Puppet](https://github.com/puppetlabs/puppet) | Ruby | Apache-2.0 | [7.34.0](https://github.com/puppetlabs/puppet/releases/tag/7.34.0) | 7951 | none |
| [pyinfra](https://github.com/pyinfra-dev/pyinfra) | Python | MIT | [v3.10.0](https://github.com/pyinfra-dev/pyinfra/releases/tag/v3.10.0) | 6026 | Ansible (full) |
| [mgmt](https://github.com/purpleidea/mgmt) | Go | GPL-3.0 | [1.1.0](https://github.com/purpleidea/mgmt/releases/tag/1.1.0) signed | 4328 | none |
| [Foreman](https://github.com/theforeman/foreman) | Ruby | GPL-3.0 | [5.0.1](https://github.com/theforeman/foreman/releases/tag/5.0.1) signed | 2967 | Red Hat Satellite (full) |
| [Colmena](https://github.com/nix-community/colmena) | Rust | MIT | [v0.5.0](https://github.com/nix-community/colmena/releases/tag/v0.5.0) signed | 2381 | none |
| [Rudder](https://github.com/Normation/rudder) | Scala | GPL-3.0 | [9.1.4](https://github.com/Normation/rudder/releases/tag/9.1.4) | 716 | none |
| [CFEngine](https://github.com/cfengine/core) | C | Other | [3.28.0](https://github.com/cfengine/core/releases/tag/3.28.0) signed | 538 | none |
| [OpenVox](https://github.com/OpenVoxProject/openvox) | Ruby | Apache-2.0 | [9.0.0](https://github.com/OpenVoxProject/openvox/releases/tag/9.0.0) signed | 192 | Puppet (drop-in) |

</details>

<details>
<summary><b>Workflow automation</b>, 6 tools</summary>

Connect apps and APIs with trigger-and-action workflows.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [n8n](https://github.com/n8n-io/n8n) | TypeScript | Other | [n8n@2.42.3](https://github.com/n8n-io/n8n/releases/tag/n8n%402.42.3) signed | 206761 | Zapier (full), IFTTT (full) |
| [Huginn](https://github.com/huginn/huginn) | Ruby | MIT | [v2026.10.04](https://github.com/huginn/huginn/releases/tag/v2026.10.04) | 50027 | Zapier (partial), IFTTT (partial) |
| [Activepieces](https://github.com/activepieces/activepieces) | TypeScript | Other | [0.92.1](https://github.com/activepieces/activepieces/releases/tag/0.92.1) | 24922 | Zapier (full), n8n (full), IFTTT (full) |
| [Node-RED](https://github.com/node-red/node-red) | JavaScript | Apache-2.0 | [5.0.7](https://github.com/node-red/node-red/releases/tag/5.0.7) signed | 23718 | Zapier (partial) |
| [Windmill](https://github.com/windmill-labs/windmill) | Rust | Other | [v1.825.0](https://github.com/windmill-labs/windmill/releases/tag/v1.825.0) signed | 18116 | Zapier (partial), Apache Airflow (partial) |
| [Automatisch](https://github.com/automatisch/automatisch) | JavaScript | Other | [v0.15.0](https://github.com/automatisch/automatisch/releases/tag/v0.15.0) | 13990 | Zapier (full) |

</details>

<details>
<summary><b>GitOps</b>, 6 tools</summary>

Keep Kubernetes clusters in sync with manifests stored in git.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Argo CD](https://github.com/argoproj/argo-cd) | Go | Apache-2.0 | [v3.5.3](https://github.com/argoproj/argo-cd/releases/tag/v3.5.3) signed | 24338 | none |
| [Flux](https://github.com/fluxcd/flux2) | Go | Apache-2.0 | [v2.9.6](https://github.com/fluxcd/flux2/releases/tag/v2.9.6) signed | 8439 | Argo CD (full) |
| [werf](https://github.com/werf/werf) | Go | Apache-2.0 | [v2.79.2](https://github.com/werf/werf/releases/tag/v2.79.2) signed | 4728 | none |
| [Kargo](https://github.com/akuity/kargo) | Go | Apache-2.0 | [v1.12.1](https://github.com/akuity/kargo/releases/tag/v1.12.1) signed | 3698 | none |
| [Fleet](https://github.com/rancher/fleet) | Go | Apache-2.0 | [v0.16.2](https://github.com/rancher/fleet/releases/tag/v0.16.2) signed | 1730 | Argo CD (full) |
| [Kluctl](https://github.com/kluctl/kluctl) | Go | Apache-2.0 | [v2.28.2](https://github.com/kluctl/kluctl/releases/tag/v2.28.2) | 883 | none |

</details>

<details>
<summary><b>Container registries</b>, 8 tools</summary>

Store and serve OCI images and artefacts.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Harbor](https://github.com/goharbor/harbor) | Go | Apache-2.0 | [v2.15.3](https://github.com/goharbor/harbor/releases/tag/v2.15.3) | 29500 | Docker Hub (full), Distribution (full) |
| [Distribution](https://github.com/distribution/distribution) | Go | Apache-2.0 | [v3.1.2](https://github.com/distribution/distribution/releases/tag/v3.1.2) signed | 10642 | Docker Hub (partial) |
| [Kraken](https://github.com/uber/kraken) | Go | Apache-2.0 | [v0.1.31](https://github.com/uber/kraken/releases/tag/v0.1.31) signed | 6754 | Distribution (partial) |
| [Spegel](https://github.com/spegel-org/spegel) | Go | MIT | [v0.7.4](https://github.com/spegel-org/spegel/releases/tag/v0.7.4) signed | 3803 | none |
| [Docker Registry UI](https://github.com/Joxit/docker-registry-ui) | Riot | AGPL-3.0 | [2.6.0](https://github.com/Joxit/docker-registry-ui/releases/tag/2.6.0) signed | 3539 | none |
| [Dragonfly](https://github.com/dragonflyoss/dragonfly) | Go | Apache-2.0 | [v2.5.2](https://github.com/dragonflyoss/dragonfly/releases/tag/v2.5.2) signed | 3341 | none |
| [zot](https://github.com/project-zot/zot) | Go | Apache-2.0 | [v2.1.21](https://github.com/project-zot/zot/releases/tag/v2.1.21) signed | 2843 | Docker Hub (partial), Distribution (full) |
| [Quay](https://github.com/quay/quay) | Python | Apache-2.0 | [v3.17.5](https://github.com/quay/quay/releases/tag/v3.17.5) signed | 2827 | Docker Hub (full) |

</details>

<details>
<summary><b>Identity providers</b>, 21 tools</summary>

Single sign-on, user directories and MFA over OpenID Connect, SAML or LDAP.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Keycloak](https://github.com/keycloak/keycloak) | Java | Apache-2.0 | [26.8.0](https://github.com/keycloak/keycloak/releases/tag/26.8.0) | 37164 | Okta (full), Auth0 (full) |
| [Authelia](https://github.com/authelia/authelia) | Go | Apache-2.0 | [v4.39.28](https://github.com/authelia/authelia/releases/tag/v4.39.28) signed | 29185 | Okta (partial) |
| [authentik](https://github.com/goauthentik/authentik) | Python | Other | [version/2026.8.3](https://github.com/goauthentik/authentik/releases/tag/version/2026.8.3) | 25863 | Okta (full), Auth0 (full), Keycloak (full) |
| [Ory Hydra](https://github.com/ory/hydra) | Go | Apache-2.0 | [v26.2.0](https://github.com/ory/hydra/releases/tag/v26.2.0) | 17591 | Auth0 (partial) |
| [SuperTokens](https://github.com/supertokens/supertokens-core) | Java | Other | [v12.2.0](https://github.com/supertokens/supertokens-core/releases/tag/v12.2.0) | 15336 | Auth0 (full) |
| [ZITADEL](https://github.com/zitadel/zitadel) | Go | AGPL-3.0 | [v4.19.4](https://github.com/zitadel/zitadel/releases/tag/v4.19.4) signed | 15223 | Auth0 (full), Okta (partial) |
| [Logto](https://github.com/logto-io/logto) | TypeScript | MPL-2.0 | [v1.44.0](https://github.com/logto-io/logto/releases/tag/v1.44.0) signed | 14657 | Auth0 (full) |
| [Casdoor](https://github.com/casdoor/casdoor) | Go | Apache-2.0 | [v4.17.0](https://github.com/casdoor/casdoor/releases/tag/v4.17.0) | 14518 | Auth0 (full), Okta (partial) |
| [Ory Kratos](https://github.com/ory/kratos) | Go | Apache-2.0 | [v26.2.0](https://github.com/ory/kratos/releases/tag/v26.2.0) | 13908 | Auth0 (partial) |
| [Apereo CAS](https://github.com/apereo/cas) | Java | Apache-2.0 | [v8.0.2](https://github.com/apereo/cas/releases/tag/v8.0.2) | 11382 | Okta (partial) |
| [Dex](https://github.com/dexidp/dex) | Go | Apache-2.0 | [v2.45.1](https://github.com/dexidp/dex/releases/tag/v2.45.1) signed | 11160 | Okta (partial) |
| [Pocket ID](https://github.com/pocket-id/pocket-id) | Go | BSD-2-Clause | [v2.18.0](https://github.com/pocket-id/pocket-id/releases/tag/v2.18.0) | 9406 | none |
| [Hanko](https://github.com/teamhanko/hanko) | Go | Other | [backend/v3.1.0](https://github.com/teamhanko/hanko/releases/tag/backend/v3.1.0) signed | 9035 | Clerk (partial), Auth0 (partial) |
| [Tinyauth](https://github.com/tinyauthapp/tinyauth) | Go | AGPL-3.0 | [v5.2.0](https://github.com/tinyauthapp/tinyauth/releases/tag/v5.2.0) signed | 8330 | none |
| [Hexclave](https://github.com/hexclave/hexclave) | TypeScript | Other | [dashboard-v1.0.125](https://github.com/hexclave/hexclave/releases/tag/dashboard-v1.0.125) | 6860 | Clerk (full) |
| [Kanidm](https://github.com/kanidm/kanidm) | Rust | MPL-2.0 | [v1.11.2](https://github.com/kanidm/kanidm/releases/tag/v1.11.2) | 5443 | Okta (partial), Keycloak (partial) |
| [VoidAuth](https://github.com/voidauth/voidauth) | TypeScript | AGPL-3.0 | [v1.16.0](https://github.com/voidauth/voidauth/releases/tag/v1.16.0) signed | 2865 | none |
| [Authorizer](https://github.com/authorizerdev/authorizer) | Go | Apache-2.0 | [2.4.1](https://github.com/authorizerdev/authorizer/releases/tag/2.4.1) signed | 2107 | Auth0 (partial) |
| [Rauthy](https://github.com/sebadob/rauthy) | Rust | Apache-2.0 | [v0.37.0](https://github.com/sebadob/rauthy/releases/tag/v0.37.0) signed | 1363 | Okta (partial) |
| [SimpleSAMLphp](https://github.com/simplesamlphp/simplesamlphp) | PHP | LGPL-2.1 | [v2.5.3.1](https://github.com/simplesamlphp/simplesamlphp/releases/tag/v2.5.3.1) | 1143 | none |
| [Janssen](https://github.com/JanssenProject/jans) | Java | Apache-2.0 | [v2.4.0](https://github.com/JanssenProject/jans/releases/tag/v2.4.0) | 651 | Okta (partial) |

</details>

<details>
<summary><b>Mesh VPNs</b>, 10 tools</summary>

Connect devices and servers in a private WireGuard network, wherever they are.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Headscale](https://github.com/juanfont/headscale) | Go | BSD-3-Clause | [v0.29.4](https://github.com/juanfont/headscale/releases/tag/v0.29.4) | 44389 | Tailscale (partial) |
| [NetBird](https://github.com/netbirdio/netbird) | Go | Other | [v0.80.0](https://github.com/netbirdio/netbird/releases/tag/v0.80.0) signed | 29780 | Tailscale (full) |
| [Nebula](https://github.com/slackhq/nebula) | Go | MIT | [v1.11.2](https://github.com/slackhq/nebula/releases/tag/v1.11.2) signed | 18417 | Tailscale (partial) |
| [ZeroTier](https://github.com/zerotier/ZeroTierOne) | C++ | Other | [1.16.2](https://github.com/zerotier/ZeroTierOne/releases/tag/1.16.2) | 17158 | Tailscale (full) |
| [EasyTier](https://github.com/EasyTier/EasyTier) | Rust | LGPL-3.0 | [v2.6.4](https://github.com/EasyTier/EasyTier/releases/tag/v2.6.4) signed | 13939 | Tailscale (full) |
| [Netmaker](https://github.com/gravitl/netmaker) | Go | Other | [v1.7.0](https://github.com/gravitl/netmaker/releases/tag/v1.7.0) signed | 11820 | Tailscale (full) |
| [Firezone](https://github.com/firezone/firezone) | Elixir | Apache-2.0 | [android-client-1.5.15](https://github.com/firezone/firezone/releases/tag/android-client-1.5.15) signed | 9108 | Tailscale (partial) |
| [innernet](https://github.com/tonarino/innernet) | Rust | MIT | [v2.0.0](https://github.com/tonarino/innernet/releases/tag/v2.0.0) | 5559 | Tailscale (partial) |
| [Defguard](https://github.com/DefGuard/defguard) | Rust | Other | [v2.1.1](https://github.com/DefGuard/defguard/releases/tag/v2.1.1) signed | 2857 | Tailscale (partial) |
| [tinc](https://github.com/gsliepen/tinc) | C | Other | [release-1.0.37](https://github.com/gsliepen/tinc/releases/tag/release-1.0.37) | 2253 | Tailscale (partial) |

</details>

<details>
<summary><b>Remote desktop</b>, 9 tools</summary>

Control another computer over the network, for support or remote work.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [RustDesk](https://github.com/rustdesk/rustdesk) | Rust | AGPL-3.0 | [1.5.0](https://github.com/rustdesk/rustdesk/releases/tag/1.5.0) signed | 125263 | TeamViewer (full), AnyDesk (full) |
| [Sunshine](https://github.com/LizardByte/Sunshine) | C++ | GPL-3.0 | [v2026.914.233613](https://github.com/LizardByte/Sunshine/releases/tag/v2026.914.233613) signed | 41916 | Parsec (partial) |
| [Moonlight](https://github.com/moonlight-stream/moonlight-qt) | C++ | GPL-3.0 | [v6.2.0](https://github.com/moonlight-stream/moonlight-qt/releases/tag/v6.2.0) | 18952 | Parsec (partial) |
| [noVNC](https://github.com/novnc/noVNC) | JavaScript | Other | [v1.7.0](https://github.com/novnc/noVNC/releases/tag/v1.7.0) | 14070 | none |
| [Apollo](https://github.com/ClassicOldSong/Apollo) | C++ | GPL-3.0 | [v0.4.6](https://github.com/ClassicOldSong/Apollo/releases/tag/v0.4.6) signed | 11193 | Parsec (partial) |
| [TigerVNC](https://github.com/TigerVNC/tigervnc) | C++ | GPL-2.0 | [v1.16.2](https://github.com/TigerVNC/tigervnc/releases/tag/v1.16.2) | 7535 | TeamViewer (partial), AnyDesk (partial) |
| [MeshCentral](https://github.com/Ylianst/MeshCentral) | HTML | Apache-2.0 | [1.2.6](https://github.com/Ylianst/MeshCentral/releases/tag/1.2.6) | 7349 | TeamViewer (partial), AnyDesk (partial) |
| [Apache Guacamole](https://github.com/apache/guacamole-server) | C | Apache-2.0 | [1.6.0](https://github.com/apache/guacamole-server/releases/tag/1.6.0) signed | 3998 | TeamViewer (partial) |
| [Selkies](https://github.com/selkies-project/selkies) | Python | MPL-2.0 | [2.0.0](https://github.com/selkies-project/selkies/releases/tag/2.0.0) signed | 2285 | Parsec (partial) |

</details>

<details>
<summary><b>Wikis and knowledge bases</b>, 16 tools</summary>

Shared pages and documentation for teams, edited in the browser.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [AppFlowy](https://github.com/AppFlowy-IO/AppFlowy) | Dart | AGPL-3.0 | [0.14.7](https://github.com/AppFlowy-IO/AppFlowy/releases/tag/0.14.7) signed | 77164 | Notion (full) |
| [AFFiNE](https://github.com/toeverything/AFFiNE) | TypeScript | Other | [v0.27.4](https://github.com/toeverything/AFFiNE/releases/tag/v0.27.4) | 73265 | Notion (full), Miro (partial), OneNote (partial) |
| [Outline](https://github.com/outline/outline) | TypeScript | Other | [v1.10.1](https://github.com/outline/outline/releases/tag/v1.10.1) signed | 40828 | Notion (partial), Confluence (full), HackMD (partial) |
| [Wiki.js](https://github.com/requarks/wiki) | Vue | AGPL-3.0 | [3.0.0-beta.628](https://github.com/requarks/wiki/releases/tag/3.0.0-beta.628) signed | 29014 | Confluence (full) |
| [Docmost](https://github.com/docmost/docmost) | TypeScript | AGPL-3.0 | [v0.96.0](https://github.com/docmost/docmost/releases/tag/v0.96.0) | 21880 | Confluence (full), Notion (partial) |
| [BookStack](https://github.com/BookStackApp/BookStack) | PHP | MIT | [v26.09.1](https://github.com/BookStackApp/BookStack/releases/tag/v26.09.1) signed | 19076 | Confluence (full), Notion (partial) |
| [La Suite Docs](https://github.com/suitenumerique/docs) | Python | MIT | [v5.7.0](https://github.com/suitenumerique/docs/releases/tag/v5.7.0) signed | 16898 | Notion (partial), Confluence (partial) |
| [TiddlyWiki](https://github.com/TiddlyWiki/TiddlyWiki5) | JavaScript | Other | [v5.4.1](https://github.com/TiddlyWiki/TiddlyWiki5/releases/tag/v5.4.1) | 8674 | Notion (partial) |
| [HedgeDoc](https://github.com/hedgedoc/hedgedoc) | TypeScript | AGPL-3.0 | [1.12.0](https://github.com/hedgedoc/hedgedoc/releases/tag/1.12.0) | 7462 | HackMD (full) |
| [SilverBullet](https://github.com/silverbulletmd/silverbullet) | TypeScript | MIT | [2.12.0](https://github.com/silverbulletmd/silverbullet/releases/tag/2.12.0) | 6229 | Notion (partial), Obsidian (partial) |
| [DokuWiki](https://github.com/dokuwiki/dokuwiki) | PHP | GPL-2.0 | [release-2026-07-14c](https://github.com/dokuwiki/dokuwiki/releases/tag/release-2026-07-14c) | 4727 | Confluence (partial) |
| [Documize](https://github.com/documize/community) | JavaScript | AGPL-3.0 | [v5.14.0](https://github.com/documize/community/releases/tag/v5.14.0) | 2419 | Confluence (full) |
| [An Otter Wiki](https://github.com/redimp/otterwiki) | Python | MIT | [v2.25.0](https://github.com/redimp/otterwiki/releases/tag/v2.25.0) | 1551 | Confluence (partial) |
| [XWiki](https://github.com/xwiki/xwiki-platform) | Java | LGPL-2.1 | [xwiki-platform-16.10.19](https://github.com/xwiki/xwiki-platform/releases/tag/xwiki-platform-16.10.19) signed | 1314 | Confluence (full), Notion (partial) |
| [wikmd](https://github.com/Linbreux/wikmd) | Python | MIT | [v1.10.7](https://github.com/Linbreux/wikmd/releases/tag/v1.10.7) signed | 424 | Confluence (partial) |
| [Nextcloud Collectives](https://github.com/nextcloud/collectives) | JavaScript | AGPL-3.0 | [v4.7.1](https://github.com/nextcloud/collectives/releases/tag/v4.7.1) signed | 198 | Confluence (partial), Notion (partial) |

</details>

<details>
<summary><b>Note-taking apps</b>, 21 tools</summary>

Personal notes on desktop and mobile, with sync.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Memos](https://github.com/usememos/memos) | Go | MIT | [v0.31.0](https://github.com/usememos/memos/releases/tag/v0.31.0) signed | 63566 | Google Keep (full) |
| [MarkText](https://github.com/marktext/marktext) | TypeScript | MIT | [v0.20.0](https://github.com/marktext/marktext/releases/tag/v0.20.0) | 62174 | Typora (full) |
| [Joplin](https://github.com/laurent22/joplin) | TypeScript | Other | [v3.7.21](https://github.com/laurent22/joplin/releases/tag/v3.7.21) | 56621 | Evernote (full), Obsidian (partial), OneNote (full) |
| [SiYuan](https://github.com/siyuan-note/siyuan) | TypeScript | AGPL-3.0 | [v3.8.6](https://github.com/siyuan-note/siyuan/releases/tag/v3.8.6) signed | 46650 | Obsidian (full), Notion (partial) |
| [Logseq](https://github.com/logseq/logseq) | Clojure | AGPL-3.0 | [2.0.1](https://github.com/logseq/logseq/releases/tag/2.0.1) | 45153 | Obsidian (full) |
| [Trilium Notes](https://github.com/TriliumNext/Trilium) | TypeScript | AGPL-3.0 | [v0.106.0](https://github.com/TriliumNext/Trilium/releases/tag/v0.106.0) signed | 38226 | Evernote (full), OneNote (partial) |
| [Foam](https://github.com/foambubble/foam) | TypeScript | Other | [vscode@0.46.0](https://github.com/foambubble/foam/releases/tag/vscode%400.46.0) | 17442 | Obsidian (partial) |
| [Xournal++](https://github.com/xournalpp/xournalpp) | C++ | GPL-2.0 | [v1.3.8](https://github.com/xournalpp/xournalpp/releases/tag/v1.3.8) | 15480 | OneNote (partial) |
| [Notesnook](https://github.com/streetwriters/notesnook) | TypeScript | GPL-3.0 | [v3.4.9](https://github.com/streetwriters/notesnook/releases/tag/v3.4.9) signed | 14719 | Evernote (full), Google Keep (full) |
| [Zettlr](https://github.com/Zettlr/Zettlr) | TypeScript | GPL-3.0 | [v4.8.0](https://github.com/Zettlr/Zettlr/releases/tag/v4.8.0) signed | 13725 | Obsidian (partial) |
| [Rnote](https://github.com/flxzt/rnote) | Rust | GPL-3.0 | [v0.14.2](https://github.com/flxzt/rnote/releases/tag/v0.14.2) signed | 11730 | GoodNotes (partial), OneNote (partial) |
| [Blinko](https://github.com/blinkospace/blinko) | TypeScript | GPL-3.0 | [1.8.8](https://github.com/blinkospace/blinko/releases/tag/1.8.8) | 11062 | Google Keep (full) |
| [Anytype](https://github.com/anyproto/anytype-ts) | TypeScript | Other | [v0.57.4](https://github.com/anyproto/anytype-ts/releases/tag/v0.57.4) signed | 8886 | Notion (full) |
| [Standard Notes](https://github.com/standardnotes/app) | TypeScript | AGPL-3.0 | [@standardnotes/desktop@3.202.7](https://github.com/standardnotes/app/releases/tag/%40standardnotes/desktop%403.202.7) signed | 6644 | Evernote (partial), Google Keep (partial) |
| [QOwnNotes](https://github.com/pbek/QOwnNotes) | C++ | GPL-2.0 | [v26.10.2](https://github.com/pbek/QOwnNotes/releases/tag/v26.10.2) signed | 5892 | Evernote (partial), Obsidian (partial) |
| [Simplenote](https://github.com/Automattic/simplenote-electron) | TypeScript | GPL-2.0 | [v2.27.1](https://github.com/Automattic/simplenote-electron/releases/tag/v2.27.1) signed | 5270 | Google Keep (partial) |
| [Saber](https://github.com/saber-notes/saber) | Dart | GPL-3.0 | [v1.36.1](https://github.com/saber-notes/saber/releases/tag/v1.36.1) signed | 4880 | GoodNotes (full) |
| [CherryTree](https://github.com/giuspen/cherrytree) | C++ | Other | [v1.7.2](https://github.com/giuspen/cherrytree/releases/tag/v1.7.2) | 3958 | OneNote (partial) |
| [flatnotes](https://github.com/dullage/flatnotes) | Vue | MIT | [v5.5.5](https://github.com/dullage/flatnotes/releases/tag/v5.5.5) | 3239 | Google Keep (partial) |
| [Zim](https://github.com/zim-desktop-wiki/zim-desktop-wiki) | Python | GPL-2.0 | [0.77.2](https://github.com/zim-desktop-wiki/zim-desktop-wiki/releases/tag/0.77.2) | 2206 | OneNote (partial) |
| [Nextcloud Notes](https://github.com/nextcloud/notes) | JavaScript | AGPL-3.0 | [v6.1.0](https://github.com/nextcloud/notes/releases/tag/v6.1.0) signed | 738 | Google Keep (partial), Evernote (partial) |

</details>

<details>
<summary><b>Recipe managers</b>, 8 tools</summary>

Keep recipes, plan meals and build shopping lists from them.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Mealie](https://github.com/mealie-recipes/mealie) | Python | AGPL-3.0 | [v3.28.0](https://github.com/mealie-recipes/mealie/releases/tag/v3.28.0) | 13457 | Paprika Recipe Manager (full), Plan to Eat (full), AnyList (partial) |
| [Grocy](https://github.com/grocy/grocy) | Blade | MIT | [v4.7.1](https://github.com/grocy/grocy/releases/tag/v4.7.1) signed | 9556 | AnyList (partial) |
| [Tandoor Recipes](https://github.com/TandoorRecipes/recipes) | HTML | Other | [2.6.15](https://github.com/TandoorRecipes/recipes/releases/tag/2.6.15) signed | 8656 | Paprika Recipe Manager (full), Plan to Eat (full) |
| [KitchenOwl](https://github.com/TomBursch/kitchenowl) | Dart | AGPL-3.0 | [v0.7.10](https://github.com/TomBursch/kitchenowl/releases/tag/v0.7.10) signed | 3727 | AnyList (full) |
| [CookCLI](https://github.com/cooklang/cookcli) | Rust | MIT | [v0.37.0](https://github.com/cooklang/cookcli/releases/tag/v0.37.0) signed | 1399 | none |
| [Norish](https://github.com/norish-recipes/norish) | TypeScript | AGPL-3.0 | [v0.24.0-beta](https://github.com/norish-recipes/norish/releases/tag/v0.24.0-beta) signed | 1260 | Paprika Recipe Manager (full) |
| [Bar Assistant](https://github.com/karlomikus/bar-assistant) | PHP | MIT | [v6.8.1](https://github.com/karlomikus/bar-assistant/releases/tag/v6.8.1) signed | 1101 | none |
| [RecipeSage](https://github.com/julianpoy/RecipeSage) | TypeScript | none | [v4.0.16](https://github.com/julianpoy/RecipeSage/releases/tag/v4.0.16) signed | 967 | Plan to Eat (full), AnyList (partial) |

</details>

<details>
<summary><b>Project management</b>, 24 tools</summary>

Issues, tasks and boards for planning team work.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Plane](https://github.com/makeplane/plane) | TypeScript | AGPL-3.0 | [v1.4.2](https://github.com/makeplane/plane/releases/tag/v1.4.2) signed | 60444 | Jira (full), Linear (full), ClickUp (partial), monday.com (partial) |
| [Huly](https://github.com/hcengineering/platform) | TypeScript | EPL-2.0 | [v0.7.426](https://github.com/hcengineering/platform/releases/tag/v0.7.426) | 27841 | Jira (partial), Linear (full), ClickUp (partial) |
| [Focalboard](https://github.com/mattermost-community/focalboard) | TypeScript | Other | [v8.0.0](https://github.com/mattermost-community/focalboard/releases/tag/v8.0.0) signed | 26496 | Trello (full), Asana (partial), Notion (partial) |
| [Super Productivity](https://github.com/super-productivity/super-productivity) | TypeScript | MIT | [v19.1.0](https://github.com/super-productivity/super-productivity/releases/tag/v19.1.0) | 22582 | Todoist (partial) |
| [WeKan](https://github.com/wekan/wekan) | JavaScript | MIT | [v12.19](https://github.com/wekan/wekan/releases/tag/v12.19) | 21109 | Trello (full) |
| [OpenProject](https://github.com/opf/openproject) | Ruby | GPL-3.0 | [v17.9.1](https://github.com/opf/openproject/releases/tag/v17.9.1) signed | 16325 | Jira (full), Asana (partial), ClickUp (partial), monday.com (partial) |
| [PLANKA](https://github.com/plankanban/planka) | JavaScript | Other | [v2.2.1](https://github.com/plankanban/planka/releases/tag/v2.2.1) | 12604 | Trello (full) |
| [Leantime](https://github.com/Leantime/leantime) | PHP | AGPL-3.0 | [v3.10.4](https://github.com/Leantime/leantime/releases/tag/v3.10.4) signed | 11739 | Asana (full) |
| [Kanboard](https://github.com/kanboard/kanboard) | PHP | MIT | [v1.2.54](https://github.com/kanboard/kanboard/releases/tag/v1.2.54) | 9895 | Trello (full) |
| [Kaneo](https://github.com/usekaneo/kaneo) | TypeScript | MIT | [v2.33.0](https://github.com/usekaneo/kaneo/releases/tag/v2.33.0) | 9356 | Trello (full), Asana (partial), Linear (partial) |
| [Taskwarrior](https://github.com/GothenburgBitFactory/taskwarrior) | C++ | MIT | [v3.5.0](https://github.com/GothenburgBitFactory/taskwarrior/releases/tag/v3.5.0) | 6104 | Todoist (partial) |
| [Kan](https://github.com/kanbn/kan) | TypeScript | AGPL-3.0 | [v0.6.0](https://github.com/kanbn/kan/releases/tag/v0.6.0) | 5734 | Trello (full) |
| [Planify](https://github.com/alainm23/planify) | Vala | GPL-3.0 | [v4.20.0](https://github.com/alainm23/planify/releases/tag/v4.20.0) signed | 5733 | Todoist (partial) |
| [Tasks.org](https://github.com/tasks/tasks) | Kotlin | GPL-3.0 | [15.12](https://github.com/tasks/tasks/releases/tag/15.12) | 5634 | Todoist (partial) |
| [Vikunja](https://github.com/go-vikunja/vikunja) | Go | AGPL-3.0 | [v2.7.0](https://github.com/go-vikunja/vikunja/releases/tag/v2.7.0) signed | 5621 | Trello (full), Asana (partial), Todoist (full) |
| [tududi](https://github.com/chrisvel/tududi) | JavaScript | MIT | [v1.7.11](https://github.com/chrisvel/tududi/releases/tag/v1.7.11) | 3411 | Todoist (partial) |
| [Worklenz](https://github.com/Worklenz/worklenz) | TypeScript | AGPL-3.0 | [v3.1.0](https://github.com/Worklenz/worklenz/releases/tag/v3.1.0) | 3197 | monday.com (partial), ClickUp (partial) |
| [Donetick](https://github.com/donetick/donetick) | Go | AGPL-3.0 | [v0.1.80](https://github.com/donetick/donetick/releases/tag/v0.1.80) signed | 2622 | Todoist (partial) |
| [ZenTao](https://github.com/easysoft/zentaopms) | PHP | Other | [zentaopms_21.7.1_20250529](https://github.com/easysoft/zentaopms/releases/tag/zentaopms_21.7.1_20250529) | 1693 | Jira (full) |
| [Nextcloud Deck](https://github.com/nextcloud/deck) | JavaScript | AGPL-3.0 | [v1.19.0](https://github.com/nextcloud/deck/releases/tag/v1.19.0) signed | 1425 | Trello (full) |
| [GanttProject](https://github.com/bardsoftware/ganttproject) | Java | GPL-3.0 | [ganttproject-3.3.3316](https://github.com/bardsoftware/ganttproject/releases/tag/ganttproject-3.3.3316) | 1103 | Microsoft Project (full) |
| [Taiga](https://github.com/taigaio/taiga-back) | Python | MPL-2.0 | [6.10.2](https://github.com/taigaio/taiga-back/releases/tag/6.10.2) | 856 | Jira (full), Trello (partial) |
| [4ga Boards](https://github.com/RARgames/4gaBoards) | JavaScript | MIT | [v3.3.13](https://github.com/RARgames/4gaBoards/releases/tag/v3.3.13) | 724 | Trello (full) |
| [Errands](https://github.com/mrvladus/Errands) | Python | MIT | [46.2.10](https://github.com/mrvladus/Errands/releases/tag/46.2.10) | 520 | Todoist (partial) |

</details>

<details>
<summary><b>Video conferencing</b>, 11 tools</summary>

Video meetings in the browser or an app.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Jitsi Meet](https://github.com/jitsi/jitsi-meet) | TypeScript | Apache-2.0 | [stable/jitsi-meet_11248](https://github.com/jitsi/jitsi-meet/releases/tag/stable/jitsi-meet_11248) | 30050 | Zoom (full), Microsoft Teams (partial) |
| [BigBlueButton](https://github.com/bigbluebutton/bigbluebutton) | JavaScript | LGPL-3.0 | [v3.0.39](https://github.com/bigbluebutton/bigbluebutton/releases/tag/v3.0.39) signed | 9236 | Zoom (partial) |
| [MiroTalk P2P](https://github.com/miroslavpejic85/mirotalk) | JavaScript | AGPL-3.0 | none | 4769 | Zoom (partial) |
| [MiroTalk SFU](https://github.com/miroslavpejic85/mirotalksfu) | JavaScript | AGPL-3.0 | none | 3121 | Zoom (partial) |
| [La Suite Meet](https://github.com/suitenumerique/meet) | Python | MIT | [v1.32.1](https://github.com/suitenumerique/meet/releases/tag/v1.32.1) | 2417 | Zoom (full) |
| [Nextcloud Talk](https://github.com/nextcloud/spreed) | JavaScript | AGPL-3.0 | [v25.0.5](https://github.com/nextcloud/spreed/releases/tag/v25.0.5) signed | 2206 | Zoom (partial), Microsoft Teams (partial) |
| [Galene](https://github.com/jech/galene) | Go | MIT | [galene-1.2.1](https://github.com/jech/galene/releases/tag/galene-1.2.1) | 1417 | Zoom (partial) |
| [edumeet](https://github.com/edumeet/edumeet) | Shell | MIT | [4.0.0](https://github.com/edumeet/edumeet/releases/tag/4.0.0) | 1348 | Zoom (partial) |
| [Element Call](https://github.com/element-hq/element-call) | TypeScript | AGPL-3.0 | [v0.26.1](https://github.com/element-hq/element-call/releases/tag/v0.26.1) signed | 1009 | Zoom (partial) |
| [Apache OpenMeetings](https://github.com/apache/openmeetings) | Java | Other | [9.1.0](https://github.com/apache/openmeetings/releases/tag/9.1.0) signed | 686 | Zoom (partial) |
| [plugNmeet](https://github.com/mynaparrot/plugNmeet-server) | Go | MIT | [v2.5.2](https://github.com/mynaparrot/plugNmeet-server/releases/tag/v2.5.2) signed | 567 | Zoom (full) |

</details>

<details>
<summary><b>Newsletters and email marketing</b>, 11 tools</summary>

Mailing lists, campaigns and subscriber management.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Ghost](https://github.com/TryGhost/Ghost) | TypeScript | MIT | [v6.68.0](https://github.com/TryGhost/Ghost/releases/tag/v6.68.0) | 55492 | Substack (full), Mailchimp (partial), Squarespace (partial), Wix (partial) |
| [listmonk](https://github.com/knadh/listmonk) | Go | AGPL-3.0 | [v6.2.0](https://github.com/knadh/listmonk/releases/tag/v6.2.0) | 23704 | Mailchimp (partial) |
| [BillionMail](https://github.com/Billionmail/BillionMail) | Go | AGPL-3.0 | [v4.9](https://github.com/Billionmail/BillionMail/releases/tag/v4.9) | 15858 | Mailchimp (partial) |
| [Mautic](https://github.com/mautic/mautic) | PHP | Other | [7.2.1](https://github.com/mautic/mautic/releases/tag/7.2.1) signed | 10717 | Mailchimp (full) |
| [Plunk](https://github.com/useplunk/plunk) | TypeScript | AGPL-3.0 | [v0.15.0](https://github.com/useplunk/plunk/releases/tag/v0.15.0) signed | 5506 | Mailchimp (partial), SendGrid (partial) |
| [WriteFreely](https://github.com/writefreely/writefreely) | Go | AGPL-3.0 | [v0.17.2](https://github.com/writefreely/writefreely/releases/tag/v0.17.2) | 5264 | Substack (partial) |
| [useSend](https://github.com/usesend/useSend) | TypeScript | AGPL-3.0 | [v1.9.8](https://github.com/usesend/useSend/releases/tag/v1.9.8) signed | 4703 | SendGrid (full) |
| [Notifuse](https://github.com/Notifuse/notifuse) | Go | Other | [v41.0](https://github.com/Notifuse/notifuse/releases/tag/v41.0) | 2235 | Mailchimp (partial) |
| [Keila](https://github.com/pentacent/keila) | Elixir | AGPL-3.0 | [0.30.3](https://github.com/pentacent/keila/releases/tag/0.30.3) | 2228 | Substack (partial) |
| [phpList](https://github.com/phpList/phplist3) | PHP | AGPL-3.0 | [v3.6.17](https://github.com/phpList/phplist3/releases/tag/v3.6.17) | 875 | Mailchimp (partial) |
| [Sympa](https://github.com/sympa-community/sympa) | Perl | GPL-2.0 | [6.2.80](https://github.com/sympa-community/sympa/releases/tag/6.2.80) | 317 | none |

</details>

<details>
<summary><b>Forms and surveys</b>, 9 tools</summary>

Build forms and surveys and collect the answers.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Formbricks](https://github.com/formbricks/formbricks) | TypeScript | Other | [6.0.2](https://github.com/formbricks/formbricks/releases/tag/6.0.2) signed | 13069 | Typeform (full), Google Forms (full), SurveyMonkey (full), Jotform (partial), Hotjar (partial) |
| [Typebot](https://github.com/baptisteArno/typebot.io) | TypeScript | Other | [v3.19.0](https://github.com/baptisteArno/typebot.io/releases/tag/v3.19.0) signed | 10502 | Typeform (partial) |
| [HeyForm](https://github.com/heyform/heyform) | TypeScript | AGPL-3.0 | [v3.0.3](https://github.com/heyform/heyform/releases/tag/v3.0.3) | 8999 | Typeform (full), SurveyMonkey (partial), Jotform (partial) |
| [OpnForm](https://github.com/OpnForm/OpnForm) | PHP | Other | [v2.5.0](https://github.com/OpnForm/OpnForm/releases/tag/v2.5.0) signed | 3787 | Typeform (full), Google Forms (full) |
| [LimeSurvey](https://github.com/LimeSurvey/LimeSurvey) | JavaScript | Other | [7.4.0+260928](https://github.com/LimeSurvey/LimeSurvey/releases/tag/7.4.0%2B260928) | 3746 | Typeform (partial), Google Forms (full), SurveyMonkey (full), Jotform (partial) |
| [Form.io](https://github.com/formio/formio) | JavaScript | OSL-3.0 | [v4.10.1](https://github.com/formio/formio/releases/tag/v4.10.1) | 2320 | Jotform (partial) |
| [Nextcloud Forms](https://github.com/nextcloud/forms) | JavaScript | AGPL-3.0 | [v5.4.0](https://github.com/nextcloud/forms/releases/tag/v5.4.0) signed | 383 | Google Forms (full) |
| [ODK Central](https://github.com/getodk/central) | JavaScript | Apache-2.0 | [v2026.3.1](https://github.com/getodk/central/releases/tag/v2026.3.1) signed | 228 | Google Forms (partial) |
| [KoboToolbox](https://github.com/kobotoolbox/kpi) | Python | AGPL-3.0 | [2.026.37a](https://github.com/kobotoolbox/kpi/releases/tag/2.026.37a) signed | 185 | Google Forms (partial) |

</details>

<details>
<summary><b>Photo libraries</b>, 12 tools</summary>

Back up, browse and share photos and videos from your phones.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Immich](https://github.com/immich-app/immich) | TypeScript | AGPL-3.0 | [v3.2.4](https://github.com/immich-app/immich/releases/tag/v3.2.4) | 115675 | Google Photos (full) |
| [PhotoPrism](https://github.com/photoprism/photoprism) | Go | Other | [260919-28c46a116](https://github.com/photoprism/photoprism/releases/tag/260919-28c46a116) | 40276 | Google Photos (partial) |
| [Ente Photos](https://github.com/ente/ente) | Dart | AGPL-3.0 | [ensu-v0.1.21](https://github.com/ente/ente/releases/tag/ensu-v0.1.21) | 29262 | Google Photos (full) |
| [LibrePhotos](https://github.com/LibrePhotos/librephotos) | Python | MIT | [1.2.1](https://github.com/LibrePhotos/librephotos/releases/tag/1.2.1) signed | 8090 | Google Photos (partial) |
| [Photoview](https://github.com/photoview/photoview) | Go | AGPL-3.0 | [v2.4.0](https://github.com/photoview/photoview/releases/tag/v2.4.0) signed | 6542 | Google Photos (partial) |
| [Lychee](https://github.com/LycheeOrg/Lychee) | PHP | MIT | [v7.10.0](https://github.com/LycheeOrg/Lychee/releases/tag/v7.10.0) signed | 4308 | Flickr (partial) |
| [Piwigo](https://github.com/Piwigo/Piwigo) | PHP | GPL-2.0 | [16.4.0](https://github.com/Piwigo/Piwigo/releases/tag/16.4.0) | 3867 | Flickr (partial) |
| [Memories](https://github.com/pulsejet/memories) | PHP | AGPL-3.0 | [v9.0.1](https://github.com/pulsejet/memories/releases/tag/v9.0.1) | 3850 | Google Photos (partial) |
| [PiGallery 2](https://github.com/bpatrik/pigallery2) | TypeScript | MIT | [3.5.2](https://github.com/bpatrik/pigallery2/releases/tag/3.5.2) | 2294 | none |
| [Damselfly](https://github.com/Webreaper/Damselfly) | C# | GPL-3.0 | [4.5.3](https://github.com/Webreaper/Damselfly/releases/tag/4.5.3) | 1789 | none |
| [HomeGallery](https://github.com/xemle/home-gallery) | JavaScript | MIT | [v1.21.0](https://github.com/xemle/home-gallery/releases/tag/v1.21.0) | 1195 | Google Photos (partial) |
| [Chevereto](https://github.com/chevereto/chevereto) | PHP | AGPL-3.0 | [4.5.7](https://github.com/chevereto/chevereto/releases/tag/4.5.7) | 998 | Flickr (partial) |

</details>

<details>
<summary><b>Media servers</b>, 21 tools</summary>

Stream a personal library of films, series and music to your devices.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Jellyfin](https://github.com/jellyfin/jellyfin) | C# | GPL-2.0 | [v12.2](https://github.com/jellyfin/jellyfin/releases/tag/v12.2) | 57840 | Plex (full), Emby (full), Netflix (partial) |
| [Navidrome](https://github.com/navidrome/navidrome) | Go | GPL-3.0 | [v0.64.2](https://github.com/navidrome/navidrome/releases/tag/v0.64.2) signed | 23998 | Plex (partial), Spotify (partial) |
| [Koel](https://github.com/koel/koel) | PHP | MIT | [v9.15.0](https://github.com/koel/koel/releases/tag/v9.15.0) | 17271 | Plex (partial), Spotify (partial) |
| [Audiobookshelf](https://github.com/advplyr/audiobookshelf) | JavaScript | GPL-3.0 | [v2.37.1](https://github.com/advplyr/audiobookshelf/releases/tag/v2.37.1) | 14560 | none |
| [Streama](https://github.com/streamaserver/streama) | JavaScript | MIT | [v1.11.0](https://github.com/streamaserver/streama/releases/tag/v1.11.0) | 9819 | Netflix (partial), Emby (partial) |
| [Mopidy](https://github.com/mopidy/mopidy) | Python | Apache-2.0 | [v4.0.4](https://github.com/mopidy/mopidy/releases/tag/v4.0.4) signed | 8592 | none |
| [Snapcast](https://github.com/snapcast/snapcast) | C++ | GPL-3.0 | [v0.35.0](https://github.com/snapcast/snapcast/releases/tag/v0.35.0) | 7906 | none |
| [Black Candy](https://github.com/blackcandy-org/blackcandy) | Ruby | MIT | [v3.2.1](https://github.com/blackcandy-org/blackcandy/releases/tag/v3.2.1) | 4425 | Spotify (partial) |
| [Ampache](https://github.com/ampache/ampache) | PHP | AGPL-3.0 | [8.2.2](https://github.com/ampache/ampache/releases/tag/8.2.2) signed | 3834 | Plex (partial), Spotify (partial) |
| [Music Assistant](https://github.com/music-assistant/server) | Python | Apache-2.0 | [2.10.5](https://github.com/music-assistant/server/releases/tag/2.10.5) | 3140 | none |
| [Polaris](https://github.com/agersant/polaris) | Rust | MIT | [0.16.1](https://github.com/agersant/polaris/releases/tag/0.16.1) | 2734 | Spotify (partial) |
| [Universal Media Server](https://github.com/UniversalMediaServer/UniversalMediaServer) | Java | GPL-2.0 | [15.8.2](https://github.com/UniversalMediaServer/UniversalMediaServer/releases/tag/15.8.2) | 2657 | Netflix (partial), Emby (partial) |
| [Tunarr](https://github.com/chrisbenincasa/tunarr) | TypeScript | Zlib | [v2026.9.3](https://github.com/chrisbenincasa/tunarr/releases/tag/v2026.9.3) | 2631 | none |
| [OwnTone](https://github.com/owntone/owntone-server) | C | GPL-2.0 | [29.3](https://github.com/owntone/owntone-server/releases/tag/29.3) | 2565 | none |
| [gonic](https://github.com/sentriz/gonic) | Go | GPL-3.0 | [v0.22.0](https://github.com/sentriz/gonic/releases/tag/v0.22.0) signed | 2560 | Spotify (partial) |
| [Kyoo](https://github.com/zoriya/Kyoo) | TypeScript | GPL-3.0 | [v5.2.1](https://github.com/zoriya/Kyoo/releases/tag/v5.2.1) signed | 2530 | Plex (full), Netflix (partial) |
| [mStream](https://github.com/IrosTheBeggar/mStream) | JavaScript | GPL-3.0 | [v6.31.1](https://github.com/IrosTheBeggar/mStream/releases/tag/v6.31.1) | 2402 | Spotify (partial) |
| [Swing Music](https://github.com/swingmx/swingmusic) | Python | AGPL-3.0 | [v3.0.0](https://github.com/swingmx/swingmusic/releases/tag/v3.0.0) | 2080 | Spotify (partial) |
| [Lyrion Music Server](https://github.com/LMS-Community/slimserver) | Perl | Other | [9.1.1](https://github.com/LMS-Community/slimserver/releases/tag/9.1.1) | 1786 | none |
| [LMS](https://github.com/epoupon/lms) | C++ | GPL-3.0 | [v3.81.0](https://github.com/epoupon/lms/releases/tag/v3.81.0) | 1682 | Spotify (partial) |
| [Gerbera](https://github.com/gerbera/gerbera) | C++ | Other | [v3.3.0](https://github.com/gerbera/gerbera/releases/tag/v3.3.0) | 1394 | Plex (partial) |

</details>

<details>
<summary><b>Video hosting and streaming</b>, 11 tools</summary>

Publish videos and live streams on your own site for an audience to watch.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [SRS](https://github.com/ossrs/srs) | C++ | MIT | [v6.0-r2](https://github.com/ossrs/srs/releases/tag/v6.0-r2) | 29319 | none |
| [MediaMTX](https://github.com/bluenviron/mediamtx) | Go | MIT | [v1.21.1](https://github.com/bluenviron/mediamtx/releases/tag/v1.21.1) signed | 20348 | none |
| [PeerTube](https://github.com/Chocobozzz/PeerTube) | TypeScript | AGPL-3.0 | [v8.3.1](https://github.com/Chocobozzz/PeerTube/releases/tag/v8.3.1) signed | 15345 | YouTube (full), Vimeo (full), Twitch (partial) |
| [Owncast](https://github.com/owncast/owncast) | Go | MIT | [v0.3.0](https://github.com/owncast/owncast/releases/tag/v0.3.0) | 11576 | Twitch (partial) |
| [Restreamer](https://github.com/datarhei/restreamer) | HTML | Apache-2.0 | [v2.12.0](https://github.com/datarhei/restreamer/releases/tag/v2.12.0) | 5206 | Twitch (partial) |
| [MediaCMS](https://github.com/mediacms-io/mediacms) | Python | AGPL-3.0 | [v9.1.2](https://github.com/mediacms-io/mediacms/releases/tag/v9.1.2) | 5136 | YouTube (partial), Vimeo (partial) |
| [Ant Media Server](https://github.com/ant-media/Ant-Media-Server) | Java | Other | [ams-v3.1.0](https://github.com/ant-media/Ant-Media-Server/releases/tag/ams-v3.1.0) | 4742 | Wowza Streaming Engine (partial) |
| [OvenMediaEngine](https://github.com/OvenMediaLabs/OvenMediaEngine) | C++ | AGPL-3.0 | [v0.21.0](https://github.com/OvenMediaLabs/OvenMediaEngine/releases/tag/v0.21.0) | 3287 | Wowza Streaming Engine (full) |
| [AVideo](https://github.com/WWBN/AVideo) | JavaScript | Other | [v29.3.0](https://github.com/WWBN/AVideo/releases/tag/v29.3.0) signed | 2104 | YouTube (partial), Vimeo (partial), Twitch (partial) |
| [Fireshare](https://github.com/fireshare-app/fireshare) | JavaScript | GPL-3.0 | [v1.8.5](https://github.com/fireshare-app/fireshare/releases/tag/v1.8.5) signed | 1496 | YouTube (partial) |
| [ClipBucket](https://github.com/MacWarrior/clipbucket-v5) | JavaScript | Other | [5.5.3-#197](https://github.com/MacWarrior/clipbucket-v5/releases/tag/5.5.3-%23197) signed | 183 | YouTube (partial), Vimeo (partial) |

</details>

<details>
<summary><b>Book and comic servers</b>, 8 tools</summary>

Serve a personal library of ebooks, comics and manga to readers and reading apps.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [calibre](https://github.com/kovidgoyal/calibre) | Python | GPL-3.0 | [v9.15.0](https://github.com/kovidgoyal/calibre/releases/tag/v9.15.0) signed | 26074 | Google Play Books (partial), Amazon Kindle (partial) |
| [Calibre-Web](https://github.com/janeczku/calibre-web) | Fluent | GPL-3.0 | [0.6.27](https://github.com/janeczku/calibre-web/releases/tag/0.6.27) | 18333 | Google Play Books (partial), Amazon Kindle (partial) |
| [Kavita](https://github.com/Kareadita/Kavita) | C# | GPL-3.0 | [v0.9.1.4](https://github.com/Kareadita/Kavita/releases/tag/v0.9.1.4) signed | 11808 | Google Play Books (partial), Amazon Kindle (partial) |
| [Komga](https://github.com/gotson/komga) | Kotlin | MIT | [1.28.1](https://github.com/gotson/komga/releases/tag/1.28.1) | 6715 | Google Play Books (partial), Amazon Kindle (partial) |
| [Calibre-Web Automated](https://github.com/crocodilestick/Calibre-Web-Automated) | JavaScript | GPL-3.0 | [v4.0.8](https://github.com/crocodilestick/Calibre-Web-Automated/releases/tag/v4.0.8) | 6375 | Calibre-Web (drop-in), Google Play Books (partial), Amazon Kindle (partial) |
| [Stump](https://github.com/stumpapp/stump) | TypeScript | MIT | [v0.1.10](https://github.com/stumpapp/stump/releases/tag/v0.1.10) signed | 2731 | Google Play Books (partial), Amazon Kindle (partial) |
| [BookLore](https://github.com/booklore-app/booklore) | Java | AGPL-3.0 | [v2.4.0](https://github.com/booklore-app/booklore/releases/tag/v2.4.0) signed | 1272 | Google Play Books (partial), Amazon Kindle (partial) |
| [Codex](https://github.com/ajslater/codex) | Python | GPL-3.0 | [v2.5.2](https://github.com/ajslater/codex/releases/tag/v2.5.2) signed | 326 | none |

</details>

<details>
<summary><b>Business intelligence</b>, 12 tools</summary>

Query databases and build charts and dashboards for the rest of the company.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Apache Superset](https://github.com/apache/superset) | Python | Apache-2.0 | [6.1.0](https://github.com/apache/superset/releases/tag/6.1.0) | 75054 | Tableau (full), Power BI (partial), Looker (partial) |
| [Metabase](https://github.com/metabase/metabase) | Clojure | Other | [v0.63.19](https://github.com/metabase/metabase/releases/tag/v0.63.19) signed | 49556 | Tableau (partial), Looker (partial), Power BI (partial) |
| [Redash](https://github.com/getredash/redash) | Python | BSD-2-Clause | [v26.9.0](https://github.com/getredash/redash/releases/tag/v26.9.0) | 28832 | Tableau (partial), Power BI (partial) |
| [DataEase](https://github.com/dataease/dataease) | Java | Other | [v3.1.0](https://github.com/dataease/dataease/releases/tag/v3.1.0) | 24588 | Tableau (partial), Power BI (partial) |
| [WrenAI](https://github.com/Canner/WrenAI) | Python | Other | [wren-v0.15.0](https://github.com/Canner/WrenAI/releases/tag/wren-v0.15.0) signed | 17808 | none |
| [Evidence](https://github.com/evidence-dev/evidence) | TypeScript | MIT | [@evidence-dev/evidence@40.1.8](https://github.com/evidence-dev/evidence/releases/tag/%40evidence-dev/evidence%4040.1.8) | 6984 | Looker (partial) |
| [Lightdash](https://github.com/lightdash/lightdash) | TypeScript | Other | [2.446.0](https://github.com/lightdash/lightdash/releases/tag/2.446.0) | 6177 | Looker (full) |
| [Blazer](https://github.com/ankane/blazer) | Ruby | MIT | [v3.5.2](https://github.com/ankane/blazer/releases/tag/v3.5.2) | 4803 | none |
| [Observable Framework](https://github.com/observablehq/framework) | TypeScript | ISC | [v1.13.4](https://github.com/observablehq/framework/releases/tag/v1.13.4) signed | 3658 | none |
| [Rill](https://github.com/rilldata/rill) | Go | Apache-2.0 | [v0.90.3](https://github.com/rilldata/rill/releases/tag/v0.90.3) | 2930 | Looker (partial) |
| [SQLPage](https://github.com/sqlpage/SQLPage) | Rust | MIT | [v0.46.3](https://github.com/sqlpage/SQLPage/releases/tag/v0.46.3) | 2572 | none |
| [DataLens](https://github.com/datalens-tech/datalens) | PLpgSQL | Apache-2.0 | [v2.9.0](https://github.com/datalens-tech/datalens/releases/tag/v2.9.0) signed | 1705 | Tableau (partial) |

</details>

<details>
<summary><b>Backend as a service</b>, 10 tools</summary>

Auth, database, storage and APIs for an app, without writing the backend.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Supabase](https://github.com/supabase/supabase) | TypeScript | Apache-2.0 | [v1.26.08](https://github.com/supabase/supabase/releases/tag/v1.26.08) signed | 111176 | Firebase (full) |
| [PocketBase](https://github.com/pocketbase/pocketbase) | Go | MIT | [v0.40.4](https://github.com/pocketbase/pocketbase/releases/tag/v0.40.4) | 61307 | Firebase (partial) |
| [Appwrite](https://github.com/appwrite/appwrite) | PHP | BSD-3-Clause | [2.3.0](https://github.com/appwrite/appwrite/releases/tag/2.3.0) signed | 57584 | Firebase (full) |
| [Hasura GraphQL Engine](https://github.com/hasura/graphql-engine) | TypeScript | Apache-2.0 | [v2.50.3](https://github.com/hasura/graphql-engine/releases/tag/v2.50.3) | 32131 | Firebase (partial) |
| [Parse Server](https://github.com/parse-community/parse-server) | JavaScript | Apache-2.0 | [9.10.3](https://github.com/parse-community/parse-server/releases/tag/9.10.3) | 21403 | Firebase (full) |
| [Convex](https://github.com/get-convex/convex-backend) | TypeScript | Other | [precompiled-2026-09-28-5c7cb5b](https://github.com/get-convex/convex-backend/releases/tag/precompiled-2026-09-28-5c7cb5b) | 12660 | Firebase (full) |
| [Instant](https://github.com/instantdb/instant) | TypeScript | Apache-2.0 | none | 10544 | Firebase (partial) |
| [Nhost](https://github.com/nhost/nhost) | TypeScript | MIT | [cli@1.51.2](https://github.com/nhost/nhost/releases/tag/cli%401.51.2) signed | 9348 | Firebase (full) |
| [TrailBase](https://github.com/trailbaseio/trailbase) | Rust | OSL-3.0 | [v0.34.4](https://github.com/trailbaseio/trailbase/releases/tag/v0.34.4) | 5648 | Firebase (partial), PocketBase (full) |
| [Kuzzle](https://github.com/kuzzleio/kuzzle) | TypeScript | Apache-2.0 | [v2.59.0](https://github.com/kuzzleio/kuzzle/releases/tag/v2.59.0) | 1668 | Firebase (partial) |

</details>

<details>
<summary><b>Self-hosted PaaS</b>, 12 tools</summary>

Deploy apps and databases to your own servers from a git push or a dashboard.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Coolify](https://github.com/coollabsio/coolify) | PHP | Apache-2.0 | [v4.4.0](https://github.com/coollabsio/coolify/releases/tag/v4.4.0) | 62649 | Heroku (full), Render (full), Railway (full), Vercel (partial), Netlify (partial) |
| [Dokploy](https://github.com/Dokploy/dokploy) | TypeScript | Other | [v0.30.8](https://github.com/Dokploy/dokploy/releases/tag/v0.30.8) | 37684 | Heroku (full), Render (full), Railway (full), Vercel (partial), Netlify (partial) |
| [Dokku](https://github.com/dokku/dokku) | Go | MIT | [v0.38.31](https://github.com/dokku/dokku/releases/tag/v0.38.31) | 32171 | Heroku (full) |
| [Sealos](https://github.com/labring/sealos) | TypeScript | Other | [v5.1.1](https://github.com/labring/sealos/releases/tag/v5.1.1) signed | 18368 | none |
| [CapRover](https://github.com/caprover/caprover) | TypeScript | Other | [v1.15.4](https://github.com/caprover/caprover/releases/tag/v1.15.4) signed | 15178 | Heroku (full), Vercel (partial), Netlify (partial), Railway (full), Render (full) |
| [Kamal](https://github.com/basecamp/kamal) | Ruby | MIT | [v2.12.0](https://github.com/basecamp/kamal/releases/tag/v2.12.0) | 14634 | Heroku (partial) |
| [Piku](https://github.com/piku/piku) | Python | MIT | [v1.0.0](https://github.com/piku/piku/releases/tag/v1.0.0) signed | 6604 | Heroku (partial) |
| [Rainbond](https://github.com/goodrain/rainbond) | Go | Other | [v6.9.10-release](https://github.com/goodrain/rainbond/releases/tag/v6.9.10-release) signed | 6271 | none |
| [Tsuru](https://github.com/tsuru/tsuru) | Go | BSD-3-Clause | [v1.32.0](https://github.com/tsuru/tsuru/releases/tag/v1.32.0) signed | 5312 | Heroku (full) |
| [Kubero](https://github.com/kubero-dev/kubero) | TypeScript | GPL-3.0 | [v3.1.1](https://github.com/kubero-dev/kubero/releases/tag/v3.1.1) signed | 4430 | Heroku (full), Vercel (partial), Netlify (partial), Railway (full), Render (full) |
| [Canine](https://github.com/CanineHQ/canine) | Ruby | Apache-2.0 | none | 2938 | Heroku (full) |
| [Epinio](https://github.com/epinio/epinio) | Go | Apache-2.0 | [v1.14.2](https://github.com/epinio/epinio/releases/tag/v1.14.2) signed | 612 | Heroku (partial) |

</details>

<details>
<summary><b>Headless CMS</b>, 15 tools</summary>

Manage content in an admin UI and deliver it to any front end through an API.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Strapi](https://github.com/strapi/strapi) | TypeScript | Other | [v5.56.0](https://github.com/strapi/strapi/releases/tag/v5.56.0) | 73287 | Contentful (full) |
| [Payload](https://github.com/payloadcms/payload) | TypeScript | MIT | [v3.90.2](https://github.com/payloadcms/payload/releases/tag/v3.90.2) | 45112 | Contentful (full), Strapi (full) |
| [Directus](https://github.com/directus/directus) | TypeScript | Other | [v12.4.1](https://github.com/directus/directus/releases/tag/v12.4.1) signed | 38081 | Contentful (full) |
| [Wagtail](https://github.com/wagtail/wagtail) | Python | BSD-3-Clause | [v8.0](https://github.com/wagtail/wagtail/releases/tag/v8.0) | 20529 | Contentful (partial) |
| [Decap CMS](https://github.com/decaporg/decap-cms) | JavaScript | MIT | [decap-cms@3.16.3](https://github.com/decaporg/decap-cms/releases/tag/decap-cms%403.16.3) | 19415 | Contentful (partial) |
| [TinaCMS](https://github.com/tinacms/tinacms) | TypeScript | Apache-2.0 | [tinacms@3.14.2](https://github.com/tinacms/tinacms/releases/tag/tinacms%403.14.2) signed | 13825 | Contentful (partial) |
| [Keystone](https://github.com/keystonejs/keystone) | TypeScript | MIT | [2026-08-31](https://github.com/keystonejs/keystone/releases/tag/2026-08-31) signed | 9979 | Contentful (full) |
| [Webiny](https://github.com/webiny/webiny-js) | TypeScript | Other | [v6.4.11](https://github.com/webiny/webiny-js/releases/tag/v6.4.11) | 8047 | Contentful (full) |
| [ApostropheCMS](https://github.com/apostrophecms/apostrophe) | JavaScript | none | [eslint-config-apostrophe@6.1.0](https://github.com/apostrophecms/apostrophe/releases/tag/eslint-config-apostrophe%406.1.0) | 4639 | Contentful (partial) |
| [Pages CMS](https://github.com/hunvreus/pagescms) | TypeScript | MIT | [2.1.8](https://github.com/hunvreus/pagescms/releases/tag/2.1.8) | 4068 | Decap CMS (full) |
| [Outstatic](https://github.com/avitorio/outstatic) | TypeScript | Other | [v2.2.4](https://github.com/avitorio/outstatic/releases/tag/v2.2.4) | 3168 | Decap CMS (partial) |
| [Sveltia CMS](https://github.com/sveltia/sveltia-cms) | JavaScript | MIT | [v0.229.0](https://github.com/sveltia/sveltia-cms/releases/tag/v0.229.0) | 2919 | Decap CMS (drop-in) |
| [Squidex](https://github.com/Squidex/squidex) | C# | MIT | [7.24.0](https://github.com/Squidex/squidex/releases/tag/7.24.0) | 2509 | Contentful (full) |
| [Keystatic](https://github.com/Thinkmill/keystatic) | TypeScript | MIT | [@keystatic/next@5.0.5](https://github.com/Thinkmill/keystatic/releases/tag/%40keystatic/next%405.0.5) | 2437 | Decap CMS (full) |
| [Cockpit](https://github.com/Cockpit-HQ/Cockpit) | PHP | Other | [2.14.1](https://github.com/Cockpit-HQ/Cockpit/releases/tag/2.14.1) | 751 | Contentful (partial) |

</details>

<details>
<summary><b>Website CMS</b>, 18 tools</summary>

Run a website from a web back office, with pages, menus, themes and plugins.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Grav](https://github.com/getgrav/grav) | PHP | MIT | [2.2.4](https://github.com/getgrav/grav/releases/tag/2.2.4) signed | 15681 | Squarespace (partial) |
| [django CMS](https://github.com/django-cms/django-cms) | Python | Other | [5.1.3](https://github.com/django-cms/django-cms/releases/tag/5.1.3) signed | 10676 | none |
| [Orchard Core](https://github.com/OrchardCMS/OrchardCore) | C# | BSD-3-Clause | [v3.0.1](https://github.com/OrchardCMS/OrchardCore/releases/tag/v3.0.1) signed | 8194 | Contentful (partial) |
| [Umbraco](https://github.com/umbraco/Umbraco-CMS) | C# | MIT | [release-18.2.1](https://github.com/umbraco/Umbraco-CMS/releases/tag/release-18.2.1) signed | 5262 | Contentful (partial) |
| [Joomla](https://github.com/joomla/joomla-cms) | PHP | GPL-2.0 | [6.1.4](https://github.com/joomla/joomla-cms/releases/tag/6.1.4) signed | 5144 | Wix (partial), Squarespace (partial) |
| [Statamic](https://github.com/statamic/cms) | PHP | Other | [v6.35.0](https://github.com/statamic/cms/releases/tag/v6.35.0) | 4905 | Contentful (partial) |
| [Craft CMS](https://github.com/craftcms/cms) | PHP | Other | [5.11.4](https://github.com/craftcms/cms/releases/tag/5.11.4) | 3610 | Contentful (partial) |
| [Microweber](https://github.com/microweber/microweber) | HTML | MIT | [v2.0.20](https://github.com/microweber/microweber/releases/tag/v2.0.20) | 3440 | Wix (partial), Squarespace (partial) |
| [Piranha CMS](https://github.com/PiranhaCMS/piranha.core) | C# | MIT | [v12.2](https://github.com/PiranhaCMS/piranha.core/releases/tag/v12.2) | 2197 | none |
| [Kirby](https://github.com/getkirby/kirby) | PHP | Other | [5.6.1](https://github.com/getkirby/kirby/releases/tag/5.6.1) signed | 1535 | Contentful (partial) |
| [Winter CMS](https://github.com/wintercms/winter) | PHP | MIT | [v1.2.14](https://github.com/wintercms/winter/releases/tag/v1.2.14) | 1519 | none |
| [ProcessWire](https://github.com/processwire/processwire) | PHP | Other | [3.0.259](https://github.com/processwire/processwire/releases/tag/3.0.259) | 1155 | none |
| [Backdrop CMS](https://github.com/backdrop/backdrop) | PHP | GPL-2.0 | [1.35.1](https://github.com/backdrop/backdrop/releases/tag/1.35.1) | 1049 | none |
| [ClassicPress](https://github.com/ClassicPress/ClassicPress) | PHP | GPL-2.0 | [2.7.3+dev](https://github.com/ClassicPress/ClassicPress/releases/tag/2.7.3%2Bdev) | 860 | none |
| [Concrete CMS](https://github.com/concretecms/concretecms) | PHP | MIT | [9.5.4](https://github.com/concretecms/concretecms/releases/tag/9.5.4) signed | 852 | Squarespace (partial) |
| [WonderCMS](https://github.com/WonderCMS/wondercms) | PHP | MIT | [3.6.0](https://github.com/WonderCMS/wondercms/releases/tag/3.6.0) signed | 740 | none |
| [Typemill](https://github.com/typemill/typemill) | JavaScript | MIT | [v2.27.0](https://github.com/typemill/typemill/releases/tag/v2.27.0) | 620 | GitBook (partial) |
| [Bolt CMS](https://github.com/bolt/core) | PHP | MIT | [6.1.8](https://github.com/bolt/core/releases/tag/6.1.8) | 591 | none |

</details>

<details>
<summary><b>Blogging engines</b>, 4 tools</summary>

Publish a blog with posts, tags, themes and comments from your own server.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Halo](https://github.com/halo-dev/halo) | Java | GPL-3.0 | [v2.26.1](https://github.com/halo-dev/halo/releases/tag/v2.26.1) signed | 39931 | Medium (partial) |
| [Typecho](https://github.com/typecho/typecho) | PHP | GPL-2.0 | [v1.3.0](https://github.com/typecho/typecho/releases/tag/v1.3.0) signed | 12448 | Medium (partial) |
| [Bludit](https://github.com/bludit/bludit) | PHP | MIT | [3.22.0](https://github.com/bludit/bludit/releases/tag/3.22.0) signed | 1467 | Medium (partial) |
| [Chyrp Lite](https://github.com/xenocrat/chyrp-lite) | PHP | BSD-3-Clause | [v2026.02.02](https://github.com/xenocrat/chyrp-lite/releases/tag/v2026.02.02) | 494 | Medium (partial) |

</details>

<details>
<summary><b>Comment systems</b>, 6 tools</summary>

Embed a comment thread under the pages of a static or dynamic site.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [giscus](https://github.com/giscus/giscus) | TypeScript | MIT | none | 12140 | Disqus (partial) |
| [Remark42](https://github.com/umputun/remark42) | Go | MIT | [v1.17.1](https://github.com/umputun/remark42/releases/tag/v1.17.1) signed | 5621 | Disqus (full) |
| [Isso](https://github.com/isso-comments/isso) | Python | MIT | [0.14.0](https://github.com/isso-comments/isso/releases/tag/0.14.0) | 5310 | Disqus (full) |
| [Waline](https://github.com/walinejs/waline) | JavaScript | GPL-2.0 | [@waline/vercel@1.43.4](https://github.com/walinejs/waline/releases/tag/%40waline/vercel%401.43.4) signed | 3128 | Disqus (full) |
| [Artalk](https://github.com/ArtalkJS/Artalk) | Go | MIT | [v2.10.0](https://github.com/ArtalkJS/Artalk/releases/tag/v2.10.0) | 2344 | Disqus (full) |
| [Twikoo](https://github.com/twikoojs/twikoo) | TypeScript | MIT | [2.0.12](https://github.com/twikoojs/twikoo/releases/tag/2.0.12) signed | 2294 | Disqus (partial) |

</details>

<details>
<summary><b>Link-in-bio pages</b>, 2 tools</summary>

Publish a single page listing your links, for the profile of a social account.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [LinkStack](https://github.com/LinkStackOrg/LinkStack) | PHP | AGPL-3.0 | [v4.8.6](https://github.com/LinkStackOrg/LinkStack/releases/tag/v4.8.6) | 3891 | Linktree (full) |
| [LittleLink](https://github.com/sethcottle/littlelink) | HTML | MIT | [v3.11.0](https://github.com/sethcottle/littlelink/releases/tag/v3.11.0) | 3092 | Linktree (partial) |

</details>

<details>
<summary><b>Feature flags</b>, 8 tools</summary>

Turn features on for some users without a deploy, and run experiments.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Unleash](https://github.com/Unleash/unleash) | TypeScript | AGPL-3.0 | [v8.2.0](https://github.com/Unleash/unleash/releases/tag/v8.2.0) | 13859 | LaunchDarkly (full) |
| [GrowthBook](https://github.com/growthbook/growthbook) | TypeScript | Other | [v5.1.0](https://github.com/growthbook/growthbook/releases/tag/v5.1.0) signed | 8478 | LaunchDarkly (full) |
| [Flagsmith](https://github.com/Flagsmith/flagsmith) | Python | BSD-3-Clause | [v2.280.0](https://github.com/Flagsmith/flagsmith/releases/tag/v2.280.0) signed | 6589 | LaunchDarkly (full) |
| [Flipt](https://github.com/flipt-io/flipt) | Go | Other | [v2.13.1](https://github.com/flipt-io/flipt/releases/tag/v2.13.1) | 4914 | LaunchDarkly (partial) |
| [GO Feature Flag](https://github.com/thomaspoignant/go-feature-flag) | Go | MIT | [v1.56.0](https://github.com/thomaspoignant/go-feature-flag/releases/tag/v1.56.0) signed | 2120 | LaunchDarkly (partial) |
| [FeatBit](https://github.com/featbit/featbit) | C# | MIT | [6.0.0](https://github.com/featbit/featbit/releases/tag/6.0.0) | 1931 | LaunchDarkly (full) |
| [flagd](https://github.com/open-feature/flagd) | Go | Apache-2.0 | [core/v0.18.0](https://github.com/open-feature/flagd/releases/tag/core/v0.18.0) signed | 1003 | LaunchDarkly (partial) |
| [Featurevisor](https://github.com/featurevisor/featurevisor) | TypeScript | MIT | [v3.11.0](https://github.com/featurevisor/featurevisor/releases/tag/v3.11.0) | 812 | LaunchDarkly (partial) |

</details>

<details>
<summary><b>Database migrations</b>, 15 tools</summary>

Version and apply database schema changes.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [migrate](https://github.com/golang-migrate/migrate) | Go | Other | [v4.20.1](https://github.com/golang-migrate/migrate/releases/tag/v4.20.1) signed | 18954 | Flyway (partial) |
| [Bytebase](https://github.com/bytebase/bytebase) | Go | Other | [3.23.0](https://github.com/bytebase/bytebase/releases/tag/3.23.0) signed | 14538 | Flyway (partial) |
| [gh-ost](https://github.com/github/gh-ost) | Go | MIT | [v1.1.11](https://github.com/github/gh-ost/releases/tag/v1.1.11) signed | 13591 | none |
| [goose](https://github.com/pressly/goose) | Go | Other | [v3.28.0](https://github.com/pressly/goose/releases/tag/v3.28.0) | 11546 | migrate (full) |
| [Flyway](https://github.com/flyway/flyway) | Java | Apache-2.0 | [flyway-13.9.0](https://github.com/flyway/flyway/releases/tag/flyway-13.9.0) | 10123 | Liquibase (full) |
| [Atlas](https://github.com/ariga/atlas) | Go | Apache-2.0 | [v1.3.0](https://github.com/ariga/atlas/releases/tag/v1.3.0) signed | 8761 | Liquibase (full), Flyway (full) |
| [dbmate](https://github.com/amacneil/dbmate) | Go | MIT | [v2.36.0](https://github.com/amacneil/dbmate/releases/tag/v2.36.0) signed | 7438 | Flyway (full), Liquibase (partial) |
| [Archery](https://github.com/hhyo/Archery) | Python | Apache-2.0 | [v1.14.0](https://github.com/hhyo/Archery/releases/tag/v1.14.0) | 7058 | none |
| [pgroll](https://github.com/xataio/pgroll) | Go | Apache-2.0 | [v0.16.3](https://github.com/xataio/pgroll/releases/tag/v0.16.3) | 6596 | none |
| [Liquibase](https://github.com/liquibase/liquibase) | Java | Other | [v5.0.4](https://github.com/liquibase/liquibase/releases/tag/v5.0.4) signed | 5621 | none |
| [Alembic](https://github.com/sqlalchemy/alembic) | Python | MIT | [rel_1_20_0](https://github.com/sqlalchemy/alembic/releases/tag/rel_1_20_0) | 4431 | Flyway (partial) |
| [sqldef](https://github.com/sqldef/sqldef) | Go | Other | [v3.11.26](https://github.com/sqldef/sqldef/releases/tag/v3.11.26) signed | 3173 | Atlas (partial) |
| [Sqitch](https://github.com/sqitchers/sqitch) | Perl | MIT | [v1.6.1](https://github.com/sqitchers/sqitch/releases/tag/v1.6.1) signed | 3169 | Liquibase (full) |
| [Refinery](https://github.com/rust-db/refinery) | Rust | MIT | [v0.10.0](https://github.com/rust-db/refinery/releases/tag/v0.10.0) | 1705 | none |
| [Skeema](https://github.com/skeema/skeema) | Go | Apache-2.0 | [v1.14.1](https://github.com/skeema/skeema/releases/tag/v1.14.1) | 1378 | none |

</details>

<details>
<summary><b>Kubernetes UIs</b>, 10 tools</summary>

Browse and operate Kubernetes clusters from a desktop, web or terminal UI.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Portainer](https://github.com/portainer/portainer) | TypeScript | Zlib | [2.45.1](https://github.com/portainer/portainer/releases/tag/2.45.1) signed | 38622 | Lens (partial) |
| [k9s](https://github.com/derailed/k9s) | Go | Apache-2.0 | [v0.51.0](https://github.com/derailed/k9s/releases/tag/v0.51.0) | 34751 | Lens (partial) |
| [Rancher](https://github.com/rancher/rancher) | Go | Apache-2.0 | [v2.15.2](https://github.com/rancher/rancher/releases/tag/v2.15.2) signed | 25960 | Lens (full) |
| [KubeSphere](https://github.com/kubesphere/kubesphere) | Go | Other | [v4.1.3](https://github.com/kubesphere/kubesphere/releases/tag/v4.1.3) signed | 17060 | none |
| [Headlamp](https://github.com/kubernetes-sigs/headlamp) | TypeScript | Apache-2.0 | [v0.45.0](https://github.com/kubernetes-sigs/headlamp/releases/tag/v0.45.0) | 7389 | Lens (full) |
| [Freelens](https://github.com/freelensapp/freelens) | TypeScript | MIT | [v1.10.3](https://github.com/freelensapp/freelens/releases/tag/v1.10.3) signed | 5653 | Lens (full) |
| [Devtron](https://github.com/devtron-labs/devtron) | Go | Apache-2.0 | [v2.2.0](https://github.com/devtron-labs/devtron/releases/tag/v2.2.0) signed | 5610 | none |
| [Kite](https://github.com/kite-org/kite) | TypeScript | Apache-2.0 | [v0.16.0](https://github.com/kite-org/kite/releases/tag/v0.16.0) | 3155 | none |
| [KDash](https://github.com/kdash-rs/kdash) | Rust | MIT | [v2.1.1](https://github.com/kdash-rs/kdash/releases/tag/v2.1.1) | 2549 | none |
| [Kubetail](https://github.com/kubetail-org/kubetail) | Go | Apache-2.0 | [cli/v0.18.0](https://github.com/kubetail-org/kubetail/releases/tag/cli/v0.18.0) signed | 1771 | none |

</details>

<details>
<summary><b>Virtualization</b>, 10 tools</summary>

Run virtual machines and system containers across a cluster of hosts.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Firecracker](https://github.com/firecracker-microvm/firecracker) | Rust | Apache-2.0 | [v1.17.0](https://github.com/firecracker-microvm/firecracker/releases/tag/v1.17.0) | 37190 | none |
| [Vagrant](https://github.com/hashicorp/vagrant) | Ruby | Other | [v2.4.9](https://github.com/hashicorp/vagrant/releases/tag/v2.4.9) | 27212 | none |
| [KubeVirt](https://github.com/kubevirt/kubevirt) | Go | Apache-2.0 | [v1.9.0](https://github.com/kubevirt/kubevirt/releases/tag/v1.9.0) signed | 7100 | VMware vSphere (partial) |
| [Incus](https://github.com/lxc/incus) | Go | Apache-2.0 | [v7.5.1](https://github.com/lxc/incus/releases/tag/v7.5.1) signed | 6342 | LXD (full), VMware vSphere (partial) |
| [Cloud Hypervisor](https://github.com/cloud-hypervisor/cloud-hypervisor) | Rust | none | [v53.0](https://github.com/cloud-hypervisor/cloud-hypervisor/releases/tag/v53.0) | 6296 | none |
| [Harvester](https://github.com/harvester/harvester) | Go | Apache-2.0 | [v1.9.0](https://github.com/harvester/harvester/releases/tag/v1.9.0) | 5197 | VMware vSphere (full) |
| [LXD](https://github.com/canonical/lxd) | Go | AGPL-3.0 | [lxd-6.9](https://github.com/canonical/lxd/releases/tag/lxd-6.9) signed | 4832 | none |
| [Apache CloudStack](https://github.com/apache/cloudstack) | Java | Apache-2.0 | [4.23.0.0](https://github.com/apache/cloudstack/releases/tag/4.23.0.0) signed | 3090 | VMware vSphere (partial) |
| [OpenNebula](https://github.com/OpenNebula/one) | JavaScript | Apache-2.0 | [release-7.4.1](https://github.com/OpenNebula/one/releases/tag/release-7.4.1) signed | 1750 | VMware vSphere (full) |
| [Xen Orchestra](https://github.com/vatesfr/xen-orchestra) | JavaScript | Other | [xo-lite-v0.26.0](https://github.com/vatesfr/xen-orchestra/releases/tag/xo-lite-v0.26.0) signed | 992 | VMware vSphere (partial) |

</details>

<details>
<summary><b>Code search servers</b>, 4 tools</summary>

Index many repositories and search them from a web UI.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Hound](https://github.com/hound-search/hound) | JavaScript | MIT | [v0.7.1](https://github.com/hound-search/hound/releases/tag/v0.7.1) signed | 5883 | Sourcegraph (partial) |
| [OpenGrok](https://github.com/oracle/opengrok) | Java | Other | [1.14.19](https://github.com/oracle/opengrok/releases/tag/1.14.19) | 4969 | Sourcegraph (partial) |
| [Sourcebot](https://github.com/sourcebot-dev/sourcebot) | TypeScript | Other | [v5.1.15](https://github.com/sourcebot-dev/sourcebot/releases/tag/v5.1.15) | 3982 | Sourcegraph (partial) |
| [Zoekt](https://github.com/sourcegraph/zoekt) | Go | Apache-2.0 | none | 1950 | Sourcegraph (partial) |

</details>

<details>
<summary><b>Data integration</b>, 23 tools</summary>

Extract data from applications and databases and load it into a warehouse.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Canal](https://github.com/alibaba/canal) | Java | Apache-2.0 | [canal-1.1.8](https://github.com/alibaba/canal/releases/tag/canal-1.1.8) | 29740 | Debezium (partial) |
| [Airbyte](https://github.com/airbytehq/airbyte) | Python | Other | [v2.0.0](https://github.com/airbytehq/airbyte/releases/tag/v2.0.0) signed | 22182 | Fivetran (full) |
| [DataX](https://github.com/alibaba/DataX) | Java | Other | [datax_v202309](https://github.com/alibaba/DataX/releases/tag/datax_v202309) signed | 17364 | Fivetran (partial) |
| [Debezium](https://github.com/debezium/debezium) | Java | Apache-2.0 | [v3.7.0.Final](https://github.com/debezium/debezium/releases/tag/v3.7.0.Final) | 13188 | Fivetran (partial) |
| [Apache SeaTunnel](https://github.com/apache/seatunnel) | Java | Apache-2.0 | [v3.0.0](https://github.com/apache/seatunnel/releases/tag/v3.0.0) | 9698 | Fivetran (partial) |
| [Redpanda Connect](https://github.com/redpanda-data/connect) | Go | none | [v4.112.0](https://github.com/redpanda-data/connect/releases/tag/v4.112.0) signed | 8778 | none |
| [Pentaho Data Integration](https://github.com/pentaho/pentaho-kettle) | Java | Other | [5.2.0.2-C-185-R](https://github.com/pentaho/pentaho-kettle/releases/tag/5.2.0.2-C-185-R) | 8399 | none |
| [Snowplow](https://github.com/snowplow/snowplow) | Scala | Apache-2.0 | [22.01](https://github.com/snowplow/snowplow/releases/tag/22.01) | 7036 | Segment (partial) |
| [CloudQuery](https://github.com/cloudquery/cloudquery) | Go | MPL-2.0 | [cli-v6.43.0](https://github.com/cloudquery/cloudquery/releases/tag/cli-v6.43.0) signed | 6536 | Fivetran (partial) |
| [Apache NiFi](https://github.com/apache/nifi) | Java | Apache-2.0 | [rel/nifi-2.12.0](https://github.com/apache/nifi/releases/tag/rel/nifi-2.12.0) signed | 6248 | Informatica (partial) |
| [dlt](https://github.com/dlt-hub/dlt) | Python | Apache-2.0 | [1.30.0](https://github.com/dlt-hub/dlt/releases/tag/1.30.0) signed | 5934 | Fivetran (partial) |
| [Jitsu](https://github.com/jitsucom/jitsu) | TypeScript | MIT | [jitsu-cli1.11.0](https://github.com/jitsucom/jitsu/releases/tag/jitsu-cli1.11.0) | 5101 | Segment (full) |
| [RudderStack](https://github.com/rudderlabs/rudder-server) | Go | Other | [v1.89.1](https://github.com/rudderlabs/rudder-server/releases/tag/v1.89.1) signed | 4493 | Segment (full) |
| [ingestr](https://github.com/bruin-data/ingestr) | Go | Other | [v1.1.63](https://github.com/bruin-data/ingestr/releases/tag/v1.1.63) signed | 3989 | Fivetran (partial) |
| [PeerDB](https://github.com/PeerDB-io/peerdb) | Go | AGPL-3.0 | [v0.37.11](https://github.com/PeerDB-io/peerdb/releases/tag/v0.37.11) signed | 3297 | Fivetran (partial) |
| [Meltano](https://github.com/meltano/meltano) | Python | MIT | [v4.4.0](https://github.com/meltano/meltano/releases/tag/v4.4.0) signed | 2647 | Fivetran (partial), Airbyte (partial) |
| [Bento](https://github.com/warpstreamlabs/bento) | Go | Other | [v1.21.2](https://github.com/warpstreamlabs/bento/releases/tag/v1.21.2) | 2155 | Redpanda Connect (partial) |
| [Multiwoven](https://github.com/Multiwoven/multiwoven) | Ruby | AGPL-3.0 | [v0.133.0](https://github.com/Multiwoven/multiwoven/releases/tag/v0.133.0) signed | 1677 | Hightouch (full), Census (full) |
| [Apache Hop](https://github.com/apache/hop) | Java | Apache-2.0 | [2.19.0-rc1](https://github.com/apache/hop/releases/tag/2.19.0-rc1) | 1488 | Talend (partial) |
| [OLake](https://github.com/datazip-inc/olake) | Go | Apache-2.0 | [v0.11.3](https://github.com/datazip-inc/olake/releases/tag/v0.11.3) signed | 1471 | Fivetran (partial) |
| [Estuary Flow](https://github.com/estuary/flow) | Rust | Other | [v0.6.13](https://github.com/estuary/flow/releases/tag/v0.6.13) | 982 | Fivetran (partial) |
| [Sling](https://github.com/slingdata-io/sling-cli) | Go | GPL-3.0 | [v1.6.4](https://github.com/slingdata-io/sling-cli/releases/tag/v1.6.4) | 912 | Fivetran (partial) |
| [Conduit](https://github.com/ConduitIO/conduit) | Go | Apache-2.0 | [v0.19.0](https://github.com/ConduitIO/conduit/releases/tag/v0.19.0) | 611 | none |

</details>

<details>
<summary><b>JavaScript HTTP clients</b>, 6 tools</summary>

Send HTTP requests from Node.js and browsers.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [axios](https://github.com/axios/axios) | JavaScript | MIT | [v1.20.0](https://github.com/axios/axios/releases/tag/v1.20.0) signed | 109351 | request (full) |
| [request](https://github.com/request/request) | JavaScript | Apache-2.0 | [v2.88.1](https://github.com/request/request/releases/tag/v2.88.1) | 25495 | none |
| [Ky](https://github.com/sindresorhus/ky) | TypeScript | MIT | [v2.1.0](https://github.com/sindresorhus/ky/releases/tag/v2.1.0) | 17107 | request (partial), axios (full) |
| [SuperAgent](https://github.com/forwardemail/superagent) | JavaScript | MIT | [v10.4.1](https://github.com/forwardemail/superagent/releases/tag/v10.4.1) | 16635 | request (full) |
| [Got](https://github.com/sindresorhus/got) | TypeScript | MIT | [v16.0.0](https://github.com/sindresorhus/got/releases/tag/v16.0.0) | 14949 | request (full) |
| [undici](https://github.com/nodejs/undici) | JavaScript | MIT | [v8.11.2](https://github.com/nodejs/undici/releases/tag/v8.11.2) signed | 7709 | request (full) |

</details>

<details>
<summary><b>JavaScript utility libraries</b>, 5 tools</summary>

Helpers for arrays, objects, strings and functions.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Lodash](https://github.com/lodash/lodash) | JavaScript | Other | [4.18.1](https://github.com/lodash/lodash/releases/tag/4.18.1) signed | 61343 | none |
| [Underscore.js](https://github.com/jashkenas/underscore) | JavaScript | MIT | [1.13.8](https://github.com/jashkenas/underscore/releases/tag/1.13.8) | 27320 | none |
| [Ramda](https://github.com/ramda/ramda) | JavaScript | MIT | [v0.32.0](https://github.com/ramda/ramda/releases/tag/v0.32.0) | 24047 | Lodash (partial) |
| [es-toolkit](https://github.com/toss/es-toolkit) | TypeScript | MIT | [v1.52.0](https://github.com/toss/es-toolkit/releases/tag/v1.52.0) signed | 11357 | Lodash (drop-in) |
| [Remeda](https://github.com/remeda/remeda) | TypeScript | MIT | [v2.51.0](https://github.com/remeda/remeda/releases/tag/v2.51.0) signed | 5439 | Lodash (partial) |

</details>

<details>
<summary><b>CSS processing</b>, 7 tools</summary>

Compile, transform, prefix and minify stylesheets.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) | TypeScript | MIT | [v4.3.3](https://github.com/tailwindlabs/tailwindcss/releases/tag/v4.3.3) signed | 97782 | none |
| [PostCSS](https://github.com/postcss/postcss) | TypeScript | MIT | [8.5.29](https://github.com/postcss/postcss/releases/tag/8.5.29) signed | 28975 | none |
| [UnoCSS](https://github.com/unocss/unocss) | TypeScript | Other | [v66.10.5](https://github.com/unocss/unocss/releases/tag/v66.10.5) signed | 18974 | Tailwind CSS (partial) |
| [Less](https://github.com/less/less.js) | JavaScript | Apache-2.0 | [v4.9.1](https://github.com/less/less.js/releases/tag/v4.9.1) | 17025 | none |
| [node-sass](https://github.com/sass/node-sass) archived | C++ | MIT | [v9.0.0](https://github.com/sass/node-sass/releases/tag/v9.0.0) signed | 8447 | none |
| [Lightning CSS](https://github.com/parcel-bundler/lightningcss) | Rust | MPL-2.0 | [v1.33.0](https://github.com/parcel-bundler/lightningcss/releases/tag/v1.33.0) | 7696 | PostCSS (partial) |
| [Dart Sass](https://github.com/sass/dart-sass) | Dart | MIT | [1.105.1](https://github.com/sass/dart-sass/releases/tag/1.105.1) signed | 4227 | node-sass (drop-in) |

</details>

<details>
<summary><b>JavaScript schema validation</b>, 7 tools</summary>

Declare schemas and validate data against them at runtime.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Zod](https://github.com/colinhacks/zod) | TypeScript | MIT | [v4.6.5](https://github.com/colinhacks/zod/releases/tag/v4.6.5) | 44066 | Yup (full), Joi (full) |
| [Yup](https://github.com/jquense/yup) | TypeScript | MIT | [v1.0.0](https://github.com/jquense/yup/releases/tag/v1.0.0) | 23657 | none |
| [Joi](https://github.com/hapijs/joi) | JavaScript | Other | [v18.2.9](https://github.com/hapijs/joi/releases/tag/v18.2.9) | 21164 | none |
| [Ajv](https://github.com/ajv-validator/ajv) | TypeScript | MIT | [v8.20.0](https://github.com/ajv-validator/ajv/releases/tag/v8.20.0) signed | 14853 | none |
| [class-validator](https://github.com/typestack/class-validator) | TypeScript | MIT | [v0.15.1](https://github.com/typestack/class-validator/releases/tag/v0.15.1) signed | 11836 | Joi (partial) |
| [Valibot](https://github.com/open-circle/valibot) | TypeScript | MIT | [v1.5.0](https://github.com/open-circle/valibot/releases/tag/v1.5.0) signed | 9031 | Zod (full), Yup (full) |
| [ArkType](https://github.com/arktypeio/arktype) | TypeScript | MIT | [@arktype/util@0.56.6](https://github.com/arktypeio/arktype/releases/tag/%40arktype/util%400.56.6) signed | 7871 | Zod (full) |

</details>

<details>
<summary><b>React state management</b>, 6 tools</summary>

Share and update application state across React components.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Redux](https://github.com/reduxjs/redux) | TypeScript | MIT | [v5.0.1](https://github.com/reduxjs/redux/releases/tag/v5.0.1) | 61481 | none |
| [Zustand](https://github.com/pmndrs/zustand) | TypeScript | MIT | [v5.0.15](https://github.com/pmndrs/zustand/releases/tag/v5.0.15) | 58793 | Redux (full) |
| [XState](https://github.com/statelyai/xstate) | TypeScript | MIT | [xstate@5.33.2](https://github.com/statelyai/xstate/releases/tag/xstate%405.33.2) signed | 30246 | none |
| [MobX](https://github.com/mobxjs/mobx) | TypeScript | MIT | [mobx@7.0.6](https://github.com/mobxjs/mobx/releases/tag/mobx%407.0.6) | 28212 | Redux (full) |
| [Jotai](https://github.com/pmndrs/jotai) | TypeScript | MIT | [v3.0.1](https://github.com/pmndrs/jotai/releases/tag/v3.0.1) | 21291 | Redux (partial) |
| [Valtio](https://github.com/pmndrs/valtio) | TypeScript | MIT | [v2.3.2](https://github.com/pmndrs/valtio/releases/tag/v2.3.2) | 10241 | Redux (partial) |

</details>

<details>
<summary><b>Python task queues</b>, 6 tools</summary>

Run background jobs from Python through a broker.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Celery](https://github.com/celery/celery) | Python | Other | [v5.6.3](https://github.com/celery/celery/releases/tag/v5.6.3) signed | 28938 | none |
| [RQ](https://github.com/rq/rq) | Python | Other | [v2.12](https://github.com/rq/rq/releases/tag/v2.12) | 10693 | Celery (partial) |
| [Hatchet](https://github.com/hatchet-dev/hatchet) | Go | MIT | [v0.110.5](https://github.com/hatchet-dev/hatchet/releases/tag/v0.110.5) | 8072 | Celery (partial) |
| [huey](https://github.com/coleifer/huey) | Python | MIT | [3.4.0](https://github.com/coleifer/huey/releases/tag/3.4.0) | 6043 | Celery (partial) |
| [Dramatiq](https://github.com/Bogdanp/dramatiq) | Python | LGPL-3.0 | [v2.2.1](https://github.com/Bogdanp/dramatiq/releases/tag/v2.2.1) signed | 5326 | Celery (full) |
| [arq](https://github.com/python-arq/arq) | Python | MIT | [v0.28.0](https://github.com/python-arq/arq/releases/tag/v0.28.0) | 3015 | Celery (partial) |

</details>

<details>
<summary><b>DataFrame libraries</b>, 8 tools</summary>

Load, transform and analyse tabular data in memory.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [pandas](https://github.com/pandas-dev/pandas) | Python | BSD-3-Clause | [v3.0.6](https://github.com/pandas-dev/pandas/releases/tag/v3.0.6) | 49923 | none |
| [Polars](https://github.com/pola-rs/polars) | Rust | MIT | [py-2.0.0](https://github.com/pola-rs/polars/releases/tag/py-2.0.0) signed | 39942 | pandas (full) |
| [Dask](https://github.com/dask/dask) | Python | BSD-3-Clause | [2026.8.0](https://github.com/dask/dask/releases/tag/2026.8.0) | 13934 | pandas (partial) |
| [Modin](https://github.com/modin-project/modin) | Python | Apache-2.0 | [0.37.1](https://github.com/modin-project/modin/releases/tag/0.37.1) signed | 10394 | pandas (drop-in) |
| [cuDF](https://github.com/NVIDIA/cudf) | C++ | Apache-2.0 | [v26.08.01](https://github.com/NVIDIA/cudf/releases/tag/v26.08.01) | 9771 | pandas (drop-in) |
| [Apache DataFusion](https://github.com/apache/datafusion) | Rust | Apache-2.0 | [55.1.0](https://github.com/apache/datafusion/releases/tag/55.1.0) signed | 9407 | none |
| [Ibis](https://github.com/ibis-project/ibis) | Python | Apache-2.0 | [12.0.0](https://github.com/ibis-project/ibis/releases/tag/12.0.0) | 6674 | pandas (partial) |
| [Daft](https://github.com/Eventual-Inc/Daft) | Rust | Apache-2.0 | [v0.7.25](https://github.com/Eventual-Inc/Daft/releases/tag/v0.7.25) signed | 5791 | Apache Spark (partial) |

</details>

<details>
<summary><b>System monitors</b>, 8 tools</summary>

Watch processes and resource use from a terminal.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [btop](https://github.com/aristocratos/btop) | C++ | Apache-2.0 | [v1.4.7](https://github.com/aristocratos/btop/releases/tag/v1.4.7) | 34891 | htop (full) |
| [Glances](https://github.com/nicolargo/glances) | Python | Other | [v4.5.7](https://github.com/nicolargo/glances/releases/tag/v4.5.7) | 33740 | htop (full) |
| [bottom](https://github.com/ClementTsang/bottom) | Rust | MIT | [0.14.9](https://github.com/ClementTsang/bottom/releases/tag/0.14.9) signed | 14087 | htop (full) |
| [bandwhich](https://github.com/imsnif/bandwhich) | Rust | MIT | [v0.23.1](https://github.com/imsnif/bandwhich/releases/tag/v0.23.1) signed | 11995 | none |
| [nvtop](https://github.com/Syllo/nvtop) | C | Other | [3.3.2](https://github.com/Syllo/nvtop/releases/tag/3.3.2) | 11047 | none |
| [htop](https://github.com/htop-dev/htop) | C | GPL-2.0 | [3.5.3](https://github.com/htop-dev/htop/releases/tag/3.5.3) | 8368 | none |
| [procs](https://github.com/dalance/procs) | Rust | MIT | [v0.14.12](https://github.com/dalance/procs/releases/tag/v0.14.12) | 6194 | none |
| [zenith](https://github.com/bvaisvil/zenith) | Rust | MIT | [0.15.1](https://github.com/bvaisvil/zenith/releases/tag/0.15.1) signed | 3059 | htop (full) |

</details>

<details>
<summary><b>Directory jumpers</b>, 4 tools</summary>

Jump to frequently used directories with a few keystrokes.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [zoxide](https://github.com/ajeetdsouza/zoxide) | Rust | MIT | [v0.10.0](https://github.com/ajeetdsouza/zoxide/releases/tag/v0.10.0) | 39910 | autojump (full), z (full) |
| [z](https://github.com/rupa/z) | Shell | WTFPL | [v1.12](https://github.com/rupa/z/releases/tag/v1.12) signed | 17060 | none |
| [autojump](https://github.com/wting/autojump) | Python | Other | [release-v22.5.3](https://github.com/wting/autojump/releases/tag/release-v22.5.3) | 16962 | none |
| [z.lua](https://github.com/skywind3000/z.lua) | Lua | MIT | [1.8.26](https://github.com/skywind3000/z.lua/releases/tag/1.8.26) signed | 3148 | z (full) |

</details>

<details>
<summary><b>Fuzzy finders</b>, 6 tools</summary>

Filter lists interactively in a terminal, for files, history and anything piped in.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [fzf](https://github.com/junegunn/fzf) | Go | MIT | [v0.74.4](https://github.com/junegunn/fzf/releases/tag/v0.74.4) signed | 83402 | none |
| [telescope.nvim](https://github.com/nvim-telescope/telescope.nvim) | Lua | MIT | [v0.2.1](https://github.com/nvim-telescope/telescope.nvim/releases/tag/v0.2.1) | 19812 | fzf (partial) |
| [peco](https://github.com/peco/peco) | Go | MIT | [v0.6.0](https://github.com/peco/peco/releases/tag/v0.6.0) | 7914 | fzf (partial) |
| [skim](https://github.com/skim-rs/skim) | Rust | MIT | [v5.7.4](https://github.com/skim-rs/skim/releases/tag/v5.7.4) signed | 6981 | fzf (full) |
| [Television](https://github.com/alexpasmantier/television) | Rust | MIT | [0.15.9](https://github.com/alexpasmantier/television/releases/tag/0.15.9) | 6329 | fzf (full) |
| [fzf-lua](https://github.com/ibhagwan/fzf-lua) | Lua | MIT | [0.7](https://github.com/ibhagwan/fzf-lua/releases/tag/0.7) signed | 4460 | telescope.nvim (full) |

</details>

<details>
<summary><b>Shells</b>, 8 tools</summary>

Interactive command-line shells.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [PowerShell](https://github.com/PowerShell/PowerShell) | C# | MIT | [v7.6.6](https://github.com/PowerShell/PowerShell/releases/tag/v7.6.6) | 55615 | none |
| [Nushell](https://github.com/nushell/nushell) | Rust | MIT | [0.116.1](https://github.com/nushell/nushell/releases/tag/0.116.1) signed | 40627 | Zsh (partial) |
| [fish](https://github.com/fish-shell/fish-shell) | Rust | Other | [4.9.3](https://github.com/fish-shell/fish-shell/releases/tag/4.9.3) signed | 34263 | Zsh (full) |
| [xonsh](https://github.com/xonsh/xonsh) | Python | Other | [0.24.2](https://github.com/xonsh/xonsh/releases/tag/0.24.2) signed | 9661 | Zsh (partial) |
| [Elvish](https://github.com/elves/elvish) | Go | BSD-2-Clause | [v0.21.0](https://github.com/elves/elvish/releases/tag/v0.21.0) | 6383 | Zsh (partial) |
| [Zsh](https://github.com/zsh-users/zsh) | C | Other | [zsh-5.9.2](https://github.com/zsh-users/zsh/releases/tag/zsh-5.9.2) | 4305 | none |
| [Oils](https://github.com/oils-for-unix/oils) | Python | Other | none | 3397 | none |
| [Murex](https://github.com/lmorg/murex) | Go | GPL-2.0 | [v7.2.1001](https://github.com/lmorg/murex/releases/tag/v7.2.1001) signed | 1917 | none |

</details>

<details>
<summary><b>Git clients</b>, 15 tools</summary>

Stage, commit, branch and browse history outside the bare git command.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [lazygit](https://github.com/jesseduffield/lazygit) | Go | MIT | [v0.66.0](https://github.com/jesseduffield/lazygit/releases/tag/v0.66.0) | 82936 | GitKraken (partial), Sourcetree (partial), tig (full) |
| [Jujutsu](https://github.com/jj-vcs/jj) | Rust | Apache-2.0 | [v0.45.1](https://github.com/jj-vcs/jj/releases/tag/v0.45.1) | 31909 | none |
| [GitUI](https://github.com/gitui-org/gitui) | Rust | MIT | [v0.28.1](https://github.com/gitui-org/gitui/releases/tag/v0.28.1) | 22548 | GitKraken (partial), tig (full) |
| [GitHub Desktop](https://github.com/desktop/desktop) | TypeScript | MIT | [release-3.6.6](https://github.com/desktop/desktop/releases/tag/release-3.6.6) | 21916 | GitKraken (partial), Sourcetree (partial) |
| [GitButler](https://github.com/gitbutlerapp/gitbutler) | Rust | Other | [release/0.22.3](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.22.3) signed | 21781 | GitKraken (partial) |
| [tig](https://github.com/jonas/tig) | C | GPL-2.0 | [tig-2.6.1](https://github.com/jonas/tig/releases/tag/tig-2.6.1) signed | 13357 | none |
| [ungit](https://github.com/FredrikNoren/ungit) | JavaScript | MIT | [v1.5.30](https://github.com/FredrikNoren/ungit/releases/tag/v1.5.30) | 10605 | Sourcetree (partial) |
| [Magit](https://github.com/magit/magit) | Emacs Lisp | GPL-3.0 | [v4.7.1](https://github.com/magit/magit/releases/tag/v4.7.1) signed | 7240 | none |
| [Sapling](https://github.com/facebook/sapling) | Rust | GPL-2.0 | [0.2.20260929-102736+288e0c2d](https://github.com/facebook/sapling/releases/tag/0.2.20260929-102736%2B288e0c2d) | 7030 | none |
| [SourceGit](https://github.com/sourcegit-scm/sourcegit) | C# | MIT | [v2026.21](https://github.com/sourcegit-scm/sourcegit/releases/tag/v2026.21) signed | 6097 | Sourcetree (full), GitKraken (partial) |
| [gitu](https://github.com/altsem/gitu) | Rust | MIT | [v0.43.0](https://github.com/altsem/gitu/releases/tag/v0.43.0) | 2929 | Magit (partial) |
| [Gitnuro](https://github.com/JetpackDuba/Gitnuro) | Kotlin | GPL-3.0 | [v1.5.0](https://github.com/JetpackDuba/Gitnuro/releases/tag/v1.5.0) | 2785 | GitKraken (partial) |
| [Git Cola](https://github.com/git-cola/git-cola) | Python | GPL-2.0 | [v4.19.0](https://github.com/git-cola/git-cola/releases/tag/v4.19.0) signed | 2583 | Sourcetree (full) |
| [Gittyup](https://github.com/Murmele/Gittyup) | C++ | MIT | [gittyup_v2.0.0](https://github.com/Murmele/Gittyup/releases/tag/gittyup_v2.0.0) signed | 2294 | Sourcetree (full) |
| [jjui](https://github.com/idursun/jjui) | Go | MIT | [v0.10.11](https://github.com/idursun/jjui/releases/tag/v0.10.11) signed | 2195 | none |

</details>

<details>
<summary><b>Office suites</b>, 7 tools</summary>

Documents, spreadsheets and presentations.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Etherpad](https://github.com/ether/etherpad) | TypeScript | Apache-2.0 | [v3.3.7](https://github.com/ether/etherpad/releases/tag/v3.3.7) | 18569 | Google Docs (partial) |
| [CryptPad](https://github.com/cryptpad/cryptpad) | JavaScript | AGPL-3.0 | [2026.5.1](https://github.com/cryptpad/cryptpad/releases/tag/2026.5.1) signed | 7991 | Google Docs (full), HackMD (partial) |
| [ONLYOFFICE Docs](https://github.com/ONLYOFFICE/DocumentServer) | Shell | AGPL-3.0 | [v9.4.0](https://github.com/ONLYOFFICE/DocumentServer/releases/tag/v9.4.0) | 6970 | Microsoft 365 (partial), Google Docs (full) |
| [ONLYOFFICE Desktop Editors](https://github.com/ONLYOFFICE/DesktopEditors) | unknown | AGPL-3.0 | [v9.4.0](https://github.com/ONLYOFFICE/DesktopEditors/releases/tag/v9.4.0) | 5481 | Microsoft 365 (partial) |
| [LibreOffice](https://github.com/LibreOffice/core) | C++ | GPL-3.0 | [libreoffice-26.8.1.1](https://github.com/LibreOffice/core/releases/tag/libreoffice-26.8.1.1) | 4458 | Microsoft 365 (partial), Google Docs (partial) |
| [Collabora Online](https://github.com/CollaboraOnline/online) | Shell | Other | [25.04.7-mobile](https://github.com/CollaboraOnline/online/releases/tag/25.04.7-mobile) signed | 3366 | Google Docs (full), Microsoft 365 (partial) |
| [EtherCalc](https://github.com/audreyt/ethercalc) | TypeScript | Other | [0.20260717.0](https://github.com/audreyt/ethercalc/releases/tag/0.20260717.0) | 3052 | Google Docs (partial) |

</details>

<details>
<summary><b>Document management</b>, 7 tools</summary>

Scan, OCR, tag and search paper and PDF documents.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Paperless-ngx](https://github.com/paperless-ngx/paperless-ngx) | Python | GPL-3.0 | [v3.3.0](https://github.com/paperless-ngx/paperless-ngx/releases/tag/v3.3.0) | 46327 | Paperless-ng (drop-in), Paperless (full), DocuWare (partial) |
| [Paperless](https://github.com/the-paperless-project/paperless) archived | Python | GPL-3.0 | [2.7.0](https://github.com/the-paperless-project/paperless/releases/tag/2.7.0) | 7913 | none |
| [Papra](https://github.com/papra-hq/papra) | TypeScript | AGPL-3.0 | [@papra/lecture@0.5.2](https://github.com/papra-hq/papra/releases/tag/%40papra/lecture%400.5.2) signed | 5542 | Paperless-ngx (full) |
| [Paperless-ng](https://github.com/jonaswinkler/paperless-ng) archived | Python | GPL-3.0 | [ng-1.5.0](https://github.com/jonaswinkler/paperless-ng/releases/tag/ng-1.5.0) | 5408 | none |
| [Teedy](https://github.com/sismics/docs) | JavaScript | GPL-2.0 | [v1.11](https://github.com/sismics/docs/releases/tag/v1.11) | 2566 | Paperless-ngx (full), DocuWare (partial) |
| [Docspell](https://github.com/eikek/docspell) | Elm | AGPL-3.0 | [v0.43.0](https://github.com/eikek/docspell/releases/tag/v0.43.0) | 2333 | Paperless-ngx (full) |
| [Papermerge](https://github.com/papermerge/papermerge-core) | Python | Apache-2.0 | [3.5.3](https://github.com/papermerge/papermerge-core/releases/tag/3.5.3) signed | 543 | DocuWare (partial) |

</details>

<details>
<summary><b>Interface design tools</b>, 11 tools</summary>

Design and prototype user interfaces on a shared canvas.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Penpot](https://github.com/penpot/penpot) | Clojure | MPL-2.0 | [2.18.3](https://github.com/penpot/penpot/releases/tag/2.18.3) | 60752 | Figma (full), Canva (partial) |
| [Onlook](https://github.com/onlook-dev/onlook) | TypeScript | Apache-2.0 | [v0.2.32](https://github.com/onlook-dev/onlook/releases/tag/v0.2.32) signed | 26870 | Figma (partial) |
| [GrapesJS](https://github.com/GrapesJS/grapesjs) | TypeScript | Other | [v0.23.6](https://github.com/GrapesJS/grapesjs/releases/tag/v0.23.6) signed | 26289 | Webflow (partial) |
| [Puck](https://github.com/puckeditor/puck) | TypeScript | MIT | [v0.23.0](https://github.com/puckeditor/puck/releases/tag/v0.23.0) | 13430 | none |
| [Pencil](https://github.com/evolus/pencil) | JavaScript | GPL-2.0 | [v3.1.1](https://github.com/evolus/pencil/releases/tag/v3.1.1) | 9873 | Balsamiq (full) |
| [Webstudio](https://github.com/webstudio-is/webstudio) | TypeScript | AGPL-3.0 | [0.305.0](https://github.com/webstudio-is/webstudio/releases/tag/0.305.0) | 9035 | Webflow (full), Wix (partial), Squarespace (partial) |
| [OpenPencil](https://github.com/open-pencil/open-pencil) | TypeScript | MIT | [v0.15.1](https://github.com/open-pencil/open-pencil/releases/tag/v0.15.1) | 8768 | Figma (partial) |
| [Plasmic](https://github.com/plasmicapp/plasmic) | TypeScript | MIT | [2.0.23](https://www.npmjs.com/package/@plasmicapp/loader-react/v/2.0.23) | 7075 | Webflow (partial) |
| [Silex](https://github.com/silexlabs/Silex) | TypeScript | AGPL-3.0 | [v3.9.0](https://github.com/silexlabs/Silex/releases/tag/v3.9.0) signed | 2996 | Webflow (partial), Wix (partial), Squarespace (partial) |
| [Quant-UX](https://github.com/KlausSchaefers/quant-ux) | Vue | GPL-3.0 | none | 2730 | Axure RP (partial) |
| [Grida](https://github.com/gridaco/grida) | TypeScript | Apache-2.0 | [v0.0.24](https://github.com/gridaco/grida/releases/tag/v0.0.24) signed | 2655 | Figma (partial) |

</details>

<details>
<summary><b>Diagrams and whiteboards</b>, 18 tools</summary>

Draw diagrams and sketch on a shared canvas.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Excalidraw](https://github.com/excalidraw/excalidraw) | TypeScript | MIT | [v0.18.1](https://github.com/excalidraw/excalidraw/releases/tag/v0.18.1) | 133603 | Miro (partial), Lucidchart (partial) |
| [Mermaid](https://github.com/mermaid-js/mermaid) | TypeScript | MIT | [@mermaid-js/tiny@12.1.0](https://github.com/mermaid-js/mermaid/releases/tag/%40mermaid-js/tiny%4012.1.0) | 90569 | Lucidchart (partial) |
| [tldraw](https://github.com/tldraw/tldraw) | TypeScript | Other | [v5.5.2](https://github.com/tldraw/tldraw/releases/tag/v5.5.2) | 50781 | Miro (partial) |
| [Diagrams](https://github.com/mingrammer/diagrams) | Python | MIT | [v0.25.1](https://github.com/mingrammer/diagrams/releases/tag/v0.25.1) signed | 42681 | Lucidchart (partial) |
| [drawDB](https://github.com/drawdb-io/drawdb) | JavaScript | AGPL-3.0 | [v1.8.2](https://github.com/drawdb-io/drawdb/releases/tag/v1.8.2) | 39842 | Lucidchart (partial) |
| [D2](https://github.com/d2lang/d2) | Go | MPL-2.0 | [v0.9.0](https://github.com/d2lang/d2/releases/tag/v0.9.0) signed | 25572 | Lucidchart (partial) |
| [ChartDB](https://github.com/chartdb/chartdb) | TypeScript | AGPL-3.0 | [v1.20.1](https://github.com/chartdb/chartdb/releases/tag/v1.20.1) signed | 22988 | dbdiagram.io (partial) |
| [Drawnix](https://github.com/plait-board/drawnix) | TypeScript | MIT | [v0.4.0](https://github.com/plait-board/drawnix/releases/tag/v0.4.0) | 14906 | Miro (partial), XMind (partial) |
| [PlantUML](https://github.com/plantuml/plantuml) | Java | LGPL-3.0 | [v1.2026.8](https://github.com/plantuml/plantuml/releases/tag/v1.2026.8) | 13356 | Lucidchart (partial) |
| [markmap](https://github.com/markmap/markmap) | TypeScript | MIT | [v0.18.0](https://github.com/markmap/markmap/releases/tag/v0.18.0) | 13150 | none |
| [SimpleMindMap](https://github.com/wanglin2/mind-map) | JavaScript | MIT | [0.20.0](https://github.com/wanglin2/mind-map/releases/tag/0.20.0) | 12793 | XMind (full) |
| [draw.io](https://github.com/jgraph/drawio) | JavaScript | Apache-2.0 | [v32.2.0](https://github.com/jgraph/drawio/releases/tag/v32.2.0) | 8591 | Lucidchart (full), Miro (partial) |
| [Freeplane](https://github.com/freeplane/freeplane) | Java | GPL-2.0 | [release-1.13.3](https://github.com/freeplane/freeplane/releases/tag/release-1.13.3) | 4390 | XMind (full) |
| [Kroki](https://github.com/yuzutech/kroki) | JavaScript | MIT | [v0.33.0](https://github.com/yuzutech/kroki/releases/tag/v0.33.0) | 4362 | none |
| [Flowchart Fun](https://github.com/tone-row/flowchart-fun) | TypeScript | MIT | [1.70.0](https://github.com/tone-row/flowchart-fun/releases/tag/1.70.0) signed | 3371 | Lucidchart (partial) |
| [OpenBoard](https://github.com/OpenBoard-org/OpenBoard) | C++ | GPL-3.0 | [v1.7.7](https://github.com/OpenBoard-org/OpenBoard/releases/tag/v1.7.7) | 3065 | none |
| [WBO](https://github.com/lovasoa/whitebophir) | JavaScript | AGPL-3.0 | [v2.17.1](https://github.com/lovasoa/whitebophir/releases/tag/v2.17.1) | 2661 | Miro (partial) |
| [Nextcloud Whiteboard](https://github.com/nextcloud/whiteboard) | JavaScript | AGPL-3.0 | [v2.0.0](https://github.com/nextcloud/whiteboard/releases/tag/v2.0.0) | 218 | Miro (partial) |

</details>

<details>
<summary><b>Screen recording</b>, 14 tools</summary>

Record the screen and camera and share the video.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [OBS Studio](https://github.com/obsproject/obs-studio) | C | GPL-2.0 | [32.2.2](https://github.com/obsproject/obs-studio/releases/tag/32.2.2) | 77059 | Loom (partial) |
| [ShareX](https://github.com/ShareX/ShareX) | C# | GPL-3.0 | [v21.0.0](https://github.com/ShareX/ShareX/releases/tag/v21.0.0) | 39909 | Snagit (full), Loom (partial) |
| [Flameshot](https://github.com/flameshot-org/flameshot) | C++ | GPL-3.0 | [v14.0.0](https://github.com/flameshot-org/flameshot/releases/tag/v14.0.0) signed | 31100 | Snagit (partial) |
| [ScreenToGif](https://github.com/NickeManarin/ScreenToGif) | C# | MS-PL | [2.43.2](https://github.com/NickeManarin/ScreenToGif/releases/tag/2.43.2) | 27748 | Snagit (partial) |
| [Cap](https://github.com/CapSoftware/Cap) | Rust | Other | [cap-v0.6.0](https://github.com/CapSoftware/Cap/releases/tag/cap-v0.6.0) | 23086 | Loom (full) |
| [Screenity](https://github.com/alyssaxuu/screenity) | JavaScript | GPL-3.0 | [v4.6.12](https://github.com/alyssaxuu/screenity/releases/tag/v4.6.12) | 18755 | Loom (partial) |
| [Greenshot](https://github.com/greenshot/greenshot) | C# | GPL-3.0 | [v1.3.315](https://github.com/greenshot/greenshot/releases/tag/v1.3.315) | 5141 | Snagit (partial) |
| [Kooha](https://github.com/SeaDve/Kooha) | Rust | GPL-3.0 | [v2.3.2](https://github.com/SeaDve/Kooha/releases/tag/v2.3.2) signed | 3526 | Loom (partial) |
| [ksnip](https://github.com/ksnip/ksnip) | C++ | GPL-3.0 | [v1.10.1](https://github.com/ksnip/ksnip/releases/tag/v1.10.1) | 3349 | Snagit (partial) |
| [SimpleScreenRecorder](https://github.com/MaartenBaert/ssr) | C++ | GPL-3.0 | [0.4.4](https://github.com/MaartenBaert/ssr/releases/tag/0.4.4) | 2899 | none |
| [Satty](https://github.com/Satty-org/Satty) | Rust | MPL-2.0 | [v0.22.0](https://github.com/Satty-org/Satty/releases/tag/v0.22.0) | 2436 | Snagit (partial) |
| [vokoscreenNG](https://github.com/vkohaupt/vokoscreenNG) | C++ | GPL-2.0 | [4.11.0](https://github.com/vkohaupt/vokoscreenNG/releases/tag/4.11.0) | 1517 | none |
| [wf-recorder](https://github.com/ammen99/wf-recorder) | C++ | MIT | [v0.6.0](https://github.com/ammen99/wf-recorder/releases/tag/v0.6.0) | 1314 | none |
| [Shutter](https://github.com/shutter-project/shutter) | Perl | GPL-3.0 | [v0.99.7](https://github.com/shutter-project/shutter/releases/tag/v0.99.7) signed | 644 | Snagit (partial) |

</details>

<details>
<summary><b>Authenticator apps</b>, 6 tools</summary>

Generate one-time codes for two-factor authentication.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Ente Auth](https://github.com/ente/ente) | Dart | AGPL-3.0 | [ensu-v0.1.21](https://github.com/ente/ente/releases/tag/ensu-v0.1.21) | 29262 | Twilio Authy (full), Google Authenticator (full) |
| [Aegis](https://github.com/beemdevelopment/Aegis) | Java | GPL-3.0 | [v3.4.3](https://github.com/beemdevelopment/Aegis/releases/tag/v3.4.3) | 13215 | Twilio Authy (full), Google Authenticator (full) |
| [Stratum](https://github.com/stratumauth/app) | C# | GPL-3.0 | [v1.6.2](https://github.com/stratumauth/app/releases/tag/v1.6.2) signed | 4605 | Twilio Authy (full), Google Authenticator (full) |
| [2FAuth](https://github.com/Bubka/2FAuth) | PHP | AGPL-3.0 | [v8.0.2](https://github.com/Bubka/2FAuth/releases/tag/v8.0.2) | 4169 | Google Authenticator (partial) |
| [FreeOTP](https://github.com/freeotp/freeotp-android) | Java | Apache-2.0 | [v2.0.6](https://github.com/freeotp/freeotp-android/releases/tag/v2.0.6) | 1676 | Google Authenticator (full) |
| [2FAS Auth](https://github.com/twofas/2fas-android) | Kotlin | GPL-3.0 | [6.0.3](https://github.com/twofas/2fas-android/releases/tag/6.0.3) | 1526 | Twilio Authy (full), Google Authenticator (full) |

</details>

<details>
<summary><b>Writing assistants</b>, 5 tools</summary>

Check grammar, spelling and style as you type.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Harper](https://github.com/Automattic/harper) | Rust | Apache-2.0 | [v2.12.0](https://github.com/Automattic/harper/releases/tag/v2.12.0) | 16188 | Grammarly (partial) |
| [LanguageTool](https://github.com/languagetool-org/languagetool) | Java | LGPL-2.1 | [v6.8](https://github.com/languagetool-org/languagetool/releases/tag/v6.8) | 15108 | Grammarly (full) |
| [Vale](https://github.com/vale-cli/vale) | Go | MIT | [v3.24.0](https://github.com/vale-cli/vale/releases/tag/v3.24.0) signed | 6207 | Grammarly (partial) |
| [proselint](https://github.com/amperser/proselint) | JavaScript | BSD-3-Clause | [v0.16.0](https://github.com/amperser/proselint/releases/tag/v0.16.0) | 4581 | Grammarly (partial) |
| [textlint](https://github.com/textlint/textlint) | TypeScript | MIT | [v15.8.0](https://github.com/textlint/textlint/releases/tag/v15.8.0) signed | 3199 | Grammarly (partial) |

</details>

<details>
<summary><b>Machine translation</b>, 7 tools</summary>

Translate text between languages, through an API or a web UI.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [PDFMathTranslate](https://github.com/PDFMathTranslate/PDFMathTranslate) | Python | AGPL-3.0 | [v1.9.11](https://github.com/PDFMathTranslate/PDFMathTranslate/releases/tag/v1.9.11) | 37362 | DeepL (partial) |
| [NextAI Translator](https://github.com/nextai-translator/nextai-translator) | TypeScript | AGPL-3.0 | [v0.6.43](https://github.com/nextai-translator/nextai-translator/releases/tag/v0.6.43) | 24998 | DeepL (partial) |
| [LibreTranslate](https://github.com/LibreTranslate/LibreTranslate) | Python | AGPL-3.0 | [v1.9.6](https://github.com/LibreTranslate/LibreTranslate/releases/tag/v1.9.6) | 16996 | DeepL (partial), Google Translate (partial) |
| [KISS Translator](https://github.com/fishjar/kiss-translator) | JavaScript | GPL-3.0 | [v2.1.0](https://github.com/fishjar/kiss-translator/releases/tag/v2.1.0) | 12765 | Google Translate (partial) |
| [BabelDOC](https://github.com/funstory-ai/BabelDOC) | Python | AGPL-3.0 | [v0.6.4](https://github.com/funstory-ai/BabelDOC/releases/tag/v0.6.4) | 9657 | DeepL (partial) |
| [Argos Translate](https://github.com/argosopentech/argos-translate) | Python | MIT | [v1.4.0](https://github.com/argosopentech/argos-translate/releases/tag/v1.4.0) | 6531 | Google Translate (partial), DeepL (partial) |
| [MTranServer](https://github.com/xxnuo/MTranServer) | C++ | Apache-2.0 | [v4.0.33](https://github.com/xxnuo/MTranServer/releases/tag/v4.0.33) | 4713 | DeepL (partial), Google Translate (partial) |

</details>

<details>
<summary><b>Read-later and bookmarks</b>, 11 tools</summary>

Save links and articles to read or find again later.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Karakeep](https://github.com/karakeep-app/karakeep) | TypeScript | AGPL-3.0 | [v0.33.2](https://github.com/karakeep-app/karakeep/releases/tag/v0.33.2) signed | 29484 | Pocket (full), Raindrop.io (full) |
| [Linkwarden](https://github.com/linkwarden/linkwarden) | TypeScript | AGPL-3.0 | [v2.16.3](https://github.com/linkwarden/linkwarden/releases/tag/v2.16.3) signed | 19944 | Raindrop.io (full), Pocket (full) |
| [wallabag](https://github.com/wallabag/wallabag) | PHP | MIT | [2.6.14](https://github.com/wallabag/wallabag/releases/tag/2.6.14) signed | 12997 | Pocket (full), Raindrop.io (partial) |
| [Shiori](https://github.com/go-shiori/shiori) | Go | MIT | [v1.8.0](https://github.com/go-shiori/shiori/releases/tag/v1.8.0) signed | 11662 | Pocket (full), Raindrop.io (partial) |
| [linkding](https://github.com/sissbruecker/linkding) | Python | MIT | [v1.47.0](https://github.com/sissbruecker/linkding/releases/tag/v1.47.0) | 11278 | Raindrop.io (full), Pocket (partial) |
| [Floccus](https://github.com/floccusaddon/floccus) | TypeScript | MPL-2.0 | [v5.11.1](https://github.com/floccusaddon/floccus/releases/tag/v5.11.1) | 8541 | none |
| [buku](https://github.com/jarun/buku) | Python | GPL-3.0 | [v5.1](https://github.com/jarun/buku/releases/tag/v5.1) signed | 7212 | Pinboard (partial) |
| [Shaarli](https://github.com/shaarli/Shaarli) | PHP | Other | [v0.16.9](https://github.com/shaarli/Shaarli/releases/tag/v0.16.9) signed | 3908 | Raindrop.io (partial) |
| [LinkAce](https://github.com/Kovah/LinkAce) | PHP | GPL-3.0 | [v2.6.1](https://github.com/Kovah/LinkAce/releases/tag/v2.6.1) signed | 3341 | Raindrop.io (full), Pocket (partial) |
| [Grimoire](https://github.com/goniszewski/grimoire) | TypeScript | MIT | [v1.3.0](https://github.com/goniszewski/grimoire/releases/tag/v1.3.0) | 2858 | Raindrop.io (partial) |
| [Briefkasten](https://github.com/ndom91/briefkasten) | Svelte | MIT | none | 1182 | Raindrop.io (partial) |

</details>

<details>
<summary><b>Feed readers</b>, 17 tools</summary>

Follow sites through RSS and Atom feeds.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Folo](https://github.com/RSSNext/Folo) | TypeScript | AGPL-3.0 | [desktop/v1.15.0](https://github.com/RSSNext/Folo/releases/tag/desktop/v1.15.0) signed | 39064 | Feedly (full), Inoreader (full) |
| [FreshRSS](https://github.com/FreshRSS/FreshRSS) | PHP | AGPL-3.0 | [1.30.1](https://github.com/FreshRSS/FreshRSS/releases/tag/1.30.1) signed | 16240 | Feedly (full) |
| [NetNewsWire](https://github.com/Ranchero-Software/NetNewsWire) | Swift | MIT | [mac-7.1.5](https://github.com/Ranchero-Software/NetNewsWire/releases/tag/mac-7.1.5) | 10450 | Feedly (partial) |
| [Miniflux](https://github.com/miniflux/v2) | Go | Apache-2.0 | [2.3.3](https://github.com/miniflux/v2/releases/tag/2.3.3) | 9769 | Feedly (full) |
| [Fluent Reader](https://github.com/yang991178/fluent-reader) | TypeScript | BSD-3-Clause | [v1.2.2](https://github.com/yang991178/fluent-reader/releases/tag/v1.2.2) | 9695 | Feedly (partial) |
| [NewsBlur](https://github.com/samuelclay/NewsBlur) | Python | MIT | [v0.2.2](https://github.com/samuelclay/NewsBlur/releases/tag/v0.2.2) | 7642 | Feedly (full) |
| [Read You](https://github.com/ReadYouApp/ReadYou) | Kotlin | GPL-3.0 | [0.16.2](https://github.com/ReadYouApp/ReadYou/releases/tag/0.16.2) signed | 7579 | Feedly (partial) |
| [Stringer](https://github.com/stringer-rss/stringer) | Ruby | MIT | none | 4132 | Feedly (partial) |
| [yarr](https://github.com/nkanaev/yarr) | Go | MIT | [v2.9](https://github.com/nkanaev/yarr/releases/tag/v2.9) | 4064 | Feedly (partial) |
| [Newsboat](https://github.com/newsboat/newsboat) | C++ | MIT | [r2.45](https://github.com/newsboat/newsboat/releases/tag/r2.45) | 3917 | Feedly (partial) |
| [Feedbin](https://github.com/feedbin/feedbin) | Ruby | MIT | none | 3781 | Feedly (full) |
| [CommaFeed](https://github.com/Athou/commafeed) | Java | Apache-2.0 | [7.3.2](https://github.com/Athou/commafeed/releases/tag/7.3.2) | 3629 | Feedly (full) |
| [Feeder](https://github.com/spacecowboy/Feeder) | Kotlin | GPL-3.0 | [2.23.2](https://github.com/spacecowboy/Feeder/releases/tag/2.23.2) signed | 3068 | Feedly (partial) |
| [selfoss](https://github.com/fossar/selfoss) | HTML | GPL-3.0 | [2.19](https://github.com/fossar/selfoss/releases/tag/2.19) signed | 2474 | Feedly (full) |
| [Fusion](https://github.com/0x2E/fusion) | TypeScript | MIT | [v1.2.1](https://github.com/0x2E/fusion/releases/tag/v1.2.1) signed | 2188 | Feedly (full) |
| [Capy Reader](https://github.com/jocmp/capyreader) | Kotlin | GPL-3.0 | [2026.07.1212](https://github.com/jocmp/capyreader/releases/tag/2026.07.1212) | 1403 | Feedly (partial) |
| [Tiny Tiny RSS](https://github.com/tt-rss/tt-rss) | PHP | GPL-3.0 | none | 855 | Feedly (full), Inoreader (partial) |

</details>

<details>
<summary><b>DNS ad blockers</b>, 5 tools</summary>

Block ads and trackers for a whole network at the DNS level.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Pi-hole](https://github.com/pi-hole/pi-hole) | Shell | Other | [v6.4.3](https://github.com/pi-hole/pi-hole/releases/tag/v6.4.3) signed | 61179 | NextDNS (partial) |
| [AdGuard Home](https://github.com/AdguardTeam/AdGuardHome) | TypeScript | GPL-3.0 | [v0.107.79](https://github.com/AdguardTeam/AdGuardHome/releases/tag/v0.107.79) | 37257 | Pi-hole (full), NextDNS (full) |
| [dnscrypt-proxy](https://github.com/DNSCrypt/dnscrypt-proxy) | Go | ISC | [2.1.18](https://github.com/DNSCrypt/dnscrypt-proxy/releases/tag/2.1.18) signed | 13723 | NextDNS (partial) |
| [Technitium DNS Server](https://github.com/TechnitiumSoftware/DnsServer) | C# | GPL-3.0 | [v15.6.0](https://github.com/TechnitiumSoftware/DnsServer/releases/tag/v15.6.0) | 10066 | Pi-hole (full), NextDNS (full) |
| [Blocky](https://github.com/0xERR0R/blocky) | Go | Apache-2.0 | [v0.35.0](https://github.com/0xERR0R/blocky/releases/tag/v0.35.0) signed | 7012 | Pi-hole (full) |

</details>

<details>
<summary><b>ERP</b>, 13 tools</summary>

Accounting, inventory, sales and operations in one system.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Odoo](https://github.com/odoo/odoo) | Python | Other | [5.0.0-2-addons](https://github.com/odoo/odoo/releases/tag/5.0.0-2-addons) | 54866 | NetSuite (full) |
| [ERPNext](https://github.com/frappe/erpnext) | Python | GPL-3.0 | [v16.50.0](https://github.com/frappe/erpnext/releases/tag/v16.50.0) | 39849 | NetSuite (full), Odoo (full) |
| [Invoice Ninja](https://github.com/invoiceninja/invoiceninja) | PHP | Other | [v5.13.43](https://github.com/invoiceninja/invoiceninja/releases/tag/v5.13.43) signed | 10233 | QuickBooks (partial) |
| [Akaunting](https://github.com/akaunting/akaunting) | PHP | Other | [3.2.4](https://github.com/akaunting/akaunting/releases/tag/3.2.4) | 10163 | QuickBooks (full), Xero (full) |
| [Ever Gauzy](https://github.com/ever-co/ever-gauzy) | TypeScript | AGPL-3.0 | [v111.48.2](https://github.com/ever-co/ever-gauzy/releases/tag/v111.48.2) signed | 8204 | NetSuite (partial), Harvest (full) |
| [Dolibarr](https://github.com/Dolibarr/dolibarr) | PHP | GPL-3.0 | [24.0.1](https://github.com/Dolibarr/dolibarr/releases/tag/24.0.1) | 7694 | NetSuite (partial) |
| [Bigcapital](https://github.com/bigcapitalhq/bigcapital) | TypeScript | AGPL-3.0 | [v0.25.42](https://github.com/bigcapitalhq/bigcapital/releases/tag/v0.25.42) signed | 3923 | QuickBooks (full), Xero (full) |
| [metasfresh](https://github.com/metasfresh/metasfresh) | Java | none | [5.175](https://github.com/metasfresh/metasfresh/releases/tag/5.175) | 2442 | NetSuite (partial) |
| [Apache OFBiz](https://github.com/apache/ofbiz-framework) | Java | Apache-2.0 | [release24.09.07](https://github.com/apache/ofbiz-framework/releases/tag/release24.09.07) | 1125 | NetSuite (partial) |
| [Axelor Open Suite](https://github.com/axelor/axelor-open-suite) | Java | Other | [v9.1.9](https://github.com/axelor/axelor-open-suite/releases/tag/v9.1.9) | 980 | NetSuite (partial) |
| [ADempiere](https://github.com/adempiere/adempiere) | Java | GPL-2.0 | [3.9.4.001](https://github.com/adempiere/adempiere/releases/tag/3.9.4.001) | 886 | NetSuite (partial) |
| [iDempiere](https://github.com/idempiere/idempiere) | Java | Other | [v2.0](https://github.com/idempiere/idempiere/releases/tag/v2.0) | 666 | NetSuite (partial) |
| [LedgerSMB](https://github.com/ledgersmb/LedgerSMB) | Perl | Other | [1.13.8](https://github.com/ledgersmb/LedgerSMB/releases/tag/1.13.8) | 570 | QuickBooks (partial), Xero (partial) |

</details>

<details>
<summary><b>Budgeting and personal finance</b>, 17 tools</summary>

Track accounts, spending and budgets for a person or a household.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Maybe](https://github.com/maybe-finance/maybe) archived | Ruby | AGPL-3.0 | [v0.6.0](https://github.com/maybe-finance/maybe/releases/tag/v0.6.0) | 54244 | none |
| [Actual Budget](https://github.com/actualbudget/actual) | TypeScript | MIT | [v26.10.0](https://github.com/actualbudget/actual/releases/tag/v26.10.0) signed | 29338 | YNAB (full), Mint (partial) |
| [Firefly III](https://github.com/firefly-iii/firefly-iii) | PHP | AGPL-3.0 | [v6.7.7](https://github.com/firefly-iii/firefly-iii/releases/tag/v6.7.7) | 24836 | YNAB (partial), Mint (full), Monarch Money (partial) |
| [Sure](https://github.com/we-promise/sure) | Ruby | AGPL-3.0 | [v0.7.5-hotfix.2](https://github.com/we-promise/sure/releases/tag/v0.7.5-hotfix.2) | 10406 | Maybe (full), Monarch Money (full), YNAB (partial), Mint (full) |
| [Ghostfolio](https://github.com/ghostfolio/ghostfolio) | TypeScript | AGPL-3.0 | [3.80.2](https://github.com/ghostfolio/ghostfolio/releases/tag/3.80.2) signed | 9408 | Monarch Money (partial) |
| [Wealthfolio](https://github.com/wealthfolio/wealthfolio) | Rust | AGPL-3.0 | [v3.9.1](https://github.com/wealthfolio/wealthfolio/releases/tag/v3.9.1) | 9119 | Empower Personal Dashboard (partial) |
| [Wallos](https://github.com/ellite/Wallos) | PHP | GPL-3.0 | [v5.8.3](https://github.com/ellite/Wallos/releases/tag/v5.8.3) signed | 8635 | Rocket Money (partial) |
| [Ledger](https://github.com/ledger/ledger) | C++ | Other | [v3.4.1](https://github.com/ledger/ledger/releases/tag/v3.4.1) signed | 6054 | Quicken (partial) |
| [Beancount](https://github.com/beancount/beancount) | Python | GPL-2.0 | [3.2.3](https://github.com/beancount/beancount/releases/tag/3.2.3) | 6053 | Quicken (partial) |
| [ezBookkeeping](https://github.com/mayswind/ezbookkeeping) | Go | MIT | [v2.0.1](https://github.com/mayswind/ezbookkeeping/releases/tag/v2.0.1) | 5720 | Mint (partial), Quicken (partial) |
| [hledger](https://github.com/hledgerorg/hledger) | Haskell | GPL-3.0 | [1.52.4](https://github.com/hledgerorg/hledger/releases/tag/1.52.4) signed | 4746 | Quicken (partial) |
| [GnuCash](https://github.com/Gnucash/gnucash) | C | Other | [5.17](https://github.com/Gnucash/gnucash/releases/tag/5.17) | 4367 | Quicken (partial) |
| [Portfolio Performance](https://github.com/portfolio-performance/portfolio) | Java | EPL-1.0 | [0.88.0](https://github.com/portfolio-performance/portfolio/releases/tag/0.88.0) signed | 4089 | Empower Personal Dashboard (partial) |
| [Paisa](https://github.com/ananthakumaran/paisa) | TypeScript | AGPL-3.0 | [v0.7.6](https://github.com/ananthakumaran/paisa/releases/tag/v0.7.6) | 3222 | Quicken (partial) |
| [Fava](https://github.com/beancount/fava) | Python | MIT | [v1.30.16](https://github.com/beancount/fava/releases/tag/v1.30.16) signed | 2584 | Quicken (partial) |
| [Money Manager Ex](https://github.com/moneymanagerex/moneymanagerex) | C++ | GPL-2.0 | [v1.9.4](https://github.com/moneymanagerex/moneymanagerex/releases/tag/v1.9.4) signed | 2271 | Quicken (partial) |
| [Budget Board](https://github.com/teelur/budget-board) | C# | AGPL-3.0 | [v3.8.2](https://github.com/teelur/budget-board/releases/tag/v3.8.2) signed | 886 | Mint (partial) |

</details>

<details>
<summary><b>CRM</b>, 12 tools</summary>

Track contacts, companies and deals.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Twenty](https://github.com/twentyhq/twenty) | TypeScript | Other | [twenty/v2.45.0](https://github.com/twentyhq/twenty/releases/tag/twenty/v2.45.0) signed | 57969 | Salesforce (partial), HubSpot (partial), Pipedrive (full) |
| [Monica](https://github.com/monicahq/monica) | PHP | AGPL-3.0 | [v4.1.2](https://github.com/monicahq/monica/releases/tag/v4.1.2) signed | 25442 | none |
| [Krayin CRM](https://github.com/krayin/laravel-crm) | PHP | MIT | [v2.2.6](https://github.com/krayin/laravel-crm/releases/tag/v2.2.6) signed | 23977 | Salesforce (partial), HubSpot (partial), Pipedrive (full) |
| [IDURAR](https://github.com/idurar/idurar-erp-crm) | JavaScript | AGPL-3.0 | [4.1.1](https://github.com/idurar/idurar-erp-crm/releases/tag/4.1.1) signed | 8851 | QuickBooks (partial) |
| [SuiteCRM](https://github.com/SuiteCRM/SuiteCRM) | PHP | AGPL-3.0 | [v7.15.2](https://github.com/SuiteCRM/SuiteCRM/releases/tag/v7.15.2) | 5782 | Salesforce (full) |
| [Frappe CRM](https://github.com/frappe/crm) | Vue | AGPL-3.0 | [v1.86.0](https://github.com/frappe/crm/releases/tag/v1.86.0) | 3733 | Pipedrive (full), Salesforce (partial) |
| [Fat Free CRM](https://github.com/fatfreecrm/fat_free_crm) | Ruby | Other | [v0.28.0](https://github.com/fatfreecrm/fat_free_crm/releases/tag/v0.28.0) signed | 3633 | Salesforce (partial) |
| [EspoCRM](https://github.com/espocrm/espocrm) | PHP | AGPL-3.0 | [10.0.9](https://github.com/espocrm/espocrm/releases/tag/10.0.9) | 3443 | Salesforce (partial), HubSpot (partial), Pipedrive (full) |
| [Relaticle](https://github.com/relaticle/relaticle) | PHP | AGPL-3.0 | [v3.6.2](https://github.com/relaticle/relaticle/releases/tag/v3.6.2) signed | 1754 | Pipedrive (partial) |
| [Atomic CRM](https://github.com/marmelab/atomic-crm) | TypeScript | MIT | [v1.6.0](https://github.com/marmelab/atomic-crm/releases/tag/v1.6.0) | 1318 | Pipedrive (partial) |
| [CiviCRM](https://github.com/civicrm/civicrm-core) | PHP | AGPL-3.0 | [6.18.2](https://github.com/civicrm/civicrm-core/releases/tag/6.18.2) signed | 780 | Salesforce (partial) |
| [OroCRM](https://github.com/oroinc/crm) | PHP | Other | [2.0.6](https://github.com/oroinc/crm/releases/tag/2.0.6) | 687 | Salesforce (partial) |

</details>

<details>
<summary><b>Help desks</b>, 17 tools</summary>

Handle customer requests from email, chat and other channels as tickets.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Chatwoot](https://github.com/chatwoot/chatwoot) | Ruby | Other | [v4.18.0](https://github.com/chatwoot/chatwoot/releases/tag/v4.18.0) | 37585 | Intercom (full), Zendesk (partial) |
| [UVdesk](https://github.com/uvdesk/community-skeleton) | CSS | OSL-3.0 | [v1.1.8](https://github.com/uvdesk/community-skeleton/releases/tag/v1.1.8) signed | 19626 | Zendesk (partial), Freshdesk (partial) |
| [GLPI](https://github.com/glpi-project/glpi) | PHP | GPL-3.0 | [11.0.11](https://github.com/glpi-project/glpi/releases/tag/11.0.11) | 6429 | ServiceNow (partial) |
| [Zammad](https://github.com/zammad/zammad) | Ruby | AGPL-3.0 | [7.2.1](https://github.com/zammad/zammad/releases/tag/7.2.1) signed | 5984 | Zendesk (full), Freshdesk (full) |
| [FreeScout](https://github.com/freescout-help-desk/freescout) | PHP | AGPL-3.0 | [1.8.245](https://github.com/freescout-help-desk/freescout/releases/tag/1.8.245) | 4587 | Zendesk (partial) |
| [osTicket](https://github.com/osTicket/osTicket) | PHP | GPL-2.0 | [v1.18.4](https://github.com/osTicket/osTicket/releases/tag/v1.18.4) | 3975 | Zendesk (partial), Freshdesk (partial) |
| [Chaskiq](https://github.com/chaskiq/chaskiq) | TypeScript | Other | [2.0.3](https://github.com/chaskiq/chaskiq/releases/tag/2.0.3) signed | 3574 | Intercom (full) |
| [Helpdesk](https://github.com/frappe/helpdesk) | Vue | AGPL-3.0 | [v1.30.1](https://github.com/frappe/helpdesk/releases/tag/v1.30.1) | 3421 | Zendesk (partial), Freshdesk (partial) |
| [Libredesk](https://github.com/abhinavxd/libredesk) | Go | AGPL-3.0 | [v2.8.0](https://github.com/abhinavxd/libredesk/releases/tag/v2.8.0) signed | 2998 | Zendesk (partial), Freshdesk (partial), Intercom (partial) |
| [Live Helper Chat](https://github.com/LiveHelperChat/livehelperchat) | PHP | Apache-2.0 | [4.94v](https://github.com/LiveHelperChat/livehelperchat/releases/tag/4.94v) | 2252 | Intercom (partial) |
| [Trudesk](https://github.com/polonel/trudesk) | JavaScript | Other | [v1.2.11](https://github.com/polonel/trudesk/releases/tag/v1.2.11) | 1496 | Zendesk (partial) |
| [Faveo Helpdesk](https://github.com/faveosuite/faveo-helpdesk) | PHP | OSL-3.0 | [v2.0.3](https://github.com/faveosuite/faveo-helpdesk/releases/tag/v2.0.3) | 1258 | Zendesk (partial) |
| [iTop](https://github.com/Combodo/iTop) | PHP | AGPL-3.0 | [3.3.0](https://github.com/Combodo/iTop/releases/tag/3.3.0) | 1195 | ServiceNow (partial) |
| [Request Tracker](https://github.com/bestpractical/rt) | Perl | GPL-2.0 | [rt-6.0.3](https://github.com/bestpractical/rt/releases/tag/rt-6.0.3) signed | 1163 | Zendesk (partial) |
| [Znuny](https://github.com/znuny/Znuny) | Perl | GPL-3.0 | [rel-7_3_7](https://github.com/znuny/Znuny/releases/tag/rel-7_3_7) | 600 | ServiceNow (partial), Zendesk (partial) |
| [OTOBO](https://github.com/RotherOSS/otobo) | Perl | GPL-3.0 | [rel-11_0_18](https://github.com/RotherOSS/otobo/releases/tag/rel-11_0_18) | 336 | ServiceNow (partial), Zendesk (partial) |
| [Tiledesk](https://github.com/Tiledesk/tiledesk) | Mustache | MIT | [1.2.1](https://github.com/Tiledesk/tiledesk/releases/tag/1.2.1) | 322 | Intercom (partial) |

</details>

<details>
<summary><b>E-commerce</b>, 21 tools</summary>

Run an online store, from catalogue to checkout.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Medusa](https://github.com/medusajs/medusa) | TypeScript | Other | [v2.21.2](https://github.com/medusajs/medusa/releases/tag/v2.21.2) signed | 36626 | Shopify (partial) |
| [Bagisto](https://github.com/bagisto/bagisto) | PHP | MIT | [v2.5.0](https://github.com/bagisto/bagisto/releases/tag/v2.5.0) | 28214 | Shopify (full) |
| [Saleor](https://github.com/saleor/saleor) | Python | BSD-3-Clause | [3.23.39](https://github.com/saleor/saleor/releases/tag/3.23.39) signed | 23417 | Shopify (partial) |
| [Spree Commerce](https://github.com/spree/spree) | Ruby | BSD-3-Clause | [v5.6.1](https://github.com/spree/spree/releases/tag/v5.6.1) | 15742 | Shopify (full) |
| [Magento Open Source](https://github.com/magento/magento2) | PHP | OSL-3.0 | [2.4.9](https://github.com/magento/magento2/releases/tag/2.4.9) | 12197 | Shopify (full) |
| [WooCommerce](https://github.com/woocommerce/woocommerce) | PHP | Other | [11.1.2](https://github.com/woocommerce/woocommerce/releases/tag/11.1.2) signed | 10539 | Shopify (full) |
| [EverShop](https://github.com/evershopcommerce/evershop) | TypeScript | GPL-3.0 | [v2.2.1](https://github.com/evershopcommerce/evershop/releases/tag/v2.2.1) | 10501 | Shopify (full) |
| [nopCommerce](https://github.com/nopSolutions/nopCommerce) | C# | Other | [release-4.90.8](https://github.com/nopSolutions/nopCommerce/releases/tag/release-4.90.8) | 10160 | Shopify (full) |
| [PrestaShop](https://github.com/PrestaShop/PrestaShop) | PHP | Other | [9.2.0](https://github.com/PrestaShop/PrestaShop/releases/tag/9.2.0) signed | 9225 | Shopify (full) |
| [Aimeos](https://github.com/aimeos/aimeos-laravel) | PHP | MIT | [2026.10.1](https://github.com/aimeos/aimeos-laravel/releases/tag/2026.10.1) | 8707 | Shopify (partial) |
| [Sylius](https://github.com/Sylius/Sylius) | PHP | MIT | [v2.3.0](https://github.com/Sylius/Sylius/releases/tag/v2.3.0) signed | 8551 | Shopify (partial) |
| [Vendure](https://github.com/vendurehq/vendure) | TypeScript | Other | [v3.7.4](https://github.com/vendurehq/vendure/releases/tag/v3.7.4) | 8505 | Shopify (partial) |
| [OpenCart](https://github.com/opencart/opencart) | PHP | Other | [4.1.0.4](https://github.com/opencart/opencart/releases/tag/4.1.0.4) signed | 8212 | Shopify (partial) |
| [Django Oscar](https://github.com/django-oscar/django-oscar) | Python | BSD-3-Clause | [4.2.1](https://github.com/django-oscar/django-oscar/releases/tag/4.2.1) signed | 6625 | Shopify (partial) |
| [Solidus](https://github.com/solidusio/solidus) | Ruby | BSD-3-Clause | [v4.7.1](https://github.com/solidusio/solidus/releases/tag/v4.7.1) signed | 5336 | Shopify (partial) |
| [TastyIgniter](https://github.com/tastyigniter/TastyIgniter) | PHP | MIT | [v4.4.3](https://github.com/tastyigniter/TastyIgniter/releases/tag/v4.4.3) signed | 3775 | none |
| [Lunar](https://github.com/lunarphp/lunar) | PHP | MIT | [1.5.0](https://github.com/lunarphp/lunar/releases/tag/1.5.0) signed | 3749 | Shopify (partial) |
| [Shopware](https://github.com/shopware/shopware) | PHP | MIT | [v6.7.15.0](https://github.com/shopware/shopware/releases/tag/v6.7.15.0) signed | 3441 | Shopify (full) |
| [Shopper](https://github.com/shopperlabs/shopper) | PHP | MIT | [v2.12.0](https://github.com/shopperlabs/shopper/releases/tag/v2.12.0) signed | 1260 | Shopify (partial) |
| [Thelia](https://github.com/thelia/thelia) | PHP | GPL-3.0 | [3.2.1](https://github.com/thelia/thelia/releases/tag/3.2.1) | 880 | Shopify (partial) |
| [OroCommerce](https://github.com/oroinc/orocommerce) | PHP | Other | [1.2.0](https://github.com/oroinc/orocommerce/releases/tag/1.2.0) | 210 | Shopify (partial) |

</details>

<details>
<summary><b>URL shorteners</b>, 7 tools</summary>

Short links on your own domain, with click statistics.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Dub](https://github.com/dubinc/dub) | TypeScript | Other | none | 24869 | Bitly (full) |
| [YOURLS](https://github.com/YOURLS/YOURLS) | PHP | MIT | [1.10.6](https://github.com/YOURLS/YOURLS/releases/tag/1.10.6) signed | 12254 | Bitly (full) |
| [Kutt](https://github.com/thedevs-network/kutt) | JavaScript | MIT | [v3.2.6](https://github.com/thedevs-network/kutt/releases/tag/v3.2.6) | 11140 | Bitly (full) |
| [Sink](https://github.com/miantiao-me/Sink) | TypeScript | AGPL-3.0 | [v0.3.1](https://github.com/miantiao-me/Sink/releases/tag/v0.3.1) | 7193 | Bitly (full) |
| [Shlink](https://github.com/shlinkio/shlink) | PHP | MIT | [v5.1.7](https://github.com/shlinkio/shlink/releases/tag/v5.1.7) | 5318 | Bitly (full) |
| [Slash](https://github.com/yourselfhosted/slash) | TypeScript | AGPL-3.0 | [v0.5.3](https://github.com/yourselfhosted/slash/releases/tag/v0.5.3) | 3185 | Bitly (partial) |
| [Chhoto URL](https://github.com/SinTan1729/chhoto-url) | Rust | MIT | [7.8.2](https://github.com/SinTan1729/chhoto-url/releases/tag/7.8.2) signed | 980 | Bitly (partial) |

</details>

<details>
<summary><b>Mail servers</b>, 21 tools</summary>

Host email for your own domains.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [docker-mailserver](https://github.com/docker-mailserver/docker-mailserver) | Shell | MIT | [v16.0.1](https://github.com/docker-mailserver/docker-mailserver/releases/tag/v16.0.1) signed | 18905 | Google Workspace (partial) |
| [Postal](https://github.com/postalserver/postal) | Ruby | MIT | [3.3.7](https://github.com/postalserver/postal/releases/tag/3.3.7) signed | 16854 | SendGrid (full) |
| [Mail-in-a-Box](https://github.com/mail-in-a-box/mailinabox) | Python | CC0-1.0 | [v77](https://github.com/mail-in-a-box/mailinabox/releases/tag/v77) | 15436 | Google Workspace (partial) |
| [Stalwart](https://github.com/stalwartlabs/stalwart) | Rust | none | [v0.16.25](https://github.com/stalwartlabs/stalwart/releases/tag/v0.16.25) | 14975 | Google Workspace (partial), Microsoft 365 (partial) |
| [mailcow](https://github.com/mailcow/mailcow-dockerized) | JavaScript | GPL-3.0 | [2026-09a](https://github.com/mailcow/mailcow-dockerized/releases/tag/2026-09a) signed | 13563 | Google Workspace (partial), Microsoft 365 (partial) |
| [Mailu](https://github.com/Mailu/Mailu) | Python | Other | [2024.06.61](https://github.com/Mailu/Mailu/releases/tag/2024.06.61) signed | 7538 | Google Workspace (partial) |
| [Maddy](https://github.com/foxcpp/maddy) | Go | GPL-3.0 | [v0.9.6](https://github.com/foxcpp/maddy/releases/tag/v0.9.6) signed | 6100 | Google Workspace (partial) |
| [Mox](https://github.com/mjl-/mox) | Go | MIT | [v0.0.17](https://github.com/mjl-/mox/releases/tag/v0.0.17) | 5890 | Google Workspace (partial) |
| [Haraka](https://github.com/haraka/Haraka) | JavaScript | MIT | [v3.3.4](https://github.com/haraka/Haraka/releases/tag/v3.3.4) signed | 5613 | SendGrid (partial) |
| [Modoboa](https://github.com/modoboa/modoboa) | Python | ISC | [2.11.0](https://github.com/modoboa/modoboa/releases/tag/2.11.0) signed | 3542 | Google Workspace (partial) |
| [Rspamd](https://github.com/rspamd/rspamd) | C | Other | [4.2.1](https://github.com/rspamd/rspamd/releases/tag/4.2.1) signed | 2539 | none |
| [WildDuck](https://github.com/zone-eu/wildduck) | JavaScript | EUPL-1.2 | [v1.51.4](https://github.com/zone-eu/wildduck/releases/tag/v1.51.4) signed | 2109 | none |
| [iRedMail](https://github.com/iredmail/iRedMail) | Shell | GPL-3.0 | [1.8.8](https://github.com/iredmail/iRedMail/releases/tag/1.8.8) | 1845 | Google Workspace (partial) |
| [Dovecot](https://github.com/dovecot/core) | C | Other | [2.4.5](https://github.com/dovecot/core/releases/tag/2.4.5) | 1262 | none |
| [PostfixAdmin](https://github.com/postfixadmin/postfixadmin) | PHP | Other | [v4.0.5](https://github.com/postfixadmin/postfixadmin/releases/tag/v4.0.5) signed | 1260 | none |
| [Apache James](https://github.com/apache/james-project) | Java | Apache-2.0 | [james-project-3.9.1](https://github.com/apache/james-project/releases/tag/james-project-3.9.1) | 1048 | none |
| [chasquid](https://github.com/albertito/chasquid) | Go | Other | [v1.18.0](https://github.com/albertito/chasquid/releases/tag/v1.18.0) signed | 978 | none |
| [Hyvor Relay](https://github.com/hyvor/relay) | PHP | AGPL-3.0 | [0.0.46](https://github.com/hyvor/relay/releases/tag/0.0.46) signed | 911 | SendGrid (partial) |
| [Cyrus IMAP](https://github.com/cyrusimap/cyrus-imapd) | C | Other | [cyrus-imapd-3.12.4](https://github.com/cyrusimap/cyrus-imapd/releases/tag/cyrus-imapd-3.12.4) signed | 652 | none |
| [OpenSMTPD](https://github.com/OpenSMTPD/OpenSMTPD) | C | Other | [7.9.0p0](https://github.com/OpenSMTPD/OpenSMTPD/releases/tag/7.9.0p0) | 586 | none |
| [chatmail relay](https://github.com/chatmail/relay) | Python | MIT | [1.13.0](https://github.com/chatmail/relay/releases/tag/1.13.0) | 489 | none |

</details>

<details>
<summary><b>Cloud development environments</b>, 4 tools</summary>

Development environments on a remote machine, reached from a browser or a local editor.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [code-server](https://github.com/coder/code-server) | TypeScript | MIT | [v4.140.0](https://github.com/coder/code-server/releases/tag/v4.140.0) signed | 79553 | GitHub Codespaces (partial) |
| [Coder](https://github.com/coder/coder) | Go | AGPL-3.0 | [v2.36.7](https://github.com/coder/coder/releases/tag/v2.36.7) | 16868 | GitHub Codespaces (full) |
| [DevPod](https://github.com/loft-sh/devpod) | Go | MPL-2.0 | [v0.6.15](https://github.com/loft-sh/devpod/releases/tag/v0.6.15) | 15248 | GitHub Codespaces (full) |
| [Eclipse Che](https://github.com/eclipse-che/che) | TypeScript | EPL-2.0 | [7.123.0](https://github.com/eclipse-che/che/releases/tag/7.123.0) | 7168 | GitHub Codespaces (full) |

</details>

<details>
<summary><b>Service meshes</b>, 5 tools</summary>

Encrypt, route and observe traffic between services in a cluster.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Istio](https://github.com/istio/istio) | Go | Apache-2.0 | [1.31.1](https://github.com/istio/istio/releases/tag/1.31.1) | 38430 | Linkerd (full) |
| [Consul](https://github.com/hashicorp/consul) | Go | Other | [v2.0.4](https://github.com/hashicorp/consul/releases/tag/v2.0.4) signed | 30093 | Istio (full) |
| [Cilium](https://github.com/cilium/cilium) | Go | Apache-2.0 | [v1.20.2](https://github.com/cilium/cilium/releases/tag/v1.20.2) signed | 25612 | Istio (partial) |
| [Linkerd](https://github.com/linkerd/linkerd2) | Go | Apache-2.0 | [edge-26.10.1](https://github.com/linkerd/linkerd2/releases/tag/edge-26.10.1) signed | 11508 | none |
| [Kuma](https://github.com/kumahq/kuma) | Go | Apache-2.0 | [v2.14.5](https://github.com/kumahq/kuma/releases/tag/v2.14.5) | 4011 | Linkerd (full) |

</details>

<details>
<summary><b>API gateways</b>, 11 tools</summary>

Route, authenticate and rate-limit API traffic in front of services.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Kong Gateway](https://github.com/Kong/kong) | Lua | Apache-2.0 | [3.9.3](https://github.com/Kong/kong/releases/tag/3.9.3) signed | 44245 | none |
| [Apache APISIX](https://github.com/apache/apisix) | Lua | Apache-2.0 | [3.19.0](https://github.com/apache/apisix/releases/tag/3.19.0) | 17200 | Kong Gateway (full) |
| [Tyk](https://github.com/TykTechnologies/tyk) | Go | Other | [v5.15.1](https://github.com/TykTechnologies/tyk/releases/tag/v5.15.1) signed | 10853 | Kong Gateway (full) |
| [Higress](https://github.com/higress-group/higress) | Go | Apache-2.0 | [v2.2.5](https://github.com/higress-group/higress/releases/tag/v2.2.5) | 9495 | Kong Gateway (partial) |
| [Apache ShenYu](https://github.com/apache/shenyu) | Java | Apache-2.0 | [v2.7.1](https://github.com/apache/shenyu/releases/tag/v2.7.1) | 8844 | Kong Gateway (partial) |
| [Easegress](https://github.com/easegress-io/easegress) | Go | Apache-2.0 | [v2.11.0](https://github.com/easegress-io/easegress/releases/tag/v2.11.0) signed | 5867 | Kong Gateway (partial) |
| [Unkey](https://github.com/unkeyed/unkey) | Go | Other | [control-worker/v1.1.40](https://github.com/unkeyed/unkey/releases/tag/control-worker/v1.1.40) signed | 5458 | none |
| [KrakenD](https://github.com/krakend/krakend-ce) | Go | Apache-2.0 | [v3.0.0](https://github.com/krakend/krakend-ce/releases/tag/v3.0.0) signed | 2690 | Kong Gateway (partial) |
| [Fusio](https://github.com/apioo/fusio) | PHP | Apache-2.0 | [v7.2.0](https://github.com/apioo/fusio/releases/tag/v7.2.0) | 2126 | Apigee (partial) |
| [WSO2 API Manager](https://github.com/wso2/product-apim) | Java | Apache-2.0 | [v4.7.0](https://github.com/wso2/product-apim/releases/tag/v4.7.0) | 1031 | Apigee (full) |
| [Gravitee](https://github.com/gravitee-io/gravitee-api-management) | Java | Apache-2.0 | [4.12.21](https://github.com/gravitee-io/gravitee-api-management/releases/tag/4.12.21) | 457 | Apigee (full), Kong Gateway (full) |

</details>

<details>
<summary><b>Workflow orchestration</b>, 15 tools</summary>

Schedule and run data pipelines and jobs as dependency graphs.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Apache Airflow](https://github.com/apache/airflow) | Python | Apache-2.0 | [3.3.2](https://github.com/apache/airflow/releases/tag/3.3.2) | 47072 | none |
| [Conductor](https://github.com/conductor-oss/conductor) | Java | Apache-2.0 | [v3.32.5](https://github.com/conductor-oss/conductor/releases/tag/v3.32.5) | 32270 | none |
| [XXL-JOB](https://github.com/xuxueli/xxl-job) | Java | GPL-3.0 | [3.4.2](https://github.com/xuxueli/xxl-job/releases/tag/3.4.2) | 30601 | none |
| [Kestra](https://github.com/kestra-io/kestra) | Java | Apache-2.0 | [v2.0.5](https://github.com/kestra-io/kestra/releases/tag/v2.0.5) | 29306 | Apache Airflow (full) |
| [Prefect](https://github.com/PrefectHQ/prefect) | Python | Apache-2.0 | [3.8.8](https://github.com/PrefectHQ/prefect/releases/tag/3.8.8) signed | 23980 | Apache Airflow (full) |
| [Temporal](https://github.com/temporalio/temporal) | Go | MIT | [v1.32.0](https://github.com/temporalio/temporal/releases/tag/v1.32.0) signed | 23500 | none |
| [Luigi](https://github.com/spotify/luigi) | Python | Apache-2.0 | [v3.8.1](https://github.com/spotify/luigi/releases/tag/v3.8.1) | 18781 | Apache Airflow (partial) |
| [Argo Workflows](https://github.com/argoproj/argo-workflows) | Go | Apache-2.0 | [v4.1.4](https://github.com/argoproj/argo-workflows/releases/tag/v4.1.4) signed | 17024 | Apache Airflow (full) |
| [Dagster](https://github.com/dagster-io/dagster) | Python | Apache-2.0 | [1.13.25](https://github.com/dagster-io/dagster/releases/tag/1.13.25) | 16243 | Apache Airflow (full) |
| [Apache DolphinScheduler](https://github.com/apache/dolphinscheduler) | Java | Apache-2.0 | [3.4.3](https://github.com/apache/dolphinscheduler/releases/tag/3.4.3) | 14507 | Apache Airflow (full) |
| [Mage](https://github.com/mage-ai/mage-ai) | Python | Apache-2.0 | [0.9.79](https://github.com/mage-ai/mage-ai/releases/tag/0.9.79) signed | 8831 | Apache Airflow (partial) |
| [PowerJob](https://github.com/PowerJob/PowerJob) | Java | Apache-2.0 | [v5.1.7](https://github.com/PowerJob/PowerJob/releases/tag/v5.1.7) | 7794 | none |
| [Flyte](https://github.com/flyteorg/flyte) | Go | Apache-2.0 | [v1.16.9](https://github.com/flyteorg/flyte/releases/tag/v1.16.9) signed | 7639 | Apache Airflow (partial) |
| [Dagu](https://github.com/dagucloud/dagu) | Go | GPL-3.0 | [v2.18.2](https://github.com/dagucloud/dagu/releases/tag/v2.18.2) signed | 4287 | Apache Airflow (partial) |
| [Maestro](https://github.com/Netflix/maestro) | Java | Apache-2.0 | none | 3841 | Apache Airflow (partial) |

</details>

<details>
<summary><b>Vector databases</b>, 11 tools</summary>

Store embeddings and search them by similarity.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Milvus](https://github.com/milvus-io/milvus) | Go | Apache-2.0 | [v3.0.2](https://github.com/milvus-io/milvus/releases/tag/v3.0.2) signed | 46327 | Pinecone (full) |
| [Qdrant](https://github.com/qdrant/qdrant) | Rust | Apache-2.0 | [v1.19.2](https://github.com/qdrant/qdrant/releases/tag/v1.19.2) signed | 34948 | Pinecone (full) |
| [Chroma](https://github.com/chroma-core/chroma) | Rust | Apache-2.0 | [1.5.9](https://github.com/chroma-core/chroma/releases/tag/1.5.9) signed | 29454 | Pinecone (partial) |
| [pgvector](https://github.com/pgvector/pgvector) | C | Other | [v0.8.7](https://github.com/pgvector/pgvector/releases/tag/v0.8.7) | 23256 | Pinecone (partial) |
| [Weaviate](https://github.com/weaviate/weaviate) | Go | Other | [v1.39.9](https://github.com/weaviate/weaviate/releases/tag/v1.39.9) | 16867 | Pinecone (full) |
| [LanceDB](https://github.com/lancedb/lancedb) | Rust | Apache-2.0 | [v0.39.0](https://github.com/lancedb/lancedb/releases/tag/v0.39.0) | 11610 | Pinecone (partial) |
| [Deep Lake](https://github.com/activeloopai/deeplake) | C++ | Apache-2.0 | [v4.5.2](https://github.com/activeloopai/deeplake/releases/tag/v4.5.2) signed | 9249 | none |
| [Infinity](https://github.com/infiniflow/infinity) | C++ | Apache-2.0 | [v0.7.3](https://github.com/infiniflow/infinity/releases/tag/v0.7.3) signed | 4732 | Pinecone (partial) |
| [pgvectorscale](https://github.com/timescale/pgvectorscale) | Rust | PostgreSQL | [0.9.1](https://github.com/timescale/pgvectorscale/releases/tag/0.9.1) | 3136 | Pinecone (partial) |
| [VectorChord](https://github.com/supervc-stack/VectorChord) | Rust | Other | [1.1.1](https://github.com/supervc-stack/VectorChord/releases/tag/1.1.1) | 1811 | pgvector (partial) |
| [Vald](https://github.com/vdaas/vald) | Go | Apache-2.0 | [v1.8.0](https://github.com/vdaas/vald/releases/tag/v1.8.0) signed | 1733 | Pinecone (partial) |

</details>

<details>
<summary><b>Analytical databases</b>, 13 tools</summary>

Columnar SQL engines for analytics over large datasets.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [ClickHouse](https://github.com/ClickHouse/ClickHouse) | C++ | Apache-2.0 | [v26.8.19.9-lts](https://github.com/ClickHouse/ClickHouse/releases/tag/v26.8.19.9-lts) | 50274 | Snowflake (full), BigQuery (full) |
| [DuckDB](https://github.com/duckdb/duckdb) | C++ | MIT | [v1.5.6](https://github.com/duckdb/duckdb/releases/tag/v1.5.6) signed | 41943 | Snowflake (partial), BigQuery (partial) |
| [Presto](https://github.com/prestodb/presto) | Java | Apache-2.0 | [0.299](https://github.com/prestodb/presto/releases/tag/0.299) | 16753 | Amazon Athena (full) |
| [Apache Doris](https://github.com/apache/doris) | Java | Apache-2.0 | [4.1.4.1](https://github.com/apache/doris/releases/tag/4.1.4.1) | 16024 | Snowflake (full) |
| [Apache Druid](https://github.com/apache/druid) | Java | Apache-2.0 | [druid-38.0.0](https://github.com/apache/druid/releases/tag/druid-38.0.0) | 14059 | none |
| [Trino](https://github.com/trinodb/trino) | Java | Apache-2.0 | [483](https://github.com/trinodb/trino/releases/tag/483) | 13305 | Amazon Athena (full), BigQuery (partial) |
| [StarRocks](https://github.com/StarRocks/starrocks) | Java | Apache-2.0 | [4.1.3](https://github.com/StarRocks/starrocks/releases/tag/4.1.3) | 12158 | Snowflake (full) |
| [Databend](https://github.com/databendlabs/databend) | Rust | Other | [v1.2.881](https://github.com/databendlabs/databend/releases/tag/v1.2.881) signed | 9455 | Snowflake (full) |
| [Apache Pinot](https://github.com/apache/pinot) | Java | Apache-2.0 | [release-1.5.1](https://github.com/apache/pinot/releases/tag/release-1.5.1) | 6150 | Apache Druid (full) |
| [Apache Kylin](https://github.com/apache/kylin) | Java | Apache-2.0 | [kylin-5.0.2](https://github.com/apache/kylin/releases/tag/kylin-5.0.2) | 3775 | none |
| [pg_duckdb](https://github.com/duckdb/pg_duckdb) | C++ | MIT | [v1.1.1](https://github.com/duckdb/pg_duckdb/releases/tag/v1.1.1) | 3260 | none |
| [chDB](https://github.com/chdb-io/chdb) | Python | Apache-2.0 | [v4.4.0](https://github.com/chdb-io/chdb/releases/tag/v4.4.0) signed | 2914 | DuckDB (partial) |
| [Apache Cloudberry](https://github.com/apache/cloudberry) | C | Apache-2.0 | [2.1.0-incubating](https://github.com/apache/cloudberry/releases/tag/2.1.0-incubating) | 1422 | Amazon Redshift (partial) |

</details>

<details>
<summary><b>Home automation</b>, 14 tools</summary>

Control and automate smart home devices locally.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Home Assistant](https://github.com/home-assistant/core) | Python | Apache-2.0 | [2026.9.4](https://github.com/home-assistant/core/releases/tag/2026.9.4) signed | 91282 | SmartThings (full) |
| [Homebridge](https://github.com/homebridge/homebridge) | TypeScript | Apache-2.0 | [v2.4.0](https://github.com/homebridge/homebridge/releases/tag/v2.4.0) | 25502 | none |
| [Tasmota](https://github.com/arendst/Tasmota) | C | GPL-3.0 | [v15.6.0](https://github.com/arendst/Tasmota/releases/tag/v15.6.0) | 24800 | none |
| [WLED](https://github.com/wled/WLED) | C++ | EUPL-1.2 | [v16.0.1](https://github.com/wled/WLED/releases/tag/v16.0.1) | 18754 | none |
| [Zigbee2MQTT](https://github.com/Koenkk/zigbee2mqtt) | TypeScript | GPL-3.0 | [2.14.2](https://github.com/Koenkk/zigbee2mqtt/releases/tag/2.14.2) signed | 15694 | SmartThings (partial) |
| [ESPHome](https://github.com/esphome/esphome) | C++ | Other | [2026.9.1](https://github.com/esphome/esphome/releases/tag/2026.9.1) signed | 11783 | none |
| [evcc](https://github.com/evcc-io/evcc) | Go | MIT | [0.316.2](https://github.com/evcc-io/evcc/releases/tag/0.316.2) signed | 7331 | none |
| [OpenMQTTGateway](https://github.com/1technophile/OpenMQTTGateway) | C++ | GPL-3.0 | [v1.8.1](https://github.com/1technophile/OpenMQTTGateway/releases/tag/v1.8.1) | 4100 | none |
| [Domoticz](https://github.com/domoticz/domoticz) | C++ | GPL-3.0 | [2026.4](https://github.com/domoticz/domoticz/releases/tag/2026.4) signed | 3816 | SmartThings (partial), Homey (partial) |
| [Gladys Assistant](https://github.com/GladysAssistant/Gladys) | JavaScript | Apache-2.0 | [v5.1.4](https://github.com/GladysAssistant/Gladys/releases/tag/v5.1.4) | 3223 | SmartThings (full), Homey (partial) |
| [Z-Wave JS UI](https://github.com/zwave-js/zwave-js-ui) | Vue | MIT | [v11.24.2](https://github.com/zwave-js/zwave-js-ui/releases/tag/v11.24.2) | 1243 | none |
| [openHAB](https://github.com/openhab/openhab-core) | Java | EPL-2.0 | [5.2.1](https://github.com/openhab/openhab-core/releases/tag/5.2.1) | 1146 | SmartThings (full), Home Assistant (full) |
| [Jeedom](https://github.com/jeedom/core) | PHP | GPL-2.0 | [4.6.1](https://github.com/jeedom/core/releases/tag/4.6.1) | 414 | SmartThings (partial) |
| [ioBroker](https://github.com/ioBroker/ioBroker.js-controller) | TypeScript | MIT | [v7.2.5](https://github.com/ioBroker/ioBroker.js-controller/releases/tag/v7.2.5) signed | 291 | SmartThings (partial) |

</details>

<details>
<summary><b>Terminal file managers</b>, 11 tools</summary>

Browse, preview and move files from a keyboard-driven interface in the terminal.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [yazi](https://github.com/sxyazi/yazi) | Rust | MIT | [v26.9.1](https://github.com/sxyazi/yazi/releases/tag/v26.9.1) signed | 42649 | ranger (full) |
| [superfile](https://github.com/yorukot/superfile) | Go | MIT | [v1.6.0](https://github.com/yorukot/superfile/releases/tag/v1.6.0) signed | 23685 | none |
| [nnn](https://github.com/jarun/nnn) | C | BSD-2-Clause | [v5.3](https://github.com/jarun/nnn/releases/tag/v5.3) signed | 22047 | ranger (full) |
| [ranger](https://github.com/ranger/ranger) | Python | GPL-3.0 | [v1.9.4](https://github.com/ranger/ranger/releases/tag/v1.9.4) signed | 17418 | none |
| [lf](https://github.com/gokcehan/lf) | Go | MIT | [r42](https://github.com/gokcehan/lf/releases/tag/r42) signed | 9534 | ranger (full) |
| [xplr](https://github.com/sayanarijit/xplr) | Rust | MIT | [v1.1.2](https://github.com/sayanarijit/xplr/releases/tag/v1.1.2) | 4838 | none |
| [joshuto](https://github.com/kamiyaa/joshuto) | Rust | LGPL-3.0 | [v0.9.9](https://github.com/kamiyaa/joshuto/releases/tag/v0.9.9) | 3733 | ranger (full) |
| [Vifm](https://github.com/vifm/vifm) | C | GPL-2.0 | [v0.14.4](https://github.com/vifm/vifm/releases/tag/v0.14.4) signed | 3277 | none |
| [Far Manager](https://github.com/FarGroup/FarManager) | C++ | BSD-3-Clause | [ci/v3.0.6741.5010](https://github.com/FarGroup/FarManager/releases/tag/ci/v3.0.6741.5010) signed | 2233 | none |
| [far2l](https://github.com/elfmz/far2l) | C++ | GPL-2.0 | [v_2.9.0](https://github.com/elfmz/far2l/releases/tag/v_2.9.0) | 2220 | Far Manager (full) |
| [Midnight Commander](https://github.com/MidnightCommander/mc) | C | Other | [4.8.33](https://github.com/MidnightCommander/mc/releases/tag/4.8.33) | 1007 | none |

</details>

<details>
<summary><b>File finders</b>, 2 tools</summary>

Find files by name, type, size or date from the terminal, as a faster find.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [fd](https://github.com/sharkdp/fd) | Rust | Apache-2.0 | [v10.5.0](https://github.com/sharkdp/fd/releases/tag/v10.5.0) signed | 44648 | none |
| [bfs](https://github.com/tavianator/bfs) | C | 0BSD | [4.1.4](https://github.com/tavianator/bfs/releases/tag/4.1.4) signed | 1278 | none |

</details>

<details>
<summary><b>gRPC clients</b>, 2 tools</summary>

Call gRPC services from the command line or a browser, using reflection or proto files.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [gRPCurl](https://github.com/fullstorydev/grpcurl) | Go | MIT | [v1.9.4](https://github.com/fullstorydev/grpcurl/releases/tag/v1.9.4) | 12839 | none |
| [gRPC UI](https://github.com/fullstorydev/grpcui) | JavaScript | MIT | [v1.5.4](https://github.com/fullstorydev/grpcui/releases/tag/v1.5.4) | 5927 | Postman (partial) |

</details>

<details>
<summary><b>Mock servers</b>, 6 tools</summary>

Stand in for HTTP APIs during development and tests with recorded or declared responses.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Mockoon](https://github.com/mockoon/mockoon) | TypeScript | MIT | [v9.9.0](https://github.com/mockoon/mockoon/releases/tag/v9.9.0) | 8436 | Postman (partial) |
| [WireMock](https://github.com/wiremock/wiremock) | Java | Apache-2.0 | [3.13.2](https://github.com/wiremock/wiremock/releases/tag/3.13.2) | 7388 | none |
| [Prism](https://github.com/stoplightio/prism) | TypeScript | Apache-2.0 | [v5.16.0](https://github.com/stoplightio/prism/releases/tag/v5.16.0) | 5049 | none |
| [MockServer](https://github.com/mock-server/mockserver-monorepo) | Java | Apache-2.0 | [mockserver-8.0.0](https://github.com/mock-server/mockserver-monorepo/releases/tag/mockserver-8.0.0) | 4984 | none |
| [mountebank](https://github.com/mountebank-testing/mountebank) | JavaScript | MIT | [v2.9.4](https://github.com/mountebank-testing/mountebank/releases/tag/v2.9.4) | 2106 | none |
| [Smocker](https://github.com/smocker-dev/smocker) | TypeScript | MIT | [1.0.0](https://github.com/smocker-dev/smocker/releases/tag/1.0.0) | 1286 | none |

</details>

<details>
<summary><b>API documentation</b>, 5 tools</summary>

Render interactive API reference pages from OpenAPI and AsyncAPI documents.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Swagger UI](https://github.com/swagger-api/swagger-ui) | JavaScript | Apache-2.0 | [v5.33.1](https://github.com/swagger-api/swagger-ui/releases/tag/v5.33.1) | 29031 | none |
| [Redoc](https://github.com/Redocly/redoc) | TypeScript | MIT | [v2.5.3](https://github.com/Redocly/redoc/releases/tag/v2.5.3) signed | 25942 | ReadMe (partial) |
| [Scalar](https://github.com/scalar/scalar) | TypeScript | MIT | [release-2026-10-05-df37703](https://github.com/scalar/scalar/releases/tag/release-2026-10-05-df37703) signed | 16235 | ReadMe (partial), Postman (partial) |
| [Stoplight Elements](https://github.com/stoplightio/elements) | TypeScript | Apache-2.0 | [v6.1.10](https://github.com/stoplightio/elements/releases/tag/v6.1.10) | 2467 | none |
| [RapiDoc](https://github.com/rapi-doc/RapiDoc) | JavaScript | MIT | [v10.1.0](https://github.com/rapi-doc/RapiDoc/releases/tag/v10.1.0) | 1901 | none |

</details>

<details>
<summary><b>Code documentation generators</b>, 5 tools</summary>

Build reference documentation from source code and its doc comments.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [JSDoc](https://github.com/jsdoc/jsdoc) | JavaScript | Apache-2.0 | [4.0.4](https://github.com/jsdoc/jsdoc/releases/tag/4.0.4) | 15470 | none |
| [TypeDoc](https://github.com/TypeStrong/typedoc) | TypeScript | Apache-2.0 | [v0.28.20](https://github.com/TypeStrong/typedoc/releases/tag/v0.28.20) | 8451 | none |
| [Doxygen](https://github.com/doxygen/doxygen) | C++ | GPL-2.0 | [Release_1_18_0](https://github.com/doxygen/doxygen/releases/tag/Release_1_18_0) | 6588 | none |
| [Dokka](https://github.com/Kotlin/dokka) | Kotlin | Apache-2.0 | [v2.2.0](https://github.com/Kotlin/dokka/releases/tag/v2.2.0) | 3811 | none |
| [pdoc](https://github.com/mitmproxy/pdoc) | Python | MIT-0 | [v16.0.0](https://github.com/mitmproxy/pdoc/releases/tag/v16.0.0) | 2514 | none |

</details>

<details>
<summary><b>Git extensions</b>, 2 tools</summary>

Extra git subcommands for history rewriting and everyday repository chores.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [git-extras](https://github.com/tj/git-extras) | Shell | MIT | [7.5.0](https://github.com/tj/git-extras/releases/tag/7.5.0) signed | 18119 | none |
| [git filter-repo](https://github.com/newren/git-filter-repo) | Python | Other | [v2.47.0](https://github.com/newren/git-filter-repo/releases/tag/v2.47.0) | 13361 | none |

</details>

<details>
<summary><b>Repository statistics</b>, 3 tools</summary>

Summarise a git repository's contributors, activity, languages and size.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [onefetch](https://github.com/o2sh/onefetch) | Rust | MIT | [2.28.1](https://github.com/o2sh/onefetch/releases/tag/2.28.1) signed | 12056 | none |
| [git-quick-stats](https://github.com/git-quick-stats/git-quick-stats) | Shell | MIT | [2.11.0](https://github.com/git-quick-stats/git-quick-stats/releases/tag/2.11.0) signed | 7006 | none |
| [git-sizer](https://github.com/github/git-sizer) | Go | MIT | [v1.5.0](https://github.com/github/git-sizer/releases/tag/v1.5.0) signed | 4081 | none |

</details>

<details>
<summary><b>Stacked pull requests</b>, 5 tools</summary>

Split a change into a stack of dependent branches or commits and keep their pull requests in sync.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [git-branchless](https://github.com/arxanas/git-branchless) | Rust | Apache-2.0 | [v0.11.1](https://github.com/arxanas/git-branchless/releases/tag/v0.11.1) | 4132 | Graphite (partial) |
| [Git Town](https://github.com/git-town/git-town) | Gherkin | MIT | [v24.1.0](https://github.com/git-town/git-town/releases/tag/v24.1.0) signed | 3380 | Graphite (partial) |
| [spr](https://github.com/ejoffe/spr) | Go | MIT | [v0.17.6](https://github.com/ejoffe/spr/releases/tag/v0.17.6) | 1291 | Graphite (partial) |
| [ghstack](https://github.com/ezyang/ghstack) | Python | MIT | [v0.14.0](https://github.com/ezyang/ghstack/releases/tag/v0.14.0) signed | 1015 | Graphite (partial) |
| [av](https://github.com/aviator-co/av) | Go | MIT | [v0.1.45](https://github.com/aviator-co/av/releases/tag/v0.1.45) signed | 508 | Graphite (partial) |

</details>

<details>
<summary><b>Shell linting and formatting</b>, 2 tools</summary>

Linters and formatters for shell scripts.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [ShellCheck](https://github.com/koalaman/shellcheck) | Haskell | GPL-3.0 | [v0.11.0](https://github.com/koalaman/shellcheck/releases/tag/v0.11.0) | 40141 | none |
| [shfmt](https://github.com/mvdan/sh) | Go | BSD-3-Clause | [v3.14.1](https://github.com/mvdan/sh/releases/tag/v3.14.1) signed | 9115 | none |

</details>

<details>
<summary><b>Markdown linting</b>, 3 tools</summary>

Check Markdown files against style and syntax rules.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [markdownlint](https://github.com/DavidAnson/markdownlint) | JavaScript | MIT | [v0.41.1](https://github.com/DavidAnson/markdownlint/releases/tag/v0.41.1) | 6370 | none |
| [markdownlint-cli](https://github.com/igorshubovych/markdownlint-cli) | JavaScript | MIT | [v0.49.1](https://github.com/igorshubovych/markdownlint-cli/releases/tag/v0.49.1) | 1098 | none |
| [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2) | JavaScript | MIT | [v0.23.3](https://github.com/DavidAnson/markdownlint-cli2/releases/tag/v0.23.3) | 939 | none |

</details>

<details>
<summary><b>Go linting</b>, 3 tools</summary>

Linters and static checkers for Go.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [golangci-lint](https://github.com/golangci/golangci-lint) | Go | GPL-3.0 | [v2.14.0](https://github.com/golangci/golangci-lint/releases/tag/v2.14.0) signed | 19417 | none |
| [Staticcheck](https://github.com/dominikh/go-tools) | Go | MIT | [2026.2.1](https://github.com/dominikh/go-tools/releases/tag/2026.2.1) signed | 6903 | none |
| [revive](https://github.com/revive-lint/revive) | Go | MIT | [v1.17.0](https://github.com/revive-lint/revive/releases/tag/v1.17.0) signed | 5555 | none |

</details>

<details>
<summary><b>PHP linting and formatting</b>, 4 tools</summary>

Static analysers, linters and formatters for PHP.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [PHPStan](https://github.com/phpstan/phpstan) | PHP | MIT | [2.3.0](https://github.com/phpstan/phpstan/releases/tag/2.3.0) | 14122 | none |
| [PHP CS Fixer](https://github.com/PHP-CS-Fixer/PHP-CS-Fixer) | PHP | MIT | [v3.95.27](https://github.com/PHP-CS-Fixer/PHP-CS-Fixer/releases/tag/v3.95.27) signed | 13560 | none |
| [Psalm](https://github.com/vimeo/psalm) | PHP | MIT | [6.19.1](https://github.com/vimeo/psalm/releases/tag/6.19.1) signed | 5896 | none |
| [PHP_CodeSniffer](https://github.com/PHPCSStandards/PHP_CodeSniffer) | PHP | BSD-3-Clause | [4.0.4](https://github.com/PHPCSStandards/PHP_CodeSniffer/releases/tag/4.0.4) signed | 1560 | none |

</details>

<details>
<summary><b>Java and Kotlin linting and formatting</b>, 6 tools</summary>

Linters, bug finders and formatters for Java, Kotlin and other JVM languages.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Checkstyle](https://github.com/checkstyle/checkstyle) | Java | LGPL-2.1 | [checkstyle-14.3.0](https://github.com/checkstyle/checkstyle/releases/tag/checkstyle-14.3.0) | 9590 | none |
| [detekt](https://github.com/detekt/detekt) | Kotlin | Apache-2.0 | [v1.23.8](https://github.com/detekt/detekt/releases/tag/v1.23.8) signed | 7084 | none |
| [ktlint](https://github.com/ktlint/ktlint) | Kotlin | MIT | [1.8.0](https://github.com/ktlint/ktlint/releases/tag/1.8.0) signed | 6751 | none |
| [google-java-format](https://github.com/google/google-java-format) | Java | Other | [v1.37.0](https://github.com/google/google-java-format/releases/tag/v1.37.0) | 6202 | none |
| [PMD](https://github.com/pmd/pmd) | Java | Other | [pmd_releases/7.28.0](https://github.com/pmd/pmd/releases/tag/pmd_releases/7.28.0) signed | 5496 | none |
| [SpotBugs](https://github.com/spotbugs/spotbugs) | Java | LGPL-2.1 | [4.10.4](https://github.com/spotbugs/spotbugs/releases/tag/4.10.4) signed | 3949 | none |

</details>

<details>
<summary><b>Swift linting and formatting</b>, 2 tools</summary>

Linters and formatters for Swift.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [SwiftLint](https://github.com/realm/SwiftLint) | Swift | MIT | [0.65.1](https://github.com/realm/SwiftLint/releases/tag/0.65.1) | 19749 | none |
| [SwiftFormat](https://github.com/nicklockwood/SwiftFormat) | Swift | MIT | [0.63.1](https://github.com/nicklockwood/SwiftFormat/releases/tag/0.63.1) | 8928 | none |

</details>

<details>
<summary><b>Ruby linting and formatting</b>, 2 tools</summary>

Linters and formatters for Ruby.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [RuboCop](https://github.com/rubocop/rubocop) | Ruby | MIT | [v1.91.0](https://github.com/rubocop/rubocop/releases/tag/v1.91.0) | 12910 | none |
| [Standard Ruby](https://github.com/standardrb/standard) | Ruby | Other | [v1.31.0](https://github.com/standardrb/standard/releases/tag/v1.31.0) | 2925 | RuboCop (partial) |

</details>

<details>
<summary><b>Configuration file linting</b>, 3 tools</summary>

Check YAML files, Dockerfiles and CI workflow definitions for mistakes.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Hadolint](https://github.com/hadolint/hadolint) | Haskell | GPL-3.0 | [v2.15.1](https://github.com/hadolint/hadolint/releases/tag/v2.15.1) signed | 12460 | none |
| [actionlint](https://github.com/rhysd/actionlint) | Go | MIT | [v1.7.12](https://github.com/rhysd/actionlint/releases/tag/v1.7.12) | 4298 | none |
| [yamllint](https://github.com/adrienverge/yamllint) | Python | GPL-3.0 | [v1.38.0](https://github.com/adrienverge/yamllint/releases/tag/v1.38.0) | 3473 | none |

</details>

<details>
<summary><b>SQL linting and formatting</b>, 3 tools</summary>

Linters and formatters for SQL queries and dialects.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [SQLFluff](https://github.com/sqlfluff/sqlfluff) | Python | MIT | [4.4.0](https://github.com/sqlfluff/sqlfluff/releases/tag/4.4.0) signed | 9937 | none |
| [SQL Formatter](https://github.com/sql-formatter-org/sql-formatter) | TypeScript | MIT | [v15.9.0](https://github.com/sql-formatter-org/sql-formatter/releases/tag/v15.9.0) | 2897 | none |
| [sqlfmt](https://github.com/tconbeer/sqlfmt) | Python | Other | [v0.32.0](https://github.com/tconbeer/sqlfmt/releases/tag/v0.32.0) signed | 549 | none |

</details>

<details>
<summary><b>Code spell checkers</b>, 3 tools</summary>

Find misspelled words in source code, identifiers and documentation.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [typos](https://github.com/crate-ci/typos) | Rust | Apache-2.0 | [v1.51.0](https://github.com/crate-ci/typos/releases/tag/v1.51.0) | 4176 | none |
| [codespell](https://github.com/codespell-project/codespell) | Python | GPL-2.0 | [v2.4.3](https://github.com/codespell-project/codespell/releases/tag/v2.4.3) signed | 2432 | none |
| [CSpell](https://github.com/streetsidesoftware/cspell) | TypeScript | MIT | [v10.3.6](https://github.com/streetsidesoftware/cspell/releases/tag/v10.3.6) | 1697 | none |

</details>

<details>
<summary><b>Multi-language formatters</b>, 2 tools</summary>

Run or provide formatting for many languages from one command and one configuration.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [treefmt](https://github.com/numtide/treefmt) | Go | MIT | [v2.6.0](https://github.com/numtide/treefmt/releases/tag/v2.6.0) signed | 1077 | none |
| [Topiary](https://github.com/topiary/topiary) | Rust | MIT | [v0.8.0](https://github.com/topiary/topiary/releases/tag/v0.8.0) signed | 872 | none |

</details>

<details>
<summary><b>Lua linting and formatting</b>, 2 tools</summary>

Linters and formatters for Lua.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [StyLua](https://github.com/JohnnyMorganz/StyLua) | Rust | MPL-2.0 | [v2.5.2](https://github.com/JohnnyMorganz/StyLua/releases/tag/v2.5.2) | 2310 | none |
| [selene](https://github.com/Kampfkarren/selene) | Rust | MPL-2.0 | [0.32.0](https://github.com/Kampfkarren/selene/releases/tag/0.32.0) | 829 | none |

</details>

<details>
<summary><b>Build systems</b>, 9 tools</summary>

Compile, test and package projects from a declared build, for C, C++, the JVM and other languages.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Gradle](https://github.com/gradle/gradle) | Groovy | Apache-2.0 | [v9.8.0](https://github.com/gradle/gradle/releases/tag/v9.8.0) signed | 18877 | none |
| [Ninja](https://github.com/ninja-build/ninja) | C++ | Apache-2.0 | [v1.13.2](https://github.com/ninja-build/ninja/releases/tag/v1.13.2) | 13289 | none |
| [Xmake](https://github.com/xmake-io/xmake) | Lua | Apache-2.0 | [v3.1.1](https://github.com/xmake-io/xmake/releases/tag/v3.1.1) | 12247 | none |
| [Meson](https://github.com/mesonbuild/meson) | Python | Apache-2.0 | [1.12.1](https://github.com/mesonbuild/meson/releases/tag/1.12.1) | 6641 | none |
| [Apache Maven](https://github.com/apache/maven) | Java | Apache-2.0 | [maven-3.10.0](https://github.com/apache/maven/releases/tag/maven-3.10.0) | 5369 | none |
| [sbt](https://github.com/sbt/sbt) | Scala | Apache-2.0 | [v2.0.10](https://github.com/sbt/sbt/releases/tag/v2.0.10) signed | 4954 | none |
| [Premake](https://github.com/premake/premake-core) | C | BSD-3-Clause | [v5.0.0](https://github.com/premake/premake-core/releases/tag/v5.0.0) signed | 3647 | none |
| [Mill](https://github.com/com-lihaoyi/mill) | Scala | MIT | [1.1.10](https://github.com/com-lihaoyi/mill/releases/tag/1.1.10) signed | 2794 | none |
| [SCons](https://github.com/SCons/scons) | Python | MIT | [4.11.1](https://github.com/SCons/scons/releases/tag/4.11.1) | 2428 | none |

</details>

<details>
<summary><b>Compiler caches</b>, 2 tools</summary>

Cache compiler output so unchanged sources are not rebuilt, locally or on shared storage.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [sccache](https://github.com/mozilla/sccache) | Rust | Apache-2.0 | [v0.18.0](https://github.com/mozilla/sccache/releases/tag/v0.18.0) | 7759 | ccache (full) |
| [ccache](https://github.com/ccache/ccache) | C++ | Other | [v4.14.1](https://github.com/ccache/ccache/releases/tag/v4.14.1) signed | 2967 | none |

</details>

<details>
<summary><b>System package managers</b>, 6 tools</summary>

Install command-line tools and applications on macOS, Windows or Linux from package definitions.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Homebrew](https://github.com/Homebrew/brew) | Ruby | BSD-2-Clause | [7.0.8](https://github.com/Homebrew/brew/releases/tag/7.0.8) signed | 49915 | none |
| [WinGet](https://github.com/microsoft/winget-cli) | C++ | MIT | [v1.29.380](https://github.com/microsoft/winget-cli/releases/tag/v1.29.380) signed | 26483 | none |
| [Scoop](https://github.com/ScoopInstaller/Scoop) | PowerShell | Other | [v0.6.0](https://github.com/ScoopInstaller/Scoop/releases/tag/v0.6.0) signed | 24723 | none |
| [Nix](https://github.com/NixOS/nix) | C++ | LGPL-2.1 | [2.35.2](https://github.com/NixOS/nix/releases/tag/2.35.2) signed | 17833 | none |
| [Chocolatey](https://github.com/chocolatey/choco) | C# | Other | [2.7.4](https://github.com/chocolatey/choco/releases/tag/2.7.4) signed | 11537 | none |
| [pkgx](https://github.com/pkgxdev/pkgx) | Rust | Apache-2.0 | [v2.11.0](https://github.com/pkgxdev/pkgx/releases/tag/v2.11.0) signed | 9920 | none |

</details>

<details>
<summary><b>C and C++ package managers</b>, 2 tools</summary>

Fetch, build and version C and C++ libraries for a project.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [vcpkg](https://github.com/microsoft/vcpkg) | CMake | MIT | [2026.07.29](https://github.com/microsoft/vcpkg/releases/tag/2026.07.29) signed | 27521 | none |
| [Conan](https://github.com/conan-io/conan) | Python | MIT | [2.33.0](https://github.com/conan-io/conan/releases/tag/2.33.0) signed | 9528 | none |

</details>

<details>
<summary><b>Development environments</b>, 5 tools</summary>

Declare a project's tools and services in a file and get the same shell on every machine.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [direnv](https://github.com/direnv/direnv) | Go | MIT | [v2.37.1](https://github.com/direnv/direnv/releases/tag/v2.37.1) signed | 15492 | none |
| [Devbox](https://github.com/jetify-com/devbox) | Go | Apache-2.0 | [0.18.4](https://github.com/jetify-com/devbox/releases/tag/0.18.4) | 12396 | none |
| [devenv](https://github.com/cachix/devenv) | Rust | Apache-2.0 | [v2.4.0](https://github.com/cachix/devenv/releases/tag/v2.4.0) | 7711 | none |
| [Flox](https://github.com/flox/flox) | Rust | GPL-2.0 | [v1.17.0](https://github.com/flox/flox/releases/tag/v1.17.0) signed | 4155 | none |
| [Dev Container CLI](https://github.com/devcontainers/cli) | TypeScript | MIT | [v0.89.0](https://github.com/devcontainers/cli/releases/tag/v0.89.0) signed | 2977 | GitHub Codespaces (partial) |

</details>

<details>
<summary><b>Debuggers</b>, 5 tools</summary>

Step through running programs, inspect their state and replay their execution.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Delve](https://github.com/go-delve/delve) | Go | MIT | [v1.27.2](https://github.com/go-delve/delve/releases/tag/v1.27.2) signed | 24940 | none |
| [GDB dashboard](https://github.com/cyrus-and/gdb-dashboard) | Python | MIT | [v0.17.5](https://github.com/cyrus-and/gdb-dashboard/releases/tag/v0.17.5) | 12265 | none |
| [rr](https://github.com/rr-debugger/rr) | C++ | Other | [5.9.0](https://github.com/rr-debugger/rr/releases/tag/5.9.0) | 10695 | none |
| [Seer](https://github.com/epasveer/seer) | C++ | GPL-3.0 | [v2.7.1](https://github.com/epasveer/seer/releases/tag/v2.7.1) | 3445 | none |
| [PuDB](https://github.com/inducer/pudb) | Python | Other | [v2025.1.5](https://github.com/inducer/pudb/releases/tag/v2025.1.5) signed | 3247 | none |

</details>

<details>
<summary><b>Profilers</b>, 10 tools</summary>

Measure where a program spends its time and memory, and draw it as flame graphs or timelines.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Tracy](https://github.com/wolfpld/tracy) | C++ | Other | [v0.14.1](https://github.com/wolfpld/tracy/releases/tag/v0.14.1) signed | 16875 | none |
| [py-spy](https://github.com/benfred/py-spy) | Rust | MIT | [v0.4.2](https://github.com/benfred/py-spy/releases/tag/v0.4.2) | 15547 | none |
| [Memray](https://github.com/bloomberg/memray) | Python | Apache-2.0 | [v1.20.0](https://github.com/bloomberg/memray/releases/tag/v1.20.0) signed | 15343 | none |
| [Scalene](https://github.com/plasma-umass/scalene) | Python | Apache-2.0 | [v2.3.0](https://github.com/plasma-umass/scalene/releases/tag/v2.3.0) signed | 13524 | none |
| [pprof](https://github.com/google/pprof) | Go | Apache-2.0 | none | 9294 | none |
| [async-profiler](https://github.com/async-profiler/async-profiler) | C++ | Apache-2.0 | [v4.5](https://github.com/async-profiler/async-profiler/releases/tag/v4.5) | 9162 | none |
| [pyinstrument](https://github.com/joerick/pyinstrument) | Python | BSD-3-Clause | [v5.1.3](https://github.com/joerick/pyinstrument/releases/tag/v5.1.3) | 8014 | none |
| [speedscope](https://github.com/jlfwong/speedscope) | TypeScript | MIT | [v1.25.0](https://github.com/jlfwong/speedscope/releases/tag/v1.25.0) | 6769 | none |
| [cargo-flamegraph](https://github.com/flamegraph-rs/flamegraph) | Rust | Apache-2.0 | [v0.6.14](https://github.com/flamegraph-rs/flamegraph/releases/tag/v0.6.14) signed | 6041 | none |
| [samply](https://github.com/mstange/samply) | Rust | Apache-2.0 | [samply-v0.13.1](https://github.com/mstange/samply/releases/tag/samply-v0.13.1) | 4437 | none |

</details>

<details>
<summary><b>Terminal file viewers</b>, 2 tools</summary>

Show file contents in the terminal with syntax highlighting or rendering.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [bat](https://github.com/sharkdp/bat) | Rust | Apache-2.0 | [v0.26.1](https://github.com/sharkdp/bat/releases/tag/v0.26.1) signed | 60690 | none |
| [Glow](https://github.com/charmbracelet/glow) | Go | MIT | [v3.0.0](https://github.com/charmbracelet/glow/releases/tag/v3.0.0) signed | 27597 | none |

</details>

<details>
<summary><b>Hex editors</b>, 2 tools</summary>

View and edit the raw bytes of binary files.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [ImHex](https://github.com/WerWolv/ImHex) | C++ | GPL-2.0 | [v1.38.1](https://github.com/WerWolv/ImHex/releases/tag/v1.38.1) | 54996 | 010 Editor (partial) |
| [hexyl](https://github.com/sharkdp/hexyl) | Rust | Apache-2.0 | [v0.17.0](https://github.com/sharkdp/hexyl/releases/tag/v0.17.0) | 10288 | none |

</details>

<details>
<summary><b>Command benchmarking</b>, 2 tools</summary>

Time shell commands over repeated runs and compare the results statistically.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [hyperfine](https://github.com/sharkdp/hyperfine) | Rust | Apache-2.0 | [v1.21.0](https://github.com/sharkdp/hyperfine/releases/tag/v1.21.0) signed | 28953 | none |
| [poop](https://github.com/andrewrk/poop) | Zig | MIT | [0.5.0](https://github.com/andrewrk/poop/releases/tag/0.5.0) | 2046 | none |

</details>

<details>
<summary><b>Command cheatsheets</b>, 4 tools</summary>

Short, example-based help pages for command-line tools, read from the terminal.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [tldr-pages](https://github.com/tldr-pages/tldr) | Markdown | Other | [v2.3](https://github.com/tldr-pages/tldr/releases/tag/v2.3) signed | 63831 | none |
| [navi](https://github.com/denisidoro/navi) | Rust | Apache-2.0 | [v2.24.0](https://github.com/denisidoro/navi/releases/tag/v2.24.0) signed | 17731 | none |
| [cheat](https://github.com/cheat/cheat) | Go | MIT | [5.1.0](https://github.com/cheat/cheat/releases/tag/5.1.0) | 13474 | none |
| [tealdeer](https://github.com/tealdeer-rs/tealdeer) | Rust | Apache-2.0 | [v1.9.0](https://github.com/tealdeer-rs/tealdeer/releases/tag/v1.9.0) signed | 6578 | none |

</details>

<details>
<summary><b>Find and replace</b>, 3 tools</summary>

Search and replace text across files from the terminal, with previews or structural matching.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Comby](https://github.com/comby-tools/comby) | OCaml | Apache-2.0 | [1.8.1](https://github.com/comby-tools/comby/releases/tag/1.8.1) | 2680 | none |
| [sad](https://github.com/ms-jpq/sad) | Rust | MIT | [v0.4.32](https://github.com/ms-jpq/sad/releases/tag/v0.4.32) | 2046 | none |
| [amber](https://github.com/dalance/amber) | Rust | MIT | [v0.6.1](https://github.com/dalance/amber/releases/tag/v0.6.1) signed | 952 | none |

</details>

<details>
<summary><b>Terminal log viewers</b>, 3 tools</summary>

Read, highlight and filter log files in the terminal.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [lnav](https://github.com/tstack/lnav) | C++ | BSD-2-Clause | [v0.14.1](https://github.com/tstack/lnav/releases/tag/v0.14.1) | 10722 | none |
| [tailspin](https://github.com/bensadeh/tailspin) | Rust | MIT | [7.0.0](https://github.com/bensadeh/tailspin/releases/tag/7.0.0) | 7982 | none |
| [hl](https://github.com/pamburus/hl) | Rust | MIT | [v0.36.3](https://github.com/pamburus/hl/releases/tag/v0.36.3) | 3302 | none |

</details>

<details>
<summary><b>Terminal recording</b>, 2 tools</summary>

Record terminal sessions and replay them or render them as GIFs and videos.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [VHS](https://github.com/charmbracelet/vhs) | Go | MIT | [v0.12.1](https://github.com/charmbracelet/vhs/releases/tag/v0.12.1) signed | 21067 | none |
| [asciinema](https://github.com/asciinema/asciinema) | Rust | GPL-3.0 | [v3.2.1](https://github.com/asciinema/asciinema/releases/tag/v3.2.1) | 17857 | none |

</details>

<details>
<summary><b>Commit message tooling</b>, 2 tools</summary>

Check commit messages against a convention, or prompt for them in that format.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [commitlint](https://github.com/conventional-changelog/commitlint) | TypeScript | MIT | [v21.2.3](https://github.com/conventional-changelog/commitlint/releases/tag/v21.2.3) | 18758 | none |
| [cz-git](https://github.com/Zhengqbbb/cz-git) | TypeScript | MIT | [v1.14.0](https://github.com/Zhengqbbb/cz-git/releases/tag/v1.14.0) | 1529 | none |

</details>

<details>
<summary><b>Dependency update bots</b>, 3 tools</summary>

Open pull requests that bump dependencies when new versions are released.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Renovate](https://github.com/renovatebot/renovate) | TypeScript | AGPL-3.0 | [44.140.0](https://github.com/renovatebot/renovate/releases/tag/44.140.0) signed | 22690 | Dependabot (full) |
| [Dependabot](https://github.com/dependabot/dependabot-core) | Ruby | MIT | [v0.399.0](https://github.com/dependabot/dependabot-core/releases/tag/v0.399.0) signed | 5799 | none |
| [Updatecli](https://github.com/updatecli/updatecli) | Go | Apache-2.0 | [v0.122.1](https://github.com/updatecli/updatecli/releases/tag/v0.122.1) signed | 995 | none |

</details>

<details>
<summary><b>Disk usage analyzers</b>, 3 tools</summary>

Show which directories and files take up the space on a disk.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [dust](https://github.com/bootandy/dust) | Rust | Apache-2.0 | [v1.2.6](https://github.com/bootandy/dust/releases/tag/v1.2.6) | 12478 | none |
| [dua](https://github.com/Byron/dua-cli) | Rust | MIT | [v2.45.1](https://github.com/Byron/dua-cli/releases/tag/v2.45.1) | 6329 | none |
| [gdu](https://github.com/dundee/gdu) | Go | MIT | [v5.38.0](https://github.com/dundee/gdu/releases/tag/v5.38.0) signed | 6074 | none |

</details>

<details>
<summary><b>Shell history</b>, 2 tools</summary>

Search, sync and recall the commands typed in a shell.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [atuin](https://github.com/atuinsh/atuin) | Rust | MIT | [v18.23.0](https://github.com/atuinsh/atuin/releases/tag/v18.23.0) signed | 31912 | mcfly (full) |
| [mcfly](https://github.com/cantino/mcfly) | Rust | MIT | [v0.9.4](https://github.com/cantino/mcfly/releases/tag/v0.9.4) | 7806 | none |

</details>

<details>
<summary><b>Task runners</b>, 7 tools</summary>

Name a project's commands in one file and run them, as a lighter make.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [just](https://github.com/casey/just) | Rust | CC0-1.0 | [1.58.0](https://github.com/casey/just/releases/tag/1.58.0) | 36153 | none |
| [Task](https://github.com/go-task/task) | Go | MIT | [v3.54.0](https://github.com/go-task/task/releases/tag/v3.54.0) | 16223 | none |
| [Invoke](https://github.com/pyinvoke/invoke) | Python | BSD-2-Clause | [3.0.3](https://github.com/pyinvoke/invoke/releases/tag/3.0.3) | 4779 | none |
| [Mage](https://github.com/magefile/mage) | Go | Apache-2.0 | [v1.17.2](https://github.com/magefile/mage/releases/tag/v1.17.2) | 4696 | none |
| [tox](https://github.com/tox-dev/tox) | Python | MIT | [4.64.9](https://github.com/tox-dev/tox/releases/tag/4.64.9) | 3943 | none |
| [Runme](https://github.com/runmedev/runme) | Go | Apache-2.0 | [v3.17.6](https://github.com/runmedev/runme/releases/tag/v3.17.6) | 2188 | none |
| [Nox](https://github.com/wntrblm/nox) | Python | Apache-2.0 | [2026.08.17](https://github.com/wntrblm/nox/releases/tag/2026.08.17) signed | 1563 | tox (partial) |

</details>

<details>
<summary><b>Git hook managers</b>, 6 tools</summary>

Install and run the checks a repository wants before a commit or a push.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [husky](https://github.com/typicode/husky) | JavaScript | MIT | [v9.1.7](https://github.com/typicode/husky/releases/tag/v9.1.7) | 35340 | none |
| [pre-commit](https://github.com/pre-commit/pre-commit) | Python | MIT | [v4.6.2](https://github.com/pre-commit/pre-commit/releases/tag/v4.6.2) | 15611 | none |
| [lefthook](https://github.com/evilmartians/lefthook) | Go | MIT | [v2.1.17](https://github.com/evilmartians/lefthook/releases/tag/v2.1.17) signed | 8883 | husky (full), pre-commit (full) |
| [prek](https://github.com/j178/prek) | Rust | MIT | [v0.5.5](https://github.com/j178/prek/releases/tag/v0.5.5) signed | 8573 | pre-commit (drop-in) |
| [Overcommit](https://github.com/sds/overcommit) | Ruby | MIT | [v0.73.0](https://github.com/sds/overcommit/releases/tag/v0.73.0) signed | 4005 | none |
| [simple-git-hooks](https://github.com/toplenboren/simple-git-hooks) | JavaScript | MIT | [2.14.0](https://github.com/toplenboren/simple-git-hooks/releases/tag/2.14.0) | 1683 | husky (partial) |

</details>

<details>
<summary><b>Runtime version managers</b>, 12 tools</summary>

Install several versions of a language runtime and switch between them per project.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [nvm](https://github.com/nvm-sh/nvm) | Shell | MIT | [v0.40.8](https://github.com/nvm-sh/nvm/releases/tag/v0.40.8) signed | 95276 | none |
| [NVM for Windows](https://github.com/nvm-windows/nvm) | Inno Setup | MIT | [v2.0.1](https://github.com/nvm-windows/nvm/releases/tag/v2.0.1) signed | 47867 | nvm (partial) |
| [mise](https://github.com/jdx/mise) | Rust | MIT | [v2026.10.3](https://github.com/jdx/mise/releases/tag/v2026.10.3) signed | 34654 | asdf (full), nvm (full), Volta (full), pyenv (full) |
| [fnm](https://github.com/Schniz/fnm) | Rust | GPL-3.0 | [v1.39.0](https://github.com/Schniz/fnm/releases/tag/v1.39.0) signed | 27041 | nvm (full) |
| [asdf](https://github.com/asdf-vm/asdf) | Go | MIT | [v0.20.2](https://github.com/asdf-vm/asdf/releases/tag/v0.20.2) signed | 25595 | none |
| [n](https://github.com/tj/n) | Shell | MIT | [v10.2.0](https://github.com/tj/n/releases/tag/v10.2.0) | 19516 | nvm (full) |
| [rbenv](https://github.com/rbenv/rbenv) | Shell | MIT | [v1.3.2](https://github.com/rbenv/rbenv/releases/tag/v1.3.2) signed | 16735 | none |
| [Volta](https://github.com/volta-cli/volta) | Rust | Other | [v2.0.2](https://github.com/volta-cli/volta/releases/tag/v2.0.2) signed | 13068 | nvm (full) |
| [rustup](https://github.com/rust-lang/rustup) | Rust | Apache-2.0 | [1.29.1](https://github.com/rust-lang/rustup/releases/tag/1.29.1) signed | 7055 | none |
| [SDKMAN!](https://github.com/sdkman/sdkman-cli) | Shell | Apache-2.0 | [5.23.2](https://github.com/sdkman/sdkman-cli/releases/tag/5.23.2) signed | 6864 | none |
| [vfox](https://github.com/version-fox/vfox) | Go | Apache-2.0 | [v1.0.12](https://github.com/version-fox/vfox/releases/tag/v1.0.12) | 3994 | asdf (partial) |
| [proto](https://github.com/moonrepo/proto) | Rust | MIT | [v0.62.3](https://github.com/moonrepo/proto/releases/tag/v0.62.3) | 1431 | Volta (full), nvm (full) |

</details>

<details>
<summary><b>Backup tools</b>, 14 tools</summary>

Take deduplicated, encrypted snapshots of files and restore them from local or cloud storage.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [restic](https://github.com/restic/restic) | Go | BSD-2-Clause | [v0.19.1](https://github.com/restic/restic/releases/tag/v0.19.1) signed | 36441 | none |
| [Duplicati](https://github.com/duplicati/duplicati) | C# | Other | [v2.4.0.0_stable_2026-09-03](https://github.com/duplicati/duplicati/releases/tag/v2.4.0.0_stable_2026-09-03) | 15064 | none |
| [Kopia](https://github.com/kopia/kopia) | Go | Apache-2.0 | [v0.23.1](https://github.com/kopia/kopia/releases/tag/v0.23.1) | 14269 | none |
| [BorgBackup](https://github.com/borgbackup/borg) | Python | Other | [1.4.5](https://github.com/borgbackup/borg/releases/tag/1.4.5) signed | 13813 | none |
| [Backrest](https://github.com/garethgeorge/backrest) | TypeScript | GPL-3.0 | [v1.14.1](https://github.com/garethgeorge/backrest/releases/tag/v1.14.1) signed | 7469 | Backblaze Personal Backup (partial) |
| [Duplicacy](https://github.com/gilbertchen/duplicacy) | Go | Other | [v3.2.5](https://github.com/gilbertchen/duplicacy/releases/tag/v3.2.5) | 5695 | CrashPlan (partial) |
| [Timeshift](https://github.com/linuxmint/timeshift) | Vala | none | [master.lmde7](https://github.com/linuxmint/timeshift/releases/tag/master.lmde7) | 4296 | none |
| [rustic](https://github.com/rustic-rs/rustic) | Rust | Apache-2.0 | [v0.11.4](https://github.com/rustic-rs/rustic/releases/tag/v0.11.4) | 3311 | restic (partial) |
| [Vorta](https://github.com/borgbase/vorta) | Python | GPL-3.0 | [v0.11.6](https://github.com/borgbase/vorta/releases/tag/v0.11.6) | 2509 | Backblaze Personal Backup (partial) |
| [borgmatic](https://github.com/borgmatic-collective/borgmatic) | Python | GPL-3.0 | [2.1.10](https://github.com/borgmatic-collective/borgmatic/releases/tag/2.1.10) | 2340 | none |
| [Plakar](https://github.com/PlakarKorp/plakar) | Go | ISC | [v1.1.7](https://github.com/PlakarKorp/plakar/releases/tag/v1.1.7) | 2077 | none |
| [BackupPC](https://github.com/backuppc/backuppc) | Perl | GPL-3.0 | [4.4.0](https://github.com/backuppc/backuppc/releases/tag/4.4.0) | 1627 | CrashPlan (partial) |
| [resticprofile](https://github.com/creativeprojects/resticprofile) | Go | GPL-3.0 | [v0.33.1](https://github.com/creativeprojects/resticprofile/releases/tag/v0.33.1) signed | 1433 | none |
| [UrBackup](https://github.com/uroni/urbackup_backend) | C | AGPL-3.0 | [2.5.38](https://github.com/uroni/urbackup_backend/releases/tag/2.5.38) | 936 | CrashPlan (partial) |

</details>

<details>
<summary><b>Code statistics</b>, 3 tools</summary>

Count the lines of code, comments and blanks in a codebase, by language.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [cloc](https://github.com/AlDanial/cloc) | Perl | GPL-2.0 | [v2.10](https://github.com/AlDanial/cloc/releases/tag/v2.10) | 23578 | none |
| [tokei](https://github.com/XAMPPRocky/tokei) | Rust | Other | [v15.0.0](https://github.com/XAMPPRocky/tokei/releases/tag/v15.0.0) | 14984 | cloc (full) |
| [scc](https://github.com/boyter/scc) | Go | MIT | [v4.1.0](https://github.com/boyter/scc/releases/tag/v4.1.0) | 8799 | cloc (full) |

</details>

<details>
<summary><b>File watchers</b>, 5 tools</summary>

Run a command again whenever the files it depends on change.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [nodemon](https://github.com/remy/nodemon) | JavaScript | MIT | [v3.1.14](https://github.com/remy/nodemon/releases/tag/v3.1.14) | 26658 | none |
| [Air](https://github.com/air-verse/air) | Go | GPL-3.0 | [v1.67.4](https://github.com/air-verse/air/releases/tag/v1.67.4) | 24049 | none |
| [Watchman](https://github.com/facebook/watchman) | C++ | MIT | [v2026.10.05.00](https://github.com/facebook/watchman/releases/tag/v2026.10.05.00) | 13737 | none |
| [watchexec](https://github.com/watchexec/watchexec) | Rust | Apache-2.0 | [v2.7.4](https://github.com/watchexec/watchexec/releases/tag/v2.7.4) | 7218 | entr (full) |
| [entr](https://github.com/eradman/entr) | C | Other | [5.9](https://github.com/eradman/entr/releases/tag/5.9) | 5696 | none |

</details>

<details>
<summary><b>Scheduling</b>, 9 tools</summary>

Share availability and let people book a meeting or vote on a date.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Cal.diy](https://github.com/calcom/cal.diy) | TypeScript | MIT | [v6.2.0](https://github.com/calcom/cal.diy/releases/tag/v6.2.0) signed | 48891 | Calendly (partial) |
| [Rallly](https://github.com/lukevella/rallly) | TypeScript | AGPL-3.0 | [v4.15.4](https://github.com/lukevella/rallly/releases/tag/v4.15.4) | 5292 | Doodle (partial) |
| [Easy!Appointments](https://github.com/alextselegidis/easyappointments) | PHP | GPL-3.0 | [1.6.0](https://github.com/alextselegidis/easyappointments/releases/tag/1.6.0) | 4415 | Calendly (partial) |
| [Nextcloud Calendar](https://github.com/nextcloud/calendar) | JavaScript | AGPL-3.0 | [v3.3.2](https://github.com/nextcloud/calendar/releases/tag/v3.3.2) signed | 1188 | Calendly (partial) |
| [LibreBooking](https://github.com/LibreBooking/librebooking) | PHP | GPL-3.0 | [v7.0.0](https://github.com/LibreBooking/librebooking/releases/tag/v7.0.0) | 818 | Calendly (partial) |
| [Crab Fit](https://github.com/GRA0007/crab.fit) | TypeScript | GPL-3.0 | none | 531 | Doodle (partial) |
| [Seatsurfing](https://github.com/seatsurfing/seatsurfing) | Go | GPL-3.0 | [v1.133.2](https://github.com/seatsurfing/seatsurfing/releases/tag/v1.133.2) signed | 316 | none |
| [Nextcloud Polls](https://github.com/nextcloud/polls) | JavaScript | AGPL-3.0 | [v9.3.0](https://github.com/nextcloud/polls/releases/tag/v9.3.0) | 285 | Doodle (full) |
| [Croodle](https://github.com/jelhan/croodle) | JavaScript | MIT | [v0.7.0](https://github.com/jelhan/croodle/releases/tag/v0.7.0) | 214 | Doodle (partial) |

</details>

<details>
<summary><b>Image editors</b>, 6 tools</summary>

Edit raster and vector images, from retouching photos to drawing graphics.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Graphite](https://github.com/GraphiteEditor/Graphite) | Rust | Apache-2.0 | [pre-4435](https://github.com/GraphiteEditor/Graphite/releases/tag/pre-4435) signed | 27454 | Photoshop (partial) |
| [SVG-Edit](https://github.com/SVG-Edit/svgedit) | JavaScript | MIT | [v.7.3.3](https://github.com/SVG-Edit/svgedit/releases/tag/v.7.3.3) | 7860 | Canva (partial) |
| [Pinta](https://github.com/PintaProject/Pinta) | C# | MIT | [3.1.2](https://github.com/PintaProject/Pinta/releases/tag/3.1.2) signed | 4072 | Photoshop (partial) |
| [miniPaint](https://github.com/viliusle/miniPaint) | JavaScript | Other | [v4.14.3](https://github.com/viliusle/miniPaint/releases/tag/v4.14.3) | 3473 | Photoshop (partial) |
| [PhotoDemon](https://github.com/tannerhelland/PhotoDemon) | Visual Basic 6.0 | Other | [v2025.12](https://github.com/tannerhelland/PhotoDemon/releases/tag/v2025.12) signed | 2367 | Photoshop (partial) |
| [Photoflare](https://github.com/PhotoFlare/photoflare) | C++ | GPL-3.0 | [v1.7.4](https://github.com/PhotoFlare/photoflare/releases/tag/v1.7.4) | 470 | Photoshop (partial) |

</details>

<details>
<summary><b>Raw photo editors</b>, 5 tools</summary>

Develop camera raw files and manage a photo catalog non-destructively.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [darktable](https://github.com/darktable-org/darktable) | C | GPL-3.0 | [release-5.6.2](https://github.com/darktable-org/darktable/releases/tag/release-5.6.2) | 13203 | Lightroom (partial) |
| [RapidRAW](https://github.com/CyberTimon/RapidRAW) | TypeScript | AGPL-3.0 | [v1.6.4](https://github.com/CyberTimon/RapidRAW/releases/tag/v1.6.4) | 10352 | Lightroom (partial) |
| [RawTherapee](https://github.com/RawTherapee/RawTherapee) | C++ | GPL-3.0 | [5.13](https://github.com/RawTherapee/RawTherapee/releases/tag/5.13) | 4204 | Lightroom (partial) |
| [Filmulator](https://github.com/CarVac/filmulator-gui) | C++ | Other | [v0.12.0](https://github.com/CarVac/filmulator-gui/releases/tag/v0.12.0) | 765 | Lightroom (partial) |
| [vkdt](https://github.com/hanatos/vkdt) | C | BSD-2-Clause | [1.0.0](https://github.com/hanatos/vkdt/releases/tag/1.0.0) | 613 | Lightroom (partial) |

</details>

<details>
<summary><b>Video editors</b>, 13 tools</summary>

Cut, compose and render video on a timeline or a node graph.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [OpenCut](https://github.com/OpenCut-app/OpenCut) | TypeScript | MIT | [v0.3.0](https://github.com/OpenCut-app/OpenCut/releases/tag/v0.3.0) | 92943 | CapCut (partial) |
| [Remotion](https://github.com/remotion-dev/remotion) | TypeScript | Other | [v4.0.533](https://github.com/remotion-dev/remotion/releases/tag/v4.0.533) | 62156 | After Effects (partial) |
| [LosslessCut](https://github.com/mifi/lossless-cut) | TypeScript | GPL-2.0 | [v3.69.0](https://github.com/mifi/lossless-cut/releases/tag/v3.69.0) signed | 44312 | none |
| [Motion Canvas](https://github.com/motion-canvas/motion-canvas) | TypeScript | MIT | [v3.17.2](https://github.com/motion-canvas/motion-canvas/releases/tag/v3.17.2) | 19244 | After Effects (partial) |
| [Shotcut](https://github.com/mltframework/shotcut) | C++ | GPL-3.0 | [v26.9.27](https://github.com/mltframework/shotcut/releases/tag/v26.9.27) | 15362 | Premiere Pro (full) |
| [Gyroflow](https://github.com/gyroflow/gyroflow) | Rust | GPL-3.0 | [v1.6.3](https://github.com/gyroflow/gyroflow/releases/tag/v1.6.3) | 9571 | none |
| [OpenShot](https://github.com/OpenShot/openshot-qt) | Python | Other | [v4.0.1](https://github.com/OpenShot/openshot-qt/releases/tag/v4.0.1) | 6598 | Premiere Pro (full) |
| [Natron](https://github.com/NatronGitHub/Natron) | C++ | GPL-2.0 | [v2.5.0](https://github.com/NatronGitHub/Natron/releases/tag/v2.5.0) signed | 5569 | After Effects (partial) |
| [Auto-Editor](https://github.com/WyattBlue/auto-editor) | Nim | Unlicense | [31.7.2](https://github.com/WyattBlue/auto-editor/releases/tag/31.7.2) | 5431 | none |
| [Revideo](https://github.com/midrender/revideo) | TypeScript | MIT | [v0.11.0](https://github.com/midrender/revideo/releases/tag/v0.11.0) | 4084 | After Effects (partial) |
| [Flowblade](https://github.com/jliljebl/flowblade) | Python | GPL-3.0 | [v2.24.2](https://github.com/jliljebl/flowblade/releases/tag/v2.24.2) | 3093 | Premiere Pro (full) |
| [Omniclip](https://github.com/omni-media/omniclip) | TypeScript | MIT | [v1.1.3](https://github.com/omni-media/omniclip/releases/tag/v1.1.3) | 1464 | CapCut (partial) |
| [Avidemux](https://github.com/mean00/avidemux2) | C | Other | [2.8.1](https://github.com/mean00/avidemux2/releases/tag/2.8.1) | 974 | none |

</details>

<details>
<summary><b>No-code databases</b>, 3 tools</summary>

Spreadsheet-like databases with views, forms and an API, built without code.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [NocoDB](https://github.com/nocodb/nocodb) | TypeScript | Other | [2026.09.1](https://github.com/nocodb/nocodb/releases/tag/2026.09.1) signed | 65205 | Airtable (full) |
| [Teable](https://github.com/teableio/teable) | TypeScript | Other | [release.2026-10-02T04-02-20Z.3278](https://github.com/teableio/teable/releases/tag/release.2026-10-02T04-02-20Z.3278) signed | 21861 | Airtable (full) |
| [Grist](https://github.com/gristlabs/grist-core) | TypeScript | Apache-2.0 | [v1.7.20](https://github.com/gristlabs/grist-core/releases/tag/v1.7.20) signed | 11908 | Airtable (full) |

</details>

<details>
<summary><b>E-signature</b>, 4 tools</summary>

Send documents for signature and collect legally binding signatures online.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [DocuSeal](https://github.com/docusealco/docuseal) | Ruby | AGPL-3.0 | [3.3.1](https://github.com/docusealco/docuseal/releases/tag/3.3.1) signed | 18661 | DocuSign (partial) |
| [Documenso](https://github.com/documenso/documenso) | TypeScript | AGPL-3.0 | [v2.19.0](https://github.com/documenso/documenso/releases/tag/v2.19.0) | 15343 | DocuSign (full) |
| [OpenSign](https://github.com/OpenSignLabs/OpenSign) | JavaScript | Other | [v2.41.3](https://github.com/OpenSignLabs/OpenSign/releases/tag/v2.41.3) signed | 7060 | DocuSign (full) |
| [LibreSign](https://github.com/LibreSign/libresign) | PHP | AGPL-3.0 | [v15.0.7](https://github.com/LibreSign/libresign/releases/tag/v15.0.7) signed | 828 | DocuSign (partial) |

</details>

<details>
<summary><b>Incident management</b>, 5 tools</summary>

Route alerts, page whoever is on call and track incidents to resolution.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Keep](https://github.com/keephq/keep) | Python | Other | [v0.54.3](https://github.com/keephq/keep/releases/tag/v0.54.3) signed | 12377 | PagerDuty (partial) |
| [Alertmanager](https://github.com/prometheus/alertmanager) | Go | Apache-2.0 | [v0.34.1](https://github.com/prometheus/alertmanager/releases/tag/v0.34.1) signed | 8636 | PagerDuty (partial) |
| [GoAlert](https://github.com/target/goalert) | Go | Apache-2.0 | [v0.35.0](https://github.com/target/goalert/releases/tag/v0.35.0) signed | 2844 | PagerDuty (full) |
| [karma](https://github.com/prymitive/karma) | TypeScript | Apache-2.0 | [v0.133](https://github.com/prymitive/karma/releases/tag/v0.133) | 2684 | none |
| [Alerta](https://github.com/alerta/alerta) | Python | Apache-2.0 | [v9.1.0](https://github.com/alerta/alerta/releases/tag/v9.1.0) | 2530 | PagerDuty (partial) |

</details>

<details>
<summary><b>Time tracking</b>, 8 tools</summary>

Log time against projects and clients, and turn it into reports or invoices.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [ActivityWatch](https://github.com/ActivityWatch/activitywatch) | Python | MPL-2.0 | [v0.14.0](https://github.com/ActivityWatch/activitywatch/releases/tag/v0.14.0) signed | 19078 | RescueTime (full), WakaTime (partial) |
| [solidtime](https://github.com/solidtime-io/solidtime) | PHP | AGPL-3.0 | [v0.21.0](https://github.com/solidtime-io/solidtime/releases/tag/v0.21.0) | 8964 | Toggl Track (full), Harvest (partial) |
| [Kimai](https://github.com/kimai/kimai) | PHP | AGPL-3.0 | [2.69.0](https://github.com/kimai/kimai/releases/tag/2.69.0) signed | 5059 | Toggl Track (full), Harvest (partial) |
| [Wakapi](https://github.com/muety/wakapi) | Go | MIT | [2.18.1](https://github.com/muety/wakapi/releases/tag/2.18.1) | 4443 | WakaTime (full) |
| [TimeTagger](https://github.com/almarklein/timetagger) | Python | GPL-3.0 | [v26.1.3](https://github.com/almarklein/timetagger/releases/tag/v26.1.3) | 1795 | Toggl Track (partial) |
| [Timewarrior](https://github.com/GothenburgBitFactory/timewarrior) | C++ | MIT | [v1.10.0](https://github.com/GothenburgBitFactory/timewarrior/releases/tag/v1.10.0) | 1668 | Toggl Track (partial) |
| [Traggo](https://github.com/traggo/server) | Go | GPL-3.0 | [v0.8.3](https://github.com/traggo/server/releases/tag/v0.8.3) signed | 1637 | Toggl Track (partial) |
| [titra](https://github.com/titraio/titra) | JavaScript | AGPL-3.0 | [v1.1.0](https://github.com/titraio/titra/releases/tag/v1.1.0) | 496 | Toggl Track (full), Harvest (partial) |

</details>

<details>
<summary><b>Image generation</b>, 7 tools</summary>

Generate images from text prompts with diffusion models running on your own hardware.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [ComfyUI](https://github.com/Comfy-Org/ComfyUI) | Python | GPL-3.0 | [v0.39.0](https://github.com/Comfy-Org/ComfyUI/releases/tag/v0.39.0) | 136312 | Midjourney (partial) |
| [InvokeAI](https://github.com/invoke-ai/InvokeAI) | TypeScript | Apache-2.0 | [v6.14.2](https://github.com/invoke-ai/InvokeAI/releases/tag/v6.14.2) | 28349 | Midjourney (partial) |
| [Krita AI Diffusion](https://github.com/Acly/krita-ai-diffusion) | Python | GPL-3.0 | [v1.53.0](https://github.com/Acly/krita-ai-diffusion/releases/tag/v1.53.0) signed | 10669 | Midjourney (partial) |
| [Easy Diffusion](https://github.com/easydiffusion/easydiffusion) | JavaScript | Other | [v3.0.16](https://github.com/easydiffusion/easydiffusion/releases/tag/v3.0.16) | 10472 | Midjourney (partial) |
| [Stability Matrix](https://github.com/LykosAI/StabilityMatrix) | C# | AGPL-3.0 | [v2.16.4](https://github.com/LykosAI/StabilityMatrix/releases/tag/v2.16.4) signed | 8877 | Midjourney (partial) |
| [SD.Next](https://github.com/vladmandic/sdnext) | Python | Apache-2.0 | [2026-07-14](https://github.com/vladmandic/sdnext/releases/tag/2026-07-14) signed | 7350 | Midjourney (partial) |
| [SwarmUI](https://github.com/mcmonkeyprojects/SwarmUI) | C# | MIT | [0.9.8-Beta](https://github.com/mcmonkeyprojects/SwarmUI/releases/tag/0.9.8-Beta) | 4635 | Midjourney (partial) |

</details>

<details>
<summary><b>Mail testing</b>, 5 tools</summary>

Fake SMTP servers with a web inbox that catch the mail an application sends during development.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [MailHog](https://github.com/mailhog/MailHog) | Go | MIT | [v1.0.1](https://github.com/mailhog/MailHog/releases/tag/v1.0.1) | 16176 | none |
| [Mailpit](https://github.com/axllent/mailpit) | Go | MIT | [v1.31.4](https://github.com/axllent/mailpit/releases/tag/v1.31.4) | 10554 | Mailtrap (partial), MailHog (full) |
| [MailCatcher](https://github.com/sj26/mailcatcher) | Ruby | MIT | [v0.10.0](https://github.com/sj26/mailcatcher/releases/tag/v0.10.0) | 6780 | Mailtrap (partial) |
| [smtp4dev](https://github.com/rnwood/smtp4dev) | C# | BSD-3-Clause | [3.15.0](https://github.com/rnwood/smtp4dev/releases/tag/3.15.0) signed | 3990 | Mailtrap (partial) |
| [Inbucket](https://github.com/inbucket/inbucket) | Go | MIT | [v3.1.1](https://github.com/inbucket/inbucket/releases/tag/v3.1.1) signed | 2308 | Mailtrap (partial) |

</details>

<details>
<summary><b>Translation management</b>, 4 tools</summary>

Localisation platforms where teams translate and review an application's strings.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Weblate](https://github.com/WeblateOrg/weblate) | Python | GPL-3.0 | [weblate-2026.10](https://github.com/WeblateOrg/weblate/releases/tag/weblate-2026.10) signed | 6107 | Crowdin (full), Lokalise (full), Phrase (full), Transifex (full) |
| [Tolgee](https://github.com/tolgee/tolgee-platform) | TypeScript | Other | [v3.226.2](https://github.com/tolgee/tolgee-platform/releases/tag/v3.226.2) | 4124 | Crowdin (full), Lokalise (full), Phrase (partial) |
| [Traduora](https://github.com/ever-co/ever-traduora) | JavaScript | AGPL-3.0 | [v0.21.0](https://github.com/ever-co/ever-traduora/releases/tag/v0.21.0) signed | 2133 | Lokalise (partial), Crowdin (partial) |
| [Pontoon](https://github.com/mozilla/pontoon) | Python | BSD-3-Clause | [v2026.09.23](https://github.com/mozilla/pontoon/releases/tag/v2026.09.23) signed | 1671 | Transifex (partial), Crowdin (partial) |

</details>

<details>
<summary><b>Push notifications</b>, 6 tools</summary>

Send push notifications to phones and desktops from a plain HTTP request.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [ntfy](https://github.com/binwiederhier/ntfy) | Go | Apache-2.0 | [v2.28.0](https://github.com/binwiederhier/ntfy/releases/tag/v2.28.0) | 34649 | Pushover (full) |
| [Apprise](https://github.com/caronc/apprise) | Python | BSD-2-Clause | [v2.0.1](https://github.com/caronc/apprise/releases/tag/v2.0.1) | 17535 | Pushover (partial) |
| [Gotify](https://github.com/gotify/server) | Go | Other | [v3.1.1](https://github.com/gotify/server/releases/tag/v3.1.1) signed | 16036 | Pushover (partial) |
| [Bark](https://github.com/Finb/bark-server) | Go | MIT | [v2.3.7](https://github.com/Finb/bark-server/releases/tag/v2.3.7) | 3649 | Pushover (partial) |
| [Shoutrrr](https://github.com/containrrr/shoutrrr) | Go | MIT | [v0.8.0](https://github.com/containrrr/shoutrrr/releases/tag/v0.8.0) | 1689 | none |
| [Apprise API](https://github.com/caronc/apprise-api) | Python | MIT | [v2.0.1](https://github.com/caronc/apprise-api/releases/tag/v2.0.1) | 1318 | none |

</details>

<details>
<summary><b>Vulnerability scanners</b>, 5 tools</summary>

Check dependencies and container images against databases of known vulnerabilities.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Trivy](https://github.com/aquasecurity/trivy) | Go | Apache-2.0 | [v0.75.0](https://github.com/aquasecurity/trivy/releases/tag/v0.75.0) signed | 38261 | Snyk (partial) |
| [Grype](https://github.com/anchore/grype) | Go | Apache-2.0 | [v0.120.0](https://github.com/anchore/grype/releases/tag/v0.120.0) | 12984 | Snyk (partial) |
| [OSV-Scanner](https://github.com/google/osv-scanner) | Go | Apache-2.0 | [v2.6.0](https://github.com/google/osv-scanner/releases/tag/v2.6.0) signed | 11147 | Snyk (partial) |
| [Clair](https://github.com/quay/clair) | Go | Apache-2.0 | [v4.9.0](https://github.com/quay/clair/releases/tag/v4.9.0) signed | 11072 | Snyk (partial) |
| [Dependency-Check](https://github.com/dependency-check/DependencyCheck) | Java | Apache-2.0 | [v13.0.0](https://github.com/dependency-check/DependencyCheck/releases/tag/v13.0.0) | 7718 | Snyk (partial) |

</details>

<details>
<summary><b>Pastebins</b>, 4 tools</summary>

Share code snippets and text through a link.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [PrivateBin](https://github.com/PrivateBin/PrivateBin) | PHP | Other | [2.0.6](https://github.com/PrivateBin/PrivateBin/releases/tag/2.0.6) signed | 8652 | Pastebin (full), GitHub Gist (partial) |
| [MicroBin](https://github.com/szabodanika/microbin) | Rust | BSD-3-Clause | [v2.1.0](https://github.com/szabodanika/microbin/releases/tag/v2.1.0) | 4580 | Pastebin (full), GitHub Gist (partial) |
| [Opengist](https://github.com/thomiceli/opengist) | Go | AGPL-3.0 | [v1.15.2](https://github.com/thomiceli/opengist/releases/tag/v1.15.2) | 3370 | GitHub Gist (full), Pastebin (full) |
| [Hasty Paste](https://github.com/enchant97/hasty-paste) | Go | AGPL-3.0 | [v2.4.1](https://github.com/enchant97/hasty-paste/releases/tag/v2.4.1) signed | 256 | Pastebin (full), GitHub Gist (partial) |

</details>

<details>
<summary><b>File sharing</b>, 4 tools</summary>

Send large files to someone through a link that expires.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [PicoShare](https://github.com/mtlynch/picoshare) | Go | Other | [v1.5.4](https://github.com/mtlynch/picoshare/releases/tag/v1.5.4) signed | 3046 | WeTransfer (full) |
| [Gokapi](https://github.com/Forceu/Gokapi) | Go | AGPL-3.0 | [v2.2.4](https://github.com/Forceu/Gokapi/releases/tag/v2.2.4) signed | 2896 | WeTransfer (full) |
| [PsiTransfer](https://github.com/psi-4ward/psitransfer) | JavaScript | BSD-2-Clause | [v2.4.4](https://github.com/psi-4ward/psitransfer/releases/tag/v2.4.4) | 1957 | WeTransfer (full) |
| [Erugo](https://github.com/ErugoOSS/Erugo) | PHP | MIT | [v0.2.15](https://github.com/ErugoOSS/Erugo/releases/tag/v0.2.15) | 1156 | WeTransfer (full) |

</details>

<details>
<summary><b>App launchers</b>, 10 tools</summary>

Open apps and files and run commands from the keyboard.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [PowerToys](https://github.com/microsoft/PowerToys) | C | MIT | [v0.101.2362.0](https://github.com/microsoft/PowerToys/releases/tag/v0.101.2362.0) | 139269 | Raycast (partial), Alfred (partial) |
| [Wox](https://github.com/Wox-launcher/Wox) | Go | GPL-3.0 | [v2.4.6](https://github.com/Wox-launcher/Wox/releases/tag/v2.4.6) | 27491 | Raycast (full), Alfred (full) |
| [rofi](https://github.com/davatorium/rofi) | C | Other | [2.0.0](https://github.com/davatorium/rofi/releases/tag/2.0.0) | 16441 | Alfred (partial) |
| [Flow Launcher](https://github.com/Flow-Launcher/Flow.Launcher) | C# | MIT | [v2.1.4](https://github.com/Flow-Launcher/Flow.Launcher/releases/tag/v2.1.4) signed | 15719 | Raycast (full), Alfred (full) |
| [Vicinae](https://github.com/vicinaehq/vicinae) | C++ | GPL-3.0 | [v0.29.1](https://github.com/vicinaehq/vicinae/releases/tag/v0.29.1) | 10182 | Raycast (partial) |
| [Cerebro](https://github.com/cerebroapp/cerebro) | JavaScript | MIT | [v0.11.0](https://github.com/cerebroapp/cerebro/releases/tag/v0.11.0) | 8565 | Alfred (partial) |
| [Albert](https://github.com/albertlauncher/albert) | C++ | Other | [v35.1.0](https://github.com/albertlauncher/albert/releases/tag/v35.1.0) | 8005 | Raycast (full), Alfred (full) |
| [Kando](https://github.com/kando-menu/kando) | TypeScript | Other | [v3.0.0](https://github.com/kando-menu/kando/releases/tag/v3.0.0) | 6412 | none |
| [Ulauncher](https://github.com/Ulauncher/Ulauncher) | Python | Other | [5.16.2](https://github.com/Ulauncher/Ulauncher/releases/tag/5.16.2) | 4521 | Raycast (full), Alfred (full) |
| [Walker](https://github.com/abenz1267/walker) | Rust | GPL-3.0 | [v2.17.1](https://github.com/abenz1267/walker/releases/tag/v2.17.1) signed | 3070 | Alfred (partial) |

</details>

<details>
<summary><b>Slides</b>, 5 tools</summary>

Write presentations, often from Markdown or code instead of a visual editor.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [reveal.js](https://github.com/hakimel/reveal.js) | JavaScript | MIT | [6.0.2](https://github.com/hakimel/reveal.js/releases/tag/6.0.2) | 72387 | Microsoft PowerPoint (partial), Google Slides (partial), Keynote (partial) |
| [Slidev](https://github.com/slidevjs/slidev) | TypeScript | MIT | [v53.0.0](https://github.com/slidevjs/slidev/releases/tag/v53.0.0) signed | 48944 | Microsoft PowerPoint (partial), Google Slides (partial), Keynote (partial) |
| [Presenton](https://github.com/presenton/presenton) | TypeScript | Apache-2.0 | [electron-v0.9.11-beta](https://github.com/presenton/presenton/releases/tag/electron-v0.9.11-beta) signed | 10967 | Canva (partial) |
| [presenterm](https://github.com/mfontanini/presenterm) | Rust | BSD-2-Clause | [v0.16.1](https://github.com/mfontanini/presenterm/releases/tag/v0.16.1) signed | 8899 | Microsoft PowerPoint (partial), Keynote (partial) |
| [Marp CLI](https://github.com/marp-team/marp-cli) | TypeScript | MIT | [v4.5.1](https://github.com/marp-team/marp-cli/releases/tag/v4.5.1) | 3855 | Microsoft PowerPoint (partial), Google Slides (partial), Keynote (partial) |

</details>

<details>
<summary><b>Internal tool builders</b>, 9 tools</summary>

Build internal apps and admin panels on top of databases and APIs.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [ToolJet](https://github.com/ToolJet/ToolJet) | JavaScript | AGPL-3.0 | [v3.20.239-lts](https://github.com/ToolJet/ToolJet/releases/tag/v3.20.239-lts) signed | 41042 | Retool (full) |
| [Appsmith](https://github.com/appsmithorg/appsmith) | TypeScript | Apache-2.0 | [v2.4.3](https://github.com/appsmithorg/appsmith/releases/tag/v2.4.3) signed | 41024 | Retool (full) |
| [Refine](https://github.com/refinedev/refine) | TypeScript | MIT | [@refinedev/core@5.0.12](https://github.com/refinedev/refine/releases/tag/%40refinedev/core%405.0.12) | 35764 | Retool (partial) |
| [Budibase](https://github.com/Budibase/budibase) | TypeScript | Other | [v3.48.0](https://github.com/Budibase/budibase/releases/tag/v3.48.0) | 28330 | Retool (full) |
| [react-admin](https://github.com/marmelab/react-admin) | TypeScript | MIT | [v5.15.4](https://github.com/marmelab/react-admin/releases/tag/v5.15.4) | 26954 | Retool (partial) |
| [NocoBase](https://github.com/nocobase/nocobase) | TypeScript | Other | [v2.2.21](https://github.com/nocobase/nocobase/releases/tag/v2.2.21) | 24472 | Retool (partial) |
| [ILLA Builder](https://github.com/illacloud/illa-builder) | TypeScript | Apache-2.0 | [illa-builder@4.8.5](https://github.com/illacloud/illa-builder/releases/tag/illa-builder%404.8.5) | 12329 | Retool (full) |
| [Saltcorn](https://github.com/saltcorn/saltcorn) | JavaScript | MIT | [v1.6.2](https://github.com/saltcorn/saltcorn/releases/tag/v1.6.2) | 2079 | Retool (partial) |
| [Lowcoder](https://github.com/lowcoder-org/lowcoder) | HTML | AGPL-3.0 | [2.7.6](https://github.com/lowcoder-org/lowcoder/releases/tag/2.7.6) signed | 1615 | Retool (full) |

</details>

<details>
<summary><b>Database clients</b>, 25 tools</summary>

Desktop and web clients to browse, edit and query databases.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [DBeaver](https://github.com/dbeaver/dbeaver) | Java | Apache-2.0 | [26.2.2](https://github.com/dbeaver/dbeaver/releases/tag/26.2.2) | 51965 | TablePlus (full), DataGrip (full) |
| [Another Redis Desktop Manager](https://github.com/qishibo/AnotherRedisDesktopManager) | JavaScript | MIT | [v1.7.4](https://github.com/qishibo/AnotherRedisDesktopManager/releases/tag/v1.7.4) | 34787 | none |
| [Chat2DB](https://github.com/OtterMind/Chat2DB) | Java | Other | [v5.3.7](https://github.com/OtterMind/Chat2DB/releases/tag/v5.3.7) | 28301 | Navicat (partial) |
| [DB Browser for SQLite](https://github.com/sqlitebrowser/sqlitebrowser) | C++ | Other | [v3.13.1](https://github.com/sqlitebrowser/sqlitebrowser/releases/tag/v3.13.1) signed | 24661 | none |
| [Beekeeper Studio](https://github.com/beekeeper-studio/beekeeper-studio) | TypeScript | Other | [v6.1.5](https://github.com/beekeeper-studio/beekeeper-studio/releases/tag/v6.1.5) | 23707 | TablePlus (full), DataGrip (partial) |
| [pgcli](https://github.com/dbcli/pgcli) | Python | BSD-3-Clause | [v4.7.1](https://github.com/dbcli/pgcli/releases/tag/v4.7.1) | 13411 | none |
| [Tiny RDM](https://github.com/tiny-craft/tiny-rdm) | Vue | GPL-3.0 | [v1.2.7](https://github.com/tiny-craft/tiny-rdm/releases/tag/v1.2.7) signed | 13128 | none |
| [mycli](https://github.com/dbcli/mycli) | Python | BSD-3-Clause | [v2.28.1](https://github.com/dbcli/mycli/releases/tag/v2.28.1) signed | 11976 | none |
| [Datasette](https://github.com/simonw/datasette) | Python | Apache-2.0 | [0.65.5](https://github.com/simonw/datasette/releases/tag/0.65.5) | 11503 | none |
| [usql](https://github.com/xo/usql) | Go | MIT | [v0.21.6](https://github.com/xo/usql/releases/tag/v0.21.6) | 10135 | none |
| [Redis Insight](https://github.com/redis/RedisInsight) | TypeScript | Other | [3.8.0](https://github.com/redis/RedisInsight/releases/tag/3.8.0) signed | 8881 | none |
| [phpMyAdmin](https://github.com/phpmyadmin/phpmyadmin) | PHP | GPL-2.0 | [RELEASE_5_2_3](https://github.com/phpmyadmin/phpmyadmin/releases/tag/RELEASE_5_2_3) signed | 7947 | Navicat (partial) |
| [Adminer](https://github.com/vrana/adminer) | PHP | Other | [v6.1.1](https://github.com/vrana/adminer/releases/tag/v6.1.1) | 7918 | TablePlus (partial) |
| [Sequel Ace](https://github.com/Sequel-Ace/Sequel-Ace) | Objective-C | Other | [production/6.0.1-20114](https://github.com/Sequel-Ace/Sequel-Ace/releases/tag/production/6.0.1-20114) signed | 7547 | TablePlus (partial) |
| [DbGate](https://github.com/dbgate/dbgate) | JavaScript | GPL-3.0 | [v7.3.1](https://github.com/dbgate/dbgate/releases/tag/v7.3.1) | 7332 | TablePlus (full), DataGrip (partial) |
| [Harlequin](https://github.com/tconbeer/harlequin) | Python | MIT | [v2.16.1](https://github.com/tconbeer/harlequin/releases/tag/v2.16.1) signed | 6449 | DataGrip (partial) |
| [mongo-express](https://github.com/mongo-express/mongo-express) | JavaScript | MIT | [v1.1.0-rc-4](https://github.com/mongo-express/mongo-express/releases/tag/v1.1.0-rc-4) signed | 5988 | Studio 3T (partial) |
| [rainfrog](https://github.com/achristmascarl/rainfrog) | Rust | MIT | [v0.4.6](https://github.com/achristmascarl/rainfrog/releases/tag/v0.4.6) signed | 5357 | none |
| [CloudBeaver](https://github.com/dbeaver/cloudbeaver) | TypeScript | Apache-2.0 | [25.3.5](https://github.com/dbeaver/cloudbeaver/releases/tag/25.3.5) | 5182 | TablePlus (partial), DataGrip (partial) |
| [WhoDB](https://github.com/clidey/whodb) | Go | Apache-2.0 | [0.134.0](https://github.com/clidey/whodb/releases/tag/0.134.0) | 5029 | TablePlus (partial) |
| [lazysql](https://github.com/jorgerojas26/lazysql) | Go | MIT | [v0.6.0](https://github.com/jorgerojas26/lazysql/releases/tag/v0.6.0) | 4359 | none |
| [pgAdmin 4](https://github.com/pgadmin-org/pgadmin4) | Python | Other | [REL-9_18](https://github.com/pgadmin-org/pgadmin4/releases/tag/REL-9_18) signed | 3866 | DataGrip (partial) |
| [litecli](https://github.com/dbcli/litecli) | Python | BSD-3-Clause | [v1.17.1](https://github.com/dbcli/litecli/releases/tag/v1.17.1) | 3313 | none |
| [MongoDB Compass](https://github.com/mongodb-js/compass) | TypeScript | Other | [v1.52.0](https://github.com/mongodb-js/compass/releases/tag/v1.52.0) | 1500 | Studio 3T (partial) |
| [Hue](https://github.com/cloudera/hue) | JavaScript | Apache-2.0 | [release-4.11.0](https://github.com/cloudera/hue/releases/tag/release-4.11.0) | 1406 | none |

</details>

<details>
<summary><b>LLM observability</b>, 9 tools</summary>

Trace, evaluate and monitor LLM applications.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Langfuse](https://github.com/langfuse/langfuse) | TypeScript | Other | [v4.53.0](https://github.com/langfuse/langfuse/releases/tag/v4.53.0) | 35439 | LangSmith (full), W&B Weave (full) |
| [Opik](https://github.com/comet-ml/opik) | Python | Apache-2.0 | [2.2.92](https://github.com/comet-ml/opik/releases/tag/2.2.92) signed | 22406 | LangSmith (full), W&B Weave (full) |
| [Arize Phoenix](https://github.com/Arize-ai/phoenix) | Python | Other | [arize-phoenix-v20.19.0](https://github.com/Arize-ai/phoenix/releases/tag/arize-phoenix-v20.19.0) signed | 11730 | LangSmith (full), W&B Weave (full) |
| [Evidently](https://github.com/evidentlyai/evidently) | Jupyter Notebook | Apache-2.0 | [v0.7.23](https://github.com/evidentlyai/evidently/releases/tag/v0.7.23) | 7969 | LangSmith (partial) |
| [Helicone](https://github.com/Helicone/helicone) | TypeScript | Apache-2.0 | [v2025.08.21-1](https://github.com/Helicone/helicone/releases/tag/v2025.08.21-1) | 6201 | LangSmith (partial) |
| [LangWatch](https://github.com/langwatch/langwatch) | TypeScript | Apache-2.0 | [langwatch-3.20.1](https://github.com/langwatch/langwatch/releases/tag/langwatch-3.20.1) | 4920 | LangSmith (full) |
| [Agenta](https://github.com/Agenta-AI/agenta) | TypeScript | Other | [v0.122.1](https://github.com/Agenta-AI/agenta/releases/tag/v0.122.1) signed | 4812 | LangSmith (full) |
| [Laminar](https://github.com/lmnr-ai/lmnr) | TypeScript | Apache-2.0 | [v0.2.5](https://github.com/lmnr-ai/lmnr/releases/tag/v0.2.5) signed | 3342 | LangSmith (full) |
| [OpenLIT](https://github.com/openlit/openlit) | TypeScript | Apache-2.0 | [openlit-2.1.0](https://github.com/openlit/openlit/releases/tag/openlit-2.1.0) | 2819 | LangSmith (partial) |

</details>

<details>
<summary><b>PDF tools</b>, 3 tools</summary>

Edit, merge, split, convert and sign PDF files.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Stirling PDF](https://github.com/Stirling-Tools/Stirling-PDF) | TypeScript | Other | [v3.1.0](https://github.com/Stirling-Tools/Stirling-PDF/releases/tag/v3.1.0) signed | 93671 | Adobe Acrobat (partial), Smallpdf (full), iLovePDF (full) |
| [BentoPDF](https://github.com/alam00000/bentopdf) | JavaScript | AGPL-3.0 | [v2.8.8](https://github.com/alam00000/bentopdf/releases/tag/v2.8.8) | 15844 | Smallpdf (full), iLovePDF (full), Adobe Acrobat (partial) |
| [PDF Arranger](https://github.com/pdfarranger/pdfarranger) | Python | GPL-3.0 | [1.14.0](https://github.com/pdfarranger/pdfarranger/releases/tag/1.14.0) | 5955 | Smallpdf (partial), iLovePDF (partial), Adobe Acrobat (partial) |

</details>

<details>
<summary><b>Microblogging</b>, 7 tools</summary>

Federated or self-hosted social networks for short public posts.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Mastodon](https://github.com/mastodon/mastodon) | Ruby | AGPL-3.0 | [v4.7.3](https://github.com/mastodon/mastodon/releases/tag/v4.7.3) | 50357 | X (Twitter) (full), Threads (full) |
| [Misskey](https://github.com/misskey-dev/misskey) | TypeScript | AGPL-3.0 | [2026.10.0](https://github.com/misskey-dev/misskey/releases/tag/2026.10.0) | 11336 | X (Twitter) (full), Threads (full) |
| [Bluesky PDS](https://github.com/bluesky-social/pds) | Shell | Other | [v0.4.5037](https://github.com/bluesky-social/pds/releases/tag/v0.4.5037) | 2623 | X (Twitter) (partial) |
| [nostream](https://github.com/cameri/nostream) | TypeScript | MIT | [v3.2.0](https://github.com/cameri/nostream/releases/tag/v3.2.0) | 829 | none |
| [strfry](https://github.com/hoytech/strfry) | C++ | GPL-3.0 | [1.1.3](https://github.com/hoytech/strfry/releases/tag/1.1.3) | 730 | none |
| [nostr-rs-relay](https://github.com/scsibug/nostr-rs-relay) | Rust | MIT | [0.10.0](https://github.com/scsibug/nostr-rs-relay/releases/tag/0.10.0) | 719 | none |
| [Hollo](https://github.com/fedify-dev/hollo) | TypeScript | AGPL-3.0 | [0.9.22](https://github.com/fedify-dev/hollo/releases/tag/0.9.22) signed | 492 | X (Twitter) (partial) |

</details>

<details>
<summary><b>Forums and Q&A</b>, 13 tools</summary>

Community forums, link aggregators and question and answer sites.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Discourse](https://github.com/discourse/discourse) | Ruby | GPL-2.0 | [v2026.9.0](https://github.com/discourse/discourse/releases/tag/v2026.9.0) | 47938 | Circle (full), Reddit (partial), Stack Internal (partial) |
| [Apache Answer](https://github.com/apache/answer) | Go | Apache-2.0 | [v2.0.2](https://github.com/apache/answer/releases/tag/v2.0.2) | 15690 | Stack Internal (full) |
| [NodeBB](https://github.com/NodeBB/NodeBB) | JavaScript | GPL-3.0 | [v4.16.2](https://github.com/NodeBB/NodeBB/releases/tag/v4.16.2) | 15233 | Circle (partial), Reddit (partial) |
| [Lemmy](https://github.com/LemmyNet/lemmy) | Rust | AGPL-3.0 | [0.19.20](https://github.com/LemmyNet/lemmy/releases/tag/0.19.20) | 14615 | Reddit (full) |
| [Flarum](https://github.com/flarum/framework) | PHP | MIT | [v1.8.20](https://github.com/flarum/framework/releases/tag/v1.8.20) signed | 6757 | Circle (partial), Reddit (partial) |
| [Lobsters](https://github.com/lobsters/lobsters) | Ruby | Other | none | 4850 | Reddit (partial) |
| [Misago](https://github.com/rafalp/Misago) | Python | GPL-2.0 | [0.39.6](https://github.com/rafalp/Misago/releases/tag/0.39.6) | 2781 | none |
| [phpBB](https://github.com/phpbb/phpbb) | PHP | GPL-2.0 | [release-3.3.19](https://github.com/phpbb/phpbb/releases/tag/release-3.3.19) | 2099 | none |
| [Talkyard](https://github.com/debiki/talkyard) | TypeScript | AGPL-3.0 | [tyse-v1.2026.003-f220a7d9f-regular](https://github.com/debiki/talkyard/releases/tag/tyse-v1.2026.003-f220a7d9f-regular) | 1813 | Stack Internal (partial) |
| [MyBB](https://github.com/mybb/mybb) | PHP | LGPL-3.0 | [mybb_1841](https://github.com/mybb/mybb/releases/tag/mybb_1841) | 1242 | none |
| [Scoold](https://github.com/Erudika/scoold) | Java | Apache-2.0 | [1.70.2](https://github.com/Erudika/scoold/releases/tag/1.70.2) signed | 923 | Stack Internal (partial) |
| [Simple Machines Forum](https://github.com/SimpleMachines/SMF) | PHP | Other | [v2.1.7](https://github.com/SimpleMachines/SMF/releases/tag/v2.1.7) signed | 750 | none |
| [Mbin](https://github.com/MbinOrg/mbin) | PHP | AGPL-3.0 | [v1.10.1](https://github.com/MbinOrg/mbin/releases/tag/v1.10.1) signed | 431 | Reddit (full) |

</details>

<details>
<summary><b>Billing</b>, 6 tools</summary>

Usage-based billing, subscription management and invoicing.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Lago](https://github.com/getlago/lago) | Go | AGPL-3.0 | [v1.54.0](https://github.com/getlago/lago/releases/tag/v1.54.0) signed | 10661 | Stripe Billing (full), Chargebee (full) |
| [Polar](https://github.com/polarsource/polar) | Python | Apache-2.0 | [@polar-sh/tanstack-start@1.0.1](https://github.com/polarsource/polar/releases/tag/%40polar-sh/tanstack-start%401.0.1) | 10334 | none |
| [Flexprice](https://github.com/flexprice/flexprice) | Go | AGPL-3.0 | [v2.1.34](https://github.com/flexprice/flexprice/releases/tag/v2.1.34) signed | 6883 | Stripe Billing (full), Chargebee (partial) |
| [Kill Bill](https://github.com/killbill/killbill) | Java | Apache-2.0 | [killbill-0.24.22](https://github.com/killbill/killbill/releases/tag/killbill-0.24.22) | 5786 | Stripe Billing (full), Chargebee (full) |
| [Autumn](https://github.com/useautumn/autumn) | TypeScript | Apache-2.0 | [atmn-v2.0.77](https://github.com/useautumn/autumn/releases/tag/atmn-v2.0.77) signed | 2787 | Stripe Billing (partial) |
| [OpenMeter](https://github.com/openmeterio/openmeter) | Go | Apache-2.0 | [v1.0.0-beta.235](https://github.com/openmeterio/openmeter/releases/tag/v1.0.0-beta.235) | 2369 | Stripe Billing (partial) |

</details>

<details>
<summary><b>Payment processing</b>, 2 tools</summary>

Accept and route online payments from servers you run.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Hyperswitch](https://github.com/juspay/hyperswitch) | Rust | Apache-2.0 | [v1.127.0](https://github.com/juspay/hyperswitch/releases/tag/v1.127.0) | 45292 | Stripe Payments (partial) |
| [BTCPay Server](https://github.com/btcpayserver/btcpayserver) | C# | MIT | [v2.4.5](https://github.com/btcpayserver/btcpayserver/releases/tag/v2.4.5) | 7785 | BitPay (full) |

</details>

<details>
<summary><b>Webhook delivery</b>, 4 tools</summary>

Send and receive webhooks with retries, signatures and delivery logs.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Svix](https://github.com/svix/svix-webhooks) | Rust | MIT | [v2.7.0](https://github.com/svix/svix-webhooks/releases/tag/v2.7.0) signed | 3436 | Hookdeck (partial) |
| [Convoy](https://github.com/frain-dev/convoy) | Go | Other | [v26.8.0](https://github.com/frain-dev/convoy/releases/tag/v26.8.0) | 2876 | Hookdeck (full) |
| [Hook0](https://github.com/hook0/hook0) | Rust | Other | [frontend/v1.2.1](https://github.com/hook0/hook0/releases/tag/frontend/v1.2.1) | 1493 | Hookdeck (partial) |
| [Outpost](https://github.com/hookdeck/outpost) | Go | Apache-2.0 | [sdks/outpost-typescript/v1.7.0](https://github.com/hookdeck/outpost/releases/tag/sdks/outpost-typescript/v1.7.0) signed | 1063 | Hookdeck (partial) |

</details>

<details>
<summary><b>SEO tools</b>, 4 tools</summary>

Track search rankings and audit sites for technical SEO issues.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Unlighthouse](https://github.com/harlan-zw/unlighthouse) | JavaScript | MIT | [v0.19.1](https://github.com/harlan-zw/unlighthouse/releases/tag/v0.19.1) signed | 4887 | Screaming Frog SEO Spider (partial) |
| [SerpBear](https://github.com/towfiqi/serpbear) | TypeScript | MIT | [v3.1.0](https://github.com/towfiqi/serpbear/releases/tag/v3.1.0) | 2100 | Semrush (partial) |
| [Python SEO Analyzer](https://github.com/sethblack/python-seo-analyzer) | Python | Other | [2025.4.3](https://github.com/sethblack/python-seo-analyzer/releases/tag/2025.4.3) signed | 1484 | Screaming Frog SEO Spider (partial) |
| [SEOnaut](https://github.com/StJudeWasHere/seonaut) | Go | MIT | none | 804 | Screaming Frog SEO Spider (partial) |

</details>

<details>
<summary><b>Cookie consent</b>, 2 tools</summary>

Show a consent banner and hold back tracking scripts until visitors agree.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [CookieConsent](https://github.com/orestbida/cookieconsent) | JavaScript | MIT | [v3.1.0](https://github.com/orestbida/cookieconsent/releases/tag/v3.1.0) | 5694 | Cookiebot (partial) |
| [tarteaucitron.js](https://github.com/AmauriC/tarteaucitron.js) | JavaScript | MIT | [v1.35.0](https://github.com/AmauriC/tarteaucitron.js/releases/tag/v1.35.0) | 1058 | Cookiebot (partial) |

</details>

<details>
<summary><b>Event ticketing</b>, 4 tools</summary>

Sell tickets, manage attendees and check people in at events.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Hi.Events](https://github.com/HiEventsDev/Hi.Events) | PHP | Other | [v1.11.1-beta](https://github.com/HiEventsDev/Hi.Events/releases/tag/v1.11.1-beta) signed | 4050 | Eventbrite (full) |
| [pretix](https://github.com/pretix/pretix) | Python | Other | [v2026.8.0](https://github.com/pretix/pretix/releases/tag/v2026.8.0) | 2534 | Eventbrite (full) |
| [Indico](https://github.com/indico/indico) | Python | MIT | [v3.3.13](https://github.com/indico/indico/releases/tag/v3.3.13) signed | 2115 | Eventbrite (partial) |
| [alf.io](https://github.com/alfio-event/alf.io) | Java | GPL-3.0 | [2.0-M5-2609](https://github.com/alfio-event/alf.io/releases/tag/2.0-M5-2609) signed | 1616 | Eventbrite (full) |

</details>

<details>
<summary><b>Point of sale</b>, 2 tools</summary>

Ring up in-store sales, print receipts and track stock.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Open Source Point of Sale](https://github.com/opensourcepos/opensourcepos) | PHP | Other | [3.4.2](https://github.com/opensourcepos/opensourcepos/releases/tag/3.4.2) | 4422 | Square Point of Sale (partial) |
| [NexoPOS](https://github.com/Blair2004/NexoPOS) | PHP | GPL-3.0 | [v6.2.4](https://github.com/Blair2004/NexoPOS/releases/tag/v6.2.4) | 1269 | Square Point of Sale (partial) |

</details>

<details>
<summary><b>Image processing servers</b>, 2 tools</summary>

Resize, crop and convert images on the fly from URL parameters.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [imgproxy](https://github.com/imgproxy/imgproxy) | Go | Apache-2.0 | [v4.0.17](https://github.com/imgproxy/imgproxy/releases/tag/v4.0.17) | 11110 | imgix (full) |
| [Thumbor](https://github.com/thumbor/thumbor) | Python | MIT | [7.8.0](https://github.com/thumbor/thumbor/releases/tag/7.8.0) | 10521 | imgix (full) |

</details>

<details>
<summary><b>Page change monitoring</b>, 3 tools</summary>

Watch web pages and get alerts when they change.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [changedetection.io](https://github.com/dgtlmoon/changedetection.io) | Python | Apache-2.0 | [0.60.8](https://github.com/dgtlmoon/changedetection.io/releases/tag/0.60.8) | 34812 | Visualping (full), Distill.io (full) |
| [urlwatch](https://github.com/thp/urlwatch) | Python | Other | [2.29](https://github.com/thp/urlwatch/releases/tag/2.29) | 3143 | Visualping (partial), Distill.io (partial) |
| [webchanges](https://github.com/mborsetti/webchanges) | Python | Other | [v3.37.0](https://github.com/mborsetti/webchanges/releases/tag/v3.37.0) | 48 | Visualping (partial), Distill.io (partial) |

</details>

<details>
<summary><b>Notification infrastructure</b>, 3 tools</summary>

Send product notifications across email, SMS, push, chat and in-app feeds from one API, with templates and user preferences.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Novu](https://github.com/novuhq/novu) | TypeScript | Other | [@novu/framework@v2.14.0](https://github.com/novuhq/novu/releases/tag/%40novu/framework%40v2.14.0) signed | 40123 | Courier (full), Knock (full) |
| [Dittofeed](https://github.com/dittofeed/dittofeed) | TypeScript | MIT | [v0.23.0](https://github.com/dittofeed/dittofeed/releases/tag/v0.23.0) signed | 2987 | Courier (partial), Knock (partial) |
| [Laudspeaker](https://github.com/laudspeaker/laudspeaker) | TypeScript | Other | [v.1.7.0](https://github.com/laudspeaker/laudspeaker/releases/tag/v.1.7.0) signed | 2629 | Knock (partial) |

</details>

<details>
<summary><b>Privileged access</b>, 6 tools</summary>

Give engineers audited access to servers, databases and Kubernetes through one gateway, with short-lived credentials and session recording.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [JumpServer](https://github.com/jumpserver/jumpserver) | Python | GPL-3.0 | [v5.0.0](https://github.com/jumpserver/jumpserver/releases/tag/v5.0.0) signed | 31718 | StrongDM (full) |
| [Teleport](https://github.com/gravitational/teleport) | Go | AGPL-3.0 | [v18.10.0](https://github.com/gravitational/teleport/releases/tag/v18.10.0) signed | 20967 | StrongDM (full) |
| [Warpgate](https://github.com/warp-tech/warpgate) | Rust | Apache-2.0 | [v0.29.1](https://github.com/warp-tech/warpgate/releases/tag/v0.29.1) | 8014 | StrongDM (partial) |
| [Boundary](https://github.com/hashicorp/boundary) | Go | Other | [v0.21.3](https://github.com/hashicorp/boundary/releases/tag/v0.21.3) signed | 4065 | StrongDM (partial) |
| [Bastillion](https://github.com/Loophole-LLC/Bastillion) | Java | Other | [v5.2.1](https://github.com/Loophole-LLC/Bastillion/releases/tag/v5.2.1) | 3553 | none |
| [ShellHub](https://github.com/shellhub-io/shellhub) | TypeScript | Apache-2.0 | [v0.26.0](https://github.com/shellhub-io/shellhub/releases/tag/v0.26.0) | 2066 | StrongDM (partial) |

</details>

<details>
<summary><b>Resume builders</b>, 3 tools</summary>

Write resumes from templates and export them to PDF.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Reactive Resume](https://github.com/reactive-resume/reactive-resume) | TypeScript | MIT | [v6.0.0](https://github.com/reactive-resume/reactive-resume/releases/tag/v6.0.0) signed | 43902 | Resume.io (full), Kickresume (full) |
| [RenderCV](https://github.com/rendercv/rendercv) | Python | MIT | [v2.8](https://github.com/rendercv/rendercv/releases/tag/v2.8) | 17705 | Resume.io (partial), Kickresume (partial) |
| [JadeAI](https://github.com/LingyiChen-AI/JadeAI) | TypeScript | Apache-2.0 | [v0.7.0](https://github.com/LingyiChen-AI/JadeAI/releases/tag/v0.7.0) | 1984 | Kickresume (full), Resume.io (full) |

</details>

<details>
<summary><b>Artifact repositories</b>, 11 tools</summary>

Host and proxy packages and build artefacts for Maven, npm, PyPI, containers and other formats.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Verdaccio](https://github.com/verdaccio/verdaccio) | TypeScript | MIT | [v6.10.5](https://github.com/verdaccio/verdaccio/releases/tag/v6.10.5) signed | 17913 | JFrog Artifactory (partial) |
| [Athens](https://github.com/gomods/athens) | Go | MIT | [v0.19.2](https://github.com/gomods/athens/releases/tag/v0.19.2) signed | 4803 | JFrog Artifactory (partial) |
| [ChartMuseum](https://github.com/helm/chartmuseum) | Go | Apache-2.0 | [v0.16.6](https://github.com/helm/chartmuseum/releases/tag/v0.16.6) signed | 3846 | JFrog Artifactory (partial) |
| [aptly](https://github.com/aptly-dev/aptly) | Go | MIT | [v1.6.3](https://github.com/aptly-dev/aptly/releases/tag/v1.6.3) | 2889 | JFrog Artifactory (partial) |
| [Nexus Repository](https://github.com/sonatype/nexus-public) | Java | EPL-1.0 | [release-3.96.4-01](https://github.com/sonatype/nexus-public/releases/tag/release-3.96.4-01) | 2665 | JFrog Artifactory (partial) |
| [pypiserver](https://github.com/pypiserver/pypiserver) | Python | Other | [v2.4.2](https://github.com/pypiserver/pypiserver/releases/tag/v2.4.2) signed | 2070 | JFrog Artifactory (partial) |
| [Reposilite](https://github.com/dzikoysk/reposilite) | Kotlin | Apache-2.0 | [3.6.3](https://github.com/dzikoysk/reposilite/releases/tag/3.6.3) | 1882 | JFrog Artifactory (partial) |
| [Kellnr](https://github.com/kellnr/kellnr) | Rust | Apache-2.0 | [v6.9.0](https://github.com/kellnr/kellnr/releases/tag/v6.9.0) | 1090 | JFrog Artifactory (partial) |
| [Gemstash](https://github.com/rubygems/gemstash) | Ruby | MIT | [v2.8.2](https://github.com/rubygems/gemstash/releases/tag/v2.8.2) | 793 | JFrog Artifactory (partial) |
| [Artipie](https://github.com/artipie/artipie) | Java | MIT | [v1.17.16](https://github.com/artipie/artipie/releases/tag/v1.17.16) | 692 | JFrog Artifactory (full) |
| [Pulp](https://github.com/pulp/pulpcore) | Python | GPL-2.0 | [3.121.0](https://github.com/pulp/pulpcore/releases/tag/3.121.0) | 605 | JFrog Artifactory (full) |

</details>

<details>
<summary><b>Static analysis</b>, 10 tools</summary>

Inspect source code for bugs, code smells and security issues, and track the findings across branches and pull requests.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Semgrep](https://github.com/semgrep/semgrep) | C | LGPL-2.1 | [v1.179.0](https://github.com/semgrep/semgrep/releases/tag/v1.179.0) | 16902 | SonarQube Cloud (partial) |
| [SonarQube Community Build](https://github.com/SonarSource/sonarqube) | Java | LGPL-3.0 | [26.9.0.129388](https://github.com/SonarSource/sonarqube/releases/tag/26.9.0.129388) | 11047 | SonarQube Cloud (partial) |
| [gosec](https://github.com/securego/gosec) | Go | Apache-2.0 | [v2.29.0](https://github.com/securego/gosec/releases/tag/v2.29.0) | 8960 | none |
| [Bandit](https://github.com/PyCQA/bandit) | Python | Apache-2.0 | [1.9.4](https://github.com/PyCQA/bandit/releases/tag/1.9.4) signed | 8295 | none |
| [Brakeman](https://github.com/presidentbeef/brakeman) | Ruby | Other | [v8.1.0](https://github.com/presidentbeef/brakeman/releases/tag/v8.1.0) signed | 7276 | none |
| [Cppcheck](https://github.com/cppcheck-opensource/cppcheck) | C++ | GPL-3.0 | [2.22.0](https://github.com/cppcheck-opensource/cppcheck/releases/tag/2.22.0) | 6768 | none |
| [Opengrep](https://github.com/opengrep/opengrep) | OCaml | LGPL-2.1 | [v1.30.0](https://github.com/opengrep/opengrep/releases/tag/v1.30.0) signed | 3147 | Semgrep (drop-in) |
| [Bearer](https://github.com/Bearer/bearer) | Go | Other | [v2.1.1](https://github.com/Bearer/bearer/releases/tag/v2.1.1) signed | 2757 | none |
| [CodeChecker](https://github.com/Ericsson/codechecker) | Python | Apache-2.0 | [v6.29.1](https://github.com/Ericsson/codechecker/releases/tag/v6.29.1) | 2628 | SonarQube Cloud (partial) |
| [MegaLinter](https://github.com/oxsecurity/megalinter) | Dockerfile | AGPL-3.0 | [v10.1.0](https://github.com/oxsecurity/megalinter/releases/tag/v10.1.0) | 2612 | SonarQube Cloud (partial) |

</details>

<details>
<summary><b>Telephony and SMS gateways</b>, 10 tools</summary>

Run voice calls, SIP trunks and SMS sending on your own servers behind an API.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Fonoster](https://github.com/fonoster/fonoster) | TypeScript | MIT | [v0.22.14](https://github.com/fonoster/fonoster/releases/tag/v0.22.14) | 8129 | Twilio (partial) |
| [SMS Gateway for Android](https://github.com/capcom6/android-sms-gateway) | Kotlin | Apache-2.0 | [v1.77.1](https://github.com/capcom6/android-sms-gateway/releases/tag/v1.77.1) | 5828 | Twilio (partial) |
| [FreeSWITCH](https://github.com/signalwire/freeswitch) | C | Other | [v1.11.3](https://github.com/signalwire/freeswitch/releases/tag/v1.11.3) | 5208 | Twilio (partial) |
| [Asterisk](https://github.com/asterisk/asterisk) | C | Other | [23.5.0](https://github.com/asterisk/asterisk/releases/tag/23.5.0) | 3598 | Twilio (partial) |
| [textbee](https://github.com/textbee/textbee) | TypeScript | MIT | [v2.9.0](https://github.com/textbee/textbee/releases/tag/v2.9.0) | 3134 | Twilio (partial) |
| [Kamailio](https://github.com/kamailio/kamailio) | C | Other | [6.0.8](https://github.com/kamailio/kamailio/releases/tag/6.0.8) signed | 2970 | none |
| [HOMER](https://github.com/sipcapture/homer) | Go | Other | [11.0.357](https://github.com/sipcapture/homer/releases/tag/11.0.357) signed | 2019 | none |
| [OpenSIPS](https://github.com/OpenSIPS/opensips) | C | Other | [4.0.2](https://github.com/OpenSIPS/opensips/releases/tag/4.0.2) | 1536 | none |
| [Jasmin](https://github.com/jookies/jasmin) | Python | Other | [0.11.0](https://github.com/jookies/jasmin/releases/tag/0.11.0) signed | 1209 | Twilio (partial) |
| [jambonz](https://github.com/jambonz/jambonz-feature-server) | JavaScript | MIT | [v0.9.14](https://github.com/jambonz/jambonz-feature-server/releases/tag/v0.9.14) | 103 | Twilio (partial) |

</details>

<details>
<summary><b>Chat clients</b>, 19 tools</summary>

Desktop, mobile and web apps for Matrix, XMPP and IRC.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Element Web](https://github.com/element-hq/element-web) | TypeScript | AGPL-3.0 | [v1.12.30](https://github.com/element-hq/element-web/releases/tag/v1.12.30) signed | 13544 | none |
| [The Lounge](https://github.com/thelounge/thelounge) | TypeScript | MIT | [v4.5.2](https://github.com/thelounge/thelounge/releases/tag/v4.5.2) | 6345 | none |
| [Ferdium](https://github.com/ferdium/ferdium-app) | TypeScript | Apache-2.0 | [v7.2.3](https://github.com/ferdium/ferdium-app/releases/tag/v7.2.3) | 4652 | Rambox (full) |
| [Halloy](https://github.com/squidowl/halloy) | Rust | GPL-3.0 | [2026.9](https://github.com/squidowl/halloy/releases/tag/2026.9) signed | 4532 | none |
| [Cinny](https://github.com/cinnyapp/cinny) | TypeScript | AGPL-3.0 | [v4.12.7](https://github.com/cinnyapp/cinny/releases/tag/v4.12.7) signed | 3921 | none |
| [WeeChat](https://github.com/weechat/weechat) | C | GPL-3.0 | [v4.10.1](https://github.com/weechat/weechat/releases/tag/v4.10.1) | 3397 | none |
| [Converse.js](https://github.com/conversejs/converse.js) | JavaScript | MPL-2.0 | [v14.0.0](https://github.com/conversejs/converse.js/releases/tag/v14.0.0) signed | 3297 | none |
| [FluffyChat](https://github.com/krille-chan/fluffychat) | Dart | AGPL-3.0 | [v2.10.0](https://github.com/krille-chan/fluffychat/releases/tag/v2.10.0) signed | 3184 | none |
| [Irssi](https://github.com/irssi/irssi) | C | Other | [1.4.5](https://github.com/irssi/irssi/releases/tag/1.4.5) | 3152 | none |
| [Nheko](https://github.com/Nheko-Reborn/nheko) | C++ | GPL-3.0 | [v0.12.1](https://github.com/Nheko-Reborn/nheko/releases/tag/v0.12.1) signed | 2506 | none |
| [Dino](https://github.com/dino/dino) | Vala | GPL-3.0 | [v0.5.1](https://github.com/dino/dino/releases/tag/v0.5.1) | 2495 | none |
| [Element X Android](https://github.com/element-hq/element-x-android) | Kotlin | AGPL-3.0 | [v26.09.4](https://github.com/element-hq/element-x-android/releases/tag/v26.09.4) | 2428 | none |
| [Movim](https://github.com/movim/movim) | PHP | AGPL-3.0 | [v0.35.1](https://github.com/movim/movim/releases/tag/v0.35.1) | 2060 | none |
| [Profanity](https://github.com/profanity-im/profanity) | C | Other | [0.18.2](https://github.com/profanity-im/profanity/releases/tag/0.18.2) | 1543 | none |
| [Commet](https://github.com/commetchat/commet) | Dart | AGPL-3.0 | [v0.5.0](https://github.com/commetchat/commet/releases/tag/v0.5.0) | 1120 | none |
| [Kiwi IRC](https://github.com/kiwiirc/kiwiirc) | Vue | Apache-2.0 | [v1.7.1](https://github.com/kiwiirc/kiwiirc/releases/tag/v1.7.1) signed | 989 | none |
| [Element X iOS](https://github.com/element-hq/element-x-ios) | Swift | AGPL-3.0 | [release/26.09.2](https://github.com/element-hq/element-x-ios/releases/tag/release/26.09.2) signed | 950 | none |
| [Quassel IRC](https://github.com/quassel/quassel) | C++ | Other | [0.14.0](https://github.com/quassel/quassel/releases/tag/0.14.0) signed | 796 | none |
| [Monal](https://github.com/monal-im/Monal) | Objective-C | Other | [Build_iOS_1094](https://github.com/monal-im/Monal/releases/tag/Build_iOS_1094) signed | 677 | none |

</details>

<details>
<summary><b>Chat bridges</b>, 6 tools</summary>

Relay conversations between Matrix and other chat networks, so one client reaches them all.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [mautrix-whatsapp](https://github.com/mautrix/whatsapp) | Go | AGPL-3.0 | [v0.2609.0](https://github.com/mautrix/whatsapp/releases/tag/v0.2609.0) | 1898 | Beeper (partial) |
| [mautrix-telegram](https://github.com/mautrix/telegram) | Go | AGPL-3.0 | [v0.2609.0](https://github.com/mautrix/telegram/releases/tag/v0.2609.0) | 1749 | Beeper (partial) |
| [mautrix-signal](https://github.com/mautrix/signal) | Go | AGPL-3.0 | [v0.2609.0](https://github.com/mautrix/signal/releases/tag/v0.2609.0) | 674 | Beeper (partial) |
| [mautrix-discord](https://github.com/mautrix/discord) | Go | AGPL-3.0 | [v0.7.7](https://github.com/mautrix/discord/releases/tag/v0.7.7) | 503 | Beeper (partial) |
| [Hookshot](https://github.com/matrix-org/matrix-hookshot) | TypeScript | Apache-2.0 | [7.5.0](https://github.com/matrix-org/matrix-hookshot/releases/tag/7.5.0) signed | 457 | none |
| [mautrix-meta](https://github.com/mautrix/meta) | Go | AGPL-3.0 | [v0.2609.0](https://github.com/mautrix/meta/releases/tag/v0.2609.0) | 444 | Beeper (partial) |

</details>

<details>
<summary><b>Private messengers</b>, 10 tools</summary>

End-to-end encrypted messaging apps for one-to-one and group chats on a phone or a desktop.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Signal for Android](https://github.com/signalapp/Signal-Android) | Kotlin | AGPL-3.0 | [v8.28.4](https://github.com/signalapp/Signal-Android/releases/tag/v8.28.4) | 29423 | WhatsApp (full) |
| [SimpleX Chat](https://github.com/simplex-chat/simplex-chat) | Haskell | AGPL-3.0 | [v7.0.3](https://github.com/simplex-chat/simplex-chat/releases/tag/v7.0.3) signed | 19523 | WhatsApp (full) |
| [Signal Desktop](https://github.com/signalapp/Signal-Desktop) | TypeScript | AGPL-3.0 | [v8.29.0](https://github.com/signalapp/Signal-Desktop/releases/tag/v8.29.0) | 16568 | WhatsApp (partial) |
| [Signal Server](https://github.com/signalapp/Signal-Server) | Java | AGPL-3.0 | [v20261002.0.0](https://github.com/signalapp/Signal-Server/releases/tag/v20261002.0.0) | 10720 | none |
| [Berty](https://github.com/berty/berty) | TypeScript | Other | [v2.471.14](https://github.com/berty/berty/releases/tag/v2.471.14) signed | 9312 | none |
| [Quiet](https://github.com/TryQuiet/quiet) | TypeScript | GPL-3.0 | [@quiet/mobile@11.3.0](https://github.com/TryQuiet/quiet/releases/tag/%40quiet/mobile%4011.3.0) | 2658 | Slack (partial) |
| [Delta Chat for Android](https://github.com/deltachat/deltachat-android) | Java | GPL-3.0 | [v2.62.0](https://github.com/deltachat/deltachat-android/releases/tag/v2.62.0) signed | 1830 | WhatsApp (partial) |
| [Delta Chat Desktop](https://github.com/deltachat/deltachat-desktop) | TypeScript | GPL-3.0 | [v2.62.0](https://github.com/deltachat/deltachat-desktop/releases/tag/v2.62.0) signed | 1621 | none |
| [Session for Android](https://github.com/session-foundation/session-android) | Kotlin | GPL-3.0 | [1.33.5](https://github.com/session-foundation/session-android/releases/tag/1.33.5) signed | 915 | WhatsApp (partial) |
| [Session Desktop](https://github.com/session-foundation/session-desktop) | TypeScript | GPL-3.0 | [v1.18.1](https://github.com/session-foundation/session-desktop/releases/tag/v1.18.1) signed | 590 | none |

</details>

<details>
<summary><b>IRC servers</b>, 4 tools</summary>

Run an IRC network or keep a persistent connection to one with a bouncer.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Ergo](https://github.com/ergochat/ergo) | Go | MIT | [v2.19.1](https://github.com/ergochat/ergo/releases/tag/v2.19.1) signed | 3347 | none |
| [ZNC](https://github.com/znc/znc) | C++ | Apache-2.0 | [znc-1.10.3](https://github.com/znc/znc/releases/tag/znc-1.10.3) signed | 2127 | none |
| [InspIRCd](https://github.com/inspircd/inspircd) | C++ | none | [v4.12.1](https://github.com/inspircd/inspircd/releases/tag/v4.12.1) | 1350 | none |
| [UnrealIRCd](https://github.com/unrealircd/unrealircd) | C | GPL-2.0 | none | 525 | none |

</details>

<details>
<summary><b>Email clients</b>, 7 tools</summary>

Desktop, mobile and terminal apps that read and send mail over IMAP and SMTP.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Mailspring](https://github.com/Foundry376/Mailspring) | TypeScript | GPL-3.0 | [1.26.0](https://github.com/Foundry376/Mailspring/releases/tag/1.26.0) | 17889 | Microsoft Outlook (partial) |
| [Thunderbird for Android](https://github.com/thunderbird/thunderbird-android) | Kotlin | Apache-2.0 | [K9MAIL_24_0](https://github.com/thunderbird/thunderbird-android/releases/tag/K9MAIL_24_0) | 14062 | Microsoft Outlook (partial) |
| [Inbox Zero](https://github.com/elie222/inbox-zero) | TypeScript | Other | [desktop-v0.1.16](https://github.com/elie222/inbox-zero/releases/tag/desktop-v0.1.16) signed | 12424 | Superhuman (partial) |
| [Zero](https://github.com/Mail-0/Zero) | TypeScript | MIT | [v0.1](https://github.com/Mail-0/Zero/releases/tag/v0.1) signed | 10841 | Superhuman (partial) |
| [Himalaya](https://github.com/pimalaya/himalaya) | Rust | Apache-2.0 | [v2.2.1](https://github.com/pimalaya/himalaya/releases/tag/v2.2.1) signed | 7398 | none |
| [FairEmail](https://github.com/M66B/FairEmail) | Java | GPL-3.0 | [1.2338](https://github.com/M66B/FairEmail/releases/tag/1.2338) | 4685 | Microsoft Outlook (partial) |
| [NeoMutt](https://github.com/neomutt/neomutt) | C | GPL-2.0 | [20260616](https://github.com/neomutt/neomutt/releases/tag/20260616) signed | 3846 | none |

</details>

<details>
<summary><b>Webmail</b>, 4 tools</summary>

Read and send mail in the browser from an IMAP server you run.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Roundcube](https://github.com/roundcube/roundcubemail) | PHP | GPL-3.0 | [1.7.4](https://github.com/roundcube/roundcubemail/releases/tag/1.7.4) signed | 7206 | Google Workspace (partial) |
| [SOGo](https://github.com/Alinto/sogo) | Objective-C | GPL-2.0 | [SOGo-5.12.11](https://github.com/Alinto/sogo/releases/tag/SOGo-5.12.11) | 2171 | Microsoft 365 (partial) |
| [Cypht](https://github.com/cypht-org/cypht) | PHP | LGPL-2.1 | [v2.12.2](https://github.com/cypht-org/cypht/releases/tag/v2.12.2) | 1752 | none |
| [Nextcloud Mail](https://github.com/nextcloud/mail) | JavaScript | AGPL-3.0 | [v1.13.0](https://github.com/nextcloud/mail/releases/tag/v1.13.0) signed | 1034 | none |

</details>

<details>
<summary><b>Email aliases</b>, 3 tools</summary>

Hand out forwarding addresses that hide your real inbox and can be turned off one by one.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [SimpleLogin](https://github.com/simple-login/app) | Python | AGPL-3.0 | [v4.82.4](https://github.com/simple-login/app/releases/tag/v4.82.4) | 7040 | none |
| [addy.io](https://github.com/anonaddy/anonaddy) | PHP | AGPL-3.0 | [v1.7.3](https://github.com/anonaddy/anonaddy/releases/tag/v1.7.3) | 4886 | none |
| [Firefox Relay](https://github.com/mozilla/fx-private-relay) | Python | Other | [2026.09.10](https://github.com/mozilla/fx-private-relay/releases/tag/2026.09.10) signed | 1792 | none |

</details>

<details>
<summary><b>Email templating</b>, 3 tools</summary>

Write HTML emails from components or markup and compile them to code that renders across mail clients.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [React Email](https://github.com/resend/react-email) | TypeScript | MIT | [react-email@6.11.0](https://github.com/resend/react-email/releases/tag/react-email%406.11.0) signed | 19814 | none |
| [MJML](https://github.com/mjmlio/mjml) | JavaScript | MIT | [v5.4.1](https://github.com/mjmlio/mjml/releases/tag/v5.4.1) | 18252 | none |
| [Maizzle](https://github.com/maizzle/framework) | TypeScript | MIT | [v6.1.7](https://github.com/maizzle/framework/releases/tag/v6.1.7) | 1615 | none |

</details>

<details>
<summary><b>Email archiving</b>, 2 tools</summary>

Store, index and search every message an organisation sends and receives, for retention and legal holds.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Open Archiver](https://github.com/LogicLabs-OU/OpenArchiver) | TypeScript | AGPL-3.0 | [v0.6.0](https://github.com/LogicLabs-OU/OpenArchiver/releases/tag/v0.6.0) signed | 2402 | none |
| [piler](https://github.com/jsuto/piler) | PHP | Other | [piler-1.4.9](https://github.com/jsuto/piler/releases/tag/piler-1.4.9) signed | 351 | none |

</details>

<details>
<summary><b>DMARC reporting</b>, 2 tools</summary>

Collect and chart the DMARC aggregate and failure reports that mailbox providers send about your domains.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [parsedmarc](https://github.com/domainaware/parsedmarc) | Python | Apache-2.0 | [11.0.3](https://github.com/domainaware/parsedmarc/releases/tag/11.0.3) | 1303 | none |
| [DmarcSrg](https://github.com/liuch/dmarc-srg) | PHP | GPL-3.0 | [v2.3](https://github.com/liuch/dmarc-srg/releases/tag/v2.3) | 301 | none |

</details>

<details>
<summary><b>Network video recorders</b>, 8 tools</summary>

Record, watch and analyse IP camera streams on your own hardware.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Frigate](https://github.com/blakeblackshear/frigate) | Python | MIT | [v0.18.0](https://github.com/blakeblackshear/frigate/releases/tag/v0.18.0) signed | 36395 | Blue Iris (full), Ring (partial), Google Nest Aware (partial) |
| [go2rtc](https://github.com/AlexxIT/go2rtc) | Go | MIT | [v1.9.14](https://github.com/AlexxIT/go2rtc/releases/tag/v1.9.14) | 14314 | none |
| [Scrypted](https://github.com/koush/scrypted) | TypeScript | Other | [v0.147.0](https://github.com/koush/scrypted/releases/tag/v0.147.0) | 6001 | Blue Iris (partial) |
| [ZoneMinder](https://github.com/ZoneMinder/zoneminder) | PHP | GPL-2.0 | [1.38.6](https://github.com/ZoneMinder/zoneminder/releases/tag/1.38.6) | 5941 | Blue Iris (full) |
| [motionEye](https://github.com/motioneye-project/motioneye) | Python | GPL-3.0 | [0.44.0](https://github.com/motioneye-project/motioneye/releases/tag/0.44.0) signed | 4695 | Blue Iris (partial) |
| [Viseron](https://github.com/roflcoopter/viseron) | Python | MIT | [v3.7.0](https://github.com/roflcoopter/viseron/releases/tag/v3.7.0) signed | 3570 | Blue Iris (partial) |
| [Moonfire NVR](https://github.com/scottlamb/moonfire-nvr) | Rust | Other | [v0.7.33](https://github.com/scottlamb/moonfire-nvr/releases/tag/v0.7.33) | 1750 | Blue Iris (partial) |
| [Kerberos Agent](https://github.com/kerberos-io/agent) | Go | MIT | [v3.12.7](https://github.com/kerberos-io/agent/releases/tag/v3.12.7) signed | 1124 | Blue Iris (partial) |

</details>

<details>
<summary><b>Expense splitting</b>, 2 tools</summary>

Track shared expenses in a group and work out who owes whom.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Spliit](https://github.com/spliit-app/spliit) | TypeScript | MIT | [1.29.0](https://github.com/spliit-app/spliit/releases/tag/1.29.0) signed | 2977 | Splitwise (full) |
| [I Hate Money](https://github.com/spiral-project/ihatemoney) | Python | Other | [7.2.1](https://github.com/spiral-project/ihatemoney/releases/tag/7.2.1) | 1393 | Splitwise (full) |

</details>

<details>
<summary><b>Fitness tracking</b>, 6 tools</summary>

Log workouts, activities and body measurements, and follow progress over time.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Workout.cool](https://github.com/Snouzy/workout-cool) | TypeScript | MIT | [v1.3.2](https://github.com/Snouzy/workout-cool/releases/tag/v1.3.2) signed | 8550 | Hevy (partial) |
| [wger](https://github.com/wger-project/wger) | Python | AGPL-3.0 | [2.7](https://github.com/wger-project/wger/releases/tag/2.7) | 7042 | Hevy (partial), MyFitnessPal (partial) |
| [openScale](https://github.com/oliexdev/openScale) | Kotlin | GPL-3.0 | [v3.1.3](https://github.com/oliexdev/openScale/releases/tag/v3.1.3) | 2564 | none |
| [Endurain](https://github.com/endurain-project/endurain) | Python | AGPL-3.0 | [v0.17.7](https://github.com/endurain-project/endurain/releases/tag/v0.17.7) | 2234 | Strava (partial) |
| [FitTrackee](https://github.com/SamR1/FitTrackee) | Python | AGPL-3.0 | [v1.3.5](https://github.com/SamR1/FitTrackee/releases/tag/v1.3.5) | 1170 | Strava (partial) |
| [Liftosaur](https://github.com/astashov/liftosaur) | TypeScript | AGPL-3.0 | none | 732 | Hevy (partial) |

</details>

<details>
<summary><b>Habit trackers</b>, 3 tools</summary>

Check off daily habits and follow streaks and progress.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Habitica](https://github.com/HabitRPG/habitica) | JavaScript | Other | [v5.50.6](https://github.com/HabitRPG/habitica/releases/tag/v5.50.6) | 14185 | Habitify (partial) |
| [Loop Habit Tracker](https://github.com/iSoron/uhabits) | Kotlin | GPL-3.0 | [v2.3.1](https://github.com/iSoron/uhabits/releases/tag/v2.3.1) | 10302 | Habitify (partial) |
| [Beaver Habit Tracker](https://github.com/daya0576/beaverhabits) | Python | BSD-3-Clause | [v0.10.0](https://github.com/daya0576/beaverhabits/releases/tag/v0.10.0) signed | 1846 | Habitify (partial) |

</details>

<details>
<summary><b>Web archiving</b>, 3 tools</summary>

Save complete copies of web pages so they stay readable after the original changes or disappears.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [ArchiveBox](https://github.com/ArchiveBox/ArchiveBox) | Python | MIT | [v0.9.71](https://github.com/ArchiveBox/ArchiveBox/releases/tag/v0.9.71) | 28694 | Pinboard (partial) |
| [SingleFile](https://github.com/gildas-lormeau/SingleFile) | JavaScript | AGPL-3.0 | [v1.28.1](https://github.com/gildas-lormeau/SingleFile/releases/tag/v1.28.1) | 22540 | none |
| [ArchiveWeb.page](https://github.com/webrecorder/archiveweb.page) | TypeScript | AGPL-3.0 | [v0.17.1](https://github.com/webrecorder/archiveweb.page/releases/tag/v0.17.1) signed | 1588 | none |

</details>

<details>
<summary><b>Feed generators</b>, 2 tools</summary>

Produce RSS and Atom feeds for sites and accounts that do not publish one.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [RSSHub](https://github.com/DIYgod/RSSHub) | TypeScript | AGPL-3.0 | none | 46427 | RSS.app (full) |
| [RSS-Bridge](https://github.com/RSS-Bridge/rss-bridge) | PHP | Unlicense | [2025-08-05](https://github.com/RSS-Bridge/rss-bridge/releases/tag/2025-08-05) signed | 9266 | RSS.app (partial) |

</details>

<details>
<summary><b>Homelab dashboards</b>, 8 tools</summary>

Start pages that link to self-hosted services and show their status and widgets.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Glance](https://github.com/glanceapp/glance) | Go | AGPL-3.0 | [v0.8.6](https://github.com/glanceapp/glance/releases/tag/v0.8.6) | 37357 | none |
| [Homepage](https://github.com/gethomepage/homepage) | JavaScript | GPL-3.0 | [v2.4.0](https://github.com/gethomepage/homepage/releases/tag/v2.4.0) signed | 32993 | none |
| [Dashy](https://github.com/lissy93/dashy) | Vue | MIT | [4.7.0](https://github.com/lissy93/dashy/releases/tag/4.7.0) | 26641 | none |
| [Homer](https://github.com/bastienwirtz/homer) | Vue | Apache-2.0 | [v26.08.3](https://github.com/bastienwirtz/homer/releases/tag/v26.08.3) | 11645 | none |
| [Heimdall](https://github.com/linuxserver/Heimdall) | PHP | MIT | [v2.8.3](https://github.com/linuxserver/Heimdall/releases/tag/v2.8.3) signed | 9342 | none |
| [Flame](https://github.com/pawelmalak/flame) | TypeScript | MIT | [v2.4.0](https://github.com/pawelmalak/flame/releases/tag/v2.4.0) signed | 6563 | none |
| [Organizr](https://github.com/causefx/Organizr) | PHP | GPL-3.0 | [1.90](https://github.com/causefx/Organizr/releases/tag/1.90) signed | 5818 | none |
| [Homarr](https://github.com/homarr-labs/homarr) | TypeScript | Apache-2.0 | [v2.2.0](https://github.com/homarr-labs/homarr/releases/tag/v2.2.0) | 5015 | none |

</details>

<details>
<summary><b>Browser start pages</b>, 2 tools</summary>

Replace the browser's new tab page with a clock, links, weather and backgrounds.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Bonjourr](https://github.com/victrme/Bonjourr) | TypeScript | GPL-3.0 | [22.3.0](https://github.com/victrme/Bonjourr/releases/tag/22.3.0) | 2098 | Momentum (full) |
| [Mue](https://github.com/mue/mue) | JavaScript | BSD-3-Clause | [v7.6.0](https://github.com/mue/mue/releases/tag/v7.6.0) signed | 762 | Momentum (partial) |

</details>

<details>
<summary><b>Invoicing</b>, 5 tools</summary>

Send quotes and invoices to clients and track the payments.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Midday](https://github.com/midday-ai/midday) | TypeScript | AGPL-3.0 | [midday-v0.5.0](https://github.com/midday-ai/midday/releases/tag/midday-v0.5.0) | 15067 | FreshBooks (full), Harvest (partial) |
| [Invoify](https://github.com/al1abb/invoify) | TypeScript | MIT | none | 6366 | none |
| [InvoicePlane](https://github.com/InvoicePlane/InvoicePlane) | PHP | Other | [v1.7.2](https://github.com/InvoicePlane/InvoicePlane/releases/tag/v1.7.2) | 3152 | FreshBooks (partial) |
| [InvoiceShelf](https://github.com/InvoiceShelf/InvoiceShelf) | PHP | AGPL-3.0 | [2.4.6](https://github.com/InvoiceShelf/InvoiceShelf/releases/tag/2.4.6) signed | 1848 | FreshBooks (partial) |
| [SolidInvoice](https://github.com/SolidInvoice/SolidInvoice) | PHP | MIT | [3.0.1](https://github.com/SolidInvoice/SolidInvoice/releases/tag/3.0.1) | 977 | FreshBooks (partial) |

</details>

<details>
<summary><b>HR management</b>, 5 tools</summary>

Employee records, leave, recruitment and payroll.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Frappe HR](https://github.com/frappe/hrms) | Python | GPL-3.0 | [v16.20.1](https://github.com/frappe/hrms/releases/tag/v16.20.1) | 8883 | BambooHR (full) |
| [Horilla](https://github.com/horilla/horilla-hr) | HTML | LGPL-2.1 | [2.1.8](https://github.com/horilla/horilla-hr/releases/tag/2.1.8) | 1451 | BambooHR (full) |
| [OrangeHRM](https://github.com/orangehrm/orangehrm) | PHP | GPL-3.0 | [v5.9](https://github.com/orangehrm/orangehrm/releases/tag/v5.9) signed | 1148 | BambooHR (partial) |
| [OpenCATS](https://github.com/opencats/OpenCATS) | PHP | Other | [v0.11.1](https://github.com/opencats/OpenCATS/releases/tag/v0.11.1) | 758 | none |
| [IceHrm](https://github.com/gamonoid/icehrm) | JavaScript | Other | [v36.0.1](https://github.com/gamonoid/icehrm/releases/tag/v36.0.1) | 729 | BambooHR (partial) |

</details>

<details>
<summary><b>Embedded key-value stores</b>, 6 tools</summary>

Key-value storage engines linked into a program as a library, with no server to run.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [RocksDB](https://github.com/facebook/rocksdb) | C++ | GPL-2.0 | [v11.8.1](https://github.com/facebook/rocksdb/releases/tag/v11.8.1) | 32172 | none |
| [Badger](https://github.com/dgraph-io/badger) | Go | Apache-2.0 | [v4.9.6](https://github.com/dgraph-io/badger/releases/tag/v4.9.6) signed | 15782 | none |
| [bbolt](https://github.com/etcd-io/bbolt) | Go | MIT | [v1.5.0](https://github.com/etcd-io/bbolt/releases/tag/v1.5.0) signed | 9767 | none |
| [Pebble](https://github.com/cockroachdb/pebble) | Go | BSD-3-Clause | [v2.1.7](https://github.com/cockroachdb/pebble/releases/tag/v2.1.7) | 6048 | RocksDB (partial) |
| [redb](https://github.com/cberner/redb) | Rust | Apache-2.0 | [v4.3.0](https://github.com/cberner/redb/releases/tag/v4.3.0) | 4827 | none |
| [Fjall](https://github.com/fjall-rs/fjall) | Rust | Apache-2.0 | [3.1.12](https://github.com/fjall-rs/fjall/releases/tag/3.1.12) | 2366 | RocksDB (partial) |

</details>

<details>
<summary><b>Distributed key-value stores</b>, 3 tools</summary>

Replicated, transactional key-value stores that run as a cluster.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [etcd](https://github.com/etcd-io/etcd) | Go | Apache-2.0 | [v3.7.2](https://github.com/etcd-io/etcd/releases/tag/v3.7.2) signed | 52337 | none |
| [TiKV](https://github.com/tikv/tikv) | Rust | Apache-2.0 | [v7.5.8](https://github.com/tikv/tikv/releases/tag/v7.5.8) signed | 16904 | none |
| [FoundationDB](https://github.com/apple/foundationdb) | C++ | Apache-2.0 | [7.3.77](https://github.com/apple/foundationdb/releases/tag/7.3.77) signed | 16758 | none |

</details>

<details>
<summary><b>Lakehouse table formats</b>, 5 tools</summary>

Open table formats that add transactions, schema evolution and time travel to files on object storage.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Apache Iceberg](https://github.com/apache/iceberg) | Java | Apache-2.0 | [apache-iceberg-1.12.0](https://github.com/apache/iceberg/releases/tag/apache-iceberg-1.12.0) | 9304 | none |
| [Delta Lake](https://github.com/delta-io/delta) | Scala | Apache-2.0 | [v4.4.1](https://github.com/delta-io/delta/releases/tag/v4.4.1) signed | 9039 | none |
| [Lance](https://github.com/lance-format/lance) | Rust | Apache-2.0 | [v12.0.0](https://github.com/lance-format/lance/releases/tag/v12.0.0) | 7139 | none |
| [Apache Hudi](https://github.com/apache/hudi) | Java | Apache-2.0 | [release-1.2.1](https://github.com/apache/hudi/releases/tag/release-1.2.1) | 6281 | none |
| [Apache Paimon](https://github.com/apache/paimon) | Java | Apache-2.0 | [release-2.0.0](https://github.com/apache/paimon/releases/tag/release-2.0.0) | 3411 | none |

</details>

<details>
<summary><b>Database proxies and connection poolers</b>, 4 tools</summary>

Pool, route and multiplex client connections in front of a database server.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [ProxySQL](https://github.com/sysown/proxysql) | C++ | GPL-3.0 | [v3.0.11](https://github.com/sysown/proxysql/releases/tag/v3.0.11) signed | 6932 | Amazon RDS Proxy (partial) |
| [PgBouncer](https://github.com/pgbouncer/pgbouncer) | C | Other | [pgbouncer_1_26_0](https://github.com/pgbouncer/pgbouncer/releases/tag/pgbouncer_1_26_0) | 4394 | Amazon RDS Proxy (partial) |
| [Odyssey](https://github.com/yandex/odyssey) | C | BSD-3-Clause | [v1.5.2](https://github.com/yandex/odyssey/releases/tag/v1.5.2) | 3629 | Amazon RDS Proxy (partial) |
| [Supavisor](https://github.com/supabase/supavisor) | Elixir | Apache-2.0 | [v2.9.13](https://github.com/supabase/supavisor/releases/tag/v2.9.13) signed | 2268 | Amazon RDS Proxy (partial) |

</details>

<details>
<summary><b>Database backup</b>, 3 tools</summary>

Physical backups, WAL archiving and point-in-time recovery for database servers.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [pgBackRest](https://github.com/pgbackrest/pgbackrest) | C | Other | [release/2.59.3](https://github.com/pgbackrest/pgbackrest/releases/tag/release/2.59.3) | 4422 | none |
| [WAL-G](https://github.com/wal-g/wal-g) | Go | Other | [v3.0.9](https://github.com/wal-g/wal-g/releases/tag/v3.0.9) signed | 4293 | none |
| [Barman](https://github.com/EnterpriseDB/barman) | Python | GPL-3.0 | [release/3.20.1](https://github.com/EnterpriseDB/barman/releases/tag/release/3.20.1) signed | 3252 | none |

</details>

<details>
<summary><b>Database high availability</b>, 2 tools</summary>

Manage replication and automatic failover for a cluster of database servers.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Patroni](https://github.com/patroni/patroni) | Python | MIT | [v4.1.5](https://github.com/patroni/patroni/releases/tag/v4.1.5) signed | 8762 | none |
| [pg_auto_failover](https://github.com/hapostgres/pg_auto_failover) | C | Other | [v2.2](https://github.com/hapostgres/pg_auto_failover/releases/tag/v2.2) signed | 1392 | none |

</details>

<details>
<summary><b>LLM gateways</b>, 4 tools</summary>

One OpenAI-compatible API in front of many model providers, with keys, budgets, fallbacks and usage logs.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [LiteLLM](https://github.com/BerriAI/litellm) | Python | Other | [v1.104.0](https://github.com/BerriAI/litellm/releases/tag/v1.104.0) signed | 60231 | OpenRouter (partial) |
| [New API](https://github.com/QuantumNous/new-api) | Go | AGPL-3.0 | [v1.0.0-rc.41](https://github.com/QuantumNous/new-api/releases/tag/v1.0.0-rc.41) signed | 49322 | OpenRouter (partial) |
| [Portkey Gateway](https://github.com/Portkey-AI/gateway) | TypeScript | MIT | [v1.15.2](https://github.com/Portkey-AI/gateway/releases/tag/v1.15.2) signed | 13133 | OpenRouter (partial) |
| [Bifrost](https://github.com/maximhq/bifrost) | Go | Apache-2.0 | [ent-v2.2.6-base](https://github.com/maximhq/bifrost/releases/tag/ent-v2.2.6-base) signed | 8584 | OpenRouter (partial) |

</details>

<details>
<summary><b>LLM evaluation</b>, 7 tools</summary>

Test prompts, models and agents against datasets, assertions and red-team probes, locally or in CI.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [promptfoo](https://github.com/promptfoo/promptfoo) | TypeScript | MIT | [code-scan-action-0.2.1](https://github.com/promptfoo/promptfoo/releases/tag/code-scan-action-0.2.1) signed | 25747 | Braintrust (partial) |
| [DeepEval](https://github.com/confident-ai/deepeval) | Python | Apache-2.0 | [python-v4.2.4](https://github.com/confident-ai/deepeval/releases/tag/python-v4.2.4) | 18657 | Braintrust (partial) |
| [LM Evaluation Harness](https://github.com/EleutherAI/lm-evaluation-harness) | Python | MIT | [v0.4.13](https://github.com/EleutherAI/lm-evaluation-harness/releases/tag/v0.4.13) signed | 14140 | none |
| [garak](https://github.com/NVIDIA/garak) | Python | Apache-2.0 | [v0.17.0](https://github.com/NVIDIA/garak/releases/tag/v0.17.0) signed | 9457 | none |
| [OpenCompass](https://github.com/open-compass/opencompass) | Python | Apache-2.0 | [0.5.4](https://github.com/open-compass/opencompass/releases/tag/0.5.4) signed | 7493 | none |
| [Giskard](https://github.com/Giskard-AI/giskard-oss) | Python | Apache-2.0 | [v3.0.1](https://github.com/Giskard-AI/giskard-oss/releases/tag/v3.0.1) | 5863 | none |
| [Inspect](https://github.com/UKGovernmentBEIS/inspect_ai) | Python | MIT | [0.3.276](https://github.com/UKGovernmentBEIS/inspect_ai/releases/tag/0.3.276) | 2945 | none |

</details>

<details>
<summary><b>LLM command-line tools</b>, 5 tools</summary>

Prompt language models from a terminal and pipe their answers into other commands.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Fabric](https://github.com/danielmiessler/Fabric) | Go | MIT | [v1.4.515](https://github.com/danielmiessler/Fabric/releases/tag/v1.4.515) | 44166 | ChatGPT (partial) |
| [LLM](https://github.com/simonw/llm) | Python | Apache-2.0 | [0.36](https://github.com/simonw/llm/releases/tag/0.36) | 12586 | ChatGPT (partial) |
| [ShellGPT](https://github.com/TheR1D/shell_gpt) | Python | MIT | [1.5.1](https://github.com/TheR1D/shell_gpt/releases/tag/1.5.1) signed | 12293 | ChatGPT (partial) |
| [tgpt](https://github.com/aandrew-me/tgpt) | Go | GPL-3.0 | [v2.15.0](https://github.com/aandrew-me/tgpt/releases/tag/v2.15.0) | 3270 | ChatGPT (partial) |
| [oterm](https://github.com/ggozad/oterm) | Python | MIT | [0.25.0](https://github.com/ggozad/oterm/releases/tag/0.25.0) signed | 2445 | ChatGPT (partial) |

</details>

<details>
<summary><b>LLM app builders</b>, 8 tools</summary>

Build chatbots, agents and RAG workflows in a visual editor and serve them behind an API.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Dify](https://github.com/langgenius/dify) | TypeScript | Other | [1.17.1](https://github.com/langgenius/dify/releases/tag/1.17.1) signed | 157958 | Microsoft Copilot Studio (partial) |
| [Langflow](https://github.com/langflow-ai/langflow) | Python | MIT | [v1.12.4](https://github.com/langflow-ai/langflow/releases/tag/v1.12.4) signed | 155547 | Microsoft Copilot Studio (partial) |
| [Sim](https://github.com/simstudioai/sim) | TypeScript | Apache-2.0 | [v0.9.14](https://github.com/simstudioai/sim/releases/tag/v0.9.14) signed | 29785 | Microsoft Copilot Studio (partial) |
| [FastGPT](https://github.com/labring/FastGPT) | TypeScript | Other | [v4.17.1](https://github.com/labring/FastGPT/releases/tag/v4.17.1) signed | 29784 | Microsoft Copilot Studio (partial) |
| [MaxKB](https://github.com/1Panel-dev/MaxKB) | Python | GPL-3.0 | [v2.10.6-lts](https://github.com/1Panel-dev/MaxKB/releases/tag/v2.10.6-lts) signed | 22908 | Microsoft Copilot Studio (partial) |
| [Coze Studio](https://github.com/coze-dev/coze-studio) | TypeScript | Apache-2.0 | [v0.5.1](https://github.com/coze-dev/coze-studio/releases/tag/v0.5.1) signed | 21680 | Microsoft Copilot Studio (partial) |
| [BISHENG](https://github.com/dataelement/bisheng) | Python | Apache-2.0 | [v2.6.0-fix2](https://github.com/dataelement/bisheng/releases/tag/v2.6.0-fix2) | 12027 | Microsoft Copilot Studio (partial) |
| [Rivet](https://github.com/Ironclad/rivet) | TypeScript | MIT | [app-v1.11.3](https://github.com/Ironclad/rivet/releases/tag/app-v1.11.3) | 4697 | none |

</details>

<details>
<summary><b>Document Q&A</b>, 9 tools</summary>

Ask questions about your own documents and sources through retrieval-augmented generation, with cited answers.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [RAGFlow](https://github.com/infiniflow/ragflow) | Go | Apache-2.0 | [v1.0.0-rc1](https://github.com/infiniflow/ragflow/releases/tag/v1.0.0-rc1) signed | 91731 | NotebookLM (partial) |
| [PrivateGPT](https://github.com/zylon-ai/private-gpt) | Python | Apache-2.0 | [v1.0.1](https://github.com/zylon-ai/private-gpt/releases/tag/v1.0.1) signed | 57563 | NotebookLM (partial) |
| [LightRAG](https://github.com/HKUDS/LightRAG) | Python | MIT | [v1.5.7](https://github.com/HKUDS/LightRAG/releases/tag/v1.5.7) | 39997 | none |
| [Open Notebook](https://github.com/lfnovo/open-notebook) | TypeScript | MIT | [v1.15.0](https://github.com/lfnovo/open-notebook/releases/tag/v1.15.0) signed | 39872 | NotebookLM (full) |
| [Onyx](https://github.com/onyx-dot-app/onyx) | Python | Other | [v4.8.4](https://github.com/onyx-dot-app/onyx/releases/tag/v4.8.4) signed | 32336 | Glean (full) |
| [kotaemon](https://github.com/Cinnamon/kotaemon) | Python | Apache-2.0 | [v0.12.0](https://github.com/Cinnamon/kotaemon/releases/tag/v0.12.0) | 25797 | NotebookLM (partial) |
| [DocsGPT](https://github.com/arc53/DocsGPT) | Python | MIT | [0.21.0](https://github.com/arc53/DocsGPT/releases/tag/0.21.0) signed | 18314 | Glean (partial) |
| [SurfSense](https://github.com/MODSetter/SurfSense) | Python | Other | [v2.1.0](https://github.com/MODSetter/SurfSense/releases/tag/v2.1.0) signed | 16327 | NotebookLM (full), Glean (partial) |
| [Morphik](https://github.com/morphik-org/morphik-core) | Python | Other | none | 3716 | none |

</details>

<details>
<summary><b>AI search engines</b>, 5 tools</summary>

Answer questions from live web searches with a language model, citing the pages it read.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Vane](https://github.com/ItzCrazyKns/Vane) | TypeScript | MIT | [v1.12.2](https://github.com/ItzCrazyKns/Vane/releases/tag/v1.12.2) | 37020 | Perplexity (partial) |
| [GPT Researcher](https://github.com/assafelovic/gpt-researcher) | Python | Apache-2.0 | [v3.7.0](https://github.com/assafelovic/gpt-researcher/releases/tag/v3.7.0) signed | 29932 | Perplexity (partial) |
| [Scira](https://github.com/zaidmukaddam/scira) | TypeScript | AGPL-3.0 | none | 11901 | Perplexity (partial) |
| [Local Deep Research](https://github.com/LearningCircuit/local-deep-research) | Python | MIT | [v1.10.7](https://github.com/LearningCircuit/local-deep-research/releases/tag/v1.10.7) signed | 9157 | Perplexity (partial) |
| [Morphic](https://github.com/miurla/morphic) | TypeScript | Apache-2.0 | [v1.7.0](https://github.com/miurla/morphic/releases/tag/v1.7.0) signed | 9154 | Perplexity (partial) |

</details>

<details>
<summary><b>Autonomous AI agents</b>, 6 tools</summary>

Agents that plan and carry out multi-step tasks on their own, browsing, running code and calling tools.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | Other | [autogpt-platform-beta-v0.8.2](https://github.com/Significant-Gravitas/AutoGPT/releases/tag/autogpt-platform-beta-v0.8.2) signed | 187675 | Manus (partial) |
| [OpenManus](https://github.com/FoundationAgents/OpenManus) | Python | MIT | [v0.3.0](https://github.com/FoundationAgents/OpenManus/releases/tag/v0.3.0) | 58472 | Manus (partial) |
| [UI-TARS Desktop](https://github.com/bytedance/UI-TARS-desktop) | TypeScript | Apache-2.0 | [v0.3.0](https://github.com/bytedance/UI-TARS-desktop/releases/tag/v0.3.0) | 39213 | Manus (partial) |
| [Letta](https://github.com/letta-ai/letta) | unknown | Apache-2.0 | [0.16.8](https://github.com/letta-ai/letta/releases/tag/0.16.8) signed | 25048 | none |
| [Suna](https://github.com/kortix-ai/suna) | TypeScript | Other | [v0.13.51](https://github.com/kortix-ai/suna/releases/tag/v0.13.51) signed | 20250 | Manus (partial) |
| [Agent Zero](https://github.com/agent0ai/agent-zero) | Python | Other | [v2.13](https://github.com/agent0ai/agent-zero/releases/tag/v2.13) | 19378 | Manus (partial) |

</details>

<details>
<summary><b>AI browser agents</b>, 5 tools</summary>

Let a language model drive a web browser to navigate sites, fill forms and extract data.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Browser Use](https://github.com/browser-use/browser-use) | Python | MIT | [0.13.10](https://github.com/browser-use/browser-use/releases/tag/0.13.10) signed | 117268 | none |
| [Skyvern](https://github.com/Skyvern-AI/skyvern) | Python | AGPL-3.0 | [v1.0.55](https://github.com/Skyvern-AI/skyvern/releases/tag/v1.0.55) signed | 23144 | none |
| [Browser Use Web UI](https://github.com/browser-use/web-ui) | Python | MIT | [v3.0.0](https://github.com/browser-use/web-ui/releases/tag/v3.0.0) signed | 16605 | none |
| [Nanobrowser](https://github.com/nanobrowser/nanobrowser) | TypeScript | Apache-2.0 | [v0.2.0](https://github.com/nanobrowser/nanobrowser/releases/tag/v0.2.0) | 13983 | none |
| [Steel Browser](https://github.com/steel-dev/steel-browser) | TypeScript | Apache-2.0 | [v0.5.4-beta](https://github.com/steel-dev/steel-browser/releases/tag/v0.5.4-beta) signed | 7742 | Browserbase (full) |

</details>

<details>
<summary><b>AI app builders</b>, 3 tools</summary>

Generate and edit a web app or interface from a chat prompt, with a live preview.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [screenshot-to-code](https://github.com/abi/screenshot-to-code) | Python | MIT | none | 80033 | v0 (partial) |
| [OpenUI](https://github.com/wandb/openui) | TypeScript | Apache-2.0 | none | 22567 | v0 (partial) |
| [Dyad](https://github.com/dyad-sh/dyad) | TypeScript | Other | [v1.18.0](https://github.com/dyad-sh/dyad/releases/tag/v1.18.0) | 21662 | Lovable (partial), Bolt.new (partial) |

</details>

<details>
<summary><b>Speech to text</b>, 13 tools</summary>

Transcribe recordings, meetings and dictation with speech recognition models on your own hardware.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Whisper](https://github.com/openai/whisper) | Python | MIT | [v20250625](https://github.com/openai/whisper/releases/tag/v20250625) | 110047 | none |
| [whisper.cpp](https://github.com/ggml-org/whisper.cpp) | C++ | MIT | [v1.9.4](https://github.com/ggml-org/whisper.cpp/releases/tag/v1.9.4) | 54176 | none |
| [Handy](https://github.com/cjpais/Handy) | Rust | MIT | [v0.9.8](https://github.com/cjpais/Handy/releases/tag/v0.9.8) | 33024 | Wispr Flow (partial) |
| [Meetily](https://github.com/Zackriya-Solutions/meetily) | Rust | MIT | [v0.4.1](https://github.com/Zackriya-Solutions/meetily/releases/tag/v0.4.1) signed | 31481 | Otter.ai (partial) |
| [faster-whisper](https://github.com/SYSTRAN/faster-whisper) | Python | MIT | [v1.2.1](https://github.com/SYSTRAN/faster-whisper/releases/tag/v1.2.1) signed | 25727 | none |
| [WhisperX](https://github.com/m-bain/whisperX) | Python | BSD-2-Clause | [v3.8.6](https://github.com/m-bain/whisperX/releases/tag/v3.8.6) | 24385 | none |
| [Buzz](https://github.com/chidiwilliams/buzz) | Python | MIT | [v1.4.5](https://github.com/chidiwilliams/buzz/releases/tag/v1.4.5) signed | 21848 | Otter.ai (partial) |
| [Vosk](https://github.com/alphacep/vosk-api) | Jupyter Notebook | Apache-2.0 | [v0.3.50](https://github.com/alphacep/vosk-api/releases/tag/v0.3.50) | 15165 | none |
| [Vibe](https://github.com/thewh1teagle/vibe) | TypeScript | MIT | [v3.2.2](https://github.com/thewh1teagle/vibe/releases/tag/v3.2.2) signed | 7704 | Otter.ai (partial) |
| [WhisperLive](https://github.com/collabora/WhisperLive) | Python | MIT | [v0.10.0](https://github.com/collabora/WhisperLive/releases/tag/v0.10.0) signed | 4306 | none |
| [Speaches](https://github.com/speaches-ai/speaches) | Python | MIT | [v0.9.0-rc.3](https://github.com/speaches-ai/speaches/releases/tag/v0.9.0-rc.3) | 3699 | none |
| [Scriberr](https://github.com/rishikanthc/Scriberr) | Go | MIT | [v1.2.0](https://github.com/rishikanthc/Scriberr/releases/tag/v1.2.0) | 3088 | Otter.ai (partial) |
| [Whishper](https://github.com/pluja/whishper) | Svelte | AGPL-3.0 | [v3.1.4](https://github.com/pluja/whishper/releases/tag/v3.1.4) | 3082 | Otter.ai (partial) |

</details>

<details>
<summary><b>Text to speech</b>, 9 tools</summary>

Generate speech from text, with voice cloning on some models, on your own hardware.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS) | Python | MIT | [20250606v2pro](https://github.com/RVC-Boss/GPT-SoVITS/releases/tag/20250606v2pro) signed | 62415 | ElevenLabs (partial) |
| [Fish Speech](https://github.com/fishaudio/fish-speech) | Python | Other | [v1.5.1](https://github.com/fishaudio/fish-speech/releases/tag/v1.5.1) signed | 32952 | ElevenLabs (partial) |
| [Chatterbox](https://github.com/resemble-ai/chatterbox) | Python | MIT | [v0.1.2](https://github.com/resemble-ai/chatterbox/releases/tag/v0.1.2) signed | 26761 | ElevenLabs (partial) |
| [IndexTTS](https://github.com/index-tts/index-tts) | Python | Other | [v2.5.0](https://github.com/index-tts/index-tts/releases/tag/v2.5.0) signed | 24329 | ElevenLabs (partial) |
| [CosyVoice](https://github.com/QwenAudio/CosyVoice) | Python | Apache-2.0 | [v2.0](https://github.com/QwenAudio/CosyVoice/releases/tag/v2.0) | 23848 | ElevenLabs (partial) |
| [ebook2audiobook](https://github.com/DrewThomasson/ebook2audiobook) | Python | Apache-2.0 | [v26.10.1](https://github.com/DrewThomasson/ebook2audiobook/releases/tag/v26.10.1) signed | 20291 | ElevenLabs (partial) |
| [F5-TTS](https://github.com/SWivid/F5-TTS) | Python | MIT | [1.1.22](https://github.com/SWivid/F5-TTS/releases/tag/1.1.22) signed | 15347 | ElevenLabs (partial) |
| [Piper](https://github.com/OHF-Voice/piper1-gpl) | C++ | GPL-3.0 | [v1.8.0](https://github.com/OHF-Voice/piper1-gpl/releases/tag/v1.8.0) | 5778 | ElevenLabs (partial) |
| [Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI) | Python | Apache-2.0 | [v0.9.0](https://github.com/remsky/Kokoro-FastAPI/releases/tag/v0.9.0) signed | 5513 | ElevenLabs (partial) |

</details>

<details>
<summary><b>OCR</b>, 5 tools</summary>

Recognise text in scanned documents and images.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR) | Python | Apache-2.0 | [v3.7.0](https://github.com/PaddlePaddle/PaddleOCR/releases/tag/v3.7.0) signed | 90695 | ABBYY FineReader (partial) |
| [Tesseract](https://github.com/tesseract-ocr/tesseract) | C++ | Apache-2.0 | [5.5.3](https://github.com/tesseract-ocr/tesseract/releases/tag/5.5.3) signed | 76839 | ABBYY FineReader (partial) |
| [OCRmyPDF](https://github.com/ocrmypdf/OCRmyPDF) | Python | MPL-2.0 | [v17.13.0](https://github.com/ocrmypdf/OCRmyPDF/releases/tag/v17.13.0) | 34945 | ABBYY FineReader (partial), Adobe Acrobat (partial) |
| [Surya](https://github.com/datalab-to/surya) | Python | Apache-2.0 | [v0.22.1](https://github.com/datalab-to/surya/releases/tag/v0.22.1) signed | 21454 | ABBYY FineReader (partial) |
| [docTR](https://github.com/mindee/doctr) | Python | Apache-2.0 | [v1.1.0](https://github.com/mindee/doctr/releases/tag/v1.1.0) signed | 6379 | none |

</details>

<details>
<summary><b>Document parsing</b>, 5 tools</summary>

Convert PDFs, office files and scans into Markdown or JSON that language models and pipelines can read.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [MarkItDown](https://github.com/microsoft/markitdown) | Python | MIT | [v0.1.8](https://github.com/microsoft/markitdown/releases/tag/v0.1.8) | 188833 | LlamaParse (partial) |
| [MinerU](https://github.com/opendatalab/MinerU) | Python | Other | [mineru-4.0.10-released](https://github.com/opendatalab/MinerU/releases/tag/mineru-4.0.10-released) | 81163 | LlamaParse (full) |
| [Docling](https://github.com/docling-project/docling) | Python | MIT | [v2.134.0](https://github.com/docling-project/docling/releases/tag/v2.134.0) | 68452 | LlamaParse (full), Amazon Textract (partial) |
| [Marker](https://github.com/datalab-to/marker) | Python | Apache-2.0 | [v2.0.0](https://github.com/datalab-to/marker/releases/tag/v2.0.0) signed | 40223 | LlamaParse (full) |
| [Unstructured](https://github.com/Unstructured-IO/unstructured) | HTML | Apache-2.0 | [0.27.16](https://github.com/Unstructured-IO/unstructured/releases/tag/0.27.16) signed | 15532 | LlamaParse (partial) |

</details>

<details>
<summary><b>Model fine-tuning</b>, 8 tools</summary>

Fine-tune language and diffusion models on your own data and GPUs.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Unsloth](https://github.com/unslothai/unsloth) | Python | Apache-2.0 | [v0.1.902-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.902-beta) | 77273 | none |
| [LLaMA-Factory](https://github.com/hiyouga/LlamaFactory) | Python | Apache-2.0 | [v0.9.5](https://github.com/hiyouga/LlamaFactory/releases/tag/v0.9.5) signed | 75334 | none |
| [TRL](https://github.com/huggingface/trl) | Python | Apache-2.0 | [v1.14.1](https://github.com/huggingface/trl/releases/tag/v1.14.1) | 19456 | none |
| [Kohya's GUI](https://github.com/bmaltais/kohya_ss) | Python | Apache-2.0 | [v26.0.0](https://github.com/bmaltais/kohya_ss/releases/tag/v26.0.0) signed | 12614 | none |
| [Axolotl](https://github.com/axolotl-ai-cloud/axolotl) | Python | Apache-2.0 | [v0.20.0](https://github.com/axolotl-ai-cloud/axolotl/releases/tag/v0.20.0) signed | 12525 | none |
| [AI Toolkit](https://github.com/ostris/ai-toolkit) | Python | MIT | none | 12212 | none |
| [torchtune](https://github.com/meta-pytorch/torchtune) | Python | BSD-3-Clause | [v0.6.1](https://github.com/meta-pytorch/torchtune/releases/tag/v0.6.1) signed | 5810 | none |
| [OneTrainer](https://github.com/Nerogar/OneTrainer) | Python | AGPL-3.0 | [pre-upgrade](https://github.com/Nerogar/OneTrainer/releases/tag/pre-upgrade) signed | 3227 | none |

</details>

<details>
<summary><b>Experiment tracking</b>, 7 tools</summary>

Log the metrics, parameters and artefacts of training runs and compare them in a dashboard.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [MLflow](https://github.com/mlflow/mlflow) | Python | Apache-2.0 | [v3.16.1](https://github.com/mlflow/mlflow/releases/tag/v3.16.1) signed | 28286 | Weights & Biases (full), Comet (full) |
| [DVC](https://github.com/treeverse/dvc) | Python | Apache-2.0 | [3.67.1](https://github.com/treeverse/dvc/releases/tag/3.67.1) signed | 15902 | Weights & Biases (partial) |
| [TensorBoard](https://github.com/tensorflow/tensorboard) | TypeScript | Apache-2.0 | [2.21.0](https://github.com/tensorflow/tensorboard/releases/tag/2.21.0) | 7231 | Weights & Biases (partial) |
| [ClearML](https://github.com/clearml/clearml) | Python | Apache-2.0 | [v2.1.12](https://github.com/clearml/clearml/releases/tag/v2.1.12) signed | 6900 | Weights & Biases (full), Comet (full) |
| [Aim](https://github.com/aimhubio/aim) | Python | Apache-2.0 | [v3.29.1](https://github.com/aimhubio/aim/releases/tag/v3.29.1) | 6278 | Weights & Biases (partial) |
| [Polyaxon](https://github.com/polyaxon/polyaxon) | MDX | Apache-2.0 | [v2.17.0](https://github.com/polyaxon/polyaxon/releases/tag/v2.17.0) | 3739 | Weights & Biases (partial) |
| [Trackio](https://github.com/gradio-app/trackio) | Python | MIT | [trackio@0.40.0](https://github.com/gradio-app/trackio/releases/tag/trackio%400.40.0) | 1709 | Weights & Biases (drop-in) |

</details>

<details>
<summary><b>ML pipelines</b>, 5 tools</summary>

Define, run and track machine learning pipelines from data preparation to deployment.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Kedro](https://github.com/kedro-org/kedro) | Python | Other | [1.7.0](https://github.com/kedro-org/kedro/releases/tag/1.7.0) signed | 11015 | none |
| [Metaflow](https://github.com/Netflix/metaflow) | Python | Apache-2.0 | [2.19.39](https://github.com/Netflix/metaflow/releases/tag/2.19.39) signed | 10293 | Amazon SageMaker (partial) |
| [ZenML](https://github.com/zenml-io/zenml) | Python | Apache-2.0 | [0.97.0](https://github.com/zenml-io/zenml/releases/tag/0.97.0) signed | 5607 | Amazon SageMaker (partial) |
| [Kubeflow Pipelines](https://github.com/kubeflow/pipelines) | Go | Apache-2.0 | [2.17.2](https://github.com/kubeflow/pipelines/releases/tag/2.17.2) signed | 4235 | Vertex AI (partial), Amazon SageMaker (partial) |
| [MLRun](https://github.com/mlrun/mlrun) | Python | Apache-2.0 | [v1.12.0](https://github.com/mlrun/mlrun/releases/tag/v1.12.0) | 1702 | Amazon SageMaker (partial) |

</details>

<details>
<summary><b>Model serving</b>, 4 tools</summary>

Serve trained machine learning models behind an API, with batching, scaling and versioning.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Triton Inference Server](https://github.com/triton-inference-server/server) | Python | BSD-3-Clause | [v2.73.0](https://github.com/triton-inference-server/server/releases/tag/v2.73.0) signed | 11047 | Amazon SageMaker (partial) |
| [BentoML](https://github.com/bentoml/BentoML) | Python | Apache-2.0 | [v1.4.39](https://github.com/bentoml/BentoML/releases/tag/v1.4.39) signed | 8880 | Amazon SageMaker (partial) |
| [KServe](https://github.com/kserve/kserve) | Go | Apache-2.0 | [v0.21.0](https://github.com/kserve/kserve/releases/tag/v0.21.0) signed | 6082 | Amazon SageMaker (partial) |
| [MLServer](https://github.com/SeldonIO/MLServer) | Python | Apache-2.0 | [1.7.1](https://github.com/SeldonIO/MLServer/releases/tag/1.7.1) | 900 | Amazon SageMaker (partial) |

</details>

<details>
<summary><b>Data labeling</b>, 6 tools</summary>

Annotate images, video, text and audio to build training and evaluation datasets.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Label Studio](https://github.com/HumanSignal/label-studio) | TypeScript | Apache-2.0 | [1.23.2](https://github.com/HumanSignal/label-studio/releases/tag/1.23.2) | 28409 | Labelbox (full) |
| [CVAT](https://github.com/cvat-ai/cvat) | Python | MIT | [v2.77.0](https://github.com/cvat-ai/cvat/releases/tag/v2.77.0) signed | 16864 | Labelbox (partial) |
| [Labelme](https://github.com/wkentaro/labelme) | Python | GPL-3.0 | [v7.8.0](https://github.com/wkentaro/labelme/releases/tag/v7.8.0) signed | 16208 | Labelbox (partial) |
| [doccano](https://github.com/doccano/doccano) | Python | MIT | [v1.8.5](https://github.com/doccano/doccano/releases/tag/v1.8.5) | 10793 | Labelbox (partial) |
| [X-AnyLabeling](https://github.com/CVHub520/X-AnyLabeling) | Python | GPL-3.0 | [v4.1.0](https://github.com/CVHub520/X-AnyLabeling/releases/tag/v4.1.0) | 10604 | Labelbox (partial) |
| [Argilla](https://github.com/argilla-io/argilla) | Python | Apache-2.0 | [v2.8.0](https://github.com/argilla-io/argilla/releases/tag/v2.8.0) | 5139 | Labelbox (partial) |

</details>

<details>
<summary><b>AutoML</b>, 5 tools</summary>

Train, tune and compare models automatically from tabular, text or image data.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Ludwig](https://github.com/ludwig-ai/ludwig) | Python | Apache-2.0 | [v0.17.9](https://github.com/ludwig-ai/ludwig/releases/tag/v0.17.9) | 11773 | DataRobot (partial) |
| [AutoGluon](https://github.com/autogluon/autogluon) | Python | Apache-2.0 | [v1.6.3](https://github.com/autogluon/autogluon/releases/tag/v1.6.3) signed | 10763 | DataRobot (partial) |
| [PyCaret](https://github.com/pycaret/pycaret) | Python | Other | [3.3.2](https://github.com/pycaret/pycaret/releases/tag/3.3.2) | 9850 | DataRobot (partial) |
| [H2O-3](https://github.com/h2oai/h2o-3) | Jupyter Notebook | Apache-2.0 | [gha-3.47.0.36](https://github.com/h2oai/h2o-3/releases/tag/gha-3.47.0.36) | 7509 | DataRobot (partial) |
| [FLAML](https://github.com/microsoft/FLAML) | Jupyter Notebook | MIT | [v2.7.0](https://github.com/microsoft/FLAML/releases/tag/v2.7.0) signed | 4404 | DataRobot (partial) |

</details>

<details>
<summary><b>Feedback boards</b>, 3 tools</summary>

Collect feature requests, let users vote on them and publish a roadmap.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Fider](https://github.com/getfider/fider) | Go | AGPL-3.0 | [v0.38.2](https://github.com/getfider/fider/releases/tag/v0.38.2) signed | 4562 | Canny (full) |
| [LogChimp](https://github.com/logchimp/logchimp) | TypeScript | Other | [v0.9.2](https://github.com/logchimp/logchimp/releases/tag/v0.9.2) | 1133 | Canny (full) |
| [ClearFlask](https://github.com/clearflask/clearflask) | Java | Apache-2.0 | [2.6.4](https://github.com/clearflask/clearflask/releases/tag/2.6.4) | 451 | Canny (full) |

</details>

<details>
<summary><b>Inventory and asset management</b>, 5 tools</summary>

Track stock, parts and equipment, and who has them where.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Snipe-IT](https://github.com/grokability/snipe-it) | PHP | AGPL-3.0 | [v8.8.0](https://github.com/grokability/snipe-it/releases/tag/v8.8.0) | 15007 | none |
| [InvenTree](https://github.com/inventree/InvenTree) | Python | MIT | [1.5.6](https://github.com/inventree/InvenTree/releases/tag/1.5.6) signed | 7675 | none |
| [Shelf](https://github.com/Shelf-nu/shelf.nu) | TypeScript | Other | [shelf@2.3.0](https://github.com/Shelf-nu/shelf.nu/releases/tag/shelf%402.3.0) signed | 3023 | none |
| [Part-DB](https://github.com/Part-DB/Part-DB-server) | PHP | AGPL-3.0 | [v2.19.2](https://github.com/Part-DB/Part-DB-server/releases/tag/v2.19.2) | 1788 | none |
| [OpenBoxes](https://github.com/openboxes/openboxes) | Groovy | EPL-1.0 | [v0.9.8-hotfix1](https://github.com/openboxes/openboxes/releases/tag/v0.9.8-hotfix1) | 910 | none |

</details>

<details>
<summary><b>Learning platforms</b>, 9 tools</summary>

Courses, assignments and grades for schools, universities and companies.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Open edX](https://github.com/openedx/openedx-platform) | Python | AGPL-3.0 | [named-release/birch](https://github.com/openedx/openedx-platform/releases/tag/named-release/birch) | 8199 | Teachable (partial), Blackboard Learn (partial) |
| [Canvas LMS](https://github.com/instructure/canvas-lms) | Ruby | AGPL-3.0 | [release/2026-05-20.143](https://github.com/instructure/canvas-lms/releases/tag/release/2026-05-20.143) | 6862 | Blackboard Learn (full) |
| [Frappe Learning](https://github.com/frappe/lms) | TypeScript | AGPL-3.0 | [v2.64.0](https://github.com/frappe/lms/releases/tag/v2.64.0) | 3286 | Teachable (partial) |
| [ClassroomIO](https://github.com/classroomio/classroomio) | TypeScript | AGPL-3.0 | [v1.0.0](https://github.com/classroomio/classroomio/releases/tag/v1.0.0) | 1710 | Teachable (partial) |
| [Sakai](https://github.com/sakaiproject/sakai) | Java | ECL-2.0 | [25.2](https://github.com/sakaiproject/sakai/releases/tag/25.2) | 1234 | Blackboard Learn (full) |
| [Kolibri](https://github.com/learningequality/kolibri) | Python | MIT | [v0.19.5](https://github.com/learningequality/kolibri/releases/tag/v0.19.5) signed | 1133 | none |
| [Chamilo](https://github.com/chamilo/chamilo-lms) | PHP | GPL-3.0 | [v3.0.1](https://github.com/chamilo/chamilo-lms/releases/tag/v3.0.1) | 1008 | Blackboard Learn (full) |
| [Gibbon](https://github.com/GibbonEdu/core) | PHP | GPL-3.0 | [v30.0.01](https://github.com/GibbonEdu/core/releases/tag/v30.0.01) | 634 | none |
| [ILIAS](https://github.com/ILIAS-eLearning/ILIAS) | PHP | GPL-3.0 | [v11.5](https://github.com/ILIAS-eLearning/ILIAS/releases/tag/v11.5) | 505 | Blackboard Learn (full) |

</details>

<details>
<summary><b>Flashcards</b>, 2 tools</summary>

Learn with spaced repetition flashcards.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Anki](https://github.com/ankitects/anki) | Rust | Other | [26.09.3](https://github.com/ankitects/anki/releases/tag/26.09.3) | 31802 | Quizlet (partial) |
| [AnkiDroid](https://github.com/ankidroid/Anki-Android) | Kotlin | GPL-3.0 | [v2.25.0](https://github.com/ankidroid/Anki-Android/releases/tag/v2.25.0) | 11944 | Quizlet (partial) |

</details>

<details>
<summary><b>Typesetting</b>, 4 tools</summary>

Write documents in a markup language such as LaTeX or Typst and compile them to PDF.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Typst](https://github.com/typst/typst) | Rust | Apache-2.0 | [v0.15.1](https://github.com/typst/typst/releases/tag/v0.15.1) | 56440 | none |
| [Overleaf](https://github.com/overleaf/overleaf) | JavaScript | AGPL-3.0 | [v0.1.3](https://github.com/overleaf/overleaf/releases/tag/v0.1.3) | 18212 | none |
| [Tectonic](https://github.com/tectonic-typesetting/tectonic) | C | Other | [tectonic@0.17.0](https://github.com/tectonic-typesetting/tectonic/releases/tag/tectonic%400.17.0) | 5146 | none |
| [TeXstudio](https://github.com/texstudio-org/texstudio) | C++ | GPL-3.0 | [4.9.8](https://github.com/texstudio-org/texstudio/releases/tag/4.9.8) | 3657 | none |

</details>

<details>
<summary><b>Reference managers</b>, 2 tools</summary>

Collect papers and sources, organise them and cite them in documents.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Zotero](https://github.com/zotero/zotero) | JavaScript | Other | [10.0.5](https://github.com/zotero/zotero/releases/tag/10.0.5) | 15484 | Mendeley (full), EndNote (full) |
| [JabRef](https://github.com/JabRef/jabref) | Java | MIT | [v5.15](https://github.com/JabRef/jabref/releases/tag/v5.15) | 4788 | Mendeley (partial), EndNote (partial) |

</details>

<details>
<summary><b>SIEM and security monitoring</b>, 3 tools</summary>

Collect security events and logs from hosts and networks, correlate them and raise alerts on threats.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Wazuh](https://github.com/wazuh/wazuh) | C++ | Other | [v4.14.8](https://github.com/wazuh/wazuh/releases/tag/v4.14.8) signed | 17133 | Splunk (partial), CrowdStrike Falcon (partial) |
| [Security Onion](https://github.com/Security-Onion-Solutions/securityonion) | Shell | Other | [3.3.0-20260911](https://github.com/Security-Onion-Solutions/securityonion/releases/tag/3.3.0-20260911) signed | 4917 | Splunk (partial) |
| [Malcolm](https://github.com/cisagov/Malcolm) | Python | Other | [v26.09.0](https://github.com/cisagov/Malcolm/releases/tag/v26.09.0) signed | 2539 | none |

</details>

<details>
<summary><b>Intrusion detection</b>, 9 tools</summary>

Watch network traffic or hosts for attacks, and report or block what matches.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Fail2ban](https://github.com/fail2ban/fail2ban) | Python | Other | [1.1.1](https://github.com/fail2ban/fail2ban/releases/tag/1.1.1) signed | 18725 | none |
| [CrowdSec](https://github.com/crowdsecurity/crowdsec) | Go | MIT | [v1.8.1](https://github.com/crowdsecurity/crowdsec/releases/tag/v1.8.1) signed | 15087 | Fail2ban (full) |
| [Maltrail](https://github.com/stamparm/maltrail) | Python | MIT | [3.4](https://github.com/stamparm/maltrail/releases/tag/3.4) | 8620 | none |
| [Zeek](https://github.com/zeek/zeek) | C++ | Other | [v9.0.0](https://github.com/zeek/zeek/releases/tag/v9.0.0) | 8071 | none |
| [Arkime](https://github.com/arkime/arkime) | C | Apache-2.0 | [v6.8.0](https://github.com/arkime/arkime/releases/tag/v6.8.0) signed | 7525 | none |
| [Suricata](https://github.com/OISF/suricata) | C | GPL-2.0 | [suricata-8.0.7](https://github.com/OISF/suricata/releases/tag/suricata-8.0.7) | 6700 | none |
| [OSSEC](https://github.com/ossec/ossec-hids) | C | GPL-2.0 | [4.4.0](https://github.com/ossec/ossec-hids/releases/tag/4.4.0) signed | 5062 | none |
| [Snort 3](https://github.com/snort3/snort3) | C++ | Other | [3.12.2.0](https://github.com/snort3/snort3/releases/tag/3.12.2.0) signed | 3433 | none |
| [AIDE](https://github.com/aide/aide) | C | GPL-2.0 | [v0.19.4](https://github.com/aide/aide/releases/tag/v0.19.4) signed | 752 | none |

</details>

<details>
<summary><b>Container runtime security</b>, 5 tools</summary>

Detect and block suspicious behaviour in running containers and Kubernetes workloads.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Falco](https://github.com/falcosecurity/falco) | C++ | Apache-2.0 | [0.45.0](https://github.com/falcosecurity/falco/releases/tag/0.45.0) | 9455 | Sysdig Secure (partial) |
| [Tetragon](https://github.com/cilium/tetragon) | C | Apache-2.0 | [v1.7.1](https://github.com/cilium/tetragon/releases/tag/v1.7.1) | 5060 | Sysdig Secure (partial) |
| [Tracee](https://github.com/aquasecurity/tracee) | Go | Apache-2.0 | [v0.24.1](https://github.com/aquasecurity/tracee/releases/tag/v0.24.1) signed | 4632 | none |
| [KubeArmor](https://github.com/kubearmor/KubeArmor) | Go | Apache-2.0 | [v1.7.6-rc5](https://github.com/kubearmor/KubeArmor/releases/tag/v1.7.6-rc5) signed | 2623 | none |
| [NeuVector](https://github.com/neuvector/neuvector) | Go | Apache-2.0 | [v5.6.2](https://github.com/neuvector/neuvector/releases/tag/v5.6.2) | 1346 | Sysdig Secure (full) |

</details>

<details>
<summary><b>Endpoint detection and forensics</b>, 5 tools</summary>

Query laptops and servers, hunt for threats on them and collect forensic evidence.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [osquery](https://github.com/osquery/osquery) | C++ | Other | [5.23.1](https://github.com/osquery/osquery/releases/tag/5.23.1) | 23617 | none |
| [GRR Rapid Response](https://github.com/google/grr) | Python | Apache-2.0 | [v.4.0.0.0-release](https://github.com/google/grr/releases/tag/v.4.0.0.0-release) signed | 5088 | none |
| [Velociraptor](https://github.com/Velocidex/velociraptor) | Go | Other | [v0.77.3](https://github.com/Velocidex/velociraptor/releases/tag/v0.77.3) | 4302 | CrowdStrike Falcon (partial) |
| [Chainsaw](https://github.com/WithSecureOpenSource/chainsaw) | Rust | GPL-3.0 | [v2.16.5](https://github.com/WithSecureOpenSource/chainsaw/releases/tag/v2.16.5) signed | 3682 | none |
| [Hayabusa](https://github.com/Yamato-Security/hayabusa) | Rust | AGPL-3.0 | [v4.1.0](https://github.com/Yamato-Security/hayabusa/releases/tag/v4.1.0) signed | 3383 | none |

</details>

<details>
<summary><b>Device management</b>, 5 tools</summary>

Enroll, configure, patch and inventory laptops, phones and servers from one console.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Fleet](https://github.com/fleetdm/fleet) | Go | Other | [fleet-v4.92.3](https://github.com/fleetdm/fleet/releases/tag/fleet-v4.92.3) signed | 6951 | Jamf Pro (full), Microsoft Intune (partial) |
| [Tactical RMM](https://github.com/amidaware/tacticalrmm) | Python | Other | [v1.5.2](https://github.com/amidaware/tacticalrmm/releases/tag/v1.5.2) | 4495 | NinjaOne (full) |
| [MicroMDM](https://github.com/micromdm/micromdm) | Go | MIT | [v1.13.1](https://github.com/micromdm/micromdm/releases/tag/v1.13.1) | 2682 | Jamf Pro (partial) |
| [NanoMDM](https://github.com/micromdm/nanomdm) | Go | MIT | [v0.9.0](https://github.com/micromdm/nanomdm/releases/tag/v0.9.0) signed | 673 | Jamf Pro (partial) |
| [Headwind MDM](https://github.com/h-mdm/hmdm-server) | Java | Apache-2.0 | [v5.41.1](https://github.com/h-mdm/hmdm-server/releases/tag/v5.41.1) | 554 | Microsoft Intune (partial) |

</details>

<details>
<summary><b>Web application firewalls</b>, 6 tools</summary>

Inspect HTTP traffic and block attacks, bots and abuse before they reach an application.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Anubis](https://github.com/TecharoHQ/anubis) | Go | MIT | [v1.27.0](https://github.com/TecharoHQ/anubis/releases/tag/v1.27.0) | 23124 | Cloudflare WAF (partial) |
| [SafeLine](https://github.com/chaitin/SafeLine) | Go | GPL-3.0 | [v9.4.2](https://github.com/chaitin/SafeLine/releases/tag/v9.4.2) signed | 22709 | Cloudflare WAF (full) |
| [ModSecurity](https://github.com/owasp-modsecurity/ModSecurity) | C++ | Apache-2.0 | [v3.0.17](https://github.com/owasp-modsecurity/ModSecurity/releases/tag/v3.0.17) signed | 9791 | Cloudflare WAF (partial) |
| [Coraza](https://github.com/corazawaf/coraza) | Go | Apache-2.0 | [v3.8.1](https://github.com/corazawaf/coraza/releases/tag/v3.8.1) signed | 3874 | Cloudflare WAF (partial) |
| [OWASP CRS](https://github.com/coreruleset/coreruleset) | Python | Apache-2.0 | [v4.30.0](https://github.com/coreruleset/coreruleset/releases/tag/v4.30.0) signed | 3291 | none |
| [open-appsec](https://github.com/openappsec/openappsec) | C++ | Apache-2.0 | [1.1.36](https://github.com/openappsec/openappsec/releases/tag/1.1.36) signed | 1718 | Cloudflare WAF (partial) |

</details>

<details>
<summary><b>Firewalls and routers</b>, 3 tools</summary>

Firewall and router systems that filter traffic for a host or a whole network.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [OPNsense](https://github.com/opnsense/core) | PHP | BSD-2-Clause | [26.7.5](https://github.com/opnsense/core/releases/tag/26.7.5) | 4710 | none |
| [firewalld](https://github.com/firewalld/firewalld) | Python | GPL-2.0 | [v2.5.2](https://github.com/firewalld/firewalld/releases/tag/v2.5.2) | 1049 | none |
| [VyOS](https://github.com/vyos/vyos-1x) | Python | LGPL-2.1 | [1.4.0](https://github.com/vyos/vyos-1x/releases/tag/1.4.0) | 497 | none |

</details>

<details>
<summary><b>Application firewalls</b>, 7 tools</summary>

Show and control which apps on a computer or phone may connect to the network.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [OpenSnitch](https://github.com/evilsocket/opensnitch) | Python | GPL-3.0 | [v1.8.0](https://github.com/evilsocket/opensnitch/releases/tag/v1.8.0) signed | 14129 | Little Snitch (full) |
| [Portmaster](https://github.com/safing/portmaster) | Go | GPL-3.0 | [v2.2.3](https://github.com/safing/portmaster/releases/tag/v2.2.3) | 13882 | Little Snitch (full), GlassWire (full) |
| [LuLu](https://github.com/objective-see/LuLu) | Objective-C | GPL-3.0 | [v4.5.1](https://github.com/objective-see/LuLu/releases/tag/v4.5.1) | 13290 | Little Snitch (partial) |
| [simplewall](https://github.com/henrypp/simplewall) | C | GPL-3.0 | [v.3.8.7](https://github.com/henrypp/simplewall/releases/tag/v.3.8.7) signed | 9106 | GlassWire (partial) |
| [Rethink DNS + Firewall](https://github.com/celzero/rethink-app) | Kotlin | Apache-2.0 | [v0.5.7](https://github.com/celzero/rethink-app/releases/tag/v0.5.7) signed | 5538 | GlassWire (partial) |
| [Blokada](https://github.com/blokadaorg/blokada) | Dart | MPL-2.0 | [android.v5.23.2.1](https://github.com/blokadaorg/blokada/releases/tag/android.v5.23.2.1) | 3265 | none |
| [TrackerControl](https://github.com/TrackerControl/tracker-control-android) | Java | GPL-3.0 | [2026080501](https://github.com/TrackerControl/tracker-control-android/releases/tag/2026080501) | 2665 | none |

</details>

<details>
<summary><b>VPN servers</b>, 9 tools</summary>

Run a remote-access or site-to-site VPN server for your users and networks.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Algo VPN](https://github.com/trailofbits/algo) | Python | AGPL-3.0 | [v2.0.1](https://github.com/trailofbits/algo/releases/tag/v2.0.1) signed | 30410 | none |
| [wg-easy](https://github.com/wg-easy/wg-easy) | TypeScript | AGPL-3.0 | [v15.4.0](https://github.com/wg-easy/wg-easy/releases/tag/v15.4.0) | 27074 | OpenVPN Access Server (partial) |
| [OpenVPN](https://github.com/OpenVPN/openvpn) | C | Other | [v2.7.7](https://github.com/OpenVPN/openvpn/releases/tag/v2.7.7) | 14644 | OpenVPN Access Server (partial) |
| [SoftEther VPN](https://github.com/SoftEtherVPN/SoftEtherVPN) | C | Apache-2.0 | [5.2.5188](https://github.com/SoftEtherVPN/SoftEtherVPN/releases/tag/5.2.5188) signed | 13613 | none |
| [Outline Server](https://github.com/OutlineFoundation/outline-server) | TypeScript | Apache-2.0 | [server-v1.12.3](https://github.com/OutlineFoundation/outline-server/releases/tag/server-v1.12.3) signed | 6257 | none |
| [Pritunl](https://github.com/pritunl/pritunl) | Python | Other | [1.34.4763.45](https://github.com/pritunl/pritunl/releases/tag/1.34.4763.45) signed | 5030 | OpenVPN Access Server (full) |
| [WGDashboard](https://github.com/WGDashboard/WGDashboard) | Vue | Apache-2.0 | [v4.3.3](https://github.com/WGDashboard/WGDashboard/releases/tag/v4.3.3) signed | 3740 | none |
| [strongSwan](https://github.com/strongswan/strongswan) | C | Other | [6.1.0](https://github.com/strongswan/strongswan/releases/tag/6.1.0) | 2999 | none |
| [WireGuard Portal](https://github.com/h44z/wg-portal) | Go | MIT | [v2.3.1](https://github.com/h44z/wg-portal/releases/tag/v2.3.1) signed | 1837 | OpenVPN Access Server (partial) |

</details>

<details>
<summary><b>Web file managers</b>, 3 tools</summary>

Browse, upload and share files on a server or storage back end from a browser.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [copyparty](https://github.com/9001/copyparty) | Python | MIT | [v1.20.25](https://github.com/9001/copyparty/releases/tag/v1.20.25) | 46918 | none |
| [Filestash](https://github.com/mickael-kerjean/filestash) | Go | AGPL-3.0 | [v0.4](https://github.com/mickael-kerjean/filestash/releases/tag/v0.4) | 14766 | none |
| [Cloud Commander](https://github.com/coderaiser/cloudcmd) | JavaScript | MIT | [v19.21.1](https://github.com/coderaiser/cloudcmd/releases/tag/v19.21.1) | 2031 | none |

</details>

<details>
<summary><b>Direct file transfer</b>, 4 tools</summary>

Send files straight from one device to another, nearby or through a relay, without uploading them to a storage service.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [LocalSend](https://github.com/localsend/localsend) | Dart | Apache-2.0 | [v1.18.2](https://github.com/localsend/localsend/releases/tag/v1.18.2) signed | 93515 | AirDrop (full) |
| [croc](https://github.com/schollz/croc) | Go | MIT | [v11.5.4](https://github.com/schollz/croc/releases/tag/v11.5.4) | 40522 | WeTransfer (partial) |
| [Magic Wormhole](https://github.com/magic-wormhole/magic-wormhole) | Python | MIT | [0.24.0](https://github.com/magic-wormhole/magic-wormhole/releases/tag/0.24.0) signed | 22973 | WeTransfer (partial) |
| [PairDrop](https://github.com/schlagmichdoch/PairDrop) | JavaScript | GPL-3.0 | [v1.11.2](https://github.com/schlagmichdoch/PairDrop/releases/tag/v1.11.2) | 11531 | AirDrop (partial) |

</details>

<details>
<summary><b>Inventory of belongings</b>, 2 tools</summary>

Catalogue the things a household owns or collects, with locations, photos and warranties.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [HomeBox](https://github.com/sysadminsmedia/homebox) | Go | AGPL-3.0 | [v0.26.2](https://github.com/sysadminsmedia/homebox/releases/tag/v0.26.2) signed | 7455 | Sortly (partial) |
| [Koillection](https://github.com/benjaminjonard/koillection) | PHP | MIT | [1.8.4](https://github.com/benjaminjonard/koillection/releases/tag/1.8.4) | 1327 | none |

</details>

<details>
<summary><b>Genealogy</b>, 4 tools</summary>

Build family trees with sources and events, and share them with relatives.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Gramps](https://github.com/gramps-project/gramps) | Python | GPL-2.0 | [v6.0.8](https://github.com/gramps-project/gramps/releases/tag/v6.0.8) | 3126 | Ancestry (partial) |
| [Gramps Web](https://github.com/gramps-project/gramps-web) | JavaScript | AGPL-3.0 | [v26.10.0](https://github.com/gramps-project/gramps-web/releases/tag/v26.10.0) | 1718 | Ancestry (partial), MyHeritage (partial) |
| [webtrees](https://github.com/fisharebest/webtrees) | PHP | GPL-3.0 | [2.2.6](https://github.com/fisharebest/webtrees/releases/tag/2.2.6) | 824 | MyHeritage (partial) |
| [GeneWeb](https://github.com/geneweb/geneweb) | OCaml | GPL-2.0 | [v7.1.0-beta2](https://github.com/geneweb/geneweb/releases/tag/v7.1.0-beta2) | 401 | MyHeritage (partial) |

</details>

<details>
<summary><b>Location history</b>, 4 tools</summary>

Record where your devices have been and browse the history on a map.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Dawarich](https://github.com/Freika/dawarich) | Ruby | AGPL-3.0 | [1.15.3](https://github.com/Freika/dawarich/releases/tag/1.15.3) signed | 10601 | Google Maps Timeline (full) |
| [Traccar](https://github.com/traccar/traccar) | Java | Apache-2.0 | [v6.16.0](https://github.com/traccar/traccar/releases/tag/v6.16.0) | 7840 | none |
| [Reitti](https://github.com/dedicatedcode/reitti) | Java | AGPL-3.0 | [v5.6.1](https://github.com/dedicatedcode/reitti/releases/tag/v5.6.1) signed | 2624 | Google Maps Timeline (full) |
| [OwnTracks Recorder](https://github.com/owntracks/recorder) | C | Other | [1.0.4](https://github.com/owntracks/recorder/releases/tag/1.0.4) signed | 1211 | Google Maps Timeline (partial) |

</details>

<details>
<summary><b>Travel and trail planning</b>, 2 tools</summary>

Plan trips and hikes and keep a log of the places you have been.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [wanderer](https://github.com/open-wanderer/wanderer) | Go | AGPL-3.0 | [v0.21.0](https://github.com/open-wanderer/wanderer/releases/tag/v0.21.0) signed | 3954 | AllTrails (partial) |
| [AdventureLog](https://github.com/seanmorley15/AdventureLog) | Svelte | Other | [v0.13.0](https://github.com/seanmorley15/AdventureLog/releases/tag/v0.13.0) signed | 3792 | TripIt (partial) |

</details>

<details>
<summary><b>Maps and navigation</b>, 4 tools</summary>

Map apps with search and turn-by-turn directions, built on open map data.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Organic Maps](https://github.com/organicmaps/organicmaps) | C++ | Other | [2026.09.29-32-android](https://github.com/organicmaps/organicmaps/releases/tag/2026.09.29-32-android) | 15598 | Google Maps (partial) |
| [OsmAnd](https://github.com/osmandapp/OsmAnd) | Java | Other | [2.0.0](https://github.com/osmandapp/OsmAnd/releases/tag/2.0.0) | 6062 | Google Maps (partial) |
| [StreetComplete](https://github.com/streetcomplete/StreetComplete) | Kotlin | GPL-3.0 | [v63.4](https://github.com/streetcomplete/StreetComplete/releases/tag/v63.4) | 5039 | none |
| [Headway](https://github.com/headwaymaps/headway) | Rust | Apache-2.0 | [v0.14.2](https://github.com/headwaymaps/headway/releases/tag/v0.14.2) signed | 3005 | Google Maps (partial) |

</details>

<details>
<summary><b>Map services</b>, 8 tools</summary>

Serve map tiles, routing and geocoding from OpenStreetMap data behind your own API.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [OSRM](https://github.com/Project-OSRM/osrm-backend) | C++ | BSD-2-Clause | [v26.10.0](https://github.com/Project-OSRM/osrm-backend/releases/tag/v26.10.0) | 8126 | Google Maps Platform (partial) |
| [GraphHopper](https://github.com/graphhopper/graphhopper) | Java | Apache-2.0 | [11.1](https://github.com/graphhopper/graphhopper/releases/tag/11.1) signed | 6720 | Google Maps Platform (partial) |
| [Valhalla](https://github.com/valhalla/valhalla) | C++ | Other | [3.9.1](https://github.com/valhalla/valhalla/releases/tag/3.9.1) signed | 6289 | Google Maps Platform (partial) |
| [Nominatim](https://github.com/osm-search/Nominatim) | Python | GPL-3.0 | [v5.3.2](https://github.com/osm-search/Nominatim/releases/tag/v5.3.2) | 4512 | Google Maps Platform (partial) |
| [Martin](https://github.com/maplibre/martin) | Rust | Apache-2.0 | [martin-v1.16.1](https://github.com/maplibre/martin/releases/tag/martin-v1.16.1) | 3973 | Mapbox (partial) |
| [Pelias](https://github.com/pelias/pelias) | Twig | MIT | none | 3593 | Google Maps Platform (partial) |
| [Photon](https://github.com/komoot/photon) | Java | Apache-2.0 | [1.3.0](https://github.com/komoot/photon/releases/tag/1.3.0) signed | 3101 | Google Maps Platform (partial) |
| [TileServer GL](https://github.com/maptiler/tileserver-gl) | JavaScript | Other | [v5.6.0](https://github.com/maptiler/tileserver-gl/releases/tag/v5.6.0) signed | 2906 | Mapbox (partial) |

</details>

<details>
<summary><b>Weather</b>, 3 tools</summary>

Forecast apps, forecast APIs and software for personal weather stations.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Breezy Weather](https://github.com/breezy-weather/breezy-weather) | Kotlin | LGPL-3.0 | [v6.2.2](https://github.com/breezy-weather/breezy-weather/releases/tag/v6.2.2) | 11601 | none |
| [Open-Meteo](https://github.com/open-meteo/open-meteo) | Swift | AGPL-3.0 | [1.6.0](https://github.com/open-meteo/open-meteo/releases/tag/1.6.0) signed | 6294 | OpenWeather (partial) |
| [WeeWX](https://github.com/weewx/weewx) | Python | GPL-3.0 | [v5.5.2](https://github.com/weewx/weewx/releases/tag/v5.5.2) | 1198 | none |

</details>

<details>
<summary><b>Android launchers</b>, 4 tools</summary>

Replace the Android home screen and app drawer.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Lawnchair](https://github.com/LawnchairLauncher/lawnchair) | Java | Other | [1.2.0.1884](https://github.com/LawnchairLauncher/lawnchair/releases/tag/1.2.0.1884) signed | 13658 | Nova Launcher (partial) |
| [Kvaesitso](https://github.com/MM2-0/Kvaesitso) | Kotlin | GPL-3.0 | [v1.41.0](https://github.com/MM2-0/Kvaesitso/releases/tag/v1.41.0) signed | 5225 | Niagara Launcher (partial) |
| [Olauncher](https://github.com/tanujnotes/Olauncher) | Kotlin | GPL-3.0 | [v6.9.17](https://github.com/tanujnotes/Olauncher/releases/tag/v6.9.17) | 3857 | Niagara Launcher (partial) |
| [Neo Launcher](https://github.com/NeoApplications/Neo-Launcher) | Java | GPL-3.0 | [0.9.3](https://github.com/NeoApplications/Neo-Launcher/releases/tag/0.9.3) | 2135 | Nova Launcher (partial) |

</details>

<details>
<summary><b>Privacy front ends</b>, 3 tools</summary>

Alternative web front ends to YouTube, Reddit and other sites, without ads, tracking or an account.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Invidious](https://github.com/iv-org/invidious) | Crystal | AGPL-3.0 | [v2.20260804.1](https://github.com/iv-org/invidious/releases/tag/v2.20260804.1) signed | 25140 | YouTube (partial) |
| [Piped](https://github.com/TeamPiped/Piped) | Vue | AGPL-3.0 | none | 10269 | YouTube (partial) |
| [Redlib](https://github.com/redlib-org/redlib) | Rust | AGPL-3.0 | [v0.36.0](https://github.com/redlib-org/redlib/releases/tag/v0.36.0) | 3829 | Reddit (partial) |

</details>

<details>
<summary><b>Ad-free video clients</b>, 5 tools</summary>

Apps that play YouTube and other video sites without ads or a Google account.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [NewPipe](https://github.com/TeamNewPipe/NewPipe) | Java | GPL-3.0 | [v0.29.1](https://github.com/TeamNewPipe/NewPipe/releases/tag/v0.29.1) | 39928 | YouTube (partial) |
| [SmartTube](https://github.com/yuliskov/SmartTube) | Java | MIT | [32.56s](https://github.com/yuliskov/SmartTube/releases/tag/32.56s) | 34611 | YouTube (partial) |
| [FreeTube](https://github.com/FreeTubeApp/FreeTube) | Vue | AGPL-3.0 | [v0.25.3-beta](https://github.com/FreeTubeApp/FreeTube/releases/tag/v0.25.3-beta) signed | 22013 | YouTube (partial) |
| [LibreTube](https://github.com/libre-tube/LibreTube) | Kotlin | GPL-3.0 | [v32.1](https://github.com/libre-tube/LibreTube/releases/tag/v32.1) | 12782 | YouTube (partial) |
| [Grayjay](https://github.com/futo-org/grayjay-android) | Kotlin | Other | [391](https://github.com/futo-org/grayjay-android/releases/tag/391) | 1824 | YouTube (partial) |

</details>

<details>
<summary><b>Home server platforms</b>, 6 tools</summary>

Turn a machine at home into a server with an app store, storage management and a web dashboard.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [CasaOS](https://github.com/IceWhaleTech/CasaOS) | Go | Apache-2.0 | [v0.4.15](https://github.com/IceWhaleTech/CasaOS/releases/tag/v0.4.15) signed | 37282 | Unraid (partial) |
| [umbrelOS](https://github.com/getumbrel/umbrel) | TypeScript | Other | [2.0.0](https://github.com/getumbrel/umbrel/releases/tag/2.0.0) | 12291 | Unraid (partial) |
| [Runtipi](https://github.com/runtipi/runtipi) | TypeScript | GPL-3.0 | [v4.10.2](https://github.com/runtipi/runtipi/releases/tag/v4.10.2) signed | 9682 | Unraid (partial) |
| [openmediavault](https://github.com/openmediavault/openmediavault) | PHP | Other | none | 6987 | Synology DiskStation Manager (partial), Unraid (partial) |
| [Cosmos](https://github.com/azukaar/Cosmos-Server) | Go | Other | [v0.23.4](https://github.com/azukaar/Cosmos-Server/releases/tag/v0.23.4) | 6176 | Unraid (partial) |
| [YunoHost](https://github.com/YunoHost/yunohost) | Python | AGPL-3.0 | [debian/12.1.41.2](https://github.com/YunoHost/yunohost/releases/tag/debian/12.1.41.2) | 2975 | Synology DiskStation Manager (partial) |

</details>

<details>
<summary><b>Speed tests</b>, 3 tools</summary>

Measure bandwidth and latency to your own server, or track your connection over time.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [LibreSpeed](https://github.com/librespeed/speedtest) | JavaScript | LGPL-3.0 | [v6.3.0](https://github.com/librespeed/speedtest/releases/tag/v6.3.0) | 15213 | Speedtest by Ookla (partial) |
| [Speedtest Tracker](https://github.com/alexjustesen/speedtest-tracker) | PHP | MIT | [v1.15.0](https://github.com/alexjustesen/speedtest-tracker/releases/tag/v1.15.0) signed | 6006 | none |
| [OpenSpeedTest](https://github.com/openspeedtest/Speed-Test) | JavaScript | MIT | none | 3803 | Speedtest by Ookla (partial) |

</details>

<details>
<summary><b>Music production</b>, 17 tools</summary>

Record, edit and mix audio, and compose with DAWs, trackers, sequencers and software synthesizers.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Audacity](https://github.com/audacity/audacity) | C++ | Other | [Audacity-4.0.1](https://github.com/audacity/audacity/releases/tag/Audacity-4.0.1) | 18658 | Adobe Audition (partial) |
| [Sonic Pi](https://github.com/sonic-pi-net/sonic-pi) | C++ | Other | [v5.0.0](https://github.com/sonic-pi-net/sonic-pi/releases/tag/v5.0.0) | 12179 | none |
| [LMMS](https://github.com/LMMS/lmms) | C++ | GPL-2.0 | [v1.2.2](https://github.com/LMMS/lmms/releases/tag/v1.2.2) signed | 10439 | FL Studio (partial) |
| [Mixxx](https://github.com/mixxxdj/mixxx) | C++ | Other | [2.5.6](https://github.com/mixxxdj/mixxx/releases/tag/2.5.6) signed | 7216 | Traktor Pro (full), Serato DJ (full) |
| [Bespoke Synth](https://github.com/BespokeSynth/BespokeSynth) | C++ | GPL-3.0 | [v1.3.0](https://github.com/BespokeSynth/BespokeSynth/releases/tag/v1.3.0) signed | 4736 | none |
| [Surge XT](https://github.com/surge-synthesizer/surge) | C | GPL-3.0 | [Nightly](https://github.com/surge-synthesizer/surge/releases/tag/Nightly) signed | 4050 | none |
| [Furnace](https://github.com/tildearrow/furnace) | C++ | Other | [v0.6.8.3](https://github.com/tildearrow/furnace/releases/tag/v0.6.8.3) | 3855 | none |
| [Helio](https://github.com/helio-fm/helio-sequencer) | C++ | GPL-3.0 | [3.18](https://github.com/helio-fm/helio-sequencer/releases/tag/3.18) | 3558 | none |
| [Dexed](https://github.com/asb2m10/dexed) | C++ | GPL-3.0 | [v1.0.1](https://github.com/asb2m10/dexed/releases/tag/v1.0.1) signed | 3548 | none |
| [Cardinal](https://github.com/DISTRHO/Cardinal) | C++ | GPL-3.0 | [26.02](https://github.com/DISTRHO/Cardinal/releases/tag/26.02) signed | 3213 | none |
| [openDAW](https://github.com/andremichelle/openDAW) | TypeScript | AGPL-3.0 | [@opendaw/studio-adapters@0.3.5](https://github.com/andremichelle/openDAW/releases/tag/%40opendaw/studio-adapters%400.3.5) | 2223 | Ableton Live (partial) |
| [Carla](https://github.com/falkTX/Carla) | C++ | none | [v2.5.10](https://github.com/falkTX/Carla/releases/tag/v2.5.10) signed | 2181 | none |
| [MilkyTracker](https://github.com/milkytracker/MilkyTracker) | C++ | Other | [v1.05.01](https://github.com/milkytracker/MilkyTracker/releases/tag/v1.05.01) | 2113 | none |
| [ossia score](https://github.com/ossia/score) | C++ | Other | [v3.8.2](https://github.com/ossia/score/releases/tag/v3.8.2) | 2068 | none |
| [Schism Tracker](https://github.com/schismtracker/schismtracker) | C | GPL-2.0 | [20260524](https://github.com/schismtracker/schismtracker/releases/tag/20260524) | 1567 | none |
| [Hydrogen](https://github.com/hydrogen-music/hydrogen) | C++ | GPL-2.0 | [1.2.7](https://github.com/hydrogen-music/hydrogen/releases/tag/1.2.7) | 1338 | none |
| [ZynAddSubFX](https://github.com/zynaddsubfx/zynaddsubfx) | C++ | GPL-2.0 | [2.5.3-osx](https://github.com/zynaddsubfx/zynaddsubfx/releases/tag/2.5.3-osx) | 1179 | none |

</details>

<details>
<summary><b>Music notation</b>, 3 tools</summary>

Write, play back and engrave sheet music and tablature.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [MuseScore](https://github.com/musescore/MuseScore) | C++ | Other | [v4.7.5](https://github.com/musescore/MuseScore/releases/tag/v4.7.5) signed | 15188 | Sibelius (full), Guitar Pro (partial) |
| [TuxGuitar](https://github.com/helge17/tuxguitar) | Java | none | [2.1.0](https://github.com/helge17/tuxguitar/releases/tag/2.1.0) | 1543 | Guitar Pro (full) |
| [Frescobaldi](https://github.com/frescobaldi/frescobaldi) | Python | GPL-2.0 | [v4.0.7](https://github.com/frescobaldi/frescobaldi/releases/tag/v4.0.7) signed | 953 | Sibelius (partial) |

</details>

<details>
<summary><b>Music players</b>, 12 tools</summary>

Play and organise a local music library, or stream it from your own server.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Feishin](https://github.com/jeffvli/feishin) | TypeScript | GPL-3.0 | [v1.17.0](https://github.com/jeffvli/feishin/releases/tag/v1.17.0) | 10083 | Spotify (partial) |
| [Harmonoid](https://github.com/harmonoid/harmonoid) | Dart | Other | [v0.3.32](https://github.com/harmonoid/harmonoid/releases/tag/v0.3.32) | 4772 | none |
| [Finamp](https://github.com/finamp-app/finamp) | Dart | MPL-2.0 | [0.6.27](https://github.com/finamp-app/finamp/releases/tag/0.6.27) | 4302 | Spotify (partial) |
| [Strawberry](https://github.com/strawberrymusicplayer/strawberry) | C++ | GPL-3.0 | [1.2.31](https://github.com/strawberrymusicplayer/strawberry/releases/tag/1.2.31) | 3996 | MusicBee (full) |
| [Tauon](https://github.com/Taiko2k/Tauon) | Python | GPL-3.0 | [v12.1.0](https://github.com/Taiko2k/Tauon/releases/tag/v12.1.0) | 2886 | none |
| [Music Player Daemon](https://github.com/MusicPlayerDaemon/MPD) | C++ | GPL-2.0 | [v0.24.15](https://github.com/MusicPlayerDaemon/MPD/releases/tag/v0.24.15) signed | 2787 | none |
| [ncmpcpp](https://github.com/ncmpcpp/ncmpcpp) | C++ | GPL-2.0 | [0.10.1](https://github.com/ncmpcpp/ncmpcpp/releases/tag/0.10.1) signed | 2494 | none |
| [Supersonic](https://github.com/supersonic-app/supersonic) | Go | GPL-3.0 | [v0.22.1](https://github.com/supersonic-app/supersonic/releases/tag/v0.22.1) | 2380 | Spotify (partial) |
| [Museeks](https://github.com/martpie/museeks) | TypeScript | MIT | [0.23.4](https://github.com/martpie/museeks/releases/tag/0.23.4) | 2135 | none |
| [DeaDBeeF](https://github.com/DeaDBeeF-Player/deadbeef) | C | Other | [1.10.3](https://github.com/DeaDBeeF-Player/deadbeef/releases/tag/1.10.3) | 1975 | foobar2000 (full) |
| [Quod Libet](https://github.com/quodlibet/quodlibet) | Python | GPL-2.0 | [release-4.7.1](https://github.com/quodlibet/quodlibet/releases/tag/release-4.7.1) | 1761 | MusicBee (partial) |
| [Audacious](https://github.com/audacious-media-player/audacious) | C++ | Other | [audacious-4.6.1](https://github.com/audacious-media-player/audacious/releases/tag/audacious-4.6.1) | 1273 | foobar2000 (partial) |

</details>

<details>
<summary><b>Music taggers</b>, 3 tools</summary>

Fix the tags, cover art and file names of a music library, often from MusicBrainz.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [beets](https://github.com/beetbox/beets) | Python | MIT | [v2.14.1](https://github.com/beetbox/beets/releases/tag/v2.14.1) | 15758 | Mp3tag (partial) |
| [MusicBrainz Picard](https://github.com/metabrainz/picard) | Python | GPL-2.0 | [release-3.0](https://github.com/metabrainz/picard/releases/tag/release-3.0) signed | 5269 | Mp3tag (partial) |
| [puddletag](https://github.com/puddletag/puddletag) | Python | Other | [2.5.0](https://github.com/puddletag/puddletag/releases/tag/2.5.0) | 640 | Mp3tag (full) |

</details>

<details>
<summary><b>Podcast players</b>, 3 tools</summary>

Subscribe to podcasts by RSS, download episodes and keep your place.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [AntennaPod](https://github.com/AntennaPod/AntennaPod) | Java | GPL-3.0 | [3.12.2](https://github.com/AntennaPod/AntennaPod/releases/tag/3.12.2) | 8203 | Spotify (partial) |
| [Pocket Casts for Android](https://github.com/Automattic/pocket-casts-android) | Kotlin | MPL-2.0 | [8.21](https://github.com/Automattic/pocket-casts-android/releases/tag/8.21) | 2840 | none |
| [gPodder](https://github.com/gpodder/gpodder) | Python | GPL-3.0 | [3.11.5](https://github.com/gpodder/gpodder/releases/tag/3.11.5) | 1452 | none |

</details>

<details>
<summary><b>Podcast servers</b>, 2 tools</summary>

Fetch and archive podcast feeds on your own server and listen from any device.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [PinePods](https://github.com/madeofpendletonwool/PinePods) | Rust | GPL-3.0 | [0.9.0](https://github.com/madeofpendletonwool/PinePods/releases/tag/0.9.0) | 1006 | none |
| [PodFetch](https://github.com/SamTV12345/PodFetch) | Rust | Apache-2.0 | [v5.2.3](https://github.com/SamTV12345/PodFetch/releases/tag/v5.2.3) | 510 | none |

</details>

<details>
<summary><b>Internet radio</b>, 2 tools</summary>

Run a web radio station with playlists, live DJs, scheduling and streaming.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [AzuraCast](https://github.com/AzuraCast/AzuraCast) | PHP | AGPL-3.0 | [0.23.8](https://github.com/AzuraCast/AzuraCast/releases/tag/0.23.8) signed | 4057 | Radio.co (full) |
| [LibreTime](https://github.com/libretime/libretime) | PHP | AGPL-3.0 | [4.5.0](https://github.com/libretime/libretime/releases/tag/4.5.0) signed | 938 | Radio.co (full) |

</details>

<details>
<summary><b>WebRTC media servers</b>, 8 tools</summary>

Route audio and video between WebRTC peers through an SFU, or relay it through a TURN server.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [LiveKit](https://github.com/livekit/livekit) | Go | Apache-2.0 | [v1.13.8](https://github.com/livekit/livekit/releases/tag/v1.13.8) signed | 21304 | Agora (full) |
| [coturn](https://github.com/coturn/coturn) | C | Other | [docker/4.18.0-r0](https://github.com/coturn/coturn/releases/tag/docker/4.18.0-r0) signed | 14457 | none |
| [Janus](https://github.com/meetecho/janus-gateway) | C | GPL-3.0 | [v1.4.2](https://github.com/meetecho/janus-gateway/releases/tag/v1.4.2) | 9181 | Agora (partial) |
| [mediasoup](https://github.com/versatica/mediasoup) | C++ | ISC | [rust-0.29.0](https://github.com/versatica/mediasoup/releases/tag/rust-0.29.0) | 7391 | Agora (partial) |
| [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge) | Kotlin | Apache-2.0 | [stable/jitsi-meet_11248](https://github.com/jitsi/jitsi-videobridge/releases/tag/stable/jitsi-meet_11248) | 3108 | none |
| [OpenVidu](https://github.com/OpenVidu/openvidu) | TypeScript | Apache-2.0 | [v3.9.0](https://github.com/OpenVidu/openvidu/releases/tag/v3.9.0) | 2134 | Agora (full) |
| [STUNner](https://github.com/l7mp/stunner) | Go | MIT | [v1.2.1](https://github.com/l7mp/stunner/releases/tag/v1.2.1) | 1059 | none |
| [Kurento](https://github.com/Kurento/kurento) | C | Apache-2.0 | [7.3.0](https://github.com/Kurento/kurento/releases/tag/7.3.0) | 441 | none |

</details>

<details>
<summary><b>Social network clients</b>, 12 tools</summary>

Apps to read and post on Mastodon, Lemmy, Bluesky and Nostr.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Bluesky](https://github.com/bluesky-social/social-app) | TypeScript | MIT | [1.134.0](https://github.com/bluesky-social/social-app/releases/tag/1.134.0) | 18326 | none |
| [Ice Cubes](https://github.com/Dimillian/IceCubesApp) | Swift | AGPL-3.0 | [2.1.3](https://github.com/Dimillian/IceCubesApp/releases/tag/2.1.3) | 7077 | none |
| [Elk](https://github.com/elk-zone/elk) | Vue | MIT | [v1.0.1](https://github.com/elk-zone/elk/releases/tag/v1.0.1) | 6032 | none |
| [Mastodon for iOS](https://github.com/mastodon/mastodon-ios) | Swift | GPL-3.0 | [2026.07](https://github.com/mastodon/mastodon-ios/releases/tag/2026.07) | 2278 | none |
| [Damus](https://github.com/damus-io/damus) | Swift | GPL-3.0 | [v1.17](https://github.com/damus-io/damus/releases/tag/v1.17) | 2144 | none |
| [Mastodon for Android](https://github.com/mastodon/mastodon-android) | Java | GPL-3.0 | [v2.13.3](https://github.com/mastodon/mastodon-android/releases/tag/v2.13.3) | 2049 | none |
| [Voyager](https://github.com/aeharding/voyager) | TypeScript | AGPL-3.0 | [2.49.1](https://github.com/aeharding/voyager/releases/tag/2.49.1) signed | 1817 | none |
| [Amethyst](https://github.com/vitorpamplona/amethyst) | Kotlin | MIT | [v1.17.0](https://github.com/vitorpamplona/amethyst/releases/tag/v1.17.0) | 1606 | none |
| [Phanpy](https://github.com/cheeaun/phanpy) | JavaScript | MIT | [2026.10.06.bb8c326](https://github.com/cheeaun/phanpy/releases/tag/2026.10.06.bb8c326) | 1496 | none |
| [Jerboa](https://github.com/LemmyNet/jerboa) | Kotlin | AGPL-3.0 | [0.0.88](https://github.com/LemmyNet/jerboa/releases/tag/0.0.88) | 1320 | none |
| [Thunder](https://github.com/thunder-app/thunder) | Dart | AGPL-3.0 | [0.8.6](https://github.com/thunder-app/thunder/releases/tag/0.8.6) | 1022 | none |
| [Photon](https://github.com/Xyphyn/photon) | Svelte | AGPL-3.0 | [v2.4.3](https://github.com/Xyphyn/photon/releases/tag/v2.4.3) signed | 553 | none |

</details>

<details>
<summary><b>Photo and video sharing networks</b>, 2 tools</summary>

Federated social networks built around photo posts and short videos.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Pixelfed](https://github.com/pixelfed/pixelfed) | PHP | AGPL-3.0 | [v0.14.4](https://github.com/pixelfed/pixelfed/releases/tag/v0.14.4) signed | 7119 | Instagram (full) |
| [Loops](https://github.com/joinloops/loops-server) | PHP | AGPL-3.0 | [v1.0.0-beta.14](https://github.com/joinloops/loops-server/releases/tag/v1.0.0-beta.14) signed | 456 | TikTok (partial) |

</details>

<details>
<summary><b>Social networks</b>, 4 tools</summary>

Self-hosted social networks with profiles, groups and an activity stream.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [diaspora*](https://github.com/diaspora/diaspora) | Ruby | AGPL-3.0 | [v0.9.1.0](https://github.com/diaspora/diaspora/releases/tag/v0.9.1.0) signed | 13647 | Facebook (partial) |
| [HumHub](https://github.com/humhub/humhub) | PHP | Other | [v1.18.6](https://github.com/humhub/humhub/releases/tag/v1.18.6) | 6753 | Facebook (partial) |
| [Elgg](https://github.com/Elgg/Elgg) | PHP | Other | [7.1.0](https://github.com/Elgg/Elgg/releases/tag/7.1.0) signed | 1678 | Facebook (partial) |
| [Bonfire](https://github.com/bonfire-networks/bonfire-app) | Elixir | none | [v1.0.7](https://github.com/bonfire-networks/bonfire-app/releases/tag/v1.0.7) | 942 | Facebook (partial) |

</details>

<details>
<summary><b>Real-time messaging servers</b>, 3 tools</summary>

Push events from a backend to browsers and apps over WebSocket or Server-Sent Events, with channels and presence.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Centrifugo](https://github.com/centrifugal/centrifugo) | Go | Apache-2.0 | [v6.9.7](https://github.com/centrifugal/centrifugo/releases/tag/v6.9.7) signed | 10837 | Pusher Channels (full) |
| [Mercure](https://github.com/dunglas/mercure) | Go | AGPL-3.0 | [v1.0.4](https://github.com/dunglas/mercure/releases/tag/v1.0.4) | 5338 | Pusher Channels (partial) |
| [Sockudo](https://github.com/sockudo/sockudo) | Rust | MIT | [v5.1.0](https://github.com/sockudo/sockudo/releases/tag/v5.1.0) | 819 | Pusher Channels (drop-in) |

</details>

<details>
<summary><b>MQTT brokers</b>, 6 tools</summary>

Route MQTT messages between devices and services.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [EMQX](https://github.com/emqx/emqx) | Erlang | Other | [6.3.1](https://github.com/emqx/emqx/releases/tag/6.3.1) | 16778 | AWS IoT Core (partial) |
| [Eclipse Mosquitto](https://github.com/eclipse-mosquitto/mosquitto) | C | Other | [v2.1.2](https://github.com/eclipse-mosquitto/mosquitto/releases/tag/v2.1.2) signed | 11252 | AWS IoT Core (partial) |
| [VerneMQ](https://github.com/vernemq/vernemq) | Erlang | Apache-2.0 | [2.2.1](https://github.com/vernemq/vernemq/releases/tag/2.2.1) signed | 3638 | AWS IoT Core (partial) |
| [NanoMQ](https://github.com/nanomq/nanomq) | C | MIT | [0.25.6](https://github.com/nanomq/nanomq/releases/tag/0.25.6) | 2628 | AWS IoT Core (partial) |
| [Mochi MQTT](https://github.com/mochi-mqtt/server) | Go | MIT | [v2.7.9](https://github.com/mochi-mqtt/server/releases/tag/v2.7.9) | 1938 | none |
| [HiveMQ Community Edition](https://github.com/hivemq/hivemq-community-edition) | Java | Apache-2.0 | [2026.5](https://github.com/hivemq/hivemq-community-edition/releases/tag/2026.5) signed | 1214 | AWS IoT Core (partial) |

</details>

<details>
<summary><b>Kafka web UIs</b>, 4 tools</summary>

Browse topics, messages, consumer groups and connectors of a Kafka cluster from a web UI.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Kafdrop](https://github.com/obsidiandynamics/kafdrop) | Java | Apache-2.0 | [4.3.0](https://github.com/obsidiandynamics/kafdrop/releases/tag/4.3.0) signed | 6156 | none |
| [Redpanda Console](https://github.com/redpanda-data/console) | TypeScript | none | [v3.12.0](https://github.com/redpanda-data/console/releases/tag/v3.12.0) signed | 4336 | none |
| [AKHQ](https://github.com/tchiotludo/akhq) | Java | Apache-2.0 | [0.28.0](https://github.com/tchiotludo/akhq/releases/tag/0.28.0) signed | 3860 | none |
| [Kafbat UI](https://github.com/kafbat/kafka-ui) | TypeScript | Apache-2.0 | [v1.5.0](https://github.com/kafbat/kafka-ui/releases/tag/v1.5.0) signed | 2754 | none |

</details>

<details>
<summary><b>Stream processing</b>, 8 tools</summary>

Run continuous queries, joins and aggregations over event streams.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Apache Flink](https://github.com/apache/flink) | Java | Apache-2.0 | [release-2.3.0](https://github.com/apache/flink/releases/tag/release-2.3.0) | 26385 | Amazon Managed Service for Apache Flink (full) |
| [RisingWave](https://github.com/risingwavelabs/risingwave) | Rust | Apache-2.0 | [v3.1.0](https://github.com/risingwavelabs/risingwave/releases/tag/v3.1.0) signed | 9360 | ksqldb (partial) |
| [Apache Storm](https://github.com/apache/storm) | Java | Apache-2.0 | [v3.1.0](https://github.com/apache/storm/releases/tag/v3.1.0) | 6696 | none |
| [Hazelcast](https://github.com/hazelcast/hazelcast) | Java | Other | [v5.7.0](https://github.com/hazelcast/hazelcast/releases/tag/v5.7.0) | 6615 | none |
| [Materialize](https://github.com/MaterializeInc/materialize) | Rust | Other | [v26.44.1](https://github.com/MaterializeInc/materialize/releases/tag/v26.44.1) | 6378 | none |
| [Arroyo](https://github.com/ArroyoSystems/arroyo) | Rust | Apache-2.0 | [v0.15.0](https://github.com/ArroyoSystems/arroyo/releases/tag/v0.15.0) | 5048 | Amazon Managed Service for Apache Flink (partial) |
| [Timeplus Proton](https://github.com/timeplus-io/proton) | C++ | Apache-2.0 | [v3.0.31](https://github.com/timeplus-io/proton/releases/tag/v3.0.31) | 2264 | ksqldb (partial) |
| [Bytewax](https://github.com/bytewax/bytewax) | Python | Apache-2.0 | [v0.21.1](https://github.com/bytewax/bytewax/releases/tag/v0.21.1) signed | 2054 | none |

</details>

<details>
<summary><b>Data transformation</b>, 4 tools</summary>

Build and test SQL and Python models inside a warehouse, with dependencies between them.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [dbt](https://github.com/dbt-labs/dbt) | Rust | Apache-2.0 | [v2.0.5](https://github.com/dbt-labs/dbt/releases/tag/v2.0.5) | 13971 | dbt Cloud (partial) |
| [SQLMesh](https://github.com/SQLMesh/sqlmesh) | Python | Apache-2.0 | [v0.236.3](https://github.com/SQLMesh/sqlmesh/releases/tag/v0.236.3) signed | 3307 | dbt (partial) |
| [Bruin](https://github.com/bruin-data/bruin) | Go | Apache-2.0 | [v0.11.773](https://github.com/bruin-data/bruin/releases/tag/v0.11.773) signed | 1769 | dbt (partial) |
| [Dataform](https://github.com/dataform-co/dataform) | TypeScript | Apache-2.0 | [3.0.71](https://github.com/dataform-co/dataform/releases/tag/3.0.71) signed | 996 | dbt (partial) |

</details>

<details>
<summary><b>Data catalogs</b>, 8 tools</summary>

Search, document and trace the lineage of tables, dashboards and pipelines across a data stack.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [OpenMetadata](https://github.com/open-metadata/OpenMetadata) | TypeScript | Apache-2.0 | [2.0.4-release](https://github.com/open-metadata/OpenMetadata/releases/tag/2.0.4-release) signed | 15384 | Alation (partial), Collibra (partial) |
| [DataHub](https://github.com/datahub-project/datahub) | Python | Apache-2.0 | [v1.7.0.1](https://github.com/datahub-project/datahub/releases/tag/v1.7.0.1) signed | 12797 | Alation (partial), Atlan (partial) |
| [Unity Catalog](https://github.com/unitycatalog/unitycatalog) | Java | Apache-2.0 | [v0.6.0](https://github.com/unitycatalog/unitycatalog/releases/tag/v0.6.0) signed | 3553 | Databricks (partial) |
| [Apache Gravitino](https://github.com/apache/gravitino) | Java | Apache-2.0 | [v1.3.1](https://github.com/apache/gravitino/releases/tag/v1.3.1) | 3238 | none |
| [Marquez](https://github.com/MarquezProject/marquez) | Java | Apache-2.0 | [0.50.0](https://github.com/MarquezProject/marquez/releases/tag/0.50.0) | 2284 | none |
| [Apache Atlas](https://github.com/apache/atlas) | Java | Apache-2.0 | [release-2.5.0](https://github.com/apache/atlas/releases/tag/release-2.5.0) | 2149 | Collibra (partial) |
| [Apache Polaris](https://github.com/apache/polaris) | Java | Apache-2.0 | [apache-polaris-1.8.0](https://github.com/apache/polaris/releases/tag/apache-polaris-1.8.0) | 2081 | none |
| [Lakekeeper](https://github.com/lakekeeper/lakekeeper) | Rust | Apache-2.0 | [v0.13.6](https://github.com/lakekeeper/lakekeeper/releases/tag/v0.13.6) signed | 1475 | none |

</details>

<details>
<summary><b>Data quality</b>, 5 tools</summary>

Declare tests on datasets and check them in pipelines.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Great Expectations](https://github.com/fivetran/great_expectations) | Python | Apache-2.0 | [1.23.2](https://github.com/fivetran/great_expectations/releases/tag/1.23.2) | 11863 | none |
| [Pandera](https://github.com/unionai-oss/pandera) | Python | MIT | [v0.34.1](https://github.com/unionai-oss/pandera/releases/tag/v0.34.1) signed | 4472 | none |
| [Deequ](https://github.com/awslabs/deequ) | Scala | Apache-2.0 | [2.1.0](https://github.com/awslabs/deequ/releases/tag/2.1.0) signed | 3648 | none |
| [Soda Core](https://github.com/sodadata/soda-core) | Python | Other | [v4.26.0](https://github.com/sodadata/soda-core/releases/tag/v4.26.0) signed | 2433 | none |
| [Elementary](https://github.com/elementary-data/elementary) | HTML | Apache-2.0 | [v0.26.0](https://github.com/elementary-data/elementary/releases/tag/v0.26.0) signed | 2416 | Monte Carlo (partial) |

</details>

<details>
<summary><b>Semantic layers</b>, 2 tools</summary>

Define metrics and dimensions once and serve them to BI tools and applications.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Cube](https://github.com/cube-js/cube) | Rust | Other | [v1.7.50](https://github.com/cube-js/cube/releases/tag/v1.7.50) | 20966 | Looker (partial) |
| [MetricFlow](https://github.com/dbt-labs/metricflow) | Python | Apache-2.0 | [v0.213.0](https://github.com/dbt-labs/metricflow/releases/tag/v0.213.0) signed | 1819 | none |

</details>

<details>
<summary><b>Data notebooks</b>, 5 tools</summary>

Notebooks that mix code, queries, charts and prose for data analysis.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [marimo](https://github.com/marimo-team/marimo) | Python | Apache-2.0 | [0.25.1](https://github.com/marimo-team/marimo/releases/tag/0.25.1) | 23038 | Hex (partial) |
| [JupyterLab](https://github.com/jupyterlab/jupyterlab) | TypeScript | BSD-3-Clause | [v4.6.4](https://github.com/jupyterlab/jupyterlab/releases/tag/v4.6.4) | 15337 | Google Colab (partial) |
| [Apache Zeppelin](https://github.com/apache/zeppelin) | Java | Apache-2.0 | [v0.12.1](https://github.com/apache/zeppelin/releases/tag/v0.12.1) | 6663 | none |
| [Livebook](https://github.com/livebook-dev/livebook) | Elixir | Apache-2.0 | [v0.19.10](https://github.com/livebook-dev/livebook/releases/tag/v0.19.10) | 5878 | none |
| [Querybook](https://github.com/pinterest/querybook) | TypeScript | Apache-2.0 | [v3.41.4](https://github.com/pinterest/querybook/releases/tag/v3.41.4) signed | 2293 | none |

</details>

<details>
<summary><b>Data processing engines</b>, 2 tools</summary>

Run batch and streaming jobs over large datasets across a cluster.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Apache Spark](https://github.com/apache/spark) | Scala | Apache-2.0 | [v4.2.0](https://github.com/apache/spark/releases/tag/v4.2.0) | 44131 | Databricks (partial) |
| [Apache Beam](https://github.com/apache/beam) | Java | Apache-2.0 | [v2.76.0](https://github.com/apache/beam/releases/tag/v2.76.0) | 8678 | Google Cloud Dataflow (partial) |

</details>

<details>
<summary><b>Directory servers</b>, 4 tools</summary>

Keep users and groups in an LDAP directory that other systems authenticate against.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [LLDAP](https://github.com/lldap/lldap) | Rust | GPL-3.0 | [v0.6.3](https://github.com/lldap/lldap/releases/tag/v0.6.3) | 6547 | Active Directory (partial) |
| [GLAuth](https://github.com/glauth/glauth) | Go | MIT | [GLAuth-v2.5.4](https://github.com/glauth/glauth/releases/tag/GLAuth-v2.5.4) signed | 2854 | none |
| [FreeIPA](https://github.com/freeipa/freeipa) | Python | GPL-3.0 | [4.13.2](https://github.com/freeipa/freeipa/releases/tag/4.13.2) signed | 1290 | Active Directory (full) |
| [389 Directory Server](https://github.com/389ds/389-ds-base) | C | Other | [389-ds-base-3.3.1](https://github.com/389ds/389-ds-base/releases/tag/389-ds-base-3.3.1) signed | 294 | none |

</details>

<details>
<summary><b>Authorization services</b>, 7 tools</summary>

Decide who may do what in an application, with policies or relationship-based permissions served over an API.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Open Policy Agent](https://github.com/open-policy-agent/opa) | Go | Apache-2.0 | [v1.21.1](https://github.com/open-policy-agent/opa/releases/tag/v1.21.1) | 12325 | none |
| [SpiceDB](https://github.com/authzed/spicedb) | Go | Apache-2.0 | [v1.56.2](https://github.com/authzed/spicedb/releases/tag/v1.56.2) signed | 7119 | none |
| [Permify](https://github.com/Permify/permify) | Go | AGPL-3.0 | [v1.7.4](https://github.com/Permify/permify/releases/tag/v1.7.4) signed | 5962 | none |
| [OpenFGA](https://github.com/openfga/openfga) | Go | Apache-2.0 | [v1.21.0](https://github.com/openfga/openfga/releases/tag/v1.21.0) signed | 5924 | none |
| [Ory Keto](https://github.com/ory/keto) | Go | Apache-2.0 | [v26.2.0](https://github.com/ory/keto/releases/tag/v26.2.0) | 5407 | none |
| [Cerbos](https://github.com/cerbos/cerbos) | Go | Apache-2.0 | [v0.56.0](https://github.com/cerbos/cerbos/releases/tag/v0.56.0) signed | 4616 | none |
| [Topaz](https://github.com/aserto-dev/topaz) | Go | Apache-2.0 | [v0.33.22](https://github.com/aserto-dev/topaz/releases/tag/v0.33.22) signed | 1363 | none |

</details>

<details>
<summary><b>Password managers</b>, 4 tools</summary>

Apps that keep passwords and other secrets in an encrypted vault on your own devices.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [KeePassXC](https://github.com/keepassxreboot/keepassxc) | C++ | Other | [2.7.12](https://github.com/keepassxreboot/keepassxc/releases/tag/2.7.12) | 29109 | 1Password (partial), LastPass (partial) |
| [KeePassDX](https://github.com/Kunzisoft/KeePassDX) | Kotlin | GPL-3.0 | [4.5.5](https://github.com/Kunzisoft/KeePassDX/releases/tag/4.5.5) signed | 7427 | none |
| [gopass](https://github.com/gopasspw/gopass) | Go | MIT | [v1.17.3](https://github.com/gopasspw/gopass/releases/tag/v1.17.3) signed | 7249 | none |
| [Strongbox](https://github.com/strongbox-password-safe/Strongbox) | Objective-C | AGPL-3.0 | none | 1467 | none |

</details>

<details>
<summary><b>Certificate authorities</b>, 7 tools</summary>

Issue, renew and revoke X.509 certificates from a PKI you run.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [CFSSL](https://github.com/cloudflare/cfssl) | Go | BSD-2-Clause | [v1.7.0](https://github.com/cloudflare/cfssl/releases/tag/v1.7.0) signed | 9480 | none |
| [step-ca](https://github.com/smallstep/certificates) | Go | Apache-2.0 | [v0.30.2](https://github.com/smallstep/certificates/releases/tag/v0.30.2) signed | 8934 | AWS Private CA (full) |
| [Boulder](https://github.com/letsencrypt/boulder) | Go | MPL-2.0 | [v0.20260928.1](https://github.com/letsencrypt/boulder/releases/tag/v0.20260928.1) signed | 5761 | none |
| [XCA](https://github.com/chris2511/xca) | C++ | Other | [RELEASE.2.9.0](https://github.com/chris2511/xca/releases/tag/RELEASE.2.9.0) | 2019 | none |
| [EJBCA](https://github.com/Keyfactor/ejbca-ce) | Java | LGPL-2.1 | [r9.6.3](https://github.com/Keyfactor/ejbca-ce/releases/tag/r9.6.3) | 960 | AWS Private CA (full) |
| [OpenXPKI](https://github.com/openxpki/openxpki) | Perl | Apache-2.0 | [v3.34.0](https://github.com/openxpki/openxpki/releases/tag/v3.34.0) | 699 | AWS Private CA (full) |
| [Dogtag PKI](https://github.com/dogtagpki/pki) | Java | GPL-2.0 | [v11.4.3](https://github.com/dogtagpki/pki/releases/tag/v11.4.3) | 510 | none |

</details>

<details>
<summary><b>Certificate automation</b>, 6 tools</summary>

Request and renew TLS certificates over ACME from Let's Encrypt or another ACME authority.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [acme.sh](https://github.com/acmesh-official/acme.sh) | Shell | GPL-3.0 | [3.1.6](https://github.com/acmesh-official/acme.sh/releases/tag/3.1.6) signed | 47781 | none |
| [Certbot](https://github.com/certbot/certbot) | Python | Other | [v5.8.0](https://github.com/certbot/certbot/releases/tag/v5.8.0) | 33259 | none |
| [cert-manager](https://github.com/cert-manager/cert-manager) | Go | Apache-2.0 | [v1.21.2](https://github.com/cert-manager/cert-manager/releases/tag/v1.21.2) signed | 14106 | none |
| [lego](https://github.com/go-acme/lego) | Go | MIT | [v5.5.2](https://github.com/go-acme/lego/releases/tag/v5.5.2) signed | 9907 | none |
| [Certimate](https://github.com/certimate-go/certimate) | Go | MIT | [v0.4.34](https://github.com/certimate-go/certimate/releases/tag/v0.4.34) | 9345 | none |
| [win-acme](https://github.com/win-acme/win-acme) | C# | Apache-2.0 | [v2.2.9.1701](https://github.com/win-acme/win-acme/releases/tag/v2.2.9.1701) signed | 5807 | none |

</details>

<details>
<summary><b>Container orchestration</b>, 11 tools</summary>

Schedule and run containers across a cluster of machines, from full Kubernetes distributions to lighter schedulers.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Kubernetes](https://github.com/kubernetes/kubernetes) | Go | Apache-2.0 | [v1.37.1](https://github.com/kubernetes/kubernetes/releases/tag/v1.37.1) | 128364 | Amazon EKS (full) |
| [Kubespray](https://github.com/kubernetes-sigs/kubespray) | Jinja | Apache-2.0 | [v2.32.0](https://github.com/kubernetes-sigs/kubespray/releases/tag/v2.32.0) signed | 18782 | Amazon EKS (full) |
| [Nomad](https://github.com/hashicorp/nomad) | Go | Other | [v2.0.7](https://github.com/hashicorp/nomad/releases/tag/v2.0.7) | 16988 | none |
| [vcluster](https://github.com/loft-sh/vcluster) | Go | Apache-2.0 | [v0.37.2](https://github.com/loft-sh/vcluster/releases/tag/v0.37.2) | 11332 | none |
| [Talos Linux](https://github.com/siderolabs/talos) | Go | MPL-2.0 | [v1.14.2](https://github.com/siderolabs/talos/releases/tag/v1.14.2) signed | 11314 | Amazon EKS (full) |
| [k0s](https://github.com/k0sproject/k0s) | Go | Other | [v1.36.4+k0s.1](https://github.com/k0sproject/k0s/releases/tag/v1.36.4%2Bk0s.1) signed | 6516 | Amazon EKS (full) |
| [Cluster API](https://github.com/kubernetes-sigs/cluster-api) | Go | Apache-2.0 | [v1.14.2](https://github.com/kubernetes-sigs/cluster-api/releases/tag/v1.14.2) | 4323 | none |
| [SwarmKit](https://github.com/moby/swarmkit) | Go | Apache-2.0 | [v2.1.2](https://github.com/moby/swarmkit/releases/tag/v2.1.2) signed | 3653 | none |
| [Gardener](https://github.com/gardener/gardener) | Go | Apache-2.0 | [v1.151.2](https://github.com/gardener/gardener/releases/tag/v1.151.2) | 3460 | Amazon EKS (full) |
| [RKE2](https://github.com/rancher/rke2) | Go | Apache-2.0 | [v1.37.1+rke2r1](https://github.com/rancher/rke2/releases/tag/v1.37.1%2Brke2r1) signed | 2357 | Amazon EKS (full) |
| [Kamaji](https://github.com/clastix/kamaji) | Go | Apache-2.0 | [26.10.2-edge](https://github.com/clastix/kamaji/releases/tag/26.10.2-edge) signed | 2043 | none |

</details>

<details>
<summary><b>Kubernetes packaging</b>, 6 tools</summary>

Template, package and version Kubernetes manifests so one application can be installed and configured per environment.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Helm](https://github.com/helm/helm) | Go | Apache-2.0 | [v4.3.0](https://github.com/helm/helm/releases/tag/v4.3.0) signed | 30310 | none |
| [Kustomize](https://github.com/kubernetes-sigs/kustomize) | Go | Apache-2.0 | [kustomize/v5.8.2](https://github.com/kubernetes-sigs/kustomize/releases/tag/kustomize/v5.8.2) | 12179 | none |
| [Helmfile](https://github.com/helmfile/helmfile) | Go | MIT | [v1.8.1](https://github.com/helmfile/helmfile/releases/tag/v1.8.1) signed | 5213 | none |
| [cdk8s](https://github.com/cdk8s-team/cdk8s) | JavaScript | Apache-2.0 | [redirect](https://github.com/cdk8s-team/cdk8s/releases/tag/redirect) signed | 4857 | none |
| [Timoni](https://github.com/stefanprodan/timoni) | Go | Apache-2.0 | [v0.35.0](https://github.com/stefanprodan/timoni/releases/tag/v0.35.0) signed | 2021 | Helm (full) |
| [ytt](https://github.com/carvel-dev/ytt) | Go | Apache-2.0 | [v0.55.3](https://github.com/carvel-dev/ytt/releases/tag/v0.55.3) | 1884 | none |

</details>

<details>
<summary><b>Kubernetes development</b>, 7 tools</summary>

Build, deploy and debug code against a Kubernetes cluster from a developer machine, with live reload or traffic proxied to the laptop.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Skaffold](https://github.com/GoogleContainerTools/skaffold) | Go | Apache-2.0 | [v2.25.0](https://github.com/GoogleContainerTools/skaffold/releases/tag/v2.25.0) | 15894 | none |
| [Tilt](https://github.com/tilt-dev/tilt) | Go | Apache-2.0 | [v0.37.8](https://github.com/tilt-dev/tilt/releases/tag/v0.37.8) signed | 10091 | Skaffold (full) |
| [Telepresence](https://github.com/telepresenceio/telepresence) | Go | Apache-2.0 | [v2.32.1](https://github.com/telepresenceio/telepresence/releases/tag/v2.32.1) | 7311 | none |
| [mirrord](https://github.com/metalbear-co/mirrord) | Rust | MIT | [3.270.0](https://github.com/metalbear-co/mirrord/releases/tag/3.270.0) | 5355 | Telepresence (full) |
| [DevSpace](https://github.com/devspace-sh/devspace) | Go | Apache-2.0 | [v6.3.21](https://github.com/devspace-sh/devspace/releases/tag/v6.3.21) signed | 5197 | Skaffold (full) |
| [Garden](https://github.com/garden-io/garden) | TypeScript | MPL-2.0 | [0.14.20](https://github.com/garden-io/garden/releases/tag/0.14.20) | 3617 | none |
| [Okteto CLI](https://github.com/okteto/okteto) | Go | Apache-2.0 | [3.23.1](https://github.com/okteto/okteto/releases/tag/3.23.1) signed | 3551 | none |

</details>

<details>
<summary><b>Kubernetes autoscaling</b>, 3 tools</summary>

Add and remove pods and nodes in a Kubernetes cluster as load and pending work change.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [KEDA](https://github.com/kedacore/keda) | Go | Apache-2.0 | [v2.21.0](https://github.com/kedacore/keda/releases/tag/v2.21.0) signed | 10578 | none |
| [Cluster Autoscaler](https://github.com/kubernetes/autoscaler) | Go | Apache-2.0 | [vertical-pod-autoscaler-chart-0.13.0](https://github.com/kubernetes/autoscaler/releases/tag/vertical-pod-autoscaler-chart-0.13.0) signed | 8986 | none |
| [Karpenter](https://github.com/kubernetes-sigs/karpenter) | Go | Apache-2.0 | [v1.14.1](https://github.com/kubernetes-sigs/karpenter/releases/tag/v1.14.1) signed | 2218 | Cluster Autoscaler (full) |

</details>

<details>
<summary><b>Container networking</b>, 5 tools</summary>

Pod networking, network policy and load balancer addresses for Kubernetes clusters, especially on bare metal.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Flannel](https://github.com/flannel-io/flannel) | Go | Apache-2.0 | [v0.28.9](https://github.com/flannel-io/flannel/releases/tag/v0.28.9) signed | 9548 | none |
| [MetalLB](https://github.com/metallb/metallb) | Go | Apache-2.0 | [metallb-chart-0.16.1](https://github.com/metallb/metallb/releases/tag/metallb-chart-0.16.1) | 8371 | none |
| [Calico](https://github.com/projectcalico/calico) | Go | Apache-2.0 | [v3.33.0](https://github.com/projectcalico/calico/releases/tag/v3.33.0) signed | 7384 | none |
| [kube-vip](https://github.com/kube-vip/kube-vip) | Go | Apache-2.0 | [v1.2.4](https://github.com/kube-vip/kube-vip/releases/tag/v1.2.4) signed | 2972 | MetalLB (partial) |
| [Multus CNI](https://github.com/k8snetworkplumbingwg/multus-cni) | Go | Apache-2.0 | [v4.3.1](https://github.com/k8snetworkplumbingwg/multus-cni/releases/tag/v4.3.1) signed | 2959 | none |

</details>

<details>
<summary><b>Distributed storage</b>, 5 tools</summary>

Replicated block and file storage pooled from the disks of a cluster, often as persistent volumes for Kubernetes.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [JuiceFS](https://github.com/juicedata/juicefs) | Go | Apache-2.0 | [v1.4.1](https://github.com/juicedata/juicefs/releases/tag/v1.4.1) signed | 14499 | none |
| [Rook](https://github.com/rook/rook) | Go | Apache-2.0 | [v1.20.8](https://github.com/rook/rook/releases/tag/v1.20.8) | 13672 | none |
| [OpenEBS](https://github.com/openebs/openebs) | unknown | Apache-2.0 | [v4.6.1](https://github.com/openebs/openebs/releases/tag/v4.6.1) signed | 9827 | none |
| [Longhorn](https://github.com/longhorn/longhorn) | Shell | Apache-2.0 | [v1.13.0](https://github.com/longhorn/longhorn/releases/tag/v1.13.0) | 8018 | none |
| [GlusterFS](https://github.com/gluster/glusterfs) | C | GPL-2.0 | [v11.2](https://github.com/gluster/glusterfs/releases/tag/v11.2) signed | 5254 | none |

</details>

<details>
<summary><b>Kubernetes backup</b>, 3 tools</summary>

Back up and restore Kubernetes resources and persistent volumes, and migrate workloads between clusters.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Velero](https://github.com/velero-io/velero) | Go | Apache-2.0 | [v1.18.4](https://github.com/velero-io/velero/releases/tag/v1.18.4) signed | 10329 | none |
| [K8up](https://github.com/k8up-io/k8up) | Go | Apache-2.0 | [k8up-4.10.0](https://github.com/k8up-io/k8up/releases/tag/k8up-4.10.0) signed | 1029 | none |
| [Kanister](https://github.com/kanisterio/kanister) | Go | Apache-2.0 | [0.119.0](https://github.com/kanisterio/kanister/releases/tag/0.119.0) | 887 | none |

</details>

<details>
<summary><b>DNS servers</b>, 2 tools</summary>

Authoritative and recursive DNS servers that host your zones and answer queries behind an API.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [CoreDNS](https://github.com/coredns/coredns) | Go | Apache-2.0 | [v1.14.7](https://github.com/coredns/coredns/releases/tag/v1.14.7) signed | 14360 | Amazon Route 53 (partial) |
| [PowerDNS](https://github.com/PowerDNS/pdns) | C++ | GPL-2.0 | [rec-5.4.7](https://github.com/PowerDNS/pdns/releases/tag/rec-5.4.7) signed | 4487 | Amazon Route 53 (partial) |

</details>

<details>
<summary><b>Container image tools</b>, 4 tools</summary>

Inspect, copy, sign and shrink OCI images and work with registries without a container daemon.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Slim](https://github.com/slimtoolkit/slim) | Go | Apache-2.0 | [1.40.11](https://github.com/slimtoolkit/slim/releases/tag/1.40.11) | 23421 | none |
| [Skopeo](https://github.com/podman-container-tools/skopeo) | Go | Apache-2.0 | [v1.24.1](https://github.com/podman-container-tools/skopeo/releases/tag/v1.24.1) signed | 11290 | none |
| [crane](https://github.com/google/go-containerregistry) | Go | Apache-2.0 | [v0.22.1](https://github.com/google/go-containerregistry/releases/tag/v0.22.1) signed | 4066 | none |
| [regclient](https://github.com/regclient/regclient) | Go | Apache-2.0 | [v0.11.6](https://github.com/regclient/regclient/releases/tag/v0.11.6) signed | 1940 | Skopeo (full) |

</details>

<details>
<summary><b>Continuous profiling</b>, 2 tools</summary>

Collect CPU and memory profiles from running services all the time and query them over time like metrics.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Grafana Pyroscope](https://github.com/grafana/pyroscope) | Go | AGPL-3.0 | [v2.3.1](https://github.com/grafana/pyroscope/releases/tag/v2.3.1) signed | 11691 | Datadog (partial) |
| [Parca](https://github.com/parca-dev/parca) | TypeScript | Apache-2.0 | [v0.29.1](https://github.com/parca-dev/parca/releases/tag/v0.29.1) signed | 4988 | Datadog (partial) |

</details>

<details>
<summary><b>Video players</b>, 10 tools</summary>

Play local video files and streams, or the library of your own media server.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [IINA](https://github.com/iina/iina) | Swift | GPL-3.0 | [v1.5.0](https://github.com/iina/iina/releases/tag/v1.5.0) | 46662 | none |
| [mpv](https://github.com/mpv-player/mpv) | C | Other | [v0.41.0](https://github.com/mpv-player/mpv/releases/tag/v0.41.0) signed | 37257 | none |
| [Kodi](https://github.com/xbmc/xbmc) | C++ | Other | [21.3-Omega](https://github.com/xbmc/xbmc/releases/tag/21.3-Omega) signed | 21286 | Infuse (partial) |
| [Jellyfin Desktop](https://github.com/jellyfin/jellyfin-desktop) | C++ | GPL-2.0 | [v1.12.0](https://github.com/jellyfin/jellyfin-desktop/releases/tag/v1.12.0) | 5841 | none |
| [Streamyfin](https://github.com/streamyfin/streamyfin) | TypeScript | MPL-2.0 | [v0.55.0](https://github.com/streamyfin/streamyfin/releases/tag/v0.55.0) signed | 5236 | none |
| [MPC-BE](https://github.com/Aleksoid1978/MPC-BE) | C | GPL-3.0 | [1.9.1](https://github.com/Aleksoid1978/MPC-BE/releases/tag/1.9.1) | 4539 | none |
| [Findroid](https://github.com/jarnedemeulemeester/findroid) | Kotlin | GPL-3.0 | [v1.1.0](https://github.com/jarnedemeulemeester/findroid/releases/tag/v1.1.0) signed | 4271 | none |
| [Swiftfin](https://github.com/jellyfin/Swiftfin) | Swift | MPL-2.0 | [1.6.1](https://github.com/jellyfin/Swiftfin/releases/tag/1.6.1) | 4198 | Infuse (partial) |
| [Celluloid](https://github.com/celluloid-player/celluloid) | C | GPL-3.0 | [v0.30](https://github.com/celluloid-player/celluloid/releases/tag/v0.30) | 1472 | none |
| [SMPlayer](https://github.com/smplayer-dev/smplayer) | C++ | GPL-2.0 | [v26.8.29](https://github.com/smplayer-dev/smplayer/releases/tag/v26.8.29) | 1063 | none |

</details>

<details>
<summary><b>Media converters</b>, 9 tools</summary>

Convert, compress and transcode video, audio and image files between formats.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Squoosh](https://github.com/GoogleChromeLabs/squoosh) | TypeScript | Apache-2.0 | [v1.12.0](https://github.com/GoogleChromeLabs/squoosh/releases/tag/v1.12.0) | 25993 | TinyPNG (partial) |
| [HandBrake](https://github.com/HandBrake/HandBrake) | C | Other | [1.11.2](https://github.com/HandBrake/HandBrake/releases/tag/1.11.2) signed | 24573 | Adobe Media Encoder (partial) |
| [ConvertX](https://github.com/C4illin/ConvertX) | TypeScript | AGPL-3.0 | [v0.19.0](https://github.com/C4illin/ConvertX/releases/tag/v0.19.0) | 19107 | CloudConvert (full) |
| [ImageMagick](https://github.com/ImageMagick/ImageMagick) | C | Other | [7.1.2-32](https://github.com/ImageMagick/ImageMagick/releases/tag/7.1.2-32) | 17608 | none |
| [VERT](https://github.com/VERT-sh/VERT) | TypeScript | AGPL-3.0 | none | 15681 | CloudConvert (partial) |
| [Caesium](https://github.com/Lymphatus/caesium-image-compressor) | C++ | GPL-3.0 | [v2.8.5](https://github.com/Lymphatus/caesium-image-compressor/releases/tag/v2.8.5) | 6369 | TinyPNG (full) |
| [Shutter Encoder](https://github.com/paulpacifico/shutter-encoder) | Java | GPL-3.0 | [20.4](https://github.com/paulpacifico/shutter-encoder/releases/tag/20.4) signed | 2789 | Adobe Media Encoder (full) |
| [fre:ac](https://github.com/enzo1982/freac) | C++ | GPL-2.0 | [v1.1.7](https://github.com/enzo1982/freac/releases/tag/v1.1.7) | 1972 | none |
| [Converseen](https://github.com/Faster3ck/Converseen) | C++ | GPL-3.0 | [v0.15.2.9](https://github.com/Faster3ck/Converseen/releases/tag/v0.15.2.9) | 1156 | none |

</details>

<details>
<summary><b>Subtitle editors</b>, 3 tools</summary>

Create, time and translate subtitles for video.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Subtitle Edit](https://github.com/SubtitleEdit/subtitleedit) | C# | MIT | [v5.2.0](https://github.com/SubtitleEdit/subtitleedit/releases/tag/v5.2.0) signed | 14458 | none |
| [Aegisub](https://github.com/TypesettingTools/Aegisub) | C++ | Other | [v3.5.0](https://github.com/TypesettingTools/Aegisub/releases/tag/v3.5.0) | 1992 | none |
| [Gaupol](https://github.com/otsaloma/gaupol) | Python | GPL-3.0 | [2.0.1](https://github.com/otsaloma/gaupol/releases/tag/2.0.1) signed | 280 | none |

</details>

<details>
<summary><b>Image viewers</b>, 5 tools</summary>

Browse and view images quickly, with light edits.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [ImageGlass](https://github.com/d2phap/ImageGlass) | C# | Other | [10.0.6.906](https://github.com/d2phap/ImageGlass/releases/tag/10.0.6.906) | 14556 | IrfanView (full) |
| [nomacs](https://github.com/nomacs/nomacs) | C++ | GPL-3.0 | [3.22.4](https://github.com/nomacs/nomacs/releases/tag/3.22.4) | 3213 | IrfanView (full) |
| [Oculante](https://github.com/woelper/oculante) | Rust | MIT | [0.9.6](https://github.com/woelper/oculante/releases/tag/0.9.6) | 1686 | none |
| [swayimg](https://github.com/artemsen/swayimg) | C++ | MIT | [v5.6](https://github.com/artemsen/swayimg/releases/tag/v5.6) signed | 725 | none |
| [Geeqie](https://github.com/BestImageViewer/geeqie) | C++ | GPL-2.0 | [v3.3](https://github.com/BestImageViewer/geeqie/releases/tag/v3.3) signed | 622 | none |

</details>

<details>
<summary><b>Digital painting</b>, 2 tools</summary>

Paint and sketch on a raster canvas with a pen tablet, alone or with others.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [MyPaint](https://github.com/mypaint/mypaint) | Python | GPL-2.0 | [v2.0.1](https://github.com/mypaint/mypaint/releases/tag/v2.0.1) signed | 2985 | Procreate (partial) |
| [Drawpile](https://github.com/drawpile/Drawpile) | C | GPL-3.0 | [2.3.0](https://github.com/drawpile/Drawpile/releases/tag/2.3.0) signed | 1337 | Procreate (partial) |

</details>

<details>
<summary><b>Pixel art editors</b>, 4 tools</summary>

Draw pixel art and animate sprites frame by frame.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Aseprite](https://github.com/aseprite/aseprite) | C++ | none | [v1.3.18.6](https://github.com/aseprite/aseprite/releases/tag/v1.3.18.6) | 39915 | none |
| [Piskel](https://github.com/piskelapp/piskel) | JavaScript | Apache-2.0 | [v0.15.0](https://github.com/piskelapp/piskel/releases/tag/v0.15.0) | 12822 | Aseprite (partial) |
| [Pixelorama](https://github.com/Orama-Interactive/Pixelorama) | GDScript | MIT | [v1.2.3](https://github.com/Orama-Interactive/Pixelorama/releases/tag/v1.2.3) | 10471 | Aseprite (full) |
| [LibreSprite](https://github.com/LibreSprite/LibreSprite) | C++ | GPL-2.0 | [v1.3](https://github.com/LibreSprite/LibreSprite/releases/tag/v1.3) | 8505 | Aseprite (full) |

</details>

<details>
<summary><b>2D animation</b>, 4 tools</summary>

Draw, rig and tween 2D animation on a timeline and render it to video.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [OpenToonz](https://github.com/opentoonz/opentoonz) | C++ | Other | [v1.8.0](https://github.com/opentoonz/opentoonz/releases/tag/v1.8.0) signed | 7789 | Toon Boom Harmony (full) |
| [Synfig](https://github.com/synfig/synfig) | C++ | GPL-3.0 | [v1.5.5](https://github.com/synfig/synfig/releases/tag/v1.5.5) signed | 2309 | Adobe Animate (partial) |
| [Pencil2D](https://github.com/pencil2d/pencil) | C++ | GPL-2.0 | [v0.7.2](https://github.com/pencil2d/pencil/releases/tag/v0.7.2) | 1810 | Adobe Animate (partial) |
| [Tahoma2D](https://github.com/tahoma2d/tahoma2d) | C++ | Other | [v1.6.3](https://github.com/tahoma2d/tahoma2d/releases/tag/v1.6.3) | 663 | Toon Boom Harmony (partial) |

</details>

<details>
<summary><b>Ebook readers</b>, 8 tools</summary>

Read EPUB, PDF and comic files on a desktop, phone or e-ink device.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [KOReader](https://github.com/koreader/koreader) | Lua | AGPL-3.0 | [v2026.07.1](https://github.com/koreader/koreader/releases/tag/v2026.07.1) | 30133 | Amazon Kindle (partial) |
| [Koodo Reader](https://github.com/koodo-reader/koodo-reader) | JavaScript | AGPL-3.0 | [v2.4.5](https://github.com/koodo-reader/koodo-reader/releases/tag/v2.4.5) | 28423 | Apple Books (partial) |
| [Readest](https://github.com/readest/readest) | TypeScript | AGPL-3.0 | [v0.12.12](https://github.com/readest/readest/releases/tag/v0.12.12) signed | 24905 | Amazon Kindle (partial) |
| [Foliate](https://github.com/johnfactotum/foliate) | JavaScript | GPL-3.0 | [3.3.0](https://github.com/johnfactotum/foliate/releases/tag/3.3.0) | 8778 | none |
| [Librum](https://github.com/Librum-Reader/Librum) | C++ | GPL-3.0 | [v.0.12.2](https://github.com/Librum-Reader/Librum/releases/tag/v.0.12.2) signed | 5319 | Amazon Kindle (partial) |
| [Librera Reader](https://github.com/foobnix/LibreraReader) | C | Other | [9.6.39](https://github.com/foobnix/LibreraReader/releases/tag/9.6.39) | 4881 | none |
| [Thorium Reader](https://github.com/edrlab/thorium-reader) | TypeScript | BSD-3-Clause | [v3.5.1](https://github.com/edrlab/thorium-reader/releases/tag/v3.5.1) | 2893 | Adobe Digital Editions (partial) |
| [YACReader](https://github.com/YACReader/yacreader) | C++ | GPL-3.0 | [10.3.2](https://github.com/YACReader/yacreader/releases/tag/10.3.2) | 1394 | none |

</details>

<details>
<summary><b>Font editors</b>, 3 tools</summary>

Draw glyphs, set spacing and kerning, and export fonts.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [FontForge](https://github.com/fontforge/fontforge) | C | Other | [20251009](https://github.com/fontforge/fontforge/releases/tag/20251009) signed | 8006 | FontLab (partial) |
| [Fontra](https://github.com/fontra/fontra) | JavaScript | GPL-3.0 | [2026.10.0](https://github.com/fontra/fontra/releases/tag/2026.10.0) | 840 | Glyphs (partial) |
| [Glyphr Studio](https://github.com/glyphr-studio/Glyphr-Studio-2) | JavaScript | none | [v2.10.6](https://github.com/glyphr-studio/Glyphr-Studio-2/releases/tag/v2.10.6) | 317 | Glyphs (partial) |

</details>

<details>
<summary><b>3D printing</b>, 8 tools</summary>

Slice models into G-code and control 3D printers.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer) | C++ | AGPL-3.0 | [v2.4.2](https://github.com/OrcaSlicer/OrcaSlicer/releases/tag/v2.4.2) | 15870 | Simplify3D (full) |
| [Klipper](https://github.com/Klipper3d/klipper) | C | GPL-3.0 | [v0.13.0](https://github.com/Klipper3d/klipper/releases/tag/v0.13.0) | 11934 | none |
| [PrusaSlicer](https://github.com/prusa3d/PrusaSlicer) | C++ | AGPL-3.0 | [version_2.9.6](https://github.com/prusa3d/PrusaSlicer/releases/tag/version_2.9.6) | 9388 | Simplify3D (full) |
| [OctoPrint](https://github.com/OctoPrint/OctoPrint) | Python | AGPL-3.0 | [1.11.8](https://github.com/OctoPrint/OctoPrint/releases/tag/1.11.8) | 9120 | none |
| [UltiMaker Cura](https://github.com/Ultimaker/Cura) | Python | LGPL-3.0 | [5.13.0](https://github.com/Ultimaker/Cura/releases/tag/5.13.0) signed | 7050 | Simplify3D (full) |
| [Bambu Studio](https://github.com/bambulab/BambuStudio) | C++ | AGPL-3.0 | [v02.08.02.61](https://github.com/bambulab/BambuStudio/releases/tag/v02.08.02.61) | 5087 | none |
| [Mainsail](https://github.com/mainsail-crew/mainsail) | Vue | GPL-3.0 | [v2.19.0](https://github.com/mainsail-crew/mainsail/releases/tag/v2.19.0) | 2220 | none |
| [Fluidd](https://github.com/fluidd-core/fluidd) | Vue | GPL-3.0 | [v1.37.6](https://github.com/fluidd-core/fluidd/releases/tag/v1.37.6) signed | 1838 | none |

</details>

<details>
<summary><b>CAD</b>, 10 tools</summary>

Draft 2D drawings and model parametric 3D parts for engineering and fabrication.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [FreeCAD](https://github.com/FreeCAD/FreeCAD) | C++ | LGPL-2.1 | [1.1.4](https://github.com/FreeCAD/FreeCAD/releases/tag/1.1.4) | 33978 | SolidWorks (partial), Fusion (partial) |
| [OpenSCAD](https://github.com/openscad/openscad) | C++ | Other | [openscad-2021.01](https://github.com/openscad/openscad/releases/tag/openscad-2021.01) signed | 10373 | none |
| [LibreCAD](https://github.com/LibreCAD/LibreCAD) | C++ | Other | [v2.2.1.5](https://github.com/LibreCAD/LibreCAD/releases/tag/v2.2.1.5) | 6446 | AutoCAD (partial) |
| [CadQuery](https://github.com/CadQuery/cadquery) | Python | Other | [v2.8.0](https://github.com/CadQuery/cadquery/releases/tag/v2.8.0) signed | 5889 | none |
| [Chili3D](https://github.com/xiangechen/chili3d) | TypeScript | AGPL-3.0 | [0.7.1](https://github.com/xiangechen/chili3d/releases/tag/0.7.1) | 4878 | Onshape (partial) |
| [SolveSpace](https://github.com/solvespace/solvespace) | C++ | GPL-3.0 | [v3.2](https://github.com/solvespace/solvespace/releases/tag/v3.2) | 4183 | none |
| [build123d](https://github.com/gumyr/build123d) | Python | Apache-2.0 | [v0.13.0](https://github.com/gumyr/build123d/releases/tag/v0.13.0) signed | 3327 | none |
| [Dune 3D](https://github.com/dune3d/dune3d) | C | GPL-3.0 | [v1.4.0](https://github.com/dune3d/dune3d/releases/tag/v1.4.0) | 2095 | none |
| [QCAD](https://github.com/qcad/qcad) | C++ | Other | [v3.33.1.0](https://github.com/qcad/qcad/releases/tag/v3.33.1.0) | 1895 | AutoCAD (partial) |
| [BRL-CAD](https://github.com/BRL-CAD/brlcad) | Tcl | Other | [rel-7-44-0](https://github.com/BRL-CAD/brlcad/releases/tag/rel-7-44-0) | 1039 | none |

</details>

<details>
<summary><b>3D modelling</b>, 8 tools</summary>

Model, process, texture and view 3D meshes and assets.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Blockbench](https://github.com/JannisX11/blockbench) | JavaScript | GPL-3.0 | [v5.2.1](https://github.com/JannisX11/blockbench/releases/tag/v5.2.1) | 6026 | none |
| [Material Maker](https://github.com/RodZill4/material-maker) | GDScript | MIT | [1.7](https://github.com/RodZill4/material-maker/releases/tag/1.7) | 5964 | Substance 3D Designer (partial) |
| [MeshLab](https://github.com/cnr-isti-vclab/meshlab) | C++ | GPL-3.0 | [MeshLab-2025.07](https://github.com/cnr-isti-vclab/meshlab/releases/tag/MeshLab-2025.07) | 5852 | none |
| [ArmorPaint](https://github.com/armory3d/armorpaint) | C | Other | [26.09](https://github.com/armory3d/armorpaint/releases/tag/26.09) | 5319 | Substance 3D Painter (full) |
| [F3D](https://github.com/f3d-app/f3d) | C++ | BSD-3-Clause | [v3.5.0](https://github.com/f3d-app/f3d/releases/tag/v3.5.0) | 4743 | none |
| [Dust3D](https://github.com/huxingyi/dust3d) | C++ | MIT | [1.1.6](https://github.com/huxingyi/dust3d/releases/tag/1.1.6) | 3570 | none |
| [Goxel](https://github.com/guillaumechereau/goxel) | C++ | GPL-3.0 | [v0.15.1](https://github.com/guillaumechereau/goxel/releases/tag/v0.15.1) | 3204 | MagicaVoxel (full) |
| [Wings 3D](https://github.com/dgud/wings) | Erlang | Other | [v2.4.1](https://github.com/dgud/wings/releases/tag/v2.4.1) | 669 | none |

</details>

<details>
<summary><b>Game engines</b>, 21 tools</summary>

Build 2D and 3D games with an engine, an editor or a framework, and export them to desktop, mobile and the web.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Godot](https://github.com/godotengine/godot) | C++ | MIT | [4.7.2-stable](https://github.com/godotengine/godot/releases/tag/4.7.2-stable) signed | 118192 | Unity (full) |
| [Bevy](https://github.com/bevyengine/bevy) | Rust | Apache-2.0 | [v0.19.1](https://github.com/bevyengine/bevy/releases/tag/v0.19.1) | 48655 | none |
| [Phaser](https://github.com/phaserjs/phaser) | JavaScript | MIT | [v4.2.1](https://github.com/phaserjs/phaser/releases/tag/v4.2.1) | 40419 | none |
| [raylib](https://github.com/raysan5/raylib) | C | Zlib | [6.0](https://github.com/raysan5/raylib/releases/tag/6.0) signed | 34990 | none |
| [GDevelop](https://github.com/4ian/GDevelop) | JavaScript | Other | [v5.6.283](https://github.com/4ian/GDevelop/releases/tag/v5.6.283) signed | 27183 | Construct (full), GameMaker (partial) |
| [MonoGame](https://github.com/MonoGame/MonoGame) | C# | Other | [v3.8.5.1](https://github.com/MonoGame/MonoGame/releases/tag/v3.8.5.1) | 14491 | none |
| [Ebitengine](https://github.com/hajimehoshi/ebiten) | Go | Apache-2.0 | [v2.10.4](https://github.com/hajimehoshi/ebiten/releases/tag/v2.10.4) | 13540 | none |
| [Cocos Creator](https://github.com/cocos/cocos-engine) | C++ | Other | [3.8.8](https://github.com/cocos/cocos-engine/releases/tag/3.8.8) signed | 9846 | Unity (partial) |
| [Open 3D Engine](https://github.com/o3de/o3de) | C++ | Other | [2605.0](https://github.com/o3de/o3de/releases/tag/2605.0) signed | 9730 | Unreal Engine (partial) |
| [Fyrox](https://github.com/FyroxEngine/Fyrox) | Rust | MIT | [v1.0.0](https://github.com/FyroxEngine/Fyrox/releases/tag/v1.0.0) | 9577 | none |
| [LÖVE](https://github.com/love2d/love) | C++ | Other | [11.5](https://github.com/love2d/love/releases/tag/11.5) | 8797 | none |
| [Stride](https://github.com/stride3d/stride) | C# | MIT | [releases/4.3.0.2507](https://github.com/stride3d/stride/releases/tag/releases/4.3.0.2507) | 7844 | Unity (full) |
| [Flax Engine](https://github.com/FlaxEngine/FlaxEngine) | C++ | Other | [1.12.6912](https://github.com/FlaxEngine/FlaxEngine/releases/tag/1.12.6912) | 7041 | Unreal Engine (partial) |
| [Ren'Py](https://github.com/renpy/renpy) | Ren'Py | none | [8.5.3.26051504](https://github.com/renpy/renpy/releases/tag/8.5.3.26051504) | 6883 | none |
| [Defold](https://github.com/defold/defold) | C++ | Other | [1.13.2](https://github.com/defold/defold/releases/tag/1.13.2) | 6349 | Unity (partial) |
| [Panda3D](https://github.com/panda3d/panda3d) | C++ | Other | [v1.10.16](https://github.com/panda3d/panda3d/releases/tag/v1.10.16) | 5238 | none |
| [Heaps](https://github.com/HeapsIO/heaps) | Haxe | MIT | [2.1.1](https://github.com/HeapsIO/heaps/releases/tag/2.1.1) | 3507 | none |
| [Armory](https://github.com/armory3d/armory) | C++ | Zlib | [26.02](https://github.com/armory3d/armory/releases/tag/26.02) signed | 3348 | none |
| [Solar2D](https://github.com/coronalabs/corona) | C++ | MIT | [3734](https://github.com/coronalabs/corona/releases/tag/3734) signed | 2882 | none |
| [Excalibur](https://github.com/excaliburjs/Excalibur) | TypeScript | BSD-2-Clause | [v0.32.0](https://github.com/excaliburjs/Excalibur/releases/tag/v0.32.0) | 2349 | none |
| [Castle Game Engine](https://github.com/castle-engine/castle-engine) | Pascal | Other | [snapshot](https://github.com/castle-engine/castle-engine/releases/tag/snapshot) signed | 1251 | none |

</details>

<details>
<summary><b>Game level editors</b>, 2 tools</summary>

Design tile maps and levels and export them to a game engine.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Tiled](https://github.com/mapeditor/tiled) | C++ | Other | [v1.12.2](https://github.com/mapeditor/tiled/releases/tag/v1.12.2) signed | 12949 | none |
| [LDtk](https://github.com/deepnight/ldtk) | Haxe | MIT | [v1.5.3](https://github.com/deepnight/ldtk/releases/tag/v1.5.3) | 4303 | none |

</details>

<details>
<summary><b>Continuous delivery</b>, 4 tools</summary>

Promote builds through environments with canary, blue-green and progressive rollouts, and roll back on failing metrics.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Spinnaker](https://github.com/spinnaker/spinnaker) | Java | Apache-2.0 | [spinnaker-release-2026.1.3](https://github.com/spinnaker/spinnaker/releases/tag/spinnaker-release-2026.1.3) signed | 9802 | Octopus Deploy (full) |
| [Flagger](https://github.com/fluxcd/flagger) | Go | Apache-2.0 | [v1.45.0](https://github.com/fluxcd/flagger/releases/tag/v1.45.0) signed | 5418 | Argo Rollouts (full) |
| [Argo Rollouts](https://github.com/argoproj/argo-rollouts) | Go | Apache-2.0 | [v1.10.0](https://github.com/argoproj/argo-rollouts/releases/tag/v1.10.0) signed | 3593 | none |
| [PipeCD](https://github.com/pipe-cd/pipecd) | Go | Apache-2.0 | [v0.58.0](https://github.com/pipe-cd/pipecd/releases/tag/v0.58.0) signed | 1361 | Octopus Deploy (partial) |

</details>

<details>
<summary><b>Serverless platforms</b>, 6 tools</summary>

Run functions and scale-to-zero services on your own cluster, triggered by HTTP requests or events.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [OpenFaaS](https://github.com/openfaas/faas) | Go | Other | [0.27.13](https://github.com/openfaas/faas/releases/tag/0.27.13) | 26250 | AWS Lambda (partial) |
| [Fission](https://github.com/fission/fission) | Go | Apache-2.0 | [v1.27.0](https://github.com/fission/fission/releases/tag/v1.27.0) signed | 8929 | AWS Lambda (full) |
| [Apache OpenWhisk](https://github.com/apache/openwhisk) | Scala | Apache-2.0 | [2.0.0](https://github.com/apache/openwhisk/releases/tag/2.0.0) signed | 6802 | AWS Lambda (full) |
| [Spin](https://github.com/spinframework/spin) | Rust | Apache-2.0 | [v4.2.2](https://github.com/spinframework/spin/releases/tag/v4.2.2) signed | 6525 | none |
| [Knative Serving](https://github.com/knative/serving) | Go | Apache-2.0 | [knative-v1.23.0](https://github.com/knative/serving/releases/tag/knative-v1.23.0) | 6105 | AWS Lambda (partial) |
| [Nuclio](https://github.com/nuclio/nuclio) | Go | Apache-2.0 | [1.17.9](https://github.com/nuclio/nuclio/releases/tag/1.17.9) signed | 5761 | AWS Lambda (full) |

</details>

<details>
<summary><b>Chaos engineering</b>, 5 tools</summary>

Inject failures such as killed pods, network latency and resource pressure to test how systems hold up.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Chaos Mesh](https://github.com/chaos-mesh/chaos-mesh) | Go | Apache-2.0 | [v2.8.4](https://github.com/chaos-mesh/chaos-mesh/releases/tag/v2.8.4) | 7930 | Gremlin (full) |
| [ChaosBlade](https://github.com/chaosblade-io/chaosblade) | Python | Apache-2.0 | [v1.8.1](https://github.com/chaosblade-io/chaosblade/releases/tag/v1.8.1) | 6523 | Gremlin (full) |
| [LitmusChaos](https://github.com/litmuschaos/litmus) | Go | Apache-2.0 | [3.32.0](https://github.com/litmuschaos/litmus/releases/tag/3.32.0) | 5726 | Gremlin (full) |
| [Pumba](https://github.com/alexei-led/pumba) | Go | Apache-2.0 | [1.2.1](https://github.com/alexei-led/pumba/releases/tag/1.2.1) signed | 3177 | Gremlin (partial) |
| [Chaos Toolkit](https://github.com/chaostoolkit/chaostoolkit) | Python | Apache-2.0 | [1.21.4](https://github.com/chaostoolkit/chaostoolkit/releases/tag/1.21.4) signed | 2031 | Gremlin (partial) |

</details>

<details>
<summary><b>Cloud cost</b>, 5 tools</summary>

Estimate, allocate and cut cloud and Kubernetes spending, per team, workload or pull request.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Infracost](https://github.com/infracost/infracost) | Go | Apache-2.0 | [v0.10.46](https://github.com/infracost/infracost/releases/tag/v0.10.46) signed | 12550 | none |
| [OpenCost](https://github.com/opencost/opencost) | Go | Apache-2.0 | [v1.121.3](https://github.com/opencost/opencost/releases/tag/v1.121.3) signed | 6766 | Kubecost (partial) |
| [KRR](https://github.com/robusta-dev/krr) | Python | MIT | [v1.30.0](https://github.com/robusta-dev/krr/releases/tag/v1.30.0) signed | 4741 | Kubecost (partial) |
| [Komiser](https://github.com/mlabouardy/komiser) | Go | Other | [v3.1.22](https://github.com/mlabouardy/komiser/releases/tag/v3.1.22) signed | 4142 | none |
| [Goldilocks](https://github.com/FairwindsOps/goldilocks) | Go | Apache-2.0 | [v4.16.2](https://github.com/FairwindsOps/goldilocks/releases/tag/v4.16.2) signed | 3356 | Kubecost (partial) |

</details>

<details>
<summary><b>Infrastructure inventory</b>, 4 tools</summary>

Model racks, devices, cables, IP addresses and circuits as the source of truth for network and data centre automation.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [NetBox](https://github.com/netbox-community/netbox) | Python | Apache-2.0 | [v4.7.2](https://github.com/netbox-community/netbox/releases/tag/v4.7.2) | 21659 | none |
| [phpIPAM](https://github.com/phpipam/phpipam) | PHP | none | [v1.8.3](https://github.com/phpipam/phpipam/releases/tag/v1.8.3) signed | 2811 | none |
| [Ralph](https://github.com/allegro/ralph) | Python | Apache-2.0 | [20260902.1](https://github.com/allegro/ralph/releases/tag/20260902.1) | 2522 | none |
| [Nautobot](https://github.com/nautobot/nautobot) | Python | Apache-2.0 | [v3.2.6](https://github.com/nautobot/nautobot/releases/tag/v3.2.6) signed | 1622 | NetBox (full) |

</details>

<details>
<summary><b>Runbook automation</b>, 2 tools</summary>

Turn operational procedures into jobs that run on servers on demand, on a schedule or in response to events, with access control and an audit trail.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [StackStorm](https://github.com/StackStorm/st2) | Python | Apache-2.0 | [v3.9.0](https://github.com/StackStorm/st2/releases/tag/v3.9.0) | 6542 | none |
| [Rundeck](https://github.com/rundeck/rundeck) | Groovy | Apache-2.0 | [v6.2.1](https://github.com/rundeck/rundeck/releases/tag/v6.2.1) | 6327 | none |

</details>

<details>
<summary><b>Vulnerability management</b>, 3 tools</summary>

Collect findings from scanners and SBOMs in one place, track them per product and follow them to a fix.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Faraday](https://github.com/infobyte/faraday) | Python | GPL-3.0 | [v5.24.2](https://github.com/infobyte/faraday/releases/tag/v5.24.2) | 6767 | none |
| [DefectDojo](https://github.com/DefectDojo/django-DefectDojo) | Python | BSD-3-Clause | [3.4.0](https://github.com/DefectDojo/django-DefectDojo/releases/tag/3.4.0) | 4985 | none |
| [Dependency-Track](https://github.com/DependencyTrack/dependency-track) | Java | Apache-2.0 | [5.1.2](https://github.com/DependencyTrack/dependency-track/releases/tag/5.1.2) | 4264 | Black Duck (partial), Snyk (partial) |

</details>

<details>
<summary><b>SBOM generators</b>, 3 tools</summary>

Generate software bills of materials in SPDX or CycloneDX from source trees, images and binaries.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Syft](https://github.com/anchore/syft) | Go | Apache-2.0 | [v1.54.1](https://github.com/anchore/syft/releases/tag/v1.54.1) | 9647 | none |
| [SBOM Tool](https://github.com/microsoft/sbom-tool) | C# | MIT | [v4.1.5](https://github.com/microsoft/sbom-tool/releases/tag/v4.1.5) signed | 2077 | none |
| [cdxgen](https://github.com/cdxgen/cdxgen) | JavaScript | Apache-2.0 | [v13.3.0](https://github.com/cdxgen/cdxgen/releases/tag/v13.3.0) signed | 1085 | none |

</details>

<details>
<summary><b>Web vulnerability scanners</b>, 4 tools</summary>

Probe running web applications and APIs for vulnerabilities from the outside.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Nuclei](https://github.com/projectdiscovery/nuclei) | Go | MIT | [v3.11.1](https://github.com/projectdiscovery/nuclei/releases/tag/v3.11.1) signed | 31775 | Burp Suite (partial) |
| [ZAP](https://github.com/zaproxy/zaproxy) | Java | Apache-2.0 | [v2.17.0](https://github.com/zaproxy/zaproxy/releases/tag/v2.17.0) | 15880 | Burp Suite (full) |
| [Nikto](https://github.com/sullo/nikto) | Perl | Other | [2.6.1](https://github.com/sullo/nikto/releases/tag/2.6.1) | 10758 | none |
| [Wapiti](https://github.com/wapiti-scanner/wapiti) | Python | GPL-2.0 | [3.3.2](https://github.com/wapiti-scanner/wapiti/releases/tag/3.3.2) | 1880 | none |

</details>

<details>
<summary><b>Infrastructure as code scanners</b>, 2 tools</summary>

Check Terraform, Kubernetes manifests and other infrastructure code for insecure settings before it is applied.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Checkov](https://github.com/bridgecrewio/checkov) | Python | Apache-2.0 | [3.3.23](https://github.com/bridgecrewio/checkov/releases/tag/3.3.23) | 9056 | Snyk (partial) |
| [KICS](https://github.com/Checkmarx/kics) | Open Policy Agent | Apache-2.0 | [v2.2.0](https://github.com/Checkmarx/kics/releases/tag/v2.2.0) signed | 2714 | Snyk (partial) |

</details>

<details>
<summary><b>Cloud security posture</b>, 4 tools</summary>

Audit cloud accounts and Kubernetes clusters against security benchmarks and report misconfigurations.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Prowler](https://github.com/prowler-cloud/prowler) | Python | Apache-2.0 | [5.44.0](https://github.com/prowler-cloud/prowler/releases/tag/5.44.0) signed | 14968 | Wiz (partial) |
| [Kubescape](https://github.com/kubescape/kubescape) | Go | Apache-2.0 | [v4.0.15](https://github.com/kubescape/kubescape/releases/tag/v4.0.15) signed | 11773 | Wiz (partial) |
| [CloudSploit](https://github.com/aquasecurity/cloudsploit) | JavaScript | GPL-3.0 | [v3.9.0](https://github.com/aquasecurity/cloudsploit/releases/tag/v3.9.0) signed | 3777 | none |
| [Polaris](https://github.com/FairwindsOps/polaris) | Go | Apache-2.0 | [v10.2.5](https://github.com/FairwindsOps/polaris/releases/tag/v10.2.5) signed | 3393 | none |

</details>

<details>
<summary><b>Host and network audits</b>, 7 tools</summary>

Scan servers, networks and TLS endpoints for missing patches, weak configuration and known vulnerabilities.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Lynis](https://github.com/CISOfy/lynis) | Shell | GPL-3.0 | [3.1.7](https://github.com/CISOfy/lynis/releases/tag/3.1.7) signed | 16438 | none |
| [Vuls](https://github.com/future-architect/vuls) | Go | GPL-3.0 | [v0.41.0](https://github.com/future-architect/vuls/releases/tag/v0.41.0) signed | 12279 | Nessus (partial) |
| [Docker Bench for Security](https://github.com/docker/docker-bench-security) | Shell | Apache-2.0 | [v1.6.1](https://github.com/docker/docker-bench-security/releases/tag/v1.6.1) signed | 9704 | none |
| [testssl.sh](https://github.com/testssl/testssl.sh) | Shell | GPL-2.0 | [v3.2.4](https://github.com/testssl/testssl.sh/releases/tag/v3.2.4) signed | 9227 | none |
| [OpenVAS](https://github.com/greenbone/openvas-scanner) | Rust | GPL-2.0 | [v23.50.26](https://github.com/greenbone/openvas-scanner/releases/tag/v23.50.26) | 4853 | Nessus (full) |
| [SSLyze](https://github.com/nabla-c0d3/sslyze) | Python | AGPL-3.0 | [6.3.1](https://github.com/nabla-c0d3/sslyze/releases/tag/6.3.1) | 3783 | none |
| [OpenSCAP](https://github.com/OpenSCAP/openscap) | XSLT | LGPL-2.1 | [1.4.4](https://github.com/OpenSCAP/openscap/releases/tag/1.4.4) | 1824 | none |

</details>

<details>
<summary><b>Secret scanners</b>, 4 tools</summary>

Find API keys, passwords and tokens committed to code, git history and other places they should not be.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Gitleaks](https://github.com/gitleaks/gitleaks) | Go | MIT | [v8.30.1](https://github.com/gitleaks/gitleaks/releases/tag/v8.30.1) | 29738 | GitGuardian (partial) |
| [TruffleHog](https://github.com/trufflesecurity/trufflehog) | Go | AGPL-3.0 | [v3.98.1](https://github.com/trufflesecurity/trufflehog/releases/tag/v3.98.1) signed | 28304 | GitGuardian (partial) |
| [ggshield](https://github.com/GitGuardian/ggshield) | Python | MIT | [v1.55.0](https://github.com/GitGuardian/ggshield/releases/tag/v1.55.0) | 2002 | none |
| [Kingfisher](https://github.com/mongodb/kingfisher) | Rust | Apache-2.0 | [v2.10.0](https://github.com/mongodb/kingfisher/releases/tag/v2.10.0) signed | 1258 | GitGuardian (partial) |

</details>

<details>
<summary><b>Software supply chain</b>, 3 tools</summary>

Sign and verify artifacts, and assess the security practices of the projects you depend on.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Cosign](https://github.com/sigstore/cosign) | Go | Apache-2.0 | [v3.1.3](https://github.com/sigstore/cosign/releases/tag/v3.1.3) signed | 6349 | none |
| [OpenSSF Scorecard](https://github.com/ossf/scorecard) | Go | Apache-2.0 | [v5.5.0](https://github.com/ossf/scorecard/releases/tag/v5.5.0) signed | 5739 | none |
| [Notation](https://github.com/notaryproject/notation) | Go | Apache-2.0 | [v1.3.2](https://github.com/notaryproject/notation/releases/tag/v1.3.2) signed | 498 | none |

</details>

<details>
<summary><b>Security orchestration and response</b>, 3 tools</summary>

Automate security response playbooks and track alerts and incidents as cases.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Tracecat](https://github.com/TracecatHQ/tracecat) | Python | AGPL-3.0 | [1.0.1](https://github.com/TracecatHQ/tracecat/releases/tag/1.0.1) | 3825 | Splunk SOAR (full) |
| [Shuffle](https://github.com/Shuffle/Shuffle) | JavaScript | AGPL-3.0 | [v2.3.0](https://github.com/Shuffle/Shuffle/releases/tag/v2.3.0) signed | 2450 | Splunk SOAR (full) |
| [DFIR-IRIS](https://github.com/dfir-iris/iris-web) | Shell | LGPL-3.0 | [v2.4.29](https://github.com/dfir-iris/iris-web/releases/tag/v2.4.29) | 1581 | none |

</details>

<details>
<summary><b>Threat intelligence platforms</b>, 4 tools</summary>

Collect, enrich and share indicators of compromise and knowledge about threats.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [OpenCTI](https://github.com/OpenCTI-Platform/opencti) | TypeScript | Other | [7.261002.0](https://github.com/OpenCTI-Platform/opencti/releases/tag/7.261002.0) signed | 10100 | none |
| [MISP](https://github.com/MISP/MISP) | PHP | AGPL-3.0 | [v2.5.48](https://github.com/MISP/MISP/releases/tag/v2.5.48) signed | 6574 | none |
| [IntelOwl](https://github.com/intelowlproject/IntelOwl) | Python | AGPL-3.0 | [v6.8.0](https://github.com/intelowlproject/IntelOwl/releases/tag/v6.8.0) signed | 4740 | none |
| [Yeti](https://github.com/yeti-platform/yeti) | Python | Apache-2.0 | [2.12.0](https://github.com/yeti-platform/yeti/releases/tag/2.12.0) signed | 2033 | none |

</details>

<details>
<summary><b>Honeypots</b>, 3 tools</summary>

Decoy services that attract attackers and record what they try.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [T-Pot](https://github.com/telekom-security/tpotce) | Shell | GPL-3.0 | [24.04.1](https://github.com/telekom-security/tpotce/releases/tag/24.04.1) signed | 9567 | Thinkst Canary (partial) |
| [Cowrie](https://github.com/cowrie/cowrie) | Python | Other | [v3.1.1](https://github.com/cowrie/cowrie/releases/tag/v3.1.1) signed | 6589 | none |
| [OpenCanary](https://github.com/thinkst/opencanary) | Python | BSD-3-Clause | [v0.9.10](https://github.com/thinkst/opencanary/releases/tag/v0.9.10) signed | 3054 | Thinkst Canary (partial) |

</details>

<details>
<summary><b>Malware scanners</b>, 5 tools</summary>

Scan files for malware with signatures, pattern rules or sandboxed execution.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [YARA](https://github.com/VirusTotal/yara) | C | BSD-3-Clause | [v4.5.8](https://github.com/VirusTotal/yara/releases/tag/v4.5.8) signed | 9921 | none |
| [ClamAV](https://github.com/Cisco-Talos/clamav) | C | GPL-2.0 | [clamav-1.5.4](https://github.com/Cisco-Talos/clamav/releases/tag/clamav-1.5.4) signed | 7334 | none |
| [CAPE Sandbox](https://github.com/kevoreilly/CAPEv2) | Python | Other | none | 3553 | none |
| [Linux Malware Detect](https://github.com/rfxn/linux-malware-detect) | Shell | GPL-2.0 | [v2.0.1](https://github.com/rfxn/linux-malware-detect/releases/tag/v2.0.1) | 1518 | none |
| [YARA-X](https://github.com/VirusTotal/yara-x) | Rust | BSD-3-Clause | [v1.21.0](https://github.com/VirusTotal/yara-x/releases/tag/v1.21.0) signed | 1309 | YARA (full) |

</details>

<details>
<summary><b>CAPTCHAs and bot checks</b>, 2 tools</summary>

Tell humans from bots on forms and sign-ups without sending visitors to a third-party tracker.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Cap](https://github.com/tiagozip/cap) | JavaScript | Other | [standalone@3.1.13](https://github.com/tiagozip/cap/releases/tag/standalone%403.1.13) signed | 7942 | reCAPTCHA (full), hCaptcha (full) |
| [ALTCHA](https://github.com/altcha-org/altcha) | TypeScript | MIT | [v3.3.0](https://github.com/altcha-org/altcha/releases/tag/v3.3.0) | 2802 | reCAPTCHA (full), hCaptcha (full) |

</details>

<details>
<summary><b>MFA servers</b>, 2 tools</summary>

Run two-factor authentication for VPNs, servers and applications from your own server.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [privacyIDEA](https://github.com/privacyidea/privacyidea) | Python | AGPL-3.0 | [v3.13.4](https://github.com/privacyidea/privacyidea/releases/tag/v3.13.4) | 1782 | Duo (full) |
| [LinOTP](https://github.com/LinOTP/LinOTP) | Python | AGPL-3.0 | [release/3.4.5](https://github.com/LinOTP/LinOTP/releases/tag/release/3.4.5) | 550 | Duo (partial) |

</details>

<details>
<summary><b>File and volume encryption</b>, 4 tools</summary>

Encrypt single files, folders or whole volumes before they are stored or synced.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [age](https://github.com/FiloSottile/age) | Go | BSD-3-Clause | [v1.3.2](https://github.com/FiloSottile/age/releases/tag/v1.3.2) | 23827 | none |
| [Cryptomator](https://github.com/cryptomator/cryptomator) | Java | GPL-3.0 | [1.19.3](https://github.com/cryptomator/cryptomator/releases/tag/1.19.3) signed | 16253 | none |
| [VeraCrypt](https://github.com/veracrypt/VeraCrypt) | C | Other | [VeraCrypt_1.26.29](https://github.com/veracrypt/VeraCrypt/releases/tag/VeraCrypt_1.26.29) signed | 11752 | none |
| [gocryptfs](https://github.com/rfjakob/gocryptfs) | Go | MIT | [v2.6.1](https://github.com/rfjakob/gocryptfs/releases/tag/v2.6.1) signed | 4627 | none |

</details>

<details>
<summary><b>Content blockers</b>, 5 tools</summary>

Browser extensions that block ads, trackers and other unwanted content on web pages.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [uBlock Origin](https://github.com/gorhill/uBlock) | JavaScript | GPL-3.0 | [1.75.0](https://github.com/gorhill/uBlock/releases/tag/1.75.0) signed | 68366 | none |
| [AdGuard Browser Extension](https://github.com/AdguardTeam/AdguardBrowserExtension) | TypeScript | GPL-3.0 | [v5.5.3.3](https://github.com/AdguardTeam/AdguardBrowserExtension/releases/tag/v5.5.3.3) | 4485 | none |
| [Privacy Badger](https://github.com/EFForg/privacybadger) | JavaScript | Other | [release-2026.9.15](https://github.com/EFForg/privacybadger/releases/tag/release-2026.9.15) signed | 3860 | none |
| [uBlock Origin Lite](https://github.com/uBlockOrigin/uBOL-home) | JavaScript | GPL-3.0 | [2026.930.1227](https://github.com/uBlockOrigin/uBOL-home/releases/tag/2026.930.1227) | 3855 | none |
| [Ghostery](https://github.com/ghostery/ghostery-extension) | JavaScript | GPL-3.0 | [v10.6.6](https://github.com/ghostery/ghostery-extension/releases/tag/v10.6.6) signed | 1749 | none |

</details>

<details>
<summary><b>One-time secret sharing</b>, 3 tools</summary>

Share a password or other secret through a link that stops working once it is read.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Password Pusher](https://github.com/pglombardo/PasswordPusher) | Ruby | Apache-2.0 | [v2.14.2](https://github.com/pglombardo/PasswordPusher/releases/tag/v2.14.2) | 3212 | none |
| [Yopass](https://github.com/jhaals/yopass) | Go | Apache-2.0 | [14.10.0](https://github.com/jhaals/yopass/releases/tag/14.10.0) signed | 3165 | none |
| [Onetime Secret](https://github.com/onetimesecret/onetimesecret) | Ruby | MIT | [v0.26.14](https://github.com/onetimesecret/onetimesecret/releases/tag/v0.26.14) signed | 2953 | none |

</details>

<details>
<summary><b>Private search engines</b>, 3 tools</summary>

Metasearch engines you host, which query other search engines without profiling who searches.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [SearXNG](https://github.com/searxng/searxng) | Python | AGPL-3.0 | none | 38033 | none |
| [degoog](https://github.com/degoog-org/degoog) | TypeScript | AGPL-3.0 | [1.0.0](https://github.com/degoog-org/degoog/releases/tag/1.0.0) signed | 2315 | none |
| [Websurfx](https://github.com/neon-mmd/websurfx) | Rust | AGPL-3.0 | [v1.29.9](https://github.com/neon-mmd/websurfx/releases/tag/v1.29.9) signed | 1209 | none |

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

The catalog data is under [CC BY-SA 4.0](LICENSE-DATA): copy it, mirror it, build on it, as long as
you credit awesome-alternatives.com with a link and share what you build from it under the same licence.
The scripts, the site and the API are under [AGPL-3.0](LICENSE). Copies taken before 6 October 2026
keep the terms they were published under, CC0 1.0 for the data and MIT for the code.
Security issues: see [SECURITY.md](SECURITY.md).
