import type { ReleaseEntry } from "../../../../scripts/lib/types.ts";
import type { Islands } from "../../i18n/islands.en.ts";
import { day } from "../../lib/format.ts";
import { Mark } from "../Mark.tsx";
import type { Latest } from "./types.ts";

export function ReleasesPanel({
  strings,
  releases,
  latest,
}: {
  strings: Islands["tabs"];
  releases: ReleaseEntry[];
  latest: Latest | null;
}) {
  const copy = strings.releases;
  if (releases.length === 0) return <p className="empty">{copy.empty}</p>;
  return (
    <ol className="history">
      {releases.map((r) => (
        <li key={r.tag}>
          <span>
            <a className="history-tag" href={r.url}>
              {r.tag}
            </a>
            <span className="history-date">{day(r.publishedAt)}</span>
          </span>
          <span className="history-name">{r.name ?? ""}</span>
          <span className="history-marks">
            {r.prerelease && <span className="mark">{copy.prerelease}</span>}
            {latest?.signed && latest.tag === r.tag && <Mark icon="signed" label={copy.signed} />}
          </span>
        </li>
      ))}
    </ol>
  );
}
