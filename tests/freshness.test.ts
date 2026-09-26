import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  type MainCatalog,
  mainCatalog,
  type OpenIssue,
  parseToolMarkdown,
  planAction,
  type Problem,
  probeSlug,
  problemsOf,
  type Served,
  servedBy,
  type Thresholds,
  thresholdsFrom,
} from "../scripts/lib/freshness.ts";
import { lastUpdateAt } from "../scripts/lib/freshness-issues.ts";
import { titleOf } from "../scripts/lib/freshness-report.ts";
import { readApi, request, type Retry } from "../scripts/lib/freshness-sources.ts";

const HOUR = 60 * 60 * 1000;
const thresholds: Thresholds = { staleAfterHours: 26, deployGraceHours: 3 };
const instantly: Retry = { attempts: 3, delayMs: 0, timeoutMs: 1000 };

const main: MainCatalog = mainCatalog(
  {
    checkedAt: "2026-09-26T05:17:08.256Z",
    tools: [
      { slug: "ruff", repo: { stars: 49789 } },
      { slug: "opencode", repo: { stars: 210089 } },
    ],
  },
  "1b86f73",
  "2026-09-26T05:25:44Z",
);

const current: Record<"site" | "api", Served> = { site: { kind: "current" }, api: { kind: "current" } };

function at(iso: string): Date {
  return new Date(iso);
}

function hoursAfter(iso: string, hours: number): Date {
  return new Date(Date.parse(iso) + hours * HOUR);
}

describe("parseToolMarkdown", () => {
  it("reads the day of the refresh and the star count off a served tool page", () => {
    const sample = parseToolMarkdown("ruff", "## Facts from GitHub\n\n- Stars: 49789\n- Forks: 2441\n\n## Freshness\n\n- Read from GitHub: 2026-09-26\n");
    assert.equal(sample.readFromGitHub, "2026-09-26");
    assert.deepEqual([...sample.stars], [["ruff", 49789]]);
  });

  it("fails loudly when the page no longer carries the lines, rather than calling the site stale", () => {
    assert.throws(() => parseToolMarkdown("ruff", "- Stars: 12\n"), /Read from GitHub/);
    assert.throws(() => parseToolMarkdown("ruff", "- Read from GitHub: 2026-09-26\n"), /Stars/);
  });
});

describe("probeSlug", () => {
  it("probes the most starred tool, whose count moves every day", () => {
    assert.equal(probeSlug(main), "opencode");
  });
});

describe("servedBy", () => {
  it("is current when the day and the star counts match main", () => {
    const reading = { kind: "served" as const, sample: { readFromGitHub: "2026-09-26", stars: new Map([["opencode", 210089]]) } };
    assert.deepEqual(servedBy(reading, main), { kind: "current" });
  });

  it("is behind when the page was read from GitHub on an earlier day", () => {
    const reading = { kind: "served" as const, sample: { readFromGitHub: "2026-09-25", stars: new Map([["opencode", 210089]]) } };
    assert.deepEqual(servedBy(reading, main), { kind: "behind", readFromGitHub: "2026-09-25" });
  });

  it("is behind when a second refresh the same day never deployed, which only the star counts show", () => {
    const reading = { kind: "served" as const, sample: { readFromGitHub: "2026-09-26", stars: new Map([["opencode", 209990]]) } };
    assert.equal(servedBy(reading, main).kind, "behind");
  });

  it("judges the API, which states no day, on star counts alone, and a tool main dropped counts as behind", () => {
    const api = (stars: [string, number][]) => ({ kind: "served" as const, sample: { readFromGitHub: null, stars: new Map(stars) } });
    assert.equal(servedBy(api([["ruff", 49789], ["opencode", 210089]]), main).kind, "current");
    assert.deepEqual(servedBy(api([["ruff", 49700]]), main), { kind: "behind", readFromGitHub: null });
    assert.equal(servedBy(api([["gone", 5]]), main).kind, "behind");
  });

  it("passes an unreachable surface through with its reason", () => {
    assert.deepEqual(servedBy({ kind: "unreachable", reason: "HTTP 502" }, main), { kind: "unreachable", reason: "HTTP 502" });
  });
});

describe("problemsOf", () => {
  it("finds nothing the morning after a refresh that deployed", () => {
    assert.deepEqual(problemsOf(at("2026-09-26T10:00:00Z"), main, current, thresholds), []);
  });

  it("calls main stale once its catalog is older than the threshold, not a minute before", () => {
    assert.deepEqual(problemsOf(hoursAfter(main.checkedAt, 25.9), main, current, thresholds), []);
    const [problem] = problemsOf(hoursAfter(main.checkedAt, 26.1), main, current, thresholds);
    assert.equal(problem?.kind, "not-refreshed");
  });

  it("gives a deploy the grace period after the last catalog commit before calling a surface behind", () => {
    const served: Record<"site" | "api", Served> = { site: { kind: "behind", readFromGitHub: "2026-09-25" }, api: { kind: "current" } };
    assert.deepEqual(problemsOf(hoursAfter(main.committedAt, 2.5), main, served, thresholds), []);
    assert.deepEqual(problemsOf(hoursAfter(main.committedAt, 3.5), main, served, thresholds), [
      { kind: "not-deployed", surface: "site", readFromGitHub: "2026-09-25" },
    ]);
  });

  it("reports an unreachable surface at once, apart from staleness", () => {
    const served: Record<"site" | "api", Served> = { site: { kind: "current" }, api: { kind: "unreachable", reason: "HTTP 503" } };
    assert.deepEqual(problemsOf(hoursAfter(main.committedAt, 0.1), main, served, thresholds), [
      { kind: "unreachable", surface: "api", reason: "HTTP 503" },
    ]);
  });
});

