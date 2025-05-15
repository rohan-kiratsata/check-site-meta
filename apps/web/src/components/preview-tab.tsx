import { getMetaImageUrl } from "@/lib/utils";
import Image from "next/image";

export default function PreviewTab({ data }: { data: any }) {
  return (
    <div className="space-y-8 w-full">
      <GooglePreview data={data} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <IMessagePreview data={data} />
        <div className="flex flex-col gap-2">
          <TwitterPreview data={data} />
          <FacebookPreview data={data} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DiscordPreview data={data} />
        <OGPreview data={data} />
        <div className="col-span-1 lg:col-span-2">
          <SlackPreview data={data} />
        </div>
      </div>
    </div>
  );
}

function GooglePreview({ data }: { data: any }) {
  const { title, description, url, icons, ogTags } = data;
  const siteName = ogTags.find(
    (tag: any) => tag.name === "og:site_name"
  )?.content;
  return (
    <section className="w-full">
      <span className="text-sm text-gray-500">Google</span>
      <div className="mt-2 border p-3 rounded-lg">
        {/* left icon */}
        <div className="flex items-center gap-3">
          <div className="w-[24px] h-[24px] rounded-full overflow-hidden">
            {icons[0] ? (
              <Image
                src={icons[0]}
                alt={siteName ?? ""}
                width={24}
                height={24}
              />
            ) : (
              <div className="w-[24px] h-[24px] rounded-full bg-gray-200" />
            )}
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
          <span className="text-lg font-semibold line-clamp-1 text-blue-800">
            {title}
          </span>
          <span className="text-base text-gray-700 line-clamp-2">
            {description}
          </span>
        </div>
      </div>
    </section>
  );
}

