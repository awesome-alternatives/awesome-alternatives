import { useMemo, useState } from "preact/hooks";

import { format, type Locale, plural } from "../i18n/index.ts";
import type { Islands } from "../i18n/islands.en.ts";
import { facets, fitFor, type ListFilters, NO_FILTERS, narrow, toggled } from "../lib/filter.ts";
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
}

export default function AlternativesList({ locale, strings, tools, target, targetName, comparable }: Props) {
  const [filters, setFilters] = useState(NO_FILTERS);
  const shown = useMemo(() => narrow(tools, target, filters), [tools, target, filters]);
  const handlers = <K extends keyof ListFilters>(key: K) => ({
    onToggle: (value: ListFilters[K][number]) =>
      setFilters((f) => ({ ...f, [key]: toggled<ListFilters[K][number]>(f[key], value) })),
    onClear: () => setFilters((f) => ({ ...f, [key]: [] })),
  });
  const copy = strings.facets;

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
      </div>
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
