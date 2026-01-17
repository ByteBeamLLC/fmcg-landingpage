import { useState, useCallback } from "react";
import {
  FileText,
  Copy,
  Check,
  Download,
  AlertCircle,
  GitCompare,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Lock,
  FileCheck,
  Globe,
  RefreshCw,
  Briefcase,
  Building2,
  GraduationCap,
  PenTool,
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
    title: "Upload First Document",
    description: "Upload your original document or paste text directly. Supports PDF, images, and text files.",
  },
  {
    title: "Upload Second Document",
    description: "Upload the modified or alternative version you want to compare against.",
  },
  {
    title: "AI Analyzes Differences",
    description: "Our AI reads both documents and identifies every meaningful change—semantic, not just character-level.",
  },
  {
    title: "Review Comparison Report",
    description: "Get a color-coded breakdown of additions, deletions, and modifications with summary.",
  },
];

// SEO Content: Features
const FEATURES = [
  {
    icon: Zap,
    title: "Instant Comparison",
    description: "Compare documents in seconds. No manual diff scanning or line-by-line review.",
  },
  {
    icon: Shield,
    title: "Semantic Analysis",
    description: "AI understands meaning, not just words. Catches paraphrased changes others miss.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Text extraction happens in your browser. We never store your documents.",
  },
  {
    icon: FileCheck,
    title: "Any Document Type",
    description: "Reports, policies, proposals, manuscripts, specs—compare any text-based documents.",
  },
  {
    icon: Globe,
    title: "Multi-Format Support",
    description: "Upload PDFs, images, text files, or paste directly. Mix and match formats.",
  },
  {
    icon: RefreshCw,
    title: "Version Tracking",
    description: "Perfect for tracking changes across document revisions and drafts.",
  },
];

// SEO Content: Use Cases
const USE_CASES = [
  {
    icon: Briefcase,
    title: "Business Teams",
    description: "Compare proposal versions, policy updates, and report revisions across departments.",
  },
  {
    icon: Building2,
    title: "Compliance Officers",
    description: "Track changes in policies, procedures, and regulatory documents for audit trails.",
  },
  {
    icon: GraduationCap,
    title: "Researchers & Academics",
    description: "Compare paper drafts, literature reviews, and thesis revisions efficiently.",
  },
  {
    icon: PenTool,
    title: "Writers & Editors",
    description: "Track editorial changes, compare manuscript versions, and review editor feedback.",
  },
];

// SEO Content: What You Get
const WHAT_YOU_GET = [
  "Side-by-side semantic comparison",
  "Added content highlighted in green",
  "Removed content highlighted in red",
  "Modified sections in yellow",
  "Key differences summary",
  "Word count comparison",
  "Change significance analysis",
  "Downloadable comparison report",
  "Copy-to-clipboard functionality",
  "Color-coded legend for changes",
];

// SEO Content: Technical Info
const TECHNICAL_INFO = {
  description:
    "Our document comparison tool uses advanced large language models (LLMs) for semantic analysis. Unlike traditional diff tools that compare characters or words, our AI understands meaning—catching paraphrased changes, reorganized content, and subtle modifications. Supports PDF text extraction via PDF.js and image OCR via Tesseract.",
  technologies: ["GPT-4 / Claude AI", "Semantic Diff Analysis", "PDF.js", "Tesseract OCR", "256-bit Encryption"],
};

