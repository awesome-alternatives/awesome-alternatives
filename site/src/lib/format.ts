export function stars(count: number): string {
  if (count < 1000) return String(count);
  const thousands = count / 1000;
  return `${thousands < 10 ? thousands.toFixed(1).replace(/\.0$/, "") : Math.round(thousands)}k`;
}

export function growth(ratio: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    signDisplay: "always",
    maximumSignificantDigits: 2,
  }).format(ratio);
}

export function day(iso: string | null): string | null {
  return iso ? iso.slice(0, 10) : null;
}
