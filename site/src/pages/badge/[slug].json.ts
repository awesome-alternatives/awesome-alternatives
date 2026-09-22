import type { APIContext, GetStaticPaths } from "astro";

import type { EnrichedTool } from "../../../../scripts/lib/types.ts";
import { badge } from "../../lib/badge.ts";
import { toolBySlug, tools } from "../../lib/catalog.ts";
import { alternativesTo } from "../../lib/filter.ts";

// TODO(2026-10-22): #84 is a growth experiment. If verification has not moved by then, delete this
// endpoint and its section in CONTRIBUTING rather than carrying it.
export const getStaticPaths = (() =>
  tools.map((tool) => ({ params: { slug: tool.slug }, props: { tool } }))) satisfies GetStaticPaths;

export function GET(context: APIContext) {
  const { tool } = context.props as { tool: EnrichedTool };
  const body = badge(
    tool,
    (slug) => toolBySlug(slug)?.name ?? slug,
    alternativesTo(tools, tool.slug).length,
  );
  return new Response(JSON.stringify(body), {
    headers: { "content-type": "application/json" },
  });
}
