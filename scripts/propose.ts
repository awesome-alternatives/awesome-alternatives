import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { loadSoundCatalog } from "./lib/catalog.ts";
import type { Proposal } from "./lib/maintainer-editorial.ts";
import { catalogGuard } from "./lib/maintainer-guard.ts";
import { createProposalHost } from "./lib/maintainer-host.ts";
import { proposeAll } from "./lib/maintainer-propose.ts";
import { readMigrationPages } from "./lib/migrations.ts";

const [file] = process.argv.slice(2);
const { GH_TOKEN, GITHUB_REPOSITORY } = process.env;
if (!file || !GH_TOKEN || !GITHUB_REPOSITORY) {
  console.error("usage: GH_TOKEN=... GITHUB_REPOSITORY=owner/name node scripts/propose.ts <proposals.json>");
  process.exit(2);
}

const root = process.cwd();
const catalog = await loadSoundCatalog(root);
const proposals = JSON.parse(await readFile(file, "utf8")) as Proposal[];
const outcomes = await proposeAll(proposals, {
  catalog,
  guard: catalogGuard(catalog, await readMigrationPages(root)),
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
