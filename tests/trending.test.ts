import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { TREND_WINDOW_DAYS, trendOf } from "../scripts/lib/trending.ts";

const now = new Date("2026-09-22T12:00:00Z");
const DAY_MS = 24 * 60 * 60 * 1000;

function daysAgo(days: number): string {
  return new Date(now.getTime() - days * DAY_MS).toISOString();
}

describe("trendOf", () => {
  it("counts the stars that arrived inside the window and leaves out the older ones", () => {
    const sample = [daysAgo(200), daysAgo(40), daysAgo(29), daysAgo(3), daysAgo(0)];
    assert.deepEqual(trendOf(sample, 5000, now), {
      stars: 3,
      exact: true,
      since: daysAgo(200),
    });
  });

  it("reports no data, not zero, when GitHub gave no stargazers back", () => {
    assert.equal(trendOf([], 60_000, now), null);
  });

  it("reports zero for a repository whose recent stars are all older than the window", () => {
    const trend = trendOf([daysAgo(400), daysAgo(90)], 5000, now);
    assert.equal(trend?.stars, 0);
    assert.equal(trend?.exact, true);
  });

  it("marks the count a floor when the sample does not reach back across the window", () => {
    const sample = Array.from({ length: 200 }, (_, i) => daysAgo(i / 20));
    const trend = trendOf(sample, 30_000, now);
    assert.equal(trend?.stars, 200);
    assert.equal(trend?.exact, false);
  });

  it("stays exact when the sample holds every star the repository has", () => {
    const trend = trendOf([daysAgo(2), daysAgo(1)], 2, now);
    assert.deepEqual(trend, { stars: 2, exact: true, since: daysAgo(2) });
  });

  it("keeps the oldest star of the sample, which is how far the measurement reaches", () => {
    const trend = trendOf([daysAgo(1), daysAgo(12), daysAgo(6)], 900, now);
    assert.equal(trend?.since, daysAgo(12));
  });

  it("ignores a timestamp it cannot read rather than counting it", () => {
    const trend = trendOf(["not a date", daysAgo(1)], 900, now);
    assert.deepEqual(trend, { stars: 1, exact: false, since: daysAgo(1) });
  });

  it("counts a star on the edge of the window as inside it", () => {
    assert.equal(trendOf([daysAgo(TREND_WINDOW_DAYS)], 900, now)?.stars, 1);
  });
});
