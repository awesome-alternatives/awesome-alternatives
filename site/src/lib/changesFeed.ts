import rss from "@astrojs/rss";

import type { CatalogEvent } from "../../../scripts/lib/types.ts";
import { type Locale, messages, pathFor } from "../i18n/index.ts";
import { toolBySlug } from "./catalog.ts";
import { changeChannel } from "./changes.ts";

export interface ChangesFeed {
  locale: Locale;
  site: URL | undefined;
  title: string;
  description: string;
  events: readonly CatalogEvent[];
  groupAdditions: boolean;
}

export function changesFeed({ locale, site, title, description, events, groupAdditions }: ChangesFeed): Promise<Response> {
  return rss(
    changeChannel({
      title,
      description,
      site: site?.href ?? "https://awesome-alternatives.com",
      events,
      groupAdditions,
      locale,
      strings: messages(locale).changes,
      toolOf: toolBySlug,
      link: (path) => pathFor(locale, path),
    }),
  );
}
