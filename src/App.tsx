import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';
import { Onboarding } from './pages/Onboarding';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory';
import { Sales } from './pages/Sales';
import { Manufacturing } from './pages/Manufacturing';
import { Services } from './pages/Services';
import { People } from './pages/People';
import { Projects } from './pages/Projects';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { Integrations } from './pages/Integrations';
import { LandingPage } from './pages/public/LandingPage';
import { PricingPage } from './pages/public/PricingPage';
import { FeaturesPage } from './pages/public/FeaturesPage';
import { TestimonialsPage } from './pages/public/TestimonialsPage';
import { LoginPage } from './pages/public/LoginPage';
import { SignupPage } from './pages/public/SignupPage';
import { AboutPage } from './pages/public/AboutPage';
import { CareersPage } from './pages/public/CareersPage';
import { HelpCenterPage } from './pages/public/HelpCenterPage';
import { PrivacyPolicyPage } from './pages/public/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/public/TermsOfServicePage';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/store/appStore';

function App() {
  const { isOnboarded, setIsOnboarded } = useStore();
  const { fetchInitialData } = useAppStore();

  useEffect(() => {
    // Check active session & fetch data
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsOnboarded(true);
        fetchInitialData();
      } else {
        // Force logout if no session found (clears stale local storage)
        setIsOnboarded(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsOnboarded(true);
        fetchInitialData();
      } else {
        setIsOnboarded(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [setIsOnboarded, fetchInitialData]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        {!isOnboarded ? (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/help" element={<HelpCenterPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          /* Authenticated Routes */
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="sales" element={<Sales />} />
            <Route path="manufacturing" element={<Manufacturing />} />
            <Route path="services" element={<Services />} />
            <Route path="people" element={<People />} />
            <Route path="projects" element={<Projects />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;
