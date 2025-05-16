"use client";

import { motion, AnimatePresence } from "motion/react";
import SearchBar from "@/components/search-bar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PreviewTab from "@/components/preview-tab";
import FloatingFooter from "@/components/floating-footer";
import { useMetadata } from "@/hooks/useMetadata";
import RecentURLs from "@/components/recent-urls";
import NotFound from "@/components/not-found";
import RawTab from "@/components/raw-tab";
import CopyCodeTab from "@/components/cpy-code-tab";
import SEOInsightsTab from "@/components/seo-insights-tab";

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
  } = useMetadata();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start space-y-8 px-4 py-16 text-gray-900 dark:text-neutral-100">
      <FloatingFooter />
      <h1 className="text-center font-mono text-2xl font-semibold tracking-tight md:text-3xl dark:text-neutral-100">
        Check Site Metadata
      </h1>

      <SearchBar
        url={url}
        setUrl={setUrl}
        fetchMetadata={fetchMetadata}
        isLoading={loading}
        clearResults={clearResults}
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
            className="max-w-full min-w-full"
          >
            <Tabs defaultValue="tags">
              <TabsList className="mx-auto">
                <TabsTrigger value="tags">Raw Tags</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="seo">SEO Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="tags" className="py-5">
                <RawTab data={data} />
              </TabsContent>

              <TabsContent value="preview">
                <PreviewTab data={data} />
              </TabsContent>

              <TabsContent value="code" className="py-5">
                <CopyCodeTab data={data} />
              </TabsContent>

              <TabsContent value="seo" className="py-5">
                <SEOInsightsTab data={data} />
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
