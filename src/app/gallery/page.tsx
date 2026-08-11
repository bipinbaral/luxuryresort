"use client";

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { GALLERY_IMAGES } from '@/data/resort'


function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useScrollReveal<HTMLDivElement>()
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

export default function Gallery() {
  const router = useRouter();
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <div style={{ background: '#1C1A17', minHeight: '100vh' }}>
      {/* Header */}
      <section className="pt-36 pb-14 px-6 md:px-12 text-center" style={{ background: '#1C1A17' }}>
        <Reveal>
          <p className="label mb-4" style={{ color: '#8A7256' }}>Gallery</p>
          <h1 className="display text-ivory" style={{ fontSize: 'clamp(36px, 6vw, 76px)', lineHeight: 0.95 }}>
            The island<br />
            <span className="display-italic">through every lens.</span>
          </h1>
        </Reveal>
      </section>

      {/* Masonry-style grid */}
      <section className="pb-24 px-4 md:px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {GALLERY_IMAGES.map((img, i) => (
              <Reveal
                key={i}
                delay={i * 40}
                className={`${img.aspect === 'tall' ? 'row-span-2' : img.aspect === 'wide' ? 'col-span-2' : ''}`}
              >
                <div
                  className="img-hover cursor-pointer w-full"
                  style={{
                    height: img.aspect === 'tall' ? '500px' : img.aspect === 'wide' ? '260px' : '260px',
                    background: '#2E2C29',
                  }}
                  onClick={() => setLightbox(i)}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(20,18,15,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={() => setLightbox(null)}
        >
          <button
            style={{ position: 'absolute', top: '24px', right: '32px', color: '#FAF8F3', fontSize: '28px', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.7 }}
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          <button
            style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: '#FAF8F3', fontSize: '28px', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6 }}
            onClick={e => { e.stopPropagation(); setLightbox(i => i !== null && i > 0 ? i - 1 : GALLERY_IMAGES.length - 1) }}
          >
            ‹
          </button>
          <img
            src={GALLERY_IMAGES[lightbox].url.replace(/w=\d+/, 'w=1600').replace(/h=\d+/, 'h=1000')}
            alt={GALLERY_IMAGES[lightbox].alt}
            style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', display: 'block' }}
            onClick={e => e.stopPropagation()}
          />
          <button
            style={{ position: 'absolute', right: '80px', top: '50%', transform: 'translateY(-50%)', color: '#FAF8F3', fontSize: '28px', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6 }}
            onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? (i + 1) % GALLERY_IMAGES.length : 0) }}
          >
            ›
          </button>
          <p style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', color: 'rgba(250,248,243,0.45)', fontSize: '12px', letterSpacing: '0.1em' }}>
            {lightbox + 1} / {GALLERY_IMAGES.length} — {GALLERY_IMAGES[lightbox].alt}
          </p>
        </div>
      )}

      {/* CTA */}
      <section className="py-16 px-6 text-center" style={{ background: '#1C1A17' }}>
        <Reveal>
          <h2 className="display text-ivory" style={{ fontSize: 'clamp(22px, 3vw, 38px)' }}>
            Come and add your own story.
          </h2>
          <button onClick={() => router.push('/booking')} className="btn-ghost mt-8">
            Plan your stay
          </button>
        </Reveal>
      </section>
    </div>
  )
}
