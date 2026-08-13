"use client";

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useScrollReveal } from '@/hooks/useScrollReveal'

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useScrollReveal<HTMLDivElement>()
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

export default function Contact() {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startTransition(async () => {
      await new Promise(resolve => setTimeout(resolve, 600))
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <span className="gold-rule mx-auto block mb-8" />
        <h1 className="display" style={{ fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1 }}>Message sent.</h1>
        <p className="mt-6 max-w-md mx-auto leading-relaxed" style={{ fontSize: '15px', color: '#4F5B63', lineHeight: 1.8 }}>
          We will get back to you shortly.
        </p>
        <button onClick={() => router.push('/')} className="btn-primary mt-10" style={{ background: '#285943' }}>
          Return home
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <section
        className="relative flex items-end"
        style={{
          height: '55vh', minHeight: '380px',
          backgroundImage: 'url(https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=2000&h=900&fit=crop&auto=format)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20,18,15,0.2) 0%, rgba(20,18,15,0.72) 100%)' }} />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 pb-16 w-full">
          <p className="label mb-3" style={{ color: '#E6D2B5' }}>Contact</p>
          <h1 className="display text-ivory" style={{ fontSize: 'clamp(36px, 5vw, 70px)', lineHeight: 0.95 }}>
            We are always<br />
            <span className="display-italic">here.</span>
          </h1>
        </div>
      </section>

      {/* Contact info + form */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left — info */}
          <Reveal>
            <p className="label mb-8">Get in touch</p>
            <div className="flex flex-col gap-8">
              {[
                {
                  heading: 'Reservations',
                  lines: ['+960 660 0001', 'reservations@chautari.com', 'Open 24 hours, 7 days'],
                },
                {
                  heading: 'General enquiries',
                  lines: ['hello@chautari.com'],
                },
                {
                  heading: 'Address',
                  lines: ['Pumdikot', 'Pokhara, Nepal', '33700'],
                },
                {
                  heading: 'Seaplane transfers',
                  lines: ['Departing from Terminal 5,', 'Velana International Airport (MLE)', 'Transfers coordinated on booking'],
                },
              ].map(item => (
                <div key={item.heading} className="pb-8 border-b" style={{ borderColor: 'rgba(217, 184, 140,0.2)' }}>
                  <p className="label mb-3">{item.heading}</p>
                  {item.lines.map(line => (
                    <p key={line} className="text-sm leading-relaxed" style={{ color: '#061A2F' }}>{line}</p>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-10">
              <p className="label mb-5">Follow along</p>
              <div className="flex gap-5">
                {['Instagram', 'Facebook', 'YouTube'].map(platform => (
                  <button
                    key={platform}
                    className="text-xs font-medium tracking-widest uppercase link-underline"
                    style={{ color: '#8A7256' }}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right — form */}
          <Reveal delay={150}>
            <p className="label mb-8">Send a message</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="label block mb-2">First name</label>
                  <input name="name" type="text" placeholder="First name" required className="form-input" />
                </div>
                <div>
                  <label className="label block mb-2">Last name</label>
                  <input type="text" placeholder="Last name" className="form-input" />
                </div>
              </div>
              <div>
                <label className="label block mb-2">Email</label>
                <input name="email" type="email" placeholder="your@email.com" required className="form-input" />
              </div>
              <div>
                <label className="label block mb-2">Phone (optional)</label>
                <input name="phone" type="tel" placeholder="+1 000 000 0000" className="form-input" />
              </div>
              <div>
                <label className="label block mb-2">Subject</label>
                <select name="subject" className="form-select">
                  <option value="">Select a topic</option>
                  <option>Reservation enquiry</option>
                  <option>Special occasion planning</option>
                  <option>Spa & wellness</option>
                  <option>Dining reservation</option>
                  <option>Travel logistics</option>
                  <option>General enquiry</option>
                </select>
              </div>
              <div>
                <label className="label block mb-2">Message</label>
                <textarea
                  name="message"
                  required
                  className="form-input"
                  placeholder="Tell us what you need..."
                  rows={5}
                  style={{ resize: 'vertical' }}
                />
              </div>
              <div>
                <button type="submit" disabled={isPending} className="btn-primary" style={{ background: '#285943', opacity: isPending ? 0.7 : 1 }}>
                  {isPending ? 'Sending...' : 'Send message'}
                </button>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#4F5B63' }}>
                We typically respond within 4 hours. For urgent enquiries, please call our reservations line directly.
              </p>
            </form>
          </Reveal>
        </div>
      </section>

      {/* Map placeholder */}
      <section style={{ height: '400px', background: '#1F4A36', position: 'relative', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=1600&h=500&fit=crop&auto=format&sat=-30"
          alt="Pumdikot location"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(0.4) brightness(0.7)' }}
        />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            className="text-center"
            style={{ background: 'rgba(252, 252, 250,0.95)', padding: '28px 40px', border: '1px solid rgba(217, 184, 140,0.3)' }}
          >
            <p className="display" style={{ fontSize: '20px', color: '#061A2F' }}>Chautari Resort & Spa</p>
            <p className="text-xs tracking-widest uppercase mt-1" style={{ color: '#8A7256' }}>Pumdikot · Pokhara · Nepal</p>
            <p className="text-xs mt-2" style={{ color: '#4F5B63' }}>5°12′N, 73°01′E</p>
          </div>
        </div>
      </section>

      {/* Quick reserve */}
      <section className="py-16 px-6 text-center" style={{ background: '#F2EBE1' }}>
        <Reveal>
          <p className="label mb-4">Ready to visit?</p>
          <h2 className="display" style={{ fontSize: 'clamp(22px, 3vw, 38px)' }}>
            Make a reservation enquiry.
          </h2>
          <button onClick={() => router.push('/booking')} className="btn-primary mt-8" style={{ background: '#285943' }}>
            Enquire & Reserve
          </button>
        </Reveal>
      </section>
    </div>
  )
}
