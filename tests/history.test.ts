import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { HISTORY_DAYS, historyLogArgs, lastPerDay, parseRevisions, starSeries } from "../scripts/lib/history.ts";

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

describe("starSeries", () => {
  it("builds one series per tool, including tools that joined the catalog later", () => {
    const series = starSeries([
      { at: "2026-09-24T03:17:00.000Z", catalog: { tools: [{ slug: "a", repo: { stars: 12 } }, { slug: "b", repo: { stars: 5 } }] } },
      { at: "2026-09-23T03:17:00.000Z", catalog: { tools: [{ slug: "a", repo: { stars: 10 } }] } },
    ]);
    assert.deepEqual(series.get("a"), [
      { at: "2026-09-23T03:17:00.000Z", stars: 10 },
      { at: "2026-09-24T03:17:00.000Z", stars: 12 },
    ]);
    assert.deepEqual(series.get("b"), [{ at: "2026-09-24T03:17:00.000Z", stars: 5 }]);
  });
});

describe("historyLogArgs", () => {
  it("reaches one day past the trend window, so its start has a point", () => {
    const args = historyLogArgs(new Date("2026-09-24T12:00:00Z"));
    const since = args.find((a) => a.startsWith("--since="))?.slice("--since=".length) ?? "";
    assert.equal((Date.parse("2026-09-24T12:00:00Z") - Date.parse(since)) / 86_400_000, HISTORY_DAYS);
    assert.equal(args.at(-1), "generated/catalog.json");
  });
});
