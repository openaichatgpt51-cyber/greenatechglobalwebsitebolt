import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    let timer: number | undefined;

    // The target may mount a moment after the route changes, so retry briefly.
    const scrollToTarget = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ block: 'start' });
      } else if (tries++ < 10) {
        timer = window.setTimeout(scrollToTarget, 50);
      } else {
        window.scrollTo(0, 0);
      }
    };
    scrollToTarget();

    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
