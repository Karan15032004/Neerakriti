// app/components/Navbar.js
'use client'

import Link from 'next/link'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import SearchBar from './SearchBar'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      style={{
        backgroundColor: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        transition: 'background-color 0.3s ease',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* ── Top bar: Logo + Hamburger (mobile) / full nav (desktop) ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1.5rem',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <img
            src="/images/logo-removebg.png"
            alt="Neerakriti"
            style={{ height: '60px', width: 'auto', objectFit: 'contain' }}
          />
        </Link>

        {/* Desktop nav links — hidden on mobile */}
        <div
          className="desktop-nav"
          style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}
        >
          {['Shop All|/products', 'About|/about', 'Gallery|/gallery', 'Contact|/contact'].map((item) => {
            const [label, href] = item.split('|')
            return (
              <Link
                key={href}
                href={href}
                style={{
                  color: 'var(--ink)',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* Desktop search — hidden on mobile */}
        <div className="desktop-search" style={{ flex: 1, margin: '0 1.5rem' }}>
          <SearchBar />
        </div>

        {/* Right side: Theme toggle + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ThemeToggle />
          {/* Hamburger button — only visible on mobile */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--ink)',
              fontSize: '1.5rem',
              lineHeight: 1,
              padding: '0.25rem',
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* ── Mobile menu — slides open when hamburger clicked ── */}
      {menuOpen && (
        <div
          style={{
            backgroundColor: 'var(--bg)',
            borderTop: '1px solid var(--border)',
            padding: '1rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {/* Mobile search bar */}
          <SearchBar />

          {/* Mobile nav links */}
          {[['Shop All', '/products'], ['About', '/about'], ['Gallery', '/gallery'], ['Contact', '/contact']].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: 'var(--ink)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                padding: '0.5rem 0',
                borderBottom: '1px solid var(--border)',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}

      {/* ── CSS to hide/show desktop vs mobile elements ── */}
      <style>{`
        .hamburger { display: none; }
        .desktop-nav { display: flex; }
        .desktop-search { display: flex; }

        @media (max-width: 768px) {
          .hamburger { display: block; }
          .desktop-nav { display: none; }
          .desktop-search { display: none; }
        }
      `}</style>
    </nav>
  )
}