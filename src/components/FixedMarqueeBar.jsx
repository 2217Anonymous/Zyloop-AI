import { marqueeTickerItems } from '../data/content'
import { TextMarquee } from './ui/MarqueeStrip'

export default function FixedMarqueeBar() {
  return (
    <aside className="marquee-tier-sec marquee-tier-fixed" id="sponser-sec" aria-label="Platform highlights">
      <TextMarquee items={marqueeTickerItems} />
    </aside>
  )
}
