// Google Analytics 4. Inactive until VITE_GA_MEASUREMENT_ID is set at build time.

export const GA_MEASUREMENT_ID: string =
  (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) ?? '';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let initialised = false;

// The CI prerender step loads every page in headless Chrome; keep it out of the stats.
function isPrerenderBot(): boolean {
  return typeof navigator !== 'undefined' && navigator.userAgent.includes('GreenatechPrerenderBot');
}

export function initAnalytics() {
  if (initialised || !GA_MEASUREMENT_ID || typeof document === 'undefined' || isPrerenderBot()) {
    return;
  }
  initialised = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the Arguments object itself, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  // Page views are sent manually on every route change (this is a single-page app).
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  document.head.appendChild(script);
}

export function trackPageView(path: string) {
  if (!initialised || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
  });
}
