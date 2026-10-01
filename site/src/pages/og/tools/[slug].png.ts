import type { APIRoute, GetStaticPaths } from "astro";
import { categoryName, nameOf, tools } from "../../../lib/catalog.ts";
import { alternativesTo } from "../../../lib/filter.ts";
import { toolCard } from "../../../lib/socialImage.ts";
import { renderSocialImage } from "../../../lib/socialRender.ts";
import type { EnrichedTool } from "../../../../../scripts/lib/types.ts";

export const getStaticPaths = (() =>
  tools
    .filter((tool) => alternativesTo(tools, tool.slug).length === 0)
    .map((tool) => ({ params: { slug: tool.slug }, props: { tool } }))) satisfies GetStaticPaths;

export const GET: APIRoute<{ tool: EnrichedTool }> = async ({ props: { tool } }) => {
  const card = toolCard(tool, categoryName(tool.category), tool.replaces.map((r) => nameOf(r.tool)));
  return new Response(new Uint8Array(await renderSocialImage(card)), { headers: { "Content-Type": "image/png" } });
};
