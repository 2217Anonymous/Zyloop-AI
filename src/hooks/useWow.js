import { useEffect } from 'react'

export default function useWow(dep, ready = true) {
  useEffect(() => {
    if (!ready) return undefined

    const reduce = window.matchMedia('(max-width: 767px)').matches
    const nodes = Array.from(document.querySelectorAll('.wow'))

    if (reduce) {
      nodes.forEach((el) => el.classList.add('animated'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-wow-delay') || '0s'
            entry.target.style.animationDelay = delay
            entry.target.classList.add('animated')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )

    nodes.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [dep, ready])
}
