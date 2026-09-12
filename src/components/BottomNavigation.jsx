import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { HiOutlineHome, HiOutlineGlobeAlt, HiOutlineHeart, HiOutlineBell, HiOutlineUser } from 'react-icons/hi2'
import { bottomNavItems } from '../data/content'
import { scrollToHash, scrollToTop } from '../hooks/useSmoothScroll'

const ICONS = {
  home: HiOutlineHome,
  explore: HiOutlineGlobeAlt,
  favorites: HiOutlineHeart,
  notifications: HiOutlineBell,
  profile: HiOutlineUser,
}

export default function BottomNavigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(location.pathname !== '/')

  useEffect(() => {
    if (location.pathname !== '/') {
      setVisible(true)
      return undefined
    }
    const onScroll = () => {
      const hero = document.getElementById('hero-slider')
      const threshold = hero ? hero.offsetHeight - 120 : window.innerHeight * 0.7
      setVisible(window.scrollY > threshold)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  const isActive = (item) => {
    if (item.id === 'favorites') return location.pathname.startsWith('/blog')
    if (item.id === 'home') return location.pathname === '/' && (!location.hash || location.hash === '#home')
    if (item.hash && location.pathname === '/') return location.hash === item.hash
    return false
  }

  const onClick = (e, item) => {
    e.preventDefault()
    if (item.id === 'favorites') {
      navigate('/blog')
      return
    }
    if (location.pathname !== '/') {
      navigate(item.hash ? `/${item.hash}` : '/')
      return
    }
    if (item.id === 'home' || item.hash === '#home') {
      scrollToTop()
      window.history.replaceState(null, '', '/')
      return
    }
    if (item.hash) {
      scrollToHash(item.hash)
      window.history.replaceState(null, '', item.hash)
    }
  }

  return (
    <nav
      className={`fixed z-[60] left-1/2 -translate-x-1/2 bottom-[calc(12px+env(safe-area-inset-bottom))] w-[min(92vw,420px)] lg:w-[min(640px,70vw)] transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Primary"
      aria-hidden={!visible}
    >
      <ul className="flex items-center justify-between gap-1 px-2 py-2 lg:px-5 lg:py-2.5 rounded-[22px] lg:rounded-2xl bg-white/95 border border-slate-200/80 shadow-[0_8px_32px_rgba(15,23,42,0.12)] backdrop-blur-md">
        {bottomNavItems.map((item) => {
          const Icon = ICONS[item.id]
          const active = isActive(item)
          return (
            <li key={item.id} className="flex-1">
              <NavLink
                to={item.to}
                onClick={(e) => onClick(e, item)}
                className={`flex flex-col lg:flex-row items-center justify-center gap-0.5 lg:gap-2 py-1.5 lg:py-2 rounded-xl transition-all duration-300 ${
                  active ? 'text-accent' : 'text-slate-500 hover:text-slate-800'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                <span
                  className={`inline-flex items-center justify-center w-9 h-9 lg:w-8 lg:h-8 rounded-full transition-all duration-300 ${
                    active ? 'bg-accent-muted' : 'bg-transparent'
                  }`}
                >
                  <Icon className="w-[22px] h-[22px]" strokeWidth={active ? 2.2 : 1.8} />
                </span>
                <span className={`text-[10px] lg:text-[13px] tracking-wide ${active ? 'font-semibold' : 'font-medium'}`}>
                  {item.label}
                </span>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
