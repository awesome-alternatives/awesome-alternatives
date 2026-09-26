import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { AllowListRefusal, createGitHub, GitHubError } from "../scripts/lib/github.ts";
import { createGraphQL, GraphQLTransportError } from "../scripts/lib/graphql.ts";
import { type Clock, MAX_RATE_LIMIT_WAIT_MS, RATE_LIMIT_ATTEMPTS, UNTOLD_RATE_LIMIT_WAIT_MS } from "../scripts/lib/rate-limit.ts";

const NOW = Date.parse("2026-09-26T03:00:00Z");

function fakeClock(): Clock & { waits: number[] } {
  const waits: number[] = [];
  return {
    waits,
    now: () => NOW,
    async sleep(ms) {
      waits.push(ms);
    },
  };
}

function answering(...responses: (() => Response)[]): typeof fetch & { calls: number } {
  const fake = Object.assign(
    async () => {
      const next = responses[Math.min(fake.calls, responses.length - 1)];
      fake.calls++;
      if (!next) throw new Error("no response scripted");
      return next();
    },
    { calls: 0 },
  );
  return fake;
}

const ok = () => Response.json({ data: { rateLimit: { cost: 1, remaining: 4000 }, r0: { name: "x" } } });
const limited = (status: number, headers: Record<string, string>, body = "slow down") => () => new Response(body, { status, headers });

describe("createGraphQL under a rate limit", () => {
  it("waits the retry-after GitHub sends on a secondary rate limit, then answers", async () => {
    const clock = fakeClock();
    const fetchImpl = answering(limited(403, { "retry-after": "7" }), ok);
    const { data } = await createGraphQL("t", fetchImpl, clock).query<{ r0: { name: string } }>("query { x }", {});
    assert.equal(data?.r0.name, "x");
    assert.deepEqual(clock.waits, [7000]);
    assert.equal(fetchImpl.calls, 2);
  });

  it("waits until the reset instant when the budget is gone", async () => {
    const clock = fakeClock();
    const reset = String(NOW / 1000 + 12);
    const fetchImpl = answering(limited(429, { "x-ratelimit-remaining": "0", "x-ratelimit-reset": reset }), ok);
    await createGraphQL("t", fetchImpl, clock).query("query { x }", {});
    assert.deepEqual(clock.waits, [12_000]);
  });

  it("waits a minute on GitHub's secondary rate limit message when it names no delay", async () => {
    const clock = fakeClock();
    const fetchImpl = answering(limited(403, {}, '{"message":"You have exceeded a secondary rate limit."}'), ok);
    await createGraphQL("t", fetchImpl, clock).query("query { x }", {});
    assert.deepEqual(clock.waits, [UNTOLD_RATE_LIMIT_WAIT_MS]);
  });

  it("waits on a rate limit GitHub reports inside a 200 answer", async () => {
    const clock = fakeClock();
    const rateLimited = () =>
      Response.json({ data: null, errors: [{ type: "RATE_LIMITED", message: "API rate limit exceeded" }] }, { headers: { "retry-after": "3" } });
    const fetchImpl = answering(rateLimited, ok);
    const { errors } = await createGraphQL("t", fetchImpl, clock).query("query { x }", {});
    assert.deepEqual(errors, []);
    assert.deepEqual(clock.waits, [3000]);
  });

  it("gives up after a bounded number of attempts with an error the batcher does not split on", async () => {
    const clock = fakeClock();
    const fetchImpl = answering(limited(429, { "retry-after": "1" }));
    await assert.rejects(
      createGraphQL("t", fetchImpl, clock).query("query { x }", {}),
      (error: unknown) => error instanceof GraphQLTransportError && error.status === 429 && !error.retriable,
    );
    assert.equal(fetchImpl.calls, RATE_LIMIT_ATTEMPTS);
    assert.equal(clock.waits.length, RATE_LIMIT_ATTEMPTS - 1);
  });

  it("does not sit out a reset further away than it is willing to wait", async () => {
    const clock = fakeClock();
    const reset = String(NOW / 1000 + MAX_RATE_LIMIT_WAIT_MS / 1000 + 600);
    const fetchImpl = answering(limited(403, { "x-ratelimit-remaining": "0", "x-ratelimit-reset": reset }), ok);
    await assert.rejects(createGraphQL("t", fetchImpl, clock).query("query { x }", {}), /answered 403/);
    assert.deepEqual(clock.waits, []);
    assert.equal(fetchImpl.calls, 1);
  });

  it("fails at once on a 403 that is not a rate limit", async () => {
    const clock = fakeClock();
    const fetchImpl = answering(limited(403, { "x-ratelimit-remaining": "4999" }, "Resource not accessible by integration"), ok);
    await assert.rejects(createGraphQL("t", fetchImpl, clock).query("query { x }", {}), /Resource not accessible by integration/);
    assert.deepEqual(clock.waits, []);
    assert.equal(fetchImpl.calls, 1);
  });
});

describe("createGitHub under a rate limit", () => {
  it("waits the retry-after on a secondary rate limit, then returns the answer", async () => {
    const clock = fakeClock();
    const fetchImpl = answering(limited(429, { "retry-after": "2" }), () => Response.json({ verification: { verified: true } }));
    assert.deepEqual(await createGitHub("t", fetchImpl, clock).get("/repos/a/b/git/tags/abc"), { verification: { verified: true } });
    assert.deepEqual(clock.waits, [2000]);
  });

  it("still tells an IP allow list apart, without waiting", async () => {
    const clock = fakeClock();
    const body = "the `neondatabase` organization has an IP allow list enabled, and your IP address is not permitted";
    const fetchImpl = answering(limited(403, { "x-ratelimit-remaining": "4999" }, body));
    await assert.rejects(createGitHub("t", fetchImpl, clock).get("/repos/neondatabase/neon"), (error: unknown) => error instanceof AllowListRefusal);
    assert.deepEqual(clock.waits, []);
  });

  it("reports an exhausted budget it will not wait for", async () => {
    const clock = fakeClock();
    const fetchImpl = answering(limited(403, { "x-ratelimit-remaining": "0", "x-ratelimit-reset": String(NOW / 1000 + 3600) }));
    await assert.rejects(
      createGitHub("t", fetchImpl, clock).get("/repos/a/b"),
      (error: unknown) => error instanceof GitHubError && /rate limit exhausted/.test(error.message),
    );
    assert.equal(fetchImpl.calls, 1);
  });
});
