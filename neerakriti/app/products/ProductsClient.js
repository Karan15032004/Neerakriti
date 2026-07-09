
// --------------------
// Catalogue page with search, category filter, and sorting.
//
// This is a CLIENT Component ('use client') because it needs interactive state:
//   - A search box the user types into
//   - Category filter buttons the user clicks
//   - A sort dropdown the user selects from
//
// HOW IT WORKS:
//   1. On first load, it fetches ALL products from the backend
//   2. When the user types/clicks/selects, it fetches again with filters
//   3. The backend does the actual filtering (MongoDB queries),
//      not the browser — this scales better with more products

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // ← NEW: reads ?search=... from the URL
import ProductCard from "@/app/components/ProductCard";

export default function ProductsPage() {

  const searchParams = useSearchParams();  // ← NEW: grabs the full URL query string object
  // e.g. if URL is /products?search=jharokha, searchParams.get('search') = "jharokha"

  // ---- State variables ----
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(searchParams.get("search") || ""); // ← NEW: pre-fill from URL
  // 👆 If user came from navbar search, their term is already in the URL.
  // searchParams.get("search") reads it. If nothing was searched, falls back to "".
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  // ---- Fetch products from the backend ----
  // Runs every time search, category, or sortBy changes.
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      // Build the query string based on which filters are active
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (category) params.append("category", category);
      if (sortBy) params.append("sort_by", sortBy);

      const query = params.toString() ? `?${params.toString()}` : "";

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/catalog/products${query}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }

      setLoading(false);
    }

    // Debounce — wait 300ms after user stops typing before fetching.
    // Prevents a separate API call for every single keystroke.
    const timer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timer); // cancel previous timer if user types again
  }, [search, category, sortBy]);

  // ---- Fetch categories from the backend ----
  // Runs once on page load. Pulls real categories from MongoDB.
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/catalog/categories`);
        if (res.ok) {
          const data = await res.json();
          setCategories(data.categories || []);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    }
    fetchCategories();
  }, []);

  return (
    <main style={{ padding: "2rem" }}>

      {/* ── Page title ─────────────────────────────────── */}
      <h1
        className="text-3xl font-bold mb-6"
        style={{ color: "var(--ink)" }}
      >
        All Products
      </h1>

      {/* ── Filter controls ────────────────────────────── */}
      <div
        className="mb-8"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {/* Row 1: Search bar + Sort dropdown */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>

          {/* Search input — value comes from state, which was pre-filled from URL */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-sm outline-none"
            style={{
              flex: "1",
              minWidth: "200px",
              padding: "0.75rem 1rem",
              borderRadius: "8px",
              backgroundColor: "var(--card-bg)",
              border: "1px solid var(--border)",
              color: "var(--ink)",
            }}
          />

          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm"
            style={{
              padding: "0.75rem 1rem",
              borderRadius: "8px",
              backgroundColor: "var(--card-bg)",
              border: "1px solid var(--border)",
              color: "var(--ink)",
              cursor: "pointer",
            }}
          >
            <option value="">Sort by</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        {/* Row 2: Category filter buttons */}
        <div className="flex flex-wrap" style={{ gap: "0.5rem" }}>

          {/* "All" button — clears the category filter */}
          <button
            onClick={() => setCategory("")}
            className="text-sm font-medium"
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "999px",
              border: "1px solid var(--border)",
              backgroundColor: category === "" ? "var(--ink)" : "var(--card-bg)",
              color: category === "" ? "var(--bg)" : "var(--ink)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            All
          </button>

          {/* One button per category — dynamically fetched from MongoDB */}
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="text-sm font-medium"
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "999px",
                border: "1px solid var(--border)",
                backgroundColor: category === cat ? "var(--ink)" : "var(--card-bg)",
                color: category === cat ? "var(--bg)" : "var(--ink)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Results count ──────────────────────────────── */}
      <p
        className="mb-4 text-sm"
        style={{ color: "var(--ink)", opacity: 0.6 }}
      >
        {loading
          ? "Loading..."
          : `${products.length} ${products.length === 1 ? "piece" : "pieces"} found`}
      </p>

      {/* ── Show what was searched (if user came from navbar) ── */}
      {search && !loading && (
        <p
          className="mb-4 text-sm"
          style={{ color: "var(--ink)", opacity: 0.55 }}
        >
          Showing results for: <strong>"{search}"</strong>
        </p>
      )}

      {/* ── Product grid ───────────────────────────────── */}
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

      {/* ── Empty state ────────────────────────────────── */}
      {!loading && products.length === 0 && (
        <div className="text-center" style={{ marginTop: "3rem" }}>
          <p
            className="text-lg mb-2"
            style={{ color: "var(--ink)", opacity: 0.5 }}
          >
            No products found
          </p>
          <p
            className="text-sm"
            style={{ color: "var(--ink)", opacity: 0.4 }}
          >
            Try a different search term or clear the filters.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setCategory("");
              setSortBy("");
            }}
            className="text-sm font-medium mt-4"
            style={{
              padding: "0.5rem 1.5rem",
              borderRadius: "999px",
              backgroundColor: "var(--ink)",
              color: "var(--bg)",
              border: "none",
              cursor: "pointer",
            }}
          >
            Clear all filters
          </button>
        </div>
      )}

    </main>
  );
}