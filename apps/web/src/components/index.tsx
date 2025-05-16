import { useState } from "react";
import Image from "next/image";
import { isValidUrl } from "@/lib/utils";
import Link from "next/link";

// Image Preview Component
export function ImagePreview({ url }: { url: string }) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (isError) {
    return <div className="text-xs text-red-500">Failed to load image</div>;
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
      <Image
        src={url}
        alt="Preview"
        fill
        className={`object-contain transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsError(true)}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-sm text-gray-400">Loading...</div>
        </div>
      )}
    </div>
  );
}

export function ExternalLink({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 font-mono break-all text-blue-600 hover:text-blue-800"
    >
      {url}
    </a>
  );
}

export function MetadataBlock({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  if (!value) return null;
  const isUrl = isValidUrl(value);

  return (
    <div className="dark:border-border rounded-xl border border-neutral-200 p-3">
      <div className="text-muted-foreground text-sm">{label}</div>
      {isUrl ? (
        <ExternalLink url={value} />
      ) : (
        <div className="text-foreground text-base font-medium">{value}</div>
      )}
    </div>
  );
}

export function MetadataGroup({
  label,
  items,
}: {
  label: string;
  items: any[];
}) {
  if (!items?.length) return null;

  return (
    <div className="dark:border-muted rounded-xl border p-3">
      <div className="text-muted-foreground text-sm">{label}</div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-muted rounded-md border px-3 py-2 break-words dark:bg-neutral-900/50"
          >
            <strong className="text-muted-foreground block font-mono text-sm">
              {item.name}
            </strong>
            {isValidUrl(item.content) ? (
              <ExternalLink url={item.content} />
            ) : (
              <div className="text-foreground text-base font-medium">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function IconPreview({ url }: { url: string }) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (isError) {
    return <div className="text-xs text-red-500">Failed to load icon</div>;
  }

  return (
    <div className="bg-muted relative h-10 w-10 overflow-hidden rounded-lg">
      <Link href={url} target="_blank">
        <Image
          src={url}
          alt="Icon"
          fill
          className={`object-contain transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsError(true)}
        />
      </Link>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-muted-foreground text-xs">...</div>
        </div>
      )}
    </div>
  );
}

export function IconsGroup({ icons }: { icons: string[] }) {
  if (!icons?.length) return null;

  return (
    <div className="border-border rounded-xl border p-3">
      <div className="text-muted-foreground mb-3">Icons</div>
      <div className="flex flex-wrap gap-2">
        {icons.map((url, i) => (
          <div key={i} className="flex flex-col items-start gap-2">
            <IconPreview url={url} />
            {/* <ExternalLink url={url} /> */}
          </div>
        ))}
      </div>
    </div>
  );
}
