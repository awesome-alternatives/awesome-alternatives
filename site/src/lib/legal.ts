export const publisher = {
  name: "TODO: publisher full name",
  address: "TODO: publisher postal address, or the host's details if the publisher stays anonymous under LCEN art. 6 III 2",
  email: "TODO: contact email address",
  phone: "TODO: publisher phone number",
};

export const host = {
  name: "TODO: host company name",
  address: "TODO: host postal address",
  phone: "TODO: host phone number",
};

export const retention = {
  siteAccessLog: "TODO: how long the nginx access log written to the container output is kept",
  reverseProxyLog: "TODO: name of the reverse proxy in front of the site and API, and how long its access log is kept",
};

export const jev = {
  operator: "TODO: legal name and address of the company operating Jev at api.typesafe.ai",
  location: "TODO: country where Jev processes queries, and the transfer safeguard if it is outside the EU",
  privacyPolicy: "TODO: link to the Jev privacy policy or data processing terms",
};

export const LAST_UPDATED = "2026-09-22";

export const isPlaceholder = (value: string): boolean => value.startsWith("TODO:");
