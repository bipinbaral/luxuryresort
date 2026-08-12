"use client";

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SUITES } from '@/data/resort'
import { submitBookingEnquiry } from '@/app/actions/booking'

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useScrollReveal<HTMLDivElement>()
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

export default function BookingEnquiry() {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [isPending, startTransition] = useTransition()
  
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    arrivalDate: '', departureDate: '', adults: '2', children: '0',
    suite: '', occasion: '', budget: '', requests: '',
    newsletter: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target
    setFormData(prev => ({
      ...prev,
      [target.name]: target instanceof HTMLInputElement && target.type === 'checkbox' ? target.checked : target.value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    startTransition(async () => {
      const res = await submitBookingEnquiry(data)
      if (res.success) {
        setSubmitted(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    })
  }

  if (submitted) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center text-center px-6"
        style={{ paddingTop: '80px', paddingBottom: '80px' }}
      >
        <span className="gold-rule mx-auto block mb-8" />
        <p className="label mb-4" style={{ color: '#8A7256' }}>Enquiry received</p>
        <h1 className="display" style={{ fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1 }}>
          Thank you,<br />
          <span className="display-italic">{formData.firstName || 'valued guest'}.</span>
        </h1>
        <p className="mt-6 max-w-md mx-auto leading-relaxed" style={{ fontSize: '15px', color: '#968B7F', lineHeight: 1.8 }}>
          Your enquiry has been received. A member of our reservations team will be in contact within four hours to discuss your stay and confirm availability.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <button onClick={() => router.push('/')} className="btn-primary" style={{ background: '#253227' }}>
            Return home
          </button>
          <button onClick={() => router.push('/accommodations')} className="btn-outline">
            Explore suites
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <section
        className="relative flex items-end"
        style={{
          height: '50vh', minHeight: '360px',
          backgroundImage: 'url(https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1800&h=800&fit=crop&auto=format)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20,18,15,0.2) 0%, rgba(20,18,15,0.75) 100%)' }} />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 pb-16 w-full">
          <p className="label mb-3" style={{ color: '#C6A97D' }}>Reserve</p>
          <h1 className="display text-ivory" style={{ fontSize: 'clamp(36px, 5vw, 70px)', lineHeight: 0.95 }}>
            Begin your<br />
            <span className="display-italic">Chautari journey.</span>
          </h1>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Form */}
            <div className="lg:col-span-2">
              <Reveal>
                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                  {/* Personal details */}
                  <fieldset className="flex flex-col gap-6">
                    <legend className="label mb-2">Your details</legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs font-medium block mb-2" style={{ color: '#8A7256' }}>First name *</label>
                        <input name="firstName" required value={formData.firstName} onChange={handleChange} placeholder="First name" className="form-input" />
                      </div>
                      <div>
                        <label className="text-xs font-medium block mb-2" style={{ color: '#8A7256' }}>Last name *</label>
                        <input name="lastName" required value={formData.lastName} onChange={handleChange} placeholder="Last name" className="form-input" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs font-medium block mb-2" style={{ color: '#8A7256' }}>Email address *</label>
                        <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="your@email.com" className="form-input" />
                      </div>
                      <div>
                        <label className="text-xs font-medium block mb-2" style={{ color: '#8A7256' }}>Phone number</label>
                        <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+1 000 000 0000" className="form-input" />
                      </div>
                    </div>
                  </fieldset>

                  <hr style={{ border: 'none', borderTop: '1px solid rgba(138,114,86,0.2)' }} />

                  {/* Stay details */}
                  <fieldset className="flex flex-col gap-6">
                    <legend className="label mb-2">Your stay</legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs font-medium block mb-2" style={{ color: '#8A7256' }}>Arrival date *</label>
                        <input name="arrivalDate" type="date" required value={formData.arrivalDate} onChange={handleChange} className="form-input" style={{ color: formData.arrivalDate ? '#1C1A17' : '#968B7F' }} />
                      </div>
                      <div>
                        <label className="text-xs font-medium block mb-2" style={{ color: '#8A7256' }}>Departure date *</label>
                        <input name="departureDate" type="date" required value={formData.departureDate} onChange={handleChange} className="form-input" style={{ color: formData.departureDate ? '#1C1A17' : '#968B7F' }} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                      <div>
                        <label className="text-xs font-medium block mb-2" style={{ color: '#8A7256' }}>Adults</label>
                        <select name="adults" value={formData.adults} onChange={handleChange} className="form-select">
                          {[1,2,3,4,5,6].map(n => <option key={n}>{n}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-medium block mb-2" style={{ color: '#8A7256' }}>Children</label>
                        <select name="children" value={formData.children} onChange={handleChange} className="form-select">
                          {[0,1,2,3,4].map(n => <option key={n}>{n}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium block mb-2" style={{ color: '#8A7256' }}>Preferred accommodation</label>
                      <select name="suite" value={formData.suite} onChange={handleChange} className="form-select">
                        <option value="">No preference / advise me</option>
                        {SUITES.map(s => (
                          <option key={s.id} value={s.id}>{s.name} — {s.price}</option>
                        ))}
                      </select>
                    </div>
                  </fieldset>

                  <hr style={{ border: 'none', borderTop: '1px solid rgba(138,114,86,0.2)' }} />

                  {/* Occasion & preferences */}
                  <fieldset className="flex flex-col gap-6">
                    <legend className="label mb-2">Tell us more</legend>
                    <div>
                      <label className="text-xs font-medium block mb-2" style={{ color: '#8A7256' }}>Occasion (if any)</label>
                      <select name="occasion" value={formData.occasion} onChange={handleChange} className="form-select">
                        <option value="">None / leisure</option>
                        <option>Honeymoon</option>
                        <option>Anniversary</option>
                        <option>Birthday celebration</option>
                        <option>Family holiday</option>
                        <option>Wellness retreat</option>
                        <option>Corporate retreat</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium block mb-2" style={{ color: '#8A7256' }}>Approximate budget per night (USD)</label>
                      <select name="budget" value={formData.budget} onChange={handleChange} className="form-select">
                        <option value="">Prefer not to say</option>
                        <option>Under $1,000</option>
                        <option>$1,000 – $2,000</option>
                        <option>$2,000 – $3,500</option>
                        <option>$3,500+</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium block mb-2" style={{ color: '#8A7256' }}>Special requests or questions</label>
                      <textarea
                        name="requests"
                        value={formData.requests}
                        onChange={handleChange}
                        placeholder="Dietary requirements, mobility needs, special celebrations, or anything else we should know..."
                        rows={5}
                        className="form-input"
                        style={{ resize: 'vertical' }}
                      />
                    </div>
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="newsletter"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleChange}
                        style={{ marginTop: '3px', accentColor: '#8A7256', width: '14px', height: '14px', flexShrink: 0, cursor: 'pointer' }}
                      />
                      <label htmlFor="newsletter" className="text-sm cursor-pointer" style={{ color: '#968B7F', lineHeight: 1.6 }}>
                        I'd like to receive occasional updates, offers, and journal stories from Chautari.
                      </label>
                    </div>
                  </fieldset>

                  <div>
                    <button type="submit" disabled={isPending} className="btn-primary" style={{ background: '#253227', opacity: isPending ? 0.7 : 1 }}>
                      {isPending ? 'Submitting...' : 'Submit enquiry'}
                    </button>
                    <p className="mt-4 text-xs leading-relaxed" style={{ color: '#968B7F' }}>
                      We respond within 4 hours. Your enquiry is not a confirmed reservation — a member of our team will follow up to finalise details.
                    </p>
                  </div>
                </form>
              </Reveal>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Reveal delay={150}>
                <div className="sticky top-24 flex flex-col gap-6">
                  {/* Direct line */}
                  <div className="p-6 border" style={{ border: '1px solid rgba(138,114,86,0.25)', background: '#FAF8F3' }}>
                    <p className="label mb-3">Prefer to call?</p>
                    <p className="display" style={{ fontSize: '20px' }}>+960 660 0001</p>
                    <p className="text-xs mt-1 mb-4" style={{ color: '#968B7F' }}>Reservations · 24 hours</p>
                    <p className="text-xs leading-relaxed" style={{ color: '#968B7F' }}>
                      For complex itineraries or bespoke arrangements, a conversation is always the best starting point.
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="p-6" style={{ background: '#253227', color: '#FAF8F3' }}>
                    <p className="label mb-4" style={{ color: '#C6A97D' }}>What's included</p>
                    {[
                      'Complimentary seaplane transfer (5+ nights)',
                      'Daily full breakfast',
                      'Non-motorised water sports',
                      'Snorkelling equipment',
                      'Sunset welcome drinks on arrival',
                    ].map(item => (
                      <div key={item} className="flex items-start gap-3 py-2.5 border-b" style={{ borderColor: 'rgba(250,248,243,0.1)' }}>
                        <span style={{ width: '16px', height: '1px', background: '#C6A97D', display: 'inline-block', flexShrink: 0, marginTop: '9px' }} />
                        <span className="text-xs text-ivory/70 leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Cancellation */}
                  <div className="p-6 border" style={{ border: '1px solid rgba(138,114,86,0.25)' }}>
                    <p className="label mb-3">Flexibility</p>
                    <p className="text-xs leading-relaxed" style={{ color: '#968B7F', lineHeight: 1.75 }}>
                      Direct bookings include flexible cancellation up to 21 days before arrival. Ask our team about options for peak season dates.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
