const BREAKS = /[\p{Cc}\p{Zl}\p{Zp}]+/gu;
const INVISIBLE = /[­؜​-‏‪-‮⁠-⁤⁦-⁩﻿]/gu;
const INLINE = /[\\`*_[\]<>|~]/g;
const BLOCK_MARK = /^[#+=-]/;
const LIST_NUMBER = /^(\d+)([.)])(?=\s|$)/;
const URL_SPECIAL = /[[\]`\\]/g;

export function markdownText(text: string): string {
  const flat = text.replace(BREAKS, " ").replace(INVISIBLE, "").trim();
  return flat.replace(INLINE, "\\$&").replace(BLOCK_MARK, "\\$&").replace(LIST_NUMBER, "$1\\$2");
}

export function markdownUrl(url: string): string {
  if (!URL.canParse(url)) return "";
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return "";
  return parsed.href.replace(URL_SPECIAL, (char) => `%${char.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0")}`);
}
