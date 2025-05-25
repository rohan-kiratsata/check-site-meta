import { fetchMetadata } from "@/lib/metadata";
import { normalizeUrl } from "@/lib/utils";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response(
      JSON.stringify({ error: true, message: "Missing URL param" }),
      { status: 400 },
    );
  }

  try {
    // Normalize and validate URL
    const normalizedUrl = normalizeUrl(url);
    const safeURL = new URL(normalizedUrl);
    if (!["http:", "https:"].includes(safeURL.protocol)) {
      throw new Error("Invalid protocol");
    }

    const data = await fetchMetadata(normalizedUrl);

    // Improve caching - longer TTL and stale-while-revalidate
    return Response.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err: any) {
    console.error("Error fetching metadata:", err);
    return new Response(JSON.stringify({ error: true, message: err.message }), {
      status: 500,
    });
  }
}
