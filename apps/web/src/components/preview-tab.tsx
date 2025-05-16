import { getMetaImageUrl } from "@/lib/utils";
import Image from "next/image";

export default function PreviewTab({ data }: { data: any }) {
  return (
    <div className="w-full space-y-8">
      <GooglePreview data={data} />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <IMessagePreview data={data} />
        <div className="flex flex-col gap-2">
          <TwitterPreview data={data} />
          <FacebookPreview data={data} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
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
    (tag: any) => tag.name === "og:site_name",
  )?.content;
  return (
    <section className="w-full">
      <span className="text-muted-foreground text-sm">Google</span>
      <div className="mt-2 rounded-lg border p-3">
        {/* left icon */}
        <div className="flex items-center gap-3">
          <div className="bg-muted h-[24px] w-[24px] overflow-hidden rounded-full">
            {icons[0] ? (
              <Image
                src={icons[0]}
                alt={siteName ?? ""}
                width={24}
                height={24}
              />
            ) : (
              <div className="bg-muted h-[24px] w-[24px] rounded-full" />
            )}
          </div>
          {/* right conttent */}
          <div className="flex-1">
            <div className="flex flex-col">
              <span className="text-foreground text-sm font-semibold">
                {siteName}
              </span>
              <span className="text-muted-foreground text-xs">{url}</span>
            </div>
          </div>
        </div>
        <div className="mt-1 flex flex-col gap-1">
          <span className="line-clamp-1 text-lg font-semibold text-blue-800 dark:text-blue-400">
            {title}
          </span>
          <span className="text-muted-foreground line-clamp-2 text-base">
            {description}
          </span>
        </div>
      </div>
    </section>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 py-2 text-sm font-medium text-black">
      <span className="text-black dark:text-white">9:41</span>
      <div className="flex items-center gap-1.5">
        <div className="text-black dark:text-white">
          <svg
            className="h-6 w-6"
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
    <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-2 dark:border-neutral-600">
      <div className="flex items-center gap-2">
        <svg
          className="h-6 w-6 text-[#007AFF]"
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
          <div className="h-8 w-8 overflow-hidden rounded-full bg-neutral-200">
            <div className="h-full w-full bg-gradient-to-br from-neutral-300 to-neutral-400" />
          </div>
          <span className="text-sm font-medium">Jane</span>
        </div>
      </div>
      <div className="flex items-center">
        <div className="h-7 w-7"></div>
      </div>
    </div>
  );
}

