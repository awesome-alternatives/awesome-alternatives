import { stars } from "../lib/format.ts";

export function StarCount({ count }: { count: number }) {
  return (
    <span class="star-count">
      <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true" focusable="false">
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
          d="M8 1.6 9.9 5.6 14.3 6.1 11 9.1 11.9 13.4 8 11.2 4.1 13.4 5 9.1 1.7 6.1 6.1 5.6Z"
        />
      </svg>
      {stars(count)}
    </span>
  );
}
