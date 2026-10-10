import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { DEFAULT_LOCALE, LOCALES } from "../src/i18n/index.ts";
import { pairs } from "../src/lib/catalog.ts";
import { categoryMap, pairMap, redirectMaps, reversedPairs } from "../src/lib/redirects.ts";

const nginx = readFileSync(new URL("../nginx.conf", import.meta.url), "utf8");
const pair = (a: string, b: string) => ({ a: { slug: a }, b: { slug: b } });

function locationPattern(): RegExp {
  const match = nginx.match(/location ~ (\S*compare_pair\S*) \{/);
  assert.ok(match, "nginx.conf has the comparison location");
  return new RegExp(match[1]);
}

test("a comparison is keyed by its reversed spelling and answers with the canonical one", () => {
  assert.deepEqual(
    reversedPairs([pair("alacritty", "kitty"), pair("ferrflow", "semantic-release")]),
    new Map([
      ["kitty-vs-alacritty", "alacritty-vs-kitty"],
      ["semantic-release-vs-ferrflow", "ferrflow-vs-semantic-release"],
    ]),
  );
});

test("a canonical URL is not a key, so it never redirects to itself, and an unknown pair is absent", () => {
  const table = reversedPairs([pair("alacritty", "kitty")]);
  assert.equal(table.has("alacritty-vs-kitty"), false);
  assert.equal(table.has("kitty-vs-wezterm"), false);
});

test("a reversed spelling that spells a real comparison is left out, that page being nobody's mirror", () => {
  const table = reversedPairs([pair("a", "b-vs-c"), pair("b", "c-vs-a")]);
  assert.equal(table.has("b-vs-c-vs-a"), false);
  assert.equal(table.get("c-vs-a-vs-b"), "b-vs-c-vs-a");
});

test("a reversed spelling two comparisons share is left out, having no single canonical page", () => {
  const table = reversedPairs([pair("b-vs-a", "c"), pair("a", "c-vs-b")]);
  assert.equal(table.has("c-vs-b-vs-a"), false);
  assert.equal(table.size, 0);
});

test("the table is an nginx map with an empty default and one sorted line per redirect", () => {
  assert.equal(
    pairMap(reversedPairs([pair("alacritty", "kitty"), pair("ferrflow", "semantic-release")])),
    [
      "map $compare_pair $compare_canonical {",
      `    default "";`,
      "    kitty-vs-alacritty alacritty-vs-kitty;",
      "    semantic-release-vs-ferrflow ferrflow-vs-semantic-release;",
      "}",
      "",
    ].join("\n"),
  );
});

test("every comparison the site builds is reachable by its reversed URL", () => {
  const table = reversedPairs(pairs);
  assert.ok(pairs.length > 0);
  assert.equal(table.size, pairs.length);
  for (const built of pairs) {
    assert.equal(table.get(`${built.b.slug}-vs-${built.a.slug}`), built.slug);
    assert.equal(table.has(built.slug), false);
  }
});

test("the hash holds the longest key of either map, so nginx does not refuse them at startup", () => {
  const long = (length: number) => "x".repeat(length);
  assert.match(redirectMaps(reversedPairs([pair(long(30), long(33))]), {}), /^map_hash_bucket_size 128;/);
  assert.match(redirectMaps(reversedPairs([pair("alacritty", "kitty")]), { [long(60)]: "waf" }), /^map_hash_bucket_size 128;/);
  assert.match(redirectMaps(reversedPairs([pair("alacritty", "kitty")]), { captcha: "waf" }), /^map_hash_bucket_size 64;/);
});

test("the image loads the redirect maps before nginx.conf, whose own map would lock the bucket size first", () => {
  const dockerfile = readFileSync(new URL("../Dockerfile", import.meta.url), "utf8");
  const maps = dockerfile.match(/generated\/redirects\.conf \/etc\/nginx\/conf\.d\/(\S+)/)?.[1];
  const site = dockerfile.match(/nginx\.conf \/etc\/nginx\/conf\.d\/(\S+)/)?.[1];
  assert.ok(maps && site);
  assert.ok(maps < site, `${maps} loads after ${site}`);
});

test("nginx reads the pair the map is keyed on and redirects on the page it answers", () => {
  const [, source, canonical] = pairMap(new Map()).match(/map \$(\S+) \$(\S+) \{/) ?? [];
  assert.ok(source && canonical);
  assert.ok(nginx.includes(`(?<${source}>`));
  assert.ok(nginx.includes(`if ($${canonical})`));
  assert.ok(nginx.includes(`return 301 /\${compare_locale}compare/$${canonical}/$is_args$args;`));
});

test("the location catches a comparison URL in every locale, and catches nothing else", () => {
  const pattern = locationPattern();
  assert.equal(pattern.exec("/compare/kitty-vs-alacritty/")?.groups?.compare_pair, "kitty-vs-alacritty");
  for (const locale of LOCALES.filter((one) => one !== DEFAULT_LOCALE)) {
    const groups = pattern.exec(`/${locale}/compare/kitty-vs-alacritty/`)?.groups;
    assert.equal(groups?.compare_locale, `${locale}/`);
    assert.equal(groups?.compare_pair, "kitty-vs-alacritty");
  }
  assert.equal(pattern.test("/it/compare/kitty-vs-alacritty/"), false);
  assert.equal(pattern.test("/compare/kitty-vs-alacritty/index.html"), false);
  assert.equal(pattern.test("/tools/kitty/"), false);
  assert.equal(pattern.test("/alternatives/kitty/"), false);
});

function notFoundMap(): { fallback: string; pattern: RegExp; target: string } {
  const block = nginx.match(/map \$uri \$not_found_page \{([^}]*)\}/)?.[1];
  assert.ok(block, "nginx.conf maps the request to its not-found page");
  const fallback = block.match(/default (\S+);/)?.[1];
  const rule = block.match(/~(\S+) (\S+);/);
  assert.ok(fallback && rule);
  return { fallback, pattern: new RegExp(rule[1]), target: rule[2] };
}

test("a missing page under a locale is answered with that locale's own 404 page", () => {
  const { pattern, target } = notFoundMap();
  for (const locale of LOCALES.filter((one) => one !== DEFAULT_LOCALE)) {
    const groups = pattern.exec(`/${locale}/tools/nope/`)?.groups;
    assert.equal(target.replace("$not_found_locale", groups?.not_found_locale ?? ""), `${locale}/404/`);
  }
});

test("every other missing page gets the root 404, which the error_page serves from the site root", () => {
  const { fallback, pattern } = notFoundMap();
  assert.equal(fallback, "404.html");
  for (const path of ["/tools/nope/", "/it/tools/nope/", "/tools/fr/", "/fr", "/frog/"]) {
    assert.equal(pattern.test(path), false, path);
  }
  assert.match(nginx, /error_page 403 404 =404 \/\$not_found_page;/);
});

function categoryLocation(): RegExp {
  const match = nginx.match(/location ~ (\S*category_slug\S*) \{/);
  assert.ok(match, "nginx.conf has the category location");
  return new RegExp(match[1]);
}

test("the category table is an nginx map with an empty default and one sorted line per merged category", () => {
  assert.equal(
    categoryMap({ "go-lint": "lint-format", captcha: "waf" }),
    ["map $category_slug $category_target {", `    default "";`, "    captcha waf;", "    go-lint lint-format;", "}", ""].join("\n"),
  );
});

test("nginx keys the category map on the slug it captures and keeps the locale and the rest of the path", () => {
  const [, source, target] = categoryMap({}).match(/map \$(\S+) \$(\S+) \{/) ?? [];
  assert.ok(source && target);
  assert.ok(nginx.includes(`(?<${source}>`));
  assert.ok(nginx.includes(`if ($${target})`));
  assert.ok(nginx.includes(`return 301 /\${category_locale}categories/$${target}/$category_rest$is_args$args;`));
});

test("the category location catches a category page and its feed in every locale, and nothing else", () => {
  const pattern = categoryLocation();
  assert.equal(pattern.exec("/categories/go-lint/")?.groups?.category_slug, "go-lint");
  assert.equal(pattern.exec("/categories/go-lint")?.groups?.category_slug, "go-lint");
  for (const locale of LOCALES.filter((one) => one !== DEFAULT_LOCALE)) {
    const groups = pattern.exec(`/${locale}/categories/go-lint/feed.xml`)?.groups;
    assert.equal(groups?.category_locale, `${locale}/`);
    assert.equal(groups?.category_slug, "go-lint");
    assert.equal(groups?.category_rest, "feed.xml");
  }
  assert.equal(pattern.test("/categories/"), false);
  assert.equal(pattern.test("/it/categories/go-lint/"), false);
  assert.equal(pattern.test("/tools/go-lint/"), false);
});
