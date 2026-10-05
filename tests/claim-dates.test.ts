import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { type ClaimRead, type GqlClaimDates, readVerifiedAt, verifiedAtOf } from "../scripts/lib/claim-dates.ts";
import type { GitHub } from "../scripts/lib/github.ts";
import type { GraphQL, GraphQLErrorEntry, GraphQLResponse } from "../scripts/lib/graphql.ts";
import { BEHIND_ALLOW_LIST, type Read, type Tool } from "../scripts/lib/types.ts";

type Answer = GqlClaimDates | "failing" | "allow-list";

function tool(slug: string, owner: string, path?: string): Tool {
  return { slug, name: slug, repository: `https://github.com/${owner}/${slug}`, category: "c", file: "", ...(path ? { path } : {}) };
}

function claiming(t: Tool, ...claim: string[]): Read<ClaimRead> {
  return { status: "read", value: { claim, repo: { fullName: t.repository.replace("https://github.com/", ""), defaultBranch: "main" } } };
}

function answer(root: string | null, rootAt: string | null, nested?: { text: string | null; at: string | null }): GqlClaimDates {
  const history = (at: string | null) => ({ nodes: at ? [{ committedDate: at }] : [] });
  return {
    root: root === null ? null : { text: root },
    ...(nested ? { nested: nested.text === null ? null : { text: nested.text } } : {}),
    defaultBranchRef: { target: { root: history(rootAt), ...(nested ? { nested: history(nested.at) } : {}) } },
  };
}

function github(answers: Record<string, Answer>): GraphQL & { asked: string[][]; queries: string[] } {
  const asked: string[][] = [];
  const queries: string[] = [];
  return {
    asked,
    queries,
    async query<T>(query: string, variables: Record<string, string>) {
      queries.push(query);
      const data: Record<string, unknown> = {};
      const errors: GraphQLErrorEntry[] = [];
      const names: string[] = [];
      for (const [key, name] of Object.entries(variables)) {
        if (!key.startsWith("n")) continue;
        names.push(name);
        const alias = `r${key.slice(1)}`;
        const reply = answers[name];
        if (reply === "failing") {
          data[alias] = null;
          errors.push({ path: [alias, "defaultBranchRef"], message: "Something went wrong while executing your query" });
        } else if (reply === "allow-list") {
          data[alias] = null;
          errors.push({
            type: "FORBIDDEN",
            path: [alias],
            message: `the \`${name}\` organization has an IP allow list enabled, and your IP address is not permitted to access this resource.`,
          });
        } else {
          data[alias] = reply ?? null;
        }
      }
      asked.push(names);
      return { data, errors } as GraphQLResponse<T>;
    },
    spent: () => ({ queries: 0, cost: 0, remaining: null }),
  };
}

const noRest: GitHub = {
  async get() {
    throw new Error("no REST read expected");
  },
};

describe("verifiedAtOf", () => {
  it("takes the later commit of the files that carry the slug, and ignores a file that does not", () => {
    const files = [
      { slugs: ["oxlint"], at: "2026-09-01T10:00:00Z" },
      { slugs: ["oxlint"], at: "2026-09-12T08:30:00Z" },
      { slugs: ["oxfmt"], at: "2026-10-01T00:00:00Z" },
    ];
    assert.equal(verifiedAtOf("oxlint", files), "2026-09-12T08:30:00.000Z");
    assert.equal(verifiedAtOf("oxfmt", files), "2026-10-01T00:00:00.000Z");
    assert.equal(verifiedAtOf("rolldown", files), null);
  });
});

