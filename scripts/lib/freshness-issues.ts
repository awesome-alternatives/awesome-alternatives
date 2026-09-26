import { type OpenIssue, STALE_LABEL } from "./freshness.ts";
import { type GitHub, GitHubError } from "./github.ts";

const LOOKBACK_MS = 2 * 24 * 60 * 60 * 1000;

interface IssueSummary {
  number: number;
  html_url: string;
  created_at: string;
  user: { login: string } | null;
  pull_request?: unknown;
}

interface CommentSummary {
  created_at: string;
  user: { login: string } | null;
}

export interface IssueWriter {
  open(title: string, body: string): Promise<string>;
  comment(issue: OpenIssue, body: string): Promise<void>;
  close(issue: OpenIssue, body: string): Promise<void>;
}

export function lastUpdateAt(issue: IssueSummary, comments: readonly CommentSummary[]): string {
  const author = issue.user?.login;
  return comments
    .filter((comment) => author !== undefined && comment.user?.login === author)
    .map((comment) => comment.created_at)
    .reduce((latest, at) => (Date.parse(at) > Date.parse(latest) ? at : latest), issue.created_at);
}

export async function findOpenIssue(gh: GitHub, repository: string, now: Date): Promise<OpenIssue | null> {
  const base = `/repos/${repository}`;
  const issues = await gh.get<IssueSummary[]>(
    `${base}/issues?labels=${STALE_LABEL}&state=open&sort=created&direction=asc&per_page=10`,
  );
  const issue = issues?.find((candidate) => candidate.pull_request === undefined);
  if (!issue) return null;
  const since = new Date(now.getTime() - LOOKBACK_MS).toISOString();
  const comments = await gh.get<CommentSummary[]>(`${base}/issues/${issue.number}/comments?since=${since}&per_page=100`);
  return { number: issue.number, url: issue.html_url, lastUpdateAt: lastUpdateAt(issue, comments ?? []) };
}

export function createIssueWriter(repository: string, token: string, fetchImpl: typeof fetch = fetch): IssueWriter {
  const base = `/repos/${repository}`;

  async function send(method: "POST" | "PATCH", path: string, body: object): Promise<Response> {
    return fetchImpl(`https://api.github.com${path}`, {
      method,
      headers: {
        accept: "application/vnd.github+json",
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
        "x-github-api-version": "2022-11-28",
        "user-agent": "awesome-alternatives-freshness",
      },
      body: JSON.stringify(body),
    });
  }

  async function expect(res: Response, path: string): Promise<Response> {
    if (!res.ok) throw new GitHubError(res.status, path, (await res.text()).slice(0, 200));
    return res;
  }

  async function ensureLabel(): Promise<void> {
    const path = `${base}/labels`;
    const res = await send("POST", path, {
      name: STALE_LABEL,
      color: "d93f0b",
      description: "The published catalog stopped following the nightly refresh",
    });
    if (res.status !== 422) await expect(res, path);
  }

  async function comment(issue: OpenIssue, body: string): Promise<void> {
    const path = `${base}/issues/${issue.number}/comments`;
    await expect(await send("POST", path, { body }), path);
  }

  return {
    async open(title, body) {
      await ensureLabel();
      const path = `${base}/issues`;
      const res = await expect(await send("POST", path, { title, body, labels: [STALE_LABEL] }), path);
      return ((await res.json()) as { html_url: string }).html_url;
    },

    comment,

    async close(issue, body) {
      await comment(issue, body);
      const path = `${base}/issues/${issue.number}`;
      await expect(await send("PATCH", path, { state: "closed", state_reason: "completed" }), path);
    },
  };
}
