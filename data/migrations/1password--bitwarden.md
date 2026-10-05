---
reviewed: 2026-10-06
majors:
  bitwarden: 2026
sources:
  - https://bitwarden.com/help/import-from-1password/
  - https://support.1password.com/export/
---

## Compatibility

Bitwarden imports 1Password exports in the `.1pux` format (1Password 8.5 and later), `.1pif` and `.csv`, from the web app, the browser extension, the desktop app and the CLI. On mobile, with both apps installed, data can move directly through the FIDO Credential Exchange Protocol (CXP) without an export file: iOS 26 or later, and Android 14 or later according to 1Password.

## Before you switch

1. Export from the 1Password desktop app. In 1Password 8, choose File, Export on macOS, or the ellipsis at the top of the sidebar, then Export on Windows and Linux, pick the account, enter your password and choose 1PUX or CSV. 1Password 8 exports a whole account at once; 1Password 7 exports one vault at a time.
2. Prefer 1PUX. The CSV export only carries Login and Password items with a fixed set of fields.
3. In the Bitwarden web app, open Tools, Import. Choose the destination (My vault, with an optional folder, or an organization, with an optional collection you can manage), select the file format, then choose the file or paste its contents. From the CLI, run `bw import <format> <path>`; `bw import --formats` lists the format names.
4. Delete the export file afterwards. 1Password writes it unencrypted.

## Pitfalls

- **File attachments are not imported.** Upload them to the new vault one by one.
- **The desktop exports leave passkeys out.** 1Password only exports passkeys from its iOS and Android apps, through Credential Exchange. Otherwise, create new passkeys on each site.
- The CSV export drops security questions, linked items, linked apps and custom fields, which include things such as two-factor backup codes.
- An account that unlocks 1Password with SSO cannot export; a team administrator has to turn off Unlock with SSO for it. In a team account, some vaults may also lack the "Export items" permission.
- When exporting a CSV on macOS, select All Fields and check Include Column Labels.
- Importing does not check for duplicates, so running it twice creates copies. If you pick a destination folder, the folders from 1Password are nested inside it.
- When the import fails with "Import error", nothing was added: fix the file and retry.
