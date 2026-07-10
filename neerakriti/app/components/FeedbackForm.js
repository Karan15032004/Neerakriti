// app/components/FeedbackForm.js
'use client';

import { useState } from 'react';

export default function FeedbackForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/engagement/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus('Thank you for your feedback! 🙏');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        const data = await res.json();
        if (typeof data.detail === 'string') {
          setStatus(data.detail);
        } else if (Array.isArray(data.detail)) {
          setStatus(data.detail.map((err) => err.msg).join(', '));
        } else {
          setStatus('Something went wrong. Please try again.');
        }
      }
    } catch (error) {
      setStatus('Could not connect to the server. Please try again later.');
    } finally {
      setSending(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────
  // WHY HARDCODED COLORS HERE?
  // The card background is always white (#FFFFFF), in BOTH light and
  // dark mode. So we can't use CSS variables like var(--color-taupe)
  // for text — in dark mode, --color-taupe resolves to a light cream
  // color, which becomes invisible against the white card.
  //
  // Fix: use fixed hex values that always contrast against white.
  //   #5C4A3A = dark taupe (always readable on white)
  //   #C99B89 = rose (border accent — soft but visible on white)
  //   #4A7A5A = dark sage (success message — readable on white)
  //   #c0392b = red (error — always readable)
  // ─────────────────────────────────────────────────────────────────

  return (
    <div
      style={{
        maxWidth: '520px',
        margin: '0 auto',
        backgroundColor: '#FFFFFF',       // ← always white card
        borderRadius: '16px',
        padding: '2.5rem 2rem',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
      }}
    >
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2rem',
          fontWeight: '700',
          color: '#5C4A3A',               // ← FIXED dark taupe, not var(--color-taupe)
          marginBottom: '1.5rem',         //   because var(--color-taupe) is LIGHT in dark mode
          textAlign: 'center',
        }}
      >
        We'd Love Your Feedback
      </h3>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
      >
        {/* ── Name field ── */}
        <div>
          <label
            htmlFor="feedback-name"
            style={{
              display: 'block',
              marginBottom: '0.4rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#5C4A3A',           // ← FIXED: always dark on white card
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Your Name
          </label>
          <input
            id="feedback-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your name"
            style={{
              width: '100%',
              padding: '0.8rem 1rem',
              border: '1.5px solid #C99B89',  // ← FIXED rose border
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.95rem',
              color: '#5C4A3A',               // ← FIXED: typed text is dark
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* ── Email field ── */}
        <div>
          <label
            htmlFor="feedback-email"
            style={{
              display: 'block',
              marginBottom: '0.4rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#5C4A3A',           // ← FIXED
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Your Email
          </label>
          <input
            id="feedback-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            style={{
              width: '100%',
              padding: '0.8rem 1rem',
              border: '1.5px solid #C99B89',
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.95rem',
              color: '#5C4A3A',           // ← FIXED
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* ── Message field ── */}
        <div>
          <label
            htmlFor="feedback-message"
            style={{
              display: 'block',
              marginBottom: '0.4rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#5C4A3A',           // ← FIXED
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Your Message
          </label>
          <textarea
            id="feedback-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Tell us what you think..."
            rows={4}
            style={{
              width: '100%',
              padding: '0.8rem 1rem',
              border: '1.5px solid #C99B89',
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.95rem',
              color: '#5C4A3A',           // ← FIXED: typed text is dark
              outline: 'none',
              resize: 'vertical',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* ── Submit button ── */}
        <button
          type="submit"
          disabled={sending}
          style={{
            padding: '0.85rem 2.5rem',
            // ─────────────────────────────────────────────────────
            // THE MAIN FIX FOR THE WASHED-OUT BUTTON:
            // Before: backgroundColor was 'var(--color-taupe)' which
            // in dark mode = a light cream → white text on light bg = invisible
            // After: hardcoded '#5C4A3A' (dark taupe) always gives
            // strong contrast with white text, in BOTH modes
            // ─────────────────────────────────────────────────────
            backgroundColor: sending ? '#A08070' : '#5C4A3A',
            color: '#FFFFFF',             // white text on dark button — always readable
            border: 'none',
            borderRadius: '10px',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.2rem',
            fontWeight: '700',
            cursor: sending ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s ease',
            alignSelf: 'center',
            marginTop: '0.5rem',
          }}
        >
          {sending ? 'Sending...' : 'Send Feedback'}
        </button>

        {/* ── Status message ── */}
        {status && (
          <p
            style={{
              textAlign: 'center',
              fontSize: '0.95rem',
              // success = dark sage, error = red — both readable on white
              color: status.includes('Thank you') ? '#4A7A5A' : '#c0392b',
              marginTop: '0.25rem',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {status}
          </p>
        )}
      </form>
    </div>
  );
}