// app/components/Navbar.js

import Link from 'next/link'
import ThemeToggle from './ThemeToggle';

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
      <div
        style={{
          position: 'relative',
          flex: 1,
          maxWidth: '550px',
        }}
      >
        <svg
          style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '18px',
            height: '18px',
            color: 'var(--ink)',
            opacity: 0.4,
          }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search for products, categories and more"
          className="outline-none w-full"
          style={{
            padding: '0.7rem 1rem 0.7rem 2.75rem',
            borderRadius: '4px',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border)',
            color: 'var(--ink)',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.85rem',
          }}
        />
      </div>

      {/* 4. Theme toggle — far right */}
      <div style={{ flexShrink: 0 }}>
        <ThemeToggle />
      </div>
    </nav>
  )
}