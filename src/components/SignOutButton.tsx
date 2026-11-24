"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  const [sending, setSending] = useState(false);

  async function signOut() {
    setSending(true);
    await authClient.signOut();
    router.push("/sign-in");
    router.refresh();
  }

  return (
    <button
      className="mt-5 rounded-lg bg-violet-700 px-4 py-2 font-bold text-white hover:bg-violet-800 disabled:cursor-wait disabled:bg-violet-400"
      type="button"
      onClick={signOut}
      disabled={sending}
    >
      {sending ? "Signing out..." : "Sign out"}
    </button>
  );
}
