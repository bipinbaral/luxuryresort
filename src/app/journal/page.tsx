"use client";

import { useRouter } from 'next/navigation'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { JOURNAL_POSTS } from '@/data/resort'


function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useScrollReveal<HTMLDivElement>()
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

export default function Journal() {
  const router = useRouter();
  return (
    <div>
      {/* Header */}
      <section className="pt-36 pb-16 px-6">
        <div className="max-w-screen-xl mx-auto">
          <Reveal>
            <p className="label mb-4">Journal</p>
            <h1 className="display" style={{ fontSize: 'clamp(40px, 6vw, 84px)', lineHeight: 0.95 }}>
              Stories from<br />
              <span className="display-italic">the island.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Featured post */}
      <section className="pb-12 px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto">
          <Reveal>
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-0 cursor-pointer group"
              style={{ border: '1px solid rgba(217, 184, 140,0.2)' }}
            >
              <div className="img-hover" style={{ height: '480px', background: '#E6D2B5' }}>
                <img
                  src={JOURNAL_POSTS[0].image}
                  alt={JOURNAL_POSTS[0].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12" style={{ background: '#FCFCFA' }}>
                <div className="flex items-center gap-4 mb-5">
                  <span
                    className="text-xs font-medium tracking-widest uppercase px-3 py-1"
                    style={{ background: '#F2EBE1', color: '#8A7256' }}
                  >
                    {JOURNAL_POSTS[0].category}
                  </span>
                  <span className="text-xs" style={{ color: '#285943' }}>{JOURNAL_POSTS[0].readTime}</span>
                </div>
                <h2 className="display" style={{ fontSize: 'clamp(24px, 3vw, 40px)', lineHeight: 1.15 }}>
                  {JOURNAL_POSTS[0].title}
                </h2>
                <p className="mt-4 leading-relaxed" style={{ fontSize: '14px', color: '#4F5B63', lineHeight: 1.8 }}>
                  {JOURNAL_POSTS[0].excerpt}
                </p>
                <div className="flex items-center gap-4 mt-8">
                  <div className="w-8 h-8 rounded-full bg-mist flex items-center justify-center text-xs font-medium" style={{ background: '#F2EBE1', color: '#8A7256' }}>
                    {JOURNAL_POSTS[0].author.split(' ')[0][0]}
                  </div>
                  <div>
                    <p className="text-xs font-medium" style={{ color: '#061A2F' }}>{JOURNAL_POSTS[0].author}</p>
                    <p className="text-xs" style={{ color: '#285943' }}>{JOURNAL_POSTS[0].date}</p>
                  </div>
                </div>
                <span className="text-xs font-medium tracking-widest uppercase mt-8" style={{ color: '#8A7256' }}>
                  Read this story →
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Other posts grid */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {JOURNAL_POSTS.slice(1).map((post, i) => (
              <Reveal key={post.slug} delay={i * 80}>
                <div className="group cursor-pointer">
                  <div className="img-hover" style={{ height: '280px', background: '#E6D2B5' }}>
                    <img
                      src={post.image}
                      alt={post.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <div className="pt-5 pb-5 border-b" style={{ borderColor: 'rgba(217, 184, 140,0.2)' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="label">{post.category}</span>
                      <span className="text-xs" style={{ color: '#285943' }}>{post.readTime}</span>
                    </div>
                    <h3 className="display" style={{ fontSize: '20px', lineHeight: 1.2 }}>{post.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: '#4F5B63', lineHeight: 1.75 }}>
                      {post.excerpt.slice(0, 100)}…
                    </p>
                    <div className="flex items-center justify-between mt-5">
                      <p className="text-xs" style={{ color: '#285943' }}>{post.date}</p>
                      <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#8A7256' }}>Read →</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-6 text-center" style={{ background: '#F2EBE1' }}>
        <Reveal>
          <span className="gold-rule mx-auto block mb-6" />
          <h2 className="display" style={{ fontSize: 'clamp(22px, 3vw, 38px)' }}>
            Stories, rarely sent.
          </h2>
          <p className="mt-3 mb-8 text-sm max-w-sm mx-auto leading-relaxed" style={{ color: '#4F5B63' }}>
            Join our list and receive occasional dispatches from the island — offers, new experiences, and quiet moments worth sharing.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="form-input flex-1"
              style={{ textAlign: 'left' }}
            />
            <button className="btn-primary" style={{ background: '#285943', whiteSpace: 'nowrap' }}>
              Subscribe
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
