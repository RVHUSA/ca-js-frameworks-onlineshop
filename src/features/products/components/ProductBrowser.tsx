"use client";

import { useState } from "react";
import { Product } from "../types";
import { SORT_OPTIONS, SortOption, sortProducts } from "../utils";
import { ProductCard } from "./ProductCard";
import { SearchBar } from "./SearchBar";

interface ProductBrowserProps {
  products: Product[];
}

// Shows the search field, the sort menu and the product grid
export function ProductBrowser({ products }: ProductBrowserProps) {
  // Start with the first sort option in the menu
  const [sort, setSort] = useState<SortOption>(SORT_OPTIONS[0].value);

  // Sort the products that are already fetched
  const sortedProducts = sortProducts(products, sort);

  return (
    <div>
      {/* Search on the left, sort menu on the right on larger screens */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-2">
        <SearchBar products={products} />

        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="sort">Sort by</label>
          <select
            id="sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
            className="cursor-pointer rounded-full bg-surface px-4 py-2 shadow-sm outline-none focus:ring-2 focus:ring-primary/20"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {sortedProducts.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
