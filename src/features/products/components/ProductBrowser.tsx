"use client";

import { useState } from "react";
import { Product } from "../types";
import { searchProducts } from "../utils";
import { ProductCard } from "./ProductCard";
import { SearchBar } from "./SearchBar";

interface ProductBrowserProps {
  products: Product[];
}

// Shows the search field and the products that match it
export function ProductBrowser({ products }: ProductBrowserProps) {
  const [query, setQuery] = useState("");

  // Products that match the search, updated whenever the text changes
  const visibleProducts = searchProducts(products, query);

  return (
    <div>
      <SearchBar value={query} onChange={setQuery} />

      {/* Show a message if nothing matches, otherwise the grid */}
      {visibleProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
