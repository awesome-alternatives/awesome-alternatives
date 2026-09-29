---
reviewed: 2026-09-29
majors:
  npm: 12
  bun: 1
sources:
  - https://bun.com/guides/install/from-npm-install-to-bun-install
---

## Compatibility

`bun install` is an npm client that writes a Node.js compatible `node_modules` folder. The Bun team says it can replace `npm install` in a Node.js project without code changes and without using Bun's runtime.

- It converts `package-lock.json` to Bun's `bun.lock` format automatically, keeping the dependency versions you have already resolved.
- It reads registry configuration from npm's `.npmrc`, so both clients can share one configuration.
- It supports the `"workspaces"` array in `package.json`.

## Before you switch

1. **Install.** Run `bun install` (or `bun i`) where you ran `npm install`. That single command performs the migration.
2. **Map the everyday commands.** `bun i -d <package>` adds a devDependency, `bun rm <package>` removes one, and `bun outdated` works like `npm outdated`.
3. **Map the run commands.** `npm run <script>` becomes `bun <script>`, `npm exec <bin>` becomes `bun <bin>`, `node <file>` becomes `bun <file>`, and `npx <package>` becomes `bunx <package>`.
4. **Replace workspace flags.** `npm run --workspace lib-foo --workspace lib-bar my-script` becomes `bun --filter 'lib-*' my-script`.

The guide only mentions `package-lock.json`. It says nothing about `npm-shrinkwrap.json`, about keeping or deleting the npm lockfile, or about CI.

## Pitfalls

- **A `#!/usr/bin/env node` shebang still runs Node.** `bun run` respects it and uses the system's `node` executable. Pass `--bun` (`bun --bun my-script` or `bun run --bun my-script`) to run the script on Bun's runtime instead.
- `bun --filter` runs the command concurrently in every workspace package whose `name` matches the glob, in dependency order.
- `bun update <package>` stays within the semver range in `package.json`. Add `--latest` to ignore it.
- Global packages installed with `bun i -g` go to `.bun/install/global/node_modules` in your home directory by default.
- On Windows and Linux, `bun install` uses hardlinks.
