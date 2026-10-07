import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { Catalog } from "../scripts/lib/catalog.ts";
import { checkable, listedCatalog } from "../scripts/lib/listed.ts";
import type { Category, Product, Tool } from "../scripts/lib/types.ts";

const categories = new Map<string, Category>([["c", { name: "C", description: "D" }]]);

function tool(slug: string, extra: Partial<Tool> = {}): Tool {
  return { slug, name: slug.toUpperCase(), repository: `https://github.com/acme/${slug}`, category: "c", file: "", ...extra };
}

function product(slug: string): Product {
  return { slug, name: slug, homepage: "https://example.com", vendor: "Acme", category: "c", description: "D", file: "" };
}

const replacing = (slug: string, ...targets: string[]) => tool(slug, { replaces: targets.map((t) => ({ tool: t, fit: "full" as const })) });

const catalogOf = (tools: Tool[], products: Product[] = []): Catalog => ({ tools, products, categories });

describe("listedCatalog", () => {
  it("takes a banned tool out of tools and lists it with its reason, sorted by slug", () => {
    const listed = listedCatalog(catalogOf([tool("b", { banned: "second" }), tool("a"), tool("c", { banned: "first" })]));
    assert.deepEqual(listed.tools.map((t) => t.slug), ["a"]);
    assert.deepEqual(listed.banned, [
      { slug: "b", name: "B", repository: "https://github.com/acme/b", category: "c", reason: "second" },
      { slug: "c", name: "C", repository: "https://github.com/acme/c", category: "c", reason: "first" },
    ]);
  });

  it("strips replaces edges that point at a banned tool and leaves the others", () => {
    const listed = listedCatalog(catalogOf([replacing("a", "gone", "kept"), tool("gone", { banned: "x" }), tool("kept")]));
    assert.deepEqual(listed.tools.find((t) => t.slug === "a")?.replaces?.map((r) => r.tool), ["kept"]);
  });

  it("does not touch the declared entry it strips from", () => {
    const declared = replacing("a", "gone");
    listedCatalog(catalogOf([declared, tool("gone", { banned: "x" })]));
    assert.deepEqual(declared.replaces?.map((r) => r.tool), ["gone"]);
  });

  it("drops a product that only a banned tool replaced and keeps the rest", () => {
    const tools = [replacing("open", "kept-product"), { ...replacing("bad", "orphan-product", "kept-product"), banned: "x" }];
    const listed = listedCatalog(catalogOf(tools, [product("orphan-product"), product("kept-product")]));
    assert.deepEqual(listed.products.map((p) => p.slug), ["kept-product"]);
  });

  it("returns an empty banned list when nothing is banned", () => {
    assert.deepEqual(listedCatalog(catalogOf([tool("a")])).banned, []);
  });
});

describe("checkable", () => {
  it("leaves out a banned tool and a tool that was not asked for", () => {
    const tools = [tool("a"), tool("b", { banned: "x" }), tool("c")];
    assert.deepEqual(checkable(tools, ["a", "b"]).map((t) => t.slug), ["a"]);
  });
});
