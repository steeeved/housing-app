"use client";

import { useState } from "react";

import type { Listing } from "@/data/listings";

const fieldClass = "mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900";
const buttonClass = "rounded-lg bg-violet-700 px-4 py-2 font-bold text-white hover:bg-violet-800 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-violet-700";

export function InquiryForm({ listings }: { listings: Listing[] }) {
  const [previewing, setPreviewing] = useState(false);

  if (previewing) {
    return (
      <section className="mt-10 rounded-xl bg-white p-6 ring-1 ring-zinc-200" aria-labelledby="inquiry-heading">
        <h2 id="inquiry-heading" className="text-2xl font-bold text-zinc-900">Inquiry preview ready</h2>
        <p className="mt-2 text-zinc-700">This is a practice message. Nothing was sent or saved.</p>
        <button className={`${buttonClass} mt-5`} type="button" onClick={() => setPreviewing(false)}>
          Edit the inquiry
        </button>
      </section>
    );
  }

  return (
    <section className="mt-10 rounded-xl bg-white p-6 ring-1 ring-zinc-200" aria-labelledby="inquiry-heading">
      <h2 id="inquiry-heading" className="text-2xl font-bold text-zinc-900">Preview an inquiry</h2>
      <p className="mt-2 text-zinc-700">
        Use an invented name and message. Chapter 6 will make the form reach the server.
      </p>

      <form
        className="mt-6 grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          setPreviewing(true);
        }}
      >
        <div>
          <label className="font-bold text-zinc-800" htmlFor="listing">Home</label>
          <select className={fieldClass} id="listing" name="listing" required defaultValue="">
            <option value="" disabled>Choose an available home</option>
            {listings.map((listing) => (
              <option key={listing.id} value={listing.id}>{listing.title}, {listing.area}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-bold text-zinc-800" htmlFor="display-name">Invented name</label>
          <input className={fieldClass} id="display-name" name="displayName" placeholder="For example, Amani" required />
        </div>

        <div>
          <label className="font-bold text-zinc-800" htmlFor="message">Message</label>
          <textarea
            className={fieldClass}
            id="message"
            name="message"
            rows={4}
            placeholder="I would like to know when this fictional home is available."
            required
          />
        </div>

        <button className={`${buttonClass} justify-self-start`} type="submit">Preview inquiry</button>
      </form>
    </section>
  );
}
