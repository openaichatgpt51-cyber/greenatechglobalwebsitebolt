import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics, trackPageView } from '../lib/analytics';

export default function Analytics() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    // Admin screens are internal; keep them out of visitor analytics.
    if (pathname.startsWith('/admin')) return;
    trackPageView(pathname + search);
  }, [pathname, search]);

  return null;
}
