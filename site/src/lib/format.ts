import type { Fit } from "./types.ts";

export function stars(count: number): string {
  if (count < 1000) return String(count);
  const thousands = count / 1000;
  return `${thousands < 10 ? thousands.toFixed(1).replace(/\.0$/, "") : Math.round(thousands)}k`;
}

export function day(iso: string | null): string | null {
  return iso ? iso.slice(0, 10) : null;
}

export const FIT_LABEL: Record<Fit, string> = {
  "drop-in": "Drop-in",
  full: "Full replacement",
  partial: "Partial",
};

export const FLAG_LABEL: Record<string, string> = {
  moved: "Repository moved",
  "no-license": "No licence detected",
  "no-release": "No release or tag",
  inactive: "No push in a year",
  "star-spike": "Unusual star burst",
};
