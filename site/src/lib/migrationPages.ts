import { getCollection } from "astro:content";

import { pairOf } from "./migrations.ts";

export async function migrationPairs(): Promise<{ from: string; to: string }[]> {
  const entries = await getCollection("migrations");
  return entries.flatMap((entry) => {
    const pair = pairOf(entry.id);
    return pair ? [pair] : [];
  });
}
