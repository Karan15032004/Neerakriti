'use client'; // ← needs useState and useRouter, so must be Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  // tracks what the user is typing in real time
  const [query, setQuery] = useState('');

  // useRouter lets us programmatically navigate — like clicking a link in code
  const router = useRouter();

  const handleSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) return; // do nothing if search box is empty

    // Navigate to /products with the search term as a URL query param
    // e.g. typing "jharokha" → /products?search=jharokha
    router.push(`/products?search=${encodeURIComponent(trimmed)}`);
    // encodeURIComponent handles spaces and special characters safely
    // e.g. "tea light" becomes "tea%20light" in the URL
  };

  return (
    <div style={{ position: 'relative', flex: 1, maxWidth: '550px' }}>

      {/* Search icon */}
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
          pointerEvents: 'none', // icon doesn't block clicks on the input
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
        value={query}                          // controlled input — React owns the value
        onChange={(e) => setQuery(e.target.value)} // update state on every keystroke
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch(); // pressing Enter triggers the search
        }}
        placeholder="Search for products, categories and more"
        className="outline-none w-full"
        style={{
          padding: '0.7rem 3rem 0.7rem 2.75rem', // right padding for the X button
          borderRadius: '4px',
          backgroundColor: 'var(--card-bg)',
          border: '1px solid var(--border)',
          color: 'var(--ink)',
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.85rem',
          width: '100%',
        }}
      />

      {/* Clear button — only appears when there's text */}
      {query && (
        <button
          onClick={() => setQuery('')}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--ink)',
            opacity: 0.4,
            fontSize: '1.1rem',
            padding: '0 4px',
          }}
        >
          ×
        </button>
      )}

    </div>
  );
}