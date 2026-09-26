import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { spikeOf } from "../scripts/lib/rules.ts";
import { mergeSeries, nextSeries, seriesPoints } from "../scripts/lib/star-series.ts";
import { TREND_WINDOW_DAYS, trendOf } from "../scripts/lib/trending.ts";

const NOW = new Date("2026-09-25T10:00:00Z");

const counting = (from: string, length: number, start = 0) => ({ from, stars: Array.from({ length }, (_, i) => start + i) });

describe("nextSeries", () => {
  it("starts a newly listed tool with a single day, today's count", () => {
    assert.deepEqual(nextSeries(undefined, 42, NOW), { from: "2026-09-25", stars: [42] });
  });

  it("carries the published days and replaces today's earlier count", () => {
    const previous = { from: "2026-09-23", stars: [116, 121, 125] };
    assert.deepEqual(nextSeries(previous, 130, NOW), { from: "2026-09-23", stars: [116, 121, 130] });
  });

  it("drops the days before the window and keeps one day before its start as the baseline", () => {
    const series = nextSeries(counting("2026-08-20", 36), 100, NOW);
    assert.equal(series.from, "2026-08-25");
    assert.equal(series.stars.length, 32);
    assert.deepEqual([series.stars[0], series.stars.at(-1)], [5, 100]);
  });

  it("spreads the stars of days nobody recorded evenly across them", () => {
    assert.deepEqual(nextSeries({ from: "2026-09-20", stars: [100] }, 150, NOW), {
      from: "2026-09-20",
      stars: [100, 110, 120, 130, 140, 150],
    });
  });

  it("interpolates the window's first day when the last count before it is older", () => {
    const series = nextSeries({ from: "2026-08-01", stars: [0] }, 550, NOW);
    assert.equal(series.from, "2026-08-25");
    assert.equal(series.stars[0], 240);
    assert.equal(series.stars.length, 32);
  });

  it("ignores counts recorded after today", () => {
    assert.deepEqual(nextSeries({ from: "2026-09-24", stars: [10, 11, 12] }, 11, NOW), {
      from: "2026-09-24",
      stars: [10, 11],
    });
  });
});

describe("mergeSeries", () => {
  it("keeps the published days a targeted refresh did not read, and lets the refresh win on the days both have", () => {
    const published = { from: "2026-09-20", stars: [10, 11, 12, 13, 14] };
    const refreshed = { from: "2026-09-22", stars: [12, 20, 25, 30] };
    assert.deepEqual(mergeSeries(published, refreshed), { from: "2026-09-20", stars: [10, 11, 12, 20, 25, 30] });
  });

  it("ends on the refreshed series' last day and prunes to the window from there", () => {
    const published = counting("2026-08-20", 40);
    const merged = mergeSeries(published, { from: "2026-09-24", stars: [500] });
    assert.equal(merged.from, "2026-08-24");
    assert.equal(merged.stars.length, 32);
    assert.equal(merged.stars.at(-1), 500);
  });
});

describe("seriesPoints", () => {
  it("leaves today out and dates each day at its end", () => {
    const points = seriesPoints({ from: "2026-09-23", stars: [5, 6, 7] }, NOW);
    assert.deepEqual(points, [
      { at: "2026-09-23T23:59:59.999Z", stars: 5 },
      { at: "2026-09-24T23:59:59.999Z", stars: 6 },
    ]);
  });

  it("gives an exact trend once the series reaches the window's start", () => {
    const series = nextSeries(counting("2026-08-20", 36, 1000), 1100, NOW);
    const since = new Date(NOW.getTime() - TREND_WINDOW_DAYS * 24 * 60 * 60 * 1000).toISOString();
    assert.deepEqual(trendOf(seriesPoints(series, NOW), 1100, NOW), { stars: 95, exact: true, since });
  });

  it("gives a floor since the first recorded day while the series is shorter than the window", () => {
    const series = nextSeries({ from: "2026-09-22", stars: [100, 110, 120] }, 130, NOW);
    assert.deepEqual(trendOf(seriesPoints(series, NOW), 130, NOW), {
      stars: 30,
      exact: false,
      since: "2026-09-22T23:59:59.999Z",
    });
  });

  it("has no trend for a tool listed today", () => {
    assert.equal(trendOf(seriesPoints(nextSeries(undefined, 42, NOW), NOW), 42, NOW), null);
  });

  it("dates a star spike on the day that gained the stars", () => {
    const stars = [100, 102, 104, 106, 108, 110, 112, 412, 414];
    const spike = spikeOf(seriesPoints({ from: "2026-09-16", stars: [...stars, 416] }, NOW), 416, NOW);
    assert.deepEqual(spike, { gained: 300, usual: 2, on: "2026-09-23" });
  });
});
