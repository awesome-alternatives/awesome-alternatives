import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { checkCapabilityDocs, checkHomepage, checkMigrations, githubContentsApi, unreachable } from "../scripts/lib/links.ts";

const product = { slug: "closed", homepage: "https://example.com/" };
const answering = (status: number) => async (url: string) => (status < 400 ? null : `${url} answered ${status}`);

describe("checkHomepage", () => {
  it("passes a homepage that answers", async () => {
    assert.deepEqual(await checkHomepage(product, answering(200)), []);
  });

  it("warns rather than fails on an error status, since bot walls answer 403 to scripts", async () => {
    const findings = await checkHomepage(product, answering(403));
    assert.deepEqual(
      findings.map((f) => [f.severity, f.code]),
      [["warning", "homepage-unreachable"]],
    );
    assert.match(findings[0]?.message ?? "", /403/);
  });

  it("warns when the request itself fails", async () => {
    const failing = async (url: string) => `${url} did not resolve: getaddrinfo ENOTFOUND`;
    const [finding] = await checkHomepage(product, failing);
    assert.equal(finding?.code, "homepage-unreachable");
    assert.match(finding?.message ?? "", /ENOTFOUND/);
  });
});

describe("checkMigrations", () => {
  const tool = {
    slug: "opentofu",
    replaces: [
      { tool: "terraform", fit: "drop-in" as const, migration: "https://opentofu.org/docs/intro/migration/" },
      { tool: "aws-cloudformation", fit: "full" as const },
    ],
  };

  it("passes a guide that answers and ignores a replacement without one", async () => {
    assert.deepEqual(await checkMigrations(tool, answering(200)), []);
  });

  it("fails the entry when a guide does not answer, naming the replacement it belongs to", async () => {
    const findings = await checkMigrations(tool, answering(404));
    assert.deepEqual(
      findings.map((f) => [f.severity, f.code]),
      [["error", "migration-unreachable"]],
    );
    assert.match(findings[0]?.message ?? "", /from terraform.*404/);
  });
});

describe("checkCapabilityDocs", () => {
  const tool = { slug: "gitea", capabilities: { ci: { docs: "https://docs.gitea.com/usage/actions/overview/" } } };

  it("passes documentation that answers", async () => {
    assert.deepEqual(await checkCapabilityDocs(tool, answering(200)), []);
  });

  it("fails the entry when a capability's documentation does not answer", async () => {
    const findings = await checkCapabilityDocs(tool, answering(404));
    assert.deepEqual(findings.map((f) => [f.severity, f.code]), [["error", "capability-unreachable"]]);
    assert.match(findings[0]?.message ?? "", /for ci.*404/);
  });
});

describe("the default link check", () => {
  it("refuses an internal or plain-http link without fetching it, since entries can now be written from maintainer files", async () => {
    const tool = { slug: "x", replaces: [{ tool: "y", fit: "full" as const, migration: "https://127.0.0.1/admin" }] };
    assert.match((await checkMigrations(tool))[0]?.message ?? "", /names an IP address/);
    const capability = { slug: "x", capabilities: { ci: { docs: "http://docs.example.com/" } } };
    assert.match((await checkCapabilityDocs(capability))[0]?.message ?? "", /is not https/);
  });
});

describe("unreachable", () => {
  const answers = (...statuses: number[]) => {
    const calls: string[] = [];
    const fetchImpl = (async (url: string) => {
      calls.push(url);
      return new Response(null, { status: statuses[Math.min(calls.length - 1, statuses.length - 1)] ?? 200 });
    }) as unknown as typeof fetch;
    return { calls, fetchImpl };
  };
  const noWait = async () => {};

  it("accepts a page that answers a transient 503 and then 200", async () => {
    const { calls, fetchImpl } = answers(503, 200);
    assert.equal(await unreachable("https://example.com/a", fetchImpl, noWait), null);
    assert.equal(calls.length, 2);
  });

  it("gives up after three attempts on a page that keeps failing", async () => {
    const { calls, fetchImpl } = answers(503);
    assert.match((await unreachable("https://example.com/a", fetchImpl, noWait)) ?? "", /answered 503/);
    assert.equal(calls.length, 3);
  });

  it("does not retry a page that is really gone", async () => {
    const { calls, fetchImpl } = answers(404);
    assert.match((await unreachable("https://example.com/a", fetchImpl, noWait)) ?? "", /answered 404/);
    assert.equal(calls.length, 1);
  });

  it("retries a rate limit and a network error", async () => {
    let n = 0;
    const fetchImpl = (async () => {
      n++;
      if (n === 1) return new Response(null, { status: 429 });
      if (n === 2) throw new Error("socket hang up");
      return new Response(null, { status: 200 });
    }) as unknown as typeof fetch;
    assert.equal(await unreachable("https://example.com/a", fetchImpl, noWait), null);
    assert.equal(n, 3);
  });
});

describe("githubContentsApi", () => {
  it("maps a blob link to the contents API at its ref, without the anchor", () => {
    assert.equal(
      githubContentsApi("https://github.com/biomejs/biome/blob/b03b8dc/benchmark/README.md#results"),
      "https://api.github.com/repos/biomejs/biome/contents/benchmark/README.md?ref=b03b8dc",
    );
  });

  it("leaves anything else alone", () => {
    assert.equal(githubContentsApi("https://github.com/acme/tool"), null);
    assert.equal(githubContentsApi("https://example.com/acme/tool/blob/main/a.md"), null);
  });
});

describe("unreachable with a token", () => {
  const blob = "https://github.com/acme/tool/blob/main/docs/bench.md";
  const noWait = async () => {};

  function server(answer: (url: string) => number) {
    const seen: { url: string; authorization: string | null }[] = [];
    const fetchImpl = (async (url: string, init?: RequestInit) => {
      seen.push({ url, authorization: new Headers(init?.headers).get("authorization") });
      return new Response(null, { status: answer(url) });
    }) as unknown as typeof fetch;
    return { seen, fetchImpl };
  }

  it("takes the API's word and never loads the page", async () => {
    const { seen, fetchImpl } = server((url) => (url.startsWith("https://api.github.com/") ? 200 : 503));
    assert.equal(await unreachable(blob, fetchImpl, noWait, "t0ken"), null);
    assert.equal(seen.length, 1);
    assert.equal(seen[0]?.authorization, "Bearer t0ken");
  });

  it("falls back to the page when the API does not confirm it", async () => {
    const { seen, fetchImpl } = server((url) => (url.startsWith("https://api.github.com/") ? 404 : 200));
    assert.equal(await unreachable(blob, fetchImpl, noWait, "t0ken"), null);
    assert.deepEqual(seen.map((s) => s.url.startsWith("https://api.github.com/")), [true, false]);
    assert.equal(seen[1]?.authorization, null);
  });

  it("never sends the token to another host", async () => {
    const { seen, fetchImpl } = server(() => 200);
    await unreachable("https://example.com/a", fetchImpl, noWait, "t0ken");
    assert.deepEqual(seen.map((s) => s.authorization), [null]);
  });
});
