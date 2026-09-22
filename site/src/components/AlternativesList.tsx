import { useMemo, useState } from "react";

import { facets, fitFor, type ListFilters, narrow } from "../lib/filter.ts";
import { FIT_LABEL } from "../lib/format.ts";
import type { ToolView } from "../lib/types.ts";
import { FacetGroup } from "./FacetGroup.tsx";
import { ToolCard } from "./ToolCard.tsx";

interface Props {
  tools: ToolView[];
  target: string;
}

const NO_FILTERS: ListFilters = { language: null, license: null, fit: null };

export default function AlternativesList({ tools, target }: Props) {
  const [filters, setFilters] = useState(NO_FILTERS);
  const shown = useMemo(() => narrow(tools, target, filters), [tools, target, filters]);
  const set = (patch: Partial<ListFilters>) => setFilters((f) => ({ ...f, ...patch }));

  return (
    <section className="alternatives">
      <div className="facets">
        <FacetGroup
          label="Language"
          facets={facets(tools.map((t) => t.repo.language))}
          selected={filters.language}
          onSelect={(language) => set({ language })}
        />
        <FacetGroup
          label="Licence"
          facets={facets(tools.map((t) => t.repo.license))}
          selected={filters.license}
          onSelect={(license) => set({ license })}
        />
        <FacetGroup
          label="Fit"
          facets={facets(tools.map((t) => fitFor(t, target)))}
          selected={filters.fit}
          describe={(fit) => FIT_LABEL[fit]}
          onSelect={(fit) => set({ fit })}
        />
      </div>
      <p className="summary" aria-live="polite">
        {shown.length === tools.length ? `${tools.length} alternatives` : `${shown.length} of ${tools.length}`}
      </p>
      {shown.length === 0 ? (
        <p className="empty">
          Nothing matches.{" "}
          <button type="button" className="link" onClick={() => setFilters(NO_FILTERS)}>
            Clear the filters
          </button>
        </p>
      ) : (
        <div className="tools">
          {shown.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} target={target} />
          ))}
        </div>
      )}
    </section>
  );
}
