import assert from "node:assert/strict";
import { test } from "node:test";

import { auditSitemap, expectedPaths, locs } from "../src/lib/sitemap.ts";

const SITE = "https://example.com";
const catalog = [
  { slug: "ferrflow", replaces: [{ tool: "semantic-release", fit: "full" as const }] },
  { slug: "cocogitto", replaces: [{ tool: "semantic-release", fit: "partial" as const }, { tool: "ferrflow", fit: "partial" as const }] },
];

test("expectedPaths lists home, the index pages, every tool and every target once", () => {
  assert.deepEqual(expectedPaths(catalog), [
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

test("locs reads every loc, trimming whitespace", () => {
  const xml = `<urlset><url><loc>${SITE}/</loc></url><url><loc>\n  ${SITE}/tools/ferrflow/\n</loc></url></urlset>`;
  assert.deepEqual(locs(xml), [`${SITE}/`, `${SITE}/tools/ferrflow/`]);
});

test("auditSitemap reports a missing index, a missing target and a listed 404", () => {
  const listed = [
    `${SITE}/`,
    `${SITE}/tools/`,
    `${SITE}/alternatives/`,
    `${SITE}/categories/`,
    `${SITE}/languages/`,
    `${SITE}/tools/ferrflow/`,
    `${SITE}/tools/cocogitto/`,
    `${SITE}/alternatives/ferrflow/`,
    `${SITE}/404/`,
  ];
  assert.deepEqual(auditSitemap(SITE, catalog, listed), {
    missing: [`${SITE}/licenses/`, `${SITE}/alternatives/semantic-release/`],
    unwanted: [`${SITE}/404/`],
  });
});

test("auditSitemap treats a URL without its trailing slash as missing", () => {
  const listed = expectedPaths(catalog).map((p) => new URL(p, SITE).href.replace(/\/$/, ""));
  assert.equal(auditSitemap(SITE, catalog, listed).missing.length, expectedPaths(catalog).length);
});
