export interface PageMeta {
  path: string;
  lang: string;
  title: string;
  description: string;
  noindex: boolean;
}

export interface Clash {
  field: "title" | "description";
  lang: string;
  value: string;
  paths: string[];
}

const LANG = /<html lang="([^"]*)"/;
const TITLE = /<title>([^<]*)<\/title>/;
const DESCRIPTION = /<meta name="description" content="([^"]*)"/;
const NOINDEX = /<meta name="robots" content="noindex[",]/;

export function metaOf(path: string, html: string): PageMeta {
  return {
    path,
    lang: LANG.exec(html)?.[1] ?? "",
    title: TITLE.exec(html)?.[1]?.trim() ?? "",
    description: DESCRIPTION.exec(html)?.[1]?.trim() ?? "",
    noindex: NOINDEX.test(html),
  };
}

const FIELDS = ["title", "description"] as const;

export function clashes(pages: Iterable<PageMeta>): Clash[] {
  const seen = { title: new Map<string, string[]>(), description: new Map<string, string[]>() };
  for (const page of pages) {
    if (page.noindex) continue;
    for (const field of FIELDS) {
      const key = JSON.stringify([page.lang, page[field]]);
      seen[field].set(key, [...(seen[field].get(key) ?? []), page.path]);
    }
  }
  return FIELDS.flatMap((field) =>
    [...seen[field]].flatMap(([key, paths]) => {
      const [lang, value] = JSON.parse(key) as [string, string];
      return paths.length > 1 ? [{ field, lang, value, paths }] : [];
    }),
  );
}
