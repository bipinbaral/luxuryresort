"use client";

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SUITES } from '@/data/resort'

function RevealSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useScrollReveal<HTMLDivElement>()
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

const FILTERS = ['All', 'Overwater', 'Garden & Pool', 'Clifftop', 'Beachfront', 'Ultimate']

export default function Accommodations() {
  const router = useRouter()
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? SUITES : SUITES.filter(s => s.category === filter)

  return (
    <div>
      {/* Hero */}
      <section
        className="relative flex items-end"
        style={{
          height: '65vh', minHeight: '420px',
          backgroundImage: 'url(https://images.unsplash.com/photo-1590490359854-dfba19688d70?w=2000&h=900&fit=crop&auto=format)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20,18,15,0.2) 0%, rgba(20,18,15,0.7) 100%)' }} />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 pb-16 md:pb-20 w-full">
          <p className="label" style={{ color: '#C6A97D', marginBottom: '12px' }}>Accommodations</p>
          <h1 className="display text-ivory" style={{ fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 0.95 }}>
            Your villa awaits.<br />
            <span className="display-italic">Choose your view.</span>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <RevealSection>
            <span className="gold-rule mx-auto block mb-6" />
            <p className="leading-relaxed" style={{ fontSize: '16px', color: '#968B7F', lineHeight: 1.8 }}>
              Forty-two villas, pavilions, and residences — each crafted from natural materials that age with grace. From overwater retreats to clifftop sanctuaries, every accommodation is designed to dissolve the boundary between you and the island.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Filter bar */}
      <section className="pb-12 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="label mr-4">Filter by</span>
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-5 py-2 text-xs font-medium tracking-widest uppercase transition-all"
                style={{
                  border: `1px solid ${filter === f ? '#1C1A17' : 'rgba(28,26,23,0.2)'}`,
                  background: filter === f ? '#1C1A17' : 'transparent',
                  color: filter === f ? '#FAF8F3' : '#968B7F',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Suite Grid */}
      <section className="pb-24 px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {filtered.map((suite, i) => (
              <RevealSection key={suite.id} delay={i * 80}>
                <div
                  className="group cursor-pointer"
                  onClick={() => router.push(`/accommodations/${suite.id}`)}
                >
                  <div className="img-hover" style={{ height: '400px', background: '#C8AD8F' }}>
                    <img
                      src={suite.image}
                      alt={suite.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(20,18,15,0)',
                        transition: 'background 0.4s ease',
                      }}
                      className="group-hover:opacity-100"
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    >
                      <span className="btn-ghost">Discover Suite</span>
                    </div>
                  </div>
                  <div className="pt-6 pb-4 border-b" style={{ borderColor: 'rgba(138,114,86,0.2)' }}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="label">{suite.category}</span>
                        <h2 className="display mt-2" style={{ fontSize: '28px' }}>{suite.name}</h2>
                        <p className="display-italic mt-1" style={{ fontSize: '15px', color: '#8A7256' }}>{suite.tagline}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-medium text-sm" style={{ color: '#253227' }}>{suite.price}</p>
                        <p className="text-xs mt-1" style={{ color: '#968B7F' }}>{suite.size} · {suite.guests} guests</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed" style={{ color: '#968B7F', lineHeight: 1.75 }}>{suite.description.slice(0, 140)}…</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {suite.features.slice(0, 3).map(f => (
                        <span
                          key={f}
                          className="text-xs px-3 py-1.5 tracking-wide"
                          style={{ background: '#EBE6DD', color: '#8A7256' }}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 flex items-center justify-between">
                    <span
                      className="text-xs font-medium tracking-widest uppercase"
                      style={{ color: '#8A7256' }}
                    >
                      View suite details →
                    </span>
                    <button
                      onClick={e => { e.stopPropagation(); router.push('/booking') }}
                      className="text-xs font-medium tracking-widest uppercase px-4 py-2 border"
                      style={{ borderColor: 'rgba(28,26,23,0.25)', color: '#1C1A17' }}
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center" style={{ background: '#EBE6DD' }}>
        <RevealSection>
          <p className="label mb-4">Not sure which suite is right for you?</p>
          <h2 className="display" style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}>Let us help you decide.</h2>
          <p className="mt-4 mb-8 text-sm leading-relaxed max-w-md mx-auto" style={{ color: '#968B7F' }}>
            Our reservations team is available 24 hours and can match you to the perfect villa based on your preferences, dates, and occasion.
          </p>
          <button onClick={() => router.push('/booking')} className="btn-primary" style={{ background: '#253227' }}>
            Send an Enquiry
          </button>
        </RevealSection>
      </section>
    </div>
  )
}
