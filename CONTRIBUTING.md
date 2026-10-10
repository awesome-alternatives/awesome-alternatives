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

- `repository` is the upstream GitHub repository, not a fork or a mirror. A mirror is accepted
  only when GitHub is where the project is publicly found and its own documentation points there
  (PostgreSQL, SQLite and LibreOffice are listed that way), and a reviewer approves it in the pull
  request. A mirror of a project whose real home is another forge and which nobody follows on GitHub
  is not.
- `category` must be one of the keys in [`data/categories.yaml`](data/categories.yaml). A new
  category is its own pull request, with at least two tools that belong in it. Mark it
  `selfHost: true` when its tools are services people would otherwise pay someone to run, such as
  a git forge or a team chat, and leave it out for tools that run on your own machine anyway.
  [`schema/categories.schema.json`](schema/categories.schema.json) lists the fields a category
  takes, and `pnpm validate` checks the file against it.
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

- `banned` is optional and set by maintainers, see [Banning an entry](#banning-an-entry).

Do not add stars, versions, licences or descriptions. The schema rejects them: those come from
GitHub, so they cannot drift or be inflated.

By opening a pull request that adds or edits a file under `data/`, you license that contribution under
[CC BY-SA 4.0](LICENSE-DATA), like the rest of the catalog. Code contributions are licensed under
[AGPL-3.0](LICENSE).

## Banning an entry

A maintainer can take an entry off the site without deleting it, for a tool that is harmful or
that the catalog can no longer accept. Add `banned` with the reason, in plain English, up to 300
characters, stating facts a reader can check:

```yaml
name: Example
repository: https://github.com/acme/example
category: release-automation
banned: The maintainers removed the licence file and the repository now ships a closed binary.
```

A banned entry:

- disappears from the catalog, the README, the category pages, the counts, search, the
  alternatives and comparison pages, the feeds and the API, and the refresh stops reading its
  repository. Replacements that pointed at it are dropped from the published catalog, and a
  closed product only that tool replaced is dropped with it. The YAML in `data/` is never
  rewritten.
- keeps its slug, so nobody adds it again under the same name.
- keeps its page at `/tools/<slug>/`, in every language, with the name, a notice that it is no
  longer listed, the reason and a link back to the catalog. The page is `noindex,nofollow` and
  left out of the sitemap.
- skips the GitHub checks in CI, so a banned tool whose repository vanished does not fail the
  build. The schema and structure checks still apply.

Published banned entries are listed under `banned` in `generated/catalog.json`. To lift a ban,
delete the `banned` line: the tool is listed again at the next refresh.

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
- `majors` records the major version of each side that is a tool in the catalog when you reviewed
  the page. A closed product has no release to track, so it gets none. The page is marked as
  due for review once `reviewed` is a year old, or when either side ships a newer major release.
- The licence, terms and fit shown on the page come from the catalog, not from this file.
- Content is in English for now; the rest of the page is translated.

## Adding a benchmark

A comparison page shows a Performance tab when its pair has published benchmarks, listed in
`data/benchmarks/{a}--{b}.yaml` with the two slugs in alphabetical order:

```yaml
benchmarks:
  - title: Word regex search over the Linux kernel source tree
    url: https://github.com/BurntSushi/ripgrep#quick-examples-comparing-tools
    ranBy: ripgrep
    date: 2026-07-17
    result: "ripgrep 0.082s, ack 2.935s on a built Linux tree, Intel i9-12900K."
```

- Only a benchmark someone published, linked to the page that holds the numbers. Never numbers you
  measured yourself and nowhere else.
- `result` copies the numbers as the source gives them, with units and the setup in a few words, in
  200 characters at most. No adjectives.
- `ranBy` is the slug of whichever of the two projects ran it, its maintainers or its company
  included, or `third-party` for anyone else. A third party is often a competitor of both, so say who
  in `result`.
- `date` is when the benchmark was published or last updated.
- The two tools must have a comparison page: one replaces the other, or both replace the same entry.
  CI checks that, the fields, and that every link answers.

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

The nightly refresh adds one more on listed tools: a day that gained 50 or more stars, at least
five times the tool's usual daily pace over the last month, and at least 3% of the stars the repository had
the day before, so a large project's ordinary good day is not flagged. Bought stars arrive in bursts. A launch
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

The allow list only applies to authenticated requests, so the refresh reads such a repository, and
its owner, again over the REST API without a token. Those reads share GitHub's anonymous budget of 60
requests an hour, enough for a handful of tools, and they carry no active contributor count: that
comes from a history walk only GraphQL can do. When the read without a token fails too, a tool that
is already in the catalog keeps the facts, star series and verified mark of the last run that could
read it, with the edits to its entry applied, and a tool no run has read yet stays out of the
catalog. Every run logs which path each such tool took.

## Verifying a tool you maintain

Add a file named `.awesome-alternatives` at the root of the tool's default branch, with the
slug of its entry on a line:

```
release-plz
```

The nightly refresh reads it and marks the entry as verified. Only someone with write access to
the repository can add it, so the mark says the maintainers stand behind the entry.

One slug per line, so a repository that hosts several listed tools can vouch for all of them in the
same file. Blank lines and `#` comments are ignored. The same file can also keep some facts of the
entry up to date from your repository, see [the maintainer file](#the-maintainer-file).

Installing the [awesome-alternatives GitHub App](https://github.com/apps/awesome-alternatives) on
the repository verifies every entry listed from it as well, without a file: installing an app on a
repository takes admin rights on it. The app only reads the repository's contents. Either way is
enough, and a repository can do both. A suspended installation does not count.

A file also gives the verification a date: that of the last commit on the default branch that
touched it (for an entry with a `path`, the later of the two files that name the entry). When the
entry is edited in this catalog after that date, its page says "edited since verification", since
the maintainers vouched for an earlier version of it. To confirm the current entry, commit to the
file again. A dated comment is enough:

```
release-plz
# reviewed 2026-10-06
```

The mention goes away at the next refresh. Verification through the app carries no date, so an
entry verified only that way never shows the mention.

### The maintainer file

`.awesome-alternatives` can also be a YAML mapping with a `tools` key. Each key under `tools` is a
slug the repository vouches for, exactly like a line of the plain file, and can carry facts the
maintainers know better than the catalog:

```yaml
# yaml-language-server: $schema=https://raw.githubusercontent.com/awesome-alternatives/awesome-alternatives/main/schema/maintainer-file.schema.json
tools:
  ripgrep:
    path: crates/rg
    deploy: [binary, package]
    capabilities:
      ci:
        docs: https://example.com/docs/ci
    migration:
      ack: https://example.com/migrate-from-ack
  ripgrep-core:
```

Every field is optional, and a slug with nothing under it is just a verification. The file must
match [`schema/maintainer-file.schema.json`](schema/maintainer-file.schema.json), which your editor
can check as you type.

The fields come in two kinds. Facts you know better than the catalog, and that a check can confirm,
are applied by the refresh. Judgement calls, what the tool replaces and how well, its category and
its affiliation, are [proposed as a pull request](#fields-proposed-as-a-pull-request) that a person
reviews. The catalog is worth reading because it is neutral, and the maintainers of a tool are the
people with the most reason to call it a drop-in for every competitor.

#### Fields applied by the refresh

The nightly refresh applies these fields, each only when its check passes:

| Field | Applied when |
|---|---|
| `path` | it is a normalised relative directory, without `..` or a leading `/`, that exists on the default branch, and is not the path of another entry from the same repository |
| `deploy` | the category is one of things people run themselves, and each method passes the same check as `deploy-unproven` on pull requests |
| `capabilities.<key>.docs` | the key is in the category's vocabulary in `data/categories.yaml` and the link answers |
| `migration.<tool>` | the entry already replaces `<tool>` and the link answers |

A link answers when it is reached over `https` at every redirect, five at most, on a host name (not
an IP address) with the default port, and every address it resolves to is public. A value that fails
its check is not applied: the published value stays, and the refresh log says why. Neither is a
change that would leave the catalog failing its own checks, such as removing the `path` that keeps an
entry apart from another one in the same repository, or a migration guide that a page under
`data/migrations/` relies on. Applied values are written into `data/tools/<slug>.yaml` by the refresh commit, whose message
names your repository, the file and the commit it was read at, so this repository stays the source
of truth. The tool page says which facts came from the maintainers, and those commits do not count
as edits since your verification. Removing a field from the file removes it from the entry at the
next refresh. Deleting the file changes nothing in the entry: only the verification goes.

A file speaks only for tools whose `repository` is the repository holding it, read at the root or,
for an entry with a `path`, in that directory. A key naming another repository's tool, or a slug
the catalog does not have, is ignored and noted in the refresh log. When the entry's repository now
answers under another name, nothing is applied or proposed until the entry is updated to follow the move. A run
applies changes to at most 20 entries and checks at most 100, and leaves the rest to the next one.

The file is treated as untrusted input. It is ignored as a whole, including the slugs it vouches
for, when it is larger than 16 KiB, is not valid YAML, uses anchors, aliases or explicit tags, or
does not match the schema: only the fields above and the ones below, slugs as keys, `https://` links
on a host name with the default port and without credentials, plain text of at most 200 characters.

#### Fields proposed as a pull request

`replaces` (each with `tool`, `fit` and an optional `note`), `category` and `affiliation` are never
applied directly. When they differ from `data/tools/<slug>.yaml`, a pull request here proposes the
change from the branch `maintainer/<slug>`, with a link to your file at the commit it was read at.
The usual checks run on it, and a person merges or closes it.

```yaml
tools:
  ripgrep:
    category: code-search
    replaces:
      - tool: the-silver-searcher
        fit: full
        note: Respects .gitignore like ag.
    affiliation: Maintained by the ripgrep authors.
```

- `replaces`, when present, is the whole list: a tool you take out of it is proposed for removal
  from the entry, and `replaces: []` proposes removing them all. A `note` left out keeps the entry's
  note, and the migration guide stays in `migration` above.
- A field left out proposes nothing, so removing `category` or `affiliation` from the file leaves
  the entry as it is.
- A category that is not in `data/categories.yaml`, a replacement the catalog does not have, the
  tool itself or a tool listed twice is left out of the proposal and noted in the log. So is the
  whole change when it would make the catalog fail its checks, such as a category whose vocabulary
  lacks the entry's `capabilities`.
- Listing what your tool replaces is listing what it competes with, so the pull request says so
  and shows the entry's `affiliation`, or that it has none.
- There is one pull request per tool, updated when the file changes again, and a run opens or
  updates at most 5. A proposal that was closed, merged or not, is not opened again for the same
  values: only a change to these fields in your file opens a new one.
- Deleting the file proposes nothing and reverts nothing.

The pull requests are opened by the [Refresh](.github/workflows/refresh.yml) workflow in GitHub
Actions, with the workflow's own token, so the app needs no new permission on your repository. That
token cannot start other workflows through a pull request, so the workflow starts the checks on the
branch itself. Refresh runs after every change to `data/` on main and can be started by hand; the
nightly run in the cluster applies the fields above but does not open pull requests.

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
refresh finds the `.awesome-alternatives` file, which is what adding that file buys you. The same
file can keep part of the entry up to date, see [the maintainer file](#the-maintainer-file). The badge
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

The latest release has the same problem in a repository that tags or releases each package
separately: the newest one is usually another package's. When the tool is published to npm, name it
with `package`, and the refresh reads its version from the npm registry instead of from GitHub:

```yaml
name: Rush
repository: https://github.com/microsoft/rushstack
path: apps/rush
package: npm:@microsoft/rush
category: monorepo-tool
```

The version is the one npm tags `latest`. If the registry cannot be read, the entry keeps the version
it had. `package` works with or without `path`, and npm is the only registry it reads for now.

## Running the checks locally

```bash
pnpm install
pnpm test
GITHUB_TOKEN=$(gh auth token) pnpm validate release-plz
```

`pnpm validate --all` checks every entry, `pnpm refresh` rebuilds `generated/catalog.json`, the
category index in the README and the pages under `catalog/`.

A pull request that adds or edits tools gets their GitHub facts within minutes of merging: every
push to `main` that adds or changes files in `data/tools/` runs the
[Refresh tools](.github/workflows/refresh-tools.yml) workflow for those slugs, up to 20 (a larger
batch waits for the nightly refresh). The same workflow can be started by hand with a list of slugs,
for example after a release. It does, one job per slug:

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
have yet, never produce an event. The catalog, the event log, the README and the category pages are written together.

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

The refresh reads repositories 20 per GraphQL query, one query at a time: GitHub allows about a
minute of GraphQL server time per minute, and a single stream of queries already comes close to it.
It reads them in two passes. The pulse, for every repository, carries what changes from day to day:
stars, forks, open issues, description, licence, the last push, the default branch's head, the
maintainer file and the tag of the newest release. The detail (topics, releases, the latest
release's assets and signature, the newest tag) costs about as much again and is read only for a
repository that is new to the catalog, was renamed, has a newest release other than the published
one or one published less than a day ago, has no release and was pushed to, or whose day of the week
it is (each repository gets one). Any other repository keeps the detail the catalog published, and
the run logs how many were read in full, as in `repositories: 180 of 827 read in full`. After a
change to how the detail is read, start [Refresh](.github/workflows/refresh.yml) by hand with
`force` ticked (or set `REFRESH_FORCE=true`) to read every repository in full once.

Then the refresh walks each repository's commits of the last 90 days (up to 5 pages of 100) to count
active contributors, 10 repositories per query, three at a time. With the database described below,
it keeps the commits each walk read (the newest 500 in the window, as a short id, a hash of the
author and a date, never a name or an email) and walks less the next night: nothing when the default
branch's head has not moved, only the commits since the last walk (with a day of overlap) when it
has, and the whole window again on the repository's day of the week, for commits a merge brought in
from further back. The count comes from the same 500 newest commits either way, so it is the one a
full walk gives. The run logs the split, as in `history: 120 walked in full, 350 from their last
walk, 357 unchanged`. Without the database, every history is walked in full. The owners (100 per query, one
query at a time), the signatures of annotated release tags and the app's installations are read
while that walk runs. The app's installations are listed once per run.
A tag signature is checked once per tag object: the catalog keeps the object's id as `tagOid`, and a
release whose tag and object are both unchanged keeps the result of the last check.

When GitHub asks it to slow down (a 403 or 429 with `retry-after`, an exhausted budget with
`x-ratelimit-reset`, or its secondary rate limit message), the refresh waits as told, up to a minute,
and tries again, three times at most. A wait longer than that fails the run. A repository whose
commit history GitHub cannot read keeps the count of its last walk, or is published without an
active contributor count when there is none, and the run logs it. A repository GitHub keeps failing
on, after its batch is split down to it alone, keeps its last published facts and maintainer mark,
as one behind an IP allow list does when even the read without a token fails, or is left out when no run has read it yet. The run fails
instead when no commit history at all can be read, when more than half of the repositories cannot
be, or when the owners cannot be. Each phase logs its duration, as in `phase history: 180.2 s`.

### Daily facts and the cluster runner

With `DATABASE_URL` set, `pnpm refresh` reads the last commit walks from the
`contributor_windows` table before it starts, and once the catalog is published writes one row per
tool to the `tool_facts` table in TimescaleDB and the new walks to `contributor_windows`. It
creates the schema in [`scripts/db/schema.sql`](scripts/db/schema.sql) on the way. A database it
cannot read only means every history is walked in full. Without it, the refresh does exactly
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
