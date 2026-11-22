"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { Product } from "@/features/products/types";
import { CartContextValue, CartItem } from "./types";

// Name used to save the cart in the browser's localStorage
const STORAGE_KEY = "omni-cart";

// Context that shares the cart with all components
const CartContext = createContext<CartContextValue | null>(null);

// Holds the cart state and makes it available to the whole app
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  // Prevents saving the empty starting cart over the stored one
  const [loaded, setLoaded] = useState(false);

  // Load a saved cart from the browser when the app starts
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {
      // If the saved cart can't be read, start with an empty cart
    }
    setLoaded(true);
  }, []);

  // Save the cart every time it changes
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, loaded]);

  // Add a product, or increase the quantity if it is already in the cart
  function addItem(product: Product) {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.discountedPrice,
          imageUrl: product.image?.url ?? "",
          imageAlt: product.image?.alt || product.title,
          quantity: 1,
        },
      ];
    });
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  // Set a new quantity, and remove the item if it drops below 1
  function updateQuantity(id: string, quantity: number) {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }

  // Empty the cart. useCallback keeps the function stable, so the success page can safely use it in useEffect
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Calculated from the items, so they are always up to date
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isLoaded: loaded,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook for reading the cart from any component
export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return context;
}
