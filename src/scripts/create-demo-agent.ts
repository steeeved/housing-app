import { eq } from "drizzle-orm";

import { session, user } from "../db/auth-schema";
import { closeDatabase, getDatabase } from "../db/client";

process.env.ALLOW_DEMO_SIGNUP = "true";
const { auth } = await import("../lib/auth");
const database = getDatabase();

const agents = [
  {
    name: "Amani Manager",
    email: process.env.DEMO_AGENT_EMAIL,
    password: process.env.DEMO_AGENT_PASSWORD,
    agencyId: "nyumba-agency",
    role: "manager" as const,
  },
  {
    name: "Baraka Agent",
    email: process.env.DEMO_OTHER_AGENT_EMAIL,
    password: process.env.DEMO_OTHER_AGENT_PASSWORD,
    agencyId: "ziwa-property",
    role: "agent" as const,
  },
];

if (agents.some((agent) => !agent.email || !agent.password)) {
  throw new Error("Both fictional agent emails and passwords are required.");
}

for (const agent of agents) {
  const email = agent.email as string;
  const password = agent.password as string;
  const [existing] = await database
    .select({ id: user.id })
    .from(user)
    .where(eq(user.email, email))
    .limit(1);
  let userId = existing?.id;

  if (!userId) {
    const result = await auth.api.signUpEmail({
      body: { name: agent.name, email, password },
    });
    userId = result.user.id;
    await database.delete(session).where(eq(session.userId, userId));
  }

  await database
    .update(user)
    .set({ name: agent.name, agencyId: agent.agencyId, role: agent.role })
    .where(eq(user.id, userId));
  console.log(`Prepared ${agent.name} for ${agent.agencyId}.`);
}

await closeDatabase();
