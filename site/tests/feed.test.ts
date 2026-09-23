import assert from "node:assert/strict";
import { test } from "node:test";

import type { EnrichedTool } from "../../scripts/lib/types.ts";
import { en } from "../src/i18n/en.ts";
import { FEED_SIZE, type FeedStrings, feedItem, newestTools } from "../src/lib/feed.ts";

const STRINGS: FeedStrings = en.feed;

function tool(slug: string, addedAt: string, description: string | null = null, replaces: string[] = []): EnrichedTool {
  return {
    slug,
    name: slug.toUpperCase(),
    repository: `https://github.com/example/${slug}`,
    category: "release-automation",
    replaces: replaces.map((t) => ({ tool: t, fit: "full" })),
    affiliation: null,
    path: null,
    addedAt,
    repo: {
      fullName: `example/${slug}`,
      description,
      homepage: null,
      language: null,
      license: "MIT",
      stars: 0,
      forks: 0,
      topics: [],
      archived: false,
      fork: false,
      private: false,
      createdAt: "2020-01-01T00:00:00Z",
      pushedAt: "2026-09-01T00:00:00Z",
      defaultBranch: "main",
    },
    release: null,
    releases: [],
    maintainerVerified: false,
    flags: [],
    terms: "open",
  };
}

test("the feed lists the newest additions first, ties broken by slug", () => {
  const tools = [
    tool("b", "2026-09-01T00:00:00.000Z"),
    tool("c", "2026-09-10T00:00:00.000Z"),
    tool("a", "2026-09-01T00:00:00.000Z"),
  ];
  assert.deepEqual(
    newestTools(tools).map((t) => t.slug),
    ["c", "a", "b"],
  );
});

test("the feed stops at its size and keeps the most recent ones", () => {
  const tools = Array.from({ length: FEED_SIZE + 5 }, (_, i) =>
    tool(`t${String(i).padStart(2, "0")}`, new Date(Date.UTC(2026, 0, 1 + i)).toISOString()),
  );
  const newest = newestTools(tools);
  assert.equal(newest.length, FEED_SIZE);
  assert.equal(newest.at(-1)?.slug, "t05");
});

test("an item links to the tool page and names what it replaces", () => {
  const item = feedItem(
    tool("zellij", "2026-09-22T16:48:22.000Z", "A terminal workspace.", ["tmux", "screen"]),
    (slug) => (slug === "tmux" ? "tmux" : "GNU Screen"),
    STRINGS,
  );
  assert.equal(item.link, "/tools/zellij/");
  assert.equal(item.pubDate.toISOString(), "2026-09-22T16:48:22.000Z");
  assert.equal(item.description, "A terminal workspace. Replaces tmux, GNU Screen.");
});

test("a description without a final stop still reads as a sentence before the replacements", () => {
  const item = feedItem(tool("vault", "2026-09-22T00:00:00.000Z", "Secrets management ", ["x"]), () => "X", STRINGS);
  assert.equal(item.description, "Secrets management. Replaces X.");
});

test("an item without a repository description still says something", () => {
  assert.equal(feedItem(tool("x", "2026-09-22T00:00:00.000Z"), (s) => s, STRINGS).description, "X joined the catalog.");
});

test("an item in a translated feed links inside that locale", () => {
  const item = feedItem(
    tool("zellij", "2026-09-22T00:00:00.000Z", "A terminal workspace."),
    (s) => s,
    STRINGS,
    (path) => `/fr${path}`,
  );
  assert.equal(item.link, "/fr/tools/zellij/");
});
