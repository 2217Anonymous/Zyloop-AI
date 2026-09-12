import { Link } from 'react-router-dom'
import { FaSpinner } from 'react-icons/fa'

export default function Button({
  children,
  href = '#',
  variant = 'anim',
  className = '',
  onClick,
  type = 'button',
  loading = false,
  as = 'a',
}) {
  const variantClass = {
    anim: 'anim-btn',
    green: 'green-btn',
    purple: 'purple-btn',
    white: 'white-trans-btn',
  }[variant]

  const classes = `btn ${variantClass} rounded-pill ${className}`.trim()
  const inner = (
    <>
      {loading && <FaSpinner className="fa fa-spinner fa-spin mr-2 inline-block" aria-hidden="true" />}
      {children}
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </>
  )

  if (as === 'button') {
    return (
      <button type={type} className={classes} onClick={onClick}>
        {inner}
      </button>
    )
  }

  if (href.startsWith('/') && !href.startsWith('/#')) {
    return (
      <Link to={href} className={classes} onClick={onClick}>
        {inner}
      </Link>
    )
  }

  return (
    <a href={href} className={classes} onClick={onClick}>
      {inner}
    </a>
  )
}
