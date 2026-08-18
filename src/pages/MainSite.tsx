import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Awards from '../components/Awards';
import AboutTeaser from '../components/teasers/AboutTeaser';
import ServicesTeaser from '../components/teasers/ServicesTeaser';
import VentureStudio from '../components/VentureStudio';
import CaseStudies from '../components/CaseStudies';
import TrainingTeaser from '../components/teasers/TrainingTeaser';
import Insights from '../components/Insights';
import CTADuo from '../components/CTADuo';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { trackEvent } from '../lib/supabase';

export default function MainSite() {
  const { settings, loaded } = useSiteSettings();

  useEffect(() => {
    trackEvent('page_view', '/');
  }, []);

  const ventureStudioEnabled = loaded && settings['venture_studio_enabled'] === true;

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <Navbar />
      <Hero />
      <Awards />
      <AboutTeaser />
      <ServicesTeaser />
      {ventureStudioEnabled && <VentureStudio />}
      <CaseStudies />
      <TrainingTeaser />
      <Insights />
      <CTADuo />
      <FAQ />
      <Footer />
    </div>
  );
}
