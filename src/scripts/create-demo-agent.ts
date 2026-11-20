import { eq } from "drizzle-orm";

import { session, user } from "../db/auth-schema";
import { closeDatabase, getDatabase } from "../db/client";

const email = process.env.DEMO_AGENT_EMAIL;
const password = process.env.DEMO_AGENT_PASSWORD;

if (!email || !password) {
  throw new Error("DEMO_AGENT_EMAIL and DEMO_AGENT_PASSWORD are required.");
}

process.env.ALLOW_DEMO_SIGNUP = "true";
const { auth } = await import("../lib/auth");
const database = getDatabase();
const [existing] = await database
  .select({ id: user.id })
  .from(user)
  .where(eq(user.email, email))
  .limit(1);

if (existing) {
  console.log("The fictional demo agent already exists.");
} else {
  const result = await auth.api.signUpEmail({
    body: {
      name: "Amani Agent",
      email,
      password,
    },
  });

  await database.delete(session).where(eq(session.userId, result.user.id));
  console.log("Created the fictional demo agent.");
}

await closeDatabase();
