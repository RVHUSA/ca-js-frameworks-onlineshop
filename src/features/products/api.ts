import { Product, ProductsResponse, ProductResponse } from "./types";

const API_BASE_URL = "https://v2.api.noroff.dev/online-shop";

// Fetch all products
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(API_BASE_URL, { next: { revalidate: 3600 } });

  // Throw if the API responds with an error status
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  const json: ProductsResponse = await res.json();
  return json.data;
}

// Fetch a single product by id, or null if it does not exist
export async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    next: { revalidate: 3600 },
  });

  // Invalid or unknown id: return null so the page can show a 404
  if (res.status === 400 || res.status === 404) return null;

  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.status}`);
  }

  const json: ProductResponse = await res.json();
  return json.data;
}
