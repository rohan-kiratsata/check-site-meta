import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import React from "react";

export default function NotFound({ error }: { error: string }) {
  return (
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
            Some sites block metadata scraping (like OpenAI, banking portals, or
            Cloudflare-protected sites).
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
