---
reviewed: 2026-09-29
majors:
  mongodb: 9
  ferretdb: 2
sources:
  - https://docs.ferretdb.io/migration/
  - https://docs.ferretdb.io/migration/compatibility/
  - https://docs.ferretdb.io/migration/premigration-testing/
  - https://docs.ferretdb.io/migration/migrating-from-mongodb/
---

## Compatibility

FerretDB states that all drivers and applications compatible with MongoDB 5.0 and later should work with it over the wire protocol. It keeps MongoDB's error names and codes. Two differences are permanent: error messages can differ, and collection names must be valid UTF-8, where MongoDB accepts invalid sequences. The project treats any other difference as a bug.

The compatibility page lists the commands that are not implemented yet. Among them:

- transactions: `abortTransaction` and `commitTransaction`
- the `bulkWrite` query command
- the `authenticate` command, and every role management command such as `createRole` and `grantRolesToRole`
- `grantRolesToUser` and `revokeRolesFromUser`
- administrative commands such as `convertToCapped`, `killOp`, `setParameter` and `shutdown`
- `profile` and `connPoolStats`

## Before you switch

1. **Test the application against FerretDB first.** Start FerretDB with `--mode=diff-normal`, point `--proxy-addr` at the MongoDB instance and connect the application or `mongosh` to `--listen-addr`. Errors from FerretDB reach the client directly. With `--mode=diff-proxy`, MongoDB answers and FerretDB shows the difference between the two responses.
2. **Export the data** with MongoDB's own tools. `mongodump --uri=...` dumps every collection as BSON, and `--db` or `--collection` narrows it. `mongoexport` works one collection at a time with `--db`, `--collection` and `--out`.
3. **Import into FerretDB** by pointing `mongorestore --uri=...` at the FerretDB instance from the dump folder, or `mongoimport` with `--file` for each exported collection.

## Pitfalls

- **Check your application's use of transactions and roles before anything else.** Neither is implemented, and a test run is the fastest way to find out.
- Development builds print request and response metrics to stdout on exit, with `result="NotImplemented"` for commands the application sent that FerretDB does not support.
- FerretDB also maintains a fork of the Amazon DocumentDB Compatibility Tool that scans source code for unsupported operators. Its docs warn that it does not parse query context and can report false positives and false negatives.
- The guide covers a one-off dump and restore only. It does not describe keeping MongoDB and FerretDB in sync during a cutover, so writes made after the dump are not carried over by these steps.
