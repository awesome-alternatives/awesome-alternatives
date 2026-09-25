import assert from "node:assert/strict";
import { test } from "node:test";

import { chartOf, daysOf } from "../src/lib/sparkline.ts";

test("each value is one UTC day from the series start, across a month boundary", () => {
  assert.deepEqual(daysOf({ from: "2026-08-30", stars: [10, 11, 12, 13] }), [
    { day: "2026-08-30", stars: 10 },
    { day: "2026-08-31", stars: 11 },
    { day: "2026-09-01", stars: 12 },
    { day: "2026-09-02", stars: 13 },
  ]);
});

test("the lowest count sits on the bottom edge and the highest on the top edge", () => {
  const chart = chartOf({ from: "2026-09-01", stars: [100, 150, 200] }, 300, 60);
  assert.ok(chart);
  assert.deepEqual(
    chart.points.map(({ x, y }) => [x, y]),
    [
      [0, 60],
      [150, 30],
      [300, 0],
    ],
  );
  assert.equal(chart.line, "M0 60L150 30L300 0");
  assert.equal(chart.area, "M0 60L150 30L300 0L300 60L0 60Z");
  assert.equal(chart.step, 150);
});

test("a series that never moved is drawn flat across the middle rather than dividing by zero", () => {
  const chart = chartOf({ from: "2026-09-01", stars: [42, 42, 42] }, 300, 60);
  assert.ok(chart);
  assert.deepEqual(
    chart.points.map((p) => p.y),
    [30, 30, 30],
  );
});

test("a single day is not a chart", () => {
  assert.equal(chartOf({ from: "2026-09-01", stars: [5] }, 300, 60), null);
  assert.equal(chartOf({ from: "2026-09-01", stars: [] }, 300, 60), null);
});
