"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useCart } from "@/features/cart/CartContext";

// Checkout success page: confirms the order and clears the cart
export default function CheckoutSuccessPage() {
  const { isLoaded, clearCart } = useCart();

  // Clear the cart after the saved cart has loaded
  useEffect(() => {
    if (isLoaded) clearCart();
  }, [isLoaded, clearCart]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="rounded-2xl bg-card p-8 text-center" role="status">
        <CheckCircle
          size={48}
          className="mx-auto text-primary"
          aria-hidden="true"
        />
        <h1 className="mt-4 font-heading text-2xl font-bold">
          Thank you for your order!
        </h1>
        <p className="mt-2 text-muted">
          Your order has been placed and your cart is now empty.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Continue shopping
        </Link>
      </div>
    </main>
  );
}
