---
reviewed: 2026-09-29
majors:
  pip: 26
  uv: 0
sources:
  - https://docs.astral.sh/uv/guides/migration/pip-to-project/
---

## Compatibility

The official guide moves a `pip` and `pip-tools` workflow built on requirements files to a uv project. `pyproject.toml` takes the place of `requirements.in`, and `uv.lock` takes the place of `requirements.txt`. The lockfile format is specific to uv. It can hold any number of dependency groups, and it is always universal, so one file covers every platform where pip needs a lock file per platform.

The guide does not cover moving to uv's drop-in `uv pip` interface, or starting from a workflow that already uses a `pyproject.toml`. Astral tracks both in issue #5200.

## Before you switch

1. Create a `pyproject.toml` with `uv init` if the project has none.
2. Import the requirements with `uv add -r requirements.in -c requirements.txt`. Passing the old lock file as constraints keeps the versions you already run.
3. Import development requirements into the `dev` group with `uv add --dev -r requirements-dev.in -c requirements-dev.txt`, and any other set into a named group with `--group`, for example `--group docs`.
4. Run commands with `uv run`, for example `uv run pytest`, or create the environment with `uv sync`. uv keeps a `.venv` directory per project and syncs it for you.

Local paths, editable paths and Git dependencies in `requirements.in` end up in the `[tool.uv.sources]` table of `pyproject.toml`.

## Pitfalls

- **`uv add -r requirements.in` alone solves for new versions**, since `requirements.in` does not pin anything. Add `-c requirements.txt` if nothing should change during the switch.
- Platform-specific lock files cannot be passed as constraints as they are: they carry no markers and conflict. Rewrite each one first, for example `uv pip compile requirements.in -o requirements-win.txt --python-platform windows --no-strip-markers`, then pass them all with repeated `-c`.
- If `requirements-dev.in` includes `requirements.in` through `-r`, strip that line before importing, or the base requirements land in the dev group. The guide pipes it through `sed '/^-r /d'` into `uv add --dev -r -`.
- Inside a project, uv uses the project's `.venv` and ignores the environment named by `VIRTUAL_ENV`. Pass `--active` to use the active environment instead.
