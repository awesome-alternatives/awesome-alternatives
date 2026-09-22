import { execFileSync } from "node:child_process";
import { appendFile } from "node:fs/promises";
import { basename } from "node:path";
import { loadCatalog } from "./lib/catalog.ts";
import { gather, mapLimit } from "./lib/gather.ts";
import { createGitHub } from "./lib/github.ts";
import { renderFindings } from "./lib/report.ts";
import { judge, replacedSlugs } from "./lib/rules.ts";

const root = process.cwd();
const args = process.argv.slice(2);

const { catalog, findings } = await loadCatalog(root);
const targets = selectTargets(args, catalog.tools.map((t) => t.slug));
const gh = createGitHub(process.env.GITHUB_TOKEN);
const now = new Date();
const replaced = replacedSlugs(catalog.tools);

const remote = await mapLimit(
  catalog.tools.filter((t) => targets.includes(t.slug)),
  4,
  async (tool) => judge(tool, await gather(gh, tool, true), now, replaced),
);
const all = [...findings, ...remote.flat()];

const report = renderFindings(all, targets);
console.log(report);
if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, `${report}\n`);

process.exitCode = all.some((f) => f.severity === "error") ? 1 : 0;

function selectTargets(argv: string[], known: string[]): string[] {
  if (argv.includes("--all")) return known;
  const from = argv[argv.indexOf("--changed-from") + 1];
  if (argv.includes("--changed-from") && from) {
    const out = execFileSync("git", ["diff", "--name-only", "--diff-filter=AMR", `${from}...HEAD`, "--", "data/tools"], {
      encoding: "utf8",
    });
    return out
      .split("\n")
      .filter((f) => f.endsWith(".yaml"))
      .map((f) => basename(f, ".yaml"))
      .filter((s) => known.includes(s));
  }
  return argv.filter((a) => known.includes(a));
}
