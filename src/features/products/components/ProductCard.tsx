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
    <Link href={`/product/${product.id}`}>
      {/* Discount only shown when the product is on sale */}
      {onSale && <span>-{getDiscountPercent(product)}%</span>}

      {/* Show a fallback text if the product has no image */}
      {product.image?.url ? (
        <Image
          src={product.image.url}
          alt={product.image.alt || product.title}
          width={300}
          height={300}
        />
      ) : (
        <p>No image</p>
      )}

      <h2>{product.title}</h2>
      <p>Rating: {product.rating}/5</p>

      {/* Current price, with the original price crossed out if discounted */}
      <p>
        {formatPrice(product.discountedPrice)}
        {onSale && <del>{formatPrice(product.price)}</del>}
      </p>
    </Link>
  );
}
