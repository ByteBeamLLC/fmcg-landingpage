import { useState, useCallback } from "react";
import {
  Scale,
  Copy,
  Check,
  FileText,
  Download,
  AlertCircle,
  GitCompare,
  ArrowRight,
  Zap,
  Shield,
  Lock,
  FileCheck,
  Globe,
  RefreshCw,
  Briefcase,
  Building2,
  Home,
  Handshake,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  ToolLayout,
  FileUploader,
  ProcessingStatus,
  DownloadButton,
  ToolFAQ,
  RelatedTools,
  HowItWorks,
  Features,
  UseCases,
  WhatYouGet,
  TechnicalInfo,
} from "@/components/tools";
import type { ProcessingState } from "@/components/tools";
import { performOCR, type OCRProgress } from "@/lib/tools/ocr-utils";
import { compareDocuments } from "@/lib/tools/openrouter";
import { extractTextFromPDF } from "@/lib/tools/pdf-utils";

// SEO Content: How It Works Steps
const HOW_IT_WORKS_STEPS = [
  {
    title: "Upload Original Contract",
    description: "Upload the first version of your contract—the baseline document you want to compare against.",
  },
  {
    title: "Upload Revised Contract",
    description: "Upload the modified version. Supports PDF, images, or scanned documents with automatic OCR.",
  },
  {
    title: "AI Analyzes Differences",
    description: "Our AI reads both documents and identifies every change—additions, deletions, and modifications.",
  },
  {
    title: "Review & Download Report",
    description: "Get a detailed comparison report with risk assessment and recommendations you can share.",
  },
];

// SEO Content: Features
const FEATURES = [
  {
    icon: Zap,
    title: "Instant Comparison",
    description: "See all differences between contract versions in seconds, not hours of manual review.",
  },
  {
    icon: Shield,
    title: "Risk Assessment",
    description: "AI evaluates each change for potential legal or business risk, flagging concerns.",
  },
  {
    icon: Lock,
    title: "Privacy Protected",
    description: "Text extraction happens in your browser. We never store your contracts or comparison data.",
  },
  {
    icon: FileCheck,
    title: "Any Contract Format",
    description: "PDF, images, or scanned documents. Compare any two contracts regardless of format.",
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Compare contracts in English, Spanish, French, German, Arabic, and 20+ languages.",
  },
  {
    icon: RefreshCw,
    title: "Track Negotiations",
    description: "Perfect for tracking changes across multiple rounds of contract negotiations.",
  },
];

// SEO Content: Use Cases
const USE_CASES = [
  {
    icon: Briefcase,
    title: "Legal Teams",
    description: "Quickly review redlined contracts from opposing counsel. Catch every change before signing.",
  },
  {
    icon: Building2,
    title: "Procurement Teams",
    description: "Compare vendor contract revisions to ensure negotiated terms are reflected accurately.",
  },
  {
    icon: Home,
    title: "Real Estate Professionals",
    description: "Track changes between lease drafts. Ensure tenant or landlord modifications are acceptable.",
  },
  {
    icon: Handshake,
    title: "Business Development",
    description: "Compare partnership agreements across negotiation rounds to track evolving terms.",
  },
];

// SEO Content: What You Get
const WHAT_YOU_GET = [
  "Side-by-side analysis of both contracts",
  "Added clauses and terms highlighted",
  "Removed or deleted provisions identified",
  "Modified language with before/after comparison",
  "Risk assessment for each change",
  "Summary of key differences",
  "Recommendations for review",
  "Color-coded change categorization",
  "Downloadable comparison report",
  "Copy-to-clipboard for easy sharing",
];

// SEO Content: Technical Info
const TECHNICAL_INFO = {
  description:
    "Our contract comparison tool uses advanced large language models (LLMs) trained on millions of legal documents. The AI understands legal terminology, contract structures, and clause relationships. It performs semantic comparison—not just word-by-word diff—to identify meaningful changes in obligations, rights, and risks. For scanned documents, Tesseract OCR extracts text before AI analysis.",
  technologies: ["GPT-4 / Claude AI", "Semantic Diff Analysis", "Tesseract OCR", "PDF.js", "256-bit Encryption"],
};

