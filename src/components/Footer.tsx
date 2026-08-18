import { Linkedin, Twitter, Instagram, Youtube, ArrowRight, MapPin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = {
  Services: [
    { label: 'Enterprise Solutions', to: '/services' },
    { label: 'AI & Machine Learning', to: '/services' },
    { label: 'Cloud Solutions', to: '/services' },
    { label: 'Cybersecurity', to: '/services' },
    { label: 'Digital Transformation', to: '/services' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Our Products', to: '/' },
    { label: 'Careers', to: '/contact' },
    { label: 'The Next Generation Hub', to: '/training' },
  ],
  Training: [
    { label: 'Corporate Training', to: '/training' },
    { label: 'Tech Starter Tracks', to: '/training' },
    { label: 'Youth Empowerment Hub', to: '/training' },
  ],
  Legal: ['Privacy Policy', 'Cookie Policy', 'Terms of Service'],
};

const socials = [
  { Icon: Linkedin, href: '#', label: 'LinkedIn' },
  { Icon: Twitter, href: '#', label: 'Twitter' },
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-brand-dark border-t border-brand-border">
      {/* Contact CTA strip */}
      <div className="border-b border-brand-border">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <h3 className="text-3xl lg:text-4xl font-black text-white mb-2">
                Ready to start a conversation?
              </h3>
              <p className="text-gray-400 text-sm">
                Drop us a line and we'll be in touch within 24 hours.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-brand-green text-black text-sm font-semibold px-8 py-4 hover:bg-lime-400 transition-colors duration-200 group whitespace-nowrap"
            >
              Say hello
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-3">
            <Link to="/" className="inline-flex items-center mb-6">
              <div className="bg-white rounded px-3 py-1.5">
                <img src="/Main_Logo.png" alt="Greenatech" className="h-7 w-auto" />
              </div>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Africa's definitive AI-first technology company. We build world-class technology,
              talent, and products from the ground up — engineering the next enterprise generation.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-8">
              <a
                href="mailto:info@greenatechglobal.com"
                className="flex items-start gap-2.5 text-gray-500 text-sm hover:text-white transition-colors group"
              >
                <Mail size={14} className="mt-0.5 flex-shrink-0 text-brand-green" />
                info@greenatechglobal.com
              </a>
              <div className="flex items-start gap-2.5 text-gray-500 text-sm">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-brand-green" />
                <span>294 Herbert Macaulay Way,<br />Yaba, Lagos</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-brand-border flex items-center justify-center text-gray-500 hover:text-white hover:border-gray-500 transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">
                    {category}
                  </h4>
                  <ul className="space-y-3">
                    {links.map((link) => {
                      const label = typeof link === 'string' ? link : link.label;
                      const to = typeof link === 'string' ? '#' : link.to;
                      return (
                        <li key={label}>
                          <Link
                            to={to}
                            className="text-gray-500 text-sm hover:text-white transition-colors duration-200"
                          >
                            {label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-border">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-gray-600 text-xs">
              © {new Date().getFullYear()} Greenatech Global. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/contact" className="text-gray-600 text-xs hover:text-gray-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/contact" className="text-gray-600 text-xs hover:text-gray-400 transition-colors">
                Cookie Settings
              </Link>
              <Link to="/contact" className="text-gray-600 text-xs hover:text-gray-400 transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
