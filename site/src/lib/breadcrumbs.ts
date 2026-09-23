import { type Locale, pathFor } from "../i18n/index.ts";

export interface Crumb {
  name: string;
  href: string;
}

export function withHome(locale: Locale, home: string, trail: readonly Crumb[]): Crumb[] {
  return [{ name: home, href: pathFor(locale, "/") }, ...trail];
}
