import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'What does Greenatech do?',
    a: 'We deliver a full suite of AI-first technology services — including enterprise automation, software engineering, UX/UI design, product development, and technology consulting — alongside a talent development programme and an AI-powered content product built for scale.',
  },
  {
    q: 'Which industries do you work with?',
    a: 'We work with enterprise clients across financial services, professional services, media, and the public sector — with a growing focus on organisations across Africa ready to modernise through AI and digital transformation.',
  },
  {
    q: 'Where are you located and where do you work?',
    a: 'Our headquarters are at 294 Herbert Macaulay Way, Yaba, Lagos. We operate with a distributed team and partner with clients across Africa and beyond, supporting seamless remote collaboration across time zones.',
  },
  {
    q: 'Can you show examples of your work?',
    a: 'Yes. We have delivered digital products, platforms, and brand experiences across multiple industries. Visit our case studies section to explore the depth and breadth of our work.',
  },
  {
    q: 'How do I start working with Greenatech?',
    a: "Reach out via our contact form or email us at info@greenatechglobal.com. We'll schedule a discovery call to understand your goals and map out how we can support them.",
  },
  {
    q: "What are Greenatech's values?",
    a: "We are a diverse, collaborative team guided by curiosity, boldness, ownership, and a commitment to doing work that matters. Our culture is built on trust, transparency, and inclusion — and a belief that Africa's best technology is still ahead of us.",
  },
  {
    q: "How does Greenatech's engagement process work?",
    a: 'Every engagement starts with a structured discovery — we map your operations, identify automation and security gaps, and define the outcomes that matter most to your business. From there, we design and deliver the solution, then stay close through deployment and iteration. No black-box handoffs.',
  },
  {
    q: 'What does an AI automation engagement typically look like?',
    a: 'Most enterprise clients start with an AI Readiness Audit — a focused assessment of where automation can reduce cost, eliminate manual work, or close security vulnerabilities. From there, we scope and build. Some clients move fast with a single workflow; others engage us across the full stack of their operations.',
  },
];

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
                          <Plus size={16} className="text-gray-500 group-hover:text-white transition-colors" />
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
