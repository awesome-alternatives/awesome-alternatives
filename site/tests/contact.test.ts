import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { contactLocale, contactOutcome, contactPayload } from "../src/lib/contact.ts";

function form(fields: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

const FILLED = {
  kind: "bug",
  email: " ada@example.com ",
  name: "",
  subject: " Broken link ",
  message: "\nThe repository moved.\n",
  locale: "fr",
  website: "",
};

describe("contactPayload", () => {
  test("trims the fields and presets the product", () => {
    assert.deepEqual(contactPayload(form(FILLED)), {
      product: "awesome_alternatives",
      kind: "bug",
      subject: "Broken link",
      message: "The repository moved.",
      email: "ada@example.com",
      locale: "fr",
      website: "",
    });
  });

  test("sends a name only when one was given", () => {
    assert.equal(contactPayload(form({ ...FILLED, name: " Ada " }))?.name, "Ada");
    assert.ok(!("name" in (contactPayload(form({ ...FILLED, name: "   " })) ?? {})));
  });

  test("refuses an email, subject or message made of blanks", () => {
    for (const key of ["email", "subject", "message"]) {
      assert.equal(contactPayload(form({ ...FILLED, [key]: "  \n " })), undefined, key);
    }
  });

  test("refuses a kind the API does not know", () => {
    assert.equal(contactPayload(form({ ...FILLED, kind: "billing" })), undefined);
    assert.equal(contactPayload(form({ ...FILLED, kind: "" })), undefined);
  });

  test("passes the honeypot through untouched so the API can drop bots", () => {
    assert.equal(contactPayload(form({ ...FILLED, website: " spam.example " }))?.website, " spam.example ");
  });

  test("falls back to English for a locale the API does not answer in", () => {
    assert.equal(contactPayload(form({ ...FILLED, locale: "de" }))?.locale, "en");
    assert.equal(contactPayload(form({ ...FILLED, locale: "" }))?.locale, "en");
  });
});

test("only the French pages ask for a French acknowledgement", () => {
  assert.equal(contactLocale("fr"), "fr");
  assert.equal(contactLocale("en"), "en");
  assert.equal(contactLocale("es"), "en");
  assert.equal(contactLocale("de"), "en");
});

describe("contactOutcome", () => {
  test("an accepted message carries its reference", () => {
    assert.deepEqual(contactOutcome(202, { reference: "01J9Z" }), { state: "sent", reference: "01J9Z" });
    assert.deepEqual(contactOutcome(202, null), { state: "sent", reference: "" });
    assert.deepEqual(contactOutcome(202, { reference: 42 }), { state: "sent", reference: "" });
  });

  test("rate limits and validation failures get their own message", () => {
    assert.deepEqual(contactOutcome(429, null), { state: "error", reason: "tooMany" });
    assert.deepEqual(contactOutcome(422, { error: "subject" }), { state: "error", reason: "invalid" });
  });

  test("any other status falls back to the generic failure", () => {
    for (const status of [400, 403, 500, 502]) {
      assert.deepEqual(contactOutcome(status, null), { state: "error", reason: "failed" });
    }
  });
});
