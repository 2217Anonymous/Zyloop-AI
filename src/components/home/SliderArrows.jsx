import { FaAngleUp, FaAngleDown } from 'react-icons/fa'

export default function SliderArrows({ onUp, onDown }) {
  return (
    <div className="slider-arrows">
      <a
        href="#up"
        className="slider-arr slider-arr-up"
        id="slider-arr-up"
        onClick={(e) => {
          e.preventDefault()
          onUp()
        }}
        aria-label="Previous slide"
      >
        <FaAngleUp />
      </a>
      <a
        href="#down"
        className="slider-arr slider-arr-down"
        id="slider-arr-down"
        onClick={(e) => {
          e.preventDefault()
          onDown()
        }}
        aria-label="Next slide"
      >
        <FaAngleDown />
      </a>
    </div>
  )
}
