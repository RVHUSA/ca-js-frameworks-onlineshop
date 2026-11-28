import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/features/cart/CartContext";
import { ToastProvider } from "@/features/toast/ToastContext";

// Manrope for headings
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

// Inter for body text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OMNI. – Everything, in one place.",
  description: "A modern online store with a wide selection of products.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <CartProvider>
          <ToastProvider>
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
