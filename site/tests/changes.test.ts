import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { getRssString } from "@astrojs/rss";

import { INACTIVE_DAYS } from "../../scripts/lib/rules.ts";
import { type CatalogEvent, EVENT_ORDER, type EventType } from "../../scripts/lib/types.ts";
import { de } from "../src/i18n/de.ts";
import { plural } from "../src/i18n/index.ts";
import { en } from "../src/i18n/en.ts";
import { es } from "../src/i18n/es.ts";
import { fr } from "../src/i18n/fr.ts";
import {
  CHANGES_FEED_SIZE,
  changeChannel,
  changeDays,
  changeEntries,
  eventsOfCategory,
  eventsOfTool,
  sentence,
  sentenceText,
  sourceUrl,
} from "../src/lib/changes.ts";

const strings = en.changes;

const DASHES = new RegExp(`[${String.fromCharCode(0x2013, 0x2014)}]`);

const archived = (slug: string, at: string, commit: string | null = null): CatalogEvent => ({ type: "archived", slug, at, commit });
const released = (slug: string, at: string, to: string): CatalogEvent => ({ type: "released", slug, at, commit: "abc", from: null, to });

const TOOLS = [
  { slug: "valkey", name: "Valkey", category: "key-value-store" },
  { slug: "redis", name: "Redis", category: "key-value-store" },
  { slug: "vite", name: "Vite", category: "bundler" },
];
const toolOf = (slug: string) => TOOLS.find((t) => t.slug === slug) ?? null;

const added = (slug: string, at: string): CatalogEvent => ({ type: "added", slug, at, commit: "abc" });

function channel(events: CatalogEvent[], link = (path: string) => path, groupAdditions = false) {
  const site = "https://awesome-alternatives.com";
  return changeChannel({ title: "t", description: "d", site, events, groupAdditions, locale: "en", strings, toolOf, link });
}

describe("slicing the stream", () => {
  const events = [archived("redis", "2026-09-24T03:00:00.000Z"), released("valkey", "2026-09-25T03:00:00.000Z", "8.1.0"), released("vite", "2026-09-25T04:00:00.000Z", "v8")];

  test("a tool's feed holds only that tool", () => {
    assert.deepEqual(
      eventsOfTool(events, "valkey").map((e) => e.slug),
      ["valkey"],
    );
  });

  test("a category's feed holds every tool listed in it and nothing else", () => {
    assert.deepEqual(eventsOfCategory(events, TOOLS, "key-value-store").map((e) => e.slug).sort(), ["redis", "valkey"]);
  });

  test("the page groups by UTC day, newest day and newest event first", () => {
    assert.deepEqual(
      changeDays(events).map(({ day, entries }) => [day, entries.map((e) => (e.kind === "event" ? e.event.slug : "additions"))]),
      [
        ["2026-09-25", ["vite", "valkey"]],
        ["2026-09-24", ["redis"]],
      ],
    );
  });
});

describe("grouping a day's additions", () => {
  const day = [
    added("valkey", "2026-09-24T10:00:00.000Z"),
    released("vite", "2026-09-24T08:00:00.000Z", "v8"),
    added("redis", "2026-09-24T12:00:00.000Z"),
    archived("redis", "2026-09-24T06:00:00.000Z"),
    added("vite", "2026-09-23T10:00:00.000Z"),
    released("redis", "2026-09-23T09:00:00.000Z", "v7"),
  ];

  test("collapses several additions into one entry after that day's other changes, and leaves a lone one as it is", () => {
    assert.deepEqual(
      changeEntries(day, true).map((e) => (e.kind === "event" ? `${e.day} ${e.event.type} ${e.event.slug}` : `${e.day} ${e.slugs.join("+")} at ${e.at}`)),
      [
        "2026-09-24 released vite",
        "2026-09-24 archived redis",
        "2026-09-24 redis+valkey at 2026-09-24T12:00:00.000Z",
        "2026-09-23 added vite",
        "2026-09-23 released redis",
      ],
    );
  });

  test("keeps one entry per event when asked not to group, as a tool feed does", () => {
    assert.equal(changeEntries(day, false).length, day.length);
  });

  test("counts a grouped line as one entry against the page limit, so additions cannot push real changes out", () => {
    const flood = Array.from({ length: 300 }, (_, i) => added(`t${i}`, "2026-09-25T03:00:00.000Z"));
    const older = [archived("redis", "2026-09-24T03:00:00.000Z"), archived("vite", "2026-09-23T03:00:00.000Z")];
    const entries = changeDays([...flood, ...older], 2).flatMap((d) => d.entries);
    assert.deepEqual(
      entries.map((e) => (e.kind === "event" ? e.event.type : `${e.slugs.length} additions`)),
      ["300 additions", "archived"],
    );
  });

  test("gives the global feed one item per day of additions, with a guid that stays the same", async () => {
    const { items } = channel(day, (path) => `/de${path}`, true);
    const [grouped] = items.filter((item) => item.title === "2 tools added");
    assert.equal(grouped?.link, "/de/changes/#2026-09-24");
    assert.equal(
      grouped?.description,
      "Redis, Valkey. commits of the day: https://github.com/awesome-alternatives/awesome-alternatives/commits/main/generated/events.json?since=2026-09-24&until=2026-09-24",
    );
    assert.equal(grouped?.customData, '<guid isPermaLink="false">awesome-alternatives:added:2026-09-24</guid>');
    const later = channel([...day, added("vite2", "2026-09-24T23:00:00.000Z")], (path) => path, true).items;
    assert.ok(later.some((item) => item.customData === grouped?.customData && item.title === "3 tools added"));
    assert.equal(items.filter((item) => item.title === "Vite joined the catalog.").length, 1);
    const xml = await getRssString(channel(day, (path) => path, true));
    assert.equal([...xml.matchAll(/<item>/g)].length, 5);
  });

  test("names the count with each language's plural", () => {
    for (const [messages, locale] of [[en, "en"], [fr, "fr"], [es, "es"], [de, "de"]] as const) {
      const input = { title: "t", description: "d", site: "https://x.test", events: day, groupAdditions: true, locale };
      const { items } = changeChannel({ ...input, strings: messages.changes, toolOf, link: (p) => p });
      assert.ok(items.some((item) => item.title === messages.changes.addedGroup.other.replace("{n}", "2")), locale);
    }
    assert.equal(plural("fr", fr.changes.addedGroup, 1), "1 outil ajouté");
    assert.equal(plural("de", de.changes.addedMore, 1), "und 1 weiteres");
  });
});

