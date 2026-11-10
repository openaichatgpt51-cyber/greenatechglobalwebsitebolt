import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CONTACT_FORM } from '../lib/links';

export default function MidCTA() {
  return (
    <section className="py-14 lg:py-16 bg-brand-card border-y border-brand-border">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black text-white leading-tight mb-2">
            Not sure where automation fits? Start with a conversation.
          </h2>
          <p className="text-gray-400 text-sm">
            A discovery call is free. Tell us what is slowing your team down and we will tell you what is possible.
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
    </section>
  );
}
