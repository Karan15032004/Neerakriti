'use client';
// 👆 Client Component — uses useState for form inputs and handles submit events.
// Server Components can't do any of this (no browser, no keyboard, no mouse).

import { useState } from 'react';

export default function NotifyForm() {
  // ── State variables ──────────────────────────────────────────────
  // contact: stores whatever the user types (email or WhatsApp number)
  // method: tracks which radio button is selected — 'email' or 'whatsapp'
  // status: shows feedback after submission ('Subscribed!', error, etc.)
  // sending: true while the request is in flight (disables the button)

  const [contact, setContact] = useState('');
  const [method, setMethod] = useState('email');    // default to email
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 👆 Prevent page reload — standard for all form handlers in React

    setSending(true);
    setStatus('');

    try {
      // Your FastAPI endpoint expects: { "contact": "...", "method": "email" | "whatsapp" }
      const res = await fetch('http://localhost:8000/engagement/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: contact,
          contactType: method,
        }),
      });

      if (res.ok) {
        setStatus('You\'re subscribed! We\'ll notify you about new pieces. 🎨');
        setContact('');  // Clear the input
      } else if (res.status === 409) {
        // 409 Conflict — your backend returns this for duplicate signups
        setStatus('You\'re already subscribed!');
      }  else {
        const data = await res.json();
          // ── Handle FastAPI's validation errors safely ──
          // data.detail can be a string ("Already subscribed") OR
          // an array of objects [{type, loc, msg, input}, ...] for 422 errors.
          // React can't render objects, so we must always extract a string.
        if (typeof data.detail === 'string') {
          setStatus(data.detail);
        } else if (Array.isArray(data.detail)) {
            // Join all the "msg" fields from each validation error
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
    <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.75rem',
          color: 'var(--color-taupe)',
          marginBottom: '0.5rem',
        }}
      >
        Stay in the Loop
      </h3>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.95rem',
          color: 'var(--color-taupe)',
          marginBottom: '1.5rem',
          opacity: 0.8,
        }}
      >
        Get notified when new handmade pieces are added to the collection.
      </p>

      <form onSubmit={handleSubmit}>

        {/* ── Radio buttons: Email or WhatsApp ── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginBottom: '1rem',
          }}
        >
          <label
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.9rem',
              color: 'var(--color-taupe)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <input
              type="radio"
              name="notifyMethod"
              value="email"
              checked={method === 'email'}
              onChange={() => setMethod('email')}
              // 👆 When this radio is clicked, method becomes 'email'
              // and the input placeholder changes accordingly
            />
            Email
          </label>
          <label
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.9rem',
              color: 'var(--color-taupe)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <input
              type="radio"
              name="notifyMethod"
              value="whatsapp"
              checked={method === 'whatsapp'}
              onChange={() => setMethod('whatsapp')}
            />
            WhatsApp
          </label>
        </div>

        {/* ── Contact input + submit button side by side ── */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type={method === 'email' ? 'email' : 'tel'}
            // 👆 Dynamic input type! If email is selected, the browser
            // validates email format. If WhatsApp, it shows a phone keyboard
            // on mobile devices.
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            placeholder={
              method === 'email' ? 'you@example.com' : '+91 98765 43210'
            }
            // 👆 Placeholder changes based on which radio is selected
            style={{
              flex: 1,
              padding: '0.75rem',
              border: '1px solid var(--color-taupe)',
              borderRadius: '8px',
              backgroundColor: 'var(--color-cream)',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.95rem',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            disabled={sending}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: sending ? '#a89585' : 'var(--color-taupe)',
              color: 'var(--color-cream)',
              border: 'none',
              borderRadius: '8px',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1rem',
              cursor: sending ? 'not-allowed' : 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {sending ? 'Subscribing...' : 'Notify Me'}
          </button>
        </div>

        {/* ── Status message ── */}
        {status && (
          <p
            style={{
              fontSize: '0.9rem',
              marginTop: '0.75rem',
              color: status.includes('subscribed') || status.includes('Subscribed')
                ? 'var(--color-sage)'
                : '#c0392b',
            }}
          >
            {status}
          </p>
        )}
      </form>
    </div>
  );
}