import { FaChevronUp } from 'react-icons/fa'

export default function ScrollToTop({ visible }) {
  const goTop = () => {
    const root = document.scrollingElement || document.documentElement
    root.scrollTo({ top: 0, behavior: 'smooth' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }

  return (
    <button
      type="button"
      className={`scroll-top-arrow${visible ? ' scroll-top-arrow--visible' : ''}`}
      onClick={goTop}
      aria-label="Scroll to top"
      title="Back to top"
    >
      <FaChevronUp aria-hidden="true" />
    </button>
  )
}
