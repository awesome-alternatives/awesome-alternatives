import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { checkBenchmarkFile } from "../scripts/lib/benchmarks.ts";

const NOW = new Date("2026-10-05T00:00:00Z");
const tools = [
  { slug: "ripgrep", replaces: [{ tool: "ack", fit: "full" as const }] },
  { slug: "ack", replaces: [] },
  { slug: "ugrep", replaces: [{ tool: "ack", fit: "partial" as const }] },
  { slug: "vitest", replaces: [{ tool: "jest", fit: "full" as const }] },
];

const valid = `benchmarks:
  - title: Linux kernel source, warm cache
    url: https://example.com/bench
    ranBy: ripgrep
    date: 2024-01-15
    result: ripgrep 0.35 s, ack 4.1 s.
`;

const messages = (file: string, text: string) => checkBenchmarkFile(file, text, tools, NOW).map((f) => f.message);

describe("checkBenchmarkFile", () => {
  it("accepts a benchmark for two tools that have a comparison page", () => {
    assert.deepEqual(messages("ack--ripgrep.yaml", valid), []);
  });

  it("accepts two tools that only replace the same thing", () => {
    assert.deepEqual(messages("ripgrep--ugrep.yaml", valid), []);
  });

  it("wants the two slugs in alphabetical order, so a pair has one file", () => {
    assert.match(messages("ripgrep--ack.yaml", valid).join(), /ack--ripgrep\.yaml/);
  });

  it("refuses a pair the site has no comparison page for", () => {
    assert.match(messages("ack--vitest.yaml", valid.replace("ripgrep", "ack")).join(), /no comparison page/);
  });

  it("refuses a slug that is not in the catalog", () => {
    assert.match(messages("ack--grep.yaml", valid).join(), /grep has no entry/);
  });

  it("names who ran it: one of the two tools or a third party", () => {
    assert.match(messages("ack--ripgrep.yaml", valid.replace("ranBy: ripgrep", "ranBy: ugrep")).join(), /ranBy must be/);
    assert.deepEqual(messages("ack--ripgrep.yaml", valid.replace("ranBy: ripgrep", "ranBy: third-party")), []);
  });

  it("refuses a date in the future, a bad URL and a result too long to read at a glance", () => {
    const text = valid
      .replace("2024-01-15", "2027-01-01")
      .replace("https://example.com/bench", "http://example.com/bench")
      .replace("ripgrep 0.35 s, ack 4.1 s.", "x".repeat(201));
    const found = messages("ack--ripgrep.yaml", text).join("\n");
    assert.match(found, /date must be a past/);
    assert.match(found, /url must be an https URL/);
    assert.match(found, /result must be text of at most 200/);
  });

  it("refuses a file with no benchmark", () => {
    assert.match(messages("ack--ripgrep.yaml", "benchmarks: []\n").join(), /at least one benchmark/);
  });
});
