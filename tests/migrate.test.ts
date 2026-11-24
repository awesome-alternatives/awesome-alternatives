import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import type { Sql } from "postgres";
import { applySchema, loadWindows, type OpenDatabase, recordFacts, SCHEMA_FILE, splitStatements } from "../scripts/lib/facts-db.ts";

const row = { time: "2026-09-25T03:17:00.000Z", slug: "a", stars: 1, forks: 0, open_issues: null, pushed_at: null, release_tag: null, release_published_at: null, signed: null };
const missingTable = 'relation "contributor_windows" does not exist';

interface Recorder {
  open: OpenDatabase;
  unsafe: string[];
  queries: string[];
}

function database(failWith?: string): Recorder {
  const unsafe: string[] = [];
  const queries: string[] = [];
  const sql = Object.assign(
    (first: unknown, ...rest: unknown[]) => {
      if (!Array.isArray(first) || !("raw" in first)) return first;
      queries.push(first.join("?"));
      return failWith ? Promise.reject(new Error(failWith)) : Promise.resolve(Object.assign([], { count: 1 }));
    },
    {
      unsafe: (statement: string) => {
        unsafe.push(statement);
        return Promise.resolve([]);
      },
      json: (value: unknown) => value,
    },
  ) as unknown as Sql;
  return { open: (_url, run) => run(sql), unsafe, queries };
}

describe("applySchema", () => {
  it("runs every statement of the schema file, in order, one at a time", async () => {
    const { open, unsafe } = database();
    await open("postgres://unused", applySchema);
    assert.deepEqual(unsafe, splitStatements(readFileSync(SCHEMA_FILE, "utf8")));
    assert.ok(unsafe.length > 5);
  });

  it("keeps the API grant in the schema rather than in a hand-applied step", () => {
    assert.match(readFileSync(SCHEMA_FILE, "utf8"), /GRANT SELECT ON tool_facts_daily TO awesome_alternatives_api/);
  });

  it("is written to be run again on a migrated database", () => {
    const script = readFileSync(SCHEMA_FILE, "utf8");
    for (const statement of splitStatements(script)) {
      if (/^(CREATE|SELECT (create_hypertable|add_))/i.test(statement)) {
        assert.match(statement, /IF NOT EXISTS|if_not_exists/i, statement);
      }
    }
  });
});

describe("refresh against a database", () => {
  it("reads the last walks without issuing any DDL", async () => {
    const db = database();
    await loadWindows("postgres://unused", db.open);
    assert.deepEqual(db.unsafe, []);
    assert.equal(db.queries.length, 1);
  });

  it("records facts and walks without issuing any DDL", async () => {
    const db = database();
    assert.equal(await recordFacts("postgres://unused", [row], new Map(), db.open), true);
    assert.deepEqual(db.unsafe, []);
    assert.ok(db.queries.some((query) => query.includes("tool_facts")));
  });

  it("walks every history in full when the schema was never migrated", async (t) => {
    const errors = t.mock.method(console, "error", () => {});
    const windows = await loadWindows("postgres://unused", database(missingTable).open);
    assert.equal(windows.size, 0);
    assert.match(String(errors.mock.calls[0]?.arguments[0]), /contributor_windows" does not exist/);
  });

  it("reports the failed record when the schema was never migrated, so the run exits non-zero", async (t) => {
    const errors = t.mock.method(console, "error", () => {});
    assert.equal(await recordFacts("postgres://unused", [row], new Map(), database(missingTable).open), false);
    assert.match(String(errors.mock.calls[0]?.arguments[0]), /recording its facts failed.*does not exist/);
  });
});

describe("migrate entrypoint", () => {
  it("refuses to run without DATABASE_URL", () => {
    const result = spawnSync("node", ["scripts/migrate.ts"], { env: { PATH: process.env.PATH }, encoding: "utf8" });
    assert.equal(result.status, 2);
    assert.match(result.stderr, /usage: DATABASE_URL=/);
  });

  it("is exposed as a package script and a runner command", () => {
    const scripts = JSON.parse(readFileSync("package.json", "utf8")).scripts;
    assert.equal(scripts.migrate, "node scripts/migrate.ts");
    assert.equal(spawnSync("scripts/runner/entrypoint.sh", ["nope"], { encoding: "utf8" }).status, 2);
  });

  it("is the only script that applies the schema", () => {
    const users = execFileSync("grep", ["-rlE", "applySchema", "scripts"], { encoding: "utf8" }).trim().split("\n").sort();
    assert.deepEqual(users, ["scripts/lib/facts-db.ts", "scripts/migrate.ts"]);
  });
});
