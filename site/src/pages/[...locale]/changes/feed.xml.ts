import type { APIContext, GetStaticPaths } from "astro";

import type { Locale } from "../../../i18n/index.ts";
import { messages } from "../../../i18n/index.ts";
import { localePaths } from "../../../i18n/paths.ts";
import { events } from "../../../lib/catalog.ts";
import { changesFeed } from "../../../lib/changesFeed.ts";

export const getStaticPaths = (() => localePaths()) satisfies GetStaticPaths;

export function GET(context: APIContext) {
  const locale = (context.props as { locale: Locale }).locale;
  const m = messages(locale).changes;
  return changesFeed({ locale, site: context.site, title: m.feedTitle, description: m.feedDescription, events, groupAdditions: true });
}
