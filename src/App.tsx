import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Landing from './pages/Landing'
import TipPage from './pages/TipPage'
import Dashboard from './pages/Dashboard'
import Onboarding from './pages/Onboarding'
import Login from './pages/Login'
import Admin from './pages/Admin'
import AdminRequestDetail from './pages/AdminRequestDetail'
import AdminCreators from './pages/AdminCreators'
import AdminAlerts from './pages/AdminAlerts'
import AdminChannels from './pages/AdminChannels'

/** Scroll to top on route change (except when navigating to an anchor). */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/tip/:creator" element={<TipPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Onboarding />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/requests/:id" element={<AdminRequestDetail />} />
        <Route path="/admin/alerts" element={<AdminAlerts />} />
        <Route path="/admin/creators" element={<AdminCreators />} />
        <Route path="/admin/channels" element={<AdminChannels />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  )
}
