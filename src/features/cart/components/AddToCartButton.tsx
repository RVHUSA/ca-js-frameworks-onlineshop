"use client";

import { Product } from "@/features/products/types";
import { useToast } from "@/features/toast/ToastContext";
import { useCart } from "../CartContext";

interface AddToCartButtonProps {
  product: Product;
}

// Adds a product to the cart and shows a toast
export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const { showToast } = useToast();

  function handleClick() {
    addItem(product);
    showToast(`${product.title} added to cart`);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="mt-8 cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
    >
      Add to cart
    </button>
  );
}
