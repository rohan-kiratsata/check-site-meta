import { useState, useEffect, useCallback } from "react";
import { Metadata } from "@/types/metadata";
import { usePostHog } from "posthog-js/react";
import { normalizeUrl } from "@/lib/utils";

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

  // Clear history
  const clearHistory = useCallback(() => {
    localStorage.removeItem("meta-history");
    setHistory([]);
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
      const targetUrl = normalizeUrl(customUrl?.trim() || url.trim());
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
      } catch (err: any) {
        setError("Could not fetch metadata. " + err.message);
      } finally {
        setLoading(false);
      }
    },
    [url, saveToHistory],
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
    clearHistory,
  };
}
