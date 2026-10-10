import { readdirSync, readFileSync } from "node:fs";
import { resolve, sep } from "node:path";

export const DIST = resolve(import.meta.dirname, "../dist");

export const htmlFiles = readdirSync(DIST, { recursive: true, encoding: "utf8" }).filter((file) => file.endsWith(".html"));

export function* builtPages(): Generator<{ path: string; html: string }> {
  for (const file of htmlFiles) {
    yield { path: `/${file.split(sep).join("/")}`, html: readFileSync(resolve(DIST, file), "utf8") };
  }
}
