import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { checkMigrationPage } from "../scripts/lib/migrations.ts";
import type { Tool } from "../scripts/lib/types.ts";

const valkey: Tool = {
  slug: "valkey",
  name: "Valkey",
  repository: "https://github.com/valkey-io/valkey",
  category: "key-value-store",
  file: "data/tools/valkey.yaml",
  replaces: [{ tool: "redis", fit: "drop-in", migration: "https://valkey.io/topics/migration/" }],
};

const page = (front: string, body = "## Compatibility\n\nText.\n") => `---\n${front}\n---\n\n${body}`;
const good = "reviewed: 2026-09-24\nmajors:\n  redis: 8\n  valkey: 9\nsources:\n  - https://valkey.io/topics/migration/";
const messages = (file: string, text: string, tools: Tool[] = [valkey]) =>
  checkMigrationPage(file, text, tools).map((f) => f.message);

describe("checkMigrationPage", () => {
  it("accepts a page for a replacement that has an official guide", () => {
    assert.deepEqual(messages("redis--valkey.md", page(good)), []);
  });

  it("refuses a page for a pair with no official guide, since the page must cite one", () => {
    const withoutGuide = { ...valkey, replaces: [{ tool: "redis", fit: "drop-in" as const }] };
    assert.deepEqual(messages("redis--valkey.md", page(good), [withoutGuide]), [
      "valkey gives no official migration guide for redis",
    ]);
  });

  it("refuses a page for a pair the catalog does not know", () => {
    assert.match(messages("memcached--valkey.md", page(good)).join("\n"), /does not list memcached/);
  });

  it("needs a review date and the major version of both sides, so staleness can be computed", () => {
    const found = messages("redis--valkey.md", page("reviewed: soon\nmajors:\n  redis: 8\nsources:\n  - https://valkey.io/"));
    assert.ok(found.includes("reviewed must be a YYYY-MM-DD date"));
    assert.ok(found.includes("majors must give the major version of exactly redis and valkey"));
  });

  it("needs a source and some content", () => {
    const found = messages("redis--valkey.md", page("reviewed: 2026-09-24\nmajors:\n  redis: 8\n  valkey: 9\nsources: []", ""));
    assert.ok(found.includes("sources must list at least one https URL"));
    assert.ok(found.includes("the page has no content"));
  });

  it("refuses a file name that does not name two slugs", () => {
    assert.ok(messages("redis-to-valkey.md", page(good)).includes("the file name must be {from}--{to}.md with two slugs"));
  });
});
