"use client";

import { useState } from "react";

import { InquiryForm } from "@/components/InquiryForm";
import { ListingCard } from "@/components/ListingCard";
import type { Listing } from "@/data/listings";

const controlClass = "mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900";

export function ListingsExplorer({ listings }: { listings: Listing[] }) {
  const [county, setCounty] = useState("all");
  const [maxRent, setMaxRent] = useState("all");
  const [bedrooms, setBedrooms] = useState("all");
  const counties = [...new Set(
    listings.map((listing) => listing.area.split(", ").at(-1) ?? listing.area),
  )].sort();

  const visibleListings = listings.filter((listing) => {
    const listingCounty = listing.area.split(", ").at(-1) ?? listing.area;
    return (county === "all" || listingCounty === county)
      && (maxRent === "all" || listing.rent <= Number(maxRent))
      && (bedrooms === "all" || listing.bedrooms === Number(bedrooms));
  });

  return (
    <>
      <section aria-labelledby="filter-heading">
        <h2 id="filter-heading" className="text-2xl font-bold text-zinc-900">Find a home</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div>
            <label className="font-bold text-zinc-800" htmlFor="county">County</label>
            <select id="county" className={controlClass} value={county} onChange={(event) => setCounty(event.target.value)}>
              <option value="all">All counties</option>
              {counties.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <div>
            <label className="font-bold text-zinc-800" htmlFor="maximum-rent">Maximum rent</label>
            <select id="maximum-rent" className={controlClass} value={maxRent} onChange={(event) => setMaxRent(event.target.value)}>
              <option value="all">Any rent</option>
              <option value="5000">KES 5,000</option>
              <option value="10000">KES 10,000</option>
              <option value="20000">KES 20,000</option>
              <option value="30000">KES 30,000</option>
            </select>
          </div>
          <div>
            <label className="font-bold text-zinc-800" htmlFor="bedrooms">Bedrooms</label>
            <select id="bedrooms" className={controlClass} value={bedrooms} onChange={(event) => setBedrooms(event.target.value)}>
              <option value="all">Any number</option>
              <option value="0">No separate bedroom</option>
              <option value="1">1 bedroom</option>
              <option value="2">2 bedrooms</option>
              <option value="3">3 bedrooms</option>
            </select>
          </div>
        </div>
        <p className="mt-5 font-bold text-zinc-800" aria-live="polite">
          {visibleListings.length} {visibleListings.length === 1 ? "home matches" : "homes match"}.
        </p>
      </section>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Matching homes">
        {visibleListings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}
      </div>
      {visibleListings.length === 0 ? (
        <p className="mt-5 rounded-xl bg-white p-5 text-zinc-700 ring-1 ring-zinc-200">
          No sample home matches all three filters. Change one filter and try again.
        </p>
      ) : null}

      <InquiryForm listings={listings.filter((listing) => listing.status === "available")} />
    </>
  );
}
