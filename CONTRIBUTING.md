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
  category is its own pull request, with at least two tools that belong in it.
- `replaces` points at other entries by slug. If the tool it replaces is not listed yet, add that
  one in the same pull request, with no `replaces` of its own.
- `fit` is `drop-in` when the tool accepts the original's configuration or interface unchanged,
  `full` when it covers the same job in its own way, `partial` when it covers part of it. Use
  `note` to say which part.
- `affiliation` is required if you maintain, work on, or are paid by the tool. Listing your own
  project is welcome; not saying so is grounds for removal.

Do not add stars, versions, licences or descriptions. The schema rejects them: those come from
GitHub, so they cannot drift or be inflated.

By opening a pull request that adds or edits a file under `data/`, you dedicate that contribution to the
public domain under [CC0 1.0](LICENSE-DATA), like the rest of the catalog.

## What CI checks

Every pull request runs the checks below against GitHub for the entries it touches, and writes the
result to the run summary.

Blocking:

- the file matches the schema and its name is a valid slug
- the repository exists, is public, is not archived and is not a fork
- the repository is at least 30 days old
- the repository is not already listed under another slug
- every `replaces` target exists, and a tool does not replace itself

Reviewed by a maintainer before merge, without blocking:

- the repository was renamed or moved
- GitHub detects no licence
- there is no release and no tag
- no push in the last year
- 50 or more of the most recent stars arrived within 24 hours

The last one exists because bought stars arrive in bursts. A launch on Hacker News produces the
same shape, which is why it is a warning and a person decides. GitHub does not let CI page through the
stargazers of the largest repositories; for those, the check is skipped rather than guessed.

## Verifying a tool you maintain

Add `.awesome-alternatives.yml` at the root of the tool's default branch:

```yaml
slug: release-plz
```

The nightly refresh reads it and marks the entry as verified. Only someone with write access to
the repository can add it, so the mark says the maintainers stand behind the entry.

## Running the checks locally

```bash
pnpm install
pnpm test
GITHUB_TOKEN=$(gh auth token) pnpm validate release-plz
```

`pnpm validate --all` checks every entry, `pnpm refresh` rebuilds `generated/catalog.json` and the
table in the README.
