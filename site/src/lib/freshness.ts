import type { EnrichedTool } from "../../../scripts/lib/types.ts";

export type Dated = Pick<EnrichedTool, "editedAt" | "factsChangedAt"> & {
  release: { publishedAt: string | null } | null;
};

export function lastModified(tool: Dated): string {
  return [tool.release?.publishedAt ?? null, tool.factsChangedAt]
    .filter((date): date is string => date !== null)
    .reduce((latest, date) => (Date.parse(date) > Date.parse(latest) ? date : latest), tool.editedAt);
}

export function historyUrl(slug: string): string {
  return `https://github.com/awesome-alternatives/awesome-alternatives/commits/main/data/tools/${slug}.yaml`;
}
