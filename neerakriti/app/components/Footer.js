// app/components/Footer.js
// Server Component — static content, no interactivity needed.

import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      className="px-6 md:px-16 py-12 mt-16"
      style={{
        backgroundColor: 'var(--card-bg)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div style={{
      maxWidth: '72rem',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '2rem',
    }}>

        {/* Column 1 — Brand blurb */}
        <div>
          <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--ink)' }}>
            Neerakriti
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)', opacity: 0.7 }}>
            Handmade dot mandala art. Every piece painted by one artist, one dot at a time.
          </p>
        </div>

        {/* Column 2 — Quick nav links (repeating navbar links in footer is standard UX) */}
{/* Column 2 — Quick nav links */}
<div>
  <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider" style={{ color: 'var(--ink)' }}>
    Explore
  </h3>
  <div style={{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.75rem',
  }}>
    {[
      { href: '/products', label: 'Shop All' },
      { href: '/about',    label: 'About' },
      { href: '/gallery',  label: 'Gallery' },
      { href: '/contact',  label: 'Contact' },
    ].map(({ href, label }) => (
     <Link
  key={href}
  href={href}
  className="footer-card"
  style={{
    color: 'var(--ink)',
    backgroundColor: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '0.6rem 1rem',
    fontSize: '0.875rem',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'block',
    transition: 'opacity 0.2s',
  }}
>
  {label}
</Link>
    ))}
  </div>
</div>
        {/* Column 3 — Contact / WhatsApp */}
        <div>
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider" style={{ color: 'var(--ink)' }}>
            Get in Touch
          </h3>
          {/* wa.me deep link — replace 91XXXXXXXXXX with the real number in Phase 4 */}
          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold flex items-center gap-2 hover:opacity-70 transition-opacity"
            style={{ color: 'var(--accent)', textDecoration: 'none' }}
          >
            💬 WhatsApp Us
          </a>
          <p className="text-xs mt-4" style={{ color: 'var(--ink)', opacity: 0.5 }}>
            © {new Date().getFullYear()} Neerakriti. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}