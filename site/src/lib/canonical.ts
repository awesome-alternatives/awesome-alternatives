export function canonicalForTool(slug: string, alternatives: number): string {
  return alternatives > 0 ? `/alternatives/${slug}/` : `/tools/${slug}/`;
}
