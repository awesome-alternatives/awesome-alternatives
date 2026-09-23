import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { factsChangedAt } from "../scripts/lib/changed.ts";

const now = new Date("2026-09-23T03:00:00Z");
const repo = { license: "MIT", archived: false };
const earlier = "2026-06-01T03:00:00.000Z";

describe("factsChangedAt", () => {
  it("stamps the run that sees the licence change", () => {
    assert.equal(factsChangedAt({ repo, factsChangedAt: earlier }, { ...repo, license: "BUSL-1.1" }, now), now.toISOString());
  });

  it("stamps the run that sees the repository archived", () => {
    assert.equal(factsChangedAt({ repo, factsChangedAt: null }, { ...repo, archived: true }, now), now.toISOString());
  });

  it("carries the previous date when nothing a reader would notice changed", () => {
    assert.equal(factsChangedAt({ repo, factsChangedAt: earlier }, repo, now), earlier);
  });

  it("claims no date for a tool it has never seen before, or from a catalog without the field", () => {
    assert.equal(factsChangedAt(undefined, repo, now), null);
    assert.equal(factsChangedAt({ repo }, repo, now), null);
  });
});
