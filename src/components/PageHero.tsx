import { type ReactNode } from 'react';

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  image: string;
}

export default function PageHero({ eyebrow, title, subtitle, image }: PageHeroProps) {
  return (
    <section className="relative min-h-[60vh] lg:min-h-[65vh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-brand-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/70 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10 pb-16 lg:pb-24 pt-32 w-full">
        <div className="max-w-3xl">
          <div className="flex items-center mb-6">
            <span className="text-brand-green text-xs font-semibold uppercase tracking-widest">
              {eyebrow}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight text-white mb-6">
            {title}
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-2xl font-light">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
