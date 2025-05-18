import { Metadata } from "@/types/metadata";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  DocumentProps,
  Image,
  Link,
} from "@react-pdf/renderer";
import React from "react";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
    position: "relative",
    minHeight: "100%",
  },
  section: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    marginBottom: 60,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: "#000000",
    fontWeight: "bold",
    borderBottom: "2px solid #e5e7eb",
    paddingBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 8,
    color: "#374151",
  },
  label: {
    fontSize: 12,
    color: "#6b7280",
    marginRight: 5,
    fontWeight: "bold",
  },
  metaSection: {
    marginBottom: 20,
    backgroundColor: "#f9fafb",
    padding: 15,
    borderRadius: 10,
    border: "1px solid #e5e7eb",
  },
  header: {
    backgroundColor: "#444",
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
  },
  headerText: {
    color: "#ffffff",
    fontSize: 12,
  },
  imageContainer: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  image: {
    width: 100,
    height: 100,
    objectFit: "contain",
    marginRight: 10,
    marginBottom: 10,
    border: "1px solid #e5e7eb",
    borderRadius: 6,
  },
  ogImage: {
    width: 300,
    height: 200,
    objectFit: "contain",
    marginBottom: 10,
    border: "1px solid #e5e7eb",
    borderRadius: 10,
  },
  imageCaption: {
    fontSize: 10,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 4,
  },
  tagContainer: {
    marginTop: 5,
    padding: 8,
    backgroundColor: "#f3f4f6",
    borderRadius: 6,
    marginBottom: 5,
  },
  imageSection: {
    marginTop: 5,
    padding: 8,
    backgroundColor: "#f3f4f6",
    borderRadius: 6,
    marginBottom: 5,
  },
  errorSection: {
    backgroundColor: "#fef2f2",
    borderColor: "#dc2626",
  },
  errorText: {
    color: "#dc2626",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    borderTop: "1px solid #e5e7eb",
    paddingTop: 10,
    marginHorizontal: 30,
  },
  footerText: {
    fontSize: 10,
    color: "#6b7280",
    textAlign: "center",
  },
});

interface ReportData extends DocumentProps {
  url: string;
  metadata: Metadata;
}

const MetaTagSection: React.FC<{
  tags: { name: string; content: string }[];
  title: string;
}> = ({ tags, title }) => {
  const imageTag = tags.find(
    (tag) =>
      tag.name.includes("image") &&
      !tag.name.includes("width") &&
      !tag.name.includes("height"),
  );

  return (
    <View style={styles.metaSection}>
      <Text style={styles.subtitle}>{title}</Text>
      {imageTag && (
        <View style={styles.imageSection}>
          <Image src={imageTag.content} style={styles.ogImage} />
          <Text style={styles.imageCaption}>{title} Image</Text>
        </View>
      )}
      {tags.map((tag, index) => (
        <View key={index} style={styles.tagContainer}>
          <Text style={styles.text}>
            <Text style={styles.label}>Name:</Text> {tag.name}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Content:</Text> {tag.content}
          </Text>
        </View>
      ))}
    </View>
  );
};

const ReportContent: React.FC<ReportData> = ({ url, metadata }) => (
  <Page size="A4" style={styles.page}>
    <View style={styles.header}>
      <Text style={[styles.title, { color: "#ffffff" }]}>
        Website Metadata Report
      </Text>
      <Text style={styles.headerText}>
        Generated on: {new Date().toLocaleString()}
      </Text>
      <Text style={styles.headerText}>URL: {url}</Text>
    </View>

    <View style={styles.section}>
      <View style={styles.metaSection}>
        <Text style={styles.subtitle}>Basic Metadata</Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Title:</Text>{" "}
          {metadata.title || "Not found"}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Description:</Text>{" "}
          {metadata.description || "Not found"}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Author:</Text>{" "}
          {metadata.author || "Not found"}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Keywords:</Text>{" "}
          {metadata.keywords || "Not found"}
        </Text>
      </View>

      <MetaTagSection tags={metadata.ogTags} title="Open Graph Data" />
      <MetaTagSection tags={metadata.twitterTags} title="Twitter Card Data" />

      {metadata.icons.length > 0 && (
        <View style={styles.metaSection}>
          <Text style={styles.subtitle}>Site Icons</Text>
          <View style={styles.imageContainer}>
            {metadata.icons.map((icon, index) => (
              <View key={index}>
                <Image src={icon} style={styles.image} />
                <Text style={styles.imageCaption}>Site Icon {index + 1}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {metadata.error && (
        <View style={[styles.metaSection, styles.errorSection]}>
          <Text style={[styles.subtitle, { color: "#dc2626" }]}>Errors</Text>
          <Text style={[styles.text, styles.errorText]}>
            {metadata.message}
          </Text>
        </View>
      )}
    </View>

    <View style={styles.footer}>
      <Text style={styles.footerText}>
        Report generated by{" "}
        <Link href="https://checksitemeta.com">checksitemeta.com</Link>
      </Text>
    </View>
  </Page>
);

export const PDFReport: React.FC<ReportData> = (props) => (
  <Document>
    <ReportContent {...props} />
  </Document>
);
