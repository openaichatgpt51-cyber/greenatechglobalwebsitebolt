import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CONSENT_EVENT, GA_MEASUREMENT_ID, getConsent, setConsent } from '../lib/analytics';

export const OPEN_COOKIE_SETTINGS = 'greenatech-open-cookie-settings';

export default function CookieBanner() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    setOpen(getConsent() === null);
    const reopen = () => setOpen(true);
    const onChange = () => setOpen(false);
    window.addEventListener(OPEN_COOKIE_SETTINGS, reopen);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => {
      window.removeEventListener(OPEN_COOKIE_SETTINGS, reopen);
      window.removeEventListener(CONSENT_EVENT, onChange);
    };
  }, []);

  if (!open || pathname.startsWith('/admin')) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed bottom-0 inset-x-0 z-50 bg-brand-card border-t border-brand-border p-4 sm:p-5"
    >
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
        <p className="text-gray-300 text-sm leading-relaxed flex-1">
          We use analytics cookies to understand how visitors use this site and improve it. They are
          off unless you accept. See our{' '}
          <Link to="/cookie-policy" className="text-brand-green underline underline-offset-2">
            Cookie Policy
          </Link>
          .
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => setConsent('denied')}
            className="flex-1 lg:flex-none border border-white/30 text-white text-sm font-semibold px-6 py-3 hover:bg-white hover:text-brand-dark transition-colors"
          >
            Decline
          </button>
          <button
            onClick={() => setConsent('granted')}
            className="flex-1 lg:flex-none bg-brand-green text-black text-sm font-semibold px-6 py-3 hover:bg-lime-400 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
