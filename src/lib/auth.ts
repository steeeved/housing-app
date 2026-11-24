import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import * as authSchema from "@/db/auth-schema";
import { getDatabase } from "@/db/client";

const authSecret = process.env.BETTER_AUTH_SECRET;

if (!authSecret) {
  throw new Error("BETTER_AUTH_SECRET is missing. Ask the teacher for the scoped class value.");
}

export const auth = betterAuth({
  appName: "Nyumba",
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  secret: authSecret,
  database: drizzleAdapter(getDatabase(), {
    provider: "pg",
    schema: authSchema,
  }),
  user: {
    additionalFields: {
      agencyId: {
        type: "string",
        required: false,
        input: false,
      },
      role: {
        type: "string",
        required: false,
        defaultValue: "agent",
        input: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    disableSignUp: process.env.ALLOW_DEMO_SIGNUP !== "true",
    minPasswordLength: 12,
  },
});
