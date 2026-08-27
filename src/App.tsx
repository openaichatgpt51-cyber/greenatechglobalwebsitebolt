import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AdminLayout from './admin/AdminLayout';
import MainSite from './pages/MainSite';
import EnterpriseSolutionsPage from './pages/EnterpriseSolutionsPage';
import TrainingsPage from './pages/TrainingsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
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
