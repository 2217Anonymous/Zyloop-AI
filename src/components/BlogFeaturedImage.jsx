/**
 * Fixed aspect-ratio frame so any uploaded image (large or small)
 * renders at the same standard size with object-fit: cover.
 */
export default function BlogFeaturedImage({
  src,
  alt = '',
  className = '',
  variant = 'default',
}) {
  if (!src) return null

  const classes = ['blog-featured-image', `blog-featured-image--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      <img src={src} alt={alt} loading="lazy" />
    </div>
  )
}
