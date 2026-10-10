const LOGIN = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

export function loginsFrom(raw: string | undefined): string[] {
  const logins = (raw ?? "")
    .split(",")
    .map((entry) => entry.trim().replace(/^@/, ""))
    .filter((entry) => LOGIN.test(entry));
  return [...new Set(logins)];
}

export function mentionLine(logins: readonly string[]): string[] {
  return logins.length === 0 ? [] : [`cc ${logins.map((login) => `@${login}`).join(" ")}`, ""];
}
