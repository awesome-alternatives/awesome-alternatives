import assert from "node:assert/strict";
import { test } from "node:test";

import { categories, categoryGroups, inCurrentCategory, products } from "../src/lib/catalog.ts";

test("a merged category's tools land on the category that took them, and other categories are left alone", () => {
  const redirects = { captcha: "waf" };
  assert.equal(inCurrentCategory({ slug: "altcha", category: "captcha" }, redirects).category, "waf");
  assert.equal(inCurrentCategory({ slug: "anubis", category: "waf" }, redirects).category, "waf");
});

test("every category page the site builds is a live category, even when the published catalog predates a merge", () => {
  for (const group of categoryGroups) assert.ok(group.slug in categories, group.slug);
  for (const product of products) assert.ok(product.category in categories, `${product.slug}: ${product.category}`);
});
