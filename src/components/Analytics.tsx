import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics, trackGaEvent, trackPageView } from '../lib/analytics';

export default function Analytics() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  // One delegated listener records clicks on contact/booking CTAs and outbound links.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      const label = (a.textContent || a.getAttribute('aria-label') || '').trim().slice(0, 60);
      const page = window.location.pathname;
      if (href.includes('#contact-form')) {
        trackGaEvent('cta_click', { cta_label: label, page_path: page });
      } else if (/^https?:\/\//.test(href) && !href.includes(window.location.hostname)) {
        trackGaEvent('outbound_click', { link_url: href, link_label: label, page_path: page });
      } else if (href.startsWith('mailto:')) {
        trackGaEvent('email_click', { page_path: page });
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    // Admin screens are internal; keep them out of visitor analytics.
    if (pathname.startsWith('/admin')) return;
    trackPageView(pathname + search);
  }, [pathname, search]);

  return null;
}
