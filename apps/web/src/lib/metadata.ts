import * as cheerio from "cheerio";
import type {
  ScrapedMetadata,
  MetadataError,
  MetadataResponse,
} from "../types/metadata";
import {
  extractMetaTags,
  filterMetaTagsByPrefix,
  resolveUrl,
  getTitleFallback,
  getDescriptionFallback,
  getAuthorFallback,
  getKeywordsFallback,
  getIconFallback,
} from "./metadata-utils";

// Cache for metadata responses to avoid refetching
const metadataCache = new Map<
  string,
  { data: MetadataResponse; timestamp: number }
>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

// Main Scraper
export async function fetchMetadata(url: string): Promise<MetadataResponse> {
  try {
    // Check cache first
    const now = Date.now();
    const cached = metadataCache.get(url);
    if (cached && now - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(url, {
      headers: {
        "User-Agent": "MetadataCheckerBot/1.0 (+https://checksitemeta.com)",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    // Extract only the <head> section for parsing
    const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
    const headHtml = headMatch ? headMatch[0] : html;
    const $ = cheerio.load(headHtml);

    const metaTags = extractMetaTags($);
    const ogTags = filterMetaTagsByPrefix(metaTags, "og:");
    const twitterTags = filterMetaTagsByPrefix(metaTags, "twitter:");

    // Use fallback functions for robust extraction
    const title = getTitleFallback($);
    const description = getDescriptionFallback($);
    const author = getAuthorFallback($);
    const keywords = getKeywordsFallback($);
    const icons = [getIconFallback($, url)].filter(Boolean) as string[];

    // Check for structured data
    const structuredData = $('script[type="application/ld+json"]').length > 0;

    // Check for canonical URL
    const canonicalUrl = $('link[rel="canonical"]').attr("href") || null;

    // Map og:image, og:image:secure_url, twitter:image to absolute URLs
    const resolveMetaImageUrls = (tags: typeof metaTags, pageUrl: string) =>
      tags.map((tag) =>
        ["og:image", "og:image:secure_url", "twitter:image"].includes(
          tag.name,
        ) && tag.content
          ? { ...tag, content: resolveUrl(tag.content, pageUrl) }
          : tag,
      );

    const ogTagsAbs = resolveMetaImageUrls(ogTags, url);
    const twitterTagsAbs = resolveMetaImageUrls(twitterTags, url);

    const result: ScrapedMetadata = {
      title,
      description,
      author,
      keywords,
      ogTags: ogTagsAbs,
      twitterTags: twitterTagsAbs,
      icons,
      url,
      structuredData,
      canonicalUrl,
    };

    // Store in cache
    metadataCache.set(url, { data: result, timestamp: now });

    return result;
  } catch (err: any) {
    const errorResult = { error: true, message: err.message } as MetadataError;
    return errorResult;
  }
}
