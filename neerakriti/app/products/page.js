// app/products/page.js
// -------------------
// This thin wrapper exists purely to satisfy Next.js 14's requirement
// that any component using useSearchParams() must be inside a <Suspense>.
// All the actual logic lives in ProductsClient.js

import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <main style={{ padding: "2rem" }}>
          <p style={{ color: "var(--ink)", opacity: 0.6 }}>
            Loading catalogue...
          </p>
        </main>
      }
    >
      <ProductsClient />
    </Suspense>
  );
}