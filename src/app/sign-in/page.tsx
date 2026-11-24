import Link from "next/link";

import { SignInForm } from "@/components/SignInForm";

export default function SignInPage() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 items-center px-5 py-10">
      <section className="w-full rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-200" aria-labelledby="sign-in-heading">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-700">Chapter 9</p>
        <h1 id="sign-in-heading" className="mt-2 text-3xl font-bold text-zinc-900">Fictional agent sign-in</h1>
        <p className="mt-2 text-zinc-700">Use only the invented class account. Do not use your personal email or password.</p>
        <SignInForm />
        <Link className="mt-6 inline-block font-bold text-violet-700 underline" href="/">Back to the home page</Link>
      </section>
    </main>
  );
}
