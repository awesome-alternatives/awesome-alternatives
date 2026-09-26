# Contributing

## Adding a tool

Create `data/tools/<slug>.yaml`, where `<slug>` is the tool's name in lowercase with hyphens:

```yaml
name: release-plz
repository: https://github.com/release-plz/release-plz
category: release-automation
replaces:
  - tool: semantic-release
    fit: partial
    note: Cargo workspaces only.
```

- `repository` is the upstream GitHub repository, not a fork or a mirror.
- `category` must be one of the keys in [`data/categories.yaml`](data/categories.yaml). A new
  category is its own pull request, with at least two tools that belong in it. Mark it
  `selfHost: true` when its tools are services people would otherwise pay someone to run, such as
  a git forge or a team chat, and leave it out for tools that run on your own machine anyway.
- `replaces` points at other entries by slug. If the tool it replaces is not listed yet, add that
  one in the same pull request, with no `replaces` of its own.
- `fit` is `drop-in` when the tool accepts the original's configuration or interface unchanged,
  `full` when it covers the same job in its own way, `partial` when it covers part of it. Use
  `note` to say which part.
- `migration` is optional, on a `replaces` item: a link to the replacing project's own guide for moving
  off that tool. Only an official page counts, not a blog post or a third-party tutorial. CI fails the
  entry if the link does not answer.
- `capabilities` is optional, for a category that lists a vocabulary under `capabilities` in
  [`data/categories.yaml`](data/categories.yaml). Declare only keys from that list, each with a link to
  the tool's own documentation for it, and a short `note` for a known limit:

  ```yaml
  capabilities:
    ci:
      docs: https://docs.gitea.com/usage/actions/overview/
      note: Gitea Actions, compatible with most GitHub Actions workflows.
  ```

  CI fails the entry for a key outside the category's list or a link that does not answer. A new
  capability for a category is its own pull request, with the `label` people see and the `match`
  phrases search reads it from, in every language the site speaks.
- `affiliation` is required if you maintain, work on, or are paid by the tool. Listing your own
  project is welcome; not saying so is grounds for removal.
- `terms` says what the licence lets people do, and is usually left out. When GitHub detects an
  open source licence such as MIT or Apache, the entry reads as open on its own. Set it only when
  that reading would be wrong or missing, and base it on the licence text in the repository, not
  on memory:
  - `open-core` when part of the code, typically an `ee/` directory, is under a licence that is
    not open source, even if the rest is MIT;
  - `source-available` when the licence restricts use, as the Business Source License, the SSPL
    and the Elastic License do;
  - `open` when the licence is open but GitHub reports it as `Other`.

  An entry GitHub cannot classify and nobody has checked shows as "not checked", which is better
  than a guess.
- `deploy` is optional, for a tool in a category marked `selfHost`, and says how people run it
  themselves. Only artefacts the project publishes count, never a community chart or an image
  someone else maintains:
  - `container`: an official container image
  - `compose`: a compose file in the repository or the official docs
  - `helm`: an official Helm chart
  - `binary`: standalone binaries attached to releases
  - `package`: official OS packages (deb, rpm, Homebrew...)

  ```yaml
  deploy: [container, compose, helm]
  ```

  CI looks for each one on GitHub, in the repository or in another repository of the same owner
  such as `helm-charts` or `docker`, and warns about any it cannot find. An artefact published
  elsewhere, like a vendor's own apt repository, is fine: say where in the pull request.

Do not add stars, versions, licences or descriptions. The schema rejects them: those come from
GitHub, so they cannot drift or be inflated.

By opening a pull request that adds or edits a file under `data/`, you dedicate that contribution to the
public domain under [CC0 1.0](LICENSE-DATA), like the rest of the catalog.

## Replacing a closed product

Some products people want to leave have no public repository: GitHub, Slack, Claude Code. List one
in `data/products/<slug>.yaml` so that tools can name it in `replaces`:

```yaml
name: Claude Code
homepage: https://www.anthropic.com/claude-code
vendor: Anthropic
category: coding-agent
description: Anthropic's coding agent, which reads a codebase, edits files and runs commands from the terminal or the editor.
```

- It exists only to be replaced: add it in the same pull request as the first tool that replaces
  it, and CI rejects one that nothing replaces.