function IMessagePreview({ data }: { data: any }) {
  const { title, ogTags, url } = data;
  const ogImage = ogTags.find((tag: any) => tag.name === "og:image")?.content;
  const siteName = ogTags.find(
    (tag: any) => tag.name === "og:site_name",
  )?.content;

  return (
    <section className="w-full">
      <span className="text-muted-foreground text-sm">iMessage</span>
      <div className="mt-2 max-w-[375px]">
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-900">
          {/* iPhone Frame */}
          <div className="relative">
            {/* Status Bar */}
            <StatusBar />

            {/* Navigation */}
            <NavigationBar />

            {/* Messages Container */}
            <div className="h-[400px] space-y-2 overflow-y-auto bg-[#F2F2F7] px-4 py-3 dark:bg-neutral-800">
              <div className="flex justify-center">
                <span className="text-muted-foreground text-xs">
                  Today 9:41 AM
                </span>
              </div>

              <div className="flex justify-end space-y-1">
                <div className="max-w-[270px]">
                  <div className="relative">
                    <div className="rounded-tr-md text-white">
                      <div className="overflow-hidden rounded-lg bg-white/10">
                        {ogImage && (
                          <div className="relative aspect-[1.91/1] w-full">
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
                        <div className="space-y-1 bg-neutral-200 p-3 dark:bg-neutral-300">
                          <h3 className="line-clamp-2 text-sm font-semibold text-black dark:text-neutral-800">
                            {title}
                          </h3>
                          {siteName && (
                            <p className="text-xs text-black/80 dark:text-neutral-800">
                              {url}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="absolute right-0 bottom-0 translate-y-5 text-xs text-neutral-500">
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
    (tag: any) => tag.name === "og:site_name",
  )?.content;

  return (
    <section className="w-full">
      <span className="text-sm text-neutral-500 dark:text-neutral-400">
        Twitter Card
      </span>
      <div className="mt-2 max-w-[500px] overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
        {ogImage && (
          <div className="relative aspect-[1.91/1] w-full">
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
        <div className="space-y-1 p-3">
          <p className="text-sm text-[#536471] dark:text-neutral-400">
            {siteName}
          </p>
          <h3 className="text-[15px] leading-5 font-bold dark:text-neutral-100">
            {title}
          </h3>
          <p className="line-clamp-2 text-[15px] leading-5 text-[#536471] dark:text-neutral-300">
            {description}
          </p>
          <p className="flex items-center gap-1 text-[15px] text-[#536471] dark:text-neutral-400">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
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
    (tag: any) => tag.name === "og:site_name",
  )?.content;

  return (
    <section className="w-full">
      <span className="text-sm text-neutral-500 dark:text-neutral-400">
        Facebook
      </span>
      <div className="mt-2 max-w-[500px] overflow-hidden rounded-lg border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-900">
        {ogImage && (
          <div className="relative aspect-[1.91/1] w-full">
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
        <div className="bg-[#f0f2f5] p-3 dark:bg-neutral-800">
          <p className="text-xs text-[#65676B] uppercase dark:text-neutral-400">
            {siteName}
          </p>
          <h3 className="mt-1 text-[17px] leading-5 font-semibold text-[#050505] dark:text-neutral-100">
            {title}
          </h3>
          <p className="mt-1 line-clamp-2 text-[15px] leading-5 text-[#65676B] dark:text-neutral-300">
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
    (tag: any) => tag.name === "og:site_name",
  )?.content;

  return (
    <section className="w-full">
      <span className="text-sm text-neutral-500 dark:text-neutral-400">
        Slack
      </span>
      <div className="mt-2 border-y border-r border-l-4 border-neutral-200 border-l-[#1D9BD1] bg-white dark:border-neutral-700 dark:bg-neutral-900">
        <div className="flex">
          {ogImage && (
            <div className="relative aspect-square w-[150px] shrink-0">
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
          <div className="min-w-0 flex-1 p-3">
            <h3 className="line-clamp-1 text-base font-bold text-black dark:text-neutral-100">
              {title}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm text-neutral-700 dark:text-neutral-300">
              {description}
            </p>
            <p className="mt-2 truncate text-sm text-neutral-500 dark:text-neutral-400">
              {url}
            </p>
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
    (tag: any) => tag.name === "og:site_name",
  )?.content;

  return (
    <section className="w-full">
      <span className="text-sm text-neutral-500 dark:text-neutral-400">
        Discord
      </span>
      <div className="mt-2 max-w-[500px] overflow-hidden rounded-md border-l-4 border-l-[#5865F2] bg-[#2F3136] dark:bg-neutral-900">
        {ogImage && (
          <div className="relative aspect-[1.91/1] w-full">
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
        <div className="space-y-1 p-3">
          <p className="text-sm text-[#00AFF4] dark:text-blue-400">
            {siteName}
          </p>
          <h3 className="text-semibold text-base text-white dark:text-neutral-100">
            {title}
          </h3>
          <p className="line-clamp-2 text-sm text-[#DCDDDE] dark:text-neutral-300">
            {description}
          </p>
          <p className="text-sm text-[#72767D] dark:text-neutral-400">{url}</p>
        </div>
      </div>
    </section>
  );
}

function OGPreview({ data }: { data: any }) {
  const { title, description, ogTags, url } = data;
  const ogImage = ogTags.find((tag: any) => tag.name === "og:image")?.content;
  const siteName = ogTags.find(
    (tag: any) => tag.name === "og:site_name",
  )?.content;

  return (
    <section className="w-full">
      <span className="text-sm text-neutral-500 dark:text-neutral-400">
        Generic Open Graph
      </span>
      <div className="mt-2 max-w-[500px] overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
        {ogImage && (
          <div className="relative aspect-[1.91/1] w-full">
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
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {siteName}
          </p>
          <h3 className="mt-1 text-xl font-bold text-neutral-900 dark:text-neutral-100">
            {title}
          </h3>
          <p className="mt-2 line-clamp-2 text-base text-neutral-700 dark:text-neutral-300">
            {description}
          </p>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            {url}
          </p>
        </div>
      </div>
    </section>
  );
}
