import Link from "next/link";
import { connection } from "next/server";

import { ListingsExplorer } from "@/components/ListingsExplorer";
import { readListings } from "@/db/queries";

export const instant = false;

export default async function ListingsPage() {
  await connection();
  const listings = await readListings();

  return (
    <>
      <header className="bg-violet-700 px-5 py-12 text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight">All homes</h1>
          <p className="mt-2 text-violet-100">Filter six database homes, then save a fictional inquiry.</p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-10">
        <ListingsExplorer listings={listings} />

        <Link className="mt-8 inline-block font-bold text-violet-700 underline" href="/">
          Back to the home page
        </Link>
      </main>
    </>
  );
}
