import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { GraphQL, GraphQLResponse } from "../scripts/lib/graphql.ts";
import { createProposalHost } from "../scripts/lib/maintainer-host.ts";
import type { ProposalHost } from "../scripts/lib/maintainer-propose.ts";
import type { PullSummary } from "../scripts/lib/maintainer-pull.ts";
import {
  MAX_MOVE_PULLS_PER_RUN,
  type Move,
  moveBody,
  movedYaml,
  movesOf,
  proposeMoves,
  readNames,
} from "../scripts/lib/repo-moves.ts";
import { BEHIND_ALLOW_LIST, GONE, type Read, type Tool } from "../scripts/lib/types.ts";

const COMMIT = "0123456789abcdef0123456789abcdef01234567";

function tool(slug: string, fullName = `acme/${slug}`): Tool {
  return { slug, name: slug, repository: `https://github.com/${fullName}`, category: "search", file: `data/tools/${slug}.yaml` };
}

const read = (value: string): Read<string> => ({ status: "read", value });
const entry = (slug: string) => ({ slug, file: `data/tools/${slug}.yaml`, repository: `https://github.com/acme/${slug}` });
const gone = (slug: string): Move => ({ ...entry(slug), kind: "gone" });
const renamed = (slug: string, to: string): Move => ({ ...entry(slug), kind: "renamed", to });

describe("movesOf", () => {
  it("reports a repository GitHub no longer has and one that answers under another name", () => {
    const tools = [tool("a"), tool("b"), tool("c")];
    assert.deepEqual(movesOf(tools, [GONE, read("other/b"), read("acme/c")]), [gone("a"), renamed("b", "other/b")]);
  });

  it("ignores a change of case, which GitHub resolves without a redirect", () => {
    assert.deepEqual(movesOf([tool("a", "Acme/A"), tool("b")], [read("acme/a"), read("acme/b")]), []);
  });

  it("proposes nothing for a repository it could not read", () => {
    const unreadable: Read<string> = { status: "unreadable", reason: "502" };
    assert.deepEqual(movesOf([tool("a"), tool("b"), tool("c")], [BEHIND_ALLOW_LIST, unreadable, read("acme/c")]), []);
  });

  it("refuses when most repositories look gone, which means the token sees nothing", () => {
    assert.throws(() => movesOf([tool("a"), tool("b"), tool("c")], [GONE, GONE, read("acme/c")]), /2 of 3 tools/);
  });
});

describe("readNames", () => {
  it("reads the name GitHub answers with, and a missing repository as gone", async () => {
    const gql: GraphQL = {
      async query<T>() {
        return { data: { r0: { nameWithOwner: "other/a" }, r1: null }, errors: [{ type: "NOT_FOUND", path: ["r1"], message: "Could not resolve" }] } as GraphQLResponse<T>;
      },
      spent: () => ({ queries: 1, cost: 1, remaining: null }),
    };
    assert.deepEqual(await readNames(gql, [tool("a"), tool("b")]), [read("other/a"), GONE]);
  });
});

describe("movedYaml", () => {
  const ENTRY = "name: b\nrepository: https://github.com/acme/b\npath: packages/b\ncategory: search\n";

  it("points the entry at the new name and leaves every other line alone", () => {
    assert.equal(movedYaml(ENTRY, renamed("b", "other/b")), "name: b\nrepository: https://github.com/other/b\npath: packages/b\ncategory: search\n");
  });

  it("deletes the entry of a gone repository", () => {
    assert.equal(movedYaml(ENTRY, gone("b")), null);
  });

  it("refuses an entry that does not spell the repository the catalog read", () => {
    assert.throws(() => movedYaml("repository: 'https://github.com/acme/b'\n", renamed("b", "other/b")), /no line/);
  });
});

