import { readFile } from "node:fs/promises";
import postgres, { type Sql } from "postgres";
import type { CommitWindow } from "./commit-window.ts";
import { chunks } from "./gather.ts";
import type { ToolFactsRow } from "./tool-facts.ts";

export const SCHEMA_FILE = new URL("../db/schema.sql", import.meta.url);
const INSERT_BATCH = 1000;
const WINDOW_BATCH = 50;
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

export async function applySchema(sql: Sql): Promise<void> {
  for (const statement of splitStatements(await readFile(SCHEMA_FILE, "utf8"))) {
    await sql.unsafe(statement);
  }
}

export async function insertFacts(sql: Sql, rows: readonly ToolFactsRow[], size = INSERT_BATCH): Promise<number> {
  let inserted = 0;
  for (const batch of chunks(rows, size)) {
    const result = await sql`insert into tool_facts ${sql(batch, COLUMNS)} on conflict (slug, time) do nothing`;
    inserted += result.count;
  }
  return inserted;
}

type StoredCommit = [oid: string, author: string | null, seconds: number];

export interface WindowRow {
  repository: string;
  head: string;
  walked_at: Date;
  complete: boolean;
  commits: StoredCommit[];
}

export function windowRow(repository: string, window: CommitWindow): WindowRow {
  return {
    repository,
    head: window.head,
    walked_at: new Date(window.walkedAt),
    complete: window.complete,
    commits: window.commits.map((commit) => [commit.oid, commit.author, commit.at / 1000]),
  };
}

export function windowOf(row: WindowRow): [string, CommitWindow] {
  const commits = row.commits.map(([oid, author, seconds]) => ({ oid, author, at: seconds * 1000 }));
  return [row.repository, { head: row.head, walkedAt: row.walked_at.toISOString(), complete: row.complete, commits }];
}

export async function saveWindows(sql: Sql, windows: ReadonlyMap<string, CommitWindow>): Promise<void> {
  for (const batch of chunks([...windows].map(([repository, window]) => windowRow(repository, window)), WINDOW_BATCH)) {
    const rows = batch.map((row) => ({ ...row, commits: sql.json(row.commits) }));
    await sql`insert into contributor_windows ${sql(rows, "repository", "head", "walked_at", "complete", "commits")}
      on conflict (repository) do update set head = excluded.head, walked_at = excluded.walked_at, complete = excluded.complete, commits = excluded.commits`;
  }
}

export async function loadWindows(url: string): Promise<Map<string, CommitWindow>> {
  try {
    const rows = await withDatabase(url, async (sql) => {
      await applySchema(sql);
      return sql<WindowRow[]>`select repository, head, walked_at, complete, commits from contributor_windows`;
    });
    console.log(`read the last commit walk of ${rows.length} repositories`);
    return new Map(rows.map(windowOf));
  } catch (error) {
    console.error(`reading the last commit walks failed, every history is walked in full: ${error instanceof Error ? error.message : error}`);
    return new Map();
  }
}

export async function refreshDaily(sql: Sql): Promise<void> {
  await sql`call refresh_continuous_aggregate('tool_facts_daily', null, time_bucket(interval '1 day', now()))`;
}

export async function withDatabase<T>(url: string, run: (sql: Sql) => Promise<T>): Promise<T> {
  const sql = postgres(url, { max: 1, onnotice: () => {} });
  try {
    return await run(sql);
  } finally {
    await sql.end();
  }
}

export async function recordFacts(
  url: string,
  rows: readonly ToolFactsRow[],
  windows: ReadonlyMap<string, CommitWindow> = new Map(),
): Promise<boolean> {
  try {
    const inserted = await withDatabase(url, async (sql) => {
      await applySchema(sql);
      await saveWindows(sql, windows);
      return insertFacts(sql, rows);
    });
    console.log(`recorded facts for ${inserted} tools`);
    return true;
  } catch (error) {
    console.error(`the catalog is published, but recording its facts failed: ${error instanceof Error ? error.message : error}`);
    return false;
  }
}
