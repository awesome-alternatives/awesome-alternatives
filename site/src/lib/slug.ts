export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replaceAll("+", "-plus")
    .replaceAll("#", "-sharp")
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^[-.]+|[-.]+$/g, "");
}
