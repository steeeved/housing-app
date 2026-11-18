import Link from "next/link";

import { ListingCard } from "@/components/ListingCard";
import { listings } from "@/data/listings";

export default function ListingsPage() {
  return (
    <>
      <header className="bg-violet-700 px-5 py-12 text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight">All homes</h1>
          <p className="mt-2 text-violet-100">Six fictional listings from one typed data file.</p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
        <Link className="mt-8 inline-block font-bold text-violet-700 underline" href="/">
          Back to the home page
        </Link>
      </main>
    </>
  );
}
