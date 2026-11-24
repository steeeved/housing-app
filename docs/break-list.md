# Break list

One row per break. Evidence is something another person can see: a command, a status code or a test name. Never paste a secret or a real person's details.

Rows marked **Not run** were not tested in this repository yet. Do them in class and fill in the evidence.

| ID | Attack | Expected | Actual (before the fix) | Fix | Evidence |
|---|---|---|---|---|---|
| B1 | Send a message that looks like database code: `'); DROP TABLE inquiries; --` | Stored as plain text. Tables untouched. | Drizzle sends values separately from the query, so there is nothing to inject into. | None needed. A test row keeps it true. | Test "SQL-looking text is plain text and passes" in `src/scripts/test-validation.ts`. Not run against a live database. |
| B2 | Send `<script>alert(1)</script>` as the message | Shown as text, never run | React escapes text when it is shown. | ESLint rule `react/no-danger` so nobody can switch escaping off later. | `bun run lint` fails with `react/no-danger` on a file using `dangerouslySetInnerHTML` (tried, then reverted). Test "script-looking text is plain text and passes". |
| B3 | Send a 600-character message | Rejected with a friendly sentence | The old route checked 10 to 500 characters but a huge body had no other limit and fields had no shared limits. | Shared limits in `src/lib/validate-inquiry.ts`, plus `maxLength` on the form fields | Tests "a message over the limit is rejected" and "a huge message is rejected". |
| B4 | Type a real-looking email address or phone number into the message | Rejected. The app is for invented details only. | Accepted and stored | Contact-detail check in the validator. The rejection never repeats the text. | Tests "an email address is rejected", "a phone number with spaces is rejected" and "a rejection must not repeat the rejected text". API returned 400 with a plain sentence. With the email check deliberately broken, `bun run test` went red. |
| B5 | Cut the connection (or get a non-JSON answer) while sending the form | A calm message and a working form | A non-JSON answer would throw inside the form handler. | Safe read of the answer in `src/components/InquiryForm.tsx` | Read from the code. **Not run** in a real browser. |
| B6 | Stop the database, then send an inquiry | A calm message, no connection detail | Default 500 with the error logged in full. | `try`/`catch` around the save. Log one plain sentence, never the error object. | With no database reachable, the API returned 503 and "The practice database is not available." The server log held no connection text. |
| B7 | Open an address that does not exist | A friendly page with a way home | Default framework page | `src/app/not-found.tsx` | `/nothing-here` returned 404 with our wording. |
| B8 | Scan the public pages for accessibility problems | No violations the scanner can find | Hint text was not linked to the fields | `aria-describedby` on the name and message fields | **Not run**: no Lighthouse or axe scan yet (named extension). |
| B9 | Re-run the Chapter 10 access matrix after all changes | Same four results as before | Not re-run | None | **Not run**: needs the class database and both fictional accounts. Sign-in, roles and private queries were not changed. |

## Not checked

- A real browser on a phone screen.
- A slow connection.
- The error page in a real browser (`error.tsx` was added, not triggered).
