"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useCart } from "@/features/cart/CartContext";

// Navigation links, used in both the desktop and mobile menu
const NAV_LINKS = [
  { href: "/", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

// Header with logo, nav and cart icon
export function Header() {
  // Mobile menu = open
  const [open, setOpen] = useState(false);

  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-[#f5f1e8] shadow-sm">
      {/* Mobile: logo, icons and links in dropdown. Desktop: logo, links, cart */}
      <div className="mx-auto flex max-w-6xl items-center justify-between p-6 md:grid md:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="OMNI. home"
            width={120}
            height={40}
            priority
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop nav, hidden on small screens */}
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:opacity-60">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4 md:justify-self-end">
          {/* Cart icon with item count */}
          <Link
            href="/cart"
            aria-label={`Cart, ${totalItems} items`}
            className="relative hover:opacity-70"
          >
            <ShoppingCart size={24} aria-hidden="true" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-semibold text-white">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Hamburger button, only shown on small screens */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="cursor-pointer hover:opacity-70 md:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu, shown when the hamburger is open */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="border-t border-primary/10 md:hidden"
        >
          <ul className="flex flex-col gap-4 p-6 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                {/* Close the menu after choosing a page */}
                <Link href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
