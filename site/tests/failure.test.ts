import assert from "node:assert/strict";
import { test } from "node:test";

import {
  SearchError,
  describe,
  failureFromResponse,
  failureFromThrown,
  guessTarget,
  offersFallback,
  parseRetryAfter,
} from "../src/lib/failure.ts";

const NOW = Date.parse("2026-09-22T12:00:00Z");

test("Retry-After is read as seconds or as an HTTP date", () => {
  assert.equal(parseRetryAfter("12", NOW), 12);
  assert.equal(parseRetryAfter(" 3 ", NOW), 3);
  assert.equal(parseRetryAfter("Tue, 22 Sep 2026 12:00:30 GMT", NOW), 30);
  assert.equal(parseRetryAfter("Tue, 22 Sep 2026 11:00:00 GMT", NOW), 0);
  assert.equal(parseRetryAfter("-5", NOW), null);
  assert.equal(parseRetryAfter("soon", NOW), null);
  assert.equal(parseRetryAfter("", NOW), null);
  assert.equal(parseRetryAfter(null, NOW), null);
});

test("responses map to rate limit, outage and refusal", () => {
  assert.deepEqual(failureFromResponse(429, { error: "slow down" }, "7", NOW), {
    kind: "rate-limited",
    retryAfter: 7,
  });
  assert.deepEqual(failureFromResponse(429, null, null, NOW), { kind: "rate-limited", retryAfter: null });
  assert.deepEqual(failureFromResponse(502, null, null, NOW), { kind: "unavailable" });
  assert.deepEqual(failureFromResponse(500, { error: "panic in handler" }, null, NOW), { kind: "unavailable" });
  assert.deepEqual(failureFromResponse(400, { error: "the query is empty" }, null, NOW), {
    kind: "rejected",
    message: "the query is empty",
  });
  assert.deepEqual(failureFromResponse(404, "<html>", null, NOW), {
    kind: "rejected",
    message: "The search was refused (404).",
  });
  assert.deepEqual(failureFromResponse(422, { error: 42 }, null, NOW), {
    kind: "rejected",
    message: "The search was refused (422).",
  });
});

test("thrown errors never surface the raw browser message", () => {
  const offline = failureFromThrown(new TypeError("Failed to fetch"));
  assert.deepEqual(offline, { kind: "unavailable" });
  assert.doesNotMatch(describe(offline), /fetch/i);
  assert.deepEqual(failureFromThrown(new DOMException("signal timed out", "TimeoutError")), { kind: "timeout" });
  assert.deepEqual(failureFromThrown(new SyntaxError("Unexpected token <")), { kind: "unavailable" });
  const limited = new SearchError({ kind: "rate-limited", retryAfter: 1 });
  assert.deepEqual(failureFromThrown(limited), { kind: "rate-limited", retryAfter: 1 });
});

test("only outages point at the prerendered pages", () => {
  assert.equal(offersFallback({ kind: "unavailable" }), true);
  assert.equal(offersFallback({ kind: "timeout" }), true);
  assert.equal(offersFallback({ kind: "rate-limited", retryAfter: 5 }), false);
  assert.equal(offersFallback({ kind: "rejected", message: "no" }), false);
});

test("rate limit message uses the wait when known", () => {
  assert.match(describe({ kind: "rate-limited", retryAfter: 30 }), /30 seconds/);
  assert.match(describe({ kind: "rate-limited", retryAfter: 0 }), /1 second\./);
  assert.match(describe({ kind: "rate-limited", retryAfter: null }), /a minute/);
});

test("the fallback target is the longest tool named as a whole word", () => {
  const names = { redis: "Redis", "semantic-release": "semantic-release", go: "Go", "c++": "C++" };
  assert.equal(guessTarget("Redis, but multithreaded", names), "redis");
  assert.equal(guessTarget("semantic-release, but written in Go", names), "semantic-release");
  assert.equal(guessTarget("a fast C++ build tool", names), "c++");
  assert.equal(guessTarget("something for redistribution", names), null);
  assert.equal(guessTarget("anything good", names), null);
});
