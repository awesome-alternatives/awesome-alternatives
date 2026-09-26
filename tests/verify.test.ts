import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createGitHub, GitHubError } from "../scripts/lib/github.ts";
import type { Tool } from "../scripts/lib/types.ts";
import { verifyTool } from "../scripts/lib/verify.ts";

const NOW = new Date("2026-09-26T00:00:00Z");
const neon: Tool = { slug: "neon", name: "Neon", repository: "https://github.com/neondatabase/neon", category: "relational-database", file: "" };

const refusal = JSON.stringify({
  message:
    "Although you appear to have the correct authorization credentials, the `neondatabase` organization has an IP allow list enabled, and your IP address is not permitted to access this resource.",
  status: "403",
});

function repository(overrides: Record<string, unknown> = {}) {
  return {
    full_name: "neondatabase/neon",
    description: "Serverless Postgres",
    homepage: "https://neon.tech",
    language: "Rust",
    license: { spdx_id: "Apache-2.0" },
    stargazers_count: 23132,
    forks_count: 900,
    topics: [],
    archived: false,
    fork: false,
    private: false,
    created_at: "2021-03-26T00:00:00Z",
    pushed_at: "2026-09-25T00:00:00Z",
    default_branch: "main",
    ...overrides,
  };
}

function actionsRunner(answer: (path: string) => Response) {
  const asked: string[] = [];
  const gh = createGitHub("ghs_x", async (input) => {
    const path = new URL(String(input)).pathname;
    asked.push(path);
    return answer(path);
  });
  return { gh, asked };
}

const onlyMetadata = (repo = repository()) =>
  actionsRunner((path) => (path === "/repos/neondatabase/neon" ? Response.json(repo) : new Response(refusal, { status: 403 })));

describe("verifyTool on an organisation behind an IP allow list", () => {
  it("warns that the entry could not be checked instead of failing the run", async () => {
    const { gh } = onlyMetadata();
    const findings = await verifyTool(gh, neon, NOW, new Set());
    assert.deepEqual(
      findings.map((f) => [f.severity, f.code]),
      [["warning", "unreadable-from-ci"]],
    );
    assert.match(findings[0]?.message ?? "", /`neondatabase` has an IP allow list/);
    assert.match(findings[0]?.message ?? "", /releases, maintainer file and deploy artefacts could not be read/);
  });

  it("still runs the checks the repository's own metadata allows, without claiming it has no release", async () => {
    const { gh } = onlyMetadata(repository({ archived: true, license: null }));
    const codes = (await verifyTool(gh, neon, NOW, new Set())).map((f) => f.code);
    assert.deepEqual(codes, ["archived", "no-license", "unreadable-from-ci"]);
  });

  it("reports only the warning when not even the repository can be read", async () => {
    const { gh } = actionsRunner(() => new Response(refusal, { status: 403 }));
    const findings = await verifyTool(gh, neon, NOW, new Set());
    assert.deepEqual(
      findings.map((f) => f.code),
      ["unreadable-from-ci"],
    );
    assert.match(findings[0]?.message ?? "", /nothing about the repository could be checked/);
  });

  it("keeps failing on any other refusal, which is not the organisation's choice", async () => {
    const { gh } = actionsRunner((path) =>
      path === "/repos/neondatabase/neon" ? Response.json(repository()) : new Response("Resource not accessible by integration", { status: 403 }),
    );
    await assert.rejects(verifyTool(gh, neon, NOW, new Set()), (error: unknown) => error instanceof GitHubError && error.status === 403);
  });
});
