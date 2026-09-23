import rss from "@astrojs/rss";
import type { APIContext, GetStaticPaths } from "astro";

import type { Locale } from "../../i18n/index.ts";
import { messages, pathFor } from "../../i18n/index.ts";
import { localePaths } from "../../i18n/paths.ts";
import { nameOf, tools } from "../../lib/catalog.ts";
import { feedItem, newestTools } from "../../lib/feed.ts";

export const getStaticPaths = (() => localePaths()) satisfies GetStaticPaths;

export function GET(context: APIContext) {
  const locale = (context.props as { locale: Locale }).locale;
  const m = messages(locale);
  return rss({
    title: m.feed.title,
    description: m.feed.description,
    site: context.site ?? "https://awesome-alternatives.com",
    items: newestTools(tools).map((tool) =>
      feedItem(tool, nameOf, m.feed, (path) => pathFor(locale, path)),
    ),
  });
}
