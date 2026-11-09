const BREAKS = /[\p{Cc}\p{Zl}\p{Zp}]+/gu;
const INVISIBLE = /[\u00AD\u061C\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u2069\uFEFF]/gu;
const INLINE = /[\\`*_[\]<>|~]/g;
const BLOCK_MARK = /^[#+=-]/;
const LIST_NUMBER = /^(\d+)([.)])(?=\s|$)/;
const URL_SPECIAL = /[[\]`\\]/g;

export function markdownText(text: string): string {
  const flat = text.replace(BREAKS, " ").replace(INVISIBLE, "").trim();
  return flat.replace(INLINE, String.raw`\$&`).replace(BLOCK_MARK, String.raw`\$&`).replace(LIST_NUMBER, String.raw`$1\$2`);
}

export function markdownUrl(url: string): string {
  if (!URL.canParse(url)) return "";
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return "";
  return parsed.href.replace(URL_SPECIAL, (char) => `%${(char.codePointAt(0) ?? 0).toString(16).toUpperCase().padStart(2, "0")}`);
}
