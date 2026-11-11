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

// ---- Cookie consent (analytics only loads after the visitor accepts) ----
export type Consent = 'granted' | 'denied' | null;
const CONSENT_KEY = 'greenatech_analytics_consent';
export const CONSENT_EVENT = 'greenatech-consent-change';

export function getConsent(): Consent {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: 'granted' | 'denied') {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage unavailable: the choice just applies to this page view */
  }
  if (value === 'granted') {
    initAnalytics(true);
  } else {
    // Stop GA from setting or reading cookies for the rest of this session
    if (GA_MEASUREMENT_ID) (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}


// The CI prerender step loads every page in headless Chrome; keep it out of the stats.
function isPrerenderBot(): boolean {
  return typeof navigator !== 'undefined' && navigator.userAgent.includes('GreenatechPrerenderBot');
}

export function initAnalytics(consentJustGranted = false) {
  if (!consentJustGranted && getConsent() !== 'granted') return;
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

export function trackGaEvent(name: string, params: Record<string, string | number | boolean | null> = {}) {
  if (!initialised || !window.gtag) return;
  window.gtag('event', name, params);
}
