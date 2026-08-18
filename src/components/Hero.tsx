import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Hero background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/75 to-brand-dark/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10 pb-24 pt-40">
        <div className="max-w-4xl">
          {/* Tag line */}
          <div className="flex items-center mb-8">
            <span className="text-brand-green text-sm font-semibold uppercase tracking-widest">
              The Definitive AI-First Technology Company
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] tracking-tight text-white mb-8">
            Engineering Next<br />
            <span className="text-brand-green">Enterprise Generation</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mb-12 font-light">
            Transform your operations, secure your infrastructure, and unlock scale that compounds
            with Greenatech, the definitive AI-first technology company, building world-class
            technology, talent, and products from the ground up.
          </p>

          {/* CTA */}
          <Link
            to="/services"
            className="inline-flex items-center gap-3 bg-brand-green text-black font-semibold px-8 py-4 hover:bg-lime-400 transition-all duration-200 group text-sm uppercase tracking-wider"
          >
            Explore our products
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 right-10 hidden lg:flex flex-col items-center gap-2">
          <span className="text-xs text-gray-500 uppercase tracking-widest rotate-90 origin-center translate-y-4">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-500 to-transparent" />
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 border-t border-brand-border bg-brand-dark/90 backdrop-blur-sm">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-brand-border">
            {[
              { value: '500+', label: 'Projects Delivered' },
              { value: '1000+', label: 'Tech Specialists Trained' },
              { value: '50+', label: 'Global Enterprise Clients' },
              { value: '10+', label: 'Owned AI Products' },
            ].map((stat) => (
              <div key={stat.label} className="px-6 py-6 lg:py-8">
                <div className="text-3xl lg:text-4xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
