import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Settings2 } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { toast } from "sonner";

interface SettingsDialogProps {
  clearHistory?: () => void;
}

export default function SettingsDialog({ clearHistory }: SettingsDialogProps) {
  const handleClearHistory = () => {
    clearHistory?.();
    toast.success("History cleared successfully");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Settings2 className="text-muted-foreground h-5 w-5 cursor-pointer hover:text-black dark:hover:text-white" />
      </DialogTrigger>
      <DialogContent className="px-6 py-4">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          <div className="space-y-3">
            <h3 className="font-medium">Appearance</h3>
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground text-sm">Theme</span>
              <ThemeToggle />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">History</h3>
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground text-sm">
                Clear history
              </span>
              <button
                className="text-sm text-red-500 hover:text-red-600"
                onClick={handleClearHistory}
              >
                Clear
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">About</h3>
            <div className="text-muted-foreground text-sm">
              <p>
                checksitemeta.com is a tool to help you preview and analyze
                website metadata like Open Graph, Twitter Cards, and SEO tags,
                Page Speed Insights and download the website analysis report.
              </p>
              <p>
                Learn more about the project{" "}
                <a
                  target="_blank"
                  href="https://github.com/rohan-kiratsata/check-site-meta"
                  className="text-blue-500 hover:underline"
                >
                  here
                </a>
                .
              </p>
              <p>
                Built by{" "}
                <a
                  target="_blank"
                  href="https://x.com/sudorohan"
                  className="text-blue-500 hover:underline"
                >
                  @sudorohan
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
