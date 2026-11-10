import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CONTACT_FORM } from '../lib/links';

const steps = [
  { num: '01', title: 'Discovery call', desc: 'A conversation about what is slowing your team down. No preparation needed on your side.' },
  { num: '02', title: 'Readiness assessment', desc: 'We map your operations and pinpoint where automation or security work will pay off first.' },
  { num: '03', title: 'Scoped pilot', desc: 'We build one workflow or fix, deliver working software, and measure the result with you.' },
  { num: '04', title: 'Scale what works', desc: 'If the pilot proves its value, we expand it, with ongoing monitoring and support.' },
];

export default function HowWeWork() {
  return (
    <section className="py-24 lg:py-32 bg-[#0a0a0a] border-y border-brand-border">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-12 lg:mb-14">
          <span className="text-brand-green text-xs font-semibold uppercase tracking-widest">How an engagement works</span>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight mt-6">
            Start small. Prove it. Then scale.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-border mb-10">
          {steps.map((s) => (
            <div key={s.num} className="bg-[#0a0a0a] p-8">
              <span className="text-3xl font-black text-brand-green opacity-40 block mb-5">{s.num}</span>
              <h3 className="text-lg font-black text-white mb-3">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="border border-brand-green/30 bg-brand-green/5 p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-brand-green text-xs font-semibold uppercase tracking-widest">Founding partner pilots</span>
            <h3 className="text-xl lg:text-2xl font-black text-white mt-3 mb-2">
              We are taking on our first enterprise partners.
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Early partners work directly with the founding team on a scoped pilot. Scope and terms
              are agreed on the discovery call, so there is no commitment to start the conversation.
            </p>
          </div>
          <Link
            to={CONTACT_FORM}
            className="inline-flex items-center justify-center gap-3 bg-brand-green text-black text-sm font-semibold px-7 py-3.5 hover:bg-lime-400 transition-colors duration-200 group whitespace-nowrap"
          >
            Book a discovery call
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </section>
  );
}
