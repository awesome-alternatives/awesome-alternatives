export function canonicalForTool(slug: string, alternatives: number): string {
  return alternatives > 0 ? `/alternatives/${slug}/` : `/tools/${slug}/`;
}

export function isReplaced(tools: readonly { replaces: readonly { tool: string }[]; repo: { archived: boolean } }[], slug: string): boolean {
  return tools.some((tool) => !tool.repo.archived && tool.replaces.some((r) => r.tool === slug));
}
