#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -lt 2 ]; then
  echo "usage: scripts/ci/push-catalog.sh <commit message> <command that writes the catalog>..." >&2
  exit 2
fi

message=$1
shift

git config user.name "${GIT_AUTHOR_NAME:-github-actions[bot]}"
git config user.email "${GIT_AUTHOR_EMAIL:-41898282+github-actions[bot]@users.noreply.github.com}"
if [ "${GITHUB_ACTIONS:-}" = true ]; then
  gh auth setup-git
fi

for attempt in 1 2 3 4 5; do
  git fetch --quiet origin main
  git reset --quiet --hard origin/main
  "$@"
  git add generated/catalog.json README.md
  if git diff --cached --quiet; then
    echo "catalog unchanged"
    exit 0
  fi
  git commit --quiet -m "$message"
  if git push --quiet origin HEAD:main; then
    if [ "${GITHUB_ACTIONS:-}" = true ]; then
      gh workflow run release.yml --ref main
    fi
    exit 0
  fi
  echo "main moved while committing, attempt $attempt, starting over from the new head"
done

echo "gave up after 5 attempts" >&2
exit 1
