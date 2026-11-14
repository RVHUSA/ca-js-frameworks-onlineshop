import Link from "next/link";

// Shown when notFound() is called or a route does not exist
export default function NotFound() {
  return (
    <main>
      <h1>Page not found</h1>
      <p>We could not find what you were looking for.</p>
      <Link href="/">Back to shop</Link>
    </main>
  );
}
