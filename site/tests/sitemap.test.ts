import assert from "node:assert/strict";
import { test } from "node:test";

import { LOCALES } from "../src/i18n/index.ts";
import { auditSitemap, barePaths, expectedPaths, locs } from "../src/lib/sitemap.ts";

const SITE = "https://example.com";
const catalog = [
  { slug: "ferrflow", replaces: [{ tool: "semantic-release", fit: "full" as const }] },
  { slug: "cocogitto", replaces: [{ tool: "semantic-release", fit: "partial" as const }, { tool: "ferrflow", fit: "partial" as const }] },
];

test("barePaths lists home, the index pages, every tool and every target once", () => {
  assert.deepEqual(barePaths(catalog), [
    "/",
    "/tools/",
    "/alternatives/",
    "/categories/",
    "/languages/",
    "/licenses/",
    "/tools/ferrflow/",
    "/tools/cocogitto/",
    "/alternatives/semantic-release/",
    "/alternatives/ferrflow/",
  ]);
});

test("expectedPaths repeats every path in each locale, leaving English unprefixed", () => {
  const paths = expectedPaths(catalog);
  assert.equal(paths.length, barePaths(catalog).length * LOCALES.length);
  assert.ok(paths.includes("/tools/ferrflow/"));
  for (const locale of LOCALES.filter((l) => l !== "en")) {
    assert.ok(paths.includes(`/${locale}/tools/ferrflow/`), `missing ${locale}`);
  }
  assert.ok(!paths.includes("/en/tools/ferrflow/"));
});

test("locs reads every loc, trimming whitespace", () => {
  const xml = `<urlset><url><loc>${SITE}/</loc></url><url><loc>\n  ${SITE}/tools/ferrflow/\n</loc></url></urlset>`;
  assert.deepEqual(locs(xml), [`${SITE}/`, `${SITE}/tools/ferrflow/`]);
});

test("auditSitemap reports what a locale is missing and flags a translated 404", () => {
  const dropped = ["/fr/licenses/", "/de/alternatives/semantic-release/"];
  const listed = expectedPaths(catalog)
    .filter((path) => !dropped.includes(path))
    .map((path) => new URL(path, SITE).href);
  listed.push(new URL("/es/404/", SITE).href);

  assert.deepEqual(auditSitemap(SITE, catalog, listed), {
    missing: dropped.map((path) => new URL(path, SITE).href),
    unwanted: [new URL("/es/404/", SITE).href],
  });
});

test("auditSitemap treats a URL without its trailing slash as missing", () => {
  const listed = expectedPaths(catalog).map((p) => new URL(p, SITE).href.replace(/\/$/, ""));
  assert.equal(auditSitemap(SITE, catalog, listed).missing.length, expectedPaths(catalog).length);
});
