"use client";

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Accommodations', page: '/accommodations' },
  { label: 'Experiences', page: '/experiences' },
  { label: 'Dining', page: '/dining' },
  { label: 'Spa', page: '/spa' },
  { label: 'Offers', page: '/offers' },
  { label: 'Gallery', page: '/gallery' },
  { label: 'Journal', page: '/journal' },
]

export default function Nav() {
  const router = useRouter()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  
  const isHeroPage = ['/', '/accommodations', '/experiences', '/dining', '/spa', '/gallery'].includes(pathname || '/')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const navBg = scrolled || !isHeroPage ? 'nav-solid' : ''
  const textColor = scrolled || !isHeroPage ? 'text-stone' : 'text-ivory'
  const logoColor = scrolled || !isHeroPage ? '#1C1A17' : '#FAF8F3'

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
        style={{ paddingTop: '0', paddingBottom: '0' }}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 flex items-center justify-between h-18" style={{ height: '72px' }}>
          {/* Left nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.slice(0, 3).map(link => (
              <Link
                key={link.page}
                href={link.page}
                className={`link-underline text-xs font-medium tracking-widest uppercase transition-colors duration-300 ${textColor} ${pathname?.startsWith(link.page) ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Logo — center */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
            style={{ lineHeight: 1 }}
          >
            <span
              className="display tracking-widest uppercase"
              style={{ fontSize: '22px', letterSpacing: '0.22em', color: logoColor, transition: 'color 0.4s' }}
            >
              Miravel
            </span>
            <span
              className="tracking-widest uppercase"
              style={{ fontSize: '8px', letterSpacing: '0.3em', color: logoColor, opacity: 0.65, marginTop: '2px', transition: 'color 0.4s' }}
            >
              Resort & Spa
            </span>
          </Link>

          {/* Right nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.slice(3).map(link => (
              <Link
                key={link.page}
                href={link.page}
                className={`link-underline text-xs font-medium tracking-widest uppercase transition-colors duration-300 ${textColor} ${pathname?.startsWith(link.page) ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className={`text-xs font-medium tracking-widest uppercase px-5 py-2.5 border transition-all duration-300 ${
                scrolled || !isHeroPage
                  ? 'border-stone/30 text-stone hover:bg-stone hover:text-ivory hover:border-stone'
                  : 'border-ivory/50 text-ivory hover:bg-ivory/10 hover:border-ivory'
              }`}
            >
              Enquire
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden ml-auto flex flex-col gap-1.5 p-2 ${textColor}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            <span className={`block w-5 h-px transition-all duration-300 ${scrolled || !isHeroPage ? 'bg-stone' : 'bg-ivory'}`} style={{ transform: menuOpen ? 'rotate(45deg) translate(3px, 3px)' : '' }} />
            <span className={`block w-5 h-px transition-all duration-300 ${scrolled || !isHeroPage ? 'bg-stone' : 'bg-ivory'}`} style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className={`block w-5 h-px transition-all duration-300 ${scrolled || !isHeroPage ? 'bg-stone' : 'bg-ivory'}`} style={{ transform: menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : '' }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div className={`menu-overlay ${menuOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between mb-16">
          <span className="display text-ivory tracking-widest uppercase" style={{ fontSize: '20px', letterSpacing: '0.2em' }}>Miravel</span>
          <button onClick={() => setMenuOpen(false)} className="text-ivory/60 hover:text-ivory text-2xl">✕</button>
        </div>
        <div className="flex flex-col gap-2">
          {[{ label: 'Home', page: '/' }, ...NAV_LINKS, { label: 'Contact', page: '/contact' }].map((link, i) => (
            <Link
              key={link.page}
              href={link.page}
              onClick={() => setMenuOpen(false)}
              className="text-left py-4 border-b border-ivory/10 text-ivory/80 hover:text-ivory transition-colors"
              style={{ fontSize: '28px', fontFamily: "'DM Serif Display', serif", animationDelay: `${i * 60}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="mt-auto pt-8">
          <Link
            href="/booking"
            onClick={() => setMenuOpen(false)}
            className="btn-ghost w-full justify-center text-center block"
          >
            Enquire / Reserve
          </Link>
          <p className="text-ivory/30 text-xs tracking-widest mt-6 text-center uppercase">+960 660 0001 · hello@miravel.com</p>
        </div>
      </div>
    </>
  )
}
