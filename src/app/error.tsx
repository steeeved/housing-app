"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-10">
      <h1 className="text-3xl font-bold text-zinc-900">Something went wrong</h1>
      <p className="mt-2 text-zinc-700">We could not show this page. Nothing you typed was lost on your computer. Try again in a moment.</p>
      <button
        className="mt-4 rounded-lg bg-violet-700 px-4 py-2 font-bold text-white hover:bg-violet-800 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-violet-700"
        type="button"
        onClick={() => reset()}
      >
        Try again
      </button>
    </main>
  );
}
