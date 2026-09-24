import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import {
  fetchOwnerFacts,
  fetchRepositories,
  type GqlOwner,
  type GqlRepository,
  mapOwner,
  mapRepository,
  repositoryQuery,
} from "../scripts/lib/facts-graphql.ts";
import type { GitHub } from "../scripts/lib/github.ts";
import { createGraphQL, type GraphQL, type GraphQLErrorEntry, GraphQLTransportError } from "../scripts/lib/graphql.ts";
import { judge } from "../scripts/lib/rules.ts";
import type { ReleaseEntry, ReleaseFacts, RepoFacts, Tool } from "../scripts/lib/types.ts";

interface Recorded {
  tools: { repository: string; path?: string }[];
  response: { data: Record<string, GqlRepository | null>; errors: GraphQLErrorEntry[] };
}

interface RestFacts {
  repo: RepoFacts;
  release: ReleaseFacts | null;
  releases: ReleaseEntry[];
  claim: string[];
}

const fixture = (name: string) => JSON.parse(readFileSync(new URL(`fixtures/${name}`, import.meta.url), "utf8"));
const recorded: Recorded = fixture("graphql-repositories.json");
const rest: (RestFacts | null)[] = fixture("rest-facts.json");
const slugs = ["deno", "gitea", "deno-std", "gone", "kafka", "fd", "ferrflow", "oxlint"];
const tools = recorded.tools.map((t, i) => ({ ...t, slug: slugs[i], name: slugs[i], category: "c", file: "" }) as Tool);
const node = (slug: string) => recorded.response.data[`r${slugs.indexOf(slug)}`] as GqlRepository;
const expected = (slug: string) => rest[slugs.indexOf(slug)] as RestFacts;

function recordedGraphQL(): GraphQL & { asked: string[] } {
  const asked: string[] = [];
  return {
    asked,
    async query<T>(query: string) {
      asked.push(query);
      return { data: recorded.response.data as T, errors: recorded.response.errors };
    },
    spent: () => ({ queries: asked.length, cost: 0, remaining: null }),
  };
}

function restTags(verified: Record<string, boolean>, asked: string[] = []): GitHub {
  return {
    async get<T>(path: string): Promise<T | null> {
      asked.push(path);
      const oid = path.split("/git/tags/")[1];
      return (oid && oid in verified ? { verification: { verified: verified[oid] } } : null) as T | null;
    },
  };
}

describe("mapRepository on a recorded response", () => {
  for (const slug of ["deno", "gitea", "deno-std", "kafka", "fd", "ferrflow", "oxlint"]) {
    it(`maps ${slug} onto the facts the REST mapper produced the same day`, () => {
      const mapped = mapRepository(node(slug));
      const want = expected(slug);
      assert.deepEqual(mapped.repo, want.repo);
      assert.equal(mapped.releases.length, want.releases.length);
      const byTag = new Map(want.releases.map((r) => [r.tag, r]));
      for (const entry of mapped.releases.filter((r) => byTag.has(r.tag))) {
        assert.deepEqual(entry, byTag.get(entry.tag));
      }
      assert.deepEqual(mapped.claim, want.claim);
      if (mapped.annotatedTag) {
        assert.deepEqual({ ...mapped.release, signed: want.release?.signed }, want.release);
      } else {
        assert.deepEqual(mapped.release, want.release);
      }
    });
  }

  it("orders the release history by creation, newest first", () => {
    assert.deepEqual(
      mapRepository(node("oxlint")).releases.map((r) => r.tag),
      ["oxlint_v1.85.0", "oxfmt_v0.70.0", "apps_v1.84.0", "crates_v0.151.0", "apps_v1.83.0"],
    );
  });

  it("reads a signed commit behind the release tag as signed", () => {
    assert.equal(mapRepository(node("deno")).release?.signed, true);
  });

  it("reads an unsigned commit behind the release tag as unsigned, with nothing left to check", () => {
    const { release, annotatedTag } = mapRepository(node("oxlint"));
    assert.equal(release?.signed, false);
    assert.equal(annotatedTag, null);
  });

  it("leaves an annotated tag's signature to REST, since GraphQL does not expose it", () => {
    const { release, annotatedTag } = mapRepository(node("gitea"));
    assert.equal(release?.signed, false);
    assert.match(annotatedTag ?? "", /^[0-9a-f]{40}$/);
  });

  it("falls back to the newest tag by name when there is no release, as the REST tag list does", () => {
    const { release, releases } = mapRepository(node("kafka"));
    assert.deepEqual(
      { tag: release?.tag, source: release?.source, publishedAt: release?.publishedAt },
      { tag: "show", source: "tag", publishedAt: null },
    );
    assert.deepEqual(releases, []);
  });

  it("follows a renamed repository to its new name, which keeps the moved flag", () => {
    const mapped = mapRepository(node("deno-std"));
    assert.equal(mapped.repo.fullName, "denoland/std");
    const codes = judge(tools[2] as Tool, mapped, new Date("2026-09-24T00:00:00Z"), new Set()).map((f) => f.code);
    assert.ok(codes.includes("moved"));
  });

  it("reads the maintainer file at the root and in a monorepo package's directory", () => {
    const withPath = { ...node("ferrflow"), claimAt: { text: "# the CLI\nferrflow-cli\n" } };
    assert.deepEqual(mapRepository(withPath).claim, ["ferrflow", "ferrflow-cli"]);
  });
});

