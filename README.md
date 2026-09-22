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
| [release-please](https://github.com/googleapis/release-please) | TypeScript | Apache-2.0 | [v17.11.2](https://github.com/googleapis/release-please/releases/tag/v17.11.2) signed | 7531 | semantic-release (full) |
| [release-plz](https://github.com/release-plz/release-plz) | Rust | Apache-2.0 | [release-plz-v0.3.169](https://github.com/release-plz/release-plz/releases/tag/release-plz-v0.3.169) | 1482 | semantic-release (partial) |
| [cocogitto](https://github.com/cocogitto/cocogitto) | Rust | MIT | [7.0.0](https://github.com/cocogitto/cocogitto/releases/tag/7.0.0) | 1193 | semantic-release (full) |
| [knope](https://github.com/knope-dev/knope) | Rust | MIT | [knope/v0.23.0](https://github.com/knope-dev/knope/releases/tag/knope/v0.23.0) signed | 189 | semantic-release (full) |
| [FerrFlow](https://github.com/FerrLabs/FerrFlow) | Rust | MIT | [v7.21.10](https://github.com/FerrLabs/FerrFlow/releases/tag/v7.21.10) | 3 | semantic-release (full) |

### Changelog generation

Changelogs built from commits or pull requests, without driving the release itself.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [git-cliff](https://github.com/orhun/git-cliff) | Rust | Apache-2.0 | [v2.14.2](https://github.com/orhun/git-cliff/releases/tag/v2.14.2) signed | 12257 | semantic-release (partial) |

<!-- catalog:end -->

## Contributing

Adding a tool is one file and one pull request, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Licence

The catalog data under `data/` is dedicated to the public domain under [CC0 1.0](LICENSE-DATA). The scripts are [MIT](LICENSE).
