# Chapter 7 database files

Chapter 7 gives Nyumba a relational PostgreSQL design without connecting the Next.js app yet.

Run these files in order in a fresh teacher-controlled training database:

1. `schema.sql` creates agencies, listings and inquiries.
2. `seed.sql` inserts one fictional agency and the six fictional listings already used by the app.
3. `queries.sql` reads the rows, proves the agency relationship and adds one fictional practice listing.

The SQL files contain no connection string. Never paste a database URL, password or token into this repository, an AI prompt, a screenshot or class chat.

Chapter 8 will add the protected application connection. Until then, the `/listings` page continues to read `src/data/listings.ts`.
