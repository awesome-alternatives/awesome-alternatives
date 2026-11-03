import { GitHubError } from "./github.ts";
import { MIN_AGE_DAYS } from "./rules.ts";
import type { Finding } from "./types.ts";

export const PR_LABELS = ["ready", "needs-review", "too-new"] as const;

export type PrLabel = (typeof PR_LABELS)[number];

export interface Verdict {
  number: number;
  labels: PrLabel[];
  readyOn: string | null;
}

export interface Comment {
  id: number;
  body: string;
  bot: boolean;
}

export interface LabelHost {
  headSha(number: number): Promise<string>;
  labels(number: number): Promise<string[]>;
  add(number: number, labels: readonly string[]): Promise<void>;
  remove(number: number, label: string): Promise<void>;
  comments(number: number): Promise<Comment[]>;
  comment(number: number, body: string): Promise<void>;
  editComment(id: number, body: string): Promise<void>;
}

const TOO_NEW_MARKER = "<!-- awesome-alternatives:too-new -->";

export function labelsFor(findings: readonly Finding[], checked: readonly string[]): PrLabel[] {
  if (!checked.length) return [];
  const out: PrLabel[] = [];
  if (!findings.some((f) => f.severity === "error")) out.push(findings.length ? "needs-review" : "ready");
  if (findings.some((f) => f.code === "too-new")) out.push("too-new");
  return out;
}

export function readyOn(findings: readonly Finding[]): string | null {
  const dates = findings.flatMap((f) => (f.code === "too-new" && f.clearsOn ? [f.clearsOn] : []));
  return dates.sort().at(-1) ?? null;
}

export function tooNewComment(date: string): string {
  return [
    TOO_NEW_MARKER,
    `A repository in this pull request is under ${MIN_AGE_DAYS} days old, so this pull request can't be merged yet. ` +
      `It becomes mergeable on **${date}**: Validate reruns daily and drops the \`too-new\` label once every repository is old enough.`,
  ].join("\n");
}

export function parseVerdict(numberText: string, labelsText: string, readyOnText?: string): Verdict {
  const trimmed = numberText.trim();
  if (!/^[1-9]\d{0,9}$/.test(trimmed)) throw new Error(`not a pull request number: ${trimmed.slice(0, 20)}`);
  const raw: unknown = JSON.parse(labelsText);
  if (!Array.isArray(raw)) throw new Error("labels are not a list");
  const labels = PR_LABELS.filter((label) => raw.includes(label));
  return { number: Number(trimmed), labels, readyOn: labels.includes("too-new") ? parseDate(readyOnText) : null };
}

function parseDate(text: string | undefined): string | null {
  if (text === undefined) return null;
  const trimmed = text.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed) || new Date(`${trimmed}T00:00:00Z`).toISOString().slice(0, 10) !== trimmed) {
    throw new Error(`not a date: ${trimmed.slice(0, 20)}`);
  }
  return trimmed;
}

export async function applyVerdict(
  host: LabelHost,
  verdict: Verdict,
  headSha: string,
): Promise<{ added: string[]; removed: string[]; commented: boolean }> {
  const current = await host.headSha(verdict.number);
  if (current !== headSha) throw new Error(`#${verdict.number} is at ${current}, not the validated ${headSha}`);

  const present = new Set(await host.labels(verdict.number));
  const wanted = new Set<string>(verdict.labels);
  const added = verdict.labels.filter((label) => !present.has(label));
  const removed = PR_LABELS.filter((label) => present.has(label) && !wanted.has(label));

  if (added.length) await host.add(verdict.number, added);
  for (const label of removed) await host.remove(verdict.number, label);
  const commented = verdict.readyOn ? await upsertTooNewComment(host, verdict.number, verdict.readyOn) : false;
  return { added, removed, commented };
}

async function upsertTooNewComment(host: LabelHost, number: number, date: string): Promise<boolean> {
  const body = tooNewComment(date);
  const existing = (await host.comments(number)).find((c) => c.bot && c.body.startsWith(TOO_NEW_MARKER));
  if (existing?.body === body) return false;
  if (existing) await host.editComment(existing.id, body);
  else await host.comment(number, body);
  return true;
}

export function createLabelHost(repository: string, token: string, fetchImpl: typeof fetch = fetch): LabelHost {
  const base = `/repos/${repository}`;

  async function call<T>(method: "GET" | "POST" | "PATCH" | "DELETE", path: string, body?: object): Promise<T> {
    const res = await fetchImpl(`https://api.github.com${path}`, {
      method,
      headers: {
        accept: "application/vnd.github+json",
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
        "x-github-api-version": "2022-11-28",
        "user-agent": "awesome-alternatives-labels",
      },
      ...(body && { body: JSON.stringify(body) }),
    });
    if (method === "DELETE" && res.status === 404) return null as T;
    if (!res.ok) throw new GitHubError(res.status, path, (await res.text()).slice(0, 200));
    return (res.status === 204 ? null : await res.json()) as T;
  }

  return {
    async headSha(number) {
      const pull = await call<{ head: { sha: string } }>("GET", `${base}/pulls/${number}`);
      return pull.head.sha;
    },
    async labels(number) {
      const labels = await call<{ name: string }[]>("GET", `${base}/issues/${number}/labels?per_page=100`);
      return labels.map((label) => label.name);
    },
    async add(number, labels) {
      await call("POST", `${base}/issues/${number}/labels`, { labels });
    },
    async remove(number, label) {
      await call("DELETE", `${base}/issues/${number}/labels/${encodeURIComponent(label)}`);
    },
    async comments(number) {
      const comments = await call<{ id: number; body?: string; user: { type: string } | null }[]>(
        "GET",
        `${base}/issues/${number}/comments?per_page=100`,
      );
      return comments.map((c) => ({ id: c.id, body: c.body ?? "", bot: c.user?.type === "Bot" }));
    },
    async comment(number, body) {
      await call("POST", `${base}/issues/${number}/comments`, { body });
    },
    async editComment(id, body) {
      await call("PATCH", `${base}/issues/comments/${id}`, { body });
    },
  };
}
