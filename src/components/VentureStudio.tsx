import { ArrowRight, Lightbulb, Rocket, TrendingUp } from 'lucide-react';

const stages = [
  {
    icon: Lightbulb,
    number: '01',
    title: 'The Idea Forge',
    desc: 'Turn your vision into a validated plan. We refine your concept, shape the product, and map the road to market.',
    color: 'text-brand-green',
    border: 'border-brand-green/30',
  },
  {
    icon: Rocket,
    number: '02',
    title: 'The Reality Engine',
    desc: 'We design, build, and launch. Brand identity, product development, and go-to-market execution — all under one roof.',
    color: 'text-sky-400',
    border: 'border-sky-400/30',
  },
  {
    icon: TrendingUp,
    number: '03',
    title: 'The Growth Driver',
    desc: 'Scale for lasting impact. Growth strategy, partnerships, and the operational infrastructure to carry you into the next decade.',
    color: 'text-amber-400',
    border: 'border-amber-400/30',
  },
];

export default function VentureStudio() {
  return (
    <section id="venture-studio" className="py-24 lg:py-36 bg-[#0a0a0a] border-y border-brand-border">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center mb-6">
              <span className="text-brand-green text-xs font-semibold uppercase tracking-widest">
                Venture Studio
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight mb-6">
              From bold idea to<br />extraordinary company.
            </h2>
            <p className="text-gray-400 leading-relaxed">
              The Future Catalyst™ framework — a proprietary three-stage approach that
              takes your vision from concept to scale, with Greenatech as your co-builder
              every step of the way.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-white text-sm font-semibold border-b border-brand-green pb-0.5 hover:text-brand-green transition-colors duration-200 group whitespace-nowrap"
          >
            Start building
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-border">
          {stages.map(({ icon: Icon, number, title, desc, color, border }) => (
            <div key={title} className={`bg-[#0a0a0a] p-8 lg:p-10 border-l-2 ${border} group hover:bg-brand-card transition-colors duration-300`}>
              <div className="flex items-start justify-between mb-8">
                <span className={`text-4xl font-black ${color} opacity-30`}>{number}</span>
                <div className={`w-10 h-10 border ${border} flex items-center justify-center ${color}`}>
                  <Icon size={18} />
                </div>
              </div>
              <h3 className={`text-xl font-black text-white mb-4 group-hover:${color} transition-colors duration-200`}>{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
