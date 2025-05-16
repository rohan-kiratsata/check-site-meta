import { ScrapedMetadata } from "@/types/metadata";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface SEOCheck {
  title: string;
  status: "success" | "warning" | "error";
  message: string;
  details?: {
    current: string;
    recommendations: string[];
    importance: "High" | "Medium" | "Low";
  };
}

export default function SEOInsightsTab({ data }: { data: ScrapedMetadata }) {
  const [expandedChecks, setExpandedChecks] = useState<number[]>([]);

  const toggleCheck = (index: number) => {
    setExpandedChecks((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

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
      details: {
        current: data.title
          ? `Current title: "${data.title}" (${data.title.length} characters)`
          : "No title tag found",
        recommendations: [
          "Keep titles between 50-60 characters for optimal display in search results",
          "Include your main keyword near the beginning of the title",
          "Make titles unique for each page",
          "Use your brand name at the end of the title",
        ],
        importance: "High",
      },
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
          : `Description length (${data.description?.length} chars) should be between 120-155 characters`
        : "Missing meta description",
      details: {
        current: data.description
          ? `Current description: "${data.description}" (${data.description.length} characters)`
          : "No meta description found",
        recommendations: [
          "Write compelling descriptions between 120-155 characters",
          "Include your primary keyword naturally in the description",
          "Add a clear call-to-action when appropriate",
          "Make descriptions unique for each page",
        ],
        importance: "High",
      },
    },
    // Keywords check
    {
      title: "Meta Keywords",
      status: data.keywords ? "success" : "warning",
      message: data.keywords
        ? `Keywords present: ${data.keywords.split(",").length} keywords found`
        : "No keywords specified (less important for modern SEO)",
      details: {
        current: data.keywords
          ? `Current keywords: ${data.keywords}`
          : "No keywords found",
        recommendations: [
          "While less important for SEO today, keywords can help with internal site organization",
          "Use 3-5 relevant keywords that match your content",
          "Consider using these keywords in your content naturally",
        ],
        importance: "Low",
      },
    },
    // Open Graph checks
    {
      title: "Open Graph Tags",
      status: data.ogTags.length >= 4 ? "success" : "warning",
      message:
        data.ogTags.length >= 4
          ? "Good Open Graph implementation"
          : "Missing some important Open Graph tags",
      details: {
        current: `Found ${data.ogTags.length} Open Graph tags:\n${data.ogTags.map((tag) => `- ${tag.name}: ${tag.content}`).join("\n")}`,
        recommendations: [
          "Include og:title, og:description, og:image, and og:url as minimum",
          "Use high-quality images (1200x630px recommended)",
          "Write compelling og:description for social sharing",
          "Ensure og:type is appropriate for your content",
        ],
        importance: "Medium",
      },
    },
    // Twitter Card checks
    {
      title: "Twitter Cards",
      status: data.twitterTags.length >= 3 ? "success" : "warning",
      message:
        data.twitterTags.length >= 3
          ? "Good Twitter Card implementation"
          : "Missing some Twitter Card tags",
      details: {
        current: `Found ${data.twitterTags.length} Twitter Card tags:\n${data.twitterTags.map((tag) => `- ${tag.name}: ${tag.content}`).join("\n")}`,
        recommendations: [
          "Include twitter:card, twitter:title, and twitter:description as minimum",
          "Add twitter:image for better visibility (minimum 120x120px)",
          "Use twitter:site to link to your Twitter profile",
          "Consider using large summary card for better visibility",
        ],
        importance: "Medium",
      },
    },
    // Favicon check
    {
      title: "Favicon",
      status: data.icons.length > 0 ? "success" : "warning",
      message:
        data.icons.length > 0
          ? `${data.icons.length} favicon(s) found`
          : "No favicon found",
      details: {
        current:
          data.icons.length > 0
            ? `Found ${data.icons.length} icons:\n${data.icons.join("\n")}`
            : "No favicon found",
        recommendations: [
          "Include multiple favicon sizes (16x16, 32x32, 180x180 for Apple)",
          "Use .ico format for best browser compatibility",
          "Include apple-touch-icon for iOS devices",
          "Consider using SVG favicon for scalability",
        ],
        importance: "Low",
      },
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {seoChecks.map((check, index) => (
          <div
            key={index}
            className="h-fit rounded-xl border p-4 dark:border-neutral-800"
          >
            <div
              className="flex cursor-pointer items-center justify-between"
              onClick={() => toggleCheck(index)}
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
              {expandedChecks.includes(index) ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {check.message}
            </p>

            {expandedChecks.includes(index) && check.details && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 border-t pt-4 dark:border-neutral-700"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium dark:bg-neutral-800">
                      {check.details.importance} Priority
                    </span>
                  </div>

                  <div className="text-sm">
                    <h4 className="mb-1 font-medium">Current Implementation</h4>
                    <pre className="rounded-md bg-gray-50 p-2 text-xs whitespace-pre-wrap dark:bg-neutral-900">
                      {check.details.current}
                    </pre>
                  </div>

                  <div className="text-sm">
                    <h4 className="mb-1 font-medium">Recommendations</h4>
                    <ul className="list-inside list-disc space-y-1">
                      {check.details.recommendations.map((rec, i) => (
                        <li
                          key={i}
                          className="text-gray-600 dark:text-gray-400"
                        >
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
