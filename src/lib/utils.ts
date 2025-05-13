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

export function getMetaImageUrl(items: any[]): string | null {
  if (!items?.length) return null;

  // Check for og:image or twitter:image
  const ogImage = items.find((item) => item.name === "og:image")?.content;
  const twitterImage = items.find(
    (item) => item.name === "twitter:image"
  )?.content;

  return ogImage || twitterImage || null;
}
