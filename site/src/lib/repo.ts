export const REPO = "https://github.com/awesome-alternatives/awesome-alternatives";
export const APP = "https://github.com/apps/awesome-alternatives";
export const REFRESH_ACTION = "https://github.com/awesome-alternatives/refresh-action";

const SKELETON = `name: The name people call it
repository: https://github.com/owner/name
category: a-key-from-data-categories-yaml
replaces:
  - tool: slug-of-the-tool-it-replaces
    fit: partial
    note: Which part of the job it covers.
`;

export const NEW_TOOL_URL = `${REPO}/new/main/data/tools?filename=your-tool.yaml&value=${encodeURIComponent(SKELETON)}`;
export const SUGGEST_TOOL_URL = `${REPO}/issues/new?template=suggest-a-tool.yml`;

const ABSOLUTE = /^([a-z][a-z\d+.-]*:|\/|#)/i;

export function repoUrl(href: string): string {
  if (ABSOLUTE.test(href)) return href;
  return `${REPO}/blob/main/${href.replace(/^\.\//, "")}`;
}

interface Anchor {
  properties?: Record<string, unknown>;
}

interface VisitContext {
  setProperty(node: Anchor, key: string, value: unknown): void;
}

export const repoLinks = {
  name: "repo-links",
  element: {
    filter: ["a"],
    visit(node: Anchor, ctx: VisitContext) {
      const href = node.properties?.href;
      if (typeof href === "string") ctx.setProperty(node, "href", repoUrl(href));
    },
  },
};
