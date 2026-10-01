import assert from "node:assert/strict";
import { test } from "node:test";

import { canonicalForTool } from "../src/lib/canonical.ts";
import { alternativesCard, missingImages, namesList, socialImagePath, toolCard } from "../src/lib/socialImage.ts";

test("a page's image sits under /og at its canonical path, so every locale shares one file", () => {
  assert.equal(socialImagePath("/alternatives/slack/"), "/og/alternatives/slack.png");
  assert.equal(socialImagePath("/migrate/pip/uv/"), "/og/migrate/pip/uv.png");
});

test("a tool that has alternatives uses the image of the alternatives page it canonicalises to", () => {
  assert.equal(socialImagePath(canonicalForTool("ripgrep", 2)), "/og/alternatives/ripgrep.png");
  assert.equal(socialImagePath(canonicalForTool("zed", 0)), "/og/tools/zed.png");
});

test("names are listed in full up to three, then counted", () => {
  assert.equal(namesList(["Zulip"]), "Zulip");
  assert.equal(namesList(["Mattermost", "Zulip"]), "Mattermost and Zulip");
  assert.equal(namesList(["Mattermost", "Rocket.Chat", "Zulip"]), "Mattermost, Rocket.Chat and Zulip");
  assert.equal(namesList(["A", "B", "C", "D", "E"]), "A, B, C and 2 more");
});

test("a tool card leaves out what the catalog does not know instead of printing empty facts", () => {
  const card = toolCard({ name: "entr", repo: { stars: 5200, language: null, license: null } }, "file watchers", []);
  assert.deepEqual(card.lines, ["5.2k stars"]);
  const replacing = toolCard({ name: "yazi", repo: { stars: 31200, language: "Rust", license: "MIT" } }, "file managers", ["ranger"]);
  assert.deepEqual(replacing.lines, ["Replaces ranger", "31k stars, Rust, MIT"]);
});

test("an alternatives card with a single tool names it rather than counting one tool", () => {
  assert.deepEqual(alternativesCard("ripgrep", ["ugrep"]).lines, ["ugrep"]);
  assert.deepEqual(alternativesCard("Slack", ["A", "B"]).lines, ["2 tools: A and B"]);
});

test("the build check reports a page whose social image was not written, and ignores pages without one", () => {
  const page = (path: string, image?: string) => ({
    path,
    html: image ? `<meta property="og:image" content="https://awesome-alternatives.com${image}" />` : "<title>x</title>",
  });
  const written = new Set(["/og/tools/zed.png"]);
  assert.deepEqual(
    missingImages([page("/tools/zed/", "/og/tools/zed.png"), page("/tools/gone/", "/og/tools/gone.png"), page("/about/")], (p) =>
      written.has(p),
    ),
    [{ page: "/tools/gone/", image: "/og/tools/gone.png" }],
  );
});