describe("proposeMoves", () => {
  interface Recorded {
    pushed: [string, string, string | null][];
    opened: [string, string][];
    updated: number[];
    checked: string[];
  }

  function host(pulls: (branch: string) => PullSummary[] = () => []): ProposalHost & { recorded: Recorded } {
    const recorded: Recorded = { pushed: [], opened: [], updated: [], checked: [] };
    return {
      recorded,
      async pulls(branch) {
        if (branch === "repository/broken") throw new Error("GitHub 502");
        return pulls(branch);
      },
      async push(branch, _, file, text) {
        recorded.pushed.push([branch, file, text]);
      },
      async open(branch, title) {
        recorded.opened.push([branch, title]);
        return 7;
      },
      async update(number) {
        recorded.updated.push(number);
      },
      async check(branch) {
        recorded.checked.push(branch);
      },
    };
  }

  const context = (fake: ProposalHost) => ({ base: COMMIT, read: async () => "repository: https://github.com/acme/b\n", host: fake });

  it("opens a pull request that deletes a gone entry and one that renames a moved one, then runs their checks", async () => {
    const fake = host();
    const outcomes = await proposeMoves([gone("a"), renamed("b", "other/b")], context(fake));
    assert.deepEqual(outcomes, [
      { slug: "a", result: "opened", number: 7 },
      { slug: "b", result: "opened", number: 7 },
    ]);
    assert.deepEqual(fake.recorded.pushed, [
      ["repository/a", "data/tools/a.yaml", null],
      ["repository/b", "data/tools/b.yaml", "repository: https://github.com/other/b\n"],
    ]);
    assert.deepEqual(fake.recorded.opened, [
      ["repository/a", "fix(catalog): remove a, its repository is gone"],
      ["repository/b", "fix(catalog): follow b to other/b"],
    ]);
    assert.deepEqual(fake.recorded.checked, ["repository/a", "repository/b"]);
  });

  it("does not reopen a finding a person closed, but does once the repository moves again", async () => {
    const closed = [{ number: 3, state: "closed" as const, body: moveBody(renamed("b", "other/b")) }];
    const fake = host(() => closed);
    assert.deepEqual(await proposeMoves([renamed("b", "other/b")], context(fake)), [
      { slug: "b", result: "skipped", reason: "#3 proposed the same content and was closed" },
    ]);
    assert.deepEqual(await proposeMoves([renamed("b", "third/b")], context(fake)), [{ slug: "b", result: "opened", number: 7 }]);
  });

  it("updates the open pull request of a tool rather than opening a second one", async () => {
    const fake = host(() => [{ number: 5, state: "open", body: moveBody(renamed("b", "other/b")) }]);
    assert.deepEqual(await proposeMoves([renamed("b", "third/b")], context(fake)), [{ slug: "b", result: "updated", number: 5 }]);
    assert.deepEqual(fake.recorded.updated, [5]);
  });

  it("keeps going past a failure and opens at most a few pull requests a run", async () => {
    const moves = [gone("broken"), ...Array.from({ length: MAX_MOVE_PULLS_PER_RUN + 1 }, (_, i) => gone(`t${i}`))];
    const outcomes = await proposeMoves(moves, context(host()));
    assert.deepEqual(outcomes[0], { slug: "broken", result: "failed", reason: "GitHub 502" });
    assert.equal(outcomes.filter((o) => o.result === "opened").length, MAX_MOVE_PULLS_PER_RUN);
    assert.deepEqual(outcomes.at(-1), { slug: `t${MAX_MOVE_PULLS_PER_RUN}`, result: "skipped", reason: "left to the next run" });
  });
});

describe("the proposal host", () => {
  it("deletes the file on the branch when the proposal has no text", async () => {
    const calls: [string, string, unknown][] = [];
    const fetchImpl = (async (url: string, init: RequestInit) => {
      calls.push([init.method ?? "GET", url.replace("https://api.github.com", ""), init.body ? JSON.parse(String(init.body)) : undefined]);
      const body = init.method === "GET" ? { sha: "blob" } : {};
      return new Response(JSON.stringify(body), { status: 200 });
    }) as typeof fetch;
    await createProposalHost("org/repo", "token", fetchImpl).push("repository/a", COMMIT, "data/tools/a.yaml", null, "remove a");
    assert.deepEqual(calls.at(-1), [
      "DELETE",
      "/repos/org/repo/contents/data/tools/a.yaml",
      { message: "remove a", sha: "blob", branch: "repository/a" },
    ]);
  });
});
