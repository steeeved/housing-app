# Chapter 10 definition of done

## Changes in this chapter

- Each fictional authenticated user has a server-stored agency and role.
- A user sees only listings belonging to that agency.
- A manager can change an owned listing between available and let.
- An agent has read-only access.

## Must still be true

- The original six Chapter 7 listings keep their IDs, titles and Nyumba Agency ownership.
- The browser never supplies or overrides an agency ID or role.
- A cross-agency listing update returns 404 instead of revealing that the record exists.
- Public sign-up stays disabled and delete controls remain out of scope.

## Checks

```bash
bun install --frozen-lockfile
bun run lint
bun run build
```

Also verify signed-out access, manager-owned update, manager cross-agency update, invalid status and agent update boundaries against an isolated test database.
