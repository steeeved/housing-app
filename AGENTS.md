# Nyumba project rules

Nyumba is a fictional housing listings site for a letting agency in Kenya.

## Current chapter

- Chapter 8 is in scope: Drizzle reads the six Chapter 7 listings from PostgreSQL and saves validated fictional inquiries.
- Authentication, agent accounts, roles and listing edits are not built yet.
- The teacher runs migrations and seeds once for each isolated learner database. Learners do not share one writable schema.

## Before changing code

- Read `docs/stories.md` and `docs/data.md`.
- Read the existing file before editing it.
- Change only what the task asks for and list every changed file.

## Build rules

- Use Bun, Next.js, TypeScript and the existing Tailwind setup.
- Install nothing new without asking first. Drizzle ORM and postgres-js are already approved for the current chapter.
- Keep components small and give every form field a visible label.
- Run `bun run lint` and `bun run build` before calling a change complete.
- Do not run Git commands that commit, push or discard work for the student.

## Safety rules

- Use fictional names, messages, phone numbers and listings only.
- Never create, print, request or commit passwords, tokens, keys or connection strings.
- Keep environment files out of Git.
- Do not claim a message was sent or saved unless server code proves it.
- Validate inquiry names at 2 to 80 characters and messages at 10 to 500 characters on the server.
- Warn learners not to type real phone numbers, email addresses or home addresses into inquiry text.
- Read `DATABASE_URL` only from the environment. Never print it, paste it into a prompt or commit an environment file.

## Words

- Rent is in KES per month.
- An agent is a person working at the letting agency, not an AI coding agent.
