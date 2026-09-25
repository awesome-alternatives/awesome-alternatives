import { installationsFromEnv } from "./lib/app.ts";
import { loadSoundCatalog } from "./lib/catalog.ts";
import { createEnricher, fetchOwners } from "./lib/enrich.ts";
import { RECORD_FAILED_EXIT_CODE, recordFacts } from "./lib/facts-db.ts";
import { fetchRepositories } from "./lib/facts-graphql.ts";
import { mapLimit } from "./lib/gather.ts";
import { createGitHub } from "./lib/github.ts";
import { createGraphQL } from "./lib/graphql.ts";
import { publishOrExplain } from "./lib/publish.ts";
import { runRows } from "./lib/tool-facts.ts";

const root = process.cwd();
const catalog = await loadSoundCatalog(root);

const gh = createGitHub(process.env.GITHUB_TOKEN);
const gql = createGraphQL(process.env.GITHUB_TOKEN);
const now = new Date();
const enricher = await createEnricher(root, installationsFromEnv(process.env), catalog.tools, now);

const facts = await fetchRepositories(gql, gh, catalog.tools);
const enriched = await mapLimit(catalog.tools, 4, (tool) => enricher.enrich(tool, facts.get(tool.slug) ?? null));
const tools = enriched.filter((t) => t !== null).sort((a, b) => a.slug.localeCompare(b.slug));
const owners = await fetchOwners(gql, tools);

const checkedAt = now.toISOString();
const published = await publishOrExplain(root, catalog, { checkedAt, owners, tools });

const databaseUrl = process.env.DATABASE_URL;
if (published && databaseUrl && !(await recordFacts(databaseUrl, runRows(checkedAt, tools, facts)))) {
  process.exitCode = RECORD_FAILED_EXIT_CODE;
}

const { queries, cost, remaining } = gql.spent();
const outcome = published ? `refreshed ${tools.length} tools` : "refused to publish";
console.log(`${outcome} in ${queries} GraphQL queries costing ${cost} points, ${remaining ?? "?"} left`);
