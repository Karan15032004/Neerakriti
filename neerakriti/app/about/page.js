// app/about/page.js
// ------------------
// About page — Server Component (no 'use client' needed).
// Pure content, no interactive state. Server-renders the full HTML,
// which is ideal for SEO — Google indexes the maker story immediately.
//
// LAYOUT: Four sections with alternating text/image blocks.
// Images use placeholder boxes for now — replace with real photos later.

import Link from 'next/link';

// ── SEO Metadata ─────────────────────────────────────────────────
// Next.js reads this export and puts it in the <head> tag automatically.
// This is what shows up in Google search results and when shared on social.
export const metadata = {
  title: 'About Neerakriti — The Story Behind Every Dot',
  description:
    'Meet the artist behind Neerakriti. Every dot mandala piece is hand-painted by one person, one dot at a time — a CS teacher by day, an artist by evening.',
};

export default function AboutPage() {
  return (
    <div>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — Opening Hook
          Not "About Us" — a statement that makes visitors feel something.
          Layout: text left, image right
          ═══════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: '5rem 2rem',
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '3rem',
          flexWrap: 'wrap',
          // 👆 flexWrap: 'wrap' means on small screens, the image
          // drops below the text instead of overflowing off-screen
        }}
      >
        {/* Text side */}
        <div style={{ flex: '1 1 400px' }}>
          {/* 👆 flex: '1 1 400px' means:
              - grow to fill space (1)
              - shrink if needed (1)
              - but start at minimum 400px width
              When the screen is too narrow for both at 400px,
              flexWrap kicks in and stacks them vertically */}
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '2.5rem',
              color: 'var(--color-taupe)',
              marginBottom: '1.5rem',
              lineHeight: 1.2,
            }}
          >
            Every Piece Begins With a Single Dot
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.05rem',
              color: 'var(--color-taupe)',
              lineHeight: 1.8,
              opacity: 0.85,
            }}
          >
            Neerakriti is not a factory. There is no assembly line, no team of workers,
            no machines. Every mandala you see here was hand-painted by one person — one dot
            at a time, one colour at a time, one evening at a time. Each piece carries hours
            of quiet, focused work, and the kind of patience that only comes from genuinely
            loving what you create.
          </p>
        </div>

        {/* Image placeholder — replace with real photo later */}
        <div
          style={{
            flex: '1 1 300px',
            minHeight: '350px',
            backgroundColor: 'var(--color-rose)',
            borderRadius: '16px',
            opacity: 0.3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Inter', sans-serif",
            color: 'var(--color-taupe)',
            fontSize: '0.9rem',
          }}
        >
          [ Artist photo placeholder ]
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — The Craft of Dot Mandala Art
          Layout: image left, text right (flipped from Section 1)
          ═══════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: '4rem 2rem',
          backgroundColor: 'var(--color-cream)',
          borderTop: '1px solid var(--color-rose)',
          borderBottom: '1px solid var(--color-rose)',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
            flexDirection: 'row-reverse',
            // 👆 row-reverse flips the order! The image (which comes
            // second in the HTML) appears on the LEFT visually.
            // On mobile when they stack, it goes back to normal order.
          }}
        >
          {/* Text side */}
          <div style={{ flex: '1 1 400px' }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '2rem',
                color: 'var(--color-taupe)',
                marginBottom: '1.25rem',
              }}
            >
              The Art of Placing One Dot at a Time
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1rem',
                color: 'var(--color-taupe)',
                lineHeight: 1.8,
                opacity: 0.85,
                marginBottom: '1rem',
              }}
            >
              Dot mandala art is one of the most meditative art forms in the world. 
              There are no brushstrokes to hide behind — every single dot is deliberate, 
              placed with a dotting tool or stylus, building outward from the centre in 
              concentric circles. The symmetry isn't drawn with rulers — it emerges from 
              rhythm and repetition.
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1rem',
                color: 'var(--color-taupe)',
                lineHeight: 1.8,
                opacity: 0.85,
              }}
            >
              A single plate can take 8–15 hours of focused work. There is no "undo" — 
              if a dot is misplaced, the entire pattern shifts. This is what makes every 
              Neerakriti piece unrepeatable. Even when the same design is recreated, the 
              slight human variations in pressure, spacing, and rhythm make each one unique.
            </p>
          </div>

          {/* Image placeholder */}
          <div
            style={{
              flex: '1 1 300px',
              minHeight: '350px',
              backgroundColor: 'var(--color-sage)',
              borderRadius: '16px',
              opacity: 0.3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Inter', sans-serif",
              color: 'var(--color-taupe)',
              fontSize: '0.9rem',
            }}
          >
            [ Close-up of dotting process ]
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — Meet the Artist
          Layout: text left, image right (same as Section 1)
          The CS-teacher-by-day, artist-by-evening contrast
          ═══════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: '4rem 2rem',
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '3rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: '1 1 400px' }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '2rem',
              color: 'var(--color-taupe)',
              marginBottom: '1.25rem',
            }}
          >
            Meet the Artist
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              color: 'var(--color-taupe)',
              lineHeight: 1.8,
              opacity: 0.85,
              marginBottom: '1rem',
            }}
          >
            By day, she is a Computer Science teacher — explaining algorithms, debugging 
            student code, grading assignments. By evening, she transforms into an artist, 
            picking up her dotting tools and losing herself in the meditative rhythm of 
            mandala creation.
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              color: 'var(--color-taupe)',
              lineHeight: 1.8,
              opacity: 0.85,
              marginBottom: '1rem',
            }}
          >
            Every single piece on this website — every plate, every frame, every jharokha — 
            was created by one person, start to finish. No assistants, no outsourcing, 
            no shortcuts. When you buy from Neerakriti, you're not buying a product from 
            a brand. You're buying hours of someone's quiet, focused, joyful work.
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              color: 'var(--color-taupe)',
              lineHeight: 1.8,
              fontStyle: 'italic',
              opacity: 0.7,
            }}
          >
            "I started dotting mandalas during the lockdown as a way to stay calm. 
            Two years later, it's become the most meaningful thing I do outside the classroom."
          </p>
        </div>

        {/* Image placeholder */}
        <div
          style={{
            flex: '1 1 300px',
            minHeight: '350px',
            backgroundColor: 'var(--color-taupe)',
            borderRadius: '16px',
            opacity: 0.2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Inter', sans-serif",
            color: 'var(--color-taupe)',
            fontSize: '0.9rem',
          }}
        >
          [ Artist portrait placeholder ]
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — A Glimpse of the Process (Photo Grid)
          Layout: heading + 2x2 grid of placeholder images
          Shows workspace, tools, mid-painting, finished piece
          ═══════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: '4rem 2rem',
          backgroundColor: 'var(--color-cream)',
          borderTop: '1px solid var(--color-rose)',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '2rem',
              color: 'var(--color-taupe)',
              textAlign: 'center',
              marginBottom: '2rem',
            }}
          >
            A Glimpse of the Process
          </h2>

          {/* 2x2 Photo grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              // 👆 CSS Grid magic:
              // repeat(auto-fit, minmax(250px, 1fr)) means:
              // "Make as many columns as fit, each at least 250px wide,
              //  stretching equally to fill the row."
              // On desktop: 2 columns. On mobile: 1 column. Automatic!
              gap: '1.5rem',
            }}
          >
            {[
              'The workspace — tools, paints, plates',
              'Mid-painting — dots taking shape',
              'Dotting tools and colour palettes',
              'A finished piece, ready to ship',
            ].map((label, index) => (
              <div
                key={index}
                style={{
                  backgroundColor:
                    index % 2 === 0 ? 'var(--color-sage)' : 'var(--color-rose)',
                  // 👆 Alternates colours for visual variety
                  opacity: 0.25,
                  borderRadius: '12px',
                  minHeight: '220px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.85rem',
                  color: 'var(--color-taupe)',
                  padding: '1rem',
                  textAlign: 'center',
                }}
              >
                [ {label} ]
              </div>
            ))}
          </div>

          {/* CTA back to shop */}
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
              Browse the Collection →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}