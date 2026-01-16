import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Image,
  FileSpreadsheet,
  Sparkles,
  Search,
  ScanText,
  FileImage,
  FilePlus,
  FileOutput,
  Scissors,
  Minimize2,
  RotateCw,
  Lock,
  Unlock,
  Trash2,
  FileType,
  ImagePlus,
  Shrink,
  Maximize2,
  RefreshCw,
  Table,
  QrCode,
  Barcode,
  Languages,
  MessageSquare,
  Receipt,
  CreditCard,
  FileCheck,
  User,
  Briefcase,
  FileCode,
} from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SEO from "@/components/SEO";
import { ToolCard } from "@/components/tools";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define all tools
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
  {
    title: "Screenshot to Text",
    description: "Convert screenshots to editable text with OCR technology.",
    href: "/tools/screenshot-to-text",
    icon: FileImage,
    category: "OCR & Text Extraction",
  },
  {
    title: "Handwriting to Text",
    description: "Convert handwritten notes and documents to digital text.",
    href: "/tools/handwriting-to-text",
    icon: FileType,
    category: "OCR & Text Extraction",
  },
  {
    title: "Photo to Text",
    description: "Extract text from photos of documents, signs, and more.",
    href: "/tools/photo-to-text",
    icon: Image,
    category: "OCR & Text Extraction",
  },
  {
    title: "Scanned PDF to Searchable",
    description: "Convert scanned PDFs to searchable, selectable text documents.",
    href: "/tools/scanned-pdf-to-searchable",
    icon: Search,
    category: "OCR & Text Extraction",
  },

  // PDF Tools
  {
    title: "PDF to Word Converter",
    description: "Convert PDF files to editable Word documents (.docx) for free.",
    href: "/tools/pdf-to-word",
    icon: FileOutput,
    category: "PDF Tools",
    isNew: true,
  },
  {
    title: "PDF to Excel Converter",
    description: "Extract tables and data from PDFs into Excel spreadsheets.",
    href: "/tools/pdf-to-excel",
    icon: FileSpreadsheet,
    category: "PDF Tools",
  },
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
  {
    title: "PDF to Image Converter",
    description: "Convert PDF pages to high-quality JPG or PNG images.",
    href: "/tools/pdf-to-image",
    icon: Image,
    category: "PDF Tools",
  },
  {
    title: "PDF Page Remover",
    description: "Remove unwanted pages from PDF documents.",
    href: "/tools/pdf-page-remover",
    icon: Trash2,
    category: "PDF Tools",
  },
  {
    title: "PDF Page Rotator",
    description: "Rotate PDF pages to the correct orientation.",
    href: "/tools/pdf-rotate",
    icon: RotateCw,
    category: "PDF Tools",
  },
  {
    title: "PDF Password Remover",
    description: "Remove password protection from PDF files.",
    href: "/tools/pdf-unlock",
    icon: Unlock,
    category: "PDF Tools",
  },
  {
    title: "PDF Password Protector",
    description: "Add password protection to your PDF documents.",
    href: "/tools/pdf-protect",
    icon: Lock,
    category: "PDF Tools",
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
    title: "JPG to PDF",
    description: "Convert JPG images to PDF format quickly and easily.",
    href: "/tools/jpg-to-pdf",
    icon: FileImage,
    category: "Image Tools",
  },
  {
    title: "PNG to PDF",
    description: "Convert PNG images to PDF with transparency support.",
    href: "/tools/png-to-pdf",
    icon: FileImage,
    category: "Image Tools",
  },
  {
    title: "Image Compressor",
    description: "Reduce image file sizes without losing quality.",
    href: "/tools/image-compressor",
    icon: Shrink,
    category: "Image Tools",
  },
  {
    title: "Image Resizer",
    description: "Resize images to specific dimensions or percentages.",
    href: "/tools/image-resizer",
    icon: Maximize2,
    category: "Image Tools",
  },
  {
    title: "Image Format Converter",
    description: "Convert between image formats: JPG, PNG, WebP, GIF.",
    href: "/tools/image-converter",
    icon: RefreshCw,
    category: "Image Tools",
  },
  {
    title: "HEIC to JPG Converter",
    description: "Convert iPhone HEIC photos to JPG format.",
    href: "/tools/heic-to-jpg",
    icon: Image,
    category: "Image Tools",
  },
  {
    title: "WebP Converter",
    description: "Convert images to and from WebP format.",
    href: "/tools/webp-converter",
    icon: Image,
    category: "Image Tools",
  },

  // Document Conversion
  {
    title: "Word to PDF",
    description: "Convert Word documents to PDF format.",
    href: "/tools/word-to-pdf",
    icon: FileOutput,
    category: "Document Conversion",
  },
  {
    title: "Excel to PDF",
    description: "Convert Excel spreadsheets to PDF format.",
    href: "/tools/excel-to-pdf",
    icon: FileOutput,
    category: "Document Conversion",
  },
  {
    title: "CSV to Excel",
    description: "Convert CSV files to Excel spreadsheets.",
    href: "/tools/csv-to-excel",
    icon: FileSpreadsheet,
    category: "Document Conversion",
  },
  {
    title: "Excel to CSV",
    description: "Export Excel spreadsheets to CSV format.",
    href: "/tools/excel-to-csv",
    icon: FileCode,
    category: "Document Conversion",
  },
  {
    title: "JSON to Excel",
    description: "Convert JSON data to Excel spreadsheets.",
    href: "/tools/json-to-excel",
    icon: FileSpreadsheet,
    category: "Document Conversion",
  },
  {
    title: "Excel to JSON",
    description: "Convert Excel data to JSON format.",
    href: "/tools/excel-to-json",
    icon: FileCode,
    category: "Document Conversion",
  },
  {
    title: "XML to Excel",
    description: "Convert XML files to Excel spreadsheets.",
    href: "/tools/xml-to-excel",
    icon: FileSpreadsheet,
    category: "Document Conversion",
  },
  {
    title: "Markdown to PDF",
    description: "Convert Markdown files to formatted PDFs.",
    href: "/tools/markdown-to-pdf",
    icon: FileOutput,
    category: "Document Conversion",
  },

  // Data Extraction
  {
    title: "Table Extractor from PDF",
    description: "Extract tables from PDF documents into spreadsheet format.",
    href: "/tools/table-extractor-pdf",
    icon: Table,
    category: "Data Extraction",
  },
  {
    title: "Table Extractor from Image",
    description: "Extract tables from images using OCR technology.",
    href: "/tools/table-extractor-image",
    icon: Table,
    category: "Data Extraction",
  },
  {
    title: "QR Code Reader",
    description: "Scan and decode QR codes from images.",
    href: "/tools/qr-code-reader",
    icon: QrCode,
    category: "Data Extraction",
  },
  {
    title: "Barcode Reader",
    description: "Scan and decode barcodes from images.",
    href: "/tools/barcode-reader",
    icon: Barcode,
    category: "Data Extraction",
  },
  {
    title: "QR Code Generator",
    description: "Generate QR codes for URLs, text, and more.",
    href: "/tools/qr-code-generator",
    icon: QrCode,
    category: "Data Extraction",
  },

  // AI-Powered Tools
  {
    title: "AI Document Summarizer",
    description: "Get concise summaries of long documents using AI.",
    href: "/tools/ai-summarizer",
    icon: FileCheck,
    category: "AI-Powered",
    isAIPowered: true,
  },
  {
    title: "Chat with PDF",
    description: "Ask questions about your PDF documents and get AI-powered answers.",
    href: "/tools/ai-pdf-chat",
    icon: MessageSquare,
    category: "AI-Powered",
    isAIPowered: true,
  },
  {
    title: "Document Translator",
    description: "Translate documents to any language using AI.",
    href: "/tools/document-translator",
    icon: Languages,
    category: "AI-Powered",
    isAIPowered: true,
  },
  {
    title: "Invoice Data Extractor",
    description: "Extract structured data from invoices automatically.",
    href: "/tools/invoice-extractor",
    icon: Receipt,
    category: "AI-Powered",
    isAIPowered: true,
  },
  {
    title: "Receipt Scanner",
    description: "Scan receipts and extract expense data.",
    href: "/tools/receipt-scanner",
    icon: Receipt,
    category: "AI-Powered",
    isAIPowered: true,
  },
  {
    title: "Contract Analyzer",
    description: "AI-powered contract review and key terms extraction.",
    href: "/tools/contract-analyzer",
    icon: FileCheck,
    category: "AI-Powered",
    isAIPowered: true,
  },
  {
    title: "Resume/CV Parser",
    description: "Extract structured data from resumes and CVs.",
    href: "/tools/resume-parser",
    icon: User,
    category: "AI-Powered",
    isAIPowered: true,
  },
  {
    title: "Business Card Scanner",
    description: "Scan business cards and extract contact information.",
    href: "/tools/business-card-scanner",
    icon: CreditCard,
    category: "AI-Powered",
    isAIPowered: true,
  },
];

const CATEGORIES = [
  "All",
  "OCR & Text Extraction",
  "PDF Tools",
  "Image Tools",
  "Document Conversion",
  "Data Extraction",
  "AI-Powered",
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
        description="45+ free online document tools. Convert PDFs, extract text with OCR, compress images, and more. No signup required. All processing done locally for privacy."
        keywords="free pdf tools, online ocr, image to text, pdf merger, pdf compressor, document converter, free online tools"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "ByteBeam Free Document Tools",
          description: "Collection of 45+ free online document processing tools",
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
              45+ Free Tools
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

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20"
          >
            <Briefcase className="size-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Need Enterprise Document Processing?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              ByteBeam offers powerful AI agents for enterprise document automation.
              Process thousands of documents with custom workflows and integrations.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Learn About ByteBeam Platform
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}
