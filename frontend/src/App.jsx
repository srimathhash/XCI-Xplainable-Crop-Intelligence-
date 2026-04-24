import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider, useAuth } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'

import WelcomePage from './pages/WelcomePage'
import AuthPage from './pages/AuthPage'
import OtpVerifyPage from './pages/OtpVerifyPage'
import PredictInputPage from './pages/PredictInputPage'
import Dashboard from './pages/Dashboard'
import FeaturesPage from './pages/FeaturesPage'
import AnalyticsPage from './pages/AnalyticsPage'
import PredictionPage from './pages/PredictionPage'
import FertilizerPage from './pages/FertilizerPage'
import MainLayout from './components/MainLayout'
import AIChatAssistant from './components/AIChatAssistant'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'dummy-client-id.apps.googleusercontent.com'

function ProtectedRoute({ children }) {
  const { token, loading } = useAuth()
  if (loading) return null
  if (!token) return <Navigate to="/login" replace />
  return children
}

function AuthRedirect({ children }) {
  const { token, loading } = useAuth()
  if (loading) return null
  // Redirect authenticated users away from public landing pages towards dashboard
  if (token) return <Navigate to="/dashboard" replace />
  return children
}

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Routes WITHOUT Navbar (Landing & Auth) */}
              <Route path="/" element={
                <AuthRedirect>
                  <WelcomePage />
                </AuthRedirect>
              } />

              <Route path="/login" element={
                <AuthRedirect>
                  <AuthPage isLoginRoute={true} />
                </AuthRedirect>
              } />

              <Route path="/signup" element={
                <AuthRedirect>
                  <AuthPage isLoginRoute={false} />
                </AuthRedirect>
              } />

              <Route path="/otp" element={<OtpVerifyPage />} />
              <Route path="/verify-otp" element={<Navigate to="/otp" replace />} />

              {/* All pages inside MainLayout get the global Navbar */}
              <Route element={<MainLayout />}>

                <Route path="/features" element={<FeaturesPage />} />

                {/* Protected Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/recommend" element={
                  <ProtectedRoute>
                    <PredictInputPage />
                  </ProtectedRoute>
                } />
                <Route path="/prediction" element={
                  <ProtectedRoute>
                    <PredictionPage />
                  </ProtectedRoute>
                } />
                <Route path="/analytics" element={
                  <ProtectedRoute>
                    <AnalyticsPage />
                  </ProtectedRoute>
                } />
                <Route path="/fertilizer" element={
                  <ProtectedRoute>
                    <FertilizerPage />
                  </ProtectedRoute>
                } />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>

            {/* Global floating AI assistant */}
            <AIChatAssistant />

          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </GoogleOAuthProvider>
  )
}
