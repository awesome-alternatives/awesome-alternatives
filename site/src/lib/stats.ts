import { categoryGroups, targets, tools } from "./catalog.ts";

export interface BadgeStats {
  tools: number;
  categories: number;
  targets: number;
  verified: number;
}

export function badgeStats(): BadgeStats {
  return {
    tools: tools.length,
    categories: categoryGroups.length,
    targets: targets().length,
    verified: tools.filter((tool) => tool.maintainerVerified).length,
  };
}