- Its slug cannot also be a file in `data/tools`.
- `description` says what the product is, in one factual sentence. No pricing, no opinions, no
  comparison: the comparison lives in each tool's `fit` and `note`.
- It gets an alternatives page and no tool page, since there are no GitHub facts to show.

## Writing migration notes

A replacement with an official `migration` guide can also get a page at `/migrate/{from}/{to}/`,
written by hand in `data/migrations/{from}--{to}.md`:

```markdown
---
reviewed: 2026-09-24
majors:
  redis: 8
  valkey: 9
sources:
  - https://valkey.io/topics/migration/
---

## Compatibility

## Before you switch

## Pitfalls
```

- Only write what a source you list says. The page restates the official guide and points at what
  it leaves out; it never replaces it.
- `majors` records the major version of each side when you reviewed the page. The page is marked as
  due for review once `reviewed` is a year old, or when either side ships a newer major release.
- The licence, terms and fit shown on the page come from the catalog, not from this file.
- Content is in English for now; the rest of the page is translated.

## What CI checks

Every pull request runs the checks below against GitHub for the entries it touches, and writes the
result to the run summary.

Blocking:

- the file matches the schema and its name is a valid slug
- the repository exists, is public and is not a fork
- the repository is not archived, unless the entry replaces nothing and other entries replace it:
  an archived tool is exactly what people look to move off, so it can be a target, never an
  alternative
- the repository is at least 30 days old
- the repository is not already listed under another slug
- every `replaces` target exists in `data/tools` or `data/products`, and a tool does not replace
  itself
- a closed product is replaced by at least one tool, and its slug is not also a tool
- `deploy` is only set on a tool whose category is `selfHost`

Reviewed by a maintainer before merge, without blocking:

- the repository was renamed or moved
- GitHub detects no licence
- there is no release and no tag
- no push in the last year
- a closed product's homepage does not answer, which often only means it turns scripts away
- a declared `deploy` method with nothing on GitHub to show for it
- the repository's organisation has an IP allow list that turns GitHub's runners away
  (`unreadable-from-ci`), see [below](#organisations-with-an-ip-allow-list)

The nightly refresh adds one more on listed tools: a day that gained 50 or more stars and at least
five times the tool's usual daily pace over the last month. Bought stars arrive in bursts. A launch
on Hacker News produces the same shape, which is why it is a warning and a person decides. GitHub no
longer lists who starred a repository, so the refresh compares the star counts it kept from earlier
days, and needs a week of them before it judges.

Those counts are published with each tool in `generated/catalog.json` as `starHistory`: `from` is a
UTC date and `stars` holds one count per day from there to today, over the last 31 days. The count of
a day is the last one a refresh recorded that day, and a day no refresh ran on is interpolated
between its neighbours. Each refresh carries the series of the previous catalog forward and adds the
day's count. A tool starts with a single day, the day it joins the catalog, and so does a tool whose
entry was removed and added back: GitHub does not say how many stars a repository had before that.
The monthly trend is read from the same series.

### Organisations with an IP allow list

Some organisations, `neondatabase` among them, only let their own networks read their repositories
through the GitHub API. GitHub applies that to the token of a pull request's checks and to the app
token the refresh uses, not to a contributor's personal token, so `pnpm validate` can pass on your
machine and warn in CI.

In CI, GitHub still describes the repository itself, so the checks on it run (public, not a fork,
not archived, old enough, licence). It refuses the releases, the `.awesome-alternatives` file and
the files `deploy` is proven from, and the run says so with an `unreadable-from-ci` warning instead
of failing. A maintainer checks those by hand before merging.

The refresh cannot read such a repository at all. A tool that is already in the catalog keeps the
facts, star series and verified mark of the last run that could read it, with the edits to its entry
applied, and every run logs it. A tool no run has read yet is accepted in `data/tools` but stays out
of the catalog, the README and the site until its organisation lets GitHub's runners in.

## Verifying a tool you maintain

Add a file named `.awesome-alternatives` at the root of the tool's default branch, with the
slug of its entry on a line:

```
release-plz
```

The nightly refresh reads it and marks the entry as verified. Only someone with write access to
the repository can add it, so the mark says the maintainers stand behind the entry.

One slug per line, so a repository that hosts several listed tools can vouch for all of them in the
same file. Blank lines and `#` comments are ignored.

Installing the [awesome-alternatives GitHub App](https://github.com/apps/awesome-alternatives) on
the repository verifies every entry listed from it as well, without a file: installing an app on a
repository takes admin rights on it. The app only reads the repository's contents. Either way is
enough, and a repository can do both. A suspended installation does not count.

### Refreshing your entry after a release

The catalog is rebuilt every night. To have a new release show up within minutes instead, either
install the app above, which refreshes the repository's entries whenever it publishes a release, or
add [`refresh-action`](https://github.com/awesome-alternatives/refresh-action) to your release
workflow if you would rather not install an app:

```yaml
on:
  release:
    types: [published]

permissions:
  id-token: write

jobs:
  awesome-alternatives:
    runs-on: ubuntu-latest
    steps:
      - uses: awesome-alternatives/refresh-action@v1
```

It needs no secret: GitHub signs a token saying which repository the workflow runs in, and the
API only refreshes that repository's entries. A repository is refreshed at most once every 10
minutes, and the step never fails your workflow.

### The badge

Every listed tool has a badge at `https://awesome-alternatives.com/badge/<slug>.json`, in the
[shields endpoint format](https://shields.io/badges/endpoint-badge). Put it in the tool's README:

```markdown
[![awesome-alternatives](https://img.shields.io/endpoint?url=https://awesome-alternatives.com/badge/release-plz.json)](https://awesome-alternatives.com/tools/release-plz/)
```

It reads "alternative to semantic-release" for a tool that replaces something, and "7 alternatives"
for a tool that others replace. It is grey while the entry is unverified and turns green once the
refresh finds the `.awesome-alternatives` file, which is what adding that file buys you. The badge
is rebuilt every night with the catalog, so it follows the entry without anyone editing a README
again.

### Monorepos

Several entries can point at the same repository when each one says where its tool lives with
`path`:

```yaml
name: oxlint
repository: https://github.com/oxc-project/oxc
path: apps/oxlint
category: javascript-lint-format
```

Two entries sharing a repository without distinct paths are rejected. For an entry with a `path`,
the refresh reads `.awesome-alternatives` both at the repository root and in that directory, so each
package can carry its own file. Stars, releases and the other facts are still those of the whole
repository, and so is the count of active contributors, which the tool page says it counts across the
whole repository. Platforms are not read for such an entry, since the repository's latest release may
belong to another package.

## Running the checks locally

```bash
pnpm install
pnpm test
GITHUB_TOKEN=$(gh auth token) pnpm validate release-plz
```

`pnpm validate --all` checks every entry, `pnpm refresh` rebuilds `generated/catalog.json` and the
table in the README.

To refresh a few tools without walking the whole catalog, which is what the
[Refresh tools](.github/workflows/refresh-tools.yml) workflow does after a release, one job per slug:

```bash
GITHUB_TOKEN=$(gh auth token) node scripts/refresh-tool.ts release-plz entries
node scripts/refresh-merge.ts entries
```

The first writes the entry to `entries/release-plz.json`, the second splices every file in
`entries/` into the published catalog and leaves the other tools as they were.

### What changed: `generated/events.json`

Both paths also append to [`generated/events.json`](generated/events.json), the dated stream behind
[awesome-alternatives.com/changes/](https://awesome-alternatives.com/changes/) and its RSS feeds
(the whole catalog, `/tools/<slug>/feed.xml`, `/categories/<key>/feed.xml`). Before writing, the
refresh diffs the catalog it is about to publish against the one already published, matching tools
by slug, and records a short list of changes: a tool added or removed, a licence changed, a
repository renamed, archived or unarchived, the `inactive` flag appearing or clearing, and a new
latest release that is not a prerelease. Star counts, and fields an older catalog simply did not
have yet, never produce an event. The catalog, the event log and the README are written together.

The log keeps a year of events and the last 10 releases of each tool. An event is dated when the
refresh saw it. Its commit is not known until the push, so it is stored as `null` and the next
refresh that has the full history (the nightly one does) fills in the first commit whose
`generated/events.json` carries it; until then the site links to that day's commits. That relies on
the refresh commits reaching `main` as they were pushed: squashing or rewriting them leaves those
events without a commit, and the refresh says so once they are two days old. The order of tools in
the catalog does not matter, since tools are matched by slug.

The file was seeded once from every commit of `generated/catalog.json` since 2026-09-22. To rebuild
it from the history, which needs a full clone, delete it and run:

```bash
pnpm backfill-events
```

### How the refresh reads GitHub

The refresh reads 20 repositories per GraphQL query, four queries at a time, then walks each
repository's commits of the last 90 days (up to 5 pages of 100) to count active contributors, 10
repositories per query, three at a time. The owners (100 per query, one query at a time), the
signatures of annotated release tags and the app's installations are read while that walk runs. The app's installations are listed once per run.
A tag signature is checked once per tag object: the catalog keeps the object's id as `tagOid`, and a
release whose tag and object are both unchanged keeps the result of the last check.

When GitHub asks it to slow down (a 403 or 429 with `retry-after`, an exhausted budget with
`x-ratelimit-reset`, or its secondary rate limit message), the refresh waits as told, up to a minute,
and tries again, three times at most. A wait longer than that fails the run. A repository whose
commit history GitHub cannot read is published without an active contributor count, and the run
logs it. The run fails instead when no commit history at all can be read, or when the repositories
or owners themselves cannot be. Each phase logs its duration, as in `phase history: 180.2 s`.

### Daily facts and the cluster runner

With `DATABASE_URL` set, `pnpm refresh` also writes one row per tool to the `tool_facts` table in
TimescaleDB once the catalog is published, and creates the schema in
[`scripts/db/schema.sql`](scripts/db/schema.sql) on the way. Without it, the refresh does exactly
what it does in Actions. To seed the table from every day in the catalog's git history, which is
safe to run again:

```bash
DATABASE_URL=postgres://... pnpm backfill-facts
```

The image built from [`scripts/runner/Dockerfile`](scripts/runner/Dockerfile) runs the nightly
refresh in the cluster. It clones `REPOSITORY` (default `awesome-alternatives/awesome-alternatives`)
into `WORK_DIR` (default `/work`) and refreshes with an installation token of the app (`APP_ID`,
`APP_PRIVATE_KEY`) limited to reading contents. Only then does it mint a second token from the same
app, with Contents: write on this repository alone, and hands it to the push. Commits are authored
as `GIT_AUTHOR_NAME` / `GIT_AUTHOR_EMAIL`, the app's bot user, falling back to
`github-actions[bot]`. Given `backfill` as its argument, it clones the same way and runs the
backfill instead.

### When the refresh stops publishing

Nothing in the cluster reports a refresh that did not happen, so the
[Freshness](.github/workflows/freshness.yml) workflow checks from GitHub Actions, every hour, that
what visitors get still follows it. It reads `checkedAt` from the last commit of
`generated/catalog.json` on main, then what production serves: the markdown page of the most starred
tool on the site (its "Read from GitHub" day and its star count) and the first page of
`GET /v1/tools` on the API (star counts), and compares both with main. It raises an alert when:

- the catalog on main was read from GitHub more than 26 hours ago (`STALE_AFTER_HOURS`), one missed
  nightly run and some margin
- the site or the API still serves an older catalog 3 hours after the last catalog commit
  (`DEPLOY_GRACE_HOURS`), a refresh that committed but never went out
- the site or the API does not answer after three attempts

The alert is a single issue labelled `refresh-stale`, commented on at most once a day while the
problem lasts, and closed with the time it recovered. The workflow only fails when the check itself
could not run (GitHub did not answer, a page no longer carries the lines it reads): a red run means
the observer is broken, an open issue means production is.

The issue says which case it is. A stale main points at the cluster: read the last job of the
refresh CronJob and its logs (the app token, the image, a refused push). A site or API behind main
points at the deploy: find the Release run for the last catalog commit and check that its image
rolled out. The API also reloads the catalog from main every hour on its own, so an API behind main
with nothing left to release means that reload fails, which it logs as
`catalog refresh failed, keeping the previous one`. To publish while the cluster is being fixed, run
[Refresh](.github/workflows/refresh.yml) by hand.

To run the check locally without touching any issue:

```bash
node scripts/freshness.ts --dry-run
STALE_AFTER_HOURS=0.02 node scripts/freshness.ts --dry-run
```

The second pretends the threshold is about a minute and prints the issue it would open.
