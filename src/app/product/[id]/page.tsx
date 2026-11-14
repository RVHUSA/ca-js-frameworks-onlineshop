import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/features/products/api";
import {
  formatPrice,
  getDiscountPercent,
  hasDiscount,
} from "@/features/products/utils";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// Product details page, fetched by id
export default async function ProductPage({ params }: ProductPageProps) {
  // Get the product id from the URL
  const { id } = await params;
  const product = await getProduct(id);

  // Show not-found page if the product does not exist
  if (!product) notFound();

  const onSale = hasDiscount(product);

  return (
    <main>
      <Link href="/">← Back to shop</Link>

      {/* Discount only shown when the product is on sale */}
      {onSale && <span>-{getDiscountPercent(product)}%</span>}

      {/* Product image, or a fallback if the product has no image */}
      {product.image?.url ? (
        <Image
          src={product.image.url}
          alt={product.image.alt || product.title}
          width={400}
          height={400}
        />
      ) : (
        <p>No image</p>
      )}

      <h1>{product.title}</h1>
      <p>Rating: {product.rating}/5</p>

      {/* Current price, with the original price crossed out if discounted */}
      <p>
        {formatPrice(product.discountedPrice)}
        {onSale && <del>{formatPrice(product.price)}</del>}
      </p>

      <p>{product.description}</p>

      {/* Tags, only shown if the product has any */}
      {product.tags?.length > 0 && (
        <ul>
          {product.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}

      {/* Placeholder: Add to cart*/}
      <button type="button">Add to cart</button>

      {/* Reviews, with a message if there are none */}
      <section>
        <h2>Reviews</h2>
        {product.reviews?.length > 0 ? (
          <ul>
            {product.reviews.map((review) => (
              <li key={review.id}>
                <p>{review.username}</p>
                <p>Rating: {review.rating}/5</p>
                <p>{review.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </section>
    </main>
  );
}
