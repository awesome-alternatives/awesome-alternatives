import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { batches, SCHEMA_FILE, splitStatements } from "../scripts/lib/facts-db.ts";

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

describe("batches", () => {
  it("cuts rows into fixed-size batches with a shorter last one", () => {
    assert.deepEqual(batches([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
    assert.deepEqual(batches([], 2), []);
  });
});
