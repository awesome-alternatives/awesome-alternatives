import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isCurrent, isRecheckDay, RECHECK_DAYS } from "../scripts/lib/recheck.ts";
import type { EnrichedTool } from "../scripts/lib/types.ts";
import { declared, published } from "./catalog-checkout.ts";

const DAY_MS = 24 * 60 * 60 * 1000;
const START = Date.parse("2026-09-24T05:17:00.000Z");
const days = Array.from({ length: RECHECK_DAYS }, (_, i) => new Date(START + i * DAY_MS));
const quietDay = (slug: string) => days.find((day) => !isRecheckDay(slug, day)) as Date;

function released(tag: string, publishedAt: string): EnrichedTool {
  const tool = published(declared("fd", "sharkdp"), 10, false);
  return { ...tool, releases: [{ tag, name: tag, publishedAt, url: "u", prerelease: false }] };
}

function seen(before: EnrichedTool, change: { fullName?: string; pushedAt?: string; newest?: string | null } = {}) {
  return {
    repo: { fullName: change.fullName ?? before.repo.fullName, pushedAt: change.pushedAt ?? before.repo.pushedAt },
    newest: change.newest === undefined ? (before.releases[0]?.tag ?? null) : change.newest,
  };
}

describe("isRecheckDay", () => {
  it("reads each repository in full on exactly one day of every week", () => {
    for (const slug of ["fd", "gitea", "deno", "a", "zed-editor"]) {
      assert.equal(days.filter((day) => isRecheckDay(slug, day)).length, 1, slug);
    }
  });

  it("spreads the catalog over the week rather than rereading it all on the same day", () => {
    const slugs = Array.from({ length: 70 }, (_, i) => `tool-${i}`);
    const perDay = days.map((day) => slugs.filter((slug) => isRecheckDay(slug, day)).length);
    assert.ok(Math.max(...perDay) <= 20, perDay.join(","));
  });
});

describe("isCurrent", () => {
  const before = released("v10.3.0", "2026-09-01T00:00:00Z");
  const now = quietDay(before.slug);

  it("keeps the published facts of a repository whose pushes left its releases alone", () => {
    assert.equal(isCurrent(before, seen(before, { pushedAt: "2026-09-26T00:00:00Z" }), now), true);
  });

  it("reads in full a tool the catalog does not have yet", () => {
    assert.equal(isCurrent(undefined, seen(before), now), false);
  });

  it("reads in full a repository that moved to another name", () => {
    assert.equal(isCurrent(before, seen(before, { fullName: "sharkdp/fd-find" }), now), false);
  });

  it("reads in full a repository with a new release, even one published on a tag pushed earlier", () => {
    assert.equal(isCurrent(before, seen(before, { newest: "v10.4.0" }), now), false);
    assert.equal(isCurrent(before, seen(before, { newest: null }), now), false);
  });

  it("reads in full a repository without releases once it is pushed to, since its latest tag may have moved", () => {
    const tagsOnly = { ...before, releases: [] };
    assert.equal(isCurrent(tagsOnly, seen(tagsOnly), now), true);
    assert.equal(isCurrent(tagsOnly, seen(tagsOnly, { pushedAt: "2026-09-26T00:00:00Z" }), now), false);
  });

  it("reads a release again for a day after it was published, while its assets may still be uploading", () => {
    const fresh = released("v10.3.0", new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString());
    assert.equal(isCurrent(fresh, seen(fresh), now), false);
  });

  it("reads in full on the repository's day of the week, for topics and edits nothing else reveals", () => {
    const recheck = days.find((day) => isRecheckDay(before.slug, day)) as Date;
    assert.equal(isCurrent(before, seen(before), recheck), false);
  });
});
