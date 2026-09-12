export const navItems = [
  { id: 'home', label: 'HOME', hash: '#home' },
  { id: 'about', label: 'ABOUT', hash: '#about' },
  { id: 'clients', label: 'WHY ZYLOOP AI', hash: '#clients' },
  { id: 'comparison', label: 'COMPARISON', hash: '#comparison' },
  { id: 'faq', label: 'FAQS', hash: '#faq' },
  { id: 'blog', label: 'BLOG', hash: '#blog' },
  { id: 'contact', label: 'CONTACT', hash: '#contact' },
]

export const contactInfo = {
  phone: '+91 8825505169',
  email: 'Zylearnai@gmail.com',
  address: 'Kalapatti Main Rd, NGP Nagar, Nehru Nagar West, Coimbatore, Tamil Nadu 641048',
  phones: ['+91 8825505169', '+91 9994267626'],
  whatsapp:
    'https://api.whatsapp.com/send/?phone=918825505169&text&type=phone_number&app_absent=0',
  instagram: 'https://instagram.com/zylearnai?igsh=MTNsMzFoMGY2ZHB6Mw==',
  locationNote: 'Visit our Coimbatore office or reach out by phone, WhatsApp, or email.',
}

export function contactTelHref(phone = contactInfo.phone) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export function contactMailtoHref(email = contactInfo.email) {
  return `mailto:${email}`
}

export const heroVideo = {
  src: '/images/zyloop-ai.webm',
  type: 'video/webm',
  poster: '/images/slide1.jpg',
}

export const slides = [
  {
    heading: 'Automate What',
    accent: 'Matters',
    badge: 'Zyloop Automate',
    text: 'Build intelligent workflows and let Zyloop handle the repetitive work across your business systems.',
    primaryCta: 'Explore Automate',
    solutionId: 'zyloopflow',
    image: '/images/slide1.jpg',
  },
  {
    heading: 'Connect Every',
    accent: 'Conversation',
    badge: 'Zyloop Connect',
    text: 'Automate WhatsApp conversations, capture qualified leads, and hand off to humans when it matters.',
    primaryCta: 'Explore Connect',
    solutionId: 'zyloopchat',
    image: '/images/slide2.jpg',
  },
  {
    heading: 'Care That',
    accent: 'Never Waits',
    badge: 'Zyloop Health',
    text: 'Streamline hospital operations, appointments, and patient records through one connected platform.',
    primaryCta: 'Explore Health',
    solutionId: 'zyloophealth',
    image: '/images/p4.jpg',
  },
  {
    heading: 'Finance Without',
    accent: 'The Friction',
    badge: 'Zyloop Finance',
    text: 'Simplify lending operations from application to approval with automated tracking and verification.',
    primaryCta: 'Explore Finance',
    solutionId: 'zyloopfinance',
    image: '/images/p2.jpg',
  },
  {
    heading: 'Know Every',
    accent: 'Customer',
    badge: 'Zyloop CRM',
    text: 'Organize relationships, automate sales workflows, and keep every customer signal in one place.',
    primaryCta: 'Explore CRM',
    solutionId: 'zyloopcrm',
    image: '/images/p3.jpg',
  },
  {
    heading: 'Learn Faster',
    accent: 'Together',
    badge: 'Zyloop Learn',
    text: 'Deliver structured learning paths, track progress, and scale training across your whole workforce.',
    primaryCta: 'Explore Learn',
    solutionId: 'zylooplearning',
    image: '/images/slide3.jpg',
  },
]

export const heroBottomNav = [
  { id: 'zyloopflow', label: 'Automate' },
  { id: 'zyloopchat', label: 'Connect' },
  { id: 'zyloophealth', label: 'Health' },
  { id: 'zyloopfinance', label: 'Finance' },
  { id: 'zyloopcrm', label: 'CRM' },
  { id: 'zylooplearning', label: 'Learn' },
]

export function selectSolution(id) {
  if (typeof window === 'undefined' || !id) return
  window.dispatchEvent(new CustomEvent('zyloop:select-solution', { detail: { id } }))
}

