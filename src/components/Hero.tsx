import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT_FORM } from '../lib/links';

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
              AI-first technology company · Lagos, Nigeria
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] tracking-tight text-white mb-8">
            We automate what<br />
            <span className="text-brand-green">slows you down.</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mb-12 font-light">
            AI automation, cybersecurity and cloud for retail, financial services, education and
            public-sector teams across Africa. We find the manual process costing you most, and fix
            it. Start with a discovery call.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              to={CONTACT_FORM}
              className="inline-flex items-center justify-center gap-3 bg-brand-green text-black font-semibold px-8 py-4 hover:bg-lime-400 transition-all duration-200 group text-sm uppercase tracking-wider"
            >
              Book a discovery call
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-3 border border-white/30 text-white font-semibold px-8 py-4 hover:bg-white hover:text-brand-dark transition-all duration-200 text-sm uppercase tracking-wider"
            >
              See what we build
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 right-10 hidden lg:flex flex-col items-center gap-2">
          <span className="text-xs text-gray-400 uppercase tracking-widest rotate-90 origin-center translate-y-4">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-500 to-transparent" />
        </div>
      </div>

    </section>
  );
}
