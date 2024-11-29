export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

      <section className="prose dark:prose-invert max-w-none">
        <h2>Introduction</h2>
        <p>
          This Privacy Policy explains how Memorizle collects, uses, and
          protects your information when you use our website.
        </p>

        <h2>Information Collection</h2>
        <h3>Analytics Data</h3>
        <p>
          We use Cloudflare Analytics to collect anonymous usage data about how
          visitors interact with our website. This helps us improve our services
          and user experience.
        </p>

        <h3>Data Collected by Cloudflare Analytics</h3>
        <ul>
          <li>Page views and interactions</li>
          <li>Browser type and version</li>
          <li>Device type and screen resolution</li>
          <li>Geographic location (country/region level)</li>
          <li>Reference website</li>
          <li>Time spent on site</li>
        </ul>

        <h3>Local Storage Data</h3>
        <p>
          We store game progress and statistics locally in your browser&apos;s
          storage. This data remains on your device and is not transmitted to
          our servers.
        </p>

        <h2>Data Usage</h2>
        <p>The analytics data we collect is used to:</p>
        <ul>
          <li>Understand how users interact with our website</li>
          <li>Identify and fix technical issues</li>
          <li>Improve website performance</li>
          <li>Make informed decisions about feature development</li>
        </ul>

        <h2>Data Protection</h2>
        <p>
          Cloudflare Analytics is privacy-focused and does not use cookies or
          collect personally identifiable information. The data is processed in
          accordance with Cloudflare&apos;s privacy policies and GDPR
          requirements.
        </p>

        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Use browser settings or extensions to block analytics</li>
          <li>Request information about the data we collect</li>
          <li>Clear your local storage data through your browser settings</li>
        </ul>

        <h2>Updates to Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated revision date.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          through our <a href="mailto:contact@memorizle.com">contact email</a>.
        </p>
      </section>
    </div>
  );
}
