import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";

import { SignOutButton } from "@/components/SignOutButton";
import { auth } from "@/lib/auth";

export const instant = false;

export default async function AgentPage() {
  await connection();
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 items-center px-5 py-10">
      <section className="w-full rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-200" aria-labelledby="agent-heading">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-700">Protected page</p>
        <h1 id="agent-heading" className="mt-2 text-3xl font-bold text-zinc-900">Signed in as {session.user.name}</h1>
        <p className="mt-2 text-zinc-700">Your session proves which fictional user made this request.</p>
        <p className="mt-5 rounded-lg bg-emerald-50 p-4 text-emerald-950">
          <strong>Identity and permission are separate.</strong> Your dashboard uses the agency and role stored on this fictional account.
        </p>
        <Link className="mt-5 block font-bold text-violet-700 underline" href="/dashboard">Open your agency dashboard</Link>
        <SignOutButton />
        <Link className="mt-6 block font-bold text-violet-700 underline" href="/listings">Browse the public listings</Link>
      </section>
    </main>
  );
}
