import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Etags } from "../scripts/lib/etags.ts";
import { createGitHub, GitHubError } from "../scripts/lib/github.ts";

function answer(status: number, body: unknown, headers: Record<string, string> = {}): Response {
  return new Response(status === 304 ? null : JSON.stringify(body), { status, headers });
}

describe("Etags", () => {
  it("keeps what it was given and hands it back", () => {
    const etags = Etags.empty();
    etags.write("repo", { etag: "W/\"1\"", body: { stars: 3 } });
    assert.deepEqual(etags.read("repo"), { etag: "W/\"1\"", body: { stars: 3 } });
  });

  it("drops entries nothing asked for this run, so a removed tool stops being carried", () => {
    const etags = Etags.parse(JSON.stringify({ kept: { etag: "a", body: 1 }, gone: { etag: "b", body: 2 } }));
    etags.read("kept");
    assert.deepEqual(Object.keys(etags.toJSON()), ["kept"]);
  });

  it("survives a cache that is not the shape it expects", () => {
    assert.deepEqual(Etags.parse("not json").toJSON(), {});
    assert.deepEqual(Etags.parse("[1,2]").toJSON(), {});
    const partial = Etags.parse(JSON.stringify({ good: { etag: "a", body: 1 }, bad: { body: 2 } }));
    assert.equal(partial.read("good")?.etag, "a");
    assert.equal(partial.read("bad"), undefined);
  });
});

describe("createGitHub with a cache", () => {
  it("offers the known etag and answers a 304 from the cache", async () => {
    const etags = Etags.empty();
    const sent: Record<string, string>[] = [];
    let calls = 0;
    const gh = createGitHub("t", async (_url, init) => {
      sent.push(init?.headers as Record<string, string>);
      calls += 1;
      return calls === 1
        ? answer(200, { stars: 7 }, { etag: 'W/"abc"' })
        : answer(304, null);
    }, etags);

    assert.deepEqual(await gh.get("/repos/a/b"), { stars: 7 });
    assert.equal(sent[0]?.["if-none-match"], undefined);

    assert.deepEqual(await gh.get("/repos/a/b"), { stars: 7 });
    assert.equal(sent[1]?.["if-none-match"], 'W/"abc"');
  });

  it("tells two accepts of one path apart, since they answer differently", async () => {
    const etags = Etags.empty();
    const sent: Record<string, string>[] = [];
    const gh = createGitHub(undefined, async (_url, init) => {
      sent.push(init?.headers as Record<string, string>);
      return answer(200, { n: sent.length }, { etag: `W/"${sent.length}"` });
    }, etags);

    await gh.get("/repos/a/b/stargazers");
    await gh.get("/repos/a/b/stargazers", "application/vnd.github.star+json");
    assert.equal(sent[1]?.["if-none-match"], undefined);

    await gh.get("/repos/a/b/stargazers");
    assert.equal(sent[2]?.["if-none-match"], 'W/"1"');
  });

  it("forgets a path GitHub stopped serving, so a 304 cannot resurrect it", async () => {
    const etags = Etags.empty();
    etags.write("application/vnd.github+json /repos/a/b", { etag: 'W/"old"', body: { stars: 1 } });
    const gh = createGitHub(undefined, async () => answer(404, null), etags);

    assert.equal(await gh.get("/repos/a/b"), null);
    assert.deepEqual(etags.toJSON(), {});
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
