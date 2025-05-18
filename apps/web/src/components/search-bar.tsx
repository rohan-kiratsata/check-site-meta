import React from "react";
import { toast } from "sonner";
import { isValidUrl } from "@/lib/utils";
import { motion } from "motion/react";
import { ClearIcon, RefreshIcon } from "@/lib/icons";
import { Settings2 } from "lucide-react";
import SettingsDialog from "./settings-dialog";

export default function SearchBar({
  url,
  setUrl,
  fetchMetadata,
  isLoading = false,
  clearResults,
  clearHistory,
}: {
  url: string;
  setUrl: (url: string) => void;
  fetchMetadata: () => void;
  isLoading?: boolean;
  clearResults?: () => void;
  clearHistory?: () => void;
}) {
  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading && url.trim()) {
      if (!isValidUrl(url.trim())) {
        toast.error(
          "Please enter a valid domain (e.g. supabase.com) or full URL",
        );
        return;
      }

      fetchMetadata();
    }
  };

  const handleClear = () => {
    setUrl("");
    clearResults?.();
  };

  const handleRefresh = () => {
    if (!url.trim() || isLoading) return;

    if (!isValidUrl(url.trim())) {
      toast.error(
        "Please enter a valid domain (e.g. supabase.com) or full URL",
      );
      return;
    }

    fetchMetadata();
  };

  return (
    <div className="mx-auto flex w-full max-w-md items-center justify-between gap-3 sm:max-w-lg md:max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex w-full items-center justify-between rounded-full border border-gray-200 bg-white px-3 py-1 dark:border-neutral-800 dark:bg-neutral-900"
      >
        <input
          type="text"
          placeholder="Enter a domain or URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyPress}
          className="h-10 w-full placeholder:text-gray-400 focus:outline-none dark:bg-neutral-900 dark:text-gray-100 dark:placeholder:text-gray-500"
          disabled={isLoading}
        />
        <div className="flex items-center gap-3">
          {url && (
            <button
              onClick={handleClear}
              className="text-gray-400 transition hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300"
              disabled={isLoading}
            >
              <ClearIcon />
            </button>
          )}
          <button
            onClick={handleRefresh}
            className={` ${
              isLoading
                ? "text-gray-400 dark:text-neutral-500"
                : "text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            } transition`}
            disabled={isLoading}
          >
            <RefreshIcon isLoading={isLoading} />
          </button>
        </div>
      </motion.div>
      <div className="border-border flex items-center justify-center rounded-full border p-1">
        <SettingsDialog clearHistory={clearHistory} />
      </div>
    </div>
  );
}
