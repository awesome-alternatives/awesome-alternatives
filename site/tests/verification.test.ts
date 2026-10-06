import assert from "node:assert/strict";
import { test } from "node:test";

import { editedSinceVerification, maintainerKinds } from "../src/lib/verification.ts";

const verified = { maintainerVerified: true, verifiedAt: "2026-09-10T12:00:00.000Z", editedAt: "2026-09-01T00:00:00.000Z" };

test("an entry edited before its maintainers last committed to their file is not flagged", () => {
  assert.equal(editedSinceVerification(verified), false);
});

test("an entry edited after the verification date is flagged", () => {
  assert.equal(editedSinceVerification({ ...verified, editedAt: "2026-09-10T12:00:01.000Z" }), true);
});

test("dates are compared as instants, not as strings", () => {
  assert.equal(editedSinceVerification({ ...verified, verifiedAt: "2026-09-10T12:00:00Z", editedAt: "2026-09-10T11:59:59.500Z" }), false);
  assert.equal(editedSinceVerification({ ...verified, verifiedAt: "2026-09-10T12:00:00Z", editedAt: "2026-09-10T12:00:00.500Z" }), true);
});

test("an edit on the same instant as the verification is not flagged", () => {
  assert.equal(editedSinceVerification({ ...verified, editedAt: verified.verifiedAt }), false);
});

test("a tool verified through the app carries no date and is never flagged", () => {
  assert.equal(editedSinceVerification({ ...verified, verifiedAt: null, editedAt: "2026-10-01T00:00:00.000Z" }), false);
  assert.equal(editedSinceVerification({ maintainerVerified: true, editedAt: "2026-10-01T00:00:00.000Z" }), false);
});

test("an unverified tool is never flagged, even with a date left over", () => {
  assert.equal(editedSinceVerification({ ...verified, maintainerVerified: false, editedAt: "2026-10-01T00:00:00.000Z" }), false);
});

test("the fields its maintainers provide are grouped by kind, in a fixed order", () => {
  assert.deepEqual(maintainerKinds(["migration.ack", "capabilities.ci", "deploy", "capabilities.sso"]), ["deploy", "capabilities", "migration"]);
  assert.deepEqual(maintainerKinds(["path"]), ["path"]);
});

test("an entry nothing came to from its maintainers says nothing about them", () => {
  assert.deepEqual(maintainerKinds(), []);
  assert.deepEqual(maintainerKinds(["deployment", "capabilitiesx"]), []);
});
