import { getProducts } from "@/features/products/api";
import { ProductCard } from "@/features/products/components/ProductCard";

// Fetches products and shows them as cards
export default async function Home() {
  const products = await getProducts();

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">OMNI</h1>

      {/* Handle an empty product list */}
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
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