describe("planAction", () => {
  const stale: Problem[] = [{ kind: "not-refreshed", ageHours: 30 }];
  const issue = (lastUpdateAt: string): OpenIssue => ({ number: 7, url: "https://github.com/o/r/issues/7", lastUpdateAt });
  const now = at("2026-09-27T12:00:00Z");

  it("opens an issue on the first stale check", () => {
    assert.deepEqual(planAction(stale, null, now), { kind: "open" });
  });

  it("leaves an open issue alone for a day, then comments on it rather than opening another", () => {
    assert.deepEqual(planAction(stale, issue("2026-09-26T13:00:00Z"), now), { kind: "none" });
    assert.deepEqual(planAction(stale, issue("2026-09-26T12:00:00Z"), now), { kind: "comment", issue: issue("2026-09-26T12:00:00Z") });
  });

  it("closes the issue once fresh again, and does nothing when there is none", () => {
    assert.deepEqual(planAction([], issue("2026-09-27T11:00:00Z"), now), { kind: "close", issue: issue("2026-09-27T11:00:00Z") });
    assert.deepEqual(planAction([], null, now), { kind: "none" });
  });
});

describe("lastUpdateAt", () => {
  it("counts only comments by whoever opened the issue, so a maintainer's reply does not hold the daily update back", () => {
    const opened = { number: 7, html_url: "u", created_at: "2026-09-25T08:00:00Z", user: { login: "github-actions[bot]" } };
    const comments = [
      { created_at: "2026-09-26T08:00:00Z", user: { login: "github-actions[bot]" } },
      { created_at: "2026-09-26T20:00:00Z", user: { login: "maintainer" } },
    ];
    assert.equal(lastUpdateAt(opened, comments), "2026-09-26T08:00:00Z");
    assert.equal(lastUpdateAt(opened, []), "2026-09-25T08:00:00Z");
  });
});

describe("titleOf", () => {
  it("tells an outage apart from a stale catalog", () => {
    assert.equal(titleOf([{ kind: "unreachable", surface: "site", reason: "HTTP 502" }]), "Production does not answer the freshness check");
    assert.equal(
      titleOf([
        { kind: "unreachable", surface: "site", reason: "HTTP 502" },
        { kind: "not-deployed", surface: "api", readFromGitHub: null },
      ]),
      "The published catalog is stale",
    );
  });
});

describe("request", () => {
  it("retries a failed answer and returns the body once one succeeds", async () => {
    let calls = 0;
    const fetchImpl: typeof fetch = async () => (++calls < 3 ? new Response("", { status: 502 }) : new Response("ok"));
    assert.deepEqual(await request("https://x.test/a", fetchImpl, instantly), { kind: "answered", body: "ok" });
    assert.equal(calls, 3);
  });

  it("calls a host unreachable after every attempt fails, naming the cause", async () => {
    const fetchImpl: typeof fetch = async () => {
      throw new TypeError("fetch failed", { cause: new Error("getaddrinfo ENOTFOUND x.test") });
    };
    const answer = await request("https://x.test/a", fetchImpl, instantly);
    assert.equal(answer.kind, "unreachable");
    assert.match(answer.kind === "unreachable" ? answer.reason : "", /ENOTFOUND x\.test.*after 3 attempts/);
  });
});

describe("readApi", () => {
  it("throws on an answer it cannot read, which is the observer's failure and not an outage", async () => {
    const fetchImpl: typeof fetch = async () => Response.json({ count: 0, tools: [] });
    await assert.rejects(readApi("https://x.test/api", fetchImpl, instantly), /no tools/);
  });
});

describe("thresholdsFrom", () => {
  it("defaults to 26 hours stale and 3 hours of deploy grace, and refuses a threshold that is not positive", () => {
    assert.deepEqual(thresholdsFrom({}), { staleAfterHours: 26, deployGraceHours: 3 });
    assert.deepEqual(thresholdsFrom({ STALE_AFTER_HOURS: "0.5" }).staleAfterHours, 0.5);
    assert.throws(() => thresholdsFrom({ STALE_AFTER_HOURS: "0" }), /positive/);
    assert.throws(() => thresholdsFrom({ DEPLOY_GRACE_HOURS: "soon" }), /positive/);
  });
});