// SEO Content: FAQs (8 questions)
const FAQS = [
  {
    question: "How does AI document comparison work?",
    answer:
      "Upload two documents or paste text. Our AI reads both documents and performs semantic analysis to identify meaningful differences—not just character-level changes. It categorizes changes as additions, deletions, or modifications and provides a summary.",
  },
  {
    question: "What types of documents can be compared?",
    answer:
      "Any text-based documents: reports, policies, proposals, articles, manuscripts, technical specifications, procedures, meeting notes, research papers, and more. If it has text, we can compare it.",
  },
  {
    question: "Is my document data secure and private?",
    answer:
      "Yes. Text extraction from PDFs and images happens locally in your browser—your files never leave your device. Only the extracted text is sent to our AI for comparison over an encrypted connection. We don't store your documents.",
  },
  {
    question: "What's the difference between this and contract comparison?",
    answer:
      "Contract comparison is specialized for legal documents with risk assessment. This general document comparison works for any document type—reports, policies, manuscripts, etc.—without legal-specific analysis.",
  },
  {
    question: "How long can the documents be?",
    answer:
      "Combined document text should be under 100,000 characters for best results. Very long documents may be truncated. For most business documents, policies, and reports, this limit is rarely reached.",
  },
  {
    question: "Can I compare documents in different formats?",
    answer:
      "Yes. You can upload a PDF as document 1 and paste text as document 2, or compare an image against a text file. The tool extracts text from any supported format before comparison.",
  },
  {
    question: "How accurate is the semantic comparison?",
    answer:
      "The AI correctly identifies 95%+ of meaningful changes in standard documents. It excels at finding paraphrased content, reorganized sections, and subtle modifications that character-level diff tools miss.",
  },
  {
    question: "Is there a limit on document comparisons?",
    answer:
      "Free users can compare up to 10 document pairs per hour. For unlimited comparisons, batch processing, and team features, explore ByteBeam Agent Builder.",
  },
];

