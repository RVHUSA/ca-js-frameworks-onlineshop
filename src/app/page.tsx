import { getProducts } from "@/features/products/api";
import { ProductBrowser } from "@/features/products/components/ProductBrowser";

// Fetches products and passes them to the search and grid
export default async function Home() {
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-6xl p-6">
      {/* Handle an empty product list */}
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ProductBrowser products={products} />
      )}
    </main>
  );
}
