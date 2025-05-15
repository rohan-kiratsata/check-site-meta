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
    <main className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center justify-start px-4 py-16 space-y-8">
      <FloatingFooter />
      <h1 className="md:text-3xl text-2xl text-center font-semibold tracking-tight font-mono">
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
            className="text-gray-500 text-sm"
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
          >
            <Tabs defaultValue="tags">
              <TabsList className="grid grid-cols-2 border mx-auto w-lg">
                <TabsTrigger value="tags">Raw Tags</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              <TabsContent value="tags" className="py-5">
                <RawTab data={data} />
              </TabsContent>

              <TabsContent value="preview">
                <PreviewTab data={data} />
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
