import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { Metadata } from "@/types/metadata";

interface DownloadReportButtonProps {
  url: string;
  metadata: Metadata;
  disabled?: boolean;
}

export const DownloadReportButton: React.FC<DownloadReportButtonProps> = ({
  url,
  metadata,
  disabled = false,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, metadata }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      // Get the blob from the response
      const blob = await response.blob();

      // Create a URL for the blob
      const downloadUrl = window.URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "metadata-report.pdf";

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL
      window.URL.revokeObjectURL(downloadUrl);

      toast.success("Report downloaded successfully");
    } catch (error) {
      console.error("Error downloading report:", error);
      toast.error("Failed to download report");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={disabled || isGenerating}
      variant="outline"
      className="flex items-center gap-2 text-sm"
      size={"sm"}
    >
      <Download className="h-4 w-4" />
      {isGenerating ? "Generating..." : "Download Report"}
    </Button>
  );
};
