import PayInvoice from './pages/client/PayInvoice';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import LiveChatButton from './components/LiveChatButton'; // <-- ADDED THIS IMPORT

// --- Public pages ---
import Home from './pages/public/Home'
import About from './pages/public/About'
import Services from './pages/public/Services'
import ServiceAreas from './pages/public/ServiceAreas'
import Contact from './pages/public/Contact'
import StartCase from './pages/public/StartCase'
import HowItWorks from './pages/public/HowItWorks'
import ScamAlerts from './pages/public/ScamAlerts'
import FAQ from './pages/public/FAQ'
import Testimonials from './pages/public/Testimonials'
import TermsOfService from './pages/public/TermsOfService'
import PrivacyPolicy from './pages/public/PrivacyPolicy'
import TechTips from './pages/public/TechTips'

// --- Client portal pages ---
import Login from './pages/client/Login'
import Register from './pages/client/Register'
import PortalDashboard from './pages/client/PortalDashboard'
import Matters from './pages/client/Matters'
import FileClaim from './pages/client/FileClaim'
import Billing from './pages/client/Billing'
import Disbursement from './pages/client/Disbursement'
import Profile from './pages/client/Profile'
import SupportTickets from './pages/client/SupportTickets'
import Messages from './pages/client/Messages'

// --- Admin portal pages ---
import AdminDashboard from './pages/admin/Dashboard'
import AdminClients from './pages/admin/Clients'
import AdminTestimonials from './pages/admin/Testimonials'
import AdminMessages from './pages/admin/Messages'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public website */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service-areas" element={<ServiceAreas />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/start-a-case" element={<StartCase />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/scam-alerts" element={<ScamAlerts />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/tech-tips" element={<TechTips />} />

          {/* Login/Register */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Client portal — clients only */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <PortalDashboard />
              </ProtectedRoute>
            }
          />
          {/* NEW PAYMENT ROUTE ADDED HERE */}
          <Route
            path="/pay"
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <PayInvoice />
              </ProtectedRoute>
            }
          />
          <Route
            path="/matters"
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <Matters />
              </ProtectedRoute>
            }
          />
          <Route
            path="/file-a-claim"
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <FileClaim />
              </ProtectedRoute>
            }
          />
          <Route
            path="/billing"
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <Billing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/disbursement"
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <Disbursement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/support-tickets"
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <SupportTickets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <Messages />
              </ProtectedRoute>
            }
          />

          {/* Admin portal */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin', 'staff']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/clients"
            element={
              <ProtectedRoute allowedRoles={['admin', 'staff']}>
                <AdminClients />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/testimonials"
            element={
              <ProtectedRoute allowedRoles={['admin', 'staff']}>
                <AdminTestimonials />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/messages"
            element={
              <ProtectedRoute allowedRoles={['admin', 'staff']}>
                <AdminMessages />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* --- LIVE CHAT BUTTON (Floats on every page) --- */}
        <LiveChatButton />
        
      </BrowserRouter>
    </AuthProvider>
  )
}