import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getMetaImageUrl(
  items: { name: string; content: string }[]
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
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
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
