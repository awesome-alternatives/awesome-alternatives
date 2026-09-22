import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const site = fileURLToPath(new URL("..", import.meta.url));
const tsc = join(site, "node_modules/typescript/bin/tsc");

function typecheck(codes: string): string {
  const directory = mkdtempSync(join(site, ".flags-"));
  const file = join(directory, "table.ts");
  writeFileSync(
    file,
    [
      `import type { FlagCode } from "../../scripts/lib/types.ts";`,
      `import { islands } from "../src/i18n/islands.en.ts";`,
      ``,
      `export const table: Record<Exclude<${codes}, "archived">, string> = islands.flag;`,
      ``,
    ].join("\n"),
  );
  try {
    execFileSync(
      process.execPath,
      [
        tsc,
        "--noEmit",
        "--strict",
        "--skipLibCheck",
        "--target",
        "esnext",
        "--module",
        "nodenext",
        "--moduleResolution",
        "nodenext",
        "--allowImportingTsExtensions",
        file,
      ],
      { encoding: "utf8", stdio: "pipe" },
    );
    return "";
  } catch (error) {
    return (error as { stdout: string }).stdout;
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

test("the flag labels cover every code a tool can carry", () => {
  assert.equal(typecheck("FlagCode"), "");
});

test("a new flag code with no label fails the typecheck instead of rendering in English", () => {
  const output = typecheck(`FlagCode | "unmaintained"`);
  assert.match(output, /unmaintained/);
  assert.match(output, /is missing|not assignable/);
});
