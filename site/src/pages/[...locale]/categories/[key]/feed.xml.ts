import type { APIContext, GetStaticPaths } from "astro";

import type { Locale } from "../../../../i18n/index.ts";
import { format, messages } from "../../../../i18n/index.ts";
import { localePathsFor } from "../../../../i18n/paths.ts";
import { categoryGroups, categoryName, events, tools } from "../../../../lib/catalog.ts";
import { eventsOfCategory } from "../../../../lib/changes.ts";
import { changesFeed } from "../../../../lib/changesFeed.ts";

export const getStaticPaths = (() =>
  localePathsFor(categoryGroups.map((group) => ({ params: { key: group.slug }, props: { key: group.label } })))) satisfies GetStaticPaths;

export function GET(context: APIContext) {
  const { locale, key } = context.props as { locale: Locale; key: string };
  const m = messages(locale).changes;
  const name = categoryName(key);
  return changesFeed({
    locale,
    site: context.site,
    title: format(m.categoryFeedTitle, { name }),
    description: format(m.categoryFeedDescription, { name }),
    events: eventsOfCategory(events, tools, key),
    groupAdditions: true,
  });
}
