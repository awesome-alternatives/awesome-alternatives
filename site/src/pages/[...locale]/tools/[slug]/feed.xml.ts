import type { APIContext, GetStaticPaths } from "astro";

import type { EnrichedTool } from "../../../../../../scripts/lib/types.ts";
import type { Locale } from "../../../../i18n/index.ts";
import { format, messages } from "../../../../i18n/index.ts";
import { localePathsFor } from "../../../../i18n/paths.ts";
import { events, tools } from "../../../../lib/catalog.ts";
import { eventsOfTool } from "../../../../lib/changes.ts";
import { changesFeed } from "../../../../lib/changesFeed.ts";

export const getStaticPaths = (() =>
  localePathsFor(tools.map((tool) => ({ params: { slug: tool.slug }, props: { tool } })))) satisfies GetStaticPaths;

export function GET(context: APIContext) {
  const { locale, tool } = context.props as { locale: Locale; tool: EnrichedTool };
  const m = messages(locale).changes;
  return changesFeed({
    locale,
    site: context.site,
    title: format(m.toolFeedTitle, { name: tool.name }),
    description: format(m.toolFeedDescription, { name: tool.name }),
    events: eventsOfTool(events, tool.slug),
    groupAdditions: false,
  });
}
