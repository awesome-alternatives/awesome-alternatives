import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { claimedSlugs, fetchMaintainerClaim, fetchOwner, fetchReleases, licenseOf, ownerOf, RELEASE_HISTORY, summaryOf } from "../scripts/lib/facts.ts";
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

describe("claimedSlugs", () => {
  it("reads one slug per line, ignoring blank lines and comments", () => {
    assert.deepEqual(claimedSlugs("# tools we maintain\nferrflow\n\n  lfsx  # the LFS server\r\n"), ["ferrflow", "lfsx"]);
  });
});

describe("fetchMaintainerClaim", () => {
  const encoded = (text: string) => ({ encoding: "base64", content: Buffer.from(text).toString("base64") });

  it("reads the root file, and the package's own file when the entry has a path", async () => {
    const asked: string[] = [];
    const slugs = await fetchMaintainerClaim(
      github((path) => {
        asked.push(path);
        return path.includes("crates/cli") ? encoded("cli\n") : encoded("server\n");
      }),
      "acme/mono",
      "main",
      "crates/cli",
    );
    assert.deepEqual(asked, [
      "/repos/acme/mono/contents/.awesome-alternatives?ref=main",
      "/repos/acme/mono/contents/crates/cli/.awesome-alternatives?ref=main",
    ]);
    assert.deepEqual(slugs, ["server", "cli"]);
  });

  it("claims nothing when the repository has no file", async () => {
    assert.deepEqual(await fetchMaintainerClaim(github(() => null), "acme/tool", "main"), []);
  });
});

describe("ownerOf", () => {
  it("reads the account from a full name", () => {
    assert.equal(ownerOf("FerrLabs/FerrFlow"), "FerrLabs");
    assert.equal(ownerOf("torvalds/linux"), "torvalds");
  });
});

describe("fetchOwner", () => {
  const raw = (extra: Record<string, unknown>) => ({
    login: "acme",
    html_url: "https://github.com/acme",
    ...extra,
  });

  function accounts(org: unknown, user: unknown): GitHub {
    return github((path) => (path.startsWith("/orgs/") ? org : user));
  }

  it("takes an organisation from the orgs endpoint, where its description lives", async () => {
    const asked: string[] = [];
    const gh: GitHub = {
      async get<T>(path: string): Promise<T | null> {
        asked.push(path);
        return raw({ name: "Acme", description: "We ship tools." }) as T;
      },
    };
    const owner = await fetchOwner(gh, "acme");
    assert.deepEqual(asked, ["/orgs/acme"]);
    assert.deepEqual(owner, {
      login: "acme",
      kind: "organization",
      name: "Acme",
      bio: "We ship tools.",
      website: null,
      url: "https://github.com/acme",
    });
  });

  it("falls back to the person behind a login that is not an organisation", async () => {
    const asked: string[] = [];
    const gh: GitHub = {
      async get<T>(path: string): Promise<T | null> {
        asked.push(path);
        return path.startsWith("/orgs/") ? null : (raw({ name: "Ada", bio: "  Writes compilers.  " }) as T);
      },
    };
    const owner = await fetchOwner(gh, "acme");
    assert.deepEqual(asked, ["/orgs/acme", "/users/acme"]);
    assert.equal(owner?.kind, "user");
    assert.equal(owner?.bio, "Writes compilers.");
  });

  it("gives a bare domain a scheme and drops what is not a URL", async () => {
    const withBlog = async (blog: string) =>
      (await fetchOwner(accounts(raw({ blog }), null), "acme"))?.website;
    assert.equal(await withBlog("example.com"), "https://example.com");
    assert.equal(await withBlog("https://example.com/x"), "https://example.com/x");
    assert.equal(await withBlog("   "), null);
  });

  it("reports nothing rather than guessing when the login is gone", async () => {
    assert.equal(await fetchOwner(accounts(null, null), "acme"), null);
  });

  it("leaves an empty name and bio as absent rather than blank", async () => {
    const owner = await fetchOwner(accounts(raw({ name: "   ", description: "" }), null), "acme");
    assert.equal(owner?.name, null);
    assert.equal(owner?.bio, null);
  });
});
