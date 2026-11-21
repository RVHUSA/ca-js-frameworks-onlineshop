"use client";

import { useState } from "react";
import { Product } from "@/features/products/types";
import { useCart } from "../CartContext";

interface AddToCartButtonProps {
  product: Product;
}

// Adds a product to the cart and shows a short confirmation
export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(product);
    setAdded(true);
    // Reset the confirmation after a moment
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="mt-8 cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
    >
      {added ? "Added!" : "Add to cart"}
    </button>
  );
}
