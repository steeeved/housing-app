"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

const fieldClass = "mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900";
const buttonClass = "rounded-lg bg-violet-700 px-4 py-2 font-bold text-white hover:bg-violet-800 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-violet-700 disabled:cursor-wait disabled:bg-violet-400";

export function SignInForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [message, setMessage] = useState("");

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    const { error } = await authClient.signIn.email({ email, password });

    if (error) {
      setStatus("error");
      setMessage("Sign-in failed. Check the fictional class credentials and try again.");
      return;
    }

    router.push("/agent");
    router.refresh();
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={signIn}>
      <div>
        <label className="font-bold text-zinc-800" htmlFor="email">Fictional agent email</label>
        <input className={fieldClass} id="email" name="email" type="email" autoComplete="username" required />
      </div>
      <div>
        <label className="font-bold text-zinc-800" htmlFor="password">Fictional class password</label>
        <input className={fieldClass} id="password" name="password" type="password" autoComplete="current-password" required />
      </div>
      {status === "error" ? (
        <p className="rounded-lg bg-red-50 p-3 font-bold text-red-800" role="alert">{message}</p>
      ) : null}
      <button className={`${buttonClass} justify-self-start`} type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Checking identity..." : "Sign in"}
      </button>
    </form>
  );
}
