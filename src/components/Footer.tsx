import Link from 'next/link'

export default function Footer() {
  const pages = [
    { label: 'Accommodations', page: '/accommodations' },
    { label: 'Experiences', page: '/experiences' },
    { label: 'Dining', page: '/dining' },
    { label: 'Spa & Wellness', page: '/spa' },
    { label: 'Offers', page: '/offers' },
    { label: 'Gallery', page: '/gallery' },
    { label: 'Journal', page: '/journal' },
    { label: 'Contact', page: '/contact' },
  ]

  return (
    <footer style={{ background: '#061A2F', color: '#FCFCFA' }}>
      {/* Pre-footer CTA band */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage: 'url("/images/above%20footer%20background.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(6, 26, 47,0.72)' }} />
        <div className="relative z-10 flex flex-col items-center text-center py-20 px-6">
          <p className="label" style={{ color: '#ffffffff' }}>Begin your journey</p>
          <h2 className="display text-ivory mt-4" style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}>
            Reserve your stay at Chautari
          </h2>
          <p className="text-ivory/60 mt-4 max-w-lg" style={{ fontSize: '15px', lineHeight: 1.7 }}>
            Our reservations team is available around the clock to craft an itinerary tailored precisely to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/booking" className="btn-primary" style={{ background: '#E6D2B5', color: '#061A2F' }}>
              Enquire & Reserve
            </Link>
            <Link href="/contact" className="btn-ghost">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="display tracking-widest uppercase text-ivory mb-1" style={{ fontSize: '20px', letterSpacing: '0.2em' }}>Chautari</div>
            <div className="tracking-widest uppercase text-ivory/40" style={{ fontSize: '8px', letterSpacing: '0.28em' }}>Resort & Spa · Nepal</div>
            <p className="mt-4 text-xs text-ivory/70 leading-relaxed max-w-sm">
              Pumdikot, Pokhara, Nepal.<br />
              UNESCO World Biosphere Reserve.
            </p>
            <div className="flex gap-4 mt-6">
              {['IG', 'FB', 'TW', 'YT'].map(s => (
                <button key={s} className="text-ivory/30 hover:text-ivory/80 transition-colors text-xs tracking-widest">{s}</button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="label mb-5" style={{ color: '#8A7256' }}>Explore</p>
            <ul className="flex flex-col gap-3">
              {pages.slice(0, 4).map(p => (
                <li key={p.page}>
                  <Link href={p.page} className="text-ivory/50 hover:text-ivory/90 transition-colors text-sm">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label mb-5" style={{ color: '#8A7256' }}>More</p>
            <ul className="flex flex-col gap-3">
              {pages.slice(4).map(p => (
                <li key={p.page}>
                  <Link href={p.page} className="text-ivory/50 hover:text-ivory/90 transition-colors text-sm">
                    {p.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/booking" className="text-ivory/50 hover:text-ivory/90 transition-colors text-sm">
                  Booking Enquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="label mb-5" style={{ color: '#8A7256' }}>Contact</p>
            <div className="flex flex-col gap-3 text-sm text-ivory/50">
              <span>+960 660 0001</span>
              <span>hello@chautari.com</span>
              <span className="leading-relaxed">Pumdikot,<br />Pokhara, Nepal 33700</span>
            </div>
            <div className="mt-6 p-4 border border-ivory/10 rounded-sm">
              <p className="text-ivory/35 text-xs tracking-wide mb-2">Reservations</p>
              <p className="text-ivory/70 text-xs">Available 24 hours, 7 days</p>
              <Link href="/booking" className="inline-block mt-3 text-xs text-sand-light hover:text-ivory transition-colors tracking-widest uppercase" style={{ color: '#E6D2B5' }}>
                Enquire now →
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-ivory/8 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ivory/25 text-xs tracking-wide">
            © {new Date().getFullYear()} Chautari Resort & Spa. All rights reserved.
          </p>
          <p className="text-ivory/40 text-xs tracking-wide">
            Design and Developed by{' '}
            <a
              href="https://www.baralbipin.com.np"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-colors font-medium"
              style={{ color: '#E6D2B5' }}
            >
              BipinCreates
            </a>
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms & Conditions', 'Accessibility'].map(t => (
              <button key={t} className="text-ivory/25 hover:text-ivory/50 transition-colors text-xs">{t}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
