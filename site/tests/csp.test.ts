import assert from "node:assert/strict";
import { test } from "node:test";

import { cspDirectives } from "../src/lib/csp.ts";

function connectSrc(apiUrl: string | undefined): string | undefined {
  return cspDirectives(apiUrl).find((directive) => directive.startsWith("connect-src"));
}

test("an API under a path on the site's own origin needs only 'self' besides the contact endpoint", () => {
  assert.equal(connectSrc("/api"), "connect-src 'self' https://api.ferrlabs.com");
  assert.equal(connectSrc(undefined), "connect-src 'self' https://api.ferrlabs.com");
});

test("an API on another origin is allowed by origin, without its path", () => {
  assert.equal(
    connectSrc("https://api.example.com/v2/"),
    "connect-src 'self' https://api.example.com https://api.ferrlabs.com",
  );
});
