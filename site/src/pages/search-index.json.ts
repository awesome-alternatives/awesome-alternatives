import { categories, tools } from "../lib/catalog.ts";
import type { SuggestIndex } from "../lib/suggest.ts";

export function GET() {
  const index: SuggestIndex = {
    tools: tools.map((tool) => ({
      slug: tool.slug,
      name: tool.name,
      category: categories[tool.category]?.name ?? tool.category,
    })),
    targets: [...new Set(tools.flatMap((tool) => tool.replaces.map((r) => r.tool)))].sort(),
  };
  return new Response(JSON.stringify(index), {
    headers: { "content-type": "application/json" },
  });
}
