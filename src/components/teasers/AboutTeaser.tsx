import { Link } from 'react-router-dom';
import { ArrowRight, Building2, GraduationCap, Boxes } from 'lucide-react';

const pillars = [
  {
    icon: Building2,
    title: 'Enterprise Solutions',
    desc: 'Turnkey AI, cloud, and security solutions for forward-thinking enterprises across Africa.',
  },
  {
    icon: GraduationCap,
    title: 'Talent Pipeline',
    desc: 'Developing world-class technology talent from within Africa for the global digital economy.',
  },
  {
    icon: Boxes,
    title: 'Standalone Products',
    desc: 'AI-powered products built on our own core technology stack for the global digital economy.',
  },
];

export default function AboutTeaser() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-[#0a0a0a] border-b border-brand-border">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <div className="flex items-center mb-6">
              <span className="text-brand-green text-xs font-semibold uppercase tracking-widest">
                Who We Are
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
              Architecting the Future of African Enterprise
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              We are a self-reinforcing innovation engine built on three strategic pillars:
              delivering turnkey enterprise solutions, developing world-class technology talent,
              and scaling AI-powered products for the global digital economy.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-white text-sm font-semibold border-b border-brand-green pb-0.5 hover:text-brand-green transition-colors duration-200 group"
            >
              Learn more about us
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-px bg-brand-border">
              {pillars.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-[#0a0a0a] p-6 lg:p-8 flex items-start gap-5 group hover:bg-brand-card transition-colors duration-300"
                >
                  <div className="w-12 h-12 bg-brand-green/10 border border-brand-green/20 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-green/20 transition-colors duration-300">
                    <Icon size={20} className="text-brand-green" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white mb-2">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
