import type { EnrichedTool } from "../../../scripts/lib/types.ts";
import { format } from "../i18n/index.ts";

export const FEED_SIZE = 50;

export interface FeedStrings {
  joined: string;
  replaces: string;
}

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

export function feedItem(
  tool: EnrichedTool,
  nameOf: (slug: string) => string,
  strings: FeedStrings,
  link: (path: string) => string = (path) => path,
): FeedItem {
  const replaces = tool.replaces.map((r) => nameOf(r.tool));
  const summary = sentence(tool.repo.description ?? format(strings.joined, { name: tool.name }));
  return {
    title: tool.name,
    link: link(`/tools/${tool.slug}/`),
    pubDate: new Date(tool.addedAt),
    description: replaces.length ? `${summary} ${format(strings.replaces, { names: replaces.join(", ") })}` : summary,
  };
}
