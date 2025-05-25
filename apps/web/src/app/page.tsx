"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import SearchBar from "@/components/search-bar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMetadata } from "@/hooks/useMetadata";
import RecentURLs from "@/components/recent-urls";
import NotFound from "@/components/not-found";

// Lazy load components that aren't needed for initial render
const PreviewTab = dynamic(() => import("@/components/preview-tab"), {
  ssr: false,
  loading: () => <div className="py-4">Loading preview...</div>,
});
const RawTab = dynamic(() => import("@/components/raw-tab"), {
  ssr: true,
});
const CopyCodeTab = dynamic(() => import("@/components/cpy-code-tab"), {
  ssr: false,
});
const SEOInsightsTab = dynamic(() => import("@/components/seo-insights-tab"), {
  ssr: false,
});
const DownloadReportButton = dynamic(
  () =>
    import("@/components/download-report-btn").then(
      (mod) => mod.DownloadReportButton,
    ),
  { ssr: false },
);

export default function HomePage() {
  const {
    url,
    setUrl,
    data,
    loading,
    error,
    history,
    fetchMetadata,
    clearResults,
    clearHistory,
  } = useMetadata();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start space-y-8 px-4 py-16 text-gray-900 dark:text-neutral-100">
      <h1 className="text-center font-mono text-2xl font-semibold tracking-tight md:text-3xl dark:text-neutral-100">
        Check Site Metadata
      </h1>

      <SearchBar
        url={url}
        setUrl={setUrl}
        fetchMetadata={fetchMetadata}
        isLoading={loading}
        clearResults={clearResults}
        clearHistory={clearHistory}
      />

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            className="text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Fetching metadata...
          </motion.div>
        )}
      </AnimatePresence>

      <NotFound error={error} />

      <RecentURLs
        data={data}
        loading={loading}
        error={error}
        history={history}
        setUrl={setUrl}
        fetchMetadata={fetchMetadata}
      />

      <AnimatePresence mode="wait">
        {data && !error && (
          <motion.div
            key="tabs-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex max-w-full min-w-full flex-col gap-4"
          >
            <Tabs defaultValue="tags">
              <div className="flex items-center justify-between">
                <TabsList className="">
                  <TabsTrigger value="tags">Raw Tags</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                  <TabsTrigger value="seo">SEO Insights</TabsTrigger>
                </TabsList>
                <div>
                  <Suspense
                    fallback={
                      <div className="h-8 w-24 animate-pulse rounded bg-gray-100" />
                    }
                  >
                    <DownloadReportButton
                      url={url}
                      metadata={data}
                      disabled={loading}
                    />
                  </Suspense>
                </div>
              </div>

              <TabsContent value="tags" className="py-5">
                <Suspense
                  fallback={
                    <div className="h-32 animate-pulse rounded bg-gray-100" />
                  }
                >
                  <RawTab data={data} />
                </Suspense>
              </TabsContent>

              <TabsContent value="preview">
                <Suspense
                  fallback={
                    <div className="h-64 animate-pulse rounded bg-gray-100" />
                  }
                >
                  <PreviewTab data={data} />
                </Suspense>
              </TabsContent>

              <TabsContent value="code" className="py-5">
                <Suspense
                  fallback={
                    <div className="h-32 animate-pulse rounded bg-gray-100" />
                  }
                >
                  <CopyCodeTab data={data} />
                </Suspense>
              </TabsContent>

              <TabsContent value="seo" className="py-5">
                <Suspense
                  fallback={
                    <div className="h-32 animate-pulse rounded bg-gray-100" />
                  }
                >
                  <SEOInsightsTab data={data} />
                </Suspense>
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
