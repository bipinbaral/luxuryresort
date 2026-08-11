import { useEffect, useRef } from 'react'

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.12) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -48px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}

export function useParallax(speed = 0.3) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      const rect = el.parentElement?.getBoundingClientRect()
      if (!rect) return
      const scrolled = -rect.top * speed
      el.style.transform = `translateY(${scrolled}px)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  return ref
}
