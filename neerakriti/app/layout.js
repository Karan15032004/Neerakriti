// app/layout.js
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// next/font/google downloads these fonts at BUILD time and self-hosts them.
// No external font requests at runtime — faster and more private.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',   // Exposes as a CSS variable for use in globals.css
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cormorant',   // Exposes as a CSS variable for headings
})

// Metadata is Next.js's built-in SEO system.
// This sets the <title> and <meta description> for every page unless overridden.
export const metadata = {
  title: 'Neerakriti — Handmade Dot Mandala Art',
  description:
    'Hand-painted dot mandala art by one artist, one dot at a time. Shop wall decor, frames, jharokhas, and personalised gifts.',
}

// This script runs synchronously before the browser paints — prevents the
// "flash of wrong theme" when a user has dark mode saved.
const themeScript = `
  try {
    var theme = localStorage.getItem('neerakriti-theme');
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  } catch(e) {}
`

export default function RootLayout({ children }) {
  return (
    // The font variables are attached to <html> so all children can access them
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        {/* Theme flash fix — must be the very first thing inside <body> */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />

        {/* Navbar renders at the top of every single page */}
        <Navbar />

        {/* children = whatever page.js is currently active */}
        <main>{children}</main>

        {/* Footer renders at the bottom of every single page */}
        <Footer />
      </body>
    </html>
  )
}