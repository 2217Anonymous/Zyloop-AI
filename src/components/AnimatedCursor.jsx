import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function AnimatedCursor({ hidden }) {
  const cursorRef = useRef(null)
  const loaderRef = useRef(null)
  const wrapRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor || window.innerWidth <= 991) return undefined

    const pos = { x: 0, y: 0 }
    const mouse = { x: 0, y: 0 }
    const ease = 0.25
    let locked = false

    gsap.set(cursor, { xPercent: -50, yPercent: -50 })

    const onMove = (e) => {
      mouse.x = e.pageX
      mouse.y = e.pageY - (window.pageYOffset || document.documentElement.scrollTop)
    }

    const tick = () => {
      if (!locked) {
        pos.x += (mouse.x - pos.x) * ease
        pos.y += (mouse.y - pos.y) * ease
        gsap.set(cursor, { x: pos.x, y: pos.y })
      }
    }

    const onLinkEnter = () => {
      gsap.to(cursor, {
        duration: 0.2,
        borderWidth: '0px',
        scale: 3,
        backgroundColor: 'rgba(5,5,5,0.27)',
        opacity: 0.15,
      })
    }
    const onLinkLeave = () => {
      gsap.to(cursor, {
        duration: 0.3,
        borderWidth: '2px',
        scale: 1,
        backgroundColor: 'rgba(255,255,255,0)',
        opacity: 1,
      })
    }
    const onBtnEnter = () => {
      gsap.to(cursor, { duration: 0.2, borderWidth: '1px', scale: 2, opacity: 0 })
    }
    const onBtnLeave = () => {
      gsap.to(cursor, { duration: 0.3, borderWidth: '2px', scale: 1, opacity: 1 })
    }

    const bindHover = (selector, enter, leave) => {
      const nodes = document.querySelectorAll(selector)
      nodes.forEach((el) => {
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
      })
      return () => {
        nodes.forEach((el) => {
          el.removeEventListener('mouseenter', enter)
          el.removeEventListener('mouseleave', leave)
        })
      }
    }

    document.addEventListener('mousemove', onMove)
    gsap.ticker.add(tick)
    const unbindLink = bindHover('.link', onLinkEnter, onLinkLeave)
    const unbindBtn = bindHover('.btn, .hide-cursor', onBtnEnter, onBtnLeave)

    return () => {
      document.removeEventListener('mousemove', onMove)
      gsap.ticker.remove(tick)
      unbindLink()
      unbindBtn()
    }
  }, [])

  return (
    <div ref={wrapRef} className={`aimated-cursor ${hidden || (typeof window !== 'undefined' && window.innerWidth <= 991) ? 'magic' : ''}`}>
      <div className="cursor" ref={cursorRef}>
        <div className="cursor-loader" ref={loaderRef}></div>
      </div>
    </div>
  )
}
