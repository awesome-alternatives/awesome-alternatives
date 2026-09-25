import type { Fit } from "../../lib/types.ts";

export interface ReplacedTool {
  slug: string;
  name: string;
  fit: Fit;
  note: string | null;
  migration: string | null;
  notes: string | null;
}

export interface Latest {
  tag: string;
  signed: boolean;
}
