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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/catalog/products/newly-added?limit=4`, {
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/catalog/products/tag/Best%20Seller`, {
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
        <img
          src="/images/hero.jpeg"
          alt="Neerakriti — Handmade Dot Mandala Art"
          className="w-half max-w-4xl rounded-2xl mb-10"
          style={{ objectFit: 'cover', maxHeight: '450px', width: '100%' }}
        />

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
            borderRadius: '4px',
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
      <div className="py-5 text-center" style={{ backgroundColor: 'var(--accent)' }}>
        <p className="text-sm italic" style={{ color: 'white' }}>
          Hand-painted, one dot at a time — by one artist, start to finish.
        </p>
      </div>

      {/* ── 3. NEWLY ADDED ─────────────────────────────── */}
      <section className="px-6 md:px-16 py-14">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold" style={{ color: 'var(--ink)' }}>
            Newly Added
          </h1>
          <Link href="/products" className="text-sm underline" style={{ color: 'var(--accent)',textDecoration: 'none' }}>
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
          <h1 className="text-3xl font-bold" style={{ color: 'var(--ink)' }}>
            Best Sellers
          </h1>
          <Link href="/products?tag=Best+Seller" className="text-sm underline" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
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
        className="px-6 md:px-26 py-20 text-center"
        style={{ backgroundColor: 'var(--rose)' }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'white' }}>
          Diwali &amp; Wedding Collections
        </h1>
        <p className="mb-8 max-w-md mx-auto" style={{ color: 'white', opacity: 0.9 }}>
          Curated gift hampers and personalised pieces for every celebration.
        </p>
        <Link
          href="/products?tag=Diwali"
          className="px-8 py-3 font-semibold hover:opacity-90 transition-opacity textDecoration-none"
          style={{ backgroundColor: 'white', color: 'var(--rose)' }}
        >
          Shop Festive Gifts
        </Link>
      </section>

      {/* ── 6. MEET THE MAKER ──────────────────────────── */}
      <section className="px-10 md:px-16 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-7" style={{ color: 'var(--ink)' }}>
            Meet the Maker
          </h1>
          <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--ink)', opacity: 0.85 }}>
            Every Neerakriti piece is made by one person — a CS teacher who picks up her
            dotting tools in the evenings and transforms a blank surface into something that
            takes your breath away. No outsourcing. No shortcuts. Just one pair of hands,
            one dot at a time.
          </p>
          <Link
            href="/about"
            className="font-semibold underline"
            style={{ color: 'var(--ink)',textDecoration: 'none' }}
          >
            Read the full story →
          </Link>
        </div>

{/* Before: single image div */}
{/* <div className="flex-1 max-w-sm w-full"> ... </div> */}

{/* After: two images side by side */}
{/* Two maker photos — width-driven sizing, no height constraint, no cropping */}
<div style={{ flex: '0 0 42%', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>

  {/* Photo 1 */}
  <img
    src="/images/maker.jpeg"
    alt="The maker — Neerakriti artist"
    style={{
      width: 'calc(50% - 5px)',   /* exactly half the container minus half the gap */
      height: 'auto',             /* maintains natural aspect ratio — no cropping */
      borderRadius: '14px',
      display: 'block',           /* removes the ghost whitespace below inline images */
      boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
      objectFit: 'unset',         /* not needed since height is auto, but explicit is clean */
    }}
  />
<img
    src="/images/maker3.jpeg"
    alt="The maker at the seaside"
    style={{
      width: 'calc(50% - 5px)',   /* same as photo 1 — guaranteed equal width */
      height: 'auto',             /* scales proportionally — fully visible, no scroll */
      borderRadius: '14px',
      display: 'block',
      boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
      objectFit: 'unset', 
    }}
  />
 

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