import { clashes, metaOf } from "../src/lib/titles.ts";
import { builtPages, htmlFiles } from "./builtPages.ts";

const found = clashes(builtPages().map(({ path, html }) => metaOf(path, html)));
for (const clash of found) {
  console.error(`${clash.paths.length} ${clash.lang} pages share the ${clash.field} "${clash.value}": ${clash.paths.join(", ")}`);
}
if (found.length > 0) process.exit(1);
console.log(`${htmlFiles.length} pages, every indexed title and description unique`);
