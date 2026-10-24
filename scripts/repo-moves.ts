import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { loadListedCatalog } from "./lib/catalog.ts";
import { createGraphQL } from "./lib/graphql.ts";
import { createProposalHost } from "./lib/maintainer-host.ts";
import { movesOf, proposeMoves, readNames } from "./lib/repo-moves.ts";

const { GH_TOKEN, GITHUB_REPOSITORY } = process.env;
if (!GH_TOKEN || !GITHUB_REPOSITORY) {
  console.error("usage: GH_TOKEN=... GITHUB_REPOSITORY=owner/name node scripts/repo-moves.ts");
  process.exit(2);
}

const root = process.cwd();
const { tools } = await loadListedCatalog(root);
const moves = movesOf(tools, await readNames(createGraphQL(GH_TOKEN), tools));
console.log(`${moves.length} of ${tools.length} repositories moved or gone`);

const outcomes = await proposeMoves(moves, {
  base: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
  read: (path) => readFile(join(root, path), "utf8"),
  host: createProposalHost(GITHUB_REPOSITORY, GH_TOKEN),
});

for (const outcome of outcomes) {
  switch (outcome.result) {
    case "opened":
    case "updated":
      console.log(`${outcome.slug}: ${outcome.result} #${outcome.number}`);
      break;
    case "skipped":
      console.log(`${outcome.slug}: not proposed, ${outcome.reason}`);
      break;
    case "failed":
      console.error(`${outcome.slug}: proposal failed, ${outcome.reason}`);
      process.exitCode = 1;
      break;
  }
}
