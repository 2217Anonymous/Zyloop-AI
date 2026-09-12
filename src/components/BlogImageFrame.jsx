/**
 * Empty image frame matching BlogFeaturedImage dimensions (for placeholders).
 */
export default function BlogImageFrame({ className = '', variant = 'default', children }) {
  const classes = ['blog-featured-image', `blog-featured-image--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  return <div className={classes}>{children}</div>
}
