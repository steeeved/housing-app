# Chapter 9 definition of done

## Changes in this chapter

- Better Auth stores the planned Agent entity as an authenticated user.
- One teacher-created fictional agent can sign in, open `/agent` and sign out.
- Public sign-up is disabled.

## Must still be true

- Authentication proves identity only. Roles, agency isolation and listing edits wait until Chapter 10.
- Auth secrets, fictional passwords and session cookies stay out of source, prompts and logs.
- The teacher runs migrations and `auth:seed` for each isolated learner database.

## Checks

```bash
bun install --frozen-lockfile
bun run lint
bun run build
```

Also verify signed-out redirect, rejected public sign-up, rejected wrong password, successful fictional sign-in and sign-out.
