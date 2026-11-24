// Plain checks for the inquiry rules. No test library: it prints each failure and exits 1.
import assert from "node:assert/strict";

import { LIMITS, validateInquiry } from "../lib/validate-inquiry";

type Case = { name: string; input: Parameters<typeof validateInquiry>[0]; ok: boolean };

const good = { listingId: "kenol-bedsitter", displayName: "Amani", message: "Is this fictional home free in March?" };

const cases: Case[] = [
  { name: "a normal inquiry passes", input: good, ok: true },
  { name: "a one-letter name is rejected", input: { ...good, displayName: "A" }, ok: false },
  { name: "a name at the limit passes", input: { ...good, displayName: "n".repeat(LIMITS.name) }, ok: true },
  { name: "a name over the limit is rejected", input: { ...good, displayName: "n".repeat(LIMITS.name + 1) }, ok: false },
  { name: "a short message is rejected", input: { ...good, message: "Hi" }, ok: false },
  { name: "a message at the limit passes", input: { ...good, message: "m".repeat(LIMITS.message) }, ok: true },
  { name: "a message over the limit is rejected", input: { ...good, message: "m".repeat(LIMITS.message + 1) }, ok: false },
  { name: "a huge message is rejected", input: { ...good, message: "m".repeat(100_000) }, ok: false },
  { name: "spaces only are rejected", input: { ...good, message: "          " }, ok: false },
  { name: "an email address is rejected", input: { ...good, message: "Write to someone@example.com about it" }, ok: false },
  { name: "a phone number with spaces is rejected", input: { ...good, message: "Call me on 0712 345 678 please" }, ok: false },
  { name: "a control character is rejected", input: { ...good, message: "Is this home\u0000 still free?" }, ok: false },
  { name: "a non-text listing id is rejected", input: { ...good, listingId: { id: 1 } }, ok: false },
  { name: "an empty listing id is rejected", input: { ...good, listingId: "" }, ok: false },
  { name: "a missing name is rejected", input: { listingId: good.listingId, message: good.message }, ok: false },
  { name: "SQL-looking text is plain text and passes", input: { ...good, message: "'); DROP TABLE inquiries; -- is this free?" }, ok: true },
  { name: "script-looking text is plain text and passes", input: { ...good, message: "<script>alert(1)</script> is this free?" }, ok: true },
];

const failures: string[] = [];
for (const testCase of cases) {
  try {
    assert.equal(validateInquiry(testCase.input).ok, testCase.ok);
  } catch {
    failures.push(testCase.name);
  }
}

// A rejected inquiry must say why, and must never echo the input back.
const rejected = validateInquiry({ ...good, message: "Write to someone@example.com about it" });
if (rejected.ok || rejected.message.includes("someone@example.com")) {
  failures.push("a rejection must not repeat the rejected text");
}

if (failures.length > 0) {
  console.error("Validation tests failed:");
  for (const name of failures) console.error(`  ${name}`);
  process.exit(1);
}

console.log(`Validation tests passed: ${cases.length + 1} cases.`);
