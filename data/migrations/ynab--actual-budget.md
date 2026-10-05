---
reviewed: 2026-10-06
majors:
  actual-budget: 26
sources:
  - https://actualbudget.org/docs/migration/nynab/
---

## Compatibility

Actual imports a budget exported from YNAB (nYNAB) as a JSON file. Actual handles credit cards and funds budgeted for future months differently, so the guide spends most of its length on cleanup after the import.

## Before you switch

1. Export the budget to JSON. The guide lists a community-run web exporter, which may be unavailable if YNAB restricts it, and three methods that use your own YNAB Personal Access Token: the API documentation site in your browser, the `ynab-export` terminal tool, or `curl` against `https://api.ynab.com/v1/plans/<plan id>`.
2. If you create a token, copy it from the top of YNAB's Developer Settings page: it is shown only once, and the shortened version in the table below it does not work.
3. In Actual, close the current file from the drop-down menu, select **Import file**, choose **nYnab** and pick the JSON file.

## Pitfalls

- **Credit card debt shows up as overspending.** Actual does not carry debt the way YNAB does. Move overspent transactions to a Credit Card category, set **Rollover overspending** on its first overspent month, and assign each historical month the amount YNAB put toward paying the card.
- **YNAB's Credit Card Payment categories do not exist in Actual.** Spending stays in its category and a card payment is a plain transfer. Money YNAB held in an out-of-sync payment reserve lands in To Budget.
- Ready to Assign in YNAB counts funds budgeted in future months, and Actual's To Budget does not. To make them match, use **Hold for next month** on each affected month.
- Actual does not allow duplicate category groups, or duplicate categories in a group, and renames them with a `-1` suffix. Old hidden categories are a common cause: show hidden categories, then merge or delete the duplicates.
- An import that fails with a `not-ynab5` error means an older Actual. Update it, or change the leading `"plan"` key in the JSON file to `"budget"`.
