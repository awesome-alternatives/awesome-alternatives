export interface ToolRedirect {
  to: string;
  until: string;
}

export type ToolRedirects = Readonly<Record<string, ToolRedirect>>;

export function isValidDate(day: string): boolean {
  const parsed = new Date(`${day}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(day);
}

export function isActive(redirect: ToolRedirect, now: Date): boolean {
  return isValidDate(redirect.until) && now.toISOString().slice(0, 10) <= redirect.until;
}

export function activeToolRedirects(redirects: ToolRedirects, now: Date): Record<string, string> {
  return Object.fromEntries(
    Object.entries(redirects)
      .filter(([, redirect]) => isActive(redirect, now))
      .map(([old, redirect]) => [old, redirect.to]),
  );
}
