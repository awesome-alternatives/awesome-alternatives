# Changelog

All notable changes to `refresh` will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/).

## [0.13.0] - 2026-10-10

### Features

- feat(freshness): turn the run red and mention people while the catalog is stale (#421)

## [0.12.3] - 2026-10-10

### Bug Fixes

- fix(validate): confirm benchmark links on github.com through the contents API (#423)

## [0.12.2] - 2026-10-10

### Bug Fixes

- fix(validate): retry transient link failures and limit benchmark concurrency (#419)

## [0.12.1] - 2026-10-10

### Bug Fixes

- fix(runner): push with the private app so the public one only reads (#417)

## [0.12.0] - 2026-10-07

### Features

- feat(catalog): let an entry be banned with a reason (#398)

## [0.11.1] - 2026-10-07

### Bug Fixes

- fix(readme): split the catalog into one page per category (#396)

## [0.11.0] - 2026-10-06

### Features

- feat(refresh): propose maintainers' editorial changes as pull requests (#350)

## [0.10.0] - 2026-10-06

### Features

- feat(refresh): apply factual fields from the maintainer file (#335)

## [0.9.0] - 2026-10-06

### Features

- feat(catalog): count maintainer-verified tools and show it in the README (#328)

## [0.8.1] - 2026-10-06

### Bug Fixes

- fix(refresh): require a star burst to be a real share of the repository's stars (#330)

## [0.8.0] - 2026-10-05

### Features

- feat(site): show when a verified entry changed after its verification (#325)
- feat(site): add 14 migration guides and allow closed products as the source side (#322)
- feat(refresh): read a monorepo package's version from npm (#319)

## [0.7.0] - 2026-10-05

### Features

- feat(refresh): add a force input that reads every repository in full (#314)

## [0.6.3] - 2026-10-05

### Bug Fixes

- fix(refresh): parse tag versions without a backtracking regex (#312)

## [0.6.2] - 2026-10-05

### Bug Fixes

- fix: resolve SonarQube findings and exclude translations from duplication (#311)

## [0.6.1] - 2026-10-05

### Bug Fixes

- fix(refresh): prefer a plain version tag over a prefixed artefact tag (#310)
- fix(refresh): pick the newest version tag when a repository has no release (#308)

## [0.6.0] - 2026-10-05

### Features

- feat(site): add a Performance tab with published benchmarks (#303)

## [0.5.2] - 2026-10-03

### Bug Fixes

- fix(refresh): read repositories behind an IP allow list without a token (#297)

## [0.5.1] - 2026-09-30

### Bug Fixes

- fix(refresh): keep the last facts of a repository GitHub keeps failing on instead of failing the run (#271)

## [0.5.0] - 2026-09-27

### Features

- feat(validate): check data/categories.yaml against a schema (#265)

## [0.4.4] - 2026-09-27

### Bug Fixes

- perf(refresh): walk only the commits since the last walk, and none when the head has not moved (#257)

## [0.4.3] - 2026-09-27

### Bug Fixes

- perf(refresh): read release and topic details only for repositories whose releases moved (#255)

## [0.4.2] - 2026-09-26

### Bug Fixes

- perf(refresh): read GitHub concurrently and let one repository fail without failing the run (#252)

## [0.4.1] - 2026-09-26

### Bug Fixes

- fix(refresh): read around organisations with an IP allow list (#249)

## [0.4.0] - 2026-09-25

### Features

- feat: show a project's age, release cadence, active contributors and platforms (#234)

## [0.3.0] - 2026-09-25

### Features

- feat: publish a dated stream of what changed in the catalog, with feeds per tool and category (#219)

## [0.2.1] - 2026-09-25

### Bug Fixes

- fix(refresh): leave today's bucket to real-time aggregation after a backfill (#215)

## [0.2.0] - 2026-09-25

### Features

- feat(refresh): publish each tool's daily star series in the catalog (#207)

## [0.1.1] - 2026-09-25

### Bug Fixes

- fix(refresh): push with the awesome-alternatives app, through a write token minted for the push alone (#197)

## [0.1.0] - 2026-09-25

### Features

- feat(refresh): run the refresh from a container image and keep daily facts in TimescaleDB (#184)
- feat(refresh): compute the star trend and the spike check from the catalog's own history (#175)
- feat(catalog): say how a self-hosted tool is deployed (#168)
- feat(refresh): verify a tool whose repository has the app installed, and document release refreshes (#167)
- feat(refresh): refresh selected tools in a matrix and splice them into the catalog (#165)
- feat: search by what a tool can do, with each result saying which asked-for capabilities it has (#158)
- feat: hand-written migration notes for five replacements, with review dates (#154)
- feat: link each replacement to the replacing project's official migration guide (#153)
- feat: say when each fact was read and when the entry was last edited (#142)
- feat: turn maintained, self-hostable and open source in a query into filters the page applies (#141)
- feat: let a closed product be a target, starting with AI coding and chat tools (#140)
- feat: say whether a tool is self-hosted and what its licence lets you do (#127)
- feat(site): trending section on the home page (#67)
- feat(site): owner pages and a sponsor link (#61)
- feat(catalog): verify through an .awesome-alternatives file and list monorepo tools by path (#47)
- feat: add an RSS feed of newly added tools (#40)
- feat(site): show the last five releases on each tool page (#29)
- feat(site): brutalist redesign, with repository topics on tool pages (#28)
- feat(catalog): accept archived repositories as targets and mark them archived (#26)
- feat: bootstrap the catalog, its schema and the GitHub verifier

### Bug Fixes

- fix(security): allowlist URL schemes, cap upstream bodies, pin base images, ignore .env (#182)
- fix(refresh): refuse to publish a catalog that lost a listed tool (#177)
- perf(refresh): fetch the catalog through GraphQL, twenty repositories per query (#174)
- fix(refresh): go back to REST until the app can read repository contents (#173)
- perf(refresh): fetch the catalog through GraphQL, twenty repositories per query (#171)
- fix(catalog): ask GitHub only for what changed since the last refresh (#160)
- fix(catalog): skip the star check when GitHub refuses to page stargazers (#23)
- fix(catalog): report licences GitHub cannot map to SPDX as Other (#21)
