import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { applyVerdict, createLabelHost, parseVerdict } from "./lib/pr-labels.ts";

const { GH_TOKEN, GITHUB_REPOSITORY, HEAD_SHA } = process.env;
const dir = process.argv[2];
if (!GH_TOKEN || !GITHUB_REPOSITORY || !HEAD_SHA || !dir) {
  console.error("usage: GH_TOKEN=... GITHUB_REPOSITORY=owner/name HEAD_SHA=... node scripts/pr-labels.ts <verdict-dir>");
  process.exit(2);
}

const verdict = parseVerdict(await readFile(join(dir, "number"), "utf8"), await readFile(join(dir, "labels.json"), "utf8"));
const { added, removed } = await applyVerdict(createLabelHost(GITHUB_REPOSITORY, GH_TOKEN), verdict, HEAD_SHA);
console.log(`#${verdict.number}: added [${added.join(", ")}], removed [${removed.join(", ")}]`);
