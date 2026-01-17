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
  Zap,
  Lock,
  Clock,
  CheckCircle2,
  Building2,
  Briefcase,
  Users,
  Calculator,
  ChevronDown,
  ChevronUp,
  Calendar,
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
import { Card, CardContent } from "@/components/ui/card";

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

// SEO Content: Why AI Document Tools
const WHY_AI_TOOLS = [
  {
    icon: Zap,
    title: "Process in Seconds, Not Hours",
    description: "AI analyzes contracts, extracts invoice data, and summarizes documents instantly—work that would take hours manually.",
  },
  {
    icon: Lock,
    title: "Privacy-First Processing",
    description: "Text extraction happens in your browser. We don't store your documents. Enterprise-grade encryption for AI analysis.",
  },
  {
    icon: CheckCircle2,
    title: "Consistent, Reliable Results",
    description: "AI applies the same criteria to every document. No more inconsistent reviews or missed details due to fatigue.",
  },
  {
    icon: Clock,
    title: "Available 24/7",
    description: "Process documents anytime—no waiting for team availability. Scale from 1 document to 1,000 without adding headcount.",
  },
];

// SEO Content: How It Works Steps
const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Use Any Tool Free",
    description: "Upload your document and run any tool—contract analysis, invoice parsing, PDF chat—completely free, no signup required.",
  },
  {
    step: "2",
    title: "Get Instant Results",
    description: "AI processes your document in seconds. Download structured data, analysis reports, or extracted text immediately.",
  },
  {
    step: "3",
    title: "Scale When Ready",
    description: "Need to process hundreds of documents? Turn any tool into an automated agent that runs 24/7 with your custom rules.",
  },
  {
    step: "4",
    title: "Your Team Builds the Logic",
    description: "Your subject matter experts define the rules in an Excel-like interface—no engineers required. Deploy in minutes.",
  },
];

// SEO Content: Industry Use Cases
const INDUSTRY_USE_CASES = [
  {
    icon: Scale,
    title: "Legal & Compliance",
    description: "Contract review, clause extraction, policy analysis, NDA generation. Reduce legal review time by 85%.",
    tools: ["Contract Analyzer", "Legal Summarizer", "Policy Analyzer"],
  },
  {
    icon: Calculator,
    title: "Finance & Accounting",
    description: "Invoice processing, receipt scanning, bank statement parsing. Automate AP workflows and expense management.",
    tools: ["Invoice Parser", "Receipt Scanner", "Bank Statement Parser"],
  },
  {
    icon: Users,
    title: "HR & Recruiting",
    description: "Resume parsing, offer letter generation, contract review. Screen candidates faster with consistent criteria.",
    tools: ["Resume Parser", "Contract Analyzer", "Document Comparison"],
  },
  {
    icon: Building2,
    title: "Operations & Admin",
    description: "Document conversion, data extraction, file management. Eliminate manual document handling across your organization.",
    tools: ["PDF Merger", "Image to Text", "PDF Table Extractor"],
  },
];

// SEO Content: FAQs
const FAQS = [
  {
    question: "Are these document tools really free?",
    answer: "Yes. All tools can be used for free with reasonable usage limits (typically 10 documents per hour). There's no signup required for basic use. For unlimited processing and automation, you can upgrade to the ByteBeam platform.",
  },
  {
    question: "Is my document data secure and private?",
    answer: "Absolutely. For most tools, text extraction happens locally in your browser—your files never leave your device. When AI analysis is needed, data is transmitted over encrypted connections and is not stored after processing. We're SOC 2 compliant and GDPR-ready.",
  },
  {
    question: "What types of documents can I process?",
    answer: "Our tools support PDFs, images (JPG, PNG, HEIC, WebP), Word documents, and scanned documents. The AI handles both digital and scanned/photographed documents through OCR. We support documents in 20+ languages.",
  },
  {
    question: "How accurate is the AI document analysis?",
    answer: "Our AI correctly extracts data and identifies key information in 95%+ of standard documents. Accuracy depends on document quality and complexity. For critical documents, we recommend human review of AI outputs—the tools are designed to augment, not replace, expert judgment.",
  },
  {
    question: "Can I automate document processing for my business?",
    answer: "Yes. Any free tool can be converted into an automated AI agent through the ByteBeam platform. Your subject matter experts define the processing rules in a familiar Excel-like interface—no coding required. Agents can watch folders, process email attachments, and route outputs to your systems.",
  },
  {
    question: "What's the difference between the free tools and ByteBeam agents?",
    answer: "Free tools process one document at a time, manually. ByteBeam agents automate the entire workflow: they watch for new documents, apply your custom rules automatically, validate outputs, and route results to email, Slack, Google Drive, or your CRM. Agents run 24/7 without manual intervention.",
  },
  {
    question: "Do I need technical skills to use these tools?",
    answer: "No. The free tools require zero technical knowledge—just upload and click. For building automated agents, your subject matter experts (not engineers) define the rules using an interface similar to Excel. If you can create a spreadsheet, you can build an AI agent.",
  },
  {
    question: "Which tool should I use for contract review?",
    answer: "Start with the Contract Analyzer for a comprehensive review of terms, parties, obligations, and risks. Use Contract Clause Finder to locate specific clauses across multiple contracts. Use Contract Comparison to identify changes between document versions. For quick summaries, try the Legal Summarizer.",
  },
];

