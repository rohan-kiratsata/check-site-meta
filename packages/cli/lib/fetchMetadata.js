import axios from "axios";
import * as cheerio from "cheerio";

export async function fetchMetadata(url) {
  const { data: html } = await axios.get(url, {
    timeout: 3000,
    headers: {
      "User-Agent": "MetadataCheckerCLI/1.0",
    },
  });

  const $ = cheerio.load(html);

  const getMeta = (name) =>
    $(`meta[name="${name}"]`).attr("content") ||
    $(`meta[property="${name}"]`).attr("content") ||
    null;

  const metaTags = [];
  $("meta").each((_, el) => {
    const name = $(el).attr("name") || $(el).attr("property");
    const content = $(el).attr("content");
    if (name && content) metaTags.push({ name, content });
  });

  const icons = [
    $('link[rel="icon"]').attr("href"),
    $('link[rel="shortcut icon"]').attr("href"),
    $('link[rel="apple-touch-icon"]').attr("href"),
  ].filter(Boolean);

  return {
    title: $("title").text(),
    description: getMeta("description"),
    author: getMeta("author"),
    keywords: getMeta("keywords"),
    ogTags: metaTags.filter((m) => m.name.startsWith("og:")),
    twitterTags: metaTags.filter((m) => m.name.startsWith("twitter:")),
    icons,
  };
}
