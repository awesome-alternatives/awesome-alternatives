import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createGitHub, GitHubError } from "../scripts/lib/github.ts";

function recording(response: () => Response) {
  const requests: { url: string; headers: Record<string, string> }[] = [];
  const fetchImpl: typeof fetch = async (input, init) => {
    requests.push({ url: String(input), headers: init?.headers as Record<string, string> });
    return response();
  };
  return { requests, fetchImpl };
}

describe("createGitHub", () => {
  it("answers null for a path GitHub does not serve", async () => {
    const gh = createGitHub(undefined, async () => new Response("{}", { status: 404 }));
    assert.equal(await gh.get("/repos/a/b"), null);
  });

  it("returns the decoded body of a successful answer, asked on the REST API with the token", async () => {
    const { requests, fetchImpl } = recording(() => Response.json({ full_name: "a/b", stargazers_count: 7 }));
    const gh = createGitHub("ghs_x", fetchImpl);
    assert.deepEqual(await gh.get("/repos/a/b"), { full_name: "a/b", stargazers_count: 7 });
    assert.equal(requests[0]?.url, "https://api.github.com/repos/a/b");
    assert.equal(requests[0]?.headers.authorization, "Bearer ghs_x");
  });

  it("sends no authorization header without a token", async () => {
    const { requests, fetchImpl } = recording(() => Response.json({}));
    await createGitHub(undefined, fetchImpl).get("/repos/a/b");
    assert.equal(requests[0]?.headers.authorization, undefined);
  });

  it("throws on any other failure instead of reading it as a missing repository", async () => {
    for (const status of [401, 403, 451, 500, 502]) {
      const gh = createGitHub(undefined, async () => new Response("x".repeat(500), { status }));
      await assert.rejects(() => gh.get("/repos/a/b"), (error: unknown) => {
        assert.ok(error instanceof GitHubError, `${status}`);
        assert.equal(error.status, status);
        assert.equal(error.path, "/repos/a/b");
        assert.equal(error.message, `GitHub ${status} on /repos/a/b: ${"x".repeat(200)}`);
        return true;
      });
    }
  });

  it("keeps the rate-limit message when the budget is gone", async () => {
    const gh = createGitHub(undefined, async () =>
      new Response("no", { status: 403, headers: { "x-ratelimit-remaining": "0" } }),
    );
    await assert.rejects(() => gh.get("/repos/a/b"), (error: unknown) => {
      assert.ok(error instanceof GitHubError);
      assert.equal(error.status, 403);
      assert.match(error.message, /rate limit exhausted/);
      return true;
    });
  });

  it("reports GitHub's own words on a refusal while budget is left", async () => {
    const gh = createGitHub(undefined, async () =>
      new Response("Resource not accessible by integration", {
        status: 403,
        headers: { "x-ratelimit-remaining": "4999" },
      }),
    );
    await assert.rejects(() => gh.get("/repos/a/b"), (error: unknown) => {
      assert.ok(error instanceof GitHubError);
      assert.match(error.message, /Resource not accessible by integration/);
      assert.doesNotMatch(error.message, /rate limit/);
      return true;
    });
  });
});
