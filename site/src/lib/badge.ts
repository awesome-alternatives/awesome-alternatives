import type { ToolView } from "./types.ts";

const LABEL = "awesome-alternatives";
const VERIFIED = "b8ff3c";
const LISTED = "8b8b8b";
const LABEL_COLOR = "0b0b0b";
const CACHE_SECONDS = 86400;

export interface Badge {
  schemaVersion: 1;
  label: string;
  message: string;
  color: string;
  labelColor: string;
  cacheSeconds: number;
}

export function message(tool: ToolView, nameOf: (slug: string) => string, alternatives: number): string {
  if (tool.replaces.length > 0) {
    return `alternative to ${tool.replaces.map((r) => nameOf(r.tool)).join(", ")}`;
  }
  if (alternatives > 0) {
    return alternatives === 1 ? "1 alternative" : `${alternatives} alternatives`;
  }
  return "listed";
}

export function badge(tool: ToolView, nameOf: (slug: string) => string, alternatives: number): Badge {
  return {
    schemaVersion: 1,
    label: LABEL,
    message: message(tool, nameOf, alternatives),
    color: tool.maintainerVerified ? VERIFIED : LISTED,
    labelColor: LABEL_COLOR,
    cacheSeconds: CACHE_SECONDS,
  };
}
