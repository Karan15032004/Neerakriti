'use client';
// 👆 Client Component — we need useEffect to load Instagram's embed script
// Server Components can't run scripts in the browser.

import { useEffect } from 'react';

// ── List of Instagram post URLs to embed ──
// To get a post URL: open any post on Instagram → click ⋯ → Copy Link
// Replace these with real Neerakriti post URLs
const INSTAGRAM_POSTS = [
   'https://www.instagram.com/reel/DHaNmlTBHgI/?igsh=MWdycTVodHJyNG5iZA==',
   'https://www.instagram.com/reel/DMz31D6sWjO/?igsh=M2hyazlpN2FvdGJ5',
   'https://www.instagram.com/reel/DNNbMNBMO7T/?igsh=MXMzdjhqOWFwYWo1Ng==',
];

const INSTAGRAM_PROFILE = 'https://www.instagram.com/neerakriti';

export default function InstagramEmbed() {
  // ── Load Instagram's embed.js script once the component mounts ──
  // This script finds all <blockquote class="instagram-media"> elements
  // on the page and converts them into rich embedded posts.
  useEffect(() => {
    if (window.instgrm) {
      // Script already loaded (e.g. navigated back to homepage) — just re-process
      window.instgrm.Embeds.process();
    } else {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2rem',
          color: 'var(--ink)',
          marginBottom: '0.5rem',
        }}
      >
        Follow Along on Instagram
      </h2>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.95rem',
          color: 'var(--ink)',
          opacity: 0.7,
          marginBottom: '2rem',
        }}
      >
        @neerakriti
      </p>

      {/* ── Embedded posts grid ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          justifyItems: 'center',
        }}
      >
        {INSTAGRAM_POSTS.map((url, i) => (
          <blockquote
            key={i}
            className="instagram-media"
            data-instgrm-captioned
            data-instgrm-permalink={url}
            style={{
              background: '#FFF',
              border: 0,
              borderRadius: '12px',
              margin: 0,
              maxWidth: '340px',
              width: '100%',
            }}
          />
        ))}
      </div>

      {/* ── Follow button ── */}
      <a
        href={INSTAGRAM_PROFILE}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          marginTop: '2rem',
          padding: '0.75rem 2rem',
          backgroundColor: 'var(--ink)',
          color: 'var(--bg)',
          borderRadius: '999px',
          textDecoration: 'none',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.05rem',
          fontWeight: 600,
        }}
      >
        Follow @neerakriti
      </a>
    </div>
  );
}