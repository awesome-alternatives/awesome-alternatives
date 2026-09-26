import { type Action, planAction, probeSlug, problemsOf, servedBy, STALE_LABEL, thresholdsFrom } from "./lib/freshness.ts";
import { createIssueWriter, findOpenIssue, type IssueWriter } from "./lib/freshness-issues.ts";
import { openingBody, recoveryBody, type Report, stillStaleBody, titleOf } from "./lib/freshness-report.ts";
import { RETRY, readApi, readMain, readSite } from "./lib/freshness-sources.ts";
import { createGitHub } from "./lib/github.ts";

const dryRun = process.argv.includes("--dry-run");
const repository = process.env.GITHUB_REPOSITORY || "awesome-alternatives/awesome-alternatives";
const siteUrl = process.env.SITE_URL || "https://awesome-alternatives.com";
const apiUrl = process.env.API_URL || `${siteUrl}/api`;
const token = process.env.GITHUB_TOKEN;
const thresholds = thresholdsFrom(process.env);
const runUrl = process.env.GITHUB_RUN_ID
  ? `${process.env.GITHUB_SERVER_URL}/${repository}/actions/runs/${process.env.GITHUB_RUN_ID}`
  : null;

const gh = createGitHub(token);
const main = await readMain(gh, repository);
const [site, api] = await Promise.all([
  readSite(siteUrl, probeSlug(main), fetch, RETRY),
  readApi(apiUrl, fetch, RETRY),
]);
const now = new Date();
const served = { site: servedBy(site, main), api: servedBy(api, main) };
const problems = problemsOf(now, main, served, thresholds);
const report: Report = { now, main, served, problems, thresholds, repository, siteUrl, apiUrl, runUrl };

console.log(`main: read from GitHub at ${main.checkedAt}, committed at ${main.committedAt} in ${main.sha}`);
console.log(`site: ${JSON.stringify(served.site)}`);
console.log(`api: ${JSON.stringify(served.api)}`);
console.log(problems.length === 0 ? "fresh" : `not fresh: ${problems.map((problem) => problem.kind).join(", ")}`);

const open = await findOpenIssue(gh, repository, now);
const action = planAction(problems, open, now);

function describe(action: Action): string {
  switch (action.kind) {
    case "none":
      return open ? `leave ${open.url} alone, last updated at ${open.lastUpdateAt}` : "do nothing";
    case "open":
      return `open an issue labelled ${STALE_LABEL}: ${titleOf(problems)}\n\n${openingBody(report)}`;
    case "comment":
      return `comment on ${action.issue.url}\n\n${stillStaleBody(report)}`;
    case "close":
      return `comment on and close ${action.issue.url}\n\n${recoveryBody(report)}`;
  }
}

async function apply(action: Action, writer: IssueWriter): Promise<void> {
  switch (action.kind) {
    case "none":
      return;
    case "open":
      console.log(`opened ${await writer.open(titleOf(problems), openingBody(report))}`);
      return;
    case "comment":
      await writer.comment(action.issue, stillStaleBody(report));
      return;
    case "close":
      await writer.close(action.issue, recoveryBody(report));
      return;
  }
}

console.log(`${dryRun ? "dry run, would" : "will"} ${describe(action)}`);
if (!dryRun) {
  if (!token) throw new Error("GITHUB_TOKEN is required to open or update the issue, or pass --dry-run");
  await apply(action, createIssueWriter(repository, token));
}
