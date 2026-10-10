import { capabilityLabels, categoryGroups, categoryName, targets } from "./catalog.ts";

export function searchProps() {
  return {
    names: Object.fromEntries(targets().map((target) => [target.slug, target.name])),
    categories: categoryGroups
      .map((group) => ({ key: group.label, name: categoryName(group.label) }))
      .sort((a, b) => a.name.localeCompare(b.name)),
    capabilities: capabilityLabels(),
  };
}
