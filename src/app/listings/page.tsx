"use client";

import Link from "next/link";
import { useState } from "react";

import { InquiryForm } from "@/components/InquiryForm";
import { ListingCard } from "@/components/ListingCard";
import { listings } from "@/data/listings";

const countyOf = (area: string) => area.split(", ").at(-1) ?? area;
const counties = [...new Set(listings.map((listing) => countyOf(listing.area)))].sort();

const select =
  "w-full rounded-lg border border-zinc-300 bg-white p-3 font-normal text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700";

export default function ListingsPage() {
  const [county, setCounty] = useState("all");
  const [maxRent, setMaxRent] = useState("all");
  const [bedrooms, setBedrooms] = useState("all");

  const visibleListings = listings.filter((listing) => {
    const matchesCounty = county === "all" || countyOf(listing.area) === county;
    const matchesRent = maxRent === "all" || listing.rent <= Number(maxRent);
    const matchesBedrooms = bedrooms === "all" || listing.bedrooms === Number(bedrooms);

    return matchesCounty && matchesRent && matchesBedrooms;
  });

  return (
    <>
      <header className="bg-violet-700 px-5 py-12 text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight">All homes</h1>
          <p className="mt-2 text-violet-100">Filter six sample homes, then preview a fictional inquiry.</p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-10">
        <section aria-labelledby="filter-heading">
          <h2 id="filter-heading" className="text-xl font-bold text-zinc-900">Find a home</h2>
          <div className="my-4 grid gap-4 sm:grid-cols-3">
            <label className="grid gap-1 font-bold text-zinc-900">
              County
              <select className={select} value={county} onChange={(event) => setCounty(event.target.value)}>
                <option value="all">All counties</option>
                {counties.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-1 font-bold text-zinc-900">
              Maximum rent
              <select className={select} value={maxRent} onChange={(event) => setMaxRent(event.target.value)}>
                <option value="all">Any rent</option>
                <option value="5000">KES 5,000</option>
                <option value="10000">KES 10,000</option>
                <option value="20000">KES 20,000</option>
                <option value="30000">KES 30,000</option>
              </select>
            </label>
            <label className="grid gap-1 font-bold text-zinc-900">
              Bedrooms
              <select className={select} value={bedrooms} onChange={(event) => setBedrooms(event.target.value)}>
                <option value="all">Any number</option>
                <option value="0">No separate bedroom</option>
                <option value="1">1 bedroom</option>
                <option value="2">2 bedrooms</option>
                <option value="3">3 bedrooms</option>
              </select>
            </label>
          </div>
          <p className="font-bold text-zinc-900" aria-live="polite">
            {visibleListings.length} {visibleListings.length === 1 ? "home matches" : "homes match"}.
          </p>
        </section>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Matching homes">
          {visibleListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
        {visibleListings.length === 0 ? (
          <p className="mt-4 rounded-xl bg-white p-4 ring-1 ring-zinc-200">
            No sample home matches all three filters. Change one filter and try again.
          </p>
        ) : null}

        <InquiryForm listings={listings.filter((listing) => listing.status === "available")} />
        <Link className="font-bold text-violet-700 underline" href="/">
          Back to the home page
        </Link>
      </main>
    </>
  );
}
