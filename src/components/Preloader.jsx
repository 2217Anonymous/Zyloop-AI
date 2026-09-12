import { BrandLogo } from './layout/ZLogo'

export default function Preloader({ visible }) {
  if (!visible) return null

  return (
    <div className="preloader" role="status" aria-live="polite" aria-label="Loading ZYLOOP AI">
      <div className="preloader-center">
        <BrandLogo className="preloader-logo" width={220} />
        <div className="loader loader-32">
          <div className="loader-container">
            {[0, 1, 2].map((i) => (
              <div className="ball-wrapper" key={i}>
                <div className="ball-holder">
                  <div className="ball"></div>
                </div>
                <div className="shadow"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
