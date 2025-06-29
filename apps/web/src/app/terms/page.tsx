import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Check Site Metadata",
  description: "Terms of service for the Check Site Metadata tool.",
};

export default function TermsPage() {
  return (
    <div className="prose dark:prose-invert mx-auto max-w-3xl px-4 py-16">
      <h1>Terms of Service</h1>
      <p>Last updated: {new Date().toISOString().split("T")[0]}</p>

      <h2>Introduction</h2>
      <p>
        Welcome to Check Site Metadata! These Terms of Service govern your use
        of our website located at{" "}
        <Link href="https://checksitemeta.com">checksitemeta.com</Link>{" "}
        (&ldquo;Service&rdquo;).
      </p>
      <p>
        By accessing or using the Service, you agree to be bound by these Terms.
        If you disagree with any part of the terms, you may not access the
        Service.
      </p>

      <h2>Use of Service</h2>
      <p>
        Check Site Metadata provides a tool for checking and analyzing website
        metadata, including Open Graph tags, Twitter cards, and other SEO
        elements. The Service is provided &ldquo;as is&rdquo; and &ldquo;as
        available&rdquo; without any warranties, expressed or implied.
      </p>

      <h2>Limitations</h2>
      <p>
        In no event shall Check Site Metadata be liable for any damages arising
        out of the use or inability to use the Service, even if we have been
        notified of the possibility of such damages.
      </p>

      <h2>Fair Usage</h2>
      <p>
        To ensure availability of the service to all users, we may implement
        rate limiting or other restrictions on excessive usage. We reserve the
        right to temporarily or permanently block access to users who abuse the
        service.
      </p>

      <h2>External Links</h2>
      <p>
        Our Service may contain links to external sites that are not operated by
        us. We have no control over, and assume no responsibility for the
        content, privacy policies, or practices of any third-party sites or
        services.
      </p>

      <h2>Changes</h2>
      <p>
        We reserve the right, at our sole discretion, to modify or replace these
        Terms at any time. By continuing to access or use our Service after
        those revisions become effective, you agree to be bound by the revised
        terms.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about these Terms, please contact us via
        GitHub at{" "}
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
