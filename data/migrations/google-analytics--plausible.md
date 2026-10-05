---
reviewed: 2026-10-06
majors:
  plausible: 3
sources:
  - https://plausible.io/docs/google-analytics-import
  - https://github.com/plausible/community-edition/wiki/google-integration
---

## Compatibility

Plausible imports historical stats from Google Analytics 4 through your Google account. Data comes in aggregated per day, from your first GA visitor up to the day before your first Plausible visitor, so it does not overlap with what Plausible collects itself. Up to 5 GA properties can go into one Plausible site, and later imports fill the date ranges earlier ones left open without overwriting them. Imported data can be segmented and exported as CSV or through the Stats API.

## Before you switch

1. Install Plausible next to Google Analytics first. The guide suggests running both for 2 to 4 weeks before removing GA.
2. Check how much history GA still holds, under Data Settings, Data Retention in the GA4 property. The guide gives 2 months of event-level data by default and 14 months on paid plans; what Google has deleted cannot be imported.
3. List your GA4 conversion events: they do not become Plausible goals on their own.
4. In the Plausible site settings, open Imports & Exports, click the Google Analytics button in the Import Data panel, link your Google account, pick the property and confirm. Large imports can take a couple of hours because of Google's API limits; you get an email when it is done.
5. Recreate your goals in the site settings. Imported goal data shows up once a matching goal exists.

## Pitfalls

- **Self-hosted Community Edition needs your own Google OAuth app.** Create an OAuth client in a Google Cloud project with the redirect URL `/auth/google/callback` on your `BASE_URL`, set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env`, verify the domain in Google Search Console, and enable the Google Analytics API, Reporting API, Admin API and Data API. Without the variables, the import button shows a warning instead.
- Ecommerce revenue is not imported.
- Unique visitors over a period are the sum of daily uniques, so they overcount compared to GA.
- Imported data has no exit pages, scroll depth, hourly graph, browser versions or separate UTM source dimension, supports only simple filtering, and is left out of the consolidated view.
- A property is imported whole and cannot be split by hostname. A property that tracked several sites lands entirely in the one Plausible site.
- Sessions, bounce rate and visitor counts are calculated differently in GA4 and Plausible, so the numbers will not match for the same period. GA4 consent mode adds modeled traffic that Plausible does not count.
- To replace native Plausible data with GA data up to today, you have to reset the Plausible stats before importing. An import can be deleted from Imports & Exports without touching native data.
