import { format, type Locale, pathFor, plural } from "../i18n/index.ts";
import type { Islands } from "../i18n/islands.en.ts";
import { type ChipKey, chips } from "../lib/chips.ts";
import { alternativesHref } from "../lib/listUrl.ts";
import type { SearchResult } from "../lib/types.ts";
import { ToolCard } from "./ToolCard.tsx";

export function SearchResults({
  locale,
  strings,
  result,
  names,
  capabilities,
  onDrop,
  onMore,
  appending,
}: {
  locale: Locale;
  strings: Islands;
  result: SearchResult;
  names: Record<string, string>;
  capabilities: Record<string, string>;
  onDrop: (result: SearchResult, key: ChipKey, value?: string) => void;
  onMore: () => void;
  appending: boolean;
}) {
  const copy = strings.search;
  const read = chips(
    result.filters,
    copy.chips,
    (slug) => names[slug] ?? slug,
    (terms) => strings.terms[terms],
    (key) => capabilities[key] ?? key,
  );
  const requested = result.filters.capabilities ?? [];
  const labelsOf = (keys: readonly string[]) => keys.map((key) => capabilities[key] ?? key).join(", ");
  const meets = requested.length > 0 ? format(copy.meets, { list: labelsOf(requested) }) : undefined;
  const near = result.near ?? [];
  const unchecked = result.unchecked ?? [];
  const landing = alternativesHref(result.filters, unchecked);
  if (read.length === 0 && result.count === 0) {
    return (
      <p className="empty">
        {copy.noMatch.before}
        <a href={pathFor(locale, "/contribute/")}>{copy.noMatch.link}</a>
        {copy.noMatch.after}
      </p>
    );
  }
  return (
    <>
      <div className="chips" aria-label={copy.chipsLabel}>
        {read.map((chip) => (
          <span key={`${chip.key}-${chip.value ?? ""}`} className="chip">
            {chip.label}
            <button
              type="button"
              aria-label={format(copy.removeChip, { label: chip.label })}
              onClick={() => onDrop(result, chip.key, chip.value)}
            >
              {copy.removeGlyph}
            </button>
          </span>
        ))}
        {unchecked.map((item) => (
          <span key={`unchecked-${item.value}`} className="chip chip-unchecked">
            {format(copy.unchecked, { label: item.value })}
          </span>
        ))}
        {read.length === 0 && <span className="summary">{copy.closest}</span>}
        <span className="interpreter">
          {result.interpretedBy === "jev" ? copy.interpreter.jev : copy.interpreter.local}
        </span>
      </div>
      {landing && result.filters.replaces && (
        <p className="landing">
          <a href={pathFor(locale, landing)}>
            {format(copy.openTarget, { name: names[result.filters.replaces] ?? result.filters.replaces })}
          </a>
        </p>
      )}
      <p className="summary">
        {result.tools.length < result.count
          ? format(copy.showing, { shown: result.tools.length, n: result.count })
          : plural(locale, copy.count, result.count)}
      </p>
      <div className="tools">
        {result.tools.map((tool) => (
          <ToolCard
            key={tool.slug}
            locale={locale}
            strings={strings}
            tool={tool}
            target={result.filters.replaces}
            criteria={meets}
          />
        ))}
      </div>
      {result.tools.length < result.count && (
        <p className="more">
          <button type="button" onClick={onMore} disabled={appending}>
            {appending ? copy.searching : copy.more}
          </button>
        </p>
      )}
      {near.length > 0 && (
        <section className="near">
          <h2 className="section-label">{copy.nearHeading}</h2>
          <div className="tools">
            {near.map(({ tool, missing }) => (
              <ToolCard
                key={tool.slug}
                locale={locale}
                strings={strings}
                tool={tool}
                target={result.filters.replaces}
                criteria={format(copy.meets, { list: labelsOf(requested.filter((c) => !missing.includes(c))) })}
                gap={format(copy.missing, { list: labelsOf(missing) })}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
