"use client";

import { useRouter } from 'next/navigation'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SPA_TREATMENTS } from '@/data/resort'


function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useScrollReveal<HTMLDivElement>()
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

export default function Spa() {
  const router = useRouter();
  return (
    <div>
      {/* Hero */}
      <section
        className="relative flex items-end"
        style={{
          height: '75vh', minHeight: '500px',
          backgroundImage: 'url(https://images.unsplash.com/photo-1590490359854-dfba19688d70?w=2000&h=1000&fit=crop&auto=format)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(37,50,39,0.2) 0%, rgba(37,50,39,0.78) 100%)' }} />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 pb-20 w-full">
          <p className="label mb-3" style={{ color: '#C6A97D' }}>Spa & Wellness</p>
          <h1 className="display text-ivory" style={{ fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 0.95 }}>
            The body remembers<br />
            <span className="display-italic">what the mind forgets.</span>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 px-6">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <p className="label mb-4">Chautari Spa</p>
            <h2 className="display" style={{ fontSize: 'clamp(26px, 3.5vw, 46px)', lineHeight: 1.15 }}>
              A spa rooted in<br />
              <span className="display-italic">ancient traditions.</span>
            </h2>
            <p className="mt-6 leading-relaxed" style={{ fontSize: '15px', color: '#968B7F', lineHeight: 1.85 }}>
              The Chautari Spa draws from three of the Indian Ocean's great healing traditions: Ayurvedic medicine from the Malabar coast, Balinese bodywork, and the cooling therapies of the Thai hill monasteries.
            </p>
            <p className="mt-4 leading-relaxed" style={{ fontSize: '15px', color: '#968B7F', lineHeight: 1.85 }}>
              Eight treatment rooms, a heated vitality pool, a hammam, and a meditation pavilion sit within a garden of healing plants — many of which are harvested directly for use in treatments.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="img-hover" style={{ height: '460px', background: '#2D3B2E' }}>
              <img
                src="https://images.unsplash.com/photo-1615880480595-f5f9b4fb530e?w=900&h=700&fit=crop&auto=format"
                alt="Spa garden and treatment pavilion"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Facilities strip */}
      <section className="py-12 px-6" style={{ background: '#EBE6DD' }}>
        <div className="max-w-screen-xl mx-auto">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
              {[
                { label: 'Treatment rooms', value: '8' },
                { label: 'Resident therapists', value: '14' },
                { label: 'Healing traditions', value: '3' },
                { label: 'Hours open daily', value: '14' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="text-center py-10 px-6"
                  style={{ borderLeft: i > 0 ? '1px solid rgba(138,114,86,0.2)' : 'none' }}
                >
                  <p className="display" style={{ fontSize: '52px', lineHeight: 1, color: '#8A7256' }}>{stat.value}</p>
                  <p className="text-xs tracking-widest uppercase mt-2" style={{ color: '#968B7F' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Treatments */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto">
          <Reveal className="mb-14">
            <p className="label mb-4">Signature treatments</p>
            <h2 className="display" style={{ fontSize: 'clamp(28px, 4vw, 50px)' }}>
              Selected rituals.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SPA_TREATMENTS.map((treatment, i) => (
              <Reveal key={treatment.name} delay={i * 80}>
                <div className="flex flex-col h-full">
                  <div className="img-hover" style={{ height: '280px', background: '#2D3B2E' }}>
                    <img
                      src={treatment.image}
                      alt={treatment.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <div className="flex-1 pt-5 pb-5 border-b" style={{ borderColor: 'rgba(138,114,86,0.2)' }}>
                    <h3 className="display" style={{ fontSize: '22px' }}>{treatment.name}</h3>
                    <div className="flex gap-4 mt-2 mb-4">
                      <span className="text-xs" style={{ color: '#8A7256' }}>{treatment.duration}</span>
                      <span className="text-xs" style={{ color: '#968B7F' }}>·</span>
                      <span className="text-xs font-medium" style={{ color: '#253227' }}>{treatment.price}</span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: '#968B7F', lineHeight: 1.8 }}>{treatment.description}</p>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={() => router.push('/booking')}
                      className="text-xs font-medium tracking-widest uppercase"
                      style={{ color: '#8A7256' }}
                    >
                      Book this treatment →
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-16 text-center">
            <p className="text-sm leading-relaxed max-w-md mx-auto mb-8" style={{ color: '#968B7F' }}>
              All treatments can be customised. In-villa spa services are available on request, and couples pavilion bookings are subject to availability.
            </p>
            <button onClick={() => router.push('/booking')} className="btn-primary" style={{ background: '#253227' }}>
              Book a treatment
            </button>
          </Reveal>
        </div>
      </section>

      {/* Wellness programs */}
      <section className="py-20 px-6" style={{ background: '#253227' }}>
        <div className="max-w-screen-xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
              <div>
                <p className="label mb-3" style={{ color: '#C6A97D' }}>Wellness programs</p>
                <h2 className="display text-ivory" style={{ fontSize: 'clamp(26px, 3.5vw, 46px)' }}>
                  Dedicated retreats<br />
                  <span className="display-italic">from 3 to 14 nights.</span>
                </h2>
              </div>
              <button onClick={() => router.push('/offers')} className="btn-ghost shrink-0">
                View retreat packages
              </button>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Detox & Reset', duration: '3 nights', description: 'A focused program of cleansing treatments, nutritional guidance, and gentle movement designed to restore baseline clarity.' },
              { name: 'Deep Rest', duration: '5 nights', description: 'Structured around sleep science and nervous system regulation — therapies, breathwork, and technology-free days.' },
              { name: 'Ayurvedic Journey', duration: '7 nights', description: 'A complete Ayurvedic consultation leads to a fully personalised week of traditional treatments and dietary protocol.' },
            ].map((prog, i) => (
              <Reveal key={prog.name} delay={i * 80}>
                <div className="p-6 border border-ivory/10 h-full">
                  <p className="label mb-3" style={{ color: '#8A7256' }}>{prog.duration}</p>
                  <h3 className="display text-ivory mb-3" style={{ fontSize: '22px' }}>{prog.name}</h3>
                  <p className="text-ivory/50 text-sm leading-relaxed" style={{ lineHeight: 1.8 }}>{prog.description}</p>
                  <button onClick={() => router.push('/booking')} className="mt-6 text-xs font-medium tracking-widest uppercase" style={{ color: '#C6A97D' }}>
                    Enquire →
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
