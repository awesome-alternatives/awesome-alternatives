import { setTimeout as delay } from "node:timers/promises";
import { type MainCatalog, mainCatalog, parseToolMarkdown, type PublishedCatalog, type Reading } from "./freshness.ts";
import type { GitHub } from "./github.ts";

const PUBLISHED_CATALOG = "generated/catalog.json";
const USER_AGENT = "awesome-alternatives-freshness";

export interface Retry {
  attempts: number;
  delayMs: number;
  timeoutMs: number;
}

export const RETRY: Retry = { attempts: 3, delayMs: 20_000, timeoutMs: 30_000 };

type Answer = { kind: "answered"; body: string } | { kind: "unreachable"; reason: string };

interface ApiTools {
  tools: { slug: string; repo: { stars: number } }[];
}

interface CommitSummary {
  sha: string;
  commit: { committer: { date: string } | null };
}

export async function request(url: string, fetchImpl: typeof fetch, retry: Retry): Promise<Answer> {
  let reason = "";
  for (let attempt = 1; attempt <= retry.attempts; attempt++) {
    if (attempt > 1) await delay(retry.delayMs);
    try {
      const res = await fetchImpl(url, {
        headers: { "user-agent": USER_AGENT },
        signal: AbortSignal.timeout(retry.timeoutMs),
      });
      if (res.ok) return { kind: "answered", body: await res.text() };
      reason = `HTTP ${res.status}`;
    } catch (error) {
      reason = describe(error);
    }
  }
  return { kind: "unreachable", reason: `${reason} from ${url} after ${retry.attempts} attempts` };
}

function describe(error: unknown): string {
  if (!(error instanceof Error)) return String(error);
  return error.cause instanceof Error ? `${error.message} (${error.cause.message})` : error.message;
}

export async function readSite(siteUrl: string, slug: string, fetchImpl: typeof fetch, retry: Retry): Promise<Reading> {
  const answer = await request(`${siteUrl}/tools/${slug}.md`, fetchImpl, retry);
  if (answer.kind === "unreachable") return answer;
  return { kind: "served", sample: parseToolMarkdown(slug, answer.body) };
}

export async function readApi(apiUrl: string, fetchImpl: typeof fetch, retry: Retry): Promise<Reading> {
  const url = `${apiUrl}/v1/tools?limit=20`;
  const answer = await request(url, fetchImpl, retry);
  if (answer.kind === "unreachable") return answer;
  const { tools } = JSON.parse(answer.body) as ApiTools;
  if (!Array.isArray(tools) || tools.length === 0) throw new Error(`${url} answered with no tools`);
  return {
    kind: "served",
    sample: { readFromGitHub: null, stars: new Map(tools.map((tool) => [tool.slug, tool.repo.stars])) },
  };
}

export async function readMain(gh: GitHub, repository: string): Promise<MainCatalog> {
  const commits = await gh.get<CommitSummary[]>(`/repos/${repository}/commits?path=${PUBLISHED_CATALOG}&per_page=1`);
  const last = commits?.[0];
  const committedAt = last?.commit.committer?.date;
  if (!last || !committedAt) throw new Error(`no commit of ${PUBLISHED_CATALOG} on the default branch of ${repository}`);
  const catalog = await gh.get<PublishedCatalog>(
    `/repos/${repository}/contents/${PUBLISHED_CATALOG}?ref=${last.sha}`,
    "application/vnd.github.raw+json",
  );
  if (!catalog) throw new Error(`${PUBLISHED_CATALOG} is missing at ${last.sha}`);
  return mainCatalog(catalog, last.sha, committedAt);
}
