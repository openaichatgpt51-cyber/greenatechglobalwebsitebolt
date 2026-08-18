import { Link } from 'react-router-dom';
import { ArrowRight, Cloud, Brain, Shield, Zap } from 'lucide-react';

const services = [
  { icon: Cloud, title: 'Cloud Solutions', desc: 'Architecture optimized for 99.99% uptime and seamless migration.', color: 'text-sky-400' },
  { icon: Brain, title: 'AI & Machine Learning', desc: 'Custom models and predictive analytics that automate operations.', color: 'text-brand-green' },
  { icon: Shield, title: 'Cybersecurity', desc: 'Proactive, end-to-end security with zero-trust architecture.', color: 'text-amber-400' },
  { icon: Zap, title: 'Digital Transformation', desc: 'Modernize legacy systems with intelligent workflows.', color: 'text-rose-400' },
];

export default function ServicesTeaser() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-brand-dark">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <div className="flex items-center mb-6">
              <span className="text-brand-green text-xs font-semibold uppercase tracking-widest">
                Enterprise Solutions
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight mb-6">
              Built for scale
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              From resilient cloud infrastructure to AI-powered automation, we help enterprises
              move faster, operate more securely, and compete at a global level, not just participate
              in the digital economy, but lead it.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-white text-sm font-semibold border-b border-brand-green pb-0.5 hover:text-brand-green transition-colors duration-200 group whitespace-nowrap"
          >
            View all services
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-brand-border">
          {services.map(({ icon: Icon, title, desc, color }) => (
            <div
              key={title}
              className="bg-brand-dark p-6 lg:p-8 group hover:bg-brand-card transition-colors duration-300"
            >
              <div className={`w-12 h-12 border border-brand-border flex items-center justify-center ${color} mb-6 group-hover:border-current transition-colors duration-300`}>
                <Icon size={20} />
              </div>
              <h3 className="text-base font-black text-white mb-3">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
