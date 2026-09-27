import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { type CommitWindow, contributorsIn, planWalk, settled, walkContributors, windowAfter } from "../scripts/lib/commit-window.ts";
import { activeSince, HISTORY_LIMIT, HISTORY_PAGE_SIZE, type HistoryPage, type WalkedCommit, startWalk } from "../scripts/lib/contributors.ts";
import type { GraphQL } from "../scripts/lib/graphql.ts";
import { isRecheckDay } from "../scripts/lib/recheck.ts";

const DAY_MS = 24 * 60 * 60 * 1000;
const REPOSITORY = "acme/tool";
const start = Date.parse("2026-09-24T05:17:00.000Z");
const days = Array.from({ length: 14 }, (_, i) => new Date(start + i * DAY_MS));
const [firstDay, nextDay] = (() => {
  const i = days.findIndex((day, j) => j > 0 && !isRecheckDay(REPOSITORY, day));
  return [days[i - 1] as Date, days[i] as Date];
})();

const oid = (n: number) => n.toString(16).padStart(12, "0").padEnd(40, "0");

interface Commit {
  oid: string;
  author: string;
  at: number;
}

function history(perDay: number, streak: number, until: Date): Commit[] {
  const commits: Commit[] = [];
  const total = Math.floor(perDay * 120);
  for (let n = 0; n < total; n++) {
    const at = until.getTime() - (n * DAY_MS) / perDay - 60_000;
    commits.push({ oid: oid(n + 1), author: `dev${Math.floor(n / streak)}`, at: Math.floor(at / 1000) * 1000 });
  }
  return commits;
}

function github(commits: readonly Commit[]): GraphQL & { pages: number } {
  const gql = {
    pages: 0,
    async query<T>(_: string, variables: Record<string, string>) {
      const data: Record<string, unknown> = {};
      for (const key of Object.keys(variables).filter((k) => /^h\d+$/.test(k))) {
        const i = key.slice(1);
        const from = commits.findIndex((c) => c.oid === variables[key]);
        const since = Date.parse(variables[`s${i}`] ?? "");
        const reachable = commits.slice(from).filter((c) => c.at >= since);
        const offset = Number(variables[`a${i}`] ?? 0);
        const nodes = reachable.slice(offset, offset + HISTORY_PAGE_SIZE);
        const more = offset + HISTORY_PAGE_SIZE < reachable.length;
        const page: HistoryPage = {
          pageInfo: { hasNextPage: more, endCursor: more ? String(offset + HISTORY_PAGE_SIZE) : null },
          nodes: nodes.map((c) => ({ oid: c.oid, committedDate: new Date(c.at).toISOString(), author: { name: c.author, email: null, user: null } })),
        };
        gql.pages++;
        data[`r${i}`] = { object: { history: page } };
      }
      return { data: data as T, errors: [] };
    },
    spent: () => ({ queries: 0, cost: 0, remaining: null }),
  };
  return gql;
}

const headAt = (commits: readonly Commit[], day: Date) => commits.find((c) => c.at <= day.getTime())?.oid as string;

async function walkOn(commits: readonly Commit[], day: Date, stored: ReadonlyMap<string, CommitWindow>) {
  const gql = github(commits);
  const walked = await walkContributors(gql, [{ fullName: REPOSITORY, head: headAt(commits, day) }], stored, day);
  return { contributors: walked.contributors[0], window: walked.windows.get(REPOSITORY), pages: gql.pages };
}

const commit = (n: number, author: string | null, at: string): WalkedCommit => ({ oid: oid(n).slice(0, 12), author, at: Date.parse(at) });
const SINCE = "2026-06-26T00:00:00.000Z";

