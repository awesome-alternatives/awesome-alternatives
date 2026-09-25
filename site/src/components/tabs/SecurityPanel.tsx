import { format } from "../../i18n/index.ts";
import type { Islands } from "../../i18n/islands.en.ts";
import { security } from "../../lib/api.ts";
import { day } from "../../lib/format.ts";
import { scoreLevel } from "../../lib/tabs.ts";
import type { SecurityReport } from "../../lib/types.ts";
import type { Latest } from "./types.ts";
import { useRemote } from "./useRemote.ts";

type TabStrings = Islands["tabs"];

export function SecurityPanel({
  strings,
  active,
  slug,
  repository,
  latest,
}: {
  strings: TabStrings;
  active: boolean;
  slug: string;
  repository: string;
  latest: Latest | null;
}) {
  const copy = strings.security;
  const state = useRemote<SecurityReport>(active, (signal) => security(slug, signal));
  return (
    <div className="security">
      <p className="security-line">
        {!latest && copy.noRelease}
        {latest?.signed && (
          <>
            <span className="mark mark-good">{copy.signedMark}</span>{" "}
            {format(copy.signedText, { tag: latest.tag })}
          </>
        )}
        {latest && !latest.signed && (
          <>
            <span className="mark mark-warn">{copy.unsignedMark}</span>{" "}
            {format(copy.unsignedText, { tag: latest.tag })}
          </>
        )}
      </p>
      {(state.kind === "idle" || state.kind === "loading") && <p className="summary">{copy.loading}</p>}
      {state.kind === "error" && (
        <p className="empty">
          {copy.errorBefore}
          <a href={`${repository}/security`}>{copy.errorLink}</a>
          {copy.errorAfter}
        </p>
      )}
      {state.kind === "done" && <Report strings={strings} report={state.value} repository={repository} />}
    </div>
  );
}

function Report({
  strings,
  report,
  repository,
}: {
  strings: TabStrings;
  report: SecurityReport;
  repository: string;
}) {
  const copy = strings.security;
  const { scorecard, advisories } = report;
  return (
    <>
      <p className="section-label">{copy.scorecard}</p>
      {scorecard ? (
        <>
          <p className="scorecard-total">
            <span className={`score score-${scoreLevel(scorecard.score)}`}>{scorecard.score.toFixed(1)}</span>
            <span className="summary">{format(copy.scorecardTotal, { date: scorecard.date })}</span>
          </p>
          <ul className="checks">
            {scorecard.checks.map((check) => (
              <li key={check.name}>
                <span className={`score score-${scoreLevel(check.score)}`}>{check.score ?? copy.noScore}</span>
                <span>
                  {check.url ? <a href={check.url}>{check.name}</a> : check.name}
                  <span className="check-reason">{check.reason}</span>
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="empty">{copy.scorecardEmpty}</p>
      )}
      <p className="section-label">{copy.advisories}</p>
      {advisories.length === 0 ? (
        <p className="empty">
          {copy.advisoriesEmptyBefore}
          <a href={`${repository}/security/advisories`}>{copy.advisoriesEmptyLink}</a>
          {copy.advisoriesEmptyAfter}
        </p>
      ) : (
        <ul className="advisories">
          {advisories.map((a) => (
            <li key={a.ghsaId}>
              <span className={`mark severity-${a.severity ?? "unknown"}`}>{a.severity ?? copy.unrated}</span>
              <span>
                <a href={a.url}>{a.summary}</a>
                <span className="check-reason">
                  {a.cveId ?? a.ghsaId}
                  {a.publishedAt && format(copy.advisoryDate, { date: day(a.publishedAt) ?? "" })}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
