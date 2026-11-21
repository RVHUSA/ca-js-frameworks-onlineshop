import { Product } from "@/features/products/types";

// One line in the cart: the product info needed to show it, and how many the user wants
export interface CartItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  imageAlt: string;
  quantity: number;
}

// Describes what useCart() returns: cart items, totals and functions to update them
export interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}
