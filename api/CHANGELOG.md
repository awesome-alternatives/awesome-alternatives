# Changelog

All notable changes to `api` will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/).

## [0.10.0] - 2026-09-23

### Features

- feat: page search results instead of claiming a count that is not on screen (#124)

## [0.9.0] - 2026-09-23

### Features

- feat(api): page GET /v1/tools instead of answering with the whole catalog (#119)

## [0.8.2] - 2026-09-23

### Bug Fixes

- fix(api): let only the configured origins read an API response (#106)

## [0.8.1] - 2026-09-22

### Bug Fixes

- fix(api): honour X-Forwarded-For only from a trusted peer (#100)

## [0.8.0] - 2026-09-22

### Features

- feat(api): search the catalog in any language the site speaks (#86)

## [0.7.0] - 2026-09-22

### Features

- feat(api): share the README, security and search caches through Valkey (#58)

## [0.6.1] - 2026-09-22

### Bug Fixes

- perf(api): embed the catalog in batches and bound the detail caches by bytes (#50)

## [0.6.0] - 2026-09-22

### Features

- feat(catalog): verify through an .awesome-alternatives file and list monorepo tools by path (#47)

## [0.5.1] - 2026-09-22

### Bug Fixes

- fix(site): handle API failures and missing JavaScript in search (#43)

## [0.5.0] - 2026-09-22

### Features

- feat(api): serve each tool's README and security report (#33)

## [0.4.0] - 2026-09-22

### Features

- feat(site): brutalist redesign, with repository topics on tool pages (#28)

## [0.3.0] - 2026-09-22

### Features

- feat(api): search with a local embedding model, Jev only as a fallback (#9)

## [0.2.1] - 2026-09-22

### Bug Fixes

- fix(api): keep Cargo.lock in step with the released version (#7)

## [0.2.0] - 2026-09-22

### Features

- feat(api): serve the catalog with Jev-backed natural-language search (#3)
