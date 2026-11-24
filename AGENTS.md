# Nyumba project rules

Nyumba is a fictional housing listings site for a letting agency in Kenya.

## Current chapter

- Chapter 11 is in scope: checks, a pull request workflow and environment notes. Chapter 10 authorization rules still apply.
- Chapter 10 added authenticated fictional users with an agency and either a manager or agent role.
- Managers may change listing status only inside their own agency. Agents have read-only access to their own agency dashboard.
- Public sign-up stays disabled. The browser never chooses an agency or role.
- The teacher runs migrations and seeds once for each isolated learner database. Learners do not share one writable schema.

## Before changing code

- Read `docs/stories.md` and `docs/data.md`.
- Read the existing file before editing it.
- Change only what the task asks for and list every changed file.

## Build rules

- Use Bun, Next.js, TypeScript and the existing Tailwind setup.
- Install nothing new without asking first. Better Auth, Drizzle ORM and postgres-js are already approved. Chapter 11 adds no new package: ESLint and eslint-config-next are already installed.
- Work on a branch named ch11/short-name. Never ask me to work directly on main.
- Never make a check pass by weakening it. Do not delete a check, add eslint-disable, loosen tsconfig.json, skip a workflow step or add a scan exception. Fix the cause, or stop and tell me why you cannot.
- A workflow uses no secrets, keeps permissions at contents: read and never uses pull_request_target. Explain every line you add before I save it.
- Green checks do not prove the Chapter 10 rules still hold. If you change sign-in, roles or a private query, tell me to re-run the access matrix.
- docs/environments.md holds setting names only. Never write a value in it.
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
- Better Auth authenticates teacher-created fictional accounts. Public sign-up stays disabled.
- Never print or commit `BETTER_AUTH_SECRET`, `DEMO_AGENT_PASSWORD` or a session cookie.
- Authentication proves identity; Chapter 10 authorization decides which agency records that identity may view or change.
- Chapter 10 authorizes two fictional users by role and agency. Never trust an agency ID sent by the browser.
- Managers may change listing status only inside their own agency. Agents have read-only access to their own agency dashboard.
- A cross-agency listing request returns 404 so it does not reveal whether another agency's record exists.
- Do not add a public admin page, delete controls or browser-side authorization.

## Words

- Rent is in KES per month.
- An agent is a person working at the letting agency, not an AI coding agent.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
