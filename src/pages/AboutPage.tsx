import { Link } from 'react-router-dom';
import { ArrowRight, Target, Users, Globe, Lightbulb } from 'lucide-react';
import PageHero from '../components/PageHero';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const milestones = [
  { year: '2015', title: 'Founded in Lagos', desc: 'Greenatech begins as a small engineering team with a bold vision for African technology.' },
  { year: '2018', title: 'First Enterprise Clients', desc: 'We deliver cloud and AI solutions to leading enterprises across Nigeria and West Africa.' },
  { year: '2021', title: 'Next Generation Hub Launches', desc: "Our youth training initiative opens, beginning our mission to build Africa's tech talent pipeline." },
  { year: '2023', title: 'Standalone Products Division', desc: 'We launch our own portfolio of AI-powered products for the global digital economy.' },
  { year: '2025', title: '500+ Projects, 1000+ Trained', desc: 'A self-reinforcing innovation engine operating across three strategic pillars at scale.' },
];

const values = [
  { icon: Target, title: 'Outcome-Focused', desc: 'We measure success by the lasting value we create, not the code we write.' },
  { icon: Users, title: 'Talent-First', desc: "We invest in people — building Africa's next generation of world-class engineers." },
  { icon: Globe, title: 'Global Ambition', desc: 'We build from Lagos for the world, ensuring African enterprises lead globally.' },
  { icon: Lightbulb, title: 'AI-Native', desc: 'AI is not an add-on. It is the foundation of everything we architect and build.' },
];

const stats = [
  { value: '500+', label: 'Projects Delivered' },
  { value: '1000+', label: 'Tech Specialists Trained' },
  { value: '50+', label: 'Global Enterprise Clients' },
  { value: '10+', label: 'Owned AI Products' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <Navbar />
      <PageHero
        eyebrow="About Us"
        title={<>A winning team.</>}
        subtitle="Greenatech is the definitive AI-first technology company. From our base in Lagos, Nigeria, we build world-class technology, talent, and products from the ground up, engineering the next enterprise generation."
        image="https://images.pexels.com/photos/1181738/pexels-photo-1181738.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      {/* Story */}
      <section className="py-24 lg:py-32 bg-brand-dark">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="flex items-center mb-6">
                <span className="text-brand-green text-xs font-semibold uppercase tracking-widest">
                  Our Story
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight mb-6">
                A self-reinforcing innovation engine
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-5">
              <p className="text-gray-300 text-lg leading-relaxed">
                Greenatech is more than an agency. We are a self-reinforcing innovation engine built on
                three strategic pillars.
              </p>
              <p className="text-gray-400 leading-relaxed">
                From Lagos, Nigeria, we deliver turnkey solutions to forward-thinking enterprises across
                Africa, develop a pipeline of world-class technical talent, and scale our own portfolio of
                AI-powered products for the global digital economy.
              </p>
              <p className="text-gray-400 leading-relaxed">
                The three pillars reinforce each other: enterprise work sharpens our engineering, training
                feeds our talent pipeline, and our standalone products bring our own innovations directly to
                market. Together, they form an engine that compounds value at every stage.
              </p>
              <blockquote className="border-l-2 border-brand-green pl-6 mt-8">
                <p className="text-xl lg:text-2xl font-light text-white/80 leading-relaxed italic">
                  "We are the definitive force helping organisations automate, secure, and scale. We ensure
                  enterprises don't just participate in the global digital economy, but lead it."
                </p>
                <cite className="block mt-4 text-sm text-gray-500 not-italic">
                  Greenatech Leadership Team
                </cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-20 bg-[#0a0a0a] border-y border-brand-border">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-brand-border">
            {stats.map((stat) => (
              <div key={stat.label} className="px-6 py-6 text-center">
                <div className="text-4xl lg:text-5xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 bg-brand-dark">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="max-w-2xl mb-14">
            <div className="flex items-center mb-6">
              <span className="text-brand-green text-xs font-semibold uppercase tracking-widest">
                What Drives Us
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight">
              Values that shape every decision.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-border">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-brand-dark p-8 group hover:bg-brand-card transition-colors duration-300">
                <div className="w-12 h-12 bg-brand-green/10 border border-brand-green/20 flex items-center justify-center mb-6 group-hover:bg-brand-green/20 transition-colors duration-300">
                  <Icon size={20} className="text-brand-green" />
                </div>
                <h3 className="text-lg font-black text-white mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 lg:py-32 bg-[#0a0a0a] border-t border-brand-border">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="max-w-2xl mb-14">
            <div className="flex items-center mb-6">
              <span className="text-brand-green text-xs font-semibold uppercase tracking-widest">
                Our Journey
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight">
              From Lagos to the world.
            </h2>
          </div>

          <div className="space-y-px bg-brand-border">
            {milestones.map((m) => (
              <div key={m.year} className="bg-[#0a0a0a] p-6 lg:p-8 grid grid-cols-1 sm:grid-cols-4 gap-4 group hover:bg-brand-card transition-colors duration-300">
                <div className="text-3xl font-black text-brand-green">{m.year}</div>
                <div className="sm:col-span-3">
                  <h3 className="text-lg font-bold text-white mb-2">{m.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                </div>
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
                Want to be part of the story?
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Join a mission-driven collective building Africa's AI infrastructure and nurturing
                the world's next pipeline of innovators.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-brand-green text-black text-sm font-semibold px-8 py-4 hover:bg-lime-400 transition-colors duration-200 group whitespace-nowrap"
            >
              Get in touch
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
