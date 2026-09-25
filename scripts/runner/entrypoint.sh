#!/usr/bin/env bash
set -euo pipefail

: "${APP_ID:?APP_ID is required}"
: "${APP_PRIVATE_KEY:?APP_PRIVATE_KEY is required}"
repository=${REPOSITORY:-awesome-alternatives/awesome-alternatives}
workdir=${WORK_DIR:-/work}
app=$(cd "$(dirname "$0")/../.." && pwd)

GITHUB_TOKEN=$(REPOSITORY="$repository" node "$app/scripts/runner/token.ts")
export GITHUB_TOKEN
export GIT_CONFIG_COUNT=1
export GIT_CONFIG_KEY_0="http.https://github.com/.extraheader"
GIT_CONFIG_VALUE_0="AUTHORIZATION: basic $(printf 'x-access-token:%s' "$GITHUB_TOKEN" | base64 -w0)"
export GIT_CONFIG_VALUE_0

checkout="$workdir/repository"
refreshed="$workdir/refreshed"
rm -rf "$checkout" "$refreshed"
git clone --quiet "https://github.com/$repository.git" "$checkout"
cd "$checkout"

node "$app/scripts/refresh.ts"

mkdir -p "$refreshed/generated"
cp generated/catalog.json "$refreshed/generated/"
cp README.md "$refreshed/"
"$app/scripts/ci/push-catalog.sh" "chore(catalog): refresh from GitHub" cp -r "$refreshed/." .
