import { installationsFromEnv } from "./lib/app.ts";
import { loadSoundCatalog } from "./lib/catalog.ts";
import { gitEventHistory } from "./lib/event-history.ts";
import { loadWindows, RECORD_FAILED_EXIT_CODE, recordFacts } from "./lib/facts-db.ts";
import { createGitHub } from "./lib/github.ts";
import { createGraphQL } from "./lib/graphql.ts";
import { publishOrExplain, readPublished } from "./lib/publish.ts";
import { refreshTools } from "./lib/refresh-run.ts";
import { secondsSince } from "./lib/timing.ts";
import { runRows } from "./lib/tool-facts.ts";

const started = performance.now();
const root = process.cwd();
const catalog = await loadSoundCatalog(root);

const clients = {
  gh: createGitHub(process.env.GITHUB_TOKEN),
  gql: createGraphQL(process.env.GITHUB_TOKEN),
  installations: installationsFromEnv(process.env),
};
const now = new Date();
const previous = await readPublished(root);
const databaseUrl = process.env.DATABASE_URL;
const stored = databaseUrl ? await loadWindows(databaseUrl) : new Map();
const { tools, owners, facts, windows } = await refreshTools(root, previous, clients, catalog.tools, catalog.tools, now, stored);

const checkedAt = now.toISOString();
const published = await publishOrExplain(root, catalog, { checkedAt, owners, tools }, { now, history: gitEventHistory(root) });

if (published && databaseUrl && !(await recordFacts(databaseUrl, runRows(checkedAt, tools, facts), windows))) {
  process.exitCode = RECORD_FAILED_EXIT_CODE;
}

const { queries, cost, remaining } = clients.gql.spent();
const outcome = published ? `refreshed ${tools.length} tools` : "refused to publish";
console.log(`${outcome} in ${secondsSince(started)} s and ${queries} GraphQL queries costing ${cost} points, ${remaining ?? "?"} left`);
