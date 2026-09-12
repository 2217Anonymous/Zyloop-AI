import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { FaBars, FaExternalLinkAlt } from 'react-icons/fa'
import AdminSidebar from './AdminSidebar'
import ToastStack from './ToastStack'
import Seo from '../Seo'
import { seoPages } from '../../data/seo'

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="cms-shell">
      <Seo {...seoPages.admin} />
      <AdminSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="cms-main">
        <header className="cms-topbar">
          <button
            type="button"
            className="cms-menu-toggle"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <FaBars />
          </button>
          <div className="cms-topbar-actions">
            <a href="/" className="cms-view-site" target="_blank" rel="noopener noreferrer">
              <FaExternalLinkAlt aria-hidden="true" />
              View Website
            </a>
          </div>
        </header>
        <main className="cms-content">
          <Outlet />
        </main>
      </div>
      <ToastStack />
    </div>
  )
}
