const awards = [
  'AI Breakthrough Award',
  'Clean Creatives',
  'Best of Swiss Web',
  'Awwwards',
  'Analytics Insight',
  'Clutch Top Agency',
  'Digital Impact Award',
  'Green Tech Award',
  'Website of the Year',
  'DesignRush Verified',
  'TNW T500',
  'Techreviewer Top',
  'Superbcompanies',
  'Splash Awards',
  'Software Suggest',
  'Great Place to Work',
  'FD Fastest Growing',
  'Emerce 2024',
  'Diversity & Inclusion Award',
  'RemoteTech Breakthrough',
  'Sustainability Leaders Award',
  'Africa Tech Summit Award',
  'Goodfirms Top Developer',
  'Framer Expert',
];

export default function Awards() {
  const doubled = [...awards, ...awards];

  return (
    <section className="py-20 border-y border-brand-border overflow-hidden bg-brand-dark">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 mb-12">
        <p className="text-center text-xs text-gray-500 uppercase tracking-widest font-medium">
          Recognised for innovation and operational excellence in AI Breakthrough Award and industry-leading performance.
        </p>
      </div>

      <div className="overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-brand-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-brand-dark to-transparent z-10 pointer-events-none" />

        <div className="marquee-track">
          {doubled.map((award, i) => (
            <div
              key={`${award}-${i}`}
              className="flex items-center gap-8 mx-8 whitespace-nowrap"
            >
              <span className="text-gray-600 text-sm font-medium hover:text-gray-400 transition-colors cursor-default">
                {award}
              </span>
              <span className="text-brand-green text-xs">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
