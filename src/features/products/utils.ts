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
