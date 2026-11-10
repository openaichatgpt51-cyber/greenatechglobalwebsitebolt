import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { faqs } from '../data/faqs';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 lg:py-36 bg-[#0a0a0a]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left */}
          <div className="lg:col-span-4">
            <div className="flex items-center mb-6">
              <span className="text-brand-green text-xs font-semibold uppercase tracking-widest">
                FAQ
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
              Questions?<br />We have<br />answers.
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Questions about our team, process, or results? These FAQs cover the essentials.
            </p>
          </div>

          {/* Right — accordion */}
          <div className="lg:col-span-8">
            <div className="divide-y divide-brand-border">
              {faqs.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={faq.q} className="py-5">
                    <button
                      className="w-full flex items-start justify-between gap-6 text-left group"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                    >
                      <span
                        className={`text-sm lg:text-base font-semibold leading-snug transition-colors duration-200 ${
                          isOpen ? 'text-brand-green' : 'text-white group-hover:text-brand-green'
                        }`}
                      >
                        {faq.q}
                      </span>
                      <span className="flex-shrink-0 mt-0.5">
                        {isOpen ? (
                          <Minus size={16} className="text-brand-green" />
                        ) : (
                          <Plus size={16} className="text-gray-400 group-hover:text-white transition-colors" />
                        )}
                      </span>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="text-gray-400 text-sm leading-relaxed pr-8">{faq.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
