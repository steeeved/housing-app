import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const globalForDatabase = globalThis as unknown as {
  postgresClient?: ReturnType<typeof postgres>;
};

export function getDatabase() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is missing. Ask the teacher for the scoped class URL.");
  }

  const client = globalForDatabase.postgresClient
    ?? postgres(databaseUrl, { max: 1, prepare: false });

  globalForDatabase.postgresClient = client;
  return drizzle(client);
}

export async function closeDatabase() {
  if (globalForDatabase.postgresClient) {
    await globalForDatabase.postgresClient.end();
    globalForDatabase.postgresClient = undefined;
  }
}
