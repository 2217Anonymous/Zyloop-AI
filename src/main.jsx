import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/500.css'
import '@fontsource/oswald/300.css'
import '@fontsource/oswald/500.css'
import '@fontsource/oswald/700.css'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/effect-cube'
import 'swiper/css/pagination'
import './index.css'
import './theme.css'
import './blog.css'
import './wow.css'
import './admin.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
