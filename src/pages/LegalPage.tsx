import { type ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface LegalPageProps {
  title: string;
  eyebrow: string;
  description: string;
  children: ReactNode;
}

export default function LegalPage({ title, eyebrow, description, children }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <Navbar />

      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 border-b border-brand-border">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="flex items-center mb-6">
            <span className="text-brand-green text-xs font-semibold uppercase tracking-widest">
              {eyebrow}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-white mb-6">
            {title}
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed max-w-2xl font-light">
            {description}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="prose-legal">
            {children}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
