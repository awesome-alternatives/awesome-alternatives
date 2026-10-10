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

Each category has its own page under [`catalog/`](catalog), because GitHub stops rendering a README
at 500 KiB. The same data, searchable in plain words ("semantic-release, but written
in Rust"), is on [awesome-alternatives.com](https://awesome-alternatives.com).

<!-- catalog:start -->

| Category | Tools | What it covers |
|---|---:|---|
| [Release automation](catalog/release-automation.md) | 11 | Version bumps, changelogs, tags and published releases from commit history. |
| [Changelog generation](catalog/changelog.md) | 5 | Changelogs built from commits or pull requests, without driving the release itself. |
| [JavaScript runtimes](catalog/javascript-runtime.md) | 5 | Engines that run JavaScript and TypeScript outside the browser. |
| [JavaScript package managers](catalog/javascript-package-manager.md) | 3 | Install and lock npm dependencies. |
| [JavaScript bundlers](catalog/javascript-bundler.md) | 10 | Bundle, transform and serve front-end code. |
| [JavaScript linting and formatting](catalog/javascript-lint-format.md) | 6 | Linters and formatters for JavaScript and TypeScript. |
| [JavaScript test runners](catalog/javascript-test-runner.md) | 5 | Run unit and integration tests for JavaScript and TypeScript. |
| [Python packaging](catalog/python-packaging.md) | 12 | Install dependencies, manage environments and lock Python projects. |
| [Python linting and formatting](catalog/python-lint-format.md) | 6 | Linters and formatters for Python. |
| [Linters and formatters](catalog/lint-format.md) | 35 | Linters, static checkers and formatters for Go, the JVM, PHP, Ruby, Swift, Lua, shell, SQL, Markdown, config files and code spelling, and formatters that cover many languages. |
| [Infrastructure as code](catalog/infrastructure-as-code.md) | 18 | Declare cloud infrastructure in files and apply the difference. |
| [Container engines](catalog/container-engine.md) | 18 | Build and run OCI containers. |
| [In-memory key-value stores](catalog/key-value-store.md) | 9 | Caches and data structure servers speaking the Redis protocol or close to it. |
| [Search engines](catalog/search-engine.md) | 15 | Full-text search servers. |
| [Metrics and monitoring](catalog/metrics.md) | 19 | Collect, store and query time series. |
| [Command-line HTTP clients](catalog/http-client.md) | 5 | Send HTTP requests from a terminal. |
| [Code and file search](catalog/code-search.md) | 8 | Search file contents recursively, or find files by name, type, size or date, from a terminal. |
| [API clients](catalog/api-client.md) | 12 | Build, send and share HTTP, GraphQL and gRPC requests from a desktop or browser app, or call gRPC services from the command line. |
| [Monorepo tools](catalog/monorepo-tool.md) | 9 | Run, cache and orchestrate tasks across the packages of one repository. |
| [Shell prompts](catalog/shell-prompt.md) | 10 | Customisable prompts showing git state, runtimes and context. |
| [Terminal multiplexers](catalog/terminal-multiplexer.md) | 3 | Split, detach and reattach terminal sessions. |
| [Document databases](catalog/document-database.md) | 10 | Databases storing JSON-like documents. |
| [Wide-column databases](catalog/wide-column-database.md) | 4 | Distributed databases storing wide, sparse rows partitioned across nodes. |
| [Graph databases](catalog/graph-database.md) | 13 | Databases storing nodes and the relationships between them, queried by traversing the graph. |
| [Event streaming](catalog/message-streaming.md) | 15 | Durable, partitioned logs for events and messages. |
| [Web servers and reverse proxies](catalog/reverse-proxy.md) | 31 | Serve sites, terminate TLS and route traffic to services. |
| [Documentation site generators](catalog/documentation-site.md) | 16 | Turn Markdown into a searchable documentation site. |
| [Static site generators](catalog/static-site-generator.md) | 15 | Build websites from templates and content files. |
| [Python type checkers](catalog/python-type-checker.md) | 5 | Check Python type annotations before the code runs. |
| [Node.js web frameworks](catalog/node-web-framework.md) | 8 | Routing and middleware for HTTP servers in JavaScript and TypeScript. |
| [TypeScript ORMs](catalog/typescript-orm.md) | 7 | Typed database access and migrations for TypeScript. |
| [Object storage](catalog/object-storage.md) | 5 | Self-hosted servers speaking the S3 API. |
| [CI servers](catalog/ci-server.md) | 10 | Self-hosted servers that run build and deployment pipelines. |
| [Git forges](catalog/git-forge.md) | 7 | Self-hosted repositories, code review and issues. |
| [Password manager servers](catalog/password-manager-server.md) | 5 | Self-hosted back ends for password vaults. |
| [Web analytics](catalog/web-analytics.md) | 14 | Self-hostable, privacy-friendly site analytics. |
| [Uptime monitoring](catalog/uptime-monitoring.md) | 13 | Check that services answer, alert when they do not, and publish a status page. |
| [Log pipelines](catalog/log-pipeline.md) | 9 | Collect, transform and ship logs and events. |
| [Team chat](catalog/team-chat.md) | 18 | Self-hosted messaging for teams. |
| [Terminal emulators](catalog/terminal-emulator.md) | 16 | Desktop terminal applications. |
| [Code editors](catalog/text-editor.md) | 28 | Editors for writing code. |
| [File listing](catalog/file-listing.md) | 5 | Replacements for ls with colours, icons and git status. |
| [Git diff pagers](catalog/git-diff-pager.md) | 6 | Make git diff output readable in a terminal. |
| [JSON processors](catalog/json-processor.md) | 9 | Query and transform JSON from the command line. |
| [Load testing](catalog/load-testing.md) | 14 | Generate traffic to measure how a service holds up. |
| [Browser automation and testing](catalog/browser-testing.md) | 8 | Drive real browsers for end-to-end tests. |
| [Python web frameworks](catalog/python-web-framework.md) | 11 | Build HTTP APIs and sites in Python. |
| [Python HTTP clients](catalog/python-http-client.md) | 5 | Send HTTP requests from Python. |
| [JavaScript date libraries](catalog/javascript-date-library.md) | 5 | Parse, format and compute dates in JavaScript. |
| [Secrets managers](catalog/secrets-manager.md) | 6 | Store, rotate and hand out secrets to applications. |
| [Git LFS servers](catalog/git-lfs-server.md) | 4 | Serve Git LFS objects for repositories hosted anywhere. |
| [Minecraft servers](catalog/minecraft-server.md) | 8 | Server software for Minecraft: Java Edition, from forks of the Bukkit line to implementations written from scratch. |
| [File sync and share](catalog/file-sync.md) | 14 | Self-hosted storage for files you reach from more than one machine, over WebDAV, a sync client or a web file manager. |
| [AI coding agents and assistants](catalog/coding-agent.md) | 22 | Agents that read a codebase, edit files and run commands from a prompt, and completions and chat inside the editor, backed by a hosted or a local model. |
| [AI chat interfaces](catalog/chat-interface.md) | 18 | Apps to chat with language models, whether the model runs locally or behind an API. |
| [Local model runtimes](catalog/llm-runtime.md) | 18 | Run open-weight language models on your own hardware, behind a local API. |
| [Container desktops and local Kubernetes](catalog/container-desktop.md) | 12 | Run containers and a Kubernetes cluster on a laptop or in CI, with the engine managed for you. |
| [Dashboards](catalog/dashboards.md) | 5 | Build dashboards and explore metrics, logs and traces from a web UI. |
| [Actor toolkits](catalog/actor-framework.md) | 3 | Actor-model runtimes for building concurrent and distributed JVM applications. |
| [Distributed SQL databases](catalog/distributed-sql.md) | 7 | SQL databases that spread data across nodes and speak the PostgreSQL wire protocol. |
| [Error tracking](catalog/error-tracking.md) | 5 | Collect exceptions from applications through an SDK and group them into issues. |
| [Tracing and continuous profiling](catalog/tracing.md) | 14 | Collect and search traces of requests as they cross services, and CPU and memory profiles of running services over time. |
| [Time-series databases](catalog/time-series-database.md) | 7 | Store and query timestamped measurements at high write rates. |
| [Encrypted files in git](catalog/encrypted-files.md) | 6 | Keep secrets in a repository, encrypted, and decrypted only by the people and machines allowed to. |
| [Log storage](catalog/log-storage.md) | 6 | Store logs at volume and search them, the back end behind log dashboards. |
| [Relational databases](catalog/relational-database.md) | 24 | General-purpose SQL databases. |
| [Configuration management](catalog/config-management.md) | 17 | Describe the state of servers in code and converge them to it. |
| [Workflow automation](catalog/workflow-automation.md) | 8 | Connect apps and APIs with trigger-and-action workflows, and turn operational runbooks into jobs that run on servers with an audit trail. |
| [GitOps](catalog/gitops.md) | 6 | Keep Kubernetes clusters in sync with manifests stored in git. |
| [Container registries](catalog/container-registry.md) | 8 | Store and serve OCI images and artefacts. |
| [Identity providers](catalog/identity-provider.md) | 24 | Single sign-on, user directories and MFA over OpenID Connect, SAML or LDAP, including two-factor servers for VPNs and applications. |
| [Mesh VPNs](catalog/mesh-vpn.md) | 10 | Connect devices and servers in a private WireGuard network, wherever they are. |
| [Remote desktop](catalog/remote-desktop.md) | 9 | Control another computer over the network, for support or remote work. |
| [Wikis and knowledge bases](catalog/knowledge-base.md) | 18 | Shared pages and documentation for teams, edited in the browser. |
| [Note-taking apps](catalog/note-taking.md) | 21 | Personal notes on desktop and mobile, with sync. |
| [Recipe managers](catalog/recipe-manager.md) | 8 | Keep recipes, plan meals and build shopping lists from them. |
| [Project management](catalog/project-management.md) | 25 | Issues, tasks and boards for planning team work. |
| [Video conferencing](catalog/video-conferencing.md) | 11 | Video meetings in the browser or an app. |
| [Newsletters and email marketing](catalog/newsletter.md) | 11 | Mailing lists, campaigns and subscriber management. |
| [Forms and surveys](catalog/forms-surveys.md) | 9 | Build forms and surveys and collect the answers. |
| [Photo libraries](catalog/photo-library.md) | 12 | Back up, browse and share photos and videos from your phones. |
| [Media servers](catalog/media-server.md) | 23 | Stream a personal library of films, series, music and podcasts to your devices. |
| [Video hosting and streaming](catalog/video-hosting.md) | 12 | Publish videos and live streams on your own site for an audience to watch. |
| [Book and comic servers](catalog/book-server.md) | 8 | Serve a personal library of ebooks, comics and manga to readers and reading apps. |
| [Business intelligence](catalog/business-intelligence.md) | 12 | Query databases and build charts and dashboards for the rest of the company. |
| [Backend as a service](catalog/backend-as-a-service.md) | 10 | Auth, database, storage and APIs for an app, without writing the backend. |
| [Self-hosted PaaS](catalog/self-hosted-paas.md) | 12 | Deploy apps and databases to your own servers from a git push or a dashboard. |
| [Headless CMS](catalog/headless-cms.md) | 15 | Manage content in an admin UI and deliver it to any front end through an API. |
| [Website CMS](catalog/website-cms.md) | 22 | Run a website from a web back office, with pages, menus, themes and plugins. |
| [Blogging engines](catalog/blogging.md) | 4 | Publish a blog with posts, tags, themes and comments from your own server. |
| [Comment systems](catalog/comments.md) | 6 | Embed a comment thread under the pages of a static or dynamic site. |
| [Link-in-bio pages](catalog/link-in-bio.md) | 3 | Publish a single page listing your links, for the profile of a social account. |
| [Feature flags](catalog/feature-flags.md) | 8 | Turn features on for some users without a deploy, and run experiments. |
| [Database migrations](catalog/database-migrations.md) | 15 | Version and apply database schema changes. |
| [Kubernetes UIs](catalog/kubernetes-ui.md) | 10 | Browse and operate Kubernetes clusters from a desktop, web or terminal UI. |
| [Virtualization](catalog/virtualization.md) | 12 | Run virtual machines and system containers across a cluster of hosts. |
| [Code search servers](catalog/code-search-server.md) | 4 | Index many repositories and search them from a web UI. |
| [Data integration](catalog/data-integration.md) | 23 | Extract data from applications and databases and load it into a warehouse. |
| [JavaScript HTTP clients](catalog/javascript-http-client.md) | 6 | Send HTTP requests from Node.js and browsers. |
| [JavaScript utility libraries](catalog/javascript-utility.md) | 5 | Helpers for arrays, objects, strings and functions. |
| [CSS processing](catalog/css-processing.md) | 7 | Compile, transform, prefix and minify stylesheets. |
| [JavaScript schema validation](catalog/javascript-validation.md) | 7 | Declare schemas and validate data against them at runtime. |
| [React state management](catalog/react-state.md) | 6 | Share and update application state across React components. |
| [Python task queues](catalog/python-task-queue.md) | 6 | Run background jobs from Python through a broker. |
| [DataFrame libraries](catalog/dataframe.md) | 8 | Load, transform and analyse tabular data in memory. |
| [System monitors](catalog/system-monitor.md) | 8 | Watch processes and resource use from a terminal. |
| [Directory jumpers](catalog/directory-jumper.md) | 4 | Jump to frequently used directories with a few keystrokes. |
| [Fuzzy finders and history search](catalog/fuzzy-finder.md) | 8 | Filter lists interactively in a terminal, for files, anything piped in and the shell history, which some also sync between machines. |
| [Shells](catalog/shell.md) | 8 | Interactive command-line shells. |
| [Git clients and extensions](catalog/git-client.md) | 17 | Stage, commit, branch, browse and rewrite history outside the bare git command, from a GUI, a terminal UI or extra subcommands. |
| [Office suites](catalog/office-suite.md) | 7 | Documents, spreadsheets and presentations. |
| [Document management](catalog/document-management.md) | 7 | Scan, OCR, tag and search paper and PDF documents. |
| [Interface design tools](catalog/design-tool.md) | 11 | Design and prototype user interfaces on a shared canvas. |
| [Diagrams and whiteboards](catalog/diagramming.md) | 19 | Draw diagrams and sketch on a shared canvas. |
| [Screen and terminal recording](catalog/screen-recording.md) | 16 | Record the screen, the camera or a terminal session and share it as a video, a GIF or a replayable cast. |
| [Authenticator apps](catalog/authenticator-app.md) | 6 | Generate one-time codes for two-factor authentication. |
| [Writing assistants](catalog/writing-assistant.md) | 5 | Check grammar, spelling and style as you type. |
| [Machine translation](catalog/machine-translation.md) | 7 | Translate text between languages, through an API or a web UI. |
| [Read-later and bookmarks](catalog/read-later.md) | 11 | Save links and articles to read or find again later. |
| [Feed readers and generators](catalog/feed-reader.md) | 19 | Follow sites through RSS and Atom feeds, and produce feeds for sites and accounts that do not publish one. |
| [DNS ad blockers](catalog/dns-sinkhole.md) | 5 | Block ads and trackers for a whole network at the DNS level. |
| [ERP](catalog/erp.md) | 13 | Accounting, inventory, sales and operations in one system. |
| [Budgeting and personal finance](catalog/personal-finance.md) | 17 | Track accounts, spending and budgets for a person or a household. |
| [CRM](catalog/crm.md) | 12 | Track contacts, companies and deals. |
| [Help desks](catalog/helpdesk.md) | 17 | Handle customer requests from email, chat and other channels as tickets. |
| [E-commerce and point of sale](catalog/e-commerce.md) | 23 | Run an online store, from catalogue to checkout, or ring up in-store sales and print receipts. |
| [URL shorteners](catalog/url-shortener.md) | 7 | Short links on your own domain, with click statistics. |
| [Mail servers](catalog/mail-server.md) | 25 | Host email for your own domains, archive and search every message for retention, and collect the DMARC reports sent about your domains. |
| [Cloud development environments](catalog/cloud-ide.md) | 4 | Development environments on a remote machine, reached from a browser or a local editor. |
| [Service meshes](catalog/service-mesh.md) | 5 | Encrypt, route and observe traffic between services in a cluster. |
| [API gateways](catalog/api-gateway.md) | 11 | Route, authenticate and rate-limit API traffic in front of services. |
| [Workflow orchestration](catalog/workflow-orchestration.md) | 15 | Schedule and run data pipelines and jobs as dependency graphs. |
| [Vector databases](catalog/vector-database.md) | 11 | Store embeddings and search them by similarity. |
| [Analytical databases](catalog/analytical-database.md) | 13 | Columnar SQL engines for analytics over large datasets. |
| [Home automation](catalog/home-automation.md) | 14 | Control and automate smart home devices locally. |
| [Terminal file managers](catalog/terminal-file-manager.md) | 11 | Browse, preview and move files from a keyboard-driven interface in the terminal. |
| [Mock servers](catalog/mock-server.md) | 6 | Stand in for HTTP APIs during development and tests with recorded or declared responses. |
| [API documentation](catalog/api-documentation.md) | 5 | Render interactive API reference pages from OpenAPI and AsyncAPI documents. |
| [Code documentation generators](catalog/code-documentation.md) | 5 | Build reference documentation from source code and its doc comments. |
| [Stacked pull requests](catalog/stacked-pull-requests.md) | 5 | Split a change into a stack of dependent branches or commits and keep their pull requests in sync. |
| [Build systems and compiler caches](catalog/build-system.md) | 12 | Compile, test and package projects from a declared build, for C, C++, the JVM and other languages, and cache compiler output between builds. |
| [System package managers](catalog/system-package-manager.md) | 9 | Install command-line tools and applications on macOS, Windows or Linux from package definitions. |
| [C and C++ package managers](catalog/cpp-package-manager.md) | 2 | Fetch, build and version C and C++ libraries for a project. |
| [Development environments](catalog/dev-environment.md) | 5 | Declare a project's tools and services in a file and get the same shell on every machine. |
| [Debuggers](catalog/debugger.md) | 6 | Step through running programs, inspect their state and replay their execution. |
| [Profilers and benchmarking](catalog/profiler.md) | 12 | Measure where a program spends its time and memory, draw it as flame graphs or timelines, and time commands over repeated runs. |
| [Terminal file and log viewers](catalog/file-viewer.md) | 5 | Show files in the terminal with syntax highlighting or rendering, and read, highlight and filter log files. |
| [Hex editors](catalog/hex-editor.md) | 4 | View and edit the raw bytes of binary files. |
| [Command cheatsheets](catalog/cheatsheet.md) | 4 | Short, example-based help pages for command-line tools, read from the terminal. |
| [Find and replace](catalog/find-replace.md) | 3 | Search and replace text across files from the terminal, with previews or structural matching. |
| [Dependency update bots](catalog/dependency-updates.md) | 3 | Open pull requests that bump dependencies when new versions are released. |
| [Disk usage analyzers](catalog/disk-usage.md) | 3 | Show which directories and files take up the space on a disk. |
| [Task runners](catalog/task-runner.md) | 7 | Name a project's commands in one file and run them, as a lighter make. |
| [Git hooks and commit messages](catalog/git-hooks.md) | 8 | Install and run the checks a repository wants before a commit or a push, and check or prompt for commit messages in a convention. |
| [Runtime version managers](catalog/runtime-version-manager.md) | 12 | Install several versions of a language runtime and switch between them per project. |
| [Backup tools](catalog/backup.md) | 14 | Take deduplicated, encrypted snapshots of files and restore them from local or cloud storage. |
| [Code and repository statistics](catalog/code-statistics.md) | 6 | Count the lines of code, comments and blanks in a codebase by language, and summarise a git repository's contributors, activity and size. |
| [File watchers](catalog/file-watcher.md) | 5 | Run a command again whenever the files it depends on change. |
| [Scheduling](catalog/scheduling.md) | 9 | Share availability and let people book a meeting or vote on a date. |
| [Image editors](catalog/image-editing.md) | 7 | Edit raster and vector images, from retouching photos to drawing graphics. |
| [Raw photo editors](catalog/raw-photo-editing.md) | 5 | Develop camera raw files and manage a photo catalog non-destructively. |
| [Video editors](catalog/video-editing.md) | 14 | Cut, compose and render video on a timeline or a node graph. |
| [No-code databases](catalog/no-code-database.md) | 3 | Spreadsheet-like databases with views, forms and an API, built without code. |
| [E-signature](catalog/e-signature.md) | 4 | Send documents for signature and collect legally binding signatures online. |
| [Incident management](catalog/incident-management.md) | 5 | Route alerts, page whoever is on call and track incidents to resolution. |
| [Time tracking](catalog/time-tracking.md) | 9 | Log time against projects and clients, and turn it into reports or invoices. |
| [Image generation](catalog/image-generation.md) | 7 | Generate images from text prompts with diffusion models running on your own hardware. |
| [Mail testing](catalog/mail-testing.md) | 5 | Fake SMTP servers with a web inbox that catch the mail an application sends during development. |
| [Translation management](catalog/translation-management.md) | 4 | Localisation platforms where teams translate and review an application's strings. |
| [Push notifications](catalog/push-notifications.md) | 6 | Send push notifications to phones and desktops from a plain HTTP request. |
| [Vulnerability scanners](catalog/vulnerability-scanner.md) | 7 | Check dependencies and container images against databases of known vulnerabilities, and infrastructure code for insecure settings before it is applied. |
| [Pastebins](catalog/pastebin.md) | 4 | Share code snippets and text through a link. |
| [File sharing](catalog/file-sharing.md) | 4 | Send large files to someone through a link that expires. |
| [App launchers](catalog/app-launcher.md) | 10 | Open apps and files and run commands from the keyboard. |
| [Slides](catalog/slides.md) | 5 | Write presentations, often from Markdown or code instead of a visual editor. |
| [Internal tool builders](catalog/internal-tools.md) | 9 | Build internal apps and admin panels on top of databases and APIs. |
| [Database clients](catalog/database-client.md) | 25 | Desktop and web clients to browse, edit and query databases. |
| [LLM observability](catalog/llm-observability.md) | 9 | Trace, evaluate and monitor LLM applications. |
| [PDF tools](catalog/pdf-tools.md) | 3 | Edit, merge, split, convert and sign PDF files. |
| [Forums and Q&A](catalog/forum.md) | 13 | Community forums, link aggregators and question and answer sites. |
| [Billing](catalog/billing.md) | 6 | Usage-based billing, subscription management and invoicing. |
| [Payment processing](catalog/payments.md) | 4 | Accept and route online payments from servers you run. |
| [Webhook delivery](catalog/webhooks.md) | 4 | Send and receive webhooks with retries, signatures and delivery logs. |
| [SEO tools](catalog/seo.md) | 4 | Track search rankings and audit sites for technical SEO issues. |
| [Cookie consent](catalog/consent-management.md) | 3 | Show a consent banner and hold back tracking scripts until visitors agree. |
| [Event ticketing](catalog/event-ticketing.md) | 4 | Sell tickets, manage attendees and check people in at events. |
| [Image processing servers](catalog/image-proxy.md) | 3 | Resize, crop and convert images on the fly from URL parameters. |
| [Page change monitoring](catalog/page-change-monitoring.md) | 3 | Watch web pages and get alerts when they change. |
| [Notification infrastructure](catalog/notification-infrastructure.md) | 3 | Send product notifications across email, SMS, push, chat and in-app feeds from one API, with templates and user preferences. |
| [Privileged access](catalog/privileged-access.md) | 6 | Give engineers audited access to servers, databases and Kubernetes through one gateway, with short-lived credentials and session recording. |
| [Resume builders](catalog/resume-builder.md) | 3 | Write resumes from templates and export them to PDF. |
| [Artifact repositories](catalog/artifact-repository.md) | 11 | Host and proxy packages and build artefacts for Maven, npm, PyPI, containers and other formats. |
| [Static analysis](catalog/static-analysis.md) | 10 | Inspect source code for bugs, code smells and security issues, and track the findings across branches and pull requests. |
| [Telephony and SMS gateways](catalog/telephony.md) | 10 | Run voice calls, SIP trunks and SMS sending on your own servers behind an API. |
| [Chat clients](catalog/chat-client.md) | 20 | Desktop, mobile and web apps for Matrix, XMPP and IRC. |
| [Chat bridges](catalog/chat-bridge.md) | 6 | Relay conversations between Matrix and other chat networks, so one client reaches them all. |
| [Private messengers](catalog/messenger.md) | 10 | End-to-end encrypted messaging apps for one-to-one and group chats on a phone or a desktop. |
| [IRC servers](catalog/irc-server.md) | 4 | Run an IRC network or keep a persistent connection to one with a bouncer. |
| [Email clients](catalog/email-client.md) | 7 | Desktop, mobile and terminal apps that read and send mail over IMAP and SMTP. |
| [Webmail](catalog/webmail.md) | 4 | Read and send mail in the browser from an IMAP server you run. |
| [Email aliases](catalog/email-alias.md) | 3 | Hand out forwarding addresses that hide your real inbox and can be turned off one by one. |
| [Email templating](catalog/email-templating.md) | 3 | Write HTML emails from components or markup and compile them to code that renders across mail clients. |
| [Network video recorders](catalog/nvr.md) | 8 | Record, watch and analyse IP camera streams on your own hardware. |
| [Expense splitting](catalog/expense-splitting.md) | 3 | Track shared expenses in a group and work out who owes whom. |
| [Fitness tracking](catalog/fitness-tracking.md) | 9 | Log workouts, activities and body measurements, and follow progress over time. |
| [Habit trackers](catalog/habit-tracker.md) | 3 | Check off daily habits and follow streaks and progress. |
| [Web archiving](catalog/web-archiving.md) | 3 | Save complete copies of web pages so they stay readable after the original changes or disappears. |
| [Homelab dashboards](catalog/homelab-dashboard.md) | 8 | Start pages that link to self-hosted services and show their status and widgets. |
| [Browser start pages](catalog/start-page.md) | 3 | Replace the browser's new tab page with a clock, links, weather and backgrounds. |
| [Invoicing](catalog/invoicing.md) | 5 | Send quotes and invoices to clients and track the payments. |
| [HR management](catalog/hr-management.md) | 5 | Employee records, leave, recruitment and payroll. |
| [Embedded key-value stores](catalog/embedded-key-value.md) | 6 | Key-value storage engines linked into a program as a library, with no server to run. |
| [Distributed key-value stores](catalog/distributed-key-value.md) | 4 | Replicated, transactional key-value stores that run as a cluster. |
| [Lakehouse table formats](catalog/table-format.md) | 5 | Open table formats that add transactions, schema evolution and time travel to files on object storage. |
| [Database proxies and connection poolers](catalog/database-proxy.md) | 4 | Pool, route and multiplex client connections in front of a database server. |
| [Database backup](catalog/database-backup.md) | 3 | Physical backups, WAL archiving and point-in-time recovery for database servers. |
| [Database high availability](catalog/database-high-availability.md) | 2 | Manage replication and automatic failover for a cluster of database servers. |
| [LLM gateways](catalog/llm-gateway.md) | 4 | One OpenAI-compatible API in front of many model providers, with keys, budgets, fallbacks and usage logs. |
| [LLM evaluation](catalog/llm-evaluation.md) | 7 | Test prompts, models and agents against datasets, assertions and red-team probes, locally or in CI. |
| [LLM command-line tools](catalog/llm-cli.md) | 5 | Prompt language models from a terminal and pipe their answers into other commands. |
| [LLM app builders](catalog/llm-app-builder.md) | 8 | Build chatbots, agents and RAG workflows in a visual editor and serve them behind an API. |
| [Document Q&A](catalog/document-qa.md) | 9 | Ask questions about your own documents and sources through retrieval-augmented generation, with cited answers. |
| [AI search engines](catalog/ai-search.md) | 5 | Answer questions from live web searches with a language model, citing the pages it read. |
| [Autonomous AI agents](catalog/autonomous-agent.md) | 6 | Agents that plan and carry out multi-step tasks on their own, browsing, running code and calling tools. |
| [AI browser agents](catalog/browser-agent.md) | 7 | Let a language model drive a web browser to navigate sites, fill forms and extract data. |
| [AI app builders](catalog/ai-app-builder.md) | 5 | Generate and edit a web app or interface from a chat prompt, with a live preview. |
| [Speech to text](catalog/speech-to-text.md) | 15 | Transcribe recordings, meetings and dictation with speech recognition models on your own hardware. |
| [Text to speech](catalog/text-to-speech.md) | 9 | Generate speech from text, with voice cloning on some models, on your own hardware. |
| [OCR](catalog/ocr.md) | 5 | Recognise text in scanned documents and images. |
| [Document parsing](catalog/document-parsing.md) | 5 | Convert PDFs, office files and scans into Markdown or JSON that language models and pipelines can read. |
| [Model fine-tuning](catalog/model-fine-tuning.md) | 8 | Fine-tune language and diffusion models on your own data and GPUs. |
| [Experiment tracking](catalog/experiment-tracking.md) | 7 | Log the metrics, parameters and artefacts of training runs and compare them in a dashboard. |
| [ML pipelines](catalog/ml-pipelines.md) | 5 | Define, run and track machine learning pipelines from data preparation to deployment. |
| [Model serving](catalog/model-serving.md) | 4 | Serve trained machine learning models behind an API, with batching, scaling and versioning. |
| [Data labeling](catalog/data-labeling.md) | 6 | Annotate images, video, text and audio to build training and evaluation datasets. |
| [AutoML](catalog/automl.md) | 5 | Train, tune and compare models automatically from tabular, text or image data. |
| [Feedback boards](catalog/feedback-board.md) | 3 | Collect feature requests, let users vote on them and publish a roadmap. |
| [Inventory and asset management](catalog/inventory.md) | 7 | Track stock, parts, equipment and household belongings, and who has them where. |
| [Learning platforms](catalog/lms.md) | 10 | Courses, assignments and grades for schools, universities and companies. |
| [Flashcards](catalog/flashcards.md) | 3 | Learn with spaced repetition flashcards. |
| [Typesetting](catalog/typesetting.md) | 4 | Write documents in a markup language such as LaTeX or Typst and compile them to PDF. |
| [Reference managers](catalog/reference-manager.md) | 4 | Collect papers and sources, organise them and cite them in documents. |
| [SIEM and security monitoring](catalog/siem.md) | 3 | Collect security events and logs from hosts and networks, correlate them and raise alerts on threats. |
| [Intrusion detection](catalog/intrusion-detection.md) | 9 | Watch network traffic or hosts for attacks, and report or block what matches. |
| [Container runtime security](catalog/runtime-security.md) | 5 | Detect and block suspicious behaviour in running containers and Kubernetes workloads. |
| [Endpoint detection and forensics](catalog/endpoint-detection.md) | 6 | Query laptops and servers, hunt for threats on them and collect forensic evidence. |
| [Device management](catalog/device-management.md) | 5 | Enroll, configure, patch and inventory laptops, phones and servers from one console. |
| [Web application firewalls and bot checks](catalog/waf.md) | 8 | Inspect HTTP traffic and block attacks, bots and abuse before they reach an application, or ask visitors to prove they are human. |
| [Firewalls and routers](catalog/firewall.md) | 4 | Firewall and router systems that filter traffic for a host or a whole network. |
| [Application firewalls](catalog/application-firewall.md) | 7 | Show and control which apps on a computer or phone may connect to the network. |
| [VPN servers](catalog/vpn-server.md) | 9 | Run a remote-access or site-to-site VPN server for your users and networks. |
| [Direct file transfer](catalog/local-file-transfer.md) | 4 | Send files straight from one device to another, nearby or through a relay, without uploading them to a storage service. |
| [Genealogy](catalog/genealogy.md) | 4 | Build family trees with sources and events, and share them with relatives. |
| [Location history](catalog/location-history.md) | 4 | Record where your devices have been and browse the history on a map. |
| [Travel and trail planning](catalog/travel-planning.md) | 4 | Plan trips and hikes and keep a log of the places you have been. |
| [Maps and navigation](catalog/maps-navigation.md) | 4 | Map apps with search and turn-by-turn directions, built on open map data. |
| [Map services](catalog/map-services.md) | 8 | Serve map tiles, routing and geocoding from OpenStreetMap data behind your own API. |
| [Weather](catalog/weather.md) | 4 | Forecast apps, forecast APIs and software for personal weather stations. |
| [Android launchers](catalog/android-launcher.md) | 5 | Replace the Android home screen and app drawer. |
| [Privacy front ends](catalog/privacy-frontend.md) | 3 | Alternative web front ends to YouTube, Reddit and other sites, without ads, tracking or an account. |
| [Ad-free video clients](catalog/youtube-client.md) | 5 | Apps that play YouTube and other video sites without ads or a Google account. |
| [Home server platforms](catalog/home-server-platform.md) | 6 | Turn a machine at home into a server with an app store, storage management and a web dashboard. |
| [Speed tests](catalog/speed-test.md) | 5 | Measure bandwidth and latency to your own server, or track your connection over time. |
| [Music production](catalog/music-production.md) | 18 | Record, edit and mix audio, and compose with DAWs, trackers, sequencers and software synthesizers. |
| [Music notation](catalog/music-notation.md) | 3 | Write, play back and engrave sheet music and tablature. |
| [Music players and taggers](catalog/music-player.md) | 16 | Play and organise a local music library or stream it from your own server, and fix its tags, cover art and file names. |
| [Podcast players](catalog/podcast-player.md) | 3 | Subscribe to podcasts by RSS, download episodes and keep your place. |
| [Internet radio](catalog/internet-radio.md) | 3 | Run a web radio station with playlists, live DJs, scheduling and streaming. |
| [WebRTC media servers](catalog/webrtc-server.md) | 8 | Route audio and video between WebRTC peers through an SFU, or relay it through a TURN server. |
| [Social network clients](catalog/social-client.md) | 12 | Apps to read and post on Mastodon, Lemmy, Bluesky and Nostr. |
| [Social networks](catalog/social-network.md) | 13 | Self-hosted and federated social networks, for short public posts, photos and videos, or profiles, groups and an activity stream. |
| [Real-time messaging servers](catalog/realtime-messaging.md) | 3 | Push events from a backend to browsers and apps over WebSocket or Server-Sent Events, with channels and presence. |
| [MQTT brokers](catalog/mqtt-broker.md) | 6 | Route MQTT messages between devices and services. |
| [Kafka web UIs](catalog/kafka-ui.md) | 4 | Browse topics, messages, consumer groups and connectors of a Kafka cluster from a web UI. |
| [Stream processing](catalog/stream-processing.md) | 10 | Run continuous queries, joins and aggregations over event streams. |
| [Data transformation and semantic layers](catalog/data-transformation.md) | 6 | Build and test SQL and Python models inside a warehouse, and define metrics and dimensions once for BI tools and applications. |
| [Data catalogs](catalog/data-catalog.md) | 8 | Search, document and trace the lineage of tables, dashboards and pipelines across a data stack. |
| [Data quality](catalog/data-quality.md) | 5 | Declare tests on datasets and check them in pipelines. |
| [Data notebooks](catalog/data-notebook.md) | 6 | Notebooks that mix code, queries, charts and prose for data analysis. |
| [Data processing engines](catalog/data-processing-engine.md) | 3 | Run batch and streaming jobs over large datasets across a cluster. |
| [Directory servers](catalog/ldap-directory.md) | 4 | Keep users and groups in an LDAP directory that other systems authenticate against. |
| [Authorization services](catalog/authorization-service.md) | 7 | Decide who may do what in an application, with policies or relationship-based permissions served over an API. |
| [Password managers](catalog/password-manager.md) | 4 | Apps that keep passwords and other secrets in an encrypted vault on your own devices. |
| [Certificate authorities](catalog/certificate-authority.md) | 7 | Issue, renew and revoke X.509 certificates from a PKI you run. |
| [Certificate automation](catalog/acme-client.md) | 6 | Request and renew TLS certificates over ACME from Let's Encrypt or another ACME authority. |
| [Container orchestration](catalog/container-orchestration.md) | 12 | Schedule and run containers across a cluster of machines, from full Kubernetes distributions to lighter schedulers. |
| [Kubernetes packaging](catalog/kubernetes-packaging.md) | 6 | Template, package and version Kubernetes manifests so one application can be installed and configured per environment. |
| [Kubernetes development](catalog/kubernetes-development.md) | 7 | Build, deploy and debug code against a Kubernetes cluster from a developer machine, with live reload or traffic proxied to the laptop. |
| [Kubernetes autoscaling](catalog/kubernetes-autoscaling.md) | 3 | Add and remove pods and nodes in a Kubernetes cluster as load and pending work change. |
| [Container networking](catalog/container-networking.md) | 5 | Pod networking, network policy and load balancer addresses for Kubernetes clusters, especially on bare metal. |
| [Distributed storage](catalog/distributed-storage.md) | 5 | Replicated block and file storage pooled from the disks of a cluster, often as persistent volumes for Kubernetes. |
| [Kubernetes backup](catalog/kubernetes-backup.md) | 3 | Back up and restore Kubernetes resources and persistent volumes, and migrate workloads between clusters. |
| [DNS servers](catalog/dns-server.md) | 4 | Authoritative and recursive DNS servers that host your zones and answer queries behind an API. |
| [Container image tools](catalog/container-image-tools.md) | 4 | Inspect, copy, sign and shrink OCI images and work with registries without a container daemon. |
| [Video players](catalog/video-player.md) | 11 | Play local video files and streams, or the library of your own media server. |
| [Media converters](catalog/media-converter.md) | 13 | Convert, compress and transcode video, audio and image files between formats. |
| [Subtitle editors](catalog/subtitle-editor.md) | 3 | Create, time and translate subtitles for video. |
| [Image viewers](catalog/image-viewer.md) | 6 | Browse and view images quickly, with light edits. |
| [Digital painting](catalog/digital-painting.md) | 3 | Paint and sketch on a raster canvas with a pen tablet, alone or with others. |
| [Pixel art editors](catalog/pixel-art.md) | 4 | Draw pixel art and animate sprites frame by frame. |
| [2D animation](catalog/animation.md) | 4 | Draw, rig and tween 2D animation on a timeline and render it to video. |
| [Ebook readers](catalog/ebook-reader.md) | 8 | Read EPUB, PDF and comic files on a desktop, phone or e-ink device. |
| [Font editors](catalog/font-editor.md) | 3 | Draw glyphs, set spacing and kerning, and export fonts. |
| [3D printing](catalog/3d-printing.md) | 8 | Slice models into G-code and control 3D printers. |
| [CAD and PCB design](catalog/cad.md) | 13 | Draft 2D drawings, model parametric 3D parts and lay out printed circuit boards for engineering and fabrication. |
| [3D modelling](catalog/3d-modeling.md) | 10 | Model, process, texture and view 3D meshes and assets. |
| [Game engines](catalog/game-engine.md) | 23 | Build 2D and 3D games with an engine, an editor or a framework, design their maps and levels, and export them to desktop, mobile and the web. |
| [Continuous delivery](catalog/continuous-delivery.md) | 4 | Promote builds through environments with canary, blue-green and progressive rollouts, and roll back on failing metrics. |
| [Serverless platforms](catalog/serverless-platform.md) | 6 | Run functions and scale-to-zero services on your own cluster, triggered by HTTP requests or events. |
| [Chaos engineering](catalog/chaos-engineering.md) | 6 | Inject failures such as killed pods, network latency and resource pressure to test how systems hold up. |
| [Cloud cost](catalog/cloud-cost.md) | 5 | Estimate, allocate and cut cloud and Kubernetes spending, per team, workload or pull request. |
| [Infrastructure inventory](catalog/infrastructure-inventory.md) | 4 | Model racks, devices, cables, IP addresses and circuits as the source of truth for network and data centre automation. |
| [Vulnerability management](catalog/vulnerability-management.md) | 3 | Collect findings from scanners and SBOMs in one place, track them per product and follow them to a fix. |
| [Web vulnerability scanners](catalog/dast-scanner.md) | 6 | Probe running web applications and APIs for vulnerabilities from the outside. |
| [Cloud security posture](catalog/cloud-security-posture.md) | 5 | Audit cloud accounts and Kubernetes clusters against security benchmarks and report misconfigurations. |
| [Host and network audits](catalog/security-audit.md) | 7 | Scan servers, networks and TLS endpoints for missing patches, weak configuration and known vulnerabilities. |
| [Secret scanners](catalog/secret-scanning.md) | 4 | Find API keys, passwords and tokens committed to code, git history and other places they should not be. |
| [Software supply chain](catalog/supply-chain-security.md) | 6 | Generate software bills of materials, sign and verify artifacts, and assess the security practices of the projects you depend on. |
| [Security orchestration and response](catalog/soar.md) | 3 | Automate security response playbooks and track alerts and incidents as cases. |
| [Threat intelligence platforms](catalog/threat-intelligence.md) | 4 | Collect, enrich and share indicators of compromise and knowledge about threats. |
| [Honeypots](catalog/honeypot.md) | 4 | Decoy services that attract attackers and record what they try. |
| [Malware scanners](catalog/malware-scanner.md) | 5 | Scan files for malware with signatures, pattern rules or sandboxed execution. |
| [File and volume encryption](catalog/file-encryption.md) | 4 | Encrypt single files, folders or whole volumes before they are stored or synced. |
| [Content blockers](catalog/content-blocker.md) | 5 | Browser extensions that block ads, trackers and other unwanted content on web pages. |
| [One-time secret sharing](catalog/secret-sharing.md) | 3 | Share a password or other secret through a link that stops working once it is read. |
| [Private search engines](catalog/private-search.md) | 3 | Metasearch engines you host, which query other search engines without profiling who searches. |
| [Web browsers](catalog/web-browser.md) | 4 | Browsers for the desktop, built on an open source engine. |
| [Reverse engineering](catalog/reverse-engineering.md) | 3 | Disassemble, decompile and debug compiled programs without their source. |
| [Remote shell clients and servers](catalog/remote-shell.md) | 2 | Log in to other machines and run commands over an encrypted connection. |
| [Compression](catalog/compression.md) | 3 | Archive and compress files and streams. |
| [Download managers and BitTorrent clients](catalog/download-manager.md) | 4 | Fetch files and media from the web from a terminal or a queue, or download and seed them over BitTorrent. |
| [Media library automation](catalog/media-automation.md) | 3 | Search for, grab and organise TV shows, movies and other media for a home library. |
| [Front-end frameworks](catalog/frontend-framework.md) | 6 | Component frameworks for building browser user interfaces. |
| [App frameworks](catalog/app-framework.md) | 5 | Build desktop and mobile applications for several platforms from one codebase, often with web technologies. |
| [Java web frameworks](catalog/java-web-framework.md) | 2 | Frameworks for building web services and applications on the JVM. |
| [Programming languages and compilers](catalog/programming-language.md) | 6 | Language implementations with their compiler, interpreter and standard library, and compiler toolchains that turn source code into machine code. |
| [Machine learning frameworks](catalog/machine-learning-framework.md) | 4 | Libraries for building and training machine learning models. |
| [Geographic information systems](catalog/gis.md) | 3 | Desktop and library tools for geospatial data. |
| [Operating systems](catalog/operating-system.md) | 2 | Kernels and complete operating systems with public source. |
| [Window managers](catalog/window-manager.md) | 2 | Tiling and stacking window managers and compositors for Linux desktops. |
| [Version control systems](catalog/version-control.md) | 2 | Track changes to source code and share them between people. |
| [Network analysis](catalog/network-analysis.md) | 4 | Capture and inspect network traffic and scan hosts. |
| [Penetration testing](catalog/penetration-testing.md) | 3 | Exploit frameworks and password recovery tools used in security assessments. |
| [Cryptography libraries](catalog/cryptography-library.md) | 2 | Libraries that implement TLS and cryptographic primitives for other software. |

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
| [`catalog/`](catalog) | One page per category, written by the nightly refresh with the index above. |
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