export const aboutSolutions = [
  {
    id: 'zyloopchat',
    name: 'Zyloop Chat',
    subtitle: 'WhatsApp Automation',
    tagline: 'AI-powered WhatsApp automation',
    icon: 'whatsapp',
    about: 'Zyloop Chat connects AI directly to WhatsApp Business, allowing businesses to automate conversations, capture leads, and provide instant customer support — all within a familiar messaging platform.',
    features: [
      'Official WhatsApp Business integration',
      'Automated customer support and sales chats',
      'Smart lead capture and response system',
      'Smooth human handoff when needed',
      'Enhances customer communication at scale',
    ],
  },
  {
    id: 'zyloophealth',
    name: 'Zyloop Health',
    subtitle: 'Hospital Operations',
    tagline: 'Complete hospital management system',
    icon: 'hospital',
    about: 'Zyloop Health is an all-in-one digital healthcare platform that streamlines hospital operations while enhancing patient experience through online services and centralized management.',
    features: [
      'Online appointment booking system',
      'Digital Health Passport (patient records & history)',
      'Online doctor consultations',
      'Integrated medicine ordering system',
      'Centralized hospital workflow management',
    ],
  },
  {
    id: 'zyloopfinance',
    name: 'Zyloop Finance',
    subtitle: 'Digital Lending Ops',
    tagline: 'Simplified financial applications',
    icon: 'wallet',
    about: 'Zyloop Finance provides a seamless digital platform for managing financial services like loan applications. It simplifies the entire process from submission to approval with automation and tracking.',
    features: [
      'Easy loan application submission',
      'Real-time application tracking',
      'Secure document upload and verification',
      'Fully digital end-to-end workflow',
      'Faster processing with reduced paperwork',
    ],
  },
  {
    id: 'zyloopcrm',
    name: 'Zyloop CRM',
    subtitle: 'Customer Intelligence',
    tagline: 'Manage all customer relationships in one place',
    icon: 'users',
    about: 'Zyloop CRM helps businesses organize, track, and optimize customer relationships through a centralized platform that integrates workflows, data, and communication tools.',
    features: [
      'Centralized customer data management',
      'Workflow and sales process automation',
      'Integration with external tools and platforms',
      'Scalable solution for growing businesses',
      'Improves customer retention and insights',
    ],
  },
  {
    id: 'zylooplearning',
    name: 'Zyloop Learning',
    subtitle: 'Adaptive Learning',
    tagline: 'Modern LMS for edtech platforms',
    icon: 'graduation',
    about: 'Zyloop Learning is a modern learning management system that enables educators to create, manage, and deliver structured learning experiences while tracking student progress effectively.',
    features: [
      'Easy course upload and management',
      'Structured learning paths for students',
      'Progress tracking and analytics',
      'Multi-course and multi-user support',
      'Ideal for edtech platforms and institutions',
    ],
  },
  {
    id: 'zyloopflow',
    name: 'Zyloop Flow',
    subtitle: 'Workflow Orchestration',
    tagline: 'Autonomous end-to-end workflow automation',
    icon: 'bolt',
    about: 'Zyloop Flow empowers enterprise organizations to automate repetitive tasks, orchestrate multi-app workflows, and trigger autonomous AI actions across all business systems with self-healing triggers.',
    features: [
      'Autonomous end-to-end workflow orchestration',
      'Code & no-code intuitive visual builder',
      'Deep cross-system API event triggers',
      'Real-time error detection and self-healing',
      'Reduces manual operational lag by 80%+',
    ],
  },
]

export const services = aboutSolutions

export const stats = [
  { value: 0.90, label: '90%', text: 'ZYLOOP AI Autonomous Advantage Score vs 35% Traditional' },
  { value: 0.99, label: '2,100+', text: 'Trusted Enterprise Clients & Deployments Worldwide' },
  { value: 0.85, label: '85%', text: 'Reduction in Manual Operations and Workflow Delays' },
]

