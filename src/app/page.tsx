import { getProducts } from "@/features/products/api";
import { ProductCard } from "@/features/products/components/ProductCard";

// Fetches products and shows them as cards
export default async function Home() {
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 font-heading text-3xl font-bold">OMNI</h1>

      {/* Handle an empty product list */}
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
