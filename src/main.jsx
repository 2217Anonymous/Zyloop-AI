import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/outfit/400.css'
import '@fontsource/outfit/500.css'
import '@fontsource/outfit/600.css'
import '@fontsource/outfit/700.css'
import '@fontsource/outfit/800.css'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/effect-cube'
import 'swiper/css/pagination'
import './index.css'
import './theme.css'
import './blog.css'
import './wow.css'
import './admin.css'
import './typography.css'
import './hero-blog.css'
import './brand-theme.css'
import './responsive.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