export const portfolioFilters = [
  { key: '*', label: 'ALL PRODUCTS' },
  { key: 'voice', label: 'VOICE & CHAT' },
  { key: 'enterprise', label: 'WORKFLOW & OPS' },
  { key: 'industry', label: 'HEALTH & FINANCE' },
]

export const portfolioItems = [
  {
    id: 1,
    cats: ['enterprise'],
    image: '/images/p1.jpg',
    title: 'Zyloop Automation',
    desc: 'Automate anything — code or no-code\nFlexible drag-and-drop workflow builder with multi-API integrations.',
  },
  {
    id: 2,
    cats: ['voice'],
    image: '/images/p2.jpg',
    title: 'Zyloop Voice Platform',
    desc: 'Build voice agents for any business\nReal-time conversational AI, natural speech, and customizable flows.',
  },
  {
    id: 3,
    cats: ['voice'],
    image: '/images/p3.jpg',
    title: 'Zyloop Chat WhatsApp',
    desc: 'AI-powered WhatsApp automation\nOfficial WhatsApp Business API, smart lead capture, and instant handoff.',
  },
  {
    id: 4,
    cats: ['industry'],
    image: '/images/p4.jpg',
    title: 'Zyloop Health HMS',
    desc: 'Complete hospital management system\nDigital Health Passport, doctor consultations, and centralized records.',
  },
  {
    id: 5,
    cats: ['industry'],
    image: '/images/p1.jpg',
    title: 'Zyloop Finance',
    desc: 'Simplified financial applications\nDigital loan processing with end-to-end verification and tracking.',
  },
  {
    id: 6,
    cats: ['enterprise'],
    image: '/images/p2.jpg',
    title: 'Zyloop CRM',
    desc: 'Manage all customer relationships\nCentralized customer data, sales automation, and AI predictive insights.',
  },
  {
    id: 7,
    cats: ['enterprise'],
    image: '/images/p3.jpg',
    title: 'Zyloop Learning',
    desc: 'Modern LMS for edtech platforms\nStructured learning paths, course delivery, and progress analytics.',
  },
]

export const industryAgents = [
  {
    id: 'appointments',
    title: 'Appointments',
    badge: 'Industry AI Agent',
    desc: 'Deliver a hassle-free booking experience with instant scheduling, automated reminders, and real-time availability management — ensuring no missed appointments.',
  },
  {
    id: 'logistics',
    title: 'Logistics',
    badge: 'Industry AI Agent',
    desc: 'Optimize logistics operations with intelligent tracking and automation. From route planning to delivery updates, this agent ensures faster, more efficient supply chain management.',
  },
  {
    id: 'insurance',
    title: 'Insurance',
    badge: 'Industry AI Agent',
    desc: 'Automate policy management, claims processing, and customer support with precision. This AI agent improves response times, reduces errors, and enhances overall customer experience.',
  },
  {
    id: 'real-estate',
    title: 'Real Estate',
    badge: 'Industry AI Agent',
    desc: 'Capture, qualify, and convert property leads with ease. From automated inquiries to smart follow-ups, this AI agent engages prospects and schedules site visits.',
  },
  {
    id: 'finance',
    title: 'Finance',
    badge: 'Industry AI Agent',
    desc: 'Streamline financial operations with intelligent automation. From expense tracking and reporting to real-time insights, this agent helps businesses make faster, data-driven financial decisions.',
  },
  {
    id: 'hr',
    title: 'HR',
    badge: 'Industry AI Agent',
    desc: 'Simplify HR processes with smart automation. From candidate screening and onboarding to employee management, this AI agent reduces manual effort and improves workforce efficiency.',
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    badge: 'Industry AI Agent',
    desc: 'Enhance guest experiences with seamless automation. Manage reservations, handle guest queries, and coordinate services efficiently while ensuring a responsive hospitality experience.',
  },
]

/** @deprecated use industryAgents */
export const team = industryAgents.map((agent) => ({
  name: agent.title,
  role: agent.badge,
  desc: agent.desc,
}))

