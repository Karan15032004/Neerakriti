// app/products/[id]/page.js
// -------------------------
// Single product detail page — dynamic route.
// When someone visits /products/6a4ca63a6674ebcc0be7f700,
// Next.js passes "6a4ca63a6674ebcc0be7f700" as params.id.
//
// PHASE 3 CHANGES:
//   - URL changed from /products/ to /catalog/products/ (backend prefix)
//   - product.id → product._id in the WhatsApp/customize links
//   - WhatsApp links now use product._id (MongoDB's real ID)

// generateMetadata runs on the server and sets the <title> and meta description
// for each product page individually — this is how Next.js handles per-page SEO.
// Google sees "Seven Chakras Mandala Plate — Neerakriti" instead of a generic title.
import WallPreview from '../../components/WallPreview';
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const res = await fetch(
    `http://localhost:8000/catalog/products/${resolvedParams.id}`,
    { cache: "no-store" }
  );
  if (!res.ok) return { title: "Product not found — Neerakriti" };
  const product = await res.json();
  return {
    title: `${product.name} — Neerakriti`,
    description: product.description,
  };
}

async function getProduct(id) {
  const res = await fetch(`http://localhost:8000/catalog/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);

  if (!product) {
    return (
      <main style={{ padding: "2rem" }}>
        <h1 className="text-2xl font-bold" style={{ color: "var(--ink)" }}>
          Product not found
        </h1>
        <p style={{ color: "var(--ink)", opacity: 0.6 }}>
          This product may have been removed.
        </p>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      {/* ── Product Image ── */}
<div
  className="w-full aspect-square rounded-2xl mb-8 flex items-center justify-center"
  style={{
    backgroundColor: 'var(--card-bg)',
    border: '2px dashed var(--border)',
    maxWidth: '500px',
  }}
>
  {product.images && product.images.length > 0 ? (
    <img
      src={product.images[0]}
      alt={product.name}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '1rem',
      }}
    />
  ) : (
    <p className="text-sm" style={{ color: 'var(--ink)', opacity: 0.4 }}>
      Product image coming soon
    </p>
  )}
</div>
      {/* Product name */}
      <h1
        className="text-3xl font-bold mb-2"
        style={{ color: "var(--ink)" }}
      >
        {product.name}
      </h1>

      {/* Price */}
      <p
        className="text-2xl font-semibold mb-3"
        style={{ color: "var(--accent)" }}
      >
        ₹{product.price.toLocaleString("en-IN")}
      </p>

      {/* Category and size */}
      <p className="mb-3" style={{ color: "var(--ink)", opacity: 0.6 }}>
        {product.category}
        {product.size !== "N/A" ? ` · ${product.size}` : ""}
      </p>

      {/* Tags */}
      {product.tags.length > 0 && (
        <div
          className="flex flex-wrap mb-6"
          style={{ gap: "0.5rem" }}
        >
          {product.tags.map((tag) => (
            <span
              key={tag}
              style={{
                backgroundColor: "var(--rose)",
                color: "white",
                padding: "0.25rem 0.75rem",
                borderRadius: "999px",
                fontSize: "0.8rem",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      <p className="mb-6" style={{ lineHeight: 1.8, color: "var(--ink)" }}>
        {product.description}
      </p>

      {/* Care instructions */}
      <div
        className="mb-6"
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "1rem",
        }}
      >
        <strong style={{ color: "var(--ink)" }}>Care Instructions</strong>
        <p className="mt-2" style={{ color: "var(--ink)", opacity: 0.75 }}>
          {product.careInstructions}
        </p>
      </div>

      {/* Action buttons — WhatsApp inquiry + Customize */}
      <div className="flex flex-wrap" style={{ gap: "1rem" }}>
        {/* WhatsApp inquiry — shown on ALL products */}
       
       {/* WhatsApp inquiry — direct wa.me link, no backend call needed */}

  <a href={`https://wa.me/918787049939?text=${encodeURIComponent(
    `Hi! I'm interested in "${product.name}" priced at ₹${product.price}. Could you please share more details?`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  style={{
    display: "inline-block",
    background: "#25D366",
    color: "white",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: 600,
  }}
>
  Enquire via WhatsApp
</a>

{/* Customize button — only shown if product.isCustomizable is true */}
{product.isCustomizable && (
  
    <a href={`https://wa.me/918787049939?text=${encodeURIComponent(
      `Hi! I'd like to customise "${product.name}" (₹${product.price}). Could you please guide me through the customisation options?`
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: "inline-block",
      background: "var(--rose)",
      color: "white",
      padding: "0.75rem 1.5rem",
      borderRadius: "8px",
      textDecoration: "none",
      fontWeight: 600,
    }}
  >
    Customise This Design
  </a>
)}
      </div>
      {/* ── Wall Hanging Preview ── */}
      {product.images && product.images.length > 1 && (
        <WallPreview
          productImage={product.images[1]}
          productName={product.name}
        />
      )}
    </main>
  );
}