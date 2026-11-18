import type { Listing } from "@/data/listings";

export function ListingCard({ listing }: { listing: Listing }) {
  const bedroomLabel = listing.bedrooms === 0
    ? "No separate bedroom"
    : `${listing.bedrooms} bedroom${listing.bedrooms === 1 ? "" : "s"}`;

  return (
    <article className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
      <h3 className="text-lg font-bold text-zinc-900">{listing.title}</h3>
      <p className="mt-1 text-zinc-600">{listing.area}</p>
      <p className="mt-4 font-bold text-violet-700">
        KES {listing.rent.toLocaleString("en-KE")} / month
      </p>
      <p className="mt-2 text-sm text-zinc-700">{bedroomLabel}</p>
      <p className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
        listing.status === "let" ? "bg-zinc-200 text-zinc-700" : "bg-emerald-100 text-emerald-800"
      }`}>
        {listing.status === "let" ? "Let" : "Available"}
      </p>
    </article>
  );
}
