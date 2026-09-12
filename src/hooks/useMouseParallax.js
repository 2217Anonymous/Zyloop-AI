import { useEffect } from 'react'

export default function useMouseParallax(selector, enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined

    const onMove = (e) => {
      if (window.innerWidth <= 780) return
      document.querySelectorAll(`${selector} [data-depth]`).forEach((el) => {
        const depth = Number(el.getAttribute('data-depth')) || 0.1
        const x = (e.pageX * -depth) / 4
        const y = (e.pageY * -depth) / 4
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      })
    }

    const nodes = document.querySelectorAll(selector)
    nodes.forEach((node) => node.addEventListener('mousemove', onMove))
    return () => nodes.forEach((node) => node.removeEventListener('mousemove', onMove))
  }, [selector, enabled])
}
