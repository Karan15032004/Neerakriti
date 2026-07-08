// app/contact/page.js
// --------------------
// Contact page — Server Component that embeds a Client Component (FeedbackForm).
//
// This page has two parts:
//   1. Contact information (WhatsApp, email, location) — static content
//   2. Feedback form — interactive (Client Component imported here)
//
// WHY THIS WORKS: A Server Component CAN import and render Client Components.
// Next.js handles the boundary — it renders everything it can on the server,
// then ships the FeedbackForm's JavaScript to the browser for interactivity.

import FeedbackForm from '../components/FeedbackForm';

export const metadata = {
  title: 'Contact — Neerakriti',
  description:
    'Get in touch with Neerakriti for custom mandala art, bulk orders, or any questions. Reach us on WhatsApp.',
};

export default function ContactPage() {
  // ── WhatsApp number (change this to the real number) ──
  const whatsappNumber = '919305773954';
  // 👆 Format: country code + number, no spaces, no dashes, no plus sign
  // 91 = India country code. Change 9876543210 to the real number.

  return (
    <div>

      {/* ═══════════════════════════════════════════════════════════
          TOP SECTION — Get in Touch
          ═══════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: '4rem 2rem',
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '2.5rem',
            color: 'var(--color-taupe)',
            marginBottom: '1rem',
          }}
        >
          Let's Talk
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1.05rem',
            color: 'var(--color-taupe)',
            opacity: 0.8,
            marginBottom: '3rem',
            maxWidth: '550px',
            margin: '0 auto 3rem auto',
            lineHeight: 1.7,
          }}
        >
          Have a question about a piece? Want to discuss a custom order or bulk gifting 
          for a special occasion? The fastest way to reach us is WhatsApp.
        </p>

        {/* ── Contact cards ── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            marginBottom: '3rem',
          }}
        >

          {/* WhatsApp card */}
          
            href={`https://wa.me/${whatsappNumber}?text=Hi! I'm reaching out from the Neerakriti website.`}
            // 👆 wa.me deep link — opens WhatsApp with a prefilled message.
            // Works on both mobile (opens the app) and desktop (opens WhatsApp Web).
            target="_blank"
            rel="noopener noreferrer"
            // 👆 Security best practice for external links:
            // noopener: prevents the new page from accessing window.opener
            // noreferrer: prevents sending the referrer URL to the new page
            style={{
              flex: '1 1 250px',
              maxWidth: '300px',
              padding: '2rem 1.5rem',
              backgroundColor: '#25D366',
              // 👆 Official WhatsApp brand green colour
              borderRadius: '12px',
              textDecoration: 'none',
              color: 'white',
              textAlign: 'center',
              transition: 'transform 0.2s ease',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>💬</div>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.25rem',
                marginBottom: '0.5rem',
              }}
            >
              WhatsApp
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                opacity: 0.9,
              }}
            >
              Chat with us — usually reply within a few hours
            </p>
          </a>

          {/* Email card */}
          
            href="mailto:neerakriti@gmail.com"
            // 👆 Change this to the real email address
            style={{
              flex: '1 1 250px',
              maxWidth: '300px',
              padding: '2rem 1.5rem',
              backgroundColor: 'var(--color-taupe)',
              borderRadius: '12px',
              textDecoration: 'none',
              color: 'var(--color-cream)',
              textAlign: 'center',
              transition: 'transform 0.2s ease',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>✉️</div>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.25rem',
                marginBottom: '0.5rem',
              }}
            >
              Email
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                opacity: 0.9,
              }}
            >
              For detailed inquiries & bulk orders
            </p>
          </a>

          {/* Location card */}
          <div
            style={{
              flex: '1 1 250px',
              maxWidth: '300px',
              padding: '2rem 1.5rem',
              backgroundColor: 'var(--color-sage)',
              borderRadius: '12px',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📍</div>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.25rem',
                marginBottom: '0.5rem',
              }}
            >
              Based In
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                opacity: 0.9,
              }}
            >
              Lucknow, India — shipping across the country
            </p>
          </div>
        </div>

        {/* ── What you can reach out for ── */}
        <div
          style={{
            textAlign: 'left',
            maxWidth: '500px',
            margin: '0 auto',
            padding: '2rem',
            backgroundColor: 'var(--color-cream)',
            borderRadius: '12px',
            border: '1px solid var(--color-rose)',
          }}
        >
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.25rem',
              color: 'var(--color-taupe)',
              marginBottom: '1rem',
            }}
          >
            Feel free to ask about:
          </h3>
          <ul
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.95rem',
              color: 'var(--color-taupe)',
              lineHeight: 2,
              paddingLeft: '1.25rem',
              opacity: 0.85,
            }}
          >
            <li>Custom designs — your colours, your patterns, your size</li>
            <li>Bulk orders for weddings, Diwali, or corporate gifting</li>
            <li>Personalised gift wrapping and packaging</li>
            <li>Shipping timelines and delivery details</li>
            <li>Care instructions for your mandala art pieces</li>
          </ul>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
          BOTTOM SECTION — Feedback Form
          The FeedbackForm is a Client Component, but we can use it
          here in a Server Component — Next.js handles the boundary.
          ═══════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: '4rem 2rem',
          borderTop: '1px solid var(--color-rose)',
          backgroundColor: 'var(--color-cream)',
        }}
      >
        <FeedbackForm />
      </section>

    </div>
  );
}