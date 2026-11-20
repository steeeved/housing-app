# Nyumba project rules

Nyumba is a fictional housing listings site for a letting agency in Kenya.

## Current chapter

- Chapter 9 is in scope: Better Auth signs in one teacher-created fictional agent and protects `/agent`.
- Public sign-up stays disabled. Authentication proves identity only; roles, agency isolation and listing edits are not built until Chapter 10.
- The teacher runs migrations and seeds once for each isolated learner database. Learners do not share one writable schema.

## Before changing code

- Read `docs/stories.md` and `docs/data.md`.
- Read the existing file before editing it.
- Change only what the task asks for and list every changed file.

## Build rules

- Use Bun, Next.js, TypeScript and the existing Tailwind setup.
- Install nothing new without asking first. Better Auth, Drizzle ORM and postgres-js are already approved for the current chapter.
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
- Chapter 9 authenticates one fictional agent account. Public sign-up stays disabled.
- Never print or commit `BETTER_AUTH_SECRET`, `DEMO_AGENT_PASSWORD` or a session cookie.
- Authentication proves identity only. Do not add roles, agency isolation or listing edits until Chapter 10.

## Words

- Rent is in KES per month.
- An agent is a person working at the letting agency, not an AI coding agent.
