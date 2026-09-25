import { type ContentsAccess, DEFAULT_REPOSITORY, installationToken } from "../lib/app.ts";

const [access] = process.argv.slice(2);
const { APP_ID, APP_PRIVATE_KEY, REPOSITORY = DEFAULT_REPOSITORY } = process.env;
if (!APP_ID || !APP_PRIVATE_KEY || (access !== "read" && access !== "write")) {
  console.error("usage: APP_ID=... APP_PRIVATE_KEY=... node scripts/runner/token.ts <read|write>");
  process.exit(2);
}
process.stdout.write(await installationToken(APP_ID, APP_PRIVATE_KEY, REPOSITORY, access satisfies ContentsAccess));
