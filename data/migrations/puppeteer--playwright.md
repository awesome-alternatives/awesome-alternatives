---
reviewed: 2026-09-29
majors:
  puppeteer: 25
  playwright: 1
sources:
  - https://playwright.dev/docs/puppeteer
---

## Compatibility

The Playwright team says most Puppeteer APIs can be used as they are, and the guide covers moving to both the Playwright Library and Playwright Test. Beyond Chromium, Playwright also drives Firefox and WebKit, which Puppeteer does not support.

## Before you switch

1. Import the browser explicitly: `const { chromium } = require('playwright')`, then `chromium.launch()`. `firefox` and `webkit` work the same way.
2. Replace `browser.createIncognitoBrowserContext(...)` with `browser.newContext(...)`, and use browser contexts for state isolation.
3. Rename the calls the cheat sheet lists: `page.setViewport` becomes `page.setViewportSize`, `page.waitForNetworkIdle(...)` becomes `page.waitForLoadState('networkidle')`, and `waitUntil: 'networkidle2'` becomes `waitUntil: 'networkidle'`.
4. Move element actions onto locators: `page.click(selector)` becomes `page.locator(selector).click()`, and likewise for `focus`, `hover` and `tap`. `page.select` becomes `selectOption`, `page.type` becomes `fill`, and file uploads through `elementHandle.uploadFile(...)` become `setInputFiles(...)`.
5. Cookies move from the page to the context: `browserContext.cookies`, `browserContext.addCookies` and `browserContext.clearCookies`.
6. For tests, the guide recommends Playwright Test over Jest plus Puppeteer. Import `test` and `expect` from `@playwright/test`, take `page` from the test's parameters, and replace `page.$eval()` checks with web-first assertions such as `expect(locator).toContainText(...)`.

## Pitfalls

- **Locators are strict.** Any action on a locator that targets a DOM element throws if more than one element matches the selector.
- `ElementHandle` is discouraged. `page.$(...)` and `page.$x(...)` have no direct replacement in the cheat sheet: the guide points at locators instead.
- The cheat sheet maps `page.deleteCookie(...cookies)` to `browserContext.clearCookies()`, so check deletions of specific cookies against the Playwright API reference.
- Playwright Test creates an isolated `Page` for each test. To share one page across tests, create it in `test.beforeAll()` and close it in `test.afterAll()`.
- `page.waitForNavigation` and `page.waitForSelector` still exist, but auto-waiting makes them unnecessary in many cases, and the guide says `networkidle` is rarely useful for the same reason.
- To intercept and change requests, use `page.route()`.
