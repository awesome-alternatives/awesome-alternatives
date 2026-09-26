import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { recordFacts, SCHEMA_FILE, splitStatements } from "../scripts/lib/facts-db.ts";
import { chunks } from "../scripts/lib/gather.ts";

describe("splitStatements", () => {
  it("splits on semicolons outside quotes and dollar-quoted bodies", () => {
    const script = `SELECT 'a;b';\nDO $$ BEGIN PERFORM 1; PERFORM 2; END $$;\nDO $body$ BEGIN RAISE NOTICE '$$;'; END $body$;\n\nSELECT 3`;
    assert.deepEqual(splitStatements(script), [
      "SELECT 'a;b'",
      "DO $$ BEGIN PERFORM 1; PERFORM 2; END $$",
      "DO $body$ BEGIN RAISE NOTICE '$$;'; END $body$",
      "SELECT 3",
    ]);
  });

  it("keeps each schema step its own statement, since continuous aggregates refuse a transaction block", () => {
    const statements = splitStatements(readFileSync(SCHEMA_FILE, "utf8"));
    assert.ok(statements.some((s) => s.startsWith("CREATE MATERIALIZED VIEW IF NOT EXISTS tool_facts_daily")));
    assert.ok(statements.every((s) => !/;\s*CREATE MATERIALIZED VIEW/i.test(s)));
    assert.match(statements.at(-1) ?? "", /GRANT SELECT ON tool_facts_daily TO awesome_alternatives_api;\s+END IF;\s+END\s+\$\$$/);
  });
});

describe("chunks", () => {
  it("cuts rows into fixed-size batches with a shorter last one", () => {
    assert.deepEqual(chunks([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
    assert.deepEqual(chunks([], 2), []);
  });
});

describe("recordFacts", () => {
  it("reports an unreachable database instead of throwing, so the catalog still gets pushed", async (t) => {
    const errors = t.mock.method(console, "error", () => {});
    const row = { time: "2026-09-25T03:17:00.000Z", slug: "a", stars: 1, forks: 0, open_issues: null, pushed_at: null, release_tag: null, release_published_at: null, signed: null };
    assert.equal(await recordFacts("postgres://nobody:secret@127.0.0.1:1/facts?connect_timeout=2", [row]), false);
    assert.equal(errors.mock.callCount(), 1);
    const logged = String(errors.mock.calls[0]?.arguments[0]);
    assert.match(logged, /recording its facts failed/);
    assert.doesNotMatch(logged, /secret/);
  });
});
