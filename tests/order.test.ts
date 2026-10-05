import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { byCodeUnit } from "../scripts/lib/order.ts";

describe("byCodeUnit", () => {
  it("orders like the default sort, hyphens and digits before letters, upper case before lower", () => {
    const names = ["ab", "a_b", "aB", "a1", "a-b", "a"];
    assert.deepEqual([...names].sort(byCodeUnit), ["a", "a-b", "a1", "aB", "a_b", "ab"]);
    assert.deepEqual([...names].sort(byCodeUnit), [...names].sort());
  });

  it("treats equal strings as equal", () => {
    assert.equal(byCodeUnit("same", "same"), 0);
  });
});
