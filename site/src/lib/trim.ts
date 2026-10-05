export function trimTrailing(value: string, strip: string): string {
  let end = value.length;
  while (end > 0 && strip.includes(value.charAt(end - 1))) end -= 1;
  return value.slice(0, end);
}

export function trimEdges(value: string, strip: string): string {
  let start = 0;
  while (start < value.length && strip.includes(value.charAt(start))) start += 1;
  return trimTrailing(value.slice(start), strip);
}
