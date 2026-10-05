---
reviewed: 2026-10-06
majors:
  vscode: 1
  zed: 1
sources:
  - https://zed.dev/docs/migrate/vs-code
  - https://zed.dev/docs/tasks
  - https://zed.dev/docs/debugger
  - https://zed.dev/docs/snippets
---

## Compatibility

Zed can import a large part of your VS Code settings: editor fonts, tab size, word wrap, minimap, format on save, file associations, autosave, `files.exclude`, the integrated terminal font and shell, tab and preview behaviour, inline blame, proxy, and the `mcp` block (which becomes `context_servers`). If you pick the VS Code keymap during onboarding, most shortcuts stay the same, including `Cmd+P`, `Cmd+Shift+P`, `Cmd+Shift+F`, `Cmd+B`, `Cmd+J` and `F2`.

Some project files are read as they are. Zed loads debug configurations from `.vscode/launch.json` when a project has no `.zed/debug.json`, and its tasks documentation describes the VS Code format for tasks taken from `.vscode/tasks.json`, where a missing `label` is generated from the task type (`npm: start`, for example).

## Before you switch

1. Install Zed: on macOS from zed.dev or with `brew install --cask zed`, on Linux with the script at `https://zed.dev/install.sh`.
2. Accept the settings import during setup, or run `zed: import vs code settings` from the command palette later.
3. Choose the VS Code keymap during onboarding, then adjust bindings with `zed: open keymap`.
4. Copy your snippet JSON into Zed's snippets folder (`snippets: configure snippets`). Files are named after the language in lowercase, `snippets.json` holds global snippets, and JSX snippets go in `javascript.json`.
5. Replace each `.code-workspace` file. Zed has no workspace file: open a folder, use **File > Add Folder to Project** for extra roots, and put per-project overrides in `.zed/settings.json`.
6. For Copilot, open Settings, go to **AI > Edit Predictions**, click Configure next to "Configure Providers" and sign in to GitHub.

## Pitfalls

- **Extensions and keybindings are not imported.** Zed's extension catalog is smaller and focused on languages, themes and syntax. The guide warns that there is no one-to-one replacement for every VS Code extension, especially DevOps, container and test runner tools. List the extensions you depend on before switching.
- A few shortcuts differ even with the VS Code keymap: open recent project is `Cmd+Opt+O`, move line is `Cmd+Ctrl+Up/Down`, split pane is `Cmd+K` then an arrow key, and expand selection is `Opt+Up`. `Cmd+R` toggles the right dock instead of opening a recent project.
- Live Share is replaced by Zed's built-in collaboration: create a channel in the Collab Panel and invite collaborators.
- Zed's own tasks live in `.zed/tasks.json` or the global `tasks.json`, and debug configurations in `.zed/debug.json`. Configurations from `.vscode/launch.json` are only shown when `.zed/debug.json` has none.
