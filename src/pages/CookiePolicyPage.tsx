import LegalPage from './LegalPage';

export default function CookiePolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Cookie Policy"
      description="How Greenatech uses cookies and similar technologies on this website, and how you can control them."
    >
      <p className="text-gray-500 text-sm mb-10">Last updated: October 8, 2026</p>

      <h2>1. What Are Cookies</h2>
      <p>
        Cookies are small text files stored on your device when you visit a website. They allow
        the site to remember your actions and preferences over a period of time, so you don't have
        to re-enter them every time you visit or navigate from page to page.
      </p>

      <h2>2. Types of Cookies We Use</h2>
      <p>We use the following categories of cookies:</p>
      <ul>
        <li><strong>Essential cookies</strong> — required for the website to function correctly, such as remembering your session and security preferences.</li>
        <li><strong>Analytics cookies</strong> — help us understand how visitors interact with our website so we can improve its performance and content.</li>
        <li><strong>Preference cookies</strong> — remember your settings and choices, such as language or region, to provide a more personalised experience.</li>
      </ul>
      <p>We do not use advertising or tracking cookies that follow you across other websites.</p>

      <h2>3. Managing Cookies</h2>
      <p>
        You can control and delete cookies through your browser settings. Each browser has a
        different method for managing cookies — you can typically find instructions in your
        browser's help or settings menu. Disabling essential cookies may affect the functionality
        of our website.
      </p>

      <h2>4. Third-Party Services</h2>
      <p>
        Some cookies may be set by third-party services we use, such as analytics providers. These
        third parties have their own privacy and cookie policies, and we encourage you to review
        them.
      </p>

      <h2>5. Updates to This Policy</h2>
      <p>
        We may update this Cookie Policy as our use of cookies evolves. Any changes will be posted
        on this page with an updated revision date.
      </p>

      <h2>6. Contact Us</h2>
      <p>
        For questions about our use of cookies, please contact us at
        info@greenatechglobal.com.
      </p>
    </LegalPage>
  );
}
