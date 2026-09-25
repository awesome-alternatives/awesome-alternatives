import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { runRows, snapshotRows } from "../scripts/lib/tool-facts.ts";
import type { EnrichedTool } from "../scripts/lib/types.ts";

const fixture = (name: string): unknown => JSON.parse(readFileSync(new URL(`fixtures/${name}`, import.meta.url), "utf8"));

describe("snapshotRows", () => {
  it("reads the first catalog, which had no checkedAt, at its commit time", () => {
    assert.deepEqual(snapshotRows(fixture("catalog-first-revision.json"), "2026-09-22T06:55:40.000Z"), [
      {
        time: "2026-09-22T06:55:40.000Z",
        slug: "cocogitto",
        stars: 1193,
        forks: 87,
        open_issues: null,
        pushed_at: "2026-04-22T23:25:14.000Z",
        release_tag: "7.0.0",
        release_published_at: "2026-03-04T09:25:39.000Z",
        signed: false,
      },
      {
        time: "2026-09-22T06:55:40.000Z",
        slug: "ferrflow",
        stars: 3,
        forks: 1,
        open_issues: null,
        pushed_at: "2026-09-22T06:52:49.000Z",
        release_tag: "v7.21.10",
        release_published_at: "2026-09-21T19:42:01.000Z",
        signed: false,
      },
    ]);
  });

  it("dates a current catalog by its checkedAt, so a backfill lands on the rows the nightly run wrote", () => {
    const rows = snapshotRows(fixture("catalog-current.json"), "2026-09-24T18:17:27.000Z");
    assert.deepEqual(
      rows.map((r) => [r.time, r.slug, r.release_tag, r.release_published_at, r.signed]),
      [
        ["2026-09-24T18:14:51.088Z", "dub", null, null, null],
        ["2026-09-24T18:14:51.088Z", "ack", "v3.10.0", null, false],
      ],
    );
  });

  it("keeps a tool whose old shape lacks pushedAt or signed, with those left null", () => {
    const catalog = { tools: [{ slug: "old", repo: { stars: 5, forks: 2 }, release: { tag: "v1" } }] };
    assert.deepEqual(snapshotRows(catalog, "2026-01-01T00:00:00.000Z"), [
      {
        time: "2026-01-01T00:00:00.000Z",
        slug: "old",
        stars: 5,
        forks: 2,
        open_issues: null,
        pushed_at: null,
        release_tag: "v1",
        release_published_at: null,
        signed: null,
      },
    ]);
  });

  it("skips tools that cannot fill the not-null columns rather than inventing counts", () => {
    const catalog = {
      tools: [
        { slug: "no-forks", repo: { stars: 5 } },
        { slug: "no-repo" },
        { repo: { stars: 1, forks: 1 } },
        { slug: "negative", repo: { stars: -1, forks: 0 } },
        { slug: "kept", repo: { stars: 1, forks: 0, pushedAt: "not a date" } },
      ],
    };
    const rows = snapshotRows(catalog, "2026-01-01T00:00:00.000Z");
    assert.deepEqual(
      rows.map((r) => [r.slug, r.pushed_at]),
      [["kept", null]],
    );
  });

  it("reads nothing from a file that is not a catalog", () => {
    assert.deepEqual(snapshotRows([{ slug: "a" }], "2026-01-01T00:00:00.000Z"), []);
    assert.deepEqual(snapshotRows(null, "2026-01-01T00:00:00.000Z"), []);
  });
});

describe("runRows", () => {
  const tool = (slug: string, release: EnrichedTool["release"]) =>
    ({
      slug,
      repo: { stars: 10, forks: 3, pushedAt: "2026-09-24T01:00:00Z" },
      release,
    }) as EnrichedTool;

  it("stamps every tool with the run's checkedAt and joins the open issues fetched beside the catalog", () => {
    const release = { tag: "v2", publishedAt: "2026-09-20T00:00:00Z", url: "u", source: "release" as const, signed: true };
    const rows = runRows("2026-09-25T03:17:00.000Z", [tool("a", release), tool("b", null)], new Map([["a", { openIssues: 4 }]]));
    assert.deepEqual(rows, [
      {
        time: "2026-09-25T03:17:00.000Z",
        slug: "a",
        stars: 10,
        forks: 3,
        open_issues: 4,
        pushed_at: "2026-09-24T01:00:00Z",
        release_tag: "v2",
        release_published_at: "2026-09-20T00:00:00Z",
        signed: true,
      },
      {
        time: "2026-09-25T03:17:00.000Z",
        slug: "b",
        stars: 10,
        forks: 3,
        open_issues: null,
        pushed_at: "2026-09-24T01:00:00Z",
        release_tag: null,
        release_published_at: null,
        signed: null,
      },
    ]);
  });
});
