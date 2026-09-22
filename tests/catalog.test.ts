import assert from "node:assert/strict";
import { cp, mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";
import { checkStructure, loadCatalog } from "../scripts/lib/catalog.ts";
import type { Category, Tool } from "../scripts/lib/types.ts";

const categories = new Map<string, Category>([["release-automation", { name: "R", description: "D" }]]);

function tool(slug: string, extra: Partial<Tool> = {}): Tool {
  return {
    slug,
    name: slug,
    repository: `https://github.com/acme/${slug}`,
    category: "release-automation",
    file: `data/tools/${slug}.yaml`,
    ...extra,
  };
}

const codes = (tools: Tool[]) => checkStructure({ tools, categories }).map((f) => `${f.slug}:${f.code}`);

describe("checkStructure", () => {
  it("accepts a replacement pointing at a listed tool", () => {
    assert.deepEqual(codes([tool("a"), tool("b", { replaces: [{ tool: "a", fit: "full" }] })]), []);
  });

  it("rejects a replacement that points nowhere", () => {
    assert.deepEqual(codes([tool("b", { replaces: [{ tool: "ghost", fit: "full" }] })]), ["b:unknown-replacement"]);
  });

  it("rejects a tool replacing itself", () => {
    assert.deepEqual(codes([tool("a", { replaces: [{ tool: "a", fit: "full" }] })]), ["a:replaces-itself"]);
  });

  it("rejects the same replacement listed twice with different fits", () => {
    const b = tool("b", {
      replaces: [
        { tool: "a", fit: "full" },
        { tool: "a", fit: "partial" },
      ],
    });
    assert.deepEqual(codes([tool("a"), b]), ["b:duplicate-replacement"]);
  });

  it("rejects the same repository under two slugs, whatever the case", () => {
    const dupe = tool("b", { repository: "https://github.com/ACME/a" });
    assert.deepEqual(codes([tool("a"), dupe]), ["b:duplicate-repository"]);
  });

  it("accepts tools of one monorepo when each declares its own path", () => {
    const repo = "https://github.com/acme/mono";
    const cli = tool("cli", { repository: repo, path: "crates/cli" });
    const server = tool("server", { repository: repo, path: "crates/server" });
    assert.deepEqual(codes([cli, server]), []);
  });

  it("rejects a monorepo entry without a path, or two entries with the same path", () => {
    const repo = "https://github.com/acme/mono";
    const whole = tool("whole", { repository: repo });
    const part = tool("part", { repository: repo, path: "packages/part" });
    assert.deepEqual(codes([whole, part]), ["part:duplicate-repository"]);
    const again = tool("again", { repository: repo, path: "Packages/Part" });
    assert.deepEqual(codes([part, again]), ["again:duplicate-repository"]);
  });

  it("rejects a category that is not declared", () => {
    assert.deepEqual(codes([tool("a", { category: "made-up" })]), ["a:unknown-category"]);
  });
});

describe("loadCatalog", () => {
  async function fixture(files: Record<string, string>): Promise<string> {
    const root = await mkdtemp(join(tmpdir(), "aa-"));
    await cp(join(import.meta.dirname, "../schema"), join(root, "schema"), { recursive: true });
    await cp(join(import.meta.dirname, "../data/categories.yaml"), join(root, "data/categories.yaml"));
    await mkdir(join(root, "data/tools"), { recursive: true });
    for (const [name, body] of Object.entries(files)) await writeFile(join(root, "data/tools", name), body);
    return root;
  }

  it("loads a valid entry and takes the slug from the file name", async () => {
    const root = await fixture({
      "good.yaml": "name: Good\nrepository: https://github.com/acme/good\ncategory: release-automation\n",
    });
    const { catalog, findings } = await loadCatalog(root);
    assert.deepEqual(findings, []);
    assert.equal(catalog.tools[0]?.slug, "good");
  });

  it("rejects a field the schema does not know, so facts cannot be smuggled in", async () => {
    const root = await fixture({
      "sneaky.yaml":
        "name: Sneaky\nrepository: https://github.com/acme/sneaky\ncategory: release-automation\nstars: 99999\n",
    });
    const { findings } = await loadCatalog(root);
    assert.deepEqual(
      findings.map((f) => f.code),
      ["schema"],
    );
  });

  it("rejects a repository that is not on github.com", async () => {
    const root = await fixture({
      "elsewhere.yaml": "name: E\nrepository: https://gitlab.com/acme/e\ncategory: release-automation\n",
    });
    const { findings } = await loadCatalog(root);
    assert.deepEqual(
      findings.map((f) => f.code),
      ["schema"],
    );
  });

  it("rejects a file name that is not a lowercase slug", async () => {
    const root = await fixture({
      "Bad_Name.yaml": "name: B\nrepository: https://github.com/acme/b\ncategory: release-automation\n",
    });
    const { findings } = await loadCatalog(root);
    assert.deepEqual(
      findings.map((f) => f.code),
      ["bad-slug"],
    );
  });
});
