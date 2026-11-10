import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CONTACT_FORM } from '../lib/links';

// Mobile-only persistent call to action. Hidden on the contact page and admin.
export default function StickyCTA() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (pathname === '/contact' || pathname.startsWith('/admin')) return null;

  return (
    <>
      <div className="h-16 lg:hidden" aria-hidden="true" />
      <div
        className={`lg:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-brand-dark/95 backdrop-blur border-t border-brand-border transition-transform duration-300 ${
          scrolled ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <Link
          to={CONTACT_FORM}
          className="block text-center bg-brand-green text-black text-sm font-semibold py-3.5 hover:bg-lime-400 transition-colors"
        >
          Book a discovery call
        </Link>
      </div>
    </>
  );
}
