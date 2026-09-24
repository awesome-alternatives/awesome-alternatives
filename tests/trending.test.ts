import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { TREND_WINDOW_DAYS, trendOf } from "../scripts/lib/trending.ts";

const NOW = new Date("2026-09-24T12:00:00Z");
const daysAgo = (days: number) => new Date(NOW.getTime() - days * 24 * 60 * 60 * 1000).toISOString();

describe("trendOf", () => {
  it("counts the stars gained since the last point at or before the window's start", () => {
    const history = [
      { at: daysAgo(40), stars: 100 },
      { at: daysAgo(TREND_WINDOW_DAYS + 1), stars: 150 },
      { at: daysAgo(10), stars: 180 },
    ];
    assert.deepEqual(trendOf(history, 230, NOW), { stars: 80, exact: true, since: daysAgo(TREND_WINDOW_DAYS) });
  });

  it("reads a history shorter than the window as a floor, since the first point", () => {
    const history = [
      { at: daysAgo(2), stars: 1000 },
      { at: daysAgo(1), stars: 1010 },
    ];
    assert.deepEqual(trendOf(history, 1025, NOW), { stars: 25, exact: false, since: daysAgo(2) });
  });

  it("does not report a loss of stars as a negative gain", () => {
    assert.equal(trendOf([{ at: daysAgo(5), stars: 500 }], 490, NOW)?.stars, 0);
  });

  it("does not depend on the order of the points", () => {
    const history = [
      { at: daysAgo(1), stars: 12 },
      { at: daysAgo(3), stars: 10 },
    ];
    assert.equal(trendOf(history, 15, NOW)?.stars, 5);
  });

  it("has no trend for a tool with no history yet", () => {
    assert.equal(trendOf([], 42, NOW), null);
  });
});
