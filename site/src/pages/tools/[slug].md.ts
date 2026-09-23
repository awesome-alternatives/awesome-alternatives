import type { APIContext, GetStaticPaths } from "astro";

import type { EnrichedTool } from "../../../../scripts/lib/types.ts";
import { categories, categoryName, toolBySlug, tools } from "../../lib/catalog.ts";
import { alternativesTo } from "../../lib/filter.ts";
import { toolMarkdown } from "../../lib/markdown.ts";

export const getStaticPaths = (() =>
  tools.map((tool) => ({ params: { slug: tool.slug }, props: { tool } }))) satisfies GetStaticPaths;

export function GET(context: APIContext) {
  const { tool } = context.props as { tool: EnrichedTool };
  const markdown = toolMarkdown(tool, {
    categoryName: categoryName(tool.category),
    selfHost: categories[tool.category]?.selfHost === true,
    nameOf: (slug) => toolBySlug(slug)?.name ?? slug,
    replacedBy: alternativesTo(tools, tool.slug).map((other) => ({ slug: other.slug, name: other.name })),
  });
  return new Response(markdown, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}