export const businessCategories = [
  {
    id: 'sales-marketing',
    title: 'Sales & Marketing',
    badge: 'Business Category',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    desc: 'Automate lead management, campaigns, follow-ups, and CRM updates with AI agents that maximize conversions and drive consistent revenue growth.',
    points: [
      'AI-powered lead scoring and qualification',
      'Automated campaign follow-ups and CRM sync',
      'Personalized outreach at scale',
      'Real-time conversion and pipeline analytics',
    ],
  },
  {
    id: 'hr-ops',
    title: 'HR Ops',
    badge: 'Business Category',
    image:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80',
    desc: 'Streamline onboarding, document handling, and training processes with intelligent workflow automation that saves time and reduces errors.',
    points: [
      'Digital onboarding and document automation',
      'Employee training workflow tracking',
      'Leave, policy, and request handling',
      'Reduced manual HR processing time',
    ],
  },
  {
    id: 'service-ops',
    title: 'Service Ops',
    badge: 'Business Category',
    image:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
    desc: 'Improve customer support with automated ticketing, intelligent responses, and feedback management systems that resolve issues faster.',
    points: [
      'Intelligent ticket routing and prioritization',
      'Automated first-response and FAQ handling',
      'Customer feedback collection and analysis',
      'Faster issue resolution workflows',
    ],
  },
  {
    id: 'finance-ops',
    title: 'Finance Ops',
    badge: 'Business Category',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
    desc: 'Simplify invoicing, expense tracking, payroll, and reporting with accurate, AI-driven automation that keeps your finances in order.',
    points: [
      'Automated invoicing and payment reminders',
      'Expense tracking and approval flows',
      'Payroll and reporting automation',
      'Accurate financial data reconciliation',
    ],
  },
  {
    id: 'operations',
    title: 'Operations',
    badge: 'Business Category',
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    desc: 'Optimize inventory, supply chains, and daily workflows using intelligent process automation that removes bottlenecks and drives efficiency.',
    points: [
      'Inventory and supply chain monitoring',
      'Workflow bottleneck detection',
      'Cross-department process automation',
      'Improved operational efficiency metrics',
    ],
  },
  {
    id: 'it-security',
    title: 'IT & Security',
    badge: 'Business Category',
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    desc: 'Enhance system monitoring, access control, and cybersecurity with proactive AI-powered agents that detect threats and automate responses.',
    points: [
      '24/7 system and network monitoring',
      'Automated access control and compliance',
      'Threat detection and incident response',
      'Proactive security patch workflows',
    ],
  },
]

export const faqSection = {
  kicker: "FAQ'S",
  titleBefore: 'Questions teams usually ask before they',
  titleAccent: 'deploy',
  desc: 'Launch time, coding, connectors, languages, WhatsApp, and enterprise controls — in one place.',
}

export const categories = [
  { name: 'AGENTIC AI', count: 12 },
  { name: 'VOICE AI', count: 18 },
  { name: 'WORKFLOW AUTOMATION', count: 24 },
  { name: 'HEALTHCARE AI', count: 8 },
  { name: 'FINTECH & CRM', count: 15 },
]

export const archives = [
  { name: 'Feb , 2026', count: 6 },
  { name: 'Jan , 2026', count: 9 },
  { name: 'Dec , 2025', count: 14 },
  { name: 'Nov , 2025', count: 10 },
]

export const tags = ['AGENTIC AI', 'ZYLOOP AI', 'AUTOMATION', 'CRM', 'NO-CODE', 'ENTERPRISE']

export const marqueeTickerItems = [
  '100+ Enterprise Connectors',
  'Smart Healthcare Ops',
  'Fintech Underwriting',
  'Autonomous CRM Revenue',
  'Adaptive Workforce Enablement',
  'Zyloop AI',
  'Autonomous Workflow Orchestration',
  'Voice-First Agent Platform',
  'Enterprise Agentic AI',
  'No-Code Automation',
]

