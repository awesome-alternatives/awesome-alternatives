import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { checkHomepage, checkMigrations } from "../scripts/lib/links.ts";

const product = { slug: "closed", homepage: "https://example.com/" };
const answering = (status: number) => (async () => new Response(null, { status })) as typeof fetch;

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
    const failing = (async () => {
      throw new TypeError("getaddrinfo ENOTFOUND");
    }) as typeof fetch;
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
