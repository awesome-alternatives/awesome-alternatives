import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { loadSoundCatalog } from "./lib/catalog.ts";
import { createEnricher, fetchOwners } from "./lib/enrich.ts";
import { Etags } from "./lib/etags.ts";
import { mapLimit } from "./lib/gather.ts";
import { createGitHub } from "./lib/github.ts";
import { publish } from "./lib/publish.ts";

const root = process.cwd();
const catalog = await loadSoundCatalog(root);

const etagsPath = join(root, ".cache/github-etags.json");
const etags = await readFile(etagsPath, "utf8").then(Etags.parse, () => Etags.empty());
const gh = createGitHub(process.env.GITHUB_TOKEN, fetch, etags);
const now = new Date();
const enricher = await createEnricher(root, gh, catalog.tools, now);

const enriched = await mapLimit(catalog.tools, 4, (tool) => enricher.enrich(tool));
const tools = enriched.filter((t) => t !== null).sort((a, b) => a.slug.localeCompare(b.slug));
const owners = await fetchOwners(gh, tools);

await publish(root, catalog, { checkedAt: now.toISOString(), owners, tools });

await mkdir(dirname(etagsPath), { recursive: true });
await writeFile(etagsPath, `${JSON.stringify(etags)}\n`);

console.log(`refreshed ${tools.length} tools`);
