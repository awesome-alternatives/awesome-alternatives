import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { fetchRecentStargazers, fetchReleases, licenseOf, RELEASE_HISTORY, summaryOf } from "../scripts/lib/facts.ts";
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

describe("fetchReleases", () => {
  const release = (tag: string, extra: Record<string, unknown> = {}) => ({
    tag_name: tag,
    name: tag,
    published_at: "2026-09-01T00:00:00Z",
    html_url: `https://github.com/o/r/releases/tag/${tag}`,
    draft: false,
    prerelease: false,
    ...extra,
  });

  it("keeps the most recent published releases, skipping drafts", async () => {
    const all = [release("v9", { draft: true }), ...Array.from({ length: 8 }, (_, i) => release(`v${8 - i}`))];
    const history = await fetchReleases(github(() => all), "o/r");
    assert.equal(history.length, RELEASE_HISTORY);
    assert.deepEqual(
      history.map((r) => r.tag),
      ["v8", "v7", "v6", "v5", "v4"],
    );
  });

  it("falls back to the notes when the name only repeats the tag", async () => {
    const history = await fetchReleases(
      github(() => [release("v3", { name: "v3", body: "## What's Changed\n* Fix the parser" })]),
      "o/r",
    );
    assert.equal(history[0]?.name, "Fix the parser");
  });

  it("drops a name that only repeats the tag, and keeps a real title", async () => {
    const history = await fetchReleases(
      github(() => [release("v2", { name: "  v2 " }), release("v1", { name: "First stable release" })]),
      "o/r",
    );
    assert.deepEqual(
      history.map((r) => r.name),
      [null, "First stable release"],
    );
  });

  it("marks pre-releases so they are not read as stable", async () => {
    const history = await fetchReleases(github(() => [release("v2.0.0-rc.1", { prerelease: true })]), "o/r");
    assert.equal(history[0]?.prerelease, true);
  });

  it("is empty for a repository with no releases", async () => {
    assert.deepEqual(await fetchReleases(github(() => null), "o/r"), []);
  });
});

describe("summaryOf", () => {
  it("skips headings and GitHub's generated boilerplate", () => {
    assert.equal(summaryOf("## What's Changed\n\n### Fixed\n- Keep crate order stable"), "Keep crate order stable");
  });

  it("reduces links to their text and drops the author and PR URL", () => {
    assert.equal(
      summaryOf("* Add [--dry-run](https://docs.example.com) by @alice in https://github.com/o/r/pull/12"),
      "Add --dry-run",
    );
  });

  it("strips emphasis and inline code markers", () => {
    assert.equal(summaryOf("**Breaking:** rename `tagTemplate`"), "Breaking: rename tagTemplate");
  });

  it("drops single-asterisk emphasis around a scope", () => {
    assert.equal(summaryOf("*(set-version)* support workspace versions"), "(set-version) support workspace versions");
  });

  it("keeps underscores inside identifiers", () => {
    assert.equal(summaryOf("only send GITHUB_TOKEN to GitHub remotes"), "only send GITHUB_TOKEN to GitHub remotes");
  });

  it("shortens long lines without cutting past the limit", () => {
    const summary = summaryOf("x".repeat(300)) ?? "";
    assert.equal(summary.length, 120);
    assert.ok(summary.endsWith("…"));
  });

  it("is null when the notes hold nothing but headings, links or HTML", () => {
    assert.equal(summaryOf("## Changelog\n<!-- generated -->\n**Full Changelog**: https://github.com/o/r/compare/a...b"), null);
    assert.equal(summaryOf(""), null);
  });
});
