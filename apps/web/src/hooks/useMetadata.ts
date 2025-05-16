import { useState, useEffect, useCallback } from "react";

export interface Metadata {
  title: string | null;
  description: string | null;
  author: string | null;
  keywords: string | null;
  ogTags: { name: string; content: string }[];
  twitterTags: { name: string; content: string }[];
  icons: string[];
  url: string;
  error?: boolean;
  message?: string;
}

export function useMetadata() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState<Metadata | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<string[]>([]);

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
      10
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
          `/api/scrape?url=${encodeURIComponent(targetUrl)}`
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
    [url, saveToHistory]
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
