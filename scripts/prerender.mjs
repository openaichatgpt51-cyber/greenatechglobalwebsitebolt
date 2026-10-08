/**
 * Post-build prerendering script.
 * Serves dist/ via a minimal Node HTTP server, loads each route in Puppeteer,
 * waits for the app's data-prerender-ready signal, then writes the fully-rendered
 * HTML to the corresponding dist/ path.
 *
 * Per-route <title>, meta description, and OG tags are injected before capture.
 */
import http from 'http';
import { readFile, mkdirSync, writeFileSync, readFileSync, statSync } from 'fs';
import { join, dirname, extname, normalize } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');

const ROUTES = [
  {
    path: '/',
    title: 'Greenatech | AI-Powered Digital Transformation',
    description: 'Greenatech builds enterprise-grade digital infrastructure, world-class technical talent, and AI-powered products for forward-thinking organisations.',
    ogTitle: 'Greenatech | AI-Powered Digital Transformation',
    ogDescription: 'We automate what slows you down. Enterprise solutions, training, and AI products.',
  },
  {
    path: '/services',
    title: 'Enterprise Solutions | Greenatech',
    description: 'AI-powered enterprise solutions including workflow automation, data infrastructure, and custom AI product development.',
    ogTitle: 'Enterprise Solutions | Greenatech',
    ogDescription: 'AI-powered enterprise solutions, workflow automation, and custom product development.',
  },
  {
    path: '/training',
    title: 'Training & Academy | Greenatech',
    description: 'World-class technical training programs — corporate courses and starter tracks to build elite engineering talent.',
    ogTitle: 'Training & Academy | Greenatech',
    ogDescription: 'Technical training programs and starter tracks for building elite engineering talent.',
  },
  {
    path: '/about',
    title: 'About Us | Greenatech',
    description: 'Greenatech builds AI-powered digital infrastructure for African businesses and forward-thinking organisations worldwide.',
    ogTitle: 'About Us | Greenatech',
    ogDescription: 'Building AI-powered digital infrastructure for African businesses and beyond.',
  },
  {
    path: '/contact',
    title: 'Contact | Greenatech',
    description: 'Get in touch with Greenatech for enterprise solutions, training programs, and AI-powered digital transformation.',
    ogTitle: 'Contact | Greenatech',
    ogDescription: 'Get in touch about enterprise solutions, training, and AI products.',
  },
];

const READY_TIMEOUT = 15000;
const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
};

function startStaticServer(root, port) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      let urlPath = normalize(decodeURIComponent(req.url ?? '/'));
      if (urlPath === '/' || urlPath === '') {
        urlPath = '/index.html';
      }

      let filePath = join(root, urlPath);

      // Try the exact file first, then fall back to index.html for SPA routes
      try {
        const stat = statSync(filePath);
        if (stat.isDirectory()) {
          filePath = join(filePath, 'index.html');
        }
      } catch {
        // File doesn't exist — serve index.html (SPA fallback)
        filePath = join(root, 'index.html');
      }

      readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end('Not found');
          return;
        }
        const ext = extname(filePath);
        res.writeHead(200, { 'Content-Type': MIME[ext] ?? 'application/octet-stream' });
        res.end(data);
      });
    });

    server.listen(port, '127.0.0.1', () => resolve(server));
    server.on('error', reject);
  });
}

function injectMeta(page, route) {
  return page.evaluate((meta) => {
    document.title = meta.title;

    function setMeta(attr, key, content) {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    }

    setMeta('name', 'description', meta.description);
    setMeta('property', 'og:title', meta.ogTitle);
    setMeta('property', 'og:description', meta.ogDescription);
    setMeta('property', 'og:type', 'website');
    setMeta('name', 'twitter:card', 'summary_large_image');
  }, route);
}

async function waitForReady(page) {
  try {
    await page.waitForFunction(
      'document.documentElement.getAttribute("data-prerender-ready") === "true"',
      { timeout: READY_TIMEOUT }
    );
  } catch {
    console.warn(`  [warn] Ready signal timeout — capturing current state`);
  }
}

async function prerenderRoute(browser, baseUrl, route) {
  const page = await browser.newPage();
  await page.setUserAgent('GreenatechPrerenderBot/1.0');

  const url = `${baseUrl}${route.path}`;
  console.log(`  Prerendering ${route.path} ...`);

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });
  await waitForReady(page);
  await new Promise((r) => setTimeout(r, 200));

  await injectMeta(page, route);

  const html = await page.content();

  const outDir = route.path === '/' ? distDir : join(distDir, route.path);
  const outFile = join(outDir, 'index.html');

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outFile, html);
  console.log(`  Written: ${route.path === '/' ? 'dist/index.html' : `dist${route.path}/index.html`}`);

  await page.close();
}

async function main() {
  console.log('Starting prerendering...');

  const port = 4174;
  const server = await startStaticServer(distDir, port);
  const baseUrl = `http://127.0.0.1:${port}`;

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });

    for (const route of ROUTES) {
      await prerenderRoute(browser, baseUrl, route);
    }

    // Update 404.html with prerendered root content
    const rootHtml = readFileSync(join(distDir, 'index.html'), 'utf-8');
    writeFileSync(join(distDir, '404.html'), rootHtml);
    console.log('  Updated: dist/404.html');

    console.log('\nPrerendering complete.');
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error('Prerendering failed:', err);
  process.exit(1);
});
