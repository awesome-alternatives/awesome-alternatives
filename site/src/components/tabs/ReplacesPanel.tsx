import { type Locale, pathFor } from "../../i18n/index.ts";
import type { Islands } from "../../i18n/islands.en.ts";
import type { ReplacedTool } from "./types.ts";

export function ReplacesPanel({
  locale,
  strings,
  replaces,
}: {
  locale: Locale;
  strings: Islands;
  replaces: ReplacedTool[];
}) {
  return (
    <ul className="replaces">
      {replaces.map((r) => (
        <li key={r.slug}>
          <a href={pathFor(locale, `/alternatives/${r.slug}/`)}>{r.name}</a>
          <span className="tool-note">
            {r.note ?? ""}
            {r.notes && (
              <>
                {r.note ? " " : ""}
                <a href={r.notes}>{strings.card.migrationNotes}</a>
              </>
            )}
            {r.migration && (
              <>
                {r.note || r.notes ? " " : ""}
                <a href={r.migration}>{strings.card.migration}</a>
              </>
            )}
          </span>
          <span className={`fit fit-${r.fit}`}>{strings.fit[r.fit]}</span>
        </li>
      ))}
    </ul>
  );
}
