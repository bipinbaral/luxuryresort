"use client";

import { useRouter } from 'next/navigation'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { DINING } from '@/data/resort'


function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useScrollReveal<HTMLDivElement>()
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

export default function Dining() {
  const router = useRouter();
  return (
    <div>
      {/* Hero */}
      <section
        className="relative flex items-end"
        style={{
          height: '70vh', minHeight: '480px',
          backgroundImage: 'url(https://images.unsplash.com/photo-1779265298717-e3b21e7973e7?w=2000&h=1000&fit=crop&auto=format)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20,18,15,0.15) 0%, rgba(20,18,15,0.78) 100%)' }} />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 pb-16 w-full">
          <p className="label mb-3" style={{ color: '#C6A97D' }}>Dining</p>
          <h1 className="display text-ivory" style={{ fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 0.95 }}>
            Three venues,<br />
            <span className="display-italic">one ocean.</span>
          </h1>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 px-6">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <p className="label mb-4">Our philosophy</p>
            <h2 className="display" style={{ fontSize: 'clamp(26px, 3.5vw, 46px)', lineHeight: 1.15 }}>
              The ocean provides.<br />
              <span className="display-italic">We simply listen.</span>
            </h2>
            <p className="mt-6 leading-relaxed" style={{ fontSize: '15px', color: '#968B7F', lineHeight: 1.85 }}>
              Executive Chef Arun Kapila was born on the Malabar Coast and trained under three Michelin-starred kitchens before returning to the Indian Ocean he grew up reading. Every menu at Chautari begins with what arrived on the dock that morning.
            </p>
            <p className="mt-4 leading-relaxed" style={{ fontSize: '15px', color: '#968B7F', lineHeight: 1.85 }}>
              Our herb and spice garden — tended by four gardeners — provides fragrant punctuation to a cuisine rooted in restraint and respect.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="img-hover" style={{ height: '440px', background: '#C8AD8F' }}>
              <img
                src="https://images.unsplash.com/photo-1762958118340-6d09cfe236a5?w=900&h=700&fit=crop&auto=format"
                alt="Table setting at Seabreeze"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Restaurants */}
      <section className="pb-24 px-6 md:px-12" style={{ background: '#FAF8F3' }}>
        <div className="max-w-screen-xl mx-auto pt-16">
          <Reveal className="mb-14">
            <p className="label mb-4">Our restaurants</p>
            <h2 className="display" style={{ fontSize: 'clamp(28px, 4vw, 50px)' }}>
              Every meal, a different world.
            </h2>
          </Reveal>

          <div className="flex flex-col gap-20">
            {DINING.map((restaurant, i) => (
              <Reveal key={restaurant.name} delay={i * 80}>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center ${i % 2 !== 0 ? 'md:[direction:rtl]' : ''}`}>
                  <div className={i % 2 !== 0 ? 'md:[direction:ltr]' : ''}>
                    <div className="img-hover" style={{ height: '400px', background: '#C8AD8F' }}>
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                  </div>
                  <div className={i % 2 !== 0 ? 'md:[direction:ltr]' : ''}>
                    <span className="label">{restaurant.type}</span>
                    <h2 className="display mt-3" style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}>{restaurant.name}</h2>
                    <p className="display-italic mt-2 mb-6" style={{ fontSize: '18px', color: '#8A7256' }}>{restaurant.tagline}</p>
                    <p className="leading-relaxed" style={{ fontSize: '15px', color: '#968B7F', lineHeight: 1.85 }}>{restaurant.description}</p>
                    <div className="mt-8 flex flex-col gap-3">
                      <div className="flex gap-4 text-sm py-3 border-b" style={{ borderColor: 'rgba(138,114,86,0.2)' }}>
                        <span className="font-medium" style={{ color: '#8A7256', width: '80px', flexShrink: 0 }}>Hours</span>
                        <span style={{ color: '#1C1A17' }}>{restaurant.hours}</span>
                      </div>
                      <div className="flex gap-4 text-sm py-3 border-b" style={{ borderColor: 'rgba(138,114,86,0.2)' }}>
                        <span className="font-medium" style={{ color: '#8A7256', width: '80px', flexShrink: 0 }}>Dress</span>
                        <span style={{ color: '#1C1A17' }}>{restaurant.dress}</span>
                      </div>
                    </div>
                    <button onClick={() => router.push('/booking')} className="btn-outline mt-8">
                      Reserve a table
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Private dining */}
      <section className="py-20 px-6" style={{ background: '#1C1A17' }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <Reveal>
              <p className="label mb-4" style={{ color: '#8A7256' }}>Private dining</p>
              <h2 className="display text-ivory" style={{ fontSize: 'clamp(28px, 4vw, 50px)', lineHeight: 1.1 }}>
                A table set<br />
                <span className="display-italic">for two, anywhere.</span>
              </h2>
              <p className="mt-6 leading-relaxed text-ivory/55" style={{ fontSize: '15px', lineHeight: 1.85 }}>
                Your villa deck over the lagoon. A sandbank at low tide. The rooftop of the spa pavilion at midnight. Our kitchen travels wherever you wish to dine. Private dining experiences are available at any hour, with advance arrangement.
              </p>
              <button onClick={() => router.push('/booking')} className="btn-ghost mt-10">
                Enquire about private dining
              </button>
            </Reveal>
            <Reveal delay={150}>
              <div className="img-hover" style={{ height: '400px', background: '#2E2C29' }}>
                <img
                  src="https://images.unsplash.com/photo-1625668931397-b9c35f63186b?w=900&h=700&fit=crop&auto=format"
                  alt="Private dining table setting"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