describe("fetchRepositories", () => {
  it("leaves a missing repository out and resolves annotated tags through REST", async () => {
    const annotated = ["gitea", "kafka", "ferrflow"].map((slug) => mapRepository(node(slug)).annotatedTag as string);
    const verified = Object.fromEntries(annotated.map((oid, i) => [oid, i !== 1]));
    const asked: string[] = [];
    const facts = await fetchRepositories(recordedGraphQL(), restTags(verified, asked), tools);

    assert.equal(facts.get("gone"), null);
    assert.equal(facts.get("gitea")?.release?.signed, true);
    assert.equal(facts.get("kafka")?.release?.signed, false);
    assert.equal(facts.get("ferrflow")?.release?.signed, true);
    assert.equal(facts.get("deno")?.release?.signed, true);
    assert.equal(asked.length, 3);
    assert.ok(!("annotatedTag" in (facts.get("deno") ?? {})));
  });

  it("splits a batch GitHub times out on and keeps every tool in its place", async () => {
    const sizes: number[] = [];
    const gql: GraphQL = {
      async query<T>(query: string, variables: Record<string, string>) {
        const size = Object.keys(variables).filter((k) => k.startsWith("o")).length;
        sizes.push(size);
        if (size > 2) throw new GraphQLTransportError(502, "timeout");
        const data: Record<string, GqlRepository> = {};
        for (let i = 0; i < size; i++) {
          data[`r${i}`] = { ...node("deno"), nameWithOwner: `acme/${variables[`n${i}`]}` };
        }
        assert.ok(query.includes("rateLimit"));
        return { data: data as T, errors: [] };
      },
      spent: () => ({ queries: 0, cost: 0, remaining: null }),
    };
    const five = ["a", "b", "c", "d", "e"].map(
      (name) => ({ slug: name, name, repository: `https://github.com/acme/${name}`, category: "c", file: "" }) as Tool,
    );
    const facts = await fetchRepositories(gql, restTags({}), five, 5);
    assert.deepEqual(
      five.map((t) => facts.get(t.slug)?.repo.fullName),
      ["acme/a", "acme/b", "acme/c", "acme/d", "acme/e"],
    );
    assert.deepEqual(sizes, [5, 3, 2, 1, 2]);
  });

  it("fails on an error that is not a missing repository rather than dropping tools", async () => {
    const gql: GraphQL = {
      async query<T>() {
        return { data: {} as T, errors: [{ type: "FORBIDDEN", path: ["r0"], message: "nope" }] };
      },
      spent: () => ({ queries: 0, cost: 0, remaining: null }),
    };
    await assert.rejects(fetchRepositories(gql, restTags({}), tools.slice(0, 1)), /nope/);
  });
});

