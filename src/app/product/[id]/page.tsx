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
    <main className="mx-auto max-w-6xl p-6">
      <Link href="/" className="text-sm text-muted hover:underline">
        ← Back to shop
      </Link>

      {/* Image and info side by side on large screens, stacked on small */}
      <div className="mt-6 grid gap-10 md:grid-cols-[auto_1fr]">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-surface md:w-96">
          {/* Discount only shown when the product is on sale */}
          {onSale && (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-primary px-3 py-1 text-sm font-semibold text-white shadow">
              -{getDiscountPercent(product)}%
            </span>
          )}

          {/* Product image, or a fallback if the product has no image */}
          {product.image?.url ? (
            <Image
              src={product.image.url}
              alt={product.image.alt || product.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 384px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted">
              No image
            </div>
          )}
        </div>

        {/* Info card */}
        <div className="py-6 md:pl-0">
          <h1 className="font-heading text-3xl font-bold">{product.title}</h1>
          <p className="mt-2 text-muted">Rating: {product.rating}/5</p>

          {/* Current price, with the original price crossed out if discounted */}
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold">
              {formatPrice(product.discountedPrice)}
            </span>
            {onSale && (
              <span className="text-lg text-muted line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <p className="mt-6 leading-relaxed">{product.description}</p>

          {/* Tags, only shown if the product has any */}
          {product.tags?.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-primary/30 px-3 py-1 text-sm"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          {/* Placeholder: Add to cart*/}
          <button
            type="button"
            className="mt-8 cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Add to cart
          </button>
        </div>
      </div>

      {/* Reviews, with a message if there are none */}
      <section className="mt-12">
        <h2 className="font-heading text-2xl font-bold">Reviews</h2>
        {product.reviews?.length > 0 ? (
          <ul className="mt-4 divide-y divide-primary/15 rounded-2xl bg-card px-6">
            {product.reviews.map((review) => (
              <li key={review.id} className="py-5">
                <p className="font-semibold">{review.username}</p>
                <p className="text-sm text-muted">Rating: {review.rating}/5</p>
                <p className="mt-2">{review.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-muted">No reviews yet.</p>
        )}
      </section>
    </main>
  );
}
