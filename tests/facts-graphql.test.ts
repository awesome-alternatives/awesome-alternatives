import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { type CommitAuthor, HISTORY_PAGES, type HistoryPage } from "../scripts/lib/contributors.ts";
import {
  fetchOwnerFacts,
  fetchRepositories,
  type GqlOwner,
  type GqlRepository,
  mapOwner,
  mapRepository,
  type RepositoryFacts,
  repositoryQuery,
} from "../scripts/lib/facts-graphql.ts";
import type { GitHub } from "../scripts/lib/github.ts";
import { createGraphQL, type GraphQL, type GraphQLErrorEntry, GraphQLTransportError } from "../scripts/lib/graphql.ts";
import { isAllowListError } from "../scripts/lib/graphql-batch.ts";
import { judge } from "../scripts/lib/rules.ts";
import { BEHIND_ALLOW_LIST, GONE, type Read, type ReleaseEntry, type ReleaseFacts, type RepoFacts, type Tool } from "../scripts/lib/types.ts";

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
for (const repository of Object.values(recorded.response.data)) {
  if (repository?.defaultBranchRef) repository.defaultBranchRef.target ??= null;
  if (repository?.latestRelease) repository.latestRelease.releaseAssets ??= { nodes: [] };
}
const rest: (RestFacts | null)[] = fixture("rest-facts.json");
const NOW = new Date("2026-09-24T00:00:00Z");
const slugs = ["deno", "gitea", "deno-std", "gone", "kafka", "fd", "ferrflow", "oxlint"];
const tools = recorded.tools.map((t, i) => ({ ...t, slug: slugs[i], name: slugs[i], category: "c", file: "" }) as Tool);
const node = (slug: string) => recorded.response.data[`r${slugs.indexOf(slug)}`] as GqlRepository;
const expected = (slug: string) => rest[slugs.indexOf(slug)] as RestFacts;
const factsOf = (facts: ReadonlyMap<string, Read<RepositoryFacts>>, slug: string): RepositoryFacts | undefined => {
  const read = facts.get(slug);
  return read?.status === "read" ? read.value : undefined;
};

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

  it("counts open issues beside the repository facts, so they stay out of the catalog", () => {
    const mapped = mapRepository(node("deno"));
    assert.equal(mapped.openIssues, 2381);
    assert.ok(!("openIssues" in mapped.repo));
    assert.equal(mapRepository(node("deno-std")).openIssues, 0);
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
    const codes = judge(tools[2] as Tool, { ...mapped, starHistory: [] }, new Date("2026-09-24T00:00:00Z"), new Set()).map((f) => f.code);
    assert.ok(codes.includes("moved"));
  });

  it("drops a homepage that is not a web URL, so it never reaches a link", () => {
    const homepage = (homepageUrl: string) => mapRepository({ ...node("deno"), homepageUrl }).repo.homepage;
    assert.equal(homepage("javascript:alert(document.cookie)"), null);
    assert.equal(homepage("JavaScript:alert(1)"), null);
    assert.equal(homepage("data:text/html,<script>alert(1)</script>"), null);
    assert.equal(homepage("deno.com"), "https://deno.com");
    assert.equal(homepage(""), null);
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
    const facts = await fetchRepositories(recordedGraphQL(), restTags(verified, asked), tools, NOW);

    assert.deepEqual(facts.get("gone"), GONE);
    assert.equal(factsOf(facts, "gitea")?.release?.signed, true);
    assert.equal(factsOf(facts, "kafka")?.release?.signed, false);
    assert.equal(factsOf(facts, "ferrflow")?.release?.signed, true);
    assert.equal(factsOf(facts, "deno")?.release?.signed, true);
    assert.equal(asked.length, 3);
    assert.ok(!("annotatedTag" in (factsOf(facts, "deno") ?? {})));
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
    const facts = await fetchRepositories(gql, restTags({}), five, NOW, 5);
    assert.deepEqual(
      five.map((t) => factsOf(facts, t.slug)?.repo.fullName),
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
    await assert.rejects(fetchRepositories(gql, restTags({}), tools.slice(0, 1), NOW), /r0: nope/);
  });
});

const ALLOW_LIST_MESSAGE =
  "Although you appear to have the correct authorization credentials, the `neondatabase` organization has an IP allow list enabled, and your IP address is not permitted to access this resource.";

