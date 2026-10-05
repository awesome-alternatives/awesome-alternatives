---
reviewed: 2026-10-06
majors:
  bitwarden: 2026
sources:
  - https://bitwarden.com/help/import-from-lastpass/
---

## Compatibility

Bitwarden reads LastPass data in two ways: a direct import that signs in to your LastPass account, available only in the Bitwarden browser extensions and desktop apps, and a CSV file exported from LastPass, which the web vault, the apps and the CLI accept. Data is encrypted locally before it reaches the server. On a self-hosted server, the web vault is at your own domain.

## Before you switch

1. **Direct import.** In the browser extension, open Settings, Vault, Import items; in the desktop app, choose Import. Pick the destination vault and folder or collection, set the file format to LastPass, choose "Import directly from LastPass", enter your LastPass email and sign in when prompted, with your master password or through your IdP.
2. **File import.** Export a CSV from the LastPass web vault (Advanced Options, then Export under Manage your Vault, confirmed by email) or from the LastPass extension (Account, Fix a problem yourself, Export vault items, Export data for use anywhere). If LastPass prints the data on screen instead of saving it, paste it into an `export.csv` file.
3. In the Bitwarden web vault, open Tools, Import, choose the destination and the file format, then choose the file or paste its contents. From the CLI, run `bw import <format> <path>`; `bw import --formats` lists the format names.
4. Delete the export file once the import has succeeded.

## Pitfalls

- **File attachments and trash are not imported.** Upload attachments to the new vault one by one.
- Importing does not check for duplicates. Importing the same file twice, or items you already have, creates copies.
- The on-screen LastPass export can turn special characters such as `&`, `<` and `>` into HTML entities like `&amp;`. Fix them in a text editor before importing.
- Bitwarden treats LastPass `grouping` values as collections. A free Bitwarden organization allows two collections, so a CSV with three or more groupings fails with "This organization can only have a maximum of two collections". Removing the `grouping` column avoids it.
- When the import fails with "Import error", nothing was added: fix the file and retry.
- If your LastPass team uses SSO, an administrator first has to add Bitwarden's callback URLs (`bitwarden://sso-callback-lp`, `bitwarden://import-callback-lp`, and the extension and web vault URLs the guide lists) to the IdP's LastPass application. Direct import with SSO does not support Google Workspace or ADFS, and the Firefox extension cannot do it.
- When importing for a business, the guide recommends a LastPass admin account; super admin credentials may make the import fail. With Duo as the MFA, only in-app approval works.
