import { format, type Locale, pathFor } from "../i18n/index.ts";
import type { Islands } from "../i18n/islands.en.ts";
import { type SearchFailure as Failed, describe, offersFallback } from "../lib/failure.ts";

export function SearchFailure({
  locale,
  strings,
  failure,
  target,
  names,
}: {
  locale: Locale;
  strings: Islands;
  failure: Failed;
  target: string | null;
  names: Record<string, string>;
}) {
  const { fallbackTargeted, fallbackBrowse } = strings.search;
  return (
    <div className="empty" role="alert">
      <p>{describe(locale, failure, strings.failure)}</p>
      {offersFallback(failure) && (
        <p>
          {target ? (
            <>
              {fallbackTargeted.before}
              <a href={pathFor(locale, `/alternatives/${target}/`)}>
                {format(fallbackTargeted.link, { name: names[target] ?? target })}
              </a>
              {fallbackTargeted.between}
              <a href={pathFor(locale, "/#browse")}>{fallbackTargeted.browse}</a>
              {fallbackTargeted.after}
            </>
          ) : (
            <>
              <a href={pathFor(locale, "/#browse")}>{fallbackBrowse.browse}</a>
              {fallbackBrowse.after}
            </>
          )}
        </p>
      )}
    </div>
  );
}
