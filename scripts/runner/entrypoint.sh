#!/usr/bin/env bash
set -euo pipefail

command=${1:-refresh}
case "$command" in
  refresh | backfill) ;;
  *)
    echo "usage: entrypoint.sh [refresh|backfill]" >&2
    exit 2
    ;;
esac

: "${APP_ID:?APP_ID is required}"
: "${APP_PRIVATE_KEY:?APP_PRIVATE_KEY is required}"
repository=${REPOSITORY:-awesome-alternatives/awesome-alternatives}
workdir=${WORK_DIR:-/work}
app=$(cd "$(dirname "$0")/../.." && pwd)
record_failed=75

GITHUB_TOKEN=$(REPOSITORY="$repository" node "$app/scripts/runner/token.ts" read)
export GITHUB_TOKEN

checkout="$workdir/repository"
refreshed="$workdir/refreshed"
rm -rf "$checkout" "$refreshed"
git clone --quiet "https://github.com/$repository.git" "$checkout"
cd "$checkout"

if [ "$command" = backfill ]; then
  exec env -u APP_PRIVATE_KEY node "$app/scripts/backfill-facts.ts"
fi

status=0
node "$app/scripts/refresh.ts" || status=$?
if [ "$status" -ne 0 ] && [ "$status" -ne "$record_failed" ]; then
  exit "$status"
fi

mkdir -p "$refreshed/generated"
cp generated/catalog.json "$refreshed/generated/"
cp README.md "$refreshed/"
push_token=$(REPOSITORY="$repository" node "$app/scripts/runner/token.ts" write)
GIT_CONFIG_COUNT=1 \
  GIT_CONFIG_KEY_0="http.https://github.com/.extraheader" \
  GIT_CONFIG_VALUE_0="AUTHORIZATION: basic $(printf 'x-access-token:%s' "$push_token" | base64 -w0)" \
  "$app/scripts/ci/push-catalog.sh" "chore(catalog): refresh from GitHub" cp -r "$refreshed/." .
exit "$status"
