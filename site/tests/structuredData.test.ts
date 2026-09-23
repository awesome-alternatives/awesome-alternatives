import assert from "node:assert/strict";
import { test } from "node:test";

import { breadcrumbList, itemList, serialize, softwareSourceCode, spdxUrl } from "../src/lib/structuredData.ts";

const PAGE = "https://awesome-alternatives.com/tools/ruff/";

function tool(repo: Partial<Parameters<typeof softwareSourceCode>[0]["repo"]> = {}, release: { tag: string } | null = null) {
  return {
    name: "Ruff",
    repository: "https://github.com/astral-sh/ruff",
    path: null,
    release: release && { ...release, publishedAt: null, url: "https://example.com", source: "release" as const, signed: false },
    repo: {
      fullName: "astral-sh/ruff",
      description: "An extremely fast Python linter.",
      homepage: null,
      language: "Rust",
      license: "MIT",
      stars: 1,
      forks: 0,
      topics: [],
      archived: false,
      fork: false,
      private: false,
      createdAt: "2022-01-01T00:00:00Z",
      pushedAt: "2026-09-23T10:00:00Z",
      defaultBranch: "main",
      ...repo,
    },
  };
}

test("a tool is described with what its page shows: repository, licence, language, last push, version", () => {
  assert.deepEqual(softwareSourceCode(tool({}, { tag: "0.14.0" }), PAGE), {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: "Ruff",
    url: PAGE,
    codeRepository: "https://github.com/astral-sh/ruff",
    dateModified: "2026-09-23T10:00:00Z",
    description: "An extremely fast Python linter.",
    license: "https://spdx.org/licenses/MIT.html",
    programmingLanguage: "Rust",
    version: "0.14.0",
  });
});

test("a missing licence, language, description or release is left out rather than emitted as null", () => {
  const data = softwareSourceCode(tool({ license: null, language: null, description: null }), PAGE);
  for (const key of ["license", "programmingLanguage", "description", "version"]) {
    assert.ok(!(key in data), key);
  }
  assert.ok(!serialize(data).includes("null"));
});

test("a licence GitHub could not classify is not turned into an SPDX link", () => {
  assert.equal(spdxUrl("Other"), null);
  assert.equal(spdxUrl("NOASSERTION"), null);
  assert.equal(spdxUrl("Apache-2.0"), "https://spdx.org/licenses/Apache-2.0.html");
});

test("a tool inside a monorepo points at its own directory", () => {
  const data = softwareSourceCode({ ...tool(), path: "crates/ruff" }, PAGE);
  assert.equal(data.codeRepository, "https://github.com/astral-sh/ruff/tree/HEAD/crates/ruff");
});

test("a list keeps the order the page shows and numbers from one", () => {
  const list = itemList("Alternatives to Redis", [
    { name: "Valkey", url: "https://awesome-alternatives.com/tools/valkey/" },
    { name: "KeyDB", url: "https://awesome-alternatives.com/tools/keydb/" },
  ]);
  assert.equal(list.numberOfItems, 2);
  assert.deepEqual(
    list.itemListElement.map((item) => [item.position, item.name]),
    [
      [1, "Valkey"],
      [2, "KeyDB"],
    ],
  );
});

test("a description cannot close the script tag it is serialised into", () => {
  const out = serialize(softwareSourceCode(tool({ description: "</script><script>alert(1)</script>" }), PAGE));
  assert.ok(!out.includes("</script>"));
  assert.ok(!out.includes("<"));
  assert.equal(JSON.parse(out).description, "</script><script>alert(1)</script>");
});

test("a breadcrumb trail numbers each step and points at its page", () => {
  const trail = breadcrumbList([
    { name: "Home", url: "https://awesome-alternatives.com/" },
    { name: "Key-value stores", url: "https://awesome-alternatives.com/categories/key-value-store/" },
  ]);
  assert.deepEqual(
    trail.itemListElement.map((item) => [item.position, item.name, item.item]),
    [
      [1, "Home", "https://awesome-alternatives.com/"],
      [2, "Key-value stores", "https://awesome-alternatives.com/categories/key-value-store/"],
    ],
  );
});
