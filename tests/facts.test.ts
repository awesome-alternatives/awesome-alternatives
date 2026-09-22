import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { licenseOf } from "../scripts/lib/facts.ts";

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
