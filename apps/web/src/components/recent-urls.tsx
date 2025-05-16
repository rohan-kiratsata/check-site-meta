import React from "react";
import { motion, AnimatePresence } from "motion/react";

export default function RecentURLs({
  data,
  loading,
  error,
  history,
  setUrl,
  fetchMetadata,
}: {
  data: any;
  loading: any;
  error: any;
  history: any;
  setUrl: any;
  fetchMetadata: any;
}) {
  return (
    <AnimatePresence mode="wait">
      {!data && !loading && !error && (
        <motion.div
          key="empty-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-xl space-y-4 text-sm text-gray-500 dark:text-gray-400"
        >
          <div className="text-center">
            👋 Paste a URL to check its metadata
          </div>

          {history.length > 0 && (
            <div>
              <div className="mb-2 text-xs text-gray-400 uppercase dark:text-gray-500">
                Recent URLs
              </div>
              <ul className="space-y-2">
                {history.map((url: string, i: number) => (
                  <li
                    key={`history-${i}`}
                    className="cursor-pointer text-blue-600 underline transition hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
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
  );
}
