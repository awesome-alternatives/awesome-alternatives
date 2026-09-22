import { DEFAULT_LOCALE, type Locale, LOCALES, messages, type Messages } from "./index.ts";

export type LocaleParam = { locale: string | undefined };

export function localeParam(locale: Locale): LocaleParam {
  return { locale: locale === DEFAULT_LOCALE ? undefined : locale };
}

export function localePaths(): { params: LocaleParam; props: { locale: Locale } }[] {
  return LOCALES.map((locale) => ({ params: localeParam(locale), props: { locale } }));
}

export function localePathsFor<P>(
  entries: { params: Record<string, string>; props: P }[],
): { params: Record<string, string | undefined>; props: P & { locale: Locale } }[] {
  return LOCALES.flatMap((locale) =>
    entries.map(({ params, props }) => ({
      params: { ...params, ...localeParam(locale) },
      props: { ...props, locale },
    })),
  );
}

export function localeFromParams(params: { locale?: string }): Locale {
  const value = params.locale;
  return value && (LOCALES as readonly string[]).includes(value) ? (value as Locale) : DEFAULT_LOCALE;
}

export function t(locale: Locale): Messages {
  return messages(locale);
}
