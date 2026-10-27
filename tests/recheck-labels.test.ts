import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { type RecheckHost, recheckLabelled, runToRerun, type ValidateRun } from "../scripts/lib/recheck-labels.ts";

const HEAD = "a".repeat(40);

const run = (id: number, overrides: Partial<ValidateRun> = {}): ValidateRun => ({
  id,
  event: "pull_request",
  headSha: HEAD,
  status: "completed",
  conclusion: "success",
  ...overrides,
});

describe("runToRerun", () => {
  it("picks the newest finished run on the current head", () => {
    const picked = runToRerun([run(1), run(3, { conclusion: "failure" }), run(2)], HEAD);
    assert.equal(typeof picked !== "string" && picked.id, 3);
  });

  it("never starts a run that was never launched on the current head", () => {
    assert.match(runToRerun([], HEAD) as string, /never ran/);
    assert.match(runToRerun([run(1, { headSha: "b".repeat(40) })], HEAD) as string, /never ran/);
    assert.match(runToRerun([run(1, { event: "push" })], HEAD) as string, /never ran/);
  });

  it("leaves a run waiting for a maintainer's approval alone", () => {
    assert.match(runToRerun([run(1, { status: "completed", conclusion: "action_required" })], HEAD) as string, /action_required/);
    assert.match(runToRerun([run(1, { status: "waiting", conclusion: null })], HEAD) as string, /waiting/);
  });

  it("does not stack a rerun on one still in progress or cancelled", () => {
    assert.match(runToRerun([run(1), run(2, { status: "in_progress", conclusion: null })], HEAD) as string, /in_progress/);
    assert.match(runToRerun([run(1), run(2, { conclusion: "cancelled" })], HEAD) as string, /cancelled/);
  });
});

describe("recheckLabelled", () => {
  it("reruns only the pull requests whose latest run can be rerun", async () => {
    const reran: number[] = [];
    const host: RecheckHost = {
      pullsLabelled: async () => [
        { number: 10, headSha: HEAD },
        { number: 11, headSha: "c".repeat(40) },
      ],
      validateRuns: async (sha) => (sha === HEAD ? [run(42)] : []),
      rerun: async (id) => void reran.push(id),
    };
    const outcomes = await recheckLabelled(host, "too-new");
    assert.deepEqual(reran, [42]);
    assert.deepEqual(outcomes, [
      { number: 10, result: "rerun", run: 42 },
      { number: 11, result: "skipped", reason: "Validate never ran on the current head" },
    ]);
  });
});
