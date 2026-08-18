import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTADuo() {
  return (
    <section className="py-24 lg:py-36 bg-[#0a0a0a]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-brand-border">
          {/* Left - Client CTA */}
          <div className="relative overflow-hidden bg-brand-card group">
            <div className="absolute inset-0">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Scale your business"
                className="w-full h-full object-cover opacity-20 transition-opacity duration-500 group-hover:opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 via-transparent to-transparent" />
            </div>
            <div className="relative z-10 p-10 lg:p-16 min-h-80 flex flex-col justify-between">
              <div className="w-10 h-10 border border-brand-green flex items-center justify-center mb-8">
                <span className="text-brand-green font-black text-xs">01</span>
              </div>
              <div>
                <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-5">
                  Are You Ready to Scale?
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
                  Tell us about your challenge. We'll engineer the AI solution that automates
                  your growth and secures your lead.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 bg-brand-green text-black text-sm font-semibold px-7 py-3.5 hover:bg-lime-400 transition-colors duration-200 group/btn"
                >
                  Share Your Challenge
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right - Careers CTA */}
          <div className="relative overflow-hidden bg-brand-card group">
            <div className="absolute inset-0">
              <img
                src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Join our team"
                className="w-full h-full object-cover opacity-20 transition-opacity duration-500 group-hover:opacity-30"
              />
            </div>
            <div className="relative z-10 p-10 lg:p-16 min-h-80 flex flex-col justify-between">
              <div className="w-10 h-10 border border-white/30 flex items-center justify-center mb-8">
                <span className="text-white/60 font-black text-xs">02</span>
              </div>
              <div>
                <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-5">
                  A New Class of Technology Partner.
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
                  Join a mission-driven collective building AI infrastructure and the next
                  generation of innovators shaping it.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 border border-white/30 text-white text-sm font-semibold px-7 py-3.5 hover:bg-white hover:text-brand-dark transition-all duration-200 group/btn"
                >
                  Grow Your Career
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
