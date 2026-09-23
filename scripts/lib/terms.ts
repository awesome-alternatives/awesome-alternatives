import type { DeclaredTerms, Terms } from "./types.ts";

const OPEN_LICENSES = new Set([
  "AGPL-3.0",
  "Apache-2.0",
  "BSD-2-Clause",
  "BSD-3-Clause",
  "EUPL-1.2",
  "GPL-2.0",
  "GPL-3.0",
  "ISC",
  "LGPL-2.1",
  "LGPL-3.0",
  "MIT",
  "MPL-2.0",
  "Unlicense",
]);

export function termsOf(declared: DeclaredTerms | undefined, license: string | null): Terms {
  if (declared) return declared;
  if (license && OPEN_LICENSES.has(license)) return "open";
  return "unknown";
}
