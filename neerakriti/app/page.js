// app/page.js
// This is a Server Component — it runs on the server.
// No hooks, no 'use client' — we can import data directly.

import mockProducts from '../lib/mockProducts'
import ProductCard from './components/ProductCard'
import Link from 'next/link'

async function getNewArrivals() {
  try {
    const res = await fetch("http://localhost:8000/products/new", { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return []; // if the API is down, show empty section instead of crashing
  }
}

async function getBestSellers() {
  try {
    const res = await fetch("http://localhost:8000/products/best-sellers", { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}
export default async function HomePage() {

  // Derive "Newly Added" — sort all products by createdAt, take the 4 most recent
  const newlyAdded = [...mockProducts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4)

  const newArrivals = await getNewArrivals();
  const bestSellers = await getBestSellers();

  return (
    <div>

      {/* ── 1. HERO ────────────────────────────────────── */}
      <section
        className="px-6 md:px-16 py-20 flex flex-col items-center text-center"
        style={{ backgroundColor: 'var(--bg)' }}
      >
        {/* Hero image placeholder — replace with real product photo in Phase 4 */}
        <div
          className="w-full max-w-3xl aspect-video rounded-2xl mb-10 flex items-center justify-center"
          style={{ backgroundColor: 'var(--card-bg)', border: '2px dashed var(--border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--ink)', opacity: 0.4 }}>
            Hero image — real product photo goes here
          </p>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: 'var(--ink)' }}>
          Handmade Dot Mandala Art
        </h1>
        <p className="text-lg mb-8 max-w-lg" style={{ color: 'var(--ink)', opacity: 0.75 }}>
          Every piece hand-painted, one dot at a time.
        </p>
 <Link
  href="/products"
  style={{
    backgroundColor: 'var(--ink)',
    color: 'var(--bg)',
    padding: '0.75rem 2rem',
    borderRadius: '999px',
    fontWeight: '600',
    textDecoration: 'none',
    display: 'inline-block',  // critical — without this, padding doesn't apply correctly on <a> tags
    transition: 'opacity 0.2s',
  }}
>
  Shop the Collection
</Link>
      </section>

      {/* ── 2. TRUST SIGNAL ────────────────────────────── */}
      <div className="py-3 text-center" style={{ backgroundColor: 'var(--accent)' }}>
        <p className="text-sm italic" style={{ color: 'white' }}>
          Hand-painted, one dot at a time — by one artist, start to finish.
        </p>
      </div>

      {/* ── 3. NEWLY ADDED ─────────────────────────────── */}
      <section className="px-6 md:px-16 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold" style={{ color: 'var(--ink)' }}>
            Newly Added
          </h2>
          <Link href="/products" className="text-sm underline" style={{ color: 'var(--accent)' }}>
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {newlyAdded.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* ── 4. BEST SELLERS ────────────────────────────── */}
      <section
        className="px-6 md:px-16 py-14"
        style={{ backgroundColor: 'var(--card-bg)' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold" style={{ color: 'var(--ink)' }}>
            Best Sellers
          </h2>
          <Link href="/products?tag=Best+Seller" className="text-sm underline" style={{ color: 'var(--accent)' }}>
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── 5. SEASONAL BANNER ─────────────────────────── */}
      <section
        className="px-6 md:px-16 py-20 text-center"
        style={{ backgroundColor: 'var(--rose)' }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'white' }}>
          Diwali &amp; Wedding Collections
        </h2>
        <p className="mb-8 max-w-md mx-auto" style={{ color: 'white', opacity: 0.9 }}>
          Curated gift hampers and personalised pieces for every celebration.
        </p>
        <Link
          href="/products?tag=Diwali"
          className="px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
          style={{ backgroundColor: 'white', color: 'var(--rose)' }}
        >
          Shop Festive Gifts
        </Link>
      </section>

      {/* ── 6. MEET THE MAKER ──────────────────────────── */}
      <section className="px-6 md:px-16 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-5" style={{ color: 'var(--ink)' }}>
            Meet the Maker
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--ink)', opacity: 0.85 }}>
            Every Neerakriti piece is made by one person — a CS teacher who picks up her
            dotting tools in the evenings and transforms a blank surface into something that
            takes your breath away. No outsourcing. No shortcuts. Just one pair of hands,
            one dot at a time.
          </p>
          <Link
            href="/about"
            className="font-semibold underline"
            style={{ color: 'var(--accent)' }}
          >
            Read the full story →
          </Link>
        </div>

        {/* Maker photo placeholder — replace with real photo in Phase 4 */}
        <div
          className="flex-1 max-w-sm w-full aspect-square rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: 'var(--card-bg)', border: '2px dashed var(--border)' }}
        >
          <p className="text-sm text-center px-8" style={{ color: 'var(--ink)', opacity: 0.4 }}>
            Maker photo goes here
          </p>
        </div>
      </section>

      {/* ── 7. INSTAGRAM PLACEHOLDER ───────────────────── */}
      <section
        className="px-6 md:px-16 py-14"
        style={{ backgroundColor: 'var(--card-bg)' }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--ink)' }}>
          Follow Along on Instagram
        </h2>
        {/* 6 placeholder squares — real embed comes in Phase 4 */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-lg flex items-center justify-center text-xs"
              style={{ backgroundColor: 'var(--border)', color: 'var(--ink)', opacity: 0.5 }}
            >
              Post {i + 1}
            </div>
          ))}
        </div>
        <p className="text-center mt-4 text-xs" style={{ color: 'var(--ink)', opacity: 0.5 }}>
          Instagram embed — Phase 4
        </p>
      </section>

      {/* ── 8. NOTIFY ME ───────────────────────────────── */}
      {/* This becomes <NotifyForm /> (a Client Component) in Phase 4.
          For now it's static markup — no event handlers needed yet. */}
      <section className="px-6 md:px-16 py-16 text-center">
        <h2 className="text-3xl font-bold mb-3" style={{ color: 'var(--ink)' }}>
          Never Miss a New Piece
        </h2>
        <p className="mb-8" style={{ color: 'var(--ink)', opacity: 0.75 }}>
          Get notified when something new joins the collection.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <input
            type="email"
            placeholder="your@email.com"
            className="px-4 py-3 rounded-lg text-sm w-64 outline-none"
            style={{
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--border)',
              color: 'var(--ink)',
            }}
          />
          <button
            className="px-6 py-3 rounded-lg font-semibold text-sm hover:opacity-80 transition-opacity"
            style={{ backgroundColor: 'var(--ink)', color: 'var(--bg)' }}
          >
            Notify Me
          </button>
        </div>
        <p className="text-xs mt-3" style={{ color: 'var(--ink)', opacity: 0.45 }}>
          Form functionality wired up in Phase 4
        </p>
      </section>

    </div>
  )
}