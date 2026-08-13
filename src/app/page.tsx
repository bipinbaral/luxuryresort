"use client";

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useScrollReveal, useParallax } from '@/hooks/useScrollReveal'
import { SUITES, EXPERIENCES, TESTIMONIALS, DINING, GALLERY_IMAGES } from '@/data/resort'

function RevealSection({ children, className = '', delay = 0, style }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  const ref = useScrollReveal<HTMLDivElement>()
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  )
}

export default function Home() {
  const router = useRouter()
  const parallaxRef = useParallax(0.25)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const [heroOpacity, setHeroOpacity] = useState(1)

  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        const progress = Math.min(window.scrollY / (window.innerHeight * 0.6), 1)
        setHeroOpacity(1 - progress * 0.6)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(i => (i + 1) % TESTIMONIALS.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      {/* ── HERO ── */}
      <section ref={heroRef} className="parallax-hero" style={{ height: '100vh', minHeight: '600px' }}>
        <div ref={parallaxRef} className="parallax-img">
          <video
            src="images/herobackgroundvideo.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '120%', objectFit: 'cover', objectPosition: 'center' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20,18,15,0.25) 0%, rgba(20,18,15,0.55) 100%)' }} />
        </div>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          style={{ opacity: heroOpacity, transition: 'opacity 0.1s' }}
        >
          <div style={{ animationDelay: '0.2s' }}>
            <p className="label" style={{ color: 'rgba(198,169,125,0.9)', letterSpacing: '0.28em' }}>Pumdikot Pokhara Nepal</p>
            <h1
              className="signature text-ivory mt-4"
              style={{ fontSize: 'clamp(64px, 12vw, 160px)', lineHeight: 0.95, letterSpacing: '0em', paddingBottom: '10px' }}
            >
              CHAUTARI
            </h1>
            <p
              className="display-italic text-ivory/75 mt-3"
              style={{ fontSize: 'clamp(16px, 2.5vw, 28px)', letterSpacing: '0.01em' }}
            >
              The art of unhurried living.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <button onClick={() => router.push('/booking')} className="btn-primary" style={{ background: '#E6D2B5', color: '#061A2F' }}>
                Enquire & Reserve
              </button>
              <button onClick={() => router.push('/accommodations')} className="btn-ghost">
                Explore Suites
              </button>
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: heroOpacity }}>
          <span className="label" style={{ color: 'rgba(252, 252, 250,0.45)' }}>Scroll</span>
          <div className="w-px bg-ivory/25" style={{ height: '48px', position: 'relative', overflow: 'hidden' }}>
            <div
              style={{
                position: 'absolute', top: 0, left: 0, width: '100%', background: 'rgba(252, 252, 250,0.7)',
                animation: 'scrollLine 2s ease-in-out infinite',
                height: '40%',
              }}
            />
          </div>
        </div>
        <style>{`
          @keyframes scrollLine {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(300%); }
          }
        `}</style>
      </section>

      {/* ── TAGLINE INTRO ── */}
      <section className="py-24 md:py-32 px-6 max-w-3xl mx-auto text-center">
        <RevealSection>
          <span className="gold-rule mx-auto block mb-8" />
          <h2 className="display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.2, color: '#061A2F' }}>
            A place where the rhythm of the Himalayas becomes your own.
          </h2>
          <p className="text-warm-gray mt-6 leading-relaxed" style={{ fontSize: '16px', color: '#4F5B63' }}>
            Chautari occupies 34 acres of a private estate in Pumdikot, Pokhara. Forty-two villas and residences. Three restaurants. An award-winning spa. And a staff philosophy built on the quiet art of anticipation.
          </p>
          <button onClick={() => router.push('/accommodations')} className="btn-outline mt-10">
            Discover the resort
          </button>
        </RevealSection>
      </section>

      {/* ── BRAND STORY ── */}
      <section className="py-8 md:py-18 relative" style={{ backgroundImage: 'url("/images/ourstory background lineart.png")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-0 items-stretch" style={{ minHeight: '560px' }}>
            <RevealSection className="order-2 md:order-1 flex flex-col justify-center pr-0 md:pr-16 py-12 md:py-0">
              <p className="label mb-4">Our story</p>
              <h2 className="display" style={{ fontSize: 'clamp(32px, 4vw, 54px)', lineHeight: 1.1 }}>
                Designed to disappear<br />
                <span className="display-italic">into the landscape.</span>
              </h2>
              <p className="mt-6 leading-relaxed" style={{ fontSize: '15px', color: '#4F5B63', lineHeight: 1.8 }}>
                Chautari was conceived by a single guiding principle: that architecture should earn the landscape it inhabits. Every structure — built of reclaimed teak, rammed earth, and locally quarried coral stone — was sited to preserve sightlines across the atoll.
              </p>
              <p className="mt-4 leading-relaxed" style={{ fontSize: '15px', color: '#4F5B63', lineHeight: 1.8 }}>
                The result is a resort that feels discovered rather than built. The kind of place that takes three days to begin to understand, and a lifetime to forget.
              </p>
              <button onClick={() => router.push('/experiences')} className="btn-outline mt-10 self-start">
                The Chautari way →
              </button>
            </RevealSection>
            <RevealSection delay={150} className="order-1 md:order-2 img-hover" style={{ minHeight: '420px' }}>
              <img
                src="/images/into the landscape.png"
                alt="Chautari infinity pool at dusk"
                style={{ width: '100%', height: '100%', minHeight: '420px', objectFit: 'cover', display: 'block' }}
              />
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── FEATURED SUITES ── */}
      <section className="py-24 md:py-32" style={{ background: '#F2EBE1' }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <RevealSection className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <p className="label mb-4">Accommodations</p>
              <h2 className="display" style={{ fontSize: 'clamp(30px, 4vw, 52px)' }}>
                Forty-two villas,<br />
                <span className="display-italic">one point of view.</span>
              </h2>
            </div>
            <button onClick={() => router.push('/accommodations')} className="btn-outline self-start md:self-auto shrink-0">
              View all suites
            </button>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {SUITES.slice(0, 3).map((suite, i) => (
              <RevealSection key={suite.id} delay={i * 120}>
                <div
                  className="group cursor-pointer"
                  onClick={() => router.push(`/accommodations/${suite.id}`)}
                >
                  <div className="img-hover" style={{ height: '320px', background: '#E6D2B5' }}>
                    <img
                      src={suite.image}
                      alt={suite.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <div className="pt-5 pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="label" style={{ color: '#285943' }}>{suite.category}</span>
                      <span className="text-xs text-warm-gray" style={{ color: '#285943' }}>{suite.size}</span>
                    </div>
                    <h3 className="display" style={{ fontSize: '22px' }}>{suite.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: '#4F5B63', lineHeight: 1.7 }}>{suite.tagline}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm font-medium" style={{ color: '#1F4A36' }}>{suite.price}</span>
                      <span className="text-xs tracking-widest uppercase text-sand" style={{ color: '#8A7256' }}>
                        Discover →
                      </span>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCES ── */}
      <section className="py-24 md:py-32">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <RevealSection className="mb-14">
            <p className="label mb-4">Experiences</p>
            <h2 className="display" style={{ fontSize: 'clamp(30px, 4vw, 52px)' }}>
              The island<br />
              <span className="display-italic">at your disposal.</span>
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Large feature card */}
            <RevealSection className="row-span-2">
              <div
                className="group cursor-pointer img-hover"
                onClick={() => router.push('/experiences')}
                style={{ height: '560px', position: 'relative', background: '#1F4A36' }}
              >
                <img
                  src={EXPERIENCES[0].image}
                  alt={EXPERIENCES[0].name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,18,15,0.75) 0%, transparent 50%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '32px' }}>
                  <span className="label" style={{ color: '#285943' }}>{EXPERIENCES[0].category}</span>
                  <h3 className="display text-ivory mt-2" style={{ fontSize: '28px' }}>{EXPERIENCES[0].name}</h3>
                  <p className="text-ivory/65 mt-2 text-sm leading-relaxed max-w-xs" style={{ lineHeight: 1.7 }}>{EXPERIENCES[0].tagline}</p>
                  <span className="text-ivory/50 text-xs tracking-widest uppercase mt-4 inline-block">From {EXPERIENCES[0].price}</span>
                </div>
              </div>
            </RevealSection>

            {/* Two smaller cards */}
            {EXPERIENCES.slice(1, 3).map((exp, i) => (
              <RevealSection key={exp.id} delay={(i + 1) * 100}>
                <div
                  className="group cursor-pointer img-hover"
                  onClick={() => router.push('/experiences')}
                  style={{ height: '260px', position: 'relative', background: '#1F4A36' }}
                >
                  <img
                    src={exp.image}
                    alt={exp.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,18,15,0.7) 0%, transparent 60%)' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '24px' }}>
                    <span className="label" style={{ color: '#285943' }}>{exp.category}</span>
                    <h3 className="display text-ivory mt-1" style={{ fontSize: '20px' }}>{exp.name}</h3>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection delay={200} className="mt-10 flex justify-end">
            <button onClick={() => router.push('/experiences')} className="btn-outline">
              All experiences
            </button>
          </RevealSection>
        </div>
      </section>

      {/* ── DINING ── */}
      <section
        className="relative py-32 md:py-48"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1779265298717-e3b21e7973e7?w=1800&h=900&fit=crop&auto=format)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,18,15,0.65)' }} />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12">
          <RevealSection className="max-w-lg">
            <p className="label" style={{ color: '#285943' }}>Dining at Chautari</p>
            <h2 className="display text-ivory mt-4" style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}>
              Three restaurants,<br />
              <span className="display-italic">one philosophy.</span>
            </h2>
            <p className="text-ivory/60 mt-6 leading-relaxed" style={{ fontSize: '15px', lineHeight: 1.8 }}>
              From the glass pavilion of Seabreeze to the barefoot ease of Coral Terrace, every meal at Chautari traces the ocean from which it came.
            </p>
            <button onClick={() => router.push('/dining')} className="btn-ghost mt-10">
              Explore dining
            </button>
          </RevealSection>
        </div>
      </section>

      {/* ── DINING CARDS ── */}
      <section className="py-16" style={{ background: '#FCFCFA' }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DINING.map((d, i) => (
              <RevealSection key={d.name} delay={i * 100}>
                <div className="group cursor-pointer" onClick={() => router.push('/dining')}>
                  <div className="img-hover" style={{ height: '240px', background: '#E6D2B5' }}>
                    <img src={d.image} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div className="pt-5">
                    <span className="label">{d.type}</span>
                    <h3 className="display mt-2" style={{ fontSize: '22px' }}>{d.name}</h3>
                    <p className="display-italic mt-1" style={{ fontSize: '14px', color: '#8A7256' }}>{d.tagline}</p>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: '#4F5B63', lineHeight: 1.7 }}>{d.hours}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEASONAL OFFER ── */}
      <section className="py-24 md:py-32">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-20">
            <RevealSection>
              <div className="img-hover" style={{ height: '480px', background: '#8A7256' }}>
                <img
                  src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900&h=700&fit=crop&auto=format"
                  alt="Honeymoon Escape offer"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </RevealSection>
            <RevealSection delay={150}>
              <div className="inline-block px-3 py-1 text-xs tracking-widest uppercase mb-6" style={{ background: '#E6D2B5', color: '#061A2F' }}>
                Seasonal Offer
              </div>
              <h2 className="display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.1 }}>
                Honeymoon Escape
              </h2>
              <p className="display-italic mt-2" style={{ fontSize: '18px', color: '#8A7256' }}>
                3 nights from $1,850 per night
              </p>
              <p className="mt-6 leading-relaxed" style={{ fontSize: '15px', color: '#4F5B63', lineHeight: 1.8 }}>
                Your Ocean Villa stay includes a private sunset dhoni cruise, a Couples Sanctuary spa treatment, champagne on arrival, and daily breakfast for two.
              </p>
              <ul className="mt-6 flex flex-col gap-2">
                {['Private sunset sailing', 'Couples Sanctuary treatment', 'Champagne & flowers on arrival', 'Daily full breakfast'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm" style={{ color: '#4F5B63' }}>
                    <span style={{ width: 24, height: 1, background: '#8A7256', display: 'inline-block', flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs tracking-wide" style={{ color: '#8A7256' }}>Valid through March 2026</p>
              <button onClick={() => router.push('/booking')} className="btn-primary mt-8" style={{ background: '#285943' }}>
                Enquire about this offer
              </button>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── GALLERY STRIP ── */}
      <section style={{ background: '#061A2F', padding: '80px 0' }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 mb-10">
          <RevealSection className="flex flex-col items-center text-center">
            <div>
              <p className="label" style={{ color: '#285943' }}>Gallery</p>
              <h2 className="display text-ivory mt-3" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
                The light here is<br />
                <span className="display-italic">unlike anywhere else.</span>
              </h2>
            </div>
            <button onClick={() => router.push('/gallery')} className="btn-ghost hidden md:inline-flex shrink-0 mt-8">
              Full gallery
            </button>
          </RevealSection>
        </div>
        <div className="flex justify-center gap-4 px-6 md:px-12 items-center overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {GALLERY_IMAGES.slice(0, 5).map((img, i) => (
            <div
              key={i}
              className="img-hover shrink-0 cursor-pointer"
              onClick={() => router.push('/gallery')}
              style={{
                width: '340px',
                height: i % 2 === 0 ? '520px' : '360px',
                background: '#0A2239',
              }}
            >
              <img src={img.url} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          ))}
        </div>
        <div className="px-6 md:px-12 mt-8 flex md:hidden">
          <button onClick={() => router.push('/gallery')} className="btn-ghost">Full gallery</button>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 md:py-36 px-6" style={{ background: '#FCFCFA' }}>
        <div className="max-w-2xl mx-auto text-center">
          <RevealSection>
            <p className="label mb-12">Guest voices</p>
            <div style={{ minHeight: '180px', transition: 'opacity 0.5s', position: 'relative' }}>
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  style={{
                    position: i === 0 ? 'relative' : 'absolute',
                    top: 0, left: 0, right: 0,
                    opacity: activeTestimonial === i ? 1 : 0,
                    transition: 'opacity 0.6s ease',
                    pointerEvents: activeTestimonial === i ? 'auto' : 'none',
                  }}
                >
                  <p
                    className="display-italic"
                    style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', lineHeight: 1.55, color: '#061A2F' }}
                  >
                    "{t.quote}"
                  </p>
                  <div className="mt-8">
                    <span className="gold-rule mx-auto block mb-5" />
                    <p className="font-medium text-sm" style={{ color: '#061A2F' }}>{t.author}</p>
                    <p className="text-xs mt-1 tracking-wide" style={{ color: '#4F5B63' }}>
                      {t.origin} · Stayed in the {t.suite}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-2 mt-16">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  style={{
                    width: activeTestimonial === i ? '24px' : '6px',
                    height: '2px',
                    background: activeTestimonial === i ? '#8A7256' : 'rgba(217, 184, 140,0.3)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── LOCATION ── */}
      <section className="py-24 md:py-32" style={{ background: '#F2EBE1' }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <RevealSection>
              <div style={{ height: '460px', background: '#1F4A36', position: 'relative', overflow: 'hidden' }}>
                <img
                  src="/images/Location & arrival.png"
                  alt="Paragliding image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(37,50,39,0.3)' }} />
                <div style={{ position: 'absolute', bottom: '24px', left: '24px' }}>
                  <span className="label" style={{ color: '#285943' }}>UNESCO Biosphere Reserve</span>
                </div>
              </div>
            </RevealSection>
            <RevealSection delay={150}>
              <p className="label mb-4">Location & arrival</p>
              <h2 className="display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.1 }}>
                Pumdikot, Pokhara,<br />
                <span className="display-italic">Nepal.</span>
              </h2>
              <p className="mt-6 leading-relaxed" style={{ fontSize: '15px', color: '#4F5B63', lineHeight: 1.8 }}>
                Chautari is reached by a 35-minute seaplane from Malé's Velana International Airport, or a 20-minute speedboat transfer. Our team coordinates every detail of your journey.
              </p>
              <div className="mt-8 flex flex-col gap-4">
                {[
                  ['Nearest airport', 'Velana International, Malé (MLE)'],
                  ['Seaplane transfer', '35 minutes · Available dawn to dusk'],
                  ['Speedboat transfer', '20 minutes · Available on request'],
                  ['Coordinates', "5°12'N, 73°01'E"],
                ].map(([label, value]) => (
                  <div key={label} className="flex gap-4 py-3 border-b" style={{ borderColor: 'rgba(217, 184, 140,0.2)' }}>
                    <span className="text-xs font-medium tracking-wide uppercase shrink-0" style={{ color: '#8A7256', width: '140px' }}>{label}</span>
                    <span className="text-sm" style={{ color: '#061A2F' }}>{value}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => router.push('/contact')} className="btn-outline mt-10">
                Plan your arrival
              </button>
            </RevealSection>
          </div>
        </div>
      </section>
    </div>
  )
}
