'use client'; // ← needs useState, so must be a Client Component

import { useState } from 'react';

// This component takes an array of media items (images + videos)
// and shows them one at a time, Instagram-style.
// Props:
//   media  — array of { type: 'image'|'video', src: '...' }
//   height — how tall the carousel should be (e.g. '380px')

export default function GalleryCarousel({ media, height = '320px' }) {
  // currentIndex tracks which slide we're on (0 = first item)
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % media.length);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  // 👆 The % media.length wraps around — so after the last slide, next goes back to first

  const current = media[currentIndex];

  return (
    <div style={{ position: 'relative', height, overflow: 'hidden', backgroundColor: '#1a1a1a' }}>

      {/* ── The active media item ── */}
      {current.type === 'video' ? (
        <video
          key={currentIndex} // ← key forces React to remount video when slide changes
          src={current.src}
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <img
          src={current.src}
          alt={`Slide ${currentIndex + 1}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      )}

      {/* ── Left arrow ── */}
      {media.length > 1 && (
        <button
          onClick={goPrev}
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.75)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: '#333',
            backdropFilter: 'blur(4px)',
          }}
        >
          ‹
        </button>
      )}

      {/* ── Right arrow ── */}
      {media.length > 1 && (
        <button
          onClick={goNext}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.75)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: '#333',
            backdropFilter: 'blur(4px)',
          }}
        >
          ›
        </button>
      )}

      {/* ── Instagram-style dot indicators ── */}
      {media.length > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '5px',
          }}
        >
          {media.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentIndex(i)} // click a dot to jump to that slide
              style={{
                width: i === currentIndex ? '18px' : '6px', // active dot is wider (pill shape)
                height: '6px',
                borderRadius: '3px',
                backgroundColor: i === currentIndex ? '#fff' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease', // smooth width animation on dot change
              }}
            />
          ))}
        </div>
      )}

      {/* ── Slide counter (top right, like Instagram) ── */}
      {media.length > 1 && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '12px',
            background: 'rgba(0,0,0,0.45)',
            color: '#fff',
            fontSize: '0.75rem',
            padding: '2px 8px',
            borderRadius: '10px',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {currentIndex + 1} / {media.length}
        </div>
      )}

    </div>
  );
}