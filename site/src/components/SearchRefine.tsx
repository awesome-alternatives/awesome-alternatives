import type { Islands } from "../i18n/islands.en.ts";
import type { Refinement } from "../lib/searchUrl.ts";

export interface CategoryOption {
  key: string;
  name: string;
}

export function SearchRefine({
  copy,
  categories,
  refinement,
  dropIn,
  onChange,
}: {
  copy: Islands["search"]["refine"];
  categories: CategoryOption[];
  refinement: Refinement;
  dropIn: boolean;
  onChange: (next: Refinement) => void;
}) {
  return (
    <div className="refine" role="group" aria-label={copy.label}>
      <label className="refine-field">
        <span>{copy.category}</span>
        <select
          value={refinement.category ?? ""}
          onChange={(event) =>
            onChange({ ...refinement, category: event.currentTarget.value || undefined })
          }
        >
          <option value="">{copy.anyCategory}</option>
          {categories.map((category) => (
            <option key={category.key} value={category.key}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <label className="refine-toggle">
        <input
          type="checkbox"
          checked={dropIn}
          onChange={(event) => onChange({ ...refinement, dropIn: event.currentTarget.checked })}
        />
        <span>{copy.dropIn}</span>
      </label>
    </div>
  );
}
