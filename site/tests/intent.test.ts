import assert from "node:assert/strict";
import { test } from "node:test";

import { de } from "../src/i18n/de.ts";
import { es } from "../src/i18n/es.ts";
import { en } from "../src/i18n/en.ts";
import { fr } from "../src/i18n/fr.ts";
import {
  allOpen,
  categoryDescription,
  categoryTitle,
  lowerFirst,
  targetDescription,
  targetTitle,
  toolDescription,
  toolTitle,
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

test("a tool whose repository description another tool shares is told apart by its name", () => {
  const lxd = { slug: "lxd", name: "LXD", repo: { description: "System container manager" } };
  const incus = { slug: "incus", name: "Incus", repo: { description: "System container manager " } };
  const k9s = { slug: "k9s", name: "k9s", repo: { description: "Kubernetes CLI" } };
  const bare = { slug: "bare", name: "Bare", repo: { description: null } };
  const all = [lxd, incus, k9s, bare];
  assert.equal(toolDescription(incus, all, "fallback"), "Incus: System container manager");
  assert.equal(toolDescription(lxd, all, "fallback"), "LXD: System container manager");
  assert.equal(toolDescription(k9s, all, "fallback"), "Kubernetes CLI");
  assert.equal(toolDescription(bare, all, "fallback"), "fallback");
});

function titled(terms: Terms, replaces: { tool: string; fit: "drop-in" | "full" | "partial" }[], language: string | null = "Rust") {
  return { name: "ripgrep", terms, replaces, repo: { language } } as Parameters<typeof toolTitle>[2];
}

const names: Record<string, string> = { ack: "ack", ag: "The Silver Searcher", grep: "grep" };
const nameOf = (slug: string) => names[slug] ?? slug;

test("a tool that replaces others is titled by what it replaces, best fit first, two names at most", () => {
  const tool = titled("open", [
    { tool: "grep", fit: "partial" },
    { tool: "ack", fit: "full" },
    { tool: "ag", fit: "drop-in" },
  ]);
  assert.equal(toolTitle("en", en.tool, tool, "code search", nameOf), "ripgrep: open source alternative to The Silver Searcher and ack");
  assert.equal(toolTitle("fr", fr.tool, tool, "code search", nameOf), "ripgrep : alternative open source à The Silver Searcher et ack");
});

test("a tool title says open source only when the tool is", () => {
  const tool = titled("source-available", [{ tool: "ack", fit: "full" }]);
  assert.equal(toolTitle("de", de.tool, tool, "code search", nameOf), "ripgrep: Alternative zu ack");
  assert.equal(toolTitle("es", es.tool, tool, "code search", nameOf), "ripgrep: alternativa a ack");
});

test("a tool that replaces nothing keeps its language and category title", () => {
  assert.equal(toolTitle("en", en.tool, titled("open", []), "code search", nameOf), "ripgrep: Rust for code search");
  assert.equal(toolTitle("en", en.tool, titled("open", [], null), "code search", nameOf), "ripgrep: tool for code search");
});

test("a tool title drops the second name rather than run past what a search result shows", () => {
  const long = { ...titled("open", [{ tool: "ack", fit: "full" }, { tool: "grep", fit: "full" }]), name: "A rather long tool name" };
  const wide = (slug: string) => (slug === "grep" ? "a second product with a long name" : nameOf(slug));
  assert.equal(toolTitle("en", en.tool, long, "code search", wide), "A rather long tool name: open source alternative to ack");
});

test("a single name too long for the limit still makes the title", () => {
  const tool = titled("open", [{ tool: "huge", fit: "full" }]);
  const huge = () => "x".repeat(80);
  assert.equal(toolTitle("en", en.tool, tool, "code search", huge), `ripgrep: open source alternative to ${"x".repeat(80)}`);
});