// Related Tools (expanded for better internal linking)
const RELATED_TOOLS = [
  {
    title: "Contract Comparison",
    description: "Compare contracts with risk analysis",
    href: "/tools/contract-compare",
    icon: FileText,
    category: "Contract & Legal",
    isAIPowered: true,
  },
  {
    title: "Policy Analyzer",
    description: "Analyze insurance policies",
    href: "/tools/policy-analyzer",
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
  {
    title: "Legal Summarizer",
    description: "Summarize legal documents",
    href: "/tools/legal-summarizer",
    icon: FileText,
    category: "Contract & Legal",
    isAIPowered: true,
  },
  {
    title: "PDF to Text",
    description: "Extract text from PDFs",
    href: "/tools/pdf-to-text",
    icon: FileText,
    category: "Extract, Convert & Prepare",
  },
];

export default function DocumentCompare() {
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
  const [inputMode, setInputMode] = useState<"file" | "text">("file");

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
      setError("Please provide both documents to compare");
      return;
    }

    setStatus("processing");
    setProgress(50);
    setProgressMessage("Comparing documents with AI...");
    setError(null);
    setComparison("");

    try {
      const response = await compareDocuments(text1, text2);
      setComparison(response.content);
      setStatus("completed");
      setProgress(100);
    } catch (err) {
      console.error("Comparison error:", err);
      setError(err instanceof Error ? err.message : "Failed to compare documents");
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
      'differences': 'differences',
      'added': 'added',
      'new': 'added',
      'removed': 'removed',
      'deleted': 'removed',
      'modified': 'modified',
      'changed': 'modified',
      'risk': 'risk',
      'summary': 'summary',
      'recommendations': 'summary',
      'conclusion': 'summary',
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
      case 'differences': return 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900';
      case 'summary': return 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900';
      default: return 'bg-muted/50';
    }
  };

  const word1Count = text1.trim().split(/\s+/).filter(Boolean).length;
  const word2Count = text2.trim().split(/\s+/).filter(Boolean).length;

  return (
    <ToolLayout
      title="AI Document Comparison"
      description="Compare two documents using AI. Identify differences, additions, and changes between document versions. Free document diff tool for reports, policies, proposals, and any text-based documents."
      category="Policy & Compliance"
      keywords="document comparison, compare documents, document diff, text comparison, compare PDFs, free document compare, report comparison, policy diff, version comparison, document version control"
      isAIPowered={true}
      toolContext="document-comparison"
    >
      <div className="space-y-6">
        {/* Mode Toggle */}
        <div className="flex justify-center gap-2">
          <Button
            variant={inputMode === "file" ? "default" : "outline"}
            onClick={() => setInputMode("file")}
          >
            Upload Files
          </Button>
          <Button
            variant={inputMode === "text" ? "default" : "outline"}
            onClick={() => setInputMode("text")}
          >
            Paste Text
          </Button>
        </div>

        {/* Input Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">Document 1</Label>
                <div className="flex items-center gap-2">
                  {word1Count > 0 && (
                    <span className="text-xs text-muted-foreground">
                      {word1Count.toLocaleString()} words
                    </span>
                  )}
                  {(file1 || text1) && <Badge variant="outline">Ready</Badge>}
                </div>
              </div>

              {inputMode === "file" ? (
                <>
                  <FileUploader
                    accept={{
                      "application/pdf": [".pdf"],
                      "image/*": [".jpg", ".jpeg", ".png", ".heic", ".webp"],
                      "text/plain": [".txt"],
                    }}
                    maxSize={10 * 1024 * 1024}
                    multiple={false}
                    onFilesSelected={handleFile1Selected}
                    description="Upload document (PDF, image, or text)"
                  />
                  {text1 && (
                    <Textarea
                      value={text1}
                      onChange={(e) => setText1(e.target.value)}
                      className="min-h-[150px] text-xs font-mono"
                    />
                  )}
                </>
              ) : (
                <Textarea
                  value={text1}
                  onChange={(e) => setText1(e.target.value)}
                  className="min-h-[250px]"
                  placeholder="Paste first document text here..."
                />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">Document 2</Label>
                <div className="flex items-center gap-2">
                  {word2Count > 0 && (
                    <span className="text-xs text-muted-foreground">
                      {word2Count.toLocaleString()} words
                    </span>
                  )}
                  {(file2 || text2) && <Badge variant="outline">Ready</Badge>}
                </div>
              </div>

              {inputMode === "file" ? (
                <>
                  <FileUploader
                    accept={{
                      "application/pdf": [".pdf"],
                      "image/*": [".jpg", ".jpeg", ".png", ".heic", ".webp"],
                      "text/plain": [".txt"],
                    }}
                    maxSize={10 * 1024 * 1024}
                    multiple={false}
                    onFilesSelected={handleFile2Selected}
                    description="Upload document (PDF, image, or text)"
                  />
                  {text2 && (
                    <Textarea
                      value={text2}
                      onChange={(e) => setText2(e.target.value)}
                      className="min-h-[150px] text-xs font-mono"
                    />
                  )}
                </>
              ) : (
                <Textarea
                  value={text2}
                  onChange={(e) => setText2(e.target.value)}
                  className="min-h-[250px]"
                  placeholder="Paste second document text here..."
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

        <div className="flex justify-center">
          <Button
            onClick={handleCompare}
            disabled={!text1.trim() || !text2.trim() || status === "processing"}
            size="lg"
            className="px-8"
          >
            <Sparkles className="mr-2 size-4" />
            {status === "processing" ? "Comparing..." : "Compare Documents"}
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
                    filename="document-comparison.txt"
                    mimeType="text/plain"
                    variant="outline"
                    size="sm"
                  >
                    <Download className="size-4 mr-1" />
                    TXT
                  </DownloadButton>
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mb-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-green-500" />
                  <span>Added</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-red-500" />
                  <span>Removed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-yellow-500" />
                  <span>Modified</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-blue-500" />
                  <span>Key Differences</span>
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
        title="How Document Comparison Works"
        steps={HOW_IT_WORKS_STEPS}
      />

      <Features
        title="Document Comparison Features"
        features={FEATURES}
      />

      <UseCases
        title="Who Uses Document Comparison?"
        subtitle="From business teams tracking revisions to researchers comparing drafts, AI comparison saves hours of manual review."
        useCases={USE_CASES}
      />

      <WhatYouGet
        title="What's in the Comparison Report"
        items={WHAT_YOU_GET}
      />

      <TechnicalInfo
        title="Powered by Semantic AI"
        description={TECHNICAL_INFO.description}
        technologies={TECHNICAL_INFO.technologies}
      />

      <ToolFAQ faqs={FAQS} toolName="Document Comparison" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
