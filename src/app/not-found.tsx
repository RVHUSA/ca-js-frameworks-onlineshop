import Link from "next/link";

// Shown when notFound() is called or a route does not exist
export default function NotFound() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="rounded-2xl bg-card p-8 text-center">
        <h1 className="font-heading text-3xl font-bold">Page not found</h1>
        <p className="mt-2 text-muted">
          We could not find what you were looking for.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-primary px-4 py-2 text-white transition hover:opacity-90"
        >
          Back to shop
        </Link>
      </div>
    </main>
  );
}