describe("repositoryQuery", () => {
  it("passes owners, names and file paths as variables, never inside the query text", () => {
    const { query, variables } = repositoryQuery([
      { repository: "https://github.com/acme/tool" },
      { repository: "https://github.com/acme/mono", path: "apps/cli" },
    ]);
    assert.deepEqual(variables, {
      o0: "acme",
      n0: "tool",
      c0: "HEAD:.awesome-alternatives",
      o1: "acme",
      n1: "mono",
      c1: "HEAD:.awesome-alternatives",
      p1: "HEAD:apps/cli/.awesome-alternatives",
    });
    assert.ok(!query.includes("acme"));
    assert.equal(query.match(/claimAt:/g)?.length, 1);
  });
});

describe("owners", () => {
  it("maps an organization and a user onto the REST owner facts", () => {
    const org: GqlOwner = {
      __typename: "Organization",
      login: "go-gitea",
      url: "https://github.com/go-gitea",
      name: " Gitea ",
      description: "Git with a cup of tea",
      websiteUrl: "gitea.com",
    };
    const user: GqlOwner = {
      __typename: "User",
      login: "sharkdp",
      url: "https://github.com/sharkdp",
      name: "David Peter",
      bio: "",
      websiteUrl: null,
    };
    assert.deepEqual(mapOwner(org), {
      login: "go-gitea",
      kind: "organization",
      name: "Gitea",
      bio: "Git with a cup of tea",
      website: "https://gitea.com",
      url: "https://github.com/go-gitea",
    });
    assert.deepEqual(mapOwner(user), {
      login: "sharkdp",
      kind: "user",
      name: "David Peter",
      bio: null,
      website: null,
      url: "https://github.com/sharkdp",
    });
  });

  it("reads an organization with no public name as nameless, as REST does, where GraphQL repeats the login", () => {
    const org: GqlOwner = { __typename: "Organization", login: "react", url: "https://github.com/react", name: "react", description: null, websiteUrl: null };
    assert.equal(mapOwner(org).name, null);
  });

  it("skips an account GitHub no longer knows", async () => {
    const gql: GraphQL = {
      async query<T>() {
        return { data: { o0: null, o1: { __typename: "User", login: "b", url: "u", name: null, bio: null, websiteUrl: null } } as T, errors: [] };
      },
      spent: () => ({ queries: 0, cost: 0, remaining: null }),
    };
    const owners = await fetchOwnerFacts(gql, ["a", "b"]);
    assert.deepEqual([...owners.keys()], ["b"]);
  });
});

describe("createGraphQL", () => {
  it("adds up the cost GitHub reports for each query", async () => {
    let n = 0;
    const gql = createGraphQL("t", async () => {
      n++;
      return new Response(JSON.stringify({ data: { rateLimit: { cost: n * 2, remaining: 5000 - n * 2 } } }), { status: 200 });
    });
    await gql.query("query { rateLimit { cost remaining } }", {});
    await gql.query("query { rateLimit { cost remaining } }", {});
    assert.deepEqual(gql.spent(), { queries: 2, cost: 6, remaining: 4996 });
  });

  it("raises a transport error on a non-200 answer, which the batcher can split on", async () => {
    const gql = createGraphQL("t", async () => new Response("bad gateway", { status: 502 }));
    await assert.rejects(gql.query("query { x }", {}), (error: unknown) => error instanceof GraphQLTransportError && error.status === 502);
  });

  it("treats an answer cut off mid-body as retriable, and counts the attempt", async () => {
    const gql = createGraphQL("t", async () => new Response('{"data":{"r0":{"name', { status: 200 }));
    await assert.rejects(gql.query("query { x }", {}), (error: unknown) => error instanceof GraphQLTransportError && error.retriable);
    assert.equal(gql.spent().queries, 1);
  });
});
