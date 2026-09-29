---
reviewed: 2026-09-29
majors:
  eslint: 10
  biome: 2
sources:
  - https://biomejs.dev/guides/migrate-eslint-prettier/
  - https://biomejs.dev/linter/rules-sources/
---

## Compatibility

Many Biome lint rules are inspired by or identical to ESLint rules, and Biome covers some ESLint plugins: TypeScript ESLint, ESLint JSX A11y, ESLint React and ESLint Unicorn. Rules are renamed: Biome uses `camelCaseRuleName` where ESLint uses `kebab-case-rule-name`, and often picks a different name altogether (`eqeqeq` becomes `noDoubleEquals`). The rules sources page maps each ESLint or plugin rule to its Biome equivalent.

The Biome team is explicit that you are unlikely to get exactly the same behaviour as ESLint: Biome chose not to implement some rule options, and some rules deviate slightly from the original.

## Before you switch

1. **Port the configuration.** Run `biome migrate eslint --write`, or for example `npx @biomejs/biome migrate eslint --write`. The subcommand handles both legacy and flat configuration files, loads shared and plugin configurations from `extends`, and migrates `.eslintignore`. It needs Node.js to resolve plugins and configurations.
2. **Decide on inspired rules.** By default the subcommand skips rules Biome only marks as inspired by an ESLint rule. Add `--include-inspired` to migrate them too.
3. **Enable Biome's VCS integration.** ESLint takes VCS ignore files into account, so the guide recommends turning this on.
4. Review the result. The subcommand overwrites your existing Biome linter configuration, and in the guide's example it turns off `recommended`.

## Pitfalls

- **Check every rule you rely on against the rules sources page.** The guide names the plugins Biome handles, but does not say what the subcommand does with rules that have no Biome equivalent. The rules sources page also notes that some Biome rules lack options the original rule has.
- Configuration written in YAML is not supported.
- For flat configuration, the subcommand only looks for JavaScript files (`js`, `cjs`, `mjs`).
- Some plugins or shared configurations export an object with a cyclic reference, and Biome may fail to load it. The guide's workaround is to comment those entries out, run the migration, then restore them one by one and configure their rules in `biome.json` by hand.