describe("readVerifiedAt", () => {
  const ruff = tool("ruff", "astral-sh");
  const ripgrep = tool("ripgrep", "BurntSushi");
  const oxlint = tool("oxlint", "oxc-project", "apps/oxlint");

  it("asks only for the repositories whose file names the tool, and dates each from the last commit on that file", async () => {
    const gql = github({ ruff: answer("ruff\n# reviewed 2026-10-06\n", "2026-10-06T09:00:00Z") });
    const dates = await readVerifiedAt(gql, noRest, [ruff, ripgrep], [claiming(ruff, "ruff"), claiming(ripgrep)], new Map());
    assert.deepEqual(gql.asked, [["ruff"]]);
    assert.match(gql.queries[0] ?? "", /history\(path: \$f0, first: 1\)/);
    assert.deepEqual([...dates], [["ruff", "2026-10-06T09:00:00.000Z"]]);
  });

  it("sends no query at all when no tool is verified by file", async () => {
    const gql = github({});
    assert.deepEqual([...(await readVerifiedAt(gql, noRest, [ripgrep], [claiming(ripgrep, "rg")], new Map()))], []);
    assert.equal(gql.asked.length, 0);
  });

  it("dates a monorepo tool from the package's own file when only that one names it", async () => {
    const gql = github({
      oxlint: answer("oxfmt\n", "2026-10-02T00:00:00Z", { text: "oxlint\n", at: "2026-08-15T12:00:00Z" }),
    });
    const dates = await readVerifiedAt(gql, noRest, [oxlint], [claiming(oxlint, "oxfmt", "oxlint")], new Map());
    assert.equal(dates.get("oxlint"), "2026-08-15T12:00:00.000Z");
  });

  it("keeps the published date of a repository GitHub fails on, and still dates the others", async (t) => {
    t.mock.method(console, "error", () => {});
    const gql = github({ ruff: "failing", ripgrep: answer("ripgrep\n", "2026-09-30T00:00:00Z") });
    const published = new Map([["ruff", { verifiedAt: "2026-07-01T00:00:00.000Z" }]]);
    const dates = await readVerifiedAt(gql, noRest, [ruff, ripgrep], [claiming(ruff, "ruff"), claiming(ripgrep, "ripgrep")], published);
    assert.deepEqual(Object.fromEntries(dates), { ruff: "2026-07-01T00:00:00.000Z", ripgrep: "2026-09-30T00:00:00.000Z" });
  });

  it("leaves a tool undated rather than failing the run when the whole query is refused", async (t) => {
    t.mock.method(console, "error", () => {});
    const refusing: GraphQL = {
      async query() {
        throw new Error("401 Bad credentials");
      },
      spent: () => ({ queries: 0, cost: 0, remaining: null }),
    };
    const dates = await readVerifiedAt(refusing, noRest, [ruff, ripgrep], [claiming(ruff, "ruff"), claiming(ripgrep, "ripgrep")], new Map([["ripgrep", { verifiedAt: "2026-06-01T00:00:00.000Z" }]]));
    assert.deepEqual(Object.fromEntries(dates), { ruff: null, ripgrep: "2026-06-01T00:00:00.000Z" });
  });

  it("reads the date without a token for a repository behind an IP allow list", async () => {
    const trivy = tool("trivy", "aquasecurity");
    const paths: string[] = [];
    const anonymous: GitHub = {
      async get<T>(path: string) {
        paths.push(path);
        if (path === "/repos/aquasecurity/trivy/contents/.awesome-alternatives?ref=main") {
          return { encoding: "base64", content: Buffer.from("trivy\n").toString("base64") } as T;
        }
        if (path === "/repos/aquasecurity/trivy/commits?sha=main&path=.awesome-alternatives&per_page=1") {
          return [{ commit: { committer: { date: "2026-09-02T14:00:00Z" } } }] as T;
        }
        return null;
      },
    };
    const dates = await readVerifiedAt(github({ trivy: "allow-list" }), anonymous, [trivy], [claiming(trivy, "trivy")], new Map());
    assert.equal(dates.get("trivy"), "2026-09-02T14:00:00.000Z");
    assert.equal(paths.length, 2);
  });

  it("keeps the published date when the read without a token fails too", async (t) => {
    t.mock.method(console, "error", () => {});
    const trivy = tool("trivy", "aquasecurity");
    const refusing: GitHub = {
      async get() {
        throw new Error("rate limit exhausted");
      },
    };
    const published = new Map([["trivy", { verifiedAt: "2026-05-05T00:00:00.000Z" }]]);
    const dates = await readVerifiedAt(github({ trivy: "allow-list" }), refusing, [trivy], [claiming(trivy, "trivy")], published);
    assert.equal(dates.get("trivy"), "2026-05-05T00:00:00.000Z");
  });

  it("does not read a tool whose repository is unread this run", async () => {
    const gql = github({});
    const dates = await readVerifiedAt(gql, noRest, [ruff], [BEHIND_ALLOW_LIST], new Map());
    assert.equal(dates.size, 0);
    assert.equal(gql.asked.length, 0);
  });
});
