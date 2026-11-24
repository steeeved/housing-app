// Chapter 13 launch check.
// Point it at any Nyumba address and it asks the same questions a stranger's browser would.
// Usage: bun run launch:check https://your-project.example
// It reads nothing secret, sends no sign-in, and changes nothing on the site.

// An empty export makes this file a module, so it can use await at the top level.
export {};

const base = (process.argv[2] ?? "").replace(/\/+$/, "");

if (!/^https?:\/\//.test(base)) {
  console.error("Usage: bun run launch:check <address>, for example http://localhost:3000");
  process.exit(2);
}

const isLocal = /^http:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/.test(base);
const SLOW_MS = 2000;
const HEAVY_KB = 150;

type Row = { name: string; ok: boolean; required: boolean; note: string };
const rows: Row[] = [];

function record(name: string, ok: boolean, note: string, required = true) {
  rows.push({ name, ok, required, note });
}

async function get(path: string) {
  const started = performance.now();
  const res = await fetch(base + path, { redirect: "manual", signal: AbortSignal.timeout(15_000) });
  const body = await res.text();
  return {
    status: res.status,
    type: res.headers.get("content-type") ?? "",
    where: res.headers.get("location") ?? "",
    body,
    ms: Math.round(performance.now() - started),
    kb: Math.round((Buffer.byteLength(body) / 1024) * 10) / 10,
  };
}

async function attempt(name: string, work: () => Promise<void>) {
  try {
    await work();
  } catch {
    record(name, false, "no answer in 15 seconds, or the address could not be reached");
  }
}

record("address uses https", base.startsWith("https://") || isLocal, isLocal ? "local address, https not needed" : base.split("/")[2]);

await attempt("home page", async () => {
  const page = await get("/");
  record("home page answers 200", page.status === 200 && page.type.includes("text/html"), `status ${page.status}`);
  record("home page has a viewport tag", /<meta[^>]+name="viewport"/.test(page.body), "needed so phones do not shrink the page");
  record("home page declares a language", /<html[^>]+lang="/.test(page.body), "needed by screen readers");
  record("home page is light", page.kb <= HEAVY_KB, `${page.kb} KB of HTML`, false);
  record("home page answers quickly", page.ms <= SLOW_MS, `${page.ms} ms from this computer`, false);
});

await attempt("listings page", async () => {
  const page = await get("/listings");
  record("listings page answers 200", page.status === 200, `status ${page.status}`);
  // A streamed page can answer 200 and still fail to load its data, so look for the heading too.
  record("listings page shows the homes", page.body.includes("All homes"), "the heading is in the answer");
  record("listings page answers quickly", page.ms <= SLOW_MS, `${page.ms} ms from this computer`, false);
});

await attempt("missing page", async () => {
  const page = await get("/nothing-here");
  record("a missing address answers 404", page.status === 404, `status ${page.status}`);
});

await attempt("signed-out dashboard", async () => {
  const page = await get("/dashboard");
  // Next.js can answer a redirect two ways: a 3xx header, or a 200 whose streamed page carries the redirect.
  // Both send the visitor to sign in. What matters is that no agency content is in the answer.
  const headerRedirect = page.status >= 300 && page.status < 400 && /sign-in/.test(page.where);
  const streamedRedirect = page.status === 200 && page.body.includes("NEXT_REDIRECT;replace;/sign-in");
  record("signed-out dashboard sends the visitor to sign in", headerRedirect || streamedRedirect, `status ${page.status}`);
  record("signed-out dashboard shows no agency content", !/Nyumba Agency|Ziwa Property/.test(page.body), "agency names must not appear");
});

for (const path of ["/.env", "/.env.local"]) {
  await attempt(`${path} not served`, async () => {
    const page = await get(path);
    record(`${path} is not served`, page.status === 404, `status ${page.status}`);
  });
}

let failed = 0;
let warned = 0;
console.log(`Launch check for ${base}\n`);
for (const row of rows) {
  const mark = row.ok ? "PASS" : row.required ? "FAIL" : "WARN";
  if (mark === "FAIL") failed += 1;
  if (mark === "WARN") warned += 1;
  console.log(`${mark}  ${row.name}  (${row.note})`);
}
console.log(`\n${rows.length - failed - warned} passed, ${warned} to look at, ${failed} failed.`);
console.log("This script checks the doors from outside. It does not check phones, sign-in or who can see what.");
process.exit(failed > 0 ? 1 : 0);
