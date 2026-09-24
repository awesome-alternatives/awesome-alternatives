import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createGitHub, GitHubError } from "../scripts/lib/github.ts";

describe("createGitHub", () => {
  it("answers null for a path GitHub does not serve", async () => {
    const gh = createGitHub(undefined, async () => new Response("{}", { status: 404 }));
    assert.equal(await gh.get("/repos/a/b"), null);
  });

  it("keeps the rate-limit message when the budget is gone", async () => {
    const gh = createGitHub(undefined, async () =>
      new Response("no", { status: 403, headers: { "x-ratelimit-remaining": "0" } }),
    );
    await assert.rejects(() => gh.get("/repos/a/b"), (error: unknown) => {
      assert.ok(error instanceof GitHubError);
      assert.match(error.message, /rate limit exhausted/);
      return true;
    });
  });
});
