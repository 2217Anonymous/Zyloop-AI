import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToHash, scrollToTop } from '../hooks/useSmoothScroll'

export default function NavAnchor({
  hash,
  className = '',
  children,
  onClick,
  home = false,
}) {
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const sectionHash = hash?.startsWith('#') ? hash : `#${hash || ''}`

  const handleClick = (e) => {
    e.preventDefault()
    onClick?.()

    if (home || sectionHash === '#home' || sectionHash === '#') {
      if (isHome) scrollToTop()
      else navigate('/')
      return
    }

    if (sectionHash === '#blog') {
      if (isHome) {
        scrollToHash(sectionHash)
        window.history.replaceState(null, '', sectionHash)
      } else {
        navigate('/blog')
      }
      return
    }

    if (isHome) {
      scrollToHash(sectionHash)
      window.history.replaceState(null, '', sectionHash)
    } else {
      navigate({ pathname: '/', hash: sectionHash.replace('#', '') })
    }
  }

  const href =
    !isHome && sectionHash === '#blog'
      ? '/blog'
      : isHome
        ? sectionHash || '#'
        : `/${sectionHash}`

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  )
}
