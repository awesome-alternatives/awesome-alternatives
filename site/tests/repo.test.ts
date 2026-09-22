import assert from "node:assert/strict";
import { test } from "node:test";

import { REPO, repoUrl } from "../src/lib/repo.ts";

test("repoUrl points relative links at the repository on GitHub", () => {
  assert.equal(repoUrl("data/categories.yaml"), `${REPO}/blob/main/data/categories.yaml`);
  assert.equal(repoUrl("./LICENSE-DATA"), `${REPO}/blob/main/LICENSE-DATA`);
});

test("repoUrl leaves absolute, root and fragment links alone", () => {
  for (const href of ["https://example.com/x", "mailto:a@b.c", "/contribute/", "#what-ci-checks"]) {
    assert.equal(repoUrl(href), href);
  }
});
