import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Check Site Metadata | OG, Twitter & Favicon Tags",
  description:
    "Instantly check Open Graph, Twitter cards, favicon, and SEO tags from any URL.",
  metadataBase: new URL("https://checksitemeta.com"),
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <head>
          <link rel="canonical" href="https://checksitemeta.com" />
        </head>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
