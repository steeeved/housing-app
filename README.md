# Nyumba

Nyumba is a fictional housing listings site for a letting agency in Kenya. Students build it chapter by chapter while learning how to direct and verify an AI coding agent.

Every agency, home, area combination, rent and inquiry in this repository is invented. Fictional data only.

## Run the app

Install the pinned dependencies and start the development server:

```bash
bun install --frozen-lockfile
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

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

The chapter PRs are cumulative. Each chapter starts from the previous chapter's approved state.

## Safety rules

- Keep the repository free of real names, phone numbers, email addresses, school names and exact home addresses.
- Never commit `.env` files, passwords, API keys or connection strings.
- Do not add a payment method or paid dependency for a lesson task.
- Do not make the repository public or share a deployment link beyond the agreed class audience.
- Read every AI-agent permission request and every diff before committing.

## Deployment

The connected Vercel project builds the repository after a push. An adult holds the Vercel account. If a deployment fails, read the first build error and compare it with the local `bun run build` result before changing code.
