"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconsGroup, MetadataBlock, MetadataGroup } from "@/components";
import SearchBar from "@/components/search-bar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PreviewTab from "@/components/preview-tab";
import FloatingFooter from "@/components/floating-footer";
export default function HomePage() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const clearResults = () => {
    setData(null);
    setError("");
    setLoading(false);
  };

  const saveToHistory = (url: string) => {
    const existing = JSON.parse(localStorage.getItem("meta-history") || "[]");
    const updated = [url, ...existing.filter((u: string) => u !== url)].slice(
      0,
      10
    );
    localStorage.setItem("meta-history", JSON.stringify(updated));
    setHistory(updated);
  };

  const fetchMetadata = async (customUrl?: string) => {
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
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("meta-history") || "[]");
    setHistory(stored);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center justify-start px-4 py-16 space-y-8">
      <FloatingFooter />
      <h1 className="text-3xl font-semibold tracking-tight font-mono">
        Check Site Metadata
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-xl"
      >
        <SearchBar
          url={url}
          setUrl={setUrl}
          fetchMetadata={fetchMetadata}
          isLoading={loading}
          clearResults={clearResults}
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            className="text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Fetching metadata...
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-md bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm"
          >
            <strong className="block mb-1">
              Oops! Couldn&apos;t fetch metadata. Try something else.
            </strong>
            <span className="text-xs">{error}</span>
            <p className="mt-2 text-gray-500">
              Some sites block metadata scraping (like OpenAI, banking portals,
              or Cloudflare-protected sites).
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!data && !loading && !error && (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-xl space-y-4 text-sm text-gray-500"
          >
            <div className="text-center">
              👋 Paste a URL to check its metadata
            </div>

            {history.length > 0 && (
              <div>
                <div className="text-xs uppercase text-gray-400 mb-2">
                  Recent URLs
                </div>
                <ul className="space-y-2">
                  {history.map((url, i) => (
                    <li
                      key={`history-${i}`}
                      className="cursor-pointer underline text-blue-600 hover:text-blue-800 transition"
                      onClick={() => {
                        setUrl(url);
                        fetchMetadata(url);
                      }}
                    >
                      {url}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {data && !error && (
          <motion.div
            key="tabs-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Tabs defaultValue="tags" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 border">
                <TabsTrigger value="tags">Raw Tags</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              <TabsContent value="tags" className="py-5">
                <AnimatePresence mode="wait">
                  {data && (
                    <motion.div
                      key="metadata"
                      className="text-sm rounded-2xl space-y-6"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <MetadataBlock label="Title" value={data.title} />
                      <MetadataBlock
                        label="Description"
                        value={data.description}
                      />
                      <MetadataBlock label="Author" value={data.author} />
                      <MetadataBlock label="Keywords" value={data.keywords} />

                      {data.ogTags?.length > 0 && (
                        <MetadataGroup
                          label="OpenGraph Tags"
                          items={data.ogTags}
                        />
                      )}
                      {data.twitterTags?.length > 0 && (
                        <MetadataGroup
                          label="Twitter Tags"
                          items={data.twitterTags}
                        />
                      )}
                      {data.icons?.length > 0 && (
                        <IconsGroup icons={data.icons} />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </TabsContent>

              <TabsContent value="preview">
                <PreviewTab data={data} url={url} />
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
