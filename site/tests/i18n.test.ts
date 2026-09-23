import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { de } from "../src/i18n/de.ts";
import { en } from "../src/i18n/en.ts";
import { es } from "../src/i18n/es.ts";
import { fr } from "../src/i18n/fr.ts";
import { format, LOCALES, localeOf, messages, pathFor, plural, stripLocale } from "../src/i18n/index.ts";
import { FLAG_CODES } from "../../scripts/lib/types.ts";

describe("pathFor", () => {
  test("leaves the default locale unprefixed and prefixes the others", () => {
    assert.equal(pathFor("en", "/tools/ferrflow/"), "/tools/ferrflow/");
    assert.equal(pathFor("fr", "/tools/ferrflow/"), "/fr/tools/ferrflow/");
    assert.equal(pathFor("de", "/"), "/de/");
    assert.equal(pathFor("en", "/"), "/");
  });

  test("switches locale rather than stacking prefixes", () => {
    assert.equal(pathFor("es", "/fr/tools/ferrflow/"), "/es/tools/ferrflow/");
    assert.equal(pathFor("en", "/de/about/"), "/about/");
  });

  test("leaves a fragment at the end, where the browser can act on it", () => {
    assert.equal(pathFor("fr", "/about/#signed"), "/fr/about/#signed");
    assert.equal(pathFor("en", "/about/#signed"), "/about/#signed");
    assert.equal(pathFor("de", "/#browse"), "/de/#browse");
    assert.equal(pathFor("es", "/tools/?q=rust"), "/es/tools/?q=rust");
  });
});

test("every locale declares a writing direction the html element can use", () => {
  for (const locale of LOCALES) {
    const dir = messages(locale).locale.dir;
    assert.ok(dir === "ltr" || dir === "rtl", `${locale} declares ${dir}`);
  }
});

describe("localeOf", () => {
  test("reads the locale from the first segment, defaulting to English", () => {
    assert.equal(localeOf("/fr/about/"), "fr");
    assert.equal(localeOf("/about/"), "en");
    assert.equal(localeOf("/tools/de/"), "en");
    assert.equal(localeOf("/"), "en");
  });
});

describe("stripLocale", () => {
  test("removes a locale segment and keeps a path that has none", () => {
    assert.equal(stripLocale("/de/licenses/mit/"), "/licenses/mit/");
    assert.equal(stripLocale("/licenses/mit/"), "/licenses/mit/");
    assert.equal(stripLocale("/fr/"), "/");
  });
});

describe("format", () => {
  test("substitutes known tokens and leaves unknown ones alone", () => {
    assert.equal(format("{count} tools in {name}", { count: 3, name: "Rust" }), "3 tools in Rust");
    assert.equal(format("{missing} stays"), "{missing} stays");
  });
});

describe("plural", () => {
  test("follows each language's own rule rather than a shared one", () => {
    const tools = { one: "{n} outil", other: "{n} outils" };
    assert.equal(plural("fr", tools, 1), "1 outil");
    assert.equal(plural("fr", tools, 0), "0 outil");
    assert.equal(plural("fr", tools, 2), "2 outils");

    const english = en.listing.toolCount;
    assert.equal(plural("en", english, 0), "0 tools");
    assert.equal(plural("en", english, 1), "1 tool");
  });

  test("German and Spanish treat zero as plural, French does not", () => {
    assert.equal(plural("de", de.listing.toolCount, 0), format(de.listing.toolCount.other, { n: 0 }));
    assert.equal(plural("es", es.listing.toolCount, 0), format(es.listing.toolCount.other, { n: 0 }));
    assert.equal(plural("fr", fr.listing.toolCount, 0), format(fr.listing.toolCount.one, { n: 0 }));
  });
});

describe("the catalogs", () => {
  test("every flag a tool can carry is labelled in every locale", () => {
    const labelled = FLAG_CODES.filter((code) => code !== "archived").sort();
    for (const locale of LOCALES) {
      assert.deepEqual(Object.keys(messages(locale).islands.flag).sort(), labelled, locale);
    }
  });

  test("every locale declares its own html lang", () => {
    const langs = LOCALES.map((locale) => messages(locale).locale.htmlLang);
    assert.deepEqual(langs, [...LOCALES]);
    assert.equal(new Set(langs).size, LOCALES.length);
  });

  test("every locale carries every string, so a missing one fails the build instead of rendering English", () => {
    const leaves = (value: unknown, at: string): string[] => {
      if (typeof value !== "object" || value === null) return [`${at}=${typeof value}`];
      if (Array.isArray(value)) return [`${at}[]=${value.length}`];
      return Object.entries(value).flatMap(([key, child]) => leaves(child, `${at}.${key}`)).sort();
    };
    const english = leaves(en, "");
    assert.ok(english.includes(".compare.relationLabel=string"));
    for (const locale of LOCALES) {
      assert.deepEqual(leaves(messages(locale), ""), english, locale);
    }
  });

  test("no translated string drops a placeholder the English one carries", () => {
    const tokens = (value: string) => [...value.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
    const walk = (english: unknown, other: unknown, path: string): void => {
      if (typeof english === "string") {
        assert.deepEqual(tokens(english), tokens(other as string), path);
        return;
      }
      if (Array.isArray(english)) return;
      if (typeof english !== "object" || english === null) return;
      for (const [key, value] of Object.entries(english)) {
        walk(value, (other as Record<string, unknown>)[key], `${path}.${key}`);
      }
    };
    for (const locale of LOCALES.filter((l) => l !== "en")) {
      walk(en, messages(locale), locale);
    }
  });
});
