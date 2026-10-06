import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { checkCapabilityDocs, checkHomepage, checkMigrations } from "../scripts/lib/links.ts";

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
