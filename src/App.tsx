import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AdminLayout from './admin/AdminLayout';
import MainSite from './pages/MainSite';
import EnterpriseSolutionsPage from './pages/EnterpriseSolutionsPage';
import TrainingsPage from './pages/TrainingsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProductsPage from './pages/ProductsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import ScrollToTop from './components/ScrollToTop';
import { OrganizationStructuredData } from './components/StructuredData';
import { markPrerenderReady } from './lib/prerenderReady';

export default function App() {
  useEffect(() => {
    const timer = setTimeout(() => markPrerenderReady(), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <OrganizationStructuredData />
        <ScrollToTop />
        <Routes>
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/services" element={<EnterpriseSolutionsPage />} />
          <Route path="/training" element={<TrainingsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          <Route path="/*" element={<MainSite />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
