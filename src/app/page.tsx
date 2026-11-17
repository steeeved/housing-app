const featuredHomes = [
  { title: "Bedsitter", area: "Kenol, Murang'a", rent: 4500 },
  { title: "One bedroom", area: "Kiganjo, Nyeri", rent: 9000 },
  { title: "Two bedrooms", area: "Milimani, Kisumu", rent: 18000 },
];

export default function Home() {
  return (
    <>
      <header className="bg-violet-700 px-5 py-12 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">
            Fictional listings for learning
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Nyumba</h1>
          <p className="mt-2 text-lg text-violet-100">Find a place to call home.</p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-10">
        <h2 className="text-2xl font-bold text-zinc-900">Featured homes</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredHomes.map((home) => (
            <article key={home.title} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
              <h3 className="text-lg font-bold text-zinc-900">{home.title}</h3>
              <p className="mt-1 text-zinc-600">{home.area}</p>
              <p className="mt-4 font-bold text-violet-700">
                KES {home.rent.toLocaleString("en-KE")} / month
              </p>
            </article>
          ))}
        </div>
      </main>

      <footer className="px-5 py-6 text-center text-sm text-zinc-600">
        Sample data only. Every listing on this page is fictional.
      </footer>
    </>
  );
}
