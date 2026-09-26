import type { Locale } from "../i18n/index.ts";

export const CONTACT_ENDPOINT = "https://api.ferrlabs.com/contact";

export const CONTACT_KINDS = ["question", "bug", "security", "privacy", "other"] as const;

export type ContactKind = (typeof CONTACT_KINDS)[number];

export type ContactLocale = "en" | "fr";

export const CONTACT_LIMITS = { email: 254, name: 100, subject: 200, message: 10_000 } as const;

export interface ContactPayload {
  product: "awesome_alternatives";
  kind: ContactKind;
  subject: string;
  message: string;
  email: string;
  name?: string;
  locale: ContactLocale;
  website: string;
}

export type ContactOutcome =
  | { state: "sent"; reference: string }
  | { state: "error"; reason: "tooMany" | "invalid" | "failed" };

export function contactLocale(locale: Locale): ContactLocale {
  return locale === "fr" ? "fr" : "en";
}

function isContactKind(value: string): value is ContactKind {
  return (CONTACT_KINDS as readonly string[]).includes(value);
}

function field(data: FormData, key: string): string {
  const value = data.get(key);
  return typeof value === "string" ? value : "";
}

export function contactPayload(data: FormData): ContactPayload | undefined {
  const kind = field(data, "kind");
  const email = field(data, "email").trim();
  const subject = field(data, "subject").trim();
  const message = field(data, "message").trim();
  const name = field(data, "name").trim();
  if (!isContactKind(kind) || !email || !subject || !message) return undefined;
  return {
    product: "awesome_alternatives",
    kind,
    subject,
    message,
    email,
    ...(name ? { name } : {}),
    locale: field(data, "locale") === "fr" ? "fr" : "en",
    website: field(data, "website"),
  };
}

export function contactOutcome(status: number, body: unknown): ContactOutcome {
  if (status >= 200 && status < 300) {
    const reference =
      typeof body === "object" && body !== null && "reference" in body && typeof body.reference === "string"
        ? body.reference
        : "";
    return { state: "sent", reference };
  }
  if (status === 429) return { state: "error", reason: "tooMany" };
  if (status === 422) return { state: "error", reason: "invalid" };
  return { state: "error", reason: "failed" };
}
