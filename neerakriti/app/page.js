// app/page.js
// -----------
// Homepage — a Server Component (runs on the server, not in the browser).
// 
// WHAT CHANGED IN PHASE 3:
//   - Removed "import mockProducts" — we don't read from the local file anymore
//   - All data now comes from the FastAPI backend via fetch()
//   - URLs updated to match the actual catalog.py routes
//   - All product.id changed to product._id (MongoDB's field name)
import NotifyForm from './components/NotifyForm'
import FeedbackForm from './components/FeedbackForm'
import ProductCard from './components/ProductCard'
import Link from 'next/link'
import InstagramEmbed from './components/InstagramEmbed'


// ---- Data fetching functions ----
// These run on the server before the page HTML is built.
// Each one calls a different backend endpoint.
// { cache: "no-store" } means "always get fresh data, don't cache"
// The try/catch means if the backend is down, we show an empty section
// instead of crashing the whole page.

async function getNewlyAdded() {
  try {
    const res = await fetch("http://localhost:8000/catalog/products/newly-added?limit=4", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function getBestSellers() {
  try {
    const res = await fetch("http://localhost:8000/catalog/products/tag/Best Seller", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}


export default async function HomePage() {
  // Fetch data from the backend — these run in parallel on the server
  const newlyAdded = await getNewlyAdded();
  const bestSellers = await getBestSellers();

  return (
    <div>

      {/* ── 1. HERO ────────────────────────────────────── */}
      <section
        className="px-6 md:px-16 py-20 flex flex-col items-center text-center"
        style={{ backgroundColor: 'var(--bg)' }}
      >
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
            display: 'inline-block',
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
            <ProductCard key={product._id} product={product} />
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
   {/* ── 7. INSTAGRAM FEED ──────────────────────────── */}
      <section
        className="px-6 md:px-16 py-14"
        style={{ backgroundColor: 'var(--card-bg)' }}
      >
        <InstagramEmbed />
      </section>

      {/* ── 8. NOTIFY ME ───────────────────────────────── */}
      {/* ── 8. NOTIFY ME SIGNUP ── */}
      <section
        style={{
          padding: '4rem 2rem',
          backgroundColor: 'var(--color-cream)',
        }}
      >
        <NotifyForm />
      </section>
        {/* ── 9. FEEDBACK FORM ── */}
      <section
        style={{
          padding: '4rem 2rem',
          backgroundColor: 'var(--color-cream)',
          borderTop: '1px solid var(--color-rose)',
        }}
      >
        <FeedbackForm />
      </section>
    </div>
  )
}