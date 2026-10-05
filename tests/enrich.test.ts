import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, it } from "node:test";
import { createEnricher, fetchOwners } from "../scripts/lib/enrich.ts";
import type { RepositoryFacts } from "../scripts/lib/facts-graphql.ts";
import type { GitHub } from "../scripts/lib/github.ts";
import type { GraphQL } from "../scripts/lib/graphql.ts";
import { CATALOG_PATH, publish, type Snapshot } from "../scripts/lib/publish.ts";
import { BEHIND_ALLOW_LIST, type EnrichedTool, type OwnerFacts, type Read } from "../scripts/lib/types.ts";
import { catalogOf, checkout, declared, published } from "./catalog-checkout.ts";

const NOW = new Date("2026-09-26T03:17:00.000Z");

const neon = declared("neon", "neondatabase");
const ripgrep = declared("ripgrep", "BurntSushi");
const owner: OwnerFacts = { login: "neondatabase", kind: "organization", name: "Neon", bio: null, website: null, url: "https://github.com/neondatabase" };

describe("refresh of a tool behind an IP allow list", () => {
  it("keeps its last published facts, series and maintainer mark, and publishes without losing it", async () => {
    const before = published(neon, 23132, true);
    const snapshot = { checkedAt: "2026-09-25T03:17:00.000Z", owners: { neondatabase: owner }, tools: [before] };
    const root = await checkout(snapshot);
    const enricher = createEnricher(root, snapshot, null, [neon, ripgrep], NOW);
    const edited = { ...neon, category: "relational-database" };

    const kept = enricher.enrich(edited, BEHIND_ALLOW_LIST, null);
    assert.ok(kept);
    assert.deepEqual(kept.repo, before.repo);
    assert.deepEqual(kept.starHistory, before.starHistory);
    assert.deepEqual(kept.release, before.release);
    assert.deepEqual(kept.contributors, before.contributors);
    assert.equal(kept.maintainerVerified, true);
    assert.equal(kept.category, "relational-database");

    await publish(root, catalogOf(edited, ripgrep), { checkedAt: NOW.toISOString(), owners: { neondatabase: owner }, tools: [kept] });
    const written = JSON.parse(await readFile(join(root, CATALOG_PATH), "utf8")) as Snapshot;
    assert.deepEqual(
      written.tools.map((t) => [t.slug, t.repo.stars, t.maintainerVerified]),
      [["neon", 23132, true]],
    );
  });

  it("leaves out a tool no run has read yet, which the lost-tool guard does not count", async () => {
    const listed = published(ripgrep, 68622, false);
    const snapshot = { checkedAt: "2026-09-25T03:17:00.000Z", owners: {}, tools: [listed] };
    const root = await checkout(snapshot);
    const enricher = createEnricher(root, snapshot, null, [neon, ripgrep], NOW);
    assert.equal(enricher.enrich(neon, BEHIND_ALLOW_LIST, null), null);
    await publish(root, catalogOf(neon, ripgrep), { checkedAt: NOW.toISOString(), owners: {}, tools: [listed] });
  });
});

describe("refresh of a tool whose repository GitHub keeps failing on", () => {
  const unreadable = { status: "unreadable", reason: "r0: Something went wrong while executing your query" } as const;

  it("keeps its last published facts and maintainer mark, like a repository behind an IP allow list", async (t) => {
    const errors = t.mock.method(console, "error", () => {});
    const before = published(ripgrep, 61000, true);
    const snapshot = { checkedAt: "2026-09-25T03:17:00.000Z", owners: {}, tools: [before] };
    const enricher = createEnricher(await checkout(snapshot), snapshot, null, [neon, ripgrep], NOW);

    const kept = enricher.enrich(ripgrep, unreadable, null);
    assert.ok(kept);
    assert.deepEqual(kept.repo, before.repo);
    assert.deepEqual(kept.release, before.release);
    assert.equal(kept.maintainerVerified, true);
    assert.match(String(errors.mock.calls[0]?.arguments[0]), /GitHub could not read .*Something went wrong.*kept with its last published facts/);
  });

  it("leaves out a tool no run has read yet", async (t) => {
    t.mock.method(console, "error", () => {});
    const snapshot = { checkedAt: "2026-09-25T03:17:00.000Z", owners: {}, tools: [] };
    const enricher = createEnricher(await checkout(snapshot), snapshot, null, [neon, ripgrep], NOW);
    assert.equal(enricher.enrich(ripgrep, unreadable, null), null);
  });
});

