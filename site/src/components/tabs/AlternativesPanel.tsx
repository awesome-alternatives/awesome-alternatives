import type { Locale } from "../../i18n/index.ts";
import type { Islands } from "../../i18n/islands.en.ts";
import type { ToolView } from "../../lib/types.ts";
import { ToolCard } from "../ToolCard.tsx";

export function AlternativesPanel({
  locale,
  strings,
  alternatives,
  target,
}: {
  locale: Locale;
  strings: Islands;
  alternatives: ToolView[];
  target: string;
}) {
  return (
    <div className="tools">
      {alternatives.map((tool) => (
        <ToolCard key={tool.slug} locale={locale} strings={strings} tool={tool} target={target} />
      ))}
    </div>
  );
}
