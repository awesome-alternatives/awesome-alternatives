export function cspDirectives(apiUrl: string | undefined): string[] {
  const connect = ["'self'"];
  if (apiUrl && URL.canParse(apiUrl)) connect.push(new URL(apiUrl).origin);
  // TODO: add "img-src 'self' https:" when tool pages render the README and security HTML from the API.
  return [
    "default-src 'self'",
    "font-src 'self' data:",
    `connect-src ${connect.join(" ")}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ];
}
