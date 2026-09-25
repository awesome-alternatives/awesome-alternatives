import type { RepositoryFacts } from "./facts-graphql.ts";
import type { EnrichedTool } from "./types.ts";

export interface ToolFactsRow {
  time: string;
  slug: string;
  stars: number;
  forks: number;
  open_issues: number | null;
  pushed_at: string | null;
  release_tag: string | null;
  release_published_at: string | null;
  signed: boolean | null;
}

export function runRows(
  checkedAt: string,
  tools: readonly EnrichedTool[],
  facts: ReadonlyMap<string, Pick<RepositoryFacts, "openIssues"> | null>,
): ToolFactsRow[] {
  return tools.map(({ slug, repo, release }) => ({
    time: checkedAt,
    slug,
    stars: repo.stars,
    forks: repo.forks,
    open_issues: facts.get(slug)?.openIssues ?? null,
    pushed_at: repo.pushedAt,
    release_tag: release?.tag ?? null,
    release_published_at: release?.publishedAt ?? null,
    signed: release?.signed ?? null,
  }));
}

type Json = Record<string, unknown>;

function isObject(value: unknown): value is Json {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function count(value: unknown): number | null {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0 ? value : null;
}

function instant(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const ms = Date.parse(value);
  return Number.isNaN(ms) ? null : new Date(ms).toISOString();
}

function snapshotRow(tool: unknown, time: string): ToolFactsRow | null {
  if (!isObject(tool) || typeof tool.slug !== "string" || !isObject(tool.repo)) return null;
  const stars = count(tool.repo.stars);
  const forks = count(tool.repo.forks);
  if (stars === null || forks === null) return null;
  const release: Json = isObject(tool.release) ? tool.release : {};
  return {
    time,
    slug: tool.slug,
    stars,
    forks,
    open_issues: null,
    pushed_at: instant(tool.repo.pushedAt),
    release_tag: typeof release.tag === "string" ? release.tag : null,
    release_published_at: instant(release.publishedAt),
    signed: typeof release.signed === "boolean" ? release.signed : null,
  };
}

export function snapshotRows(catalog: unknown, committedAt: string): ToolFactsRow[] {
  if (!isObject(catalog) || !Array.isArray(catalog.tools)) return [];
  const time = instant(catalog.checkedAt) ?? committedAt;
  return catalog.tools.flatMap((tool: unknown) => {
    const row = snapshotRow(tool, time);
    return row ? [row] : [];
  });
}
