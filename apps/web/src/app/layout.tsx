import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";

// Optimize font loading with display swap
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Check Site Metadata | OG, Twitter & Favicon Tags",
  description:
    "Instantly check Open Graph, Twitter cards, favicon, and SEO tags from any URL.",
  metadataBase: new URL("https://checksitemeta.com"),
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "Check Site Metadata",
    description: "Preview OG, Twitter, SEO and icon metadata from any website.",
    url: "https://checksitemeta.com",
    siteName: "CheckSiteMeta",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Check site metadata",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Check Site Metadata",
    description:
      "Instantly check Open Graph, Twitter, favicon, and SEO tags from any website.",
    images: ["/og-image.png"],
  },
  robots: "index, follow",
  keywords: [
    "check website metadata",
    "open graph tag viewer",
    "og tag preview",
    "twitter card checker",
    "favicon checker",
    "seo meta tags",
    "meta tag preview tool",
    "check site metadata",
    "check site meta",
    "check site meta tags",
    "check site meta description",
    "check site meta title",
    "check site meta keywords",
    "check site meta description",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://checksitemeta.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Check Site Metadata",
              url: "https://checksitemeta.com",
              description:
                "Instantly check Open Graph, Twitter cards, favicon, and SEO tags from any URL.",
              applicationCategory: "WebDevelopmentTool",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              screenshot: {
                "@type": "ImageObject",
                url: "https://checksitemeta.com/og-image.png",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="mx-auto max-w-3xl px-2 md:max-w-5xl">
            {children}
          </main>
          <Toaster />
          <Analytics />

          {/* Load Google Analytics script with defer */}
          {process.env.NEXT_PUBLIC_GTAG && (
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTAG}`}
              strategy="afterInteractive"
              defer
            />
          )}
          {process.env.NEXT_PUBLIC_GTAG && (
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GTAG}');
              `}
            </Script>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
