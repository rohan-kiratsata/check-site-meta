import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Check Site Metadata",
  description: "Privacy policy for the Check Site Metadata tool.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="prose dark:prose-invert mx-auto max-w-3xl px-4 py-16">
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toISOString().split("T")[0]}</p>

      <h2>Introduction</h2>
      <p>
        Check Site Metadata ("we", "our", or "us") is committed to protecting
        your privacy. This Privacy Policy explains how we collect, use, and
        safeguard your information when you use our website at{" "}
        <Link href="https://checksitemeta.com">checksitemeta.com</Link>.
      </p>

      <h2>Information We Collect</h2>
      <p>
        When you use our service to check website metadata, we temporarily
        store:
      </p>
      <ul>
        <li>URLs you submit for metadata checking</li>
        <li>
          Metadata retrieved from those URLs (titles, descriptions, Open Graph
          tags, etc.)
        </li>
        <li>
          Standard server logs including IP addresses and browser information
        </li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide our metadata checking service</li>
        <li>Improve and optimize our website</li>
        <li>Analyze usage patterns to enhance user experience</li>
        <li>Prevent abuse of our service</li>
      </ul>

      <h2>Data Storage</h2>
      <p>
        URLs and metadata results are stored in your browser's local storage for
        convenience, allowing you to see your recent checks. This data is not
        transmitted to our servers for permanent storage.
      </p>

      <h2>Analytics and Cookies</h2>
      <p>
        We use Google Analytics to understand how visitors use our site. This
        service may use cookies to collect anonymous information. You can opt
        out of Google Analytics by using the{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Analytics Opt-out Browser Add-on
        </a>
        .
      </p>

      <h2>Changes to This Privacy Policy</h2>
      <p>
        We may update our Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us
        via GitHub at{" "}
        <a
          href="https://github.com/rohan-kiratsata/check-site-meta"
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/rohan-kiratsata/check-site-meta
        </a>
        .
      </p>

      <div className="mt-8">
        <Link
          href="/"
          className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
