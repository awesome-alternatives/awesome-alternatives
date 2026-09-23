<!-- One tool per pull request makes review faster. -->

- [ ] The file is `data/tools/<slug>.yaml`, named after the slug, and follows [CONTRIBUTING.md](../CONTRIBUTING.md).
- [ ] `repository` is the upstream repository, not a fork or a mirror.
- [ ] `category` is a key that exists in `data/categories.yaml`, or this pull request adds the category with at least two tools in it.
- [ ] Every slug under `replaces` is already listed, or this pull request adds it with no `replaces` of its own.
- [ ] `fit` is `partial` unless the tool really covers the whole job, and `note` says which part.
- [ ] No stars, version, licence or description. Those come from GitHub and the schema rejects them.
- [ ] If I maintain, work on or am paid by this tool, `affiliation` says so.
