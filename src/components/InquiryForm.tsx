"use client";

import { useState } from "react";

import type { Listing } from "@/data/listings";

const field =
  "w-full rounded-lg border border-zinc-300 bg-white p-3 text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700";

export function InquiryForm({ listings }: { listings: Listing[] }) {
  const [previewing, setPreviewing] = useState(false);

  if (previewing) {
    return (
      <section className="my-10 rounded-xl bg-white p-5 ring-1 ring-zinc-200" aria-labelledby="inquiry-heading">
        <h2 id="inquiry-heading" className="text-xl font-bold text-zinc-900">Inquiry preview ready</h2>
        <p className="mt-2 text-zinc-700">This is a practice message. Nothing was sent or saved.</p>
        <button
          type="button"
          className="mt-4 rounded-lg bg-violet-700 px-4 py-2 font-bold text-white hover:bg-violet-800"
          onClick={() => setPreviewing(false)}
        >
          Edit the inquiry
        </button>
      </section>
    );
  }

  return (
    <section className="my-10 rounded-xl bg-white p-5 ring-1 ring-zinc-200" aria-labelledby="inquiry-heading">
      <h2 id="inquiry-heading" className="text-xl font-bold text-zinc-900">Preview an inquiry</h2>
      <p className="mt-2 text-zinc-700">Use an invented name and message. Chapter 6 will make the form reach the server.</p>
      <form
        className="mt-4 grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          setPreviewing(true);
        }}
      >
        <label className="grid gap-1 font-bold text-zinc-900" htmlFor="listing">
          Home
          <select id="listing" name="listing" required defaultValue="" className={field}>
            <option value="" disabled>Choose an available home</option>
            {listings.map((listing) => (
              <option key={listing.id} value={listing.id}>{listing.title}, {listing.area}</option>
            ))}
          </select>
        </label>

        <label className="grid gap-1 font-bold text-zinc-900" htmlFor="display-name">
          Invented name
          <input id="display-name" name="displayName" placeholder="For example, Amani" required className={field} />
        </label>

        <label className="grid gap-1 font-bold text-zinc-900" htmlFor="message">
          Message
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            placeholder="I would like to know when this fictional home is available."
            className={field}
          />
        </label>

        <button type="submit" className="justify-self-start rounded-lg bg-violet-700 px-4 py-2 font-bold text-white hover:bg-violet-800">
          Preview inquiry
        </button>
      </form>
    </section>
  );
}
