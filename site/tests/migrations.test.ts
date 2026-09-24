import assert from "node:assert/strict";
import { test } from "node:test";

import { majorOf, migrationPath, pairOf, staleness } from "../src/lib/migrations.ts";

const review = { reviewed: "2026-09-24", majors: { redis: 8, valkey: 9 } };
const current = (majors: Record<string, number>) => (slug: string) => majors[slug] ?? null;

test("a page reviewed less than a year ago, with both sides on the same major, is current", () => {
  assert.deepEqual(staleness(review, new Date("2027-09-23T12:00:00Z"), current({ redis: 8, valkey: 9 })), []);
});

test("a page becomes due for review a year after it was reviewed", () => {
  assert.deepEqual(staleness(review, new Date("2027-09-24T00:00:00Z"), current({ redis: 8, valkey: 9 })), [{ kind: "age" }]);
});

test("a new major release on either side makes the page due, naming which side", () => {
  assert.deepEqual(staleness(review, new Date("2026-10-01T00:00:00Z"), current({ redis: 9, valkey: 9 })), [
    { kind: "major", slug: "redis" },
  ]);
});

test("a side with no readable release does not make the page due", () => {
  assert.deepEqual(staleness(review, new Date("2026-10-01T00:00:00Z"), current({})), []);
});

test("the major version is read from common tag shapes", () => {
  assert.equal(majorOf("v1.16.4"), 1);
  assert.equal(majorOf("8.10.2"), 8);
  assert.equal(majorOf("valkey-9.1.2"), 9);
  assert.equal(majorOf(null), null);
});

test("a page id names the pair it covers", () => {
  assert.deepEqual(pairOf("redis--valkey"), { from: "redis", to: "valkey" });
  assert.equal(pairOf("redis-valkey"), null);
  assert.equal(migrationPath("redis", "valkey"), "/migrate/redis/valkey/");
});
