import { readFile } from "node:fs/promises";
import postgres, { type Sql } from "postgres";
import type { ToolFactsRow } from "./tool-facts.ts";

export const SCHEMA_FILE = new URL("../db/schema.sql", import.meta.url);
const INSERT_BATCH = 1000;
export const RECORD_FAILED_EXIT_CODE = 75;

const COLUMNS = [
  "time",
  "slug",
  "stars",
  "forks",
  "open_issues",
  "pushed_at",
  "release_tag",
  "release_published_at",
  "signed",
] as const satisfies readonly (keyof ToolFactsRow)[];

export function splitStatements(script: string): string[] {
  const statements: string[] = [];
  let current = "";
  let quote: string | null = null;
  for (let i = 0; i < script.length; i++) {
    const char = script[i] as string;
    if (quote) {
      if (script.startsWith(quote, i)) {
        current += quote;
        i += quote.length - 1;
        quote = null;
      } else {
        current += char;
      }
      continue;
    }
    const dollar = char === "$" ? /^\$\w*\$/.exec(script.slice(i)) : null;
    if (dollar || char === "'") {
      quote = dollar ? dollar[0] : "'";
      current += quote;
      i += quote.length - 1;
    } else if (char === ";") {
      if (current.trim()) statements.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  if (current.trim()) statements.push(current.trim());
  return statements;
}

export function batches<T>(items: readonly T[], size: number): T[][] {
  const out: T[][] = [];
  for (let start = 0; start < items.length; start += size) out.push(items.slice(start, start + size));
  return out;
}

export async function applySchema(sql: Sql): Promise<void> {
  for (const statement of splitStatements(await readFile(SCHEMA_FILE, "utf8"))) {
    await sql.unsafe(statement);
  }
}

export async function insertFacts(sql: Sql, rows: readonly ToolFactsRow[], size = INSERT_BATCH): Promise<number> {
  let inserted = 0;
  for (const batch of batches(rows, size)) {
    const result = await sql`insert into tool_facts ${sql(batch, COLUMNS)} on conflict (slug, time) do nothing`;
    inserted += result.count;
  }
  return inserted;
}

export async function refreshDaily(sql: Sql): Promise<void> {
  await sql`call refresh_continuous_aggregate('tool_facts_daily', null, null)`;
}

export async function withDatabase<T>(url: string, run: (sql: Sql) => Promise<T>): Promise<T> {
  const sql = postgres(url, { max: 1, onnotice: () => {} });
  try {
    return await run(sql);
  } finally {
    await sql.end();
  }
}

export async function recordFacts(url: string, rows: readonly ToolFactsRow[]): Promise<boolean> {
  try {
    const inserted = await withDatabase(url, async (sql) => {
      await applySchema(sql);
      return insertFacts(sql, rows);
    });
    console.log(`recorded facts for ${inserted} tools`);
    return true;
  } catch (error) {
    console.error(`the catalog is published, but recording its facts failed: ${error instanceof Error ? error.message : error}`);
    return false;
  }
}
