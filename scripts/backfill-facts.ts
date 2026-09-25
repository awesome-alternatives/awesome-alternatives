import { applySchema, insertFacts, refreshDaily, withDatabase } from "./lib/facts-db.ts";
import { catalogLogArgs, dailyCatalogs } from "./lib/history.ts";
import { snapshotRows } from "./lib/tool-facts.ts";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("usage: DATABASE_URL=postgres://... node scripts/backfill-facts.ts");
  process.exit(2);
}

const root = process.cwd();
await withDatabase(databaseUrl, async (sql) => {
  await applySchema(sql);
  let days = 0;
  let rows = 0;
  let inserted = 0;
  for (const { at, catalog } of dailyCatalogs(root, catalogLogArgs())) {
    const snapshot = snapshotRows(catalog, at);
    days += 1;
    rows += snapshot.length;
    inserted += await insertFacts(sql, snapshot);
  }
  await refreshDaily(sql);
  console.log(`backfilled ${days} days: ${inserted} of ${rows} rows were new`);
});
