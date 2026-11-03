import { getProducts } from "@/features/products/api";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">OMNI</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </main>
  );
}
