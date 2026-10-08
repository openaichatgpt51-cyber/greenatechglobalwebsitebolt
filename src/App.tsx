import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AdminLayout from './admin/AdminLayout';
import MainSite from './pages/MainSite';
import EnterpriseSolutionsPage from './pages/EnterpriseSolutionsPage';
import TrainingsPage from './pages/TrainingsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ScrollToTop from './components/ScrollToTop';
import { markPrerenderReady } from './lib/prerenderReady';

export default function App() {
  useEffect(() => {
    // For pages with no async data, signal ready after mount.
    // Pages that do have async data register tasks that must resolve first.
    const timer = setTimeout(() => markPrerenderReady(), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/services" element={<EnterpriseSolutionsPage />} />
          <Route path="/training" element={<TrainingsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/*" element={<MainSite />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
