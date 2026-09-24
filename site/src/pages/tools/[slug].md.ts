import type { APIContext, GetStaticPaths } from "astro";

import type { EnrichedTool } from "../../../../scripts/lib/types.ts";
import { capabilityLabels, categories, categoryName, checkedAt, nameOf, tools } from "../../lib/catalog.ts";
import { alternativesTo } from "../../lib/filter.ts";
import { migrationPairs } from "../../lib/migrationPages.ts";
import { toolMarkdown } from "../../lib/markdown.ts";

export const getStaticPaths = (() =>
  tools.map((tool) => ({ params: { slug: tool.slug }, props: { tool } }))) satisfies GetStaticPaths;

export async function GET(context: APIContext) {
  const { tool } = context.props as { tool: EnrichedTool };
  const markdown = toolMarkdown(tool, {
    categoryName: categoryName(tool.category),
    selfHost: categories[tool.category]?.selfHost === true,
    checkedAt,
    capabilityLabels: capabilityLabels(),
    migrationNotes: (await migrationPairs()).filter((pair) => pair.to === tool.slug).map((pair) => pair.from),
    nameOf,
    replacedBy: alternativesTo(tools, tool.slug).map((other) => ({ slug: other.slug, name: other.name })),
  });
  return new Response(markdown, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}
