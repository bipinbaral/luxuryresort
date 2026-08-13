"use client";

import { useRouter } from 'next/navigation'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { EXPERIENCES } from '@/data/resort'


function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useScrollReveal<HTMLDivElement>()
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

export default function Experiences() {
  const router = useRouter();
  return (
    <div>
      {/* Hero */}
      <section
        className="relative flex items-end"
        style={{
          height: '70vh', minHeight: '480px',
          backgroundImage: 'url(https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=2000&h=900&fit=crop&auto=format)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20,18,15,0.1) 0%, rgba(20,18,15,0.72) 100%)' }} />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 pb-16 w-full">
          <p className="label mb-3" style={{ color: '#C6A97D' }}>Experiences</p>
          <h1 className="display text-ivory" style={{ fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 0.95 }}>
            The island has<br />
            <span className="display-italic">a thousand faces.</span>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 px-6 max-w-2xl mx-auto text-center">
        <Reveal>
          <span className="gold-rule mx-auto block mb-6" />
          <p className="leading-relaxed" style={{ fontSize: '16px', color: '#968B7F', lineHeight: 1.8 }}>
            From the reef below the surface to the canopy above, every facet of Pumdikot is yours to explore. Our experiences team curates adventures from the exhilarating to the profoundly still.
          </p>
        </Reveal>
      </section>

      {/* Experiences grid */}
      <section className="pb-24 px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {EXPERIENCES.map((exp, i) => (
              <Reveal key={exp.id} delay={i * 80}>
                <div className="group">
                  <div className="img-hover" style={{ height: '360px', background: '#2D3B2E', position: 'relative' }}>
                    <img
                      src={exp.image}
                      alt={exp.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,18,15,0.65) 0%, transparent 50%)' }} />
                    <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px' }}>
                      <span className="label" style={{ color: '#C6A97D' }}>{exp.category}</span>
                      <h2 className="display text-ivory mt-1" style={{ fontSize: '26px' }}>{exp.name}</h2>
                    </div>
                  </div>
                  <div className="pt-5 pb-5 border-b" style={{ borderColor: 'rgba(138,114,86,0.2)' }}>
                    <p className="display-italic mb-3" style={{ fontSize: '15px', color: '#8A7256' }}>{exp.tagline}</p>
                    <p className="text-sm leading-relaxed" style={{ color: '#968B7F', lineHeight: 1.75 }}>{exp.description}</p>
                    <div className="flex items-center justify-between mt-5">
                      <div className="flex gap-5 text-xs" style={{ color: '#968B7F' }}>
                        <span className="flex items-center gap-2">
                          <span style={{ width: '14px', height: '1px', background: '#8A7256', display: 'inline-block' }} />
                          {exp.duration}
                        </span>
                        <span className="flex items-center gap-2">
                          <span style={{ width: '14px', height: '1px', background: '#8A7256', display: 'inline-block' }} />
                          {exp.price}
                        </span>
                      </div>
                      <button
                        onClick={() => router.push('/booking')}
                        className="text-xs font-medium tracking-widest uppercase px-4 py-2.5"
                        style={{ border: '1px solid rgba(28,26,23,0.25)', color: '#1C1A17' }}
                      >
                        Enquire
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke section */}
      <section
        className="py-24 relative"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1553602932-f93f674a9aaa?w=1800&h=700&fit=crop&auto=format)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(37,50,39,0.82)' }} />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <span className="gold-rule mx-auto block mb-6" />
            <h2 className="display text-ivory" style={{ fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15 }}>
              We also design<br />
              <span className="display-italic">entirely bespoke days.</span>
            </h2>
            <p className="text-ivory/60 mt-5 mb-10 leading-relaxed" style={{ fontSize: '15px', lineHeight: 1.8 }}>
              Private astronomy sessions, guided meditation at dawn, chartering a traditional dhow for a week — our concierge team has arranged them all. Tell us what you dream of.
            </p>
            <button onClick={() => router.push('/booking')} className="btn-ghost">
              Speak with our concierge
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