describe("walkContributors from the last walk", () => {
  for (const [label, perDay, streak] of [
    ["a busy repository, beyond the commit cap", 9, 4],
    ["a quiet repository", 0.5, 3],
  ] as const) {
    it(`counts ${label} the next day as a full walk would, reading fewer pages`, async () => {
      const commits = history(perDay, streak, nextDay);
      const yesterday = await walkOn(commits, firstDay, new Map());
      assert.ok(yesterday.window);
      const incremental = await walkOn(commits, nextDay, new Map([[REPOSITORY, yesterday.window]]));
      const full = await walkOn(commits, nextDay, new Map());
      assert.deepEqual(incremental.contributors, full.contributors);
      assert.ok(incremental.pages < full.pages || full.pages === 1, `${incremental.pages} pages against ${full.pages}`);
    });
  }

  it("reads nothing for a repository whose head has not moved, and lets the window slide", async () => {
    const commits = history(0.5, 60, firstDay);
    const yesterday = await walkOn(commits, firstDay, new Map());
    assert.ok(yesterday.window);
    const later = new Date(nextDay.getTime() + 30 * DAY_MS);
    const quiet = isRecheckDay(REPOSITORY, later) ? new Date(later.getTime() + DAY_MS) : later;
    const today = await walkOn(commits, quiet, new Map([[REPOSITORY, yesterday.window]]));
    assert.equal(today.pages, 0);
    assert.equal(today.window, undefined);
    assert.deepEqual(today.contributors, (await walkOn(commits, quiet, new Map())).contributors);
  });

  it("walks in full on the repository's day of the week, to catch commits a merge brought in from before the last walk", () => {
    const stored = settled(oid(1), firstDay.toISOString(), [], true, activeSince(firstDay));
    const recheck = days.find((day) => isRecheckDay(REPOSITORY, day)) as Date;
    const { walk, base } = planWalk(REPOSITORY, oid(2), stored, recheck);
    assert.equal(walk?.since, activeSince(recheck));
    assert.equal(base, null);
  });

  it("starts a moved head's walk a day before the last one, and never before the window", () => {
    const stored = settled(oid(1), "2026-09-20T05:00:00.000Z", [], true, SINCE);
    assert.equal(planWalk(REPOSITORY, oid(2), stored, nextDay).walk?.since, "2026-09-19T05:00:00.000Z");
    const old = settled(oid(1), "2026-01-01T00:00:00.000Z", [], true, "2025-10-01T00:00:00.000Z");
    assert.equal(planWalk(REPOSITORY, oid(2), old, nextDay).walk?.since, activeSince(nextDay));
  });

  it("keeps the last count of a repository whose history GitHub fails to return, and does not store the failed walk", async () => {
    const commits = history(0.5, 6, nextDay);
    const yesterday = await walkOn(commits, firstDay, new Map());
    assert.ok(yesterday.window);
    const failing: GraphQL = {
      async query<T>() {
        return { data: { r0: null } as T, errors: [{ path: ["r0", "object"], message: "timeout" }] };
      },
      spent: () => ({ queries: 0, cost: 0, remaining: null }),
    };
    const walked = await walkContributors(failing, [{ fullName: REPOSITORY, head: headAt(commits, nextDay) }], new Map([[REPOSITORY, yesterday.window]]), nextDay);
    assert.deepEqual(walked.contributors[0], yesterday.contributors);
    assert.equal(walked.windows.size, 0);
  });
});

describe("settled", () => {
  it("keeps the newest commits in the window once each, newest first", () => {
    const window = settled(
      "h",
      "2026-09-24T00:00:00.000Z",
      [commit(1, "a", "2026-09-20T00:00:00Z"), commit(2, "b", "2026-09-22T00:00:00Z"), commit(1, "a", "2026-09-20T00:00:00Z"), commit(3, "c", "2026-01-01T00:00:00Z")],
      true,
      SINCE,
    );
    assert.deepEqual(window.commits.map((c) => c.author), ["b", "a"]);
    assert.deepEqual(contributorsIn(window), { count: 2, capped: false });
  });

  it("marks a walk cut short as a lower bound while none of its commits has left the window", () => {
    const cut = [commit(1, "a", "2026-09-20T00:00:00Z"), commit(2, "b", "2026-07-01T00:00:00Z")];
    assert.equal(contributorsIn(settled("h", "t", cut, false, SINCE)).capped, true);
    assert.deepEqual(contributorsIn(settled("h", "t", cut, false, "2026-08-01T00:00:00.000Z")), { count: 1, capped: false });
  });

  it("keeps at most the commit cap, and marks the count as a lower bound past it", () => {
    const many = Array.from({ length: HISTORY_LIMIT + 1 }, (_, i) => commit(i + 1, `dev${i}`, new Date(Date.parse("2026-09-20T00:00:00Z") - i * 1000).toISOString()));
    const window = settled("h", "t", many, true, SINCE);
    assert.equal(window.commits.length, HISTORY_LIMIT);
    assert.deepEqual(contributorsIn(window), { count: HISTORY_LIMIT, capped: true });
  });
});

describe("windowAfter", () => {
  const base = settled("old", "2026-09-23T05:00:00.000Z", [commit(1, "a", "2026-09-20T00:00:00Z")], true, SINCE);

  it("stores nothing for a walk that failed or never read a page", () => {
    const walk = startWalk(REPOSITORY, "new", SINCE);
    assert.equal(windowAfter(walk, base, nextDay), null);
    assert.equal(windowAfter({ ...walk, pages: 1, stopped: true }, base, nextDay), null);
  });

  it("drops the last walk when the new one could not reach it, since the commits in between were never read", () => {
    const walk = { ...startWalk(REPOSITORY, "new", SINCE), pages: 5, cursor: "more", commits: [commit(9, "z", "2026-09-24T00:00:00Z")] };
    const window = windowAfter(walk, base, nextDay);
    assert.deepEqual(window?.commits.map((c) => c.author), ["z"]);
    assert.equal(window?.complete, false);
  });
});
