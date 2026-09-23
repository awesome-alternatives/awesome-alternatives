import assert from "node:assert/strict";
import { test } from "node:test";

import { NEW_TOOL_URL, REPO, repoUrl } from "../src/lib/repo.ts";

test("repoUrl points relative links at the repository on GitHub", () => {
  assert.equal(repoUrl("data/categories.yaml"), `${REPO}/blob/main/data/categories.yaml`);
  assert.equal(repoUrl("./LICENSE-DATA"), `${REPO}/blob/main/LICENSE-DATA`);
});

test("repoUrl leaves absolute, root and fragment links alone", () => {
  for (const href of ["https://example.com/x", "mailto:a@b.c", "/contribute/", "#what-ci-checks"]) {
    assert.equal(repoUrl(href), href);
  }
});

test("the add-a-tool link opens a file named after the slug, under data/tools", () => {
  const url = new URL(NEW_TOOL_URL);
  assert.equal(url.pathname, "/awesome-alternatives/awesome-alternatives/new/main/data/tools");
  assert.equal(url.searchParams.get("filename"), "your-tool.yaml");
});

test("the add-a-tool link carries a skeleton that shows every required field", () => {
  const skeleton = new URL(NEW_TOOL_URL).searchParams.get("value") ?? "";
  for (const field of ["name:", "repository:", "category:", "replaces:", "tool:", "fit:"]) {
    assert.ok(skeleton.includes(field), `skeleton is missing ${field}`);
  }
});

test("the skeleton holds no value that would validate, so it cannot be committed unread", () => {
  const skeleton = new URL(NEW_TOOL_URL).searchParams.get("value") ?? "";
  assert.ok(!skeleton.includes("https://github.com/awesome-alternatives"));
  assert.ok(skeleton.includes("owner/name"));
});
