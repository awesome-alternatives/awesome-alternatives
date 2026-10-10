import { useEffect, useState } from "preact/hooks";

import { format, type Locale, pathFor } from "../i18n/index.ts";
import { loadIndex } from "../hooks/useSuggestions.ts";
import { closest, missingTerms } from "../lib/missing.ts";
import { href, type Suggestion } from "../lib/suggest.ts";

interface Props {
  locale: Locale;
  heading: string;
  alternativesTo: string;
}

export default function DidYouMean({ locale, heading, alternativesTo }: Props) {
  const [items, setItems] = useState<Suggestion[]>([]);

  useEffect(() => {
    const terms = missingTerms(window.location.pathname);
    if (terms.length === 0) return;
    const controller = new AbortController();
    loadIndex(controller.signal)
      .then((index) => setItems(closest(index, terms, (name) => format(alternativesTo, { name }))))
      .catch(() => undefined);
    return () => controller.abort();
  }, [alternativesTo]);

  return (
    <div className="missing">
      {items.length > 0 && (
        <section aria-labelledby="did-you-mean">
          <h2 id="did-you-mean" className="section-label">
            {heading}
          </h2>
          <ul className="targets">
            {items.map((item) => (
              <li key={`${item.kind}-${item.slug}`}>
                <a href={pathFor(locale, href(item))}>
                  <span>
                    <span className="target-name">{item.name}</span>
                    <span className="target-category">{item.detail}</span>
                  </span>
                  <span className="target-count">→</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
