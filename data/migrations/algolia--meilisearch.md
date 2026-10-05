---
reviewed: 2026-10-06
majors:
  meilisearch: 1
sources:
  - https://www.meilisearch.com/docs/learn/update_and_migration/algolia_migration
  - https://www.meilisearch.com/docs/learn/getting_started/primary_key
---

## Compatibility

There is no import tool: the official guide walks through a short script, in JavaScript, Python or Ruby, that reads every record from an Algolia index and adds it to a Meilisearch index. The guide then maps Algolia's API parameters and methods to their Meilisearch counterparts. On the front end, InstantSearch keeps working through the Instant Meilisearch plugin, which supports many, not all, of the same components.

## Before you switch

1. Install the clients: `algoliasearch@4` and `meilisearch` for JavaScript, `algoliasearch` and `meilisearch` for Python, `algolia` and `meilisearch` for Ruby.
2. Create the Algolia client with your Application ID and Admin API Key, and fetch every record with `browseObjects` (`browse_objects` in Python and Ruby).
3. Create the Meilisearch client with your host and API key, and upload the records with `addDocumentsInBatches` in batches of 100,000. Meilisearch creates the index if it does not exist.
4. Recreate your index settings. Algolia lets most API parameters work either as an index default or per search; Meilisearch separates the two, and a parameter often needs a setting first. For example, `sort` only works after you set `sortableAttributes`, and `attributesForFaceting` becomes `filterableAttributes`.

## Pitfalls

- **The script copies documents only.** Settings, synonyms, stop words, ranking and API keys stay in Algolia until you set them again in Meilisearch, using the guide's comparison tables.
- Every document needs a primary key. When none is set, Meilisearch looks in the first document for one attribute whose name ends in `id`, case-insensitive. Records that also carry fields such as `author_id` make that inference fail and nothing is added, so set the primary key explicitly, for example `objectID`.
- Document ids may only contain letters, digits, `-` and `_`, or be integers. One badly formatted id fails the whole batch.
- Sorting no longer relies on replicas: use `sortableAttributes` with the `sort` parameter.
- Some Algolia parameters have no equivalent: `aroundPrecision`, `restrictHighlightAndSnippetArrays` and `disablePrefixOnAttributes`. `unretrievableAttributes` is handled by removing attributes from `displayedAttributes`, and analytics move to a separate Analytics API.
- The finished script holds every record in memory before uploading, which matters for large indexes.
