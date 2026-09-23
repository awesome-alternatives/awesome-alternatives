import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { DEFAULT_LOCALE, LOCALES } from "../src/i18n/index.ts";
import { pairs } from "../src/lib/catalog.ts";
import { pairMap, reversedPairs } from "../src/lib/redirects.ts";

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
      "map_hash_bucket_size 64;",
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

test("the hash holds the longest key, so nginx does not refuse the map at startup", () => {
  const long = (length: number) => "x".repeat(length);
  assert.match(pairMap(reversedPairs([pair(long(30), long(33))])), /^map_hash_bucket_size 128;/);
  assert.match(pairMap(reversedPairs([pair("alacritty", "kitty")])), /^map_hash_bucket_size 64;/);
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
