import posthog from "posthog-js";

/**
 * Track a search event anonymously
 * @param searchTerm - The term that was searched
 * @param searchResults - Number of results returned (optional)
 * @param source - Where the search was performed (optional)
 */
export const trackSearch = (
  searchTerm: string,
  searchResults?: number,
  source?: string,
) => {
  // Debug log
  console.log("📊 Tracking search:", {
    searchTerm,
    searchResults,
    source,
    timestamp: new Date().toISOString(),
  });

  posthog.capture("search_performed", {
    $search_term: searchTerm,
    results_count: searchResults,
    search_source: source,
    // Add timestamp to help with time-based analysis
    timestamp: new Date().toISOString(),
  });
};
