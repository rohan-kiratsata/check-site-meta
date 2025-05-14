import { getMetaImageUrl } from "@/lib/utils";
import Image from "next/image";

export default function PreviewTab({ data, url }: { data: any; url: string }) {
  // const { title, description, ogTags, twitterTags, icons } = data;
  // const ogImage = getMetaImageUrl([...ogTags, ...twitterTags]);

  return (
    <div className="">
      <GooglePreview data={data} />
      {/* <TwitterCard title={title} description={description} image={ogImage} /> */}
    </div>
  );
}

function GooglePreview({ data }: { data: any }) {
  const { title, description, url, icons, ogTags } = data;
  const siteName = ogTags.find(
    (tag: any) => tag.name === "og:site_name"
  )?.content;
  return (
    <section>
      <span className="text-sm text-gray-500">Google</span>
      <div className="mt-2 border p-3 rounded-lg">
        {/* left icon */}
        <div className="flex items-center gap-3">
          <div className="w-[24px] h-[24px] rounded-full overflow-hidden">
            <Image src={icons[0]} alt="Google" width={24} height={24} />
          </div>
          {/* right conttent */}
          <div className="flex-1">
            <div className="flex flex-col ">
              <span className="text-sm font-semibold">{siteName}</span>
              <span className="text-xs text-gray-700">{url}</span>
            </div>
          </div>
        </div>
        <div className="mt-1 flex flex-col gap-1">
          <span className="text-lg font-semibold line-clamp-1">{title}</span>
          <span className="text-base text-gray-700 line-clamp-2">
            {description}
          </span>
        </div>
      </div>
    </section>
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
