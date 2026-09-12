import { FaChevronUp } from 'react-icons/fa'
import { scrollToTop } from '../hooks/useSmoothScroll'

export default function ScrollToTop({ visible }) {
  return (
    <button
      type="button"
      className={`scroll-top-arrow${visible ? ' scroll-top-arrow--visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Back to top"
    >
      <FaChevronUp aria-hidden="true" />
    </button>
  )
}
