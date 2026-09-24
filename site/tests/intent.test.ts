import assert from "node:assert/strict";
import { test } from "node:test";

import { de } from "../src/i18n/de.ts";
import { en } from "../src/i18n/en.ts";
import { fr } from "../src/i18n/fr.ts";
import {
  allOpen,
  categoryDescription,
  categoryTitle,
  lowerFirst,
  targetDescription,
  targetTitle,
} from "../src/lib/intent.ts";
import type { Terms } from "../src/lib/types.ts";

function alt(name: string, terms: Terms, fit: "drop-in" | "full" = "full", language: string | null = "Rust") {
  return { name, terms, replaces: [{ tool: "redis", fit }], repo: { language } } as Parameters<typeof targetTitle>[3][number];
}

test("a title says open source only when every alternative on the page is", () => {
  const open = [alt("Valkey", "open"), alt("KeyDB", "open")];
  assert.equal(targetTitle("en", en.target, "Redis", open), "2 open source alternatives to Redis");
  const mixed = [...open, alt("Dragonfly", "source-available")];
  assert.equal(targetTitle("en", en.target, "Redis", mixed), "3 alternatives to Redis");
});

test("a single alternative reads in the singular, in each language's own wording", () => {
  assert.equal(targetTitle("en", en.target, "Moment", [alt("Luxon", "open")]), "1 open source alternative to Moment");
  assert.equal(targetTitle("fr", fr.target, "Moment", [alt("Luxon", "open")]), "1 alternative open source à Moment");
  assert.equal(targetTitle("de", de.target, "Moment", [alt("Luxon", "open")]), "1 Open-Source-Alternative zu Moment");
});

test("the description names the drop-in alternatives when there are any", () => {
  const tools = [alt("Valkey", "open", "drop-in"), alt("KeyDB", "open"), alt("Dragonfly", "source-available", "full", "C++")];
  const text = targetDescription(en.target, "Redis", "redis", tools);
  assert.match(text, /^3 alternatives to Redis, in Rust, C\+\+\./);
  assert.ok(text.endsWith("Drop-in: Valkey."));
  assert.ok(!targetDescription(en.target, "Redis", "redis", [alt("KeyDB", "open")]).includes("Drop-in"));
});

test("a category of services you run is titled by what people search for", () => {
  const tools = [{ terms: "open" as const }, { terms: "open-core" as const }];
  const analytics = { name: "Web analytics", selfHost: true };
  assert.equal(categoryTitle("en", en.category, analytics, tools), "Self-hosted web analytics: 2 tools");
  assert.equal(categoryTitle("en", en.category, { name: "JSON processors" }, [{ terms: "open" }]), "JSON processors: 1 open source tool");
  assert.equal(categoryTitle("en", en.category, { name: "Team chat" }, tools), "Team chat: 2 tools");
  assert.match(
    categoryDescription(en.category, { description: "Privacy-friendly site analytics.", selfHost: true }, 2),
    /runs on your own server/,
  );
});

test("an acronym keeps its capitals when a name moves inside a sentence", () => {
  assert.equal(lowerFirst("Web analytics"), "web analytics");
  assert.equal(lowerFirst("AI chat interfaces"), "AI chat interfaces");
  assert.equal(lowerFirst("API clients"), "API clients");
});

test("an empty list is never called open source", () => {
  assert.equal(allOpen([]), false);
});
