export function cspDirectives(apiUrl: string | undefined): string[] {
  const connect = ["'self'"];
  if (apiUrl && URL.canParse(apiUrl)) connect.push(new URL(apiUrl).origin);
  return [
    "default-src 'self'",
    "font-src 'self' data:",
    `connect-src ${connect.join(" ")}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ];
}
