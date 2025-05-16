import { AnimatePresence } from "motion/react";
import { MetadataBlock } from ".";
import { motion } from "motion/react";
import React from "react";
import { IconsGroup, MetadataGroup } from ".";
import { ScrapedMetadata } from "@/types/metadata";

export default function RawTab({ data }: { data: ScrapedMetadata }) {
  return (
    <>
      <AnimatePresence mode="wait">
        {data && (
          <motion.div
            key="metadata"
            className="space-y-1.5 rounded-2xl text-sm"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <MetadataBlock label="Title" value={data.title ?? ""} />
            <MetadataBlock label="Description" value={data.description ?? ""} />
            <MetadataBlock label="Author" value={data.author ?? ""} />
            <MetadataBlock label="Keywords" value={data.keywords ?? ""} />

            {data.ogTags?.length > 0 && (
              <MetadataGroup label="OpenGraph Tags" items={data.ogTags} />
            )}
            {data.twitterTags?.length > 0 && (
              <MetadataGroup label="Twitter Tags" items={data.twitterTags} />
            )}
            {data.icons?.length > 0 && <IconsGroup icons={data.icons} />}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
