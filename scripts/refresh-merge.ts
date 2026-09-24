import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { loadSoundCatalog } from "./lib/catalog.ts";
import { mergeEntries, type RefreshedEntry } from "./lib/merge.ts";
import { publish, readPublished } from "./lib/publish.ts";

const [entriesDir] = process.argv.slice(2);
if (!entriesDir) {
  console.error("usage: node scripts/refresh-merge.ts <entries-dir>");
  process.exit(2);
}

const root = process.cwd();
const catalog = await loadSoundCatalog(root);
const files = (await readdir(entriesDir)).filter((f) => f.endsWith(".json"));
const entries = await Promise.all(
  files.map(async (f) => JSON.parse(await readFile(join(entriesDir, f), "utf8")) as RefreshedEntry),
);

await publish(root, catalog, mergeEntries(await readPublished(root), entries));
console.log(`merged ${entries.map((e) => e.slug).join(", ")}`);
