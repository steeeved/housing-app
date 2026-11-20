"use client";

import { type FormEvent, useState } from "react";

import type { Listing } from "@/data/listings";

const fieldClass = "mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900";
const buttonClass = "rounded-lg bg-violet-700 px-4 py-2 font-bold text-white hover:bg-violet-800 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-violet-700";

export function InquiryForm({ listings }: { listings: Listing[] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "received" | "error">("idle");
  const [responseMessage, setResponseMessage] = useState("");

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setResponseMessage("");

    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId: form.get("listing"),
          displayName: form.get("displayName"),
          message: form.get("message"),
        }),
      });
      const result = (await response.json()) as { message?: unknown };
      const message = typeof result.message === "string"
        ? result.message
        : "The server returned an unexpected response.";

      setResponseMessage(message);
      setStatus(response.ok ? "received" : "error");
    } catch {
      setResponseMessage("The practice server could not be reached. Try again.");
      setStatus("error");
    }
  }

  if (status === "received") {
    return (
      <section className="mt-10 rounded-xl bg-white p-6 ring-1 ring-zinc-200" aria-labelledby="inquiry-heading">
        <h2 id="inquiry-heading" className="text-2xl font-bold text-zinc-900">Practice inquiry received by the server</h2>
        <p className="mt-2 text-zinc-700">{responseMessage}</p>
        <p className="mt-2 font-bold text-zinc-900">Saved in the class database. Nothing was sent to a real agency.</p>
        <button className={`${buttonClass} mt-5`} type="button" onClick={() => setStatus("idle")}>
          Send another practice inquiry
        </button>
      </section>
    );
  }

  return (
    <section className="mt-10 rounded-xl bg-white p-6 ring-1 ring-zinc-200" aria-labelledby="inquiry-heading">
      <h2 id="inquiry-heading" className="text-2xl font-bold text-zinc-900">Save a fictional inquiry</h2>
      <p className="mt-2 text-zinc-700">
        Use an invented name and message. Do not include a real phone number, email address or home address.
      </p>

      <form className="mt-6 grid gap-4" onSubmit={submitInquiry}>
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
          <input className={fieldClass} id="display-name" name="displayName" placeholder="For example, Amani" minLength={2} maxLength={80} required />
        </div>

        <div>
          <label className="font-bold text-zinc-800" htmlFor="message">Message</label>
          <textarea
            className={fieldClass}
            id="message"
            name="message"
            rows={4}
            minLength={10}
            maxLength={500}
            placeholder="I would like to know when this fictional home is available."
            required
          />
        </div>

        {status === "error" ? (
          <p className="rounded-lg bg-red-50 p-3 font-bold text-red-800" role="alert">
            {responseMessage}
          </p>
        ) : null}

        <button className={`${buttonClass} justify-self-start disabled:cursor-wait disabled:bg-violet-400`} type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending to server..." : "Send practice inquiry"}
        </button>
      </form>
    </section>
  );
}
