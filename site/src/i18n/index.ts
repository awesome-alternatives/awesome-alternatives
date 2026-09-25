import { de } from "./de.ts";
import { en } from "./en.ts";
import { es } from "./es.ts";
import { fr } from "./fr.ts";
import type { Messages } from "./messages.ts";

export const LOCALES = ["en", "fr", "es", "de"] as const;

export type Locale = (typeof LOCALES)[number];

export type { Islands, Messages, Pages } from "./messages.ts";

export const DEFAULT_LOCALE: Locale = "en";

const CATALOG: Record<Locale, Messages> = { en, fr, es, de };

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function messages(locale: Locale): Messages {
  return CATALOG[locale];
}

export function localeOf(pathname: string): Locale {
  const first = pathname.split("/").filter(Boolean)[0] ?? "";
  return isLocale(first) ? first : DEFAULT_LOCALE;
}

export function stripLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] && isLocale(segments[0])) segments.shift();
  return `/${segments.join("/")}${segments.length > 0 ? "/" : ""}`;
}

export function pathFor(locale: Locale, path: string): string {
  const cut = path.search(/[#?]/);
  const route = cut < 0 ? path : path.slice(0, cut);
  const rest = cut < 0 ? "" : path.slice(cut);
  const page = stripLocale(route);
  const bare = FILE.test(route) ? page.slice(0, -1) : page;
  return `${locale === DEFAULT_LOCALE ? bare : `/${locale}${bare}`}${rest}`;
}

const FILE = /\.[a-z]+$/i;

export function format(template: string, values: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (whole, key: string) => {
    const value = values[key];
    return value === undefined ? whole : String(value);
  });
}

export interface Plural {
  one: string;
  other: string;
}

const PLURAL_RULES = new Map<Locale, Intl.PluralRules>();

function rulesFor(locale: Locale): Intl.PluralRules {
  const cached = PLURAL_RULES.get(locale);
  if (cached) return cached;
  const rules = new Intl.PluralRules(locale);
  PLURAL_RULES.set(locale, rules);
  return rules;
}

export function plural(
  locale: Locale,
  forms: Plural,
  count: number,
  values: Record<string, string | number> = {},
): string {
  const form = rulesFor(locale).select(count) === "one" ? forms.one : forms.other;
  return format(form, { ...values, n: count });
}
