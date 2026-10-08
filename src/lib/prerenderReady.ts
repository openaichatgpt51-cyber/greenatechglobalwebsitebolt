// Lightweight registry for tracking when all async data fetches complete.
// During prerendering, Puppeteer waits for data-prerender-ready="true" on <html>.
// In normal browser usage this is a no-op signal that nobody reads.

const tasks = new Set<string>();
let resolved = false;

function check() {
  if (!resolved && tasks.size === 0) {
    resolved = true;
    document.documentElement.setAttribute('data-prerender-ready', 'true');
  }
}

export function registerPrerenderTask(id: string): () => void {
  if (typeof document === 'undefined') return () => {};
  tasks.add(id);
  return () => {
    tasks.delete(id);
    check();
  };
}

// Call once on mount to ensure pages with no async tasks still signal ready
export function markPrerenderReady() {
  if (typeof document === 'undefined') return;
  check();
}
