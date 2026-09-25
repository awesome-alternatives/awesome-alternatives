import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { diffCatalogs, isPrereleaseTag } from "../scripts/lib/events.ts";

const AT = "2026-09-25T03:00:00.000Z";

interface Shape {
  license?: string | null;
  fullName?: string;
  archived?: boolean;
  stars?: number;
  release?: { tag: string; publishedAt?: string | null; source?: "release" | "tag" } | null;
  releases?: { tag: string; prerelease: boolean }[];
  flags?: string[];
}

function tool(slug: string, { release = { tag: "v1.0.0" }, releases = [], flags = [], ...repo }: Shape = {}) {
  return {
    slug,
    repo: { fullName: `acme/${slug}`, license: "MIT", archived: false, stars: 10, ...repo },
    release: release && { publishedAt: null, source: "release", ...release },
    releases,
    flags,
  };
}

const diff = (before: unknown[], after: unknown[]) => diffCatalogs(before, after, AT, null);
const kinds = (before: unknown[], after: unknown[]) => diff(before, after).map((e) => `${e.slug}:${e.type}`);

describe("diffCatalogs", () => {
  it("stamps every event with the time and commit it was seen at", () => {
    assert.deepEqual(diffCatalogs([], [tool("a")], AT, "abc123"), [{ type: "added", slug: "a", at: AT, commit: "abc123" }]);
  });

  it("reports a tool entering and a tool leaving the catalog", () => {
    assert.deepEqual(kinds([tool("a"), tool("gone")], [tool("a"), tool("new")]), ["gone:removed", "new:added"]);
  });

  it("stays silent when only stars, the star series or the trend moved", () => {
    const before = { ...tool("a", { stars: 10 }), starHistory: { from: "2026-09-20", stars: [1, 2] }, trend: null };
    const after = { ...tool("a", { stars: 99_000 }), starHistory: { from: "2026-09-20", stars: [1, 2, 99_000] }, trend: { stars: 5 } };
    assert.deepEqual(diff([before], [after]), []);
  });

  it("does not read a field that only exists in the newer schema as a change", () => {
    const old = { slug: "a", repo: { fullName: "acme/a", stars: 1 } };
    const current = tool("a", { license: "MIT", archived: true, release: { tag: "v9" }, flags: ["inactive"] });
    const newer = { ...current, terms: "open", deploy: ["container"], releases: [{ tag: "v9", prerelease: false }] };
    assert.deepEqual(diff([old], [newer]), []);
  });

  it("follows the licence, including one GitHub starts or stops detecting", () => {
    assert.deepEqual(diff([tool("a", { license: null })], [tool("a", { license: "MIT" })]), [
      { type: "license-changed", slug: "a", at: AT, commit: null, from: null, to: "MIT" },
    ]);
    assert.deepEqual(
      diff([tool("a", { license: "MIT" })], [tool("a", { license: "BUSL-1.1" })]).map((e) => ("to" in e ? e.to : null)),
      ["BUSL-1.1"],
    );
    assert.deepEqual(kinds([tool("a", { license: "MIT" })], [tool("a", { license: null })]), ["a:license-changed"]);
  });

  it("reports a repository that moved to another owner or name", () => {
    assert.deepEqual(diff([tool("a", { fullName: "old/a" })], [tool("a", { fullName: "new/a" })]), [
      { type: "renamed", slug: "a", at: AT, commit: null, from: "old/a", to: "new/a" },
    ]);
  });

  it("reports archiving and unarchiving", () => {
    assert.deepEqual(kinds([tool("a")], [tool("a", { archived: true })]), ["a:archived"]);
    assert.deepEqual(kinds([tool("a", { archived: true })], [tool("a")]), ["a:unarchived"]);
  });

  it("reports the inactive flag appearing and clearing, but not clearing because the repository was archived", () => {
    assert.deepEqual(kinds([tool("a")], [tool("a", { flags: ["inactive"] })]), ["a:inactive"]);
    assert.deepEqual(kinds([tool("a", { flags: ["inactive", "no-license"] })], [tool("a")]), ["a:reactivated"]);
    assert.deepEqual(kinds([tool("a", { flags: ["inactive"] })], [tool("a", { archived: true, flags: ["archived"] })]), ["a:archived"]);
  });

  it("leaves the other flags to their own events", () => {
    const before = tool("a", { fullName: "old/a" });
    const after = tool("a", { fullName: "new/a", flags: ["moved", "star-spike", "no-release"] });
    assert.deepEqual(kinds([before], [after]), ["a:renamed"]);
  });

  it("reports a new release with the tag it replaces", () => {
    const before = tool("a", { release: { tag: "v1.0.0", publishedAt: "2026-09-01T00:00:00Z" } });
    const after = tool("a", { release: { tag: "v1.1.0", publishedAt: "2026-09-24T00:00:00Z" } });
    assert.deepEqual(diff([before], [after]), [{ type: "released", slug: "a", at: AT, commit: null, from: "v1.0.0", to: "v1.1.0" }]);
  });

  it("reports a first release after none", () => {
    assert.deepEqual(
      diff([tool("a", { release: null })], [tool("a", { release: { tag: "v0.1.0" } })]).map((e) => ("from" in e ? e.from : "")),
      [null],
    );
  });

  it("gives a tool that joins with a release only its arrival", () => {
    assert.deepEqual(kinds([], [tool("a", { release: { tag: "v3.0.0" } })]), ["a:added"]);
  });

  it("skips a prerelease, whether GitHub marks it or only its tag says so", () => {
    const before = tool("a", { release: { tag: "v1.0.0" } });
    const marked = tool("a", { release: { tag: "v2.0.0" }, releases: [{ tag: "v2.0.0", prerelease: true }] });
    const tagged = tool("a", { release: { tag: "v2.0.0-rc.1", source: "tag" } });
    assert.deepEqual(diff([before], [marked]), []);
    assert.deepEqual(diff([before], [tagged]), []);
  });

  it("skips a latest release that is older than the one before, and a fall back from releases to tags", () => {
    const newer = tool("a", { release: { tag: "v2.0.0", publishedAt: "2026-09-20T00:00:00Z" } });
    const older = tool("a", { release: { tag: "v1.9.0", publishedAt: "2026-08-01T00:00:00Z" } });
    const tagOnly = tool("a", { release: { tag: "v2.1.0", source: "tag" } });
    assert.deepEqual(diff([newer], [older]), []);
    assert.deepEqual(diff([newer], [tagOnly]), []);
  });

  it("orders several changes to one tool the same way every time", () => {
    const before = tool("a", { release: { tag: "v1" }, license: "MIT" });
    const after = tool("a", { release: { tag: "v2" }, license: "Apache-2.0", archived: true, fullName: "b/a" });
    assert.deepEqual(kinds([before], [after]), ["a:renamed", "a:license-changed", "a:archived", "a:released"]);
  });

  it("refuses a catalog that lists the same slug twice", () => {
    assert.throws(() => diff([], [tool("a"), tool("a")]), /a appears twice/);
  });
});

describe("isPrereleaseTag", () => {
  it("spots the usual prerelease suffixes and leaves monorepo prefixes alone", () => {
    for (const tag of ["v2.0.0-rc.1", "1.0.0-beta", "v3.0.0-alpha.2", "4.0.0-next.3", "1.2.0b1", "2.0rc1", "v1.0.0-preview"]) {
      assert.ok(isPrereleaseTag(tag), tag);
    }
    for (const tag of ["v1.2.3", "vdev-v0.3.24", "desktop-v0.0.36", "@astrojs/starlight@0.42.4", "cli-v3.0.65", "release-2026.9.1"]) {
      assert.ok(!isPrereleaseTag(tag), tag);
    }
  });
});
