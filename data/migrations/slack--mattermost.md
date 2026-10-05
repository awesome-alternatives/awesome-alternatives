---
reviewed: 2026-10-06
majors:
  mattermost: 11
sources:
  - https://docs.mattermost.com/administration-guide/onboard/migrate-from-slack
---

## Compatibility

Mattermost imports a Slack export: users, public and private channels, direct messages, group messages, threads, reactions and file attachments. Archived channels come in archived, and deactivated or deleted users come in as deactivated accounts with their memberships. Group DMs of up to 8 members become group messages; larger ones become private channels. An Enterprise Grid export maps each Slack workspace to a Mattermost team.

The official guide is marked as available on the Entry, Professional, Enterprise and Enterprise Advanced plans.

## Before you switch

1. Export from Slack with Slack's own tools. A public channels export works on every Slack plan; private channels and DMs need the "all channels and conversations" export, which Slack offers on Business+ (on application) and Enterprise Grid. Do not unzip and rezip the archive.
2. Prepare a fresh server if you can, and never import over an existing team. Create the destination team first (lowercase, hyphenated name) and enable "Allow any user with an account on this server to join this team". Raise `TeamSettings.MaxChannelsPerTeam`, `TeamSettings.MaxUsersPerTeam` and `FileSettings.MaxFileSize` above what the export needs, enable email sign-up and sign-in, and turn Elasticsearch indexing off during the import.
3. Plan for at least three times the export size in storage. `mmetl` runs on Linux and macOS only; Windows is not supported and WSL is discouraged.
4. For Enterprise Grid, split the archive first with `mmetl grid-transform -f slackexport.zip`.
5. Run `mmetl transform slack --team my-team --file slack_export.zip --output mattermost_import.jsonl --bot-owner admin --dry-run`, fix what it reports, then run it again without `--dry-run`. The output is a JSONL file and a `data/` attachments directory.
6. Zip both, check the package with `mmctl import validate`, then load it with `mmctl import upload` and `mmctl import process`. For large packages, copy the zip to the server and run `mmctl import process --bypass-upload ./mattermost-bulk-import.zip --local`.
7. Check the job with `mmctl import job list` and `mmctl import job show <JOB_ID> --json`, then spot-check channels, DMs and attachments.

The import is idempotent, so the guide recommends starting with a short time window or `--skip-attachments` and importing several smaller exports one after the other.

## Pitfalls

- **Integrations are not in the Slack export, so none of them migrate.** Marketplace apps, custom apps, webhooks, slash commands, Workflow Builder flows, Block Kit and Events API subscriptions all have to be rebuilt. Incoming webhook payloads and custom slash command requests in Slack's format can be pointed at the new Mattermost URL.
- Custom emoji, user groups, profile pictures, presence, custom profile fields, canvases, starred conversations and Slack Connect do not migrate. Reactions keep the emoji name and display once you add a custom emoji with the same name; skin-tone variants are dropped. Download canvases from the links in `canvases.json` before you leave Slack.
- On the Slack Free plan, the export only includes file links from the last 90 days.
- Imported users get a generated password and activate their account with Password Reset on the login page. Moving them to LDAP or SAML afterwards goes through `mmctl user migrate-auth`.
- The transform stops on any user without an email unless you pass `--default-email-domain` or `--skip-empty-emails`.
- Slack guests become Mattermost guests by default, which requires Guest Accounts to be licensed and enabled. Guests who were only in DMs are skipped unless you pass `--guest-handling=user`.
- Bots need an owner, set with `--bot-owner`.
- In a Grid export, a DM spanning two workspaces lands in a single team, and participants from the other workspace become deactivated placeholder users with a `<USERID>@local` email. Conversations that cannot be assigned are skipped and only logged in `grid-transform-slack.log`, not reflected in the exit code.
- Links to Slack posts stay Slack URLs and only work while Slack is still reachable.
- Imported messages can show as unread. The guide gives a SQL script for PostgreSQL to fix that; back up the database first.
- `--bypass-upload` only works with `--local` and is not supported while the server runs in High Availability.
