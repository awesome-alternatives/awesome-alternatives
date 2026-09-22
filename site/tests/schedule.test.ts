import assert from "node:assert/strict";
import { test } from "node:test";

import { dailyTime } from "../src/lib/schedule.ts";

test("a daily cron reads as a padded UTC time", () => {
  assert.equal(dailyTime("17 3 * * *"), "03:17 UTC");
  assert.equal(dailyTime("5 22 * * *"), "22:05 UTC");
});

test("a schedule that is not once a day is refused rather than misdescribed", () => {
  for (const cron of ["*/30 * * * *", "0 3 * * 1", "0 3,15 * * *", "75 3 * * *", ""]) {
    assert.throws(() => dailyTime(cron), /not a once-a-day schedule/);
  }
});
