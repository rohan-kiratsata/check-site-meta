import React from "react";
import { toast } from "sonner";
import { isValidUrl } from "@/lib/utils";

export default function SearchBar({
  url,
  setUrl,
  fetchMetadata,
  isLoading = false,
  clearResults,
}: {
  url: string;
  setUrl: (url: string) => void;
  fetchMetadata: () => void;
  isLoading?: boolean;
  clearResults?: () => void;
}) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading && url.trim()) {
      if (!isValidUrl(url.trim())) {
        toast.error("Please enter a valid http/https URL");
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
      toast.error("Please enter a valid http/https URL");
      return;
    }

    fetchMetadata();
  };

  return (
    <div className="flex border border-gray-200 bg-white overflow-hidden rounded-full">
      <input
        type="text"
        placeholder="Enter a URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={handleKeyPress}
        className="flex-1 bg-transparent px-5 py-3 focus:outline-none placeholder:text-gray-400"
        disabled={isLoading}
      />
      {url && (
        <button
          onClick={handleClear}
          className="px-3 text-gray-400 hover:text-gray-600 transition"
          disabled={isLoading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
      <button
        onClick={handleRefresh}
        className={`px-3 ${
          isLoading ? "text-gray-400" : "text-blue-600 hover:text-blue-700"
        } transition`}
        disabled={isLoading}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
