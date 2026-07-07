// app/products/page.js
// --------------------
// Catalogue page — shows all products, with optional filtering.
// This is a Server Component — data is fetched on the server before
// the HTML is sent to the browser.
//
// PHASE 3 CHANGES:
//   - URL changed from /products to /catalog/products (matches backend router prefix)
//   - product.id → product._id (MongoDB's field name)

import ProductCard from "@/app/components/ProductCard";

async function getProducts(category, tag) {
  // Build the query string dynamically based on what filters are active.
  // URLSearchParams is a built-in JS helper that handles encoding spaces
  // and special characters in URLs (e.g. "Wall Decor" → "Wall+Decor")
  const params = new URLSearchParams();
  if (category) params.append("category", category);
  if (tag) params.append("tag", tag);

  const query = params.toString() ? `?${params.toString()}` : "";

  const res = await fetch(`http://localhost:8000/catalog/products${query}`, {
    cache: "no-store", // always fetch fresh data, never show stale products
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function ProductsPage({ searchParams }) {
  // Next.js automatically provides searchParams from the URL.
  // e.g. /products?category=Wall+Decor → searchParams = { category: "Wall Decor" }
  //
  // In Next.js 15+, searchParams is a Promise that needs to be awaited.
  const resolvedParams = await searchParams;

  const products = await getProducts(
    resolvedParams?.category,
    resolvedParams?.tag,
  );

  return (
    <main style={{ padding: "2rem" }}>
      <h1
        className="text-3xl font-bold mb-2"
        style={{ color: "var(--ink)" }}
      >
        All Products
      </h1>
      <p style={{ marginBottom: "1.5rem", color: "var(--ink)", opacity: 0.6 }}>
        {products.length} {products.length === 1 ? "piece" : "pieces"} available
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "3rem", color: "var(--ink)" }}>
          No products found. Try a different filter.
        </p>
      )}
    </main>
  );
}