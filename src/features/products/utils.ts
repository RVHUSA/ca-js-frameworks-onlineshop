import { Product } from "./types";

// Discount = true if the product is on sale
export function hasDiscount(product: Product): boolean {
  return product.discountedPrice < product.price;
}

// Discount as a whole percentage, 0 if no discount
export function getDiscountPercent(product: Product): number {
  if (!hasDiscount(product)) return 0;

  const difference = product.price - product.discountedPrice;
  return Math.round((difference / product.price) * 100);
}

// Format two decimals for the price
export function formatPrice(amount: number): string {
  return amount.toFixed(2);
}

// Filter products by title or tag
export function searchProducts(products: Product[], query: string): Product[] {
  const text = query.trim().toLowerCase();

  return products.filter(
    (product) =>
      product.title.toLowerCase().includes(text) ||
      product.tags?.some((tag) => tag.toLowerCase().includes(text))
  );
}

// The sorting options
export type SortOption =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "title-asc"
  | "title-desc"
  | "rating-desc";

// Choices shown in the sort menu
export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to high" },
  { value: "price-desc", label: "Price: High to low" },
  { value: "title-asc", label: "Name: A to Z" },
  { value: "title-desc", label: "Name: Z to A" },
  { value: "rating-desc", label: "Highest rated" },
];

// Sort a copy of the products and the original list does not change
export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.discountedPrice - b.discountedPrice);
    case "price-desc":
      return sorted.sort((a, b) => b.discountedPrice - a.discountedPrice);
    case "title-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case "rating-desc":
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
}
