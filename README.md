<img src="site/public/logo-512.png" alt="" width="96" height="96">

# Awesome Alternatives

Find what replaces the tool you already use, in the language you want, and see at a glance whether
it is still alive.

Every entry is a small YAML file under [`data/tools/`](data/tools). An entry states only two things
that a contributor can know better than GitHub: which repository the tool lives in, and what it
replaces. Everything else in the table below is read from GitHub by CI, every night: language,
licence, stars, the latest release, whether that release is signed. A pull request cannot claim a
star count, a licence or a version, so it cannot fake one.

## What the marks mean

- **signed** next to a version: the release tag, or the commit it points at, carries a signature
  GitHub verified.
- **verified** next to a name: the tool's own repository contains an `.awesome-alternatives.yml`
  file naming this entry, so whoever controls the repository vouches for it.
- **archived** next to a name: the repository is archived and gets no more changes. It is listed
  only because other entries replace it, never as an alternative.
- **drop-in**, **full**, **partial**: how much of the original the tool covers. `drop-in` means you
  can swap it in without changing your setup, `full` covers the same job differently, `partial`
  covers part of it.

## Catalog

<!-- catalog:start -->

### Release automation

Version bumps, changelogs, tags and published releases from commit history.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [semantic-release](https://github.com/semantic-release/semantic-release) | JavaScript | MIT | [v25.0.9](https://github.com/semantic-release/semantic-release/releases/tag/v25.0.9) signed | 24058 | none |
| [Changesets](https://github.com/changesets/changesets) | TypeScript | MIT | [@changesets/cli@3.0.3](https://github.com/changesets/changesets/releases/tag/%40changesets/cli%403.0.3) signed | 12424 | semantic-release (full) |
| [release-please](https://github.com/googleapis/release-please) | TypeScript | Apache-2.0 | [v17.11.2](https://github.com/googleapis/release-please/releases/tag/v17.11.2) signed | 7533 | semantic-release (full) |
| [release-plz](https://github.com/release-plz/release-plz) | Rust | Apache-2.0 | [release-plz-v0.3.169](https://github.com/release-plz/release-plz/releases/tag/release-plz-v0.3.169) | 1482 | semantic-release (partial) |
| [cocogitto](https://github.com/cocogitto/cocogitto) | Rust | MIT | [7.0.0](https://github.com/cocogitto/cocogitto/releases/tag/7.0.0) | 1193 | semantic-release (full) |
| [knope](https://github.com/knope-dev/knope) | Rust | MIT | [knope/v0.23.0](https://github.com/knope-dev/knope/releases/tag/knope/v0.23.0) signed | 189 | semantic-release (full) |
| [FerrFlow](https://github.com/FerrLabs/FerrFlow) | Rust | MIT | [v7.24.4](https://github.com/FerrLabs/FerrFlow/releases/tag/v7.24.4) | 3 | semantic-release (full) |

### Changelog generation

Changelogs built from commits or pull requests, without driving the release itself.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [git-cliff](https://github.com/orhun/git-cliff) | Rust | Apache-2.0 | [v2.14.2](https://github.com/orhun/git-cliff/releases/tag/v2.14.2) signed | 12258 | semantic-release (partial) |

### JavaScript runtimes

Engines that run JavaScript and TypeScript outside the browser.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Node.js](https://github.com/nodejs/node) | JavaScript | Other | [v26.10.0](https://github.com/nodejs/node/releases/tag/v26.10.0) signed | 122034 | none |
| [Deno](https://github.com/denoland/deno) | Rust | MIT | [v2.9.7](https://github.com/denoland/deno/releases/tag/v2.9.7) signed | 108476 | Node.js (full) |
| [Bun](https://github.com/oven-sh/bun) | Rust | Other | [bun-v1.4.2](https://github.com/oven-sh/bun/releases/tag/bun-v1.4.2) | 96005 | Node.js (full), npm (full) |

### JavaScript package managers

Install and lock npm dependencies.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [pnpm](https://github.com/pnpm/pnpm) | Rust | MIT | [v12.5.1](https://github.com/pnpm/pnpm/releases/tag/v12.5.1) signed | 36609 | npm (full) |
| [npm](https://github.com/npm/cli) | JavaScript | Other | [libnpmpack-v9.1.13](https://github.com/npm/cli/releases/tag/libnpmpack-v9.1.13) | 10129 | none |
| [Yarn](https://github.com/yarnpkg/berry) | TypeScript | BSD-2-Clause | [@yarnpkg/cli/4.18.0](https://github.com/yarnpkg/berry/releases/tag/%40yarnpkg/cli/4.18.0) | 8104 | npm (full) |

### JavaScript bundlers

Bundle, transform and serve front-end code.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Vite](https://github.com/vitejs/vite) | TypeScript | MIT | [create-vite@9.2.1](https://github.com/vitejs/vite/releases/tag/create-vite%409.2.1) signed | 82945 | webpack (full) |
| [webpack](https://github.com/webpack/webpack) | JavaScript | MIT | [v5.111.1](https://github.com/webpack/webpack/releases/tag/v5.111.1) signed | 65950 | none |
| [Parcel](https://github.com/parcel-bundler/parcel) | JavaScript | MIT | [v2.16.4](https://github.com/parcel-bundler/parcel/releases/tag/v2.16.4) | 44023 | webpack (full) |
| [esbuild](https://github.com/evanw/esbuild) | Go | MIT | [v0.28.2](https://github.com/evanw/esbuild/releases/tag/v0.28.2) | 40067 | webpack (partial) |
| [Rspack](https://github.com/web-infra-dev/rspack) | Rust | MIT | [v2.2.6](https://github.com/web-infra-dev/rspack/releases/tag/v2.2.6) | 12915 | webpack (drop-in) |

### JavaScript linting and formatting

Linters and formatters for JavaScript and TypeScript.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Prettier](https://github.com/prettier/prettier) | JavaScript | MIT | [3.9.8](https://github.com/prettier/prettier/releases/tag/3.9.8) | 52294 | none |
| [ESLint](https://github.com/eslint/eslint) | JavaScript | MIT | [v10.11.0](https://github.com/eslint/eslint/releases/tag/v10.11.0) | 27516 | none |
| [Biome](https://github.com/biomejs/biome) | Rust | Apache-2.0 | [@biomejs/biome@2.5.14](https://github.com/biomejs/biome/releases/tag/%40biomejs/biome%402.5.14) signed | 25841 | ESLint (partial), Prettier (full) |
| [Oxc](https://github.com/oxc-project/oxc) | Rust | MIT | [oxlint_v1.85.0](https://github.com/oxc-project/oxc/releases/tag/oxlint_v1.85.0) | 22845 | ESLint (partial) |
| [dprint](https://github.com/dprint/dprint) | Rust | MIT | [0.57.4](https://github.com/dprint/dprint/releases/tag/0.57.4) | 4079 | Prettier (full) |

### JavaScript test runners

Run unit and integration tests for JavaScript and TypeScript.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Jest](https://github.com/jestjs/jest) | TypeScript | MIT | [v30.5.2](https://github.com/jestjs/jest/releases/tag/v30.5.2) | 45463 | none |
| [Vitest](https://github.com/vitest-dev/vitest) | TypeScript | MIT | [v5.0.1](https://github.com/vitest-dev/vitest/releases/tag/v5.0.1) signed | 17143 | Jest (full) |

### Python packaging

Install dependencies, manage environments and lock Python projects.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [uv](https://github.com/astral-sh/uv) | Rust | Apache-2.0 | [0.12.17](https://github.com/astral-sh/uv/releases/tag/0.12.17) signed | 90061 | pip (full), Poetry (full) |
| [Poetry](https://github.com/python-poetry/poetry) | Python | MIT | [2.5.1](https://github.com/python-poetry/poetry/releases/tag/2.5.1) | 34308 | none |
| [pip](https://github.com/pypa/pip) | Python | MIT | [26.2.1](https://github.com/pypa/pip/releases/tag/26.2.1) signed | 10287 | none |
| [PDM](https://github.com/pdm-project/pdm) | Python | MIT | [2.29.2](https://github.com/pdm-project/pdm/releases/tag/2.29.2) | 8669 | Poetry (full) |

### Python linting and formatting

Linters and formatters for Python.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Ruff](https://github.com/astral-sh/ruff) | Rust | MIT | [0.16.8](https://github.com/astral-sh/ruff/releases/tag/0.16.8) signed | 49731 | Flake8 (full), Black (drop-in), Pylint (partial) |
| [Black](https://github.com/psf/black) | Python | MIT | [26.5.1](https://github.com/psf/black/releases/tag/26.5.1) signed | 41848 | none |
| [Pylint](https://github.com/pylint-dev/pylint) | Python | GPL-2.0 | [v4.0.8](https://github.com/pylint-dev/pylint/releases/tag/v4.0.8) | 5725 | none |
| [Flake8](https://github.com/PyCQA/flake8) | Python | Other | [7.3.0](https://github.com/PyCQA/flake8/releases/tag/7.3.0) signed | 3823 | none |

### Infrastructure as code

Declare cloud infrastructure in files and apply the difference.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Terraform](https://github.com/hashicorp/terraform) | Go | Other | [v1.16.3](https://github.com/hashicorp/terraform/releases/tag/v1.16.3) signed | 49708 | none |
| [OpenTofu](https://github.com/opentofu/opentofu) | Go | MPL-2.0 | [v1.12.6](https://github.com/opentofu/opentofu/releases/tag/v1.12.6) signed | 30257 | Terraform (drop-in) |
| [Pulumi](https://github.com/pulumi/pulumi) | Go | Apache-2.0 | [v3.263.0](https://github.com/pulumi/pulumi/releases/tag/v3.263.0) signed | 25720 | Terraform (full) |

### Container engines

Build and run OCI containers.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Docker Engine (Moby)](https://github.com/moby/moby) | Go | Apache-2.0 | [docker-v29.8.1](https://github.com/moby/moby/releases/tag/docker-v29.8.1) signed | 72126 | none |
| [Podman](https://github.com/podman-container-tools/podman) | Go | Apache-2.0 | [v6.1.2](https://github.com/podman-container-tools/podman/releases/tag/v6.1.2) signed | 32912 | Docker Engine (Moby) (drop-in) |

### In-memory key-value stores

Caches and data structure servers speaking the Redis protocol or close to it.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Redis](https://github.com/redis/redis) | C | Other | [8.10.2](https://github.com/redis/redis/releases/tag/8.10.2) | 76445 | none |
| [Dragonfly](https://github.com/dragonflydb/dragonfly) | C++ | Other | [v2.0.0](https://github.com/dragonflydb/dragonfly/releases/tag/v2.0.0) signed | 31654 | Redis (drop-in) |
| [Valkey](https://github.com/valkey-io/valkey) | C | BSD-3-Clause | [9.1.2](https://github.com/valkey-io/valkey/releases/tag/9.1.2) signed | 27275 | Redis (drop-in) |
| [KeyDB](https://github.com/Snapchat/KeyDB) | C++ | BSD-3-Clause | [v6.3.4](https://github.com/Snapchat/KeyDB/releases/tag/v6.3.4) | 12505 | Redis (drop-in) |

### Search engines

Full-text search servers.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Elasticsearch](https://github.com/elastic/elasticsearch) | Java | Other | [v9.5.4](https://github.com/elastic/elasticsearch/releases/tag/v9.5.4) signed | 77963 | none |
| [Meilisearch](https://github.com/meilisearch/meilisearch) | Rust | Other | [v1.54.0](https://github.com/meilisearch/meilisearch/releases/tag/v1.54.0) signed | 59369 | Elasticsearch (partial) |
| [Typesense](https://github.com/typesense/typesense) | C++ | GPL-3.0 | [v30.2](https://github.com/typesense/typesense/releases/tag/v30.2) | 26579 | Elasticsearch (partial) |
| [OpenSearch](https://github.com/opensearch-project/OpenSearch) | Java | Apache-2.0 | [3.8.0](https://github.com/opensearch-project/OpenSearch/releases/tag/3.8.0) signed | 13756 | Elasticsearch (full) |

### Metrics and monitoring

Collect, store and query time series.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Prometheus](https://github.com/prometheus/prometheus) | Go | Apache-2.0 | [v3.14.0](https://github.com/prometheus/prometheus/releases/tag/v3.14.0) signed | 66173 | none |
| [VictoriaMetrics](https://github.com/VictoriaMetrics/VictoriaMetrics) | Go | Apache-2.0 | [v1.152.0](https://github.com/VictoriaMetrics/VictoriaMetrics/releases/tag/v1.152.0) | 17754 | Prometheus (full) |

### Command-line HTTP clients

Send HTTP requests from a terminal.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [HTTPie](https://github.com/httpie/cli) | Python | BSD-3-Clause | [3.2.4](https://github.com/httpie/cli/releases/tag/3.2.4) | 38561 | none |
| [xh](https://github.com/ducaale/xh) | Rust | MIT | [v0.26.2](https://github.com/ducaale/xh/releases/tag/v0.26.2) | 8088 | HTTPie (full) |

### Code search

Search file contents recursively from a terminal.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [ripgrep](https://github.com/BurntSushi/ripgrep) | Rust | Unlicense | [15.2.0](https://github.com/BurntSushi/ripgrep/releases/tag/15.2.0) signed | 68505 | The Silver Searcher (full) |
| [The Silver Searcher](https://github.com/ggreer/the_silver_searcher) | C | Apache-2.0 | [2.2.0](https://github.com/ggreer/the_silver_searcher/releases/tag/2.2.0) | 27122 | none |

### API clients

Build, send and share HTTP and GraphQL requests from a desktop or browser app.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Hoppscotch](https://github.com/hoppscotch/hoppscotch) | TypeScript | MIT | [2026.8.1](https://github.com/hoppscotch/hoppscotch/releases/tag/2026.8.1) signed | 80468 | Insomnia (full) |
| [Bruno](https://github.com/usebruno/bruno) | JavaScript | MIT | [v4.1.0](https://github.com/usebruno/bruno/releases/tag/v4.1.0) | 47110 | Insomnia (full) |
| [Insomnia](https://github.com/Kong/insomnia) | TypeScript | Apache-2.0 | [core@13.2.0](https://github.com/Kong/insomnia/releases/tag/core%4013.2.0) | 40027 | none |

### Monorepo tools

Run, cache and orchestrate tasks across the packages of one repository.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Lerna](https://github.com/lerna/lerna) | TypeScript | MIT | [v10.0.1](https://github.com/lerna/lerna/releases/tag/v10.0.1) | 36054 | none |
| [Turborepo](https://github.com/vercel/turborepo) | Rust | MIT | [v2.11.2](https://github.com/vercel/turborepo/releases/tag/v2.11.2) signed | 31126 | Lerna (partial) |
| [Nx](https://github.com/nrwl/nx) | TypeScript | MIT | [23.2.1](https://github.com/nrwl/nx/releases/tag/23.2.1) signed | 29364 | Lerna (full) |
| [moon](https://github.com/moonrepo/moon) | Rust | MIT | [v2.5.5](https://github.com/moonrepo/moon/releases/tag/v2.5.5) | 4113 | Lerna (partial) |

### Shell prompts

Customisable prompts showing git state, runtimes and context.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Starship](https://github.com/starship/starship) | Rust | ISC | [v1.26.0](https://github.com/starship/starship/releases/tag/v1.26.0) signed | 59993 | Powerlevel10k (full) |
| [Powerlevel10k](https://github.com/romkatv/powerlevel10k) | Shell | MIT | [v1.20.0](https://github.com/romkatv/powerlevel10k/releases/tag/v1.20.0) signed | 55137 | none |
| [Oh My Posh](https://github.com/JanDeDobbeleer/oh-my-posh) | Go | MIT | [v31.3.0](https://github.com/JanDeDobbeleer/oh-my-posh/releases/tag/v31.3.0) | 23492 | Powerlevel10k (full) |

### Terminal multiplexers

Split, detach and reattach terminal sessions.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [tmux](https://github.com/tmux/tmux) | C | ISC | [3.7c](https://github.com/tmux/tmux/releases/tag/3.7c) | 49429 | none |
| [Zellij](https://github.com/zellij-org/zellij) | Rust | MIT | [v0.45.1](https://github.com/zellij-org/zellij/releases/tag/v0.45.1) | 35505 | tmux (full) |

### Document databases

Databases storing JSON-like documents.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [MongoDB](https://github.com/mongodb/mongo) | C++ | Other | [show](https://github.com/mongodb/mongo/releases/tag/show) | 28574 | none |
| [FerretDB](https://github.com/FerretDB/FerretDB) | Go | Apache-2.0 | [v2.7.0](https://github.com/FerretDB/FerretDB/releases/tag/v2.7.0) signed | 11075 | MongoDB (drop-in) |

### Event streaming

Durable, partitioned logs for events and messages.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Apache Kafka](https://github.com/apache/kafka) | Java | Apache-2.0 | [show](https://github.com/apache/kafka/releases/tag/show) | 33782 | none |
| [Redpanda](https://github.com/redpanda-data/redpanda) | C++ | none | [v26.2.2](https://github.com/redpanda-data/redpanda/releases/tag/v26.2.2) signed | 12562 | Apache Kafka (drop-in) |

### Web servers and reverse proxies

Serve sites, terminate TLS and route traffic to services.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Caddy](https://github.com/caddyserver/caddy) | Go | Apache-2.0 | [v2.11.4](https://github.com/caddyserver/caddy/releases/tag/v2.11.4) signed | 75985 | nginx (full) |
| [Traefik](https://github.com/traefik/traefik) | Go | MIT | [v3.7.13](https://github.com/traefik/traefik/releases/tag/v3.7.13) signed | 64924 | nginx (partial) |
| [nginx](https://github.com/nginx/nginx) | C | BSD-2-Clause | [release-1.31.6](https://github.com/nginx/nginx/releases/tag/release-1.31.6) | 31707 | none |

### Documentation site generators

Turn Markdown into a searchable documentation site.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Docusaurus](https://github.com/facebook/docusaurus) | TypeScript | MIT | [v3.10.2](https://github.com/facebook/docusaurus/releases/tag/v3.10.2) | 66316 | none |
| [VitePress](https://github.com/vuejs/vitepress) | TypeScript | MIT | [v2.0.0-alpha.20](https://github.com/vuejs/vitepress/releases/tag/v2.0.0-alpha.20) | 18344 | Docusaurus (full) |
| [Starlight](https://github.com/withastro/starlight) | TypeScript | MIT | [@astrojs/starlight@0.42.2](https://github.com/withastro/starlight/releases/tag/%40astrojs/starlight%400.42.2) signed | 9282 | Docusaurus (full) |

### Static site generators

Build websites from templates and content files.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Hugo](https://github.com/gohugoio/hugo) | Go | Apache-2.0 | [v0.166.0](https://github.com/gohugoio/hugo/releases/tag/v0.166.0) | 89904 | Jekyll (full) |
| [Jekyll](https://github.com/jekyll/jekyll) | Ruby | MIT | [v4.4.1](https://github.com/jekyll/jekyll/releases/tag/v4.4.1) | 51680 | none |
| [Eleventy](https://github.com/11ty/buildawesome) | JavaScript | MIT | [v3.1.6](https://github.com/11ty/buildawesome/releases/tag/v3.1.6) | 19929 | Jekyll (full) |
| [Zola](https://github.com/getzola/zola) | Rust | EUPL-1.2 | [v0.23.6](https://github.com/getzola/zola/releases/tag/v0.23.6) | 17463 | Jekyll (full) |

### Python type checkers

Check Python type annotations before the code runs.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [mypy](https://github.com/python/mypy) | Python | Other | [v2.3.1](https://github.com/python/mypy/releases/tag/v2.3.1) | 20648 | none |
| [ty](https://github.com/astral-sh/ty) | Python | MIT | [0.0.83](https://github.com/astral-sh/ty/releases/tag/0.0.83) signed | 19731 | mypy (full) |
| [Pyright](https://github.com/microsoft/pyright) | Python | Other | [1.1.414](https://github.com/microsoft/pyright/releases/tag/1.1.414) | 15654 | mypy (full) |

### Node.js web frameworks

Routing and middleware for HTTP servers in JavaScript and TypeScript.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Express](https://github.com/expressjs/express) | JavaScript | MIT | [v5.2.1](https://github.com/expressjs/express/releases/tag/v5.2.1) | 69456 | none |
| [Fastify](https://github.com/fastify/fastify) | JavaScript | MIT | [v5.12.5](https://github.com/fastify/fastify/releases/tag/v5.12.5) signed | 37184 | Express (full) |
| [Hono](https://github.com/honojs/hono) | TypeScript | MIT | [v4.13.8](https://github.com/honojs/hono/releases/tag/v4.13.8) | 32302 | Express (full) |

### TypeScript ORMs

Typed database access and migrations for TypeScript.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [Prisma ORM](https://github.com/prisma/orm) | TypeScript | Apache-2.0 | [v0.17.0](https://github.com/prisma/orm/releases/tag/v0.17.0) signed | 47656 | none |
| [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm) | TypeScript | Apache-2.0 | [drizzle-kit@0.31.11](https://github.com/drizzle-team/drizzle-orm/releases/tag/drizzle-kit%400.31.11) signed | 35854 | Prisma ORM (full) |

### Object storage

Self-hosted servers speaking the S3 API.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [MinIO](https://github.com/minio/minio) archived | Go | AGPL-3.0 | [RELEASE.2025-10-15T17-29-55Z](https://github.com/minio/minio/releases/tag/RELEASE.2025-10-15T17-29-55Z) | 61357 | none |
| [SeaweedFS](https://github.com/seaweedfs/seaweedfs) | Go | Apache-2.0 | [4.47](https://github.com/seaweedfs/seaweedfs/releases/tag/4.47) | 34897 | MinIO (full) |
| [RustFS](https://github.com/rustfs/rustfs) | Rust | Apache-2.0 | [1.0.0](https://github.com/rustfs/rustfs/releases/tag/1.0.0) | 33647 | MinIO (full) |

<!-- catalog:end -->

## Contributing

Adding a tool is one file and one pull request, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Site and API

[`site/`](site) is the website, an Astro build with a React island for search. Every tool and every
"alternatives to" page is prerendered from `generated/catalog.json`. [`api/`](api) serves the same
catalog over HTTP, with filters and the natural-language search the site calls.

Both are versioned by [FerrFlow](https://ferrflow.com) from their commits and released as
`api-vX.Y.Z` and `site-vX.Y.Z`. Each release pushes `ghcr.io/awesome-alternatives/api:X.Y.Z` or
`ghcr.io/awesome-alternatives/site:X.Y.Z`. The nightly catalog refresh counts as a patch for the
site, so a change in stars or releases ships a new site image the same night.

## Licence

The catalog data under `data/` is dedicated to the public domain under [CC0 1.0](LICENSE-DATA). The scripts and the API are [MIT](LICENSE).