function refusedAt(alias: string) {
  return { type: "FORBIDDEN", path: [alias], extensions: { saml_failure: false }, locations: [{ line: 3, column: 3 }], message: ALLOW_LIST_MESSAGE };
}

describe("isAllowListError", () => {
  it("recognises the error GitHub puts on a repository behind an IP allow list", () => {
    assert.equal(isAllowListError(refusedAt("r0")), true);
  });

  it("does not take another refusal, or the same words under another type, for an allow list", () => {
    assert.equal(isAllowListError({ type: "FORBIDDEN", path: ["r0"], message: "Resource not accessible by integration" }), false);
    assert.equal(isAllowListError({ type: "NOT_FOUND", path: ["r0"], message: ALLOW_LIST_MESSAGE }), false);
  });
});

describe("fetchRepositories with an organisation behind an IP allow list", () => {
  function refusing(): GraphQL & { asked: number } {
    const gql = {
      asked: 0,
      async query<T>(query: string) {
        gql.asked++;
        if (query.includes("...Facts")) {
          return { data: { r0: null, r1: node("deno") } as T, errors: [refusedAt("r0")] };
        }
        return { data: { r0: null } as T, errors: [] };
      },
      spent: () => ({ queries: gql.asked, cost: 0, remaining: null }),
    };
    return gql;
  }

  it("marks the refused repository and still reads the others of the same batch", async () => {
    const neon = { slug: "neon", name: "Neon", repository: "https://github.com/neondatabase/neon", category: "c", file: "" } as Tool;
    const gql = refusing();
    const facts = await fetchRepositories(gql, restTags({}), [neon, tools[0] as Tool], NOW);
    assert.deepEqual(facts.get("neon"), BEHIND_ALLOW_LIST);
    assert.equal(factsOf(facts, "deno")?.repo.fullName, "denoland/deno");
  });

  it("keeps an owner behind an allow list apart from one GitHub no longer knows", async () => {
    const gql: GraphQL = {
      async query<T>() {
        const user = { __typename: "User", login: "b", url: "u", name: null, bio: null, websiteUrl: null };
        return { data: { o0: null, o1: user, o2: null } as T, errors: [refusedAt("o0")] };
      },
      spent: () => ({ queries: 0, cost: 0, remaining: null }),
    };
    const owners = await fetchOwnerFacts(gql, ["neondatabase", "b", "gone"]);
    assert.deepEqual(
      [...owners.values()].map((read) => read.status),
      ["behind-allow-list", "read", "gone"],
    );
  });
});

