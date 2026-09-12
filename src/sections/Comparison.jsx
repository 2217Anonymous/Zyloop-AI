import { useState } from 'react'
import {
  LiaBoltSolid,
  LiaCheckSolid,
  LiaCommentsSolid,
  LiaCreditCardSolid,
  LiaGlobeSolid,
  LiaGraduationCapSolid,
  LiaHospitalSolid,
  LiaTimesSolid,
  LiaUsersSolid,
} from 'react-icons/lia'
import { Container } from '../components/Grid'
import ScrollWatermark from '../components/ui/ScrollWatermark'

const iconMap = {
  platform: LiaGlobeSolid,
  chatbot: LiaCommentsSolid,
  automation: LiaBoltSolid,
  crm: LiaUsersSolid,
  lms: LiaGraduationCapSolid,
  finance: LiaCreditCardSolid,
  hms: LiaHospitalSolid,
}

const categories = [
  {
    id: 'platform',
    badge: 'Core Infrastructure',
    label: 'Platform',
    subtitle: 'Unified Architecture',
    title: 'Platform Architecture',
    summary: 'Single centralized mesh connects all enterprise tools with zero sync latency.',
    zyloopaiHeadline: 'Fully Unified ZYLOOP AI Platform',
    zyloopaiPoints: [
      'Fully unified platform across all operational units',
      'All tools connected (Chatbot, Automation, CRM, LMS, Finance, HMS)',
      'Centralized control & single source of enterprise truth',
      'Seamless real-time data flow without manual CSV sync',
      'Engineered for infinite horizontal and vertical scalability',
    ],
    legacyHeadline: 'Fragmented Disconnected Ecosystem',
    legacyPoints: [
      'Multiple disconnected tools and third-party vendors',
      'No central system or unified management console',
      'Data silos isolated across departments',
      'Fragile, complex custom API integrations',
      'Difficult and expensive to scale infrastructure',
    ],
    score: {
      zyloopai: 96,
      legacy: 32,
      zyloopaiAdvantage: '96% Unified Mesh',
      legacyStat: '32% Siloed',
      zyloopaiTitle: 'Unified Mesh Reliability',
      zyloopaiSubtitle: 'Zero-Latency Core Bus',
      legacyTitle: 'Legacy Infrastructure',
      legacySubtitle: 'Siloed & Brittle Connectors',
      deltaSubtitle: 'Cross-System Throughput',
    },
    footerStats: [
      { label: 'Architecture:', val: '100% Unified Mesh' },
      { label: 'API Latency:', val: '< 15ms Round-Trip' },
      { label: 'Data Silos:', val: 'Zero Disconnected' },
      { label: 'Platform Uptime:', val: '99.99% Enterprise' },
    ],
  },
  {
    id: 'chatbot',
    badge: 'Conversational AI',
    label: 'Chatbot',
    subtitle: 'Omnichannel Chat',
    title: 'Smart AI Conversations',
    summary: 'Instant context-aware messaging across WhatsApp, Web, and mobile applications.',
    zyloopaiHeadline: 'Omnichannel Conversational AI Engine',
    zyloopaiPoints: [
      'Context-aware smart AI conversations tailored to customer intent',
      'Multi-platform support (Web, WhatsApp, iOS, Android)',
      'Autonomous lead capture, qualification & calendar booking',
      'Hyper-personalized dynamic user responses with knowledge retrieval',
      'Instant scalability to tens of thousands of concurrent users',
    ],
    legacyHeadline: 'Rule-Based Legacy Bots',
    legacyPoints: [
      'Basic, rigid decision-tree rule replies that fail on complex queries',
      'Restricted to single platforms with broken agent handoffs',
      'Manual lead export and manual follow-up required',
      'Impersonal generic responses that frustrate users',
      'Limited concurrency causing server timeouts and drop-offs',
    ],
    score: {
      zyloopai: 92,
      legacy: 38,
      zyloopaiAdvantage: '92% Intent Accuracy',
      legacyStat: '38% Match Rate',
      zyloopaiTitle: 'Omnichannel AI Agent',
      zyloopaiSubtitle: 'Contextual Multi-Turn Dialog',
      legacyTitle: 'Rigid Rule-Based Bot',
      legacySubtitle: 'Static Decision Trees',
      deltaSubtitle: 'Lead Conversion Lift',
    },
    footerStats: [
      { label: 'Response Time:', val: 'Instant (< 0.2s)' },
      { label: 'Lead Capture Rate:', val: '4.8x Higher Capture' },
      { label: 'Channels:', val: 'WhatsApp + Web + App' },
      { label: 'Human Handoff:', val: 'Zero Context Loss' },
    ],
  },
  {
    id: 'automation',
    badge: 'Process Automation',
    label: 'Automation',
    subtitle: 'Workflow Orchestration',
    title: 'Workflow Automation',
    summary: 'Autonomous end-to-end task orchestration slashing manual operational overhead.',
    zyloopaiHeadline: 'Autonomous End-to-End Workflows',
    zyloopaiPoints: [
      'Autonomous end-to-end workflow orchestration across apps',
      'Reduces manual operational work by over 80%',
      '12x faster task execution across enterprise tools',
      'Deep cross-system triggers and automatic error self-healing',
      'Error-free operations with full audit-trail compliance',
    ],
    legacyHeadline: 'Manual Repetitive Processes',
    legacyPoints: [
      'Manual, human-dependent data transfer processes',
      'Time-consuming, slow multi-step departmental workflows',
      'Frequent human errors requiring manual correction',
      'Disconnected tools operating in operational silos',
      'Low operational throughput and high labor expenses',
    ],
    score: {
      zyloopai: 95,
      legacy: 22,
      zyloopaiAdvantage: '95% Auto-Executed',
      legacyStat: '22% Automated',
      zyloopaiTitle: 'Autonomous Workflow Mesh',
      zyloopaiSubtitle: 'Self-Triggering Multi-App Logic',
      legacyTitle: 'Manual Step Processes',
      legacySubtitle: 'Human Bottlenecks & Lag',
      deltaSubtitle: 'Operational Hours Saved',
    },
    footerStats: [
      { label: 'Manual Overhead:', val: 'Reduced by 85%+' },
      { label: 'Execution Speed:', val: '12x Faster Pipeline' },
      { label: 'Error Rate:', val: '< 0.01% Exception' },
      { label: 'Cross-App Sync:', val: 'Real-Time Bi-Directional' },
    ],
  },
  {
    id: 'crm',
    badge: 'Customer Intelligence',
    label: 'CRM',
    subtitle: 'Customer Intelligence',
    title: 'Customer Data & CRM',
    summary: 'Centralized 360-degree customer views with predictive pipeline scoring.',
    zyloopaiHeadline: 'Centralized Autonomous Predictive CRM',
    zyloopaiPoints: [
      'Unified single view of customer records in real time',
      'Automated multi-channel personalized follow-up cadences',
      'Real-time predictive insights & customer health scoring',
      'AI-driven pipeline analytics and deal win probability',
      'Seamless bi-directional integrations across all revenue apps',
    ],
    legacyHeadline: 'Scattered Legacy Databases',
    legacyPoints: [
      'Scattered data duplicate across spreadsheets & disconnected apps',
      'Manual log updates and forgotten contact touchpoints',
      'Static, outdated reports with zero predictive intelligence',
      'No automated triggers or timely automated follow-ups',
      'Poor integration between sales, marketing, and support teams',
    ],
    score: {
      zyloopai: 91,
      legacy: 40,
      zyloopaiAdvantage: '91% Data Hygiene',
      legacyStat: '40% Hygiene',
      zyloopaiTitle: 'Predictive Autonomous CRM',
      zyloopaiSubtitle: 'Live Enrichment & Auto-Log',
      legacyTitle: 'Static Dispersed CRM',
      legacySubtitle: 'Outdated Manual Sheets',
      deltaSubtitle: 'Pipeline Velocity Increase',
    },
    footerStats: [
      { label: 'Data Enrichment:', val: 'Autonomous Real-Time' },
      { label: 'Deal Forecast:', val: '94% Predictive Score' },
      { label: 'Follow-up Cadence:', val: '100% Scheduled & Sent' },
      { label: 'Customer View:', val: '360° Omnichannel' },
    ],
  },
  {
    id: 'lms',
    badge: 'Adaptive Learning',
    label: 'LMS',
    subtitle: 'Adaptive Learning',
    title: 'Learning Management',
    summary: 'Dynamic personalized learning paths with automated assessment grading.',
    zyloopaiHeadline: 'Smart Adaptive LMS & Training Platform',
    zyloopaiPoints: [
      'Interactive, AI-tailored engaging learning experience',
      'Automated learner progress tracking and instant quiz grading',
      'Personalized dynamic learning paths adapted to skill level',
      'Real-time engagement analytics & competency reporting',
      'Effortless content management and automatic curriculum updates',
    ],
    legacyHeadline: 'Static Training Systems',
    legacyPoints: [
      'Static, passive slide decks and unmonitored PDF files',
      'Manual attendance sheets and slow manual grading cycles',
      'One-size-fits-all rigid curriculum for all learners',
      'No deep learning analytics or drop-off warning indicators',
      'Cumbersome, hard-to-maintain legacy content management',
    ],
    score: {
      zyloopai: 89,
      legacy: 34,
      zyloopaiAdvantage: '89% Completion Rate',
      legacyStat: '34% Completion',
      zyloopaiTitle: 'Adaptive Learning AI',
      zyloopaiSubtitle: 'Personalized Skill Mastery',
      legacyTitle: 'Passive LMS Portal',
      legacySubtitle: 'Unattended Video Drops',
      deltaSubtitle: 'Knowledge Retention Lift',
    },
    footerStats: [
      { label: 'Learner Engagement:', val: '3.2x Higher Focus' },
      { label: 'Assessment Grading:', val: 'Instant AI Evaluation' },
      { label: 'Learning Path:', val: 'Dynamic Auto-Adjusted' },
      { label: 'Course Completion:', val: '+55% Net Increase' },
    ],
  },
  {
    id: 'finance',
    badge: 'Digital Finance',
    label: 'Finance',
    subtitle: 'Digital Lending Ops',
    title: 'Digital Loan & Finance',
    summary: '100% paperless loan origination with sub-3-minute automated underwriting.',
    zyloopaiHeadline: 'Autonomous Digital Finance & Lending Ops',
    zyloopaiPoints: [
      '100% paperless digital loan origination & real-time intake',
      'End-to-end real-time borrower and pipeline tracking',
      'Rapid instant approvals powered by predictive scoring models',
      'Automated KYC, document authentication and credit verification',
      'Full transparency and audit compliance tracking out of the box',
    ],
    legacyHeadline: 'Paper-Bound Legacy Lending',
    legacyPoints: [
      'Slow paper-based applications and manual document scanning',
      'No real-time tracking for applicants or loan officers',
      'Lengthy approval cycles taking days or multiple weeks',
      'Error-prone manual underwriting and financial checks',
      'Lack of visibility and opaque borrower status updates',
    ],
    score: {
      zyloopai: 97,
      legacy: 25,
      zyloopaiAdvantage: '97% Auto-Underwritten',
      legacyStat: '25% Digital',
      zyloopaiTitle: 'Digital Underwriting AI',
      zyloopaiSubtitle: 'Predictive Credit Modeling',
      legacyTitle: 'Paper Document Lending',
      legacySubtitle: '5-Day Review Delays',
      deltaSubtitle: 'Disbursal Speed Lift',
    },
    footerStats: [
      { label: 'Approval Turnaround:', val: '< 3 Mins (vs 5 Days)' },
      { label: 'KYC Verification:', val: 'Instant Digital Bio' },
      { label: 'Underwriting Error:', val: 'Zero Manual Faults' },
      { label: 'Audit Readiness:', val: '100% Compliant Trail' },
    ],
  },
  {
    id: 'hms',
    badge: 'Healthcare Ops',
    label: 'HMS',
    subtitle: 'Hospital Operations',
    title: 'Hospital Management',
    summary: 'Connected clinical workflows, automated scheduling, and instant EHR access.',
    zyloopaiHeadline: 'AI-Connected Hospital & Clinical Ops',
    zyloopaiPoints: [
      'Secure digital patient records with instant clinician access',
      'Automated intelligent appointment & staff roster scheduling',
      'Integrated insurance claims and pre-authorization validation',
      'Real-time patient triage, bed and department tracking',
      'AI-assisted clinical operations and priority workflow alerts',
    ],
    legacyHeadline: 'Manual Hospital Administration',
    legacyPoints: [
      'Paper files and disjointed desktop medical records',
      'Double-booking, scheduling conflicts and patient no-shows',
      'Frequent billing errors and rejected insurance claims',
      'No real-time bed or patient status visibility',
      'Inefficient, delayed inter-department communication',
    ],
    score: {
      zyloopai: 93,
      legacy: 30,
      zyloopaiAdvantage: '93% Ops Efficiency',
      legacyStat: '30% Efficiency',
      zyloopaiTitle: 'AI-Connected Hospital Suite',
      zyloopaiSubtitle: 'Zero-Friction Patient Flow',
      legacyTitle: 'Fragmented Hospital Desks',
      legacySubtitle: 'Long Queues & Lost Files',
      deltaSubtitle: 'Wait Time Reduction',
    },
    footerStats: [
      { label: 'Patient Wait Time:', val: '70% Shorter Queues' },
      { label: 'EHR Access:', val: 'Instant Cross-Dept' },
      { label: 'Clean Claims Rate:', val: '98.5% First Pass' },
      { label: 'Bed Allocation:', val: 'Real-Time Dynamic' },
    ],
  },
]

