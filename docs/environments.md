# Environments

Names only. Never write a value in this file.

Nyumba runs in three places. Each place gets only the settings it needs.

| Setting name | Your laptop (`.env.local`) | Preview (Vercel) | Production (Vercel) | Check on GitHub |
|---|---|---|---|---|
| `DATABASE_URL` | scoped class database | not set, or a separate throwaway database | scoped class database | never |
| `BETTER_AUTH_SECRET` | local random value | not set | production random value | never |
| `BETTER_AUTH_URL` | `http://localhost:3000` | not set | the production address | never |
| `DEMO_*` credentials | teacher setup only | never | never | never |

Rules:

- A value that is a secret lives in a private settings screen, never in a file Git tracks.
- The check on GitHub builds the app without any secret. If a check needs a secret, stop and ask.
- Preview pages are for looking at public pages. Sign-in on a preview needs its own settings and is not part of this chapter.
