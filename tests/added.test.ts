import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { addedAt, carriedAddedAt, parseAddedLog, parseEditedLog } from "../scripts/lib/added.ts";

const log = [
  "",
  "2026-09-10T12:00:00+02:00\n\ndata/tools/zellij.yaml\n",
  "2026-08-01T09:00:00Z\n\ndata/tools/helix.yaml\ndata/tools/README.md\n",
  "2026-07-01T09:00:00Z\n\ndata/tools/helix.yaml\ndata/tools/alacritty.yaml\n",
].join("\0");

describe("parseAddedLog", () => {
  it("dates each tool by the commit that added its file, in UTC", () => {
    const added = parseAddedLog(log);
    assert.equal(added.get("zellij"), "2026-09-10T10:00:00.000Z");
    assert.equal(added.get("alacritty"), "2026-07-01T09:00:00.000Z");
  });

  it("keeps the first addition when a file was deleted and added again", () => {
    assert.equal(parseAddedLog(log).get("helix"), "2026-07-01T09:00:00.000Z");
  });

  it("ignores files that are not tool entries", () => {
    assert.deepEqual([...parseAddedLog(log).keys()].sort(), ["alacritty", "helix", "zellij"]);
  });

  it("returns nothing for an empty history", () => {
    assert.equal(parseAddedLog("").size, 0);
  });
});

describe("parseEditedLog", () => {
  it("dates each tool by the newest commit that touched its file, since git lists newest first", () => {
    const edited = parseEditedLog(log);
    assert.equal(edited.get("helix"), "2026-08-01T09:00:00.000Z");
    assert.equal(edited.get("alacritty"), "2026-07-01T09:00:00.000Z");
    assert.equal(edited.get("zellij"), "2026-09-10T10:00:00.000Z");
  });

  it("ignores files that are not tool entries", () => {
    assert.deepEqual([...parseEditedLog(log).keys()].sort(), ["alacritty", "helix", "zellij"]);
  });
});

describe("carriedAddedAt", () => {
  it("skips entries from a catalog written before addedAt existed", () => {
    const carried = carriedAddedAt({ tools: [{ slug: "a", addedAt: "2026-01-01T00:00:00.000Z" }, { slug: "b" }] });
    assert.deepEqual([...carried], [["a", "2026-01-01T00:00:00.000Z"]]);
  });
});

describe("addedAt", () => {
  const now = new Date("2026-09-22T03:17:00Z");
  const carried = new Map([["a", "2026-01-01T00:00:00.000Z"]]);
  const history = new Map([
    ["a", "2025-06-01T00:00:00.000Z"],
    ["b", "2026-05-01T00:00:00.000Z"],
  ]);

  it("carries the date over from the previous catalog before looking at history", () => {
    assert.equal(addedAt("a", carried, history, now), "2026-01-01T00:00:00.000Z");
  });

  it("backfills from git history for a tool the previous catalog did not date", () => {
    assert.equal(addedAt("b", carried, history, now), "2026-05-01T00:00:00.000Z");
  });

  it("uses the refresh date for a tool seen for the first time", () => {
    assert.equal(addedAt("c", carried, history, now), "2026-09-22T03:17:00.000Z");
  });
});
