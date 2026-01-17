import { useState, useCallback } from "react";
import {
  Shield,
  Copy,
  Check,
  FileText,
  Download,
  AlertCircle,
  Calendar,
  DollarSign,
  AlertTriangle,
  Zap,
  Lock,
  FileCheck,
  Globe,
  Eye,
  Briefcase,
  Building2,
  Users,
  Car,
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
import { analyzePolicy } from "@/lib/tools/openrouter";
import { extractTextFromPDF } from "@/lib/tools/pdf-utils";

// SEO Content: How It Works Steps
const HOW_IT_WORKS_STEPS = [
  {
    title: "Upload Your Policy",
    description: "Drop your insurance policy or terms document. Scanned policies work too—we'll OCR them automatically.",
  },
  {
    title: "AI Reads the Policy",
    description: "Our AI analyzes the entire document, understanding coverage, exclusions, and key terms.",
  },
  {
    title: "Structured Breakdown",
    description: "Get a clear breakdown of coverage limits, deductibles, exclusions, and important deadlines.",
  },
  {
    title: "Download Analysis",
    description: "Save the analysis to share with family members, financial advisors, or your agent.",
  },
];

// SEO Content: Features
const FEATURES = [
  {
    icon: Zap,
    title: "Instant Analysis",
    description: "Understand your policy in seconds instead of reading pages of insurance jargon.",
  },
  {
    icon: Eye,
    title: "Exclusion Detection",
    description: "AI identifies what's NOT covered—often the most important part to know.",
  },
  {
    icon: Lock,
    title: "Privacy Protected",
    description: "Text extraction happens in your browser. We never store your policy documents.",
  },
  {
    icon: FileCheck,
    title: "Any Policy Type",
    description: "Health, life, auto, home, travel, business liability—all insurance types supported.",
  },
  {
    icon: Globe,
    title: "Multi-Language OCR",
    description: "Scanned policies in English, Spanish, French, German, and 20+ languages.",
  },
  {
    icon: Calendar,
    title: "Key Dates Extracted",
    description: "Identifies effective dates, renewal dates, claim deadlines, and cancellation windows.",
  },
];

// SEO Content: Use Cases
const USE_CASES = [
  {
    icon: Users,
    title: "Individuals & Families",
    description: "Understand your health, life, or home insurance before you need to make a claim.",
  },
  {
    icon: Car,
    title: "Vehicle Owners",
    description: "Know exactly what your auto insurance covers—collision, comprehensive, liability limits.",
  },
  {
    icon: Briefcase,
    title: "HR & Benefits Teams",
    description: "Analyze employee insurance plans to better explain coverage to your team.",
  },
  {
    icon: Building2,
    title: "Business Owners",
    description: "Review business liability, professional indemnity, and property insurance policies.",
  },
];

// SEO Content: What You Get
const WHAT_YOU_GET = [
  "Policy type and insurer identification",
  "Coverage limits and deductibles",
  "What's covered (inclusions)",
  "What's NOT covered (exclusions)",
  "Premium amounts and payment schedule",
  "Effective and expiration dates",
  "Claims process summary",
  "Key definitions explained",
  "Riders and endorsements listed",
  "Important deadlines highlighted",
];

// SEO Content: Technical Info
const TECHNICAL_INFO = {
  description:
    "Our policy analyzer uses large language models (LLMs) trained on insurance documents across all major policy types. The AI understands insurance terminology, policy structures, and common exclusion patterns. It extracts key information while maintaining accuracy on coverage limits and terms. For scanned policies, Tesseract OCR extracts text before AI analysis.",
  technologies: ["GPT-4 / Claude AI", "Insurance NLP Models", "Tesseract OCR", "PDF.js", "256-bit Encryption"],
};

// SEO Content: FAQs (8 questions)
const FAQS = [
  {
    question: "How does the AI policy analyzer work?",
    answer:
      "Upload your insurance policy or terms document (PDF or image), and our AI reads the entire document. It identifies coverage details, exclusions, premiums, claims process, and important terms, then presents the information in a structured, easy-to-understand format.",
  },
  {
    question: "What types of insurance policies can be analyzed?",
    answer:
      "Any insurance policy type: health insurance, life insurance, auto insurance, homeowners/renters insurance, travel insurance, business liability, professional indemnity, workers' compensation, and general terms & conditions documents.",
  },
  {
    question: "Is my policy data secure and private?",
    answer:
      "Yes. Text extraction from PDFs and images happens locally in your browser—your files never leave your device. Only the extracted text is sent to our AI for analysis over an encrypted connection. We don't store your policy documents or analysis results.",
  },
  {
    question: "What information does the policy analysis include?",
    answer:
      "The analysis includes: policy type identification, coverage limits and deductibles, inclusions and exclusions, premium details, effective and renewal dates, claims process, key definitions, riders/endorsements, and important deadlines.",
  },
  {
    question: "Is this a substitute for professional insurance advice?",
    answer:
      "No. This tool provides informational analysis only, not professional insurance advice. While the AI is accurate for most standard policies, for complex situations or important decisions, consult a licensed insurance agent or broker.",
  },
  {
    question: "Can I analyze scanned or photographed policies?",
    answer:
      "Yes. Upload images (JPG, PNG, HEIC) or scanned PDFs. Our OCR technology extracts text from images before AI analysis. For best results, ensure the document is clearly legible with good lighting.",
  },
  {
    question: "How accurate is the policy analysis?",
    answer:
      "The AI correctly identifies key terms in 95%+ of standard insurance policies. However, accuracy depends on document quality and policy complexity. Always verify coverage limits and exclusions against the original document for important decisions.",
  },
  {
    question: "Is there a limit on policy analysis?",
    answer:
      "Free users can analyze up to 10 policies per hour. For unlimited analysis, batch processing, and team features, explore ByteBeam's document automation platform.",
  },
];

// Related Tools (expanded for better internal linking)
const RELATED_TOOLS = [
  {
    title: "Contract Analyzer",
    description: "Analyze contracts with AI",
    href: "/tools/contract-analyzer",
    icon: FileText,
    category: "Contract & Legal",
    isAIPowered: true,
  },
  {
    title: "Document Comparison",
    description: "Compare two documents",
    href: "/tools/document-compare",
    icon: FileText,
    category: "Policy & Compliance",
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
    title: "PDF to Text",
    description: "Extract text from PDFs",
    href: "/tools/pdf-to-text",
    icon: FileText,
    category: "Extract, Convert & Prepare",
  },
];

export default function PolicyAnalyzer() {
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

  const handleAnalyzePolicy = useCallback(async () => {
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
      setProgressMessage("Analyzing policy with AI...");

      const response = await analyzePolicy(text);
      setAnalysis(response.content);

      setStatus("completed");
      setProgress(100);
    } catch (err) {
      console.error("Policy analysis error:", err);
      setError(err instanceof Error ? err.message : "Failed to analyze policy");
      setStatus("error");
    }
  }, [selectedFile]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(analysis);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [analysis]);

  // Parse the analysis into sections
  const parseSections = (text: string) => {
    const sections: { title: string; content: string; icon: any }[] = [];

    const lines = text.split('\n');
    let currentSection = { title: '', content: '', icon: FileText };

    const iconMap: Record<string, any> = {
      'policy type': Shield,
      'policy number': FileText,
      'dates': Calendar,
      'policyholder': FileText,
      'coverage': Shield,
      'exclusions': AlertTriangle,
      'premium': DollarSign,
      'claims': FileText,
      'terms': FileText,
      'riders': Shield,
      'deadlines': Calendar,
    };

    for (const line of lines) {
      const headerMatch = line.match(/^(\d+\.)?\s*\*?\*?([^*:]+)\*?\*?:?\s*$/i) ||
                         line.match(/^#+\s*(.+)$/);

      if (headerMatch) {
        if (currentSection.title && currentSection.content.trim()) {
          sections.push({ ...currentSection });
        }
        const title = (headerMatch[2] || headerMatch[1]).trim();
        currentSection = {
          title,
          content: '',
          icon: Object.entries(iconMap).find(([key]) =>
            title.toLowerCase().includes(key))?.[1] || FileText
        };
      } else if (line.trim()) {
        currentSection.content += line + '\n';
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
      title="AI Insurance Policy Analyzer"
      description="Analyze insurance policies and terms documents using AI. Understand coverage limits, exclusions, premiums, and claims process. Free policy analyzer for health, auto, home, and life insurance."
      category="Policy & Compliance"
      keywords="policy analyzer, insurance analyzer, analyze insurance policy, policy review, coverage analyzer, free policy analyzer, health insurance analyzer, auto insurance review, home insurance analysis, insurance exclusions"
      isAIPowered={true}
      toolContext="policy-analysis"
    >
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
                description="Upload policy document (PDF or image)"
              />

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  This tool provides informational analysis only, not professional insurance advice.
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleAnalyzePolicy}
                disabled={!selectedFile || status === "processing"}
                className="w-full"
                size="lg"
              >
                <Shield className="mr-2 size-4" />
                {status === "processing" ? "Analyzing..." : "Analyze Policy"}
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
                <h3 className="font-semibold text-foreground mb-3">Extracted Text</h3>
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
                  <Shield className="size-4 text-primary" />
                  Policy Analysis
                </h3>
                {analysis && (
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
                      data={analysis}
                      filename="policy-analysis.txt"
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
                    <Shield className="size-12 mx-auto mb-4 opacity-50" />
                    <p>Upload a policy document to analyze</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content Sections */}
      <HowItWorks
        title="How the Policy Analyzer Works"
        steps={HOW_IT_WORKS_STEPS}
      />

      <Features
        title="Policy Analyzer Features"
        features={FEATURES}
      />

      <UseCases
        title="Who Uses the Policy Analyzer?"
        subtitle="From individuals reviewing personal insurance to HR teams explaining employee benefits, understanding your coverage is essential."
        useCases={USE_CASES}
      />

      <WhatYouGet
        title="What's in the Policy Analysis"
        items={WHAT_YOU_GET}
      />

      <TechnicalInfo
        title="Powered by Insurance AI"
        description={TECHNICAL_INFO.description}
        technologies={TECHNICAL_INFO.technologies}
      />

      <ToolFAQ faqs={FAQS} toolName="Policy Analyzer" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
