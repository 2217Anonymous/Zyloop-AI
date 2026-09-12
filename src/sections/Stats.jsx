import { Container } from '../components/Grid'
import CircleProgress from '../components/ui/CircleProgress'
import ScrollWatermark from '../components/ui/ScrollWatermark'

const statsData = [
  {
    id: 'advantage',
    value: 0.90,
    label: '90%',
    badge: '+55% Net Advantage',
    title: 'Autonomous Advantage',
    desc: 'Direct performance edge over 35% traditional legacy tooling across enterprise workflows.',
    color: '#00b4ff',
  },
  {
    id: 'scale',
    value: 0.99,
    label: '2,100+',
    badge: 'Worldwide Scale',
    title: 'Global Deployments',
    desc: 'Enterprise organizations successfully operating autonomous agent swarms with zero downtime.',
    color: '#3b5bff',
  },
  {
    id: 'efficiency',
    value: 0.85,
    label: '85%',
    badge: '12x Faster Output',
    title: 'Overhead Reduction',
    desc: 'Drastic cut in manual operational lag, repetitive ticketing, and human processing errors.',
    color: '#2563eb',
  },
]

export default function Stats() {
  return (
    <section className="stats-modern-sec relative" id="clients">
      <ScrollWatermark text="BENCHMARK PERFORMANCE" className="stats-scroll-watermark" range={450} />
      <Container className="relative">
        {/* Section Heading */}
        <div className="stats-modern-header text-center">
          <span className="stats-modern-kicker">BENCHMARK PERFORMANCE</span>
          <h2 className="stats-modern-title">
            WHY <span>ZYLOOP AI</span> WINS
          </h2>
          <p className="stats-modern-desc">
            See how every ZYLOOP AI module outperforms legacy solutions across speed, automation depth, and enterprise integration.
          </p>
        </div>

        {/* 3 Modern Cards (Border-free, Shadow-free, Solid Colors) */}
        <div className="stats-modern-grid">
          {statsData.map((item) => (
            <div className="stats-modern-card" key={item.id}>
              {/* Top Solid Pill */}
              <div
                className="stats-modern-pill"
                style={{
                  color: item.color,
                  backgroundColor: `${item.color}15`,
                }}
              >
                {item.badge}
              </div>

              {/* Solid Progress Circle */}
              <div className="stats-modern-circle-box">
                <CircleProgress
                  value={item.value}
                  label={item.label}
                  color={item.color}
                  size={170}
                  stroke={9}
                />
              </div>

              {/* Title & Description */}
              <h3 className="stats-modern-card-title">{item.title}</h3>
              <p className="stats-modern-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
