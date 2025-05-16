import { ScrapedMetadata } from "@/types/metadata";
import { Copy } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useTheme } from "next-themes";
import {
  materialDark,
  materialLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CopyCodeTab({ data }: { data: ScrapedMetadata }) {
  const { theme } = useTheme();
  function generateMetaCode(data: any) {
    let code = "";
    if (data.title) code += `<title>${data.title}</title>\n`;
    if (data.description)
      code += `<meta name=\"description\" content=\"${data.description}\" />\n`;
    if (data.author)
      code += `<meta name=\"author\" content=\"${data.author}\" />\n`;
    if (data.keywords)
      code += `<meta name=\"keywords\" content=\"${data.keywords}\" />\n`;
    if (data.ogTags && Array.isArray(data.ogTags)) {
      data.ogTags.forEach((tag: any) => {
        code += `<meta property=\"${tag.name}\" content=\"${tag.content}\" />\n`;
      });
    }
    if (data.twitterTags && Array.isArray(data.twitterTags)) {
      data.twitterTags.forEach((tag: any) => {
        code += `<meta name=\"${tag.name}\" content=\"${tag.content}\" />\n`;
      });
    }
    if (data.icons && Array.isArray(data.icons)) {
      data.icons.forEach((icon: string) => {
        code += `<link rel=\"icon\" href=\"${icon}\" />\n`;
      });
    }
    return code.trim();
  }

  return (
    <>
      {data && (
        <div className="w-full">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm font-medium">
              Copy Meta Tags
            </span>
            <button
              className="z-10 aspect-square rounded-full border border-neutral-200 bg-transparent px-2 py-1 font-mono text-xs text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
              onClick={() => {
                navigator.clipboard.writeText(generateMetaCode(data));
                toast.success("Copied to clipboard");
              }}
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
          <SyntaxHighlighter
            language="html"
            style={materialDark}
            customStyle={{
              borderRadius: "0.5rem",
            }}
          >
            {generateMetaCode(data)}
          </SyntaxHighlighter>
        </div>
      )}
    </>
  );
}
