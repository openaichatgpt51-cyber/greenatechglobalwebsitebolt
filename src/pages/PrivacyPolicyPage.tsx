import LegalPage from './LegalPage';

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      description="How Greenatech collects, uses, and protects your personal information when you use our website and services."
    >
      <p className="text-gray-500 text-sm mb-10">Last updated: October 8, 2026</p>

      <h2>1. Information We Collect</h2>
      <p>
        We collect information you provide directly to us, such as your name, email address,
        phone number, and company details when you fill out our contact form, subscribe to our
        newsletter, or engage our services. We also automatically collect certain technical data,
        including your IP address, browser type, device information, and usage patterns through
        cookies and similar technologies.
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>
        We use your personal information to respond to your enquiries, provide and improve our
        services, send you relevant updates and marketing communications (where you have opted in),
        analyse how our website is used, and comply with our legal obligations. We do not sell your
        personal data to third parties under any circumstances.
      </p>

      <h2>3. Data Storage and Security</h2>
      <p>
        Your data is stored on secure servers hosted by Supabase and our infrastructure providers.
        We implement industry-standard encryption, access controls, and regular security audits to
        protect your information. However, no method of transmission over the internet is completely
        secure, and we cannot guarantee absolute security.
      </p>

      <h2>4. Cookies</h2>
      <p>
        We use cookies to remember your preferences, analyse website traffic, and improve your
        browsing experience. You can control cookies through your browser settings. For more detail,
        please review our Cookie Policy.
      </p>

      <h2>5. Your Rights</h2>
      <p>
        Depending on your jurisdiction, you may have the right to access, correct, delete, or
        restrict the processing of your personal data. You may also have the right to data
        portability and to object to certain types of processing. To exercise any of these rights,
        contact us at info@greenatechglobal.com.
      </p>

      <h2>6. Third-Party Links</h2>
      <p>
        Our website may contain links to third-party websites. We are not responsible for the
        privacy practices or content of these external sites. We encourage you to review their
        privacy policies before providing any personal information.
      </p>

      <h2>7. Children's Privacy</h2>
      <p>
        Our website and services are intended for business and professional use. We do not
        knowingly collect personal information from children under 16. If you believe a child has
        provided us with personal data, please contact us so we can remove it.
      </p>

      <h2>8. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be posted on this page
        with an updated revision date. We encourage you to review this policy periodically.
      </p>

      <h2>9. Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy or how we handle your data, please reach
        out to us at info@greenatechglobal.com or by mail at 294 Herbert Macaulay Way, Yaba, Lagos.
      </p>
    </LegalPage>
  );
}
