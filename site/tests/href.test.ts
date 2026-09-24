import assert from "node:assert/strict";
import { test } from "node:test";

import { webHref } from "../src/lib/href.ts";

test("webHref keeps http and https links as they are", () => {
  for (const url of ["https://example.com/docs", "http://example.com", "HTTPS://EXAMPLE.COM"]) {
    assert.equal(webHref(url), url);
  }
});

test("webHref refuses every other scheme, including ones a browser would still run", () => {
  for (const url of [
    "javascript:alert(1)",
    "JavaScript:alert(1)",
    " javascript:alert(1)",
    "java\tscript:alert(1)",
    "data:text/html,<script>alert(1)</script>",
    "vbscript:msgbox(1)",
    "//example.com",
    "example.com",
    "",
  ]) {
    assert.equal(webHref(url), null, url);
  }
  assert.equal(webHref(null), null);
  assert.equal(webHref(undefined), null);
});
