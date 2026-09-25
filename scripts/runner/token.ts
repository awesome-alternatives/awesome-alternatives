import { DEFAULT_REPOSITORY, installationToken } from "../lib/app.ts";

const { APP_ID, APP_PRIVATE_KEY, REPOSITORY = DEFAULT_REPOSITORY } = process.env;
if (!APP_ID || !APP_PRIVATE_KEY) {
  console.error("APP_ID and APP_PRIVATE_KEY are required");
  process.exit(2);
}
process.stdout.write(await installationToken(APP_ID, APP_PRIVATE_KEY, REPOSITORY));
