import { badgeStats } from "../lib/stats.ts";

export function GET() {
  return new Response(JSON.stringify(badgeStats()), {
    headers: { "content-type": "application/json" },
  });
}
