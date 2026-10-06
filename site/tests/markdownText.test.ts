import assert from "node:assert/strict";
import { test } from "node:test";

import { markdownText, markdownUrl } from "../src/lib/markdownText.ts";

test("plain prose reads as it was written", () => {
  assert.equal(markdownText("Reimplements Flake8 and many of its popular plugins, v1.2.3."), "Reimplements Flake8 and many of its popular plugins, v1.2.3.");
});

test("a note cannot open a link, an image, HTML or code", () => {
  const out = markdownText("[click](javascript:alert(1)) ![x](https://evil.example/x.png) <img src=x onerror=alert(1)> `code` *bold* _it_");
  assert.equal(
    out,
    "\\[click\\](javascript:alert(1)) !\\[x\\](https://evil.example/x.png) \\<img src=x onerror=alert(1)\\> \\`code\\` \\*bold\\* \\_it\\_",
  );
  assert.ok(!/(^|[^\\])\[/.test(out));
  assert.ok(!/(^|[^\\])</.test(out));
});

test("a note cannot start a heading, a quote, a list or front matter, even after a line break", () => {
  assert.equal(markdownText("# Heading"), "\\# Heading");
  assert.equal(markdownText("> quoted"), "\\> quoted");
  assert.equal(markdownText("- item"), "\\- item");
  assert.equal(markdownText("1. item"), "1\\. item");
  assert.equal(markdownText("---"), "\\---");
  assert.equal(markdownText("fine\n---\ntitle: injected\n# Owned"), "fine --- title: injected # Owned");
});

test("control and invisible characters are stripped, so nothing is hidden or reordered", () => {
  assert.equal(markdownText("a\u0000b\u001bc d\r\ne"), "a b c d e");
  assert.equal(markdownText("safe‮exe.txt​"), "safeexe.txt");
});

test("a link stays a link, but cannot carry markdown or HTML", () => {
  assert.equal(markdownUrl("https://example.com/docs/ci"), "https://example.com/docs/ci");
  assert.equal(markdownUrl("https://example.com/a](javascript:x)"), "https://example.com/a%5D(javascript:x)");
  assert.equal(markdownUrl("https://example.com/<script>"), "https://example.com/%3Cscript%3E");
  assert.equal(markdownUrl("https://example.com/?q=`x`"), "https://example.com/?q=%60x%60");
  assert.equal(markdownUrl("javascript:alert(1)"), "");
  assert.equal(markdownUrl("not a url"), "");
});