function StatusBar() {
  return (
    <div className="flex justify-between items-center py-2 px-5 text-black text-sm font-medium">
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <div>
          <svg
            className="w-6 h-6"
            style={{
              width: "1.5em",
              height: "1.5em",
              verticalAlign: "middle",
              fill: "currentColor",
              overflow: "hidden",
            }}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M792 288H128c-52.8 0-96 43.2-96 96v256c0 52.8 43.2 96 96 96h664c52.8 0 96-43.2 96-96V384c0-52.8-43.2-96-96-96z m40 352c0 22-18 40-40 40H128c-22 0-40-18-40-40V384c0-22 18-40 40-40h664c22 0 40 18 40 40v256z m96-230.8v205.6c32 0 64-55.4 64-102.8s-32-102.8-64-102.8z" />
            <path d="M768 384H152c-13.2 0-24 10.8-24 24v208c0 13.2 10.8 24 24 24h616c13.2 0 24-10.8 24-24V408c0-13.2-10.8-24-24-24z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function NavigationBar() {
  return (
    <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
      <div className="flex items-center gap-2">
        <svg
          className="w-6 h-6 text-[#007AFF]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
          </div>
          <span className="text-sm font-medium">Jane</span>
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-7 h-7"></div>
      </div>
    </div>
  );
}

function IMessagePreview({ data }: { data: any }) {
  const { title, description, ogTags, twitterTags, url } = data;
  const ogImage = ogTags.find((tag: any) => tag.name === "og:image")?.content;
  const siteName = ogTags.find(
    (tag: any) => tag.name === "og:site_name"
  )?.content;

  return (
    <section className="w-full">
      <span className="text-sm text-gray-500">iMessage</span>
      <div className="mt-2 max-w-[375px]">
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          {/* iPhone Frame */}
          <div className="relative">
            {/* Status Bar */}
            <StatusBar />

            {/* Navigation */}
            <NavigationBar />

            {/* Messages Container */}
            <div className="bg-[#F2F2F7] h-[400px] px-4 py-3 space-y-2 overflow-y-auto">
              <div className="flex justify-center">
                <span className="text-xs text-gray-500">Today 9:41 AM</span>
              </div>

              <div className="flex justify-end space-y-1">
                <div className="max-w-[270px]">
                  <div className="relative">
                    <div className="rounded-tr-md text-white">
                      <div className="bg-white/10 rounded-lg overflow-hidden">
                        {ogImage && (
                          <div className="relative w-full aspect-[1.91/1]">
                            <Image
                              src={ogImage}
                              alt={title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 270px) 100vw, 270px"
                              priority={false}
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="p-3 space-y-1 bg-gray-300">
                          <h3 className="text-black font-semibold text-sm line-clamp-2">
                            {title}
                          </h3>
                          {siteName && (
                            <p className="text-black/80 text-xs">{url}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="absolute right-0 bottom-0 text-xs text-gray-500 translate-y-5">
                      Delivered
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TwitterPreview({ data }: { data: any }) {
  const { title, description, ogTags, url } = data;
  const ogImage = ogTags.find((tag: any) => tag.name === "og:image")?.content;
  const siteName = ogTags.find(
    (tag: any) => tag.name === "og:site_name"
  )?.content;

  return (
    <section className="w-full">
      <span className="text-sm text-gray-500">Twitter Card</span>
      <div className="mt-2 max-w-[500px] border border-gray-200 rounded-xl overflow-hidden bg-white">
        {ogImage && (
          <div className="relative w-full aspect-[1.91/1]">
            <Image
              src={ogImage}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 500px) 100vw, 500px"
              loading="lazy"
            />
          </div>
        )}
        <div className="p-3 space-y-1">
          <p className="text-sm text-[#536471]">{siteName}</p>
          <h3 className="font-bold text-[15px] leading-5">{title}</h3>
          <p className="text-[15px] leading-5 text-[#536471] line-clamp-2">
            {description}
          </p>
          <p className="text-[15px] text-[#536471] flex items-center gap-1">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z" />
              <path d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z" />
            </svg>
            {url}
          </p>
        </div>
      </div>
    </section>
  );
}

function FacebookPreview({ data }: { data: any }) {
  const { title, description, ogTags, url } = data;
  const ogImage = ogTags.find((tag: any) => tag.name === "og:image")?.content;
  const siteName = ogTags.find(
    (tag: any) => tag.name === "og:site_name"
  )?.content;

  return (
    <section className="w-full">
      <span className="text-sm text-gray-500">Facebook</span>
      <div className="mt-2 max-w-[500px] border border-gray-300 rounded-lg overflow-hidden bg-white">
        {ogImage && (
          <div className="relative w-full aspect-[1.91/1]">
            <Image
              src={ogImage}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 500px) 100vw, 500px"
              loading="lazy"
            />
          </div>
        )}
        <div className="p-3 bg-[#f0f2f5]">
          <p className="text-xs uppercase text-[#65676B]">{siteName}</p>
          <h3 className="font-semibold text-[17px] leading-5 text-[#050505] mt-1">
            {title}
          </h3>
          <p className="text-[15px] leading-5 text-[#65676B] mt-1 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

function SlackPreview({ data }: { data: any }) {
  const { title, description, ogTags, url } = data;
  const ogImage = ogTags.find((tag: any) => tag.name === "og:image")?.content;
  const siteName = ogTags.find(
    (tag: any) => tag.name === "og:site_name"
  )?.content;

  return (
    <section className="w-full">
      <span className="text-sm text-gray-500">Slack</span>
      <div className="mt-2 border-l-4 border-l-[#1D9BD1] border-y border-r border-gray-200 bg-white">
        <div className="flex">
          {ogImage && (
            <div className="relative w-[150px] aspect-square shrink-0">
              <Image
                src={ogImage}
                alt={title}
                fill
                className="object-cover"
                sizes="150px"
                loading="lazy"
              />
            </div>
          )}
          <div className="p-3 flex-1 min-w-0">
            <h3 className="font-bold text-black text-base line-clamp-1">
              {title}
            </h3>
            <p className="text-sm text-gray-700 line-clamp-2 mt-1">
              {description}
            </p>
            <p className="text-sm text-gray-500 mt-2 truncate">{url}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DiscordPreview({ data }: { data: any }) {
  const { title, description, ogTags, url } = data;
  const ogImage = ogTags.find((tag: any) => tag.name === "og:image")?.content;
  const siteName = ogTags.find(
    (tag: any) => tag.name === "og:site_name"
  )?.content;

  return (
    <section className="w-full">
      <span className="text-sm text-gray-500">Discord</span>
      <div className="mt-2 max-w-[500px] border-l-4 border-l-[#5865F2] rounded-md overflow-hidden bg-[#2F3136]">
        {ogImage && (
          <div className="relative w-full aspect-[1.91/1]">
            <Image
              src={ogImage}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 500px) 100vw, 500px"
              loading="lazy"
            />
          </div>
        )}
        <div className="p-3 space-y-1">
          <p className="text-[#00AFF4] text-sm">{siteName}</p>
          <h3 className="font-semibold text-white text-base">{title}</h3>
          <p className="text-[#DCDDDE] text-sm line-clamp-2">{description}</p>
          <p className="text-[#72767D] text-sm">{url}</p>
        </div>
      </div>
    </section>
  );
}

function OGPreview({ data }: { data: any }) {
  const { title, description, ogTags, url } = data;
  const ogImage = ogTags.find((tag: any) => tag.name === "og:image")?.content;
  const siteName = ogTags.find(
    (tag: any) => tag.name === "og:site_name"
  )?.content;

  return (
    <section className="w-full">
      <span className="text-sm text-gray-500">Generic Open Graph</span>
      <div className="mt-2 max-w-[500px] border border-gray-200 rounded-lg overflow-hidden bg-white">
        {ogImage && (
          <div className="relative w-full aspect-[1.91/1]">
            <Image
              src={ogImage}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 500px) 100vw, 500px"
              loading="lazy"
            />
          </div>
        )}
        <div className="p-4">
          <p className="text-sm text-gray-600">{siteName}</p>
          <h3 className="text-xl font-bold text-gray-900 mt-1">{title}</h3>
          <p className="text-base text-gray-700 mt-2 line-clamp-2">
            {description}
          </p>
          <p className="text-sm text-gray-500 mt-2">{url}</p>
        </div>
      </div>
    </section>
  );
}