describe("sentences", () => {
  test("wraps the tool name so the page can link it, wherever the language puts it", () => {
    const parts = sentence(released("vite", "2026-09-25T00:00:00.000Z", "v8.3.1"), de.changes, "Vite");
    assert.deepEqual(parts, { before: "", name: "Vite", after: " hat v8.3.1 veröffentlicht." });
  });

  test("names a missing licence instead of printing null", () => {
    const event: CatalogEvent = { type: "license-changed", slug: "x", at: "2026-09-25T00:00:00.000Z", commit: null, from: null, to: "MIT" };
    assert.equal(sentenceText(sentence(event, strings, "X")), "X changed licence from none to MIT.");
  });

  test("states the inactivity rule the catalog applies", () => {
    const event: CatalogEvent = { type: "inactive", slug: "x", at: "2026-09-25T00:00:00.000Z", commit: null };
    assert.equal(sentenceText(sentence(event, strings, "X")), `X has had no push for ${INACTIVE_DAYS} days.`);
  });

  test("every locale has a sentence for every event type, and each names the tool once", () => {
    for (const messages of [en, fr, es, de]) {
      for (const type of Object.keys(EVENT_ORDER) as EventType[]) {
        const template = messages.changes.events[type];
        assert.equal(template.split("{name}").length, 2, `${messages.locale.name} ${type}`);
        assert.doesNotMatch(template, DASHES, `${messages.locale.name} ${type}`);
      }
    }
  });
});

describe("sourceUrl", () => {
  test("links a resolved event to its commit and a pending one to that day's commits", () => {
    assert.equal(
      sourceUrl({ at: "2026-09-25T03:00:00.000Z", commit: "abc123" }),
      "https://github.com/awesome-alternatives/awesome-alternatives/commit/abc123",
    );
    assert.equal(
      sourceUrl({ at: "2026-09-25T03:00:00.000Z", commit: null }),
      "https://github.com/awesome-alternatives/awesome-alternatives/commits/main/generated/events.json?since=2026-09-25&until=2026-09-25",
    );
  });
});

describe("change feed", () => {
  test("renders valid RSS, newest first, each item with its own guid and a link inside the locale", async () => {
    const events = [archived("redis", "2026-09-24T03:00:00.000Z"), released("redis", "2026-09-25T03:00:00.000Z", "v8")];
    const xml = await getRssString(channel(events, (path) => `/fr${path}`));
    const items = [...xml.matchAll(/<item>(.*?)<\/item>/gs)].map((m) => m[1] ?? "");
    assert.equal(items.length, 2);
    assert.match(items[0] ?? "", /<title>Redis released v8\.<\/title>/);
    assert.match(items[0] ?? "", /<link>https:\/\/awesome-alternatives\.com\/fr\/tools\/redis\/<\/link>/);
    const guids = items.map((item) => /<guid isPermaLink="false">([^<]+)<\/guid>/.exec(item)?.[1]);
    assert.deepEqual(guids, ["awesome-alternatives:released:redis:2026-09-25T03:00:00.000Z", "awesome-alternatives:archived:redis:2026-09-24T03:00:00.000Z"]);
    assert.ok(!xml.includes('isPermaLink="true"'));
  });

  test("escapes what comes from GitHub", async () => {
    const xml = await getRssString(channel([released("vite", "2026-09-25T03:00:00.000Z", "v<1>&co")]));
    assert.match(xml, /Vite released v&lt;1&gt;&amp;co\./);
    assert.doesNotMatch(xml, /v<1>/);
  });

  test("points a tool that left the catalog at the changes page", () => {
    const [item] = channel([{ type: "removed", slug: "gone", at: "2026-09-25T00:00:00.000Z", commit: null }]).items;
    assert.equal(item?.link, "/changes/");
    assert.equal(item?.title, "gone left the catalog.");
  });

  test("stops at its size", () => {
    const events = Array.from({ length: CHANGES_FEED_SIZE + 5 }, (_, i) => archived(`t${i}`, new Date(Date.UTC(2026, 0, 1 + i)).toISOString()));
    assert.equal(channel(events).items.length, CHANGES_FEED_SIZE);
  });
});
