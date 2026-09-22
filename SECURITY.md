# Security policy

## Reporting a vulnerability

Report it privately through
[GitHub private vulnerability reporting](https://github.com/awesome-alternatives/awesome-alternatives/security/advisories/new).
Please do not open a public issue or pull request for it.

Include what you found, where, and the steps to reproduce it. Once a fix ships, the advisory is
published and credits you unless you ask otherwise.

## Scope

- The site at https://awesome-alternatives.com, built from [`site/`](site).
- The API it calls under `/api`, built from [`api/`](api), including the search and what it sends to
  its fallback interpreter.
- The workflows under [`.github/workflows/`](.github/workflows), the nightly catalog refresh in
  particular: it runs with write access to the repository and turns data pulled from GitHub into
  committed files.
- The published images `ghcr.io/awesome-alternatives/site` and `ghcr.io/awesome-alternatives/api`.

The tools listed in the catalog are out of scope. Report a vulnerability in one of them to its own
maintainers. A catalog entry that points at a malicious or hijacked repository is in scope.
