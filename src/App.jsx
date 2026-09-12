import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import { SiteSettingsProvider } from './context/SiteSettingsContext'
import Layout from './components/Layout'
import AdminLayout from './components/admin/AdminLayout'
import ProtectedRoute from './components/admin/ProtectedRoute'
import ToastStack from './components/admin/ToastStack'
import Home from './pages/Home'
import Blog from './pages/Blog'
import SingleBlog from './pages/SingleBlog'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminBlogs from './pages/admin/AdminBlogs'
import AdminBlogForm from './pages/admin/AdminBlogForm'
import AdminTestimonials from './pages/admin/AdminTestimonials'
import AdminTestimonialForm from './pages/admin/AdminTestimonialForm'
import AdminFaqs from './pages/admin/AdminFaqs'
import AdminFaqForm from './pages/admin/AdminFaqForm'
import AdminSiteSettings from './pages/admin/AdminSiteSettings'

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <SiteSettingsProvider>
        <BrowserRouter>
          <ToastStack />
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="blogs/new" element={<AdminBlogForm />} />
              <Route path="blogs/:id/edit" element={<AdminBlogForm />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="testimonials/new" element={<AdminTestimonialForm />} />
              <Route path="testimonials/:id/edit" element={<AdminTestimonialForm />} />
              <Route path="faqs" element={<AdminFaqs />} />
              <Route path="faqs/new" element={<AdminFaqForm />} />
              <Route path="faqs/:id/edit" element={<AdminFaqForm />} />
              <Route path="settings" element={<AdminSiteSettings />} />
            </Route>

            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<SingleBlog />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
        </SiteSettingsProvider>
      </ToastProvider>
    </AuthProvider>
  )
}
