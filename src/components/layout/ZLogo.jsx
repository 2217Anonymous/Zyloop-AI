export function BrandLogo({ className = '', width = 220 }) {
  return (
    <img
      src="/images/logo.png"
      alt="ZYLOOP AI"
      className={className}
      style={{ width, height: 'auto', display: 'block', maxWidth: '100%' }}
    />
  )
}
