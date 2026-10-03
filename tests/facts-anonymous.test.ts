import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { readAnonymously, retryBehindAllowList } from "../scripts/lib/facts-anonymous.ts";
import type { MappedRepository } from "../scripts/lib/facts-graphql.ts";
import type { GitHub } from "../scripts/lib/github.ts";
import { BEHIND_ALLOW_LIST, type Read, type Tool } from "../scripts/lib/types.ts";

const responses: Record<string, unknown> = {
  "/repos/aquasecurity/trivy": {
    full_name: "aquasecurity/trivy",
    description: "Find vulnerabilities",
    homepage: "trivy.dev",
    language: "Go",
    license: { spdx_id: "Apache-2.0" },
    stargazers_count: 35000,
    forks_count: 2800,
    topics: ["security"],
    archived: false,
    fork: false,
    private: false,
    created_at: "2019-04-11T01:01:07Z",
    pushed_at: "2026-10-02T10:00:00Z",
    default_branch: "main",
  },
  "/repos/aquasecurity/trivy/releases/latest": {
    tag_name: "v0.70.0",
    published_at: "2026-09-30T00:00:00Z",
    html_url: "https://github.com/aquasecurity/trivy/releases/tag/v0.70.0",
    assets: [{ name: "trivy_0.70.0_Linux-64bit.tar.gz" }, { name: "trivy_0.70.0_macOS-ARM64.tar.gz" }],
  },
  "/repos/aquasecurity/trivy/releases?per_page=10": [
    { tag_name: "v0.70.0", name: "v0.70.0", body: "Faster image scans", published_at: "2026-09-30T00:00:00Z", html_url: "https://github.com/aquasecurity/trivy/releases/tag/v0.70.0" },
  ],
  "/search/issues?q=repo%3Aaquasecurity%2Ftrivy%20is%3Aissue%20is%3Aopen&per_page=1": { total_count: 412 },
};

const anonymous: GitHub = {
  async get<T>(path: string) {
    return (responses[path] ?? null) as T | null;
  },
};

const trivy = { slug: "trivy", name: "Trivy", repository: "https://github.com/aquasecurity/trivy", category: "vulnerability-scanner" } as Tool;
const ripgrep = { slug: "ripgrep", name: "ripgrep", repository: "https://github.com/BurntSushi/ripgrep", category: "code-search" } as Tool;

describe("readAnonymously", () => {
  it("builds the same facts as the GraphQL read, from REST without a token", async () => {
    const read = await readAnonymously(anonymous, trivy);
    assert.equal(read.status, "read");
    if (read.status !== "read") return;
    const { repo, release, releases, openIssues, platforms, head, annotatedTag } = read.value;
    assert.equal(repo.fullName, "aquasecurity/trivy");
    assert.equal(repo.stars, 35000);
    assert.deepEqual([release?.tag, release?.source, release?.signed], ["v0.70.0", "release", false]);
    assert.deepEqual(releases.map((r) => r.tag), ["v0.70.0"]);
    assert.equal(openIssues, 412);
    assert.ok(platforms.length > 0, "platforms come from the latest release's assets");
    assert.equal(head, null, "no head, so no contributor walk");
    assert.equal(annotatedTag, null);
  });

  it("reports a repository GitHub no longer knows as gone", async () => {
    assert.deepEqual(await readAnonymously(anonymous, ripgrep), { status: "gone" });
  });
});

describe("retryBehindAllowList", () => {
  const readable: Read<MappedRepository> = { status: "unreadable", reason: "timeout" };

  it("rereads only the repositories an IP allow list refused", async (t) => {
    t.mock.method(console, "log", () => {});
    const asked: string[] = [];
    const counting: GitHub = {
      async get<T>(path: string) {
        asked.push(path);
        return anonymous.get<T>(path);
      },
    };
    const reads = await retryBehindAllowList(counting, [ripgrep, trivy], [readable, BEHIND_ALLOW_LIST]);
    assert.deepEqual(reads[0], readable);
    assert.equal(reads[1]?.status, "read");
    assert.ok(asked.length > 0);
    assert.ok(asked.every((path) => path.includes("trivy")), `asked ${asked.join(", ")}`);
  });

  it("keeps the allow-list refusal when the read without a token fails too", async (t) => {
    t.mock.method(console, "error", () => {});
    const exhausted: GitHub = {
      async get() {
        throw new Error("GitHub 403 on /repos/aquasecurity/trivy: rate limit exhausted");
      },
    };
    assert.deepEqual(await retryBehindAllowList(exhausted, [trivy], [BEHIND_ALLOW_LIST]), [BEHIND_ALLOW_LIST]);
  });
});
