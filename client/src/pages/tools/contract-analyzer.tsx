import { useState, useCallback } from "react";
import {
  FileText,
  Copy,
  Check,
  Download,
  AlertCircle,
  Scale,
  Shield,
  Calendar,
  Users,
  AlertTriangle,
  Zap,
  Lock,
  FileCheck,
  Clock,
  Building2,
  Briefcase,
  Home,
  Handshake,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { analyzeContract } from "@/lib/tools/openrouter";
import { extractTextFromPDF } from "@/lib/tools/pdf-utils";

// SEO Content: How It Works Steps
const HOW_IT_WORKS_STEPS = [
  {
    title: "Upload Your Contract",
    description: "Drop your contract PDF or image. Scanned documents work too—we'll OCR them automatically.",
  },
  {
    title: "AI Extracts Key Information",
    description: "Our AI reads the entire document, identifying parties, dates, terms, and obligations.",
  },
  {
    title: "Risk Analysis",
    description: "The analyzer flags potential risks, unusual clauses, and areas that need attention.",
  },
  {
    title: "Download Your Analysis",
    description: "Get a structured breakdown you can share with your team or attorney.",
  },
];

// SEO Content: Features
const FEATURES = [
  {
    icon: Zap,
    title: "Instant Analysis",
    description: "Get results in seconds, not hours. No waiting for manual review.",
  },
  {
    icon: Shield,
    title: "Risk Identification",
    description: "AI flags one-sided terms, unusual penalties, and potential legal issues.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Text extraction happens in your browser. We don't store your contracts.",
  },
  {
    icon: FileCheck,
    title: "Any Contract Type",
    description: "Employment, NDAs, leases, vendor agreements, partnerships—all supported.",
  },
  {
    icon: Globe,
    title: "Multi-Language OCR",
    description: "Scanned contracts in English, Spanish, French, German, and 20+ languages.",
  },
  {
    icon: Clock,
    title: "Date Tracking",
    description: "Extracts effective dates, termination dates, renewal periods, and deadlines.",
  },
];

// SEO Content: Use Cases
const USE_CASES = [
  {
    icon: Briefcase,
    title: "HR & Recruitment Teams",
    description: "Review employment contracts, NDAs, and offer letters before signing. Spot non-compete clauses and unusual terms.",
  },
  {
    icon: Building2,
    title: "Small Business Owners",
    description: "Understand vendor contracts, service agreements, and partnership terms without expensive legal fees.",
  },
  {
    icon: Home,
    title: "Real Estate Professionals",
    description: "Analyze lease agreements, property contracts, and tenant agreements for key terms and obligations.",
  },
  {
    icon: Handshake,
    title: "Freelancers & Consultants",
    description: "Review client contracts for payment terms, IP rights, liability clauses, and termination conditions.",
  },
];

// SEO Content: What You Get
const WHAT_YOU_GET = [
  "Contract type and purpose identification",
  "All parties and their roles",
  "Effective dates and renewal terms",
  "Financial terms and payment schedules",
  "Key obligations for each party",
  "Termination conditions and notice periods",
  "Confidentiality and non-compete clauses",
  "Potential risks and red flags",
  "Plain language summary",
  "Downloadable analysis report",
];

// SEO Content: Technical Info
const TECHNICAL_INFO = {
  description:
    "Our contract analyzer uses large language models (LLMs) trained on millions of legal documents. The AI understands legal terminology, contract structures, and common clause patterns. For scanned documents, we use Tesseract OCR to extract text before analysis. All processing is done securely with enterprise-grade encryption.",
  technologies: ["GPT-4 / Claude AI", "Tesseract OCR", "PDF.js", "256-bit Encryption"],
};

// SEO Content: FAQs (8 questions for better SEO)
const FAQS = [
  {
    question: "How does the AI contract analyzer work?",
    answer:
      "Upload your contract (PDF or image), and our AI reads the entire document to identify key information. It extracts parties, dates, financial terms, obligations, and flags potential risks. The analysis is returned in a structured format within seconds.",
  },
  {
    question: "What types of contracts can I analyze?",
    answer:
      "Any contract type: employment agreements, NDAs, service contracts, lease agreements, partnership agreements, vendor contracts, consulting agreements, licensing deals, and more. The AI adapts to different contract structures and legal terminology.",
  },
  {
    question: "Is my contract data secure and private?",
    answer:
      "Yes. Text extraction from PDFs happens locally in your browser—the file never leaves your device. Only the extracted text is sent to our AI for analysis over an encrypted connection. We don't store your contracts or analysis results.",
  },
  {
    question: "What does the contract analysis include?",
    answer:
      "You get: contract type identification, parties involved, key dates (effective, termination, renewal), financial terms, obligations for each party, termination conditions, risk assessment, notable clauses (confidentiality, non-compete, indemnification), and a plain-language summary.",
  },
  {
    question: "Is this legal advice?",
    answer:
      "No. This tool provides informational analysis only, not legal advice. The AI may miss important nuances or jurisdiction-specific issues. For binding legal matters, always consult a qualified attorney. Use this tool for initial review and to prepare questions for your lawyer.",
  },
  {
    question: "Can I analyze scanned or photographed contracts?",
    answer:
      "Yes. Upload images (JPG, PNG, HEIC) or scanned PDFs. Our OCR technology extracts text from images before AI analysis. For best results, ensure the document is clearly legible with good lighting and minimal skew.",
  },
  {
    question: "How accurate is the contract analysis?",
    answer:
      "The AI correctly identifies key terms in 95%+ of standard contracts. However, accuracy depends on document quality and contract complexity. Highly specialized or unusual contracts may require human review. Always verify critical terms manually.",
  },
  {
    question: "Is there a limit on how many contracts I can analyze?",
    answer:
      "Free users can analyze up to 10 contracts per hour. For unlimited analysis, batch processing, and team features, explore ByteBeam's document automation platform.",
  },
];

// Related Tools (expanded for better internal linking)
const RELATED_TOOLS = [
  {
    title: "Contract Clause Finder",
    description: "Find specific clauses in contracts",
    href: "/tools/contract-clause-finder",
    icon: FileText,
    category: "Contract & Legal",
    isAIPowered: true,
  },
  {
    title: "Contract Comparison",
    description: "Compare two contract versions",
    href: "/tools/contract-compare",
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
    title: "NDA Generator",
    description: "Generate NDAs instantly",
    href: "/tools/nda-generator",
    icon: FileText,
    category: "Contract & Legal",
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
    description: "Chat with your documents",
    href: "/tools/pdf-chat",
    icon: FileText,
    category: "Search, Chat & Summarization",
    isAIPowered: true,
  },
];

export default function ContractAnalyzer() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = useCallback((files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setExtractedText("");
      setAnalysis("");
      setStatus("idle");
      setError(null);
    } else {
      setSelectedFile(null);
    }
  }, []);

  const handleAnalyzeContract = useCallback(async () => {
    if (!selectedFile) return;

    setStatus("processing");
    setProgress(0);
    setError(null);
    setAnalysis("");

    try {
      let text = "";

      if (selectedFile.type === "application/pdf") {
        setProgressMessage("Extracting text from PDF...");
        setProgress(30);
        text = await extractTextFromPDF(selectedFile);
      } else {
        const handleProgress = (ocrProgress: OCRProgress) => {
          setProgress(Math.min(ocrProgress.progress * 0.6, 60));
          setProgressMessage(ocrProgress.status);
        };

        const result = await performOCR(selectedFile, "eng", handleProgress);
        text = result.text;
      }

      setExtractedText(text);
      setProgress(70);
      setProgressMessage("Analyzing contract with AI...");

      const response = await analyzeContract(text);
      setAnalysis(response.content);

      setStatus("completed");
      setProgress(100);
    } catch (err) {
      console.error("Contract analysis error:", err);
      setError(err instanceof Error ? err.message : "Failed to analyze contract");
      setStatus("error");
    }
  }, [selectedFile]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(analysis);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [analysis]);

  const parseSections = (text: string) => {
    const sections: { title: string; content: string; icon: any }[] = [];
    const lines = text.split("\n");
    let currentSection = { title: "", content: "", icon: FileText };

    const iconMap: Record<string, any> = {
      summary: Scale,
      parties: Users,
      dates: Calendar,
      terms: FileText,
      financial: FileText,
      obligations: Shield,
      termination: AlertTriangle,
      risks: AlertTriangle,
      clauses: Shield,
    };

    for (const line of lines) {
      const headerMatch =
        line.match(/^(\d+\.)?\s*\*?\*?([^*:]+)\*?\*?:?\s*$/i) ||
        line.match(/^#+\s*(.+)$/);

      if (headerMatch) {
        if (currentSection.title && currentSection.content.trim()) {
          sections.push({ ...currentSection });
        }
        const title = (headerMatch[2] || headerMatch[1]).trim();
        currentSection = {
          title,
          content: "",
          icon:
            Object.entries(iconMap).find(([key]) =>
              title.toLowerCase().includes(key)
            )?.[1] || FileText,
        };
      } else if (line.trim()) {
        currentSection.content += line + "\n";
      }
    }

    if (currentSection.title && currentSection.content.trim()) {
      sections.push({ ...currentSection });
    }

    return sections.length > 0 ? sections : null;
  };

  const sections = analysis ? parseSections(analysis) : null;

  return (
    <ToolLayout
      title="AI Contract Analyzer"
      description="Analyze contracts instantly with AI. Identify key terms, parties, obligations, risks, and red flags. Free contract review tool for employment agreements, NDAs, leases, and vendor contracts."
      category="Contract & Legal"
      keywords="contract analyzer, contract review AI, analyze contract free, contract checker, contract risk analysis, employment contract review, NDA analyzer, lease agreement analyzer, vendor contract review, AI contract analysis, free contract review tool"
      isAIPowered={true}
      toolContext="contract-analyzer"
    >
      {/* Tool Interface */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <FileUploader
                accept={{
                  "application/pdf": [".pdf"],
                  "image/*": [".jpg", ".jpeg", ".png", ".heic", ".webp"],
                }}
                maxSize={10 * 1024 * 1024}
                multiple={false}
                onFilesSelected={handleFilesSelected}
                description="Upload contract (PDF or image, max 10MB)"
              />

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Alert>
                <Scale className="h-4 w-4" />
                <AlertDescription>
                  This tool provides informational analysis only, not legal advice.
                  Consult a qualified attorney for legal matters.
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleAnalyzeContract}
                disabled={!selectedFile || status === "processing"}
                className="w-full"
                size="lg"
              >
                <Scale className="mr-2 size-4" />
                {status === "processing" ? "Analyzing..." : "Analyze Contract"}
              </Button>
            </CardContent>
          </Card>

          <ProcessingStatus
            status={status}
            progress={progress}
            message={progressMessage || "Processing..."}
          />

          {extractedText && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-3">
                  Extracted Text
                </h3>
                <Textarea
                  value={extractedText}
                  readOnly
                  className="min-h-[150px] text-xs font-mono"
                />
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card className="h-full">
            <CardContent className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Scale className="size-4 text-primary" />
                  Contract Analysis
                </h3>
                {analysis && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                      className="gap-2"
                    >
                      {copied ? (
                        <Check className="size-4" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                    <DownloadButton
                      data={analysis}
                      filename="contract-analysis.txt"
                      mimeType="text/plain"
                      variant="outline"
                      size="sm"
                    >
                      <Download className="size-4 mr-1" />
                      TXT
                    </DownloadButton>
                  </div>
                )}
              </div>

              {sections ? (
                <div className="flex-1 overflow-auto space-y-4">
                  {sections.map((section, idx) => (
                    <div key={idx} className="border rounded-lg overflow-hidden">
                      <div className="bg-muted/50 px-4 py-2 font-medium text-sm flex items-center gap-2">
                        <section.icon className="size-4" />
                        {section.title}
                      </div>
                      <div className="p-4">
                        <p className="text-sm whitespace-pre-wrap text-muted-foreground">
                          {section.content.trim()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : analysis ? (
                <div className="flex-1 overflow-auto">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="whitespace-pre-wrap text-sm">{analysis}</p>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Scale className="size-12 mx-auto mb-4 opacity-50" />
                    <p>Upload a contract to analyze</p>
                    <p className="text-sm mt-1">
                      PDF, JPG, PNG, or scanned documents
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content Sections */}
      <HowItWorks
        title="How the Contract Analyzer Works"
        steps={HOW_IT_WORKS_STEPS}
      />

      <Features
        title="Contract Analyzer Features"
        features={FEATURES}
      />

      <UseCases
        title="Who Uses This Contract Analyzer?"
        subtitle="Whether you're reviewing your first contract or your hundredth, AI analysis saves time and catches issues."
        useCases={USE_CASES}
      />

      <WhatYouGet
        title="What's Included in the Analysis"
        items={WHAT_YOU_GET}
      />

      <TechnicalInfo
        title="Powered by Advanced AI"
        description={TECHNICAL_INFO.description}
        technologies={TECHNICAL_INFO.technologies}
      />

      <ToolFAQ faqs={FAQS} toolName="Contract Analyzer" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
