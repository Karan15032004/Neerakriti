'use client';
// 👆 Client Component — needs useState and localStorage (browser-only APIs)

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  // Start with 'light' — the useEffect below will read the real preference
  const [theme, setTheme] = useState('light');

  // ── On mount: read saved preference from localStorage ──
  useEffect(() => {
    const saved = localStorage.getItem('neerakriti-theme') || 'light';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    // Save to localStorage so it persists across page reloads
    localStorage.setItem('neerakriti-theme', next);
    // Set the attribute on <html> — this switches ALL CSS variables at once
    document.documentElement.setAttribute('data-theme', next);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      style={{
        background: 'none',
        border: '1px solid var(--ink)',
        borderRadius: '2px',
        padding: '0.4rem 0.75rem',
        cursor: 'pointer',
        fontSize: '0.85rem',
        color: 'var(--ink)',
        fontFamily: "'Inter', sans-serif",
        transition: 'all 0.2s ease',
      }}
    >
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}