// Circular Pie Chart Component using SVG with Solid Colors
function CirclePieChart({ percentage, color, title, subtitle, size = 130 }) {
  const radius = 46
  const strokeWidth = 10
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="zen-pie-card">
      <div className="zen-pie-svg-box">
        <svg width={size} height={size} viewBox="0 0 110 110" className="zen-pie-svg">
          {/* Background circle */}
          <circle
            cx="55"
            cy="55"
            r={radius}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
          />
          {/* Foreground active pie segment */}
          <circle
            cx="55"
            cy="55"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 55 55)"
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
          {/* Center value */}
          <text
            x="55"
            y="56"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#0f172a"
            style={{ fontSize: '22px', fontWeight: '700', fontFamily: 'Outfit, sans-serif' }}
          >
            {percentage}%
          </text>
        </svg>
      </div>
      <div className="zen-pie-details">
        <h5 className="zen-pie-title" style={{ color }}>{title}</h5>
        <p className="zen-pie-sub">{subtitle}</p>
      </div>
    </div>
  )
}

export default function Comparison() {
  const [activeTab, setActiveTab] = useState(0)

  const current = categories[activeTab]
  const ContentIcon = iconMap[current.id]
  const delta = current.score.zyloopai - current.score.legacy

  return (
    <section className="zen-vtab-section relative" id="comparison">
      <ScrollWatermark text="EXECUTIVE COMPARISON" className="comparison-scroll-watermark" range={450} />
      <Container className="relative">
        {/* Section Heading */}
        <div className="zen-vtab-header text-center">
          <div className="zen-vtab-badge-wrap">
            <span className="zen-vtab-kicker">EXECUTIVE COMPARISON</span>
          </div>
          <h2 className="zen-vtab-title">
            ZYLOOP AI VS <span>TRADITIONAL SYSTEMS</span>
          </h2>
          <p className="zen-vtab-desc">
            Select any business module from the vertical tabs on the left to inspect the
            detailed comparison and live efficiency circle charts.
          </p>
        </div>

        {/* ── Main Vertical Tab Layout ── */}
        <div className="zen-vtab-layout">
          {/* ── LEFT: Vertical Tab Sidebar ── */}
          <aside className="zen-vtab-sidebar">
            <div className="zen-vtab-sidebar-header">
              <span className="zen-vtab-sidebar-title">OPERATIONAL PILLARS</span>
              <span className="zen-vtab-sidebar-count">0{categories.length} Modules</span>
            </div>

            <div className="zen-vtab-nav-list" role="tablist">
              {categories.map((cat, idx) => {
                const isActive = idx === activeTab
                const Icon = iconMap[cat.id]
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`zen-vtab-item ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveTab(idx)}
                  >
                    <span className="zen-vtab-index">0{idx + 1}</span>
                    <span className="zen-vtab-icon">{Icon ? <Icon aria-hidden="true" /> : null}</span>
                    <div className="zen-vtab-text">
                      <span className="zen-vtab-label">{cat.label}</span>
                      <span className="zen-vtab-sub">{cat.subtitle}</span>
                    </div>
                    <span className="zen-vtab-arrow">›</span>
                  </button>
                )
              })}
            </div>
          </aside>

          {/* ── RIGHT: Active Content Area ── */}
          <main className="zen-vtab-content">
            {/* Content Top Bar */}
            <div className="zen-content-topbar">
              <div className="zen-content-title-box">
                <span className="zen-content-icon">
                  {ContentIcon ? <ContentIcon aria-hidden="true" /> : null}
                </span>
                <div>
                  <span className="zen-content-badge">{current.badge}</span>
                  <h3 className="zen-content-title">{current.title}</h3>
                </div>
              </div>
              <div className="zen-content-pill">
                <span className="zen-content-pill-label">Efficiency Delta:</span>
                <span className="zen-content-pill-val">+{delta}% Net Lift</span>
              </div>
            </div>

            {/* Side-by-Side Dual Comparison Cards */}
            <div className="zen-dual-grid">
              {/* ZYLOOP AI Column (Positive) */}
              <div className="zen-side-card zen-card-zyloopai">
                <div className="zen-card-top">
                  <div className="zen-card-brand">
                    <span className="zen-brand-dot dot-green" />
                    <span className="zen-brand-heading">ZYLOOP AI Platform</span>
                  </div>
                  <span className="zen-badge-pill pill-green">{current.score.zyloopaiAdvantage}</span>
                </div>

                <h4 className="zen-card-headline text-green">{current.zyloopaiHeadline}</h4>

                <ul className="zen-list">
                  {current.zyloopaiPoints.map((pt) => (
                    <li key={pt} className="zen-list-item item-green">
                      <span className="zen-check-icon check-green">
                        <LiaCheckSolid aria-hidden="true" />
                      </span>
                      <span className="zen-item-text">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Traditional Column (Negative) */}
              <div className="zen-side-card zen-card-legacy">
                <div className="zen-card-top">
                  <div className="zen-card-brand">
                    <span className="zen-brand-dot dot-red" />
                    <span className="zen-brand-heading text-muted">Traditional System</span>
                  </div>
                  <span className="zen-badge-pill pill-red">{current.score.legacyStat}</span>
                </div>

                <h4 className="zen-card-headline text-muted">{current.legacyHeadline}</h4>

                <ul className="zen-list">
                  {current.legacyPoints.map((pt) => (
                    <li key={pt} className="zen-list-item item-red">
                      <span className="zen-check-icon check-red">
                        <LiaTimesSolid aria-hidden="true" />
                      </span>
                      <span className="zen-item-text text-muted">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── Circle Pie Chart Benchmark Panel ── */}
            <div className="zen-chart-panel">
              <div className="zen-chart-panel-header">
                <div>
                  <h4 className="zen-chart-panel-title">PERFORMANCE METRIC SCORECARDS</h4>
                  <span className="zen-chart-panel-sub">{current.title} Operational Efficiency</span>
                </div>
                <span className="zen-chart-panel-tag">Verified Industry Benchmark</span>
              </div>

              <div className="zen-pie-row">
                {/* ZYLOOP AI Pie Chart */}
                <CirclePieChart
                  percentage={current.score.zyloopai}
                  color="#00b4ff"
                  title={current.score.zyloopaiTitle}
                  subtitle={current.score.zyloopaiSubtitle}
                />

                {/* Center Delta Badge */}
                <div className="zen-pie-delta-box">
                  <span className="zen-delta-title">NET ADVANTAGE</span>
                  <span className="zen-delta-value">+{delta}%</span>
                  <span className="zen-delta-sub">{current.score.deltaSubtitle}</span>
                </div>

                {/* Traditional Pie Chart */}
                <CirclePieChart
                  percentage={current.score.legacy}
                  color="#7a4dff"
                  title={current.score.legacyTitle}
                  subtitle={current.score.legacySubtitle}
                />
              </div>

              {/* Bottom solid key metric stats (Dynamic per tab) */}
              <div className="zen-chart-footer-stats">
                {current.footerStats.map((st, i) => (
                  <div key={i} className="zen-footer-stat">
                    <span className="zen-fstat-label">{st.label}</span>
                    <span className="zen-fstat-val text-green">{st.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </Container>
    </section>
  )
}
