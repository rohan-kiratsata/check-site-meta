import { ScrapedMetadata } from "@/types/metadata";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

interface SEOCheck {
  title: string;
  status: "success" | "warning" | "error";
  message: string;
}

export default function SEOInsightsTab({ data }: { data: ScrapedMetadata }) {
  const seoChecks: SEOCheck[] = [
    // Title checks
    {
      title: "Title Tag",
      status: data.title
        ? data.title.length < 60
          ? "success"
          : "warning"
        : "error",
      message: data.title
        ? data.title.length < 60
          ? "Good title length (under 60 characters)"
          : "Title is too long (should be under 60 characters)"
        : "Missing title tag",
    },
    // Description checks
    {
      title: "Meta Description",
      status: data.description
        ? data.description.length > 120 && data.description.length < 155
          ? "success"
          : "warning"
        : "error",
      message: data.description
        ? data.description.length > 120 && data.description.length < 155
          ? "Good description length (between 120-155 characters)"
          : `Description length (${data.description.length} chars) should be between 120-155 characters`
        : "Missing meta description",
    },
    // Keywords check
    {
      title: "Meta Keywords",
      status: data.keywords ? "success" : "warning",
      message: data.keywords
        ? `Keywords present: ${data.keywords.split(",").length} keywords found`
        : "No keywords specified (less important for modern SEO)",
    },
    // Open Graph checks
    {
      title: "Open Graph Tags",
      status: data.ogTags.length >= 4 ? "success" : "warning",
      message:
        data.ogTags.length >= 4
          ? "Good Open Graph implementation"
          : "Missing some important Open Graph tags",
    },
    // Twitter Card checks
    {
      title: "Twitter Cards",
      status: data.twitterTags.length >= 3 ? "success" : "warning",
      message:
        data.twitterTags.length >= 3
          ? "Good Twitter Card implementation"
          : "Missing some Twitter Card tags",
    },
    // Favicon check
    {
      title: "Favicon",
      status: data.icons.length > 0 ? "success" : "warning",
      message:
        data.icons.length > 0
          ? `${data.icons.length} favicon(s) found`
          : "No favicon found",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <div className="grid gap-2 md:grid-cols-2">
        {seoChecks.map((check, index) => (
          <div
            key={index}
            className="rounded-xl border p-4 dark:border-neutral-800"
          >
            <div className="flex items-center gap-2">
              {check.status === "success" ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle
                  className={`h-5 w-5 ${
                    check.status === "warning"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                />
              )}
              <h3 className="font-medium">{check.title}</h3>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {check.message}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
