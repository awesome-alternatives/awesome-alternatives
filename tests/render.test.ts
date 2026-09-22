import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { END, START, spliceReadme } from "../scripts/lib/render.ts";

describe("spliceReadme", () => {
  it("replaces only what sits between the markers", () => {
    const before = `intro\n${START}\nold table\n${END}\noutro\n`;
    assert.equal(spliceReadme(before, "new table"), `intro\n${START}\n\nnew table\n\n${END}\noutro\n`);
  });

  it("is stable when run twice, so the nightly job only commits real changes", () => {
    const once = spliceReadme(`a\n${START}\n${END}\nb`, "x");
    assert.equal(spliceReadme(once, "x"), once);
  });

  it("refuses a README without markers instead of appending blindly", () => {
    assert.throws(() => spliceReadme("no markers here", "x"), /markers/);
  });
});
