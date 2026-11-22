"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/features/cart/CartContext";
import { formatPrice } from "@/features/products/utils";

// Cart page: lists the items, lets the user change quantities and shows the total
export default function CartPage() {
  const {
    items,
    isLoaded,
    totalItems,
    totalPrice,
    removeItem,
    updateQuantity,
  } = useCart();

  // Wait until the saved cart is loaded
  if (!isLoaded) {
    return <p className="mx-auto max-w-6xl p-6 text-muted">Loading cart...</p>;
  }

  // Empty cart
  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-6xl p-6">
        <div className="rounded-2xl bg-card p-8 text-center">
          <h1 className="font-heading text-2xl font-bold">Your cart</h1>
          <p className="mt-2 text-muted">Your cart is empty.</p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Back to shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 font-heading text-2xl font-bold">Your cart</h1>

      {/* Items on the left, order summary on the right on large screens */}
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_320px]">
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex gap-4 rounded-2xl bg-card p-4">
              {/* Product image, skipped if the product has none */}
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-surface">
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                )}
              </div>

              <div className="flex flex-1 flex-col justify-between gap-3">
                <div>
                  <Link
                    href={`/product/${item.id}`}
                    className="font-heading font-semibold hover:underline"
                  >
                    {item.title}
                  </Link>
                  <p className="text-sm text-muted">
                    {formatPrice(item.price)} each
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {/* Change the quantity (with + or -) and removes the item if it drops below 1 */}
                  <div className="inline-flex items-center rounded-full bg-surface">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label={`Decrease quantity of ${item.title}`}
                      className="h-8 w-8 cursor-pointer rounded-full hover:bg-background"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label={`Increase quantity of ${item.title}`}
                      className="h-8 w-8 cursor-pointer rounded-full hover:bg-background"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="cursor-pointer text-sm text-muted underline hover:text-primary"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <p className="font-semibold">
                {formatPrice(item.price * item.quantity)}
              </p>
            </li>
          ))}
        </ul>

        {/* Order summary */}
        <aside className="rounded-2xl bg-card p-6 lg:sticky lg:top-28">
          <h2 className="font-heading text-xl font-bold">Order summary</h2>

          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Items</dt>
              <dd>{totalItems}</dd>
            </div>
            <div className="flex justify-between border-t border-primary/15 pt-2 text-base font-bold">
              <dt>Total</dt>
              <dd>{formatPrice(totalPrice)}</dd>
            </div>
          </dl>

          {/* Goes to the success page, which clears the cart */}
          <Link
            href="/cart/checkout"
            className="mt-6 block rounded-lg bg-primary px-4 py-3 text-center font-semibold text-white transition hover:opacity-90"
          >
            Checkout
          </Link>
        </aside>
      </div>
    </main>
  );
}
