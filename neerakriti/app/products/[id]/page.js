// app/products/[id]/page.js
// Single product detail page — dynamic route.

// generateMetadata runs on the server and sets the <title> and meta description
// for each product page individually — this is how Next.js handles per-page SEO.
export async function generateMetadata({ params }) {
  const res = await fetch(`http://localhost:8000/products/${params.id}`);
  if (!res.ok) return { title: "Product not found — Neerakriti" };
  const product = await res.json();
  return {
    title: `${product.name} — Neerakriti`,
    description: product.description,
  };
}

async function getProduct(id) {
  const res = await fetch(`http://localhost:8000/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetailPage({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>Product not found</h1>
        <p>This product may have been removed.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontFamily: "var(--font-display)", marginBottom: "0.5rem" }}>
        {product.name}
      </h1>

      <p style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>
        ₹{product.price.toLocaleString("en-IN")}
      </p>

      <p style={{ color: "var(--color-taupe)", marginBottom: "1rem" }}>
        {product.category}{product.size !== "N/A" ? ` · ${product.size}` : ""}
      </p>

      {product.tags.length > 0 && (
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          {product.tags.map((tag) => (
            <span key={tag} style={{
              background: "var(--color-sage)",
              color: "white",
              padding: "0.25rem 0.75rem",
              borderRadius: "999px",
              fontSize: "0.8rem",
            }}>
              {tag}
            </span>
          ))}
        </div>
      )}

      <p style={{ lineHeight: 1.8, marginBottom: "1.5rem" }}>
        {product.description}
      </p>

      <div style={{ borderTop: "1px solid #ddd", paddingTop: "1rem", marginBottom: "1.5rem" }}>
        <strong>Care Instructions</strong>
        <p style={{ marginTop: "0.5rem" }}>{product.careInstructions}</p>
      </div>

      {/* WhatsApp inquiry — shown on all products */}
      
        <a href={`http://localhost:8000/inquiry/whatsapp/${product.id}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          background: "#25D366",
          color: "white",
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          textDecoration: "none",
          marginRight: "1rem",
          fontWeight: 600,
        }}
      >
        Enquire via WhatsApp
      </a>

      {/* Customize button — only shown if product.isCustomizable is true */}
      {product.isCustomizable && (
        
          <a href={`http://localhost:8000/inquiry/customize/${product.id}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            background: "var(--color-rose)",
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
    </main>
  );
}