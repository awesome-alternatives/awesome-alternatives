import { trimEdges } from "./trim.ts";

export function slugify(value: string): string {
  const dashed = value
    .toLowerCase()
    .replaceAll("+", "-plus")
    .replaceAll("#", "-sharp")
    .replace(/[^a-z0-9.]+/g, "-");
  return trimEdges(dashed, "-.");
}
