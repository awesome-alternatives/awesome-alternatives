import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { applyVerdict, type LabelHost, labelsFor, parseVerdict } from "../scripts/lib/pr-labels.ts";
import type { Finding } from "../scripts/lib/types.ts";

const SHA = "0123456789abcdef0123456789abcdef01234567";

const finding = (severity: Finding["severity"], code: Finding["code"]): Finding => ({ slug: "sample", severity, code, message: "" });

function host(present: string[], head = SHA) {
  const calls: string[] = [];
  const fake: LabelHost = {
    headSha: async () => head,
    labels: async () => present,
    add: async (_, labels) => void calls.push(`add ${labels.join(",")}`),
    remove: async (_, label) => void calls.push(`remove ${label}`),
  };
  return { fake, calls };
}

describe("labelsFor", () => {
  it("marks a clean pull request ready", () => {
    assert.deepEqual(labelsFor([], ["sample"]), ["ready"]);
  });

  it("asks for a review when only warnings remain, and names a young repository", () => {
    assert.deepEqual(labelsFor([finding("warning", "too-new")], ["sample"]), ["needs-review", "too-new"]);
    assert.deepEqual(labelsFor([finding("warning", "no-license")], ["sample"]), ["needs-review"]);
  });

  it("never calls a blocked pull request ready, but still names a young repository", () => {
    assert.deepEqual(labelsFor([finding("error", "fork"), finding("warning", "too-new")], ["sample"]), ["too-new"]);
    assert.deepEqual(labelsFor([finding("error", "fork")], ["sample"]), []);
  });

  it("labels nothing when the pull request touches no entry", () => {
    assert.deepEqual(labelsFor([], []), []);
  });
});

describe("parseVerdict", () => {
  it("keeps only the labels this workflow manages", () => {
    assert.deepEqual(parseVerdict("42\n", '["ready","admin","too-new"]'), { number: 42, labels: ["ready", "too-new"] });
  });

  it("refuses a number that is not a pull request number", () => {
    for (const bad of ["0", "-1", "4 2", "42abc", "", "1".repeat(11)]) {
      assert.throws(() => parseVerdict(bad, "[]"), /not a pull request number/);
    }
  });

  it("refuses labels that are not a list", () => {
    assert.throws(() => parseVerdict("1", '{"ready":true}'), /not a list/);
  });
});

describe("applyVerdict", () => {
  it("adds what is missing and removes only the stale labels it manages", async () => {
    const { fake, calls } = host(["needs-review", "too-new", "documentation"]);
    const result = await applyVerdict(fake, { number: 7, labels: ["ready"] }, SHA);
    assert.deepEqual(result, { added: ["ready"], removed: ["needs-review", "too-new"] });
    assert.deepEqual(calls, ["add ready", "remove needs-review", "remove too-new"]);
  });

  it("does nothing when the labels already match", async () => {
    const { fake, calls } = host(["ready"]);
    await applyVerdict(fake, { number: 7, labels: ["ready"] }, SHA);
    assert.deepEqual(calls, []);
  });

  it("refuses to label a pull request whose head moved past the validated commit", async () => {
    const { fake, calls } = host([], "f".repeat(40));
    await assert.rejects(applyVerdict(fake, { number: 7, labels: ["ready"] }, SHA), /not the validated/);
    assert.deepEqual(calls, []);
  });
});
