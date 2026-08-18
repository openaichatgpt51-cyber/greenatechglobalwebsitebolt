import { Link } from 'react-router-dom';
import { ArrowRight, Building2, GraduationCap } from 'lucide-react';

export default function TrainingTeaser() {
  return (
    <section id="training" className="py-24 lg:py-32 bg-[#0a0a0a]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-14">
          <div className="flex items-center mb-6">
            <span className="text-brand-green text-xs font-semibold uppercase tracking-widest">
              Training & Education
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight mb-6">
            Grow the People.<br />Grow the Talent. Grow Africa.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            We are building the world's next technology pipeline from within Africa, producing
            globally competitive specialists while keeping your organisation ahead of the curve.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-brand-border mb-10">
          <div className="bg-[#0a0a0a] p-8 lg:p-10 group">
            <div className="flex items-start gap-5 mb-6">
              <div className="w-14 h-14 bg-brand-green/10 border border-brand-green/20 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-green/20 transition-colors duration-300">
                <Building2 size={22} className="text-brand-green" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white mb-2">Corporate Training</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Practical AI expertise your teams can deploy immediately. Not just certificates.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#0a0a0a] p-8 lg:p-10 group">
            <div className="flex items-start gap-5 mb-6">
              <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <GraduationCap size={22} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white mb-2">Greenatech Academy</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Intensive, structured pathways turning African potential into world-class technology talent.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Link
          to="/training"
          className="inline-flex items-center gap-2 text-white text-sm font-semibold border-b border-brand-green pb-0.5 hover:text-brand-green transition-colors duration-200 group"
        >
          Explore training programmes
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </section>
  );
}
