import { CONTACT_ENDPOINT } from "./contact.ts";

export function cspDirectives(apiUrl: string | undefined): string[] {
  const connect = ["'self'"];
  if (apiUrl && URL.canParse(apiUrl)) connect.push(new URL(apiUrl).origin);
  connect.push(new URL(CONTACT_ENDPOINT).origin);
  return [
    "default-src 'self'",
    "img-src 'self' https: data:",
    "font-src 'self' data:",
    `connect-src ${connect.join(" ")}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ];
}
