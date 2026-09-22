import type { ComponentChildren } from "preact";
import { type Locale, pathFor } from "../i18n/index.ts";
import type { Islands } from "../i18n/islands.en.ts";
import { day, stars } from "../lib/format.ts";
import { slugify } from "../lib/slug.ts";
import type { ToolView } from "../lib/types.ts";

interface Props {
  locale: Locale;
  strings: Islands;
  tool: ToolView;
  target?: string;
}

export function ToolCard({ locale, strings, tool, target }: Props) {
  const replacement = target ? tool.replaces.find((r) => r.tool === target) : undefined;
  const { release, repo } = tool;
  const flags = tool.flags.filter((flag) => flag !== "archived");
  const flagLabels: Record<string, string> = strings.flag;
  const card = strings.card;
  return (
    <article className="tool">
      <header className="tool-head">
        <a className="tool-name" href={pathFor(locale, `/tools/${tool.slug}/`)}>
          {tool.name}
        </a>
        {repo.archived && (
          <a className="mark mark-archived" href={pathFor(locale, "/about/#archived")}>
            {card.archived}
          </a>
        )}
        {replacement && (
          <a className={`fit fit-${replacement.fit}`} href={pathFor(locale, `/about/#${replacement.fit}`)}>
            {strings.fit[replacement.fit]}
          </a>
        )}
      </header>
      {repo.description && <p className="tool-description">{repo.description}</p>}
      {replacement?.note && <p className="tool-note">{replacement.note}</p>}
      <dl className="facts">
        <Fact
          label={card.factLanguage}
          value={
            <IndexLink
              locale={locale}
              index="languages"
              value={repo.language}
              fallback={card.unknownLanguage}
            />
          }
        />
        <Fact
          label={card.factLicense}
          value={<IndexLink locale={locale} index="licenses" value={repo.license} fallback={card.noLicense} />}
        />
        <Fact label={card.factStars} value={stars(repo.stars)} />
        {release && (
          <Fact
            label={card.factLatest}
            value={
              <>
                <a href={release.url}>{release.tag}</a>
                {release.signed && (
                  <a className="mark mark-good" href={pathFor(locale, "/about/#signed")}>
                    {card.signed}
                  </a>
                )}
              </>
            }
          />
        )}
        <Fact label={card.factLastPush} value={day(repo.pushedAt)} />
      </dl>
      {(tool.maintainerVerified || flags.length > 0) && (
        <p className="marks">
          {tool.maintainerVerified && (
            <a className="mark mark-good" href={pathFor(locale, "/about/#verified")}>
              {card.verified}
            </a>
          )}
          {flags.map((flag) => (
            <a
              key={flag}
              className="mark mark-warn"
              href={pathFor(locale, `/about/#${flag in flagLabels ? flag : "warnings"}`)}
            >
              {flagLabels[flag] ?? flag}
            </a>
          ))}
        </p>
      )}
    </article>
  );
}

function IndexLink({
  locale,
  index,
  value,
  fallback,
}: {
  locale: Locale;
  index: "languages" | "licenses";
  value: string | null;
  fallback: string;
}) {
  return value ? <a href={pathFor(locale, `/${index}/${slugify(value)}/`)}>{value}</a> : fallback;
}

function Fact({ label, value }: { label: string; value: ComponentChildren }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
