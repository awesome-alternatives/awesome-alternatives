---
reviewed: 2026-10-06
majors:
  asdf: 0
  mise: 2026
sources:
  - https://mise.jdx.dev/dev-tools/comparison-to-asdf.html
---

## Compatibility

mise reads `.tool-versions` files and supports legacy asdf plugins, so a project's existing version declarations work as a starting point. mise also accepts the asdf tool names `nodejs` and `golang`, while its own `mise.toml` uses `node` and `go`. CLI and plugin compatibility are best-effort: some asdf spellings are accepted, but the aliases do not emulate asdf completely.

| Goal | asdf | mise |
| --- | --- | --- |
| Install a version | `asdf install nodejs 24.0.0` | `mise install node@24.0.0` |
| Set a project version | `asdf set nodejs 24.0.0` | `mise use node@24.0.0` |
| Set a personal default | `asdf set -u nodejs 24.0.0` | `mise use -g node@24.0.0` |
| List available versions | `asdf list all nodejs` | `mise ls-remote node` |
| Show selected versions | `asdf current` | `mise ls --current` |

## Before you switch

The guide recommends trying one project before changing your shell:

1. Install mise.
2. In the project, run `mise config ls` and `mise ls --current` to see how mise reads the existing `.tool-versions`.
3. Run `mise install`, then check a command through mise, for example `mise exec -- node --version`.
4. Remove the asdf activation and shim `PATH` entries from your shell startup files, activate mise, open a new shell and run `mise doctor`.
5. For personal defaults, use `mise use -g` or edit `~/.config/mise/config.toml`, copying the versions you need.

## Pitfalls

- **mise does not reuse asdf's installs.** It installs every tool again in its own directories, so expect downloads and builds on the first `mise install`.
- `mise set` is not `asdf set`: it writes environment variables. Use `mise use` for tool versions.
- If teammates still use asdf, keep the shared `.tool-versions` and update it with `mise use --path .tool-versions --pin node@24`. Keep mise-specific prefixes and backend identifiers out of that file.
- A `mise.toml` in the same directory takes precedence over `.tool-versions` for the tools it declares. Check for conflicting entries before keeping both.
- Legacy asdf shell plugins generally need a Unix environment. Running them through mise does not make them work natively on Windows.
- An asdf plugin runs shell code, so you keep trusting its maintainers when mise runs it. Many tools can instead come from mise's built-in backends without a plugin.
