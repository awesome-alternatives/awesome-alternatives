---
reviewed: 2026-09-29
majors:
  prettier: 3
  biome: 2
sources:
  - https://biomejs.dev/guides/migrate-eslint-prettier/
  - https://biomejs.dev/formatter/differences-with-prettier/
---

## Compatibility

Biome's formatter tries to match Prettier's output as closely as possible, and the official guide ships a command that ports a Prettier configuration to `biome.json`. Two things still differ:

- Biome has its own defaults. For example, it indents with tabs where Prettier uses spaces.
- Biome deliberately formats a few cases differently. The Biome docs list them: it unquotes object and class properties that are valid ES2015+ identifiers (Prettier only unquotes ES5 identifiers), omits parentheses around an assignment in a computed object key, drops the trailing comma on arrow function type parameters when a default type makes it unnecessary, and removes parentheses around a non-null-asserted optional chain.

## Before you switch

1. **Port the configuration.** Run `biome migrate prettier --write`, or through a package manager, for example `npx @biomejs/biome migrate prettier --write` or `pnpx @biomejs/biome migrate prettier --write`. The subcommand reads your Prettier configuration, including `overrides`, and writes the equivalent options into the Biome configuration.
2. **Check the configuration format.** The subcommand does not support Prettier configuration written in JSON5, TOML or YAML. It needs Node.js to load a JavaScript configuration such as `.prettierrc.js`.
3. **Enable Biome's VCS integration.** Prettier takes VCS ignore files into account, so the guide recommends turning this on to keep the same set of files in scope.
4. Reformat once and review the diff before you commit, since the divergences above show up there.

## Pitfalls

- **Biome does not format every language and framework Prettier does.** The Biome docs point to their language support page for the current list; check it against the file types in your repository before removing Prettier.
- Biome's parser is stricter than Prettier's. Code with syntax errors that Prettier formats anyway (duplicate modifiers on a class property, or a top-level `return`) is printed verbatim by Biome, without formatting.
- The guide only covers configuration files. Editor integrations, pre-commit hooks and CI steps that call Prettier have to be switched by hand.