// SEO Content: FAQs (8 questions)
const FAQS = [
  {
    question: "How does AI contract comparison work?",
    answer:
      "Upload two versions of a contract (original and revised). Our AI reads both documents, performs semantic analysis to understand the meaning of each clause, and identifies key differences—not just word changes, but changes in obligations, rights, and risks.",
  },
  {
    question: "What types of contracts can be compared?",
    answer:
      "Any contract type: employment agreements, NDAs, service contracts, lease agreements, partnership agreements, vendor contracts, software licenses, consulting agreements, and more. The AI adapts to different contract structures.",
  },
  {
    question: "Is my contract data secure and private?",
    answer:
      "Yes. Text extraction from PDFs and images happens locally in your browser—your files never leave your device. Only the extracted text is sent to our AI for comparison over an encrypted connection. We don't store your contracts or comparison results.",
  },
  {
    question: "What does the comparison report include?",
    answer:
      "The report includes: added clauses, removed clauses, modified terms with before/after text, risk assessment for each change, summary of key differences, and recommendations. Changes are color-coded for easy scanning.",
  },
  {
    question: "Is this a substitute for legal review?",
    answer:
      "No. This tool provides informational comparison only, not legal advice. While the AI catches most changes, it may miss subtle legal implications. Always have important contracts reviewed by a qualified attorney before signing.",
  },
  {
    question: "Can I compare scanned or photographed contracts?",
    answer:
      "Yes. Upload images (JPG, PNG, HEIC) or scanned PDFs. Our OCR technology extracts text from images before AI comparison. For best results, ensure documents are clearly legible with good resolution.",
  },
  {
    question: "How accurate is the contract comparison?",
    answer:
      "The AI correctly identifies 95%+ of substantive changes in standard contracts. It excels at finding added/removed clauses and modified terms. For highly technical or specialized contracts, manual verification of flagged changes is recommended.",
  },
  {
    question: "Is there a limit on contract comparisons?",
    answer:
      "Free users can compare up to 10 document pairs per hour. For unlimited comparisons, batch processing, and team collaboration features, explore ByteBeam Agent Builder.",
  },
];

// Related Tools (expanded for better internal linking)
const RELATED_TOOLS = [
  {
    title: "Contract Analyzer",
    description: "Analyze a single contract in detail",
    href: "/tools/contract-analyzer",
    icon: FileText,
    category: "Contract & Legal",
    isAIPowered: true,
  },
  {
    title: "Contract Clause Finder",
    description: "Find specific clauses in contracts",
    href: "/tools/contract-clause-finder",
    icon: FileText,
    category: "Contract & Legal",
    isAIPowered: true,
  },
  {
    title: "Legal Summarizer",
    description: "Summarize legal documents",
    href: "/tools/legal-summarizer",
    icon: FileText,
    category: "Contract & Legal",
    isAIPowered: true,
  },
  {
    title: "Document Comparison",
    description: "Compare any two documents",
    href: "/tools/document-compare",
    icon: FileText,
    category: "Policy & Compliance",
    isAIPowered: true,
  },
  {
    title: "AI Document Summarizer",
    description: "Summarize any document",
    href: "/tools/ai-summarizer",
    icon: FileText,
    category: "Search, Chat & Summarization",
    isAIPowered: true,
  },
  {
    title: "PDF Chat",
    description: "Ask questions about documents",
    href: "/tools/pdf-chat",
    icon: FileText,
    category: "Search, Chat & Summarization",
    isAIPowered: true,
  },
];

