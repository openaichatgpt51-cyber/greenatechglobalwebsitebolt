import { ArrowUpRight } from 'lucide-react';
import '@fontsource/dm-serif-display/400.css';

// ContentEngine's own brand colours (taken from the product's sign-in screen)
const GOLD = '#C8963E';
const wordmarkFont = "'DM Serif Display', Georgia, 'Times New Roman', serif";

export default function ContentEngineFeature() {
  return (
    <article
      aria-labelledby="contentengine-heading"
      className="border border-brand-border bg-[#0d0d0f] overflow-hidden mb-px"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Brand panel */}
        <div className="lg:col-span-5 p-8 sm:p-10 lg:p-14 flex flex-col justify-center">
          <span
            className="self-start text-xs font-semibold uppercase tracking-widest px-2.5 py-1 border mb-8"
            style={{ color: GOLD, borderColor: `${GOLD}66` }}
          >
            Coming soon
          </span>

          <h3
            id="contentengine-heading"
            className="text-5xl sm:text-6xl leading-none tracking-tight"
            style={{ fontFamily: wordmarkFont, fontWeight: 400 }}
          >
            <span className="text-white">Content</span>
            <span style={{ color: GOLD }}>Engine</span>
          </h3>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            AI social media dashboard
          </p>

          <p className="mt-8 text-gray-400 leading-relaxed">
            AI-powered social media content automation for enterprise teams. Plan campaigns,
            generate posts for LinkedIn, Instagram and X, approve them in a single review queue,
            and publish on schedule.
          </p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {['AI / Content', 'Automation', 'Social Media'].map((tag) => (
              <span key={tag} className="text-xs text-gray-400 border border-brand-border px-2.5 py-1">
                {tag}
              </span>
            ))}
          </div>

          <a
            href="https://contentengine.social"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 self-start inline-flex items-center gap-2 text-sm font-semibold text-white border-b pb-0.5 transition-colors duration-200 hover:opacity-80"
            style={{ borderColor: GOLD }}
          >
            Visit contentengine.social
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Product screenshots */}
        <div className="lg:col-span-7 bg-[#141416] border-t lg:border-t-0 lg:border-l border-brand-border p-6 sm:p-8 lg:p-12 flex items-center">
          <figure className="w-full">
            <div className="relative pb-8 sm:pb-10 sm:pr-6">
              <img
                src="/contentengine/review-queue.webp"
                alt="ContentEngine review queue showing an AI-generated LinkedIn post with a live preview"
                width={1145}
                height={644}
                loading="lazy"
                className="w-full h-auto border border-brand-border shadow-2xl"
              />
              <img
                src="/contentengine/login.webp"
                alt="ContentEngine sign-in screen"
                width={1366}
                height={644}
                loading="lazy"
                className="hidden sm:block absolute bottom-0 right-0 w-[46%] h-auto border border-brand-border shadow-2xl"
              />
            </div>
            <figcaption className="mt-4 text-xs text-gray-500">
              Sample output from the ContentEngine dashboard (demo account).
            </figcaption>
          </figure>
        </div>
      </div>
    </article>
  );
}
