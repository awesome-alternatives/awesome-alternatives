import { applySchema, withDatabase } from "./lib/facts-db.ts";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("usage: DATABASE_URL=postgres://... node scripts/migrate.ts");
  process.exit(2);
}

await withDatabase(databaseUrl, applySchema);
console.log("schema is up to date");
