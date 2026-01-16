import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Sparkles,
  Search,
  ScanText,
  FilePlus,
  Scissors,
  Minimize2,
  ImagePlus,
  Shrink,
} from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SEO from "@/components/SEO";
import { ToolCard, ByteBeamValueProp } from "@/components/tools";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define functional tools only
const ALL_TOOLS = [
  // OCR & Text Extraction
  {
    title: "Image to Text (OCR)",
    description: "Extract text from images using AI-powered OCR. Supports multiple languages.",
    href: "/tools/image-to-text",
    icon: ScanText,
    category: "OCR & Text Extraction",
    isAIPowered: false,
    isNew: true,
  },
  {
    title: "PDF to Text Extractor",
    description: "Extract all text content from PDF documents instantly.",
    href: "/tools/pdf-to-text",
    icon: FileText,
    category: "OCR & Text Extraction",
  },

  // PDF Tools
  {
    title: "PDF Merger",
    description: "Combine multiple PDF files into a single document.",
    href: "/tools/pdf-merger",
    icon: FilePlus,
    category: "PDF Tools",
    isNew: true,
  },
  {
    title: "PDF Splitter",
    description: "Split PDF documents into separate pages or sections.",
    href: "/tools/pdf-splitter",
    icon: Scissors,
    category: "PDF Tools",
  },
  {
    title: "PDF Compressor",
    description: "Reduce PDF file size while maintaining quality.",
    href: "/tools/pdf-compressor",
    icon: Minimize2,
    category: "PDF Tools",
    isNew: true,
  },

  // Image Tools
  {
    title: "Image to PDF Converter",
    description: "Convert images to PDF documents. Supports multiple images.",
    href: "/tools/image-to-pdf",
    icon: ImagePlus,
    category: "Image Tools",
  },
  {
    title: "Image Compressor",
    description: "Reduce image file sizes without losing quality.",
    href: "/tools/image-compressor",
    icon: Shrink,
    category: "Image Tools",
  },
];

const CATEGORIES = [
  "All",
  "OCR & Text Extraction",
  "PDF Tools",
  "Image Tools",
];

export default function ToolsDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTools = useMemo(() => {
    return ALL_TOOLS.filter((tool) => {
      const matchesSearch =
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const categoryCount = useMemo(() => {
    const counts: Record<string, number> = { All: ALL_TOOLS.length };
    ALL_TOOLS.forEach((tool) => {
      counts[tool.category] = (counts[tool.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <>
      <SEO
        title="Free Online Document Tools | PDF, OCR, Image Converter | ByteBeam"
        description="Free online document tools. Convert PDFs, extract text with OCR, compress images, and more. No signup required. All processing done locally for privacy."
        keywords="free pdf tools, online ocr, image to text, pdf merger, pdf compressor, document converter, free online tools"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "ByteBeam Free Document Tools",
          description: "Collection of free online document processing tools",
          applicationCategory: "Utility",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        }}
      />
      <Navigation />

      <main className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-custom">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Sparkles className="size-3 mr-1" />
              Free Tools
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Free Document Processing Tools
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Convert, compress, extract, and transform your documents with our
              collection of free online tools. No signup required. Your files stay private.
            </p>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 space-y-4"
          >
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Tabs
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              className="w-full"
            >
              <TabsList className="w-full flex-wrap h-auto gap-2 bg-transparent justify-center">
                {CATEGORIES.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {category}
                    <span className="ml-1.5 text-xs opacity-70">
                      ({categoryCount[category] || 0})
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Tools Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {filteredTools.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredTools.map((tool, index) => (
                  <motion.div
                    key={tool.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * (index % 12) }}
                  >
                    <ToolCard
                      title={tool.title}
                      description={tool.description}
                      href={tool.href}
                      icon={tool.icon}
                      category={tool.category}
                      isAIPowered={tool.isAIPowered}
                      isNew={tool.isNew}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="size-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No tools found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </motion.div>

          {/* ByteBeam Platform Introduction */}
          <ByteBeamValueProp variant="full" context="general" />
        </div>
      </main>

      <Footer />
    </>
  );
}
