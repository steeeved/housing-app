# Chapter 8 definition of done

## Changes in this chapter

- The six Chapter 7 listings keep the same IDs, titles, agency and status when they move into Drizzle.
- `/listings` reads from PostgreSQL instead of a static array.
- A validated fictional inquiry is saved with its creation time.
- Names are 2 to 80 characters and messages are 10 to 500 characters.

## Must still be true

- Only fictional data is used. Inquiry text contains no real phone number, email address or home address.
- `DATABASE_URL` is read only from the environment and never exposed to browser code.
- The teacher runs migrations and seeds once for each isolated learner database. Learners do not share one writable schema.
- Authentication and agent accounts are not built until Chapter 9.

## Checks

```bash
bun install --frozen-lockfile
bun run lint
bun run build
```

The teacher also runs `db:migrate` and `db:seed` against a fresh isolated test database before sharing a scoped URL.
