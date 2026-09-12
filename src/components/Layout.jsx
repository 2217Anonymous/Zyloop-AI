import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SiteHeader from './layout/SiteHeader'
import SideMenu from './layout/SideMenu'
import SiteFooter from './layout/SiteFooter'
import FixedMarqueeBar from './FixedMarqueeBar'
import FloatingContactBar from './FloatingContactBar'
import Preloader from './Preloader'
import ScrollToTop from './ScrollToTop'
import useHeaderAppear from '../hooks/useHeaderAppear'
import useActiveSection from '../hooks/useActiveSection'
import useWow from '../hooks/useWow'
import { scrollToHash } from '../hooks/useSmoothScroll'

export default function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { appeared, showTop } = useHeaderAppear()
  const activeSection = useActiveSection(isHome)
  const [menuOpen, setMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useWow(location.pathname, !loading)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('is-page-loading', loading)
    return () => {
      document.body.classList.remove('is-page-loading')
    }
  }, [loading])

  useEffect(() => {
    setMenuOpen(false)
    if (location.hash && isHome) {
      const t = window.setTimeout(() => scrollToHash(location.hash), 180)
      return () => clearTimeout(t)
    }
    if (!location.hash) {
      window.scrollTo(0, 0)
    }
    return undefined
  }, [location.pathname, location.hash, isHome])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <div className={`app-shell${menuOpen ? ' is-menu-open' : ''}${isHome ? '' : ' app-shell--inner'}${loading ? ' is-page-loading' : ''}`}>
      <Preloader visible={loading} />
      {!loading && (
        <>
          <SiteHeader
            appeared={appeared}
            setMenuOpen={setMenuOpen}
            activeSection={activeSection}
            isHome={isHome}
          />
          <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
          <Outlet />
          <SiteFooter />
          <FixedMarqueeBar />
          <FloatingContactBar />
          <ScrollToTop visible={showTop} />
        </>
      )}
    </div>
  )
}
