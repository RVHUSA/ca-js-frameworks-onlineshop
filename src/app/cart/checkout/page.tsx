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
    <main>
      <div role="status">
        <CheckCircle size={48} aria-hidden="true" />
        <h1>Thank you for your order!</h1>
        <p>Your order has been placed and your cart is now empty.</p>
        <Link href="/">Continue shopping</Link>
      </div>
    </main>
  );
}
