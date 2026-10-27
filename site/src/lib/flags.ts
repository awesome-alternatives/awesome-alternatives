import { day } from "./format.ts";

export function flagText(flag: string, label: string, createdAt: string): string {
  return flag === "too-new" ? `${label} (${day(createdAt)})` : label;
}
