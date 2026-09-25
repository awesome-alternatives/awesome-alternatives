import { access, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { backfillEvents, IncompleteHistory } from "./lib/event-history.ts";
import { EVENTS_PATH, eventsJson, pruneEvents } from "./lib/event-log.ts";

const root = process.cwd();
const target = join(root, EVENTS_PATH);

if (await access(target).then(() => true, () => false)) {
  console.error(`${EVENTS_PATH} already exists. The refresh appends to it; delete it first to rebuild it from the git history.`);
  process.exit(1);
}

try {
  const events = pruneEvents(backfillEvents(root), new Date());
  await writeFile(target, eventsJson(events));
  const counts = new Map<string, number>();
  for (const event of events) counts.set(event.type, (counts.get(event.type) ?? 0) + 1);
  const summary = [...counts].map(([type, n]) => `${n} ${type}`).join(", ");
  console.log(`wrote ${events.length} events to ${EVENTS_PATH}${summary ? `: ${summary}` : ""}`);
} catch (error) {
  if (!(error instanceof IncompleteHistory)) throw error;
  console.error(error.message);
  process.exitCode = 1;
}
