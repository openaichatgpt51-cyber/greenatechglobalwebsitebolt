import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

const products = [
  {
    name: 'Workflow Automation Engine',
    category: 'AI / Automation',
    description: 'Replace manual approval chains and data-entry tasks with AI-powered workflows that learn, adapt, and scale across your organisation.',
    tags: ['Automation', 'Enterprise', 'Workflow'],
    status: 'Live',
  },
  {
    name: 'Social Media Intelligence Suite',
    category: 'AI / Analytics',
    description: 'Real-time sentiment analysis, trend detection, and content optimisation powered by natural language processing models tuned for African markets.',
    tags: ['AI', 'Social', 'Analytics'],
    status: 'Live',
  },
  {
    name: 'Logistics Optimiser',
    category: 'AI / Logistics',
    description: 'Route optimisation, demand forecasting, and fleet management built for last-mile delivery challenges in dense urban environments.',
    tags: ['Logistics', 'AI', 'Optimisation'],
    status: 'Beta',
  },
  {
    name: 'Real Estate Intelligence Platform',
    category: 'AI / PropTech',
    description: 'Property valuation, market trend analysis, and investment scoring for the African real estate market using machine learning on local data.',
    tags: ['PropTech', 'AI', 'Real Estate'],
    status: 'Beta',
  },
  {
    name: 'Talent Pipeline Manager',
    category: 'AI / HR Tech',
    description: 'Connects our Academy graduates with enterprise clients, matching technical skills to project requirements using AI-driven profiling.',
    tags: ['HR Tech', 'Talent', 'AI'],
    status: 'Live',
  },
  {
    name: 'Cybersecurity Threat Monitor',
    category: 'Security / AI',
    description: 'Continuous threat detection and automated response for enterprise networks, with AI-powered anomaly detection tuned for African infrastructure.',
    tags: ['Security', 'AI', 'Enterprise'],
    status: 'Live',
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <Navbar />
      <PageHero
        eyebrow="Our Products"
        title={<>Products we own. Problems we chose to solve.</>}
        subtitle="Every product in this portfolio started as a problem we saw African businesses struggling with and couldn't find a world-class solution for. So we built one."
        image="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <section className="py-24 lg:py-32 bg-brand-dark">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="max-w-2xl mb-14 lg:mb-16">
            <div className="flex items-center mb-6">
              <span className="text-brand-green text-xs font-semibold uppercase tracking-widest">
                Portfolio
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight">
              AI-powered products that run on our core infrastructure.
            </h2>
            <p className="text-gray-400 leading-relaxed mt-6">
              Each product runs on Greenatech's core AI infrastructure, which means every new
              product we ship makes the stack stronger for all the others.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-border">
            {products.map((product) => (
              <article
                key={product.name}
                className="bg-brand-dark p-8 group hover:bg-brand-card transition-colors duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-xs text-brand-green font-semibold uppercase tracking-widest">
                    {product.category}
                  </span>
                  <span className={`text-xs px-2.5 py-1 border ${product.status === 'Live' ? 'border-brand-green/30 text-brand-green' : 'border-brand-border text-gray-500'}`}>
                    {product.status}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white mb-3 group-hover:text-brand-green transition-colors duration-200">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                  {product.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-gray-600 border border-brand-border px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-[#0a0a0a] border-t border-brand-border">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 p-10 lg:p-16 border border-brand-border">
            <div className="max-w-xl">
              <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-4">
                Have a problem we should solve?
              </h2>
              <p className="text-gray-400 leading-relaxed">
                We are always looking for the next problem worth building a product for. If your
                organisation faces a challenge that no existing solution handles well, let's talk.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-brand-green text-black text-sm font-semibold px-8 py-4 hover:bg-lime-400 transition-colors duration-200 group whitespace-nowrap"
            >
              Start a conversation
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
