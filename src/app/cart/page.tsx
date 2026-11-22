"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/features/cart/CartContext";
import { formatPrice } from "@/features/products/utils";

// Cart page: lists the items, lets the user change quantities and shows the total
export default function CartPage() {
  const { items, isLoaded, totalPrice, removeItem, updateQuantity } = useCart();

  // Wait until the saved cart is loaded
  if (!isLoaded) return <p>Loading cart...</p>;

  // Empty cart
  if (items.length === 0) {
    return (
      <main>
        <h1>Your cart</h1>
        <p>Your cart is empty.</p>
        <Link href="/">Back to shop</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>Your cart</h1>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {/* Product image, skipped if the product has none */}
            {item.imageUrl && (
              <Image
                src={item.imageUrl}
                alt={item.imageAlt}
                width={80}
                height={80}
              />
            )}

            <Link href={`/product/${item.id}`}>{item.title}</Link>
            <p>Price: {formatPrice(item.price)}</p>

            {/* Removes the item if it drops below 1 */}
            <div>
              <button
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                aria-label={`Decrease quantity of ${item.title}`}
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                aria-label={`Increase quantity of ${item.title}`}
              >
                +
              </button>
            </div>

            <p>Subtotal: {formatPrice(item.price * item.quantity)}</p>

            <button type="button" onClick={() => removeItem(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <p>Total: {formatPrice(totalPrice)}</p>

      {/* Goes to success page, which clears the cart */}
      <Link href="/checkout/success">Checkout</Link>
    </main>
  );
}
