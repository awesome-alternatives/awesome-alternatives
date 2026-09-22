import type { ComponentChildren } from "preact";
import { day, FIT_LABEL, FLAG_LABEL, stars } from "../lib/format.ts";
import { slugify } from "../lib/slug.ts";
import type { ToolView } from "../lib/types.ts";

interface Props {
  tool: ToolView;
  target?: string;
}

export function ToolCard({ tool, target }: Props) {
  const replacement = target ? tool.replaces.find((r) => r.tool === target) : undefined;
  const { release, repo } = tool;
  const flags = tool.flags.filter((flag) => flag !== "archived");
  return (
    <article className="tool">
      <header className="tool-head">
        <a className="tool-name" href={`/tools/${tool.slug}/`}>
          {tool.name}
        </a>
        {repo.archived && (
          <a className="mark mark-archived" href="/about/#archived">
            archived
          </a>
        )}
        {replacement && (
          <a className={`fit fit-${replacement.fit}`} href={`/about/#${replacement.fit}`}>
            {FIT_LABEL[replacement.fit]}
          </a>
        )}
      </header>
      {repo.description && <p className="tool-description">{repo.description}</p>}
      {replacement?.note && <p className="tool-note">{replacement.note}</p>}
      <dl className="facts">
        <Fact label="Language" value={<IndexLink index="languages" value={repo.language} fallback="Unknown" />} />
        <Fact label="Licence" value={<IndexLink index="licenses" value={repo.license} fallback="None detected" />} />
        <Fact label="Stars" value={stars(repo.stars)} />
        {release && (
          <Fact
            label="Latest"
            value={
              <>
                <a href={release.url}>{release.tag}</a>
                {release.signed && (
                  <a className="mark mark-good" href="/about/#signed">
                    ✓ signed
                  </a>
                )}
              </>
            }
          />
        )}
        <Fact label="Last push" value={day(repo.pushedAt)} />
      </dl>
      {(tool.maintainerVerified || flags.length > 0) && (
        <p className="marks">
          {tool.maintainerVerified && (
            <a className="mark mark-good" href="/about/#verified">
              Verified by its maintainers
            </a>
          )}
          {flags.map((flag) => (
            <a key={flag} className="mark mark-warn" href={`/about/#${flag in FLAG_LABEL ? flag : "warnings"}`}>
              {FLAG_LABEL[flag] ?? flag}
            </a>
          ))}
        </p>
      )}
    </article>
  );
}

function IndexLink({ index, value, fallback }: { index: "languages" | "licenses"; value: string | null; fallback: string }) {
  return value ? <a href={`/${index}/${slugify(value)}/`}>{value}</a> : fallback;
}

function Fact({ label, value }: { label: string; value: ComponentChildren }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
