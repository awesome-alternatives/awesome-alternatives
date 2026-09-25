import type { Islands } from "../../i18n/islands.en.ts";
import { readme } from "../../lib/api.ts";
import type { Readme } from "../../lib/types.ts";
import { useRemote } from "./useRemote.ts";

export function ReadmePanel({
  strings,
  active,
  slug,
  repository,
}: {
  strings: Islands["tabs"];
  active: boolean;
  slug: string;
  repository: string;
}) {
  const copy = strings.readme;
  const state = useRemote<Readme>(active, (signal) => readme(slug, signal));
  if (state.kind === "idle" || state.kind === "loading") return <p className="summary">{copy.loading}</p>;
  if (state.kind === "error") {
    return (
      <p className="empty">
        {copy.errorBefore}
        <a href={`${repository}#readme`}>{copy.errorLink}</a>
        {copy.errorAfter}
      </p>
    );
  }
  if (!state.value.html) return <p className="empty">{copy.empty}</p>;
  return <article className="readme" dangerouslySetInnerHTML={{ __html: state.value.html }} />;
}
