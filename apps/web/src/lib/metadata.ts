import * as cheerio from "cheerio";

// Helper: safe get attribute
const getAttr = ($: cheerio.CheerioAPI, selector: string, attr: string) =>
  $(selector).attr(attr) || null;

// Main Scraper
export async function fetchMetadata(url: string) {
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
    const $ = cheerio.load(html);

    const getMeta = (name: string) =>
      $(`meta[name="${name}"]`).attr("content") ||
      $(`meta[property="${name}"]`).attr("content") ||
      null;

    const metaTags: { name: string; content: string }[] = [];
    $("meta").each((_, el) => {
      const name = $(el).attr("name") || $(el).attr("property");
      const content = $(el).attr("content");
      if (name && content) metaTags.push({ name, content });
    });

    const ogTags = metaTags.filter((m) => m.name.startsWith("og:"));
    const twitterTags = metaTags.filter((m) => m.name.startsWith("twitter:"));

    const icons = [
      ...new Set(
        [
          getAttr($, 'link[rel="icon"]', "href"),
          getAttr($, 'link[rel="shortcut icon"]', "href"),
          getAttr($, 'link[rel="apple-touch-icon"]', "href"),
          getAttr($, 'link[rel="mask-icon"]', "href"),
        ].filter(Boolean)
      ),
    ];

    return {
      title: $("title").text() || null,
      description: getMeta("description"),
      author: getMeta("author"),
      keywords: getMeta("keywords"),
      ogTags,
      twitterTags,
      icons,
      url,
    };
  } catch (err: any) {
    return { error: true, message: err.message };
  }
}
