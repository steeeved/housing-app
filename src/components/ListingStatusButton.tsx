"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  listingId: string;
  currentStatus: "available" | "let";
};

export function ListingStatusButton({ listingId, currentStatus }: Props) {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const nextStatus = currentStatus === "available" ? "let" : "available";

  async function updateStatus() {
    setSending(true);
    setMessage("");

    try {
      const response = await fetch(`/api/listings/${listingId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!response.ok) {
        setMessage("The server did not allow that change.");
        return;
      }

      router.refresh();
    } catch {
      setMessage("The server could not be reached. Try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mt-4">
      <button
        className="rounded-lg bg-violet-700 px-4 py-2 font-bold text-white hover:bg-violet-800 disabled:cursor-wait disabled:bg-violet-400"
        type="button"
        onClick={updateStatus}
        disabled={sending}
      >
        {sending ? "Checking permission..." : `Mark ${nextStatus}`}
      </button>
      <span className="ml-3 text-sm font-bold text-red-700" aria-live="polite">{message}</span>
    </div>
  );
}
