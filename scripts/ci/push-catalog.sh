#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -lt 2 ]; then
  echo "usage: scripts/ci/push-catalog.sh <commit message> <command that writes the catalog>..." >&2
  exit 2
fi

message=$1
shift

git config user.name 'github-actions[bot]'
git config user.email '41898282+github-actions[bot]@users.noreply.github.com'

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
    gh workflow run release.yml --ref main
    exit 0
  fi
  echo "main moved while committing, attempt $attempt, starting over from the new head"
done

echo "gave up after 5 attempts" >&2
exit 1
