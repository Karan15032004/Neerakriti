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
      // ✅
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
      // ✅ FIXED
} else {
  const data = await res.json();

  // FastAPI's data.detail is EITHER a plain string OR an array of
  // validation error objects [{type, loc, msg, input}, ...]
  // React crashes if you try to render an object — so we always extract a string
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

  return (
    <div
      style={{
        maxWidth: '520px',
        margin: '0 auto',
        backgroundColor: 'white',
        // 👆 White card sitting ON TOP of the cream page background
        // This creates contrast — the form "pops" visually
        borderRadius: '16px',
        padding: '2.5rem 2rem',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
        // 👆 Subtle shadow gives the card a "floating" feel
      }}
    >
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2rem',
          // 👆 Bigger than before (was 1.75rem)
          fontWeight: '700',
          // 👆 Bold — makes the heading stand out
          color: 'var(--color-taupe)',
          marginBottom: '1.5rem',
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
              color: 'var(--color-taupe)',
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
              border: '1.5px solid var(--color-rose)',
              // 👆 Rose border — visible against white background
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              // 👆 Pure white — clearly distinct from the card and page
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.95rem',
              color: 'var(--color-taupe)',
              outline: 'none',
              boxSizing: 'border-box',
              // 👆 Makes padding included in width calculation
              // Without this, 100% width + padding = wider than container
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
              color: 'var(--color-taupe)',
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
              border: '1.5px solid var(--color-rose)',
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.95rem',
              color: 'var(--color-taupe)',
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
              color: 'var(--color-taupe)',
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
              border: '1.5px solid var(--color-rose)',
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.95rem',
              color: 'var(--color-taupe)',
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
            backgroundColor: sending ? '#a89585' : 'var(--color-taupe)',
            color: '#FFFFFF',
            // 👆 White text on taupe background — high contrast
            border: 'none',
            borderRadius: '10px',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.2rem',
            // 👆 Bigger than before (was 1.1rem)
            fontWeight: '700',
            // 👆 Bold
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
              color: status.includes('Thank you') ? 'var(--color-sage)' : '#c0392b',
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