import assert from "node:assert/strict";
import { setTimeout as delay } from "node:timers/promises";
import { describe, it } from "node:test";
import type { GraphQL, GraphQLErrorEntry, GraphQLResponse } from "../scripts/lib/graphql.ts";
import { GraphQLTransportError } from "../scripts/lib/graphql.ts";
import { type AliasedBatch, aliasedBatch, aliasedBatches, BatchRejected } from "../scripts/lib/graphql-batch.ts";

interface Node {
  value: string;
}

type Answer = GraphQLResponse<Record<string, Node | null>>;

function spec(failures: "throw" | "report"): AliasedBatch<string, Node, string> {
  return {
    alias: "r",
    failures,
    query: (batch) => ({ query: "query", variables: Object.fromEntries(batch.map((name, i) => [`n${i}`, name])) }),
    read: (node) => node.value,
  };
}

function scripted(answer: (names: string[], call: number) => Answer | Promise<Answer>): GraphQL & { asked: string[][] } {
  const asked: string[][] = [];
  return {
    asked,
    async query<T>(_query: string, variables: Record<string, string>) {
      const names = Object.values(variables);
      asked.push(names);
      return (await answer(names, asked.length)) as GraphQLResponse<T>;
    },
    spent: () => ({ queries: asked.length, cost: 0, remaining: null }),
  };
}

const ALLOW_LIST = "the `neondatabase` organization has an IP allow list enabled, and your IP address is not permitted to access this resource.";

function perName(names: string[], failing: ReadonlySet<string>): Answer {
  const data: Record<string, Node | null> = {};
  const errors: GraphQLErrorEntry[] = [];
  names.forEach((name, i) => {
    const alias = `r${i}`;
    if (name === "gone") {
      data[alias] = null;
      errors.push({ type: "NOT_FOUND", path: [alias], message: "Could not resolve to a Repository" });
    } else if (name === "refused") {
      data[alias] = null;
      errors.push({ type: "FORBIDDEN", path: [alias], message: ALLOW_LIST });
    } else if (failing.has(name)) {
      data[alias] = null;
      errors.push({ path: [alias, "object", "history"], message: "Something went wrong while executing your query. This may be the result of a timeout" });
    } else {
      data[alias] = { value: name.toUpperCase() };
    }
  });
  return { data, errors };
}

describe("aliasedBatch", () => {
  it("reads each alias on its own: read, gone, and behind an IP allow list", async () => {
    const gql = scripted((names) => perName(names, new Set()));
    const outcomes = await aliasedBatch(gql, ["a", "gone", "refused", "b"], spec("report"));
    assert.deepEqual(outcomes, [
      { status: "read", value: "A" },
      { status: "gone" },
      { status: "behind-allow-list" },
      { status: "read", value: "B" },
    ]);
    assert.equal(gql.asked.length, 1);
  });

  it("keeps the other aliases when one fails, after asking for the failing one again on its own", async () => {
    const gql = scripted((names) => perName(names, new Set(["slow"])));
    const outcomes = await aliasedBatch(gql, ["a", "slow", "b"], spec("report"));
    assert.deepEqual(outcomes.map((o) => o.status), ["read", "failed", "read"]);
    assert.deepEqual(gql.asked, [["a", "slow", "b"], ["slow"]]);
  });

  it("reads an alias that failed in the batch and answers on its own", async () => {
    const gql = scripted((names, call) => perName(names, call === 1 ? new Set(["slow"]) : new Set()));
    const outcomes = await aliasedBatch(gql, ["a", "slow"], spec("report"));
    assert.deepEqual(outcomes, [
      { status: "read", value: "A" },
      { status: "read", value: "SLOW" },
    ]);
  });

  it("throws on an alias that keeps failing when its caller cannot do without it", async () => {
    const gql = scripted((names) => perName(names, new Set(["slow"])));
    await assert.rejects(aliasedBatch(gql, ["a", "slow"], spec("throw")), (error: unknown) => {
      assert.ok(error instanceof BatchRejected);
      assert.match(error.message, /r0\.object\.history: Something went wrong/);
      return true;
    });
  });

  it("isolates a batch GitHub times out on and reports the one item that keeps timing out", async () => {
    const gql = scripted((names) => {
      if (names.includes("slow")) throw new GraphQLTransportError(502, "timeout");
      return perName(names, new Set());
    });
    const outcomes = await aliasedBatch(gql, ["a", "b", "slow", "c"], spec("report"));
    assert.deepEqual(outcomes.map((o) => o.status), ["read", "read", "failed", "read"]);
  });

  it("fails the whole read on an error no item explains, without splitting", async () => {
    const unauthorized = scripted(() => {
      throw new GraphQLTransportError(401, "Bad credentials");
    });
    await assert.rejects(aliasedBatch(unauthorized, ["a", "b", "c"], spec("report")), /401/);
    assert.equal(unauthorized.asked.length, 1);

    const invalid = scripted(() => ({
      data: null,
      errors: [{ path: ["query", "r0", "nope"], extensions: { code: "undefinedField" }, message: "Field 'nope' doesn't exist on type 'Repository'" }],
    }));
    await assert.rejects(aliasedBatch(invalid, ["a", "b", "c"], spec("report")), BatchRejected);
    assert.equal(invalid.asked.length, 1);
  });
});

describe("aliasedBatches", () => {
  it("never has more batches in flight than its concurrency, and keeps every item in its place", async () => {
    let inFlight = 0;
    let peak = 0;
    const gql = scripted(async (names) => {
      inFlight++;
      peak = Math.max(peak, inFlight);
      await delay(5);
      inFlight--;
      return perName(names, new Set());
    });
    const items = Array.from({ length: 25 }, (_, i) => `t${i}`);
    const outcomes = await aliasedBatches(gql, items, { size: 2, concurrency: 3 }, spec("throw"));
    assert.equal(peak, 3);
    assert.equal(gql.asked.length, 13);
    assert.deepEqual(
      outcomes.map((o) => (o.status === "read" ? o.value : o.status)),
      items.map((name) => name.toUpperCase()),
    );
  });

  it("stops starting batches once one has failed the read", async () => {
    const gql = scripted((names) => {
      if (names.includes("t0")) throw new GraphQLTransportError(401, "Bad credentials");
      return perName(names, new Set());
    });
    const items = Array.from({ length: 20 }, (_, i) => `t${i}`);
    await assert.rejects(aliasedBatches(gql, items, { size: 2, concurrency: 1 }, spec("throw")), /401/);
    assert.equal(gql.asked.length, 1);
  });
});
