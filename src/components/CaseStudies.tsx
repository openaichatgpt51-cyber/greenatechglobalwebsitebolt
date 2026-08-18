import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { supabase, CaseStudy } from '../lib/supabase';

const fallback: Pick<CaseStudy, 'title' | 'tags' | 'image_url'>[] = [
  {
    title: 'AI automation solutions built for enterprise scale',
    tags: ['AI / Automation', 'Enterprise', 'Workflow'],
    image_url: 'https://images.pexels.com/photos/6147279/pexels-photo-6147279.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function CaseStudies() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    supabase
      .from('case_studies')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        setStudies((data as CaseStudy[]) ?? []);
        setLoaded(true);
      });
  }, []);

  const cards = studies.length > 0
    ? studies
    : loaded
      ? []
      : fallback.map((f, i) => ({ ...f, id: String(i), description: '', category: '', sort_order: i, published: true, created_at: '', updated_at: '' } as CaseStudy));

  return (
    <section id="case-studies" className="py-24 lg:py-36 bg-[#0a0a0a]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 lg:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center mb-6">
              <span className="text-brand-green text-xs font-semibold uppercase tracking-widest">
                Standalone Products
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight">
              AI-Powered Problem<br />Solving, Scaled
            </h2>
          </div>
          <div className="lg:max-w-sm">
            <p className="text-gray-400 leading-relaxed mb-6">
              Explore our growing portfolio of native AI products. Each is built on our own core
              technology stack to solve a distinct market problem at scale. From intelligent social
              automation to logistics, real estate, and beyond.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-white text-sm font-semibold border-b border-brand-green pb-0.5 hover:text-brand-green transition-colors duration-200 group"
            >
              Explore Our Products
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-border">
          {cards.map((study) => (
            <article key={study.id} className="bg-[#0a0a0a] group cursor-pointer overflow-hidden">
              {/* Image */}
              <div className="overflow-hidden aspect-video relative">
                <img
                  src={study.image_url}
                  alt={study.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="p-6 lg:p-7">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {study.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-gray-500 border border-brand-border px-2.5 py-1 hover:border-gray-600 hover:text-gray-400 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                  {study.tags.length > 3 && (
                    <span className="text-xs text-gray-600 border border-brand-border px-2.5 py-1">
                      +{study.tags.length - 3}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white leading-snug line-clamp-2 group-hover:text-brand-green transition-colors duration-200">
                  {study.title}
                </h3>

                <div className="mt-4 flex items-center gap-2 text-brand-green text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Explore product
                  <ArrowRight size={13} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
