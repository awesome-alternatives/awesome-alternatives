import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { RepositoryFacts } from "../scripts/lib/facts-graphql.ts";
import { fetchPackageRelease, withPackageReleases } from "../scripts/lib/packages.ts";
import type { Read, ReleaseFacts, Tool } from "../scripts/lib/types.ts";

function registry(answers: Record<string, unknown>, asked: string[] = []): typeof fetch {
  return (async (input: string | URL | Request) => {
    const url = String(input);
    asked.push(url);
    if (!(url in answers)) return new Response("{}", { status: 404 });
    const body = answers[url];
    return typeof body === "number" ? new Response("", { status: body }) : Response.json(body);
  }) as typeof fetch;
}

const RUSH = "https://registry.npmjs.org/@microsoft%2Frush";
const rush = {
  "dist-tags": { latest: "5.180.0", beta: "5.181.0-beta.0" },
  time: { "5.179.0": "2026-09-05T01:44:31.248Z", "5.180.0": "2026-09-29T14:42:28.700Z" },
};

describe("fetchPackageRelease", () => {
  it("reads the version npm tags latest, with its publish date and page", async () => {
    const asked: string[] = [];
    assert.deepEqual(await fetchPackageRelease("npm:@microsoft/rush", registry({ [RUSH]: rush }, asked)), {
      tag: "5.180.0",
      publishedAt: "2026-09-29T14:42:28.700Z",
      url: "https://www.npmjs.com/package/@microsoft/rush/v/5.180.0",
      source: "package",
      signed: false,
    });
    assert.deepEqual(asked, [RUSH]);
  });

  it("reads an unscoped package", async () => {
    const release = await fetchPackageRelease("npm:left-pad", registry({ "https://registry.npmjs.org/left-pad": { "dist-tags": { latest: "1.3.0" } } }));
    assert.deepEqual([release?.tag, release?.publishedAt], ["1.3.0", null]);
  });

  it("has no version for a missing package or one without a latest tag", async () => {
    assert.equal(await fetchPackageRelease("npm:nope", registry({})), null);
    assert.equal(await fetchPackageRelease("npm:@microsoft/rush", registry({ [RUSH]: { "dist-tags": {} } })), null);
  });

  it("fails on any other answer rather than reading it as no version", async () => {
    await assert.rejects(fetchPackageRelease("npm:@microsoft/rush", registry({ [RUSH]: 503 })), /npm answered 503/);
    await assert.rejects(fetchPackageRelease("pypi:rush", registry({})), /no supported registry/);
  });
});

describe("withPackageReleases", () => {
  const tagged: ReleaseFacts = { tag: "@rushstack/x_v1.0.0", publishedAt: null, url: "u", source: "tag", signed: false };
  const read = (release: ReleaseFacts | null): Read<RepositoryFacts> => ({ status: "read", value: { release } as RepositoryFacts });
  const tool = (slug: string, pkg?: string) => ({ slug, ...(pkg ? { package: pkg } : {}) }) as Tool;
  const releaseOf = (facts: Map<string, Read<RepositoryFacts>>, slug: string) => {
    const entry = facts.get(slug);
    return entry?.status === "read" ? entry.value.release : undefined;
  };

  it("replaces the GitHub release of a tool that names a package, and leaves the others", async () => {
    const asked: string[] = [];
    const facts = new Map([["rush", read(tagged)], ["fd", read(tagged)]]);
    const out = await withPackageReleases([tool("rush", "npm:@microsoft/rush"), tool("fd")], facts, new Map(), registry({ [RUSH]: rush }, asked));
    assert.equal(releaseOf(out, "rush")?.tag, "5.180.0");
    assert.equal(releaseOf(out, "fd"), tagged);
    assert.deepEqual(asked, [RUSH]);
  });

  it("keeps the version published before when npm fails, and the GitHub one when there is none", async () => {
    const published: ReleaseFacts = { tag: "5.179.0", publishedAt: null, url: "u", source: "package", signed: false };
    const facts = new Map([["rush", read(tagged)], ["new", read(tagged)]]);
    const out = await withPackageReleases(
      [tool("rush", "npm:@microsoft/rush"), tool("new", "npm:@microsoft/rush")],
      facts,
      new Map([["rush", published], ["new", tagged]]),
      registry({ [RUSH]: 500 }),
    );
    assert.equal(releaseOf(out, "rush"), published);
    assert.equal(releaseOf(out, "new"), tagged);
  });

  it("leaves a repository it could not read alone", async () => {
    const facts = new Map<string, Read<RepositoryFacts>>([["rush", { status: "gone" }]]);
    const out = await withPackageReleases([tool("rush", "npm:@microsoft/rush")], facts, new Map(), registry({ [RUSH]: rush }));
    assert.deepEqual(out.get("rush"), { status: "gone" });
  });
});
