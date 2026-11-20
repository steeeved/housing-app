# Nyumba

Nyumba is a fictional housing listings site for a letting agency in Kenya. Students build it chapter by chapter while learning how to direct and verify an AI coding agent.

Every agency, home, area combination, rent and inquiry in this repository is invented. Fictional data only.

Chapter 8 uses Drizzle ORM to read listings from PostgreSQL and save validated fictional inquiries. Chapter 9 adds Better Auth. Chapter 10 adds role-based authorization and agency isolation: Amani Manager can update only Nyumba Agency listings, while Baraka Agent sees only Ziwa Property listings and has read-only access. Public sign-up stays disabled.

## Run the app

Install the pinned dependencies and start the development server:

```bash
bun install --frozen-lockfile
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local`. Ask the teacher for a scoped URL to your isolated learner database and the generated auth secret, then use only the fictional class credentials. Never paste their values into a prompt, screenshot, commit or class chat.

The teacher prepares each isolated learner database and its two fictional users:

```bash
bun --env-file=.env.local run db:migrate
bun --env-file=.env.local run db:seed
bun --env-file=.env.local run auth:seed
```

Learners do not run migrations against one shared writable schema.

Open `/dashboard` after signing in. Test four server-side boundaries: signed-out access redirects; Amani can update a Nyumba Agency listing; Amani cannot update a Ziwa listing; and Baraka cannot update even a Ziwa listing because the agent role is read-only.

Before pushing a change, run:

```bash
bun run lint
bun run build
```

## Chapter workflow

1. Pull the latest approved chapter branch.
2. Create a branch for one small change.
3. Read the diff and run the checks.
4. Push the branch and open a pull request.
5. Explain what changed before asking for review.

The chapter PRs are cumulative, but every PR targets `main`. Merge them in chapter order; each later diff shrinks automatically after its prerequisite lands.

## Safety rules

- Keep the repository free of real names, phone numbers, email addresses, school names and exact home addresses.
- Never commit `.env` files, passwords, API keys or connection strings.
- Do not add a payment method or paid dependency for a lesson task.
- Do not make the repository public or share a deployment link beyond the agreed class audience.
- Read every AI-agent permission request and every diff before committing.

## Deployment

The connected Vercel project builds the repository after a push. An adult holds the Vercel account. If a deployment fails, read the first build error and compare it with the local `bun run build` result before changing code.
