"use client";

import posthog from "posthog-js";
import { PostHogProvider as Provider } from "posthog-js/react";
import { useEffect } from "react";

// Initialize PostHog in a way that works in SSR
if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || "", {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
    persistence: "memory", // Don't persist user data
    autocapture: false, // Disable automatic event capture
    capture_pageview: false, // Disable automatic pageview capture
    capture_pageleave: false, // Disable automatic page leave capture
    disable_session_recording: true, // Disable session recording
    disable_persistence: true, // Disable all persistence
    mask_all_text: true, // Mask all text in recordings (extra safety)
  });
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Disable PostHog cookies
    if (typeof window !== "undefined") {
      posthog.opt_out_capturing();
    }
  }, []);

  return <Provider client={posthog}>{children}</Provider>;
}
