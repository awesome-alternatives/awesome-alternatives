import { hoursBetween, type MainCatalog, type Problem, type Served, type Surface, type Thresholds } from "./freshness.ts";

export interface Report {
  now: Date;
  main: MainCatalog;
  served: Readonly<Record<Surface, Served>>;
  problems: readonly Problem[];
  thresholds: Thresholds;
  repository: string;
  siteUrl: string;
  apiUrl: string;
  runUrl: string | null;
}

const NAMES: Record<Surface, string> = { site: "The site", api: "The API" };

function instant(iso: string): string {
  return iso.replace(/\.\d+Z$/, "Z");
}

function counted(count: number, unit: string): string {
  return `${count} ${unit}${count === 1 ? "" : "s"}`;
}

function hours(value: number): string {
  return value < 1 ? counted(Math.round(value * 60), "minute") : counted(Math.round(value), "hour");
}

export function titleOf(problems: readonly Problem[]): string {
  return problems.every((problem) => problem.kind === "unreachable")
    ? "Production does not answer the freshness check"
    : "The published catalog is stale";
}

function sentence(problem: Problem, report: Report): string {
  const { main, thresholds, now } = report;
  switch (problem.kind) {
    case "not-refreshed":
      return `No refresh has reached main for ${hours(problem.ageHours)}, past the ${hours(thresholds.staleAfterHours)} threshold: the catalog there was read from GitHub at ${instant(main.checkedAt)}.`;
    case "not-deployed": {
      const day = problem.readFromGitHub ? `, read from GitHub on ${problem.readFromGitHub},` : "";
      return `${NAMES[problem.surface]} serves a catalog older than main${day} ${hours(hoursBetween(main.committedAt, now))} after the last catalog commit, past the ${hours(thresholds.deployGraceHours)} allowed for a deploy.`;
    }
    case "unreachable":
      return `${NAMES[problem.surface]} does not answer: ${problem.reason}.`;
  }
}

function servedCell(served: Served): string {
  switch (served.kind) {
    case "current":
      return "the catalog on main";
    case "behind":
      return served.readFromGitHub ? `an older catalog, read from GitHub on ${served.readFromGitHub}` : "an older catalog";
    case "unreachable":
      return "no answer";
  }
}

function measurements(report: Report): string[] {
  const { main, served, repository, siteUrl, apiUrl } = report;
  const commit = `[${main.sha.slice(0, 7)}](https://github.com/${repository}/commit/${main.sha})`;
  return [
    "| | Serves |",
    "|---|---|",
    `| main | read from GitHub at ${instant(main.checkedAt)}, committed at ${instant(main.committedAt)} in ${commit} |`,
    `| [site](${siteUrl}) | ${servedCell(served.site)} |`,
    `| [API](${apiUrl}/v1/tools) | ${servedCell(served.api)} |`,
  ];
}

function footer(report: Report): string[] {
  const { repository, now, runUrl } = report;
  const repo = `https://github.com/${repository}`;
  const checked = runUrl ? `Checked at ${instant(now.toISOString())} by [this run](${runUrl}).` : `Checked at ${instant(now.toISOString())}.`;
  return [
    "Where to look:",
    "",
    `- the refresh CronJob in the cluster, see [Daily facts and the cluster runner](${repo}/blob/main/CONTRIBUTING.md#daily-facts-and-the-cluster-runner)`,
    `- [commits of the catalog](${repo}/commits/main/generated/catalog.json), the last one being the last refresh that published`,
    `- [Release runs](${repo}/actions/workflows/release.yml), which build the site and API images after a catalog commit`,
    `- [Refresh](${repo}/actions/workflows/refresh.yml), to run a refresh from Actions by hand`,
    "",
    checked,
  ];
}

export function openingBody(report: Report): string {
  return [
    ...report.problems.map((problem) => `- ${sentence(problem, report)}`),
    "",
    ...measurements(report),
    "",
    ...footer(report),
  ].join("\n");
}

export function stillStaleBody(report: Report): string {
  return `Still not fresh:\n\n${openingBody(report)}`;
}

export function recoveryBody(report: Report): string {
  const { main, now, runUrl } = report;
  const by = runUrl ? ` ([run](${runUrl}))` : "";
  return `Fresh again at ${instant(now.toISOString())}${by}: main was read from GitHub at ${instant(main.checkedAt)}, and the site and the API both serve it.`;
}
