# Nyumba

Nyumba is a fictional housing listings site for a letting agency in Kenya. Visitors browse homes and send an inquiry. Fictional agents sign in to see their own agency's homes, and a manager can mark a home as let. Students build it chapter by chapter while learning how to direct and verify an AI coding agent.

**Live site:** add your own address here after launch.
**Made by:** add your first name or a nickname here. Do not add your full name or school.

Every agency, home, area, rent and inquiry in this repository is invented. Fictional data only.

## What it does

- Browse homes read from a PostgreSQL database and filter them by county, maximum rent and bedrooms.
- Send an inquiry about an available home. The server validates it and saves it. The form accepts invented details only.
- Sign in as a fictional user. Public sign-up is turned off.
- Each agency sees only its own homes. A manager can mark an owned home as let or available. An agent cannot.
- Missing pages and failures show a plain message with no technical detail.

## What it does not do

- It does not take payments, send real messages to an agency or show maps.
- It has not been tested by real tenants or with real agencies.
- It has not been tested with a screen reader.

## Built with

Next.js and TypeScript, PostgreSQL with Drizzle ORM, Better Auth, Tailwind CSS, Vercel for hosting, GitHub Actions for checks, and an AI coding agent for drafts.

## How it is checked

```bash
bun run check
```

`check` runs, in order: `typecheck`, `lint`, `scan:secrets`, `test` and `build`. The same checks run on every pull request.

After a launch, point the launch check at the live address:

```bash
bun run launch:check https://your-address-here
```

It checks the address from outside. It does not check phones, sign-in or who can see what. Those are checked by hand. See `docs/launch-checklist.md`.

## Run it on your own computer

Copy `.env.example` to `.env.local` and ask the teacher for the scoped PostgreSQL address, a random auth secret and two fictional class-only credentials. Never commit that file or paste its values into a prompt, screenshot or chat.

```bash
bun install --frozen-lockfile
bun --env-file=.env.local run db:migrate
bun --env-file=.env.local run db:seed
bun --env-file=.env.local run auth:seed
bun run dev
```

Open [http://localhost:3000](http://localhost:3000). The teacher runs migrations and seeds once for each isolated learner database.

## Chapter workflow

1. Pull the latest approved chapter branch.
2. Create a branch for one small change.
3. Read the diff and run `bun run check`.
4. Push the branch and open a pull request.
5. Explain what changed before asking for review.

The chapter PRs are cumulative and every PR targets `main`. Merge them in chapter order; each later diff shrinks automatically after its prerequisite lands.

## Safety rules

- Keep the repository free of real names, phone numbers, email addresses, school names and exact home addresses.
- Never commit `.env` files, passwords, API keys or connection strings.
- Do not add a payment method or paid dependency for a lesson task.
- Do not make the repository public or share a deployment link beyond the agreed class audience.
- Read every AI-agent permission request and every diff before committing.

## How I worked with AI

Write this part yourself, in your own words. Say what the AI drafted, what you checked and one thing it got wrong.

## More

- `docs/stories.md` and `docs/data.md`: the plan.
- `docs/environments.md`: which setting lives where. Names only.
- `docs/break-list.md`: what I tried to break.
- `docs/launch-checklist.md`: what I checked before launch.
- `docs/demo-script.md` and `docs/retro.md`: my Demo Day script and what I learned.
- `docs/build-log.md`: what each chapter added.