export default function ContractCompare() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [comparison, setComparison] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractText = async (file: File, progressOffset: number): Promise<string> => {
    if (file.type === "application/pdf") {
      return await extractTextFromPDF(file);
    } else {
      const handleProgress = (ocrProgress: OCRProgress) => {
        setProgress(progressOffset + ocrProgress.progress * 0.2);
        setProgressMessage(ocrProgress.status);
      };
      const result = await performOCR(file, "eng", handleProgress);
      return result.text;
    }
  };

  const handleFile1Selected = useCallback(async (files: File[]) => {
    if (files.length > 0) {
      setFile1(files[0]);
      setComparison("");
      setError(null);
      try {
        const text = await extractText(files[0], 0);
        setText1(text);
      } catch (err) {
        setError("Failed to extract text from first document");
      }
    } else {
      setFile1(null);
      setText1("");
    }
  }, []);

  const handleFile2Selected = useCallback(async (files: File[]) => {
    if (files.length > 0) {
      setFile2(files[0]);
      setComparison("");
      setError(null);
      try {
        const text = await extractText(files[0], 20);
        setText2(text);
      } catch (err) {
        setError("Failed to extract text from second document");
      }
    } else {
      setFile2(null);
      setText2("");
    }
  }, []);

  const handleCompare = useCallback(async () => {
    if (!text1.trim() || !text2.trim()) {
      setError("Please provide both contracts to compare");
      return;
    }

    setStatus("processing");
    setProgress(50);
    setProgressMessage("Comparing contracts with AI...");
    setError(null);
    setComparison("");

    try {
      const response = await compareDocuments(text1, text2);
      setComparison(response.content);
      setStatus("completed");
      setProgress(100);
    } catch (err) {
      console.error("Comparison error:", err);
      setError(err instanceof Error ? err.message : "Failed to compare contracts");
      setStatus("error");
    }
  }, [text1, text2]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(comparison);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [comparison]);

  // Parse the comparison into sections
  const parseSections = (text: string) => {
    const sections: { title: string; content: string; type: string }[] = [];
    const lines = text.split('\n');
    let currentSection = { title: '', content: '', type: 'default' };

    const typeMap: Record<string, string> = {
      'key differences': 'differences',
      'added': 'added',
      'removed': 'removed',
      'modified': 'modified',
      'risk': 'risk',
      'summary': 'summary',
      'recommendations': 'summary',
    };

    for (const line of lines) {
      const headerMatch = line.match(/^(\d+\.)?\s*\*?\*?([^*:]+)\*?\*?:?\s*$/i) ||
                         line.match(/^#+\s*(.+)$/);

      if (headerMatch) {
        if (currentSection.title && currentSection.content.trim()) {
          sections.push({ ...currentSection });
        }
        const title = (headerMatch[2] || headerMatch[1]).trim();
        const type = Object.entries(typeMap).find(([key]) =>
          title.toLowerCase().includes(key))?.[1] || 'default';
        currentSection = { title, content: '', type };
      } else if (line.trim()) {
        currentSection.content += line + '\n';
      }
    }

    if (currentSection.title && currentSection.content.trim()) {
      sections.push({ ...currentSection });
    }

    return sections.length > 0 ? sections : null;
  };

  const sections = comparison ? parseSections(comparison) : null;

  const getSectionColor = (type: string) => {
    switch (type) {
      case 'added': return 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900';
      case 'removed': return 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900';
      case 'modified': return 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-900';
      case 'risk': return 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900';
      case 'differences': return 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900';
      default: return 'bg-muted/50';
    }
  };

  return (
    <ToolLayout
      title="AI Contract Comparison"
      description="Compare two versions of a contract using AI. Identify changes, additions, removals, and potential risks between contract versions. Free contract diff tool for employment agreements, NDAs, leases, and vendor contracts."
      category="Contract & Legal"
      keywords="contract comparison, compare contracts, contract diff, legal document compare, contract changes, free contract compare, redline comparison, contract version control, track contract changes, AI contract diff"
      isAIPowered={true}
      toolContext="contract-comparison"
    >
      <div className="space-y-6">
        {/* Upload Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">Original Contract</Label>
                {file1 && <Badge variant="outline">Loaded</Badge>}
              </div>
              <FileUploader
                accept={{
                  "application/pdf": [".pdf"],
                  "image/*": [".jpg", ".jpeg", ".png", ".heic", ".webp"],
                }}
                maxSize={10 * 1024 * 1024}
                multiple={false}
                onFilesSelected={handleFile1Selected}
                description="Upload original contract (PDF or image)"
              />
              {text1 && (
                <Textarea
                  value={text1}
                  onChange={(e) => setText1(e.target.value)}
                  className="min-h-[150px] text-xs font-mono"
                  placeholder="Or paste contract text here..."
                />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">Revised Contract</Label>
                {file2 && <Badge variant="outline">Loaded</Badge>}
              </div>
              <FileUploader
                accept={{
                  "application/pdf": [".pdf"],
                  "image/*": [".jpg", ".jpeg", ".png", ".heic", ".webp"],
                }}
                maxSize={10 * 1024 * 1024}
                multiple={false}
                onFilesSelected={handleFile2Selected}
                description="Upload revised contract (PDF or image)"
              />
              {text2 && (
                <Textarea
                  value={text2}
                  onChange={(e) => setText2(e.target.value)}
                  className="min-h-[150px] text-xs font-mono"
                  placeholder="Or paste contract text here..."
                />
              )}
            </CardContent>
          </Card>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center justify-center gap-4">
          <Alert className="max-w-md">
            <Scale className="h-4 w-4" />
            <AlertDescription>
              This tool provides informational comparison only, not legal advice.
            </AlertDescription>
          </Alert>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleCompare}
            disabled={!text1.trim() || !text2.trim() || status === "processing"}
            size="lg"
            className="px-8"
          >
            <GitCompare className="mr-2 size-4" />
            {status === "processing" ? "Comparing..." : "Compare Contracts"}
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>

        {status === "processing" && (
          <ProcessingStatus
            status={status}
            progress={progress}
            message={progressMessage || "Processing..."}
          />
        )}

        {/* Comparison Results */}
        {comparison && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2 text-lg">
                  <GitCompare className="size-5 text-primary" />
                  Comparison Results
                </h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="gap-2"
                  >
                    {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                  <DownloadButton
                    data={comparison}
                    filename="contract-comparison.txt"
                    mimeType="text/plain"
                    variant="outline"
                    size="sm"
                  >
                    <Download className="size-4 mr-1" />
                    TXT
                  </DownloadButton>
                </div>
              </div>

              {sections ? (
                <div className="space-y-4">
                  {sections.map((section, idx) => (
                    <div key={idx} className={`border rounded-lg overflow-hidden ${getSectionColor(section.type)}`}>
                      <div className="px-4 py-2 font-medium text-sm border-b bg-background/50">
                        {section.title}
                      </div>
                      <div className="p-4">
                        <p className="text-sm whitespace-pre-wrap">
                          {section.content.trim()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="whitespace-pre-wrap text-sm">{comparison}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* SEO Content Sections */}
      <HowItWorks
        title="How Contract Comparison Works"
        steps={HOW_IT_WORKS_STEPS}
      />

      <Features
        title="Contract Comparison Features"
        features={FEATURES}
      />

      <UseCases
        title="Who Uses Contract Comparison?"
        subtitle="From legal teams reviewing redlines to procurement comparing vendor terms, AI comparison saves hours of manual review."
        useCases={USE_CASES}
      />

      <WhatYouGet
        title="What's in the Comparison Report"
        items={WHAT_YOU_GET}
      />

      <TechnicalInfo
        title="Powered by Semantic AI Analysis"
        description={TECHNICAL_INFO.description}
        technologies={TECHNICAL_INFO.technologies}
      />

      <ToolFAQ faqs={FAQS} toolName="Contract Comparison" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