// Structured Data for SEO
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ByteBeam Document Intelligence Tools",
    "description": "Free AI-powered document tools for contract analysis, invoice parsing, document summarization, and more. Turn any tool into an automated agent.",
    "url": "https://bytebeam.co/tools",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "provider": {
      "@type": "Organization",
      "name": "ByteBeam",
      "url": "https://bytebeam.co",
    },
    "featureList": [
      "Contract Analysis",
      "Invoice Parsing",
      "Document Summarization",
      "PDF Chat",
      "OCR Text Extraction",
      "Bank Statement Parsing",
      "Resume Parsing",
      "Document Comparison",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bytebeam.co" },
      { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://bytebeam.co/tools" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  },
];

// FAQ Accordion Component
function FAQItem({ question, answer, isOpen, onToggle }: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-4 flex items-center justify-between text-left hover:text-primary transition-colors"
      >
        <span className="font-medium text-foreground pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="size-5 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="size-5 text-muted-foreground shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 text-muted-foreground text-sm leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function ToolsDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

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

  const handleBookDemo = () => {
    window.open("https://calendly.com/talal-bytebeam/bytebeam-discovery-call", "_blank");
  };

  return (
    <>
      <SEO
        title="Free AI Document Tools | Contract Analyzer, Invoice Parser, PDF Chat | ByteBeam"
        description="Free AI-powered document tools for professionals. Analyze contracts, parse invoices, chat with PDFs, extract data from bank statements. Process documents instantly—no signup required. Turn any tool into an automated agent."
        keywords="free contract analyzer, free invoice parser, pdf chat free, document AI tools, contract analysis tool, invoice data extraction, bank statement parser, resume parser, legal document analyzer, AI document processing, free PDF tools, document automation"
        structuredData={structuredData}
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
              Free AI-Powered Tools
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Free AI Document Tools for Professionals
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
              Analyze contracts, parse invoices, chat with PDFs, extract data from any document.
              All tools are free to use—no signup required. Need to process hundreds of documents?
              Turn any tool into an automated AI agent.
            </p>

            {/* Stats Banner */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-green-500" />
                <span className="text-muted-foreground"><strong className="text-foreground">10,000+</strong> documents processed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-green-500" />
                <span className="text-muted-foreground"><strong className="text-foreground">85%</strong> time saved on average</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-green-500" />
                <span className="text-muted-foreground"><strong className="text-foreground">No signup</strong> required</span>
              </div>
            </div>

            {/* Agent CTA */}
            <div className="inline-flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg">
              <Bot className="size-5 text-primary" />
              <span className="text-sm text-foreground">
                Want to automate document workflows at scale?
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
                placeholder="Search tools (e.g., contract, invoice, PDF)..."
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

          {/* Why AI Document Tools Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold text-foreground text-center mb-4">
              Why Use AI Document Tools?
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
              Manual document processing is slow, inconsistent, and doesn't scale. 
              AI-powered tools transform how professionals handle contracts, invoices, and business documents.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_AI_TOOLS.map((item, index) => (
                <Card key={index} className="border-muted">
                  <CardContent className="p-6">
                    <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                      <item.icon className="size-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* How It Works Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold text-foreground text-center mb-4">
              From Free Tool to Automated Agent
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
              Start with free tools for immediate results. Scale to automated agents when you need to process documents 24/7.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {HOW_IT_WORKS.map((item, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  {index < HOW_IT_WORKS.length - 1 && (
                    <div className="hidden lg:block absolute top-5 left-[calc(100%+0.5rem)] w-[calc(100%-3rem)] h-px bg-border" />
                  )}
                </div>
              ))}
            </div>
          </motion.section>

          {/* Industry Use Cases Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold text-foreground text-center mb-4">
              Document Tools for Every Industry
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
              Whether you're in legal, finance, HR, or operations, our AI tools handle the documents that slow your team down.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {INDUSTRY_USE_CASES.map((useCase, index) => (
                <Card key={index} className="border-muted overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                        <useCase.icon className="size-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{useCase.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{useCase.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {useCase.tools.map((tool, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold text-foreground text-center mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
              Everything you need to know about our AI document tools.
            </p>
            <div className="max-w-3xl mx-auto bg-card border rounded-xl p-6">
              {FAQS.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQ === index}
                  onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
                />
              ))}
            </div>
          </motion.section>

          {/* Agent Platform CTA */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-20"
          >
            <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
              <Bot className="size-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Ready to Automate Document Processing?
              </h2>
                <p className="text-muted-foreground mb-6">
                Stop running tools manually. ByteBeam agents watch for new documents,
                apply your rules automatically, and route outputs to your systems—email,
                  Slack, Drive, or your CRM. Your subject matter experts build the logic
                  in an Excel-like interface. No engineers required.
                </p>
                <div className="flex flex-wrap gap-4 justify-center mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="size-4 text-green-500" />
                    <span className="text-muted-foreground">85% reduction in processing time</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="size-4 text-green-500" />
                    <span className="text-muted-foreground">Full audit trail</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="size-4 text-green-500" />
                    <span className="text-muted-foreground">No code required</span>
                  </div>
                </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button size="lg" onClick={handleBookDemo}>
                    <Calendar className="size-4 mr-2" />
                    Book a Demo
                  </Button>
                  <Link href="/about">
                  <Button size="lg" variant="outline">
                      Learn About ByteBeam
                    <ArrowRight className="size-4 ml-2" />
                  </Button>
                </Link>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Bottom SEO Text */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="mt-16 text-center"
          >
            <p className="text-sm text-muted-foreground max-w-4xl mx-auto">
              ByteBeam provides free AI-powered document tools for contract analysis, invoice parsing, 
              bank statement extraction, resume parsing, legal document summarization, and PDF processing. 
              Our tools are used by legal teams, finance departments, HR professionals, and operations teams 
              to automate document workflows. All tools work in your browser with enterprise-grade security. 
              No signup required for basic use.
            </p>
          </motion.section>
        </div>
      </main>

      <Footer />
    </>
  );
}
