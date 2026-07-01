// app/products/page.js
// Catalogue page — Server Component.
// Fetches from FastAPI instead of importing mockProducts.

import ProductCard from "@/app/components/ProductCard";

async function getProducts(category, tag, minPrice, maxPrice) {
  const params = new URLSearchParams();
  if (category) params.append("category", category);
  if (tag) params.append("tag", tag);
  if (minPrice) params.append("min_price", minPrice);
  if (maxPrice) params.append("max_price", maxPrice);

  const query = params.toString() ? `?${params.toString()}` : "";

  const res = await fetch(`http://localhost:8000/products${query}`, {
    cache: "no-store",  // always fetch fresh — never show stale products
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function ProductsPage({ searchParams }) {
  // searchParams automatically contains whatever is in the URL
  // e.g. /products?category=Wall Decor → { category: "Wall Decor" }
  const products = await getProducts(
    searchParams?.category,
    searchParams?.tag,
    searchParams?.min_price,
    searchParams?.max_price,
  );

  return (
    <main style={{ padding: "2rem" }}>
      <h1>All Products</h1>
      <p style={{ marginBottom: "1.5rem" }}>
        {products.length} {products.length === 1 ? "piece" : "pieces"} available
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "1.5rem",
      }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "3rem" }}>
          No products found. Try a different filter.
        </p>
      )}
    </main>
  );
}