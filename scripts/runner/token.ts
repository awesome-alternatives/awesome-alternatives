import { appCredentials, type ContentsAccess, DEFAULT_REPOSITORY, installationToken } from "../lib/app.ts";

const [access] = process.argv.slice(2);
const { REPOSITORY = DEFAULT_REPOSITORY } = process.env;
if (access !== "read" && access !== "write") {
  console.error("usage: APP_ID=... APP_PRIVATE_KEY=... [WRITE_APP_ID=... WRITE_APP_PRIVATE_KEY=...] node scripts/runner/token.ts <read|write>");
  process.exit(2);
}
const credentials = appCredentials(access satisfies ContentsAccess, process.env);
if (!credentials) {
  console.error(`no credentials for ${access} access: set ${access === "write" ? "WRITE_APP_ID and WRITE_APP_PRIVATE_KEY, or" : ""} APP_ID and APP_PRIVATE_KEY`);
  process.exit(2);
}
process.stdout.write(await installationToken(credentials.appId, credentials.privateKey, REPOSITORY, access));
