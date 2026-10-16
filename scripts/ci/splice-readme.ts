import { readFile, writeFile } from "node:fs/promises";
import { END, START, spliceReadme } from "../lib/render.ts";

const [targetPath, refreshedPath] = process.argv.slice(2);
if (!targetPath || !refreshedPath) {
  console.error("usage: node scripts/ci/splice-readme.ts <README to keep> <refreshed README>");
  process.exit(2);
}

const refreshed = await readFile(refreshedPath, "utf8");
const body = refreshed.slice(refreshed.indexOf(START) + START.length, refreshed.indexOf(END)).trim();
await writeFile(targetPath, spliceReadme(await readFile(targetPath, "utf8"), body));
