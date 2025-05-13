import { useState } from "react";
import Image from "next/image";
import { isImageUrl, isValidUrl } from "@/lib/utils";
import { getMetaImageUrl } from "@/lib/utils";
import Link from "next/link";

// Image Preview Component
export function ImagePreview({ url }: { url: string }) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (isError) {
    return <div className="text-red-500 text-xs">Failed to load image</div>;
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
      className="text-blue-600 hover:text-blue-800 font-mono flex items-center gap-1 break-all"
    >
      {url}
      <svg
        className="w-4 h-4 inline-block flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
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

  const isImage = isImageUrl(value);
  const isUrl = isValidUrl(value);

  return (
    <div className="border border-gray-200 p-3 rounded-xl">
      <div className="text-gray-500">{label}</div>
      {isImage ? (
        <div className="mt-2">
          <ImagePreview url={value} />
          <div className="mt-2">
            <ExternalLink url={value} />
          </div>
        </div>
      ) : isUrl ? (
        <ExternalLink url={value} />
      ) : (
        <div className="text-gray-900">{value}</div>
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

  const imageUrl = getMetaImageUrl(items);

  return (
    <div className="border border-gray-200 p-3 rounded-xl">
      <div className="text-gray-500">{label}</div>
      <div className="grid grid-cols-1 gap-3 mt-2">
        {imageUrl && (
          <div className="mb-4">
            <ImagePreview url={imageUrl} />
            <div className="mt-2">
              <ExternalLink url={imageUrl} />
            </div>
          </div>
        )}
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-gray-50 rounded-md px-3 py-2 break-words border border-gray-100"
          >
            <strong className="block text-sm text-gray-700 font-mono">
              {item.name}
            </strong>
            {isValidUrl(item.content) ? (
              <ExternalLink url={item.content} />
            ) : (
              <div className="text-gray-900 text-base">{item.content}</div>
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
    return <div className="text-red-500 text-xs">Failed to load icon</div>;
  }

  return (
    <div className="relative w-14 h-14 bg-gray-100 rounded-lg overflow-hidden">
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
          <div className="text-xs text-gray-400">...</div>
        </div>
      )}
    </div>
  );
}

export function IconsGroup({ icons }: { icons: string[] }) {
  if (!icons?.length) return null;

  return (
    <div className="border border-gray-200 p-3 rounded-xl">
      <div className="text-gray-500 mb-3">Icons</div>
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
