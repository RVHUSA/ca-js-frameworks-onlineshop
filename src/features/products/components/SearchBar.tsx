"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "../types";
import { formatPrice, searchProducts } from "../utils";

interface SearchBarProps {
  products: Product[];
}

// Search field with a list of matching products under it
export function SearchBar({ products }: SearchBarProps) {
  const [query, setQuery] = useState("");

  // Products that match the search, updated whenever the text changes
  const results = searchProducts(products, query);
  const hasQuery = query.trim() !== "";

  return (
    <div role="search">
      <label htmlFor="product-search">Search products</label>
      <input
        id="product-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search for a product..."
      />

      {/* Results, only shown when the user has typed something */}
      {hasQuery && (
        <div>
          {results.length > 0 ? (
            <ul>
              {results.map((product) => (
                <li key={product.id}>
                  <Link href={`/product/${product.id}`}>{product.title}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
    </div>
  );
}
