---
reviewed: 2026-10-06
majors:
  nocodb: 2026
sources:
  - https://nocodb.com/docs/product/bases/import-base-from-airtable
---

## Compatibility

NocoDB imports a whole Airtable base, tables, views and records, into a NocoDB base, using the Default data source or an external database connection. Links, lookups, rollups and attachment fields come across; formula fields do not.

## Before you switch

1. In Airtable, create a Personal Access Token with at least the `data.records:read` scope and access to the base you want to import.
2. In the base's Share menu, open the Share Publicly tab, turn on full base access and copy the shared base URL.
3. In NocoDB, click the base name in the sidebar and choose Import data, then Airtable Base, or use Import Data on the base dashboard.
4. Enter the token and the shared base ID or URL, pick the data source and click Import Base.
5. Advanced settings let you import only the schema without records, only the primary grid view of each table, and turn rollup, lookup and attachment columns on or off.

## Pitfalls

- **Formula fields are not imported.** The option is greyed out, so formulas have to be rebuilt by hand.
- The import needs a public share link with full base access, so the whole base can be read through that link while it is on.
- Items that cannot be copied are skipped, approximated or marked as failed, and the import carries on. Only a table NocoDB cannot create stops it. Click Download report for a CSV listing each item with its table, view, field, Airtable field type and reason. The report shortens long lists; the full list is in the import log under Show Details.
- "Approximated" means the item was imported but behaves differently from the Airtable original. Check those before relying on the base.
- The guide covers tables, views, fields and records only. It does not mention Airtable automations, interfaces, comments or collaborator permissions, so plan to recreate those.
