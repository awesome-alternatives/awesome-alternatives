import { createHash } from "node:crypto";

export const SEARCHING_SCRIPT =
  'if (new URLSearchParams(location.search).get("q")?.trim()) document.documentElement.dataset.searching = "";';

export const SEARCHING_SCRIPT_HASH = `sha256-${createHash("sha256").update(SEARCHING_SCRIPT).digest("base64")}`;
