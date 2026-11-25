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
