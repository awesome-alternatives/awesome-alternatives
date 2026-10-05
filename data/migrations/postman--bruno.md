---
reviewed: 2026-10-06
majors:
  bruno: 4
sources:
  - https://docs.usebruno.com/get-started/import-export-data/postman-migration
---

## Compatibility

Bruno imports Postman collections in the Collection v2 and v2.1 formats, and Postman environments as JSON files. During import, common Postman script APIs such as `pm.test`, `pm.environment`, `pm.globals`, `pm.collectionVariables` and `pm.response` are translated to their Bruno equivalents.

## Before you switch

1. In Postman, open the collection's "View more actions" menu, choose Export, pick Collection v2 or v2.1, and save the JSON file. Import it in Bruno with Import Collection.
2. Export each environment separately from the Environments sidebar (the `...` menu, then Export). In Bruno, open the Environments icon, choose Configure environments, then Import environment.
3. To move everything at once, request a data dump in Postman under Settings, Data, Request Data Export, and import the zip in Bruno, where you pick which collections to bring in. Bulk import from a data dump is part of Bruno Ultimate Edition.
4. If you would rather keep scripts as `pm.*` calls, open Options, then Show Advanced Options in the import dialog and turn on Preserve scripts. The rest of the collection is still converted.

## Pitfalls

- **Environments are a separate step.** The guide exports and imports them apart from the collection, so a collection imported on its own arrives without them. The data dump can include both.
- After import, Bruno lists npm packages the scripts `require()`. It can install them, provided npm is on your PATH. Libraries such as `lodash`, `moment`, `crypto` or `fs` only load when the collection runs in Developer Mode, where scripts can reach the filesystem and run system commands.
- Postman-specific packages (`postman-collection`, `postman-runtime`, `newman`, `@postman/*`) have no Bruno equivalent; scripts that call them fail at runtime and need rewriting.
- Environment and variable names may only contain letters, digits, `-`, `_` and `.`, and cannot start with a digit. Other characters, such as `/`, are converted to `-`.
- If an imported environment name already exists, Bruno asks whether to replace it, import a copy or skip it.
- Bruno stores every variable value as a string: numbers and booleans become strings and objects are serialized to JSON.
