#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -ne 3 ]; then
  echo "usage: COMMIT_MESSAGE_FILE=<path> scripts/ci/restore-refreshed.sh <refreshed directory> <patch of data/tools> <drafted message>" >&2
  exit 2
fi
: "${COMMIT_MESSAGE_FILE:?COMMIT_MESSAGE_FILE is required}"

refreshed=$1
patch=$2
drafted=$3

if [ -d "$refreshed/catalog" ]; then
  rm -rf catalog
fi
kept_readme=$(mktemp)
cp README.md "$kept_readme" 2>/dev/null || : >"$kept_readme"
cp -r "$refreshed/." .
if [ -f "$refreshed/README.md" ] && [ -s "$kept_readme" ]; then
  cp "$kept_readme" README.md
  node "$(dirname "$0")/splice-readme.ts" README.md "$refreshed/README.md"
fi
rm -f "$kept_readme"
: >"$COMMIT_MESSAGE_FILE"
if [ ! -s "$patch" ]; then
  exit 0
fi
if git apply "$patch"; then
  if [ -s "$drafted" ]; then
    cp "$drafted" "$COMMIT_MESSAGE_FILE"
  fi
else
  echo "the values applied from maintainer files no longer apply on the new main, left to the next refresh" >&2
fi
