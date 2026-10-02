import assert from "node:assert/strict";
import { test } from "node:test";

import { LOCALES } from "../src/i18n/index.ts";
import { auditSitemap, barePaths, expectedPaths, indexableAs, locs, unindexedPaths } from "../src/lib/sitemap.ts";

const SITE = "https://example.com";
const catalog = [
  {
    slug: "ferrflow",
    repo: { fullName: "FerrLabs/FerrFlow", archived: false, stars: 900 },
    replaces: [{ tool: "semantic-release", fit: "full" as const, note: "Rust workspaces." }],
  },
  {
    slug: "cocogitto",
    repo: { fullName: "cocogitto/cocogitto", archived: false, stars: 700 },
    replaces: [
      { tool: "semantic-release", fit: "partial" as const },
      { tool: "ferrflow", fit: "partial" as const },
    ],
  },
  {
    slug: "ferrvault",
    repo: { fullName: "FerrLabs/FerrVault", archived: false, stars: 100 },
    replaces: [{ tool: "vault", fit: "partial" as const }],
  },
];

test("barePaths lists home, the index pages, every tool, every target and every comparison once", () => {
  assert.deepEqual(barePaths(catalog), [
    "/",
    "/tools/",
    "/alternatives/",
    "/categories/",
    "/languages/",
    "/licenses/",
    "/owners/",
    "/changes/",
    "/migrate/",
    "/tools/ferrflow/",
    "/tools/cocogitto/",
    "/tools/ferrvault/",
    "/alternatives/semantic-release/",
    "/alternatives/ferrflow/",
    "/alternatives/vault/",
    "/owners/ferrlabs/",
    "/compare/cocogitto-vs-ferrflow/",
  ]);
});

test("barePaths lists an owner only once it holds more than one tool", () => {
  const paths = barePaths(catalog);
  assert.ok(paths.includes("/owners/ferrlabs/"));
  assert.ok(!paths.includes("/owners/cocogitto/"), "an owner with one tool gets no page, so nothing to list");
});

test("expectedPaths repeats every indexed path in each locale, leaving English unprefixed", () => {
  const paths = expectedPaths(catalog);
  assert.ok(paths.includes("/tools/cocogitto/"));
  for (const locale of LOCALES.filter((l) => l !== "en")) {
    assert.ok(paths.includes(`/${locale}/tools/cocogitto/`), `missing ${locale}`);
  }
  assert.ok(!paths.includes("/en/tools/cocogitto/"));
});

test("a tool page that canonicalises to its alternatives page stays out of the sitemap in every locale", () => {
  const paths = expectedPaths(catalog);
  for (const locale of LOCALES) {
    const prefix = locale === "en" ? "" : `/${locale}`;
    assert.ok(!paths.includes(`${prefix}/tools/ferrflow/`), `${locale} lists a non-canonical tool page`);
    assert.ok(paths.includes(`${prefix}/alternatives/ferrflow/`));
  }
});

test("a tool replaced only by archived tools keeps its own page in the sitemap", () => {
  const archived = catalog.map((tool) => (tool.slug === "cocogitto" ? { ...tool, repo: { ...tool.repo, archived: true } } : tool));
  assert.ok(expectedPaths(archived).includes("/tools/ferrflow/"));
});

test("comparisons are listed in English only", () => {
  const paths = expectedPaths(catalog).filter((path) => path.includes("/compare/"));
  assert.deepEqual(paths, ["/compare/cocogitto-vs-ferrflow/"]);
  assert.ok(unindexedPaths(catalog).includes("/fr/compare/cocogitto-vs-ferrflow/"));
});

test("auditSitemap flags an unindexed page the sitemap still lists", () => {
  const listed = [...expectedPaths(catalog), "/de/tools/ferrflow/", "/es/compare/cocogitto-vs-ferrflow/"].map(
    (path) => new URL(path, SITE).href,
  );
  assert.deepEqual(auditSitemap(SITE, catalog, listed).unwanted, [
    new URL("/es/compare/cocogitto-vs-ferrflow/", SITE).href,
    new URL("/de/tools/ferrflow/", SITE).href,
  ]);
});

test("indexableAs accepts a page only when it canonicalises to itself and is not noindex", () => {
  const url = `${SITE}/tools/cocogitto/`;
  assert.ok(indexableAs(url, `<link rel="canonical" href="${url}">`));
  assert.ok(!indexableAs(url, `<link rel="canonical" href="${SITE}/alternatives/cocogitto/">`));
  assert.ok(!indexableAs(url, `<meta name="robots" content="noindex" />`));
});

test("locs reads every loc, trimming whitespace", () => {
  const xml = `<urlset><url><loc>${SITE}/</loc></url><url><loc>\n  ${SITE}/tools/ferrflow/\n</loc></url></urlset>`;
  assert.deepEqual(locs(xml), [`${SITE}/`, `${SITE}/tools/ferrflow/`]);
});

test("auditSitemap reports what a locale is missing and flags a translated 404", () => {
  const dropped = ["/fr/licenses/", "/es/owners/ferrlabs/", "/de/alternatives/semantic-release/"];
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
