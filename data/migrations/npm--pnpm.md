---
reviewed: 2026-09-29
majors:
  npm: 12
  pnpm: 12
sources:
  - https://pnpm.io/cli/import
  - https://pnpm.io/limitations
  - https://pnpm.io/motivation
---

## Compatibility

pnpm installs from the same `package.json`, but it does not read npm's lockfile. `package-lock.json` and `npm-shrinkwrap.json` are ignored: npm can install the same `name@version` several times with different dependencies, and its lockfile describes a flat `node_modules`, which pnpm's isolated layout cannot follow.

To keep the versions you have resolved today, `pnpm import` generates a `pnpm-lock.yaml` from another package manager's lockfile. It accepts `package-lock.json`, `npm-shrinkwrap.json` and `yarn.lock`.

## Before you switch

1. **Declare workspaces first.** If the project has workspaces whose dependencies you want imported, list them in a `pnpm-workspace.yaml` file before running the import.
2. **Convert the lockfile.** Run `pnpm import` next to your existing `package-lock.json` or `npm-shrinkwrap.json`.

The official page stops at the lockfile. It does not say what to do with the npm lockfile afterwards, or how to change CI and scripts that call `npm`.

## Pitfalls

- **The `node_modules` layout changes.** npm hoists every package to the root of `node_modules`, so source code can reach dependencies the project never declared. pnpm puts only the project's direct dependencies at the root, as symlinks.
- If your tooling does not work well with symlinks, set the `nodeLinker` setting to `hoisted`. pnpm then creates a `node_modules` similar to npm's.
- Files in `node_modules/.bin` are always shell files, never symlinks to JS files. If something expects a JS file there, reference the original file directly.
