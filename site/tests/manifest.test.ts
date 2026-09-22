import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");

interface Manifest {
  background_color: string;
  theme_color: string;
  icons: { src: string }[];
}

const manifest = JSON.parse(read("../public/site.webmanifest")) as Manifest;

function token(name: string): string {
  const match = read("../src/styles/global.css").match(new RegExp(`--${name}:\\s*(#[0-9a-f]{3,8})`, "i"));
  assert.ok(match, `--${name} is defined in global.css`);
  return match[1].toLowerCase();
}

test("manifest colours follow the background token", () => {
  assert.equal(manifest.background_color, token("bg"));
  assert.equal(manifest.theme_color, token("bg"));
  assert.match(read("../src/layouts/Base.astro"), new RegExp(`name="theme-color" content="${token("bg")}"`));
});

test("every manifest icon exists in public", () => {
  for (const { src } of manifest.icons) {
    assert.ok(existsSync(new URL(`../public${src}`, import.meta.url)), src);
  }
});
