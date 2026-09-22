import type { EnrichedTool } from "../../../scripts/lib/types.ts";

export const FEED_SIZE = 50;

export interface FeedItem {
  title: string;
  link: string;
  pubDate: Date;
  description: string;
}

export function newestTools(tools: readonly EnrichedTool[], size = FEED_SIZE): EnrichedTool[] {
  return [...tools]
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt) || a.slug.localeCompare(b.slug))
    .slice(0, size);
}

function sentence(text: string): string {
  const trimmed = text.trim();
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

export function feedItem(tool: EnrichedTool, nameOf: (slug: string) => string): FeedItem {
  const replaces = tool.replaces.map((r) => nameOf(r.tool));
  const summary = sentence(tool.repo.description ?? `${tool.name} joined the catalog`);
  return {
    title: tool.name,
    link: `/tools/${tool.slug}/`,
    pubDate: new Date(tool.addedAt),
    description: replaces.length ? `${summary} Replaces ${replaces.join(", ")}.` : summary,
  };
}
