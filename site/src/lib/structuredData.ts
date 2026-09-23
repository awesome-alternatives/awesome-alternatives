import type { EnrichedTool } from "../../../scripts/lib/types.ts";

const CONTEXT = "https://schema.org";
const UNCLASSIFIED = new Set(["Other", "NOASSERTION"]);

export interface SoftwareSourceCode {
  "@context": typeof CONTEXT;
  "@type": "SoftwareSourceCode";
  name: string;
  url: string;
  codeRepository: string;
  dateModified: string;
  description?: string;
  license?: string;
  programmingLanguage?: string;
  version?: string;
}

export interface ListItem {
  "@type": "ListItem";
  position: number;
  name: string;
  url: string;
}

export interface ItemList {
  "@context": typeof CONTEXT;
  "@type": "ItemList";
  name: string;
  numberOfItems: number;
  itemListElement: ListItem[];
}

export interface BreadcrumbList {
  "@context": typeof CONTEXT;
  "@type": "BreadcrumbList";
  itemListElement: { "@type": "ListItem"; position: number; name: string; item: string }[];
}

export type StructuredData = SoftwareSourceCode | ItemList | BreadcrumbList;

export function spdxUrl(license: string | null): string | null {
  return license && !UNCLASSIFIED.has(license) ? `https://spdx.org/licenses/${license}.html` : null;
}

export function softwareSourceCode(
  tool: Pick<EnrichedTool, "name" | "repository" | "path" | "repo" | "release">,
  url: string,
): SoftwareSourceCode {
  const { repo, release } = tool;
  const license = spdxUrl(repo.license);
  return {
    "@context": CONTEXT,
    "@type": "SoftwareSourceCode",
    name: tool.name,
    url,
    codeRepository: tool.path ? `${tool.repository}/tree/HEAD/${tool.path}` : tool.repository,
    dateModified: repo.pushedAt,
    ...(repo.description ? { description: repo.description } : {}),
    ...(license ? { license } : {}),
    ...(repo.language ? { programmingLanguage: repo.language } : {}),
    ...(release ? { version: release.tag } : {}),
  };
}

export function itemList(name: string, items: readonly { name: string; url: string }[]): ItemList {
  return {
    "@context": CONTEXT,
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, ...item })),
  };
}

export function breadcrumbList(crumbs: readonly { name: string; url: string }[]): BreadcrumbList {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

export function serialize(data: StructuredData): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
