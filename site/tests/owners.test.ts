import assert from "node:assert/strict";
import { test } from "node:test";

import { listedOwners, loginOf } from "../src/lib/owners.ts";

const repo = (fullName: string) => ({ repo: { fullName } });

test("loginOf takes the account a repository belongs to", () => {
  assert.equal(loginOf("astral-sh/ruff"), "astral-sh");
});

test("loginOf leaves a name without a slash alone rather than returning nothing", () => {
  assert.equal(loginOf("ruff"), "ruff");
});

test("listedOwners keeps only the accounts holding more than one tool", () => {
  const tools = [repo("astral-sh/ruff"), repo("astral-sh/uv"), repo("biomejs/biome")];
  assert.deepEqual(listedOwners(tools), ["astral-sh"]);
});

test("listedOwners orders accounts by login so the sitemap does not churn", () => {
  const tools = [repo("psf/black"), repo("astral-sh/ruff"), repo("psf/requests"), repo("astral-sh/uv")];
  assert.deepEqual(listedOwners(tools), ["astral-sh", "psf"]);
});
