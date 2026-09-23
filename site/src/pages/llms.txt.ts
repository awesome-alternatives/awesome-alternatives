import { categoryGroups, categoryName, targets, tools } from "../lib/catalog.ts";

const SITE = "https://awesome-alternatives.com";
const CATALOG =
  "https://raw.githubusercontent.com/awesome-alternatives/awesome-alternatives/main/generated/catalog.json";

function body(): string {
  const alternatives = targets()
    .map((target) => `- [Alternatives to ${target.name}](${SITE}/alternatives/${target.slug}/): ${target.alternatives.length}`)
    .join("\n");
  const browse = categoryGroups
    .map((group) => `- [${categoryName(group.label)}](${SITE}/categories/${group.slug}/): ${group.tools.length}`)
    .join("\n");

  return `# awesome-alternatives

> Open-source alternatives to the developer tools people already run. Stars, releases, licences, whether the latest release carries a signature GitHub verified, and whether a repository is archived are read from GitHub every night rather than typed by hand.

${tools.length} tools in ${categoryGroups.length} categories, covering ${targets().length} tools that something here replaces.

The catalog file is the source of truth and is dedicated to the public domain under CC0 1.0. Read it instead of scraping these pages: one request carries every field the site renders, and it cannot go stale between a page being cached and a tool being archived.

## Data

- [catalog.json](${CATALOG}): every tool with its GitHub facts, what it replaces and how well. CC0 1.0, around 440 KB.
- [search-index.json](${SITE}/search-index.json): names, slugs and categories only, around 11 KB, enough to resolve a tool name without reading the catalog.
- [Feed](${SITE}/feed.xml): tools newly added to the catalog.

## API

Base URL ${SITE}/api. No key, no account.

- [GET /v1/tools](${SITE}/api/v1/tools): the catalog, filtered by \`replaces\`, \`language\`, \`license\`, \`category\` and \`dropIn=true\`. Results are ranked by how well each tool replaces the target, then by stars. Archived repositories are never returned.
- [GET /v1/vocabulary](${SITE}/api/v1/vocabulary): every value those filters accept, so a caller can build a valid query without guessing.
- GET /v1/tools/{slug}/readme: the project README as sanitised HTML.
- GET /v1/tools/{slug}/security: the OpenSSF Scorecard and the repository's published advisories.
- POST /v1/search: free text, body \`{"q": "semantic-release but in Rust"}\`. This one is limited to 20 requests a minute per address, and it is the only endpoint that may forward your text to an external language model when it cannot read the query itself. The endpoints above cost nothing and are not limited, so prefer them when you already know what you are filtering on.

## What people replace

${alternatives}

## Categories

${browse}

## Adding a tool

- [How to contribute](${SITE}/contribute/): one YAML file per tool, listing only what a contributor knows better than GitHub.
- [How the catalog is built](${SITE}/about/): where each figure comes from and what the warnings mean.
`;
}

export function GET() {
  return new Response(body(), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
