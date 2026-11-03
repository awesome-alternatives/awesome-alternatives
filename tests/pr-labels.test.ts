import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { applyVerdict, type Comment, type LabelHost, labelsFor, parseVerdict, readyOn, tooNewComment } from "../scripts/lib/pr-labels.ts";
import type { Finding } from "../scripts/lib/types.ts";

const SHA = "0123456789abcdef0123456789abcdef01234567";

const finding = (severity: Finding["severity"], code: Finding["code"]): Finding => ({ slug: "sample", severity, code, message: "" });

function host(present: string[], head = SHA, comments: Comment[] = []) {
  const calls: string[] = [];
  const fake: LabelHost = {
    headSha: async () => head,
    labels: async () => present,
    add: async (_, labels) => void calls.push(`add ${labels.join(",")}`),
    remove: async (_, label) => void calls.push(`remove ${label}`),
    comments: async () => comments,
    comment: async (number, body) => void calls.push(`comment #${number} ${body}`),
    editComment: async (id, body) => void calls.push(`edit ${id} ${body}`),
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

describe("readyOn", () => {
  const young = (clearsOn: string): Finding => ({ ...finding("warning", "too-new"), clearsOn });

  it("gives the day the youngest repository turns old enough", () => {
    assert.equal(readyOn([young("2026-11-21"), young("2026-12-02"), young("2026-11-30")]), "2026-12-02");
  });

  it("ignores dates carried by other findings", () => {
    assert.equal(readyOn([{ ...finding("warning", "inactive"), clearsOn: "2027-01-01" }, young("2026-11-21")]), "2026-11-21");
  });

  it("has no date when no repository is too new", () => {
    assert.equal(readyOn([finding("warning", "no-license")]), null);
  });
});

describe("parseVerdict", () => {
  it("keeps only the labels this workflow manages", () => {
    assert.deepEqual(parseVerdict("42\n", '["ready","admin","too-new"]'), { number: 42, labels: ["ready", "too-new"], readyOn: null });
  });

  it("keeps the mergeable date only alongside too-new", () => {
    assert.equal(parseVerdict("1", '["needs-review","too-new"]', "2026-11-21\n").readyOn, "2026-11-21");
    assert.equal(parseVerdict("1", '["ready"]', "2026-11-21").readyOn, null);
  });

  it("refuses a mergeable date that is not a calendar day", () => {
    for (const bad of ["2026-02-30", "21/11/2026", "2026-11-21T00:00:00Z", "**soon**", ""]) {
      assert.throws(() => parseVerdict("1", '["too-new"]', bad), /not a date/);
    }
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
    const result = await applyVerdict(fake, { number: 7, labels: ["ready"], readyOn: null }, SHA);
    assert.deepEqual(result, { added: ["ready"], removed: ["needs-review", "too-new"], commented: false });
    assert.deepEqual(calls, ["add ready", "remove needs-review", "remove too-new"]);
  });

  it("does nothing when the labels already match", async () => {
    const { fake, calls } = host(["ready"]);
    await applyVerdict(fake, { number: 7, labels: ["ready"], readyOn: null }, SHA);
    assert.deepEqual(calls, []);
  });

  it("refuses to label a pull request whose head moved past the validated commit", async () => {
    const { fake, calls } = host([], "f".repeat(40));
    await assert.rejects(applyVerdict(fake, { number: 7, labels: ["ready"], readyOn: null }, SHA), /not the validated/);
    assert.deepEqual(calls, []);
  });
});

describe("too-new comment", () => {
  const verdict = { number: 7, labels: ["needs-review", "too-new"] as const, readyOn: "2026-11-21" };
  const body = tooNewComment("2026-11-21");

  it("says when the pull request becomes mergeable", async () => {
    const { fake, calls } = host(["needs-review", "too-new"]);
    const result = await applyVerdict(fake, { ...verdict, labels: [...verdict.labels] }, SHA);
    assert.equal(result.commented, true);
    assert.deepEqual(calls, [`comment #7 ${body}`]);
    assert.match(body, /mergeable on \*\*2026-11-21\*\*/);
  });

  it("updates its own comment when the date moves instead of posting another", async () => {
    const { fake, calls } = host(["needs-review", "too-new"], SHA, [{ id: 3, body: tooNewComment("2026-11-10"), bot: true }]);
    await applyVerdict(fake, { ...verdict, labels: [...verdict.labels] }, SHA);
    assert.deepEqual(calls, [`edit 3 ${body}`]);
  });

  it("stays quiet when its comment already carries the date", async () => {
    const { fake, calls } = host(["needs-review", "too-new"], SHA, [{ id: 3, body, bot: true }]);
    const result = await applyVerdict(fake, { ...verdict, labels: [...verdict.labels] }, SHA);
    assert.equal(result.commented, false);
    assert.deepEqual(calls, []);
  });

  it("never edits a comment a person wrote, even one quoting the marker", async () => {
    const { fake, calls } = host(["needs-review", "too-new"], SHA, [{ id: 3, body: tooNewComment("2026-11-10"), bot: false }]);
    await applyVerdict(fake, { ...verdict, labels: [...verdict.labels] }, SHA);
    assert.deepEqual(calls, [`comment #7 ${body}`]);
  });
});
