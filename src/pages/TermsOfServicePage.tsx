import LegalPage from './LegalPage';

export default function TermsOfServicePage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      description="The terms and conditions that govern your use of the Greenatech website and our digital services."
    >
      <p className="text-gray-500 text-sm mb-10">Last updated: October 8, 2026</p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using the Greenatech website, you agree to be bound by these Terms of
        Service and all applicable laws and regulations. If you do not agree with any part of these
        terms, please do not use our website or services.
      </p>

      <h2>2. Use of Our Website</h2>
      <p>
        You may use our website for lawful purposes only. You agree not to use the site to transmit
        any material that is unlawful, harmful, defamatory, infringing, or otherwise objectionable.
        You may not attempt to gain unauthorised access to any part of the website, its server, or
        any database connected to the site.
      </p>

      <h2>3. Intellectual Property</h2>
      <p>
        All content on this website — including text, graphics, logos, images, and software — is
        the property of Greenatech Global or its content creators and is protected by intellectual
        property laws. You may not reproduce, distribute, or create derivative works from any
        content on this site without our prior written consent.
      </p>

      <h2>4. Service Descriptions</h2>
      <p>
        Information about our enterprise solutions, training programmes, and products on this
        website is provided for general informational purposes. We reserve the right to modify,
        suspend, or discontinue any service at any time without prior notice.
      </p>

      <h2>5. Client Engagements</h2>
      <p>
        Any engagement for professional services between you and Greenatech will be governed by a
        separate written agreement. These Terms of Service apply solely to your use of this website
        and do not constitute a service contract.
      </p>

      <h2>6. Disclaimer of Warranties</h2>
      <p>
        This website is provided "as is" and "as available" without warranties of any kind, whether
        express or implied. We do not warrant that the website will be uninterrupted, error-free,
        or free of harmful components.
      </p>

      <h2>7. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, Greenatech shall not be liable for any direct,
        indirect, incidental, consequential, or punitive damages arising from your use of or
        inability to use this website.
      </p>

      <h2>8. External Links</h2>
      <p>
        Our website may contain links to third-party websites that are not owned or controlled by
        Greenatech. We have no control over and assume no responsibility for the content, privacy
        policies, or practices of any third-party sites.
      </p>

      <h2>9. Governing Law</h2>
      <p>
        These Terms of Service are governed by the laws of the Federal Republic of Nigeria. Any
        disputes arising from these terms shall be resolved in the courts of Lagos State, Nigeria.
      </p>

      <h2>10. Changes to These Terms</h2>
      <p>
        We may revise these Terms of Service at any time. The most current version will always be
        posted on this page with the updated date. Your continued use of the website after changes
        are posted constitutes your acceptance of the revised terms.
      </p>

      <h2>11. Contact Us</h2>
      <p>
        For questions about these Terms of Service, please contact us at
        info@greenatechglobal.com.
      </p>
    </LegalPage>
  );
}
