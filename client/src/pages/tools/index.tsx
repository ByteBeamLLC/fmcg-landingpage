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
  PenTool,
  RotateCw,
  Trash2,
  Table,
  Receipt,
  FileUser,
  MessageSquare,
  FileSearch,
  Landmark,
  Shield,
  Scale,
  Gavel,
  FileSignature,
  EyeOff,
  GitCompare,
  Bot,
  ArrowRight,
} from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SEO from "@/components/SEO";
import { ToolCard } from "@/components/tools";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 25 curated tools organized by category
const ALL_TOOLS = [
  // Contract & Legal (5)
  {
    title: "Contract Analyzer",
    description: "Analyze contracts for key terms, risks, and obligations.",
    href: "/tools/contract-analyzer",
    icon: Scale,
    category: "Contract & Legal",
    isAIPowered: true,
  },
  {
    title: "Contract Clause Finder",
    description: "Find specific clauses in contracts using AI.",
    href: "/tools/contract-clause-finder",
    icon: FileSearch,
    category: "Contract & Legal",
    isAIPowered: true,
  },
  {
    title: "Contract Comparison",
    description: "Compare two contracts and identify changes and risks.",
    href: "/tools/contract-compare",
    icon: GitCompare,
    category: "Contract & Legal",
    isAIPowered: true,
  },
  {
    title: "Legal Summarizer",
    description: "Summarize legal documents with plain language explanations.",
    href: "/tools/legal-summarizer",
    icon: Gavel,
    category: "Contract & Legal",
    isAIPowered: true,
  },
  {
    title: "NDA Generator",
    description: "Generate Non-Disclosure Agreements instantly.",
    href: "/tools/nda-generator",
    icon: FileSignature,
    category: "Contract & Legal",
  },

  // Policy & Compliance (2)
  {
    title: "Policy Analyzer",
    description: "Analyze insurance policies for coverage and exclusions.",
    href: "/tools/policy-analyzer",
    icon: Shield,
    category: "Policy & Compliance",
    isAIPowered: true,
  },
  {
    title: "Document Comparison",
    description: "Compare any two documents and highlight differences.",
    href: "/tools/document-compare",
    icon: GitCompare,
    category: "Policy & Compliance",
    isAIPowered: true,
  },

  // Search, Chat & Summarization (3)
  {
    title: "PDF Chat",
    description: "Chat with your PDF documents. Ask questions, get answers.",
    href: "/tools/pdf-chat",
    icon: MessageSquare,
    category: "Search, Chat & Summarization",
    isAIPowered: true,
  },
  {
    title: "AI File Search",
    description: "Search documents by meaning, not keywords. Semantic search.",
    href: "/tools/file-search",
    icon: Search,
    category: "Search, Chat & Summarization",
    isAIPowered: true,
  },
  {
    title: "AI Document Summarizer",
    description: "Summarize documents instantly with AI. Get key points.",
    href: "/tools/ai-summarizer",
    icon: FileSearch,
    category: "Search, Chat & Summarization",
    isAIPowered: true,
  },

  // Extract, Convert & Prepare (15)
  // Business document extraction
  {
    title: "Invoice Parser",
    description: "Extract data from invoices automatically using AI.",
    href: "/tools/invoice-parser",
    icon: Receipt,
    category: "Extract, Convert & Prepare",
    isAIPowered: true,
  },
  {
    title: "Receipt Scanner",
    description: "Scan receipts and extract transaction details with AI.",
    href: "/tools/receipt-scanner",
    icon: Receipt,
    category: "Extract, Convert & Prepare",
    isAIPowered: true,
  },
  {
    title: "Bank Statement Parser",
    description: "Extract transactions from bank statements automatically.",
    href: "/tools/bank-statement-parser",
    icon: Landmark,
    category: "Extract, Convert & Prepare",
    isAIPowered: true,
  },
  {
    title: "Resume Parser",
    description: "Extract structured data from resumes and CVs.",
    href: "/tools/resume-parser",
    icon: FileUser,
    category: "Extract, Convert & Prepare",
    isAIPowered: true,
  },
  {
    title: "PDF Table Extractor",
    description: "Extract tables from PDF documents to CSV or Excel.",
    href: "/tools/pdf-table-extractor",
    icon: Table,
    category: "Extract, Convert & Prepare",
    isAIPowered: true,
  },
  // OCR & Text
  {
    title: "Image to Text (OCR)",
    description: "Extract text from images using AI-powered OCR.",
    href: "/tools/image-to-text",
    icon: ScanText,
    category: "Extract, Convert & Prepare",
  },
  {
    title: "PDF to Text Extractor",
    description: "Extract all text content from PDF documents instantly.",
    href: "/tools/pdf-to-text",
    icon: FileText,
    category: "Extract, Convert & Prepare",
  },
  {
    title: "Handwriting to Text",
    description: "Convert handwritten notes to digital text using OCR.",
    href: "/tools/handwriting-to-text",
    icon: PenTool,
    category: "Extract, Convert & Prepare",
  },
  // Document preparation
  {
    title: "PDF Redactor",
    description: "Permanently redact sensitive information from PDFs.",
    href: "/tools/pdf-redactor",
    icon: EyeOff,
    category: "Extract, Convert & Prepare",
  },
  {
    title: "PDF Compressor",
    description: "Reduce PDF file size while maintaining quality.",
    href: "/tools/pdf-compressor",
    icon: Minimize2,
    category: "Extract, Convert & Prepare",
  },
  {
    title: "Image to PDF Converter",
    description: "Convert images to PDF documents. Supports multiple images.",
    href: "/tools/image-to-pdf",
    icon: ImagePlus,
    category: "Extract, Convert & Prepare",
  },
  // PDF utilities (at the bottom)
  {
    title: "PDF Merger",
    description: "Combine multiple PDF files into a single document.",
    href: "/tools/pdf-merger",
    icon: FilePlus,
    category: "Extract, Convert & Prepare",
  },
  {
    title: "PDF Splitter",
    description: "Split PDF documents into separate pages or sections.",
    href: "/tools/pdf-splitter",
    icon: Scissors,
    category: "Extract, Convert & Prepare",
  },
  {
    title: "PDF Page Remover",
    description: "Delete unwanted pages from any PDF document.",
    href: "/tools/pdf-page-remover",
    icon: Trash2,
    category: "Extract, Convert & Prepare",
  },
  {
    title: "PDF Page Rotator",
    description: "Rotate PDF pages 90°, 180°, or 270° instantly.",
    href: "/tools/pdf-rotate",
    icon: RotateCw,
    category: "Extract, Convert & Prepare",
  },
];

