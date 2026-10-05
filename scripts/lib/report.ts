import type { Finding } from "./types.ts";

export function renderFindings(findings: readonly Finding[], checked: readonly string[]): string {
  const errors = findings.filter((f) => f.severity === "error");
  const warnings = findings.filter((f) => f.severity === "warning");
  const scope = checked.length ? checked.map((s) => `\`${s}\``).join(", ") : "nothing changed";
  const lines = [
    "## Catalog verification",
    "",
    `Checked against GitHub: ${scope}.`,
    "",
  ];

  if (!findings.length) {
    lines.push("Everything checks out.");
    return lines.join("\n");
  }

  lines.push(`${errors.length} error(s), ${warnings.length} warning(s).`, "", "| | Tool | Check | Detail |", "|---|---|---|---|");
  for (const f of [...errors, ...warnings]) {
    lines.push(`| ${f.severity === "error" ? "error" : "warning"} | \`${f.slug}\` | \`${f.code}\` | ${f.message} |`);
  }
  if (warnings.length) {
    lines.push("", "Warnings do not block the pull request. A maintainer reads each one before merging.");
  }
  return lines.join("\n");
}
