// app/gallery/page.js
// --------------------
// Gallery page — Server Component.
// Displays photos from past exhibitions in a masonry-style grid.
// Currently uses placeholder boxes — replace with real <Image> later.
//
// WHY SERVER COMPONENT? No interactive state needed. Pure visual content.
// Server-rendering means Google indexes the page content for SEO.

import Link from 'next/link';
import GalleryCarousel from '../components/GalleryCarousel';

export const metadata = {
  title: 'Gallery — Neerakriti Exhibitions & Events',
  description:
    'Photos from Neerakriti exhibitions, craft fairs, and art shows showcasing handmade dot mandala art.',
};

// ── Gallery data ─────────────────────────────────────────────────
// This array holds info for each gallery item. Later, this could
// come from MongoDB or a CMS. For now, it's hardcoded here.
// Each item has a title, description, and a "tall" flag for variety.

const galleryItems = [
  {
    id: 1,
    title: 'Craft Fair 2024',
    description: 'First public exhibition — 12 pieces displayed',
    tall: true,
    color: 'var(--color-rose)',
    media: [
      { type: 'video', src: '/videos/exhibition.mp4' },
      { type: 'image', src: '/images/craft-fair/craftfair-2.jpeg' },
      { type: 'image', src: '/images/craft-fair/craftfair-3.jpeg' },
      // add as many as you want
    ],
  },
  {
    id: 2,
    title: 'Seven Chakras Collection',
    description: 'The signature chakra-themed mandala plates',
    tall: false,
    color: 'var(--color-sage)',
    image: '/images/sevenchakras/sevenchakras.jpeg', // optional image for this item
  },
  {
    id: 3,
    title: 'Diwali Special Display',
    description: 'Custom gift hampers for the festive season',
    tall: false,
    color: 'var(--color-taupe)',
    image:'/images/diwali-rangoli-2.jpeg',
  },
  {
    id: 4,
    title: 'Bridal Collection',
    description: 'Mirror frames and decorative pieces for weddings',
    tall: true,
    color: 'var(--color-sage)',
    image: '/images/photo-frames/photo-frame-2.jpeg',
  },
  {
    id: 5,
    title: 'Jharokha Wall Panels',
    description: 'Traditional arch-shaped wall art pieces',
    tall: false,
    color: 'var(--color-rose)',
    image:'/images/jharokha/jharokha1.jpeg',
  },
      {
    id: 6,
    title: 'Random Studio Moments',
    description: 'Behind the scenes — the dotting process',
    tall: false,
    color: 'var(--color-taupe)',
    media: [
      { type: 'image', src: '/images/random/1.jpeg' },
      { type: 'image', src: '/images/random/3.jpeg' },
    ],
  },
];

export default function GalleryPage() {
  return (
    <div style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>

      {/* ── Page header ── */}
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2.5rem',
          color: 'var(--color-taupe)',
          textAlign: 'center',
          marginBottom: '0.75rem',
        }}
      >
        Gallery
      </h1>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '1rem',
          color: 'var(--color-taupe)',
          textAlign: 'center',
          opacity: 0.7,
          marginBottom: '3rem',
          maxWidth: '600px',
          margin: '0 auto 3rem auto',
        }}
      >
        Moments from exhibitions, craft fairs, and the studio — where every dot finds its place.
      </p>

      {/* ── Masonry-style grid ── */}
      <div
        style={{
          columns: '2 300px',
          // 👆 CSS Columns (not Grid, not Flexbox — a third layout system!)
          // "2 300px" means: "try for 2 columns, each at least 300px wide"
          // On narrow screens, it drops to 1 column automatically.
          // This creates a true masonry/Pinterest layout where items
          // of different heights stack without gaps.
          columnGap: '1.5rem',
        }}
      >
        {galleryItems.map((item) => (
          <div
            key={item.id}
            style={{
              breakInside: 'avoid',
              // 👆 Prevents a card from being split across two columns
              marginBottom: '1.5rem',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: item.color,
              opacity: 1,
              // 👆 Low opacity because these are placeholders.
              // Remove opacity when you add real images.
            }}
          >
            {/* Image placeholder area */}
            {/* Video or image placeholder area */}
{item.media ? (
  // ── Instagram-style carousel for cards with multiple media ──
  <GalleryCarousel
    media={item.media}
    height={item.tall ? '380px' : '220px'}
  />
) : item.image ? (
  // ── Single photo ──
  <img
    src={item.image}
    alt={item.title}
    style={{
      width: '100%',
      height: item.tall ? '380px' : '220px',
      objectFit: 'cover',
      objectPosition: 'center',
      display: 'block',
    }}
  />
) : (
  // ── Placeholder ──
  <div
    style={{
      height: item.tall ? '380px' : '220px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', sans-serif",
      fontSize: '0.85rem',
      color: 'var(--color-taupe)',
      opacity: 0.4,
    }}
  >
    [ Photo coming soon ]
  </div>
)}

            {/* Caption */}
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'rgba(255,255,255,0.5)',
              }}
            >
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.15rem',
                  color: 'var(--color-taupe)',
                  marginBottom: '0.25rem',
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.85rem',
                  color: 'var(--color-taupe)',
                  opacity: 0.7,
                }}
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── CTA ── */}
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <Link
          href="/products"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.1rem',
            color: 'var(--color-cream)',
            backgroundColor: 'var(--color-taupe)',
            padding: '0.75rem 2rem',
            borderRadius: '8px',
            textDecoration: 'none',
          }}
        >
          Shop the Collection →
        </Link>
      </div>
    </div>
  );
}