describe("the verification date of a tool", () => {
  const verifiedOn = "2026-09-20T08:00:00.000Z";
  const facts = (before: EnrichedTool, claim: string[]): Read<RepositoryFacts> => ({
    status: "read",
    value: { repo: before.repo, release: null, releases: [], claim, openIssues: 0, contributors: null, platforms: [] },
  });

  it("is the one read for its .awesome-alternatives file when the file names it", async () => {
    const before = published(ripgrep, 61000, false);
    const snapshot = { checkedAt: "2026-09-25T03:17:00.000Z", owners: {}, tools: [before] };
    const enricher = createEnricher(await checkout(snapshot), snapshot, null, [ripgrep], NOW);
    const tool = enricher.enrich(ripgrep, facts(before, ["ripgrep"]), verifiedOn);
    assert.deepEqual([tool?.maintainerVerified, tool?.verifiedAt], [true, verifiedOn]);
  });

  it("is null for a tool verified only through the app, which carries no date", async () => {
    const before = published(ripgrep, 61000, false);
    const snapshot = { checkedAt: "2026-09-25T03:17:00.000Z", owners: {}, tools: [before] };
    const installed = { accounts: new Set(["burntsushi"]), repositories: new Set<string>() };
    const enricher = createEnricher(await checkout(snapshot), snapshot, installed, [ripgrep], NOW);
    const tool = enricher.enrich(ripgrep, facts(before, ["ripgrep-all"]), verifiedOn);
    assert.deepEqual([tool?.maintainerVerified, tool?.verifiedAt], [true, null]);
  });

  it("is kept from the last published run when the repository cannot be read", async (t) => {
    t.mock.method(console, "error", () => {});
    const before = { ...published(neon, 23132, true), verifiedAt: verifiedOn };
    const snapshot = { checkedAt: "2026-09-25T03:17:00.000Z", owners: {}, tools: [before] };
    const enricher = createEnricher(await checkout(snapshot), snapshot, null, [neon], NOW);
    assert.equal(enricher.enrich(neon, BEHIND_ALLOW_LIST, null)?.verifiedAt, verifiedOn);
  });
});

describe("fetchOwners", () => {
  const allowListed: GraphQL = {
    async query<T>() {
      const message = "the `neondatabase` organization has an IP allow list enabled, and your IP address is not permitted to access this resource.";
      return { data: { o0: null } as T, errors: [{ type: "FORBIDDEN", path: ["o0"], message }] };
    },
    spent: () => ({ queries: 0, cost: 0, remaining: null }),
  };
  const refusingRest: GitHub = {
    async get() {
      throw new Error("rate limit exhausted");
    },
  };

  it("keeps the published owner of an organisation behind an IP allow list when the read without a token fails too", async () => {
    const gql = allowListed;
    assert.deepEqual(await fetchOwners(gql, refusingRest, ["neondatabase"], { neondatabase: owner }), { neondatabase: owner });
  });

  it("reads an organisation behind an IP allow list without a token when it can", async () => {
    const anonymous: GitHub = {
      async get<T>(path: string) {
        return (path === "/orgs/neondatabase"
          ? { login: "neondatabase", name: "Neon", description: "Serverless Postgres", blog: "neon.tech", html_url: "https://github.com/neondatabase" }
          : null) as T | null;
      },
    };
    assert.deepEqual(await fetchOwners(allowListed, anonymous, ["neondatabase"], {}), {
      neondatabase: {
        login: "neondatabase",
        kind: "organization",
        name: "Neon",
        bio: "Serverless Postgres",
        website: "https://neon.tech",
        url: "https://github.com/neondatabase",
      },
    });
  });
});
