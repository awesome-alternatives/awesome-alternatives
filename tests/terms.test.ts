import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { termsOf } from "../scripts/lib/terms.ts";

describe("termsOf", () => {
  it("reads an OSI licence as open without anyone having to say so", () => {
    for (const license of ["MIT", "Apache-2.0", "AGPL-3.0", "MPL-2.0", "EUPL-1.2"]) {
      assert.equal(termsOf(undefined, license), "open", license);
    }
  });

  it("does not guess when GitHub could not match the licence", () => {
    assert.equal(termsOf(undefined, "Other"), "unknown");
    assert.equal(termsOf(undefined, null), "unknown");
  });

  it("lets the entry override an OSI licence, which is how open core is caught", () => {
    assert.equal(termsOf("open-core", "MIT"), "open-core");
  });

  it("lets the entry settle a licence GitHub reports as Other", () => {
    assert.equal(termsOf("source-available", "Other"), "source-available");
    assert.equal(termsOf("open", "Other"), "open");
  });

  it("never reads a Business Source licence as open", () => {
    assert.equal(termsOf(undefined, "BUSL-1.1"), "unknown");
  });
});
