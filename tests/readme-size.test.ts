import assert from "node:assert/strict";
import { readdir, stat } from "node:fs/promises";
import { describe, it } from "node:test";

const GITHUB_DISPLAY_LIMIT = 500 * 1024;
const MARGIN = 0.9;

const root = new URL("../", import.meta.url);

async function sizeOf(path: string): Promise<number> {
  return (await stat(new URL(path, root))).size;
}

describe("generated markdown", () => {
  it("keeps the README under what GitHub renders", async () => {
    assert.ok((await sizeOf("README.md")) < GITHUB_DISPLAY_LIMIT * MARGIN);
  });

  it("keeps every category page under what GitHub renders", async () => {
    const pages = (await readdir(new URL("catalog/", root))).filter((name) => name.endsWith(".md"));
    assert.ok(pages.length > 0);
    for (const name of pages) {
      assert.ok((await sizeOf(`catalog/${name}`)) < GITHUB_DISPLAY_LIMIT * MARGIN, name);
    }
  });
});
