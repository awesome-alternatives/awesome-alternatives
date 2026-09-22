import type { Filters } from "./types.ts";

export function toQuery(filters: Filters): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== false) params.set(key, String(value));
  }
  return params.toString();
}
