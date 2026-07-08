// app/components/Navbar.js
// Server Component — no 'use client' needed since there's no interactivity yet.
// ThemeToggle (a Client Component) will be added here in Phase 4.

import Link from 'next/link'
import Image from 'next/image'
import ThemeToggle from './ThemeToggle';
export default function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        // Smooth bg transition when theme switches
        transition: 'background-color 0.3s ease',
      }}
      className="px-6 md:px-16 py-4 flex items-center justify-between sticky top-0 z-50"
      // sticky + z-50: navbar stays at the top when you scroll
    >
      {/* Brand name / logo — left side */}
      <Link
        href="/"
        className="text-3xl font-bold tracking-wide"
        style={{ color: 'var(--ink)', textDecoration: 'none', fontFamily: 'var(--font-cormorant, Georgia, serif)',fontSize: '1.5rem' }}
      >
        NeeraKriti
      </Link>

      {/* Navigation links — right side */}
      {/* NOTE: The mega-menu dropdown (Myntra-style) goes here in Phase 4,
          once Karan provides the full product list. For now, just flat links. */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem',textDecoration: 'none' }}>
        <Link href="/products" className="text-sm font-medium hover:opacity-60 transition-opacity" style={{ color: 'var(--ink)',textDecoration: 'none' }}>
          Shop All
        </Link>
        <Link href="/about" className="text-sm font-medium hover:opacity-60 transition-opacity" style={{ color: 'var(--ink)',textDecoration: 'none' }}>
          About
        </Link>
        <Link href="/gallery" className="text-sm font-medium hover:opacity-60 transition-opacity" style={{ color: 'var(--ink)',textDecoration: 'none' }}>
          Gallery
        </Link>
        <Link href="/contact" className="text-sm font-medium hover:opacity-60 transition-opacity" style={{ color: 'var(--ink)',textDecoration: 'none' }}>
          Contact
        </Link>

        {/* Search bar — no functionality yet, just the input. Phase 4 wires it up. */}
        <input
          type="text"
          placeholder="Search..."
          className="text-sm px-3 py-1.5 rounded-full outline-none w-32 focus:w-48 transition-all duration-300"
          style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border)',
            color: 'var(--ink)',
          }}
        />

       <ThemeToggle />
      </div>
    </nav>
  )
}