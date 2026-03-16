import SEO from "@/components/SEO";

interface ParsliSEOProps {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  structuredData?: object[];
  ogImage?: string;
}

export default function ParsliSEO({
  title,
  description,
  path,
  keywords,
  structuredData = [],
  ogImage,
}: ParsliSEOProps) {
  const canonical = `https://parser.bytebeam.co${path}`;
  const fullTitle = `${title} | Parsli - AI Document Parser`;

  // Auto-generate BreadcrumbList from path
  const segments = path.split("/").filter(Boolean);
  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: "Parsli", item: "https://parser.bytebeam.co" },
    ...segments.map((seg, i) => ({
      "@type": "ListItem",
      position: i + 2,
      name: seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      item: `https://parser.bytebeam.co/${segments.slice(0, i + 1).join("/")}`,
    })),
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  const allStructuredData = [breadcrumbSchema, ...structuredData] as any[];

  return (
    <SEO
      title={fullTitle}
      description={description}
      canonical={canonical}
      ogUrl={canonical}
      ogTitle={fullTitle}
      ogDescription={description}
      ogImage={ogImage || "https://parser.bytebeam.co/og/parsli-default.png"}
      keywords={keywords}
      structuredData={allStructuredData}
    />
  );
}
