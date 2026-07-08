// app/components/ProductCard.js
// -----------------------------
// Reusable product card used on the homepage and catalogue page.
// Renders one product as a clickable card with image, name, price, and tags.
//
// PHASE 3 CHANGES:
//   - product.id → product._id everywhere (MongoDB's field name)
//   - The Link href now uses product._id to build the URL

import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    // Clicking the card takes you to /products/6a4ca63a... (the real MongoDB _id)
    <Link
      href={`/products/${product._id}`}
      style={{ textDecoration: "none", height: "100%", display: "block" }}
    >
      <div
        className="rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
        style={{
          backgroundColor: "var(--card-bg)",
          border: "1px solid var(--border)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Image area */}
        <div
          className="aspect-square flex items-center justify-center  overflow-hidden"
          style={{ backgroundColor: "var(--border)" }}
        >
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span
              className="text-xs text-center px-4"
              style={{ color: "var(--ink)", opacity: 0.4 }}
            >
              📷 Image coming soon
            </span>
          )}
        </div>

        {/* Info area */}
        <div
          style={{
            padding: "1.25rem",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Product name */}
          <h2
            className="font-semibold text-sm leading-snug mb-2"
            style={{ color: "var(--ink)" }}
          >
            {product.name}
          </h2>

          {/* Category + size */}
          <p
            className="text-xs mb-3"
            style={{ color: "var(--ink)", opacity: 0.6 }}
          >
            {product.category}
            {product.size && product.size !== "N/A" ? ` · ${product.size}` : ""}
          </p>

          {/* Price */}
          <p
            className="font-bold text-base mb-3"
            style={{ color: "var(--accent)" }}
          >
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap" style={{ gap: "0.5rem" }}>
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    backgroundColor: "var(--rose)",
                    color: "white",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    whiteSpace: "nowrap",
                    display: "inline-block",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Customizable badge */}
          {product.isCustomizable && (
            <p
              className="text-xs mt-2 font-bold"
              style={{ color: "var(--accent)" }}
            >
              ✏️ Customizable
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}