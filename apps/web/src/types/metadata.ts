// src/types/metadata.ts

export interface MetaTag {
  name: string;
  content: string;
}

export interface ScrapedMetadata {
  title: string | null;
  description: string | null;
  author: string | null;
  keywords: string | null;
  ogTags: MetaTag[];
  twitterTags: MetaTag[];
  icons: string[];
  url: string;
}

export interface MetadataError {
  error: true;
  message: string;
}

export type MetadataResponse = ScrapedMetadata | MetadataError;

export interface ScraperConfig {
  userAgent: string;
  timeout?: number;
  followRedirects?: boolean;
  maxRedirects?: number;
}
