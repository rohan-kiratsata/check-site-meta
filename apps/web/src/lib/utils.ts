import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getMetaImageUrl(
  items: { name: string; content: string }[],
): string | null {
  if (!items?.length) return null;

  const candidates = [
    "og:image",
    "twitter:image",
    "twitter:image:src",
    "og:image:secure_url",
  ];

  for (const key of candidates) {
    const found = items.find((item) => item.name === key && item.content);
    if (found) return found.content;
  }

  return null;
}
export function isValidUrl(str: string): boolean {
  // First check if it's a domain-like string (e.g. "supabase.com")
  if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}/.test(str)) {
    return true;
  }

  // Then check if it's a valid URL with protocol
  try {
    new URL(str.startsWith("http") ? str : `https://${str}`);
    return true;
  } catch {
    return false;
  }
}

export function normalizeUrl(url: string): string {
  // If URL already has a protocol, return as is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Add https:// protocol if missing
  return `https://${url}`;
}

export function ensureHttps(url: string): string {
  // Convert http to https if needed
  if (url.startsWith("http://")) {
    return url.replace("http://", "https://");
  }
  return url;
}

export function isImageUrl(url: string): boolean {
  if (!isValidUrl(url)) return false;

  return (
    /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url) ||
    url.includes("/image/") ||
    url.includes("/images/") ||
    url.includes("imagecdn")
  );
}
