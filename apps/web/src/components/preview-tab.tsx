import { getMetaImageUrl } from "@/lib/utils";

export default function PreviewTab({ data }: { data: any }) {
  const { title, description, ogTags, twitterTags } = data;
  const ogImage = getMetaImageUrl([...ogTags, ...twitterTags]);

  return (
    <div className="space-y-6">
      <GooglePreview title={title} description={description} />
      <TwitterCard title={title} description={description} image={ogImage} />
    </div>
  );
}

function GooglePreview({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="bg-white border rounded-lg px-4 py-3 space-y-1 shadow-sm">
      <div className="text-xs text-gray-600">https://example.com</div>
      <div className="text-blue-800 font-semibold text-[15px]">
        {title || "Page Title"}
      </div>
      <div className="text-sm text-gray-700">
        {description || "Meta description shown in search results..."}
      </div>
    </div>
  );
}

function TwitterCard({
  title,
  description,
  image,
}: {
  title?: string;
  description?: string;
  image?: string | any;
}) {
  return (
    <div className="border rounded-lg overflow-hidden max-w-md bg-white">
      {image && (
        <img
          src={image}
          alt="Twitter Preview"
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <div className="text-xs text-gray-500">checksitemeta.com</div>
        <div className="text-sm font-semibold text-gray-900">
          {title || "Page title here"}
        </div>
        <div className="text-sm text-gray-700 mt-1">
          {description || "Meta description for Twitter card preview."}
        </div>
      </div>
    </div>
  );
}
