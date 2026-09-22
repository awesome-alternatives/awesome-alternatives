import rss from "@astrojs/rss";
import type { APIContext } from "astro";

import { toolBySlug, tools } from "../lib/catalog.ts";
import { feedItem, newestTools } from "../lib/feed.ts";

export function GET(context: APIContext) {
  return rss({
    title: "awesome-alternatives: new tools",
    description: "Open-source alternatives newly added to the awesome-alternatives catalog.",
    site: context.site ?? "https://awesome-alternatives.com",
    items: newestTools(tools).map((tool) => feedItem(tool, (slug) => toolBySlug(slug)?.name ?? slug)),
  });
}
