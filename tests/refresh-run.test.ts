import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, it } from "node:test";
import type { Installations } from "../scripts/lib/app.ts";
import type { GqlRepository } from "../scripts/lib/facts-graphql.ts";
import type { GitHub } from "../scripts/lib/github.ts";
import type { GraphQL, GraphQLErrorEntry, GraphQLResponse } from "../scripts/lib/graphql.ts";
import { CATALOG_PATH, publish, type Snapshot } from "../scripts/lib/publish.ts";
import { refreshTools } from "../scripts/lib/refresh-run.ts";
import { catalogOf, checkout, declared, published } from "./catalog-checkout.ts";

const NOW = new Date("2026-09-26T03:17:00.000Z");
const recorded = JSON.parse(readFileSync(new URL("fixtures/graphql-repositories.json", import.meta.url), "utf8"));
const template = recorded.response.data.r0 as GqlRepository;

function repository(owner: string, name: string): GqlRepository {
  return {
    ...template,
    nameWithOwner: `${owner}/${name}`,
    defaultBranchRef: { name: "main", target: { oid: `head-${name}` } },
    latestRelease: null,
    tags: { nodes: [] },
    claim: null,
  };
}

function github(unreadableHistory: ReadonlySet<string>): GraphQL {
  return {
    async query<T>(query: string, variables: Record<string, string>) {
      const data: Record<string, unknown> = {};
      const errors: GraphQLErrorEntry[] = [];
      for (const [key, value] of Object.entries(variables)) {
        const index = key.slice(1);
        if (query.includes("...Facts") && key.startsWith("n")) data[`r${index}`] = repository(variables[`o${index}`] ?? "", value);
        if (query.includes("history(") && key.startsWith("n")) {
          if (unreadableHistory.has(value)) {
            data[`r${index}`] = null;
            errors.push({ path: [`r${index}`, "object", "history"], message: "Something went wrong while executing your query. This may be the result of a timeout" });
          } else {
            const author = { name: "Alice", email: "alice@example.com", user: { login: "alice" } };
            data[`r${index}`] = { object: { history: { pageInfo: { hasNextPage: false, endCursor: null }, nodes: [{ author }] } } };
          }
        }
        if (query.includes("repositoryOwner") && key.startsWith("l")) {
          data[`o${index}`] = { __typename: "User", login: value, url: `https://github.com/${value}`, name: null, bio: null, websiteUrl: null };
        }
      }
      return { data, errors } as GraphQLResponse<T>;
    },
    spent: () => ({ queries: 0, cost: 0, remaining: null }),
  };
}

const rest: GitHub = {
  async get() {
    return null;
  },
};

function installedOnAcme(): Installations & { lists: number } {
  const installations = {
    lists: 0,
    async list() {
      installations.lists++;
      return { accounts: new Set(["acme"]), repositories: new Set<string>() };
    },
  };
  return installations;
}

const fine = declared("fine", "acme");
const other = declared("other", "acme");
const broken = declared("broken", "bob");

describe("refreshTools", () => {
  it("publishes a tool whose commit history GitHub cannot read, without an active contributor count", async () => {
    const snapshot: Snapshot = { checkedAt: "2026-09-25T03:17:00.000Z", owners: {}, tools: [published(broken, 1, false), published(fine, 1, false)] };
    const root = await checkout(snapshot);
    const installations = installedOnAcme();
    const clients = { gql: github(new Set(["broken"])), gh: rest, installations };
    const { tools, owners } = await refreshTools(root, snapshot, clients, [broken, fine], [broken, fine], NOW);

    const bySlug = new Map(tools.map((t) => [t.slug, t]));
    assert.equal(bySlug.get("broken")?.contributors, null);
    assert.deepEqual(bySlug.get("fine")?.contributors, { count: 1, capped: false });
    assert.deepEqual(Object.keys(owners), ["acme", "bob"]);

    await publish(root, catalogOf(broken, fine), { checkedAt: NOW.toISOString(), owners, tools });
    const written = JSON.parse(await readFile(join(root, CATALOG_PATH), "utf8")) as Snapshot;
    assert.deepEqual(
      written.tools.map((t) => [t.slug, t.contributors ?? null]),
      [
        ["broken", null],
        ["fine", { count: 1, capped: false }],
      ],
    );
  });

  it("lists the app's installations once for the whole run, and verifies each tool from that list", async () => {
    const snapshot: Snapshot = { checkedAt: "2026-09-25T03:17:00.000Z", owners: {}, tools: [] };
    const root = await checkout(snapshot);
    const installations = installedOnAcme();
    const clients = { gql: github(new Set()), gh: rest, installations };
    const { tools } = await refreshTools(root, snapshot, clients, [fine, other, broken], [fine, other, broken], NOW);
    assert.equal(installations.lists, 1);
    assert.deepEqual(
      tools.map((t) => [t.slug, t.maintainerVerified]),
      [
        ["broken", false],
        ["fine", true],
        ["other", true],
      ],
    );
  });

  it("fails loudly when no commit history at all can be read, rather than publishing every tool without a count", async () => {
    const snapshot: Snapshot = { checkedAt: "2026-09-25T03:17:00.000Z", owners: {}, tools: [] };
    const root = await checkout(snapshot);
    const clients = { gql: github(new Set(["fine", "other"])), gh: rest, installations: null };
    await assert.rejects(refreshTools(root, snapshot, clients, [fine, other], [fine, other], NOW), /rejected the batch/);
  });
});
