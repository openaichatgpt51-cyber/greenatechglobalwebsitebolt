import { ArrowRight } from 'lucide-react';

const insights = [
  {
    title: 'The question that determines whether an AI project succeeds',
    category: 'AI & Tech',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'How to know which AI layer your organisation is actually ready to build on',
    category: 'AI & Tech',
    image: 'https://images.pexels.com/photos/8438982/pexels-photo-8438982.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'The four structural challenges that determine whether green tech implementation works',
    category: 'Sustainability',
    image: 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Data quality for AI: why quality in = quality out',
    category: 'How-to Guides',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'How we built an AI framework for clean energy managers',
    category: 'Entrepreneurship',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Shadow AI: what it is, why it\'s already in your organisation, and what to do now',
    category: 'AI & Tech',
    image: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Before you build an AI agent, ask yourself these five questions',
    category: 'AI & Tech',
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'We deployed a local LLM on edge hardware for real-time energy monitoring',
    category: 'How-to Guides',
    image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'From SDLC to AI agent lifecycle: what changes when your software starts making decisions',
    category: 'AI & Tech',
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Is your infrastructure ready for AI implementation? Our pre-deployment checklist',
    category: 'Entrepreneurship',
    image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export default function Insights() {
  return (
    <section className="py-24 lg:py-36 bg-brand-dark">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 lg:mb-16">
          <div className="max-w-xl">
            <div className="flex items-center mb-6">
              <span className="text-brand-green text-xs font-semibold uppercase tracking-widest">
                Featured Insights
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight">
              Fresh perspectives on what&apos;s next
            </h2>
          </div>
          <div className="lg:max-w-sm">
            <p className="text-gray-400 leading-relaxed mb-6">
              Shaping the future starts with bold ideas. Dive into our insights for fresh perspectives,
              industry trends, and the innovations redefining our digital world.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-white text-sm font-semibold border-b border-brand-green pb-0.5 hover:text-brand-green transition-colors duration-200 group"
            >
              Get inspired
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-brand-border">
          {insights.map((item, i) => {
            const isFeatured = i === 0;
            return (
              <article
                key={item.title}
                className={`bg-brand-dark group cursor-pointer ${isFeatured ? 'lg:col-span-2 lg:row-span-2' : ''}`}
              >
                <div className={`overflow-hidden relative ${isFeatured ? 'aspect-[4/3]' : 'aspect-video'}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-brand-dark/30 group-hover:bg-transparent transition-colors duration-500" />
                  <span className="absolute top-3 left-3 bg-brand-dark/80 backdrop-blur-sm text-xs text-brand-green font-semibold px-2.5 py-1 uppercase tracking-wide">
                    {item.category}
                  </span>
                </div>

                <div className={`p-5 lg:p-6 ${isFeatured ? 'lg:p-8' : ''}`}>
                  <h3
                    className={`font-bold text-white leading-snug line-clamp-2 group-hover:text-brand-green transition-colors duration-200 ${
                      isFeatured ? 'text-xl lg:text-2xl' : 'text-sm'
                    }`}
                  >
                    {item.title}
                  </h3>
                  {isFeatured && (
                    <div className="mt-5 flex items-center gap-2 text-brand-green text-sm font-semibold group-hover:gap-3 transition-all duration-200">
                      Read article
                      <ArrowRight size={14} />
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
