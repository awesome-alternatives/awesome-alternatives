---
reviewed: 2026-09-24
majors:
  jest: 30
  vitest: 5
sources:
  - https://vitest.dev/guide/migration/jest
---

## Compatibility

Vitest was designed around a Jest-compatible API, so most test files move over by swapping `jest.*` calls for `vi.*` and importing from `vitest`. The differences below are the ones the Vitest team documents.

## Before you switch

1. Decide on globals. Jest exposes `describe`, `it` and `expect` globally by default and Vitest does not: turn on the `globals` option, or import them from `vitest`.
2. Replace `jest.fn`, `jest.mock` and `jest.spyOn` with their `vi` counterparts, and `jest.setTimeout(n)` with `vi.setConfig({ testTimeout: n })`.
3. Import types such as `Mock` from `vitest`, since there is no `jest` namespace.

## Pitfalls

- With globals off, Testing Library does not clean up the DOM automatically between tests.
- `mockReset` restores the original implementation passed to `vi.fn`, where Jest replaces it with an empty function.
- A module mock factory must return an object with each export spelled out, including `default`. In Jest, the returned value is the default export.
- Mocks in `__mocks__` are not picked up unless `vi.mock()` is called, for example in a setup file.
- `jest.requireActual` becomes `await vi.importActual`.
- Test names are joined with `>` instead of a space, which changes `expect.getState().currentTestName` and `-t` patterns that span a suite and a test.
- Tests written with a `done` callback must become `async` functions.
- A `beforeEach` or `beforeAll` that returns a value is treated as a teardown function. Hooks also run as a stack by default; set `sequence.hooks` to `list` for Jest's order.
- `JEST_WORKER_ID` becomes `VITEST_POOL_ID`, and Jest's legacy fake timers are not supported.
