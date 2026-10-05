import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { newestTag } from "../scripts/lib/tags.ts";

const pick = (...names: string[]) => newestTag(names.map((name) => ({ name })))?.name;

describe("newestTag", () => {
  it("takes the highest stable version over a newer release candidate on another branch", () => {
    assert.equal(pick("4.4.0-rc3", "4.3.2-rc0", "4.2.2", "4.4.0-rc1", "4.3.1", "4.3.1-rc2", "4.2.1", "show"), "4.3.1");
  });

  it("compares numerically, not alphabetically", () => {
    assert.equal(pick("5.1.8", "4.5.34", "5.2.0", "5.10.1", "5.9.0"), "5.10.1");
    assert.equal(pick("v0.9.0", "v0.43.0", "v0.40.2"), "v0.43.0");
  });

  it("reads versions behind a prefix and with underscore separators", () => {
    assert.equal(pick("REL_19_BETA4", "REL_18_6", "REL_17_11", "REL_16_15"), "REL_18_6");
    assert.equal(pick("bug-2026-08-12T09_26_04Z", "version-3.53.4", "release", "version-3.52.0"), "version-3.53.4");
    assert.equal(pick("r8.3.11", "r8.0.32", "r9.1.0-alpha0"), "r8.3.11");
    assert.equal(pick("rel/4.0.0-alpha-1", "rel/2.1.6", "rel/3.0.0"), "rel/3.0.0");
    assert.equal(pick("release-v22.5.3", "release-v22.10.0"), "release-v22.10.0");
  });

  it("treats a longer version as newer when the shared parts are equal", () => {
    assert.equal(pick("v3.12.12", "v3.12.12.1", "v3.11.14.6"), "v3.12.12.1");
  });

  it("keeps build metadata and release qualifiers stable and everything else as pre-release", () => {
    assert.equal(pick("7.4.0+260928", "7.3.0+260922"), "7.4.0+260928");
    assert.equal(pick("v3.7.1.Final", "v3.8.0.CR1", "v3.8.0.Beta2"), "v3.7.1.Final");
    assert.equal(pick("5.3.0.M1", "5.2.1", "5.2.0.RC2"), "5.2.1");
    assert.equal(pick("v3.5-dev8", "v3.4.0", "v3.4-dev14"), "v3.4.0");
    assert.equal(pick("8.0.0rc1", "7.4.2", "6.1b1"), "7.4.2");
  });

  it("ignores date-stamped nightlies that have a single number", () => {
    assert.equal(pick("v20261005-nightly", "v3.7.4beta1", "v3.7.3"), "v3.7.3");
  });

  it("falls back to the highest pre-release when no tag is stable", () => {
    assert.equal(pick("v1.9.0-RC1", "v2.0.0-M4", "v1.10.0-M2"), "v2.0.0-M4");
    assert.equal(pick("v0.26.dev0", "v0.25.dev3"), "v0.26.dev0");
  });

  it("prefers the shorter name when two tags carry the same version", () => {
    assert.equal(pick("mysql-cluster-26.7.0", "mysql-9.7.2", "mysql-26.7.0"), "mysql-26.7.0");
  });

  it("falls back to the most recent tag when none looks like a version", () => {
    assert.equal(pick("pre-4435", "pre-4434", "latest-stable"), "pre-4435");
    assert.equal(pick(), undefined);
  });
});
