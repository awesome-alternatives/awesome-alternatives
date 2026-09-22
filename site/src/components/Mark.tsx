interface Props {
  icon: "signed" | "verified";
  label: string;
  href?: string;
  muted?: boolean;
}

export function Mark({ icon, label, href, muted = false }: Props) {
  const glyph = icon === "signed" ? <Shield /> : <Manifest />;
  const attrs = {
    class: muted ? "mark-icon is-muted" : "mark-icon",
    "aria-label": label,
    "data-tip": label,
  };
  return href ? (
    <a {...attrs} href={href}>
      {glyph}
    </a>
  ) : (
    <span {...attrs} role="img">
      {glyph}
    </span>
  );
}

function Shield() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" focusable="false">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        d="M8 1.4 2.9 3.3v4.3c0 3.2 2 5.6 5.1 6.9 3.1-1.3 5.1-3.7 5.1-6.9V3.3Z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m5.7 7.9 1.6 1.7 3.1-3.5"
      />
    </svg>
  );
}

function Manifest() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" focusable="false">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        d="M9.1 1.5H3.9v13h8.2V4.5Z"
      />
      <path fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" d="M9.1 1.5v3h3" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m6 9.7 1.4 1.4 2.6-3"
      />
    </svg>
  );
}
