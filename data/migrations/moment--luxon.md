---
reviewed: 2026-09-24
majors:
  moment: 2
  luxon: 3
sources:
  - https://moment.github.io/luxon/#/moment
---

## Compatibility

Luxon takes many ideas from Moment but is not a drop-in replacement: the API is different, so calls are rewritten rather than renamed.

## Before you switch

The Luxon documentation keeps a table mapping Moment calls to their Luxon equivalents. The most common ones:

- `moment()` becomes `DateTime.now()`.
- `moment(isoString)` becomes `DateTime.fromISO(isoString)`, and a custom format goes through `DateTime.fromFormat`.
- `moment(millis)` becomes `DateTime.fromMillis(millis)`, and `moment(date)` becomes `DateTime.fromJSDate(date)`.
- `m.add(1, "hours")` becomes `dt.plus({ hours: 1 })`.
- `m.year()` becomes the property `dt.year`, and chained setters become one `dt.set({ year: 2016, month: 4 })`.

## Pitfalls

- Luxon objects are immutable. `plus` returns a new instance and leaves the original alone, where Moment's `add` changes the object in place. Code that relied on mutation silently stops updating.
- Months are 1-indexed in Luxon, not 0-indexed as in Moment and `Date`.
- Format tokens differ, so a Moment format string cannot be reused as is.
- Luxon's parsers are strict and reject input Moment's lenient parsing accepted.
- Arguments are not coerced. `m.diff("2017-04-01")` has to become `dt.diff(DateTime.fromISO("2017-04-01"))`.
- Locales and time zones come from the browser's or Node's `Intl` API instead of data bundled with the library.
