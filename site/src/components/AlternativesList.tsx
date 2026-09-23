import { useEffect, useMemo, useState } from "preact/hooks";

import { format, type Locale, plural } from "../i18n/index.ts";
import type { Islands } from "../i18n/islands.en.ts";
import {
  facets,
  fitFor,
  hostingOf,
  type ListFilters,
  maintenanceOf,
  NO_FILTERS,
  narrow,
  toggled,
} from "../lib/filter.ts";
import { listParams, readListUrl } from "../lib/listUrl.ts";
import type { ToolView } from "../lib/types.ts";
import { FacetGroup } from "./FacetGroup.tsx";
import { ToolCard } from "./ToolCard.tsx";

interface Props {
  locale: Locale;
  strings: Islands;
  tools: ToolView[];
  target: string;
  targetName: string;
  comparable: string[];
  selfHostCategories: string[];
}

interface Applied {
  id: string;
  label: string;
  unchecked?: boolean;
  remove: () => void;
}

export default function AlternativesList({
  locale,
  strings,
  tools,
  target,
  targetName,
  comparable,
  selfHostCategories,
}: Props) {
  const [filters, setFilters] = useState(NO_FILTERS);
  const [unchecked, setUnchecked] = useState<readonly string[]>([]);
  const [ready, setReady] = useState(false);
  const hosted = useMemo(() => new Set(selfHostCategories), [selfHostCategories]);
  const shown = useMemo(() => narrow(tools, target, filters, hosted), [tools, target, filters, hosted]);
  const handlers = <K extends keyof ListFilters>(key: K) => ({
    onToggle: (value: ListFilters[K][number]) =>
      setFilters((f) => ({ ...f, [key]: toggled<ListFilters[K][number]>(f[key], value) })),
    onClear: () => setFilters((f) => ({ ...f, [key]: [] })),
  });
  const copy = strings.facets;

  useEffect(() => {
    const view = readListUrl(window.location.search);
    setFilters(view.filters);
    setUnchecked(view.unchecked);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const url = new URL(window.location.href);
    url.search = listParams({ filters, unchecked }).toString();
    window.history.replaceState(null, "", url);
  }, [ready, filters, unchecked]);

  const appliedOf = <K extends keyof ListFilters>(
    key: K,
    describe: (value: ListFilters[K][number]) => string,
  ): Applied[] =>
    (filters[key] as readonly ListFilters[K][number][]).map((value) => ({
      id: `${key}-${value}`,
      label: describe(value),
      remove: () => handlers(key).onToggle(value),
    }));
  const applied = [
    ...appliedOf("language", (v) => v),
    ...appliedOf("license", (v) => v),
    ...appliedOf("fit", (v) => strings.fit[v]),
    ...appliedOf("terms", (v) => strings.terms[v]),
    ...appliedOf("maintenance", (v) => strings.maintenance[v]),
    ...appliedOf("hosting", (v) => strings.hosting[v]),
    ...unchecked.map((value) => ({
      id: `unchecked-${value}`,
      label: format(copy.unchecked, { label: value }),
      unchecked: true,
      remove: () => setUnchecked((all) => all.filter((v) => v !== value)),
    })),
  ];

  return (
    <section className="alternatives">
      <div className="facets">
        <FacetGroup
          locale={locale}
          strings={copy}
          label={copy.language}
          facets={facets(tools.map((t) => t.repo.language))}
          selected={filters.language}
          {...handlers("language")}
        />
        <FacetGroup
          locale={locale}
          strings={copy}
          label={copy.license}
          facets={facets(tools.map((t) => t.repo.license))}
          selected={filters.license}
          {...handlers("license")}
        />
        <FacetGroup
          locale={locale}
          strings={copy}
          label={copy.fit}
          facets={facets(tools.map((t) => fitFor(t, target)))}
          selected={filters.fit}
          describe={(fit) => strings.fit[fit]}
          {...handlers("fit")}
        />
        <FacetGroup
          locale={locale}
          strings={copy}
          label={copy.terms}
          facets={facets(tools.map((t) => t.terms))}
          selected={filters.terms}
          describe={(terms) => strings.terms[terms]}
          {...handlers("terms")}
        />
        <FacetGroup
          locale={locale}
          strings={copy}
          label={copy.maintenance}
          facets={facets(tools.map(maintenanceOf))}
          selected={filters.maintenance}
          describe={(value) => strings.maintenance[value]}
          {...handlers("maintenance")}
        />
        <FacetGroup
          locale={locale}
          strings={copy}
          label={copy.hosting}
          facets={facets(tools.map((t) => hostingOf(t, hosted)))}
          selected={filters.hosting}
          describe={(value) => strings.hosting[value]}
          {...handlers("hosting")}
        />
      </div>
      {applied.length > 0 && (
        <div className="chips" aria-label={copy.applied}>
          {applied.map((chip) => (
            <span key={chip.id} className={chip.unchecked ? "chip chip-unchecked" : "chip"}>
              {chip.label}
              <button
                type="button"
                aria-label={format(copy.removeFilter, { label: chip.label })}
                onClick={chip.remove}
              >
                {strings.search.removeGlyph}
              </button>
            </span>
          ))}
        </div>
      )}
      <p className="summary" aria-live="polite">
        {shown.length === tools.length
          ? plural(locale, copy.total, tools.length)
          : format(copy.narrowed, { shown: shown.length, total: tools.length })}
      </p>
      {shown.length === 0 ? (
        <p className="empty">
          {copy.emptyLead}
          <button type="button" className="link" onClick={() => setFilters(NO_FILTERS)}>
            {copy.clear}
          </button>
        </p>
      ) : (
        <div className="tools">
          {shown.map((tool) => (
            <ToolCard
              key={tool.slug}
              locale={locale}
              strings={strings}
              tool={tool}
              target={target}
              targetName={targetName}
              comparable={comparable.includes(tool.slug)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
