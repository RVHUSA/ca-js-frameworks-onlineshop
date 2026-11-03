import { Product, ProductsResponse, ProductResponse } from "./types";

const API_BASE_URL = "https://v2.api.noroff.dev/online-shop";

// Fetch all products
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(API_BASE_URL);

  // Throw if the API responds with an error status
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  const json: ProductsResponse = await res.json();
  return json.data;
}

// Fetch a single product by id
export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.status}`);
  }

  const json: ProductResponse = await res.json();
  return json.data;
}
