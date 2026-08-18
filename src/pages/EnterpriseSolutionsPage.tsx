import { Link } from 'react-router-dom';
import { ArrowRight, Cloud, Brain, Shield, Zap, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const services = [
  {
    icon: Cloud,
    metric: '40%',
    metricLabel: 'average cost reduction',
    title: 'Cloud Solutions',
    description: 'Build, deploy, and scale on architecture optimized for 99.99% uptime, security, and seamless migration.',
    features: ['AWS & Azure architecture', 'Kubernetes & container orchestration', 'CI/CD pipeline automation', 'Serverless & microservices', 'Cloud cost optimisation', 'Disaster recovery planning'],
    color: 'text-sky-400',
    borderColor: 'hover:border-sky-500/40',
    glow: 'from-sky-500/10 to-transparent',
  },
  {
    icon: Brain,
    metric: '3x',
    metricLabel: 'faster business insights',
    title: 'AI & Machine Learning',
    description: 'Deploy custom models and predictive analytics that automate complex operations and unlock new value.',
    features: ['Custom LLM deployment', 'Predictive analytics', 'Computer vision systems', 'AI agent workflows', 'RAG & knowledge bases', 'MLOps & model monitoring'],
    color: 'text-brand-green',
    borderColor: 'hover:border-brand-green/40',
    glow: 'from-brand-green/10 to-transparent',
  },
  {
    icon: Shield,
    metric: '99.9%',
    metricLabel: 'threat prevention',
    title: 'Cybersecurity',
    description: 'Implement proactive, end-to-end security with robust threat detection and zero-trust architecture.',
    features: ['Zero-trust architecture', 'Penetration testing', 'Security operations centre', 'Compliance & audit (ISO, GDPR)', 'Threat intelligence & detection', 'Incident response planning'],
    color: 'text-amber-400',
    borderColor: 'hover:border-amber-500/40',
    glow: 'from-amber-500/10 to-transparent',
  },
  {
    icon: Zap,
    metric: '60%',
    metricLabel: 'operational efficiency boost',
    title: 'Digital Transformation',
    description: 'Modernize legacy systems and integrate intelligent workflows to outpace market changes.',
    features: ['Legacy system modernisation', 'Process automation', 'Data platform engineering', 'API & systems integration', 'Product strategy & design', 'Change management & enablement'],
    color: 'text-rose-400',
    borderColor: 'hover:border-rose-500/40',
    glow: 'from-rose-500/10 to-transparent',
  },
];

const process = [
  { num: '01', title: 'Discovery & Assessment', desc: 'We map your current landscape, identify high-impact opportunities, and define a clear technical roadmap aligned to your business goals.' },
  { num: '02', title: 'Architecture & Design', desc: 'We engineer the solution architecture — selecting the right cloud, AI, and security stack to ensure scalability from day one.' },
  { num: '03', title: 'Build & Deploy', desc: 'Our cross-functional teams build, test, and deploy in agile iterations, delivering working software at every milestone.' },
  { num: '04', title: 'Scale & Optimise', desc: 'We monitor, tune, and scale your systems with ongoing AIOps, security hardening, and performance optimisation.' },
];

export default function EnterpriseSolutionsPage() {
  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <Navbar />
      <PageHero
        eyebrow="Enterprise Solutions"
        title={<>Built for scale</>}
        subtitle="From resilient cloud infrastructure to AI-powered automation, we help enterprises move faster, operate more securely, and compete at a global level, not just participate in the digital economy, but lead it."
        image="https://images.pexels.com/photos/37730212/pexels-photo-37730212.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      {/* Services grid */}
      <section className="py-24 lg:py-32 bg-brand-dark">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="max-w-2xl mb-14">
            <div className="flex items-center mb-6">
              <span className="text-brand-green text-xs font-semibold uppercase tracking-widest">
                Our Capabilities
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight">
              Four disciplines. One integrated team.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-border">
            {services.map(({ icon: Icon, metric, metricLabel, title, description, features, color, borderColor, glow }) => (
              <article
                key={title}
                className={`relative bg-brand-dark border border-transparent ${borderColor} group overflow-hidden transition-all duration-300 p-8 lg:p-10`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <span className={`text-5xl font-black ${color} leading-none`}>{metric}</span>
                      <p className="text-gray-500 text-xs mt-1 max-w-[120px] leading-snug">{metricLabel}</p>
                    </div>
                    <div className={`w-12 h-12 border border-brand-border flex items-center justify-center ${color} group-hover:border-current transition-colors duration-300`}>
                      <Icon size={20} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {features.map((f) => (
                      <div key={f} className="flex items-start gap-2.5">
                        <CheckCircle2 size={14} className={`${color} mt-0.5 flex-shrink-0`} />
                        <span className="text-gray-500 text-xs">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`absolute bottom-0 left-0 w-0 h-0.5 bg-current ${color} group-hover:w-full transition-all duration-500`} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 lg:py-32 bg-[#0a0a0a] border-y border-brand-border">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="max-w-2xl mb-14">
            <div className="flex items-center mb-6">
              <span className="text-brand-green text-xs font-semibold uppercase tracking-widest">
                How We Work
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight">
              A proven path from idea to scale.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-border">
            {process.map(({ num, title, desc }) => (
              <div key={num} className="bg-[#0a0a0a] p-8 group hover:bg-brand-card transition-colors duration-300">
                <span className="text-4xl font-black text-brand-green opacity-30 mb-6 block">{num}</span>
                <h3 className="text-lg font-black text-white mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-brand-dark">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 p-10 lg:p-16 border border-brand-border">
            <div className="max-w-xl">
              <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-4">
                Not sure which service fits your challenge?
              </h2>
              <p className="text-gray-400 leading-relaxed">
                We'll help you find the right path forward. Book a discovery call with our team.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-brand-green text-black text-sm font-semibold px-8 py-4 hover:bg-lime-400 transition-colors duration-200 group whitespace-nowrap"
            >
              Discuss your project
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