describe("active contributors", () => {
  const commit = (author: CommitAuthor) => ({ author });
  const person = (login: string) => commit({ name: login, email: `${login}@example.com`, user: { login } });
  const unlinked = (email: string) => commit({ name: "Someone", email, user: null });
  const bot = commit({ name: "renovate[bot]", email: "29139614+renovate[bot]@users.noreply.github.com", user: null });
  const page = (nodes: HistoryPage["nodes"], cursor: string | null): HistoryPage => ({
    pageInfo: { hasNextPage: cursor !== null, endCursor: cursor },
    nodes,
  });

  function paging(next: (asked: number) => HistoryPage | null): GraphQL & { variables: Record<string, string>[] } {
    const variables: Record<string, string>[] = [];
    let asked = 0;
    return {
      variables,
      async query<T>(query: string, vars: Record<string, string>) {
        if (query.includes("...Facts")) {
          const repository = { ...node("fd"), defaultBranchRef: { name: "master", target: { oid: "abc123" } } };
          return { data: { r0: repository } as T, errors: [] };
        }
        variables.push(vars);
        const history = next(asked++);
        return { data: { r0: history ? { object: { history } } : null } as T, errors: [] };
      },
      spent: () => ({ queries: variables.length, cost: 0, remaining: null }),
    };
  }

  it("counts each author once across pages, leaving bots out and keeping unlinked authors by email", async () => {
    const gql = paging((asked) =>
      asked === 0
        ? page([person("alice"), bot, person("bob"), unlinked("Carol@Example.org")], "c1")
        : page([person("Alice"), unlinked("carol@example.org"), unlinked("dave@example.org")], null),
    );
    const facts = await fetchRepositories(gql, restTags({}), tools.slice(5, 6), NOW);
    assert.deepEqual(factsOf(facts, "fd")?.contributors, { count: 4, capped: false });
    assert.deepEqual(
      gql.variables.map((v) => ({ head: v.h0, after: v.a0, since: v.since })),
      [
        { head: "abc123", after: undefined, since: "2026-06-26T00:00:00.000Z" },
        { head: "abc123", after: "c1", since: "2026-06-26T00:00:00.000Z" },
      ],
    );
  });

  it("stops after the page cap and publishes the count as a lower bound", async () => {
    const gql = paging((asked) => page([person(`p${asked}`)], `c${asked}`));
    const facts = await fetchRepositories(gql, restTags({}), tools.slice(5, 6), NOW);
    assert.deepEqual(factsOf(facts, "fd")?.contributors, { count: HISTORY_PAGES, capped: true });
    assert.equal(gql.variables.length, HISTORY_PAGES);
  });

  it("reads a later page GitHub did not return as a lower bound rather than a complete count", async () => {
    const gql = paging((asked) => (asked === 0 ? page([person("alice")], "c1") : null));
    const facts = await fetchRepositories(gql, restTags({}), tools.slice(5, 6), NOW);
    assert.deepEqual(factsOf(facts, "fd")?.contributors, { count: 1, capped: true });
  });

  it("has no count when not even the first page came back, and zero when nobody committed", async () => {
    const lost = await fetchRepositories(paging(() => null), restTags({}), tools.slice(5, 6), NOW);
    assert.equal(factsOf(lost, "fd")?.contributors, null);
    const quiet = await fetchRepositories(paging(() => page([], null)), restTags({}), tools.slice(5, 6), NOW);
    assert.deepEqual(factsOf(quiet, "fd")?.contributors, { count: 0, capped: false });
  });

  it("walks no history for a default branch that points at no commit", async () => {
    const gql = recordedGraphQL();
    const facts = await fetchRepositories(gql, restTags({}), tools.slice(5, 6), NOW);
    assert.equal(factsOf(facts, "fd")?.contributors, null);
    assert.ok(!gql.asked.some((query) => query.includes("history(")));
  });

  it("keeps commit history out of the facts query, which GitHub times out on when it carries both", () => {
    assert.ok(!repositoryQuery(tools).query.includes("history("));
  });
});

describe("platforms", () => {
  it("reads operating systems and architectures from the latest release's asset names", () => {
    const latest = node("fd").latestRelease;
    assert.ok(latest);
    const names = ["fd-v10.3.0-x86_64-unknown-linux-musl.tar.gz", "fd-v10.3.0-aarch64-apple-darwin.tar.gz", "checksums.txt"];
    const released = { ...node("fd"), latestRelease: { ...latest, releaseAssets: { nodes: names.map((name) => ({ name })) } } };
    assert.deepEqual(mapRepository(released).platforms, [
      { os: "linux", architectures: ["x86_64"] },
      { os: "macos", architectures: ["arm64"] },
    ]);
  });

  it("reads no platform for a monorepo package, whose repository's latest release may be another package's", async () => {
    const latest = node("oxlint").latestRelease;
    assert.ok(latest);
    const assets = { nodes: [{ name: "oxfmt-x86_64-unknown-linux-gnu.tar.gz" }] };
    const gql: GraphQL = {
      async query<T>() {
        const r0 = { ...node("oxlint"), latestRelease: { ...latest, releaseAssets: assets } };
        return { data: { r0, r1: r0 } as T, errors: [] };
      },
      spent: () => ({ queries: 0, cost: 0, remaining: null }),
    };
    const { path: _, ...oxlint } = tools[7] as Tool;
    const facts = await fetchRepositories(gql, restTags({}), [tools[7] as Tool, { ...oxlint, slug: "oxc" }], NOW);
    assert.deepEqual(factsOf(facts, "oxlint")?.platforms, []);
    assert.deepEqual(factsOf(facts, "oxc")?.platforms, [{ os: "linux", architectures: ["x86_64"] }]);
  });

  it("reads no platform from a repository that only has tags", () => {
    assert.deepEqual(mapRepository(node("kafka")).platforms, []);
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
    assert.ok(query.includes("issues(states: OPEN) { totalCount }"));
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
    assert.deepEqual([...owners.values()].map((read) => read.status), ["gone", "read"]);
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
