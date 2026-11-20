import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

// Header with logo, nav and cart icon
export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#f5f1e8] shadow-sm">
      {/* Three columns: logo left, links centered, cart right */}
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center p-6">
        {/* Logo, links back to the home page */}
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

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Cart icon, will add count later */}
        <Link
          href="/cart"
          aria-label="Cart"
          className="justify-self-end hover:opacity-70"
        >
          <ShoppingCart size={24} aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}
