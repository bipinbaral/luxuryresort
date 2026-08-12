"use client";

import { useRouter } from 'next/navigation'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { OFFERS } from '@/data/resort'


function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useScrollReveal<HTMLDivElement>()
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

export default function Offers() {
  const router = useRouter();
  return (
    <div>
      {/* Header */}
      <section className="pt-36 pb-16 px-6 text-center" style={{ background: '#1C1A17' }}>
        <Reveal>
          <p className="label mb-4" style={{ color: '#8A7256' }}>Special offers</p>
          <h1 className="display text-ivory" style={{ fontSize: 'clamp(36px, 6vw, 80px)', lineHeight: 0.95 }}>
            Stay longer.<br />
            <span className="display-italic">Save more.</span>
          </h1>
          <p className="text-ivory/50 mt-6 max-w-lg mx-auto leading-relaxed" style={{ fontSize: '15px', lineHeight: 1.8 }}>
            Our offers are designed around how guests actually travel — with time, with intention, and with the desire for something genuinely curated.
          </p>
        </Reveal>
      </section>

      {/* Offers */}
      <section className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto flex flex-col gap-16">
          {OFFERS.map((offer, i) => (
            <Reveal key={offer.name} delay={i * 80}>
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden`} style={{ border: '1px solid rgba(138,114,86,0.2)' }}>
                <div className={`img-hover ${i % 2 !== 0 ? 'md:order-2' : ''}`} style={{ height: '420px', background: '#C8AD8F' }}>
                  <img
                    src={offer.image}
                    alt={offer.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div
                  className={`flex flex-col justify-center p-8 md:p-12 ${i % 2 !== 0 ? 'md:order-1' : ''}`}
                  style={{ background: '#FAF8F3' }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="text-xs font-medium tracking-widest uppercase px-3 py-1"
                      style={{ background: '#C6A97D', color: '#1C1A17' }}
                    >
                      {offer.badge}
                    </span>
                    <span className="text-xs tracking-wide" style={{ color: '#968B7F' }}>{offer.nights}</span>
                  </div>
                  <h2 className="display" style={{ fontSize: 'clamp(26px, 3.5vw, 44px)' }}>{offer.name}</h2>
                  <p className="text-xs tracking-widest uppercase mt-1 mb-6" style={{ color: '#8A7256' }}>{offer.saving}</p>
                  <div className="flex flex-col gap-2 mb-8">
                    {offer.includes.map(item => (
                      <div key={item} className="flex items-center gap-3 text-sm py-1">
                        <span style={{ width: '20px', height: '1px', background: '#8A7256', display: 'inline-block', flexShrink: 0 }} />
                        <span style={{ color: '#1C1A17' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs mb-6" style={{ color: '#968B7F' }}>{offer.valid}</p>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => router.push('/booking')} className="btn-primary" style={{ background: '#253227' }}>
                      Enquire about this offer
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Direct booking note */}
      <section className="py-16 px-6 text-center" style={{ background: '#EBE6DD' }}>
        <Reveal>
          <span className="gold-rule mx-auto block mb-6" />
          <h2 className="display" style={{ fontSize: 'clamp(22px, 3vw, 38px)' }}>
            Best rates guaranteed direct.
          </h2>
          <p className="mt-4 mb-8 max-w-md mx-auto text-sm leading-relaxed" style={{ color: '#968B7F' }}>
            Booking directly with Chautari always secures the best available rate, plus flexibility on cancellation that third-party platforms cannot offer.
          </p>
          <button onClick={() => router.push('/booking')} className="btn-primary" style={{ background: '#253227' }}>
            Enquire directly
          </button>
        </Reveal>
      </section>
    </div>
  )
}
