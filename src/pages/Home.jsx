import { useOutletContext } from 'react-router-dom'
import Seo from '../components/Seo'
import HeroSlider from '../components/home/HeroSlider'
import About from '../sections/About'
import Stats from '../sections/Stats'
import Team from '../sections/Team'
import Comparison from '../sections/Comparison'
import Testimonials from '../sections/Testimonials'
import Faq from '../sections/Faq'
import BlogTeaser from '../sections/BlogTeaser'
import Contact from '../sections/Contact'
import { breadcrumbJsonLd, organizationJsonLd, seoPages, websiteJsonLd } from '../data/seo'

export default function Home() {
  const { setMenuOpen } = useOutletContext() || {}

  return (
    <main className="home-page">
      <Seo
        {...seoPages.home}
        jsonLd={[
          organizationJsonLd(),
          websiteJsonLd(),
          breadcrumbJsonLd([{ name: 'Home', path: '/' }]),
        ]}
      />
      <HeroSlider onMenuOpen={() => setMenuOpen?.(true)} />
      <About />
      <Stats />
      <Team />
      <Comparison />
      <Testimonials />
      <Faq />
      <BlogTeaser />
      <Contact />
    </main>
  )
}

