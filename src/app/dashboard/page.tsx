import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";

import { ListingStatusButton } from "@/components/ListingStatusButton";
import { SignOutButton } from "@/components/SignOutButton";
import { readAgencyDashboard } from "@/db/queries";
import { auth } from "@/lib/auth";

export const instant = false;

export default async function DashboardPage() {
  await connection();
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sign-in");
  }

  if (!session.user.agencyId) {
    return <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-10"><p>This fictional user has no agency assignment.</p></main>;
  }

  const dashboard = await readAgencyDashboard(session.user.agencyId);

  if (!dashboard) {
    return <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-10"><p>The assigned fictional agency could not be found.</p></main>;
  }

  const canManage = session.user.role === "manager";

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-10">
      <div className="flex flex-col gap-5 rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-violet-800">{session.user.role}</p>
          <h1 className="mt-3 text-3xl font-bold text-zinc-900">{dashboard.agency.name} dashboard</h1>
          <p className="mt-2 text-zinc-700">Signed in as {session.user.name}. You can see only this agency&apos;s listings.</p>
        </div>
        <SignOutButton />
      </div>

      {!canManage ? (
        <p className="mt-6 rounded-lg bg-amber-50 p-4 text-amber-950">Your agent role is read-only. A manager must change listing status.</p>
      ) : null}

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {dashboard.listings.map((listing) => (
          <li className="rounded-xl bg-white p-5 ring-1 ring-zinc-200" key={listing.id}>
            <h2 className="text-xl font-bold text-zinc-900">{listing.title}</h2>
            <p className="mt-2 text-zinc-700">{listing.area}, {listing.county}</p>
            <p className="mt-1 font-bold text-violet-700">KES {listing.rentKes.toLocaleString("en-KE")} / month</p>
            <p className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
              listing.status === "let" ? "bg-zinc-200 text-zinc-700" : "bg-emerald-100 text-emerald-800"
            }`}>{listing.status === "let" ? "Let" : "Available"}</p>
            {canManage ? <ListingStatusButton listingId={listing.id} currentStatus={listing.status} /> : null}
          </li>
        ))}
      </ul>

      <Link className="mt-8 inline-block font-bold text-violet-700 underline" href="/listings">Browse all public listings</Link>
    </main>
  );
}
