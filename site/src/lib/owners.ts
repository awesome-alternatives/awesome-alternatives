export interface OwnerEntry {
  repo: { fullName: string };
}

export function loginOf(fullName: string): string {
  return fullName.split("/")[0] ?? fullName;
}

export function listedOwners(tools: readonly OwnerEntry[]): string[] {
  const counts = new Map<string, number>();
  for (const tool of tools) {
    const login = loginOf(tool.repo.fullName);
    counts.set(login, (counts.get(login) ?? 0) + 1);
  }
  return [...counts]
    .filter(([, count]) => count > 1)
    .map(([login]) => login)
    .sort((a, b) => a.localeCompare(b));
}
