import type { Category, Group as Section } from "../../../scripts/lib/types.ts";
import type { Group } from "./groups.ts";
import type { ToolView } from "./types.ts";

export interface SectionCategory {
  slug: string;
  key: string;
  count: number;
  top: { slug: string; name: string }[];
}

export interface SectionPage {
  slug: string;
  section: Section;
  categories: SectionCategory[];
  tools: number;
}

const TOP = 3;

export function sectionPages(
  sections: Readonly<Record<string, Section>>,
  categories: Readonly<Record<string, Pick<Category, "group">>>,
  byCategory: readonly Group<ToolView>[],
): SectionPage[] {
  return Object.entries(sections)
    .map(([slug, section]) => {
      const rows = byCategory
        .filter((group) => categories[group.label]?.group === slug)
        .map((group) => ({
          slug: group.slug,
          key: group.label,
          count: group.tools.length,
          top: group.tools.slice(0, TOP).map((tool) => ({ slug: tool.slug, name: tool.name })),
        }));
      return { slug, section, categories: rows, tools: rows.reduce((sum, row) => sum + row.count, 0) };
    })
    .filter((page) => page.categories.length > 0);
}
