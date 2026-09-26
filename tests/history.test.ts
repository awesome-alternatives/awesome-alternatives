import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { catalogLogArgs, lastPerDay, parseRevisions } from "../scripts/lib/history.ts";

describe("parseRevisions", () => {
  it("reads git's hash and committer date, in UTC", () => {
    assert.deepEqual(parseRevisions("abc 2026-09-24T05:17:00+02:00\n\ndef 2026-09-23T03:17:00Z\n"), [
      { sha: "abc", at: "2026-09-24T03:17:00.000Z" },
      { sha: "def", at: "2026-09-23T03:17:00.000Z" },
    ]);
  });
});

describe("lastPerDay", () => {
  it("keeps the last revision of each UTC day, oldest first", () => {
    const kept = lastPerDay([
      { sha: "late", at: "2026-09-24T18:00:00.000Z" },
      { sha: "early", at: "2026-09-24T03:17:00.000Z" },
      { sha: "before", at: "2026-09-23T03:17:00.000Z" },
    ]);
    assert.deepEqual(
      kept.map((r) => r.sha),
      ["before", "late"],
    );
  });
});

describe("catalogLogArgs", () => {
  it("walks the catalog's whole history when given no start", () => {
    assert.deepEqual(catalogLogArgs(), ["log", "--format=%H %cI", "--", "generated/catalog.json"]);
  });
});
