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
  const [sort, setSort] = useState<SortOption>("relevance");

  // Sort the products that are already fetched
  const sortedProducts = sortProducts(products, sort);

  return (
    <div>
      <SearchBar products={products} />

      <div>
        <label htmlFor="sort">Sort by</label>
        <select
          id="sort"
          value={sort}
          onChange={(event) => setSort(event.target.value as SortOption)}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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
