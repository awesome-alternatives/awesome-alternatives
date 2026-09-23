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
const NOINDEX = /<meta name="robots" content="noindex"/;

export function metaOf(path: string, html: string): PageMeta {
  return {
    path,
    lang: LANG.exec(html)?.[1] ?? "",
    title: TITLE.exec(html)?.[1]?.trim() ?? "",
    description: DESCRIPTION.exec(html)?.[1]?.trim() ?? "",
    noindex: NOINDEX.test(html),
  };
}

export function clashes(pages: readonly PageMeta[]): Clash[] {
  const out: Clash[] = [];
  for (const field of ["title", "description"] as const) {
    const byValue = new Map<string, string[]>();
    for (const page of pages) {
      if (page.noindex) continue;
      const key = JSON.stringify([page.lang, page[field]]);
      byValue.set(key, [...(byValue.get(key) ?? []), page.path]);
    }
    for (const [key, paths] of byValue) {
      const [lang, value] = JSON.parse(key) as [string, string];
      if (paths.length > 1) out.push({ field, lang, value, paths });
    }
  }
  return out;
}
