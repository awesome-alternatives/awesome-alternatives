import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { fetchRecentStargazers, licenseOf } from "../scripts/lib/facts.ts";
import { type GitHub, GitHubError } from "../scripts/lib/github.ts";

describe("licenseOf", () => {
  it("keeps the SPDX id GitHub detected", () => {
    assert.equal(licenseOf({ spdx_id: "MIT" }), "MIT");
  });

  it("reports a licence GitHub cannot map to SPDX as Other, not as missing", () => {
    assert.equal(licenseOf({ spdx_id: "NOASSERTION" }), "Other");
    assert.equal(licenseOf({ spdx_id: null }), "Other");
  });

  it("reports no licence only when GitHub found no licence file", () => {
    assert.equal(licenseOf(null), null);
  });
});

function github(respond: (path: string) => unknown): GitHub {
  return {
    async get<T>(path: string): Promise<T | null> {
      return respond(path) as T;
    },
  };
}

describe("fetchRecentStargazers", () => {
  it("reads the last two pages, where the most recent stars are", async () => {
    const asked: string[] = [];
    const stars = await fetchRecentStargazers(
      github((path) => {
        asked.push(path);
        return [{ starred_at: "2026-09-01T00:00:00Z" }];
      }),
      "o/r",
      250,
    );
    assert.deepEqual(asked, ["/repos/o/r/stargazers?per_page=100&page=2", "/repos/o/r/stargazers?per_page=100&page=3"]);
    assert.equal(stars.length, 2);
  });

  it("gives up on the star check when GitHub refuses to page that deep", async () => {
    const refused = github((path) => {
      throw new GitHubError(403, path, "Resource not accessible by integration");
    });
    assert.deepEqual(await fetchRecentStargazers(refused, "o/r", 12_400), []);
  });

  it("still fails on any other error, so a real outage is not mistaken for no stars", async () => {
    const down = github((path) => {
      throw new GitHubError(502, path, "Bad Gateway");
    });
    await assert.rejects(fetchRecentStargazers(down, "o/r", 12_400), GitHubError);
  });
});
