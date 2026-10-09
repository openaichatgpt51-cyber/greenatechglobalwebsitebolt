import { useEffect } from 'react';

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
    q: 'What does the build and delivery phase involve?',
    a: 'Our cross-functional teams design, build, and deploy in agile iterations — delivering working systems at every milestone. We stay close through deployment and iteration, with ongoing AIOps, security hardening, and performance optimisation.',
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
    q: 'What is Greenatech\'s engagement process?',
    a: 'Every engagement starts with a structured discovery — we map your operations, identify automation and security gaps, and define the outcomes that matter most to your business. From there, we design and deliver the solution, then stay close through deployment and iteration. No black-box handoffs.',
  },
  {
    q: 'How does a project typically begin?',
    a: 'Most enterprise clients start with an AI Readiness Audit — a focused assessment of where automation can reduce cost, eliminate manual work, or close security vulnerabilities. From there, we scope and build. Some clients move fast with a single workflow; others engage us across the full stack of their operations.',
  },
];

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
      url: 'https://greenatech.com',
      logo: 'https://greenatech.com/Main_Logo.png',
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
