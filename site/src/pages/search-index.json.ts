import { categories, products, tools } from "../lib/catalog.ts";
import type { SuggestIndex } from "../lib/suggest.ts";

export function GET() {
  const index: SuggestIndex = {
    tools: [...tools, ...products].map((entry) => ({
      slug: entry.slug,
      name: entry.name,
      category: categories[entry.category]?.name ?? entry.category,
    })),
    targets: [...new Set(tools.flatMap((tool) => tool.replaces.map((r) => r.tool)))].sort(),
  };
  return new Response(JSON.stringify(index), {
    headers: { "content-type": "application/json" },
  });
}
