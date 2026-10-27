import { GitHubError } from "./github.ts";
import type { Finding } from "./types.ts";

export const PR_LABELS = ["ready", "needs-review", "too-new"] as const;

export type PrLabel = (typeof PR_LABELS)[number];

export interface Verdict {
  number: number;
  labels: PrLabel[];
}

export interface LabelHost {
  headSha(number: number): Promise<string>;
  labels(number: number): Promise<string[]>;
  add(number: number, labels: readonly string[]): Promise<void>;
  remove(number: number, label: string): Promise<void>;
}

export function labelsFor(findings: readonly Finding[], checked: readonly string[]): PrLabel[] {
  if (!checked.length) return [];
  const out: PrLabel[] = [];
  if (!findings.some((f) => f.severity === "error")) out.push(findings.length ? "needs-review" : "ready");
  if (findings.some((f) => f.code === "too-new")) out.push("too-new");
  return out;
}

export function parseVerdict(numberText: string, labelsText: string): Verdict {
  const trimmed = numberText.trim();
  if (!/^[1-9]\d{0,9}$/.test(trimmed)) throw new Error(`not a pull request number: ${trimmed.slice(0, 20)}`);
  const raw: unknown = JSON.parse(labelsText);
  if (!Array.isArray(raw)) throw new Error("labels are not a list");
  const labels = PR_LABELS.filter((label) => raw.includes(label));
  return { number: Number(trimmed), labels };
}

export async function applyVerdict(host: LabelHost, verdict: Verdict, headSha: string): Promise<{ added: string[]; removed: string[] }> {
  const current = await host.headSha(verdict.number);
  if (current !== headSha) throw new Error(`#${verdict.number} is at ${current}, not the validated ${headSha}`);

  const present = new Set(await host.labels(verdict.number));
  const wanted = new Set<string>(verdict.labels);
  const added = verdict.labels.filter((label) => !present.has(label));
  const removed = PR_LABELS.filter((label) => present.has(label) && !wanted.has(label));

  if (added.length) await host.add(verdict.number, added);
  for (const label of removed) await host.remove(verdict.number, label);
  return { added, removed };
}

export function createLabelHost(repository: string, token: string, fetchImpl: typeof fetch = fetch): LabelHost {
  const base = `/repos/${repository}`;

  async function call<T>(method: "GET" | "POST" | "DELETE", path: string, body?: object): Promise<T> {
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
  };
}
