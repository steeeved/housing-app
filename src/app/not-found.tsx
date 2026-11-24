import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-10">
      <h1 className="text-3xl font-bold text-zinc-900">We could not find that page</h1>
      <p className="mt-2 text-zinc-700">The address may be wrong, or the page may belong to someone else.</p>
      <p className="mt-4">
        <Link className="font-bold text-violet-800 underline" href="/">Back to the home page</Link>
      </p>
    </main>
  );
}
