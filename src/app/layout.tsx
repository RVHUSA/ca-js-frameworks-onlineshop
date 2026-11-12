import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

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
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
