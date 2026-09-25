import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { eventsAcross } from "../scripts/lib/event-history.ts";
import {
  type EventHistory,
  eventsJson,
  nextEventLog,
  parseEventLog,
  pruneEvents,
  recordEvents,
  RELEASES_KEPT,
  resolveCommits,
} from "../scripts/lib/event-log.ts";
import type { CatalogEvent } from "../scripts/lib/types.ts";

const archived = (slug: string, at: string, commit: string | null = null): CatalogEvent => ({ type: "archived", slug, at, commit });
const unarchived = (slug: string, at: string): CatalogEvent => ({ type: "unarchived", slug, at, commit: null });
const released = (slug: string, at: string, from: string | null, to: string): CatalogEvent => ({ type: "released", slug, at, commit: null, from, to });
const licensed = (slug: string, at: string, from: string | null, to: string | null): CatalogEvent => ({
  type: "license-changed",
  slug,
  at,
  commit: null,
  from,
  to,
});

const day = (n: number) => new Date(Date.UTC(2026, 8, n)).toISOString();

describe("recordEvents", () => {
  it("appends new events and keeps the log in time order", () => {
    const log = recordEvents([archived("b", day(2))], [archived("a", day(3)), released("c", day(1), null, "v1")]);
    assert.deepEqual(
      log.map((e) => `${e.at.slice(0, 10)} ${e.slug}`),
      ["2026-09-01 c", "2026-09-02 b", "2026-09-03 a"],
    );
  });

  it("drops a replay of the change already recorded last for that tool, whatever time it carries", () => {
    const log = [licensed("a", day(1), null, "MIT"), released("a", day(1), "v1", "v2")];
    const replay = [released("a", day(5), "v1", "v2"), licensed("a", day(5), null, "MIT")];
    assert.deepEqual(recordEvents(log, replay), log);
  });

  it("keeps a real back and forth", () => {
    const log = recordEvents([], [archived("a", day(1))]);
    const next = recordEvents(recordEvents(log, [unarchived("a", day(2))]), [archived("a", day(3))]);
    assert.deepEqual(
      next.map((e) => e.type),
      ["archived", "unarchived", "archived"],
    );
  });

  it("does not let one tool's history hide the same change on another", () => {
    const log = recordEvents([released("a", day(1), "v1", "v2")], [released("b", day(2), "v1", "v2")]);
    assert.equal(log.length, 2);
  });
});

describe("pruneEvents", () => {
  const now = new Date(day(30));

  it("forgets what is older than a year", () => {
    const old = archived("a", new Date(now.getTime() - 366 * 24 * 60 * 60 * 1000).toISOString());
    const recent = archived("b", day(29));
    assert.deepEqual(pruneEvents([old, recent], now), [recent]);
  });

  it("keeps only the latest releases of each tool, and never lets them push out a rarer change", () => {
    const releases = Array.from({ length: RELEASES_KEPT + 3 }, (_, i) => released("a", day(i + 2), `v${i}`, `v${i + 1}`));
    const licence = licensed("a", day(1), "MIT", "BUSL-1.1");
    const other = released("b", day(1), null, "v1");
    const kept = pruneEvents([licence, other, ...releases], now);
    assert.equal(kept.filter((e) => e.slug === "a" && e.type === "released").length, RELEASES_KEPT);
    assert.ok(kept.includes(licence));
    assert.ok(kept.includes(other));
    assert.deepEqual(kept.at(-1), releases.at(-1));
    assert.ok(!kept.includes(releases[0] as CatalogEvent));
  });
});

describe("resolveCommits", () => {
  it("gives a pending event the first commit that carried it", () => {
    const pending = archived("a", day(1));
    const resolved = resolveCommits(
      [pending, archived("b", day(1), "known")],
      [
        { sha: "unrelated", events: [] },
        { sha: "first", events: [pending] },
        { sha: "later", events: [pending] },
      ],
    );
    assert.deepEqual(
      resolved.map((e) => e.commit),
      ["first", "known"],
    );
  });

  it("leaves an event pending when no commit carries it", () => {
    const pending = archived("a", day(1));
    assert.deepEqual(resolveCommits([pending], [{ sha: "x", events: [archived("a", day(2))] }]), [pending]);
  });
});

describe("nextEventLog", () => {
  const before = [{ slug: "a", repo: { fullName: "acme/a", license: "MIT", archived: false } }];
  const after = [{ slug: "a", repo: { fullName: "acme/a", license: "MIT", archived: true } }];

  it("appends what changed since the published catalog, dated now and waiting for its commit", () => {
    const { events } = nextEventLog([], before, after, new Date(day(10)), null);
    assert.deepEqual(events, [archived("a", day(10))]);
  });

  it("adds nothing when run twice against the same catalogs", () => {
    const first = nextEventLog([], before, after, new Date(day(10)), null).events;
    assert.deepEqual(nextEventLog(first, before, after, new Date(day(11)), null).events, first);
    assert.deepEqual(nextEventLog(first, after, after, new Date(day(11)), null).events, first);
  });

  it("resolves earlier events through the history and names those still missing their commit after the grace period", () => {
    const stale = archived("old", day(1));
    const recent = archived("new", day(9));
    const carried = archived("found", day(1));
    const history: EventHistory = { revisionsSince: () => [{ sha: "c0ffee", events: [carried] }] };
    const { events, unresolved } = nextEventLog([stale, recent, carried], after, after, new Date(day(10)), history);
    assert.equal(events.find((e) => e.slug === "found")?.commit, "c0ffee");
    assert.deepEqual(unresolved, [stale]);
  });

  it("does not complain about missing commits when there is no history to look in", () => {
    const { unresolved } = nextEventLog([archived("old", day(1))], after, after, new Date(day(10)), null);
    assert.deepEqual(unresolved, []);
  });
});

describe("eventsAcross", () => {
  it("dates each change at the commit that shows it", () => {
    const state = (sha: string, at: string, archivedRepo: boolean, slugs = ["a"]) => ({
      sha,
      at,
      tools: slugs.map((slug) => ({ slug, repo: { fullName: `acme/${slug}`, archived: archivedRepo } })),
    });
    const events = eventsAcross([state("s1", day(1), false), state("s2", day(2), false, ["a", "b"]), state("s3", day(3), true, ["a", "b"])]);
    assert.deepEqual(
      events.map((e) => `${e.commit} ${e.slug} ${e.type}`),
      ["s1 a added", "s2 b added", "s3 a archived", "s3 b archived"],
    );
  });
});

describe("eventsJson", () => {
  it("writes one event per line in a fixed field order and reads it back", () => {
    const log = [released("a", day(2), null, "v1"), archived("b", day(1), "abc")];
    const json = eventsJson(log);
    assert.equal(
      json,
      `[\n  {"type":"archived","slug":"b","at":"${day(1)}","commit":"abc"},\n  {"type":"released","slug":"a","at":"${day(2)}","commit":null,"from":null,"to":"v1"}\n]\n`,
    );
    assert.deepEqual(parseEventLog(json), [log[1], log[0]]);
    assert.equal(eventsJson([]), "[]\n");
  });

  it("refuses a file that holds something other than events", () => {
    assert.throws(() => parseEventLog('[{"type":"stars-changed","slug":"a","at":"x","commit":null}]'), /entry 0 is not an event/);
    assert.throws(() => parseEventLog("{}"), /should hold an array/);
  });
});
