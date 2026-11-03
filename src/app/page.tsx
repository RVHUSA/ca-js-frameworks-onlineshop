import { getProducts } from "@/features/products/api";

export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      <h1>OMNI</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </main>
  );
}
