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
                {history.map((url: string, i: number) => (
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
  );
}
