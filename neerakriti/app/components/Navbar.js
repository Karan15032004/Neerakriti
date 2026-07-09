// app/components/Navbar.js

import Link from 'next/link'
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';

export default function Navbar() {
  return (
   <nav
      style={{
        backgroundColor: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        transition: 'background-color 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '7rem',
        padding: '0.75rem 4rem',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* 1. Logo — far left */}
      <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
        <img
          src="/images/logo-removebg.png"
          alt="Neerakriti"
          style={{
            height: '80px',
            width: 'auto',
            objectFit: 'contain',
          }}
        />
      </Link>

      {/* 2. Nav links — right next to logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem', flexShrink: 0 }}>
        <Link
          href="/products"
          className="hover:opacity-60 transition-opacity"
          style={{
            color: 'var(--ink)',
            textDecoration: 'none',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Shop All
        </Link>
        <Link
          href="/about"
          className="hover:opacity-60 transition-opacity"
          style={{
            color: 'var(--ink)',
            textDecoration: 'none',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.85rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          About
        </Link>
        <Link
          href="/gallery"
          className="hover:opacity-60 transition-opacity"
          style={{
            color: 'var(--ink)',
            textDecoration: 'none',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.85rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Gallery
        </Link>
        <Link
          href="/contact"
          className="hover:opacity-60 transition-opacity"
          style={{
            color: 'var(--ink)',
            textDecoration: 'none',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.85rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Contact
        </Link>
      </div>

      {/* 3. Search bar — takes remaining space in the middle */}
      <SearchBar />

      {/* 4. Theme toggle — far right */}
      <div style={{ flexShrink: 0 }}>
        <ThemeToggle />
      </div>
    </nav>
  )
}