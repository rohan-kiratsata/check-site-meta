import * as cheerio from "cheerio";
import type {
  ScrapedMetadata,
  MetadataError,
  MetadataResponse,
} from "../types/metadata";
import {
  getAttr,
  extractMetaTags,
  filterMetaTagsByPrefix,
  resolveUrl,
  getTitleFallback,
  getDescriptionFallback,
  getAuthorFallback,
  getKeywordsFallback,
  getIconFallback,
  getImageFallback,
} from "./metadata-utils";

// Main Scraper
export async function fetchMetadata(url: string): Promise<MetadataResponse> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "MetadataCheckerBot/1.0 (+https://checksitemeta.com)",
      },
    });

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
    // Optionally, extract main image (e.g., og:image)
    // const mainImage = getImageFallback($, url);

    // Map og:image, og:image:secure_url, twitter:image to absolute URLs
    const resolveMetaImageUrls = (tags: typeof metaTags, pageUrl: string) =>
      tags.map((tag) =>
        ["og:image", "og:image:secure_url", "twitter:image"].includes(
          tag.name
        ) && tag.content
          ? { ...tag, content: resolveUrl(tag.content, pageUrl) }
          : tag
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
    };
    return result;
  } catch (err: any) {
    return { error: true, message: err.message } as MetadataError;
  }
}
