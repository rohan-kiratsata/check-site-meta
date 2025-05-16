import type { MetaTag } from "../types/metadata";
import * as cheerio from "cheerio";

export const getAttr = (
  $: cheerio.CheerioAPI,
  selector: string,
  attr: string,
): string | null => $(selector).attr(attr) || null;

export const getMeta = ($: cheerio.CheerioAPI, name: string): string | null =>
  $(`meta[name="${name}"]`).attr("content") ||
  $(`meta[property="${name}"]`).attr("content") ||
  null;

export const extractMetaTags = ($: cheerio.CheerioAPI): MetaTag[] => {
  const metaTags: MetaTag[] = [];
  $("meta").each((_, el) => {
    const name = $(el).attr("name") || $(el).attr("property");
    const content = $(el).attr("content");
    if (name && content) metaTags.push({ name, content });
  });
  return metaTags;
};

// filter by prefix
export const filterMetaTagsByPrefix = (
  metaTags: MetaTag[],
  prefix: string,
): MetaTag[] => metaTags.filter((m) => m.name.startsWith(prefix));

// Resolve a possibly relative URL to an absolute one using a base URL
export function resolveUrl(url: string, base: string): string {
  try {
    return new URL(url, base).href;
  } catch {
    return url;
  }
}

// Title fallback: <title>, og:title, twitter:title, h1
export function getTitleFallback($: cheerio.CheerioAPI): string | null {
  return (
    $("title").text() ||
    $('meta[property="og:title"]').attr("content") ||
    $('meta[name="twitter:title"]').attr("content") ||
    $("h1").first().text() ||
    null
  );
}

// Description fallback: description, og:description, twitter:description, first <p>
export function getDescriptionFallback($: cheerio.CheerioAPI): string | null {
  return (
    $('meta[name="description"]').attr("content") ||
    $('meta[property="og:description"]').attr("content") ||
    $('meta[name="twitter:description"]').attr("content") ||
    $("p").first().text() ||
    null
  );
}

// Image fallback: og:image, twitter:image, link[rel=image_src], first <img>
export function getImageFallback(
  $: cheerio.CheerioAPI,
  pageUrl: string,
): string | null {
  const candidates = [
    $('meta[property="og:image"]').attr("content"),
    $('meta[name="twitter:image"]').attr("content"),
    $('link[rel="image_src"]').attr("href"),
    $("img").first().attr("src"),
  ];
  const found = candidates.find(Boolean);
  return found ? resolveUrl(found, pageUrl) : null;
}

// Icon fallback: icon links, /favicon.ico
export function getIconFallback(
  $: cheerio.CheerioAPI,
  pageUrl: string,
): string | null {
  const candidates = [
    $('link[rel="icon"]').attr("href"),
    $('link[rel="shortcut icon"]').attr("href"),
    $('link[rel="apple-touch-icon"]').attr("href"),
    $('link[rel="mask-icon"]').attr("href"),
    "/favicon.ico",
  ];
  const found = candidates.find(Boolean);
  return found ? resolveUrl(found, pageUrl) : null;
}

// Author fallback: author, article:author, twitter:creator
export function getAuthorFallback($: cheerio.CheerioAPI): string | null {
  return (
    $('meta[name="author"]').attr("content") ||
    $('meta[property="article:author"]').attr("content") ||
    $('meta[name="twitter:creator"]').attr("content") ||
    null
  );
}

// Keywords fallback: keywords, article:tag
export function getKeywordsFallback($: cheerio.CheerioAPI): string | null {
  return (
    $('meta[name="keywords"]').attr("content") ||
    $('meta[property="article:tag"]').attr("content") ||
    null
  );
}
