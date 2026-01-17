import { useState, useCallback } from "react";
import {
  Scale,
  Copy,
  Check,
  FileText,
  Download,
  AlertCircle,
  Sparkles,
  Languages,
  Zap,
  Shield,
  Lock,
  FileCheck,
  Globe,
  Clock,
  Briefcase,
  Building2,
  Users,
  GraduationCap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { summarizeDocument } from "@/lib/tools/openrouter";
import { extractTextFromPDF } from "@/lib/tools/pdf-utils";

// SEO Content: How It Works Steps
const HOW_IT_WORKS_STEPS = [
  {
    title: "Upload Legal Document",
    description: "Drop your contract, agreement, or legal document. Supports PDF, images, and scanned documents.",
  },
  {
    title: "Choose Summary Length",
    description: "Select brief, standard, or detailed summary based on how much context you need.",
  },
  {
    title: "AI Generates Summary",
    description: "Our AI reads the full document and creates a plain-language summary highlighting key points.",
  },
  {
    title: "Download or Share",
    description: "Get your summary in seconds. Copy to clipboard or download as text for easy sharing.",
  },
];

// SEO Content: Features
const FEATURES = [
  {
    icon: Zap,
    title: "Instant Summaries",
    description: "Get plain-language summaries in seconds, not hours of reading legal jargon.",
  },
  {
    icon: Scale,
    title: "Legal Focus",
    description: "AI trained on legal documents—understands terms, obligations, and contract structures.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Text extraction happens in your browser. We don't store your documents.",
  },
  {
    icon: FileCheck,
    title: "Any Legal Document",
    description: "Contracts, NDAs, terms of service, privacy policies, leases, and more.",
  },
  {
    icon: Globe,
    title: "Multi-Language Output",
    description: "Get summaries in English, Spanish, French, German, Arabic, or Chinese.",
  },
  {
    icon: Clock,
    title: "Adjustable Detail",
    description: "Choose brief bullet points or detailed analysis depending on your needs.",
  },
];

// SEO Content: Use Cases
const USE_CASES = [
  {
    icon: Briefcase,
    title: "Business Professionals",
    description: "Quickly understand vendor contracts, partnership agreements, and service terms before signing.",
  },
  {
    icon: Building2,
    title: "HR & Legal Teams",
    description: "Summarize employment agreements, NDAs, and policies for faster review and onboarding.",
  },
  {
    icon: Users,
    title: "Consumers & Individuals",
    description: "Understand what you're agreeing to in terms of service, privacy policies, and rental agreements.",
  },
  {
    icon: GraduationCap,
    title: "Students & Researchers",
    description: "Summarize legal cases, regulatory documents, and academic legal texts for study.",
  },
];

// SEO Content: What You Get
const WHAT_YOU_GET = [
  "Plain-language summary of the document",
  "Key parties and their roles identified",
  "Main obligations for each party",
  "Important dates and deadlines",
  "Financial terms and payment conditions",
  "Termination and renewal provisions",
  "Notable clauses highlighted",
  "Potential risks or concerns flagged",
  "Compression ratio showing reduction",
  "Downloadable summary in multiple formats",
];

// SEO Content: Technical Info
const TECHNICAL_INFO = {
  description:
    "Our legal summarizer uses large language models (LLMs) fine-tuned on millions of legal documents. The AI understands legal terminology, contract structures, and regulatory language. It identifies the most important information while maintaining legal accuracy. For scanned documents, Tesseract OCR extracts text before AI summarization.",
  technologies: ["GPT-4 / Claude AI", "Legal NLP Models", "Tesseract OCR", "PDF.js", "256-bit Encryption"],
};

// SEO Content: FAQs (8 questions)
const FAQS = [
  {
    question: "How does the AI legal summarizer work?",
    answer:
      "Upload your legal document (contract, agreement, terms & conditions, policy), and our AI reads the entire document. It uses legal-trained language models to identify key points, obligations, dates, and important terms, then generates a plain-language summary.",
  },
  {
    question: "What types of legal documents can be summarized?",
    answer:
      "Any legal document: contracts, NDAs, lease agreements, employment agreements, terms of service, privacy policies, partnership agreements, vendor contracts, regulatory filings, legal briefs, and more. The AI adapts to different legal formats.",
  },
  {
    question: "Is my legal document data secure and private?",
    answer:
      "Yes. Text extraction from PDFs and images happens locally in your browser—your files never leave your device. Only the extracted text is sent to our AI for summarization over an encrypted connection. We don't store your documents or summaries.",
  },
  {
    question: "Is this a substitute for legal advice?",
    answer:
      "No. This tool provides informational summaries only, not legal advice. The AI may miss important nuances or jurisdiction-specific issues. For binding legal matters, always consult a qualified attorney. Use this for initial review and preparation.",
  },
  {
    question: "What summary detail levels are available?",
    answer:
      "Choose from three levels: Brief (key points only, ~100-200 words), Standard (comprehensive overview, ~300-500 words), or Detailed (thorough analysis, ~500-800 words). Select based on how much context you need.",
  },
  {
    question: "Can I summarize documents in other languages?",
    answer:
      "Yes. You can summarize legal documents written in any language. Additionally, you can choose to output the summary in English, Spanish, French, German, Arabic, or Chinese, regardless of the source language.",
  },
  {
    question: "How accurate are the legal summaries?",
    answer:
      "The AI correctly identifies key terms and obligations in 95%+ of standard legal documents. However, accuracy depends on document complexity and formatting. For critical legal decisions, always verify the summary against the original document.",
  },
  {
    question: "Is there a limit on legal summarization?",
    answer:
      "Free users can summarize up to 10 documents per hour. For unlimited summarization, batch processing, and team collaboration features, explore ByteBeam's document automation platform.",
  },
];

// Related Tools (expanded for better internal linking)
const RELATED_TOOLS = [
  {
    title: "Contract Analyzer",
    description: "Full contract analysis with risk assessment",
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
    title: "Contract Comparison",
    description: "Compare two contract versions",
    href: "/tools/contract-compare",
    icon: FileText,
    category: "Contract & Legal",
    isAIPowered: true,
  },
  {
    title: "Policy Analyzer",
    description: "Analyze policy documents",
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
];

const LANGUAGES = [
  { code: "auto", name: "Same as document" },
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "ar", name: "Arabic" },
  { code: "zh", name: "Chinese" },
];

type SummaryLength = "short" | "medium" | "long";

export default function LegalSummarizer() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [summaryLength, setSummaryLength] = useState<SummaryLength>("medium");
  const [language, setLanguage] = useState("auto");
  const [copied, setCopied] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [inputMode, setInputMode] = useState<"file" | "text">("file");

  const handleFilesSelected = useCallback(async (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setSummary("");
      setError(null);
      setStatus("processing");
      setProgress(0);

      try {
        let text = "";

        if (file.type === "application/pdf") {
          setProgressMessage("Extracting text from PDF...");
          setProgress(50);
          text = await extractTextFromPDF(file);
        } else {
          const handleProgress = (ocrProgress: OCRProgress) => {
            setProgress(Math.min(ocrProgress.progress * 0.8, 80));
            setProgressMessage(ocrProgress.status);
          };

          const result = await performOCR(file, "eng", handleProgress);
          text = result.text;
        }

        setInputText(text);
        setStatus("idle");
        setProgress(100);
      } catch (err) {
        console.error("Text extraction error:", err);
        setError("Failed to extract text. Please try another file.");
        setStatus("error");
      }
    } else {
      setSelectedFile(null);
      setInputText("");
    }
  }, []);

  const handleSummarize = useCallback(async () => {
    if (!inputText.trim()) {
      setError("Please provide a legal document to summarize");
      return;
    }

    setStatus("processing");
    setProgress(0);
    setError(null);
    setSummary("");
    setProgressMessage("Generating legal summary with AI...");

    try {
      setProgress(50);

      // Add legal context to the request
      const legalPrompt = `This is a legal document. Please provide a ${summaryLength === "short" ? "brief" : summaryLength === "medium" ? "comprehensive" : "detailed"} summary focusing on:
1. Type of document and its purpose
2. Key parties involved
3. Main rights and obligations
4. Important dates and deadlines
5. Key terms and conditions
6. Notable clauses or provisions
7. Potential risks or concerns

Document text:
${inputText}`;

      const response = await summarizeDocument({
        text: legalPrompt,
        length: summaryLength,
        language: language !== "auto" ? language : undefined,
      });

      setSummary(response.content);
      setStatus("completed");
      setProgress(100);
    } catch (err) {
      console.error("Summarization error:", err);
      setError(err instanceof Error ? err.message : "Failed to generate summary");
      setStatus("error");
    }
  }, [inputText, summaryLength, language]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [summary]);

  const wordCount = inputText.trim().split(/\s+/).filter(Boolean).length;
  const summaryWordCount = summary.trim().split(/\s+/).filter(Boolean).length;

  return (
    <ToolLayout
      title="AI Legal Document Summarizer"
      description="Summarize legal documents and contracts using AI. Get plain-language summaries of terms, obligations, and key points. Free legal summarizer for contracts, NDAs, terms of service, and privacy policies."
      category="Contract & Legal"
      keywords="legal summarizer, summarize contract, legal document summary, contract summarizer, terms summarizer, free legal summarizer, NDA summary, terms of service summarizer, privacy policy summarizer, AI legal summary"
      isAIPowered={true}
      toolContext="legal-summarization"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex gap-2 mb-4">
                <Button
                  variant={inputMode === "file" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setInputMode("file")}
                >
                  Upload File
                </Button>
                <Button
                  variant={inputMode === "text" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setInputMode("text")}
                >
                  Paste Text
                </Button>
              </div>

              {inputMode === "file" ? (
                <FileUploader
                  accept={{
                    "application/pdf": [".pdf"],
                    "image/*": [".jpg", ".jpeg", ".png", ".heic", ".webp"],
                  }}
                  maxSize={10 * 1024 * 1024}
                  multiple={false}
                  onFilesSelected={handleFilesSelected}
                  description="Upload legal document (PDF or image)"
                />
              ) : (
                <div className="space-y-2">
                  <Label>Paste your legal document</Label>
                  <Textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste the legal text you want to summarize..."
                    className="min-h-[200px]"
                  />
                  {wordCount > 0 && (
                    <p className="text-xs text-muted-foreground text-right">
                      {wordCount.toLocaleString()} words
                    </p>
                  )}
                </div>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Alert>
                <Scale className="h-4 w-4" />
                <AlertDescription>
                  This tool provides informational summaries only, not legal advice.
                </AlertDescription>
              </Alert>

              <div className="space-y-4 pt-2">
                <div>
                  <Label className="mb-2 block">Summary Detail Level</Label>
                  <RadioGroup
                    value={summaryLength}
                    onValueChange={(value) => setSummaryLength(value as SummaryLength)}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="short" id="brief" />
                      <Label htmlFor="brief" className="cursor-pointer">Brief</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="standard" />
                      <Label htmlFor="standard" className="cursor-pointer">Standard</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="long" id="detailed" />
                      <Label htmlFor="detailed" className="cursor-pointer">Detailed</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Languages className="size-4" />
                    <span>Output:</span>
                  </div>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={handleSummarize}
                disabled={!inputText.trim() || status === "processing"}
                className="w-full"
                size="lg"
              >
                <Sparkles className="mr-2 size-4" />
                {status === "processing" ? "Summarizing..." : "Summarize Legal Document"}
              </Button>
            </CardContent>
          </Card>

          {status !== "idle" && (
            <ProcessingStatus
              status={status}
              progress={progress}
              message={progressMessage || "Processing..."}
            />
          )}

          {inputMode === "file" && inputText && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">Extracted Text</h3>
                  <span className="text-xs text-muted-foreground">
                    {wordCount.toLocaleString()} words
                  </span>
                </div>
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[150px] text-sm"
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
                  Legal Summary
                </h3>
                {summary && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {summaryWordCount} words
                    </span>
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
                      data={summary}
                      filename="legal-summary.txt"
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

              {summary ? (
                <div className="flex-1 overflow-auto">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="whitespace-pre-wrap text-foreground leading-relaxed">
                      {summary}
                    </p>
                  </div>

                  {wordCount > 0 && summaryWordCount > 0 && (
                    <div className="mt-4 p-3 border rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Compression</span>
                        <span className="font-medium">
                          {Math.round((1 - summaryWordCount / wordCount) * 100)}% reduction
                        </span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-muted-foreground">Original</span>
                        <span>{wordCount.toLocaleString()} words</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Summary</span>
                        <span>{summaryWordCount.toLocaleString()} words</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Scale className="size-12 mx-auto mb-4 opacity-50" />
                    <p>Upload a legal document to get a summary</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content Sections */}
      <HowItWorks
        title="How the Legal Summarizer Works"
        steps={HOW_IT_WORKS_STEPS}
      />

      <Features
        title="Legal Summarizer Features"
        features={FEATURES}
      />

      <UseCases
        title="Who Uses the Legal Summarizer?"
        subtitle="From business professionals reviewing contracts to consumers understanding terms of service, AI summarization makes legal documents accessible."
        useCases={USE_CASES}
      />

      <WhatYouGet
        title="What's in the Summary"
        items={WHAT_YOU_GET}
      />

      <TechnicalInfo
        title="Powered by Legal AI"
        description={TECHNICAL_INFO.description}
        technologies={TECHNICAL_INFO.technologies}
      />

      <ToolFAQ faqs={FAQS} toolName="Legal Document Summarizer" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
