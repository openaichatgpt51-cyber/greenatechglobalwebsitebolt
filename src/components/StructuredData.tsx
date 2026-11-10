import { useEffect } from 'react';
import { faqs } from '../data/faqs';

export function FAQStructuredData() {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    };

    document.head.querySelectorAll('script[data-schema="faq"]').forEach((el) => el.remove());
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'faq');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}

export function OrganizationStructuredData() {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Greenatech Global',
      url: 'https://greenatechglobal.com',
      logo: 'https://greenatechglobal.com/Main_Logo.png',
      description: 'AI-first technology company building enterprise solutions, training programmes, and AI-powered products from Lagos, Nigeria.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '294 Herbert Macaulay Way, Yaba',
        addressLocality: 'Lagos',
        addressCountry: 'NG',
      },
      email: 'info@greenatechglobal.com',
      sameAs: [],
    };

    document.head.querySelectorAll('script[data-schema="organization"]').forEach((el) => el.remove());
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'organization');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
