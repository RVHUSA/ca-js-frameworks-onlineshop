import Image from "next/image";
import Link from "next/link";
import { Product } from "../types";
import { formatPrice, getDiscountPercent, hasDiscount } from "../utils";

interface ProductCardProps {
  product: Product;
}

// Displays one product - image, title, rating, price and discount
export function ProductCard({ product }: ProductCardProps) {
  const onSale = hasDiscount(product);

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block rounded-2xl bg-card p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Image is inside the card */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-surface">
        {/* Discount only shown when the product is on sale + discount styling */}
        {onSale && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow">
            -{getDiscountPercent(product)}%
          </span>
        )}

        {/* Product image, or a fallback if the product has no image */}
        {product.image?.url ? (
          <Image
            src={product.image.url}
            alt={product.image.alt || product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted">
            No image
          </div>
        )}
      </div>

      <div className="px-2 pb-2 pt-4">
        <h2 className="font-heading font-semibold leading-snug">
          {product.title}
        </h2>
        <p className="mt-1 text-sm text-muted">★ {product.rating}/5</p>

        {/* Current price, with the original price crossed out if discounted */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold">
            {formatPrice(product.discountedPrice)}
          </span>
          {onSale && (
            <span className="text-sm text-muted line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
