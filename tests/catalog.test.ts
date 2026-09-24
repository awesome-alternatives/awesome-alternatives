import assert from "node:assert/strict";
import { cp, mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";
import { Ajv2020 } from "ajv/dist/2020.js";
import { checkStructure, loadCatalog } from "../scripts/lib/catalog.ts";
import type { Category, Product, Tool } from "../scripts/lib/types.ts";

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

function product(slug: string, extra: Partial<Product> = {}): Product {
  return {
    slug,
    name: slug,
    homepage: `https://example.com/${slug}`,
    vendor: "Acme",
    category: "release-automation",
    description: "A closed product.",
    file: `data/products/${slug}.yaml`,
    ...extra,
  };
}

const codes = (tools: Tool[], products: Product[] = []) =>
  checkStructure({ tools, products, categories }).map((f) => `${f.slug}:${f.code}`);

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

describe("deploy", () => {
  const kinds = new Map<string, Category>([
    ["forge", { name: "F", description: "D", selfHost: true }],
    ["cli", { name: "C", description: "D" }],
  ]);
  const check = (tool: Tool) =>
    checkStructure({ tools: [tool], products: [], categories: kinds }).map((f) => `${f.slug}:${f.code}`);

  it("accepts deploy methods on a tool people run themselves", () => {
    assert.deepEqual(check(tool("gitea", { category: "forge", deploy: ["container", "helm"] })), []);
  });

  it("rejects deploy methods on a tool whose category is not self-hosted", () => {
    assert.deepEqual(check(tool("ripgrep", { category: "cli", deploy: ["binary"] })), ["ripgrep:deploy-outside-self-host"]);
  });

  it("leaves an unknown category to its own error", () => {
    assert.deepEqual(check(tool("x", { category: "nope", deploy: ["binary"] })), ["x:unknown-category"]);
  });
});

describe("capabilities", () => {
  const forges = new Map<string, Category>([
    [
      "release-automation",
      { name: "R", description: "D", capabilities: { ci: { label: "CI/CD", match: ["ci"] } } },
    ],
  ]);
  const check = (tool: Tool) =>
    checkStructure({ tools: [tool], products: [], categories: forges }).map((f) => `${f.slug}:${f.code}`);

  it("accepts a capability its category declares", () => {
    assert.deepEqual(check(tool("forge", { capabilities: { ci: { docs: "https://example.com/ci" } } })), []);
  });

  it("rejects a capability outside its category's vocabulary", () => {
    assert.deepEqual(check(tool("forge", { capabilities: { wiki: { docs: "https://example.com/wiki" } } })), [
      "forge:unknown-capability",
    ]);
  });
});

describe("closed products", () => {
  const replacing = (slug: string) => tool("open", { replaces: [{ tool: slug, fit: "full" }] });

  it("lets a tool replace a closed product", () => {
    assert.deepEqual(codes([replacing("closed")], [product("closed")]), []);
  });

  it("rejects a product whose slug is already a tool, so one URL cannot mean two things", () => {
    assert.deepEqual(codes([tool("closed"), replacing("closed")], [product("closed")]), ["closed:product-collides"]);
  });

  it("rejects a product nothing replaces, since its page would list no alternative", () => {
    assert.deepEqual(codes([tool("open")], [product("closed")]), ["closed:unused-product"]);
  });

  it("rejects a product in a category that is not declared", () => {
    assert.deepEqual(codes([replacing("closed")], [product("closed", { category: "nope" })]), [
      "closed:unknown-category",
    ]);
  });
});

describe("loadCatalog", () => {
  async function fixture(files: Record<string, string>, products: Record<string, string> = {}): Promise<string> {
    const root = await mkdtemp(join(tmpdir(), "aa-"));
    await cp(join(import.meta.dirname, "../schema"), join(root, "schema"), { recursive: true });
    await cp(join(import.meta.dirname, "../data/categories.yaml"), join(root, "data/categories.yaml"));
    await mkdir(join(root, "data/tools"), { recursive: true });
    for (const [name, body] of Object.entries(files)) await writeFile(join(root, "data/tools", name), body);
    if (Object.keys(products).length) await mkdir(join(root, "data/products"), { recursive: true });
    for (const [name, body] of Object.entries(products)) await writeFile(join(root, "data/products", name), body);
    return root;
  }

  it("loads a closed product from data/products and holds it to its own schema", async () => {
    const root = await fixture(
      {
        "agent.yaml": [
          "name: Agent",
          "repository: https://github.com/acme/agent",
          "category: release-automation",
          "replaces:",
          "  - tool: closed",
          "    fit: full",
        ].join("\n"),
      },
      {
        "closed.yaml": [
          "name: Closed",
          "homepage: https://example.com",
          "vendor: Acme",
          "category: release-automation",
          "description: A closed product.",
        ].join("\n"),
        "leaky.yaml": [
          "name: Leaky",
          "homepage: https://example.com",
          "vendor: Acme",
          "category: release-automation",
          "description: D.",
          "stars: 5",
        ].join("\n"),
      },
    );
    const { catalog, findings } = await loadCatalog(root);
    assert.deepEqual(
      catalog.products.map((p) => p.slug),
      ["closed"],
    );
    assert.deepEqual(
      findings.map((f) => `${f.slug}:${f.code}`),
      ["leaky:schema"],
    );
  });

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

describe("the generated catalog", () => {
  async function schema() {
    const root = join(import.meta.dirname, "..");
    const validate = new Ajv2020({ allErrors: true }).compile(
      JSON.parse(await readFile(join(root, "schema/catalog.schema.json"), "utf8")),
    );
    return { validate, catalog: JSON.parse(await readFile(join(root, "generated/catalog.json"), "utf8")) };
  }

  it("matches the schema the site and the API read it against", async () => {
    const { validate, catalog } = await schema();
    assert.ok(validate(catalog), JSON.stringify(validate.errors));
  });

  it("rejects a trend the refresh could not have written", async () => {
    const { validate, catalog } = await schema();
    const [first] = catalog.tools;
    assert.equal(validate({ ...catalog, tools: [{ ...first, trend: { stars: 12 } }] }), false);
    assert.equal(validate({ ...catalog, tools: [{ ...first, trend: 12 }] }), false);
  });

  it("accepts an entry that predates the trend field, which the first refresh fills in", async () => {
    const { validate, catalog } = await schema();
    const { trend: _trend, ...without } = catalog.tools[0];
    assert.ok(validate({ ...catalog, tools: [without] }), JSON.stringify(validate.errors));
  });
});
