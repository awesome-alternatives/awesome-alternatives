import { createRecheckHost, recheckLabelled } from "./lib/recheck-labels.ts";

const { GH_TOKEN, GITHUB_REPOSITORY } = process.env;
if (!GH_TOKEN || !GITHUB_REPOSITORY) {
  console.error("usage: GH_TOKEN=... GITHUB_REPOSITORY=owner/name node scripts/recheck-labels.ts");
  process.exit(2);
}

for (const outcome of await recheckLabelled(createRecheckHost(GITHUB_REPOSITORY, GH_TOKEN), "too-new")) {
  console.log(
    outcome.result === "rerun" ? `#${outcome.number}: reran Validate run ${outcome.run}` : `#${outcome.number}: skipped, ${outcome.reason}`,
  );
}