const CATEGORIES = [
  "All",
  "Contract & Legal",
  "Policy & Compliance",
  "Search, Chat & Summarization",
  "Extract, Convert & Prepare",
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

  // Group tools by category for section display
  const toolsByCategory = useMemo(() => {
    if (selectedCategory !== "All") {
      return { [selectedCategory]: filteredTools };
    }

    const grouped: Record<string, typeof ALL_TOOLS> = {};
    CATEGORIES.slice(1).forEach((cat) => {
      grouped[cat] = filteredTools.filter((t) => t.category === cat);
    });
    return grouped;
  }, [filteredTools, selectedCategory]);

  return (
    <>
      <SEO
        title="AI Document Tools | Contract Analysis, Policy Review, Document Search | ByteBeam"
        description="AI-powered document tools for professionals. Analyze contracts, review policies, search documents semantically, and extract data. Turn any tool into an automated agent."
        keywords="contract analyzer, policy analyzer, document search, pdf chat, legal document ai, contract comparison, invoice parser, document automation"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "ByteBeam Document Intelligence Tools",
          description: "AI-powered document analysis and automation tools for professionals",
          applicationCategory: "BusinessApplication",
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
              AI-Powered Tools
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Document Intelligence Tools
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Analyze contracts, review policies, search documents by meaning, and extract structured data.
              Run once for free, or turn any tool into an automated agent.
            </p>

            {/* Agent CTA */}
            <div className="inline-flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg">
              <Bot className="size-5 text-primary" />
              <span className="text-sm text-foreground">
                Want to automate document workflows?
              </span>
              <Link href="/about">
                <Button size="sm" variant="default">
                  Build an Agent
                  <ArrowRight className="size-3 ml-1" />
                </Button>
              </Link>
            </div>
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

          {/* Tools by Category */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-10"
          >
            {Object.entries(toolsByCategory).map(([category, tools]) => (
              tools.length > 0 && (
                <div key={category}>
                  {selectedCategory === "All" && (
                    <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                      {category}
                      <Badge variant="secondary" className="text-xs">
                        {tools.length}
                      </Badge>
                    </h2>
                  )}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {tools.map((tool, index) => (
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
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )
            ))}

            {filteredTools.length === 0 && (
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

          {/* Agent Platform CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16"
          >
            <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
              <Bot className="size-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Turn Any Tool Into an Automated Agent
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Stop running tools manually. ByteBeam agents watch for new documents,
                apply your rules automatically, and route outputs to your systems—email,
                Slack, Drive, or your CRM.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/about">
                  <Button size="lg">
                    <Bot className="size-4 mr-2" />
                    Learn About Agents
                  </Button>
                </Link>
                <Link href="/#contact">
                  <Button size="lg" variant="outline">
                    Talk to Us
                    <ArrowRight className="size-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}
