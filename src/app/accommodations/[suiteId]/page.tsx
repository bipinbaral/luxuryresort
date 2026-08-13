"use client";

import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SUITES } from '@/data/resort'

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useScrollReveal<HTMLDivElement>()
  return <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

export default function SuiteDetail({ params }: { params: Promise<{ suiteId: string }> }) {
  const router = useRouter()
  const { suiteId } = use(params)
  
  const suite = SUITES.find(s => s.id === suiteId) || SUITES[0]
  const [activeImg, setActiveImg] = useState(0)
  const allImages = [suite.image, ...suite.gallery]
  const related = SUITES.filter(s => s.id !== suite.id).slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="relative" style={{ height: '80vh', minHeight: '500px' }}>
        <img
          src={allImages[activeImg]}
          alt={suite.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transition: 'opacity 0.5s ease',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20,18,15,0.15) 0%, rgba(20,18,15,0.65) 100%)' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 text-center px-6">
          <span className="label" style={{ color: '#285943', marginBottom: '10px' }}>{suite.category}</span>
          <h1 className="display text-ivory" style={{ fontSize: 'clamp(40px, 7vw, 90px)', lineHeight: 0.95 }}>{suite.name}</h1>
          <p className="display-italic text-ivory/70 mt-3" style={{ fontSize: 'clamp(14px, 2vw, 22px)' }}>{suite.tagline}</p>
        </div>
        {/* Thumbnail strip */}
        <div className="absolute bottom-4 right-4 md:right-8 flex gap-2">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              style={{
                width: '60px', height: '42px',
                border: `2px solid ${activeImg === i ? '#E6D2B5' : 'transparent'}`,
                overflow: 'hidden',
                transition: 'border-color 0.3s',
              }}
            >
              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="py-4 px-6 md:px-12 border-b" style={{ borderColor: 'rgba(217, 184, 140,0.2)' }}>
        <div className="max-w-screen-xl mx-auto flex items-center gap-3 text-xs tracking-wide" style={{ color: '#4F5B63' }}>
          <button onClick={() => router.push('/')} className="hover:text-stone transition-colors">Home</button>
          <span style={{ color: 'rgba(217, 184, 140,0.4)' }}>—</span>
          <button onClick={() => router.push('/accommodations')} className="hover:text-stone transition-colors">Accommodations</button>
          <span style={{ color: 'rgba(217, 184, 140,0.4)' }}>—</span>
          <span style={{ color: '#061A2F' }}>{suite.name}</span>
        </div>
      </div>

      {/* Main content */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Left — description */}
            <div className="lg:col-span-2">
              <Reveal>
                <p className="label mb-4">About this villa</p>
                <h2 className="display" style={{ fontSize: 'clamp(26px, 3vw, 42px)', lineHeight: 1.15 }}>
                  {suite.description.split('.')[0]}.
                </h2>
                <p className="mt-6 leading-relaxed" style={{ fontSize: '15px', color: '#4F5B63', lineHeight: 1.85 }}>
                  {suite.description}
                </p>
              </Reveal>

              {/* Gallery grid */}
              <Reveal delay={100}>
                <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-3">
                  {suite.gallery.map((img, i) => (
                    <div
                      key={i}
                      className="img-hover cursor-pointer"
                      style={{ height: '200px', background: '#E6D2B5' }}
                      onClick={() => setActiveImg(i + 1)}
                    >
                      <img src={img} alt={`${suite.name} gallery ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Features */}
              <Reveal delay={150}>
                <div className="mt-14">
                  <p className="label mb-6">Villa features</p>
                  <div className="grid grid-cols-2 gap-3">
                    {suite.features.map(f => (
                      <div key={f} className="flex items-center gap-3 py-3 border-b" style={{ borderColor: 'rgba(217, 184, 140,0.18)' }}>
                        <span style={{ width: '20px', height: '1px', background: '#8A7256', display: 'inline-block', flexShrink: 0 }} />
                        <span className="text-sm" style={{ color: '#061A2F' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Additional amenities */}
              <Reveal delay={200}>
                <div className="mt-12">
                  <p className="label mb-6">All villas include</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['King-size bed', 'Bathrobes & slippers', 'Nespresso machine', 'Minibar', 'In-villa safe', 'High-speed WiFi', 'Smart TV & streaming', 'Turn-down service', 'Butler service'].map(a => (
                      <div key={a} className="text-sm py-2" style={{ color: '#4F5B63' }}>
                        <span style={{ color: '#8A7256', marginRight: '8px' }}>◦</span>{a}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right — booking card */}
            <div className="lg:col-span-1">
              <Reveal>
                <div
                  className="sticky top-24 p-8"
                  style={{ background: '#FCFCFA', border: '1px solid rgba(217, 184, 140,0.2)' }}
                >
                  <span className="label mb-3 block">{suite.category}</span>
                  <h3 className="display" style={{ fontSize: '26px' }}>{suite.name}</h3>
                  <p className="display-italic mt-1 mb-5" style={{ fontSize: '15px', color: '#8A7256' }}>{suite.tagline}</p>
                  <div className="border-t border-b py-4 mb-5" style={{ borderColor: 'rgba(217, 184, 140,0.2)' }}>
                    <div className="flex justify-between text-sm mb-2">
                      <span style={{ color: '#4F5B63' }}>Size</span>
                      <span style={{ color: '#061A2F' }}>{suite.size}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span style={{ color: '#4F5B63' }}>Max guests</span>
                      <span style={{ color: '#061A2F' }}>{suite.guests} adults</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: '#4F5B63' }}>Rate</span>
                      <span className="font-medium" style={{ color: '#285943' }}>{suite.price}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => router.push('/booking')}
                    className="btn-primary w-full justify-center"
                    style={{ background: '#285943' }}
                  >
                    Enquire & Reserve
                  </button>
                  <button
                    onClick={() => router.push('/booking')}
                    className="btn-outline w-full justify-center mt-3"
                  >
                    Check availability
                  </button>
                  <p className="text-center text-xs mt-5 leading-relaxed" style={{ color: '#4F5B63' }}>
                    Complimentary seaplane transfers for stays of 5+ nights. Rates are per villa per night, exclusive of taxes.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Related suites */}
      <section className="py-20 px-6 md:px-12" style={{ background: '#F2EBE1' }}>
        <div className="max-w-screen-xl mx-auto">
          <Reveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="label mb-3">You may also like</p>
                <h2 className="display" style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}>Other villas</h2>
              </div>
              <button onClick={() => router.push('/accommodations')} className="btn-outline hidden md:inline-flex">View all</button>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((s, i) => (
              <Reveal key={s.id} delay={i * 100}>
                <div className="group cursor-pointer" onClick={() => router.push(`/accommodations/${s.id}`)}>
                  <div className="img-hover" style={{ height: '260px', background: '#E6D2B5' }}>
                    <img src={s.image} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div className="pt-4">
                    <span className="label">{s.category}</span>
                    <h3 className="display mt-1" style={{ fontSize: '20px' }}>{s.name}</h3>
                    <p className="text-sm mt-1" style={{ color: '#8A7256' }}>{s.price}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
