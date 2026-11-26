"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
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
    <div role="search" className="relative w-full max-w-lg mt-2">
      {/* Label is hidden visually, but read by screen readers */}
      <label htmlFor="product-search" className="sr-only">
        Search products
      </label>

      <Search
        size={18}
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
      />

      <input
        id="product-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search for a product..."
        className="w-full rounded-full bg-surface py-3 pl-11 pr-4 text-sm shadow-sm outline-none transition placeholder:text-muted focus:shadow-md focus:ring-2 focus:ring-primary/20"
      />

      {/* Results, only shown when the user has typed something */}
      {hasQuery && (
        <div className="absolute z-20 mt-2 max-h-80 w-full overflow-y-auto rounded-2xl bg-surface p-2 shadow-lg">
          {results.length > 0 ? (
            <ul>
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/product/${product.id}`}
                    className="flex items-center justify-between gap-4 rounded-xl px-3 py-2 text-sm hover:bg-card"
                  >
                    <span>{product.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3 py-2 text-sm text-muted">No products found.</p>
          )}
        </div>
      )}
    </div>
  );
}
