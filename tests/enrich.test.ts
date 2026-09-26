import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, it } from "node:test";
import { createEnricher, fetchOwners } from "../scripts/lib/enrich.ts";
import type { GraphQL } from "../scripts/lib/graphql.ts";
import { CATALOG_PATH, publish, type Snapshot } from "../scripts/lib/publish.ts";
import { BEHIND_ALLOW_LIST, type OwnerFacts } from "../scripts/lib/types.ts";
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

    const kept = enricher.enrich(edited, BEHIND_ALLOW_LIST);
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
    assert.equal(enricher.enrich(neon, BEHIND_ALLOW_LIST), null);
    await publish(root, catalogOf(neon, ripgrep), { checkedAt: NOW.toISOString(), owners: {}, tools: [listed] });
  });
});

describe("fetchOwners", () => {
  it("keeps the published owner of an organisation behind an IP allow list", async () => {
    const gql: GraphQL = {
      async query<T>() {
        const message = "the `neondatabase` organization has an IP allow list enabled, and your IP address is not permitted to access this resource.";
        return { data: { o0: null } as T, errors: [{ type: "FORBIDDEN", path: ["o0"], message }] };
      },
      spent: () => ({ queries: 0, cost: 0, remaining: null }),
    };
    assert.deepEqual(await fetchOwners(gql, ["neondatabase"], { neondatabase: owner }), { neondatabase: owner });
  });
});
