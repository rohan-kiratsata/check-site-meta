import { useState, useEffect, useCallback } from "react";
import { Metadata } from "@/types/metadata";
import { usePostHog } from "posthog-js/react";

export function useMetadata() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState<Metadata | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const posthog = usePostHog();

  // Load history from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("meta-history") || "[]");
    setHistory(stored);
  }, []);

  // Save to history and persist in localStorage
  const saveToHistory = useCallback((url: string) => {
    const existing = JSON.parse(localStorage.getItem("meta-history") || "[]");
    const updated = [url, ...existing.filter((u: string) => u !== url)].slice(
      0,
      10,
    );
    localStorage.setItem("meta-history", JSON.stringify(updated));
    setHistory(updated);
  }, []);

  // Clear results
  const clearResults = useCallback(() => {
    setData(null);
    setError("");
    setLoading(false);
  }, []);

  // Fetch metadata
  const fetchMetadata = useCallback(
    async (customUrl?: string) => {
      const targetUrl = customUrl?.trim() || url.trim();
      if (!targetUrl) return;
      setLoading(true);
      setError("");
      setData(null);
      try {
        const res = await fetch(
          `/api/scrape?url=${encodeURIComponent(targetUrl)}`,
        );
        if (!res.ok) throw new Error("Server error");
        const json = await res.json();
        if (json.error) throw new Error(json.message);
        setData(json);
        saveToHistory(targetUrl);

        // Track successful search
        posthog?.capture("metadata_search", {
          url_domain: new URL(targetUrl).hostname,
          success: true,
          has_og_tags: json.ogTags?.length > 0,
          has_twitter_tags: json.twitterTags?.length > 0,
          has_icons: json.icons?.length > 0,
        });
      } catch (err: any) {
        setError("Could not fetch metadata. " + err.message);
        // Track failed search
        posthog?.capture("metadata_search", {
          url_domain: targetUrl.includes("http")
            ? new URL(targetUrl).hostname
            : "invalid_url",
          success: false,
          error_type: err.message,
        });
      } finally {
        setLoading(false);
      }
    },
    [url, saveToHistory, posthog],
  );

  return {
    url,
    setUrl,
    data,
    loading,
    error,
    history,
    fetchMetadata,
    clearResults,
  };
}
