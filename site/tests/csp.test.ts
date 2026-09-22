import assert from "node:assert/strict";
import { test } from "node:test";

import { cspDirectives } from "../src/lib/csp.ts";

function connectSrc(apiUrl: string | undefined): string | undefined {
  return cspDirectives(apiUrl).find((directive) => directive.startsWith("connect-src"));
}

test("an API under a path on the site's own origin needs only 'self'", () => {
  assert.equal(connectSrc("/api"), "connect-src 'self'");
  assert.equal(connectSrc(undefined), "connect-src 'self'");
});

test("an API on another origin is allowed by origin, without its path", () => {
  assert.equal(connectSrc("https://api.example.com/v2/"), "connect-src 'self' https://api.example.com");
});
